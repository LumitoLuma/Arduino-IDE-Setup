(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[53],{

/***/ "./node_modules/@theia/markers/lib/browser/problem/problem-contribution.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@theia/markers/lib/browser/problem/problem-contribution.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
exports.ProblemContribution = exports.ProblemsCommands = exports.ProblemsMenu = exports.PROBLEMS_CONTEXT_MENU = void 0;
var debounce = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var status_bar_1 = __webpack_require__(/*! @theia/core/lib/browser/status-bar/status-bar */ "./node_modules/@theia/core/lib/browser/status-bar/status-bar.js");
var view_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/view-contribution */ "./node_modules/@theia/core/lib/browser/shell/view-contribution.js");
var problem_marker_1 = __webpack_require__(/*! ../../common/problem-marker */ "./node_modules/@theia/markers/lib/common/problem-marker.js");
var problem_manager_1 = __webpack_require__(/*! ./problem-manager */ "./node_modules/@theia/markers/lib/browser/problem/problem-manager.js");
var problem_widget_1 = __webpack_require__(/*! ./problem-widget */ "./node_modules/@theia/markers/lib/browser/problem/problem-widget.js");
var selection_service_1 = __webpack_require__(/*! @theia/core/lib/common/selection-service */ "./node_modules/@theia/core/lib/common/selection-service.js");
var problem_selection_1 = __webpack_require__(/*! ./problem-selection */ "./node_modules/@theia/markers/lib/browser/problem/problem-selection.js");
exports.PROBLEMS_CONTEXT_MENU = [problem_marker_1.PROBLEM_KIND];
var ProblemsMenu;
(function (ProblemsMenu) {
    ProblemsMenu.CLIPBOARD = __spread(exports.PROBLEMS_CONTEXT_MENU, ['1_clipboard']);
    ProblemsMenu.PROBLEMS = __spread(exports.PROBLEMS_CONTEXT_MENU, ['2_problems']);
})(ProblemsMenu = exports.ProblemsMenu || (exports.ProblemsMenu = {}));
var ProblemsCommands;
(function (ProblemsCommands) {
    ProblemsCommands.COLLAPSE_ALL = {
        id: 'problems.collapse.all'
    };
    ProblemsCommands.COLLAPSE_ALL_TOOLBAR = {
        id: 'problems.collapse.all.toolbar',
        iconClass: 'theia-collapse-all-icon'
    };
    ProblemsCommands.COPY = {
        id: 'problems.copy'
    };
    ProblemsCommands.COPY_MESSAGE = {
        id: 'problems.copy.message',
    };
    ProblemsCommands.CLEAR_ALL = {
        id: 'problems.clear.all',
        category: 'Problems',
        label: 'Clear All',
        iconClass: 'clear-all'
    };
})(ProblemsCommands = exports.ProblemsCommands || (exports.ProblemsCommands = {}));
var ProblemContribution = /** @class */ (function (_super) {
    __extends(ProblemContribution, _super);
    function ProblemContribution() {
        var _this = _super.call(this, {
            widgetId: problem_widget_1.PROBLEMS_WIDGET_ID,
            widgetName: 'Problems',
            defaultWidgetOptions: {
                area: 'bottom'
            },
            toggleCommandId: 'problemsView:toggle',
            toggleKeybinding: 'ctrlcmd+shift+m'
        }) || this;
        _this.updateStatusBarElement = debounce(function () { return _this.setStatusBarElement(_this.problemManager.getProblemStat()); }, 10);
        return _this;
    }
    ProblemContribution.prototype.onStart = function (app) {
        this.updateStatusBarElement();
        this.problemManager.onDidChangeMarkers(this.updateStatusBarElement);
    };
    ProblemContribution.prototype.initializeLayout = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openView()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProblemContribution.prototype.setStatusBarElement = function (problemStat) {
        this.statusBar.setElement('problem-marker-status', {
            text: problemStat.infos <= 0
                ? "$(times-circle) " + problemStat.errors + " $(exclamation-triangle) " + problemStat.warnings
                : "$(times-circle) " + problemStat.errors + " $(exclamation-triangle) " + problemStat.warnings + " $(info-circle) " + problemStat.infos,
            alignment: status_bar_1.StatusBarAlignment.LEFT,
            priority: 10,
            command: this.toggleCommand ? this.toggleCommand.id : undefined,
            tooltip: this.getStatusBarTooltip(problemStat)
        });
    };
    /**
     * Get the tooltip to be displayed when hovering over the problem statusbar item.
     * - Displays `No Problems` when no problems are present.
     * - Displays a human-readable label which describes for each type of problem stat properties,
     * their overall count and type when any one of these properties has a positive count.
     * @param stat the problem stat describing the number of `errors`, `warnings` and `infos`.
     *
     * @return the tooltip to be displayed in the statusbar.
     */
    ProblemContribution.prototype.getStatusBarTooltip = function (stat) {
        if (stat.errors <= 0 && stat.warnings <= 0 && stat.infos <= 0) {
            return 'No Problems';
        }
        var tooltip = [];
        if (stat.errors > 0) {
            tooltip.push(stat.errors + " Errors");
        }
        if (stat.warnings > 0) {
            tooltip.push(stat.warnings + " Warnings");
        }
        if (stat.infos > 0) {
            tooltip.push(stat.infos + " Infos");
        }
        return tooltip.join(', ');
    };
    ProblemContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        _super.prototype.registerCommands.call(this, commands);
        commands.registerCommand(ProblemsCommands.COLLAPSE_ALL, {
            execute: function () { return _this.collapseAllProblems(); }
        });
        commands.registerCommand(ProblemsCommands.COLLAPSE_ALL_TOOLBAR, {
            isEnabled: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            isVisible: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            execute: function (widget) { return _this.withWidget(widget, function () { return _this.collapseAllProblems(); }); }
        });
        commands.registerCommand(ProblemsCommands.COPY, new problem_selection_1.ProblemSelection.CommandHandler(this.selectionService, {
            multi: false,
            isEnabled: function () { return true; },
            isVisible: function () { return true; },
            execute: function (selection) { return _this.copy(selection); }
        }));
        commands.registerCommand(ProblemsCommands.COPY_MESSAGE, new problem_selection_1.ProblemSelection.CommandHandler(this.selectionService, {
            multi: false,
            isEnabled: function () { return true; },
            isVisible: function () { return true; },
            execute: function (selection) { return _this.copyMessage(selection); }
        }));
        commands.registerCommand(ProblemsCommands.CLEAR_ALL, {
            isEnabled: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            isVisible: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            execute: function (widget) { return _this.withWidget(widget, function () { return _this.problemManager.cleanAllMarkers(); }); }
        });
    };
    ProblemContribution.prototype.registerMenus = function (menus) {
        _super.prototype.registerMenus.call(this, menus);
        menus.registerMenuAction(ProblemsMenu.CLIPBOARD, {
            commandId: ProblemsCommands.COPY.id,
            label: 'Copy',
            order: '0'
        });
        menus.registerMenuAction(ProblemsMenu.CLIPBOARD, {
            commandId: ProblemsCommands.COPY_MESSAGE.id,
            label: 'Copy Message',
            order: '1'
        });
        menus.registerMenuAction(ProblemsMenu.PROBLEMS, {
            commandId: ProblemsCommands.COLLAPSE_ALL.id,
            label: 'Collapse All',
            order: '2'
        });
    };
    ProblemContribution.prototype.registerToolbarItems = function (toolbarRegistry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                toolbarRegistry.registerItem({
                    id: ProblemsCommands.COLLAPSE_ALL_TOOLBAR.id,
                    command: ProblemsCommands.COLLAPSE_ALL_TOOLBAR.id,
                    tooltip: 'Collapse All',
                    priority: 0,
                });
                toolbarRegistry.registerItem({
                    id: ProblemsCommands.CLEAR_ALL.id,
                    command: ProblemsCommands.CLEAR_ALL.id,
                    tooltip: 'Clear All',
                    priority: 1,
                });
                return [2 /*return*/];
            });
        });
    };
    ProblemContribution.prototype.collapseAllProblems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var model, root, firstChild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.widget];
                    case 1:
                        model = (_a.sent()).model;
                        root = model.root;
                        firstChild = root.children[0];
                        root.children.forEach(function (child) { return browser_1.CompositeTreeNode.is(child) && model.collapseAll(child); });
                        if (browser_1.SelectableTreeNode.is(firstChild)) {
                            model.selectNode(firstChild);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProblemContribution.prototype.addToClipboard = function (content) {
        var handleCopy = function (e) {
            document.removeEventListener('copy', handleCopy);
            if (e.clipboardData) {
                e.clipboardData.setData('text/plain', content);
                e.preventDefault();
            }
        };
        document.addEventListener('copy', handleCopy);
        document.execCommand('copy');
    };
    ProblemContribution.prototype.copy = function (selection) {
        var marker = selection.marker;
        var serializedProblem = JSON.stringify({
            resource: marker.uri,
            owner: marker.uri,
            code: marker.data.code,
            severity: marker.data.severity,
            message: marker.data.message,
            source: marker.data.source,
            startLineNumber: marker.data.range.start.line,
            startColumn: marker.data.range.start.character,
            endLineNumber: marker.data.range.end.line,
            endColumn: marker.data.range.end.character
        }, undefined, '\t');
        this.addToClipboard(serializedProblem);
    };
    ProblemContribution.prototype.copyMessage = function (selection) {
        var marker = selection.marker;
        this.addToClipboard(marker.data.message);
    };
    ProblemContribution.prototype.withWidget = function (widget, cb) {
        if (widget === void 0) { widget = this.tryGetWidget(); }
        if (widget instanceof problem_widget_1.ProblemWidget && widget.id === problem_widget_1.PROBLEMS_WIDGET_ID) {
            return cb(widget);
        }
        return false;
    };
    __decorate([
        inversify_1.inject(problem_manager_1.ProblemManager),
        __metadata("design:type", problem_manager_1.ProblemManager)
    ], ProblemContribution.prototype, "problemManager", void 0);
    __decorate([
        inversify_1.inject(status_bar_1.StatusBar),
        __metadata("design:type", Object)
    ], ProblemContribution.prototype, "statusBar", void 0);
    __decorate([
        inversify_1.inject(selection_service_1.SelectionService),
        __metadata("design:type", selection_service_1.SelectionService)
    ], ProblemContribution.prototype, "selectionService", void 0);
    ProblemContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ProblemContribution);
    return ProblemContribution;
}(view_contribution_1.AbstractViewContribution));
exports.ProblemContribution = ProblemContribution;


/***/ })

}]);
//# sourceMappingURL=53.bundle.js.map