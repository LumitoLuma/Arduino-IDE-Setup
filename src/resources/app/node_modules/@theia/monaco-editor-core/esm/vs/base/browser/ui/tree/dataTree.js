/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
import { AbstractTree } from './abstractTree';
import { TreeError } from './tree';
import { ObjectTreeModel } from './objectTreeModel';
import { Iterator } from '../../../common/iterator';
var DataTree = /** @class */ (function (_super) {
    __extends(DataTree, _super);
    function DataTree(user, container, delegate, renderers, dataSource, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, user, container, delegate, renderers, options) || this;
        _this.user = user;
        _this.dataSource = dataSource;
        _this.nodesByIdentity = new Map();
        _this.identityProvider = options.identityProvider;
        return _this;
    }
    // Model
    DataTree.prototype.getInput = function () {
        return this.input;
    };
    DataTree.prototype.setInput = function (input, viewState) {
        var _this = this;
        if (viewState && !this.identityProvider) {
            throw new TreeError(this.user, 'Can\'t restore tree view state without an identity provider');
        }
        this.input = input;
        if (!viewState) {
            this._refresh(input);
            return;
        }
        var focus = [];
        var selection = [];
        var isCollapsed = function (element) {
            var id = _this.identityProvider.getId(element).toString();
            return viewState.expanded.indexOf(id) === -1;
        };
        var onDidCreateNode = function (node) {
            var id = _this.identityProvider.getId(node.element).toString();
            if (viewState.focus.indexOf(id) > -1) {
                focus.push(node.element);
            }
            if (viewState.selection.indexOf(id) > -1) {
                selection.push(node.element);
            }
        };
        this._refresh(input, isCollapsed, onDidCreateNode);
        this.setFocus(focus);
        this.setSelection(selection);
        if (viewState && typeof viewState.scrollTop === 'number') {
            this.scrollTop = viewState.scrollTop;
        }
    };
    DataTree.prototype.updateChildren = function (element) {
        var _this = this;
        if (element === void 0) { element = this.input; }
        if (typeof this.input === 'undefined') {
            throw new TreeError(this.user, 'Tree input not set');
        }
        var isCollapsed;
        if (this.identityProvider) {
            isCollapsed = function (element) {
                var id = _this.identityProvider.getId(element).toString();
                var node = _this.nodesByIdentity.get(id);
                if (!node) {
                    return undefined;
                }
                return node.collapsed;
            };
        }
        this._refresh(element, isCollapsed);
    };
    DataTree.prototype.resort = function (element, recursive) {
        if (element === void 0) { element = this.input; }
        if (recursive === void 0) { recursive = true; }
        this.model.resort((element === this.input ? null : element), recursive);
    };
    // View
    DataTree.prototype.refresh = function (element) {
        if (element === undefined) {
            this.view.rerender();
            return;
        }
        this.model.rerender(element);
    };
    // Implementation
    DataTree.prototype._refresh = function (element, isCollapsed, onDidCreateNode) {
        var _this = this;
        var onDidDeleteNode;
        if (this.identityProvider) {
            var insertedElements_1 = new Set();
            var outerOnDidCreateNode_1 = onDidCreateNode;
            onDidCreateNode = function (node) {
                var id = _this.identityProvider.getId(node.element).toString();
                insertedElements_1.add(id);
                _this.nodesByIdentity.set(id, node);
                if (outerOnDidCreateNode_1) {
                    outerOnDidCreateNode_1(node);
                }
            };
            onDidDeleteNode = function (node) {
                var id = _this.identityProvider.getId(node.element).toString();
                if (!insertedElements_1.has(id)) {
                    _this.nodesByIdentity.delete(id);
                }
            };
        }
        this.model.setChildren((element === this.input ? null : element), this.iterate(element, isCollapsed).elements, onDidCreateNode, onDidDeleteNode);
    };
    DataTree.prototype.iterate = function (element, isCollapsed) {
        var _this = this;
        var children = this.dataSource.getChildren(element);
        var elements = Iterator.map(Iterator.fromArray(children), function (element) {
            var _a = _this.iterate(element, isCollapsed), children = _a.elements, size = _a.size;
            var collapsible = _this.dataSource.hasChildren ? _this.dataSource.hasChildren(element) : undefined;
            var collapsed = size === 0 ? undefined : (isCollapsed && isCollapsed(element));
            return { element: element, children: children, collapsible: collapsible, collapsed: collapsed };
        });
        return { elements: elements, size: children.length };
    };
    DataTree.prototype.createModel = function (user, view, options) {
        return new ObjectTreeModel(user, view, options);
    };
    // view state
    DataTree.prototype.getViewState = function () {
        var _this = this;
        if (!this.identityProvider) {
            throw new TreeError(this.user, 'Can\'t get tree view state without an identity provider');
        }
        var getId = function (element) { return _this.identityProvider.getId(element).toString(); };
        var focus = this.getFocus().map(getId);
        var selection = this.getSelection().map(getId);
        var expanded = [];
        var root = this.model.getNode();
        var queue = [root];
        while (queue.length > 0) {
            var node = queue.shift();
            if (node !== root && node.collapsible && !node.collapsed) {
                expanded.push(getId(node.element));
            }
            queue.push.apply(queue, node.children);
        }
        return { focus: focus, selection: selection, expanded: expanded, scrollTop: this.scrollTop };
    };
    return DataTree;
}(AbstractTree));
export { DataTree };
