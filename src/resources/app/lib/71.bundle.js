(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[71],{

/***/ "./node_modules/@theia/outline-view/lib/browser/outline-decorator-service.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@theia/outline-view/lib/browser/outline-decorator-service.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2018 Redhat, Ericsson and others.
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineDecoratorService = exports.OutlineTreeDecorator = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var contribution_provider_1 = __webpack_require__(/*! @theia/core/lib/common/contribution-provider */ "./node_modules/@theia/core/lib/common/contribution-provider.js");
var tree_decorator_1 = __webpack_require__(/*! @theia/core/lib/browser/tree/tree-decorator */ "./node_modules/@theia/core/lib/browser/tree/tree-decorator.js");
/**
 * Symbol for all decorators that would like to contribute into the outline.
 */
exports.OutlineTreeDecorator = Symbol('OutlineTreeDecorator');
/**
 * Decorator service for the outline.
 */
var OutlineDecoratorService = /** @class */ (function (_super) {
    __extends(OutlineDecoratorService, _super);
    function OutlineDecoratorService(contributions) {
        var _this = _super.call(this, contributions.getContributions()) || this;
        _this.contributions = contributions;
        return _this;
    }
    OutlineDecoratorService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(contribution_provider_1.ContributionProvider)), __param(0, inversify_1.named(exports.OutlineTreeDecorator)),
        __metadata("design:paramtypes", [Object])
    ], OutlineDecoratorService);
    return OutlineDecoratorService;
}(tree_decorator_1.AbstractTreeDecoratorService));
exports.OutlineDecoratorService = OutlineDecoratorService;


/***/ }),

/***/ "./node_modules/@theia/outline-view/lib/browser/outline-view-contribution.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@theia/outline-view/lib/browser/outline-view-contribution.js ***!
  \***********************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineViewContribution = exports.OutlineViewCommands = exports.OUTLINE_WIDGET_FACTORY_ID = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var view_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/view-contribution */ "./node_modules/@theia/core/lib/browser/shell/view-contribution.js");
var outline_view_widget_1 = __webpack_require__(/*! ./outline-view-widget */ "./node_modules/@theia/outline-view/lib/browser/outline-view-widget.js");
var tree_1 = __webpack_require__(/*! @theia/core/lib/browser/tree */ "./node_modules/@theia/core/lib/browser/tree/index.js");
var os_1 = __webpack_require__(/*! @theia/core/lib/common/os */ "./node_modules/@theia/core/lib/common/os.js");
exports.OUTLINE_WIDGET_FACTORY_ID = 'outline-view';
/**
 * Collection of `outline-view` commands.
 */
var OutlineViewCommands;
(function (OutlineViewCommands) {
    /**
     * Command which collapses all nodes
     * from the `outline-view` tree.
     */
    OutlineViewCommands.COLLAPSE_ALL = {
        id: 'outlineView.collapse.all',
        iconClass: 'collapse-all'
    };
})(OutlineViewCommands = exports.OutlineViewCommands || (exports.OutlineViewCommands = {}));
var OutlineViewContribution = /** @class */ (function (_super) {
    __extends(OutlineViewContribution, _super);
    function OutlineViewContribution() {
        return _super.call(this, {
            widgetId: exports.OUTLINE_WIDGET_FACTORY_ID,
            widgetName: 'Outline',
            defaultWidgetOptions: {
                area: 'right',
                rank: 500
            },
            toggleCommandId: 'outlineView:toggle',
            toggleKeybinding: os_1.OS.type() !== os_1.OS.Type.Linux
                ? 'ctrlcmd+shift+i'
                : undefined
        }) || this;
    }
    OutlineViewContribution.prototype.initializeLayout = function (app) {
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
    OutlineViewContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        _super.prototype.registerCommands.call(this, commands);
        commands.registerCommand(OutlineViewCommands.COLLAPSE_ALL, {
            isEnabled: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            isVisible: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            execute: function () { return _this.collapseAllItems(); }
        });
    };
    OutlineViewContribution.prototype.registerToolbarItems = function (toolbar) {
        toolbar.registerItem({
            id: OutlineViewCommands.COLLAPSE_ALL.id,
            command: OutlineViewCommands.COLLAPSE_ALL.id,
            tooltip: 'Collapse All',
            priority: 0
        });
    };
    /**
     * Collapse all nodes in the outline view tree.
     */
    OutlineViewContribution.prototype.collapseAllItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var model, root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.widget];
                    case 1:
                        model = (_a.sent()).model;
                        root = model.root;
                        if (tree_1.CompositeTreeNode.is(root)) {
                            model.collapseAll(root);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Determine if the current widget is the `outline-view`.
     */
    OutlineViewContribution.prototype.withWidget = function (widget, cb) {
        if (widget === void 0) { widget = this.tryGetWidget(); }
        if (widget instanceof outline_view_widget_1.OutlineViewWidget && widget.id === exports.OUTLINE_WIDGET_FACTORY_ID) {
            return cb(widget);
        }
        return false;
    };
    OutlineViewContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], OutlineViewContribution);
    return OutlineViewContribution;
}(view_contribution_1.AbstractViewContribution));
exports.OutlineViewContribution = OutlineViewContribution;


