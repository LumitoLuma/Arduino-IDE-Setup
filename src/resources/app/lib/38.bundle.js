(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "./node_modules/@theia/plugin-ext/lib/common/uri-components.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/common/uri-components.js ***!
  \*********************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.theiaUritoUriComponents = exports.Schemes = void 0;
// some well known URI schemas
var Schemes;
(function (Schemes) {
    Schemes.FILE = 'file';
    Schemes.UNTITLED = 'untitled';
    Schemes.HTTP = 'http';
    Schemes.HTTPS = 'https';
    Schemes.MAILTO = 'mailto';
    Schemes.DATA = 'data';
    /**
     * A schema is used for models that exist in memory
     * only and that have no correspondence on a server or such.
     */
    Schemes.IN_MEMORY = 'inmemory';
    /** A schema is used for settings files. */
    Schemes.VSCODE = 'vscode';
    /** A schema is used for internal private files. */
    Schemes.INTERNAL = 'private';
    Schemes.COMMAND = 'command';
})(Schemes = exports.Schemes || (exports.Schemes = {}));
function theiaUritoUriComponents(uri) {
    return {
        scheme: uri.scheme,
        authority: uri.authority,
        path: uri.path.toString(),
        query: uri.query,
        fragment: uri.fragment
    };
}
exports.theiaUritoUriComponents = theiaUritoUriComponents;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/main/browser/plugin-shared-style.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/main/browser/plugin-shared-style.js ***!
  \********************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.PluginSharedStyle = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var theming_1 = __webpack_require__(/*! @theia/core/lib/browser/theming */ "./node_modules/@theia/core/lib/browser/theming.js");
var reference_1 = __webpack_require__(/*! @theia/core/lib/common/reference */ "./node_modules/@theia/core/lib/common/reference.js");
var endpoint_1 = __webpack_require__(/*! @theia/core/lib/browser/endpoint */ "./node_modules/@theia/core/lib/browser/endpoint.js");
var PluginSharedStyle = /** @class */ (function () {
    function PluginSharedStyle() {
        var _this = this;
        this.rules = [];
        this.toUpdate = new disposable_1.DisposableCollection();
        this.icons = new reference_1.SyncReferenceCollection(function (key) { return _this.createPluginIcon(key); });
        this.iconSequence = 0;
        this.update();
        theming_1.ThemeService.get().onThemeChange(function () { return _this.update(); });
    }
    PluginSharedStyle_1 = PluginSharedStyle;
    PluginSharedStyle.prototype.update = function () {
        var e_1, _a;
        this.toUpdate.dispose();
        var style = this.style = document.createElement('style');
        style.type = 'text/css';
        style.media = 'screen';
        document.getElementsByTagName('head')[0].appendChild(style);
        this.toUpdate.push(disposable_1.Disposable.create(function () {
            return document.getElementsByTagName('head')[0].removeChild(style);
        }));
        try {
            for (var _b = __values(this.rules), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rule = _c.value;
                this.doInsertRule(rule);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    PluginSharedStyle.prototype.insertRule = function (selector, body) {
        var _this = this;
        var rule = { selector: selector, body: body };
        this.rules.push(rule);
        this.doInsertRule(rule);
        return disposable_1.Disposable.create(function () {
            var index = _this.rules.indexOf(rule);
            if (index !== -1) {
                _this.rules.splice(index, 1);
                _this.deleteRule(selector);
            }
        });
    };
    PluginSharedStyle.prototype.doInsertRule = function (_a) {
        var selector = _a.selector, body = _a.body;
        var sheet = this.style.sheet;
        var cssBody = body(theming_1.ThemeService.get().getCurrentTheme());
        sheet.insertRule(selector + ' {\n' + cssBody + '\n}', 0);
    };
    PluginSharedStyle.prototype.deleteRule = function (selector) {
        var sheet = this.style.sheet;
        var rules = sheet.rules || sheet.cssRules || [];
        for (var i = rules.length - 1; i >= 0; i--) {
            var rule = rules[i];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (rule.selectorText.indexOf(selector) !== -1) {
                sheet.deleteRule(i);
            }
        }
    };
    PluginSharedStyle.prototype.toIconClass = function (url, _a) {
        var size = (_a === void 0 ? { size: 16 } : _a).size;
        return this.icons.acquire({ url: url, size: size });
    };
    PluginSharedStyle.prototype.createPluginIcon = function (key) {
        var iconUrl = key.url;
        var size = key.size;
        var darkIconUrl = PluginSharedStyle_1.toExternalIconUrl("" + (typeof iconUrl === 'object' ? iconUrl.dark : iconUrl));
        var lightIconUrl = PluginSharedStyle_1.toExternalIconUrl("" + (typeof iconUrl === 'object' ? iconUrl.light : iconUrl));
        var iconClass = 'plugin-icon-' + this.iconSequence++;
        var toDispose = new disposable_1.DisposableCollection();
        toDispose.push(this.insertRule('.' + iconClass, function (theme) { return "\n                display: inline-block;\n                background-position: 2px;\n                width: " + size + "px;\n                height: " + size + "px;\n                background: no-repeat url(\"" + (theme.type === 'light' ? lightIconUrl : darkIconUrl) + "\");\n                background-size: " + size + "px;\n            "; }));
        return {
            iconClass: iconClass,
            dispose: function () { return toDispose.dispose(); }
        };
    };
    PluginSharedStyle.toExternalIconUrl = function (iconUrl) {
        if (iconUrl.startsWith('hostedPlugin/')) {
            return new endpoint_1.Endpoint({ path: iconUrl }).getRestUrl().toString();
        }
        return iconUrl;
    };
    var PluginSharedStyle_1;
    PluginSharedStyle = PluginSharedStyle_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], PluginSharedStyle);
    return PluginSharedStyle;
}());
exports.PluginSharedStyle = PluginSharedStyle;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-environment.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-environment.js ***!
  \****************************************************************************************/
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
exports.WebviewEnvironment = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var endpoint_1 = __webpack_require__(/*! @theia/core/lib/browser/endpoint */ "./node_modules/@theia/core/lib/browser/endpoint.js");
var promise_util_1 = __webpack_require__(/*! @theia/core/lib/common/promise-util */ "./node_modules/@theia/core/lib/common/promise-util.js");
var env_variables_1 = __webpack_require__(/*! @theia/core/lib/common/env-variables */ "./node_modules/@theia/core/lib/common/env-variables/index.js");
var webview_protocol_1 = __webpack_require__(/*! ../../common/webview-protocol */ "./node_modules/@theia/plugin-ext/lib/main/common/webview-protocol.js");
var environment_1 = __webpack_require__(/*! @theia/application-package/lib/environment */ "./node_modules/@theia/application-package/lib/environment.js");
var WebviewEnvironment = /** @class */ (function () {
    function WebviewEnvironment() {
        this.externalEndpointHost = new promise_util_1.Deferred();
    }
    WebviewEnvironment.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpointPattern, variable, host, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        endpointPattern = void 0;
                        if (!environment_1.environment.electron.is()) return [3 /*break*/, 1];
                        endpointPattern = webview_protocol_1.WebviewExternalEndpoint.defaultPattern;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.environments.getValue(webview_protocol_1.WebviewExternalEndpoint.pattern)];
                    case 2:
                        variable = _a.sent();
                        endpointPattern = variable && variable.value || webview_protocol_1.WebviewExternalEndpoint.defaultPattern;
                        _a.label = 3;
                    case 3:
                        host = new endpoint_1.Endpoint().host;
                        this.externalEndpointHost.resolve(endpointPattern.replace('{{hostname}}', host));
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        this.externalEndpointHost.reject(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    WebviewEnvironment.prototype.externalEndpointUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.externalEndpointHost.promise];
                    case 1:
                        host = _a.sent();
                        return [2 /*return*/, new endpoint_1.Endpoint({
                                host: host,
                                path: '/webview'
                            }).getRestUrl()];
                }
            });
        });
    };
    WebviewEnvironment.prototype.externalEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.externalEndpointUrl()];
                    case 1: return [2 /*return*/, (_a.sent()).toString(true)];
                }
            });
        });
    };
    WebviewEnvironment.prototype.resourceRoot = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.externalEndpointUrl()];
                    case 1: return [2 /*return*/, (_a.sent()).resolve('theia-resource/{{resource}}').toString(true)];
                }
            });
        });
    };
    WebviewEnvironment.prototype.cspSource = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.externalEndpointUrl()];
                    case 1: return [2 /*return*/, (_a.sent()).withPath('').withQuery('').withFragment('').toString(true).replace('{{uuid}}', '*')];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(env_variables_1.EnvVariablesServer),
        __metadata("design:type", Object)
    ], WebviewEnvironment.prototype, "environments", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], WebviewEnvironment.prototype, "init", null);
    WebviewEnvironment = __decorate([
        inversify_1.injectable()
    ], WebviewEnvironment);
    return WebviewEnvironment;
}());
exports.WebviewEnvironment = WebviewEnvironment;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-preferences.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-preferences.js ***!
  \****************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindWebviewPreferences = exports.createWebviewPreferences = exports.WebviewPreferences = exports.WebviewConfigSchema = void 0;
