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
exports.PluginDeployerImpl = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var inversify_1 = require("inversify");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var plugin_deployer_entry_impl_1 = require("./plugin-deployer-entry-impl");
var plugin_deployer_resolver_context_impl_1 = require("./plugin-deployer-resolver-context-impl");
var plugin_deployer_proxy_entry_impl_1 = require("./plugin-deployer-proxy-entry-impl");
var plugin_deployer_file_handler_context_impl_1 = require("./plugin-deployer-file-handler-context-impl");
var plugin_deployer_directory_handler_context_impl_1 = require("./plugin-deployer-directory-handler-context-impl");
var core_1 = require("@theia/core");
var plugin_cli_contribution_1 = require("./plugin-cli-contribution");
var perf_hooks_1 = require("perf_hooks");
var PluginDeployerImpl = /** @class */ (function () {
    function PluginDeployerImpl() {
        this.onDidDeployEmitter = new core_1.Emitter();
        this.onDidDeploy = this.onDidDeployEmitter.event;
    }
    PluginDeployerImpl.prototype.start = function () {
        this.logger.debug('Starting the deployer with the list of resolvers', this.pluginResolvers);
        this.doStart();
    };
    PluginDeployerImpl.prototype.initResolvers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pluginDeployerResolverInit, promises;
            var _this = this;
            return __generator(this, function (_a) {
                pluginDeployerResolverInit = new plugin_deployer_resolver_context_impl_1.PluginDeployerResolverInitImpl();
                promises = this.pluginResolvers.map(function (pluginResolver) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (pluginResolver.init) {
                            pluginResolver.init(pluginDeployerResolverInit);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/, Promise.all(promises)];
            });
        });
    };
    PluginDeployerImpl.prototype.doStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultPluginsValue, pluginsValue, defaultPluginsValueViaCli, defaultPluginIdList, pluginIdList, systemEntries, userEntries, context, _a, _b, contribution, e_1_1, startDeployTime, _c, userPlugins, systemPlugins;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: 
                    // init resolvers
                    return [4 /*yield*/, this.initResolvers()];
                    case 1:
                        // init resolvers
                        _e.sent();
                        defaultPluginsValue = process.env.THEIA_DEFAULT_PLUGINS || undefined;
                        pluginsValue = process.env.THEIA_PLUGINS || undefined;
                        defaultPluginsValueViaCli = this.cliContribution.localDir();
                        this.logger.debug('Found the list of default plugins ID on env:', defaultPluginsValue);
                        this.logger.debug('Found the list of plugins ID on env:', pluginsValue);
                        this.logger.debug('Found the list of default plugins ID from CLI:', defaultPluginsValueViaCli);
                        defaultPluginIdList = defaultPluginsValue ? defaultPluginsValue.split(',') : [];
                        pluginIdList = pluginsValue ? pluginsValue.split(',') : [];
                        systemEntries = defaultPluginIdList.concat(pluginIdList).concat(defaultPluginsValueViaCli ? defaultPluginsValueViaCli.split(',') : []);
                        userEntries = [];
                        context = { userEntries: userEntries, systemEntries: systemEntries };
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 7, 8, 9]);
                        _a = __values(this.participants.getContributions()), _b = _a.next();
                        _e.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 6];
                        contribution = _b.value;
                        if (!contribution.onWillStart) return [3 /*break*/, 5];
                        return [4 /*yield*/, contribution.onWillStart(context)];
                    case 4:
                        _e.sent();
                        _e.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        startDeployTime = perf_hooks_1.performance.now();
                        return [4 /*yield*/, Promise.all([
                                this.resolvePlugins(context.userEntries, plugin_protocol_1.PluginType.User),
                                this.resolvePlugins(context.systemEntries, plugin_protocol_1.PluginType.System)
                            ])];
                    case 10:
                        _c = __read.apply(void 0, [_e.sent(), 2]), userPlugins = _c[0], systemPlugins = _c[1];
                        return [4 /*yield*/, this.deployPlugins(__spread(userPlugins, systemPlugins))];
                    case 11:
                        _e.sent();
                        this.logMeasurement('Deploy plugins list', startDeployTime);
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginDeployerImpl.prototype.undeploy = function (pluginId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pluginDeployerHandler.undeployPlugin(pluginId)];
                    case 1:
                        if (_a.sent()) {
                            this.onDidDeployEmitter.fire();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginDeployerImpl.prototype.deploy = function (pluginEntry, type) {
        if (type === void 0) { type = plugin_protocol_1.PluginType.System; }
        return __awaiter(this, void 0, void 0, function () {
            var startDeployTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startDeployTime = perf_hooks_1.performance.now();
                        return [4 /*yield*/, this.deployMultipleEntries([pluginEntry], type)];
                    case 1:
                        _a.sent();
                        this.logMeasurement('Deploy plugin entry', startDeployTime);
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginDeployerImpl.prototype.deployMultipleEntries = function (pluginEntries, type) {
        if (type === void 0) { type = plugin_protocol_1.PluginType.System; }
        return __awaiter(this, void 0, void 0, function () {
            var pluginsToDeploy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolvePlugins(pluginEntries, type)];
                    case 1:
                        pluginsToDeploy = _a.sent();
                        return [4 /*yield*/, this.deployPlugins(pluginsToDeploy)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Resolves plugins for the given type.
     *
     * One can call it multiple times for different types before triggering a single deploy, i.e.
     * ```ts
     * const deployer: PluginDeployer;
     * deployer.deployPlugins([
     *     ...await deployer.resolvePlugins(userEntries, PluginType.User),
     *     ...await deployer.resolvePlugins(systemEntries, PluginType.System)
     * ]);
     * ```
     */
    PluginDeployerImpl.prototype.resolvePlugins = function (pluginEntries, type) {
        return __awaiter(this, void 0, void 0, function () {
            var visited, pluginsToDeploy, queue, _loop_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        visited = new Set();
                        pluginsToDeploy = new Map();
                        queue = __spread(pluginEntries);
                        _loop_1 = function () {
                            var dependenciesChunk, workload, current, dependenciesChunk_1, dependenciesChunk_1_1, dependencies, dependencies_1, dependencies_1_1, _a, dependency, deployableDependency;
                            var e_2, _b, e_3, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        dependenciesChunk = [];
                                        workload = [];
                                        while (queue.length) {
                                            current = queue.shift();
                                            if (visited.has(current)) {
                                                continue;
                                            }
                                            else {
                                                workload.push(current);
                                            }
                                            visited.add(current);
                                        }
                                        queue = [];
                                        return [4 /*yield*/, Promise.all(workload.map(function (current) { return __awaiter(_this, void 0, void 0, function () {
                                                var pluginDeployerEntries, pluginDeployerEntries_1, pluginDeployerEntries_1_1, deployerEntry, dependencies, e_4_1, e_5;
                                                var e_4, _a;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            _b.trys.push([0, 12, , 13]);
                                                            return [4 /*yield*/, this.resolvePlugin(current, type)];
                                                        case 1:
                                                            pluginDeployerEntries = _b.sent();
                                                            return [4 /*yield*/, this.applyFileHandlers(pluginDeployerEntries)];
                                                        case 2:
                                                            _b.sent();
                                                            return [4 /*yield*/, this.applyDirectoryFileHandlers(pluginDeployerEntries)];
                                                        case 3:
                                                            _b.sent();
                                                            _b.label = 4;
                                                        case 4:
                                                            _b.trys.push([4, 9, 10, 11]);
                                                            pluginDeployerEntries_1 = __values(pluginDeployerEntries), pluginDeployerEntries_1_1 = pluginDeployerEntries_1.next();
                                                            _b.label = 5;
                                                        case 5:
                                                            if (!!pluginDeployerEntries_1_1.done) return [3 /*break*/, 8];
                                                            deployerEntry = pluginDeployerEntries_1_1.value;
                                                            return [4 /*yield*/, this.pluginDeployerHandler.getPluginDependencies(deployerEntry)];
                                                        case 6:
                                                            dependencies = _b.sent();
                                                            if (dependencies && !pluginsToDeploy.has(dependencies.metadata.model.id)) {
                                                                pluginsToDeploy.set(dependencies.metadata.model.id, deployerEntry);
                                                                if (dependencies.mapping) {
                                                                    dependenciesChunk.push(dependencies.mapping);
                                                                }
                                                            }
                                                            _b.label = 7;
                                                        case 7:
                                                            pluginDeployerEntries_1_1 = pluginDeployerEntries_1.next();
                                                            return [3 /*break*/, 5];
                                                        case 8: return [3 /*break*/, 11];
                                                        case 9:
                                                            e_4_1 = _b.sent();
                                                            e_4 = { error: e_4_1 };
                                                            return [3 /*break*/, 11];
                                                        case 10:
                                                            try {
                                                                if (pluginDeployerEntries_1_1 && !pluginDeployerEntries_1_1.done && (_a = pluginDeployerEntries_1.return)) _a.call(pluginDeployerEntries_1);
                                                            }
                                                            finally { if (e_4) throw e_4.error; }
                                                            return [7 /*endfinally*/];
                                                        case 11: return [3 /*break*/, 13];
                                                        case 12:
                                                            e_5 = _b.sent();
                                                            console.error("Failed to resolve plugins from '" + current + "'", e_5);
                                                            return [3 /*break*/, 13];
                                                        case 13: return [2 /*return*/];
                                                    }
                                                });
                                            }); }))];
                                    case 1:
                                        _d.sent();
                                        try {
                                            for (dependenciesChunk_1 = (e_2 = void 0, __values(dependenciesChunk)), dependenciesChunk_1_1 = dependenciesChunk_1.next(); !dependenciesChunk_1_1.done; dependenciesChunk_1_1 = dependenciesChunk_1.next()) {
                                                dependencies = dependenciesChunk_1_1.value;
                                                try {
                                                    for (dependencies_1 = (e_3 = void 0, __values(dependencies)), dependencies_1_1 = dependencies_1.next(); !dependencies_1_1.done; dependencies_1_1 = dependencies_1.next()) {
                                                        _a = __read(dependencies_1_1.value, 2), dependency = _a[0], deployableDependency = _a[1];
                                                        if (!pluginsToDeploy.has(dependency)) {
                                                            queue.push(deployableDependency);
                                                        }
                                                    }
                                                }
                                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                                finally {
                                                    try {
                                                        if (dependencies_1_1 && !dependencies_1_1.done && (_c = dependencies_1.return)) _c.call(dependencies_1);
                                                    }
                                                    finally { if (e_3) throw e_3.error; }
                                                }
                                            }
                                        }
                                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                        finally {
                                            try {
                                                if (dependenciesChunk_1_1 && !dependenciesChunk_1_1.done && (_b = dependenciesChunk_1.return)) _b.call(dependenciesChunk_1);
                                            }
                                            finally { if (e_2) throw e_2.error; }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a.label = 1;
                    case 1:
                        if (!queue.length) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, __spread(pluginsToDeploy.values())];
                }
            });
        });
    };
    /**
     * deploy all plugins that have been accepted
     */
    PluginDeployerImpl.prototype.deployPlugins = function (pluginsToDeploy) {
        return __awaiter(this, void 0, void 0, function () {
            var acceptedPlugins, acceptedFrontendPlugins, acceptedBackendPlugins, pluginPaths;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        acceptedPlugins = pluginsToDeploy.filter(function (pluginDeployerEntry) { return pluginDeployerEntry.isAccepted(); });
                        acceptedFrontendPlugins = pluginsToDeploy.filter(function (pluginDeployerEntry) { return pluginDeployerEntry.isAccepted(plugin_protocol_1.PluginDeployerEntryType.FRONTEND); });
                        acceptedBackendPlugins = pluginsToDeploy.filter(function (pluginDeployerEntry) { return pluginDeployerEntry.isAccepted(plugin_protocol_1.PluginDeployerEntryType.BACKEND); });
                        this.logger.debug('the accepted plugins are', acceptedPlugins);
                        this.logger.debug('the acceptedFrontendPlugins plugins are', acceptedFrontendPlugins);
                        this.logger.debug('the acceptedBackendPlugins plugins are', acceptedBackendPlugins);
                        acceptedPlugins.forEach(function (plugin) {
                            _this.logger.debug('will deploy plugin', plugin.id(), 'with changes', JSON.stringify(plugin.getChanges()), 'and this plugin has been resolved by', plugin.resolvedBy());
                        });
                        pluginPaths = acceptedBackendPlugins.map(function (pluginEntry) { return pluginEntry.path(); });
                        this.logger.debug('local path to deploy on remote instance', pluginPaths);
                        return [4 /*yield*/, Promise.all([
                                // start the backend plugins
                                this.pluginDeployerHandler.deployBackendPlugins(acceptedBackendPlugins),
                                this.pluginDeployerHandler.deployFrontendPlugins(acceptedFrontendPlugins)
                            ])];
                    case 1:
                        _a.sent();
                        this.onDidDeployEmitter.fire(undefined);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * If there are some single files, try to see if we can work on these files (like unpacking it, etc)
     */
    PluginDeployerImpl.prototype.applyFileHandlers = function (pluginDeployerEntries) {
        return __awaiter(this, void 0, void 0, function () {
            var waitPromises;
            var _this = this;
            return __generator(this, function (_a) {
                waitPromises = [];
                pluginDeployerEntries.filter(function (pluginDeployerEntry) { return pluginDeployerEntry.isResolved(); }).map(function (pluginDeployerEntry) {
                    _this.pluginDeployerFileHandlers.map(function (pluginFileHandler) {
                        var proxyPluginDeployerEntry = new plugin_deployer_proxy_entry_impl_1.ProxyPluginDeployerEntry(pluginFileHandler, (pluginDeployerEntry));
                        if (pluginFileHandler.accept(proxyPluginDeployerEntry)) {
                            var pluginDeployerFileHandlerContext = new plugin_deployer_file_handler_context_impl_1.PluginDeployerFileHandlerContextImpl(proxyPluginDeployerEntry);
                            var promise = pluginFileHandler.handle(pluginDeployerFileHandlerContext);
                            waitPromises.push(promise);
                        }
                    });
                });
                return [2 /*return*/, Promise.all(waitPromises)];
            });
        });
    };
    /**
     * Check for all registered directories to see if there are some plugins that can be accepted to be deployed.
     */
    PluginDeployerImpl.prototype.applyDirectoryFileHandlers = function (pluginDeployerEntries) {
        return __awaiter(this, void 0, void 0, function () {
            var waitPromises;
            var _this = this;
            return __generator(this, function (_a) {
                waitPromises = [];
                pluginDeployerEntries.filter(function (pluginDeployerEntry) { return pluginDeployerEntry.isResolved(); }).map(function (pluginDeployerEntry) {
                    _this.pluginDeployerDirectoryHandlers.map(function (pluginDirectoryHandler) {
                        var proxyPluginDeployerEntry = new plugin_deployer_proxy_entry_impl_1.ProxyPluginDeployerEntry(pluginDirectoryHandler, (pluginDeployerEntry));
                        if (pluginDirectoryHandler.accept(proxyPluginDeployerEntry)) {
                            var pluginDeployerDirectoryHandlerContext = new plugin_deployer_directory_handler_context_impl_1.PluginDeployerDirectoryHandlerContextImpl(proxyPluginDeployerEntry);
                            var promise = pluginDirectoryHandler.handle(pluginDeployerDirectoryHandlerContext);
                            waitPromises.push(promise);
                        }
                    });
                });
                return [2 /*return*/, Promise.all(waitPromises)];
            });
        });
    };
    /**
     * Check a plugin ID see if there are some resolvers that can handle it. If there is a matching resolver, then we resolve the plugin
     */
    PluginDeployerImpl.prototype.resolvePlugin = function (pluginId, type) {
        if (type === void 0) { type = plugin_protocol_1.PluginType.System; }
        return __awaiter(this, void 0, void 0, function () {
            var pluginDeployerEntries, foundPluginResolver, context_1, unresolvedEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pluginDeployerEntries = [];
                        foundPluginResolver = this.pluginResolvers.find(function (pluginResolver) { return pluginResolver.accept(pluginId); });
                        if (!foundPluginResolver) return [3 /*break*/, 2];
                        context_1 = new plugin_deployer_resolver_context_impl_1.PluginDeployerResolverContextImpl(foundPluginResolver, pluginId);
                        return [4 /*yield*/, foundPluginResolver.resolve(context_1)];
                    case 1:
                        _a.sent();
                        context_1.getPlugins().forEach(function (entry) {
                            entry.type = type;
                            pluginDeployerEntries.push(entry);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        // log it for now
                        this.logger.error('No plugin resolver found for the entry', pluginId);
                        unresolvedEntry = new plugin_deployer_entry_impl_1.PluginDeployerEntryImpl(pluginId, pluginId);
                        unresolvedEntry.type = type;
                        pluginDeployerEntries.push(unresolvedEntry);
                        _a.label = 3;
                    case 3: return [2 /*return*/, pluginDeployerEntries];
                }
            });
        });
    };
    PluginDeployerImpl.prototype.logMeasurement = function (prefix, startTime) {
        console.log(prefix + " took: " + (perf_hooks_1.performance.now() - startTime).toFixed(1) + " ms");
    };
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], PluginDeployerImpl.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(plugin_protocol_1.PluginDeployerHandler),
        __metadata("design:type", Object)
    ], PluginDeployerImpl.prototype, "pluginDeployerHandler", void 0);
    __decorate([
        inversify_1.inject(plugin_cli_contribution_1.PluginCliContribution),
        __metadata("design:type", plugin_cli_contribution_1.PluginCliContribution)
    ], PluginDeployerImpl.prototype, "cliContribution", void 0);
    __decorate([
        inversify_1.optional(),
        inversify_1.multiInject(plugin_protocol_1.PluginDeployerResolver),
        __metadata("design:type", Array)
    ], PluginDeployerImpl.prototype, "pluginResolvers", void 0);
    __decorate([
        inversify_1.optional(),
        inversify_1.multiInject(plugin_protocol_1.PluginDeployerFileHandler),
        __metadata("design:type", Array)
    ], PluginDeployerImpl.prototype, "pluginDeployerFileHandlers", void 0);
    __decorate([
        inversify_1.optional(),
        inversify_1.multiInject(plugin_protocol_1.PluginDeployerDirectoryHandler),
        __metadata("design:type", Array)
    ], PluginDeployerImpl.prototype, "pluginDeployerDirectoryHandlers", void 0);
    __decorate([
        inversify_1.inject(core_1.ContributionProvider),
        inversify_1.named(plugin_protocol_1.PluginDeployerParticipant),
        __metadata("design:type", Object)
    ], PluginDeployerImpl.prototype, "participants", void 0);
    PluginDeployerImpl = __decorate([
        inversify_1.injectable()
    ], PluginDeployerImpl);
    return PluginDeployerImpl;
}());
exports.PluginDeployerImpl = PluginDeployerImpl;
//# sourceMappingURL=plugin-deployer-impl.js.map