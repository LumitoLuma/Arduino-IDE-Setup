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
export var TreeMouseEventTarget;
(function (TreeMouseEventTarget) {
    TreeMouseEventTarget[TreeMouseEventTarget["Unknown"] = 0] = "Unknown";
    TreeMouseEventTarget[TreeMouseEventTarget["Twistie"] = 1] = "Twistie";
    TreeMouseEventTarget[TreeMouseEventTarget["Element"] = 2] = "Element";
})(TreeMouseEventTarget || (TreeMouseEventTarget = {}));
export var TreeDragOverReactions = {
    acceptBubbleUp: function () { return { accept: true, bubble: 1 /* Up */ }; },
    acceptBubbleDown: function (autoExpand) {
        if (autoExpand === void 0) { autoExpand = false; }
        return { accept: true, bubble: 0 /* Down */, autoExpand: autoExpand };
    },
    acceptCopyBubbleUp: function () { return { accept: true, bubble: 1 /* Up */, effect: 0 /* Copy */ }; },
    acceptCopyBubbleDown: function (autoExpand) {
        if (autoExpand === void 0) { autoExpand = false; }
        return { accept: true, bubble: 0 /* Down */, effect: 0 /* Copy */, autoExpand: autoExpand };
    }
};
var TreeError = /** @class */ (function (_super) {
    __extends(TreeError, _super);
    function TreeError(user, message) {
        return _super.call(this, "TreeError [" + user + "] " + message) || this;
    }
    return TreeError;
}(Error));
export { TreeError };
var WeakMapper = /** @class */ (function () {
    function WeakMapper(fn) {
        this.fn = fn;
        this._map = new WeakMap();
    }
    WeakMapper.prototype.map = function (key) {
        var result = this._map.get(key);
        if (!result) {
            result = this.fn(key);
            this._map.set(key, result);
        }
        return result;
    };
    return WeakMapper;
}());
export { WeakMapper };
