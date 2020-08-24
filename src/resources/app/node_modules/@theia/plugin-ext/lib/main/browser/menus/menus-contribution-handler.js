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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.MenusContributionPointHandler = exports.CodeEditorWidget = void 0;
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var browser_1 = require("@theia/editor/lib/browser");
var common_1 = require("@theia/core/lib/common");
var event_1 = require("@theia/core/lib/common/event");
var tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
var navigator_contribution_1 = require("@theia/navigator/lib/browser/navigator-contribution");
var quick_command_service_1 = require("@theia/core/lib/browser/quick-open/quick-command-service");
var tree_view_widget_1 = require("../view/tree-view-widget");
var common_2 = require("../../../common");
var debug_stack_frames_widget_1 = require("@theia/debug/lib/browser/view/debug-stack-frames-widget");
var debug_threads_widget_1 = require("@theia/debug/lib/browser/view/debug-threads-widget");
var tree_widget_selection_1 = require("@theia/core/lib/browser/tree/tree-widget-selection");
var scm_widget_1 = require("@theia/scm/lib/browser/scm-widget");
var scm_tree_widget_1 = require("@theia/scm/lib/browser/scm-tree-widget");
var scm_service_1 = require("@theia/scm/lib/browser/scm-service");
var scm_repository_1 = require("@theia/scm/lib/browser/scm-repository");
var scm_main_1 = require("../scm-main");
var resource_context_key_1 = require("@theia/core/lib/browser/resource-context-key");
var plugin_view_widget_1 = require("../view/plugin-view-widget");
var view_context_key_service_1 = require("../view/view-context-key-service");
var webview_1 = require("../webview/webview");
var navigatable_1 = require("@theia/core/lib/browser/navigatable");
var context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
var CodeEditorWidget;
(function (CodeEditorWidget) {
    function is(arg) {
        return arg instanceof browser_1.EditorWidget || arg instanceof webview_1.WebviewWidget;
    }
    CodeEditorWidget.is = is;
    function getResourceUri(editor) {
        var resourceUri = navigatable_1.Navigatable.is(editor) && editor.getResourceUri();
        return resourceUri ? resourceUri['codeUri'] : undefined;
    }
    CodeEditorWidget.getResourceUri = getResourceUri;
})(CodeEditorWidget = exports.CodeEditorWidget || (exports.CodeEditorWidget = {}));
var MenusContributionPointHandler = /** @class */ (function () {
    function MenusContributionPointHandler() {
    }
    MenusContributionPointHandler_1 = MenusContributionPointHandler;
    MenusContributionPointHandler.prototype.handle = function (plugin) {
        var _this = this;
        var allMenus = plugin.contributes && plugin.contributes.menus;
        if (!allMenus) {
            return core_1.Disposable.NULL;
        }
        var toDispose = new core_1.DisposableCollection();
        var _loop_1 = function (location_1) {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, e_7, _g, e_8, _h, e_9, _j, e_10, _k;
            if (location_1 === 'commandPalette') {
                try {
                    for (var _l = (e_1 = void 0, __values(allMenus[location_1])), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var menu = _m.value;
                        if (menu.when) {
                            toDispose.push(this_1.quickCommandService.pushCommandContext(menu.command, menu.when));
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_a = _l.return)) _a.call(_l);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else if (location_1 === 'editor/title') {
                var _loop_2 = function (action) {
                    toDispose.push(this_1.registerTitleAction(location_1, action, {
                        execute: function (widget) { return CodeEditorWidget.is(widget) && _this.commands.executeCommand(action.command, CodeEditorWidget.getResourceUri(widget)); },
                        isEnabled: function (widget) { return CodeEditorWidget.is(widget) && _this.commands.isEnabled(action.command, CodeEditorWidget.getResourceUri(widget)); },
                        isVisible: function (widget) { return CodeEditorWidget.is(widget) && _this.commands.isVisible(action.command, CodeEditorWidget.getResourceUri(widget)); }
                    }));
                };
                try {
                    for (var _o = (e_2 = void 0, __values(allMenus[location_1])), _p = _o.next(); !_p.done; _p = _o.next()) {
                        var action = _p.value;
                        _loop_2(action);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_p && !_p.done && (_b = _o.return)) _b.call(_o);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else if (location_1 === 'view/title') {
                var _loop_3 = function (action) {
                    toDispose.push(this_1.registerTitleAction(location_1, __assign(__assign({}, action), { when: undefined }), {
                        execute: function (widget) { return widget instanceof plugin_view_widget_1.PluginViewWidget && _this.commands.executeCommand(action.command); },
                        isEnabled: function (widget) { return widget instanceof plugin_view_widget_1.PluginViewWidget &&
                            _this.viewContextKeys.with({ view: widget.options.viewId }, function () {
                                return _this.commands.isEnabled(action.command) && _this.viewContextKeys.match(action.when);
                            }); },
                        isVisible: function (widget) { return widget instanceof plugin_view_widget_1.PluginViewWidget &&
                            _this.viewContextKeys.with({ view: widget.options.viewId }, function () {
                                return _this.commands.isVisible(action.command) && _this.viewContextKeys.match(action.when);
                            }); }
                    }));
                };
                try {
                    for (var _q = (e_3 = void 0, __values(allMenus[location_1])), _r = _q.next(); !_r.done; _r = _q.next()) {
                        var action = _r.value;
                        _loop_3(action);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_r && !_r.done && (_c = _q.return)) _c.call(_q);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            else if (location_1 === 'view/item/context') {
                try {
                    for (var _s = (e_4 = void 0, __values(allMenus[location_1])), _t = _s.next(); !_t.done; _t = _s.next()) {
                        var menu = _t.value;
                        var inline = menu.group && /^inline/.test(menu.group) || false;
                        var menuPath = inline ? tree_view_widget_1.VIEW_ITEM_INLINE_MENU : tree_view_widget_1.VIEW_ITEM_CONTEXT_MENU;
                        toDispose.push(this_1.registerTreeMenuAction(menuPath, menu));
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_t && !_t.done && (_d = _s.return)) _d.call(_s);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            else if (location_1 === 'scm/title') {
                try {
                    for (var _u = (e_5 = void 0, __values(allMenus[location_1])), _v = _u.next(); !_v.done; _v = _u.next()) {
                        var action = _v.value;
                        toDispose.push(this_1.registerScmTitleAction(location_1, action));
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_v && !_v.done && (_e = _u.return)) _e.call(_u);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
            else if (location_1 === 'scm/resourceGroup/context') {
                try {
                    for (var _w = (e_6 = void 0, __values(allMenus[location_1])), _x = _w.next(); !_x.done; _x = _w.next()) {
                        var menu = _x.value;
                        var inline = menu.group && /^inline/.test(menu.group) || false;
                        var menuPath = inline ? scm_tree_widget_1.ScmTreeWidget.RESOURCE_GROUP_INLINE_MENU : scm_tree_widget_1.ScmTreeWidget.RESOURCE_GROUP_CONTEXT_MENU;
                        toDispose.push(this_1.registerScmMenuAction(menuPath, menu));
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_x && !_x.done && (_f = _w.return)) _f.call(_w);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            else if (location_1 === 'scm/resourceFolder/context') {
                try {
                    for (var _y = (e_7 = void 0, __values(allMenus[location_1])), _z = _y.next(); !_z.done; _z = _y.next()) {
                        var menu = _z.value;
                        var inline = menu.group && /^inline/.test(menu.group) || false;
                        var menuPath = inline ? scm_tree_widget_1.ScmTreeWidget.RESOURCE_FOLDER_INLINE_MENU : scm_tree_widget_1.ScmTreeWidget.RESOURCE_FOLDER_CONTEXT_MENU;
                        toDispose.push(this_1.registerScmMenuAction(menuPath, menu));
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_z && !_z.done && (_g = _y.return)) _g.call(_y);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
            else if (location_1 === 'scm/resourceState/context') {
                try {
                    for (var _0 = (e_8 = void 0, __values(allMenus[location_1])), _1 = _0.next(); !_1.done; _1 = _0.next()) {
                        var menu = _1.value;
                        var inline = menu.group && /^inline/.test(menu.group) || false;
                        var menuPath = inline ? scm_tree_widget_1.ScmTreeWidget.RESOURCE_INLINE_MENU : scm_tree_widget_1.ScmTreeWidget.RESOURCE_CONTEXT_MENU;
                        toDispose.push(this_1.registerScmMenuAction(menuPath, menu));
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_1 && !_1.done && (_h = _0.return)) _h.call(_0);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
            else if (location_1 === 'debug/callstack/context') {
                try {
                    for (var _2 = (e_9 = void 0, __values(allMenus[location_1])), _3 = _2.next(); !_3.done; _3 = _2.next()) {
                        var menu = _3.value;
                        try {
                            for (var _4 = (e_10 = void 0, __values([debug_stack_frames_widget_1.DebugStackFramesWidget.CONTEXT_MENU, debug_threads_widget_1.DebugThreadsWidget.CONTEXT_MENU])), _5 = _4.next(); !_5.done; _5 = _4.next()) {
                                var menuPath = _5.value;
                                toDispose.push(this_1.registerMenuAction(menuPath, menu, function (command) { return ({
                                    execute: function () {
                                        var args = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            args[_i] = arguments[_i];
                                        }
                                        return _this.commands.executeCommand(command, args[0]);
                                    },
                                    isEnabled: function () {
                                        var args = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            args[_i] = arguments[_i];
                                        }
                                        return _this.commands.isEnabled(command, args[0]);
                                    },
                                    isVisible: function () {
                                        var args = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            args[_i] = arguments[_i];
                                        }
                                        return _this.commands.isVisible(command, args[0]);
                                    }
                                }); }));
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (_5 && !_5.done && (_k = _4.return)) _k.call(_4);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_3 && !_3.done && (_j = _2.return)) _j.call(_2);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
            else if (allMenus.hasOwnProperty(location_1)) {
                var menuPaths_1 = MenusContributionPointHandler_1.parseMenuPaths(location_1);
                if (!menuPaths_1.length) {
                    this_1.logger.warn("'" + plugin.metadata.model.id + "' plugin contributes items to a menu with invalid identifier: " + location_1);
                    return "continue";
                }
                var menus = allMenus[location_1];
                menus.forEach(function (menu) {
                    var e_11, _a;
                    try {
                        for (var menuPaths_2 = (e_11 = void 0, __values(menuPaths_1)), menuPaths_2_1 = menuPaths_2.next(); !menuPaths_2_1.done; menuPaths_2_1 = menuPaths_2.next()) {
                            var menuPath = menuPaths_2_1.value;
                            toDispose.push(_this.registerGlobalMenuAction(menuPath, menu));
                        }
                    }
                    catch (e_11_1) { e_11 = { error: e_11_1 }; }
                    finally {
                        try {
                            if (menuPaths_2_1 && !menuPaths_2_1.done && (_a = menuPaths_2.return)) _a.call(menuPaths_2);
                        }
                        finally { if (e_11) throw e_11.error; }
                    }
                });
            }
        };
        var this_1 = this;
        for (var location_1 in allMenus) {
            _loop_1(location_1);
        }
        return toDispose;
    };
    MenusContributionPointHandler.parseMenuPaths = function (value) {
        switch (value) {
            case 'editor/context': return [browser_1.EDITOR_CONTEXT_MENU];
            case 'explorer/context': return [navigator_contribution_1.NAVIGATOR_CONTEXT_MENU];
        }
        return [];
    };
    MenusContributionPointHandler.prototype.registerTreeMenuAction = function (menuPath, menu) {
        var _this = this;
        return this.registerMenuAction(menuPath, menu, function (command) { return ({
            execute: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.commands).executeCommand.apply(_a, __spread([command], _this.toTreeArgs.apply(_this, __spread(args))));
            },
            isEnabled: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.commands).isEnabled.apply(_a, __spread([command], _this.toTreeArgs.apply(_this, __spread(args))));
            },
            isVisible: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.commands).isVisible.apply(_a, __spread([command], _this.toTreeArgs.apply(_this, __spread(args))));
            }
        }); });
    };
    MenusContributionPointHandler.prototype.toTreeArgs = function () {
        var e_12, _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var treeArgs = [];
        try {
            for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var arg = args_1_1.value;
                if (common_2.TreeViewSelection.is(arg)) {
                    treeArgs.push(arg);
                }
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return treeArgs;
    };
    MenusContributionPointHandler.prototype.registerTitleAction = function (location, action, handler) {
        var _this = this;
        var toDispose = new core_1.DisposableCollection();
        var id = this.createSyntheticCommandId(action.command, { prefix: "__plugin." + location.replace('/', '.') + ".action." });
        var command = { id: id };
        toDispose.push(this.commands.registerCommand(command, handler));
        var when = action.when;
        var whenKeys = when && this.contextKeyService.parseKeys(when);
        var onDidChange;
        if (whenKeys && whenKeys.size) {
            var onDidChangeEmitter_1 = new event_1.Emitter();
            toDispose.push(onDidChangeEmitter_1);
            onDidChange = onDidChangeEmitter_1.event;
            this.contextKeyService.onDidChange.maxListeners = this.contextKeyService.onDidChange.maxListeners + 1;
            toDispose.push(this.contextKeyService.onDidChange(function (event) {
                if (event.affects(whenKeys)) {
                    onDidChangeEmitter_1.fire(undefined);
                }
            }));
            toDispose.push(core_1.Disposable.create(function () {
                _this.contextKeyService.onDidChange.maxListeners = _this.contextKeyService.onDidChange.maxListeners - 1;
            }));
        }
        // handle group and priority
        // if group is empty or white space is will be set to navigation
        // ' ' => ['navigation', 0]
        // 'navigation@1' => ['navigation', 1]
        // '1_rest-client@2' => ['1_rest-client', 2]
        // if priority is not a number it will be set to 0
        // navigation@test => ['navigation', 0]
        var _a = __read((action.group || 'navigation').split('@'), 2), group = _a[0], sort = _a[1];
        var item = { id: id, command: id, group: group.trim() || 'navigation', priority: ~~sort || undefined, when: when, onDidChange: onDidChange };
        toDispose.push(this.tabBarToolbar.registerItem(item));
        toDispose.push(this.onDidRegisterCommand(action.command, function (pluginCommand) {
            command.category = pluginCommand.category;
            item.tooltip = pluginCommand.label;
            if (group === 'navigation') {
                command.iconClass = pluginCommand.iconClass;
            }
        }));
        return toDispose;
    };
    MenusContributionPointHandler.prototype.registerScmTitleAction = function (location, action) {
        var _this = this;
        var selectedRepository = function () { return _this.toScmArgs(_this.scmService.selectedRepository); };
        return this.registerTitleAction(location, action, {
            execute: function (widget) { return widget instanceof scm_widget_1.ScmWidget && _this.commands.executeCommand(action.command, selectedRepository()); },
            isEnabled: function (widget) { return widget instanceof scm_widget_1.ScmWidget && _this.commands.isEnabled(action.command, selectedRepository()); },
            isVisible: function (widget) { return widget instanceof scm_widget_1.ScmWidget && _this.commands.isVisible(action.command, selectedRepository()); }
        });
    };
    MenusContributionPointHandler.prototype.registerScmMenuAction = function (menuPath, menu) {
        var _this = this;
        return this.registerMenuAction(menuPath, menu, function (command) { return ({
            execute: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.commands).executeCommand.apply(_a, __spread([command], _this.toScmArgs.apply(_this, __spread(args))));
            },
            isEnabled: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.commands).isEnabled.apply(_a, __spread([command], _this.toScmArgs.apply(_this, __spread(args))));
            },
            isVisible: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.commands).isVisible.apply(_a, __spread([command], _this.toScmArgs.apply(_this, __spread(args))));
            }
        }); });
    };
    MenusContributionPointHandler.prototype.toScmArgs = function () {
        var e_13, _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var scmArgs = [];
        try {
            for (var args_2 = __values(args), args_2_1 = args_2.next(); !args_2_1.done; args_2_1 = args_2.next()) {
                var arg = args_2_1.value;
                var scmArg = this.toScmArg(arg);
                if (scmArg) {
                    scmArgs.push(scmArg);
                }
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (args_2_1 && !args_2_1.done && (_a = args_2.return)) _a.call(args_2);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return scmArgs;
    };
    MenusContributionPointHandler.prototype.toScmArg = function (arg) {
        if (arg instanceof scm_repository_1.ScmRepository && arg.provider instanceof scm_main_1.PluginScmProvider) {
            return {
                sourceControlHandle: arg.provider.handle
            };
        }
        if (arg instanceof scm_main_1.PluginScmResourceGroup) {
            return {
                sourceControlHandle: arg.provider.handle,
                resourceGroupHandle: arg.handle
            };
        }
        if (arg instanceof scm_main_1.PluginScmResource) {
            return {
                sourceControlHandle: arg.group.provider.handle,
                resourceGroupHandle: arg.group.handle,
                resourceStateHandle: arg.handle
            };
        }
    };
    MenusContributionPointHandler.prototype.registerGlobalMenuAction = function (menuPath, menu) {
        var _this = this;
        var selectedResource = function () {
            var selection = _this.selectionService.selection;
            if (tree_widget_selection_1.TreeWidgetSelection.is(selection) && selection.source instanceof tree_view_widget_1.TreeViewWidget && selection[0]) {
                return selection.source.toTreeViewSelection(selection[0]);
            }
            var uri = _this.resourceContextKey.get();
            return uri ? uri['codeUri'] : undefined;
        };
        return this.registerMenuAction(menuPath, menu, function (command) { return ({
            execute: function () { return _this.commands.executeCommand(command, selectedResource()); },
            isEnabled: function () { return _this.commands.isEnabled(command, selectedResource()); },
            isVisible: function () { return _this.commands.isVisible(command, selectedResource()); }
        }); });
    };
    MenusContributionPointHandler.prototype.registerMenuAction = function (menuPath, menu, handler) {
        var toDispose = new core_1.DisposableCollection();
        var commandId = this.createSyntheticCommandId(menu.command, { prefix: '__plugin.menu.action.' });
        var command = { id: commandId };
        toDispose.push(this.commands.registerCommand(command, handler(menu.command)));
        toDispose.push(this.quickCommandService.pushCommandContext(commandId, 'false'));
        var altId;
        if (menu.alt) {
            altId = this.createSyntheticCommandId(menu.alt, { prefix: '__plugin.menu.action.' });
            var alt_1 = { id: altId };
            toDispose.push(this.commands.registerCommand(alt_1, handler(menu.alt)));
            toDispose.push(this.quickCommandService.pushCommandContext(altId, 'false'));
            toDispose.push(this.onDidRegisterCommand(menu.alt, function (pluginCommand) {
                alt_1.category = pluginCommand.category;
                alt_1.label = pluginCommand.label;
                if (inline) {
                    alt_1.iconClass = pluginCommand.iconClass;
                }
            }));
        }
        var when = menu.when;
        var _a = __read((menu.group || '').split('@'), 2), _b = _a[0], group = _b === void 0 ? '' : _b, _c = _a[1], order = _c === void 0 ? undefined : _c;
        var action = { commandId: commandId, alt: altId, order: order, when: when };
        var inline = /^inline/.test(group);
        menuPath = inline ? menuPath : __spread(menuPath, [group]);
        toDispose.push(this.menuRegistry.registerMenuAction(menuPath, action));
        toDispose.push(this.onDidRegisterCommand(menu.command, function (pluginCommand) {
            command.category = pluginCommand.category;
            command.label = pluginCommand.label;
            if (inline) {
                command.iconClass = pluginCommand.iconClass;
            }
        }));
        return toDispose;
    };
    MenusContributionPointHandler.prototype.createSyntheticCommandId = function (command, _a) {
        var prefix = _a.prefix;
        var id = prefix + command;
        var index = 0;
        while (this.commands.getCommand(id)) {
            id = prefix + command + ':' + index;
            index++;
        }
        return id;
    };
    MenusContributionPointHandler.prototype.onDidRegisterCommand = function (id, cb) {
        var _this = this;
        var command = this.commands.getCommand(id);
        if (command) {
            cb(command);
            return core_1.Disposable.NULL;
        }
        var toDispose = new core_1.DisposableCollection();
        // Registering a menu action requires the related command to be already registered.
        // But Theia plugin registers the commands dynamically via the Commands API.
        // Let's wait for ~2 sec. It should be enough to finish registering all the contributed commands.
        // FIXME: remove this workaround (timer) once the https://github.com/theia-ide/theia/issues/3344 is fixed
        var handle = setTimeout(function () { return toDispose.push(_this.onDidRegisterCommand(id, cb)); }, 2000);
        toDispose.push(core_1.Disposable.create(function () { return clearTimeout(handle); }));
        return toDispose;
    };
    var MenusContributionPointHandler_1;
    __decorate([
        inversify_1.inject(common_1.MenuModelRegistry),
        __metadata("design:type", common_1.MenuModelRegistry)
    ], MenusContributionPointHandler.prototype, "menuRegistry", void 0);
    __decorate([
        inversify_1.inject(core_1.CommandRegistry),
        __metadata("design:type", core_1.CommandRegistry)
    ], MenusContributionPointHandler.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], MenusContributionPointHandler.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(scm_service_1.ScmService),
        __metadata("design:type", scm_service_1.ScmService)
    ], MenusContributionPointHandler.prototype, "scmService", void 0);
    __decorate([
        inversify_1.inject(quick_command_service_1.QuickCommandService),
        __metadata("design:type", quick_command_service_1.QuickCommandService)
    ], MenusContributionPointHandler.prototype, "quickCommandService", void 0);
    __decorate([
        inversify_1.inject(tab_bar_toolbar_1.TabBarToolbarRegistry),
        __metadata("design:type", tab_bar_toolbar_1.TabBarToolbarRegistry)
    ], MenusContributionPointHandler.prototype, "tabBarToolbar", void 0);
    __decorate([
        inversify_1.inject(core_1.SelectionService),
        __metadata("design:type", core_1.SelectionService)
    ], MenusContributionPointHandler.prototype, "selectionService", void 0);
    __decorate([
        inversify_1.inject(resource_context_key_1.ResourceContextKey),
        __metadata("design:type", resource_context_key_1.ResourceContextKey)
    ], MenusContributionPointHandler.prototype, "resourceContextKey", void 0);
    __decorate([
        inversify_1.inject(view_context_key_service_1.ViewContextKeyService),
        __metadata("design:type", view_context_key_service_1.ViewContextKeyService)
    ], MenusContributionPointHandler.prototype, "viewContextKeys", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], MenusContributionPointHandler.prototype, "contextKeyService", void 0);
    MenusContributionPointHandler = MenusContributionPointHandler_1 = __decorate([
        inversify_1.injectable()
    ], MenusContributionPointHandler);
    return MenusContributionPointHandler;
}());
exports.MenusContributionPointHandler = MenusContributionPointHandler;
//# sourceMappingURL=menus-contribution-handler.js.map