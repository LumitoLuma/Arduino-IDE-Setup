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
exports.PreferenceRegistryMainImpl = exports.getPreferences = void 0;
var preferences_1 = require("@theia/core/lib/browser/preferences");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var types_impl_1 = require("../../plugin/types-impl");
var browser_1 = require("@theia/workspace/lib/browser");
var disposable_1 = require("@theia/core/lib/common/disposable");
function getPreferences(preferenceProviderProvider, rootFolders) {
    var folders = rootFolders.map(function (root) { return root.uri.toString(); });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return preferences_1.PreferenceScope.getScopes().reduce(function (result, scope) {
        var e_1, _a;
        result[scope] = {};
        var provider = preferenceProviderProvider(scope);
        if (scope === preferences_1.PreferenceScope.Folder) {
            try {
                for (var folders_1 = __values(folders), folders_1_1 = folders_1.next(); !folders_1_1.done; folders_1_1 = folders_1.next()) {
                    var f = folders_1_1.value;
                    var folderPrefs = provider.getPreferences(f);
                    result[scope][f] = folderPrefs;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (folders_1_1 && !folders_1_1.done && (_a = folders_1.return)) _a.call(folders_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            result[scope] = provider.getPreferences();
        }
        return result;
    }, {});
}
exports.getPreferences = getPreferences;
var PreferenceRegistryMainImpl = /** @class */ (function () {
    function PreferenceRegistryMainImpl(prc, container) {
        var _this = this;
        this.toDispose = new disposable_1.DisposableCollection();
        this.proxy = prc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.PREFERENCE_REGISTRY_EXT);
        this.preferenceService = container.get(preferences_1.PreferenceService);
        var preferenceProviderProvider = container.get(preferences_1.PreferenceProviderProvider);
        var preferenceServiceImpl = container.get(preferences_1.PreferenceServiceImpl);
        var workspaceService = container.get(browser_1.WorkspaceService);
        this.toDispose.push(preferenceServiceImpl.onPreferencesChanged(function (changes) {
            // it HAS to be synchronous to propagate changes before update/remove response
            var e_2, _a;
            var roots = workspaceService.tryGetRoots();
            var data = getPreferences(preferenceProviderProvider, roots);
            var eventData = [];
            try {
                for (var _b = __values(Object.keys(changes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var preferenceName = _c.value;
                    var newValue = changes[preferenceName].newValue;
                    eventData.push({ preferenceName: preferenceName, newValue: newValue });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            _this.proxy.$acceptConfigurationChanged(data, eventData);
        }));
    }
    PreferenceRegistryMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PreferenceRegistryMainImpl.prototype.$updateConfigurationOption = function (target, key, value, resource) {
        return __awaiter(this, void 0, void 0, function () {
            var scope;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scope = this.parseConfigurationTarget(target);
                        return [4 /*yield*/, this.preferenceService.set(key, value, scope, resource)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreferenceRegistryMainImpl.prototype.$removeConfigurationOption = function (target, key, resource) {
        return __awaiter(this, void 0, void 0, function () {
            var scope;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scope = this.parseConfigurationTarget(target);
                        return [4 /*yield*/, this.preferenceService.set(key, undefined, scope, resource)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreferenceRegistryMainImpl.prototype.parseConfigurationTarget = function (target) {
        if (typeof target === 'boolean') {
            return target ? preferences_1.PreferenceScope.User : preferences_1.PreferenceScope.Workspace;
        }
        switch (target) {
            case types_impl_1.ConfigurationTarget.Global:
                return preferences_1.PreferenceScope.User;
            case types_impl_1.ConfigurationTarget.Workspace:
                return preferences_1.PreferenceScope.Workspace;
            case types_impl_1.ConfigurationTarget.WorkspaceFolder:
                return preferences_1.PreferenceScope.Folder;
            default:
                // PreferenceService knows how to deal with undefined in VS Code compatible way
                return undefined;
        }
    };
    return PreferenceRegistryMainImpl;
}());
exports.PreferenceRegistryMainImpl = PreferenceRegistryMainImpl;
//# sourceMappingURL=preference-registry-main.js.map