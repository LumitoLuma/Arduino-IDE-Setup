"use strict";
/********************************************************************************
 * Copyright (C) 2017 Ericsson and others.
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
var node_1 = require("@theia/languages/lib/node");
var cpp_contribution_1 = require("./cpp-contribution");
var cpp_build_configuration_protocol_1 = require("../common/cpp-build-configuration-protocol");
var cpp_build_configuration_server_1 = require("./cpp-build-configuration-server");
var common_1 = require("@theia/core/lib/common");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(node_1.LanguageServerContribution).to(cpp_contribution_1.CppContribution).inSingletonScope();
    bind(common_1.ILogger).toDynamicValue(function (ctx) {
        var logger = ctx.container.get(common_1.ILogger);
        return logger.child('cpp');
    }).inSingletonScope().whenTargetNamed('cpp');
    bind(cpp_build_configuration_server_1.CppBuildConfigurationServerImpl).toSelf().inSingletonScope();
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(cpp_build_configuration_protocol_1.cppBuildConfigurationServerPath, function () {
            return ctx.container.get(cpp_build_configuration_server_1.CppBuildConfigurationServerImpl);
        });
    }).inSingletonScope();
});
//# sourceMappingURL=cpp-backend-module.js.map