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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTerminalServer = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var node_1 = require("@theia/process/lib/node");
var shell_process_1 = require("./shell-process");
var BaseTerminalServer = /** @class */ (function () {
    function BaseTerminalServer(processManager, logger) {
        var _this = this;
        this.processManager = processManager;
        this.logger = logger;
        this.client = undefined;
        this.terminalToDispose = new Map();
        processManager.onDelete(function (id) {
            var toDispose = _this.terminalToDispose.get(id);
            if (toDispose !== undefined) {
                toDispose.dispose();
                _this.terminalToDispose.delete(id);
            }
        });
    }
    BaseTerminalServer.prototype.attach = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var term;
            return __generator(this, function (_a) {
                term = this.processManager.get(id);
                if (term && term instanceof node_1.TerminalProcess) {
                    return [2 /*return*/, term.id];
                }
                else {
                    this.logger.error("Couldn't attach - can't find terminal with id: " + id + " ");
                    return [2 /*return*/, -1];
                }
                return [2 /*return*/];
            });
        });
    };
    BaseTerminalServer.prototype.getProcessId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var terminal;
            return __generator(this, function (_a) {
                terminal = this.processManager.get(id);
                if (!(terminal instanceof node_1.TerminalProcess)) {
                    throw new Error("terminal \"" + id + "\" does not exist");
                }
                return [2 /*return*/, terminal.pid];
            });
        });
    };
    BaseTerminalServer.prototype.getProcessInfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var terminal;
            return __generator(this, function (_a) {
                terminal = this.processManager.get(id);
                if (!(terminal instanceof node_1.TerminalProcess)) {
                    throw new Error("terminal \"" + id + "\" does not exist");
                }
                return [2 /*return*/, {
                        executable: terminal.executable,
                        arguments: terminal.arguments,
                    }];
            });
        });
    };
    BaseTerminalServer.prototype.getCwdURI = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var terminal;
            return __generator(this, function (_a) {
                terminal = this.processManager.get(id);
                if (!(terminal instanceof node_1.TerminalProcess)) {
                    throw new Error("terminal \"" + id + "\" does not exist");
                }
                return [2 /*return*/, terminal.getCwdURI()];
            });
        });
    };
    BaseTerminalServer.prototype.close = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var term;
            return __generator(this, function (_a) {
                term = this.processManager.get(id);
                if (term instanceof node_1.TerminalProcess) {
                    term.kill();
                }
                return [2 /*return*/];
            });
        });
    };
    BaseTerminalServer.prototype.getDefaultShell = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, shell_process_1.ShellProcess.getShellExecutablePath()];
            });
        });
    };
    BaseTerminalServer.prototype.dispose = function () {
        // noop
    };
    BaseTerminalServer.prototype.resize = function (id, cols, rows) {
        return __awaiter(this, void 0, void 0, function () {
            var term;
            return __generator(this, function (_a) {
                term = this.processManager.get(id);
                if (term && term instanceof node_1.TerminalProcess) {
                    term.resize(cols, rows);
                }
                else {
                    console.error("Couldn't resize terminal " + id + ", because it doesn't exist.");
                }
                return [2 /*return*/];
            });
        });
    };
    /* Set the client to receive notifications on.  */
    BaseTerminalServer.prototype.setClient = function (client) {
        this.client = client;
    };
    BaseTerminalServer.prototype.postCreate = function (term) {
        var _this = this;
        var toDispose = new common_1.DisposableCollection();
        toDispose.push(term.onError(function (error) {
            _this.logger.error("Terminal pid: " + term.pid + " error: " + error + ", closing it.");
            if (_this.client !== undefined) {
                _this.client.onTerminalError({
                    'terminalId': term.id,
                    'error': new Error("Failed to execute terminal process (" + error.code + ")"),
                });
            }
        }));
        toDispose.push(term.onExit(function (event) {
            if (_this.client !== undefined) {
                _this.client.onTerminalExitChanged({
                    'terminalId': term.id,
                    'code': event.code,
                    'signal': event.signal
                });
            }
        }));
        this.terminalToDispose.set(term.id, toDispose);
    };
    BaseTerminalServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(node_1.ProcessManager)),
        __param(1, inversify_1.inject(common_1.ILogger)), __param(1, inversify_1.named('terminal')),
        __metadata("design:paramtypes", [node_1.ProcessManager, Object])
    ], BaseTerminalServer);
    return BaseTerminalServer;
}());
exports.BaseTerminalServer = BaseTerminalServer;
//# sourceMappingURL=base-terminal-server.js.map