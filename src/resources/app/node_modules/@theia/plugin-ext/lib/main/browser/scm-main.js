"use strict";
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginScmResource = exports.PluginScmResourceGroup = exports.PluginScmProvider = exports.ScmMainImpl = void 0;
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var scm_service_1 = require("@theia/scm/lib/browser/scm-service");
var event_1 = require("@theia/core/lib/common/event");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var disposable_1 = require("@theia/core/lib/common/disposable");
var uri_1 = require("@theia/core/lib/common/uri");
var color_registry_1 = require("@theia/core/lib/browser/color-registry");
var ScmMainImpl = /** @class */ (function () {
    function ScmMainImpl(rpc, container) {
        var _this = this;
        this.scmRepositoryMap = new Map();
        this.toDispose = new disposable_1.DisposableCollection();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.SCM_EXT);
        this.scmService = container.get(scm_service_1.ScmService);
        this.colors = container.get(color_registry_1.ColorRegistry);
        this.toDispose.push(this.scmService.onDidChangeSelectedRepository(function (repository) { return _this.updateSelectedRepository(repository); }));
    }
    ScmMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    ScmMainImpl.prototype.updateSelectedRepository = function (repository) {
        var sourceControlHandle = repository ? this.getSourceControlHandle(repository) : undefined;
        if (sourceControlHandle !== undefined) {
            this.proxy.$setSourceControlSelection(sourceControlHandle, true);
        }
        if (this.lastSelectedSourceControlHandle !== undefined && this.lastSelectedSourceControlHandle !== sourceControlHandle) {
            this.proxy.$setSourceControlSelection(this.lastSelectedSourceControlHandle, false);
        }
        this.lastSelectedSourceControlHandle = sourceControlHandle;
    };
    ScmMainImpl.prototype.getSourceControlHandle = function (repository) {
        var _this = this;
        return Array.from(this.scmRepositoryMap.keys()).find(function (key) {
            var scmRepository = _this.scmRepositoryMap.get(key);
            return scmRepository !== undefined && scmRepository.provider.rootUri === repository.provider.rootUri;
        });
    };
    ScmMainImpl.prototype.$registerSourceControl = function (sourceControlHandle, id, label, rootUri) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, repository;
            var _this = this;
            return __generator(this, function (_a) {
                provider = new PluginScmProvider(this.proxy, sourceControlHandle, id, label, rootUri, this.colors);
                repository = this.scmService.registerScmProvider(provider);
                repository.input.onDidChange(function () {
                    return _this.proxy.$updateInputBox(sourceControlHandle, repository.input.value);
                });
                this.scmRepositoryMap.set(sourceControlHandle, repository);
                if (this.scmService.repositories.length === 1) {
                    this.updateSelectedRepository(repository);
                }
                this.toDispose.push(disposable_1.Disposable.create(function () { return _this.$unregisterSourceControl(sourceControlHandle); }));
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$updateSourceControl = function (sourceControlHandle, features) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, provider;
            return __generator(this, function (_a) {
                repository = this.scmRepositoryMap.get(sourceControlHandle);
                if (repository) {
                    provider = repository.provider;
                    provider.updateSourceControl(features);
                }
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$unregisterSourceControl = function (sourceControlHandle) {
        return __awaiter(this, void 0, void 0, function () {
            var repository;
            return __generator(this, function (_a) {
                repository = this.scmRepositoryMap.get(sourceControlHandle);
                if (repository) {
                    repository.dispose();
                    this.scmRepositoryMap.delete(sourceControlHandle);
                }
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$setInputBoxPlaceholder = function (sourceControlHandle, placeholder) {
        return __awaiter(this, void 0, void 0, function () {
            var repository;
            return __generator(this, function (_a) {
                repository = this.scmRepositoryMap.get(sourceControlHandle);
                if (repository) {
                    repository.input.placeholder = placeholder;
                }
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$setInputBoxValue = function (sourceControlHandle, value) {
        return __awaiter(this, void 0, void 0, function () {
            var repository;
            return __generator(this, function (_a) {
                repository = this.scmRepositoryMap.get(sourceControlHandle);
                if (repository) {
                    repository.input.value = value;
                }
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$registerGroup = function (sourceControlHandle, groupHandle, id, label) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, provider;
            return __generator(this, function (_a) {
                repository = this.scmRepositoryMap.get(sourceControlHandle);
                if (repository) {
                    provider = repository.provider;
                    provider.registerGroup(groupHandle, id, label);
                }
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$unregisterGroup = function (sourceControlHandle, groupHandle) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, provider;
            return __generator(this, function (_a) {
                repository = this.scmRepositoryMap.get(sourceControlHandle);
                if (repository) {
                    provider = repository.provider;
                    provider.unregisterGroup(groupHandle);
                }
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$updateGroup = function (sourceControlHandle, groupHandle, features) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, provider;
            return __generator(this, function (_a) {
                repository = this.scmRepositoryMap.get(sourceControlHandle);
                if (repository) {
                    provider = repository.provider;
                    provider.updateGroup(groupHandle, features);
                }
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$updateGroupLabel = function (sourceControlHandle, groupHandle, label) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, provider;
            return __generator(this, function (_a) {
                repository = this.scmRepositoryMap.get(sourceControlHandle);
                if (repository) {
                    provider = repository.provider;
                    provider.updateGroupLabel(groupHandle, label);
                }
                return [2 /*return*/];
            });
        });
    };
    ScmMainImpl.prototype.$updateResourceState = function (sourceControlHandle, groupHandle, resources) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, provider;
            return __generator(this, function (_a) {
                repository = this.scmRepositoryMap.get(sourceControlHandle);
                if (repository) {
                    provider = repository.provider;
                    provider.updateGroupResourceStates(sourceControlHandle, groupHandle, resources);
                }
                return [2 /*return*/];
            });
        });
    };
    return ScmMainImpl;
}());
exports.ScmMainImpl = ScmMainImpl;
var PluginScmProvider = /** @class */ (function () {
    function PluginScmProvider(proxy, handle, id, label, rootUri, colors) {
        this.proxy = proxy;
        this.handle = handle;
        this.id = id;
        this.label = label;
        this.rootUri = rootUri;
        this.colors = colors;
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChangeCommitTemplateEmitter = new event_1.Emitter();
        this.onDidChangeStatusBarCommandsEmitter = new event_1.Emitter();
        this.features = {};
        this.groupsMap = new Map();
        this.disposableCollection = new disposable_1.DisposableCollection();
        this.disposableCollection.push(this.onDidChangeEmitter);
        this.disposableCollection.push(this.onDidChangeCommitTemplateEmitter);
        this.disposableCollection.push(this.onDidChangeStatusBarCommandsEmitter);
    }
    PluginScmProvider.prototype.fireDidChange = function () {
        this.onDidChangeEmitter.fire(undefined);
    };
    Object.defineProperty(PluginScmProvider.prototype, "groups", {
        get: function () {
            return Array.from(this.groupsMap.values());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "commitTemplate", {
        get: function () {
            return this.features.commitTemplate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "acceptInputCommand", {
        get: function () {
            var command = this.features.acceptInputCommand;
            if (command) {
                var scmCommand = command;
                scmCommand.command = command.id;
                return command;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "statusBarCommands", {
        get: function () {
            var commands = this.features.statusBarCommands;
            if (commands) {
                return commands.map(function (command) {
                    var scmCommand = command;
                    scmCommand.command = command.id;
                    return scmCommand;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "count", {
        get: function () {
            return this.features.count;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "onDidChangeCommitTemplate", {
        get: function () {
            return this.onDidChangeCommitTemplateEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "onDidChangeStatusBarCommands", {
        get: function () {
            return this.onDidChangeStatusBarCommandsEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmProvider.prototype, "onDidChange", {
        get: function () {
            return this.onDidChangeEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    PluginScmProvider.prototype.dispose = function () {
        this.disposableCollection.dispose();
    };
    PluginScmProvider.prototype.updateSourceControl = function (features) {
        if (features.acceptInputCommand) {
            this.features.acceptInputCommand = features.acceptInputCommand;
        }
        if (features.commitTemplate) {
            this.features.commitTemplate = features.commitTemplate;
        }
        if (features.count) {
            this.features.count = features.count;
        }
        if (features.hasQuickDiffProvider !== undefined) {
            this.features.hasQuickDiffProvider = features.hasQuickDiffProvider;
        }
        if (features.statusBarCommands) {
            this.features.statusBarCommands = features.statusBarCommands;
        }
        this.fireDidChange();
        if (features.commitTemplate) {
            this.onDidChangeCommitTemplateEmitter.fire(features.commitTemplate);
        }
        if (features.statusBarCommands) {
            this.onDidChangeStatusBarCommandsEmitter.fire(features.statusBarCommands);
        }
    };
    PluginScmProvider.prototype.getOriginalResource = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.features.hasQuickDiffProvider) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.proxy.$provideOriginalResource(this.handle, uri.toString(), cancellation_1.CancellationToken.None)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, new uri_1.default(result.path)];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PluginScmProvider.prototype.registerGroup = function (groupHandle, id, label) {
        var group = new PluginScmResourceGroup(groupHandle, this, { hideWhenEmpty: undefined }, label, id);
        this.groupsMap.set(groupHandle, group);
        this.fireDidChange();
    };
    PluginScmProvider.prototype.unregisterGroup = function (groupHandle) {
        var group = this.groupsMap.get(groupHandle);
        if (group) {
            group.dispose();
            this.groupsMap.delete(groupHandle);
            this.fireDidChange();
        }
    };
    PluginScmProvider.prototype.updateGroup = function (groupHandle, features) {
        var group = this.groupsMap.get(groupHandle);
        if (group) {
            group.updateGroup(features);
            this.fireDidChange();
        }
    };
    PluginScmProvider.prototype.updateGroupLabel = function (groupHandle, label) {
        var group = this.groupsMap.get(groupHandle);
        if (group) {
            group.updateGroupLabel(label);
            this.fireDidChange();
        }
    };
    PluginScmProvider.prototype.updateGroupResourceStates = function (sourceControlHandle, groupHandle, resources) {
        return __awaiter(this, void 0, void 0, function () {
            var group, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        group = this.groupsMap.get(groupHandle);
                        if (!group) return [3 /*break*/, 2];
                        _b = (_a = group).updateResources;
                        return [4 /*yield*/, Promise.all(resources.map(function (resource) { return __awaiter(_this, void 0, void 0, function () {
                                var resourceUri, scmDecorations, decorations, colorVariable;
                                return __generator(this, function (_a) {
                                    resourceUri = new uri_1.default(resource.resourceUri);
                                    decorations = resource.decorations;
                                    if (decorations) {
                                        colorVariable = resource.colorId && this.colors.toCssVariableName(resource.colorId);
                                        scmDecorations = {
                                            tooltip: decorations.tooltip,
                                            letter: resource.letter,
                                            color: colorVariable && "var(" + colorVariable + ")"
                                        };
                                    }
                                    return [2 /*return*/, new PluginScmResource(this.proxy, resource.handle, group, resourceUri, group, scmDecorations)];
                                });
                            }); }))];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        this.fireDidChange();
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return PluginScmProvider;
}());
exports.PluginScmProvider = PluginScmProvider;
var PluginScmResourceGroup = /** @class */ (function () {
    function PluginScmResourceGroup(handle, provider, features, label, id) {
        this.handle = handle;
        this.provider = provider;
        this.features = features;
        this.label = label;
        this.id = id;
        this._resources = [];
    }
    Object.defineProperty(PluginScmResourceGroup.prototype, "resources", {
        get: function () {
            return this._resources;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginScmResourceGroup.prototype, "hideWhenEmpty", {
        get: function () {
            return this.features.hideWhenEmpty;
        },
        enumerable: false,
        configurable: true
    });
    PluginScmResourceGroup.prototype.updateGroup = function (features) {
        this.features = features;
    };
    PluginScmResourceGroup.prototype.updateGroupLabel = function (label) {
        this.label = label;
    };
    PluginScmResourceGroup.prototype.updateResources = function (resources) {
        this._resources = resources;
    };
    PluginScmResourceGroup.prototype.dispose = function () { };
    return PluginScmResourceGroup;
}());
exports.PluginScmResourceGroup = PluginScmResourceGroup;
var PluginScmResource = /** @class */ (function () {
    function PluginScmResource(proxy, handle, group, sourceUri, resourceGroup, decorations) {
        this.proxy = proxy;
        this.handle = handle;
        this.group = group;
        this.sourceUri = sourceUri;
        this.resourceGroup = resourceGroup;
        this.decorations = decorations;
    }
    PluginScmResource.prototype.open = function () {
        return this.proxy.$executeResourceCommand(this.group.provider.handle, this.group.handle, this.handle);
    };
    return PluginScmResource;
}());
exports.PluginScmResource = PluginScmResource;
//# sourceMappingURL=scm-main.js.map