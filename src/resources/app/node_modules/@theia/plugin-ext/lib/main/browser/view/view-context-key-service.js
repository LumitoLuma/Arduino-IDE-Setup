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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewContextKeyService = void 0;
var inversify_1 = require("inversify");
var context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
var ViewContextKeyService = /** @class */ (function () {
    function ViewContextKeyService() {
    }
    Object.defineProperty(ViewContextKeyService.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewContextKeyService.prototype, "viewItem", {
        get: function () {
            return this._viewItem;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewContextKeyService.prototype, "activeViewlet", {
        /**
         * Viewlet is a tab in the left area in VS Code. Active means visible in this context.
         *
         * In VS Code there can be only one visible viewlet at any time.
         * It is not true for Theia, since views can be layed-out again to different areas.
         * So only last visible view will be an active viewlet.
         */
        get: function () {
            return this._activeViewlet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewContextKeyService.prototype, "activePanel", {
        /**
         * Panel is a tab in the bottom area in VS Code. Active means visible in this context.
         *
         * In VS Code there can be only one visible panel at any time.
         * It is not true for Theia, since views can be layed-out again to different areas.
         * So only last visible view will be an active panel.
         */
        get: function () {
            return this._activePanel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewContextKeyService.prototype, "focusedView", {
        get: function () {
            return this._focusedView;
        },
        enumerable: false,
        configurable: true
    });
    ViewContextKeyService.prototype.init = function () {
        this._view = this.contextKeyService.createKey('view', '');
        this._viewItem = this.contextKeyService.createKey('viewItem', '');
        this._activeViewlet = this.contextKeyService.createKey('activeViewlet', '');
        this._activePanel = this.contextKeyService.createKey('activePanel', '');
        this._focusedView = this.contextKeyService.createKey('focusedView', '');
    };
    ViewContextKeyService.prototype.match = function (expression) {
        return !expression || this.contextKeyService.match(expression);
    };
    ViewContextKeyService.prototype.with = function (input, cb) {
        var view = this.view.get();
        var viewItem = this.viewItem.get();
        this.view.set(input.view);
        this.viewItem.set(input.viewItem);
        try {
            return cb();
        }
        finally {
            this.view.set(view);
            this.viewItem.set(viewItem);
        }
    };
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], ViewContextKeyService.prototype, "contextKeyService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ViewContextKeyService.prototype, "init", null);
    ViewContextKeyService = __decorate([
        inversify_1.injectable()
    ], ViewContextKeyService);
    return ViewContextKeyService;
}());
exports.ViewContextKeyService = ViewContextKeyService;
//# sourceMappingURL=view-context-key-service.js.map