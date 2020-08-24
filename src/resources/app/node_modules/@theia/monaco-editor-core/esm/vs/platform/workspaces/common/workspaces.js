/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createDecorator } from '../../instantiation/common/instantiation';
import { localize } from '../../../nls';
import { URI } from '../../../base/common/uri';
import { isWindows, isLinux, isMacintosh } from '../../../base/common/platform';
import { extname } from '../../../base/common/path';
import { dirname, resolvePath, isEqualAuthority, isEqualOrParent, relativePath, extname as resourceExtname } from '../../../base/common/resources';
import * as jsonEdit from '../../../base/common/jsonEdit';
import * as json from '../../../base/common/json';
import { Schemas } from '../../../base/common/network';
import { normalizeDriveLetter } from '../../../base/common/labels';
import { toSlashes } from '../../../base/common/extpath';
import { getRemoteAuthority } from '../../remote/common/remoteHosts';
export var WORKSPACE_EXTENSION = 'code-workspace';
export var WORKSPACE_FILTER = [{ name: localize('codeWorkspace', "Code Workspace"), extensions: [WORKSPACE_EXTENSION] }];
export var UNTITLED_WORKSPACE_NAME = 'workspace.json';
export var IWorkspacesService = createDecorator('workspacesService');
export function isRecentWorkspace(curr) {
    return curr.hasOwnProperty('workspace');
}
export function isRecentFolder(curr) {
    return curr.hasOwnProperty('folderUri');
}
export function isRecentFile(curr) {
    return curr.hasOwnProperty('fileUri');
}
export function reviveWorkspaceIdentifier(workspace) {
    return { id: workspace.id, configPath: URI.revive(workspace.configPath) };
}
export function isStoredWorkspaceFolder(thing) {
    return isRawFileWorkspaceFolder(thing) || isRawUriWorkspaceFolder(thing);
}
export function isRawFileWorkspaceFolder(thing) {
    return thing
        && typeof thing === 'object'
        && typeof thing.path === 'string'
        && (!thing.name || typeof thing.name === 'string');
}
export function isRawUriWorkspaceFolder(thing) {
    return thing
        && typeof thing === 'object'
        && typeof thing.uri === 'string'
        && (!thing.name || typeof thing.name === 'string');
}
export function isSingleFolderWorkspaceIdentifier(obj) {
    return obj instanceof URI;
}
export function isWorkspaceIdentifier(obj) {
    var workspaceIdentifier = obj;
    return workspaceIdentifier && typeof workspaceIdentifier.id === 'string' && workspaceIdentifier.configPath instanceof URI;
}
export function toWorkspaceIdentifier(workspace) {
    if (workspace.configuration) {
        return {
            configPath: workspace.configuration,
            id: workspace.id
        };
    }
    if (workspace.folders.length === 1) {
        return workspace.folders[0].uri;
    }
    // Empty workspace
    return undefined;
}
export function isUntitledWorkspace(path, environmentService) {
    return isEqualOrParent(path, environmentService.untitledWorkspacesHome);
}
export function isSingleFolderWorkspaceInitializationPayload(obj) {
    return isSingleFolderWorkspaceIdentifier(obj.folder);
}
var WORKSPACE_SUFFIX = '.' + WORKSPACE_EXTENSION;
export function hasWorkspaceFileExtension(path) {
    var ext = (typeof path === 'string') ? extname(path) : resourceExtname(path);
    return ext === WORKSPACE_SUFFIX;
}
var SLASH = '/';
/**
 * Given a folder URI and the workspace config folder, computes the IStoredWorkspaceFolder using
* a relative or absolute path or a uri.
 * Undefined is returned if the folderURI and the targetConfigFolderURI don't have the same schema or authority
 *
 * @param folderURI a workspace folder
 * @param folderName a workspace name
 * @param targetConfigFolderURI the folder where the workspace is living in
 * @param useSlashForPath if set, use forward slashes for file paths on windows
 */
