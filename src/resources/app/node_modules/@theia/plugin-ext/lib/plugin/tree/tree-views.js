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
exports.TreeViewsExtImpl = void 0;
// TODO: extract `@theia/util` for event, disposable, cancellation and common types
// don't use @theia/core directly from plugin host
var event_1 = require("@theia/core/lib/common/event");
var disposable_1 = require("@theia/core/lib/common/disposable");
var types_impl_1 = require("../types-impl");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var common_1 = require("../../common");
var plugin_icon_path_1 = require("../plugin-icon-path");
var TreeViewsExtImpl = /** @class */ (function () {
    function TreeViewsExtImpl(rpc, commandRegistry) {
        var _this = this;
        this.commandRegistry = commandRegistry;
        this.treeViews = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.TREE_VIEWS_MAIN);
        commandRegistry.registerArgumentProcessor({
            processArgument: function (arg) {
                if (!common_1.TreeViewSelection.is(arg)) {
                    return arg;
                }
                var treeViewId = arg.treeViewId, treeItemId = arg.treeItemId;
                var treeView = _this.treeViews.get(treeViewId);
                return treeView && treeView.getTreeItem(treeItemId);
            }
        });
    }
    TreeViewsExtImpl.prototype.registerTreeDataProvider = function (plugin, treeViewId, treeDataProvider) {
        var _this = this;
        var treeView = this.createTreeView(plugin, treeViewId, { treeDataProvider: treeDataProvider });
        return types_impl_1.Disposable.create(function () {
            _this.treeViews.delete(treeViewId);
            treeView.dispose();
        });
    };
    TreeViewsExtImpl.prototype.createTreeView = function (plugin, treeViewId, options) {
        var _this = this;
        if (!options || !options.treeDataProvider) {
            throw new Error('Options with treeDataProvider is mandatory');
        }
        var treeView = new TreeViewExtImpl(plugin, treeViewId, options.treeDataProvider, this.proxy, this.commandRegistry.converter);
        this.treeViews.set(treeViewId, treeView);
        return {
            // tslint:disable:typedef
            get onDidExpandElement() {
                return treeView.onDidExpandElement;
            },
            get onDidCollapseElement() {
                return treeView.onDidCollapseElement;
            },
            get selection() {
                return treeView.selectedElements;
            },
            get onDidChangeSelection() {
                return treeView.onDidChangeSelection;
            },
            get visible() {
                return treeView.visible;
            },
            get onDidChangeVisibility() {
                return treeView.onDidChangeVisibility;
            },
            get message() {
                return treeView.message;
            },
            set message(message) {
                treeView.message = message;
            },
            get title() {
                return treeView.title;
            },
            set title(title) {
                treeView.title = title;
            },
            reveal: function (element, revealOptions) {
                return treeView.reveal(element, revealOptions);
            },
            dispose: function () {
                _this.treeViews.delete(treeViewId);
                treeView.dispose();
            }
        };
    };
    TreeViewsExtImpl.prototype.$getChildren = function (treeViewId, treeItemId) {
        return __awaiter(this, void 0, void 0, function () {
            var treeView;
            return __generator(this, function (_a) {
                treeView = this.getTreeView(treeViewId);
                return [2 /*return*/, treeView.getChildren(treeItemId)];
            });
        });
    };
    TreeViewsExtImpl.prototype.$setExpanded = function (treeViewId, treeItemId, expanded) {
        return __awaiter(this, void 0, void 0, function () {
            var treeView;
            return __generator(this, function (_a) {
                treeView = this.getTreeView(treeViewId);
                if (expanded) {
                    return [2 /*return*/, treeView.onExpanded(treeItemId)];
                }
                else {
                    return [2 /*return*/, treeView.onCollapsed(treeItemId)];
                }
                return [2 /*return*/];
            });
        });
    };
    TreeViewsExtImpl.prototype.$setSelection = function (treeViewId, treeItemIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getTreeView(treeViewId).setSelection(treeItemIds);
                return [2 /*return*/];
            });
        });
    };
    TreeViewsExtImpl.prototype.$setVisible = function (treeViewId, isVisible) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getTreeView(treeViewId).setVisible(isVisible);
                return [2 /*return*/];
            });
        });
    };
    TreeViewsExtImpl.prototype.getTreeView = function (treeViewId) {
        var treeView = this.treeViews.get(treeViewId);
        if (!treeView) {
            throw new Error("No tree view with id '" + treeViewId + "' registered.");
        }
        return treeView;
    };
    return TreeViewsExtImpl;
}());
exports.TreeViewsExtImpl = TreeViewsExtImpl;
var TreeViewExtImpl = /** @class */ (function () {
    function TreeViewExtImpl(plugin, treeViewId, treeDataProvider, proxy, commandsConverter) {
        var _this = this;
        this.plugin = plugin;
        this.treeViewId = treeViewId;
        this.treeDataProvider = treeDataProvider;
        this.proxy = proxy;
        this.commandsConverter = commandsConverter;
        this.onDidExpandElementEmitter = new event_1.Emitter();
        this.onDidExpandElement = this.onDidExpandElementEmitter.event;
        this.onDidCollapseElementEmitter = new event_1.Emitter();
        this.onDidCollapseElement = this.onDidCollapseElementEmitter.event;
        this.onDidChangeSelectionEmitter = new event_1.Emitter();
        this.onDidChangeSelection = this.onDidChangeSelectionEmitter.event;
        this.onDidChangeVisibilityEmitter = new event_1.Emitter();
        this.onDidChangeVisibility = this.onDidChangeVisibilityEmitter.event;
        this.nodes = new Map();
        this.pendingRefresh = Promise.resolve();
        this.toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { return _this.clearAll(); }), this.onDidExpandElementEmitter, this.onDidCollapseElementEmitter, this.onDidChangeSelectionEmitter, this.onDidChangeVisibilityEmitter);
        this._message = '';
        this._title = '';
        this.selectedItemIds = new Set();
        this._visible = false;
        proxy.$registerTreeDataProvider(treeViewId);
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.proxy.$unregisterTreeDataProvider(treeViewId); }));
        if (treeDataProvider.onDidChangeTreeData) {
            treeDataProvider.onDidChangeTreeData(function (e) {
                _this.pendingRefresh = proxy.$refresh(treeViewId);
            });
        }
    }
    TreeViewExtImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    TreeViewExtImpl.prototype.reveal = function (element, options) {
        return __awaiter(this, void 0, void 0, function () {
            var elementId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pendingRefresh];
                    case 1:
                        _a.sent();
                        this.nodes.forEach(function (el, id) {
                            if (Object.is(el.value, element)) {
                                elementId = id;
                            }
                        });
                        if (elementId) {
                            return [2 /*return*/, this.proxy.$reveal(this.treeViewId, elementId, __assign({ select: true, focus: false, expand: false }, options))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(TreeViewExtImpl.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (message) {
            this._message = message;
            this.proxy.$setMessage(this.treeViewId, this._message);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TreeViewExtImpl.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (title) {
            this._title = title;
            this.proxy.$setTitle(this.treeViewId, title);
        },
        enumerable: false,
        configurable: true
    });
    TreeViewExtImpl.prototype.getTreeItem = function (treeItemId) {
        var element = this.nodes.get(treeItemId);
        return element && element.value;
    };
    TreeViewExtImpl.prototype.getChildren = function (parentId) {
        return __awaiter(this, void 0, void 0, function () {
            var parentNode, parent, result, treeItems_1, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parentNode = this.nodes.get(parentId);
                        parent = parentNode && parentNode.value;
                        if (parentId && !parent) {
                            console.error("No tree item with id '" + parentId + "' found.");
                            return [2 /*return*/, []];
                        }
                        this.clearChildren(parentNode);
                        return [4 /*yield*/, this.treeDataProvider.getChildren(parent)];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        treeItems_1 = [];
                        promises = result.map(function (value, index) { return __awaiter(_this, void 0, void 0, function () {
                            var treeItem, label, treeItemLabel, idLabel, id, toDisposeElement, node, children, icon, iconUrl, themeIconId, iconPath, treeViewItem;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.treeDataProvider.getTreeItem(value)];
                                    case 1:
                                        treeItem = _a.sent();
                                        treeItemLabel = treeItem.label;
                                        if (typeof treeItemLabel === 'object' && typeof treeItemLabel.label === 'string') {
                                            label = treeItemLabel.label;
                                        }
                                        else {
                                            label = treeItem.label;
                                        }
                                        idLabel = label;
                                        // Use resource URI if label is not set
                                        if (idLabel === undefined && treeItem.resourceUri) {
                                            idLabel = treeItem.resourceUri.path.toString();
                                            idLabel = decodeURIComponent(idLabel);
                                            if (idLabel.indexOf('/') >= 0) {
                                                idLabel = idLabel.substring(idLabel.lastIndexOf('/') + 1);
                                            }
                                        }
                                        id = treeItem.id || parentId + "/" + index + ":" + idLabel;
                                        toDisposeElement = new disposable_1.DisposableCollection();
                                        node = {
                                            id: id,
                                            value: value,
                                            dispose: function () { return toDisposeElement.dispose(); }
                                        };
                                        if (parentNode) {
                                            children = parentNode.children || [];
                                            children.push(node);
                                            parentNode.children = children;
                                        }
                                        this.nodes.set(id, node);
                                        iconPath = treeItem.iconPath;
                                        if (typeof iconPath === 'string' && iconPath.indexOf('fa-') !== -1) {
                                            icon = iconPath;
                                        }
                                        else if (iconPath instanceof types_impl_1.ThemeIcon) {
                                            themeIconId = iconPath.id;
                                        }
                                        else {
                                            iconUrl = plugin_icon_path_1.PluginIconPath.toUrl(iconPath, this.plugin);
                                        }
                                        treeViewItem = {
                                            id: id,
                                            label: label,
                                            icon: icon,
                                            iconUrl: iconUrl,
                                            themeIconId: themeIconId,
                                            description: treeItem.description,
                                            resourceUri: treeItem.resourceUri,
                                            tooltip: treeItem.tooltip,
                                            collapsibleState: treeItem.collapsibleState,
                                            contextValue: treeItem.contextValue,
                                            command: this.commandsConverter.toSafeCommand(treeItem.command, toDisposeElement)
                                        };
                                        treeItems_1.push(treeViewItem);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, treeItems_1];
                    case 3: return [2 /*return*/, undefined];
                }
            });
        });
    };
    TreeViewExtImpl.prototype.clearChildren = function (parentNode) {
        var e_1, _a;
        if (parentNode) {
            if (parentNode.children) {
                try {
                    for (var _b = __values(parentNode.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        this.clear(child);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            delete parentNode['children'];
        }
        else {
            this.clearAll();
        }
    };
    TreeViewExtImpl.prototype.clear = function (node) {
        var e_2, _a;
        if (node.children) {
            try {
                for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    this.clear(child);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        this.nodes.delete(node.id);
        node.dispose();
    };
    TreeViewExtImpl.prototype.clearAll = function () {
        this.nodes.forEach(function (node) { return node.dispose(); });
        this.nodes.clear();
    };
    TreeViewExtImpl.prototype.onExpanded = function (treeItemId) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedElement;
            return __generator(this, function (_a) {
                cachedElement = this.getTreeItem(treeItemId);
                // fire an event
                if (cachedElement) {
                    this.onDidExpandElementEmitter.fire({
                        element: cachedElement
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    TreeViewExtImpl.prototype.onCollapsed = function (treeItemId) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedElement;
            return __generator(this, function (_a) {
                cachedElement = this.getTreeItem(treeItemId);
                // fire an event
                if (cachedElement) {
                    this.onDidCollapseElementEmitter.fire({
                        element: cachedElement
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(TreeViewExtImpl.prototype, "selectedElements", {
        get: function () {
            var e_3, _a;
            var items = [];
            try {
                for (var _b = __values(this.selectedItemIds), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var id = _c.value;
                    var item = this.getTreeItem(id);
                    if (item) {
                        items.push(item);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return items;
        },
        enumerable: false,
        configurable: true
    });
    TreeViewExtImpl.prototype.setSelection = function (selectedItemIds) {
        var e_4, _a;
        var toDelete = new Set(this.selectedItemIds);
        try {
            for (var _b = __values(this.selectedItemIds), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                toDelete.delete(id);
                if (!this.selectedItemIds.has(id)) {
                    this.doSetSelection(selectedItemIds);
                    return;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (toDelete.size) {
            this.doSetSelection(selectedItemIds);
        }
    };
    TreeViewExtImpl.prototype.doSetSelection = function (selectedItemIts) {
        this.selectedItemIds = new Set(selectedItemIts);
        this.onDidChangeSelectionEmitter.fire(Object.freeze({ selection: this.selectedElements }));
    };
    Object.defineProperty(TreeViewExtImpl.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        enumerable: false,
        configurable: true
    });
    TreeViewExtImpl.prototype.setVisible = function (visible) {
        if (visible !== this._visible) {
            this._visible = visible;
            this.onDidChangeVisibilityEmitter.fire(Object.freeze({ visible: this._visible }));
        }
    };
    return TreeViewExtImpl;
}());
//# sourceMappingURL=tree-views.js.map