/***/ }),

/***/ "./node_modules/@theia/outline-view/lib/browser/outline-view-frontend-module.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@theia/outline-view/lib/browser/outline-view-frontend-module.js ***!
  \**************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var outline_view_service_1 = __webpack_require__(/*! ./outline-view-service */ "./node_modules/@theia/outline-view/lib/browser/outline-view-service.js");
var outline_view_contribution_1 = __webpack_require__(/*! ./outline-view-contribution */ "./node_modules/@theia/outline-view/lib/browser/outline-view-contribution.js");
var widget_manager_1 = __webpack_require__(/*! @theia/core/lib/browser/widget-manager */ "./node_modules/@theia/core/lib/browser/widget-manager.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var tab_bar_toolbar_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/tab-bar-toolbar */ "./node_modules/@theia/core/lib/browser/shell/tab-bar-toolbar.js");
var outline_view_widget_1 = __webpack_require__(/*! ./outline-view-widget */ "./node_modules/@theia/outline-view/lib/browser/outline-view-widget.js");
__webpack_require__(/*! ../../src/browser/styles/index.css */ "./node_modules/@theia/outline-view/src/browser/styles/index.css");
var contribution_provider_1 = __webpack_require__(/*! @theia/core/lib/common/contribution-provider */ "./node_modules/@theia/core/lib/common/contribution-provider.js");
var outline_decorator_service_1 = __webpack_require__(/*! ./outline-decorator-service */ "./node_modules/@theia/outline-view/lib/browser/outline-decorator-service.js");
var outline_view_tree_1 = __webpack_require__(/*! ./outline-view-tree */ "./node_modules/@theia/outline-view/lib/browser/outline-view-tree.js");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(outline_view_widget_1.OutlineViewWidgetFactory).toFactory(function (ctx) {
        return function () { return createOutlineViewWidget(ctx.container); };
    });
    bind(outline_view_service_1.OutlineViewService).toSelf().inSingletonScope();
    bind(widget_manager_1.WidgetFactory).toService(outline_view_service_1.OutlineViewService);
    browser_1.bindViewContribution(bind, outline_view_contribution_1.OutlineViewContribution);
    bind(browser_1.FrontendApplicationContribution).toService(outline_view_contribution_1.OutlineViewContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(outline_view_contribution_1.OutlineViewContribution);
});
/**
 * Create an `OutlineViewWidget`.
 * - The creation of the `OutlineViewWidget` includes:
 *  - The creation of the tree widget itself with it's own customized props.
 *  - The binding of necessary components into the container.
 * @param parent the Inversify container.
 *
 * @returns the `OutlineViewWidget`.
 */
function createOutlineViewWidget(parent) {
    var child = browser_1.createTreeContainer(parent);
    child.rebind(browser_1.TreeProps).toConstantValue(__assign(__assign({}, browser_1.defaultTreeProps), { search: true }));
    child.unbind(browser_1.TreeWidget);
    child.bind(outline_view_widget_1.OutlineViewWidget).toSelf();
    child.unbind(browser_1.TreeModelImpl);
    child.bind(outline_view_tree_1.OutlineViewTreeModel).toSelf();
    child.rebind(browser_1.TreeModel).toService(outline_view_tree_1.OutlineViewTreeModel);
    child.bind(outline_decorator_service_1.OutlineDecoratorService).toSelf().inSingletonScope();
    child.rebind(browser_1.TreeDecoratorService).toDynamicValue(function (ctx) { return ctx.container.get(outline_decorator_service_1.OutlineDecoratorService); }).inSingletonScope();
    contribution_provider_1.bindContributionProvider(child, outline_decorator_service_1.OutlineTreeDecorator);
    return child.get(outline_view_widget_1.OutlineViewWidget);
}