export function getStoredWorkspaceFolder(folderURI, folderName, targetConfigFolderURI, useSlashForPath) {
    if (useSlashForPath === void 0) { useSlashForPath = !isWindows; }
    if (folderURI.scheme !== targetConfigFolderURI.scheme) {
        return { name: folderName, uri: folderURI.toString(true) };
    }
    var folderPath;
    if (isEqualOrParent(folderURI, targetConfigFolderURI)) {
        // use relative path
        folderPath = relativePath(targetConfigFolderURI, folderURI) || '.'; // always uses forward slashes
        if (isWindows && folderURI.scheme === Schemas.file && !useSlashForPath) {
            // Windows gets special treatment:
            // - use backslahes unless slash is used by other existing folders
            folderPath = folderPath.replace(/\//g, '\\');
        }
    }
    else {
        // use absolute path
        if (folderURI.scheme === Schemas.file) {
            folderPath = folderURI.fsPath;
            if (isWindows) {
                // Windows gets special treatment:
                // - normalize all paths to get nice casing of drive letters
                // - use backslahes unless slash is used by other existing folders
                folderPath = normalizeDriveLetter(folderPath);
                if (useSlashForPath) {
                    folderPath = toSlashes(folderPath);
                }
            }
        }
        else {
            if (!isEqualAuthority(folderURI.authority, targetConfigFolderURI.authority)) {
                return { name: folderName, uri: folderURI.toString(true) };
            }
            folderPath = folderURI.path;
        }
    }
    return { name: folderName, path: folderPath };
}
/**
 * Rewrites the content of a workspace file to be saved at a new location.
 * Throws an exception if file is not a valid workspace file
 */
export function rewriteWorkspaceFileForNewLocation(rawWorkspaceContents, configPathURI, targetConfigPathURI) {
    var storedWorkspace = doParseStoredWorkspace(configPathURI, rawWorkspaceContents);
    var sourceConfigFolder = dirname(configPathURI);
    var targetConfigFolder = dirname(targetConfigPathURI);
    var rewrittenFolders = [];
    var slashForPath = useSlashForPath(storedWorkspace.folders);
    // Rewrite absolute paths to relative paths if the target workspace folder
    // is a parent of the location of the workspace file itself. Otherwise keep
    // using absolute paths.
    for (var _i = 0, _a = storedWorkspace.folders; _i < _a.length; _i++) {
        var folder = _a[_i];
        var folderURI = isRawFileWorkspaceFolder(folder) ? resolvePath(sourceConfigFolder, folder.path) : URI.parse(folder.uri);
        rewrittenFolders.push(getStoredWorkspaceFolder(folderURI, folder.name, targetConfigFolder, slashForPath));
    }
    // Preserve as much of the existing workspace as possible by using jsonEdit
    // and only changing the folders portion.
    var formattingOptions = { insertSpaces: false, tabSize: 4, eol: (isLinux || isMacintosh) ? '\n' : '\r\n' };
    var edits = jsonEdit.setProperty(rawWorkspaceContents, ['folders'], rewrittenFolders, formattingOptions);
    var newContent = jsonEdit.applyEdits(rawWorkspaceContents, edits);
    if (storedWorkspace.remoteAuthority === getRemoteAuthority(targetConfigPathURI)) {
        // unsaved remote workspaces have the remoteAuthority set. Remove it when no longer nexessary.
        newContent = jsonEdit.applyEdits(newContent, jsonEdit.removeProperty(newContent, ['remoteAuthority'], formattingOptions));
    }
    return newContent;
}
function doParseStoredWorkspace(path, contents) {
    // Parse workspace file
    var storedWorkspace = json.parse(contents); // use fault tolerant parser
    // Filter out folders which do not have a path or uri set
    if (storedWorkspace && Array.isArray(storedWorkspace.folders)) {
        storedWorkspace.folders = storedWorkspace.folders.filter(function (folder) { return isStoredWorkspaceFolder(folder); });
    }
    else {
        throw new Error(path + " looks like an invalid workspace file.");
    }
    return storedWorkspace;
}
export function useSlashForPath(storedFolders) {
    if (isWindows) {
        return storedFolders.some(function (folder) { return isRawFileWorkspaceFolder(folder) && folder.path.indexOf(SLASH) >= 0; });
    }
    return true;
}
function isLegacySerializedWorkspace(curr) {
    return typeof curr === 'object' && typeof curr['id'] === 'string' && typeof curr['configPath'] === 'string';
}
function isUriComponents(curr) {
    return curr && typeof curr['path'] === 'string' && typeof curr['scheme'] === 'string';
}
export function restoreRecentlyOpened(data, logService) {
    var result = { workspaces: [], files: [] };
    if (data) {
        var restoreGracefully = function (entries, func) {
            for (var i = 0; i < entries.length; i++) {
                try {
                    func(entries[i], i);
                }
                catch (e) {
                    logService.warn("Error restoring recent entry " + JSON.stringify(entries[i]) + ": " + e.toString() + ". Skip entry.");
                }
            }
        };
        var storedRecents_1 = data;
        if (Array.isArray(storedRecents_1.workspaces3)) {
            restoreGracefully(storedRecents_1.workspaces3, function (workspace, i) {
                var label = (Array.isArray(storedRecents_1.workspaceLabels) && storedRecents_1.workspaceLabels[i]) || undefined;
                if (typeof workspace === 'object' && typeof workspace.id === 'string' && typeof workspace.configURIPath === 'string') {
                    result.workspaces.push({ label: label, workspace: { id: workspace.id, configPath: URI.parse(workspace.configURIPath) } });
                }
                else if (typeof workspace === 'string') {
                    result.workspaces.push({ label: label, folderUri: URI.parse(workspace) });
                }
            });
        }
        else if (Array.isArray(storedRecents_1.workspaces2)) {
            restoreGracefully(storedRecents_1.workspaces2, function (workspace) {
                if (typeof workspace === 'object' && typeof workspace.id === 'string' && typeof workspace.configPath === 'string') {
                    result.workspaces.push({ workspace: { id: workspace.id, configPath: URI.file(workspace.configPath) } });
                }
                else if (typeof workspace === 'string') {
                    result.workspaces.push({ folderUri: URI.parse(workspace) });
                }
            });
        }
        else if (Array.isArray(storedRecents_1.workspaces)) {
            // TODO@martin legacy support can be removed at some point (6 month?)
            // format of 1.25 and before
            restoreGracefully(storedRecents_1.workspaces, function (workspace) {
                if (typeof workspace === 'string') {
                    result.workspaces.push({ folderUri: URI.file(workspace) });
                }
                else if (isLegacySerializedWorkspace(workspace)) {
                    result.workspaces.push({ workspace: { id: workspace.id, configPath: URI.file(workspace.configPath) } });
                }
                else if (isUriComponents(workspace)) {
                    // added by 1.26-insiders
                    result.workspaces.push({ folderUri: URI.revive(workspace) });
                }
            });
        }
        if (Array.isArray(storedRecents_1.files2)) {
            restoreGracefully(storedRecents_1.files2, function (file, i) {
                var label = (Array.isArray(storedRecents_1.fileLabels) && storedRecents_1.fileLabels[i]) || undefined;
                if (typeof file === 'string') {
                    result.files.push({ label: label, fileUri: URI.parse(file) });
                }
            });
        }
        else if (Array.isArray(storedRecents_1.files)) {
            restoreGracefully(storedRecents_1.files, function (file) {
                if (typeof file === 'string') {
                    result.files.push({ fileUri: URI.file(file) });
                }
            });
        }
    }
    return result;
}
export function toStoreData(recents) {
    var serialized = { workspaces3: [], files2: [] };
    var hasLabel = false;
    var workspaceLabels = [];
    for (var _i = 0, _a = recents.workspaces; _i < _a.length; _i++) {
        var recent = _a[_i];
        if (isRecentFolder(recent)) {
            serialized.workspaces3.push(recent.folderUri.toString());
        }
        else {
            serialized.workspaces3.push({ id: recent.workspace.id, configURIPath: recent.workspace.configPath.toString() });
        }
        workspaceLabels.push(recent.label || null);
        hasLabel = hasLabel || !!recent.label;
    }
    if (hasLabel) {
        serialized.workspaceLabels = workspaceLabels;
    }
    hasLabel = false;
    var fileLabels = [];
    for (var _b = 0, _c = recents.files; _b < _c.length; _b++) {
        var recent = _c[_b];
        serialized.files2.push(recent.fileUri.toString());
        fileLabels.push(recent.label || null);
        hasLabel = hasLabel || !!recent.label;
    }
    if (hasLabel) {
        serialized.fileLabels = fileLabels;
    }
    return serialized;
}
//#endregion
