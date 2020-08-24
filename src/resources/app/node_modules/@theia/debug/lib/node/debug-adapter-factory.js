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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugAdapterSessionFactoryImpl = exports.LaunchBasedDebugAdapterFactory = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Some entities copied and modified from https://github.com/Microsoft/vscode-debugadapter-node/blob/master/adapter/src/protocol.ts
var net = require("net");
var inversify_1 = require("inversify");
var node_1 = require("@theia/process/lib/node");
var debug_adapter_session_1 = require("./debug-adapter-session");
var application_package_1 = require("@theia/application-package");
/**
 * [DebugAdapterFactory](#DebugAdapterFactory) implementation based on
 * launching the debug adapter as separate process.
 */
var LaunchBasedDebugAdapterFactory = /** @class */ (function () {
    function LaunchBasedDebugAdapterFactory() {
    }
    LaunchBasedDebugAdapterFactory.prototype.start = function (executable) {
        var process = this.childProcess(executable);
        // FIXME: propagate onError + onExit
        return {
            input: process.inputStream,
            output: process.outputStream,
            dispose: function () { return process.kill(); }
        };
    };
    LaunchBasedDebugAdapterFactory.prototype.childProcess = function (executable) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var isForkOptions = function (forkOptions) {
            return !!forkOptions && !!forkOptions.modulePath;
        };
        var processOptions = __assign({}, executable);
        var options = { stdio: ['pipe', 'pipe', 2] };
        if (isForkOptions(processOptions)) {
            options.stdio.push('ipc');
            options.env = application_package_1.environment.electron.runAsNodeEnv();
            options.execArgv = executable.execArgv;
        }
        processOptions.options = options;
        return this.processFactory(processOptions);
    };
    LaunchBasedDebugAdapterFactory.prototype.connect = function (debugServerPort) {
        var socket = net.createConnection(debugServerPort);
        // FIXME: propagate socket.on('error', ...) + socket.on('close', ...)
        return {
            input: socket,
            output: socket,
            dispose: function () { return socket.end(); }
        };
    };
    __decorate([
        inversify_1.inject(node_1.RawProcessFactory),
        __metadata("design:type", Function)
    ], LaunchBasedDebugAdapterFactory.prototype, "processFactory", void 0);
    __decorate([
        inversify_1.inject(node_1.ProcessManager),
        __metadata("design:type", node_1.ProcessManager)
    ], LaunchBasedDebugAdapterFactory.prototype, "processManager", void 0);
    LaunchBasedDebugAdapterFactory = __decorate([
        inversify_1.injectable()
    ], LaunchBasedDebugAdapterFactory);
    return LaunchBasedDebugAdapterFactory;
}());
exports.LaunchBasedDebugAdapterFactory = LaunchBasedDebugAdapterFactory;
/**
 * [DebugAdapterSessionFactory](#DebugAdapterSessionFactory) implementation.
 */
var DebugAdapterSessionFactoryImpl = /** @class */ (function () {
    function DebugAdapterSessionFactoryImpl() {
    }
    DebugAdapterSessionFactoryImpl.prototype.get = function (sessionId, communicationProvider) {
        return new debug_adapter_session_1.DebugAdapterSessionImpl(sessionId, communicationProvider);
    };
    DebugAdapterSessionFactoryImpl = __decorate([
        inversify_1.injectable()
    ], DebugAdapterSessionFactoryImpl);
    return DebugAdapterSessionFactoryImpl;
}());
exports.DebugAdapterSessionFactoryImpl = DebugAdapterSessionFactoryImpl;
//# sourceMappingURL=debug-adapter-factory.js.map