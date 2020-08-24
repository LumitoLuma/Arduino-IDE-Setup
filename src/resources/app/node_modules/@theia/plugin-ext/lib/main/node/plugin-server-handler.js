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
exports.PluginServerHandler = void 0;
var inversify_1 = require("inversify");
var plugin_deployer_impl_1 = require("./plugin-deployer-impl");
var plugins_key_value_storage_1 = require("./plugins-key-value-storage");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var PluginServerHandler = /** @class */ (function () {
    function PluginServerHandler() {
    }
    PluginServerHandler.prototype.deploy = function (pluginEntry, arg2) {
        var type = typeof arg2 === 'number' ? arg2 : undefined;
        return this.doDeploy(pluginEntry, type);
    };
    PluginServerHandler.prototype.doDeploy = function (pluginEntry, type) {
        if (type === void 0) { type = plugin_protocol_1.PluginType.User; }
        return this.pluginDeployer.deploy(pluginEntry, type);
    };
    PluginServerHandler.prototype.undeploy = function (pluginId) {
        return this.pluginDeployer.undeploy(pluginId);
    };
    PluginServerHandler.prototype.setStorageValue = function (key, value, kind) {
        return this.pluginsKeyValueStorage.set(key, value, kind);
    };
    PluginServerHandler.prototype.getStorageValue = function (key, kind) {
        return this.pluginsKeyValueStorage.get(key, kind);
    };
    PluginServerHandler.prototype.getAllStorageValues = function (kind) {
        return this.pluginsKeyValueStorage.getAll(kind);
    };
    __decorate([
        inversify_1.inject(plugin_protocol_1.PluginDeployer),
        __metadata("design:type", plugin_deployer_impl_1.PluginDeployerImpl)
    ], PluginServerHandler.prototype, "pluginDeployer", void 0);
    __decorate([
        inversify_1.inject(plugins_key_value_storage_1.PluginsKeyValueStorage),
        __metadata("design:type", plugins_key_value_storage_1.PluginsKeyValueStorage)
    ], PluginServerHandler.prototype, "pluginsKeyValueStorage", void 0);
    PluginServerHandler = __decorate([
        inversify_1.injectable()
    ], PluginServerHandler);
    return PluginServerHandler;
}());
exports.PluginServerHandler = PluginServerHandler;
//# sourceMappingURL=plugin-server-handler.js.map