(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/@theia/output/lib/browser/output-commands.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@theia/output/lib/browser/output-commands.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputCommands = void 0;
var OutputCommands;
(function (OutputCommands) {
    var OUTPUT_CATEGORY = 'Output';
    /* #region VS Code `OutputChannel` API */
    // Based on: https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/vscode.d.ts#L4692-L4745
    OutputCommands.APPEND = {
        id: 'output:append'
    };
    OutputCommands.APPEND_LINE = {
        id: 'output:appendLine'
    };
    OutputCommands.CLEAR = {
        id: 'output:clear'
    };
    OutputCommands.SHOW = {
        id: 'output:show'
    };
    OutputCommands.HIDE = {
        id: 'output:hide'
    };
    OutputCommands.DISPOSE = {
        id: 'output:dispose'
    };
    /* #endregion VS Code `OutputChannel` API */
    OutputCommands.CLEAR__WIDGET = {
        id: 'output:widget:clear',
        category: OUTPUT_CATEGORY,
        iconClass: 'clear-all'
    };
    OutputCommands.LOCK__WIDGET = {
        id: 'output:widget:lock',
        category: OUTPUT_CATEGORY,
        iconClass: 'fa fa-unlock'
    };
    OutputCommands.UNLOCK__WIDGET = {
        id: 'output:widget:unlock',
        category: OUTPUT_CATEGORY,
        iconClass: 'fa fa-lock'
    };
    OutputCommands.CLEAR__QUICK_PICK = {
        id: 'output:pick-clear',
        label: 'Clear Output Channel...',
        category: OUTPUT_CATEGORY
    };
    OutputCommands.SHOW__QUICK_PICK = {
        id: 'output:pick-show',
        label: 'Show Output Channel...',
        category: OUTPUT_CATEGORY
    };
    OutputCommands.HIDE__QUICK_PICK = {
        id: 'output:pick-hide',
        label: 'Hide Output Channel...',
        category: OUTPUT_CATEGORY
    };
    OutputCommands.DISPOSE__QUICK_PICK = {
        id: 'output:pick-dispose',
        label: 'Close Output Channel...',
        category: OUTPUT_CATEGORY
    };
    OutputCommands.COPY_ALL = {
        id: 'output:copy-all',
    };
})(OutputCommands = exports.OutputCommands || (exports.OutputCommands = {}));


/***/ }),

/***/ "./node_modules/@theia/output/lib/browser/output-resource.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@theia/output/lib/browser/output-resource.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
exports.OutputResource = void 0;
var common_1 = __webpack_require__(/*! @theia/core/lib/common */ "./node_modules/@theia/core/lib/common/index.js");
var OutputResource = /** @class */ (function () {
    function OutputResource(uri, editorModelRef) {
        var _this = this;
        this.uri = uri;
        this.editorModelRef = editorModelRef;
        this.onDidChangeContentsEmitter = new common_1.Emitter();
        this.toDispose = new common_1.DisposableCollection(this.onDidChangeContentsEmitter);
        this.editorModelRef.promise.then(function (modelRef) {
            if (_this.toDispose.disposed) {
                modelRef.dispose();
                return;
            }
            var textModel = modelRef.object.textEditorModel;
            _this._textModel = textModel;
            _this.toDispose.push(modelRef);
            _this.toDispose.push(_this._textModel.onDidChangeContent(function () { return _this.onDidChangeContentsEmitter.fire(); }));
        });
    }
    Object.defineProperty(OutputResource.prototype, "textModel", {
        get: function () {
            return this._textModel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OutputResource.prototype, "onDidChangeContents", {
        get: function () {
            return this.onDidChangeContentsEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    OutputResource.prototype.readContents = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var modelRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._textModel) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.editorModelRef.promise];
                    case 1:
                        modelRef = _a.sent();
                        return [2 /*return*/, modelRef.object.textEditorModel.getValue()];
                    case 2: return [2 /*return*/, ''];
                }
            });
        });
    };
    OutputResource.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    return OutputResource;
}());
exports.OutputResource = OutputResource;


