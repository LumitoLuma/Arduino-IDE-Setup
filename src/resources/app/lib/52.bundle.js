(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[52],{

/***/ "./node_modules/@theia/monaco/lib/browser/monaco-languages.js":
/*!********************************************************************!*\
  !*** ./node_modules/@theia/monaco/lib/browser/monaco-languages.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
exports.MonacoLanguages = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var monaco_languageclient_1 = __webpack_require__(/*! monaco-languageclient */ "./node_modules/monaco-languageclient/lib/index.js");
var problem_manager_1 = __webpack_require__(/*! @theia/markers/lib/browser/problem/problem-manager */ "./node_modules/@theia/markers/lib/browser/problem/problem-manager.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var monaco_diagnostic_collection_1 = __webpack_require__(/*! monaco-languageclient/lib/monaco-diagnostic-collection */ "./node_modules/monaco-languageclient/lib/monaco-diagnostic-collection.js");
inversify_1.decorate(inversify_1.injectable(), monaco_languageclient_1.MonacoLanguages);
inversify_1.decorate(inversify_1.inject(monaco_languageclient_1.ProtocolToMonacoConverter), monaco_languageclient_1.MonacoLanguages, 0);
inversify_1.decorate(inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter), monaco_languageclient_1.MonacoLanguages, 1);
var MonacoLanguages = /** @class */ (function (_super) {
    __extends(MonacoLanguages, _super);
    function MonacoLanguages(// eslint-disable-next-line @typescript-eslint/indent
    p2m, m2p, problemManager) {
        var e_1, _a;
        var _this = _super.call(this, p2m, m2p) || this;
        _this.problemManager = problemManager;
        _this.workspaceSymbolProviders = [];
        _this.makers = new Map();
        try {
            for (var _b = __values(_this.problemManager.getUris()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var uri = _c.value;
                _this.updateMarkers(new uri_1.default(uri));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        _this.problemManager.onDidChangeMarkers(function (uri) { return _this.updateMarkers(uri); });
        return _this;
    }
    MonacoLanguages.prototype.updateMarkers = function (uri) {
        var e_2, _a, e_3, _b, e_4, _c;
        var uriString = uri.toString();
        var owners = new Map();
        try {
            for (var _d = __values(this.problemManager.findMarkers({ uri: uri })), _e = _d.next(); !_e.done; _e = _d.next()) {
                var marker = _e.value;
                var diagnostics = owners.get(marker.owner) || [];
                diagnostics.push(marker.data);
                owners.set(marker.owner, diagnostics);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var toClean = new Set(this.makers.keys());
        try {
            for (var owners_1 = __values(owners), owners_1_1 = owners_1.next(); !owners_1_1.done; owners_1_1 = owners_1.next()) {
                var _f = __read(owners_1_1.value, 2), owner = _f[0], diagnostics = _f[1];
                toClean.delete(owner);
                var collection = this.makers.get(owner) || new monaco_diagnostic_collection_1.MonacoDiagnosticCollection(owner, this.p2m);
                collection.set(uriString, diagnostics);
                this.makers.set(owner, collection);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (owners_1_1 && !owners_1_1.done && (_b = owners_1.return)) _b.call(owners_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var toClean_1 = __values(toClean), toClean_1_1 = toClean_1.next(); !toClean_1_1.done; toClean_1_1 = toClean_1.next()) {
                var owner = toClean_1_1.value;
                var collection = this.makers.get(owner);
                if (collection) {
                    collection.set(uriString, []);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (toClean_1_1 && !toClean_1_1.done && (_c = toClean_1.return)) _c.call(toClean_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    MonacoLanguages.prototype.createDiagnosticCollection = function (name) {
        var _this = this;
        var owner = name || 'default';
        var uris = [];
        return {
            set: function (uri, diagnostics) {
                _this.problemManager.setMarkers(new uri_1.default(uri), owner, diagnostics);
                uris.push(uri);
            },
            dispose: function () {
                var e_5, _a;
                try {
                    for (var uris_1 = __values(uris), uris_1_1 = uris_1.next(); !uris_1_1.done; uris_1_1 = uris_1.next()) {
                        var uri = uris_1_1.value;
                        _this.problemManager.setMarkers(new uri_1.default(uri), owner, []);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (uris_1_1 && !uris_1_1.done && (_a = uris_1.return)) _a.call(uris_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        };
    };
    MonacoLanguages.prototype.registerWorkspaceSymbolProvider = function (provider) {
        var _this = this;
        this.workspaceSymbolProviders.push(provider);
        return disposable_1.Disposable.create(function () {
            var index = _this.workspaceSymbolProviders.indexOf(provider);
            if (index !== -1) {
                _this.workspaceSymbolProviders.splice(index, 1);
            }
        });
    };
    Object.defineProperty(MonacoLanguages.prototype, "languages", {
        get: function () {
            return __spread(this.mergeLanguages(monaco.languages.getLanguages()).values());
        },
        enumerable: false,
        configurable: true
    });
    MonacoLanguages.prototype.getLanguage = function (languageId) {
        return this.mergeLanguages(monaco.languages.getLanguages().filter(function (language) { return language.id === languageId; })).get(languageId);
    };
    MonacoLanguages.prototype.mergeLanguages = function (registered) {
        var e_6, _a, e_7, _b, e_8, _c, e_9, _d;
        var languages = new Map();
        try {
            for (var registered_1 = __values(registered), registered_1_1 = registered_1.next(); !registered_1_1.done; registered_1_1 = registered_1.next()) {
                var _e = registered_1_1.value, id = _e.id, aliases = _e.aliases, extensions = _e.extensions, filenames = _e.filenames;
                var merged = languages.get(id) || {
                    id: id,
                    name: '',
                    extensions: new Set(),
                    filenames: new Set()
                };
                if (!merged.name && aliases && aliases.length) {
                    merged.name = aliases[0];
                }
                if (extensions && extensions.length) {
                    try {
                        for (var extensions_1 = (e_7 = void 0, __values(extensions)), extensions_1_1 = extensions_1.next(); !extensions_1_1.done; extensions_1_1 = extensions_1.next()) {
                            var extension = extensions_1_1.value;
                            merged.extensions.add(extension);
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (extensions_1_1 && !extensions_1_1.done && (_b = extensions_1.return)) _b.call(extensions_1);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                }
                if (filenames && filenames.length) {
                    try {
                        for (var filenames_1 = (e_8 = void 0, __values(filenames)), filenames_1_1 = filenames_1.next(); !filenames_1_1.done; filenames_1_1 = filenames_1.next()) {
                            var filename = filenames_1_1.value;
                            merged.filenames.add(filename);
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (filenames_1_1 && !filenames_1_1.done && (_c = filenames_1.return)) _c.call(filenames_1);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                }
                languages.set(id, merged);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (registered_1_1 && !registered_1_1.done && (_a = registered_1.return)) _a.call(registered_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        try {
            for (var languages_1 = __values(languages), languages_1_1 = languages_1.next(); !languages_1_1.done; languages_1_1 = languages_1.next()) {
                var _f = __read(languages_1_1.value, 2), id = _f[0], language = _f[1];
                if (!language.name) {
                    language.name = id;
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (languages_1_1 && !languages_1_1.done && (_d = languages_1.return)) _d.call(languages_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return languages;
    };
    MonacoLanguages.prototype.createSignatureHelpProvider = function (selector, provider) {
        var _this = this;
        var triggerCharacters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            triggerCharacters[_i - 2] = arguments[_i];
        }
        var signatureHelpTriggerCharacters = __spread((provider.triggerCharacters || triggerCharacters || []));
        var signatureHelpRetriggerCharacters = __spread((provider.retriggerCharacters || []));
        return {
            signatureHelpTriggerCharacters: signatureHelpTriggerCharacters,
            signatureHelpRetriggerCharacters: signatureHelpRetriggerCharacters,
            provideSignatureHelp: function (model, position, token) { return __awaiter(_this, void 0, void 0, function () {
                var params, help;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.matchModel(selector, monaco_languageclient_1.MonacoModelIdentifier.fromModel(model))) {
                                return [2 /*return*/, undefined];
                            }
                            params = this.m2p.asTextDocumentPositionParams(model, position);
                            return [4 /*yield*/, provider.provideSignatureHelp(params, token, undefined /* not used by LC */)];
                        case 1:
                            help = _a.sent();
                            if (!help) {
                                return [2 /*return*/, undefined];
                            }
                            return [2 /*return*/, this.p2m.asSignatureHelpResult(help)];
                    }
                });
            }); }
        };
    };
    MonacoLanguages.prototype.createCodeActionProvider = function (selector, provider) {
        var _this = this;
        return {
            provideCodeActions: function (model, range, context, token) { return __awaiter(_this, void 0, void 0, function () {
                var params, actions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.matchModel(selector, monaco_languageclient_1.MonacoModelIdentifier.fromModel(model))) {
                                return [2 /*return*/, undefined];
                            }
                            params = this.m2p.asCodeActionParams(model, range, context);
                            return [4 /*yield*/, provider.provideCodeActions(params, token)];
                        case 1:
                            actions = _a.sent();
                            if (!actions) {
                                return [2 /*return*/, undefined];
                            }
                            return [2 /*return*/, this.p2m.asCodeActionList(actions)];
                    }
                });
            }); }
        };
    };
    MonacoLanguages.prototype.createCodeLensProvider = function (selector, provider) {
        var _this = this;
        return {
            provideCodeLenses: function (model, token) { return __awaiter(_this, void 0, void 0, function () {
                var params, lenses;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.matchModel(selector, monaco_languageclient_1.MonacoModelIdentifier.fromModel(model))) {
                                return [2 /*return*/, undefined];
                            }
                            params = this.m2p.asCodeLensParams(model);
                            return [4 /*yield*/, provider.provideCodeLenses(params, token)];
                        case 1:
                            lenses = _a.sent();
                            if (!lenses) {
                                return [2 /*return*/, undefined];
                            }
                            return [2 /*return*/, this.p2m.asCodeLensList(lenses)];
                    }
                });
            }); },
            resolveCodeLens: provider.resolveCodeLens ? function (model, codeLens, token) { return __awaiter(_this, void 0, void 0, function () {
                var protocolCodeLens, result, resolvedCodeLens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.matchModel(selector, monaco_languageclient_1.MonacoModelIdentifier.fromModel(model))) {
                                return [2 /*return*/, codeLens];
                            }
                            protocolCodeLens = this.m2p.asCodeLens(codeLens);
                            return [4 /*yield*/, provider.resolveCodeLens(protocolCodeLens, token)];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                resolvedCodeLens = this.p2m.asCodeLens(result);
                                Object.assign(codeLens, resolvedCodeLens);
                            }
                            return [2 /*return*/, codeLens];
                    }
                });
            }); } : (function (_, codeLens, __) { return codeLens; })
        };
    };
    MonacoLanguages = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(monaco_languageclient_1.ProtocolToMonacoConverter)),
        __param(1, inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter)),
        __param(2, inversify_1.inject(problem_manager_1.ProblemManager)),
        __metadata("design:paramtypes", [monaco_languageclient_1.ProtocolToMonacoConverter,
            monaco_languageclient_1.MonacoToProtocolConverter,
            problem_manager_1.ProblemManager])
    ], MonacoLanguages);
    return MonacoLanguages;
}(monaco_languageclient_1.MonacoLanguages));
exports.MonacoLanguages = MonacoLanguages;


/***/ }),

/***/ "./node_modules/@theia/monaco/lib/browser/monaco-snippet-suggest-provider.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@theia/monaco/lib/browser/monaco-snippet-suggest-provider.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
exports.MonacoSnippetSuggestion = exports.JsonSerializedSnippet = exports.MonacoSnippetSuggestProvider = void 0;
var jsoncparser = __webpack_require__(/*! jsonc-parser */ "./node_modules/jsonc-parser/lib/esm/main.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var common_1 = __webpack_require__(/*! @theia/filesystem/lib/common */ "./node_modules/@theia/filesystem/lib/common/index.js");
var browser_1 = __webpack_require__(/*! @theia/languages/lib/browser */ "./node_modules/@theia/languages/lib/browser/index.js");
var MonacoSnippetSuggestProvider = /** @class */ (function () {
    function MonacoSnippetSuggestProvider() {
        this.snippets = new Map();
        this.pendingSnippets = new Map();
    }
    MonacoSnippetSuggestProvider_1 = MonacoSnippetSuggestProvider;
    MonacoSnippetSuggestProvider.prototype.provideCompletionItems = function (model, position, context) {
        return __awaiter(this, void 0, void 0, function () {
            var languageId, snippetsForLanguage, pos, lineOffsets, linePrefixLow, endsInWhitespace, word, availableSnippets, suggestions, _loop_1, lineOffsets_1, lineOffsets_1_1, start;
            var e_1, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // copied and modified from https://github.com/microsoft/vscode/blob/master/src/vs/workbench/contrib/snippets/browser/snippetCompletionProvider.ts
                        if (position.column >= MonacoSnippetSuggestProvider_1._maxPrefix) {
                            return [2 /*return*/, undefined];
                        }
                        if (context.triggerKind === browser_1.CompletionTriggerKind.TriggerCharacter && context.triggerCharacter === ' ') {
                            // no snippets when suggestions have been triggered by space
                            return [2 /*return*/, undefined];
                        }
                        languageId = model.getModeId();
                        return [4 /*yield*/, this.loadSnippets(languageId)];
                    case 1:
                        _b.sent();
                        snippetsForLanguage = this.snippets.get(languageId) || [];
                        pos = { lineNumber: position.lineNumber, column: 1 };
                        lineOffsets = [];
                        linePrefixLow = model.getLineContent(position.lineNumber).substr(0, position.column - 1).toLowerCase();
                        endsInWhitespace = linePrefixLow.match(/\s$/);
                        while (pos.column < position.column) {
                            word = model.getWordAtPosition(pos);
                            if (word) {
                                // at a word
                                lineOffsets.push(word.startColumn - 1);
                                pos.column = word.endColumn + 1;
                                if (word.endColumn - 1 < linePrefixLow.length && !/\s/.test(linePrefixLow[word.endColumn - 1])) {
                                    lineOffsets.push(word.endColumn - 1);
                                }
                            }
                            else if (!/\s/.test(linePrefixLow[pos.column - 1])) {
                                // at a none-whitespace character
                                lineOffsets.push(pos.column - 1);
                                pos.column += 1;
                            }
                            else {
                                // always advance!
                                pos.column += 1;
                            }
                        }
                        availableSnippets = new Set();
                        snippetsForLanguage.forEach(availableSnippets.add, availableSnippets);
                        suggestions = [];
                        _loop_1 = function (start) {
                            availableSnippets.forEach(function (snippet) {
                                if (_this.isPatternInWord(linePrefixLow, start, linePrefixLow.length, snippet.prefix.toLowerCase(), 0, snippet.prefix.length)) {
                                    suggestions.push(new MonacoSnippetSuggestion(snippet, monaco.Range.fromPositions(position.delta(0, -(linePrefixLow.length - start)), position)));
                                    availableSnippets.delete(snippet);
                                }
                            });
                        };
                        try {
                            for (lineOffsets_1 = __values(lineOffsets), lineOffsets_1_1 = lineOffsets_1.next(); !lineOffsets_1_1.done; lineOffsets_1_1 = lineOffsets_1.next()) {
                                start = lineOffsets_1_1.value;
                                _loop_1(start);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (lineOffsets_1_1 && !lineOffsets_1_1.done && (_a = lineOffsets_1.return)) _a.call(lineOffsets_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        if (endsInWhitespace || lineOffsets.length === 0) {
                            // add remaining snippets when the current prefix ends in whitespace or when no
                            // interesting positions have been found
                            availableSnippets.forEach(function (snippet) {
                                suggestions.push(new MonacoSnippetSuggestion(snippet, monaco.Range.fromPositions(position)));
                            });
                        }
                        // disambiguate suggestions with same labels
                        suggestions.sort(MonacoSnippetSuggestion.compareByLabel);
                        return [2 /*return*/, { suggestions: suggestions }];
                }
            });
        });
    };
    MonacoSnippetSuggestProvider.prototype.resolveCompletionItem = function (textModel, position, item) {
        return item instanceof MonacoSnippetSuggestion ? item.resolve() : item;
    };
    MonacoSnippetSuggestProvider.prototype.loadSnippets = function (scope) {
        return __awaiter(this, void 0, void 0, function () {
            var pending;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pending = [];
                        pending.push.apply(pending, __spread((this.pendingSnippets.get(scope) || [])));
                        pending.push.apply(pending, __spread((this.pendingSnippets.get('*') || [])));
                        if (!pending.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(pending)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MonacoSnippetSuggestProvider.prototype.fromURI = function (uri, options) {
        var e_2, _a;
        var toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { }));
        var pending = this.loadURI(uri, options, toDispose);
        var language = options.language;
        var scopes = Array.isArray(language) ? language : !!language ? [language] : ['*'];
        var _loop_2 = function (scope) {
            var pendingSnippets = this_1.pendingSnippets.get(scope) || [];
            pendingSnippets.push(pending);
            this_1.pendingSnippets.set(scope, pendingSnippets);
            toDispose.push(disposable_1.Disposable.create(function () {
                var index = pendingSnippets.indexOf(pending);
                if (index !== -1) {
                    pendingSnippets.splice(index, 1);
                }
            }));
        };
        var this_1 = this;
        try {
            for (var scopes_1 = __values(scopes), scopes_1_1 = scopes_1.next(); !scopes_1_1.done; scopes_1_1 = scopes_1.next()) {
                var scope = scopes_1_1.value;
                _loop_2(scope);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (scopes_1_1 && !scopes_1_1.done && (_a = scopes_1.return)) _a.call(scopes_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return toDispose;
    };
    /**
     * should NOT throw to prevent load errors on suggest
     */
    MonacoSnippetSuggestProvider.prototype.loadURI = function (uri, options, toDispose) {
        return __awaiter(this, void 0, void 0, function () {
            var content, snippets, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.filesystem.resolveContent(uri.toString(), { encoding: 'utf-8' })];
                    case 1:
                        content = (_a.sent()).content;
                        if (toDispose.disposed) {
                            return [2 /*return*/];
                        }
                        snippets = content && jsoncparser.parse(content, undefined, { disallowComments: false });
                        toDispose.push(this.fromJSON(snippets, options));
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        if (!common_1.FileSystemError.FileNotFound.is(e_3) && !common_1.FileSystemError.FileIsDirectory.is(e_3)) {
                            console.error(e_3);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MonacoSnippetSuggestProvider.prototype.fromJSON = function (snippets, _a) {
        var _this = this;
        var language = _a.language, source = _a.source;
        var toDispose = new disposable_1.DisposableCollection();
        this.parseSnippets(snippets, function (name, snippet) {
            var e_4, _a;
            var prefix = snippet.prefix, body = snippet.body, description = snippet.description;
            var parsedBody = Array.isArray(body) ? body.join('\n') : body;
            var parsedPrefixes = Array.isArray(prefix) ? prefix : [prefix];
            if (typeof parsedBody !== 'string') {
                return;
            }
            var scopes = [];
            if (language) {
                if (Array.isArray(language)) {
                    scopes.push.apply(scopes, __spread(language));
                }
                else {
                    scopes.push(language);
                }
            }
            else if (typeof snippet.scope === 'string') {
                try {
                    for (var _b = __values(snippet.scope.split(',')), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var rawScope = _c.value;
                        var scope = rawScope.trim();
                        if (scope) {
                            scopes.push(scope);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            parsedPrefixes.forEach(function (parsedPrefix) { return toDispose.push(_this.push({
                scopes: scopes,
                name: name,
                prefix: parsedPrefix,
                description: description,
                body: parsedBody,
                source: source
            })); });
        });
        return toDispose;
    };
    MonacoSnippetSuggestProvider.prototype.parseSnippets = function (snippets, accept) {
        if (typeof snippets === 'object') {
            // eslint-disable-next-line guard-for-in
            for (var name_1 in snippets) {
                var scopeOrTemplate = snippets[name_1];
                if (JsonSerializedSnippet.is(scopeOrTemplate)) {
                    accept(name_1, scopeOrTemplate);
                }
                else {
                    this.parseSnippets(scopeOrTemplate, accept);
                }
            }
        }
    };
    MonacoSnippetSuggestProvider.prototype.push = function () {
        var e_5, _a;
        var snippets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            snippets[_i] = arguments[_i];
        }
        var toDispose = new disposable_1.DisposableCollection();
        var _loop_3 = function (snippet) {
            var e_6, _a;
            var _loop_4 = function (scope) {
                var languageSnippets = this_2.snippets.get(scope) || [];
                languageSnippets.push(snippet);
                this_2.snippets.set(scope, languageSnippets);
                toDispose.push(disposable_1.Disposable.create(function () {
                    var index = languageSnippets.indexOf(snippet);
                    if (index !== -1) {
                        languageSnippets.splice(index, 1);
                    }
                }));
            };
            try {
                for (var _b = (e_6 = void 0, __values(snippet.scopes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var scope = _c.value;
                    _loop_4(scope);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        };
        var this_2 = this;
        try {
            for (var snippets_1 = __values(snippets), snippets_1_1 = snippets_1.next(); !snippets_1_1.done; snippets_1_1 = snippets_1.next()) {
                var snippet = snippets_1_1.value;
                _loop_3(snippet);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (snippets_1_1 && !snippets_1_1.done && (_a = snippets_1.return)) _a.call(snippets_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return toDispose;
    };
    MonacoSnippetSuggestProvider.prototype.isPatternInWord = function (patternLow, patternPos, patternLen, wordLow, wordPos, wordLen) {
        while (patternPos < patternLen && wordPos < wordLen) {
            if (patternLow[patternPos] === wordLow[wordPos]) {
                patternPos += 1;
            }
            wordPos += 1;
        }
        return patternPos === patternLen; // pattern must be exhausted
    };
    var MonacoSnippetSuggestProvider_1;
    MonacoSnippetSuggestProvider._maxPrefix = 10000;
    __decorate([
        inversify_1.inject(common_1.FileSystem),
        __metadata("design:type", Object)
    ], MonacoSnippetSuggestProvider.prototype, "filesystem", void 0);
    MonacoSnippetSuggestProvider = MonacoSnippetSuggestProvider_1 = __decorate([
        inversify_1.injectable()
    ], MonacoSnippetSuggestProvider);
    return MonacoSnippetSuggestProvider;
}());
exports.MonacoSnippetSuggestProvider = MonacoSnippetSuggestProvider;
var JsonSerializedSnippet;
(function (JsonSerializedSnippet) {
    function is(obj) {
        return typeof obj === 'object' && 'body' in obj && 'prefix' in obj;
    }
    JsonSerializedSnippet.is = is;
})(JsonSerializedSnippet = exports.JsonSerializedSnippet || (exports.JsonSerializedSnippet = {}));
var MonacoSnippetSuggestion = /** @class */ (function () {
    function MonacoSnippetSuggestion(snippet, range) {
        this.snippet = snippet;
        this.range = range;
        this.noAutoAccept = true;
        this.kind = monaco.languages.CompletionItemKind.Snippet;
        this.insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
        this.resolved = false;
        this.label = snippet.prefix;
        this.detail = (snippet.description || snippet.name) + " (" + snippet.source + ")";
        this.insertText = snippet.body;
        this.sortText = "z-" + snippet.prefix;
        this.range = range;
    }
    MonacoSnippetSuggestion.prototype.resolve = function () {
        if (!this.resolved) {
            var codeSnippet = new monaco.snippetParser.SnippetParser().parse(this.snippet.body).toString();
            this.documentation = { value: '```\n' + codeSnippet + '```' };
            this.resolved = true;
        }
        return this;
    };
    MonacoSnippetSuggestion.compareByLabel = function (a, b) {
        return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
    };
    return MonacoSnippetSuggestion;
}());
exports.MonacoSnippetSuggestion = MonacoSnippetSuggestion;


/***/ })

}]);
//# sourceMappingURL=52.bundle.js.map