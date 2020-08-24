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
exports.DefaultWorkspaceServer = exports.WorkspaceCliContribution = void 0;
var path = require("path");
var fs = require("fs-extra");
var jsoncparser = require("jsonc-parser");
var inversify_1 = require("inversify");
var node_1 = require("@theia/core/lib/node");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var env_variables_1 = require("@theia/core/lib/common/env-variables");
var WorkspaceCliContribution = /** @class */ (function () {
    function WorkspaceCliContribution() {
        this.workspaceRoot = new promise_util_1.Deferred();
    }
    WorkspaceCliContribution.prototype.configure = function (conf) {
        conf.usage('$0 [workspace-directory] [options]');
        conf.option('root-dir', {
            description: 'DEPRECATED: Sets the workspace directory.',
        });
    };
    WorkspaceCliContribution.prototype.setArguments = function (args) {
        var wsPath = args._[2];
        if (!wsPath) {
            wsPath = args['root-dir'];
            if (!wsPath) {
                this.workspaceRoot.resolve();
                return;
            }
        }
        if (!path.isAbsolute(wsPath)) {
            var cwd = process.cwd();
            wsPath = path.join(cwd, wsPath);
        }
        if (wsPath && wsPath.endsWith('/')) {
            wsPath = wsPath.slice(0, -1);
        }
        this.workspaceRoot.resolve(wsPath);
    };
    WorkspaceCliContribution = __decorate([
        inversify_1.injectable()
    ], WorkspaceCliContribution);
    return WorkspaceCliContribution;
}());
exports.WorkspaceCliContribution = WorkspaceCliContribution;
var DefaultWorkspaceServer = /** @class */ (function () {
    function DefaultWorkspaceServer() {
        this.root = new promise_util_1.Deferred();
    }
    DefaultWorkspaceServer.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRoot()];
                    case 1:
                        root = _a.sent();
                        this.root.resolve(root);
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultWorkspaceServer.prototype.getRoot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var root, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWorkspaceURIFromCli()];
                    case 1:
                        root = _a.sent();
                        if (!!root) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.readRecentWorkspacePathsFromUserHome()];
                    case 2:
                        data = _a.sent();
                        if (data && data.recentRoots) {
                            root = data.recentRoots[0];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, root];
                }
            });
        });
    };
    DefaultWorkspaceServer.prototype.getMostRecentlyUsedWorkspace = function () {
        return this.root.promise;
    };
    DefaultWorkspaceServer.prototype.setMostRecentlyUsedWorkspace = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var listUri, oldListUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.root = new promise_util_1.Deferred();
                        listUri = [];
                        return [4 /*yield*/, this.getRecentWorkspaces()];
                    case 1:
                        oldListUri = _a.sent();
                        listUri.push(uri);
                        if (oldListUri) {
                            oldListUri.forEach(function (element) {
                                if (element !== uri && element.length > 0) {
                                    listUri.push(element);
                                }
                            });
                        }
                        this.root.resolve(uri);
                        this.writeToUserHome({
                            recentRoots: listUri
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultWorkspaceServer.prototype.getRecentWorkspaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var listUri, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listUri = [];
                        return [4 /*yield*/, this.readRecentWorkspacePathsFromUserHome()];
                    case 1:
                        data = _a.sent();
                        if (data && data.recentRoots) {
                            data.recentRoots.forEach(function (element) {
                                if (element.length > 0) {
                                    if (_this.workspaceStillExist(element)) {
                                        listUri.push(element);
                                    }
                                }
                            });
                        }
                        return [2 /*return*/, listUri];
                }
            });
        });
    };
    DefaultWorkspaceServer.prototype.workspaceStillExist = function (workspaceRootUri) {
        return fs.pathExistsSync(node_1.FileUri.fsPath(workspaceRootUri));
    };
    DefaultWorkspaceServer.prototype.getWorkspaceURIFromCli = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cliParams.workspaceRoot.promise];
                    case 1:
                        arg = _a.sent();
                        return [2 /*return*/, arg !== undefined ? node_1.FileUri.create(arg).toString() : undefined];
                }
            });
        });
    };
    /**
     * Writes the given uri as the most recently used workspace root to the user's home directory.
     * @param uri most recently used uri
     */
    DefaultWorkspaceServer.prototype.writeToUserHome = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserStoragePath()];
                    case 1:
                        file = _a.sent();
                        return [4 /*yield*/, this.writeToFile(file, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultWorkspaceServer.prototype.writeToFile = function (fsPath, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.pathExists(fsPath)];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs.mkdirs(path.resolve(fsPath, '..'))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, fs.writeJson(fsPath, data)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reads the most recently used workspace root from the user's home directory.
     */
    DefaultWorkspaceServer.prototype.readRecentWorkspacePathsFromUserHome = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fsPath, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserStoragePath()];
                    case 1:
                        fsPath = _a.sent();
                        return [4 /*yield*/, this.readJsonFromFile(fsPath)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, RecentWorkspacePathsData.is(data) ? data : undefined];
                }
            });
        });
    };
    DefaultWorkspaceServer.prototype.readJsonFromFile = function (fsPath) {
        return __awaiter(this, void 0, void 0, function () {
            var rawContent, strippedContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.pathExists(fsPath)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs.readFile(fsPath, 'utf-8')];
                    case 2:
                        rawContent = _a.sent();
                        strippedContent = jsoncparser.stripComments(rawContent);
                        return [2 /*return*/, jsoncparser.parse(strippedContent)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DefaultWorkspaceServer.prototype.getUserStoragePath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var configDirUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.envServer.getConfigDirUri()];
                    case 1:
                        configDirUri = _a.sent();
                        return [2 /*return*/, path.resolve(node_1.FileUri.fsPath(configDirUri), 'recentworkspace.json')];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(WorkspaceCliContribution),
        __metadata("design:type", WorkspaceCliContribution)
    ], DefaultWorkspaceServer.prototype, "cliParams", void 0);
    __decorate([
        inversify_1.inject(env_variables_1.EnvVariablesServer),
        __metadata("design:type", Object)
    ], DefaultWorkspaceServer.prototype, "envServer", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], DefaultWorkspaceServer.prototype, "init", null);
    DefaultWorkspaceServer = __decorate([
        inversify_1.injectable()
    ], DefaultWorkspaceServer);
    return DefaultWorkspaceServer;
}());
exports.DefaultWorkspaceServer = DefaultWorkspaceServer;
var RecentWorkspacePathsData;
(function (RecentWorkspacePathsData) {
    function is(data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return !!data && typeof data === 'object' && ('recentRoots' in data) && Array.isArray(data['recentRoots']);
    }
    RecentWorkspacePathsData.is = is;
})(RecentWorkspacePathsData || (RecentWorkspacePathsData = {}));
//# sourceMappingURL=default-workspace-server.js.map