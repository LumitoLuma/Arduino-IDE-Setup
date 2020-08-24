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
exports.QuickOpenMainImpl = void 0;
var quick_open_model_1 = require("@theia/core/lib/browser/quick-open/quick-open-model");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var monaco_quick_open_service_1 = require("@theia/monaco/lib/browser/monaco-quick-open-service");
var browser_1 = require("@theia/core/lib/browser");
var plugin_shared_style_1 = require("./plugin-shared-style");
var vscode_uri_1 = require("vscode-uri");
var types_impl_1 = require("../../plugin/types-impl");
var quick_pick_service_1 = require("@theia/core/lib/common/quick-pick-service");
var quick_title_bar_1 = require("@theia/core/lib/browser/quick-open/quick-title-bar");
var disposable_1 = require("@theia/core/lib/common/disposable");
var quick_open_model_2 = require("@theia/core/lib/common/quick-open-model");
var QuickOpenMainImpl = /** @class */ (function () {
    function QuickOpenMainImpl(rpc, container) {
        this.toDispose = new disposable_1.DisposableCollection();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.QUICK_OPEN_EXT);
        this.delegate = container.get(monaco_quick_open_service_1.MonacoQuickOpenService);
        this.quickInput = container.get(browser_1.QuickInputService);
        this.quickTitleBar = container.get(quick_title_bar_1.QuickTitleBar);
        this.quickPick = container.get(quick_pick_service_1.QuickPickService);
        this.sharedStyle = container.get(plugin_shared_style_1.PluginSharedStyle);
        this.labelProvider = container.get(browser_1.LabelProvider);
    }
    QuickOpenMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    QuickOpenMainImpl.prototype.cleanUp = function () {
        this.items = undefined;
        this.acceptor = undefined;
        if (this.activeElement) {
            this.activeElement.focus({ preventScroll: true });
        }
        this.activeElement = undefined;
    };
    QuickOpenMainImpl.prototype.$show = function (options, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (token.isCancellationRequested) {
                resolve(undefined);
                return;
            }
            _this.doResolve = resolve;
            _this.activeElement = window.document.activeElement;
            var toDispose = token.onCancellationRequested(function () {
                return _this.delegate.hide();
            });
            _this.delegate.open(_this, {
                fuzzyMatchDescription: options.matchOnDescription,
                fuzzyMatchLabel: true,
                fuzzyMatchDetail: options.matchOnDetail,
                placeholder: options.placeHolder,
                ignoreFocusOut: options.ignoreFocusLost,
                onClose: function () {
                    _this.doResolve(undefined);
                    toDispose.dispose();
                    _this.cleanUp();
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    QuickOpenMainImpl.prototype.$setItems = function (items) {
        var e_1, _a;
        var _this = this;
        this.items = [];
        var _loop_1 = function (i) {
            var item = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var options = {
                label: i.label,
                description: i.description,
                detail: i.detail,
                run: function (mode) {
                    if (mode === quick_open_model_1.QuickOpenMode.OPEN) {
                        _this.proxy.$onItemSelected(i.handle);
                        _this.doResolve(i.handle);
                        _this.cleanUp();
                        return true;
                    }
                    return false;
                }
            };
            if (i.groupLabel !== undefined || i.showBorder !== undefined) {
                options.groupLabel = i.groupLabel;
                options.showBorder = i.showBorder;
                item = new quick_open_model_2.QuickOpenGroupItem(options);
            }
            else {
                item = new quick_open_model_1.QuickOpenItem(options);
            }
            this_1.items.push(item);
        };
        var this_1 = this;
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var i = items_1_1.value;
                _loop_1(i);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this.acceptor) {
            this.acceptor(this.items);
        }
        return Promise.resolve();
    };
    QuickOpenMainImpl.prototype.convertPickOpenItemToQuickOpenItem = function (items) {
        var e_2, _a;
        var convertedItems = [];
        try {
            for (var items_2 = __values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                var i = items_2_1.value;
                convertedItems.push({
                    label: i.label,
                    description: i.description,
                    detail: i.detail,
                    value: i.handle
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (items_2_1 && !items_2_1.done && (_a = items_2.return)) _a.call(items_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return convertedItems;
    };
    QuickOpenMainImpl.prototype.$input = function (options, validateInput, token) {
        var _this = this;
        if (validateInput) {
            options.validateInput = function (val) { return _this.proxy.$validateInput(val); };
        }
        return this.quickInput.open(options, token);
    };
    QuickOpenMainImpl.prototype.convertQuickInputButton = function (quickInputButton, index, toDispose) {
        var currentIconPath = quickInputButton.iconPath;
        var newIcon = '';
        var newIconClass;
        if ('id' in currentIconPath || currentIconPath instanceof types_impl_1.ThemeIcon) {
            newIconClass = this.resolveIconClassFromThemeIcon(currentIconPath);
        }
        else if (currentIconPath instanceof vscode_uri_1.URI) {
            newIcon = currentIconPath.toString();
        }
        else {
            var _a = currentIconPath, light = _a.light, dark = _a.dark;
            var themedIconClasses = {
                light: light.toString(),
                dark: dark.toString()
            };
            var reference = this.sharedStyle.toIconClass(themedIconClasses);
            toDispose.push(reference);
            newIconClass = reference.object.iconClass;
        }
        var isDefaultQuickInputButton = 'id' in quickInputButton.iconPath && quickInputButton.iconPath.id === 'Back' ? true : false;
        return {
            icon: newIcon,
            iconClass: newIconClass,
            tooltip: quickInputButton.tooltip,
            side: isDefaultQuickInputButton ? quick_open_model_2.QuickTitleButtonSide.LEFT : quick_open_model_2.QuickTitleButtonSide.RIGHT,
            index: isDefaultQuickInputButton ? -1 : index
        };
    };
    QuickOpenMainImpl.prototype.resolveIconClassFromThemeIcon = function (themeIcon) {
        switch (themeIcon.id) {
            case 'folder': {
                return this.labelProvider.folderIcon;
            }
            case 'file': {
                return this.labelProvider.fileIcon;
            }
            case 'Back': {
                return 'fa fa-arrow-left';
            }
            default: {
                return monaco.theme.ThemeIcon.asClassName(themeIcon);
            }
        }
    };
    QuickOpenMainImpl.prototype.$showInputBox = function (inputBox, validateInput) {
        return __awaiter(this, void 0, void 0, function () {
            var toDispose, quickInput;
            var _this = this;
            return __generator(this, function (_a) {
                if (validateInput) {
                    inputBox.validateInput = function (val) { return _this.proxy.$validateInput(val); };
                }
                toDispose = new disposable_1.DisposableCollection();
                quickInput = this.quickInput.open({
                    busy: inputBox.busy,
                    enabled: inputBox.enabled,
                    ignoreFocusOut: inputBox.ignoreFocusOut,
                    password: inputBox.password,
                    step: inputBox.step,
                    title: inputBox.title,
                    totalSteps: inputBox.totalSteps,
                    buttons: inputBox.buttons.map(function (btn, i) { return _this.convertQuickInputButton(btn, i, toDispose); }),
                    validationMessage: inputBox.validationMessage,
                    placeHolder: inputBox.placeholder,
                    value: inputBox.value,
                    prompt: inputBox.prompt,
                    validateInput: inputBox.validateInput
                });
                toDispose.push(this.quickInput.onDidAccept(function () { return _this.proxy.$acceptOnDidAccept(inputBox.id); }));
                toDispose.push(this.quickInput.onDidChangeValue(function (changedText) { return _this.proxy.$acceptDidChangeValue(inputBox.id, changedText); }));
                toDispose.push(this.quickTitleBar.onDidTriggerButton(function (button) {
                    _this.proxy.$acceptOnDidTriggerButton(inputBox.id, button);
                }));
                this.toDispose.push(toDispose);
                quickInput.then(function () {
                    if (toDispose.disposed) {
                        return;
                    }
                    _this.proxy.$acceptOnDidHide(inputBox.id);
                    toDispose.dispose();
                });
                return [2 /*return*/];
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    QuickOpenMainImpl.prototype.findChangedKey = function (key, value) {
        switch (key) {
            case 'title': {
                this.quickTitleBar.title = value;
                break;
            }
            case 'step': {
                this.quickTitleBar.step = value;
                break;
            }
            case 'totalSteps': {
                this.quickTitleBar.totalSteps = value;
                break;
            }
            case 'buttons': {
                this.quickTitleBar.buttons = value;
                break;
            }
            case 'value': {
                this.delegate.setValue(value);
                break;
            }
            case 'enabled': {
                this.delegate.setEnabled(value);
                break;
            }
            case 'password': {
                this.delegate.setPassword(value);
                break;
            }
            case 'placeholder': {
                this.delegate.setPlaceHolder(value);
                break;
            }
            case 'items': {
                this.quickPick.setItems(this.convertPickOpenItemToQuickOpenItem(value));
                break;
            }
            // TODO selectedItems, activeItems and other properties
            // TODO we need better type checking here
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    QuickOpenMainImpl.prototype.$setQuickInputChanged = function (changed) {
        for (var key in changed) {
            if (changed.hasOwnProperty(key)) {
                var value = changed[key];
                this.findChangedKey(key, value);
            }
        }
    };
    QuickOpenMainImpl.prototype.$refreshQuickInput = function () {
        this.quickInput.refresh();
    };
    QuickOpenMainImpl.prototype.$showCustomQuickPick = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var toDispose, quickPick;
            var _this = this;
            return __generator(this, function (_a) {
                toDispose = new disposable_1.DisposableCollection();
                quickPick = this.quickPick.show(this.convertPickOpenItemToQuickOpenItem(options.items), {
                    buttons: options.buttons.map(function (btn, i) { return _this.convertQuickInputButton(btn, i, toDispose); }),
                    placeholder: options.placeholder,
                    fuzzyMatchDescription: options.matchOnDescription,
                    fuzzyMatchLabel: true,
                    step: options.step,
                    title: options.title,
                    totalSteps: options.totalSteps,
                    ignoreFocusOut: options.ignoreFocusOut,
                    value: options.value,
                    runIfSingle: false,
                });
                toDispose.push(this.quickPick.onDidAccept(function () { return _this.proxy.$acceptOnDidAccept(options.id); }));
                toDispose.push(this.quickPick.onDidChangeActive(function (elements) {
                    _this.proxy.$onDidChangeActive(options.id, elements.map(function (e) { return e.value; }));
                }));
                toDispose.push(this.quickPick.onDidChangeSelection(function (elements) {
                    _this.proxy.$onDidChangeSelection(options.id, elements.map(function (e) { return e.value; }));
                }));
                toDispose.push(this.quickPick.onDidChangeValue(function (value) { return _this.proxy.$acceptDidChangeValue(options.id, value); }));
                toDispose.push(this.quickTitleBar.onDidTriggerButton(function (button) {
                    _this.proxy.$acceptOnDidTriggerButton(options.id, button);
                }));
                this.toDispose.push(toDispose);
                quickPick.then(function () {
                    if (toDispose.disposed) {
                        return;
                    }
                    _this.proxy.$acceptOnDidHide(options.id);
                    toDispose.dispose();
                });
                return [2 /*return*/];
            });
        });
    };
    QuickOpenMainImpl.prototype.onType = function (lookFor, acceptor) {
        this.acceptor = acceptor;
        if (this.items) {
            acceptor(this.items);
        }
    };
    QuickOpenMainImpl.prototype.$hide = function () {
        this.delegate.hide();
    };
    return QuickOpenMainImpl;
}());
exports.QuickOpenMainImpl = QuickOpenMainImpl;
//# sourceMappingURL=quick-open-main.js.map