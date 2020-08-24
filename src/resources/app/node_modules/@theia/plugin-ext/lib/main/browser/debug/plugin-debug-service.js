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
exports.PluginDebugService = void 0;
var debug_service_1 = require("@theia/debug/lib/common/debug-service");
var disposable_1 = require("@theia/core/lib/common/disposable");
var inversify_1 = require("inversify");
var ws_connection_provider_1 = require("@theia/core/lib/browser/messaging/ws-connection-provider");
var browser_1 = require("@theia/workspace/lib/browser");
/**
 * Debug service to work with plugin and extension contributions.
 */
var PluginDebugService = /** @class */ (function () {
    function PluginDebugService() {
        this.debuggers = [];
        this.contributors = new Map();
        this.toDispose = new disposable_1.DisposableCollection();
        // maps session and contribution
        this.sessionId2contrib = new Map();
    }
    PluginDebugService.prototype.init = function () {
        var _this = this;
        this.delegated = this.connectionProvider.createProxy(debug_service_1.DebugPath);
        this.toDispose.pushAll([
            disposable_1.Disposable.create(function () { return _this.delegated.dispose(); }),
            disposable_1.Disposable.create(function () {
                var e_1, _a;
                try {
                    for (var _b = __values(_this.sessionId2contrib.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var sessionId = _c.value;
                        var contrib = _this.sessionId2contrib.get(sessionId);
                        contrib.terminateDebugSession(sessionId);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.sessionId2contrib.clear();
            })
        ]);
    };
    PluginDebugService.prototype.registerDebugAdapterContribution = function (contrib) {
        var _this = this;
        var type = contrib.type;
        if (this.contributors.has(type)) {
            console.warn("Debugger with type '" + type + "' already registered.");
            return disposable_1.Disposable.NULL;
        }
        this.contributors.set(type, contrib);
        return disposable_1.Disposable.create(function () { return _this.unregisterDebugAdapterContribution(type); });
    };
    PluginDebugService.prototype.unregisterDebugAdapterContribution = function (debugType) {
        this.contributors.delete(debugType);
    };
    PluginDebugService.prototype.debugTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var debugTypes, _a, _b, _c, contribution, _d, _e, debugType;
            var e_2, _f, e_3, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _a = Set.bind;
                        return [4 /*yield*/, this.delegated.debugTypes()];
                    case 1:
                        debugTypes = new (_a.apply(Set, [void 0, _h.sent()]))();
                        try {
                            for (_b = __values(this.debuggers), _c = _b.next(); !_c.done; _c = _b.next()) {
                                contribution = _c.value;
                                debugTypes.add(contribution.type);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_f = _b.return)) _f.call(_b);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        try {
                            for (_d = __values(this.contributors.keys()), _e = _d.next(); !_e.done; _e = _d.next()) {
                                debugType = _e.value;
                                debugTypes.add(debugType);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_g = _d.return)) _g.call(_d);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [2 /*return*/, __spread(debugTypes)];
                }
            });
        });
    };
    PluginDebugService.prototype.provideDebugConfigurations = function (debugType, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            var contributor;
            return __generator(this, function (_a) {
                contributor = this.contributors.get(debugType);
                if (contributor) {
                    return [2 /*return*/, contributor.provideDebugConfigurations && contributor.provideDebugConfigurations(workspaceFolderUri) || []];
                }
                else {
                    return [2 /*return*/, this.delegated.provideDebugConfigurations(debugType, workspaceFolderUri)];
                }
                return [2 /*return*/];
            });
        });
    };
    PluginDebugService.prototype.resolveDebugConfiguration = function (config, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            var resolved, _a, _b, contributor, next, e_4, e_5_1;
            var e_5, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        resolved = config;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, 9, 10]);
                        _a = __values(this.contributors.values()), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        contributor = _b.value;
                        if (!contributor) return [3 /*break*/, 6];
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, contributor.resolveDebugConfiguration(resolved, workspaceFolderUri)];
                    case 4:
                        next = _d.sent();
                        if (next) {
                            resolved = next;
                        }
                        else {
                            return [2 /*return*/, resolved];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_4 = _d.sent();
                        console.error(e_4);
                        return [3 /*break*/, 6];
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_5_1 = _d.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, this.delegated.resolveDebugConfiguration(resolved, workspaceFolderUri)];
                }
            });
        });
    };
    PluginDebugService.prototype.resolveDebugConfigurationWithSubstitutedVariables = function (config, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            var resolved, _a, _b, contributor, next, e_6, e_7_1;
            var e_7, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        resolved = config;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, 9, 10]);
                        _a = __values(this.contributors.values()), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        contributor = _b.value;
                        if (!contributor) return [3 /*break*/, 6];
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, contributor.resolveDebugConfigurationWithSubstitutedVariables(resolved, workspaceFolderUri)];
                    case 4:
                        next = _d.sent();
                        if (next) {
                            resolved = next;
                        }
                        else {
                            return [2 /*return*/, resolved];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_6 = _d.sent();
                        console.error(e_6);
                        return [3 /*break*/, 6];
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_7_1 = _d.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_7) throw e_7.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, this.delegated.resolveDebugConfigurationWithSubstitutedVariables(resolved, workspaceFolderUri)];
                }
            });
        });
    };
    PluginDebugService.prototype.registerDebugger = function (contribution) {
        var _this = this;
        this.debuggers.push(contribution);
        return disposable_1.Disposable.create(function () {
            var index = _this.debuggers.indexOf(contribution);
            if (index !== -1) {
                _this.debuggers.splice(index, 1);
            }
        });
    };
    PluginDebugService.prototype.getDebuggersForLanguage = function (language) {
        return __awaiter(this, void 0, void 0, function () {
            var debuggers, _a, _b, contributor, languages, label, type;
            var e_8, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.delegated.getDebuggersForLanguage(language)];
                    case 1:
                        debuggers = _d.sent();
                        try {
                            for (_a = __values(this.debuggers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                contributor = _b.value;
                                languages = contributor.languages;
                                if (languages && languages.indexOf(language) !== -1) {
                                    label = contributor.label, type = contributor.type;
                                    debuggers.push({ type: type, label: label || type });
                                }
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                        return [2 /*return*/, debuggers];
                }
            });
        });
    };
    PluginDebugService.prototype.getSchemaAttributes = function (debugType) {
        return __awaiter(this, void 0, void 0, function () {
            var schemas, _a, _b, contribution;
            var e_9, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.delegated.getSchemaAttributes(debugType)];
                    case 1:
                        schemas = _d.sent();
                        try {
                            for (_a = __values(this.debuggers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                contribution = _b.value;
                                if (contribution.configurationAttributes &&
                                    (contribution.type === debugType || contribution.type === '*' || debugType === '*')) {
                                    schemas = schemas.concat(contribution.configurationAttributes);
                                }
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                        return [2 /*return*/, schemas];
                }
            });
        });
    };
    PluginDebugService.prototype.getConfigurationSnippets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var snippets, _a, _b, contribution;
            var e_10, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.delegated.getConfigurationSnippets()];
                    case 1:
                        snippets = _d.sent();
                        try {
                            for (_a = __values(this.debuggers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                contribution = _b.value;
                                if (contribution.configurationSnippets) {
                                    snippets = snippets.concat(contribution.configurationSnippets);
                                }
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                        return [2 /*return*/, snippets];
                }
            });
        });
    };
    PluginDebugService.prototype.createDebugSession = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var contributor, sessionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contributor = this.contributors.get(config.type);
                        if (!contributor) return [3 /*break*/, 2];
                        return [4 /*yield*/, contributor.createDebugSession(config)];
                    case 1:
                        sessionId = _a.sent();
                        this.sessionId2contrib.set(sessionId, contributor);
                        return [2 /*return*/, sessionId];
                    case 2: return [2 /*return*/, this.delegated.createDebugSession(config)];
                }
            });
        });
    };
    PluginDebugService.prototype.terminateDebugSession = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var contributor;
            return __generator(this, function (_a) {
                contributor = this.sessionId2contrib.get(sessionId);
                if (contributor) {
                    this.sessionId2contrib.delete(sessionId);
                    return [2 /*return*/, contributor.terminateDebugSession(sessionId)];
                }
                else {
                    return [2 /*return*/, this.delegated.terminateDebugSession(sessionId)];
                }
                return [2 /*return*/];
            });
        });
    };
    PluginDebugService.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    __decorate([
        inversify_1.inject(ws_connection_provider_1.WebSocketConnectionProvider),
        __metadata("design:type", ws_connection_provider_1.WebSocketConnectionProvider)
    ], PluginDebugService.prototype, "connectionProvider", void 0);
    __decorate([
        inversify_1.inject(browser_1.WorkspaceService),
        __metadata("design:type", browser_1.WorkspaceService)
    ], PluginDebugService.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PluginDebugService.prototype, "init", null);
    PluginDebugService = __decorate([
        inversify_1.injectable()
    ], PluginDebugService);
    return PluginDebugService;
}());
exports.PluginDebugService = PluginDebugService;
//# sourceMappingURL=plugin-debug-service.js.map