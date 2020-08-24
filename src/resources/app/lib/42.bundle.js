(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ "./node_modules/@theia/outline-view/lib/browser/outline-view-tree.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@theia/outline-view/lib/browser/outline-view-tree.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
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
exports.OutlineViewTreeModel = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var OutlineViewTreeModel = /** @class */ (function (_super) {
    __extends(OutlineViewTreeModel, _super);
    function OutlineViewTreeModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Handle the expansion of the tree node.
     * - The method is a no-op in order to preserve focus on the editor
     * after attempting to perform a `collapse-all`.
     * @param node the expandable tree node.
     */
    OutlineViewTreeModel.prototype.handleExpansion = function (node) {
        // no-op
    };
    OutlineViewTreeModel.prototype.collapseAll = function (raw) {
        return __awaiter(this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                node = raw || this.selectedNodes[0];
                if (browser_1.CompositeTreeNode.is(node)) {
                    return [2 /*return*/, this.expansionService.collapseAll(node)];
                }
                return [2 /*return*/, false];
            });
        });
    };
    __decorate([
        inversify_1.inject(browser_1.TreeExpansionService),
        __metadata("design:type", Object)
    ], OutlineViewTreeModel.prototype, "expansionService", void 0);
    OutlineViewTreeModel = __decorate([
        inversify_1.injectable()
    ], OutlineViewTreeModel);
    return OutlineViewTreeModel;
}(browser_1.TreeModelImpl));
exports.OutlineViewTreeModel = OutlineViewTreeModel;


/***/ }),

/***/ "./node_modules/@theia/outline-view/lib/browser/outline-view-widget.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@theia/outline-view/lib/browser/outline-view-widget.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2017-2018 TypeFox and others.
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineViewWidget = exports.OutlineViewWidgetFactory = exports.OutlineSymbolInformationNode = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var outline_view_tree_1 = __webpack_require__(/*! ./outline-view-tree */ "./node_modules/@theia/outline-view/lib/browser/outline-view-tree.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var browser_2 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/**
 * Collection of outline symbol information node functions.
 */
var OutlineSymbolInformationNode;
(function (OutlineSymbolInformationNode) {
    /**
     * Determine if the given tree node is an `OutlineSymbolInformationNode`.
     * - The tree node is an `OutlineSymbolInformationNode` if:
     *  - The node exists.
     *  - The node is selectable.
     *  - The node contains a defined `iconClass` property.
     * @param node the tree node.
     *
     * @returns `true` if the given node is an `OutlineSymbolInformationNode`.
     */
    function is(node) {
        return !!node && browser_1.SelectableTreeNode.is(node) && 'iconClass' in node;
    }
    OutlineSymbolInformationNode.is = is;
})(OutlineSymbolInformationNode = exports.OutlineSymbolInformationNode || (exports.OutlineSymbolInformationNode = {}));
exports.OutlineViewWidgetFactory = Symbol('OutlineViewWidgetFactory');
var OutlineViewWidget = /** @class */ (function (_super) {
    __extends(OutlineViewWidget, _super);
    function OutlineViewWidget(treeProps, model, contextMenuRenderer) {
        var _this = _super.call(this, treeProps, model, contextMenuRenderer) || this;
        _this.treeProps = treeProps;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this.onDidChangeOpenStateEmitter = new core_1.Emitter();
        _this.id = 'outline-view';
        _this.title.label = 'Outline';
        _this.title.caption = 'Outline';
        _this.title.closable = true;
        _this.title.iconClass = 'fa outline-view-tab-icon';
        _this.addClass('theia-outline-view');
        return _this;
    }
    /**
     * Set the outline tree with the list of `OutlineSymbolInformationNode`.
     * @param roots the list of `OutlineSymbolInformationNode`.
     */
    OutlineViewWidget.prototype.setOutlineTree = function (roots) {
        // Gather the list of available nodes.
        var nodes = this.reconcileTreeState(roots);
        // Update the model root node, appending the outline symbol information nodes as children.
        this.model.root = {
            id: 'outline-view-root',
            name: 'Outline Root',
            visible: false,
            children: nodes,
            parent: undefined
        };
    };
    /**
     * Reconcile the outline tree state, gathering all available nodes.
     * @param nodes the list of `TreeNode`.
     *
     * @returns the list of tree nodes.
     */
    OutlineViewWidget.prototype.reconcileTreeState = function (nodes) {
        var _this = this;
        nodes.forEach(function (node) {
            if (OutlineSymbolInformationNode.is(node)) {
                var treeNode = _this.model.getNode(node.id);
                if (treeNode && OutlineSymbolInformationNode.is(treeNode)) {
                    treeNode.expanded = node.expanded;
                    treeNode.selected = node.selected;
                }
                _this.reconcileTreeState(Array.from(node.children));
            }
        });
        return nodes;
    };
    OutlineViewWidget.prototype.onAfterHide = function (msg) {
        _super.prototype.onAfterHide.call(this, msg);
        this.onDidChangeOpenStateEmitter.fire(false);
    };
    OutlineViewWidget.prototype.onAfterShow = function (msg) {
        _super.prototype.onAfterShow.call(this, msg);
        this.onDidChangeOpenStateEmitter.fire(true);
    };
    OutlineViewWidget.prototype.renderIcon = function (node, props) {
        if (OutlineSymbolInformationNode.is(node)) {
            return React.createElement("div", { className: 'symbol-icon symbol-icon-center ' + node.iconClass });
        }
        return undefined;
    };
    OutlineViewWidget.prototype.createNodeAttributes = function (node, props) {
        var elementAttrs = _super.prototype.createNodeAttributes.call(this, node, props);
        return __assign(__assign({}, elementAttrs), { title: this.getNodeTooltip(node) });
    };
    /**
     * Get the tooltip for the given tree node.
     * - The tooltip is discovered when hovering over a tree node.
     * - If available, the tooltip is the concatenation of the node name, and it's type.
     * @param node the tree node.
     *
     * @returns the tooltip for the tree node if available, else `undefined`.
     */
    OutlineViewWidget.prototype.getNodeTooltip = function (node) {
        if (OutlineSymbolInformationNode.is(node)) {
            return node.name + (" (" + node.iconClass + ")");
        }
        return undefined;
    };
    OutlineViewWidget.prototype.isExpandable = function (node) {
        return OutlineSymbolInformationNode.is(node) && node.children.length > 0;
    };
    OutlineViewWidget.prototype.renderTree = function (model) {
        if (browser_2.CompositeTreeNode.is(this.model.root) && !this.model.root.children.length) {
            return React.createElement("div", { className: 'theia-widget-noInfo no-outline' }, "No outline information available.");
        }
        return _super.prototype.renderTree.call(this, model);
    };
    OutlineViewWidget = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.TreeProps)),
        __param(1, inversify_1.inject(outline_view_tree_1.OutlineViewTreeModel)),
        __param(2, inversify_1.inject(browser_1.ContextMenuRenderer)),
        __metadata("design:paramtypes", [Object, outline_view_tree_1.OutlineViewTreeModel,
            browser_1.ContextMenuRenderer])
    ], OutlineViewWidget);
    return OutlineViewWidget;
}(browser_1.TreeWidget));
exports.OutlineViewWidget = OutlineViewWidget;


/***/ })

}]);
//# sourceMappingURL=42.bundle.js.map