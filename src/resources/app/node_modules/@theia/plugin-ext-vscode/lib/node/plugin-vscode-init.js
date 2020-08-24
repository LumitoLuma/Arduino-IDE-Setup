"use strict";
/********************************************************************************
 * Copyright (C) 2018-2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.doInitialization = exports.ExtensionKind = exports.VSCODE_DEFAULT_API_VERSION = void 0;
var plugin_ext_1 = require("@theia/plugin-ext");
exports.VSCODE_DEFAULT_API_VERSION = '1.44.0';
/** Set up en as a default locale for VS Code extensions using vscode-nls */
process.env['VSCODE_NLS_CONFIG'] = JSON.stringify({ locale: 'en', availableLanguages: {} });
process.env['VSCODE_PID'] = process.env['THEIA_PARENT_PID'];
var pluginsApiImpl = new Map();
var plugins = new Array();
var defaultApi;
var isLoadOverride = false;
var pluginApiFactory;
var ExtensionKind;
(function (ExtensionKind) {
    ExtensionKind[ExtensionKind["UI"] = 1] = "UI";
    ExtensionKind[ExtensionKind["Workspace"] = 2] = "Workspace";
})(ExtensionKind = exports.ExtensionKind || (exports.ExtensionKind = {}));
exports.doInitialization = function (apiFactory, plugin) {
    var vscode = Object.assign(apiFactory(plugin), { ExtensionKind: ExtensionKind });
    // use Theia plugin api instead vscode extensions
    vscode.extensions = {
        get all() {
            return vscode.plugins.all.map(function (p) { return asExtension(p); });
        },
        getExtension: function (pluginId) {
            return asExtension(vscode.plugins.getPlugin(pluginId));
        },
        get onDidChange() {
            return vscode.plugins.onDidChange;
        }
    };
    // override the version for vscode to be a VSCode version
    vscode.version = process.env['VSCODE_API_VERSION'] || exports.VSCODE_DEFAULT_API_VERSION;
    pluginsApiImpl.set(plugin.model.id, vscode);
    plugins.push(plugin);
    pluginApiFactory = apiFactory;
    if (!isLoadOverride) {
        overrideInternalLoad();
        isLoadOverride = true;
    }
};
function overrideInternalLoad() {
    var module = require('module');
    var vscodeModuleName = 'vscode';
    // save original load method
    var internalLoad = module._load;
    // if we try to resolve theia module, return the filename entry to use cache.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    module._load = function (request, parent, isMain) {
        if (request !== vscodeModuleName) {
            return internalLoad.apply(this, arguments);
        }
        var plugin = findPlugin(parent.filename);
        if (plugin) {
            var apiImpl = pluginsApiImpl.get(plugin.model.id);
            return apiImpl;
        }
        if (!defaultApi) {
            console.warn("Could not identify plugin for 'Theia' require call from " + parent.filename);
            defaultApi = pluginApiFactory(plugin_ext_1.emptyPlugin);
        }
        return defaultApi;
    };
}
function findPlugin(filePath) {
    return plugins.find(function (plugin) { return filePath.startsWith(plugin.pluginFolder); });
}
function asExtension(plugin) {
    if (!plugin) {
        return plugin;
    }
    if (plugin.pluginPath) {
        plugin.extensionPath = plugin.pluginPath;
    }
    // stub as a local VS Code extension (not running on a remote workspace)
    plugin.extensionKind = ExtensionKind.UI;
    return plugin;
}
//# sourceMappingURL=plugin-vscode-init.js.map