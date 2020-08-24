"use strict";
/********************************************************************************
 * Copyright (C) 2019 RedHat and others.
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
exports.HostedPluginDeployerHandler = void 0;
var fs = require("fs-extra");
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var plugin_reader_1 = require("./plugin-reader");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var HostedPluginDeployerHandler = /** @class */ (function () {
    function HostedPluginDeployerHandler() {
        this.deployedLocations = new Map();
        /**
         * Managed plugin metadata backend entries.
         */
        this.deployedBackendPlugins = new Map();
        /**
         * Managed plugin metadata frontend entries.
         */
        this.deployedFrontendPlugins = new Map();
        this.backendPluginsMetadataDeferred = new promise_util_1.Deferred();
        this.frontendPluginsMetadataDeferred = new promise_util_1.Deferred();
    }
    HostedPluginDeployerHandler.prototype.getDeployedFrontendPluginIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // await first deploy
                    return [4 /*yield*/, this.frontendPluginsMetadataDeferred.promise];
                    case 1:
                        // await first deploy
                        _a.sent();
                        // fetch the last deployed state
                        return [2 /*return*/, __spread(this.deployedFrontendPlugins.keys())];
                }
            });
        });
    };
    HostedPluginDeployerHandler.prototype.getDeployedBackendPluginIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // await first deploy
                    return [4 /*yield*/, this.backendPluginsMetadataDeferred.promise];
                    case 1:
                        // await first deploy
                        _a.sent();
                        // fetch the last deployed state
                        return [2 /*return*/, __spread(this.deployedBackendPlugins.keys())];
                }
            });
        });
    };
    HostedPluginDeployerHandler.prototype.getDeployedPlugin = function (pluginId) {
        var metadata = this.deployedBackendPlugins.get(pluginId);
        if (metadata) {
            return metadata;
        }
        return this.deployedFrontendPlugins.get(pluginId);
    };
    /**
     * @throws never! in order to isolate plugin deployment
     */
    HostedPluginDeployerHandler.prototype.getPluginDependencies = function (entry) {
        return __awaiter(this, void 0, void 0, function () {
            var pluginPath, manifest, metadata, dependencies, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pluginPath = entry.path();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.reader.readPackage(pluginPath)];
                    case 2:
                        manifest = _a.sent();
                        if (!manifest) {
                            return [2 /*return*/, undefined];
                        }
                        metadata = this.reader.readMetadata(manifest);
                        dependencies = { metadata: metadata };
                        dependencies.mapping = this.reader.readDependencies(manifest);
                        return [2 /*return*/, dependencies];
                    case 3:
                        e_1 = _a.sent();
                        console.error("Failed to load plugin dependencies from '" + pluginPath + "' path", e_1);
                        return [2 /*return*/, undefined];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginDeployerHandler.prototype.deployFrontendPlugins = function (frontendPlugins) {
        return __awaiter(this, void 0, void 0, function () {
            var frontendPlugins_1, frontendPlugins_1_1, plugin, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        frontendPlugins_1 = __values(frontendPlugins), frontendPlugins_1_1 = frontendPlugins_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!frontendPlugins_1_1.done) return [3 /*break*/, 4];
                        plugin = frontendPlugins_1_1.value;
                        return [4 /*yield*/, this.deployPlugin(plugin, 'frontend')];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        frontendPlugins_1_1 = frontendPlugins_1.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (frontendPlugins_1_1 && !frontendPlugins_1_1.done && (_a = frontendPlugins_1.return)) _a.call(frontendPlugins_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 7:
                        // resolve on first deploy
                        this.frontendPluginsMetadataDeferred.resolve(undefined);
                        return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginDeployerHandler.prototype.deployBackendPlugins = function (backendPlugins) {
        return __awaiter(this, void 0, void 0, function () {
            var backendPlugins_1, backendPlugins_1_1, plugin, e_3_1;
            var e_3, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        backendPlugins_1 = __values(backendPlugins), backendPlugins_1_1 = backendPlugins_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!backendPlugins_1_1.done) return [3 /*break*/, 4];
                        plugin = backendPlugins_1_1.value;
                        return [4 /*yield*/, this.deployPlugin(plugin, 'backend')];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        backendPlugins_1_1 = backendPlugins_1.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (backendPlugins_1_1 && !backendPlugins_1_1.done && (_a = backendPlugins_1.return)) _a.call(backendPlugins_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 7:
                        // resolve on first deploy
                        this.backendPluginsMetadataDeferred.resolve(undefined);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @throws never! in order to isolate plugin deployment
     */
    HostedPluginDeployerHandler.prototype.deployPlugin = function (entry, entryPoint) {
        return __awaiter(this, void 0, void 0, function () {
            var pluginPath, manifest, metadata, deployedLocations, deployedPlugins, type, deployed, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pluginPath = entry.path();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.reader.readPackage(pluginPath)];
                    case 2:
                        manifest = _a.sent();
                        if (!manifest) {
                            return [2 /*return*/];
                        }
                        metadata = this.reader.readMetadata(manifest);
                        deployedLocations = this.deployedLocations.get(metadata.model.id) || new Set();
                        deployedLocations.add(entry.rootPath);
                        this.deployedLocations.set(metadata.model.id, deployedLocations);
                        deployedPlugins = entryPoint === 'backend' ? this.deployedBackendPlugins : this.deployedFrontendPlugins;
                        if (deployedPlugins.has(metadata.model.id)) {
                            return [2 /*return*/];
                        }
                        type = entry.type;
                        deployed = { metadata: metadata, type: type };
                        deployed.contributes = this.reader.readContribution(manifest);
                        deployedPlugins.set(metadata.model.id, deployed);
                        this.logger.info("Deploying " + entryPoint + " plugin \"" + metadata.model.name + "@" + metadata.model.version + "\" from \"" + (metadata.model.entryPoint[entryPoint] || pluginPath) + "\"");
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        console.error("Failed to deploy " + entryPoint + " plugin from '" + pluginPath + "' path", e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginDeployerHandler.prototype.undeployPlugin = function (pluginId) {
        return __awaiter(this, void 0, void 0, function () {
            var deployedLocations, deployedLocations_1, deployedLocations_1_1, location_1, e_5, e_6_1;
            var e_6, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.deployedBackendPlugins.delete(pluginId);
                        this.deployedFrontendPlugins.delete(pluginId);
                        deployedLocations = this.deployedLocations.get(pluginId);
                        if (!deployedLocations) {
                            return [2 /*return*/, false];
                        }
                        this.deployedLocations.delete(pluginId);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 10]);
                        deployedLocations_1 = __values(deployedLocations), deployedLocations_1_1 = deployedLocations_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!deployedLocations_1_1.done) return [3 /*break*/, 7];
                        location_1 = deployedLocations_1_1.value;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fs.remove(location_1)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_5 = _b.sent();
                        console.error("[" + pluginId + "]: failed to undeploy from \"" + location_1 + "\", reason", e_5);
                        return [3 /*break*/, 6];
                    case 6:
                        deployedLocations_1_1 = deployedLocations_1.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_6_1 = _b.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (deployedLocations_1_1 && !deployedLocations_1_1.done && (_a = deployedLocations_1.return)) _a.call(deployedLocations_1);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, true];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], HostedPluginDeployerHandler.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(plugin_reader_1.HostedPluginReader),
        __metadata("design:type", plugin_reader_1.HostedPluginReader)
    ], HostedPluginDeployerHandler.prototype, "reader", void 0);
    HostedPluginDeployerHandler = __decorate([
        inversify_1.injectable()
    ], HostedPluginDeployerHandler);
    return HostedPluginDeployerHandler;
}());
exports.HostedPluginDeployerHandler = HostedPluginDeployerHandler;
//# sourceMappingURL=hosted-plugin-deployer-handler.js.map