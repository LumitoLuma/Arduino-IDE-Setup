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
exports.PluginsKeyValueStorage = void 0;
var inversify_1 = require("inversify");
var fs = require("fs-extra");
var path = require("path");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var env_variables_1 = require("@theia/core/lib/common/env-variables");
var const_1 = require("./paths/const");
var plugin_paths_protocol_1 = require("../common/plugin-paths-protocol");
var PluginsKeyValueStorage = /** @class */ (function () {
    function PluginsKeyValueStorage() {
        this.deferredGlobalDataPath = new promise_util_1.Deferred();
    }
    PluginsKeyValueStorage.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var configDirUri, globalStorageFsPath, exists, globalDataFsPath, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.envServer.getConfigDirUri()];
                    case 1:
                        configDirUri = _a.sent();
                        globalStorageFsPath = path.join(file_uri_1.FileUri.fsPath(configDirUri), const_1.PluginPaths.PLUGINS_GLOBAL_STORAGE_DIR);
                        return [4 /*yield*/, fs.pathExists(globalStorageFsPath)];
                    case 2:
                        exists = _a.sent();
                        if (!!exists) return [3 /*break*/, 4];
                        return [4 /*yield*/, fs.mkdirs(globalStorageFsPath)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        globalDataFsPath = path.join(globalStorageFsPath, 'global-state.json');
                        this.deferredGlobalDataPath.resolve(globalDataFsPath);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.error('Failed to initialize global state path: ', e_1);
                        this.deferredGlobalDataPath.resolve(undefined);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PluginsKeyValueStorage.prototype.set = function (key, value, kind) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPath, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDataPath(kind)];
                    case 1:
                        dataPath = _a.sent();
                        if (!dataPath) {
                            throw new Error('Cannot save data: no opened workspace');
                        }
                        return [4 /*yield*/, this.readFromFile(dataPath)];
                    case 2:
                        data = _a.sent();
                        if (value === undefined || value === {}) {
                            delete data[key];
                        }
                        else {
                            data[key] = value;
                        }
                        return [4 /*yield*/, this.writeToFile(dataPath, data)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    PluginsKeyValueStorage.prototype.get = function (key, kind) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPath, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDataPath(kind)];
                    case 1:
                        dataPath = _a.sent();
                        if (!dataPath) {
                            return [2 /*return*/, {}];
                        }
                        return [4 /*yield*/, this.readFromFile(dataPath)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data[key]];
                }
            });
        });
    };
    PluginsKeyValueStorage.prototype.getAll = function (kind) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDataPath(kind)];
                    case 1:
                        dataPath = _a.sent();
                        if (!dataPath) {
                            return [2 /*return*/, {}];
                        }
                        return [2 /*return*/, this.readFromFile(dataPath)];
                }
            });
        });
    };
    PluginsKeyValueStorage.prototype.getDataPath = function (kind) {
        return __awaiter(this, void 0, void 0, function () {
            var storagePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!kind) {
                            return [2 /*return*/, this.deferredGlobalDataPath.promise];
                        }
                        return [4 /*yield*/, this.pluginPathsService.getHostStoragePath(kind.workspace, kind.roots)];
                    case 1:
                        storagePath = _a.sent();
                        return [2 /*return*/, storagePath ? path.join(storagePath, 'workspace-state.json') : undefined];
                }
            });
        });
    };
    PluginsKeyValueStorage.prototype.readFromFile = function (pathToFile) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.pathExists(pathToFile)];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, {}];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.readJSON(pathToFile)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Failed to parse data from "', pathToFile, '". Reason:', error_1);
                        return [2 /*return*/, {}];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PluginsKeyValueStorage.prototype.writeToFile = function (pathToFile, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.ensureDir(path.dirname(pathToFile))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs.writeJSON(pathToFile, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(plugin_paths_protocol_1.PluginPathsService),
        __metadata("design:type", Object)
    ], PluginsKeyValueStorage.prototype, "pluginPathsService", void 0);
    __decorate([
        inversify_1.inject(env_variables_1.EnvVariablesServer),
        __metadata("design:type", Object)
    ], PluginsKeyValueStorage.prototype, "envServer", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], PluginsKeyValueStorage.prototype, "init", null);
    PluginsKeyValueStorage = __decorate([
        inversify_1.injectable()
    ], PluginsKeyValueStorage);
    return PluginsKeyValueStorage;
}());
exports.PluginsKeyValueStorage = PluginsKeyValueStorage;
//# sourceMappingURL=plugins-key-value-storage.js.map