var preferences_1 = __webpack_require__(/*! @theia/core/lib/browser/preferences */ "./node_modules/@theia/core/lib/browser/preferences/index.js");
exports.WebviewConfigSchema = {
    'type': 'object',
    'properties': {
        'webview.trace': {
            'type': 'string',
            'enum': ['off', 'on', 'verbose'],
            'description': 'Controls communication tracing with webviews.',
            'default': 'off'
        }
    }
};
exports.WebviewPreferences = Symbol('WebviewPreferences');
function createWebviewPreferences(preferences) {
    return preferences_1.createPreferenceProxy(preferences, exports.WebviewConfigSchema);
}
exports.createWebviewPreferences = createWebviewPreferences;
function bindWebviewPreferences(bind) {
    bind(exports.WebviewPreferences).toDynamicValue(function (ctx) {
        var preferences = ctx.container.get(preferences_1.PreferenceService);
        return createWebviewPreferences(preferences);
    });
    bind(preferences_1.PreferenceContribution).toConstantValue({ schema: exports.WebviewConfigSchema });
}
exports.bindWebviewPreferences = bindWebviewPreferences;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-resource-cache.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-resource-cache.js ***!
  \*******************************************************************************************/
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
exports.WebviewResourceCache = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var promise_util_1 = __webpack_require__(/*! @theia/core/lib/common/promise-util */ "./node_modules/@theia/core/lib/common/promise-util.js");
/**
 * Browser based cache of webview resources across all instances.
 */
