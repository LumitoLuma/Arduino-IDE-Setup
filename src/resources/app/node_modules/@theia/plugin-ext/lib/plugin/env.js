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
exports.EnvExtImpl = void 0;
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var uuid_1 = require("uuid");
var EnvExtImpl = /** @class */ (function () {
    function EnvExtImpl(rpc) {
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.ENV_MAIN);
        this.envSessionId = uuid_1.v4();
        this.envMachineId = uuid_1.v4();
    }
    EnvExtImpl.prototype.getEnvVariable = function (envVarName) {
        return this.proxy.$getEnvVariable(envVarName).then(function (x) {
            if (x === null) {
                return undefined;
            }
            return x;
        });
    };
    EnvExtImpl.prototype.getQueryParameter = function (queryParamName) {
        return this.queryParameters[queryParamName];
    };
    EnvExtImpl.prototype.getQueryParameters = function () {
        return this.queryParameters;
    };
    EnvExtImpl.prototype.setQueryParameters = function (queryParams) {
        this.queryParameters = queryParams;
    };
    EnvExtImpl.prototype.setApplicationName = function (applicationName) {
        this.applicationName = applicationName;
    };
    EnvExtImpl.prototype.setLanguage = function (lang) {
        this.lang = lang;
    };
    EnvExtImpl.prototype.setShell = function (shell) {
        this.defaultShell = shell;
    };
    EnvExtImpl.prototype.setUIKind = function (uiKind) {
        this.ui = uiKind;
    };
    EnvExtImpl.prototype.getClientOperatingSystem = function () {
        return this.proxy.$getClientOperatingSystem();
    };
    Object.defineProperty(EnvExtImpl.prototype, "appName", {
        get: function () {
            return this.applicationName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvExtImpl.prototype, "language", {
        get: function () {
            return this.lang;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvExtImpl.prototype, "machineId", {
        get: function () {
            return this.envMachineId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvExtImpl.prototype, "sessionId", {
        get: function () {
            return this.envSessionId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvExtImpl.prototype, "uriScheme", {
        get: function () {
            return 'theia';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvExtImpl.prototype, "shell", {
        get: function () {
            return this.defaultShell;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvExtImpl.prototype, "uiKind", {
        get: function () {
            return this.ui;
        },
        enumerable: false,
        configurable: true
    });
    return EnvExtImpl;
}());
exports.EnvExtImpl = EnvExtImpl;
//# sourceMappingURL=env.js.map