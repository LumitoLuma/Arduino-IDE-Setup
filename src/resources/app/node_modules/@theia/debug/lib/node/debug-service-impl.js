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
exports.DebugServiceImpl = void 0;
var inversify_1 = require("inversify");
var debug_adapter_session_manager_1 = require("./debug-adapter-session-manager");
var debug_adapter_contribution_registry_1 = require("./debug-adapter-contribution-registry");
/**
 * DebugService implementation.
 */
var DebugServiceImpl = /** @class */ (function () {
    function DebugServiceImpl() {
        this.sessions = new Set();
    }
    DebugServiceImpl.prototype.dispose = function () {
        this.terminateDebugSession();
    };
    DebugServiceImpl.prototype.debugTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registry.debugTypes()];
            });
        });
    };
    DebugServiceImpl.prototype.getDebuggersForLanguage = function (language) {
        return this.registry.getDebuggersForLanguage(language);
    };
    DebugServiceImpl.prototype.getSchemaAttributes = function (debugType) {
        return this.registry.getSchemaAttributes(debugType);
    };
    DebugServiceImpl.prototype.getConfigurationSnippets = function () {
        return this.registry.getConfigurationSnippets();
    };
    DebugServiceImpl.prototype.provideDebugConfigurations = function (debugType, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registry.provideDebugConfigurations(debugType, workspaceFolderUri)];
            });
        });
    };
    DebugServiceImpl.prototype.resolveDebugConfiguration = function (config, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registry.resolveDebugConfiguration(config, workspaceFolderUri)];
            });
        });
    };
    DebugServiceImpl.prototype.resolveDebugConfigurationWithSubstitutedVariables = function (config, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registry.resolveDebugConfigurationWithSubstitutedVariables(config, workspaceFolderUri)];
            });
        });
    };
    DebugServiceImpl.prototype.createDebugSession = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionManager.create(config, this.registry)];
                    case 1:
                        session = _a.sent();
                        this.sessions.add(session.id);
                        return [2 /*return*/, session.id];
                }
            });
        });
    };
    DebugServiceImpl.prototype.terminateDebugSession = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, sessions, _loop_1, sessions_1, sessions_1_1, session;
            var e_1, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!sessionId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.doStop(sessionId)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        promises = [];
                        sessions = __spread(this.sessions);
                        this.sessions.clear();
                        _loop_1 = function (session) {
                            promises.push((function () { return __awaiter(_this, void 0, void 0, function () {
                                var e_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.doStop(session)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            e_2 = _a.sent();
                                            console.error(e_2);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })());
                        };
                        try {
                            for (sessions_1 = __values(sessions), sessions_1_1 = sessions_1.next(); !sessions_1_1.done; sessions_1_1 = sessions_1.next()) {
                                session = sessions_1_1.value;
                                _loop_1(session);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (sessions_1_1 && !sessions_1_1.done && (_a = sessions_1.return)) _a.call(sessions_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DebugServiceImpl.prototype.doStop = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var debugSession;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugSession = this.sessionManager.find(sessionId);
                        if (!debugSession) return [3 /*break*/, 2];
                        this.sessionManager.remove(sessionId);
                        this.sessions.delete(sessionId);
                        return [4 /*yield*/, debugSession.stop()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(debug_adapter_session_manager_1.DebugAdapterSessionManager),
        __metadata("design:type", debug_adapter_session_manager_1.DebugAdapterSessionManager)
    ], DebugServiceImpl.prototype, "sessionManager", void 0);
    __decorate([
        inversify_1.inject(debug_adapter_contribution_registry_1.DebugAdapterContributionRegistry),
        __metadata("design:type", debug_adapter_contribution_registry_1.DebugAdapterContributionRegistry)
    ], DebugServiceImpl.prototype, "registry", void 0);
    DebugServiceImpl = __decorate([
        inversify_1.injectable()
    ], DebugServiceImpl);
    return DebugServiceImpl;
}());
exports.DebugServiceImpl = DebugServiceImpl;
//# sourceMappingURL=debug-service-impl.js.map