var WebviewResourceCache = /** @class */ (function () {
    function WebviewResourceCache() {
        this.cache = new promise_util_1.Deferred();
        this.resolveCache();
    }
    WebviewResourceCache.prototype.resolveCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = this.cache).resolve;
                        return [4 /*yield*/, caches.open('webview:v1')];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _c.sent();
                        console.error('Failed to enable webview caching: ', e_1);
                        this.cache.resolve(undefined);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WebviewResourceCache.prototype.match = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var cache, response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cache.promise];
                    case 1:
                        cache = _a.sent();
                        if (!cache) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, cache.match(url)];
                    case 2:
                        response = _a.sent();
                        if (!response) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, {
                                eTag: response.headers.get('ETag') || undefined,
                                body: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var buffer;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, response.arrayBuffer()];
                                            case 1:
                                                buffer = _a.sent();
                                                return [2 /*return*/, new Uint8Array(buffer)];
                                        }
                                    });
                                }); }
                            }];
                }
            });
        });
    };
    WebviewResourceCache.prototype.delete = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var cache;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cache.promise];
                    case 1:
                        cache = _a.sent();
                        if (!cache) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, cache.delete(url)];
                }
            });
        });
    };
    WebviewResourceCache.prototype.put = function (url, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cache, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!response.eTag) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.cache.promise];
                    case 1:
                        cache = _a.sent();
                        if (!cache) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, response.body()];
                    case 2:
                        body = _a.sent();
                        return [4 /*yield*/, cache.put(url, new Response(body, {
                                status: 200,
                                headers: { 'ETag': response.eTag }
                            }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebviewResourceCache = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], WebviewResourceCache);
    return WebviewResourceCache;
}());
exports.WebviewResourceCache = WebviewResourceCache;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-theme-data-provider.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-theme-data-provider.js ***!
  \************************************************************************************************/
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
// copied and modified from https://github.com/microsoft/vscode/blob/ba40bd16433d5a817bfae15f3b4350e18f144af4/src/vs/workbench/contrib/webview/common/themeing.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.WebviewThemeDataProvider = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var editor_preferences_1 = __webpack_require__(/*! @theia/editor/lib/browser/editor-preferences */ "./node_modules/@theia/editor/lib/browser/editor-preferences.js");
var theming_1 = __webpack_require__(/*! @theia/core/lib/browser/theming */ "./node_modules/@theia/core/lib/browser/theming.js");
var color_registry_1 = __webpack_require__(/*! @theia/core/lib/browser/color-registry */ "./node_modules/@theia/core/lib/browser/color-registry.js");
var color_application_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/color-application-contribution */ "./node_modules/@theia/core/lib/browser/color-application-contribution.js");
var WebviewThemeDataProvider = /** @class */ (function () {
    function WebviewThemeDataProvider() {
        this.onDidChangeThemeDataEmitter = new event_1.Emitter();
        this.onDidChangeThemeData = this.onDidChangeThemeDataEmitter.event;
        this.editorStyles = new Map([
            ['editor.fontFamily', 'editor-font-family'],
            ['editor.fontWeight', 'editor-font-weight'],
            ['editor.fontSize', 'editor-font-size']
        ]);
    }
    WebviewThemeDataProvider.prototype.init = function () {
        var _this = this;
        this.colorContribution.onDidChange(function () { return _this.reset(); });
        this.editorPreferences.onPreferenceChanged(function (e) {
            if (_this.editorStyles.has(e.preferenceName)) {
                _this.reset();
            }
        });
    };
    WebviewThemeDataProvider.prototype.reset = function () {
        if (this.themeData) {
            this.themeData = undefined;
            this.onDidChangeThemeDataEmitter.fire(undefined);
        }
    };
    WebviewThemeDataProvider.prototype.getThemeData = function () {
        if (!this.themeData) {
            this.themeData = this.computeThemeData();
        }
        return this.themeData;
    };
    WebviewThemeDataProvider.prototype.computeThemeData = function () {
        var e_1, _a;
        var _this = this;
        var styles = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var addStyle = function (id, rawValue) {
            if (rawValue) {
                var value = typeof rawValue === 'number' || typeof rawValue === 'string' ? rawValue : String(rawValue);
                styles[_this.colors.toCssVariableName(id).substr(2)] = value;
                styles[_this.colors.toCssVariableName(id, 'vscode').substr(2)] = value;
            }
        };
        addStyle('font-family', '-apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "Ubuntu", "Droid Sans", sans-serif');
        addStyle('font-weight', 'normal');
        addStyle('font-size', '13px');
        this.editorStyles.forEach(function (value, key) { return addStyle(value, _this.editorPreferences[key]); });
        try {
            for (var _b = __values(this.colors.getColors()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                var color = this.colors.getCurrentColor(id);
                if (color) {
                    addStyle(id, color.toString());
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var activeTheme = this.getActiveTheme();
        return { styles: styles, activeTheme: activeTheme };
    };
    WebviewThemeDataProvider.prototype.getActiveTheme = function () {
        var theme = theming_1.ThemeService.get().getCurrentTheme();
        switch (theme.type) {
            case 'light': return 'vscode-light';
            case 'dark': return 'vscode-dark';
            default: return 'vscode-high-contrast';
        }
    };
    __decorate([
        inversify_1.inject(editor_preferences_1.EditorPreferences),
        __metadata("design:type", Object)
    ], WebviewThemeDataProvider.prototype, "editorPreferences", void 0);
    __decorate([
        inversify_1.inject(color_registry_1.ColorRegistry),
        __metadata("design:type", color_registry_1.ColorRegistry)
    ], WebviewThemeDataProvider.prototype, "colors", void 0);
    __decorate([
        inversify_1.inject(color_application_contribution_1.ColorApplicationContribution),
        __metadata("design:type", color_application_contribution_1.ColorApplicationContribution)
    ], WebviewThemeDataProvider.prototype, "colorContribution", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WebviewThemeDataProvider.prototype, "init", null);
    WebviewThemeDataProvider = __decorate([
        inversify_1.injectable()
    ], WebviewThemeDataProvider);
    return WebviewThemeDataProvider;
}());
exports.WebviewThemeDataProvider = WebviewThemeDataProvider;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview.js ***!
  \****************************************************************************/
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
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
// copied and modified from https://github.com/microsoft/vscode/blob/ba40bd16433d5a817bfae15f3b4350e18f144af4/src/vs/workbench/contrib/webview/browser/baseWebviewElement.ts
// copied and modified from https://github.com/microsoft/vscode/blob/ba40bd16433d5a817bfae15f3b4350e18f144af4/src/vs/workbench/contrib/webview/browser/webviewElement.ts#
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebviewWidget = exports.WebviewWidgetExternalEndpoint = exports.WebviewWidgetIdentifier = void 0;
var mime = __webpack_require__(/*! mime */ "./node_modules/mime/index.js");
var json_1 = __webpack_require__(/*! @phosphor/coreutils/lib/json */ "./node_modules/@phosphor/coreutils/lib/json.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var widget_1 = __webpack_require__(/*! @theia/core/lib/browser/widgets/widget */ "./node_modules/@theia/core/lib/browser/widgets/widget.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var application_shell_mouse_tracker_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/application-shell-mouse-tracker */ "./node_modules/@theia/core/lib/browser/shell/application-shell-mouse-tracker.js");
var promise_util_1 = __webpack_require__(/*! @theia/core/lib/common/promise-util */ "./node_modules/@theia/core/lib/common/promise-util.js");
var webview_environment_1 = __webpack_require__(/*! ./webview-environment */ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-environment.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var opener_service_1 = __webpack_require__(/*! @theia/core/lib/browser/opener-service */ "./node_modules/@theia/core/lib/browser/opener-service.js");
var keybinding_1 = __webpack_require__(/*! @theia/core/lib/browser/keybinding */ "./node_modules/@theia/core/lib/browser/keybinding.js");
var uri_components_1 = __webpack_require__(/*! ../../../common/uri-components */ "./node_modules/@theia/plugin-ext/lib/common/uri-components.js");
var plugin_shared_style_1 = __webpack_require__(/*! ../plugin-shared-style */ "./node_modules/@theia/plugin-ext/lib/main/browser/plugin-shared-style.js");
var webview_theme_data_provider_1 = __webpack_require__(/*! ./webview-theme-data-provider */ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-theme-data-provider.js");
var external_uri_service_1 = __webpack_require__(/*! @theia/core/lib/browser/external-uri-service */ "./node_modules/@theia/core/lib/browser/external-uri-service.js");
var output_channel_1 = __webpack_require__(/*! @theia/output/lib/common/output-channel */ "./node_modules/@theia/output/lib/common/output-channel.js");
var webview_preferences_1 = __webpack_require__(/*! ./webview-preferences */ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-preferences.js");
var webview_protocol_1 = __webpack_require__(/*! ../../common/webview-protocol */ "./node_modules/@theia/plugin-ext/lib/main/common/webview-protocol.js");
var webview_resource_cache_1 = __webpack_require__(/*! ./webview-resource-cache */ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-resource-cache.js");
var endpoint_1 = __webpack_require__(/*! @theia/core/lib/browser/endpoint */ "./node_modules/@theia/core/lib/browser/endpoint.js");
// Style from core
var TRANSPARENT_OVERLAY_STYLE = 'theia-transparent-overlay';
var WebviewWidgetIdentifier = /** @class */ (function () {
    function WebviewWidgetIdentifier() {
    }
    WebviewWidgetIdentifier = __decorate([
        inversify_1.injectable()
    ], WebviewWidgetIdentifier);
    return WebviewWidgetIdentifier;
}());
exports.WebviewWidgetIdentifier = WebviewWidgetIdentifier;
exports.WebviewWidgetExternalEndpoint = Symbol('WebviewWidgetExternalEndpoint');
var WebviewWidget = /** @class */ (function (_super) {
    __extends(WebviewWidget, _super);
    function WebviewWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewState = {
            visible: false,
            active: false,
            position: 0
        };
        _this.html = '';
        _this._contentOptions = {};
        _this.options = {};
        _this.ready = new promise_util_1.Deferred();
        _this.onMessageEmitter = new event_1.Emitter();
        _this.onMessage = _this.onMessageEmitter.event;
        _this.pendingMessages = [];
        _this.toHide = new disposable_1.DisposableCollection();
        _this.toDisposeOnIcon = new disposable_1.DisposableCollection();
        return _this;
    }
    WebviewWidget_1 = WebviewWidget;
    Object.defineProperty(WebviewWidget.prototype, "contentOptions", {
        get: function () {
            return this._contentOptions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebviewWidget.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    WebviewWidget.prototype.init = function () {
        var _this = this;
        this.node.tabIndex = 0;
        this.id = WebviewWidget_1.FACTORY_ID + ':' + this.identifier.id;
        this.title.closable = true;
        this.addClass(WebviewWidget_1.Styles.WEBVIEW);
        this.toDispose.push(this.onMessageEmitter);
        this.transparentOverlay = document.createElement('div');
        this.transparentOverlay.classList.add(TRANSPARENT_OVERLAY_STYLE);
        this.transparentOverlay.style.display = 'none';
        this.node.appendChild(this.transparentOverlay);
        this.toDispose.push(this.mouseTracker.onMousedown(function () {
            if (_this.element && _this.element.style.display !== 'none') {
                _this.transparentOverlay.style.display = 'block';
            }
        }));
        this.toDispose.push(this.mouseTracker.onMouseup(function () {
            if (_this.element && _this.element.style.display !== 'none') {
                _this.transparentOverlay.style.display = 'none';
            }
        }));
    };
    WebviewWidget.prototype.onBeforeAttach = function (msg) {
        var _this = this;
        _super.prototype.onBeforeAttach.call(this, msg);
        this.doShow();
        // iframe has to be reloaded when moved to another DOM element
        this.toDisposeOnDetach.push(disposable_1.Disposable.create(function () { return _this.forceHide(); }));
    };
    WebviewWidget.prototype.onAfterAttach = function (msg) {
        var _this = this;
        _super.prototype.onAfterAttach.call(this, msg);
        this.addEventListener(this.node, 'focus', function () {
            if (_this.element) {
                _this.doSend('focus');
            }
        });
    };
    WebviewWidget.prototype.onBeforeShow = function (msg) {
        _super.prototype.onBeforeShow.call(this, msg);
        this.doShow();
    };
    WebviewWidget.prototype.onAfterHide = function (msg) {
        _super.prototype.onAfterHide.call(this, msg);
        this.doHide();
    };
    WebviewWidget.prototype.doHide = function () {
        var _this = this;
        if (this.options.retainContextWhenHidden !== true) {
            if (this.hideTimeout === undefined) {
                // avoid removing iframe if a widget moved quickly
                this.hideTimeout = setTimeout(function () { return _this.forceHide(); }, 50);
            }
        }
    };
    WebviewWidget.prototype.forceHide = function () {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = undefined;
        this.toHide.dispose();
    };
    WebviewWidget.prototype.doShow = function () {
        var _this = this;
        clearTimeout(this.hideTimeout);
        this.hideTimeout = undefined;
        if (!this.toHide.disposed) {
            return;
        }
        this.toDispose.push(this.toHide);
        var element = document.createElement('iframe');
        element.className = 'webview';
        element.sandbox.add('allow-scripts', 'allow-forms', 'allow-same-origin');
        element.setAttribute('src', this.externalEndpoint + "/index.html?id=" + this.identifier.id);
        element.style.border = 'none';
        element.style.width = '100%';
        element.style.height = '100%';
        this.element = element;
        this.node.appendChild(this.element);
        this.toHide.push(disposable_1.Disposable.create(function () {
            if (_this.element) {
                _this.element.remove();
                _this.element = undefined;
            }
        }));
        var oldReady = this.ready;
        var ready = new promise_util_1.Deferred();
        ready.promise.then(function () { return oldReady.resolve(); });
        this.ready = ready;
        this.toHide.push(disposable_1.Disposable.create(function () { return _this.ready = new promise_util_1.Deferred(); }));
        var subscription = this.on("webview-ready" /* webviewReady */, function () {
            subscription.dispose();
            ready.resolve();
        });
        this.toHide.push(subscription);
        this.toHide.push(this.on("onmessage" /* onmessage */, function (data) { return _this.onMessageEmitter.fire(data); }));
        this.toHide.push(this.on("did-click-link" /* didClickLink */, function (uri) { return _this.openLink(new uri_1.default(uri)); }));
        this.toHide.push(this.on("do-update-state" /* doUpdateState */, function (state) {
            _this._state = state;
        }));
        this.toHide.push(this.on("did-focus" /* didFocus */, function () {
            // emulate the webview focus without actually changing focus
            return _this.node.dispatchEvent(new FocusEvent('focus'));
        }));
        this.toHide.push(this.on("did-blur" /* didBlur */, function () {
            /* no-op: webview loses focus only if another element gains focus in the main window */
        }));
        this.toHide.push(this.on("do-reload" /* doReload */, function () { return _this.reload(); }));
        this.toHide.push(this.on("load-resource" /* loadResource */, function (entry) { return _this.loadResource(entry.path); }));
        this.toHide.push(this.on("load-localhost" /* loadLocalhost */, function (entry) {
            return _this.loadLocalhost(entry.origin);
        }));
        this.toHide.push(this.on("did-keydown" /* didKeydown */, function (data) {
            // Electron: workaround for https://github.com/electron/electron/issues/14258
            // We have to detect keyboard events in the <webview> and dispatch them to our
            // keybinding service because these events do not bubble to the parent window anymore.
            _this.keybindings.dispatchKeyDown(data, _this.element);
        }));
        this.style();
        this.toHide.push(this.themeDataProvider.onDidChangeThemeData(function () { return _this.style(); }));
        this.doUpdateContent();
        while (this.pendingMessages.length) {
            this.sendMessage(this.pendingMessages.shift());
        }
    };
    WebviewWidget.prototype.loadLocalhost = function (origin) {
        return __awaiter(this, void 0, void 0, function () {
            var redirect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRedirect(origin)];
                    case 1:
                        redirect = _a.sent();
                        return [2 /*return*/, this.doSend('did-load-localhost', { origin: origin, location: redirect })];
                }
            });
        });
    };
    WebviewWidget.prototype.getRedirect = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, localhost, _a, _b, mapping;
            var e_1, _c;
            return __generator(this, function (_d) {
                uri = new uri_1.default(url);
                localhost = this.externalUriService.parseLocalhost(uri);
                if (!localhost) {
                    return [2 /*return*/, undefined];
                }
                if (this._contentOptions.portMapping) {
                    try {
                        for (_a = __values(this._contentOptions.portMapping), _b = _a.next(); !_b.done; _b = _a.next()) {
                            mapping = _b.value;
                            if (mapping.webviewPort === localhost.port) {
                                if (mapping.webviewPort !== mapping.extensionHostPort) {
                                    return [2 /*return*/, this.toRemoteUrl(uri.withAuthority(localhost.address + ":" + mapping.extensionHostPort))];
                                }
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                return [2 /*return*/, this.toRemoteUrl(uri)];
            });
        });
    };
    WebviewWidget.prototype.toRemoteUrl = function (localUri) {
        return __awaiter(this, void 0, void 0, function () {
            var remoteUri, remoteUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.externalUriService.resolve(localUri)];
                    case 1:
                        remoteUri = _a.sent();
                        remoteUrl = remoteUri.toString();
                        if (remoteUrl[remoteUrl.length - 1] === '/') {
                            return [2 /*return*/, remoteUrl.slice(0, remoteUrl.length - 1)];
                        }
                        return [2 /*return*/, remoteUrl];
                }
            });
        });
    };
    WebviewWidget.prototype.setContentOptions = function (contentOptions) {
        if (json_1.JSONExt.deepEqual(this.contentOptions, contentOptions)) {
            return;
        }
        this._contentOptions = contentOptions;
        this.doUpdateContent();
    };
    WebviewWidget.prototype.setIconUrl = function (iconUrl) {
        if ((this.iconUrl && iconUrl && json_1.JSONExt.deepEqual(this.iconUrl, iconUrl)) || (this.iconUrl === iconUrl)) {
            return;
        }
        this.toDisposeOnIcon.dispose();
        this.toDispose.push(this.toDisposeOnIcon);
        this.iconUrl = iconUrl;
        if (iconUrl) {
            var darkIconUrl_1 = typeof iconUrl === 'object' ? iconUrl.dark : iconUrl;
            var lightIconUrl_1 = typeof iconUrl === 'object' ? iconUrl.light : iconUrl;
            var iconClass = "webview-" + this.identifier.id + "-file-icon";
            this.toDisposeOnIcon.push(this.sharedStyle.insertRule(".theia-webview-icon." + iconClass + "::before", function (theme) { return "background-image: url(" + (theme.type === 'light' ? lightIconUrl_1 : darkIconUrl_1) + ");"; }));
            this.title.iconClass = "theia-webview-icon " + iconClass;
        }
        else {
            this.title.iconClass = '';
        }
    };
    WebviewWidget.prototype.setHTML = function (value) {
        this.html = this.preprocessHtml(value);
        this.doUpdateContent();
    };
    WebviewWidget.prototype.preprocessHtml = function (value) {
        var _this = this;
        return value
            .replace(/(["'])(?:vscode|theia)-resource:(\/\/([^\s\/'"]+?)(?=\/))?([^\s'"]+?)(["'])/gi, function (_, startQuote, _1, scheme, path, endQuote) {
            if (scheme) {
                return "" + startQuote + _this.externalEndpoint + "/theia-resource/" + scheme + path + endQuote;
            }
            return "" + startQuote + _this.externalEndpoint + "/theia-resource/file" + path + endQuote;
        });
    };
    WebviewWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        this.node.focus();
    };
    WebviewWidget.prototype.reload = function () {
        this.doUpdateContent();
    };
    WebviewWidget.prototype.style = function () {
        var _a = this.themeDataProvider.getThemeData(), styles = _a.styles, activeTheme = _a.activeTheme;
        this.doSend('styles', { styles: styles, activeTheme: activeTheme });
    };
    WebviewWidget.prototype.openLink = function (link) {
        var supported = this.toSupportedLink(link);
        if (supported) {
            opener_service_1.open(this.openerService, supported);
        }
    };
    WebviewWidget.prototype.toSupportedLink = function (link) {
        var e_2, _a;
        if (WebviewWidget_1.standardSupportedLinkSchemes.has(link.scheme)) {
            var linkAsString = link.toString();
            try {
                for (var _b = __values([this.externalEndpoint + '/theia-resource', this.externalEndpoint + '/vscode-resource']), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var resourceRoot = _c.value;
                    if (linkAsString.startsWith(resourceRoot + '/')) {
                        return this.normalizeRequestUri(linkAsString.substr(resourceRoot.length));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return link;
        }
        if (!!this.contentOptions.enableCommandUris && link.scheme === uri_components_1.Schemes.COMMAND) {
            return link;
        }
        return undefined;
    };
    WebviewWidget.prototype.loadResource = function (requestPath) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedUri, cacheUrl, _loop_1, this_1, _a, _b, root, state_1, e_3_1, _c;
            var e_3, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        normalizedUri = this.normalizeRequestUri(requestPath);
                        cacheUrl = new endpoint_1.Endpoint({ path: normalizedUri.path.toString() }).getRestUrl().toString();
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 10, , 11]);
                        if (!this.contentOptions.localResourceRoots) return [3 /*break*/, 9];
                        _loop_1 = function (root) {
                            var cached, response, buffer_1, eTag, data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!new uri_1.default(root).path.isEqualOrParent(normalizedUri.path)) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        return [4 /*yield*/, this_1.resourceCache.match(cacheUrl)];
                                    case 1:
                                        cached = _a.sent();
                                        return [4 /*yield*/, this_1.resourceLoader.load({ uri: normalizedUri.toString(), eTag: cached && cached.eTag })];
                                    case 2:
                                        response = _a.sent();
                                        if (response) {
                                            buffer_1 = response.buffer, eTag = response.eTag;
                                            cached = { body: function () { return new Uint8Array(buffer_1); }, eTag: eTag };
                                            this_1.resourceCache.put(cacheUrl, cached);
                                        }
                                        if (!cached) return [3 /*break*/, 4];
                                        return [4 /*yield*/, cached.body()];
                                    case 3:
                                        data = _a.sent();
                                        return [2 /*return*/, { value: this_1.doSend('did-load-resource', {
                                                    status: 200,
                                                    path: requestPath,
                                                    mime: mime.getType(normalizedUri.path.toString()) || 'application/octet-stream',
                                                    data: data
                                                }) }];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 7, 8, 9]);
                        _a = __values(this.contentOptions.localResourceRoots), _b = _a.next();
                        _e.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 6];
                        root = _b.value;
                        return [5 /*yield**/, _loop_1(root)];
                    case 4:
                        state_1 = _e.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _e.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_3_1 = _e.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        _c = _e.sent();
                        return [3 /*break*/, 11];
                    case 11:
                        this.resourceCache.delete(cacheUrl);
                        return [2 /*return*/, this.doSend('did-load-resource', {
                                status: 404,
                                path: requestPath
                            })];
                }
            });
        });
    };
    WebviewWidget.prototype.normalizeRequestUri = function (requestPath) {
        var normalizedPath = decodeURIComponent(requestPath);
        var requestUri = new uri_1.default(normalizedPath.replace(/^\/(\w+)\/(.+)$/, function (_, scheme, path) { return scheme + ':/' + path; }));
        if (requestUri.scheme !== 'theia-resource' && requestUri.scheme !== 'vscode-resource') {
            return requestUri;
        }
        // Modern vscode-resources uris put the scheme of the requested resource as the authority
        if (requestUri.authority) {
            return new uri_1.default(requestUri.authority + ':' + requestUri.path);
        }
        // Old style vscode-resource uris lose the scheme of the resource which means they are unable to
        // load a mix of local and remote content properly.
        return requestUri.withScheme('file');
    };
    WebviewWidget.prototype.sendMessage = function (data) {
        if (this.element) {
            this.doSend('message', data);
        }
        else {
            this.pendingMessages.push(data);
        }
    };
    WebviewWidget.prototype.doUpdateContent = function () {
        this.doSend('content', {
            contents: this.html,
            options: this.contentOptions,
            state: this.state
        });
    };
    WebviewWidget.prototype.storeState = function () {
        return {
            viewType: this.viewType,
            title: this.title.label,
            iconUrl: this.iconUrl,
            options: this.options,
            contentOptions: this.contentOptions,
            state: this.state
        };
    };
    WebviewWidget.prototype.restoreState = function (oldState) {
        var viewType = oldState.viewType, title = oldState.title, iconUrl = oldState.iconUrl, options = oldState.options, contentOptions = oldState.contentOptions, state = oldState.state;
        this.viewType = viewType;
        this.title.label = title;
        this.setIconUrl(iconUrl);
        this.options = options;
        this._contentOptions = contentOptions;
        this._state = state;
    };
    WebviewWidget.prototype.doSend = function (channel, data) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.element) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.ready.promise];
                    case 2:
                        _a.sent();
                        this.postMessage(channel, data);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        console.error(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WebviewWidget.prototype.postMessage = function (channel, data) {
        if (this.element) {
            this.trace('out', channel, data);
            this.element.contentWindow.postMessage({ channel: channel, args: data }, '*');
        }
    };
    WebviewWidget.prototype.on = function (channel, handler) {
        var _this = this;
        var listener = function (e) {
            if (!e || !e.data || e.data.target !== _this.identifier.id) {
                return;
            }
            if (e.data.channel === channel) {
                _this.trace('in', e.data.channel, e.data.data);
                handler(e.data.data);
            }
        };
        window.addEventListener('message', listener);
        return disposable_1.Disposable.create(function () {
            return window.removeEventListener('message', listener);
        });
    };
    WebviewWidget.prototype.trace = function (kind, channel, data) {
        var value = this.preferences['webview.trace'];
        if (value === 'off') {
            return;
        }
        var output = this.outputManager.getChannel('webviews');
        output.append('\n' + this.identifier.id);
        output.append(kind === 'out' ? ' => ' : ' <= ');
        output.append(channel);
        if (value === 'verbose') {
            if (data) {
                output.append('\n' + JSON.stringify(data, undefined, 2));
            }
        }
    };
    var WebviewWidget_1;
    WebviewWidget.standardSupportedLinkSchemes = new Set([
        uri_components_1.Schemes.HTTP,
        uri_components_1.Schemes.HTTPS,
        uri_components_1.Schemes.MAILTO,
        uri_components_1.Schemes.VSCODE
    ]);
    WebviewWidget.FACTORY_ID = 'plugin-webview';
    __decorate([
        inversify_1.inject(WebviewWidgetIdentifier),
        __metadata("design:type", WebviewWidgetIdentifier)
    ], WebviewWidget.prototype, "identifier", void 0);
    __decorate([
        inversify_1.inject(exports.WebviewWidgetExternalEndpoint),
        __metadata("design:type", String)
    ], WebviewWidget.prototype, "externalEndpoint", void 0);
    __decorate([
        inversify_1.inject(application_shell_mouse_tracker_1.ApplicationShellMouseTracker),
        __metadata("design:type", application_shell_mouse_tracker_1.ApplicationShellMouseTracker)
    ], WebviewWidget.prototype, "mouseTracker", void 0);
    __decorate([
        inversify_1.inject(webview_environment_1.WebviewEnvironment),
        __metadata("design:type", webview_environment_1.WebviewEnvironment)
    ], WebviewWidget.prototype, "environment", void 0);
    __decorate([
        inversify_1.inject(opener_service_1.OpenerService),
        __metadata("design:type", Object)
    ], WebviewWidget.prototype, "openerService", void 0);
    __decorate([
        inversify_1.inject(keybinding_1.KeybindingRegistry),
        __metadata("design:type", keybinding_1.KeybindingRegistry)
    ], WebviewWidget.prototype, "keybindings", void 0);
    __decorate([
        inversify_1.inject(plugin_shared_style_1.PluginSharedStyle),
        __metadata("design:type", plugin_shared_style_1.PluginSharedStyle)
    ], WebviewWidget.prototype, "sharedStyle", void 0);
    __decorate([
        inversify_1.inject(webview_theme_data_provider_1.WebviewThemeDataProvider),
        __metadata("design:type", webview_theme_data_provider_1.WebviewThemeDataProvider)
    ], WebviewWidget.prototype, "themeDataProvider", void 0);
    __decorate([
        inversify_1.inject(external_uri_service_1.ExternalUriService),
        __metadata("design:type", external_uri_service_1.ExternalUriService)
    ], WebviewWidget.prototype, "externalUriService", void 0);
    __decorate([
        inversify_1.inject(output_channel_1.OutputChannelManager),
        __metadata("design:type", output_channel_1.OutputChannelManager)
    ], WebviewWidget.prototype, "outputManager", void 0);
    __decorate([
        inversify_1.inject(webview_preferences_1.WebviewPreferences),
        __metadata("design:type", Object)
    ], WebviewWidget.prototype, "preferences", void 0);
    __decorate([
        inversify_1.inject(webview_protocol_1.WebviewResourceLoader),
        __metadata("design:type", Object)
    ], WebviewWidget.prototype, "resourceLoader", void 0);
    __decorate([
        inversify_1.inject(webview_resource_cache_1.WebviewResourceCache),
        __metadata("design:type", webview_resource_cache_1.WebviewResourceCache)
    ], WebviewWidget.prototype, "resourceCache", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WebviewWidget.prototype, "init", null);
    WebviewWidget = WebviewWidget_1 = __decorate([
        inversify_1.injectable()
    ], WebviewWidget);
    return WebviewWidget;
}(widget_1.BaseWidget));
exports.WebviewWidget = WebviewWidget;
(function (WebviewWidget) {
    var Styles;
    (function (Styles) {
        Styles.WEBVIEW = 'theia-webview';
    })(Styles = WebviewWidget.Styles || (WebviewWidget.Styles = {}));
})(WebviewWidget = exports.WebviewWidget || (exports.WebviewWidget = {}));
exports.WebviewWidget = WebviewWidget;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/main/common/webview-protocol.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/main/common/webview-protocol.js ***!
  \****************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebviewResourceLoaderPath = exports.WebviewResourceLoader = exports.WebviewExternalEndpoint = void 0;
