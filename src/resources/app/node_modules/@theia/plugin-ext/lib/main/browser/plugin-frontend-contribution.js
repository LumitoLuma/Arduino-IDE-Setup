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
exports.PluginApiFrontendContribution = void 0;
var inversify_1 = require("inversify");
var plugin_ext_deploy_command_1 = require("./plugin-ext-deploy-command");
var commands_1 = require("./commands");
var PluginApiFrontendContribution = /** @class */ (function () {
    function PluginApiFrontendContribution() {
    }
    PluginApiFrontendContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(plugin_ext_deploy_command_1.PluginExtDeployCommandService.COMMAND, {
            execute: function () { return _this.pluginExtDeployCommandService.deploy(); }
        });
        commands.registerCommand(commands_1.OpenUriCommandHandler.COMMAND_METADATA, {
            execute: function (arg) { return _this.openUriCommandHandler.execute(arg); },
            isVisible: function () { return false; }
        });
    };
    __decorate([
        inversify_1.inject(plugin_ext_deploy_command_1.PluginExtDeployCommandService),
        __metadata("design:type", plugin_ext_deploy_command_1.PluginExtDeployCommandService)
    ], PluginApiFrontendContribution.prototype, "pluginExtDeployCommandService", void 0);
    __decorate([
        inversify_1.inject(commands_1.OpenUriCommandHandler),
        __metadata("design:type", commands_1.OpenUriCommandHandler)
    ], PluginApiFrontendContribution.prototype, "openUriCommandHandler", void 0);
    PluginApiFrontendContribution = __decorate([
        inversify_1.injectable()
    ], PluginApiFrontendContribution);
    return PluginApiFrontendContribution;
}());
exports.PluginApiFrontendContribution = PluginApiFrontendContribution;
//# sourceMappingURL=plugin-frontend-contribution.js.map