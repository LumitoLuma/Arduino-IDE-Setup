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
exports.DugiteGitWatcherServer = void 0;
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var git_repository_manager_1 = require("./git-repository-manager");
var DugiteGitWatcherServer = /** @class */ (function () {
    function DugiteGitWatcherServer(manager) {
        this.manager = manager;
        this.watcherSequence = 1;
        this.watchers = new Map();
        this.subscriptions = new Map();
    }
    DugiteGitWatcherServer.prototype.dispose = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.watchers.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var watcher = _c.value;
                watcher.dispose();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.watchers.clear();
        this.subscriptions.clear();
    };
    DugiteGitWatcherServer.prototype.watchGitChanges = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, watcher, repositoryUri, subscriptions, unsubscribe_1, watcherId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.manager.getWatcher(repository)];
                    case 1:
                        reference = _a.sent();
                        watcher = reference.object;
                        repositoryUri = repository.localUri;
                        subscriptions = this.subscriptions.get(repositoryUri);
                        if (subscriptions === undefined) {
                            unsubscribe_1 = watcher.onGitStatusChanged(function (e) {
                                if (_this.client) {
                                    _this.client.onGitChanged(e);
                                }
                            });
                            subscriptions = new core_1.DisposableCollection();
                            subscriptions.onDispose(function () {
                                unsubscribe_1.dispose();
                                _this.subscriptions.delete(repositoryUri);
                            });
                            this.subscriptions.set(repositoryUri, subscriptions);
                        }
                        watcher.watch();
                        subscriptions.push(reference);
                        watcherId = this.watcherSequence++;
                        this.watchers.set(watcherId, reference);
                        return [2 /*return*/, watcherId];
                }
            });
        });
    };
    DugiteGitWatcherServer.prototype.unwatchGitChanges = function (watcher) {
        return __awaiter(this, void 0, void 0, function () {
            var disposable;
            return __generator(this, function (_a) {
                disposable = this.watchers.get(watcher);
                if (disposable) {
                    disposable.dispose();
                    this.watchers.delete(watcher);
                }
                else {
                    throw new Error("No Git watchers were registered with ID: " + watcher + ".");
                }
                return [2 /*return*/];
            });
        });
    };
    DugiteGitWatcherServer.prototype.setClient = function (client) {
        this.client = client;
    };
    DugiteGitWatcherServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(git_repository_manager_1.GitRepositoryManager)),
        __metadata("design:paramtypes", [git_repository_manager_1.GitRepositoryManager])
    ], DugiteGitWatcherServer);
    return DugiteGitWatcherServer;
}());
exports.DugiteGitWatcherServer = DugiteGitWatcherServer;
//# sourceMappingURL=dugite-git-watcher.js.map