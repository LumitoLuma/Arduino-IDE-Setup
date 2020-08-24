(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[62],{

/***/ "./node_modules/@theia/preferences/lib/browser/folder-preference-provider.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@theia/preferences/lib/browser/folder-preference-provider.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.FolderPreferenceProvider = exports.FolderPreferenceProviderFolder = exports.FolderPreferenceProviderFactory = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var common_1 = __webpack_require__(/*! @theia/filesystem/lib/common */ "./node_modules/@theia/filesystem/lib/common/index.js");
var workspace_service_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-service */ "./node_modules/@theia/workspace/lib/browser/workspace-service.js");
var section_preference_provider_1 = __webpack_require__(/*! ./section-preference-provider */ "./node_modules/@theia/preferences/lib/browser/section-preference-provider.js");
exports.FolderPreferenceProviderFactory = Symbol('FolderPreferenceProviderFactory');
exports.FolderPreferenceProviderFolder = Symbol('FolderPreferenceProviderFolder');
var FolderPreferenceProvider = /** @class */ (function (_super) {
    __extends(FolderPreferenceProvider, _super);
    function FolderPreferenceProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FolderPreferenceProvider.prototype, "folderUri", {
        get: function () {
            if (!this._folderUri) {
                this._folderUri = new uri_1.default(this.folder.uri);
            }
            return this._folderUri;
        },
        enumerable: false,
        configurable: true
    });
    FolderPreferenceProvider.prototype.getScope = function () {
        if (!this.workspaceService.isMultiRootWorkspaceOpened) {
            // when FolderPreferenceProvider is used as a delegate of WorkspacePreferenceProvider in a one-folder workspace
            return browser_1.PreferenceScope.Workspace;
        }
        return browser_1.PreferenceScope.Folder;
    };
    FolderPreferenceProvider.prototype.getDomain = function () {
        return [this.folderUri.toString()];
    };
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], FolderPreferenceProvider.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(exports.FolderPreferenceProviderFolder),
        __metadata("design:type", Object)
    ], FolderPreferenceProvider.prototype, "folder", void 0);
    FolderPreferenceProvider = __decorate([
        inversify_1.injectable()
    ], FolderPreferenceProvider);
    return FolderPreferenceProvider;
}(section_preference_provider_1.SectionPreferenceProvider));
exports.FolderPreferenceProvider = FolderPreferenceProvider;


/***/ }),

