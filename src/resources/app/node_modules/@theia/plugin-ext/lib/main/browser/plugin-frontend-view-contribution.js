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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginFrontendViewContribution = void 0;
var inversify_1 = require("inversify");
var view_contribution_1 = require("@theia/core/lib/browser/shell/view-contribution");
var PluginFrontendViewContribution = /** @class */ (function (_super) {
    __extends(PluginFrontendViewContribution, _super);
    function PluginFrontendViewContribution() {
        return _super.call(this, {
            widgetId: PluginFrontendViewContribution_1.PLUGINS_WIDGET_FACTORY_ID,
            widgetName: 'Plugins',
            defaultWidgetOptions: {
                area: 'left',
                rank: 400
            },
            toggleCommandId: 'pluginsView:toggle',
            toggleKeybinding: 'ctrlcmd+shift+l'
        }) || this;
    }
    PluginFrontendViewContribution_1 = PluginFrontendViewContribution;
    var PluginFrontendViewContribution_1;
    PluginFrontendViewContribution.PLUGINS_WIDGET_FACTORY_ID = 'plugins';
    PluginFrontendViewContribution = PluginFrontendViewContribution_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], PluginFrontendViewContribution);
    return PluginFrontendViewContribution;
}(view_contribution_1.AbstractViewContribution));
exports.PluginFrontendViewContribution = PluginFrontendViewContribution;
//# sourceMappingURL=plugin-frontend-view-contribution.js.map