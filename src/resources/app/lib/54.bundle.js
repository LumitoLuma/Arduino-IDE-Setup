(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[54],{

/***/ "./node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution.js ***!
  \**********************************************************************************************************/
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
exports.SearchInWorkspaceFrontendContribution = exports.SearchInWorkspaceCommands = void 0;
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var search_in_workspace_widget_1 = __webpack_require__(/*! ./search-in-workspace-widget */ "./node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-widget.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var navigator_contribution_1 = __webpack_require__(/*! @theia/navigator/lib/browser/navigator-contribution */ "./node_modules/@theia/navigator/lib/browser/navigator-contribution.js");
var uri_command_handler_1 = __webpack_require__(/*! @theia/core/lib/common/uri-command-handler */ "./node_modules/@theia/core/lib/common/uri-command-handler.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var browser_2 = __webpack_require__(/*! @theia/workspace/lib/browser */ "./node_modules/@theia/workspace/lib/browser/index.js");
var common_1 = __webpack_require__(/*! @theia/filesystem/lib/common */ "./node_modules/@theia/filesystem/lib/common/index.js");
var search_in_workspace_context_key_service_1 = __webpack_require__(/*! ./search-in-workspace-context-key-service */ "./node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-context-key-service.js");
var editor_manager_1 = __webpack_require__(/*! @theia/editor/lib/browser/editor-manager */ "./node_modules/@theia/editor/lib/browser/editor-manager.js");
var vscode_languageserver_types_1 = __webpack_require__(/*! vscode-languageserver-types */ "./node_modules/vscode-languageserver-types/lib/esm/main.js");
var SearchInWorkspaceCommands;
(function (SearchInWorkspaceCommands) {
    var SEARCH_CATEGORY = 'Search';
    SearchInWorkspaceCommands.TOGGLE_SIW_WIDGET = {
        id: 'search-in-workspace.toggle'
    };
    SearchInWorkspaceCommands.OPEN_SIW_WIDGET = {
        id: 'search-in-workspace.open',
        category: SEARCH_CATEGORY,
        label: 'Find in Files'
    };
    SearchInWorkspaceCommands.FIND_IN_FOLDER = {
        id: 'search-in-workspace.in-folder',
        category: SEARCH_CATEGORY,
        label: 'Find in Folder'
    };
    SearchInWorkspaceCommands.REFRESH_RESULTS = {
        id: 'search-in-workspace.refresh',
        category: SEARCH_CATEGORY,
        label: 'Refresh',
        iconClass: 'refresh'
    };
    SearchInWorkspaceCommands.CANCEL_SEARCH = {
        id: 'search-in-workspace.cancel',
        category: SEARCH_CATEGORY,
        label: 'Cancel Search',
        iconClass: 'cancel'
    };
    SearchInWorkspaceCommands.COLLAPSE_ALL = {
        id: 'search-in-workspace.collapse-all',
        category: SEARCH_CATEGORY,
        label: 'Collapse All',
        iconClass: 'theia-collapse-all-icon'
    };
    SearchInWorkspaceCommands.CLEAR_ALL = {
        id: 'search-in-workspace.clear-all',
        category: SEARCH_CATEGORY,
        label: 'Clear Search Results',
        iconClass: 'clear-all'
    };
})(SearchInWorkspaceCommands = exports.SearchInWorkspaceCommands || (exports.SearchInWorkspaceCommands = {}));
var SearchInWorkspaceFrontendContribution = /** @class */ (function (_super) {
    __extends(SearchInWorkspaceFrontendContribution, _super);
    function SearchInWorkspaceFrontendContribution() {
        return _super.call(this, {
            widgetId: search_in_workspace_widget_1.SearchInWorkspaceWidget.ID,
            widgetName: search_in_workspace_widget_1.SearchInWorkspaceWidget.LABEL,
            defaultWidgetOptions: {
                area: 'left',
                rank: 200
            },
            toggleCommandId: SearchInWorkspaceCommands.TOGGLE_SIW_WIDGET.id
        }) || this;
    }
    SearchInWorkspaceFrontendContribution.prototype.init = function () {
        var _this = this;
        var updateFocusContextKey = function () {
            return _this.contextKeyService.searchViewletFocus.set(_this.shell.activeWidget instanceof search_in_workspace_widget_1.SearchInWorkspaceWidget);
        };
        updateFocusContextKey();
        this.shell.activeChanged.connect(updateFocusContextKey);
    };
    SearchInWorkspaceFrontendContribution.prototype.initializeLayout = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openView({ activate: false })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchInWorkspaceFrontendContribution.prototype.registerCommands = function (commands) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                _super.prototype.registerCommands.call(this, commands);
                commands.registerCommand(SearchInWorkspaceCommands.OPEN_SIW_WIDGET, {
                    isEnabled: function () { return _this.workspaceService.tryGetRoots().length > 0; },
                    execute: function () { return __awaiter(_this, void 0, void 0, function () {
                        var widget;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.openView({ activate: true })];
                                case 1:
                                    widget = _a.sent();
                                    widget.updateSearchTerm(this.getSearchTerm());
                                    return [2 /*return*/];
                            }
                        });
                    }); }
                });
                commands.registerCommand(SearchInWorkspaceCommands.FIND_IN_FOLDER, this.newMultiUriAwareCommandHandler({
                    execute: function (uris) { return __awaiter(_this, void 0, void 0, function () {
                        var resources, widget;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    resources = [];
                                    return [4 /*yield*/, Promise.all(uris.map(function (uri) {
                                            return _this.fileSystem.getFileStat(uri.toString());
                                        })).then(function (stats) {
                                            var e_1, _a;
                                            try {
                                                for (var stats_1 = __values(stats), stats_1_1 = stats_1.next(); !stats_1_1.done; stats_1_1 = stats_1.next()) {
                                                    var stat = stats_1_1.value;
                                                    if (stat) {
                                                        var uri = new uri_1.default(stat.uri);
                                                        var uriStr = _this.labelProvider.getLongName(uri);
                                                        if (stat && !stat.isDirectory) {
                                                            uriStr = _this.labelProvider.getLongName(uri.parent);
                                                        }
                                                        resources.push(uriStr);
                                                    }
                                                }
                                            }
                                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                            finally {
                                                try {
                                                    if (stats_1_1 && !stats_1_1.done && (_a = stats_1.return)) _a.call(stats_1);
                                                }
                                                finally { if (e_1) throw e_1.error; }
                                            }
                                        })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, this.openView({ activate: true })];
                                case 2:
                                    widget = _a.sent();
                                    widget.findInFolder(resources);
                                    return [2 /*return*/];
                            }
                        });
                    }); }
                }));
                commands.registerCommand(SearchInWorkspaceCommands.CANCEL_SEARCH, {
                    execute: function (w) { return _this.withWidget(w, function (widget) { return widget.getCancelIndicator() && widget.getCancelIndicator().cancel(); }); },
                    isEnabled: function (w) { return _this.withWidget(w, function (widget) { return widget.getCancelIndicator() !== undefined; }); },
                    isVisible: function (w) { return _this.withWidget(w, function (widget) { return widget.getCancelIndicator() !== undefined; }); }
                });
                commands.registerCommand(SearchInWorkspaceCommands.REFRESH_RESULTS, {
                    execute: function (w) { return _this.withWidget(w, function (widget) { return widget.refresh(); }); },
                    isEnabled: function (w) { return _this.withWidget(w, function (widget) { return (widget.hasResultList() || widget.hasSearchTerm()) && _this.workspaceService.tryGetRoots().length > 0; }); },
                    isVisible: function (w) { return _this.withWidget(w, function () { return true; }); }
                });
                commands.registerCommand(SearchInWorkspaceCommands.COLLAPSE_ALL, {
                    execute: function (w) { return _this.withWidget(w, function (widget) { return widget.collapseAll(); }); },
                    isEnabled: function (w) { return _this.withWidget(w, function (widget) { return widget.hasResultList(); }); },
                    isVisible: function (w) { return _this.withWidget(w, function () { return true; }); }
                });
                commands.registerCommand(SearchInWorkspaceCommands.CLEAR_ALL, {
                    execute: function (w) { return _this.withWidget(w, function (widget) { return widget.clear(); }); },
                    isEnabled: function (w) { return _this.withWidget(w, function (widget) { return widget.hasResultList(); }); },
                    isVisible: function (w) { return _this.withWidget(w, function () { return true; }); }
                });
                return [2 /*return*/];
            });
        });
    };
    SearchInWorkspaceFrontendContribution.prototype.withWidget = function (widget, fn) {
        if (widget === void 0) { widget = this.tryGetWidget(); }
        if (widget instanceof search_in_workspace_widget_1.SearchInWorkspaceWidget && widget.id === search_in_workspace_widget_1.SearchInWorkspaceWidget.ID) {
            return fn(widget);
        }
        return false;
    };
    /**
     * Get the search term based on current editor selection.
     * @returns the selection if available.
     */
    SearchInWorkspaceFrontendContribution.prototype.getSearchTerm = function () {
        if (!this.editorManager.currentEditor) {
            return '';
        }
        // Get the current editor selection.
        var selection = this.editorManager.currentEditor.editor.selection;
        // Compute the selection range.
        var selectedRange = vscode_languageserver_types_1.Range.create(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
        // Return the selection text if available, else return empty.
        return this.editorManager.currentEditor
            ? this.editorManager.currentEditor.editor.document.getText(selectedRange)
            : '';
    };
    SearchInWorkspaceFrontendContribution.prototype.registerKeybindings = function (keybindings) {
        _super.prototype.registerKeybindings.call(this, keybindings);
        keybindings.registerKeybinding({
            command: SearchInWorkspaceCommands.OPEN_SIW_WIDGET.id,
            keybinding: 'ctrlcmd+shift+f'
        });
    };
    SearchInWorkspaceFrontendContribution.prototype.registerMenus = function (menus) {
        _super.prototype.registerMenus.call(this, menus);
        menus.registerMenuAction(navigator_contribution_1.NavigatorContextMenu.SEARCH, {
            commandId: SearchInWorkspaceCommands.FIND_IN_FOLDER.id
        });
        menus.registerMenuAction(browser_1.CommonMenus.EDIT_FIND, {
            commandId: SearchInWorkspaceCommands.OPEN_SIW_WIDGET.id
        });
    };
    SearchInWorkspaceFrontendContribution.prototype.registerToolbarItems = function (toolbarRegistry) {
        return __awaiter(this, void 0, void 0, function () {
            var widget, onDidChange;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.widget];
                    case 1:
                        widget = _a.sent();
                        onDidChange = widget.onDidUpdate;
                        toolbarRegistry.registerItem({
                            id: SearchInWorkspaceCommands.CANCEL_SEARCH.id,
                            command: SearchInWorkspaceCommands.CANCEL_SEARCH.id,
                            tooltip: SearchInWorkspaceCommands.CANCEL_SEARCH.label,
                            priority: 0,
                            onDidChange: onDidChange
                        });
                        toolbarRegistry.registerItem({
                            id: SearchInWorkspaceCommands.REFRESH_RESULTS.id,
                            command: SearchInWorkspaceCommands.REFRESH_RESULTS.id,
                            tooltip: SearchInWorkspaceCommands.REFRESH_RESULTS.label,
                            priority: 1,
                            onDidChange: onDidChange
                        });
                        toolbarRegistry.registerItem({
                            id: SearchInWorkspaceCommands.CLEAR_ALL.id,
                            command: SearchInWorkspaceCommands.CLEAR_ALL.id,
                            tooltip: SearchInWorkspaceCommands.CLEAR_ALL.label,
                            priority: 2,
                            onDidChange: onDidChange
                        });
                        toolbarRegistry.registerItem({
                            id: SearchInWorkspaceCommands.COLLAPSE_ALL.id,
                            command: SearchInWorkspaceCommands.COLLAPSE_ALL.id,
                            tooltip: SearchInWorkspaceCommands.COLLAPSE_ALL.label,
                            priority: 3,
                            onDidChange: onDidChange
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchInWorkspaceFrontendContribution.prototype.newUriAwareCommandHandler = function (handler) {
        return new uri_command_handler_1.UriAwareCommandHandler(this.selectionService, handler);
    };
    SearchInWorkspaceFrontendContribution.prototype.newMultiUriAwareCommandHandler = function (handler) {
        return new uri_command_handler_1.UriAwareCommandHandler(this.selectionService, handler, { multi: true });
    };
    __decorate([
        inversify_1.inject(core_1.SelectionService),
        __metadata("design:type", core_1.SelectionService)
    ], SearchInWorkspaceFrontendContribution.prototype, "selectionService", void 0);
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], SearchInWorkspaceFrontendContribution.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(browser_2.WorkspaceService),
        __metadata("design:type", browser_2.WorkspaceService)
    ], SearchInWorkspaceFrontendContribution.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(common_1.FileSystem),
        __metadata("design:type", Object)
    ], SearchInWorkspaceFrontendContribution.prototype, "fileSystem", void 0);
    __decorate([
        inversify_1.inject(editor_manager_1.EditorManager),
        __metadata("design:type", editor_manager_1.EditorManager)
    ], SearchInWorkspaceFrontendContribution.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(search_in_workspace_context_key_service_1.SearchInWorkspaceContextKeyService),
        __metadata("design:type", search_in_workspace_context_key_service_1.SearchInWorkspaceContextKeyService)
    ], SearchInWorkspaceFrontendContribution.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SearchInWorkspaceFrontendContribution.prototype, "init", null);
    SearchInWorkspaceFrontendContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], SearchInWorkspaceFrontendContribution);
    return SearchInWorkspaceFrontendContribution;
}(browser_1.AbstractViewContribution));
exports.SearchInWorkspaceFrontendContribution = SearchInWorkspaceFrontendContribution;


/***/ })

}]);
//# sourceMappingURL=54.bundle.js.map