/***/ "./node_modules/@theia/preferences/lib/browser/folders-preferences-provider.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@theia/preferences/lib/browser/folders-preferences-provider.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.FoldersPreferencesProvider = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var preference_provider_1 = __webpack_require__(/*! @theia/core/lib/browser/preferences/preference-provider */ "./node_modules/@theia/core/lib/browser/preferences/preference-provider.js");
var workspace_service_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-service */ "./node_modules/@theia/workspace/lib/browser/workspace-service.js");
var preference_configurations_1 = __webpack_require__(/*! @theia/core/lib/browser/preferences/preference-configurations */ "./node_modules/@theia/core/lib/browser/preferences/preference-configurations.js");
var folder_preference_provider_1 = __webpack_require__(/*! ./folder-preference-provider */ "./node_modules/@theia/preferences/lib/browser/folder-preference-provider.js");
var FoldersPreferencesProvider = /** @class */ (function (_super) {
    __extends(FoldersPreferencesProvider, _super);
    function FoldersPreferencesProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.providers = new Map();
        return _this;
    }
    FoldersPreferencesProvider.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var readyPromises, _a, _b, provider;
            var e_1, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.workspaceService.roots];
                    case 1:
                        _d.sent();
                        this.updateProviders();
                        this.workspaceService.onWorkspaceChanged(function () { return _this.updateProviders(); });
                        readyPromises = [];
                        try {
                            for (_a = __values(this.providers.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                provider = _b.value;
                                readyPromises.push(provider.ready.catch(function (e) { return console.error(e); }));
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        Promise.all(readyPromises).then(function () { return _this._ready.resolve(); });
                        return [2 /*return*/];
                }
            });
        });
    };
    FoldersPreferencesProvider.prototype.updateProviders = function () {
        var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
        var roots = this.workspaceService.tryGetRoots();
        var toDelete = new Set(this.providers.keys());
        try {
            for (var roots_1 = __values(roots), roots_1_1 = roots_1.next(); !roots_1_1.done; roots_1_1 = roots_1.next()) {
                var folder = roots_1_1.value;
                try {
                    for (var _e = (e_3 = void 0, __values(this.configurations.getPaths())), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var configPath = _f.value;
                        try {
                            for (var _g = (e_4 = void 0, __values(__spread(this.configurations.getSectionNames(), [this.configurations.getConfigName()]))), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var configName = _h.value;
                                var sectionUri = this.configurations.createUri(new uri_1.default(folder.uri), configPath, configName);
                                var sectionKey = sectionUri.toString();
                                toDelete.delete(sectionKey);
                                if (!this.providers.has(sectionKey)) {
                                    var provider = this.createProvider(sectionUri, configName, folder);
                                    this.providers.set(sectionKey, provider);
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (roots_1_1 && !roots_1_1.done && (_a = roots_1.return)) _a.call(roots_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var toDelete_1 = __values(toDelete), toDelete_1_1 = toDelete_1.next(); !toDelete_1_1.done; toDelete_1_1 = toDelete_1.next()) {
                var key = toDelete_1_1.value;
                var provider = this.providers.get(key);
                if (provider) {
                    this.providers.delete(key);
                    provider.dispose();
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (toDelete_1_1 && !toDelete_1_1.done && (_d = toDelete_1.return)) _d.call(toDelete_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    FoldersPreferencesProvider.prototype.getConfigUri = function (resourceUri) {
        var e_6, _a;
        try {
            for (var _b = __values(this.getFolderProviders(resourceUri)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var provider = _c.value;
                var configUri = provider.getConfigUri(resourceUri);
                if (this.configurations.isConfigUri(configUri)) {
                    return configUri;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return undefined;
    };
    FoldersPreferencesProvider.prototype.getContainingConfigUri = function (resourceUri) {
        var e_7, _a;
        try {
            for (var _b = __values(this.getFolderProviders(resourceUri)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var provider = _c.value;
                var configUri = provider.getConfigUri();
                if (this.configurations.isConfigUri(configUri) && provider.contains(resourceUri)) {
                    return configUri;
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return undefined;
    };
    FoldersPreferencesProvider.prototype.getDomain = function () {
        return this.workspaceService.tryGetRoots().map(function (root) { return root.uri; });
    };
    FoldersPreferencesProvider.prototype.resolve = function (preferenceName, resourceUri) {
        var e_8, _a, e_9, _b;
        var result = {};
        var groups = this.groupProvidersByConfigName(resourceUri);
        try {
            for (var _c = __values(groups.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var group = _d.value;
                try {
                    for (var group_1 = (e_9 = void 0, __values(group)), group_1_1 = group_1.next(); !group_1_1.done; group_1_1 = group_1.next()) {
                        var provider = group_1_1.value;
                        var _e = provider.resolve(preferenceName, resourceUri), value = _e.value, configUri = _e.configUri;
                        if (configUri && value !== undefined) {
                            result.configUri = configUri;
                            result.value = preference_provider_1.PreferenceProvider.merge(result.value, value);
                            break;
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (group_1_1 && !group_1_1.done && (_b = group_1.return)) _b.call(group_1);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return result;
    };
    FoldersPreferencesProvider.prototype.getPreferences = function (resourceUri) {
        var e_10, _a, e_11, _b;
        var result = {};
        var groups = this.groupProvidersByConfigName(resourceUri);
        try {
            for (var _c = __values(groups.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var group = _d.value;
                try {
                    for (var group_2 = (e_11 = void 0, __values(group)), group_2_1 = group_2.next(); !group_2_1.done; group_2_1 = group_2.next()) {
                        var provider = group_2_1.value;
                        if (provider.getConfigUri(resourceUri)) {
                            var preferences = provider.getPreferences();
                            result = preference_provider_1.PreferenceProvider.merge(result, preferences);
                            break;
                        }
                    }
                }
                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                finally {
                    try {
                        if (group_2_1 && !group_2_1.done && (_b = group_2.return)) _b.call(group_2);
                    }
                    finally { if (e_11) throw e_11.error; }
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return result;
    };
    FoldersPreferencesProvider.prototype.setPreference = function (preferenceName, value, resourceUri) {
        return __awaiter(this, void 0, void 0, function () {
            var sectionName, configName, providers, configPath, iterator, _loop_1, this_1, providers_1, providers_1_1, provider, next, provider;
            var e_12, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sectionName = preferenceName.split('.', 1)[0];
                        configName = this.configurations.isSectionName(sectionName) ? sectionName : this.configurations.getConfigName();
                        providers = this.getFolderProviders(resourceUri);
                        iterator = [];
                        _loop_1 = function (provider) {
                            if (configPath === undefined) {
                                var configUri = provider.getConfigUri(resourceUri);
                                if (configUri) {
                                    configPath = this_1.configurations.getPath(configUri);
                                }
                            }
                            if (this_1.configurations.getName(provider.getConfigUri()) === configName) {
                                iterator.push(function () {
                                    if (provider.getConfigUri(resourceUri)) {
                                        return provider;
                                    }
                                    iterator.push(function () {
                                        if (_this.configurations.getPath(provider.getConfigUri()) === configPath) {
                                            return provider;
                                        }
                                        iterator.push(function () { return provider; });
                                    });
                                });
                            }
                        };
                        this_1 = this;
                        try {
                            for (providers_1 = __values(providers), providers_1_1 = providers_1.next(); !providers_1_1.done; providers_1_1 = providers_1.next()) {
                                provider = providers_1_1.value;
                                _loop_1(provider);
                            }
                        }
                        catch (e_12_1) { e_12 = { error: e_12_1 }; }
                        finally {
                            try {
                                if (providers_1_1 && !providers_1_1.done && (_a = providers_1.return)) _a.call(providers_1);
                            }
                            finally { if (e_12) throw e_12.error; }
                        }
                        next = iterator.shift();
                        _b.label = 1;
                    case 1:
                        if (!next) return [3 /*break*/, 4];
                        provider = next();
                        if (!provider) return [3 /*break*/, 3];
                        return [4 /*yield*/, provider.setPreference(preferenceName, value, resourceUri)];
                    case 2:
                        if (_b.sent()) {
                            return [2 /*return*/, true];
                        }
                        _b.label = 3;
                    case 3:
                        next = iterator.shift();
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    FoldersPreferencesProvider.prototype.groupProvidersByConfigName = function (resourceUri) {
        var e_13, _a, e_14, _b;
        var groups = new Map();
        var providers = this.getFolderProviders(resourceUri);
        try {
            for (var _c = __values(__spread([this.configurations.getConfigName()], this.configurations.getSectionNames())), _d = _c.next(); !_d.done; _d = _c.next()) {
                var configName = _d.value;
                var group = [];
                try {
                    for (var providers_2 = (e_14 = void 0, __values(providers)), providers_2_1 = providers_2.next(); !providers_2_1.done; providers_2_1 = providers_2.next()) {
                        var provider = providers_2_1.value;
                        if (this.configurations.getName(provider.getConfigUri()) === configName) {
                            group.push(provider);
                        }
                    }
                }
                catch (e_14_1) { e_14 = { error: e_14_1 }; }
                finally {
                    try {
                        if (providers_2_1 && !providers_2_1.done && (_b = providers_2.return)) _b.call(providers_2);
                    }
                    finally { if (e_14) throw e_14.error; }
                }
                groups.set(configName, group);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return groups;
    };
    FoldersPreferencesProvider.prototype.getFolderProviders = function (resourceUri) {
        var e_15, _a;
        if (!resourceUri) {
            return [];
        }
        var resourcePath = new uri_1.default(resourceUri).path;
        var folder = { relativity: Number.MAX_SAFE_INTEGER };
        var providers = new Map();
        try {
            for (var _b = __values(this.providers.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var provider = _c.value;
                var uri = provider.folderUri.toString();
                var folderProviders = (providers.get(uri) || []);
                folderProviders.push(provider);
                providers.set(uri, folderProviders);
                // in case we have nested folders mounted as workspace roots, select the innermost enclosing folder
                var relativity = provider.folderUri.path.relativity(resourcePath);
                if (relativity >= 0 && folder.relativity > relativity) {
                    folder = { relativity: relativity, uri: uri };
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
        return folder.uri && providers.get(folder.uri) || [];
    };
    FoldersPreferencesProvider.prototype.createProvider = function (uri, section, folder) {
        var _this = this;
        var provider = this.folderPreferenceProviderFactory(uri, section, folder);
        this.toDispose.push(provider);
        this.toDispose.push(provider.onDidPreferencesChanged(function (change) {
            _this.onDidPreferencesChangedEmitter.fire(change);
        }));
        return provider;
    };
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], FoldersPreferencesProvider.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(folder_preference_provider_1.FolderPreferenceProviderFactory),
        __metadata("design:type", Function)
    ], FoldersPreferencesProvider.prototype, "folderPreferenceProviderFactory", void 0);
    __decorate([
        inversify_1.inject(preference_configurations_1.PreferenceConfigurations),
        __metadata("design:type", preference_configurations_1.PreferenceConfigurations)
    ], FoldersPreferencesProvider.prototype, "configurations", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], FoldersPreferencesProvider.prototype, "init", null);
    FoldersPreferencesProvider = __decorate([
        inversify_1.injectable()
    ], FoldersPreferencesProvider);
    return FoldersPreferencesProvider;
}(preference_provider_1.PreferenceProvider));
exports.FoldersPreferencesProvider = FoldersPreferencesProvider;


/***/ }),

/***/ "./node_modules/@theia/preferences/lib/browser/preference-bindings.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@theia/preferences/lib/browser/preference-bindings.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindPreferenceProviders = exports.bindFactory = exports.bindWorkspaceFilePreferenceProvider = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var preferences_1 = __webpack_require__(/*! @theia/core/lib/browser/preferences */ "./node_modules/@theia/core/lib/browser/preferences/index.js");
var user_preference_provider_1 = __webpack_require__(/*! ./user-preference-provider */ "./node_modules/@theia/preferences/lib/browser/user-preference-provider.js");
var workspace_preference_provider_1 = __webpack_require__(/*! ./workspace-preference-provider */ "./node_modules/@theia/preferences/lib/browser/workspace-preference-provider.js");
var workspace_file_preference_provider_1 = __webpack_require__(/*! ./workspace-file-preference-provider */ "./node_modules/@theia/preferences/lib/browser/workspace-file-preference-provider.js");
var folders_preferences_provider_1 = __webpack_require__(/*! ./folders-preferences-provider */ "./node_modules/@theia/preferences/lib/browser/folders-preferences-provider.js");
var folder_preference_provider_1 = __webpack_require__(/*! ./folder-preference-provider */ "./node_modules/@theia/preferences/lib/browser/folder-preference-provider.js");
var user_configs_preference_provider_1 = __webpack_require__(/*! ./user-configs-preference-provider */ "./node_modules/@theia/preferences/lib/browser/user-configs-preference-provider.js");
var section_preference_provider_1 = __webpack_require__(/*! ./section-preference-provider */ "./node_modules/@theia/preferences/lib/browser/section-preference-provider.js");
function bindWorkspaceFilePreferenceProvider(bind) {
    bind(workspace_file_preference_provider_1.WorkspaceFilePreferenceProviderFactory).toFactory(function (ctx) { return function (options) {
        var child = new inversify_1.Container({ defaultScope: 'Singleton' });
        child.parent = ctx.container;
        child.bind(workspace_file_preference_provider_1.WorkspaceFilePreferenceProvider).toSelf();
        child.bind(workspace_file_preference_provider_1.WorkspaceFilePreferenceProviderOptions).toConstantValue(options);
        return child.get(workspace_file_preference_provider_1.WorkspaceFilePreferenceProvider);
    }; });
}
exports.bindWorkspaceFilePreferenceProvider = bindWorkspaceFilePreferenceProvider;
function bindFactory(bind, factoryId, constructor) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var parameterBindings = [];
    for (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var _i = 3; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _i < arguments.length; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parameterBindings[_i - 3] = arguments[_i];
    }
    bind(factoryId).toFactory(function (ctx) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var child = new inversify_1.Container({ defaultScope: 'Singleton' });
            child.parent = ctx.container;
            for (var i = 0; i < parameterBindings.length; i++) {
                child.bind(parameterBindings[i]).toConstantValue(args[i]);
            }
            child.bind(constructor).to(constructor);
            return child.get(constructor);
        };
    });
}
exports.bindFactory = bindFactory;
function bindPreferenceProviders(bind, unbind) {
    unbind(preferences_1.PreferenceProvider);
    bind(preferences_1.PreferenceProvider).to(user_configs_preference_provider_1.UserConfigsPreferenceProvider).inSingletonScope().whenTargetNamed(preferences_1.PreferenceScope.User);
    bind(preferences_1.PreferenceProvider).to(workspace_preference_provider_1.WorkspacePreferenceProvider).inSingletonScope().whenTargetNamed(preferences_1.PreferenceScope.Workspace);
    bind(preferences_1.PreferenceProvider).to(folders_preferences_provider_1.FoldersPreferencesProvider).inSingletonScope().whenTargetNamed(preferences_1.PreferenceScope.Folder);
    bindWorkspaceFilePreferenceProvider(bind);
    bindFactory(bind, user_preference_provider_1.UserPreferenceProviderFactory, user_preference_provider_1.UserPreferenceProvider, section_preference_provider_1.SectionPreferenceProviderUri, section_preference_provider_1.SectionPreferenceProviderSection);
    bindFactory(bind, folder_preference_provider_1.FolderPreferenceProviderFactory, folder_preference_provider_1.FolderPreferenceProvider, section_preference_provider_1.SectionPreferenceProviderUri, section_preference_provider_1.SectionPreferenceProviderSection, folder_preference_provider_1.FolderPreferenceProviderFolder);
}
exports.bindPreferenceProviders = bindPreferenceProviders;


/***/ }),

/***/ "./node_modules/@theia/preferences/lib/browser/preference-frontend-module.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@theia/preferences/lib/browser/preference-frontend-module.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindPreferences = void 0;
__webpack_require__(/*! ../../src/browser/style/index.css */ "./node_modules/@theia/preferences/src/browser/style/index.css");
__webpack_require__(/*! ./preferences-monaco-contribution */ "./node_modules/@theia/preferences/lib/browser/preferences-monaco-contribution.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var tab_bar_toolbar_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/tab-bar-toolbar */ "./node_modules/@theia/core/lib/browser/shell/tab-bar-toolbar.js");
var preference_tree_generator_1 = __webpack_require__(/*! ./util/preference-tree-generator */ "./node_modules/@theia/preferences/lib/browser/util/preference-tree-generator.js");
var preference_bindings_1 = __webpack_require__(/*! ./preference-bindings */ "./node_modules/@theia/preferences/lib/browser/preference-bindings.js");
var preference_widget_bindings_1 = __webpack_require__(/*! ./views/preference-widget-bindings */ "./node_modules/@theia/preferences/lib/browser/views/preference-widget-bindings.js");
var preference_event_service_1 = __webpack_require__(/*! ./util/preference-event-service */ "./node_modules/@theia/preferences/lib/browser/util/preference-event-service.js");
var preference_tree_provider_1 = __webpack_require__(/*! ./preference-tree-provider */ "./node_modules/@theia/preferences/lib/browser/preference-tree-provider.js");
var preferences_contribution_1 = __webpack_require__(/*! ./preferences-contribution */ "./node_modules/@theia/preferences/lib/browser/preferences-contribution.js");
var preference_scope_command_manager_1 = __webpack_require__(/*! ./util/preference-scope-command-manager */ "./node_modules/@theia/preferences/lib/browser/util/preference-scope-command-manager.js");
var json_schema_store_1 = __webpack_require__(/*! @theia/core/lib/browser/json-schema-store */ "./node_modules/@theia/core/lib/browser/json-schema-store.js");
var preferences_json_schema_contribution_1 = __webpack_require__(/*! ./preferences-json-schema-contribution */ "./node_modules/@theia/preferences/lib/browser/preferences-json-schema-contribution.js");
function bindPreferences(bind, unbind) {
    preference_bindings_1.bindPreferenceProviders(bind, unbind);
    preference_widget_bindings_1.bindPreferencesWidgets(bind);
    bind(preference_event_service_1.PreferencesEventService).toSelf().inSingletonScope();
    bind(preference_tree_provider_1.PreferencesTreeProvider).toSelf().inSingletonScope();
    bind(preference_tree_generator_1.PreferenceTreeGenerator).toSelf().inSingletonScope();
    browser_1.bindViewContribution(bind, preferences_contribution_1.PreferencesContribution);
    bind(preference_scope_command_manager_1.PreferenceScopeCommandManager).toSelf().inSingletonScope();
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(preferences_contribution_1.PreferencesContribution);
    bind(preferences_json_schema_contribution_1.PreferencesJsonSchemaContribution).toSelf().inSingletonScope();
    bind(json_schema_store_1.JsonSchemaContribution).toService(preferences_json_schema_contribution_1.PreferencesJsonSchemaContribution);
}
exports.bindPreferences = bindPreferences;
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    bindPreferences(bind, unbind);
});


/***/ }),

/***/ "./node_modules/@theia/preferences/lib/browser/preferences-decorator-service.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@theia/preferences/lib/browser/preferences-decorator-service.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesDecoratorService = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var tree_decorator_1 = __webpack_require__(/*! @theia/core/lib/browser/tree/tree-decorator */ "./node_modules/@theia/core/lib/browser/tree/tree-decorator.js");
var preferences_decorator_1 = __webpack_require__(/*! ./preferences-decorator */ "./node_modules/@theia/preferences/lib/browser/preferences-decorator.js");
var PreferencesDecoratorService = /** @class */ (function (_super) {
    __extends(PreferencesDecoratorService, _super);
    function PreferencesDecoratorService(preferencesTreeDecorator) {
        var _this = _super.call(this, [preferencesTreeDecorator]) || this;
        _this.preferencesTreeDecorator = preferencesTreeDecorator;
        return _this;
    }
    PreferencesDecoratorService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(preferences_decorator_1.PreferencesDecorator)),
        __metadata("design:paramtypes", [preferences_decorator_1.PreferencesDecorator])
    ], PreferencesDecoratorService);
    return PreferencesDecoratorService;
}(tree_decorator_1.AbstractTreeDecoratorService));
exports.PreferencesDecoratorService = PreferencesDecoratorService;


/***/ }),

/***/ "./node_modules/@theia/preferences/lib/browser/preferences-json-schema-contribution.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@theia/preferences/lib/browser/preferences-json-schema-contribution.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesJsonSchemaContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var user_preference_provider_1 = __webpack_require__(/*! ./user-preference-provider */ "./node_modules/@theia/preferences/lib/browser/user-preference-provider.js");
var preference_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/preferences/preference-contribution */ "./node_modules/@theia/core/lib/browser/preferences/preference-contribution.js");
var PreferencesJsonSchemaContribution = /** @class */ (function () {
    function PreferencesJsonSchemaContribution() {
    }
    PreferencesJsonSchemaContribution.prototype.registerSchemas = function (context) {
        var _this = this;
        var serializeSchema = function () { return JSON.stringify(_this.schemaProvider.getCombinedSchema()); };
        var uri = new uri_1.default('vscode://schemas/settings/user');
        this.inmemoryResources.add(uri, serializeSchema());
        context.registerSchema({
            fileMatch: ['settings.json', user_preference_provider_1.USER_PREFERENCE_URI.toString()],
            url: uri.toString()
        });
        this.schemaProvider.onDidPreferenceSchemaChanged(function () {
            return _this.inmemoryResources.update(uri, serializeSchema());
        });
    };
    __decorate([
        inversify_1.inject(preference_contribution_1.PreferenceSchemaProvider),
        __metadata("design:type", preference_contribution_1.PreferenceSchemaProvider)
    ], PreferencesJsonSchemaContribution.prototype, "schemaProvider", void 0);
    __decorate([
        inversify_1.inject(core_1.InMemoryResources),
        __metadata("design:type", core_1.InMemoryResources)
    ], PreferencesJsonSchemaContribution.prototype, "inmemoryResources", void 0);
    PreferencesJsonSchemaContribution = __decorate([
        inversify_1.injectable()
    ], PreferencesJsonSchemaContribution);
    return PreferencesJsonSchemaContribution;
}());
exports.PreferencesJsonSchemaContribution = PreferencesJsonSchemaContribution;


/***/ }),

/***/ "./node_modules/@theia/preferences/lib/browser/preferences-monaco-contribution.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@theia/preferences/lib/browser/preferences-monaco-contribution.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
monaco.languages.register({
    id: 'jsonc',
    'aliases': [
        'JSON with Comments'
    ],
    'filenames': [
        'settings.json'
    ],
    'extensions': [
        '.theia-workspace'
    ]
});


/***/ }),

/***/ "./node_modules/@theia/preferences/lib/browser/views/preference-widget-bindings.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@theia/preferences/lib/browser/views/preference-widget-bindings.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindPreferencesWidgets = void 0;
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var single_preference_display_factory_1 = __webpack_require__(/*! ./components/single-preference-display-factory */ "./node_modules/@theia/preferences/lib/browser/views/components/single-preference-display-factory.js");
var single_preference_wrapper_1 = __webpack_require__(/*! ./components/single-preference-wrapper */ "./node_modules/@theia/preferences/lib/browser/views/components/single-preference-wrapper.js");
var preference_widget_1 = __webpack_require__(/*! ./preference-widget */ "./node_modules/@theia/preferences/lib/browser/views/preference-widget.js");
var preference_tree_widget_1 = __webpack_require__(/*! ./preference-tree-widget */ "./node_modules/@theia/preferences/lib/browser/views/preference-tree-widget.js");
var preference_editor_widget_1 = __webpack_require__(/*! ./preference-editor-widget */ "./node_modules/@theia/preferences/lib/browser/views/preference-editor-widget.js");
var preference_searchbar_widget_1 = __webpack_require__(/*! ./preference-searchbar-widget */ "./node_modules/@theia/preferences/lib/browser/views/preference-searchbar-widget.js");
var preference_scope_tabbar_widget_1 = __webpack_require__(/*! ./preference-scope-tabbar-widget */ "./node_modules/@theia/preferences/lib/browser/views/preference-scope-tabbar-widget.js");
var preferences_decorator_1 = __webpack_require__(/*! ../preferences-decorator */ "./node_modules/@theia/preferences/lib/browser/preferences-decorator.js");
var preferences_decorator_service_1 = __webpack_require__(/*! ../preferences-decorator-service */ "./node_modules/@theia/preferences/lib/browser/preferences-decorator-service.js");
function bindPreferencesWidgets(bind) {
    bind(preference_widget_1.PreferencesWidget).toSelf().inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (_a) {
        var container = _a.container;
        return ({
            id: preference_widget_1.PreferencesWidget.ID,
            createWidget: function () { return container.get(preference_widget_1.PreferencesWidget); }
        });
    }).inSingletonScope();
    bind(single_preference_wrapper_1.SinglePreferenceWrapper).toSelf();
    bind(preference_tree_widget_1.PreferencesTreeWidget).toDynamicValue(function (ctx) {
        return createPreferencesTree(ctx.container);
    }).inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: preference_tree_widget_1.PreferencesTreeWidget.ID,
        createWidget: function () { return context.container.get(preference_tree_widget_1.PreferencesTreeWidget); },
    }); }).inSingletonScope();
    bind(preference_editor_widget_1.PreferencesEditorWidget).toSelf().inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: preference_editor_widget_1.PreferencesEditorWidget.ID,
        createWidget: function () { return context.container.get(preference_editor_widget_1.PreferencesEditorWidget); },
    }); }).inSingletonScope();
    bind(preference_searchbar_widget_1.PreferencesSearchbarWidget).toSelf().inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: preference_searchbar_widget_1.PreferencesSearchbarWidget.ID,
        createWidget: function () { return context.container.get(preference_searchbar_widget_1.PreferencesSearchbarWidget); },
    }); }).inSingletonScope();
    bind(preference_scope_tabbar_widget_1.PreferencesScopeTabBar).toSelf().inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: preference_scope_tabbar_widget_1.PreferencesScopeTabBar.ID,
        createWidget: function () { return context.container.get(preference_scope_tabbar_widget_1.PreferencesScopeTabBar); },
    }); }).inSingletonScope();
    bind(single_preference_display_factory_1.SinglePreferenceDisplayFactory).toSelf().inSingletonScope();
}
exports.bindPreferencesWidgets = bindPreferencesWidgets;
function createPreferencesTree(parent) {
    var child = browser_1.createTreeContainer(parent);
    child.unbind(browser_1.TreeWidget);
    child.bind(preference_tree_widget_1.PreferencesTreeWidget).toSelf();
    child.rebind(browser_1.TreeProps).toConstantValue(__assign(__assign({}, browser_1.defaultTreeProps), { search: false }));
    bindPreferencesDecorator(child);
    return child.get(preference_tree_widget_1.PreferencesTreeWidget);
}
function bindPreferencesDecorator(parent) {
    parent.bind(preferences_decorator_1.PreferencesDecorator).toSelf().inSingletonScope();
    parent.bind(preferences_decorator_service_1.PreferencesDecoratorService).toSelf().inSingletonScope();
    parent.rebind(browser_1.TreeDecoratorService).toService(preferences_decorator_service_1.PreferencesDecoratorService);
}


