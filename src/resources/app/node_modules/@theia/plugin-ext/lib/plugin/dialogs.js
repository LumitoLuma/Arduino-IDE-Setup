"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogsExtImpl = void 0;
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var vscode_uri_1 = require("vscode-uri");
var DialogsExtImpl = /** @class */ (function () {
    function DialogsExtImpl(rpc) {
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.DIALOGS_MAIN);
    }
    DialogsExtImpl.prototype.showOpenDialog = function (options) {
        var _this = this;
        var optionsMain = {
            openLabel: options.openLabel,
            defaultUri: options.defaultUri ? options.defaultUri.path : undefined,
            canSelectFiles: options.canSelectFiles ? options.canSelectFiles : true,
            canSelectFolders: options.canSelectFolders ? options.canSelectFolders : false,
            canSelectMany: options.canSelectMany,
            filters: options.filters
        };
        return new Promise(function (resolve, reject) {
            _this.proxy.$showOpenDialog(optionsMain).then(function (result) {
                if (result) {
                    var uris = [];
                    for (var i = 0; i < result.length; i++) {
                        var uri = vscode_uri_1.URI.parse('file://' + result[i]);
                        uris.push(uri);
                    }
                    resolve(uris);
                }
                else {
                    resolve(undefined);
                }
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    DialogsExtImpl.prototype.showSaveDialog = function (options) {
        var _this = this;
        var optionsMain = {
            saveLabel: options.saveLabel,
            defaultUri: options.defaultUri ? options.defaultUri.path : undefined,
            filters: options.filters
        };
        return new Promise(function (resolve, reject) {
            _this.proxy.$showSaveDialog(optionsMain).then(function (result) {
                if (result) {
                    resolve(vscode_uri_1.URI.parse('file://' + result));
                }
                else {
                    resolve(undefined);
                }
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    DialogsExtImpl.prototype.showUploadDialog = function (options) {
        var _this = this;
        var optionsMain = {
            defaultUri: options.defaultUri ? options.defaultUri.path : undefined
        };
        return new Promise(function (resolve, reject) {
            _this.proxy.$showUploadDialog(optionsMain).then(function (result) {
                if (result) {
                    resolve(result.map(function (uri) { return vscode_uri_1.URI.parse(uri); }));
                }
                else {
                    resolve(undefined);
                }
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    return DialogsExtImpl;
}());
exports.DialogsExtImpl = DialogsExtImpl;
//# sourceMappingURL=dialogs.js.map