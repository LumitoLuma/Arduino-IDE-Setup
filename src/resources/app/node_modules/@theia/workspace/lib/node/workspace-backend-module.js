"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
var common_1 = require("@theia/core/lib/common");
var common_2 = require("../common");
var default_workspace_server_1 = require("./default-workspace-server");
var cli_1 = require("@theia/core/lib/node/cli");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(default_workspace_server_1.WorkspaceCliContribution).toSelf().inSingletonScope();
    bind(cli_1.CliContribution).toService(default_workspace_server_1.WorkspaceCliContribution);
    bind(default_workspace_server_1.DefaultWorkspaceServer).toSelf().inSingletonScope();
    bind(common_2.WorkspaceServer).toService(default_workspace_server_1.DefaultWorkspaceServer);
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(common_2.workspacePath, function () {
            return ctx.container.get(common_2.WorkspaceServer);
        });
    }).inSingletonScope();
});
//# sourceMappingURL=workspace-backend-module.js.map