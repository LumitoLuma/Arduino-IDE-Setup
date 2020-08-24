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
exports.DebugAdapterContributionRegistry = void 0;
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var debug_service_1 = require("../common/debug-service");
var debug_model_1 = require("../common/debug-model");
/**
 * Contributions registry.
 */
var DebugAdapterContributionRegistry = /** @class */ (function () {
    function DebugAdapterContributionRegistry() {
    }
    DebugAdapterContributionRegistry.prototype.getContributions = function (debugType) {
        var _a, _b, contribution, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _a = __values(this.contributions.getContributions()), _b = _a.next();
                    _d.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 4];
                    contribution = _b.value;
                    if (!(contribution.type === debugType || contribution.type === '*' || debugType === '*')) return [3 /*break*/, 3];
                    return [4 /*yield*/, contribution];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    };
    DebugAdapterContributionRegistry.prototype.debugTypes = function () {
        var e_2, _a;
        if (!this._debugTypes) {
            var result = new Set();
            try {
                for (var _b = __values(this.contributions.getContributions()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var contribution = _c.value;
                    result.add(contribution.type);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this._debugTypes = __spread(result);
        }
        return this._debugTypes;
    };
    DebugAdapterContributionRegistry.prototype.getDebuggersForLanguage = function (language) {
        return __awaiter(this, void 0, void 0, function () {
            var debuggers, _a, _b, contribution, label, _c, e_3_1;
            var e_3, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        debuggers = [];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 8, 9, 10]);
                        _a = __values(this.contributions.getContributions()), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        contribution = _b.value;
                        if (!(contribution.languages && contribution.label)) return [3 /*break*/, 6];
                        return [4 /*yield*/, contribution.label];
                    case 3:
                        label = _e.sent();
                        _c = label;
                        if (!_c) return [3 /*break*/, 5];
                        return [4 /*yield*/, contribution.languages];
                    case 4:
                        _c = ((_e.sent()) || []).indexOf(language) !== -1;
                        _e.label = 5;
                    case 5:
                        if (_c) {
                            debuggers.push({
                                type: contribution.type,
                                label: label
                            });
                        }
                        _e.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_3_1 = _e.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, debuggers];
                }
            });
        });
    };
    /**
     * Provides initial [debug configuration](#DebugConfiguration).
     * @param debugType The registered debug type
     * @returns An array of [debug configurations](#DebugConfiguration)
     */
    DebugAdapterContributionRegistry.prototype.provideDebugConfigurations = function (debugType, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            var configurations, _a, _b, contribution, result, e_4, e_5_1;
            var e_5, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        configurations = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, 9, 10]);
                        _a = __values(this.getContributions(debugType)), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        contribution = _b.value;
                        if (!contribution.provideDebugConfigurations) return [3 /*break*/, 6];
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, contribution.provideDebugConfigurations(workspaceFolderUri)];
                    case 4:
                        result = _d.sent();
                        configurations.push.apply(configurations, __spread(result));
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
                    case 10: return [2 /*return*/, configurations];
                }
            });
        });
    };
    /**
     * Resolves a [debug configuration](#DebugConfiguration) by filling in missing values
     * or by adding/changing/removing attributes before variable substitution.
     * @param debugConfiguration The [debug configuration](#DebugConfiguration) to resolve.
     * @returns The resolved debug configuration.
     */
    DebugAdapterContributionRegistry.prototype.resolveDebugConfiguration = function (config, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            var current, _a, _b, contribution, next, e_6, e_7_1;
            var e_7, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        current = config;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, 9, 10]);
                        _a = __values(this.getContributions(config.type)), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        contribution = _b.value;
                        if (!contribution.resolveDebugConfiguration) return [3 /*break*/, 6];
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, contribution.resolveDebugConfiguration(config, workspaceFolderUri)];
                    case 4:
                        next = _d.sent();
                        if (next) {
                            current = next;
                        }
                        else {
                            return [2 /*return*/, current];
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
                    case 10: return [2 /*return*/, current];
                }
            });
        });
    };
    /**
     * Resolves a [debug configuration](#DebugConfiguration) by filling in missing values
     * or by adding/changing/removing attributes with substituted variables.
     * @param debugConfiguration The [debug configuration](#DebugConfiguration) to resolve.
     * @returns The resolved debug configuration.
     */
    DebugAdapterContributionRegistry.prototype.resolveDebugConfigurationWithSubstitutedVariables = function (config, workspaceFolderUri) {
        return __awaiter(this, void 0, void 0, function () {
            var current, _a, _b, contribution, next, e_8, e_9_1;
            var e_9, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        current = config;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, 9, 10]);
                        _a = __values(this.getContributions(config.type)), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        contribution = _b.value;
                        if (!contribution.resolveDebugConfigurationWithSubstitutedVariables) return [3 /*break*/, 6];
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, contribution.resolveDebugConfigurationWithSubstitutedVariables(config, workspaceFolderUri)];
                    case 4:
                        next = _d.sent();
                        if (next) {
                            current = next;
                        }
                        else {
                            return [2 /*return*/, current];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_8 = _d.sent();
                        console.error(e_8);
                        return [3 /*break*/, 6];
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_9_1 = _d.sent();
                        e_9 = { error: e_9_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_9) throw e_9.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, current];
                }
            });
        });
    };
    /**
     * Provides schema attributes.
     * @param debugType The registered debug type
     * @returns Schema attributes for the given debug type
     */
    DebugAdapterContributionRegistry.prototype.getSchemaAttributes = function (debugType) {
        return __awaiter(this, void 0, void 0, function () {
            var schemas, _a, _b, contribution, _c, _d, _e, e_10, e_11_1;
            var e_11, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        schemas = [];
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 8, 9, 10]);
                        _a = __values(this.getContributions(debugType)), _b = _a.next();
                        _g.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        contribution = _b.value;
                        if (!contribution.getSchemaAttributes) return [3 /*break*/, 6];
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 5, , 6]);
                        _d = (_c = schemas.push).apply;
                        _e = [schemas];
                        return [4 /*yield*/, contribution.getSchemaAttributes()];
                    case 4:
                        _d.apply(_c, _e.concat([__spread.apply(void 0, [_g.sent()])]));
                        return [3 /*break*/, 6];
                    case 5:
                        e_10 = _g.sent();
                        console.error(e_10);
                        return [3 /*break*/, 6];
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_11_1 = _g.sent();
                        e_11 = { error: e_11_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_11) throw e_11.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, schemas];
                }
            });
        });
    };
    DebugAdapterContributionRegistry.prototype.getConfigurationSnippets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var schemas, _a, _b, contribution, _c, _d, _e, e_12, e_13_1;
            var e_13, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        schemas = [];
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 8, 9, 10]);
                        _a = __values(this.getContributions('*')), _b = _a.next();
                        _g.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        contribution = _b.value;
                        if (!contribution.getConfigurationSnippets) return [3 /*break*/, 6];
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 5, , 6]);
                        _d = (_c = schemas.push).apply;
                        _e = [schemas];
                        return [4 /*yield*/, contribution.getConfigurationSnippets()];
                    case 4:
                        _d.apply(_c, _e.concat([__spread.apply(void 0, [_g.sent()])]));
                        return [3 /*break*/, 6];
                    case 5:
                        e_12 = _g.sent();
                        console.error(e_12);
                        return [3 /*break*/, 6];
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_13_1 = _g.sent();
                        e_13 = { error: e_13_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_13) throw e_13.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, schemas];
                }
            });
        });
    };
    /**
     * Provides a [debug adapter executable](#DebugAdapterExecutable)
     * based on [debug configuration](#DebugConfiguration) to launch a new debug adapter.
     * @param config The resolved [debug configuration](#DebugConfiguration).
     * @returns The [debug adapter executable](#DebugAdapterExecutable).
     */
    DebugAdapterContributionRegistry.prototype.provideDebugAdapterExecutable = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, contribution, executable, e_14_1;
            var e_14, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.getContributions(config.type)), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        contribution = _b.value;
                        if (!contribution.provideDebugAdapterExecutable) return [3 /*break*/, 3];
                        return [4 /*yield*/, contribution.provideDebugAdapterExecutable(config)];
                    case 2:
                        executable = _d.sent();
                        if (executable) {
                            return [2 /*return*/, executable];
                        }
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_14_1 = _d.sent();
                        e_14 = { error: e_14_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_14) throw e_14.error; }
                        return [7 /*endfinally*/];
                    case 7: throw debug_service_1.DebugError.NotFound(config.type);
                }
            });
        });
    };
    /**
     * Returns a [debug adapter session factory](#DebugAdapterSessionFactory).
     * @param debugType The registered debug type
     * @returns An [debug adapter session factory](#DebugAdapterSessionFactory)
     */
    DebugAdapterContributionRegistry.prototype.debugAdapterSessionFactory = function (debugType) {
        var e_15, _a;
        try {
            for (var _b = __values(this.getContributions(debugType)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var contribution = _c.value;
                if (contribution.debugAdapterSessionFactory) {
                    return contribution.debugAdapterSessionFactory;
                }
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_15) throw e_15.error; }
        }
        return undefined;
    };
    __decorate([
        inversify_1.inject(core_1.ContributionProvider),
        inversify_1.named(debug_model_1.DebugAdapterContribution),
        __metadata("design:type", Object)
    ], DebugAdapterContributionRegistry.prototype, "contributions", void 0);
    DebugAdapterContributionRegistry = __decorate([
        inversify_1.injectable()
    ], DebugAdapterContributionRegistry);
    return DebugAdapterContributionRegistry;
}());
exports.DebugAdapterContributionRegistry = DebugAdapterContributionRegistry;
//# sourceMappingURL=debug-adapter-contribution-registry.js.map