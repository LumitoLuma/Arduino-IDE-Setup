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
var core_1 = require("@theia/core");
var messaging_1 = require("@theia/core/lib/common/messaging");
var node_1 = require("@theia/core/lib/node");
var process_task_runner_backend_module_1 = require("./process/process-task-runner-backend-module");
var task_backend_application_contribution_1 = require("./task-backend-application-contribution");
var task_manager_1 = require("./task-manager");
var task_runner_1 = require("./task-runner");
var task_server_1 = require("./task-server");
var task_common_module_1 = require("../common/task-common-module");
var common_1 = require("../common");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(task_manager_1.TaskManager).toSelf().inSingletonScope();
    bind(node_1.BackendApplicationContribution).toService(task_manager_1.TaskManager);
    bind(common_1.TaskServer).to(task_server_1.TaskServerImpl).inSingletonScope();
    bind(messaging_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new messaging_1.JsonRpcConnectionHandler(common_1.taskPath, function (client) {
            var taskServer = ctx.container.get(common_1.TaskServer);
            taskServer.setClient(client);
            // when connection closes, cleanup that client of task-server
            client.onDidCloseConnection(function () {
                taskServer.disconnectClient(client);
            });
            return taskServer;
        });
    }).inSingletonScope();
    task_common_module_1.createCommonBindings(bind);
    bind(task_runner_1.TaskRunnerRegistry).toSelf().inSingletonScope();
    core_1.bindContributionProvider(bind, task_runner_1.TaskRunnerContribution);
    bind(task_backend_application_contribution_1.TaskBackendApplicationContribution).toSelf().inSingletonScope();
    bind(node_1.BackendApplicationContribution).toService(task_backend_application_contribution_1.TaskBackendApplicationContribution);
    process_task_runner_backend_module_1.bindProcessTaskRunnerModule(bind);
});
//# sourceMappingURL=task-backend-module.js.map