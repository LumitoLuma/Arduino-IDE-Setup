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
exports.ScmExtImpl = void 0;
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var disposable_1 = require("@theia/core/lib/common/disposable");
var uri_1 = require("@theia/core/lib/common/uri");
var event_1 = require("@theia/core/lib/common/event");
var ScmExtImpl = /** @class */ (function () {
    function ScmExtImpl(rpc, commands) {
        var _this = this;
        this.rpc = rpc;
        this.commands = commands;
        this.handle = 0;
        this.sourceControlMap = new Map();
        this.sourceControlsByPluginMap = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.SCM_MAIN);
        commands.registerArgumentProcessor({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            processArgument: function (arg) {
                if (!plugin_api_rpc_1.ScmCommandArg.is(arg)) {
                    return arg;
                }
                var sourceControl = _this.sourceControlMap.get(arg.sourceControlHandle);
                if (!sourceControl) {
                    return undefined;
                }
                if (typeof arg.resourceGroupHandle !== 'number') {
                    return sourceControl;
                }
                var resourceGroup = sourceControl.getResourceGroup(arg.resourceGroupHandle);
                if (typeof arg.resourceStateHandle !== 'number') {
                    return resourceGroup;
                }
                return resourceGroup && resourceGroup.getResourceState(arg.resourceStateHandle);
            }
        });
    }
    ScmExtImpl.prototype.createSourceControl = function (plugin, id, label, rootUri) {
        var sourceControl = new SourceControlImpl(this.proxy, this.commands, id, label, rootUri);
        this.sourceControlMap.set(this.handle++, sourceControl);
        var sourceControls = this.sourceControlsByPluginMap.get(plugin.model.id) || [];
        sourceControls.push(sourceControl);
        this.sourceControlsByPluginMap.set(plugin.model.id, sourceControls);
        return sourceControl;
    };
    ScmExtImpl.prototype.getLastInputBox = function (plugin) {
        var sourceControls = this.sourceControlsByPluginMap.get(plugin.model.id);
        var sourceControl = sourceControls && sourceControls[sourceControls.length - 1];
        var inputBox = sourceControl && sourceControl.inputBox;
        return inputBox;
    };
    ScmExtImpl.prototype.$executeResourceCommand = function (sourceControlHandle, groupHandle, resourceHandle) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceControl, group;
            return __generator(this, function (_a) {
                sourceControl = this.sourceControlMap.get(sourceControlHandle);
                if (sourceControl) {
                    group = sourceControl.getResourceGroup(groupHandle);
                    if (group) {
                        group.executeResourceCommand(resourceHandle);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ScmExtImpl.prototype.$provideOriginalResource = function (sourceControlHandle, uri, token) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceControl, newUri;
            return __generator(this, function (_a) {
                sourceControl = this.sourceControlMap.get(sourceControlHandle);
                console.log(sourceControl);
                if (sourceControl && sourceControl.quickDiffProvider && sourceControl.quickDiffProvider.provideOriginalResource) {
                    newUri = new uri_1.default(uri);
                    newUri.fsPath = uri;
                    return [2 /*return*/, sourceControl.quickDiffProvider.provideOriginalResource(newUri, token)];
                }
                return [2 /*return*/];
            });
        });
    };
    ScmExtImpl.prototype.$updateInputBox = function (sourceControlHandle, value) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceControl;
            return __generator(this, function (_a) {
                sourceControl = this.sourceControlMap.get(sourceControlHandle);
                if (sourceControl) {
                    sourceControl.inputBox.$updateValue(value);
                }
                return [2 /*return*/];
            });
        });
    };
    ScmExtImpl.prototype.$setSourceControlSelection = function (sourceControlHandle, selected) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceControl;
            return __generator(this, function (_a) {
                sourceControl = this.sourceControlMap.get(sourceControlHandle);
                if (sourceControl) {
                    sourceControl.selected = selected;
                }
                return [2 /*return*/];
            });
        });
    };
    return ScmExtImpl;
}());
exports.ScmExtImpl = ScmExtImpl;
var InputBoxImpl = /** @class */ (function () {
    function InputBoxImpl(proxy, sourceControlHandle) {
        this.proxy = proxy;
        this.sourceControlHandle = sourceControlHandle;
    }
    Object.defineProperty(InputBoxImpl.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this.$updateValue(value);
            this.proxy.$setInputBoxValue(this.sourceControlHandle, value);
        },
        enumerable: false,
        configurable: true
    });
    InputBoxImpl.prototype.$updateValue = function (value) {
        this._value = value;
    };
    Object.defineProperty(InputBoxImpl.prototype, "placeholder", {
        get: function () {
            return this._placeholder;
        },
        set: function (placeholder) {
            this._placeholder = placeholder;
            this.proxy.$setInputBoxPlaceholder(this.sourceControlHandle, placeholder);
        },
        enumerable: false,
        configurable: true
    });
    return InputBoxImpl;
}());
var SourceControlImpl = /** @class */ (function () {
    function SourceControlImpl(proxy, commands, _id, _label, _rootUri) {
        var _this = this;
        this.proxy = proxy;
        this.commands = commands;
        this._id = _id;
        this._label = _label;
        this._rootUri = _rootUri;
        this.handle = SourceControlImpl.handle++;
        this.resourceGroupsMap = new Map();
        this._selected = false;
        this.toDispose = new disposable_1.DisposableCollection();
        this.onDidChangeSelectionEmitter = new event_1.Emitter();
        this.onDidChangeSelection = this.onDidChangeSelectionEmitter.event;
        this.toDisposeOnAcceptInputCommand = new disposable_1.DisposableCollection();
        this.toDisposeOnStatusBarCommands = new disposable_1.DisposableCollection();
        this._inputBox = new InputBoxImpl(proxy, this.handle);
        this.proxy.$registerSourceControl(this.handle, _id, _label, _rootUri ? _rootUri.path : undefined);
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.proxy.$unregisterSourceControl(_this.handle); }));
    }
    Object.defineProperty(SourceControlImpl.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "rootUri", {
        get: function () {
            return this._rootUri;
        },
        enumerable: false,
        configurable: true
    });
    SourceControlImpl.prototype.createResourceGroup = function (id, label) {
        var sourceControlResourceGroup = new SourceControlResourceGroupImpl(this.proxy, this.commands, this.handle, id, label);
        this.resourceGroupsMap.set(SourceControlImpl.resourceGroupHandle++, sourceControlResourceGroup);
        this.toDispose.push(sourceControlResourceGroup);
        return sourceControlResourceGroup;
    };
    Object.defineProperty(SourceControlImpl.prototype, "inputBox", {
        get: function () {
            return this._inputBox;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (count) {
            if (this._count !== count) {
                this._count = count;
                this.proxy.$updateSourceControl(this.handle, { count: count });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "quickDiffProvider", {
        get: function () {
            return this._quickDiffProvider;
        },
        set: function (quickDiffProvider) {
            this._quickDiffProvider = quickDiffProvider;
            this.proxy.$updateSourceControl(this.handle, { hasQuickDiffProvider: !!quickDiffProvider });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "commitTemplate", {
        get: function () {
            return this._commitTemplate;
        },
        set: function (commitTemplate) {
            this._commitTemplate = commitTemplate;
            this.proxy.$updateSourceControl(this.handle, { commitTemplate: commitTemplate });
        },
        enumerable: false,
        configurable: true
    });
    SourceControlImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    Object.defineProperty(SourceControlImpl.prototype, "acceptInputCommand", {
        get: function () {
            return this._acceptInputCommand;
        },
        set: function (acceptInputCommand) {
            this.toDisposeOnAcceptInputCommand.dispose();
            this.toDispose.push(this.toDisposeOnAcceptInputCommand);
            this._acceptInputCommand = acceptInputCommand;
            this.proxy.$updateSourceControl(this.handle, {
                acceptInputCommand: this.commands.converter.toSafeCommand(acceptInputCommand, this.toDisposeOnAcceptInputCommand)
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlImpl.prototype, "statusBarCommands", {
        get: function () {
            return this._statusBarCommands;
        },
        set: function (statusBarCommands) {
            var _this = this;
            this.toDisposeOnStatusBarCommands.dispose();
            this.toDispose.push(this.toDisposeOnStatusBarCommands);
            this._statusBarCommands = statusBarCommands;
            var safeStatusBarCommands;
            if (statusBarCommands) {
                safeStatusBarCommands = statusBarCommands.map(function (statusBarCommand) { return _this.commands.converter.toSafeCommand(statusBarCommand, _this.toDisposeOnStatusBarCommands); });
            }
            this.proxy.$updateSourceControl(this.handle, {
                statusBarCommands: safeStatusBarCommands
            });
        },
        enumerable: false,
        configurable: true
    });
    SourceControlImpl.prototype.getResourceGroup = function (handle) {
        return this.resourceGroupsMap.get(handle);
    };
    Object.defineProperty(SourceControlImpl.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (selected) {
            this._selected = selected;
            this.onDidChangeSelectionEmitter.fire(selected);
        },
        enumerable: false,
        configurable: true
    });
    SourceControlImpl.handle = 0;
    SourceControlImpl.resourceGroupHandle = 0;
    return SourceControlImpl;
}());
var SourceControlResourceGroupImpl = /** @class */ (function () {
    function SourceControlResourceGroupImpl(proxy, commands, sourceControlHandle, _id, _label) {
        this.proxy = proxy;
        this.commands = commands;
        this.sourceControlHandle = sourceControlHandle;
        this._id = _id;
        this._label = _label;
        this.handle = SourceControlResourceGroupImpl.handle++;
        this._hideWhenEmpty = undefined;
        this._resourceStates = [];
        this.resourceStatesMap = new Map();
        this.proxy.$registerGroup(sourceControlHandle, this.handle, _id, _label);
    }
    Object.defineProperty(SourceControlResourceGroupImpl.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlResourceGroupImpl.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (label) {
            this._label = label;
            this.proxy.$updateGroupLabel(this.sourceControlHandle, this.handle, label);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlResourceGroupImpl.prototype, "hideWhenEmpty", {
        get: function () {
            return this._hideWhenEmpty;
        },
        set: function (hideWhenEmpty) {
            this._hideWhenEmpty = hideWhenEmpty;
            this.proxy.$updateGroup(this.sourceControlHandle, this.handle, { hideWhenEmpty: hideWhenEmpty });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceControlResourceGroupImpl.prototype, "resourceStates", {
        get: function () {
            return this._resourceStates;
        },
        set: function (resources) {
            var _this = this;
            this._resourceStates = resources;
            this.resourceStatesMap.clear();
            this.proxy.$updateResourceState(this.sourceControlHandle, this.handle, resources.map(function (resourceState) {
                var handle = SourceControlResourceGroupImpl.resourceHandle++;
                var resourceCommand;
                var decorations;
                if (resourceState.command) {
                    var _a = resourceState.command, command = _a.command, title = _a.title, tooltip = _a.tooltip;
                    resourceCommand = { id: command ? command : '', title: title ? title : '', tooltip: tooltip };
                }
                if (resourceState.decorations) {
                    var _b = resourceState.decorations, strikeThrough = _b.strikeThrough, faded = _b.faded, tooltip = _b.tooltip, light = _b.light, dark = _b.dark;
                    var theme = light || dark;
                    var iconPath = void 0;
                    if (theme && theme.iconPath) {
                        iconPath = typeof theme.iconPath === 'string' ? theme.iconPath : theme.iconPath.path;
                    }
                    decorations = { strikeThrough: strikeThrough, faded: faded, tooltip: tooltip, iconPath: iconPath };
                }
                _this.resourceStatesMap.set(handle, resourceState);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var resource = resourceState;
                return { handle: handle, resourceUri: resourceState.resourceUri.path, command: resourceCommand, decorations: decorations, letter: resource.letter, colorId: resource.color.id };
            }));
        },
        enumerable: false,
        configurable: true
    });
    SourceControlResourceGroupImpl.prototype.executeResourceCommand = function (stateHandle) {
        return __awaiter(this, void 0, void 0, function () {
            var state, command;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        state = this.resourceStatesMap.get(stateHandle);
                        if (!(state && state.command)) return [3 /*break*/, 2];
                        command = state.command;
                        if (!command.command) return [3 /*break*/, 2];
                        return [4 /*yield*/, (_a = this.commands).$executeCommand.apply(_a, __spread([command.command], command.arguments))];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SourceControlResourceGroupImpl.prototype.getResourceState = function (handle) {
        return this.resourceStatesMap.get(handle);
    };
    SourceControlResourceGroupImpl.prototype.dispose = function () {
        this.proxy.$unregisterGroup(this.sourceControlHandle, this.handle);
    };
    SourceControlResourceGroupImpl.handle = 0;
    SourceControlResourceGroupImpl.resourceHandle = 0;
    return SourceControlResourceGroupImpl;
}());
//# sourceMappingURL=scm.js.map