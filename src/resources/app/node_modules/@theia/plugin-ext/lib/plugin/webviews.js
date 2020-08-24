"use strict";
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc.
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
exports.WebviewPanelImpl = exports.WebviewImpl = exports.WebviewsExtImpl = void 0;
var uuid_1 = require("uuid");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var vscode_uri_1 = require("vscode-uri");
var event_1 = require("@theia/core/lib/common/event");
var type_converters_1 = require("./type-converters");
var types_impl_1 = require("./types-impl");
var plugin_icon_path_1 = require("./plugin-icon-path");
var WebviewsExtImpl = /** @class */ (function () {
    function WebviewsExtImpl(rpc, workspace) {
        this.workspace = workspace;
        this.webviewPanels = new Map();
        this.serializers = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.WEBVIEWS_MAIN);
    }
    WebviewsExtImpl.prototype.init = function (initData) {
        this.initData = initData;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebviewsExtImpl.prototype.$onMessage = function (handle, message) {
        var panel = this.getWebviewPanel(handle);
        if (panel) {
            panel.webview.onMessageEmitter.fire(message);
        }
    };
    WebviewsExtImpl.prototype.$onDidChangeWebviewPanelViewState = function (handle, newState) {
        var panel = this.getWebviewPanel(handle);
        if (panel) {
            var viewColumn = type_converters_1.toViewColumn(newState.position);
            if (panel.active !== newState.active || panel.visible !== newState.visible || panel.viewColumn !== viewColumn) {
                panel.setActive(newState.active);
                panel.setVisible(newState.visible);
                panel.setViewColumn(viewColumn);
                panel.onDidChangeViewStateEmitter.fire({ webviewPanel: panel });
            }
        }
    };
    WebviewsExtImpl.prototype.$onDidDisposeWebviewPanel = function (handle) {
        var panel = this.getWebviewPanel(handle);
        if (panel) {
            panel.dispose();
            this.webviewPanels.delete(handle);
        }
        return Promise.resolve();
    };
    WebviewsExtImpl.prototype.$deserializeWebviewPanel = function (viewId, viewType, title, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state, viewState, options) {
        if (!this.initData) {
            return Promise.reject(new Error('Webviews are not initialized'));
        }
        var entry = this.serializers.get(viewType);
        if (!entry) {
            return Promise.reject(new Error("No serializer found for '" + viewType + "'"));
        }
        var serializer = entry.serializer, plugin = entry.plugin;
        var webview = new WebviewImpl(viewId, this.proxy, options, this.initData, this.workspace, plugin);
        var revivedPanel = new WebviewPanelImpl(viewId, this.proxy, viewType, title, type_converters_1.toViewColumn(viewState.position), options, webview);
        revivedPanel.setActive(viewState.active);
        revivedPanel.setVisible(viewState.visible);
        this.webviewPanels.set(viewId, revivedPanel);
        return serializer.deserializeWebviewPanel(revivedPanel, state);
    };
    WebviewsExtImpl.prototype.createWebview = function (viewType, title, showOptions, options, plugin) {
        if (!this.initData) {
            throw new Error('Webviews are not initialized');
        }
        var webviewShowOptions = type_converters_1.toWebviewPanelShowOptions(showOptions);
        var viewId = uuid_1.v4();
        this.proxy.$createWebviewPanel(viewId, viewType, title, webviewShowOptions, WebviewImpl.toWebviewOptions(options, this.workspace, plugin));
        var webview = new WebviewImpl(viewId, this.proxy, options, this.initData, this.workspace, plugin);
        var panel = new WebviewPanelImpl(viewId, this.proxy, viewType, title, webviewShowOptions, options, webview);
        this.webviewPanels.set(viewId, panel);
        return panel;
    };
    WebviewsExtImpl.prototype.registerWebviewPanelSerializer = function (viewType, serializer, plugin) {
        var _this = this;
        if (this.serializers.has(viewType)) {
            throw new Error("Serializer for '" + viewType + "' already registered");
        }
        this.serializers.set(viewType, { serializer: serializer, plugin: plugin });
        this.proxy.$registerSerializer(viewType);
        return new types_impl_1.Disposable(function () {
            _this.serializers.delete(viewType);
            _this.proxy.$unregisterSerializer(viewType);
        });
    };
    WebviewsExtImpl.prototype.getWebviewPanel = function (viewId) {
        if (this.webviewPanels.has(viewId)) {
            return this.webviewPanels.get(viewId);
        }
        return undefined;
    };
    return WebviewsExtImpl;
}());
exports.WebviewsExtImpl = WebviewsExtImpl;
var WebviewImpl = /** @class */ (function () {
    function WebviewImpl(viewId, proxy, options, initData, workspace, plugin) {
        this.viewId = viewId;
        this.proxy = proxy;
        this.initData = initData;
        this.workspace = workspace;
        this.plugin = plugin;
        this.isDisposed = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onMessageEmitter = new event_1.Emitter();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onDidReceiveMessage = this.onMessageEmitter.event;
        this._options = options;
    }
    WebviewImpl.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        this.isDisposed = true;
        this.onMessageEmitter.dispose();
    };
    WebviewImpl.prototype.asWebviewUri = function (resource) {
        var uri = this.initData.webviewResourceRoot
            // Make sure we preserve the scheme of the resource but convert it into a normal path segment
            // The scheme is important as we need to know if we are requesting a local or a remote resource.
            .replace('{{resource}}', resource.scheme + resource.toString().replace(/^\S+?:/, ''))
            .replace('{{uuid}}', this.viewId);
        return vscode_uri_1.URI.parse(uri);
    };
    Object.defineProperty(WebviewImpl.prototype, "cspSource", {
        get: function () {
            return this.initData.webviewCspSource.replace('{{uuid}}', this.viewId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebviewImpl.prototype, "html", {
        get: function () {
            this.checkIsDisposed();
            return this._html;
        },
        set: function (value) {
            this.checkIsDisposed();
            if (this._html !== value) {
                this._html = value;
                this.proxy.$setHtml(this.viewId, value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebviewImpl.prototype, "options", {
        get: function () {
            this.checkIsDisposed();
            return this._options;
        },
        set: function (newOptions) {
            this.checkIsDisposed();
            this.proxy.$setOptions(this.viewId, WebviewImpl.toWebviewOptions(newOptions, this.workspace, this.plugin));
            this._options = newOptions;
        },
        enumerable: false,
        configurable: true
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebviewImpl.prototype.postMessage = function (message) {
        this.checkIsDisposed();
        return this.proxy.$postMessage(this.viewId, message);
    };
    WebviewImpl.prototype.checkIsDisposed = function () {
        if (this.isDisposed) {
            throw new Error('This Webview is disposed!');
        }
    };
    WebviewImpl.toWebviewOptions = function (options, workspace, plugin) {
        return __assign(__assign({}, options), { localResourceRoots: options.localResourceRoots || __spread((workspace.workspaceFolders || []).map(function (x) { return x.uri; }), [
                vscode_uri_1.URI.file(plugin.pluginFolder)
            ]) });
    };
    return WebviewImpl;
}());
exports.WebviewImpl = WebviewImpl;
var WebviewPanelImpl = /** @class */ (function () {
    function WebviewPanelImpl(viewId, proxy, _viewType, _title, showOptions, _options, _webview) {
        this.viewId = viewId;
        this.proxy = proxy;
        this._viewType = _viewType;
        this._title = _title;
        this._options = _options;
        this._webview = _webview;
        this.isDisposed = false;
        this._active = true;
        this._visible = true;
        this.onDisposeEmitter = new event_1.Emitter();
        this.onDidDispose = this.onDisposeEmitter.event;
        this.onDidChangeViewStateEmitter = new event_1.Emitter();
        this.onDidChangeViewState = this.onDidChangeViewStateEmitter.event;
        this._showOptions = typeof showOptions === 'object' ? showOptions : { viewColumn: showOptions };
    }
    WebviewPanelImpl.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        this.isDisposed = true;
        this.onDisposeEmitter.fire(undefined);
        this.proxy.$disposeWebview(this.viewId);
        this._webview.dispose();
        this.onDisposeEmitter.dispose();
        this.onDidChangeViewStateEmitter.dispose();
    };
    Object.defineProperty(WebviewPanelImpl.prototype, "viewType", {
        get: function () {
            this.checkIsDisposed();
            return this._viewType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebviewPanelImpl.prototype, "title", {
        get: function () {
            this.checkIsDisposed();
            return this._title;
        },
        set: function (newTitle) {
            this.checkIsDisposed();
            if (this._title !== newTitle) {
                this._title = newTitle;
                this.proxy.$setTitle(this.viewId, newTitle);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebviewPanelImpl.prototype, "iconPath", {
        get: function () {
            return this._iconPath;
        },
        set: function (iconPath) {
            this.checkIsDisposed();
            if (this._iconPath !== iconPath) {
                this._iconPath = iconPath;
                this.proxy.$setIconPath(this.viewId, plugin_icon_path_1.PluginIconPath.toUrl(iconPath, this._webview.plugin));
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebviewPanelImpl.prototype, "webview", {
        get: function () {
            this.checkIsDisposed();
            return this._webview;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebviewPanelImpl.prototype, "options", {
        get: function () {
            this.checkIsDisposed();
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebviewPanelImpl.prototype, "viewColumn", {
        get: function () {
            this.checkIsDisposed();
            return this._showOptions.viewColumn;
        },
        enumerable: false,
        configurable: true
    });
    WebviewPanelImpl.prototype.setViewColumn = function (value) {
        this.checkIsDisposed();
        this._showOptions.viewColumn = value;
    };
    Object.defineProperty(WebviewPanelImpl.prototype, "showOptions", {
        get: function () {
            this.checkIsDisposed();
            return this._showOptions;
        },
        enumerable: false,
        configurable: true
    });
    WebviewPanelImpl.prototype.setShowOptions = function (value) {
        this.checkIsDisposed();
        this._showOptions = value;
    };
    Object.defineProperty(WebviewPanelImpl.prototype, "active", {
        get: function () {
            this.checkIsDisposed();
            return this._active;
        },
        enumerable: false,
        configurable: true
    });
    WebviewPanelImpl.prototype.setActive = function (value) {
        this.checkIsDisposed();
        this._active = value;
    };
    Object.defineProperty(WebviewPanelImpl.prototype, "visible", {
        get: function () {
            this.checkIsDisposed();
            return this._visible;
        },
        enumerable: false,
        configurable: true
    });
    WebviewPanelImpl.prototype.setVisible = function (value) {
        this.checkIsDisposed();
        this._visible = value;
    };
    WebviewPanelImpl.prototype.reveal = function (arg0, arg1, arg2) {
        var area = undefined;
        var viewColumn = undefined;
        var preserveFocus = undefined;
        if (typeof arg0 === 'number') {
            viewColumn = arg0;
        }
        else {
            area = arg0;
        }
        if (typeof arg1 === 'number') {
            viewColumn = arg1;
        }
        else {
            preserveFocus = arg1;
        }
        if (typeof arg2 === 'boolean') {
            preserveFocus = arg2;
        }
        this.checkIsDisposed();
        this.proxy.$reveal(this.viewId, {
            area: area,
            viewColumn: viewColumn ? type_converters_1.fromViewColumn(viewColumn) : undefined,
            preserveFocus: preserveFocus
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebviewPanelImpl.prototype.postMessage = function (message) {
        this.checkIsDisposed();
        return this.proxy.$postMessage(this.viewId, message);
    };
    WebviewPanelImpl.prototype.checkIsDisposed = function () {
        if (this.isDisposed) {
            throw new Error('This WebviewPanel is disposed!');
        }
    };
    return WebviewPanelImpl;
}());
exports.WebviewPanelImpl = WebviewPanelImpl;
//# sourceMappingURL=webviews.js.map