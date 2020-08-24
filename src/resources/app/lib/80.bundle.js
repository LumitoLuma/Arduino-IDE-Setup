(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[80],{

/***/ "./node_modules/@theia/plugin-ext-vscode/lib/browser/plugin-vscode-commands-contribution.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext-vscode/lib/browser/plugin-vscode-commands-contribution.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
exports.PluginVscodeCommandsContribution = exports.VscodeCommands = void 0;
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var context_key_service_1 = __webpack_require__(/*! @theia/core/lib/browser/context-key-service */ "./node_modules/@theia/core/lib/browser/context-key-service.js");
var application_shell_mouse_tracker_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/application-shell-mouse-tracker */ "./node_modules/@theia/core/lib/browser/shell/application-shell-mouse-tracker.js");
var command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "./node_modules/@theia/core/lib/common/command.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var browser_2 = __webpack_require__(/*! @theia/editor/lib/browser */ "./node_modules/@theia/editor/lib/browser/index.js");
var menus_contribution_handler_1 = __webpack_require__(/*! @theia/plugin-ext/lib/main/browser/menus/menus-contribution-handler */ "./node_modules/@theia/plugin-ext/lib/main/browser/menus/menus-contribution-handler.js");
var documents_main_1 = __webpack_require__(/*! @theia/plugin-ext/lib/main/browser/documents-main */ "./node_modules/@theia/plugin-ext/lib/main/browser/documents-main.js");
var untitled_resource_1 = __webpack_require__(/*! @theia/plugin-ext/lib/main/browser/editor/untitled-resource */ "./node_modules/@theia/plugin-ext/lib/main/browser/editor/untitled-resource.js");
var type_converters_1 = __webpack_require__(/*! @theia/plugin-ext/lib/plugin/type-converters */ "./node_modules/@theia/plugin-ext/lib/plugin/type-converters.js");
var browser_3 = __webpack_require__(/*! @theia/workspace/lib/browser */ "./node_modules/@theia/workspace/lib/browser/index.js");
var workspace_service_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-service */ "./node_modules/@theia/workspace/lib/browser/workspace-service.js");
var diff_service_1 = __webpack_require__(/*! @theia/workspace/lib/browser/diff-service */ "./node_modules/@theia/workspace/lib/browser/diff-service.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var vscode_uri_1 = __webpack_require__(/*! vscode-uri */ "./node_modules/vscode-uri/lib/esm/index.js");
var monaco_editor_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-editor */ "./node_modules/@theia/monaco/lib/browser/monaco-editor.js");
var terminal_frontend_contribution_1 = __webpack_require__(/*! @theia/terminal/lib/browser/terminal-frontend-contribution */ "./node_modules/@theia/terminal/lib/browser/terminal-frontend-contribution.js");
var quick_open_workspace_1 = __webpack_require__(/*! @theia/workspace/lib/browser/quick-open-workspace */ "./node_modules/@theia/workspace/lib/browser/quick-open-workspace.js");
var terminal_service_1 = __webpack_require__(/*! @theia/terminal/lib/browser/base/terminal-service */ "./node_modules/@theia/terminal/lib/browser/base/terminal-service.js");
var navigator_contribution_1 = __webpack_require__(/*! @theia/navigator/lib/browser/navigator-contribution */ "./node_modules/@theia/navigator/lib/browser/navigator-contribution.js");
var VscodeCommands;
(function (VscodeCommands) {
    VscodeCommands.OPEN = {
        id: 'vscode.open'
    };
    VscodeCommands.OPEN_FOLDER = {
        id: 'vscode.openFolder'
    };
    VscodeCommands.DIFF = {
        id: 'vscode.diff'
    };
})(VscodeCommands = exports.VscodeCommands || (exports.VscodeCommands = {}));
var PluginVscodeCommandsContribution = /** @class */ (function () {
    function PluginVscodeCommandsContribution() {
    }
    PluginVscodeCommandsContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(VscodeCommands.OPEN, {
            isVisible: function () { return false; },
            execute: function (resource, columnOrOptions) { return __awaiter(_this, void 0, void 0, function () {
                var options, editorOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!resource) {
                                throw new Error(VscodeCommands.OPEN.id + " command requires at least URI argument.");
                            }
                            if (!vscode_uri_1.URI.isUri(resource)) {
                                throw new Error("Invalid argument for " + VscodeCommands.OPEN.id + " command with URI argument. Found " + resource);
                            }
                            if (typeof columnOrOptions === 'number') {
                                options = {
                                    viewColumn: columnOrOptions
                                };
                            }
                            else if (columnOrOptions) {
                                options = __assign({}, columnOrOptions);
                            }
                            editorOptions = documents_main_1.DocumentsMainImpl.toEditorOpenerOptions(this.shell, options);
                            return [4 /*yield*/, browser_1.open(this.openerService, new uri_1.default(resource), editorOptions)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }
        });
        commands.registerCommand(VscodeCommands.OPEN_FOLDER, {
            isVisible: function () { return false; },
            execute: function (resource, arg) {
                if (arg === void 0) { arg = {}; }
                return __awaiter(_this, void 0, void 0, function () {
                    var options;
                    return __generator(this, function (_a) {
                        if (!resource) {
                            return [2 /*return*/, commands.executeCommand(browser_3.WorkspaceCommands.OPEN_WORKSPACE.id)];
                        }
                        if (!vscode_uri_1.URI.isUri(resource)) {
                            throw new Error("Invalid argument for " + VscodeCommands.OPEN_FOLDER.id + " command with URI argument. Found " + resource);
                        }
                        if (typeof arg === 'boolean') {
                            options = { preserveWindow: !arg };
                        }
                        else {
                            options = { preserveWindow: !arg.forceNewWindow };
                        }
                        this.workspaceService.open(new uri_1.default(resource), options);
                        return [2 /*return*/];
                    });
                });
            }
        });
        commands.registerCommand(VscodeCommands.DIFF, {
            isVisible: function () { return false; },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            execute: function (left, right, label, options) { return __awaiter(_this, void 0, void 0, function () {
                var leftURI, editorOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!left || !right) {
                                throw new Error(VscodeCommands.DIFF + " command requires at least two URI arguments. Found left=" + left + ", right=" + right + " as arguments");
                            }
                            if (!vscode_uri_1.URI.isUri(left)) {
                                throw new Error("Invalid argument for " + VscodeCommands.DIFF.id + " command with left argument. Expecting URI left type but found " + left);
                            }
                            if (!vscode_uri_1.URI.isUri(right)) {
                                throw new Error("Invalid argument for " + VscodeCommands.DIFF.id + " command with right argument. Expecting URI right type but found " + right);
                            }
                            leftURI = new uri_1.default(left);
                            editorOptions = documents_main_1.DocumentsMainImpl.toEditorOpenerOptions(this.shell, options);
                            return [4 /*yield*/, this.diffService.openDiffEditor(leftURI, new uri_1.default(right), label, editorOptions)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }
        });
        // https://code.visualstudio.com/docs/getstarted/keybindings#_navigation
        /*
         * internally, in VS Code, any widget opened in the main area is represented as an editor
         * operations below apply to them, but not to side-bar widgets, like the explorer
         *
         * in Theia, there are not such difference and any widget can be put in any area
         * because of it we filter out editors from views based on `NavigatableWidget.is`
         * and apply actions only to them
         */
        commands.registerCommand({ id: 'workbench.action.files.newUntitledFile' }, {
            execute: function () { return browser_1.open(_this.openerService, untitled_resource_1.createUntitledURI()); }
        });
        commands.registerCommand({ id: 'workbench.action.files.openFile' }, {
            execute: function () { return commands.executeCommand(browser_3.WorkspaceCommands.OPEN_FILE.id); }
        });
        commands.registerCommand({ id: 'workbench.action.files.openFolder' }, {
            execute: function () { return commands.executeCommand(browser_3.WorkspaceCommands.OPEN_FOLDER.id); }
        });
        commands.registerCommand({ id: 'workbench.action.addRootFolder' }, {
            execute: function () { return commands.executeCommand(browser_3.WorkspaceCommands.ADD_FOLDER.id); }
        });
        commands.registerCommand({ id: 'workbench.action.gotoLine' }, {
            execute: function () { return commands.executeCommand('editor.action.gotoLine'); }
        });
        commands.registerCommand({ id: 'workbench.action.quickOpen' }, {
            execute: function () { return _this.quickOpen.open(''); }
        });
        commands.registerCommand({ id: 'workbench.action.openSettings' }, {
            execute: function () { return commands.executeCommand(browser_1.CommonCommands.OPEN_PREFERENCES.id); }
        });
        commands.registerCommand({ id: 'workbench.action.files.save', }, {
            execute: function (uri) {
                if (uri) {
                    var uriString_1 = uri.toString();
                    var widget = _this.shell.widgets.find(function (w) {
                        var resourceUri = browser_1.Saveable.is(w) && browser_1.NavigatableWidget.is(w) && w.getResourceUri();
                        return (resourceUri && resourceUri.toString()) === uriString_1;
                    });
                    if (browser_1.Saveable.is(widget)) {
                        browser_1.Saveable.save(widget);
                    }
                }
                else {
                    _this.shell.save();
                }
            }
        });
        commands.registerCommand({ id: 'workbench.action.files.saveAll', }, {
            execute: function () { return _this.shell.saveAll(); }
        });
        commands.registerCommand({ id: 'workbench.action.closeActiveEditor' }, {
            execute: function (uri) { return __awaiter(_this, void 0, void 0, function () {
                var widget, uriString_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            widget = this.editorManager.currentEditor || this.shell.currentWidget;
                            if (uri) {
                                uriString_2 = uri.toString();
                                widget = this.shell.widgets.find(function (w) {
                                    var resourceUri = browser_1.NavigatableWidget.is(w) && w.getResourceUri();
                                    return (resourceUri && resourceUri.toString()) === uriString_2;
                                });
                            }
                            if (!menus_contribution_handler_1.CodeEditorWidget.is(widget)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.shell.closeWidget(widget.id)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }
        });
        commands.registerCommand({ id: 'workbench.action.closeOtherEditors' }, {
            execute: function (uri) { return __awaiter(_this, void 0, void 0, function () {
                var editor, uriString_3, _a, _b, widget, e_1_1;
                var e_1, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            editor = this.editorManager.currentEditor || this.shell.currentWidget;
                            if (uri) {
                                uriString_3 = uri.toString();
                                editor = this.editorManager.all.find(function (e) {
                                    var resourceUri = e.getResourceUri();
                                    return (resourceUri && resourceUri.toString()) === uriString_3;
                                });
                            }
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 6, 7, 8]);
                            _a = __values(this.shell.widgets), _b = _a.next();
                            _d.label = 2;
                        case 2:
                            if (!!_b.done) return [3 /*break*/, 5];
                            widget = _b.value;
                            if (!(menus_contribution_handler_1.CodeEditorWidget.is(widget) && widget !== editor)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.shell.closeWidget(widget.id)];
                        case 3:
                            _d.sent();
                            _d.label = 4;
                        case 4:
                            _b = _a.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            }); }
        });
        commands.registerCommand({ id: 'workbench.action.closeEditorsInGroup' }, {
            execute: function (uri) {
                var editor = _this.editorManager.currentEditor || _this.shell.currentWidget;
                if (uri) {
                    var uriString_4 = uri.toString();
                    editor = _this.editorManager.all.find(function (e) {
                        var resourceUri = e.getResourceUri();
                        return (resourceUri && resourceUri.toString()) === uriString_4;
                    });
                }
                if (editor) {
                    var tabBar = _this.shell.getTabBarFor(editor);
                    if (tabBar) {
                        _this.shell.closeTabs(tabBar, function (_a) {
                            var owner = _a.owner;
                            return menus_contribution_handler_1.CodeEditorWidget.is(owner);
                        });
                    }
                }
            }
        });
        commands.registerCommand({ id: 'workbench.action.closeEditorsInOtherGroups' }, {
            execute: function () {
                var e_2, _a;
                var editor = _this.editorManager.currentEditor || _this.shell.currentWidget;
                if (editor) {
                    var editorTabBar = _this.shell.getTabBarFor(editor);
                    try {
                        for (var _b = __values(_this.shell.allTabBars), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var tabBar = _c.value;
                            if (tabBar !== editorTabBar) {
                                _this.shell.closeTabs(tabBar, function (_a) {
                                    var owner = _a.owner;
                                    return menus_contribution_handler_1.CodeEditorWidget.is(owner);
                                });
                            }
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
            }
        });
        commands.registerCommand({ id: 'workbench.action.closeEditorsToTheLeft' }, {
            execute: function () {
                var editor = _this.editorManager.currentEditor || _this.shell.currentWidget;
                if (editor) {
                    var tabBar = _this.shell.getTabBarFor(editor);
                    if (tabBar) {
                        var left_1 = true;
                        _this.shell.closeTabs(tabBar, function (_a) {
                            var owner = _a.owner;
                            if (owner === editor) {
                                left_1 = false;
                                return false;
                            }
                            return left_1 && menus_contribution_handler_1.CodeEditorWidget.is(owner);
                        });
                    }
                }
            }
        });
        commands.registerCommand({ id: 'workbench.action.closeEditorsToTheRight' }, {
            execute: function () {
                var editor = _this.editorManager.currentEditor || _this.shell.currentWidget;
                if (editor) {
                    var tabBar = _this.shell.getTabBarFor(editor);
                    if (tabBar) {
                        var left_2 = true;
                        _this.shell.closeTabs(tabBar, function (_a) {
                            var owner = _a.owner;
                            if (owner === editor) {
                                left_2 = false;
                                return false;
                            }
                            return !left_2 && menus_contribution_handler_1.CodeEditorWidget.is(owner);
                        });
                    }
                }
            }
        });
        commands.registerCommand({ id: 'workbench.action.closeAllEditors' }, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var promises, _a, _b, widget;
                var e_3, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            promises = [];
                            try {
                                for (_a = __values(this.shell.widgets), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    widget = _b.value;
                                    if (menus_contribution_handler_1.CodeEditorWidget.is(widget)) {
                                        promises.push(this.shell.closeWidget(widget.id));
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            return [4 /*yield*/, Promise.all(promises)];
                        case 1:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            }); }
        });
        commands.registerCommand({ id: 'workbench.action.nextEditor' }, {
            execute: function () { return _this.shell.activateNextTab(); }
        });
        commands.registerCommand({ id: 'workbench.action.previousEditor' }, {
            execute: function () { return _this.shell.activatePreviousTab(); }
        });
        commands.registerCommand({ id: 'openInTerminal' }, {
            execute: function (resource) { return _this.terminalContribution.openInTerminal(new uri_1.default(resource.toString())); }
        });
        commands.registerCommand({ id: 'workbench.action.reloadWindow' }, {
            execute: function () {
                window.location.reload();
            }
        });
        commands.registerCommand({ id: 'workbench.action.revertAndCloseActiveEditor' }, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var editor, monacoEditor, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            editor = this.editorManager.currentEditor;
                            if (!editor) return [3 /*break*/, 5];
                            monacoEditor = monaco_editor_1.MonacoEditor.getCurrent(this.editorManager);
                            if (!monacoEditor) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 5]);
                            return [4 /*yield*/, monacoEditor.document.revert()];
                        case 2:
                            _a.sent();
                            editor.close();
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            return [4 /*yield*/, this.shell.closeWidget(editor.id, { save: false })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); }
        });
        /**
         * TODO:
         * Keep Open	workbench.action.keepEditor
         * Open Next	workbench.action.openNextRecentlyUsedEditorInGroup
         * Open Previous	workbench.action.openPreviousRecentlyUsedEditorInGroup
         * Copy Path of Active File	workbench.action.files.copyPathOfActiveFile
         * Reveal Active File in Windows	workbench.action.files.revealActiveFileInWindows
         * Show Opened File in New Window	workbench.action.files.showOpenedFileInNewWindow
         * Compare Opened File With	workbench.files.action.compareFileWith
         */
        // Register built-in language service commands
        // see https://code.visualstudio.com/api/references/commands
        /* eslint-disable @typescript-eslint/no-explicit-any */
        // TODO register other `vscode.execute...` commands.
        // see https://github.com/microsoft/vscode/blob/master/src/vs/workbench/api/common/extHostApiCommands.ts
        commands.registerCommand({
            id: 'vscode.executeDefinitionProvider'
        }, {
            execute: (function (resource, position) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    position: position
                };
                return commands.executeCommand('_executeDefinitionProvider', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeDeclarationProvider'
        }, {
            execute: (function (resource, position) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    position: position
                };
                return commands.executeCommand('_executeDeclarationProvider', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeTypeDefinitionProvider'
        }, {
            execute: (function (resource, position) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    position: position
                };
                return commands.executeCommand('_executeTypeDefinitionProvider', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeImplementationProvider'
        }, {
            execute: (function (resource, position) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    position: position
                };
                return commands.executeCommand('_executeImplementationProvider', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeHoverProvider'
        }, {
            execute: (function (resource, position) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    position: position
                };
                return commands.executeCommand('_executeHoverProvider', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeDocumentHighlights'
        }, {
            execute: (function (resource, position) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    position: position
                };
                return commands.executeCommand('_executeDocumentHighlights', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeReferenceProvider'
        }, {
            execute: (function (resource, position) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    position: position
                };
                return commands.executeCommand('_executeReferenceProvider', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeDocumentSymbolProvider'
        }, {
            execute: function (resource) { return commands.executeCommand('_executeDocumentSymbolProvider', { resource: monaco.Uri.parse(resource.toString()) }).then(function (value) {
                if (!Array.isArray(value) || value === undefined) {
                    return undefined;
                }
                return value.map(function (loc) { return type_converters_1.toDocumentSymbol(loc); });
            }); }
        });
        commands.registerCommand({
            id: 'vscode.executeFormatDocumentProvider'
        }, {
            execute: (function (resource, options) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    options: options
                };
                return commands.executeCommand('_executeFormatDocumentProvider', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeFormatRangeProvider'
        }, {
            execute: (function (resource, range, options) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    range: range,
                    options: options
                };
                return commands.executeCommand('_executeFormatRangeProvider', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.executeFormatOnTypeProvider'
        }, {
            execute: (function (resource, position, ch, options) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    position: position,
                    ch: ch,
                    options: options
                };
                return commands.executeCommand('_executeFormatOnTypeProvider', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.prepareCallHierarchy'
        }, {
            execute: (function (resource, position) {
                var args = {
                    resource: monaco.Uri.from(resource),
                    position: position
                };
                return commands.executeCommand('_executePrepareCallHierarchy', args);
            })
        });
        commands.registerCommand({
            id: 'vscode.provideIncomingCalls'
        }, {
            execute: (function (item) {
                return commands.executeCommand('_executeProvideIncomingCalls', { item: item });
            })
        });
        commands.registerCommand({
            id: 'vscode.provideOutgoingCalls'
        }, {
            execute: (function (item) {
                return commands.executeCommand('_executeProvideOutgoingCalls', { item: item });
            })
        });
        commands.registerCommand({
            id: 'workbench.action.openRecent'
        }, {
            execute: function () { return _this.quickOpenWorkspace.select(); }
        });
        commands.registerCommand({
            id: 'explorer.newFolder'
        }, {
            execute: function () { return commands.executeCommand(browser_3.WorkspaceCommands.NEW_FOLDER.id); }
        });
        commands.registerCommand({
            id: 'workbench.action.terminal.sendSequence'
        }, {
            execute: function (args) {
                if (args === undefined || args.text === undefined) {
                    return;
                }
                var currentTerminal = _this.terminalService.currentTerminal;
                if (currentTerminal === undefined) {
                    return;
                }
                currentTerminal.sendText(args.text);
            }
        });
        commands.registerCommand({
            id: 'workbench.action.terminal.kill'
        }, {
            execute: function () {
                var currentTerminal = _this.terminalService.currentTerminal;
                if (currentTerminal === undefined) {
                    return;
                }
                currentTerminal.dispose();
            }
        });
        commands.registerCommand({
            id: 'workbench.view.explorer'
        }, {
            execute: function () { return commands.executeCommand(navigator_contribution_1.FileNavigatorCommands.FOCUS.id); }
        });
        commands.registerCommand({
            id: 'copyFilePath'
        }, {
            execute: function () { return commands.executeCommand(browser_1.CommonCommands.COPY_PATH.id); }
        });
        commands.registerCommand({
            id: 'copyRelativeFilePath'
        }, {
            execute: function () { return commands.executeCommand(navigator_contribution_1.FileNavigatorCommands.COPY_RELATIVE_FILE_PATH.id); }
        });
    };
    __decorate([
        inversify_1.inject(command_1.CommandService),
        __metadata("design:type", Object)
    ], PluginVscodeCommandsContribution.prototype, "commandService", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], PluginVscodeCommandsContribution.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.inject(browser_2.EditorManager),
        __metadata("design:type", browser_2.EditorManager)
    ], PluginVscodeCommandsContribution.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], PluginVscodeCommandsContribution.prototype, "shell", void 0);
    __decorate([
        inversify_1.inject(diff_service_1.DiffService),
        __metadata("design:type", diff_service_1.DiffService)
    ], PluginVscodeCommandsContribution.prototype, "diffService", void 0);
    __decorate([
        inversify_1.inject(browser_1.OpenerService),
        __metadata("design:type", Object)
    ], PluginVscodeCommandsContribution.prototype, "openerService", void 0);
    __decorate([
        inversify_1.inject(application_shell_mouse_tracker_1.ApplicationShellMouseTracker),
        __metadata("design:type", application_shell_mouse_tracker_1.ApplicationShellMouseTracker)
    ], PluginVscodeCommandsContribution.prototype, "mouseTracker", void 0);
    __decorate([
        inversify_1.inject(browser_1.PrefixQuickOpenService),
        __metadata("design:type", browser_1.PrefixQuickOpenService)
    ], PluginVscodeCommandsContribution.prototype, "quickOpen", void 0);
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], PluginVscodeCommandsContribution.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(terminal_frontend_contribution_1.TerminalFrontendContribution),
        __metadata("design:type", terminal_frontend_contribution_1.TerminalFrontendContribution)
    ], PluginVscodeCommandsContribution.prototype, "terminalContribution", void 0);
    __decorate([
        inversify_1.inject(quick_open_workspace_1.QuickOpenWorkspace),
        __metadata("design:type", quick_open_workspace_1.QuickOpenWorkspace)
    ], PluginVscodeCommandsContribution.prototype, "quickOpenWorkspace", void 0);
    __decorate([
        inversify_1.inject(terminal_service_1.TerminalService),
        __metadata("design:type", Object)
    ], PluginVscodeCommandsContribution.prototype, "terminalService", void 0);
    PluginVscodeCommandsContribution = __decorate([
        inversify_1.injectable()
    ], PluginVscodeCommandsContribution);
    return PluginVscodeCommandsContribution;
}());
exports.PluginVscodeCommandsContribution = PluginVscodeCommandsContribution;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext-vscode/lib/browser/plugin-vscode-frontend-module.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext-vscode/lib/browser/plugin-vscode-frontend-module.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var plugin_vscode_commands_contribution_1 = __webpack_require__(/*! ./plugin-vscode-commands-contribution */ "./node_modules/@theia/plugin-ext-vscode/lib/browser/plugin-vscode-commands-contribution.js");
var plugin_vscode_environment_1 = __webpack_require__(/*! ../common/plugin-vscode-environment */ "./node_modules/@theia/plugin-ext-vscode/lib/common/plugin-vscode-environment.js");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(plugin_vscode_environment_1.PluginVSCodeEnvironment).toSelf().inSingletonScope();
    bind(plugin_vscode_commands_contribution_1.PluginVscodeCommandsContribution).toSelf().inSingletonScope();
    bind(core_1.CommandContribution).toDynamicValue(function (context) { return context.container.get(plugin_vscode_commands_contribution_1.PluginVscodeCommandsContribution); });
});


/***/ }),

/***/ "./node_modules/@theia/plugin-ext-vscode/lib/common/plugin-vscode-environment.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext-vscode/lib/common/plugin-vscode-environment.js ***!
  \***************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginVSCodeEnvironment = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var env_variables_1 = __webpack_require__(/*! @theia/core/lib/common/env-variables */ "./node_modules/@theia/core/lib/common/env-variables/index.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var PluginVSCodeEnvironment = /** @class */ (function () {
    function PluginVSCodeEnvironment() {
    }
    PluginVSCodeEnvironment.prototype.getExtensionsDirUri = function () {
        return __awaiter(this, void 0, void 0, function () {
            var configDir, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._extensionsDirUri) return [3 /*break*/, 2];
                        _a = uri_1.default.bind;
                        return [4 /*yield*/, this.environments.getConfigDirUri()];
                    case 1:
                        configDir = new (_a.apply(uri_1.default, [void 0, _b.sent()]))();
                        this._extensionsDirUri = configDir.resolve('extensions');
                        _b.label = 2;
                    case 2: return [2 /*return*/, this._extensionsDirUri];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(env_variables_1.EnvVariablesServer),
        __metadata("design:type", Object)
    ], PluginVSCodeEnvironment.prototype, "environments", void 0);
    PluginVSCodeEnvironment = __decorate([
        inversify_1.injectable()
    ], PluginVSCodeEnvironment);
    return PluginVSCodeEnvironment;
}());
exports.PluginVSCodeEnvironment = PluginVSCodeEnvironment;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/plugin/type-converters.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/plugin/type-converters.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginToPluginInfo = exports.pathOrURIToURI = exports.ThemableDecorationAttachmentRenderOptions = exports.ThemableDecorationRenderOptions = exports.DecorationRangeBehavior = exports.DecorationRenderOptions = exports.quickPickItemToPickOpenItem = exports.fromColorPresentation = exports.toColor = exports.fromColor = exports.fromFoldingRangeKind = exports.fromFoldingRange = exports.fromSelectionRange = exports.toSymbolInformation = exports.fromSymbolInformation = exports.getShellExecutionOptions = exports.getShellArgs = exports.getShellExecution = exports.getProcessExecution = exports.fromShellExecution = exports.fromProcessExecution = exports.toTask = exports.fromTask = exports.toWorkspaceFolder = exports.toCallHierarchyOutgoingCall = exports.toCallHierarchyIncomingCall = exports.toCallHierarchyItem = exports.fromCallHierarchyItem = exports.toLocation = exports.isModelCallHierarchyOutgoingCall = exports.isModelCallHierarchyIncomingCall = exports.isModelCallHierarchyItem = exports.isUriComponents = exports.isModelRange = exports.isModelLocation = exports.toSymbolTag = exports.fromSymbolTag = exports.toDocumentSymbol = exports.fromDocumentSymbol = exports.SymbolKind = exports.fromWorkspaceEdit = exports.SignatureHelp = exports.SignatureInformation = exports.ParameterInformation = exports.fromDocumentHighlight = exports.fromDocumentHighlightKind = exports.fromDocumentLink = exports.fromDefinitionLink = exports.fromLocation = exports.fromHover = exports.convertDiagnosticToMarkerData = exports.fromTextEdit = exports.toCompletionItemKind = exports.fromCompletionItemKind = exports.fromGlobPattern = exports.fromDocumentSelector = exports.toMarkdown = exports.fromMarkdown = exports.fromManyMarkdown = exports.fromRangeOrRangeWithMessage = exports.isDecorationOptionsArr = exports.toPosition = exports.fromPosition = exports.fromRange = exports.toRange = exports.fromSelection = exports.toSelection = exports.toWebviewPanelShowOptions = exports.fromViewColumn = exports.toViewColumn = void 0;
var vscode_languageserver_types_1 = __webpack_require__(/*! vscode-languageserver-types */ "./node_modules/vscode-languageserver-types/lib/esm/main.js");
var vscode_uri_1 = __webpack_require__(/*! vscode-uri */ "./node_modules/vscode-uri/lib/esm/index.js");
var rpc = __webpack_require__(/*! ../common/plugin-api-rpc */ "./node_modules/@theia/plugin-ext/lib/common/plugin-api-rpc.js");
var plugin_api_rpc_1 = __webpack_require__(/*! ../common/plugin-api-rpc */ "./node_modules/@theia/plugin-ext/lib/common/plugin-api-rpc.js");
var model = __webpack_require__(/*! ../common/plugin-api-rpc-model */ "./node_modules/@theia/plugin-ext/lib/common/plugin-api-rpc-model.js");
var markdown_string_1 = __webpack_require__(/*! ./markdown-string */ "./node_modules/@theia/plugin-ext/lib/plugin/markdown-string.js");
var types = __webpack_require__(/*! ./types-impl */ "./node_modules/@theia/plugin-ext/lib/plugin/types-impl.js");
var SIDE_GROUP = -2;
var ACTIVE_GROUP = -1;
function toViewColumn(ep) {
    if (typeof ep !== 'number') {
        return undefined;
    }
    if (ep === plugin_api_rpc_1.EditorPosition.ONE) {
        return types.ViewColumn.One;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.TWO) {
        return types.ViewColumn.Two;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.THREE) {
        return types.ViewColumn.Three;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.FOUR) {
        return types.ViewColumn.Four;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.FIVE) {
        return types.ViewColumn.Five;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.SIX) {
        return types.ViewColumn.Six;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.SEVEN) {
        return types.ViewColumn.Seven;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.EIGHT) {
        return types.ViewColumn.Eight;
    }
    else if (ep === plugin_api_rpc_1.EditorPosition.NINE) {
        return types.ViewColumn.Nine;
    }
    return undefined;
}
exports.toViewColumn = toViewColumn;
function fromViewColumn(column) {
    if (typeof column === 'number' && column >= types.ViewColumn.One) {
        return column - 1;
    }
    if (column === types.ViewColumn.Beside) {
        return SIDE_GROUP;
    }
    return ACTIVE_GROUP;
}
exports.fromViewColumn = fromViewColumn;
function toWebviewPanelShowOptions(options) {
    if (typeof options === 'object') {
        var showOptions = options;
        return {
            area: showOptions.area ? showOptions.area : types.WebviewPanelTargetArea.Main,
            viewColumn: showOptions.viewColumn ? fromViewColumn(showOptions.viewColumn) : undefined,
            preserveFocus: showOptions.preserveFocus ? showOptions.preserveFocus : false
        };
    }
    return {
        area: types.WebviewPanelTargetArea.Main,
        viewColumn: fromViewColumn(options),
        preserveFocus: false
    };
}
exports.toWebviewPanelShowOptions = toWebviewPanelShowOptions;
function toSelection(selection) {
    var selectionStartLineNumber = selection.selectionStartLineNumber, selectionStartColumn = selection.selectionStartColumn, positionLineNumber = selection.positionLineNumber, positionColumn = selection.positionColumn;
    var start = new types.Position(selectionStartLineNumber - 1, selectionStartColumn - 1);
    var end = new types.Position(positionLineNumber - 1, positionColumn - 1);
    return new types.Selection(start, end);
}
exports.toSelection = toSelection;
function fromSelection(selection) {
    var active = selection.active, anchor = selection.anchor;
    return {
        selectionStartLineNumber: anchor.line + 1,
        selectionStartColumn: anchor.character + 1,
        positionLineNumber: active.line + 1,
        positionColumn: active.character + 1
    };
}
exports.fromSelection = fromSelection;
function toRange(range) {
    // if (!range) {
    //     return undefined;
    // }
    var startLineNumber = range.startLineNumber, startColumn = range.startColumn, endLineNumber = range.endLineNumber, endColumn = range.endColumn;
    return new types.Range(startLineNumber - 1, startColumn - 1, endLineNumber - 1, endColumn - 1);
}
exports.toRange = toRange;
function fromRange(range) {
    if (!range) {
        return undefined;
    }
    var start = range.start, end = range.end;
    return {
        startLineNumber: start.line + 1,
        startColumn: start.character + 1,
        endLineNumber: end.line + 1,
        endColumn: end.character + 1
    };
}
exports.fromRange = fromRange;
function fromPosition(position) {
    return { lineNumber: position.line + 1, column: position.character + 1 };
}
exports.fromPosition = fromPosition;
function toPosition(position) {
    return new types.Position(position.lineNumber - 1, position.column - 1);
}
exports.toPosition = toPosition;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDecorationOptions(something) {
    return (typeof something.range !== 'undefined');
}
function isDecorationOptionsArr(something) {
    if (something.length === 0) {
        return true;
    }
    return isDecorationOptions(something[0]) ? true : false;
}
exports.isDecorationOptionsArr = isDecorationOptionsArr;
function fromRangeOrRangeWithMessage(ranges) {
    if (isDecorationOptionsArr(ranges)) {
        return ranges.map(function (r) {
            var hoverMessage;
            if (Array.isArray(r.hoverMessage)) {
                hoverMessage = fromManyMarkdown(r.hoverMessage);
            }
            else if (r.hoverMessage) {
                hoverMessage = fromMarkdown(r.hoverMessage);
            }
            else {
                hoverMessage = undefined;
            }
            return {
                range: fromRange(r.range),
                hoverMessage: hoverMessage,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                renderOptions: r.renderOptions
            };
        });
    }
    else {
        return ranges.map(function (r) {
            return ({
                range: fromRange(r)
            });
        });
    }
}
exports.fromRangeOrRangeWithMessage = fromRangeOrRangeWithMessage;
function fromManyMarkdown(markup) {
    return markup.map(fromMarkdown);
}
exports.fromManyMarkdown = fromManyMarkdown;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCodeblock(thing) {
    return thing && typeof thing === 'object'
        && typeof thing.language === 'string'
        && typeof thing.value === 'string';
}
function fromMarkdown(markup) {
    if (isCodeblock(markup)) {
        var language = markup.language, value = markup.value;
        return { value: '```' + language + '\n' + value + '\n```\n' };
    }
    else if (markdown_string_1.isMarkdownString(markup)) {
        return markup;
    }
    else if (typeof markup === 'string') {
        return { value: markup };
    }
    else {
        return { value: '' };
    }
}
exports.fromMarkdown = fromMarkdown;
function toMarkdown(value) {
    var ret = new markdown_string_1.MarkdownString(value.value);
    ret.isTrusted = value.isTrusted;
    return ret;
}
exports.toMarkdown = toMarkdown;
function fromDocumentSelector(selector) {
    if (!selector) {
        return undefined;
    }
    else if (Array.isArray(selector)) {
        return selector.map(fromDocumentSelector);
    }
    else if (typeof selector === 'string') {
        return selector;
    }
    else {
        return {
            language: selector.language,
            scheme: selector.scheme,
            pattern: fromGlobPattern(selector.pattern)
        };
    }
}
exports.fromDocumentSelector = fromDocumentSelector;
function fromGlobPattern(pattern) {
    if (typeof pattern === 'string') {
        return pattern;
    }
    if (isRelativePattern(pattern)) {
        return new types.RelativePattern(pattern.base, pattern.pattern);
    }
    return pattern;
}
exports.fromGlobPattern = fromGlobPattern;
function isRelativePattern(obj) {
    var rp = obj;
    return rp && typeof rp.base === 'string' && typeof rp.pattern === 'string';
}
function fromCompletionItemKind(kind) {
    switch (kind) {
        case types.CompletionItemKind.Method: return model.CompletionItemKind.Method;
        case types.CompletionItemKind.Function: return model.CompletionItemKind.Function;
        case types.CompletionItemKind.Constructor: return model.CompletionItemKind.Constructor;
        case types.CompletionItemKind.Field: return model.CompletionItemKind.Field;
        case types.CompletionItemKind.Variable: return model.CompletionItemKind.Variable;
        case types.CompletionItemKind.Class: return model.CompletionItemKind.Class;
        case types.CompletionItemKind.Interface: return model.CompletionItemKind.Interface;
        case types.CompletionItemKind.Struct: return model.CompletionItemKind.Struct;
        case types.CompletionItemKind.Module: return model.CompletionItemKind.Module;
        case types.CompletionItemKind.Property: return model.CompletionItemKind.Property;
        case types.CompletionItemKind.Unit: return model.CompletionItemKind.Unit;
        case types.CompletionItemKind.Value: return model.CompletionItemKind.Value;
        case types.CompletionItemKind.Constant: return model.CompletionItemKind.Constant;
        case types.CompletionItemKind.Enum: return model.CompletionItemKind.Enum;
        case types.CompletionItemKind.EnumMember: return model.CompletionItemKind.EnumMember;
        case types.CompletionItemKind.Keyword: return model.CompletionItemKind.Keyword;
        case types.CompletionItemKind.Snippet: return model.CompletionItemKind.Snippet;
        case types.CompletionItemKind.Text: return model.CompletionItemKind.Text;
        case types.CompletionItemKind.Color: return model.CompletionItemKind.Color;
        case types.CompletionItemKind.File: return model.CompletionItemKind.File;
        case types.CompletionItemKind.Reference: return model.CompletionItemKind.Reference;
        case types.CompletionItemKind.Folder: return model.CompletionItemKind.Folder;
        case types.CompletionItemKind.Event: return model.CompletionItemKind.Event;
        case types.CompletionItemKind.Operator: return model.CompletionItemKind.Operator;
        case types.CompletionItemKind.TypeParameter: return model.CompletionItemKind.TypeParameter;
    }
    return model.CompletionItemKind.Property;
}
exports.fromCompletionItemKind = fromCompletionItemKind;
function toCompletionItemKind(kind) {
    switch (kind) {
        case model.CompletionItemKind.Method: return types.CompletionItemKind.Method;
        case model.CompletionItemKind.Function: return types.CompletionItemKind.Function;
        case model.CompletionItemKind.Constructor: return types.CompletionItemKind.Constructor;
        case model.CompletionItemKind.Field: return types.CompletionItemKind.Field;
        case model.CompletionItemKind.Variable: return types.CompletionItemKind.Variable;
        case model.CompletionItemKind.Class: return types.CompletionItemKind.Class;
        case model.CompletionItemKind.Interface: return types.CompletionItemKind.Interface;
        case model.CompletionItemKind.Struct: return types.CompletionItemKind.Struct;
        case model.CompletionItemKind.Module: return types.CompletionItemKind.Module;
        case model.CompletionItemKind.Property: return types.CompletionItemKind.Property;
        case model.CompletionItemKind.Unit: return types.CompletionItemKind.Unit;
        case model.CompletionItemKind.Value: return types.CompletionItemKind.Value;
        case model.CompletionItemKind.Constant: return types.CompletionItemKind.Constant;
        case model.CompletionItemKind.Enum: return types.CompletionItemKind.Enum;
        case model.CompletionItemKind.EnumMember: return types.CompletionItemKind.EnumMember;
        case model.CompletionItemKind.Keyword: return types.CompletionItemKind.Keyword;
        case model.CompletionItemKind.Snippet: return types.CompletionItemKind.Snippet;
        case model.CompletionItemKind.Text: return types.CompletionItemKind.Text;
        case model.CompletionItemKind.Color: return types.CompletionItemKind.Color;
        case model.CompletionItemKind.File: return types.CompletionItemKind.File;
        case model.CompletionItemKind.Reference: return types.CompletionItemKind.Reference;
        case model.CompletionItemKind.Folder: return types.CompletionItemKind.Folder;
        case model.CompletionItemKind.Event: return types.CompletionItemKind.Event;
        case model.CompletionItemKind.Operator: return types.CompletionItemKind.Operator;
        case model.CompletionItemKind.TypeParameter: return types.CompletionItemKind.TypeParameter;
    }
    return types.CompletionItemKind.Property;
}
exports.toCompletionItemKind = toCompletionItemKind;
function fromTextEdit(edit) {
    return {
        text: edit.newText,
        range: fromRange(edit.range)
    };
}
exports.fromTextEdit = fromTextEdit;
function convertDiagnosticToMarkerData(diagnostic) {
    return {
        code: convertCode(diagnostic.code),
        severity: convertSeverity(diagnostic.severity),
        message: diagnostic.message,
        source: diagnostic.source,
        startLineNumber: diagnostic.range.start.line + 1,
        startColumn: diagnostic.range.start.character + 1,
        endLineNumber: diagnostic.range.end.line + 1,
        endColumn: diagnostic.range.end.character + 1,
        relatedInformation: convertRelatedInformation(diagnostic.relatedInformation),
        tags: convertTags(diagnostic.tags)
    };
}
exports.convertDiagnosticToMarkerData = convertDiagnosticToMarkerData;
function convertCode(code) {
    if (typeof code === 'number') {
        return String(code);
    }
    else {
        return code;
    }
}
function convertSeverity(severity) {
    switch (severity) {
        case types.DiagnosticSeverity.Error: return types.MarkerSeverity.Error;
        case types.DiagnosticSeverity.Warning: return types.MarkerSeverity.Warning;
        case types.DiagnosticSeverity.Information: return types.MarkerSeverity.Info;
        case types.DiagnosticSeverity.Hint: return types.MarkerSeverity.Hint;
    }
}
function convertRelatedInformation(diagnosticsRelatedInformation) {
    var e_1, _a;
    if (!diagnosticsRelatedInformation) {
        return undefined;
    }
    var relatedInformation = [];
    try {
        for (var diagnosticsRelatedInformation_1 = __values(diagnosticsRelatedInformation), diagnosticsRelatedInformation_1_1 = diagnosticsRelatedInformation_1.next(); !diagnosticsRelatedInformation_1_1.done; diagnosticsRelatedInformation_1_1 = diagnosticsRelatedInformation_1.next()) {
            var item = diagnosticsRelatedInformation_1_1.value;
            relatedInformation.push({
                resource: item.location.uri.toString(),
                message: item.message,
                startLineNumber: item.location.range.start.line + 1,
                startColumn: item.location.range.start.character + 1,
                endLineNumber: item.location.range.end.line + 1,
                endColumn: item.location.range.end.character + 1
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (diagnosticsRelatedInformation_1_1 && !diagnosticsRelatedInformation_1_1.done && (_a = diagnosticsRelatedInformation_1.return)) _a.call(diagnosticsRelatedInformation_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return relatedInformation;
}
function convertTags(tags) {
    var e_2, _a;
    if (!tags) {
        return undefined;
    }
    var markerTags = [];
    try {
        for (var tags_1 = __values(tags), tags_1_1 = tags_1.next(); !tags_1_1.done; tags_1_1 = tags_1.next()) {
            var tag = tags_1_1.value;
            switch (tag) {
                case types.DiagnosticTag.Unnecessary: markerTags.push(types.MarkerTag.Unnecessary);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (tags_1_1 && !tags_1_1.done && (_a = tags_1.return)) _a.call(tags_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return markerTags;
}
function fromHover(hover) {
    return {
        range: fromRange(hover.range),
        contents: fromManyMarkdown(hover.contents)
    };
}
exports.fromHover = fromHover;
function fromLocation(location) {
    return {
        uri: location.uri,
        range: fromRange(location.range)
    };
}
exports.fromLocation = fromLocation;
function fromDefinitionLink(definitionLink) {
    return {
        uri: definitionLink.targetUri,
        range: fromRange(definitionLink.targetRange),
        originSelectionRange: definitionLink.originSelectionRange ? fromRange(definitionLink.originSelectionRange) : undefined,
        targetSelectionRange: definitionLink.targetSelectionRange ? fromRange(definitionLink.targetSelectionRange) : undefined
    };
}
exports.fromDefinitionLink = fromDefinitionLink;
function fromDocumentLink(definitionLink) {
    return {
        range: fromRange(definitionLink.range),
        url: definitionLink.target && definitionLink.target.toString()
    };
}
exports.fromDocumentLink = fromDocumentLink;
function fromDocumentHighlightKind(kind) {
    switch (kind) {
        case types.DocumentHighlightKind.Text: return model.DocumentHighlightKind.Text;
        case types.DocumentHighlightKind.Read: return model.DocumentHighlightKind.Read;
        case types.DocumentHighlightKind.Write: return model.DocumentHighlightKind.Write;
    }
    return model.DocumentHighlightKind.Text;
}
exports.fromDocumentHighlightKind = fromDocumentHighlightKind;
function fromDocumentHighlight(documentHighlight) {
    return {
        range: fromRange(documentHighlight.range),
        kind: fromDocumentHighlightKind(documentHighlight.kind)
    };
}
exports.fromDocumentHighlight = fromDocumentHighlight;
var ParameterInformation;
(function (ParameterInformation) {
    function from(info) {
        return {
            label: info.label,
            documentation: info.documentation ? fromMarkdown(info.documentation) : undefined
        };
    }
    ParameterInformation.from = from;
    function to(info) {
        return {
            label: info.label,
            documentation: markdown_string_1.isMarkdownString(info.documentation) ? toMarkdown(info.documentation) : info.documentation
        };
    }
    ParameterInformation.to = to;
})(ParameterInformation = exports.ParameterInformation || (exports.ParameterInformation = {}));
var SignatureInformation;
(function (SignatureInformation) {
    function from(info) {
        return {
            label: info.label,
            documentation: info.documentation ? fromMarkdown(info.documentation) : undefined,
            parameters: info.parameters && info.parameters.map(ParameterInformation.from)
        };
    }
    SignatureInformation.from = from;
    function to(info) {
        return {
            label: info.label,
            documentation: markdown_string_1.isMarkdownString(info.documentation) ? toMarkdown(info.documentation) : info.documentation,
            parameters: info.parameters && info.parameters.map(ParameterInformation.to)
        };
    }
    SignatureInformation.to = to;
})(SignatureInformation = exports.SignatureInformation || (exports.SignatureInformation = {}));
var SignatureHelp;
(function (SignatureHelp) {
    function from(id, help) {
        return {
            id: id,
            activeSignature: help.activeSignature,
            activeParameter: help.activeParameter,
            signatures: help.signatures && help.signatures.map(SignatureInformation.from)
        };
    }
    SignatureHelp.from = from;
    function to(help) {
        return {
            activeSignature: help.activeSignature,
            activeParameter: help.activeParameter,
            signatures: help.signatures && help.signatures.map(SignatureInformation.to)
        };
    }
    SignatureHelp.to = to;
})(SignatureHelp = exports.SignatureHelp || (exports.SignatureHelp = {}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromWorkspaceEdit(value, documents) {
    var e_3, _a;
    var result = {
        edits: []
    };
    try {
        for (var _b = __values(value._allEntries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var entry = _c.value;
            var _d = __read(entry, 2), uri = _d[0], uriOrEdits = _d[1];
            if (Array.isArray(uriOrEdits)) {
                // text edits
                var doc = documents ? documents.getDocument(uri.toString()) : undefined;
                result.edits.push({ resource: uri, modelVersionId: doc && doc.version, edits: uriOrEdits.map(fromTextEdit) });
            }
            else {
                // resource edits
                result.edits.push({ oldUri: uri, newUri: uriOrEdits, options: entry[2] });
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
    return result;
}
exports.fromWorkspaceEdit = fromWorkspaceEdit;
var SymbolKind;
(function (SymbolKind) {
    var fromMapping = Object.create(null);
    fromMapping[model.SymbolKind.File] = model.SymbolKind.File;
    fromMapping[model.SymbolKind.Module] = model.SymbolKind.Module;
    fromMapping[model.SymbolKind.Namespace] = model.SymbolKind.Namespace;
    fromMapping[model.SymbolKind.Package] = model.SymbolKind.Package;
    fromMapping[model.SymbolKind.Class] = model.SymbolKind.Class;
    fromMapping[model.SymbolKind.Method] = model.SymbolKind.Method;
    fromMapping[model.SymbolKind.Property] = model.SymbolKind.Property;
    fromMapping[model.SymbolKind.Field] = model.SymbolKind.Field;
    fromMapping[model.SymbolKind.Constructor] = model.SymbolKind.Constructor;
    fromMapping[model.SymbolKind.Enum] = model.SymbolKind.Enum;
    fromMapping[model.SymbolKind.Interface] = model.SymbolKind.Interface;
    fromMapping[model.SymbolKind.Function] = model.SymbolKind.Function;
    fromMapping[model.SymbolKind.Variable] = model.SymbolKind.Variable;
    fromMapping[model.SymbolKind.Constant] = model.SymbolKind.Constant;
    fromMapping[model.SymbolKind.String] = model.SymbolKind.String;
    fromMapping[model.SymbolKind.Number] = model.SymbolKind.Number;
    fromMapping[model.SymbolKind.Boolean] = model.SymbolKind.Boolean;
    fromMapping[model.SymbolKind.Array] = model.SymbolKind.Array;
    fromMapping[model.SymbolKind.Object] = model.SymbolKind.Object;
    fromMapping[model.SymbolKind.Key] = model.SymbolKind.Key;
    fromMapping[model.SymbolKind.Null] = model.SymbolKind.Null;
    fromMapping[model.SymbolKind.EnumMember] = model.SymbolKind.EnumMember;
    fromMapping[model.SymbolKind.Struct] = model.SymbolKind.Struct;
    fromMapping[model.SymbolKind.Event] = model.SymbolKind.Event;
    fromMapping[model.SymbolKind.Operator] = model.SymbolKind.Operator;
    fromMapping[model.SymbolKind.TypeParameter] = model.SymbolKind.TypeParameter;
    function fromSymbolKind(kind) {
        return fromMapping[kind] || model.SymbolKind.Property;
    }
    SymbolKind.fromSymbolKind = fromSymbolKind;
    function toSymbolKind(kind) {
        for (var k in fromMapping) {
            if (fromMapping[k] === kind) {
                return Number(k);
            }
        }
        return model.SymbolKind.Property;
    }
    SymbolKind.toSymbolKind = toSymbolKind;
})(SymbolKind = exports.SymbolKind || (exports.SymbolKind = {}));
function fromDocumentSymbol(info) {
    var result = {
        name: info.name,
        detail: info.detail,
        range: fromRange(info.range),
        tags: info.tags ? info.tags.map(fromSymbolTag) : [],
        selectionRange: fromRange(info.selectionRange),
        kind: SymbolKind.fromSymbolKind(info.kind)
    };
    if (info.children) {
        result.children = info.children.map(fromDocumentSymbol);
    }
    return result;
}
exports.fromDocumentSymbol = fromDocumentSymbol;
function toDocumentSymbol(symbol) {
    return {
        name: symbol.name,
        detail: symbol.detail,
        range: toRange(symbol.range),
        tags: symbol.tags && symbol.tags.length > 0 ? symbol.tags.map(toSymbolTag) : [],
        selectionRange: toRange(symbol.selectionRange),
        children: symbol.children ? symbol.children.map(toDocumentSymbol) : [],
        kind: SymbolKind.toSymbolKind(symbol.kind)
    };
}
exports.toDocumentSymbol = toDocumentSymbol;
function fromSymbolTag(kind) {
    switch (kind) {
        case types.SymbolTag.Deprecated: return model.SymbolTag.Deprecated;
    }
}
exports.fromSymbolTag = fromSymbolTag;
function toSymbolTag(kind) {
    switch (kind) {
        case model.SymbolTag.Deprecated: return types.SymbolTag.Deprecated;
    }
}
exports.toSymbolTag = toSymbolTag;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModelLocation(thing) {
    if (!thing) {
        return false;
    }
    return isModelRange(thing.range) &&
        isUriComponents(thing.uri);
}
exports.isModelLocation = isModelLocation;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModelRange(thing) {
    if (!thing) {
        return false;
    }
    return (('startLineNumber' in thing) && typeof thing.startLineNumber === 'number') &&
        (('startColumn' in thing) && typeof thing.startColumn === 'number') &&
        (('endLineNumber' in thing) && typeof thing.endLineNumber === 'number') &&
        (('endColumn' in thing) && typeof thing.endColumn === 'number');
}
exports.isModelRange = isModelRange;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUriComponents(thing) {
    if (!thing) {
        return false;
    }
    return (('scheme' in thing) && typeof thing.scheme === 'string') &&
        (('path' in thing) && typeof thing.path === 'string') &&
        (('query' in thing) && typeof thing.query === 'string') &&
        (('fragment' in thing) && typeof thing.fragment === 'string');
}
exports.isUriComponents = isUriComponents;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModelCallHierarchyItem(thing) {
    if (!thing) {
        return false;
    }
    return false;
}
exports.isModelCallHierarchyItem = isModelCallHierarchyItem;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModelCallHierarchyIncomingCall(thing) {
    if (!thing) {
        return false;
    }
    return false;
}
exports.isModelCallHierarchyIncomingCall = isModelCallHierarchyIncomingCall;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModelCallHierarchyOutgoingCall(thing) {
    if (!thing) {
        return false;
    }
    return false;
}
exports.isModelCallHierarchyOutgoingCall = isModelCallHierarchyOutgoingCall;
function toLocation(value) {
    return new types.Location(vscode_uri_1.URI.revive(value.uri), toRange(value.range));
}
exports.toLocation = toLocation;
function fromCallHierarchyItem(item) {
    return {
        kind: SymbolKind.fromSymbolKind(item.kind),
        name: item.name,
        detail: item.detail,
        uri: item.uri,
        range: fromRange(item.range),
        selectionRange: fromRange(item.selectionRange)
    };
}
exports.fromCallHierarchyItem = fromCallHierarchyItem;
function toCallHierarchyItem(value) {
    return new types.CallHierarchyItem(SymbolKind.toSymbolKind(value.kind), value.name, value.detail ? value.detail : '', vscode_uri_1.URI.revive(value.uri), toRange(value.range), toRange(value.selectionRange));
}
exports.toCallHierarchyItem = toCallHierarchyItem;
function toCallHierarchyIncomingCall(value) {
    return new types.CallHierarchyIncomingCall(toCallHierarchyItem(value.from), value.fromRanges && value.fromRanges.map(toRange));
}
exports.toCallHierarchyIncomingCall = toCallHierarchyIncomingCall;
function toCallHierarchyOutgoingCall(value) {
    return new types.CallHierarchyOutgoingCall(toCallHierarchyItem(value.to), value.fromRanges && value.fromRanges.map(toRange));
}
exports.toCallHierarchyOutgoingCall = toCallHierarchyOutgoingCall;
function toWorkspaceFolder(folder) {
    return {
        uri: vscode_uri_1.URI.revive(folder.uri),
        name: folder.name,
        index: folder.index
    };
}
exports.toWorkspaceFolder = toWorkspaceFolder;
function fromTask(task) {
    if (!task) {
        return undefined;
    }
    var taskDto = {};
    taskDto.label = task.name;
    taskDto.source = task.source;
    if ('detail' in task) {
        taskDto.detail = task.detail;
    }
    if (typeof task.scope === 'object') {
        taskDto.scope = task.scope.uri.toString();
    }
    else if (typeof task.scope === 'number') {
        taskDto.scope = task.scope;
    }
    var taskDefinition = task.definition;
    if (!taskDefinition) {
        return taskDto;
    }
    taskDto.type = taskDefinition.type;
    var type = taskDefinition.type, properties = __rest(taskDefinition, ["type"]);
    for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
            taskDto[key] = properties[key];
        }
    }
    var execution = task.execution;
    if (!execution) {
        return taskDto;
    }
    if (taskDefinition.type === 'shell' || types.ShellExecution.is(execution)) {
        return fromShellExecution(execution, taskDto);
    }
    if (taskDefinition.type === 'process' || types.ProcessExecution.is(execution)) {
        return fromProcessExecution(execution, taskDto);
    }
    return taskDto;
}
exports.fromTask = fromTask;
function toTask(taskDto) {
    if (!taskDto) {
        throw new Error('Task should be provided for converting');
    }
    var type = taskDto.type, label = taskDto.label, source = taskDto.source, scope = taskDto.scope, detail = taskDto.detail, command = taskDto.command, args = taskDto.args, options = taskDto.options, windows = taskDto.windows, properties = __rest(taskDto, ["type", "label", "source", "scope", "detail", "command", "args", "options", "windows"]);
    var result = {};
    result.name = label;
    result.source = source;
    if (detail) {
        result.detail = detail;
    }
    if (typeof scope === 'string') {
        var uri = vscode_uri_1.URI.parse(scope);
        result.scope = {
            uri: uri,
            name: uri.toString(),
            index: 0
        };
    }
    else {
        result.scope = scope;
    }
    var taskType = type;
    var taskDefinition = {
        type: taskType
    };
    result.definition = taskDefinition;
    if (taskType === 'process') {
        result.execution = getProcessExecution(taskDto);
    }
    var execution = { command: command, args: args, options: options };
    if (taskType === 'shell' || types.ShellExecution.is(execution)) {
        result.execution = getShellExecution(taskDto);
    }
    if (!properties) {
        return result;
    }
    for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
            taskDefinition[key] = properties[key];
        }
    }
    return result;
}
exports.toTask = toTask;
function fromProcessExecution(execution, taskDto) {
    taskDto.command = execution.process;
    taskDto.args = execution.args;
    var options = execution.options;
    if (options) {
        taskDto.options = options;
    }
    return taskDto;
}
exports.fromProcessExecution = fromProcessExecution;
function fromShellExecution(execution, taskDto) {
    var options = execution.options;
    if (options) {
        taskDto.options = getShellExecutionOptions(options);
    }
    var commandLine = execution.commandLine;
    if (commandLine) {
        taskDto.command = commandLine;
        return taskDto;
    }
    var command = execution.command;
    if (typeof command === 'string') {
        taskDto.command = command;
        taskDto.args = getShellArgs(execution.args);
        return taskDto;
    }
    else {
        throw new Error('Converting ShellQuotedString command is not implemented');
    }
}
exports.fromShellExecution = fromShellExecution;
function getProcessExecution(taskDto) {
    return new types.ProcessExecution(taskDto.command, taskDto.args || [], taskDto.options || {});
}
exports.getProcessExecution = getProcessExecution;
function getShellExecution(taskDto) {
    if (taskDto.command && Array.isArray(taskDto.args) && taskDto.args.length !== 0) {
        return new types.ShellExecution(taskDto.command, taskDto.args, taskDto.options || {});
    }
    return new types.ShellExecution(taskDto.command || taskDto.commandLine, taskDto.options || {});
}
exports.getShellExecution = getShellExecution;
function getShellArgs(args) {
    if (!args || args.length === 0) {
        return [];
    }
    var element = args[0];
    if (typeof element === 'string') {
        return args;
    }
    var result = [];
    var shellQuotedArgs = args;
    shellQuotedArgs.forEach(function (arg) {
        result.push(arg.value);
    });
    return result;
}
exports.getShellArgs = getShellArgs;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getShellExecutionOptions(options) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var result = {};
    var env = options.env;
    if (env) {
        result['env'] = env;
    }
    var executable = options.executable;
    if (executable) {
        result['executable'] = executable;
    }
    var shellQuoting = options.shellQuoting;
    if (shellQuoting) {
        result['shellQuoting'] = shellQuoting;
    }
    var shellArgs = options.shellArgs;
    if (shellArgs) {
        result['shellArgs'] = shellArgs;
    }
    var cwd = options.cwd;
    if (cwd) {
        Object.assign(result, { cwd: cwd });
    }
    return result;
}
exports.getShellExecutionOptions = getShellExecutionOptions;
function fromSymbolInformation(symbolInformation) {
    if (!symbolInformation) {
        return undefined;
    }
    if (symbolInformation.location && symbolInformation.location.range) {
        var p1 = vscode_languageserver_types_1.Position.create(symbolInformation.location.range.start.line, symbolInformation.location.range.start.character);
        var p2 = vscode_languageserver_types_1.Position.create(symbolInformation.location.range.end.line, symbolInformation.location.range.end.character);
        return vscode_languageserver_types_1.SymbolInformation.create(symbolInformation.name, symbolInformation.kind++, vscode_languageserver_types_1.Range.create(p1, p2), symbolInformation.location.uri.toString(), symbolInformation.containerName);
    }
    return {
        name: symbolInformation.name,
        containerName: symbolInformation.containerName,
        kind: symbolInformation.kind++,
        location: {
            uri: symbolInformation.location.uri.toString()
        }
    };
}
exports.fromSymbolInformation = fromSymbolInformation;
function toSymbolInformation(symbolInformation) {
    if (!symbolInformation) {
        return undefined;
    }
    return {
        name: symbolInformation.name,
        containerName: symbolInformation.containerName,
        kind: symbolInformation.kind,
        location: {
            uri: vscode_uri_1.URI.parse(symbolInformation.location.uri),
            range: symbolInformation.location.range
        }
    };
}
exports.toSymbolInformation = toSymbolInformation;
function fromSelectionRange(selectionRange) {
    return { range: fromRange(selectionRange.range) };
}
exports.fromSelectionRange = fromSelectionRange;
function fromFoldingRange(foldingRange) {
    var range = {
        start: foldingRange.start + 1,
        end: foldingRange.end + 1
    };
    if (foldingRange.kind) {
        range.kind = fromFoldingRangeKind(foldingRange.kind);
    }
    return range;
}
exports.fromFoldingRange = fromFoldingRange;
function fromFoldingRangeKind(kind) {
    if (kind) {
        switch (kind) {
            case types.FoldingRangeKind.Comment:
                return model.FoldingRangeKind.Comment;
            case types.FoldingRangeKind.Imports:
                return model.FoldingRangeKind.Imports;
            case types.FoldingRangeKind.Region:
                return model.FoldingRangeKind.Region;
        }
    }
    return undefined;
}
exports.fromFoldingRangeKind = fromFoldingRangeKind;
function fromColor(color) {
    return [color.red, color.green, color.blue, color.alpha];
}
exports.fromColor = fromColor;
function toColor(color) {
    return new types.Color(color[0], color[1], color[2], color[3]);
}
exports.toColor = toColor;
function fromColorPresentation(colorPresentation) {
    return {
        label: colorPresentation.label,
        textEdit: colorPresentation.textEdit ? fromTextEdit(colorPresentation.textEdit) : undefined,
        additionalTextEdits: colorPresentation.additionalTextEdits ? colorPresentation.additionalTextEdits.map(function (value) { return fromTextEdit(value); }) : undefined
    };
}
exports.fromColorPresentation = fromColorPresentation;
function quickPickItemToPickOpenItem(items) {
    var pickItems = [];
    for (var handle = 0; handle < items.length; handle++) {
        var item = items[handle];
        var label = void 0;
        var description = void 0;
        var detail = void 0;
        var picked = void 0;
        var groupLabel = void 0;
        var showBorder = void 0;
        if (typeof item === 'string') {
            label = item;
        }
        else {
            (label = item.label, description = item.description, detail = item.detail, picked = item.picked, groupLabel = item.groupLabel, showBorder = item.showBorder);
        }
        pickItems.push({
            label: label,
            description: description,
            handle: handle,
            detail: detail,
            picked: picked,
            groupLabel: groupLabel,
            showBorder: showBorder
        });
    }
    return pickItems;
}
exports.quickPickItemToPickOpenItem = quickPickItemToPickOpenItem;
var DecorationRenderOptions;
(function (DecorationRenderOptions) {
    function from(options) {
        return {
            isWholeLine: options.isWholeLine,
            rangeBehavior: options.rangeBehavior ? DecorationRangeBehavior.from(options.rangeBehavior) : undefined,
            overviewRulerLane: options.overviewRulerLane,
            light: options.light ? ThemableDecorationRenderOptions.from(options.light) : undefined,
            dark: options.dark ? ThemableDecorationRenderOptions.from(options.dark) : undefined,
            backgroundColor: options.backgroundColor,
            outline: options.outline,
            outlineColor: options.outlineColor,
            outlineStyle: options.outlineStyle,
            outlineWidth: options.outlineWidth,
            border: options.border,
            borderColor: options.borderColor,
            borderRadius: options.borderRadius,
            borderSpacing: options.borderSpacing,
            borderStyle: options.borderStyle,
            borderWidth: options.borderWidth,
            fontStyle: options.fontStyle,
            fontWeight: options.fontWeight,
            textDecoration: options.textDecoration,
            cursor: options.cursor,
            color: options.color,
            opacity: options.opacity,
            letterSpacing: options.letterSpacing,
            gutterIconPath: options.gutterIconPath ? pathOrURIToURI(options.gutterIconPath) : undefined,
            gutterIconSize: options.gutterIconSize,
            overviewRulerColor: options.overviewRulerColor,
            before: options.before ? ThemableDecorationAttachmentRenderOptions.from(options.before) : undefined,
            after: options.after ? ThemableDecorationAttachmentRenderOptions.from(options.after) : undefined,
        };
    }
    DecorationRenderOptions.from = from;
})(DecorationRenderOptions = exports.DecorationRenderOptions || (exports.DecorationRenderOptions = {}));
var DecorationRangeBehavior;
(function (DecorationRangeBehavior) {
    function from(value) {
        if (typeof value === 'undefined') {
            return value;
        }
        switch (value) {
            case types.DecorationRangeBehavior.OpenOpen:
                return rpc.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges;
            case types.DecorationRangeBehavior.ClosedClosed:
                return rpc.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges;
            case types.DecorationRangeBehavior.OpenClosed:
                return rpc.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore;
            case types.DecorationRangeBehavior.ClosedOpen:
                return rpc.TrackedRangeStickiness.GrowsOnlyWhenTypingAfter;
        }
    }
    DecorationRangeBehavior.from = from;
})(DecorationRangeBehavior = exports.DecorationRangeBehavior || (exports.DecorationRangeBehavior = {}));
var ThemableDecorationRenderOptions;
(function (ThemableDecorationRenderOptions) {
    function from(options) {
        if (typeof options === 'undefined') {
            return options;
        }
        return {
            backgroundColor: options.backgroundColor,
            outline: options.outline,
            outlineColor: options.outlineColor,
            outlineStyle: options.outlineStyle,
            outlineWidth: options.outlineWidth,
            border: options.border,
            borderColor: options.borderColor,
            borderRadius: options.borderRadius,
            borderSpacing: options.borderSpacing,
            borderStyle: options.borderStyle,
            borderWidth: options.borderWidth,
            fontStyle: options.fontStyle,
            fontWeight: options.fontWeight,
            textDecoration: options.textDecoration,
            cursor: options.cursor,
            color: options.color,
            opacity: options.opacity,
            letterSpacing: options.letterSpacing,
            gutterIconPath: options.gutterIconPath ? pathOrURIToURI(options.gutterIconPath) : undefined,
            gutterIconSize: options.gutterIconSize,
            overviewRulerColor: options.overviewRulerColor,
            before: options.before ? ThemableDecorationAttachmentRenderOptions.from(options.before) : undefined,
            after: options.after ? ThemableDecorationAttachmentRenderOptions.from(options.after) : undefined,
        };
    }
    ThemableDecorationRenderOptions.from = from;
})(ThemableDecorationRenderOptions = exports.ThemableDecorationRenderOptions || (exports.ThemableDecorationRenderOptions = {}));
var ThemableDecorationAttachmentRenderOptions;
(function (ThemableDecorationAttachmentRenderOptions) {
    function from(options) {
        if (typeof options === 'undefined') {
            return options;
        }
        return {
            contentText: options.contentText,
            contentIconPath: options.contentIconPath ? pathOrURIToURI(options.contentIconPath) : undefined,
            border: options.border,
            borderColor: options.borderColor,
            fontStyle: options.fontStyle,
            fontWeight: options.fontWeight,
            textDecoration: options.textDecoration,
            color: options.color,
            backgroundColor: options.backgroundColor,
            margin: options.margin,
            width: options.width,
            height: options.height,
        };
    }
    ThemableDecorationAttachmentRenderOptions.from = from;
})(ThemableDecorationAttachmentRenderOptions = exports.ThemableDecorationAttachmentRenderOptions || (exports.ThemableDecorationAttachmentRenderOptions = {}));
function pathOrURIToURI(value) {
    if (typeof value === 'undefined') {
        return value;
    }
    if (typeof value === 'string') {
        return vscode_uri_1.URI.file(value);
    }
    else {
        return value;
    }
}
exports.pathOrURIToURI = pathOrURIToURI;
function pluginToPluginInfo(plugin) {
    return {
        id: plugin.model.id,
        name: plugin.model.name
    };
}
exports.pluginToPluginInfo = pluginToPluginInfo;


/***/ })

}]);
//# sourceMappingURL=80.bundle.js.map