/***/ }),

/***/ "./node_modules/@theia/output/lib/common/output-channel.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@theia/output/lib/common/output-channel.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputChannel = exports.OutputChannelSeverity = exports.OutputChannelManager = void 0;
var PQueue = __webpack_require__(/*! p-queue */ "./node_modules/p-queue/index.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var promise_util_1 = __webpack_require__(/*! @theia/core/lib/common/promise-util */ "./node_modules/@theia/core/lib/common/promise-util.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var monaco_text_model_service_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-text-model-service */ "./node_modules/@theia/monaco/lib/browser/monaco-text-model-service.js");
var output_uri_1 = __webpack_require__(/*! ./output-uri */ "./node_modules/@theia/output/lib/common/output-uri.js");
var output_resource_1 = __webpack_require__(/*! ../browser/output-resource */ "./node_modules/@theia/output/lib/browser/output-resource.js");
var output_preferences_1 = __webpack_require__(/*! ./output-preferences */ "./node_modules/@theia/output/lib/common/output-preferences.js");
var output_preferences_2 = __webpack_require__(/*! ./output-preferences */ "./node_modules/@theia/output/lib/common/output-preferences.js");
var output_commands_1 = __webpack_require__(/*! ../browser/output-commands */ "./node_modules/@theia/output/lib/browser/output-commands.js");
var OutputChannelManager = /** @class */ (function () {
    function OutputChannelManager() {
        this.channels = new Map();
        this.resources = new Map();
        this.channelAddedEmitter = new core_1.Emitter();
        this.channelDeletedEmitter = new core_1.Emitter();
        this.channelWasShownEmitter = new core_1.Emitter();
        this.channelWasHiddenEmitter = new core_1.Emitter();
        this.selectedChannelChangedEmitter = new core_1.Emitter();
        this.onChannelAdded = this.channelAddedEmitter.event;
        this.onChannelDeleted = this.channelDeletedEmitter.event;
        this.onChannelWasShown = this.channelWasShownEmitter.event;
        this.onChannelWasHidden = this.channelWasHiddenEmitter.event;
        this.onSelectedChannelChanged = this.selectedChannelChangedEmitter.event;
        this.toDispose = new core_1.DisposableCollection();
        this.toDisposeOnChannelDeletion = new Map();
    }
    OutputChannelManager.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(output_commands_1.OutputCommands.APPEND, {
            execute: function (_a) {
                var name = _a.name, text = _a.text;
                if (name && text) {
                    _this.getChannel(name).append(text);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.APPEND_LINE, {
            execute: function (_a) {
                var name = _a.name, text = _a.text;
                if (name && text) {
                    _this.getChannel(name).appendLine(text);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.CLEAR, {
            execute: function (_a) {
                var name = _a.name;
                if (name) {
                    _this.getChannel(name).clear();
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.DISPOSE, {
            execute: function (_a) {
                var name = _a.name;
                if (name) {
                    _this.deleteChannel(name);
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.SHOW, {
            execute: function (_a) {
                var name = _a.name, options = _a.options;
                if (name) {
                    var preserveFocus = options && options.preserveFocus || false;
                    _this.getChannel(name).show({ preserveFocus: preserveFocus });
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.HIDE, {
            execute: function (_a) {
                var name = _a.name;
                if (name) {
                    _this.getChannel(name).hide();
                }
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.CLEAR__QUICK_PICK, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var channel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pick({
                                placeholder: 'Clear output channel.',
                                channels: this.getChannels().slice()
                            })];
                        case 1:
                            channel = _a.sent();
                            if (channel) {
                                channel.clear();
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            isEnabled: function () { return !!_this.getChannels().length; },
            isVisible: function () { return !!_this.getChannels().length; }
        });
        registry.registerCommand(output_commands_1.OutputCommands.SHOW__QUICK_PICK, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var channel, name_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pick({
                                placeholder: 'Show output channel.',
                                channels: this.getChannels().slice()
                            })];
                        case 1:
                            channel = _a.sent();
                            if (channel) {
                                name_1 = channel.name;
                                registry.executeCommand(output_commands_1.OutputCommands.SHOW.id, { name: name_1, options: { preserveFocus: false } });
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            isEnabled: function () { return !!_this.getChannels().length; },
            isVisible: function () { return !!_this.getChannels().length; }
        });
        registry.registerCommand(output_commands_1.OutputCommands.HIDE__QUICK_PICK, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var channel, name_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pick({
                                placeholder: 'Hide output channel.',
                                channels: this.getVisibleChannels().slice()
                            })];
                        case 1:
                            channel = _a.sent();
                            if (channel) {
                                name_2 = channel.name;
                                registry.executeCommand(output_commands_1.OutputCommands.HIDE.id, { name: name_2 });
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            isEnabled: function () { return !!_this.getVisibleChannels().length; },
            isVisible: function () { return !!_this.getVisibleChannels().length; }
        });
        registry.registerCommand(output_commands_1.OutputCommands.DISPOSE__QUICK_PICK, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var channel, name_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pick({
                                placeholder: 'Close output channel.',
                                channels: this.getChannels().slice()
                            })];
                        case 1:
                            channel = _a.sent();
                            if (channel) {
                                name_3 = channel.name;
                                registry.executeCommand(output_commands_1.OutputCommands.DISPOSE.id, { name: name_3 });
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            isEnabled: function () { return !!_this.getChannels().length; },
            isVisible: function () { return !!_this.getChannels().length; }
        });
    };
    OutputChannelManager.prototype.pick = function (_a) {
        var channels = _a.channels, placeholder = _a.placeholder;
        return __awaiter(this, void 0, void 0, function () {
            var items, i, channel;
            return __generator(this, function (_b) {
                items = [];
                for (i = 0; i < channels.length; i++) {
                    channel = channels[i];
                    if (i === 0) {
                        items.push({ label: channel.isVisible ? 'Output Channels' : 'Hidden Channels', type: 'separator' });
                    }
                    else if (!channel.isVisible && channels[i - 1].isVisible) {
                        items.push({ label: 'Hidden Channels', type: 'separator' });
                    }
                    items.push({ label: channel.name, value: channel });
                }
                return [2 /*return*/, this.quickPickService.show(items, { placeholder: placeholder })];
            });
        });
    };
    OutputChannelManager.prototype.getChannel = function (name) {
        var existing = this.channels.get(name);
        if (existing) {
            return existing;
        }
        // We have to register the resource first, because `textModelService#createModelReference` will require it
        // right after creating the monaco.editor.ITextModel.
        // All `append` and `appendLine` will be deferred until the underlying text-model instantiation.
        var resource = this.resources.get(name);
        if (!resource) {
            var uri = output_uri_1.OutputUri.create(name);
            var editorModelRef_1 = new promise_util_1.Deferred();
            resource = this.createResource({ uri: uri, editorModelRef: editorModelRef_1 });
            this.resources.set(name, resource);
            this.textModelService.createModelReference(uri).then(function (ref) { return editorModelRef_1.resolve(ref); });
        }
        var channel = new OutputChannel(resource, this.preferences);
        this.channels.set(name, channel);
        this.toDisposeOnChannelDeletion.set(name, this.registerListeners(channel));
        this.channelAddedEmitter.fire(channel);
        if (!this.selectedChannel) {
            this.selectedChannel = channel;
        }
        return channel;
    };
    OutputChannelManager.prototype.registerListeners = function (channel) {
        var _this = this;
        var name = channel.name;
        return new core_1.DisposableCollection(channel, channel.onVisibilityChange(function (_a) {
            var isVisible = _a.isVisible, preserveFocus = _a.preserveFocus;
            if (isVisible) {
                _this.selectedChannel = channel;
                _this.channelWasShownEmitter.fire({ name: name, preserveFocus: preserveFocus });
            }
            else {
                if (channel === _this.selectedChannel) {
                    _this.selectedChannel = _this.getVisibleChannels()[0];
                }
                _this.channelWasHiddenEmitter.fire({ name: name });
            }
        }), channel.onDisposed(function () { return _this.deleteChannel(name); }), core_1.Disposable.create(function () {
            var resource = _this.resources.get(name);
            if (resource) {
                resource.dispose();
                _this.resources.delete(name);
            }
            else {
                console.warn("Could not dispose. No resource was for output channel: '" + name + "'.");
            }
        }), core_1.Disposable.create(function () {
            var toDispose = _this.channels.get(name);
            if (!toDispose) {
                console.warn("Could not dispose. No channel exist with name: '" + name + "'.");
                return;
            }
            _this.channels.delete(name);
            toDispose.dispose();
            _this.channelDeletedEmitter.fire({ name: name });
            if (_this.selectedChannel && _this.selectedChannel.name === name) {
                _this.selectedChannel = _this.getVisibleChannels()[0];
            }
        }));
    };
    OutputChannelManager.prototype.deleteChannel = function (name) {
        var toDispose = this.toDisposeOnChannelDeletion.get(name);
        if (toDispose) {
            toDispose.dispose();
        }
    };
    OutputChannelManager.prototype.getChannels = function () {
        return Array.from(this.channels.values()).sort(this.channelComparator);
    };
    OutputChannelManager.prototype.getVisibleChannels = function () {
        return this.getChannels().filter(function (channel) { return channel.isVisible; });
    };
    Object.defineProperty(OutputChannelManager.prototype, "channelComparator", {
        get: function () {
            return function (left, right) {
                if (left.isVisible !== right.isVisible) {
                    return left.isVisible ? -1 : 1;
                }
                return left.name.toLocaleLowerCase().localeCompare(right.name.toLocaleLowerCase());
            };
        },
        enumerable: false,
        configurable: true
    });
    OutputChannelManager.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    Object.defineProperty(OutputChannelManager.prototype, "selectedChannel", {
        get: function () {
            return this._selectedChannel;
        },
        set: function (channel) {
            this._selectedChannel = channel;
            if (this._selectedChannel) {
                this.selectedChannelChangedEmitter.fire({ name: this._selectedChannel.name });
            }
            else {
                this.selectedChannelChangedEmitter.fire(undefined);
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Non-API: do not call directly.
     */
    OutputChannelManager.prototype.resolve = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var resource;
            return __generator(this, function (_a) {
                if (!output_uri_1.OutputUri.is(uri)) {
                    throw new Error("Expected '" + output_uri_1.OutputUri.SCHEME + "' URI scheme. Got: " + uri + " instead.");
                }
                resource = this.resources.get(output_uri_1.OutputUri.channelName(uri));
                if (!resource) {
                    throw new Error("No output resource was registered with URI: " + uri.toString());
                }
                return [2 /*return*/, resource];
            });
        });
    };
    OutputChannelManager.prototype.createResource = function (_a) {
        var uri = _a.uri, editorModelRef = _a.editorModelRef;
        return new output_resource_1.OutputResource(uri, editorModelRef);
    };
    __decorate([
        inversify_1.inject(browser_1.QuickPickService),
        __metadata("design:type", Object)
    ], OutputChannelManager.prototype, "quickPickService", void 0);
    __decorate([
        inversify_1.inject(monaco_text_model_service_1.MonacoTextModelService),
        __metadata("design:type", monaco_text_model_service_1.MonacoTextModelService)
    ], OutputChannelManager.prototype, "textModelService", void 0);
    __decorate([
        inversify_1.inject(output_preferences_1.OutputPreferences),
        __metadata("design:type", Object)
    ], OutputChannelManager.prototype, "preferences", void 0);
    OutputChannelManager = __decorate([
        inversify_1.injectable()
    ], OutputChannelManager);
    return OutputChannelManager;
}());
exports.OutputChannelManager = OutputChannelManager;
var OutputChannelSeverity;
(function (OutputChannelSeverity) {
    OutputChannelSeverity[OutputChannelSeverity["Error"] = 1] = "Error";
    OutputChannelSeverity[OutputChannelSeverity["Warning"] = 2] = "Warning";
    OutputChannelSeverity[OutputChannelSeverity["Info"] = 3] = "Info";
})(OutputChannelSeverity = exports.OutputChannelSeverity || (exports.OutputChannelSeverity = {}));
var OutputChannel = /** @class */ (function () {
    function OutputChannel(resource, preferences) {
        var _this = this;
        this.resource = resource;
        this.preferences = preferences;
        this.contentChangeEmitter = new core_1.Emitter();
        this.visibilityChangeEmitter = new core_1.Emitter();
        this.disposedEmitter = new core_1.Emitter();
        this.toDispose = new core_1.DisposableCollection(this.contentChangeEmitter, this.visibilityChangeEmitter, this.disposedEmitter);
        this.disposed = false;
        this.visible = true;
        this.decorationIds = new Set();
        this.textModifyQueue = new PQueue({ autoStart: true, concurrency: 1 });
        this.onVisibilityChange = this.visibilityChangeEmitter.event;
        this.onContentChange = this.contentChangeEmitter.event;
        this.onDisposed = this.disposedEmitter.event;
        this._maxLineNumber = this.preferences['output.maxChannelHistory'];
        this.toDispose.push(resource);
        this.toDispose.push(core_1.Disposable.create(function () { return _this.decorationIds.clear(); }));
        this.toDispose.push(this.preferences.onPreferenceChanged(function (_a) {
            var preferenceName = _a.preferenceName, newValue = _a.newValue;
            if (preferenceName === 'output.maxChannelHistory') {
                var maxLineNumber = newValue ? newValue : output_preferences_2.OutputConfigSchema.properties['output.maxChannelHistory'].default;
                if (_this.maxLineNumber !== maxLineNumber) {
                    _this.maxLineNumber = maxLineNumber;
                }
            }
        }));
    }
    Object.defineProperty(OutputChannel.prototype, "name", {
        get: function () {
            return output_uri_1.OutputUri.channelName(this.uri);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OutputChannel.prototype, "uri", {
        get: function () {
            return this.resource.uri;
        },
        enumerable: false,
        configurable: true
    });
    OutputChannel.prototype.hide = function () {
        this.visible = false;
        this.visibilityChangeEmitter.fire({ isVisible: this.isVisible });
    };
    /**
     * If `preserveFocus` is `true`, the channel will not take focus. It is `false` by default.
     *  - Calling `show` without args or with `preserveFocus: false` will reveal **and** activate the `Output` widget.
     *  - Calling `show` with `preserveFocus: true` will reveal the `Output` widget but **won't** activate it.
     */
    OutputChannel.prototype.show = function (_a) {
        var preserveFocus = (_a === void 0 ? { preserveFocus: false } : _a).preserveFocus;
        this.visible = true;
        this.visibilityChangeEmitter.fire({ isVisible: this.isVisible, preserveFocus: preserveFocus });
    };
    /**
     * @deprecated use `show` and `hide` instead.
     */
    OutputChannel.prototype.setVisibility = function (visible, options) {
        if (options === void 0) { options = { preserveFocus: false }; }
        if (visible) {
            this.show(options);
        }
        else {
            this.hide();
        }
    };
    Object.defineProperty(OutputChannel.prototype, "isVisible", {
        /**
         * Note: if `false` it does not meant it is disposed or not available, it is only hidden from the UI.
         */
        get: function () {
            return this.visible;
        },
        enumerable: false,
        configurable: true
    });
    OutputChannel.prototype.clear = function () {
        var _this = this;
        this.textModifyQueue.add(function () { return __awaiter(_this, void 0, void 0, function () {
            var textModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resource.editorModelRef.promise];
                    case 1:
                        textModel = (_a.sent()).object.textEditorModel;
                        textModel.deltaDecorations(Array.from(this.decorationIds), []);
                        this.decorationIds.clear();
                        textModel.setValue('');
                        this.contentChangeEmitter.fire();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    OutputChannel.prototype.dispose = function () {
        if (this.disposed) {
            return;
        }
        this.disposed = true;
        this.toDispose.dispose();
        this.disposedEmitter.fire();
    };
    OutputChannel.prototype.append = function (content, severity) {
        var _this = this;
        if (severity === void 0) { severity = OutputChannelSeverity.Info; }
        this.textModifyQueue.add(function () { return _this.doAppend({ content: content, severity: severity }); });
    };
    OutputChannel.prototype.appendLine = function (content, severity) {
        var _this = this;
        if (severity === void 0) { severity = OutputChannelSeverity.Info; }
        this.textModifyQueue.add(function () { return _this.doAppend({ content: content, severity: severity, appendEol: true }); });
    };
    OutputChannel.prototype.doAppend = function (_a) {
        var content = _a.content, severity = _a.severity, appendEol = _a.appendEol;
        return __awaiter(this, void 0, void 0, function () {
            var textModel, lastLine, lastLineMaxColumn, position, range, edits, inlineClassName, endLineNumber, endColumn, newDecorations, _b, _c, decorationId;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.resource.editorModelRef.promise];
                    case 1:
                        textModel = (_e.sent()).object.textEditorModel;
                        lastLine = textModel.getLineCount();
                        lastLineMaxColumn = textModel.getLineMaxColumn(lastLine);
                        position = new monaco.Position(lastLine, lastLineMaxColumn);
                        range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
                        edits = [{
                                range: range,
                                text: !!appendEol ? "" + content + textModel.getEOL() : content,
                                forceMoveMarkers: true
                            }];
                        // We do not use `pushEditOperations` as we do not need undo/redo support. VS Code uses `applyEdits` too.
                        // https://github.com/microsoft/vscode/blob/dc348340fd1a6c583cb63a1e7e6b4fd657e01e01/src/vs/workbench/services/output/common/outputChannelModel.ts#L108-L115
                        textModel.applyEdits(edits);
                        if (severity !== OutputChannelSeverity.Info) {
                            inlineClassName = severity === OutputChannelSeverity.Error ? 'theia-output-error' : 'theia-output-warning';
                            endLineNumber = textModel.getLineCount();
                            // If last line is empty (the first non-whitespace is 0), apply decorator to previous line's last non-whitespace instead
                            // Note: if the user appends `inlineWarning `, the new decorator's range includes the trailing whitespace.
                            if (!textModel.getLineFirstNonWhitespaceColumn(endLineNumber)) {
                                endLineNumber--;
                            }
                            endColumn = textModel.getLineLastNonWhitespaceColumn(endLineNumber);
                            newDecorations = [{
                                    range: new monaco.Range(range.startLineNumber, range.startColumn, endLineNumber, endColumn),
                                    options: {
                                        inlineClassName: inlineClassName
                                    }
                                }];
                            try {
                                for (_b = __values(textModel.deltaDecorations([], newDecorations)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    decorationId = _c.value;
                                    this.decorationIds.add(decorationId);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        this.ensureMaxChannelHistory(textModel);
                        this.contentChangeEmitter.fire();
                        return [2 /*return*/];
                }
            });
        });
    };
    OutputChannel.prototype.ensureMaxChannelHistory = function (textModel) {
        var e_2, _a, e_3, _b;
        var _this = this;
        this.contentChangeEmitter.fire();
        var linesToRemove = textModel.getLineCount() - this.maxLineNumber - 1; // -1 as the last line is usually empty -> `appendLine`.
        if (linesToRemove > 0) {
            var endColumn = textModel.getLineMaxColumn(linesToRemove);
            // `endLineNumber` is `linesToRemove` + 1 as monaco is one based.
            var range = new monaco.Range(1, 1, linesToRemove, endColumn + 1);
            // eslint-disable-next-line no-null/no-null
            var text = null;
            var decorationsToRemove = textModel.getLinesDecorations(range.startLineNumber, range.endLineNumber)
                .filter(function (_a) {
                var id = _a.id;
                return _this.decorationIds.has(id);
            }).map(function (_a) {
                var id = _a.id;
                return id;
            }); // Do we need to filter here? Who else can put decorations to the output model?
            if (decorationsToRemove.length) {
                try {
                    for (var _c = __values(textModel.deltaDecorations(decorationsToRemove, [])), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var newId = _d.value;
                        this.decorationIds.add(newId);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                try {
                    for (var decorationsToRemove_1 = __values(decorationsToRemove), decorationsToRemove_1_1 = decorationsToRemove_1.next(); !decorationsToRemove_1_1.done; decorationsToRemove_1_1 = decorationsToRemove_1.next()) {
                        var toRemoveId = decorationsToRemove_1_1.value;
                        this.decorationIds.delete(toRemoveId);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (decorationsToRemove_1_1 && !decorationsToRemove_1_1.done && (_b = decorationsToRemove_1.return)) _b.call(decorationsToRemove_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            textModel.applyEdits([
                {
                    range: new monaco.Range(1, 1, linesToRemove + 1, textModel.getLineFirstNonWhitespaceColumn(linesToRemove + 1)),
                    text: text,
                    forceMoveMarkers: true
                }
            ]);
        }
    };
    Object.defineProperty(OutputChannel.prototype, "maxLineNumber", {
        get: function () {
            return this._maxLineNumber;
        },
        set: function (maxLineNumber) {
            this._maxLineNumber = maxLineNumber;
            this.append(''); // will trigger an `ensureMaxChannelHistory` call and will refresh the content.
        },
        enumerable: false,
        configurable: true
    });
    return OutputChannel;
}());
exports.OutputChannel = OutputChannel;


/***/ }),

/***/ "./node_modules/@theia/output/lib/common/output-preferences.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@theia/output/lib/common/output-preferences.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindOutputPreferences = exports.createOutputPreferences = exports.OutputPreferences = exports.OutputConfigSchema = void 0;
var preferences_1 = __webpack_require__(/*! @theia/core/lib/browser/preferences */ "./node_modules/@theia/core/lib/browser/preferences/index.js");
exports.OutputConfigSchema = {
    'type': 'object',
    'properties': {
        'output.maxChannelHistory': {
            'type': 'number',
            'description': 'The maximum number of entries in an output channel.',
            'default': 1000
        }
    }
};
exports.OutputPreferences = Symbol('OutputPreferences');
function createOutputPreferences(preferences) {
    return preferences_1.createPreferenceProxy(preferences, exports.OutputConfigSchema);
}
exports.createOutputPreferences = createOutputPreferences;
function bindOutputPreferences(bind) {
    bind(exports.OutputPreferences).toDynamicValue(function (ctx) {
        var preferences = ctx.container.get(preferences_1.PreferenceService);
        return createOutputPreferences(preferences);
    });
    bind(preferences_1.PreferenceContribution).toConstantValue({ schema: exports.OutputConfigSchema });
}
exports.bindOutputPreferences = bindOutputPreferences;


/***/ }),

/***/ "./node_modules/@theia/output/lib/common/output-uri.js":
/*!*************************************************************!*\
  !*** ./node_modules/@theia/output/lib/common/output-uri.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputUri = void 0;
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var OutputUri;
(function (OutputUri) {
    OutputUri.SCHEME = 'output';
    function is(uri) {
        if (uri instanceof uri_1.default) {
            return uri.scheme === OutputUri.SCHEME;
        }
        return is(new uri_1.default(uri));
    }
    OutputUri.is = is;
    function create(name) {
        if (!name) {
            throw new Error("'name' must be defined.");
        }
        if (!name.trim().length) {
            throw new Error("'name' must contain at least one non-whitespace character.");
        }
        return new uri_1.default(encodeURIComponent(name)).withScheme(OutputUri.SCHEME);
    }
    OutputUri.create = create;
    function channelName(uri) {
        if (!is(uri)) {
            throw new Error("Expected '" + OutputUri.SCHEME + "' URI scheme. Got: " + uri + " instead.");
        }
        return (uri instanceof uri_1.default ? uri : new uri_1.default(uri)).toString(true).slice((OutputUri.SCHEME + ":/").length);
    }
    OutputUri.channelName = channelName;
})(OutputUri = exports.OutputUri || (exports.OutputUri = {}));


/***/ }),

/***/ "./node_modules/p-queue/index.js":
/*!***************************************!*\
  !*** ./node_modules/p-queue/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Port of lower_bound from http://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion
function lowerBound(array, value, comp) {
	let first = 0;
	let count = array.length;

	while (count > 0) {
		const step = (count / 2) | 0;
		let it = first + step;

		if (comp(array[it], value) <= 0) {
			first = ++it;
			count -= step + 1;
		} else {
			count = step;
		}
	}

	return first;
}

class PriorityQueue {
	constructor() {
		this._queue = [];
	}

	enqueue(run, opts) {
		opts = Object.assign({
			priority: 0
		}, opts);

		const element = {priority: opts.priority, run};

		if (this.size && this._queue[this.size - 1].priority >= opts.priority) {
			this._queue.push(element);
			return;
		}

		const index = lowerBound(this._queue, element, (a, b) => b.priority - a.priority);
		this._queue.splice(index, 0, element);
	}

	dequeue() {
		return this._queue.shift().run;
	}

	get size() {
		return this._queue.length;
	}
}

class PQueue {
	constructor(opts) {
		opts = Object.assign({
			concurrency: Infinity,
			autoStart: true,
			queueClass: PriorityQueue
		}, opts);

		if (!(typeof opts.concurrency === 'number' && opts.concurrency >= 1)) {
			throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${opts.concurrency}\` (${typeof opts.concurrency})`);
		}

		this.queue = new opts.queueClass(); // eslint-disable-line new-cap
		this._queueClass = opts.queueClass;
		this._pendingCount = 0;
		this._concurrency = opts.concurrency;
		this._isPaused = opts.autoStart === false;
		this._resolveEmpty = () => {};
		this._resolveIdle = () => {};
	}

	_next() {
		this._pendingCount--;

		if (this.queue.size > 0) {
			if (!this._isPaused) {
				this.queue.dequeue()();
			}
		} else {
			this._resolveEmpty();
			this._resolveEmpty = () => {};

			if (this._pendingCount === 0) {
				this._resolveIdle();
				this._resolveIdle = () => {};
			}
		}
	}

	add(fn, opts) {
		return new Promise((resolve, reject) => {
			const run = () => {
				this._pendingCount++;

				try {
					Promise.resolve(fn()).then(
						val => {
							resolve(val);
							this._next();
						},
						err => {
							reject(err);
							this._next();
						}
					);
				} catch (err) {
					reject(err);
					this._next();
				}
			};

			if (!this._isPaused && this._pendingCount < this._concurrency) {
				run();
			} else {
				this.queue.enqueue(run, opts);
			}
		});
	}

	addAll(fns, opts) {
		return Promise.all(fns.map(fn => this.add(fn, opts)));
	}

	start() {
		if (!this._isPaused) {
			return;
		}

		this._isPaused = false;
		while (this.queue.size > 0 && this._pendingCount < this._concurrency) {
			this.queue.dequeue()();
		}
	}

	pause() {
		this._isPaused = true;
	}

	clear() {
		this.queue = new this._queueClass(); // eslint-disable-line new-cap
	}

	onEmpty() {
		// Instantly resolve if the queue is empty
		if (this.queue.size === 0) {
			return Promise.resolve();
		}

		return new Promise(resolve => {
			const existingResolve = this._resolveEmpty;
			this._resolveEmpty = () => {
				existingResolve();
				resolve();
			};
		});
	}

	onIdle() {
		// Instantly resolve if none pending
		if (this._pendingCount === 0) {
			return Promise.resolve();
		}

		return new Promise(resolve => {
			const existingResolve = this._resolveIdle;
			this._resolveIdle = () => {
				existingResolve();
				resolve();
			};
		});
	}

	get size() {
		return this.queue.size;
	}

	get pending() {
		return this._pendingCount;
	}

	get isPaused() {
		return this._isPaused;
	}
}

module.exports = PQueue;


/***/ })

}]);
//# sourceMappingURL=21.bundle.js.map