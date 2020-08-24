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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickTitleButtonSide = exports.QuickOpenGroupItem = exports.QuickOpenItem = exports.QuickOpenMode = void 0;
var QuickOpenMode;
(function (QuickOpenMode) {
    QuickOpenMode[QuickOpenMode["PREVIEW"] = 0] = "PREVIEW";
    QuickOpenMode[QuickOpenMode["OPEN"] = 1] = "OPEN";
    QuickOpenMode[QuickOpenMode["OPEN_IN_BACKGROUND"] = 2] = "OPEN_IN_BACKGROUND";
})(QuickOpenMode = exports.QuickOpenMode || (exports.QuickOpenMode = {}));
var QuickOpenItem = /** @class */ (function () {
    function QuickOpenItem(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
    }
    QuickOpenItem.prototype.getTooltip = function () {
        return this.options.tooltip || this.getLabel();
    };
    QuickOpenItem.prototype.getLabel = function () {
        return this.options.label;
    };
    QuickOpenItem.prototype.getLabelHighlights = function () {
        return this.options.labelHighlights || [];
    };
    QuickOpenItem.prototype.getDescription = function () {
        return this.options.description;
    };
    QuickOpenItem.prototype.getDescriptionHighlights = function () {
        return this.options.descriptionHighlights;
    };
    QuickOpenItem.prototype.getDetail = function () {
        return this.options.detail;
    };
    QuickOpenItem.prototype.getDetailHighlights = function () {
        return this.options.detailHighlights;
    };
    QuickOpenItem.prototype.isHidden = function () {
        return this.options.hidden || false;
    };
    QuickOpenItem.prototype.getUri = function () {
        return this.options.uri;
    };
    QuickOpenItem.prototype.getIconClass = function () {
        return this.options.iconClass;
    };
    QuickOpenItem.prototype.getKeybinding = function () {
        return this.options.keybinding;
    };
    QuickOpenItem.prototype.run = function (mode) {
        if (!this.options.run) {
            return false;
        }
        return this.options.run(mode);
    };
    return QuickOpenItem;
}());
exports.QuickOpenItem = QuickOpenItem;
var QuickOpenGroupItem = /** @class */ (function (_super) {
    __extends(QuickOpenGroupItem, _super);
    function QuickOpenGroupItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuickOpenGroupItem.prototype.getGroupLabel = function () {
        return this.options.groupLabel;
    };
    QuickOpenGroupItem.prototype.showBorder = function () {
        return this.options.showBorder || false;
    };
    return QuickOpenGroupItem;
}(QuickOpenItem));
exports.QuickOpenGroupItem = QuickOpenGroupItem;
var QuickTitleButtonSide;
(function (QuickTitleButtonSide) {
    QuickTitleButtonSide[QuickTitleButtonSide["LEFT"] = 0] = "LEFT";
    QuickTitleButtonSide[QuickTitleButtonSide["RIGHT"] = 1] = "RIGHT";
})(QuickTitleButtonSide = exports.QuickTitleButtonSide || (exports.QuickTitleButtonSide = {}));
//# sourceMappingURL=quick-open-model.js.map