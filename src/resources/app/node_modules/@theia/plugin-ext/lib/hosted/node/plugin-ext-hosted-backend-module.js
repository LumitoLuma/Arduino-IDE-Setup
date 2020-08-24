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
exports.bindHostedBackend = exports.bindCommonHostedBackend = void 0;
var path = require("path");
var contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
var cli_1 = require("@theia/core/lib/node/cli");
var connection_container_module_1 = require("@theia/core/lib/node/messaging/connection-container-module");
var backend_application_1 = require("@theia/core/lib/node/backend-application");
var metadata_scanner_1 = require("./metadata-scanner");
var plugin_service_1 = require("./plugin-service");
var plugin_reader_1 = require("./plugin-reader");
var hosted_plugin_1 = require("./hosted-plugin");
var scanner_theia_1 = require("./scanners/scanner-theia");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var grammars_reader_1 = require("./scanners/grammars-reader");
var hosted_plugin_process_1 = require("./hosted-plugin-process");
var plugin_ext_api_contribution_1 = require("../../common/plugin-ext-api-contribution");
var hosted_plugin_cli_contribution_1 = require("./hosted-plugin-cli-contribution");
var hosted_plugin_deployer_handler_1 = require("./hosted-plugin-deployer-handler");
var commonHostedConnectionModule = connection_container_module_1.ConnectionContainerModule.create(function (_a) {
    var bind = _a.bind, bindBackendService = _a.bindBackendService;
    bind(hosted_plugin_process_1.HostedPluginProcess).toSelf().inSingletonScope();
    bind(hosted_plugin_1.HostedPluginSupport).toSelf().inSingletonScope();
    contribution_provider_1.bindContributionProvider(bind, Symbol.for(plugin_ext_api_contribution_1.ExtPluginApiProvider));
    contribution_provider_1.bindContributionProvider(bind, plugin_protocol_1.PluginHostEnvironmentVariable);
    bind(plugin_service_1.HostedPluginServerImpl).toSelf().inSingletonScope();
    bind(plugin_protocol_1.HostedPluginServer).toService(plugin_service_1.HostedPluginServerImpl);
    bindBackendService(plugin_protocol_1.hostedServicePath, plugin_protocol_1.HostedPluginServer, function (server, client) {
        server.setClient(client);
        client.onDidCloseConnection(function () { return server.dispose(); });
        return server;
    });
});
function bindCommonHostedBackend(bind) {
    bind(hosted_plugin_cli_contribution_1.HostedPluginCliContribution).toSelf().inSingletonScope();
    bind(cli_1.CliContribution).toService(hosted_plugin_cli_contribution_1.HostedPluginCliContribution);
    bind(metadata_scanner_1.MetadataScanner).toSelf().inSingletonScope();
    bind(plugin_reader_1.HostedPluginReader).toSelf().inSingletonScope();
    bind(backend_application_1.BackendApplicationContribution).toService(plugin_reader_1.HostedPluginReader);
    bind(hosted_plugin_deployer_handler_1.HostedPluginDeployerHandler).toSelf().inSingletonScope();
    bind(plugin_protocol_1.PluginDeployerHandler).toService(hosted_plugin_deployer_handler_1.HostedPluginDeployerHandler);
    bind(grammars_reader_1.GrammarsReader).toSelf().inSingletonScope();
    bind(hosted_plugin_process_1.HostedPluginProcessConfiguration).toConstantValue({ path: path.resolve(__dirname, 'plugin-host.js') });
    bind(connection_container_module_1.ConnectionContainerModule).toConstantValue(commonHostedConnectionModule);
}
exports.bindCommonHostedBackend = bindCommonHostedBackend;
function bindHostedBackend(bind) {
    bindCommonHostedBackend(bind);
    bind(plugin_protocol_1.PluginScanner).to(scanner_theia_1.TheiaPluginScanner).inSingletonScope();
}
exports.bindHostedBackend = bindHostedBackend;
//# sourceMappingURL=plugin-ext-hosted-backend-module.js.map