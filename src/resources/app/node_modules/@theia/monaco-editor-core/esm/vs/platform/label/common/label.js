/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createDecorator } from '../../instantiation/common/instantiation';
import { isSingleFolderWorkspaceIdentifier, WORKSPACE_EXTENSION } from '../../workspaces/common/workspaces';
import { localize } from '../../../nls';
import { isEqualOrParent, basename } from '../../../base/common/resources';
import { endsWith } from '../../../base/common/strings';
var LABEL_SERVICE_ID = 'label';
export function getSimpleWorkspaceLabel(workspace, workspaceHome) {
    if (isSingleFolderWorkspaceIdentifier(workspace)) {
        return basename(workspace);
    }
    // Workspace: Untitled
    if (isEqualOrParent(workspace.configPath, workspaceHome)) {
        return localize('untitledWorkspace', "Untitled (Workspace)");
    }
    var filename = basename(workspace.configPath);
    if (endsWith(filename, WORKSPACE_EXTENSION)) {
        filename = filename.substr(0, filename.length - WORKSPACE_EXTENSION.length - 1);
    }
    return localize('workspaceName', "{0} (Workspace)", filename);
}
export var ILabelService = createDecorator(LABEL_SERVICE_ID);