/**
 * Each webview should be deployed on a unique origin (https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
 * to ensure isolation from browser shared state as cookies, local storage and so on.
 *
 * Default hostname pattern of a origin is `{{uuid}}.webview.{{hostname}}`. Where `{{uuid}}` is a placeholder for a webview global id.
 * For electron target the default pattern is always used.
 * For the browser target use `THEIA_WEBVIEW_EXTERNAL_ENDPOINT` env variable to customize it.
 */
var WebviewExternalEndpoint;
(function (WebviewExternalEndpoint) {
    WebviewExternalEndpoint.pattern = 'THEIA_WEBVIEW_EXTERNAL_ENDPOINT';
    WebviewExternalEndpoint.defaultPattern = '{{uuid}}.webview.{{hostname}}';
})(WebviewExternalEndpoint = exports.WebviewExternalEndpoint || (exports.WebviewExternalEndpoint = {}));
exports.WebviewResourceLoader = Symbol('WebviewResourceLoader');
exports.WebviewResourceLoaderPath = '/services/webview-resource-loader';


/***/ }),

/***/ "./node_modules/mime/Mime.js":
/*!***********************************!*\
  !*** ./node_modules/mime/Mime.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1)
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

module.exports = Mime;


/***/ }),

/***/ "./node_modules/mime/index.js":
/*!************************************!*\
  !*** ./node_modules/mime/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mime = __webpack_require__(/*! ./Mime */ "./node_modules/mime/Mime.js");
