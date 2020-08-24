"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
exports.ConnectionContainerModule = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var inversify_1 = require("inversify");
var common_1 = require("../../common");
/**
 * ### Connection Container Module
 *
 * It provides bindings which are scoped per a connection, e.g.
 * in order to allow backend services to access frontend service within the same connection.
 *
 * #### Binding a frontend service
 * ```ts
 * const myConnectionModule = ConnectionContainerModule.create(({ bindFrontendService }) => {
 *   bindFrontendService(myFrontendServicePath, MyFrontendService);
 * });
 *
 * export const myBackendApplicationModule = new ContainerModule(bind => {
 *   bind(ConnectionContainerModule).toConstantValue(myConnectionModule);
 * }
 * ```
 *
 * #### Exposing a backend service
 * ```ts
 * const myConnectionModule2 = ConnectionContainerModule.create(({ bind, bindBackendService }) => {
 *   bind(MyBackendService).toSelf().inSingletonScope();
 *   bindBackendService(myBackendServicePath, MyBackendService);
 * });
 *
 * export const myBackendApplicationModule2 = new ContainerModule(bind => {
 *   bind(ConnectionContainerModule).toConstantValue(myConnectionModule2);
 * }
 * ```
 *
 * #### Injecting a frontend service
 * ```ts
 * @injectable()
 * export class MyBackendService {
 *     @inject(MyFrontendService)
 *     protected readonly myFrontendService: MyFrontendService;
 * }
 * ```
 */
exports.ConnectionContainerModule = Object.assign(Symbol('ConnectionContainerModule'), {
    create: function (callback) {
        return new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
            var bindFrontendService = function (path, serviceIdentifier) {
                var serviceFactory = new common_1.JsonRpcProxyFactory();
                var service = serviceFactory.createProxy();
                bind(common_1.ConnectionHandler).toConstantValue({
                    path: path,
                    onConnection: function (connection) { return serviceFactory.listen(connection); }
                });
                return bind(serviceIdentifier).toConstantValue(service);
            };
            var bindBackendService = function (path, serviceIdentifier, onActivation) {
                bind(common_1.ConnectionHandler).toDynamicValue(function (context) {
                    return new common_1.JsonRpcConnectionHandler(path, function (proxy) {
                        var service = context.container.get(serviceIdentifier);
                        return onActivation ? onActivation(service, proxy) : service;
                    });
                }).inSingletonScope();
            };
            callback({ bind: bind, unbind: unbind, isBound: isBound, rebind: rebind, bindFrontendService: bindFrontendService, bindBackendService: bindBackendService });
        });
    }
});
//# sourceMappingURL=connection-container-module.js.map