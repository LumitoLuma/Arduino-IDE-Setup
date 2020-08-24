"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.QuickPickExt = exports.InputBoxExt = exports.QuickInputExt = exports.QuickOpenExtImpl = void 0;
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
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var cancellation_1 = require("@theia/core/lib/common/cancellation");
var event_1 = require("@theia/core/lib/common/event");
var disposable_1 = require("@theia/core/lib/common/disposable");
var types_impl_1 = require("./types-impl");
var vscode_uri_1 = require("vscode-uri");
var path = require("path");
var type_converters_1 = require("./type-converters");
var plugin_protocol_1 = require("../common/plugin-protocol");
var QuickOpenExtImpl = /** @class */ (function () {
    function QuickOpenExtImpl(rpc) {
        this._sessions = new Map(); // Each quickinput will have a number so that we know where to fire events
        this.currentQuickInputs = 0;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.QUICK_OPEN_MAIN);
    }
    QuickOpenExtImpl.prototype.$onItemSelected = function (handle) {
        if (this.selectItemHandler) {
            this.selectItemHandler(handle);
        }
    };
    QuickOpenExtImpl.prototype.$validateInput = function (input) {
        if (this.validateInputHandler) {
            return Promise.resolve(this.validateInputHandler(input));
        }
        return undefined;
    };
    QuickOpenExtImpl.prototype.showQuickPick = function (itemsOrItemsPromise, options, token) {
        var _this = this;
        if (token === void 0) { token = cancellation_1.CancellationToken.None; }
        /* eslint-enable max-len */
        this.selectItemHandler = undefined;
        var itemsPromise = Promise.resolve(itemsOrItemsPromise);
        var widgetPromise = this.proxy.$show({
            canSelectMany: options && options.canPickMany,
            placeHolder: options && options.placeHolder,
            autoFocus: { autoFocusFirstEntry: true },
            matchOnDescription: options && options.matchOnDescription,
            matchOnDetail: options && options.matchOnDetail,
            ignoreFocusLost: options && options.ignoreFocusOut
        }, token);
        var widgetClosedMarker = {};
        var widgetClosedPromise = widgetPromise.then(function () { return widgetClosedMarker; });
        return Promise.race([widgetClosedPromise, itemsPromise]).then(function (result) {
            if (result === widgetClosedMarker) {
                return undefined;
            }
            return itemsPromise.then(function (items) {
                var pickItems = type_converters_1.quickPickItemToPickOpenItem(items);
                if (options && typeof options.onDidSelectItem === 'function') {
                    _this.selectItemHandler = function (handle) {
                        options.onDidSelectItem(items[handle]);
                    };
                }
                _this.proxy.$setItems(pickItems);
                return widgetPromise.then(function (handle) {
                    if (typeof handle === 'number') {
                        if (options && options.canPickMany) {
                            return Array.of(items[handle]);
                        }
                        else {
                            return items[handle];
                        }
                    }
                    else if (Array.isArray(handle)) {
                        return handle.map(function (h) { return items[h]; });
                    }
                    return undefined;
                });
            });
        });
    };
    QuickOpenExtImpl.prototype.showCustomQuickPick = function (options) {
        this.proxy.$showCustomQuickPick(options);
    };
    QuickOpenExtImpl.prototype.createQuickPick = function (plugin) {
        var newQuickInput = new QuickPickExt(this, this.proxy, plugin, this.currentQuickInputs);
        this._sessions.set(this.currentQuickInputs, newQuickInput);
        this.currentQuickInputs += 1;
        return newQuickInput;
    };
    QuickOpenExtImpl.prototype.showInput = function (options, token) {
        if (token === void 0) { token = cancellation_1.CancellationToken.None; }
        this.validateInputHandler = options && options.validateInput;
        if (!options) {
            options = {
                placeHolder: ''
            };
        }
        return this.proxy.$input(options, typeof this.validateInputHandler === 'function', token);
    };
    QuickOpenExtImpl.prototype.hide = function () {
        this.proxy.$hide();
    };
    QuickOpenExtImpl.prototype.showInputBox = function (options) {
        this.validateInputHandler = options && options.validateInput;
        this.proxy.$showInputBox(options, typeof this.validateInputHandler === 'function');
    };
    QuickOpenExtImpl.prototype.createInputBox = function (plugin) {
        var newQuickInput = new InputBoxExt(this, this.proxy, plugin, this.currentQuickInputs);
        this._sessions.set(this.currentQuickInputs, newQuickInput);
        this.currentQuickInputs += 1;
        return newQuickInput;
    };
    QuickOpenExtImpl.prototype.$acceptOnDidAccept = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var currentQuickInput;
            return __generator(this, function (_a) {
                currentQuickInput = this._sessions.get(sessionId);
                if (currentQuickInput) {
                    currentQuickInput._fireAccept();
                }
                return [2 /*return*/];
            });
        });
    };
    QuickOpenExtImpl.prototype.$acceptDidChangeValue = function (sessionId, changedValue) {
        return __awaiter(this, void 0, void 0, function () {
            var currentQuickInput;
            return __generator(this, function (_a) {
                currentQuickInput = this._sessions.get(sessionId);
                if (currentQuickInput) {
                    currentQuickInput._fireChangedValue(changedValue);
                }
                return [2 /*return*/];
            });
        });
    };
    QuickOpenExtImpl.prototype.$acceptOnDidHide = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var currentQuickInput;
            return __generator(this, function (_a) {
                currentQuickInput = this._sessions.get(sessionId);
                if (currentQuickInput) {
                    currentQuickInput._fireHide();
                }
                return [2 /*return*/];
            });
        });
    };
    QuickOpenExtImpl.prototype.$acceptOnDidTriggerButton = function (sessionId, btn) {
        return __awaiter(this, void 0, void 0, function () {
            var thisQuickInput, btnFromIndex;
            return __generator(this, function (_a) {
                thisQuickInput = this._sessions.get(sessionId);
                if (thisQuickInput) {
                    if (btn.index === -1) {
                        thisQuickInput._fireButtonTrigger(types_impl_1.QuickInputButtons.Back);
                    }
                    else if (thisQuickInput && (thisQuickInput instanceof InputBoxExt || thisQuickInput instanceof QuickPickExt)) {
                        btnFromIndex = thisQuickInput.buttons[btn.index];
                        thisQuickInput._fireButtonTrigger(btnFromIndex);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    QuickOpenExtImpl.prototype.$onDidChangeActive = function (sessionId, handles) {
        var session = this._sessions.get(sessionId);
        if (session instanceof QuickPickExt) {
            session._fireDidChangeActive(handles);
        }
    };
    QuickOpenExtImpl.prototype.$onDidChangeSelection = function (sessionId, handles) {
        var session = this._sessions.get(sessionId);
        if (session instanceof QuickPickExt) {
            session._fireDidChangeSelection(handles);
        }
    };
    return QuickOpenExtImpl;
}());
exports.QuickOpenExtImpl = QuickOpenExtImpl;
var QuickInputExt = /** @class */ (function () {
    function QuickInputExt(quickOpen, quickOpenMain, plugin) {
        this.quickOpen = quickOpen;
        this.quickOpenMain = quickOpenMain;
        this.plugin = plugin;
        this.title = undefined;
        this.step = undefined;
        this.totalSteps = undefined;
        this.enabled = true;
        this.busy = false;
        this.ignoreFocusOut = false;
        this.value = '';
        this.visible = false;
        this.disposableCollection = new disposable_1.DisposableCollection();
        this.disposableCollection.push(this.onDidAcceptEmitter = new event_1.Emitter());
        this.disposableCollection.push(this._onDidChangeValueEmitter = new event_1.Emitter());
        this.disposableCollection.push(this.onDidHideEmitter = new event_1.Emitter());
        this.disposableCollection.push(this.onDidTriggerButtonEmitter = new event_1.Emitter());
    }
    Object.defineProperty(QuickInputExt.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (title) {
            this._title = title;
            this.update({ title: title });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickInputExt.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (step) {
            this._step = step;
            this.update({ step: step });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickInputExt.prototype, "totalSteps", {
        get: function () {
            return this._totalSteps;
        },
        set: function (totalSteps) {
            this._totalSteps = totalSteps;
            this.update({ totalSteps: totalSteps });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickInputExt.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (enabled) {
            this._enabled = enabled;
            this.update({ enabled: enabled });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickInputExt.prototype, "busy", {
        get: function () {
            return this._busy;
        },
        set: function (busy) {
            this._busy = busy;
            this.update({ busy: busy });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickInputExt.prototype, "ignoreFocusOut", {
        get: function () {
            return this._ignoreFocusOut;
        },
        set: function (ignoreFocusOut) {
            this._ignoreFocusOut = ignoreFocusOut;
            this.update({ ignoreFocusOut: ignoreFocusOut });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickInputExt.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.update({ value: value });
        },
        enumerable: false,
        configurable: true
    });
    QuickInputExt.prototype.show = function () {
        throw new Error('Method implementation must be provided by extenders');
    };
    QuickInputExt.prototype.dispose = function () {
        this.disposableCollection.dispose();
    };
    QuickInputExt.prototype.update = function (changed) {
        /**
         * The args are just going to be set when we call show for the first time.
         * We return early when its invisible to avoid race condition
         */
        if (!this.visible || changed === undefined) {
            return;
        }
        this.quickOpenMain.$setQuickInputChanged(changed);
    };
    QuickInputExt.prototype.hide = function () {
        this.quickOpen.hide();
        this.dispose();
    };
    QuickInputExt.prototype.convertURL = function (iconPath) {
        var _this = this;
        var toUrl = function (arg) {
            arg = arg instanceof vscode_uri_1.URI && arg.scheme === 'file' ? arg.fsPath : arg;
            if (typeof arg !== 'string') {
                return arg.toString(true);
            }
            var packagePath = _this.plugin.rawModel.packagePath;
            var absolutePath = path.isAbsolute(arg) ? arg : path.join(packagePath, arg);
            var normalizedPath = path.normalize(absolutePath);
            var relativePath = path.relative(packagePath, normalizedPath);
            return plugin_protocol_1.PluginPackage.toPluginUrl(_this.plugin.rawModel, relativePath);
        };
        if ('id' in iconPath || iconPath instanceof types_impl_1.ThemeIcon) {
            return iconPath;
        }
        else if (typeof iconPath === 'string' || iconPath instanceof vscode_uri_1.URI) {
            return vscode_uri_1.URI.parse(toUrl(iconPath));
        }
        else {
            var _a = iconPath, light = _a.light, dark = _a.dark;
            return {
                light: toUrl(light),
                dark: toUrl(dark)
            };
        }
    };
    QuickInputExt.prototype._fireAccept = function () {
        this.onDidAcceptEmitter.fire(undefined);
    };
    QuickInputExt.prototype._fireChangedValue = function (changedValue) {
        this._onDidChangeValueEmitter.fire(changedValue);
    };
    QuickInputExt.prototype._fireHide = function () {
        this.onDidHideEmitter.fire(undefined);
    };
    QuickInputExt.prototype._fireButtonTrigger = function (btn) {
        this.onDidTriggerButtonEmitter.fire(btn);
    };
    Object.defineProperty(QuickInputExt.prototype, "onDidHide", {
        get: function () {
            return this.onDidHideEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickInputExt.prototype, "onDidAccept", {
        get: function () {
            return this.onDidAcceptEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickInputExt.prototype, "onDidChangeValue", {
        get: function () {
            return this._onDidChangeValueEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickInputExt.prototype, "onDidTriggerButton", {
        get: function () {
            return this.onDidTriggerButtonEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    return QuickInputExt;
}());
exports.QuickInputExt = QuickInputExt;
/**
 * Base implementation of {@link InputBox} that uses {@link QuickOpenExt}.
 * Missing functionality is going to be implemented in the scope of https://github.com/eclipse-theia/theia/issues/5109
 */
var InputBoxExt = /** @class */ (function (_super) {
    __extends(InputBoxExt, _super);
    /**
     * Input Box API End
     */
    function InputBoxExt(quickOpen, quickOpenMain, plugin, quickInputIndex) {
        var _this = _super.call(this, quickOpen, quickOpenMain, plugin) || this;
        _this.quickOpen = quickOpen;
        _this.quickOpenMain = quickOpenMain;
        _this.plugin = plugin;
        _this.quickInputIndex = quickInputIndex;
        _this.buttons = [];
        _this.password = false;
        _this.value = '';
        return _this;
    }
    Object.defineProperty(InputBoxExt.prototype, "buttons", {
        get: function () {
            return this._buttons;
        },
        set: function (buttons) {
            this._buttons = buttons;
            this.update({ buttons: buttons });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputBoxExt.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (password) {
            this._password = password;
            this.update({ password: password });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputBoxExt.prototype, "placeholder", {
        get: function () {
            return this._placeholder;
        },
        set: function (placeholder) {
            this._placeholder = placeholder;
            this.update({ placeholder: placeholder });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputBoxExt.prototype, "prompt", {
        get: function () {
            return this._prompt;
        },
        set: function (prompt) {
            this._prompt = prompt;
            this.update({ prompt: prompt });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputBoxExt.prototype, "validationMessage", {
        get: function () {
            return this._validationMessage;
        },
        set: function (validationMessage) {
            if (this._validationMessage !== validationMessage) {
                this._validationMessage = validationMessage;
                this.update({ validationMessage: validationMessage });
                this.quickOpenMain.$refreshQuickInput();
            }
        },
        enumerable: false,
        configurable: true
    });
    InputBoxExt.prototype.show = function () {
        var _this = this;
        this.visible = true;
        var update = function (value) {
            _this.value = value;
            // this.onDidChangeValueEmitter.fire(value);
            if (_this.validationMessage && _this.validationMessage.length > 0) {
                return _this.validationMessage;
            }
        };
        this.quickOpen.showInputBox({
            id: this.quickInputIndex,
            busy: this.busy,
            buttons: this.buttons.map(function (btn) { return ({
                'iconPath': _this.convertURL(btn.iconPath),
                'tooltip': btn.tooltip
            }); }),
            enabled: this.enabled,
            ignoreFocusOut: this.ignoreFocusOut,
            password: this.password,
            placeholder: this.placeholder,
            prompt: this.prompt,
            step: this.step,
            title: this.title,
            totalSteps: this.totalSteps,
            validationMessage: this.validationMessage,
            value: this.value,
            validateInput: function (value) {
                if (value.length > 0) {
                    return update(value);
                }
            }
        });
    };
    return InputBoxExt;
}(QuickInputExt));
exports.InputBoxExt = InputBoxExt;
/**
 * Base implementation of {@link QuickPick} that uses {@link QuickOpenExt}.
 * Missing functionality is going to be implemented in the scope of https://github.com/eclipse-theia/theia/issues/5059
 */
var QuickPickExt = /** @class */ (function (_super) {
    __extends(QuickPickExt, _super);
    function QuickPickExt(quickOpen, quickOpenMain, plugin, quickInputIndex) {
        var _this = _super.call(this, quickOpen, quickOpenMain, plugin) || this;
        _this.quickOpen = quickOpen;
        _this.quickOpenMain = quickOpenMain;
        _this.plugin = plugin;
        _this.quickInputIndex = quickInputIndex;
        _this._items = [];
        _this._handlesToItems = new Map();
        _this._itemsToHandles = new Map();
        _this._canSelectMany = false;
        _this._matchOnDescription = true;
        _this._matchOnDetail = true;
        _this._activeItems = [];
        _this._onDidChangeActiveEmitter = new event_1.Emitter();
        _this._selectedItems = [];
        _this._onDidChangeSelectionEmitter = new event_1.Emitter();
        _this.onDidChangeActive = _this._onDidChangeActiveEmitter.event;
        _this.onDidChangeSelection = _this._onDidChangeSelectionEmitter.event;
        _this.buttons = [];
        _this.disposableCollection.push(_this._onDidChangeActiveEmitter);
        _this.disposableCollection.push(_this._onDidChangeSelectionEmitter);
        return _this;
    }
    Object.defineProperty(QuickPickExt.prototype, "placeholder", {
        get: function () {
            return this._placeholder;
        },
        set: function (placeholder) {
            this._placeholder = placeholder;
            this.update({ placeholder: placeholder });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickPickExt.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (items) {
            var _this = this;
            this._items = items.slice();
            this._handlesToItems.clear();
            this._itemsToHandles.clear();
            items.forEach(function (item, i) {
                _this._handlesToItems.set(i, item);
                _this._itemsToHandles.set(item, i);
            });
            this.update({
                items: type_converters_1.quickPickItemToPickOpenItem(items)
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickPickExt.prototype, "canSelectMany", {
        get: function () {
            return this._canSelectMany;
        },
        set: function (canSelectMany) {
            this._canSelectMany = canSelectMany;
            this.update({ canSelectMany: canSelectMany });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickPickExt.prototype, "matchOnDescription", {
        get: function () {
            return this._matchOnDescription;
        },
        set: function (matchOnDescription) {
            this._matchOnDescription = matchOnDescription;
            this.update({ matchOnDescription: matchOnDescription });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickPickExt.prototype, "matchOnDetail", {
        get: function () {
            return this._matchOnDetail;
        },
        set: function (matchOnDetail) {
            this._matchOnDetail = matchOnDetail;
            this.update({ matchOnDetail: matchOnDetail });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickPickExt.prototype, "activeItems", {
        get: function () {
            return this._activeItems;
        },
        set: function (activeItems) {
            var _this = this;
            this._activeItems = activeItems.filter(function (item) { return _this._itemsToHandles.has(item); });
            this.update({ activeItems: this._activeItems.map(function (item) { return _this._itemsToHandles.get(item); }) });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuickPickExt.prototype, "selectedItems", {
        get: function () {
            return this._selectedItems;
        },
        set: function (selectedItems) {
            var _this = this;
            this._selectedItems = selectedItems.filter(function (item) { return _this._itemsToHandles.has(item); });
            this.update({ selectedItems: this._selectedItems.map(function (item) { return _this._itemsToHandles.get(item); }) });
        },
        enumerable: false,
        configurable: true
    });
    QuickPickExt.prototype._fireDidChangeActive = function (handles) {
        var _this = this;
        var items = handles.map(function (handle) { return _this._handlesToItems.get(handle); }).filter(function (e) { return !!e; });
        this._activeItems = items;
        this._onDidChangeActiveEmitter.fire(items);
    };
    QuickPickExt.prototype._fireDidChangeSelection = function (handles) {
        var _this = this;
        var items = handles.map(function (handle) { return _this._handlesToItems.get(handle); }).filter(function (e) { return !!e; });
        this._selectedItems = items;
        this._onDidChangeSelectionEmitter.fire(items);
    };
    QuickPickExt.prototype.show = function () {
        var _this = this;
        this.visible = true;
        this.quickOpen.showCustomQuickPick({
            id: this.quickInputIndex,
            title: this.title,
            step: this.step,
            totalSteps: this.totalSteps,
            enabled: this.enabled,
            busy: this.busy,
            ignoreFocusOut: this.ignoreFocusOut,
            value: this.value,
            placeholder: this.placeholder,
            buttons: this.buttons.map(function (btn) { return ({
                'iconPath': _this.convertURL(btn.iconPath),
                'tooltip': btn.tooltip
            }); }),
            items: type_converters_1.quickPickItemToPickOpenItem(this.items),
            canSelectMany: this.canSelectMany,
            matchOnDescription: this.matchOnDescription,
            matchOnDetail: this.matchOnDetail,
            activeItems: this.activeItems,
            selectedItems: this.selectedItems
        });
    };
    return QuickPickExt;
}(QuickInputExt));
exports.QuickPickExt = QuickPickExt;
//# sourceMappingURL=quick-open.js.map