/***/ }),

/***/ "./node_modules/@theia/outline-view/lib/browser/outline-view-service.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@theia/outline-view/lib/browser/outline-view-service.js ***!
  \******************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineViewService = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var outline_view_widget_1 = __webpack_require__(/*! ./outline-view-widget */ "./node_modules/@theia/outline-view/lib/browser/outline-view-widget.js");
var OutlineViewService = /** @class */ (function () {
    function OutlineViewService(factory) {
        this.factory = factory;
        this.id = 'outline-view';
        this.onDidChangeOutlineEmitter = new core_1.Emitter();
        this.onDidChangeOpenStateEmitter = new core_1.Emitter();
        this.onDidSelectEmitter = new core_1.Emitter();
        this.onDidOpenEmitter = new core_1.Emitter();
    }
    Object.defineProperty(OutlineViewService.prototype, "onDidSelect", {
        get: function () {
            return this.onDidSelectEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OutlineViewService.prototype, "onDidOpen", {
        get: function () {
            return this.onDidOpenEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OutlineViewService.prototype, "onDidChangeOutline", {
        get: function () {
            return this.onDidChangeOutlineEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OutlineViewService.prototype, "onDidChangeOpenState", {
        get: function () {
            return this.onDidChangeOpenStateEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OutlineViewService.prototype, "open", {
        get: function () {
            return this.widget !== undefined && this.widget.isVisible;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Publish the collection of outline view symbols.
     * - Publishing includes setting the `OutlineViewWidget` tree with symbol information.
     * @param roots the list of outline symbol information nodes.
     */
    OutlineViewService.prototype.publish = function (roots) {
        if (this.widget) {
            this.widget.setOutlineTree(roots);
            this.onDidChangeOutlineEmitter.fire(roots);
        }
    };
    OutlineViewService.prototype.createWidget = function () {
        var _this = this;
        this.widget = this.factory();
        var disposables = new core_1.DisposableCollection();
        disposables.push(this.widget.onDidChangeOpenStateEmitter.event(function (open) { return _this.onDidChangeOpenStateEmitter.fire(open); }));
        disposables.push(this.widget.model.onOpenNode(function (node) { return _this.onDidOpenEmitter.fire(node); }));
        disposables.push(this.widget.model.onSelectionChanged(function (selection) { return _this.onDidSelectEmitter.fire(selection[0]); }));
        this.widget.disposed.connect(function () {
            _this.widget = undefined;
            disposables.dispose();
        });
        return Promise.resolve(this.widget);
    };
    OutlineViewService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(outline_view_widget_1.OutlineViewWidgetFactory)),
        __metadata("design:paramtypes", [Function])
    ], OutlineViewService);
    return OutlineViewService;
}());
exports.OutlineViewService = OutlineViewService;


/***/ }),

/***/ "./node_modules/@theia/outline-view/src/browser/styles/index.css":
/*!***********************************************************************!*\
  !*** ./node_modules/@theia/outline-view/src/browser/styles/index.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../css-loader!./index.css */ "./node_modules/css-loader/index.js!./node_modules/@theia/outline-view/src/browser/styles/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/@theia/outline-view/src/browser/styles/index.css":
/*!*************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/@theia/outline-view/src/browser/styles/index.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/********************************************************************************\n * Copyright (C) 2017-2018 TypeFox and others.\n *\n * This program and the accompanying materials are made available under the\n * terms of the Eclipse Public License v. 2.0 which is available at\n * http://www.eclipse.org/legal/epl-2.0.\n *\n * This Source Code may also be made available under the following Secondary\n * Licenses when the conditions for such availability set forth in the Eclipse\n * Public License v. 2.0 are satisfied: GNU General Public License, version 2\n * with the GNU Classpath Exception which is available at\n * https://www.gnu.org/software/classpath/license.html.\n *\n * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0\n ********************************************************************************/\n\n.outline-view-tab-icon::before {\n    content: \"\\F03A\"\n}\n\n.no-outline {\n    color: var(--theia-foreground);\n    text-align: left;\n}\n\n.theia-side-panel .no-outline {\n    margin-left: 9px;\n}\n", ""]);

// exports


/***/ })

}]);
//# sourceMappingURL=71.bundle.js.map