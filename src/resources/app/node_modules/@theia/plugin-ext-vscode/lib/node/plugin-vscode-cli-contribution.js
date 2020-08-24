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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginVsCodeCliContribution = void 0;
var inversify_1 = require("inversify");
var plugin_vscode_init_1 = require("./plugin-vscode-init");
/**
 * CLI Contribution allowing to override the VS Code API version which is returned by `vscode.version` API call.
 */
var PluginVsCodeCliContribution = /** @class */ (function () {
    function PluginVsCodeCliContribution() {
    }
    PluginVsCodeCliContribution_1 = PluginVsCodeCliContribution;
    PluginVsCodeCliContribution.prototype.configure = function (conf) {
        conf.option(PluginVsCodeCliContribution_1.VSCODE_API_VERSION, {
            // eslint-disable-next-line max-len
            description: "Overrides the version returned by VSCode API 'vscode.version'. Example: --" + PluginVsCodeCliContribution_1.VSCODE_API_VERSION + "=<Wanted Version>. Default [" + plugin_vscode_init_1.VSCODE_DEFAULT_API_VERSION + "]",
            type: 'string',
            nargs: 1
        });
    };
    PluginVsCodeCliContribution.prototype.setArguments = function (args) {
        var arg = args[PluginVsCodeCliContribution_1.VSCODE_API_VERSION];
        if (arg) {
            this.vsCodeApiVersion = arg;
        }
    };
    PluginVsCodeCliContribution.prototype.process = function (env) {
        if (this.vsCodeApiVersion) {
            env['VSCODE_API_VERSION'] = this.vsCodeApiVersion;
        }
    };
    var PluginVsCodeCliContribution_1;
    PluginVsCodeCliContribution.VSCODE_API_VERSION = 'vscode-api-version';
    PluginVsCodeCliContribution = PluginVsCodeCliContribution_1 = __decorate([
        inversify_1.injectable()
    ], PluginVsCodeCliContribution);
    return PluginVsCodeCliContribution;
}());
exports.PluginVsCodeCliContribution = PluginVsCodeCliContribution;
//# sourceMappingURL=plugin-vscode-cli-contribution.js.map