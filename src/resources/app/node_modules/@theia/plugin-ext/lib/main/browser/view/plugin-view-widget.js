"use strict";
/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
exports.PluginViewWidget = exports.PluginViewWidgetIdentifier = void 0;
var inversify_1 = require("inversify");
var widgets_1 = require("@phosphor/widgets");
var menu_1 = require("@theia/core/lib/common/menu");
var command_1 = require("@theia/core/lib/common/command");
var view_context_key_service_1 = require("./view-context-key-service");
var tree_view_widget_1 = require("./tree-view-widget");
var PluginViewWidgetIdentifier = /** @class */ (function () {
    function PluginViewWidgetIdentifier() {
    }
    PluginViewWidgetIdentifier = __decorate([
        inversify_1.injectable()
    ], PluginViewWidgetIdentifier);
    return PluginViewWidgetIdentifier;
}());
exports.PluginViewWidgetIdentifier = PluginViewWidgetIdentifier;
var PluginViewWidget = /** @class */ (function (_super) {
    __extends(PluginViewWidget, _super);
    function PluginViewWidget() {
        var _this = _super.call(this) || this;
        _this._suppressUpdateViewVisibility = false;
        _this.updatingViewVisibility = false;
        _this.node.tabIndex = -1;
        _this.node.style.height = '100%';
        return _this;
    }
    PluginViewWidget.prototype.init = function () {
        this.id = this.options.id;
    };
    PluginViewWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        var widget = this.widgets[0];
        if (widget) {
            widget.activate();
            this.updateWidgetMessage();
        }
        else {
            this.node.focus();
        }
    };
    PluginViewWidget.prototype.storeState = function () {
        return {
            label: this.title.label,
            message: this.message,
            widgets: this.widgets
        };
    };
    PluginViewWidget.prototype.restoreState = function (state) {
        var e_1, _a;
        this.title.label = state.label;
        this.message = state.message;
        try {
            for (var _b = __values(state.widgets), _c = _b.next(); !_c.done; _c = _b.next()) {
                var widget = _c.value;
                this.addWidget(widget);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Object.defineProperty(PluginViewWidget.prototype, "suppressUpdateViewVisibility", {
        set: function (suppressUpdateViewVisibility) {
            this._suppressUpdateViewVisibility = !this.updatingViewVisibility && suppressUpdateViewVisibility;
        },
        enumerable: false,
        configurable: true
    });
    PluginViewWidget.prototype.updateViewVisibility = function (cb) {
        if (this._suppressUpdateViewVisibility) {
            return;
        }
        try {
            this.updatingViewVisibility = true;
            cb();
        }
        finally {
            this.updatingViewVisibility = false;
        }
    };
    Object.defineProperty(PluginViewWidget.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (message) {
            this._message = message;
            this.updateWidgetMessage();
        },
        enumerable: false,
        configurable: true
    });
    PluginViewWidget.prototype.updateWidgetMessage = function () {
        var widget = this.widgets[0];
        if (widget) {
            if (widget instanceof tree_view_widget_1.TreeViewWidget) {
                widget.message = this._message;
            }
        }
    };
    PluginViewWidget.prototype.addWidget = function (widget) {
        _super.prototype.addWidget.call(this, widget);
        this.updateWidgetMessage();
    };
    PluginViewWidget.prototype.insertWidget = function (index, widget) {
        _super.prototype.insertWidget.call(this, index, widget);
        this.updateWidgetMessage();
    };
    __decorate([
        inversify_1.inject(menu_1.MenuModelRegistry),
        __metadata("design:type", menu_1.MenuModelRegistry)
    ], PluginViewWidget.prototype, "menus", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandRegistry),
        __metadata("design:type", command_1.CommandRegistry)
    ], PluginViewWidget.prototype, "commands", void 0);
    __decorate([
        inversify_1.inject(view_context_key_service_1.ViewContextKeyService),
        __metadata("design:type", view_context_key_service_1.ViewContextKeyService)
    ], PluginViewWidget.prototype, "contextKeys", void 0);
    __decorate([
        inversify_1.inject(PluginViewWidgetIdentifier),
        __metadata("design:type", PluginViewWidgetIdentifier)
    ], PluginViewWidget.prototype, "options", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PluginViewWidget.prototype, "init", null);
    PluginViewWidget = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], PluginViewWidget);
    return PluginViewWidget;
}(widgets_1.Panel));
exports.PluginViewWidget = PluginViewWidget;
//# sourceMappingURL=plugin-view-widget.js.map