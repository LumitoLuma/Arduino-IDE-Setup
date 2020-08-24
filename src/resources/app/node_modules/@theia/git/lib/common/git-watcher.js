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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitWatcher = exports.GitWatcherPath = exports.ReconnectingGitWatcherServer = exports.GitWatcherServerProxy = exports.GitWatcherServer = exports.GitStatusChangeEvent = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var GitStatusChangeEvent;
(function (GitStatusChangeEvent) {
    /**
     * `true` if the argument is a `GitStatusEvent`, otherwise `false`.
     * @param event the argument to check whether it is a Git status change event or not.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(event) {
        return !!event && ('source' in event) && ('status' in event);
    }
    GitStatusChangeEvent.is = is;
})(GitStatusChangeEvent = exports.GitStatusChangeEvent || (exports.GitStatusChangeEvent = {}));
/**
 * The symbol of the Git watcher backend for DI.
 */
exports.GitWatcherServer = Symbol('GitWatcherServer');
exports.GitWatcherServerProxy = Symbol('GitWatcherServerProxy');
var ReconnectingGitWatcherServer = /** @class */ (function () {
    function ReconnectingGitWatcherServer(proxy) {
        var _this = this;
        this.proxy = proxy;
        this.watcherSequence = 1;
        this.watchParams = new Map();
        this.localToRemoteWatcher = new Map();
        this.proxy.onDidOpenConnection(function () { return _this.reconnect(); });
    }
    ReconnectingGitWatcherServer.prototype.watchGitChanges = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var watcher;
            return __generator(this, function (_a) {
                watcher = this.watcherSequence++;
                this.watchParams.set(watcher, repository);
                return [2 /*return*/, this.doWatchGitChanges([watcher, repository])];
            });
        });
    };
    ReconnectingGitWatcherServer.prototype.unwatchGitChanges = function (watcher) {
        return __awaiter(this, void 0, void 0, function () {
            var remote;
            return __generator(this, function (_a) {
                this.watchParams.delete(watcher);
                remote = this.localToRemoteWatcher.get(watcher);
                if (remote) {
                    this.localToRemoteWatcher.delete(remote);
                    return [2 /*return*/, this.proxy.unwatchGitChanges(remote)];
                }
                else {
                    throw new Error("No Git watchers were registered with ID: " + watcher + ".");
                }
                return [2 /*return*/];
            });
        });
    };
    ReconnectingGitWatcherServer.prototype.dispose = function () {
        this.proxy.dispose();
    };
    ReconnectingGitWatcherServer.prototype.setClient = function (client) {
        this.proxy.setClient(client);
    };
    ReconnectingGitWatcherServer.prototype.reconnect = function () {
        var _this = this;
        __spread(this.watchParams.entries()).forEach(function (entry) { return _this.doWatchGitChanges(entry); });
    };
    ReconnectingGitWatcherServer.prototype.doWatchGitChanges = function (entry) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, watcher, repository, remote;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = __read(entry, 2), watcher = _a[0], repository = _a[1];
                        return [4 /*yield*/, this.proxy.watchGitChanges(repository)];
                    case 1:
                        remote = _b.sent();
                        this.localToRemoteWatcher.set(watcher, remote);
                        return [2 /*return*/, watcher];
                }
            });
        });
    };
    ReconnectingGitWatcherServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.GitWatcherServerProxy)),
        __metadata("design:paramtypes", [Object])
    ], ReconnectingGitWatcherServer);
    return ReconnectingGitWatcherServer;
}());
exports.ReconnectingGitWatcherServer = ReconnectingGitWatcherServer;
/**
 * Unique WS endpoint path to the Git watcher service.
 */
exports.GitWatcherPath = '/services/git-watcher';
var GitWatcher = /** @class */ (function () {
    function GitWatcher(server) {
        var _this = this;
        this.server = server;
        this.toDispose = new common_1.DisposableCollection();
        this.onGitEventEmitter = new common_1.Emitter();
        this.toDispose.push(this.onGitEventEmitter);
        this.server.setClient({ onGitChanged: function (e) { return _this.onGitChanged(e); } });
    }
    GitWatcher.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    Object.defineProperty(GitWatcher.prototype, "onGitEvent", {
        get: function () {
            return this.onGitEventEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    GitWatcher.prototype.onGitChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.onGitEventEmitter.fire(event);
                return [2 /*return*/];
            });
        });
    };
    GitWatcher.prototype.watchGitChanges = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var watcher, toDispose;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.server.watchGitChanges(repository)];
                    case 1:
                        watcher = _a.sent();
                        toDispose = new common_1.DisposableCollection();
                        toDispose.push(common_1.Disposable.create(function () { return _this.server.unwatchGitChanges(watcher); }));
                        return [2 /*return*/, toDispose];
                }
            });
        });
    };
    GitWatcher = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.GitWatcherServer)),
        __metadata("design:paramtypes", [Object])
    ], GitWatcher);
    return GitWatcher;
}());
exports.GitWatcher = GitWatcher;
//# sourceMappingURL=git-watcher.js.map