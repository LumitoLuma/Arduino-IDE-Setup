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
var messaging_service_1 = require("@theia/core/lib/node/messaging/messaging-service");
var languages_backend_contribution_1 = require("./languages-backend-contribution");
var language_server_contribution_1 = require("./language-server-contribution");
var common_2 = require("../common");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(languages_backend_contribution_1.LanguagesBackendContribution).toSelf().inSingletonScope();
    bind(messaging_service_1.MessagingService.Contribution).toService(languages_backend_contribution_1.LanguagesBackendContribution);
    bind(common_2.LanguageContribution.Service).toService(languages_backend_contribution_1.LanguagesBackendContribution);
    common_1.bindContributionProvider(bind, language_server_contribution_1.LanguageServerContribution);
    bind(common_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new common_1.JsonRpcConnectionHandler(common_2.LanguageContribution.servicePath, function () {
            return ctx.container.get(common_2.LanguageContribution.Service);
        });
    }).inSingletonScope();
    bind(common_1.ILogger).toDynamicValue(function (ctx) {
        var logger = ctx.container.get(common_1.ILogger);
        return logger.child('languages');
    }).inSingletonScope().whenTargetNamed('languages');
});
//# sourceMappingURL=languages-backend-module.js.map