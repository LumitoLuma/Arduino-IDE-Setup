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
exports.messagingBackendModule = void 0;
var inversify_1 = require("inversify");
var common_1 = require("../../common");
var backend_application_1 = require("../backend-application");
var messaging_contribution_1 = require("./messaging-contribution");
var connection_container_module_1 = require("./connection-container-module");
var messaging_service_1 = require("./messaging-service");
exports.messagingBackendModule = new inversify_1.ContainerModule(function (bind) {
    common_1.bindContributionProvider(bind, connection_container_module_1.ConnectionContainerModule);
    common_1.bindContributionProvider(bind, messaging_service_1.MessagingService.Contribution);
    bind(messaging_service_1.MessagingService.Identifier).to(messaging_contribution_1.MessagingContribution).inSingletonScope();
    bind(messaging_contribution_1.MessagingContribution).toDynamicValue(function (_a) {
        var container = _a.container;
        var child = container.createChild();
        child.bind(messaging_contribution_1.MessagingContainer).toConstantValue(container);
        return child.get(messaging_service_1.MessagingService.Identifier);
    }).inSingletonScope();
    bind(backend_application_1.BackendApplicationContribution).toService(messaging_contribution_1.MessagingContribution);
});
//# sourceMappingURL=messaging-backend-module.js.map