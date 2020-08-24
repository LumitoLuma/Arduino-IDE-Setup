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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostedPluginProcess = exports.HostedPluginProcessConfiguration = void 0;
var cp = require("child_process");
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var ipc_protocol_1 = require("@theia/core/lib/node/messaging/ipc-protocol");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var hosted_plugin_cli_contribution_1 = require("./hosted-plugin-cli-contribution");
var psTree = require("ps-tree");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
exports.HostedPluginProcessConfiguration = Symbol('HostedPluginProcessConfiguration');
var HostedPluginProcess = /** @class */ (function () {
    function HostedPluginProcess() {
        this.terminatingPluginServer = false;
        this.HOSTED_PLUGIN_ENV_REGEXP_EXCLUSION = new RegExp('HOSTED_PLUGIN*');
    }
    HostedPluginProcess.prototype.setClient = function (client) {
        if (this.client) {
            if (this.childProcess) {
                this.runPluginServer();
            }
        }
        this.client = client;
    };
    HostedPluginProcess.prototype.clientClosed = function () {
    };
    HostedPluginProcess.prototype.setDefault = function (defaultRunner) {
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    HostedPluginProcess.prototype.acceptMessage = function (jsonMessage) {
        return jsonMessage.type !== undefined && jsonMessage.id;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    HostedPluginProcess.prototype.onMessage = function (jsonMessage) {
        if (this.childProcess) {
            this.childProcess.send(JSON.stringify(jsonMessage));
        }
    };
    HostedPluginProcess.prototype.terminatePluginServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cp, waitForTerminated, stopTimeout, terminateTimeout;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.childProcess === undefined) {
                            return [2 /*return*/];
                        }
                        this.terminatingPluginServer = true;
                        cp = this.childProcess;
                        this.childProcess = undefined;
                        waitForTerminated = new promise_util_1.Deferred();
                        cp.on('message', function (message) {
                            var msg = JSON.parse(message);
                            if ('type' in msg && msg.type === 6 /* Terminated */) {
                                waitForTerminated.resolve();
                            }
                        });
                        stopTimeout = this.cli.pluginHostStopTimeout;
                        cp.send(JSON.stringify({ type: 5 /* Terminate */, stopTimeout: stopTimeout }));
                        terminateTimeout = this.cli.pluginHostTerminateTimeout;
                        if (!terminateTimeout) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.race([
                                waitForTerminated.promise,
                                new Promise(function (resolve) { return setTimeout(resolve, terminateTimeout); })
                            ])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, waitForTerminated.promise];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.killProcessTree(cp.pid);
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginProcess.prototype.killProcessTree = function (parentPid) {
        var _this = this;
        psTree(parentPid, function (_, childProcesses) {
            childProcesses.forEach(function (childProcess) {
                return _this.killProcess(parseInt(childProcess.PID));
            });
            _this.killProcess(parentPid);
        });
    };
    HostedPluginProcess.prototype.killProcess = function (pid) {
        try {
            process.kill(pid);
        }
        catch (e) {
            if (e && 'code' in e && e.code === 'ESRCH') {
                return;
            }
            this.logger.error("[" + pid + "] failed to kill", e);
        }
    };
    HostedPluginProcess.prototype.runPluginServer = function () {
        var _this = this;
        if (this.childProcess) {
            this.terminatePluginServer();
        }
        this.terminatingPluginServer = false;
        this.childProcess = this.fork({
            serverName: 'hosted-plugin',
            logger: this.logger,
            args: []
        });
        this.childProcess.on('message', function (message) {
            if (_this.client) {
                _this.client.postMessage(message);
            }
        });
    };
    HostedPluginProcess.prototype.fork = function (options) {
        var e_1, _a;
        var _this = this;
        // create env and add PATH to it so any executable from root process is available
        var env = ipc_protocol_1.createIpcEnv({ env: process.env });
        try {
            for (var _b = __values(Object.keys(env)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (this.HOSTED_PLUGIN_ENV_REGEXP_EXCLUSION.test(key)) {
                    delete env[key];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // apply external env variables
        this.pluginHostEnvironmentVariables.getContributions().forEach(function (envVar) { return envVar.process(env); });
        if (this.cli.extensionTestsPath) {
            env.extensionTestsPath = this.cli.extensionTestsPath;
        }
        var forkOptions = {
            silent: true,
            env: env,
            execArgv: [],
            stdio: ['pipe', 'pipe', 'pipe', 'ipc']
        };
        var inspectArgPrefix = "--" + options.serverName + "-inspect";
        var inspectArg = process.argv.find(function (v) { return v.startsWith(inspectArgPrefix); });
        if (inspectArg !== undefined) {
            forkOptions.execArgv = ['--nolazy', "--inspect" + inspectArg.substr(inspectArgPrefix.length)];
        }
        var childProcess = cp.fork(this.configuration.path, options.args, forkOptions);
        childProcess.stdout.on('data', function (data) { return _this.logger.info("[" + options.serverName + ": " + childProcess.pid + "] " + data.toString().trim()); });
        childProcess.stderr.on('data', function (data) { return _this.logger.error("[" + options.serverName + ": " + childProcess.pid + "] " + data.toString().trim()); });
        this.logger.debug("[" + options.serverName + ": " + childProcess.pid + "] IPC started");
        childProcess.once('exit', function (code, signal) { return _this.onChildProcessExit(options.serverName, childProcess.pid, code, signal); });
        childProcess.on('error', function (err) { return _this.onChildProcessError(err); });
        return childProcess;
    };
    HostedPluginProcess.prototype.onChildProcessExit = function (serverName, pid, code, signal) {
        if (this.terminatingPluginServer) {
            return;
        }
        this.logger.error("[" + serverName + ": " + pid + "] IPC exited, with signal: " + signal + ", and exit code: " + code);
        var message = 'Plugin runtime crashed unexpectedly, all plugins are not working, please reload the page.';
        var hintMessage = 'If it doesn\'t help, please check Theia server logs.';
        if (signal && signal.toUpperCase() === 'SIGKILL') {
            // May happen in case of OOM or manual force stop.
            hintMessage = 'Probably there is not enough memory for the plugins. ' + hintMessage;
        }
        this.messageService.error(message + ' ' + hintMessage, { timeout: 15 * 60 * 1000 });
    };
    HostedPluginProcess.prototype.onChildProcessError = function (err) {
        this.logger.error("Error from plugin host: " + err.message);
    };
    /**
     * Provides additional plugin ids.
     */
    HostedPluginProcess.prototype.getExtraDeployedPluginIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    /**
     * Provides additional deployed plugins.
     */
    HostedPluginProcess.prototype.getExtraDeployedPlugins = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    __decorate([
        inversify_1.inject(exports.HostedPluginProcessConfiguration),
        __metadata("design:type", Object)
    ], HostedPluginProcess.prototype, "configuration", void 0);
    __decorate([
        inversify_1.inject(common_1.ILogger),
        __metadata("design:type", Object)
    ], HostedPluginProcess.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(hosted_plugin_cli_contribution_1.HostedPluginCliContribution),
        __metadata("design:type", hosted_plugin_cli_contribution_1.HostedPluginCliContribution)
    ], HostedPluginProcess.prototype, "cli", void 0);
    __decorate([
        inversify_1.inject(common_1.ContributionProvider),
        inversify_1.named(plugin_protocol_1.PluginHostEnvironmentVariable),
        __metadata("design:type", Object)
    ], HostedPluginProcess.prototype, "pluginHostEnvironmentVariables", void 0);
    __decorate([
        inversify_1.inject(common_1.MessageService),
        __metadata("design:type", common_1.MessageService)
    ], HostedPluginProcess.prototype, "messageService", void 0);
    HostedPluginProcess = __decorate([
        inversify_1.injectable()
    ], HostedPluginProcess);
    return HostedPluginProcess;
}());
exports.HostedPluginProcess = HostedPluginProcess;
//# sourceMappingURL=hosted-plugin-process.js.map