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
exports.Process = exports.ProcessType = void 0;
var inversify_1 = require("inversify");
var process_manager_1 = require("./process-manager");
var common_1 = require("@theia/core/lib/common");
var node_1 = require("@theia/core/lib/node");
var core_1 = require("@theia/core");
var child_process_1 = require("child_process");
var fs = require("fs");
var ProcessType;
(function (ProcessType) {
    ProcessType[ProcessType["Raw"] = 0] = "Raw";
    ProcessType[ProcessType["Terminal"] = 1] = "Terminal";
})(ProcessType = exports.ProcessType || (exports.ProcessType = {}));
var Process = /** @class */ (function () {
    function Process(processManager, logger, type, options) {
        this.processManager = processManager;
        this.logger = logger;
        this.type = type;
        this.options = options;
        this.startEmitter = new common_1.Emitter();
        this.exitEmitter = new common_1.Emitter();
        this.closeEmitter = new common_1.Emitter();
        this.errorEmitter = new common_1.Emitter();
        this._killed = false;
        this.id = this.processManager.register(this);
        this.initialCwd = options && options.options && 'cwd' in options.options && options.options['cwd'].toString() || __dirname;
    }
    Object.defineProperty(Process.prototype, "killed", {
        get: function () {
            return this._killed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Process.prototype, "onStart", {
        get: function () {
            return this.startEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Process.prototype, "onExit", {
        /**
         * Wait for the process to exit, streams can still emit data.
         */
        get: function () {
            return this.exitEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Process.prototype, "onError", {
        get: function () {
            return this.errorEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Process.prototype, "onClose", {
        /**
         * Waits for both process exit and for all the streams to be closed.
         */
        get: function () {
            return this.closeEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Process.prototype.emitOnStarted = function () {
        this.startEmitter.fire({});
    };
    /**
     * Emit the onExit event for this process.  Only one of code and signal
     * should be defined.
     */
    Process.prototype.emitOnExit = function (code, signal) {
        var exitEvent = { code: code, signal: signal };
        this.handleOnExit(exitEvent);
        this.exitEmitter.fire(exitEvent);
    };
    /**
     * Emit the onClose event for this process.  Only one of code and signal
     * should be defined.
     */
    Process.prototype.emitOnClose = function (code, signal) {
        this.closeEmitter.fire({ code: code, signal: signal });
    };
    Process.prototype.handleOnExit = function (event) {
        this._killed = true;
        var signalSuffix = event.signal ? ", signal: " + event.signal : '';
        var executable = this.isForkOptions(this.options) ? this.options.modulePath : this.options.command;
        this.logger.debug("Process " + this.pid + " has exited with code " + event.code + signalSuffix + ".", executable, this.options.args);
    };
    Process.prototype.emitOnError = function (err) {
        this.handleOnError(err);
        this.errorEmitter.fire(err);
    };
    Process.prototype.emitOnErrorAsync = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                process.nextTick(this.emitOnError.bind(this), error);
                return [2 /*return*/];
            });
        });
    };
    Process.prototype.handleOnError = function (error) {
        this._killed = true;
        this.logger.error(error);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Process.prototype.isForkOptions = function (options) {
        return !!options && !!options.modulePath;
    };
    /**
     * @returns the current working directory as a URI (usually file:// URI)
     */
    Process.prototype.getCwdURI = function () {
        var _this = this;
        if (core_1.isOSX) {
            return new Promise(function (resolve) {
                child_process_1.exec('lsof -p ' + _this.pid + ' | grep cwd', function (error, stdout, stderr) {
                    if (stdout !== '') {
                        resolve(node_1.FileUri.create(stdout.substring(stdout.indexOf('/'), stdout.length - 1)).toString());
                    }
                    else {
                        resolve(node_1.FileUri.create(_this.initialCwd).toString());
                    }
                });
            });
        }
        else if (!core_1.isWindows) {
            return new Promise(function (resolve) {
                fs.readlink('/proc/' + _this.pid + '/cwd', function (err, linkedstr) {
                    if (err || !linkedstr) {
                        resolve(node_1.FileUri.create(_this.initialCwd).toString());
                    }
                    else {
                        resolve(node_1.FileUri.create(linkedstr).toString());
                    }
                });
            });
        }
        else {
            return new Promise(function (resolve) {
                resolve(node_1.FileUri.create(_this.initialCwd).toString());
            });
        }
    };
    Process = __decorate([
        inversify_1.injectable(),
        __param(2, inversify_1.unmanaged()),
        __metadata("design:paramtypes", [process_manager_1.ProcessManager, Object, Number, Object])
    ], Process);
    return Process;
}());
exports.Process = Process;
//# sourceMappingURL=process.js.map