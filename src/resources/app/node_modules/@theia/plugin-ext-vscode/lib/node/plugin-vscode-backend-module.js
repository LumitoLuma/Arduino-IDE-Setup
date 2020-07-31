"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var plugin_ext_1 = require("@theia/plugin-ext");
var plugin_vscode_file_handler_1 = require("./plugin-vscode-file-handler");
var plugin_vscode_directory_handler_1 = require("./plugin-vscode-directory-handler");
var scanner_vscode_1 = require("./scanner-vscode");
var plugin_vscode_cli_contribution_1 = require("./plugin-vscode-cli-contribution");
var node_1 = require("@theia/core/lib/node");
var common_1 = require("@theia/plugin-ext/lib/common");
var plugin_vscode_environment_1 = require("../common/plugin-vscode-environment");
var plugin_vscode_deployer_participant_1 = require("./plugin-vscode-deployer-participant");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(plugin_vscode_environment_1.PluginVSCodeEnvironment).toSelf().inSingletonScope();
    bind(plugin_vscode_deployer_participant_1.PluginVSCodeDeployerParticipant).toSelf().inSingletonScope();
    bind(plugin_ext_1.PluginDeployerParticipant).toService(plugin_vscode_deployer_participant_1.PluginVSCodeDeployerParticipant);
    bind(plugin_ext_1.PluginDeployerFileHandler).to(plugin_vscode_file_handler_1.PluginVsCodeFileHandler).inSingletonScope();
    bind(plugin_ext_1.PluginDeployerDirectoryHandler).to(plugin_vscode_directory_handler_1.PluginVsCodeDirectoryHandler).inSingletonScope();
    bind(plugin_ext_1.PluginScanner).to(scanner_vscode_1.VsCodePluginScanner).inSingletonScope();
    bind(plugin_vscode_cli_contribution_1.PluginVsCodeCliContribution).toSelf().inSingletonScope();
    bind(node_1.CliContribution).toService(plugin_vscode_cli_contribution_1.PluginVsCodeCliContribution);
    bind(common_1.PluginHostEnvironmentVariable).toService(plugin_vscode_cli_contribution_1.PluginVsCodeCliContribution);
});
//# sourceMappingURL=plugin-vscode-backend-module.js.map