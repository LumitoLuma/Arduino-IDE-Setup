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
exports.IPCConnectionProvider = void 0;
var path = require("path");
var cp = require("child_process");
var inversify_1 = require("inversify");
var vscode_jsonrpc_1 = require("vscode-jsonrpc");
var common_1 = require("../../common");
var ipc_protocol_1 = require("./ipc-protocol");
var IPCConnectionProvider = /** @class */ (function () {
    function IPCConnectionProvider() {
    }
    IPCConnectionProvider.prototype.listen = function (options, acceptor) {
        return this.doListen(__assign({ logger: this.logger, args: [] }, options), acceptor);
    };
    IPCConnectionProvider.prototype.doListen = function (options, acceptor) {
        var _this = this;
        var childProcess = this.fork(options);
        var connection = this.createConnection(childProcess, options);
        var toStop = new common_1.DisposableCollection();
        var toCancelStop = toStop.push(common_1.Disposable.create(function () { return childProcess.kill(); }));
        var errorHandler = options.errorHandler;
        if (errorHandler) {
            connection.onError(function (e) {
                if (errorHandler.shouldStop(e[0], e[1], e[2])) {
                    toStop.dispose();
                }
            });
            connection.onClose(function () {
                if (toStop.disposed) {
                    return;
                }
                if (errorHandler.shouldRestart()) {
                    toCancelStop.dispose();
                    toStop.push(_this.doListen(options, acceptor));
                }
            });
        }
        acceptor(connection);
        return toStop;
    };
    IPCConnectionProvider.prototype.createConnection = function (childProcess, options) {
        var _this = this;
        var reader = new vscode_jsonrpc_1.IPCMessageReader(childProcess);
        var writer = new vscode_jsonrpc_1.IPCMessageWriter(childProcess);
        var connection = vscode_jsonrpc_1.createMessageConnection(reader, writer, {
            error: function (message) { return _this.logger.error("[" + options.serverName + ": " + childProcess.pid + "] " + message); },
            warn: function (message) { return _this.logger.warn("[" + options.serverName + ": " + childProcess.pid + "] " + message); },
            info: function (message) { return _this.logger.info("[" + options.serverName + ": " + childProcess.pid + "] " + message); },
            log: function (message) { return _this.logger.info("[" + options.serverName + ": " + childProcess.pid + "] " + message); }
        });
        connection.trace(vscode_jsonrpc_1.Trace.Off, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            log: function (message, data) { return _this.logger.info("[" + options.serverName + ": " + childProcess.pid + "] " + message + (typeof data === 'string' ? ' ' + data : '')); }
        });
        return connection;
    };
    IPCConnectionProvider.prototype.fork = function (options) {
        var _this = this;
        var forkOptions = {
            silent: true,
            env: ipc_protocol_1.createIpcEnv(options),
            execArgv: []
        };
        var inspectArgPrefix = "--" + options.serverName + "-inspect";
        var inspectArg = process.argv.find(function (v) { return v.startsWith(inspectArgPrefix); });
        if (inspectArg !== undefined) {
            forkOptions.execArgv = ['--nolazy', "--inspect" + inspectArg.substr(inspectArgPrefix.length)];
        }
        var childProcess = cp.fork(path.resolve(__dirname, 'ipc-bootstrap.js'), options.args, forkOptions);
        childProcess.stdout.on('data', function (data) { return _this.logger.info("[" + options.serverName + ": " + childProcess.pid + "] " + data.toString().trim()); });
        childProcess.stderr.on('data', function (data) { return _this.logger.error("[" + options.serverName + ": " + childProcess.pid + "] " + data.toString().trim()); });
        this.logger.debug("[" + options.serverName + ": " + childProcess.pid + "] IPC started");
        childProcess.once('exit', function () { return _this.logger.debug("[" + options.serverName + ": " + childProcess.pid + "] IPC exited"); });
        return childProcess;
    };
    __decorate([
        inversify_1.inject(common_1.ILogger),
        __metadata("design:type", Object)
    ], IPCConnectionProvider.prototype, "logger", void 0);
    IPCConnectionProvider = __decorate([
        inversify_1.injectable()
    ], IPCConnectionProvider);
    return IPCConnectionProvider;
}());
exports.IPCConnectionProvider = IPCConnectionProvider;
//# sourceMappingURL=ipc-connection-provider.js.map