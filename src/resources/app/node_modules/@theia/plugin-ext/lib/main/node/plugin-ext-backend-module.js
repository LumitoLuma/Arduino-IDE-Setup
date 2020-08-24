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
exports.bindMainBackend = void 0;
var plugin_service_1 = require("./plugin-service");
var node_1 = require("@theia/core/lib/node");
var plugins_key_value_storage_1 = require("./plugins-key-value-storage");
var plugin_deployer_contribution_1 = require("./plugin-deployer-contribution");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var plugin_deployer_impl_1 = require("./plugin-deployer-impl");
var plugin_local_dir_resolver_1 = require("./resolvers/plugin-local-dir-resolver");
var plugin_theia_file_handler_1 = require("./handlers/plugin-theia-file-handler");
var plugin_theia_directory_handler_1 = require("./handlers/plugin-theia-directory-handler");
var plugin_github_resolver_1 = require("./plugin-github-resolver");
var plugin_http_resolver_1 = require("./plugin-http-resolver");
var core_1 = require("@theia/core");
var plugin_paths_protocol_1 = require("../common/plugin-paths-protocol");
var plugin_paths_service_1 = require("./paths/plugin-paths-service");
var plugin_server_handler_1 = require("./plugin-server-handler");
var plugin_cli_contribution_1 = require("./plugin-cli-contribution");
var webview_resource_loader_impl_1 = require("./webview-resource-loader-impl");
var webview_protocol_1 = require("../common/webview-protocol");
var plugin_theia_environment_1 = require("../common/plugin-theia-environment");
var plugin_theia_deployer_participant_1 = require("./plugin-theia-deployer-participant");
function bindMainBackend(bind) {
    bind(webview_resource_loader_impl_1.WebviewResourceLoaderImpl).toSelf().inSingletonScope();
    bind(core_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new core_1.JsonRpcConnectionHandler(webview_protocol_1.WebviewResourceLoaderPath, function () {
            return ctx.container.get(webview_resource_loader_impl_1.WebviewResourceLoaderImpl);
        });
    }).inSingletonScope();
    bind(plugin_service_1.PluginApiContribution).toSelf().inSingletonScope();
    bind(node_1.BackendApplicationContribution).toService(plugin_service_1.PluginApiContribution);
    core_1.bindContributionProvider(bind, plugin_protocol_1.PluginDeployerParticipant);
    bind(plugin_protocol_1.PluginDeployer).to(plugin_deployer_impl_1.PluginDeployerImpl).inSingletonScope();
    bind(plugin_deployer_contribution_1.PluginDeployerContribution).toSelf().inSingletonScope();
    bind(node_1.BackendApplicationContribution).toService(plugin_deployer_contribution_1.PluginDeployerContribution);
    bind(plugin_protocol_1.PluginDeployerResolver).to(plugin_local_dir_resolver_1.LocalDirectoryPluginDeployerResolver).inSingletonScope();
    bind(plugin_protocol_1.PluginDeployerResolver).to(plugin_github_resolver_1.GithubPluginDeployerResolver).inSingletonScope();
    bind(plugin_protocol_1.PluginDeployerResolver).to(plugin_http_resolver_1.HttpPluginDeployerResolver).inSingletonScope();
    bind(plugin_theia_environment_1.PluginTheiaEnvironment).toSelf().inSingletonScope();
    bind(plugin_theia_deployer_participant_1.PluginTheiaDeployerParticipant).toSelf().inSingletonScope();
    bind(plugin_protocol_1.PluginDeployerParticipant).toService(plugin_theia_deployer_participant_1.PluginTheiaDeployerParticipant);
    bind(plugin_protocol_1.PluginDeployerFileHandler).to(plugin_theia_file_handler_1.PluginTheiaFileHandler).inSingletonScope();
    bind(plugin_protocol_1.PluginDeployerDirectoryHandler).to(plugin_theia_directory_handler_1.PluginTheiaDirectoryHandler).inSingletonScope();
    bind(plugin_protocol_1.PluginServer).to(plugin_server_handler_1.PluginServerHandler).inSingletonScope();
    bind(plugins_key_value_storage_1.PluginsKeyValueStorage).toSelf().inSingletonScope();
    bind(plugin_paths_protocol_1.PluginPathsService).to(plugin_paths_service_1.PluginPathsServiceImpl).inSingletonScope();
    bind(core_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new core_1.JsonRpcConnectionHandler(plugin_paths_protocol_1.pluginPathsServicePath, function () {
            return ctx.container.get(plugin_paths_protocol_1.PluginPathsService);
        });
    }).inSingletonScope();
    bind(core_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new core_1.JsonRpcConnectionHandler(plugin_protocol_1.pluginServerJsonRpcPath, function () {
            return ctx.container.get(plugin_protocol_1.PluginServer);
        });
    }).inSingletonScope();
    bind(plugin_cli_contribution_1.PluginCliContribution).toSelf().inSingletonScope();
    bind(node_1.CliContribution).toService(plugin_cli_contribution_1.PluginCliContribution);
}
exports.bindMainBackend = bindMainBackend;
//# sourceMappingURL=plugin-ext-backend-module.js.map