/***/ }),

/***/ "./node_modules/@theia/preferences/src/browser/style/index.css":
/*!*********************************************************************!*\
  !*** ./node_modules/@theia/preferences/src/browser/style/index.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../css-loader!./index.css */ "./node_modules/css-loader/index.js!./node_modules/@theia/preferences/src/browser/style/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/@theia/preferences/src/browser/style/index.css":
/*!***********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/@theia/preferences/src/browser/style/index.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__(/*! -!../../../../../css-loader!./preference-context-menu.css */ "./node_modules/css-loader/index.js!./node_modules/@theia/preferences/src/browser/style/preference-context-menu.css"), "");
exports.i(__webpack_require__(/*! -!../../../../../css-loader!./preference-array.css */ "./node_modules/css-loader/index.js!./node_modules/@theia/preferences/src/browser/style/preference-array.css"), "");
exports.i(__webpack_require__(/*! -!../../../../../css-loader!./preference-object.css */ "./node_modules/css-loader/index.js!./node_modules/@theia/preferences/src/browser/style/preference-object.css"), "");
exports.i(__webpack_require__(/*! -!../../../../../css-loader!./search-input.css */ "./node_modules/css-loader/index.js!./node_modules/@theia/preferences/src/browser/style/search-input.css"), "");

// module
exports.push([module.i, "/********************************************************************************\n * Copyright (C) 2019 TypeFox and others.\n *\n * This program and the accompanying materials are made available under the\n * terms of the Eclipse Public License v. 2.0 which is available at\n * http://www.eclipse.org/legal/epl-2.0.\n *\n * This Source Code may also be made available under the following Secondary\n * Licenses when the conditions for such availability set forth in the Eclipse\n * Public License v. 2.0 are satisfied: GNU General Public License, version 2\n * with the GNU Classpath Exception which is available at\n * https://www.gnu.org/software/classpath/license.html.\n *\n * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0\n ********************************************************************************/\n\n#preferences_container_widget .p-SplitPanel-handle {\n    border-right: var(--theia-border-width) solid var(--theia-editorGroup-border);\n}\n\n#preferences_container_widget .p-TabBar-tabIcon {\n    align-items: center;\n    display: flex;\n    line-height: var(--theia-content-line-height) !important;\n}\n\n/* UI View */\n\n.theia-settings-container {\n    max-width: 1000px;\n    padding-top: 11px;\n    display: grid;\n    grid-template-areas:\n        \"header header\"\n        \"tabbar tabbar\"\n        \"navbar editor\";\n    grid-template-columns: minmax(150px, 280px) 1fr;\n    grid-template-rows: 45px 45px 1fr;\n}\n\n.theia-settings-container .settings-no-results-announcement {\n    font-weight: bold;\n    font-size: var(--theia-ui-font-size3);\n    padding-left: var(--theia-ui-padding);\n    margin: calc(2*var(--theia-ui-padding)) 0px;\n}\n\n.theia-settings-container .preferences-searchbar-widget {\n    grid-area: header;\n    margin: 3px 24px 0px 24px;\n}\n\n.theia-settings-container .preferences-tabbar-widget {\n    grid-area: tabbar;\n    margin: 3px 24px 0px 24px;\n}\n\n.theia-settings-container .preferences-tabbar-widget.with-shadow {\n    box-shadow: 0px 6px 5px -5px var(--theia-widget-shadow);\n}\n\n.theia-settings-container .preferences-tabbar-widget .preferences-scope-tab .p-TabBar-tabIcon:not(.preferences-folder-dropdown-icon) {\n    display: none;\n}\n\n#theia-main-content-panel .theia-settings-container #preferences-scope-tab-bar .preferences-scope-tab {\n    background: var(--theia-editor-background);\n    border-right: unset;\n    border-bottom: var(--theia-border-width) solid var(--theia-tab-unfocusedInactiveForeground);\n}\n\n#theia-main-content-panel .theia-settings-container .tabbar-underline {\n    width: 100%;\n    position:absolute;\n    top: calc(var(--theia-private-horizontal-tab-height) + var(--theia-private-horizontal-tab-scrollbar-rail-height) / 2 - 1px);\n    border-top: 1px solid var(--theia-tab-unfocusedInactiveForeground);\n    z-index: -1;\n}\n\n#theia-main-content-panel .theia-settings-container #preferences-scope-tab-bar .preferences-scope-tab.p-mod-current {\n    color: var(--theia-panelTitle-activeForeground);\n    border-bottom: var(--theia-border-width) solid var(--theia-panelTitle-activeBorder);\n}\n\n#theia-main-content-panel .theia-settings-container #preferences-scope-tab-bar .preferences-scope-tab.p-mod-current:not(.theia-mod-active) {\n    border-top: unset;\n}\n\n#theia-main-content-panel .theia-settings-container #preferences-scope-tab-bar .preferences-scope-tab.preferences-folder-tab .p-TabBar-tabLabel::after {\n    content: 'Folder';\n    padding-left: 4px;\n    font-size: 0.8em;\n    color: var(--theia-tab-inactiveForeground);\n}\n\n#theia-main-content-panel .theia-settings-container #preferences-scope-tab-bar .preferences-scope-tab.preferences-folder-dropdown {\n    position: relative;\n    padding-right: 23px;\n}\n\n.preferences-folder-dropdown-icon {\n    background: var(--theia-icon-chevron-right) center center no-repeat;\n    transform: rotate(90deg);\n    width: 15px;\n    height: 15px;\n    position: absolute;\n    right: var(--theia-ui-padding);\n}\n\n.theia-settings-container .preferences-editor-widget {\n    grid-area: editor;\n    padding: 0 24px;\n}\n\n.theia-settings-container .preferences-editor-widget.full-pane {\n    grid-column-start: 1;\n    grid-column-end: 3;\n}\n\n.theia-settings-container .preferences-tree-widget {\n    grid-area: navbar;\n    padding-left: 31px;\n}\n\n.theia-settings-container .preferences-tree-widget .theia-mod-selected {\n    font-weight: bold;\n}\n\n.theia-settings-container .preferences-tree-widget .theia-TreeNodeSegment {\n    text-overflow: ellipsis;\n    overflow: hidden;\n    max-width: 90%;\n}\n\n.theia-settings-container .settings-main {\n    height: 100%;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n}\n\n.theia-settings-container .settings-main-scroll-container {\n    position: relative;\n    width: 100%;\n    flex: 1 1 auto;\n}\n\n.theia-settings-container .settings-main-sticky-misc {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex: 0 1 50px;\n}\n\n.theia-settings-container .settings-main-sticky-misc .json-button>i {\n    display: inline-block;\n    background: var(--theia-icon-open-json) no-repeat;\n    background-position-y: 1px;\n    -webkit-filter: invert(1);\n    filter: invert(1);\n    height: var(--theia-icon-size);\n    width: var(--theia-icon-size);\n}\n\n.theia-settings-container .settings-scope>label {\n    margin-right: 12px;\n}\n\n.theia-settings-container .settings-section {\n    padding-left: 0;\n    padding-top: var(--theia-ui-padding);\n    margin-top: calc(var(--theia-ui-padding) * -1);\n}\n\n.theia-settings-container .settings-section a {\n    border: none;\n    color: var(--theia-foreground);\n    font-weight: 500;\n    outline: 0;\n    text-decoration: none;\n}\n\n.theia-settings-container .settings-section a:hover {\n    text-decoration: underline;\n}\n\n\n\n.theia-settings-container .settings-section-title {\n    font-weight: bold;\n    font-size: var(--theia-ui-font-size3);\n    padding-left: calc(2 * var(--theia-ui-padding));\n}\n\n.theia-settings-container .settings-section>li {\n    list-style-type: none;\n    margin: var(--theia-ui-padding) 0px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    -webkit-box-align: start;\n    -ms-flex-align: start;\n    align-items: start;\n}\n\n.theia-settings-container li.single-pref {\n    list-style-type: none;\n    margin: 12px 0 18px 0;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    box-sizing: border-box;\n    padding-left: calc(2 * var(--theia-ui-padding));\n    position: relative;\n}\n\n.theia-settings-container li.single-pref .pref-context-gutter {\n    position: absolute;\n    height: 100%;\n    left: -16px;\n    padding-right: 4px;\n    border-right: 2px hidden;\n}\n\n.theia-settings-container li.single-pref .pref-context-gutter .settings-context-menu-btn {\n    opacity: 0;\n    transition: opacity .5s;\n}\n\n.theia-settings-container li.single-pref .pref-context-gutter .settings-context-menu-btn.show-cog {\n    opacity: 1;\n}\n\n.theia-settings-container li.single-pref .pref-context-gutter.theia-mod-item-modified {\n    border-right: 2px solid var(--theia-settings-modifiedItemIndicator);\n}\n\n.theia-settings-container li.single-pref input[type=\"text\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.theia-settings-container .settings-main {\n    margin: 0;\n}\n\n.theia-settings-container .settings-main-sticky {\n    top: 0;\n    padding-top: calc(var(--theia-ui-padding));\n    margin-top: calc(var(--theia-ui-padding) * -1);\n    background-color: var(--theia-editor-background);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    z-index: 1000;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n}\n\n.theia-settings-container .pref-name {\n    padding: 0;\n    font-weight: bold;\n}\n\n.preferences-tree-spacer {\n    padding-left: calc(var(--theia-ui-padding)/2);\n    padding-right: calc(var(--theia-ui-padding)/2);\n    min-width: var(--theia-icon-size);\n    min-height: var(--theia-icon-size);\n}\n\n.theia-settings-container .pref-description {\n    padding: var(--theia-ui-padding) 0;\n    color: var(--theia-descriptionForeground);\n    line-height: 18px;\n}\n\n.theia-settings-container .theia-select:focus {\n    outline-width: 1px;\n    outline-style: solid;\n    outline-offset: -1px;\n    opacity: 1 !important;\n    outline-color: var(--theia-focusBorder);\n}\n\n.theia-settings-container .theia-input[type=\"text\"] {\n    border: 1px solid var(--theia-dropdown-border);\n}\n\n.theia-settings-container .theia-input[type=\"checkbox\"]:focus {\n    outline-width: 2px;\n}\n\n.theia-settings-container .pref-content-container a.theia-json-input {\n    text-decoration: underline;\n}\n\n.theia-settings-container .pref-content-container a.theia-json-input:hover {\n    text-decoration: none;\n    cursor: pointer;\n}\n\n.theia-settings-container .pref-content-container {\n    width: 100%;\n}\n\n.theia-settings-container .pref-content-container .pref-input {\n    padding: var(--theia-ui-padding) 0;\n    width: 100%;\n    max-width: 320px;\n}\n\n.theia-settings-container .pref-content-container .pref-input>select,\n.theia-settings-container .pref-content-container .pref-input>input {\n    width: 100%;\n}\n\n\n/* These specifications for the boolean class ensure that the\n    checkbox is rendered to the left of the description.\n*/\n.theia-settings-container .pref-content-container.boolean {\n    display: grid;\n    grid-template-columns: 30px 1fr;\n}\n\n.theia-settings-container .pref-content-container.boolean .pref-description {\n    grid-column-start: 2;\n    grid-row-start: 1;\n}\n\n.theia-settings-container .pref-content-container.boolean .pref-input {\n    grid-column-start: 1;\n    grid-row-start: 1;\n    margin: 0;\n}\n\n.theia-settings-container .settings-section>li:last-child {\n    margin-bottom: 20px;\n}\n\n.theia-settings-container .settings-scope-underlined {\n    text-decoration: underline;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/@theia/preferences/src/browser/style/preference-array.css":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/@theia/preferences/src/browser/style/preference-array.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/********************************************************************************\n * Copyright (C) 2020 Ericsson and others.\n *\n * This program and the accompanying materials are made available under the\n * terms of the Eclipse Public License v. 2.0 which is available at\n * http://www.eclipse.org/legal/epl-2.0.\n *\n * This Source Code may also be made available under the following Secondary\n * Licenses when the conditions for such availability set forth in the Eclipse\n * Public License v. 2.0 are satisfied: GNU General Public License, version 2\n * with the GNU Classpath Exception which is available at\n * https://www.gnu.org/software/classpath/license.html.\n *\n * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0\n ********************************************************************************/\n\n.theia-settings-container .preference-array {\n  list-style: none;\n  padding   : 0;\n}\n\n.theia-settings-container .preference-array-element {\n  display          : -webkit-box;\n  display          : -ms-flexbox;\n  display          : flex;\n  -webkit-box-pack : justify;\n  -ms-flex-pack    : justify;\n  justify-content  : space-between;\n  -webkit-box-align: center;\n  -ms-flex-align   : center;\n  align-items      : center;\n  padding          : calc(var(--thiea-ui-padding) / 2) var(--thiea-ui-padding);\n  border-bottom    : var(--theia-panel-border) 2px solid;\n}\n\n.theia-settings-container .pref-input li:nth-last-child(2) {\n  border-bottom: none;\n}\n\n.theia-settings-container .pref-input li:last-child {\n  display          : -webkit-box;\n  display          : -ms-flexbox;\n  display          : flex;\n  -webkit-box-align: center;\n  -ms-flex-align   : center;\n  align-items      : center;\n}\n\n.theia-settings-container .preference-array-element:hover {\n  background-color: rgba(50%, 50%, 50%, 0.1);\n}\n\n.theia-settings-container .preference-array-element-btn {\n  width            : 1.5em;\n  height           : 1.5em;\n  display          : -webkit-box;\n  display          : -ms-flexbox;\n  display          : flex;\n  -webkit-box-pack : center;\n  -ms-flex-pack    : center;\n  justify-content  : center;\n  -webkit-box-align: center;\n  -ms-flex-align   : center;\n  align-items      : center;\n}\n\n.theia-settings-container .preference-array-element .preference-array-element-btn {\n  opacity: 0;\n}\n\n.theia-settings-container .preference-array-element:hover .preference-array-element-btn {\n  opacity: 1;\n}\n\n.theia-settings-container .preference-array-element-btn:hover {\n  background-color: rgba(50%, 50%, 50%, 0.1);\n  cursor          : pointer;\n}\n\n.theia-settings-container .preference-array .add-btn {\n  margin-left : calc((var(--theia-icon-size) + 4px) * -1);\n  margin-right: 4px;\n  width       : var(--theia-icon-size);\n  height      : var(--theia-icon-size);\n}\n\n.theia-settings-container .preference-array-clear-item {\n  background: var(--theia-icon-close) no-repeat;\n  width     : var(--theia-icon-size);\n  height    : var(--theia-icon-size);\n}\n\n.theia-settings-container .preference-array-input {\n  padding-right: calc(var(--theia-icon-size) + var(--thiea-ui-padding));\n  width        : 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/@theia/preferences/src/browser/style/preference-context-menu.css":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/@theia/preferences/src/browser/style/preference-context-menu.css ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/********************************************************************************\n * Copyright (C) 2020 Ericsson and others.\n *\n * This program and the accompanying materials are made available under the\n * terms of the Eclipse Public License v. 2.0 which is available at\n * http://www.eclipse.org/legal/epl-2.0.\n *\n * This Source Code may also be made available under the following Secondary\n * Licenses when the conditions for such availability set forth in the Eclipse\n * Public License v. 2.0 are satisfied: GNU General Public License, version 2\n * with the GNU Classpath Exception which is available at\n * https://www.gnu.org/software/classpath/license.html.\n *\n * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0\n ********************************************************************************/\n\n.theia-settings-container .settings-context-menu-container {\n  position: relative;\n  padding-left: var(--theia-ui-padding);\n}\n\n.theia-settings-container .settings-context-menu-btn {\n  cursor: pointer;\n}\n\n.theia-settings-container .settings-context-menu {\n  position: absolute;\n  width: var(--theia-settingsSidebar-width);\n  list-style: none;\n  padding: var(--theia-ui-padding);\n  bottom: calc(100% + 10px);\n  left: -10px;\n  z-index: 9999;\n  background-color: var(--theia-menu-background);\n}\n\n.theia-settings-container .settings-context-menu:before {\n  content: \"\";\n  position: absolute;\n  left: 10px;\n  bottom: -10px;\n  width: 0;\n  height: 0;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-top: 10px solid var(--theia-menu-background);\n}\n\n.theia-settings-container .settings-context-menu li {\n  padding: var(--theia-ui-padding);\n}\n\n.theia-settings-container .settings-context-menu li:hover {\n  background-color: var(--theia-menu-selectionBackground);\n}\n\n.theia-settings-container .settings-context-menu i {\n  padding-right: var(--theia-ui-padding);\n  width: var(--theia-icon-size);\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.theia-settings-container .pref-context-menu-btn {\n  margin-left: 5px;\n}\n\n.theia-settings-container .pref-context-menu-btn:hover {\n  background-color: rgba(50%, 50%, 50%, 0.1);\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/@theia/preferences/src/browser/style/preference-object.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/@theia/preferences/src/browser/style/preference-object.css ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/********************************************************************************\n * Copyright (C) 2020 Ericsson and others.\n *\n * This program and the accompanying materials are made available under the\n * terms of the Eclipse Public License v. 2.0 which is available at\n * http://www.eclipse.org/legal/epl-2.0.\n *\n * This Source Code may also be made available under the following Secondary\n * Licenses when the conditions for such availability set forth in the Eclipse\n * Public License v. 2.0 are satisfied: GNU General Public License, version 2\n * with the GNU Classpath Exception which is available at\n * https://www.gnu.org/software/classpath/license.html.\n *\n * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0\n ********************************************************************************/\n\n.theia-settings-container .object-preference-input-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n\n.theia-settings-container .object-preference-input {\n  width: 100%;\n  max-height: 250px;\n  resize: none;\n  color: var(--theia-settings-textInputForeground);\n  background-color: var(--theia-settings-textInputBackground);\n  border-color: var(--theia-panel-border);\n  font-size: var(--theia-code-font-size);\n  margin-bottom: 10px;\n}\n\n.theia-settings-container .object-preference-input-btn-toggle {\n  padding: 0 calc(var(--theia-ui-padding) / 2);\n}\n\n.theia-settings-container .object-preference-input-btn-toggle-icon {\n  display: inline-block;\n  background: var(--theia-icon-open-json) no-repeat;\n  background-position-y: 1px;\n  height: var(--theia-icon-size);\n  width: var(--theia-icon-size);\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/@theia/preferences/src/browser/style/search-input.css":
/*!******************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/@theia/preferences/src/browser/style/search-input.css ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/********************************************************************************\n * Copyright (C) 2020 Ericsson and others.\n *\n * This program and the accompanying materials are made available under the\n * terms of the Eclipse Public License v. 2.0 which is available at\n * http://www.eclipse.org/legal/epl-2.0.\n *\n * This Source Code may also be made available under the following Secondary\n * Licenses when the conditions for such availability set forth in the Eclipse\n * Public License v. 2.0 are satisfied: GNU General Public License, version 2\n * with the GNU Classpath Exception which is available at\n * https://www.gnu.org/software/classpath/license.html.\n *\n * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0\n ********************************************************************************/\n\n.theia-settings-container .settings-search-container {\n  width: 100%;\n  position: relative;\n}\n\n.theia-settings-container .settings-search-container .settings-search-input {\n  width: 100%;\n  text-indent: 8px;\n  padding: calc(var(--theia-ui-padding) / 2) 0;\n  box-sizing: border-box;\n  border: 1px solid var(--theia-dropdown-border);\n}\n\n.theia-settings-container .settings-search-container .settings-search-icon {\n  position: absolute;\n  height: 100%;\n  left: 8px;\n  font-size: var(--theia-ui-font-size0);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n", ""]);

// exports


/***/ })

}]);
//# sourceMappingURL=62.bundle.js.map