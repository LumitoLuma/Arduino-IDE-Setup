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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostedPluginReader = void 0;
var path = require("path");
var escape_html = require("escape-html");
var core_1 = require("@theia/core");
var inversify_1 = require("inversify");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var metadata_scanner_1 = require("./metadata-scanner");
var plugin_manifest_loader_1 = require("./plugin-manifest-loader");
var HostedPluginReader = /** @class */ (function () {
    function HostedPluginReader() {
        /**
         * Map between a plugin id and its local storage
         */
        this.pluginsIdsFiles = new Map();
    }
    HostedPluginReader.prototype.configure = function (app) {
        var _this = this;
        app.get('/hostedPlugin/:pluginId/:path(*)', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var pluginId, filePath, localPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pluginId = req.params.pluginId;
                        filePath = req.params.path;
                        localPath = this.pluginsIdsFiles.get(pluginId);
                        if (!localPath) return [3 /*break*/, 1];
                        res.sendFile(filePath, { root: localPath }, function (e) {
                            if (!e) {
                                // the file was found and successfully transferred
                                return;
                            }
                            console.error("Could not transfer '" + filePath + "' file from '" + pluginId + "'", e);
                            if (res.headersSent) {
                                // the request was already closed
                                return;
                            }
                            if ('code' in e && e['code'] === 'ENOENT') {
                                res.status(404).send("No such file found in '" + escape_html(pluginId) + "' plugin.");
                            }
                            else {
                                res.status(500).send("Failed to transfer a file from '" + escape_html(pluginId) + "' plugin.");
                            }
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.handleMissingResource(req, res)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    HostedPluginReader.prototype.handleMissingResource = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pluginId;
            return __generator(this, function (_a) {
                pluginId = req.params.pluginId;
                res.status(404).send("The plugin with id '" + escape_html(pluginId) + "' does not exist.");
                return [2 /*return*/];
            });
        });
    };
    /**
     * @throws never
     */
    HostedPluginReader.prototype.getPluginMetadata = function (pluginPath) {
        return __awaiter(this, void 0, void 0, function () {
            var manifest, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.readPackage(pluginPath)];
                    case 1:
                        manifest = _a.sent();
                        return [2 /*return*/, manifest && this.readMetadata(manifest)];
                    case 2:
                        e_1 = _a.sent();
                        this.logger.error("Failed to load plugin metadata from \"" + pluginPath + "\"", e_1);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HostedPluginReader.prototype.readPackage = function (pluginPath) {
        return __awaiter(this, void 0, void 0, function () {
            var manifest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!pluginPath) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, plugin_manifest_loader_1.loadManifest(pluginPath)];
                    case 1:
                        manifest = _a.sent();
                        if (!manifest) {
                            return [2 /*return*/, undefined];
                        }
                        manifest.packagePath = pluginPath;
                        return [2 /*return*/, manifest];
                }
            });
        });
    };
    HostedPluginReader.prototype.readMetadata = function (plugin) {
        var pluginMetadata = this.scanner.getPluginMetadata(plugin);
        if (pluginMetadata.model.entryPoint.backend) {
            pluginMetadata.model.entryPoint.backend = path.resolve(plugin.packagePath, pluginMetadata.model.entryPoint.backend);
        }
        if (pluginMetadata) {
            // Add post processor
            if (this.metadataProcessors) {
                this.metadataProcessors.forEach(function (metadataProcessor) {
                    metadataProcessor.process(pluginMetadata);
                });
            }
            this.pluginsIdsFiles.set(plugin_protocol_1.getPluginId(pluginMetadata.model), plugin.packagePath);
        }
        return pluginMetadata;
    };
    HostedPluginReader.prototype.readContribution = function (plugin) {
        var scanner = this.scanner.getScanner(plugin);
        return scanner.getContribution(plugin);
    };
    HostedPluginReader.prototype.readDependencies = function (plugin) {
        var scanner = this.scanner.getScanner(plugin);
        return scanner.getDependencies(plugin);
    };
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], HostedPluginReader.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(metadata_scanner_1.MetadataScanner),
        __metadata("design:type", metadata_scanner_1.MetadataScanner)
    ], HostedPluginReader.prototype, "scanner", void 0);
    __decorate([
        inversify_1.optional(),
        inversify_1.multiInject(plugin_protocol_1.MetadataProcessor),
        __metadata("design:type", Array)
    ], HostedPluginReader.prototype, "metadataProcessors", void 0);
    HostedPluginReader = __decorate([
        inversify_1.injectable()
    ], HostedPluginReader);
    return HostedPluginReader;
}());
exports.HostedPluginReader = HostedPluginReader;
//# sourceMappingURL=plugin-reader.js.map