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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.WebviewsMainImpl = void 0;
var debounce = require("lodash.debounce");
var vscode_uri_1 = require("vscode-uri");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var application_shell_1 = require("@theia/core/lib/browser/shell/application-shell");
var webview_1 = require("./webview/webview");
var disposable_1 = require("@theia/core/lib/common/disposable");
var view_column_service_1 = require("./view-column-service");
var widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
var json_1 = require("@phosphor/coreutils/lib/json");
var hosted_plugin_1 = require("../../hosted/browser/hosted-plugin");
var WebviewsMainImpl = /** @class */ (function () {
    function WebviewsMainImpl(rpc, container) {
        var _this = this;
        this.toDispose = new disposable_1.DisposableCollection();
        this.updateViewStates = debounce(function () {
            var e_1, _a;
            try {
                for (var _b = __values(_this.widgets.getWidgets(webview_1.WebviewWidget.FACTORY_ID)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var widget = _c.value;
                    if (widget instanceof webview_1.WebviewWidget) {
                        _this.updateViewState(widget);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, 100);
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.WEBVIEWS_EXT);
        this.shell = container.get(application_shell_1.ApplicationShell);
        this.viewColumnService = container.get(view_column_service_1.ViewColumnService);
        this.widgets = container.get(widget_manager_1.WidgetManager);
        this.pluginService = container.get(hosted_plugin_1.HostedPluginSupport);
        this.toDispose.push(this.shell.onDidChangeActiveWidget(function () { return _this.updateViewStates(); }));
        this.toDispose.push(this.shell.onDidChangeCurrentWidget(function () { return _this.updateViewStates(); }));
        this.toDispose.push(this.viewColumnService.onViewColumnChanged(function () { return _this.updateViewStates(); }));
    }
    WebviewsMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    WebviewsMainImpl.prototype.$createWebviewPanel = function (panelId, viewType, title, showOptions, options) {
        return __awaiter(this, void 0, void 0, function () {
            var view, enableFindWidget, retainContextWhenHidden, enableScripts, localResourceRoots, contentOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.widgets.getOrCreateWidget(webview_1.WebviewWidget.FACTORY_ID, { id: panelId })];
                    case 1:
                        view = _a.sent();
                        this.hookWebview(view);
                        view.viewType = viewType;
                        view.title.label = title;
                        enableFindWidget = options.enableFindWidget, retainContextWhenHidden = options.retainContextWhenHidden, enableScripts = options.enableScripts, localResourceRoots = options.localResourceRoots, contentOptions = __rest(options, ["enableFindWidget", "retainContextWhenHidden", "enableScripts", "localResourceRoots"]);
                        view.options = { enableFindWidget: enableFindWidget, retainContextWhenHidden: retainContextWhenHidden };
                        view.setContentOptions(__assign({ allowScripts: enableScripts, localResourceRoots: localResourceRoots && localResourceRoots.map(function (root) { return root.toString(); }) }, contentOptions));
                        this.addOrReattachWidget(view, showOptions);
                        return [2 /*return*/];
                }
            });
        });
    };
    WebviewsMainImpl.prototype.hookWebview = function (view) {
        var _this = this;
        var handle = view.identifier.id;
        this.toDispose.push(view.onDidChangeVisibility(function () { return _this.updateViewState(view); }));
        this.toDispose.push(view.onMessage(function (data) { return _this.proxy.$onMessage(handle, data); }));
        view.disposed.connect(function () {
            if (_this.toDispose.disposed) {
                return;
            }
            _this.proxy.$onDidDisposeWebviewPanel(handle);
        });
    };
    WebviewsMainImpl.prototype.addOrReattachWidget = function (widget, showOptions) {
        var widgetOptions = { area: showOptions.area ? showOptions.area : 'main' };
        var mode = 'open-to-right';
        if (showOptions.viewColumn === -2) {
            var ref = this.shell.currentWidget;
            if (ref && this.shell.getAreaFor(ref) === widgetOptions.area) {
                Object.assign(widgetOptions, { ref: ref, mode: mode });
            }
        }
        else if (widgetOptions.area === 'main' && showOptions.viewColumn !== undefined) {
            this.viewColumnService.updateViewColumns();
            var widgetIds_1 = this.viewColumnService.getViewColumnIds(showOptions.viewColumn);
            if (widgetIds_1.length > 0) {
                mode = 'tab-after';
            }
            else if (showOptions.viewColumn >= 0) {
                var columnsSize = this.viewColumnService.viewColumnsSize();
                if (columnsSize) {
                    showOptions.viewColumn = columnsSize - 1;
                    widgetIds_1 = this.viewColumnService.getViewColumnIds(showOptions.viewColumn);
                }
            }
            var ref = this.shell.getWidgets(widgetOptions.area).find(function (w) { return !w.isHidden && widgetIds_1.indexOf(w.id) !== -1; });
            if (ref) {
                Object.assign(widgetOptions, { ref: ref, mode: mode });
            }
        }
        this.shell.addWidget(widget, widgetOptions);
        if (showOptions.preserveFocus) {
            this.shell.revealWidget(widget.id);
        }
        else {
            this.shell.activateWidget(widget.id);
        }
    };
    WebviewsMainImpl.prototype.$disposeWebview = function (handle) {
        return __awaiter(this, void 0, void 0, function () {
            var view;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tryGetWebview(handle)];
                    case 1:
                        view = _a.sent();
                        if (view) {
                            view.dispose();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WebviewsMainImpl.prototype.$reveal = function (handle, showOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var widget, columnIds, area;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWebview(handle)];
                    case 1:
                        widget = _a.sent();
                        if (widget.isDisposed) {
                            return [2 /*return*/];
                        }
                        if ((showOptions.viewColumn !== undefined && showOptions.viewColumn !== widget.viewState.position) || showOptions.area !== undefined) {
                            this.viewColumnService.updateViewColumns();
                            columnIds = showOptions.viewColumn ? this.viewColumnService.getViewColumnIds(showOptions.viewColumn) : [];
                            area = this.shell.getAreaFor(widget);
                            if (columnIds.indexOf(widget.id) === -1 || area !== showOptions.area) {
                                this.addOrReattachWidget(widget, showOptions);
                                return [2 /*return*/];
                            }
                        }
                        if (showOptions.preserveFocus) {
                            this.shell.revealWidget(widget.id);
                        }
                        else {
                            this.shell.activateWidget(widget.id);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WebviewsMainImpl.prototype.$setTitle = function (handle, value) {
        return __awaiter(this, void 0, void 0, function () {
            var webview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWebview(handle)];
                    case 1:
                        webview = _a.sent();
                        webview.title.label = value;
                        return [2 /*return*/];
                }
            });
        });
    };
    WebviewsMainImpl.prototype.$setIconPath = function (handle, iconUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWebview(handle)];
                    case 1:
                        webview = _a.sent();
                        webview.setIconUrl(iconUrl);
                        return [2 /*return*/];
                }
            });
        });
    };
    WebviewsMainImpl.prototype.$setHtml = function (handle, value) {
        return __awaiter(this, void 0, void 0, function () {
            var webview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWebview(handle)];
                    case 1:
                        webview = _a.sent();
                        webview.setHTML(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    WebviewsMainImpl.prototype.$setOptions = function (handle, options) {
        return __awaiter(this, void 0, void 0, function () {
            var webview, enableScripts, localResourceRoots, contentOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWebview(handle)];
                    case 1:
                        webview = _a.sent();
                        enableScripts = options.enableScripts, localResourceRoots = options.localResourceRoots, contentOptions = __rest(options, ["enableScripts", "localResourceRoots"]);
                        webview.setContentOptions(__assign({ allowScripts: enableScripts, localResourceRoots: localResourceRoots && localResourceRoots.map(function (root) { return root.toString(); }) }, contentOptions));
                        return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebviewsMainImpl.prototype.$postMessage = function (handle, value) {
        return __awaiter(this, void 0, void 0, function () {
            var webview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWebview(handle)];
                    case 1:
                        webview = _a.sent();
                        webview.sendMessage(value);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    WebviewsMainImpl.prototype.$registerSerializer = function (viewType) {
        var _this = this;
        this.pluginService.registerWebviewReviver(viewType, function (widget) { return _this.restoreWidget(widget); });
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.$unregisterSerializer(viewType); }));
    };
    WebviewsMainImpl.prototype.$unregisterSerializer = function (viewType) {
        this.pluginService.unregisterWebviewReviver(viewType);
    };
    WebviewsMainImpl.prototype.restoreWidget = function (widget) {
        return __awaiter(this, void 0, void 0, function () {
            var handle, title, state, options, _a, allowScripts, localResourceRoots, contentOptions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.hookWebview(widget);
                        handle = widget.identifier.id;
                        title = widget.title.label;
                        state = undefined;
                        if (widget.state) {
                            try {
                                state = JSON.parse(widget.state);
                            }
                            catch (_c) {
                                // noop
                            }
                        }
                        options = widget.options;
                        _a = widget.contentOptions, allowScripts = _a.allowScripts, localResourceRoots = _a.localResourceRoots, contentOptions = __rest(_a, ["allowScripts", "localResourceRoots"]);
                        this.updateViewState(widget);
                        return [4 /*yield*/, this.proxy.$deserializeWebviewPanel(handle, widget.viewType, title, state, widget.viewState, __assign(__assign({ enableScripts: allowScripts, localResourceRoots: localResourceRoots && localResourceRoots.map(function (root) { return vscode_uri_1.URI.parse(root); }) }, contentOptions), options))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebviewsMainImpl.prototype.updateViewState = function (widget, viewColumn) {
        var viewState = {
            active: this.shell.activeWidget === widget,
            visible: !widget.isHidden,
            position: viewColumn || 0
        };
        if (typeof viewColumn !== 'number') {
            this.viewColumnService.updateViewColumns();
            viewState.position = this.viewColumnService.getViewColumn(widget.id) || 0;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (json_1.JSONExt.deepEqual(viewState, widget.viewState)) {
            return;
        }
        widget.viewState = viewState;
        this.proxy.$onDidChangeWebviewPanelViewState(widget.identifier.id, widget.viewState);
    };
    WebviewsMainImpl.prototype.getWebview = function (viewId) {
        return __awaiter(this, void 0, void 0, function () {
            var webview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tryGetWebview(viewId)];
                    case 1:
                        webview = _a.sent();
                        if (!webview) {
                            throw new Error("Unknown Webview: " + viewId);
                        }
                        return [2 /*return*/, webview];
                }
            });
        });
    };
    WebviewsMainImpl.prototype.tryGetWebview = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.widgets.getWidget(webview_1.WebviewWidget.FACTORY_ID, { id: id })];
            });
        });
    };
    return WebviewsMainImpl;
}());
exports.WebviewsMainImpl = WebviewsMainImpl;
//# sourceMappingURL=webviews-main.js.map