module.exports = new Mime(__webpack_require__(/*! ./types/standard */ "./node_modules/mime/types/standard.js"), __webpack_require__(/*! ./types/other */ "./node_modules/mime/types/other.js"));


/***/ }),

/***/ "./node_modules/mime/types/other.js":
/*!******************************************!*\
  !*** ./node_modules/mime/types/other.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {"application/prs.cww":["cww"],"application/vnd.1000minds.decision-model+xml":["1km"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.keynote":["keynote"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.apple.numbers":["numbers"],"application/vnd.apple.pages":["pages"],"application/vnd.apple.pkpass":["pkpass"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.balsamiq.bmml+xml":["bmml"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.citationstyles.style+xml":["csl"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-apps.document":["gdoc"],"application/vnd.google-apps.presentation":["gslides"],"application/vnd.google-apps.spreadsheet":["gsheet"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.hydrostatix.sof-data":["sfd-hdstx"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-outlook":["msg"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["*stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.ac+xml":["*ac"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.n-gage.symbian.install":["n-gage"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openblox.game+xml":["obgx"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openstreetmap.data+xml":["osm"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.software602.filler.form+xml":["fo"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.wadl+xml":["wadl"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.syncml.dmddf+xml":["ddf"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["*dmg"],"application/x-arj":["arj"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bdoc":["*bdoc"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-cocoa":["cco"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["*deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-httpd-php":["php"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["*iso"],"application/x-java-archive-diff":["jardiff"],"application/x-java-jnlp-file":["jnlp"],"application/x-keepass2":["kdbx"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-makeself":["run"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdos-program":["*exe"],"application/x-msdownload":["*exe","*dll","com","bat","*msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["*wmf","*wmz","*emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-ns-proxy-autoconfig":["pac"],"application/x-nzb":["nzb"],"application/x-perl":["pl","pm"],"application/x-pilot":["*prc","*pdb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["rar"],"application/x-redhat-package-manager":["rpm"],"application/x-research-info-systems":["ris"],"application/x-sea":["sea"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl","tk"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["*obj"],"application/x-ustar":["ustar"],"application/x-virtualbox-hdd":["hdd"],"application/x-virtualbox-ova":["ova"],"application/x-virtualbox-ovf":["ovf"],"application/x-virtualbox-vbox":["vbox"],"application/x-virtualbox-vbox-extpack":["vbox-extpack"],"application/x-virtualbox-vdi":["vdi"],"application/x-virtualbox-vhd":["vhd"],"application/x-virtualbox-vmdk":["vmdk"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt","pem"],"application/x-xfig":["fig"],"application/x-xliff+xml":["*xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-m4a":["*m4a"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-realaudio":["*ra"],"audio/x-wav":["*wav"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"image/prs.btif":["btif"],"image/prs.pti":["pti"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.airzip.accelerator.azv":["azv"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["*sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.microsoft.icon":["ico"],"image/vnd.ms-dds":["dds"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.tencent.tap":["tap"],"image/vnd.valve.source.texture":["vtf"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/vnd.zbrush.pcx":["pcx"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["*ico"],"image/x-jng":["jng"],"image/x-mrsid-image":["sid"],"image/x-ms-bmp":["*bmp"],"image/x-pcx":["*pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/vnd.wfa.wsc":["wsc"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.opengex":["ogex"],"model/vnd.parasolid.transmit.binary":["x_b"],"model/vnd.parasolid.transmit.text":["x_t"],"model/vnd.usdz+zip":["usdz"],"model/vnd.valve.source.compiled-map":["bsp"],"model/vnd.vtu":["vtu"],"text/prs.lines.tag":["dsc"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-org":["*org"],"text/x-pascal":["p","pas"],"text/x-processing":["pde"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-suse-ymp":["ymp"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]};

/***/ }),

/***/ "./node_modules/mime/types/standard.js":
/*!*********************************************!*\
  !*** ./node_modules/mime/types/standard.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/mrb-consumer+xml":["*xdf"],"application/mrb-publish+xml":["*xdf"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["*xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/ttml+xml":["ttml"],"application/urc-ressheet+xml":["rsheet"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-error+xml":["xer"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

/***/ })

}]);
//# sourceMappingURL=38.bundle.js.map