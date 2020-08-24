"use strict";
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
exports.HostedPluginServerImpl = void 0;
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
var inversify_1 = require("inversify");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var hosted_plugin_1 = require("./hosted-plugin");
var core_1 = require("@theia/core");
var core_2 = require("@theia/core");
var plugin_ext_api_contribution_1 = require("../../common/plugin-ext-api-contribution");
var hosted_plugin_deployer_handler_1 = require("./hosted-plugin-deployer-handler");
var plugin_deployer_impl_1 = require("../../main/node/plugin-deployer-impl");
var HostedPluginServerImpl = /** @class */ (function () {
    function HostedPluginServerImpl(hostedPlugin) {
        this.hostedPlugin = hostedPlugin;
    }
    HostedPluginServerImpl.prototype.init = function () {
        var _this = this;
        this.deployedListener = this.pluginDeployer.onDidDeploy(function () {
            if (_this.client) {
                _this.client.onDidDeploy();
            }
        });
    };
    HostedPluginServerImpl.prototype.dispose = function () {
        this.hostedPlugin.clientClosed();
        this.deployedListener.dispose();
    };
    HostedPluginServerImpl.prototype.setClient = function (client) {
        this.client = client;
        this.hostedPlugin.setClient(client);
    };
    HostedPluginServerImpl.prototype.getDeployedPluginIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var backendMetadata, plugins, _a, _b, pluginId, e_1_1, backendMetadata_1, backendMetadata_1_1, pluginId, _c, _d, pluginId, e_2_1;
            var e_1, _e, e_3, _f, e_2, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, this.deployerHandler.getDeployedBackendPluginIds()];
                    case 1:
                        backendMetadata = _h.sent();
                        if (backendMetadata.length > 0) {
                            this.hostedPlugin.runPluginServer();
                        }
                        plugins = new Set();
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 7, 8, 9]);
                        return [4 /*yield*/, this.deployerHandler.getDeployedFrontendPluginIds()];
                    case 3:
                        _a = __values.apply(void 0, [_h.sent()]), _b = _a.next();
                        _h.label = 4;
                    case 4:
                        if (!!_b.done) return [3 /*break*/, 6];
                        pluginId = _b.value;
                        plugins.add(pluginId);
                        _h.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 4];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _h.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        try {
                            for (backendMetadata_1 = __values(backendMetadata), backendMetadata_1_1 = backendMetadata_1.next(); !backendMetadata_1_1.done; backendMetadata_1_1 = backendMetadata_1.next()) {
                                pluginId = backendMetadata_1_1.value;
                                plugins.add(pluginId);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (backendMetadata_1_1 && !backendMetadata_1_1.done && (_f = backendMetadata_1.return)) _f.call(backendMetadata_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        _h.label = 10;
                    case 10:
                        _h.trys.push([10, 15, 16, 17]);
                        return [4 /*yield*/, this.hostedPlugin.getExtraDeployedPluginIds()];
                    case 11:
                        _c = __values.apply(void 0, [_h.sent()]), _d = _c.next();
                        _h.label = 12;
                    case 12:
                        if (!!_d.done) return [3 /*break*/, 14];
                        pluginId = _d.value;
                        plugins.add(pluginId);
                        _h.label = 13;
                    case 13:
                        _d = _c.next();
                        return [3 /*break*/, 12];
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        e_2_1 = _h.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 17];
                    case 16:
                        try {
                            if (_d && !_d.done && (_g = _c.return)) _g.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 17: return [2 /*return*/, __spread(plugins.values())];
                }
            });
        });
    };
    HostedPluginServerImpl.prototype.getDeployedPlugins = function (_a) {
        var pluginIds = _a.pluginIds;
        return __awaiter(this, void 0, void 0, function () {
            var plugins, extraDeployedPlugins, pluginIds_1, pluginIds_1_1, pluginId, plugin, _b, _c, extraDeployedPlugin, e_4_1, e_5_1;
            var e_5, _d, e_4, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!pluginIds.length) {
                            return [2 /*return*/, []];
                        }
                        plugins = [];
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 14, 15, 16]);
                        pluginIds_1 = __values(pluginIds), pluginIds_1_1 = pluginIds_1.next();
                        _f.label = 2;
                    case 2:
                        if (!!pluginIds_1_1.done) return [3 /*break*/, 13];
                        pluginId = pluginIds_1_1.value;
                        plugin = this.deployerHandler.getDeployedPlugin(pluginId);
                        if (!!plugin) return [3 /*break*/, 11];
                        if (!!extraDeployedPlugins) return [3 /*break*/, 10];
                        extraDeployedPlugins = new Map();
                        _f.label = 3;
                    case 3:
                        _f.trys.push([3, 8, 9, 10]);
                        e_4 = void 0;
                        return [4 /*yield*/, this.hostedPlugin.getExtraDeployedPlugins()];
                    case 4:
                        _b = (__values.apply(void 0, [_f.sent()])), _c = _b.next();
                        _f.label = 5;
                    case 5:
                        if (!!_c.done) return [3 /*break*/, 7];
                        extraDeployedPlugin = _c.value;
                        extraDeployedPlugins.set(extraDeployedPlugin.metadata.model.id, extraDeployedPlugin);
                        _f.label = 6;
                    case 6:
                        _c = _b.next();
                        return [3 /*break*/, 5];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_4_1 = _f.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_c && !_c.done && (_e = _b.return)) _e.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        plugin = extraDeployedPlugins.get(pluginId);
                        _f.label = 11;
                    case 11:
                        if (plugin) {
                            plugins.push(plugin);
                        }
                        _f.label = 12;
                    case 12:
                        pluginIds_1_1 = pluginIds_1.next();
                        return [3 /*break*/, 2];
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        e_5_1 = _f.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 16];
                    case 15:
                        try {
                            if (pluginIds_1_1 && !pluginIds_1_1.done && (_d = pluginIds_1.return)) _d.call(pluginIds_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, plugins];
                }
            });
        });
    };
    HostedPluginServerImpl.prototype.onMessage = function (message) {
        this.hostedPlugin.onMessage(message);
        return Promise.resolve();
    };
    HostedPluginServerImpl.prototype.getExtPluginAPI = function () {
        return Promise.resolve(this.extPluginAPIContributions.getContributions().map(function (p) { return p.provideApi(); }));
    };
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], HostedPluginServerImpl.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(hosted_plugin_deployer_handler_1.HostedPluginDeployerHandler),
        __metadata("design:type", hosted_plugin_deployer_handler_1.HostedPluginDeployerHandler)
    ], HostedPluginServerImpl.prototype, "deployerHandler", void 0);
    __decorate([
        inversify_1.inject(plugin_protocol_1.PluginDeployer),
        __metadata("design:type", plugin_deployer_impl_1.PluginDeployerImpl)
    ], HostedPluginServerImpl.prototype, "pluginDeployer", void 0);
    __decorate([
        inversify_1.inject(core_2.ContributionProvider),
        inversify_1.named(Symbol.for(plugin_ext_api_contribution_1.ExtPluginApiProvider)),
        __metadata("design:type", Object)
    ], HostedPluginServerImpl.prototype, "extPluginAPIContributions", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], HostedPluginServerImpl.prototype, "init", null);
    HostedPluginServerImpl = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(hosted_plugin_1.HostedPluginSupport)),
        __metadata("design:paramtypes", [hosted_plugin_1.HostedPluginSupport])
    ], HostedPluginServerImpl);
    return HostedPluginServerImpl;
}());
exports.HostedPluginServerImpl = HostedPluginServerImpl;
//# sourceMappingURL=plugin-service.js.map