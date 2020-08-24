"use strict";
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
exports.PluginIconPath = void 0;
var path = require("path");
var vscode_uri_1 = require("vscode-uri");
var plugin_protocol_1 = require("../common/plugin-protocol");
var PluginIconPath;
(function (PluginIconPath) {
    function toUrl(iconPath, plugin) {
        if (!iconPath) {
            return undefined;
        }
        if (typeof iconPath === 'object' && 'light' in iconPath) {
            return {
                light: asString(iconPath.light, plugin),
                dark: asString(iconPath.dark, plugin)
            };
        }
        return asString(iconPath, plugin);
    }
    PluginIconPath.toUrl = toUrl;
    function asString(arg, plugin) {
        arg = arg instanceof vscode_uri_1.URI && arg.scheme === 'file' ? arg.fsPath : arg;
        if (typeof arg !== 'string') {
            return arg.toString(true);
        }
        var packagePath = plugin.rawModel.packagePath;
        var absolutePath = path.isAbsolute(arg) ? arg : path.join(packagePath, arg);
        var normalizedPath = path.normalize(absolutePath);
        var relativePath = path.relative(packagePath, normalizedPath);
        return plugin_protocol_1.PluginPackage.toPluginUrl(plugin.rawModel, relativePath);
    }
    PluginIconPath.asString = asString;
})(PluginIconPath = exports.PluginIconPath || (exports.PluginIconPath = {}));
//# sourceMappingURL=plugin-icon-path.js.map