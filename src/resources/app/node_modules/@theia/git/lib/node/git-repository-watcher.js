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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitRepositoryWatcher = exports.GitRepositoryWatcherOptions = exports.GitRepositoryWatcherFactory = void 0;
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var common_1 = require("../common");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
exports.GitRepositoryWatcherFactory = Symbol('GitRepositoryWatcherFactory');
var GitRepositoryWatcherOptions = /** @class */ (function () {
    function GitRepositoryWatcherOptions() {
    }
    GitRepositoryWatcherOptions = __decorate([
        inversify_1.injectable()
    ], GitRepositoryWatcherOptions);
    return GitRepositoryWatcherOptions;
}());
exports.GitRepositoryWatcherOptions = GitRepositoryWatcherOptions;
var GitRepositoryWatcher = /** @class */ (function () {
    function GitRepositoryWatcher() {
        this.onGitStatusChangedEmitter = new core_1.Emitter();
        this.onGitStatusChanged = this.onGitStatusChangedEmitter.event;
        this.syncWorkPromises = [];
        this.disposed = false;
        this.watching = false;
        this.idle = true;
        this.skipNextIdle = false;
    }
    GitRepositoryWatcher.prototype.init = function () {
        this.spinTheLoop();
    };
    GitRepositoryWatcher.prototype.watch = function () {
        if (this.watching) {
            console.debug('Repository watcher is already active.');
            return;
        }
        this.watching = true;
        this.sync();
    };
    GitRepositoryWatcher.prototype.sync = function () {
        if (this.idle) {
            if (this.interruptIdle) {
                this.interruptIdle();
            }
        }
        else {
            this.skipNextIdle = true;
        }
        var result = new promise_util_1.Deferred();
        this.syncWorkPromises.push(result);
        return result.promise;
    };
    GitRepositoryWatcher.prototype.dispose = function () {
        if (!this.disposed) {
            this.disposed = true;
            if (this.idle) {
                if (this.interruptIdle) {
                    this.interruptIdle();
                }
            }
        }
    };
    GitRepositoryWatcher.prototype.spinTheLoop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function () {
                            var idleTimeout_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!this_1.skipNextIdle) return [3 /*break*/, 1];
                                        this_1.skipNextIdle = false;
                                        return [3 /*break*/, 3];
                                    case 1:
                                        idleTimeout_1 = this_1.watching ? 5000 : /* super long */ 1000 * 60 * 60 * 24;
                                        return [4 /*yield*/, new Promise(function (resolve) {
                                                var id = setTimeout(resolve, idleTimeout_1);
                                                _this.interruptIdle = function () { clearTimeout(id); resolve(); };
                                            }).then(function () {
                                                _this.interruptIdle = undefined;
                                            })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: 
                                    // work
                                    return [4 /*yield*/, this_1.syncStatus()];
                                    case 4:
                                        // work
                                        _a.sent();
                                        this_1.syncWorkPromises.splice(0, this_1.syncWorkPromises.length).forEach(function (d) { return d.resolve(); });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 1;
                    case 1:
                        if (!!this.disposed) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GitRepositoryWatcher.prototype.syncStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var source, oldStatus, newStatus, error_1, localUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        source = this.options.repository;
                        oldStatus = this.status;
                        return [4 /*yield*/, this.git.status(source)];
                    case 1:
                        newStatus = _a.sent();
                        if (!common_1.WorkingDirectoryStatus.equals(newStatus, oldStatus)) {
                            this.status = newStatus;
                            this.onGitStatusChangedEmitter.fire({ source: source, status: newStatus, oldStatus: oldStatus });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        if (!common_1.GitUtils.isRepositoryDoesNotExistError(error_1)) {
                            localUri = this.options.repository.localUri;
                            this.logger.error('Error occurred while synchronizing the status of the repository.', localUri, error_1);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(common_1.Git),
        __metadata("design:type", Object)
    ], GitRepositoryWatcher.prototype, "git", void 0);
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], GitRepositoryWatcher.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(GitRepositoryWatcherOptions),
        __metadata("design:type", GitRepositoryWatcherOptions)
    ], GitRepositoryWatcher.prototype, "options", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], GitRepositoryWatcher.prototype, "init", null);
    GitRepositoryWatcher = __decorate([
        inversify_1.injectable()
    ], GitRepositoryWatcher);
    return GitRepositoryWatcher;
}());
exports.GitRepositoryWatcher = GitRepositoryWatcher;
//# sourceMappingURL=git-repository-watcher.js.map