(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/@theia/preferences/lib/browser/user-configs-preference-provider.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@theia/preferences/lib/browser/user-configs-preference-provider.js ***!
  \*****************************************************************************************/
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
exports.UserConfigsPreferenceProvider = exports.USER_PREFERENCE_FOLDER = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var preference_provider_1 = __webpack_require__(/*! @theia/core/lib/browser/preferences/preference-provider */ "./node_modules/@theia/core/lib/browser/preferences/preference-provider.js");
var preference_configurations_1 = __webpack_require__(/*! @theia/core/lib/browser/preferences/preference-configurations */ "./node_modules/@theia/core/lib/browser/preferences/preference-configurations.js");
var browser_1 = __webpack_require__(/*! @theia/userstorage/lib/browser */ "./node_modules/@theia/userstorage/lib/browser/index.js");
var user_preference_provider_1 = __webpack_require__(/*! ./user-preference-provider */ "./node_modules/@theia/preferences/lib/browser/user-preference-provider.js");
exports.USER_PREFERENCE_FOLDER = new uri_1.default().withScheme(browser_1.UserStorageUri.SCHEME);
/**
 * Binds together preference section prefs providers for user-level preferences.
 */
var UserConfigsPreferenceProvider = /** @class */ (function (_super) {
    __extends(UserConfigsPreferenceProvider, _super);
    function UserConfigsPreferenceProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.providers = new Map();
        return _this;
    }
    UserConfigsPreferenceProvider.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var readyPromises, _a, _b, provider;
            var e_1, _c;
            var _this = this;
            return __generator(this, function (_d) {
                this.createProviders();
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
            });
        });
    };
    UserConfigsPreferenceProvider.prototype.createProviders = function () {
        var e_2, _a;
        try {
            for (var _b = __values(__spread(this.configurations.getSectionNames(), [this.configurations.getConfigName()])), _c = _b.next(); !_c.done; _c = _b.next()) {
                var configName = _c.value;
                var sectionUri = exports.USER_PREFERENCE_FOLDER.withPath('/' + configName + '.json');
                var sectionKey = sectionUri.toString();
                if (!this.providers.has(sectionKey)) {
                    var provider = this.createProvider(sectionUri, configName);
                    this.providers.set(sectionKey, provider);
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
    };
    UserConfigsPreferenceProvider.prototype.getConfigUri = function (resourceUri) {
        var e_3, _a;
        try {
            for (var _b = __values(this.providers.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var provider = _c.value;
                var configUri = provider.getConfigUri(resourceUri);
                if (this.configurations.isConfigUri(configUri)) {
                    return configUri;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return undefined;
    };
    UserConfigsPreferenceProvider.prototype.resolve = function (preferenceName, resourceUri) {
        var e_4, _a;
        var result = {};
        try {
            for (var _b = __values(this.providers.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var provider = _c.value;
                var _d = provider.resolve(preferenceName, resourceUri), value = _d.value, configUri = _d.configUri;
                if (configUri && value !== undefined) {
                    result.configUri = configUri;
                    result.value = preference_provider_1.PreferenceProvider.merge(result.value, value);
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
        return result;
    };
    UserConfigsPreferenceProvider.prototype.getPreferences = function (resourceUri) {
        var e_5, _a;
        var result = {};
        try {
            for (var _b = __values(this.providers.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var provider = _c.value;
                var preferences = provider.getPreferences();
                result = preference_provider_1.PreferenceProvider.merge(result, preferences);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return result;
    };
    UserConfigsPreferenceProvider.prototype.setPreference = function (preferenceName, value, resourceUri) {
        return __awaiter(this, void 0, void 0, function () {
            var sectionName, configName, providers, providers_1, providers_1_1, provider;
            var e_6, _a;
            return __generator(this, function (_b) {
                sectionName = preferenceName.split('.', 1)[0];
                configName = this.configurations.isSectionName(sectionName) ? sectionName : this.configurations.getConfigName();
                providers = this.providers.values();
                try {
                    for (providers_1 = __values(providers), providers_1_1 = providers_1.next(); !providers_1_1.done; providers_1_1 = providers_1.next()) {
                        provider = providers_1_1.value;
                        if (this.configurations.getName(provider.getConfigUri()) === configName) {
                            return [2 /*return*/, provider.setPreference(preferenceName, value, resourceUri)];
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (providers_1_1 && !providers_1_1.done && (_a = providers_1.return)) _a.call(providers_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                return [2 /*return*/, false];
            });
        });
    };
    UserConfigsPreferenceProvider.prototype.createProvider = function (uri, sectionName) {
        var _this = this;
        var provider = this.providerFactory(uri, sectionName);
        this.toDispose.push(provider);
        this.toDispose.push(provider.onDidPreferencesChanged(function (change) { return _this.onDidPreferencesChangedEmitter.fire(change); }));
        return provider;
    };
    __decorate([
        inversify_1.inject(user_preference_provider_1.UserPreferenceProviderFactory),
        __metadata("design:type", Function)
    ], UserConfigsPreferenceProvider.prototype, "providerFactory", void 0);
    __decorate([
        inversify_1.inject(preference_configurations_1.PreferenceConfigurations),
        __metadata("design:type", preference_configurations_1.PreferenceConfigurations)
    ], UserConfigsPreferenceProvider.prototype, "configurations", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], UserConfigsPreferenceProvider.prototype, "init", null);
    UserConfigsPreferenceProvider = __decorate([
        inversify_1.injectable()
    ], UserConfigsPreferenceProvider);
    return UserConfigsPreferenceProvider;
}(preference_provider_1.PreferenceProvider));
exports.UserConfigsPreferenceProvider = UserConfigsPreferenceProvider;


/***/ })

}]);
//# sourceMappingURL=26.bundle.js.map