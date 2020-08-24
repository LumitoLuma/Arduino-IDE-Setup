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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyValueStorageProxy = exports.Memento = void 0;
var event_1 = require("@theia/core/lib/common/event");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var Memento = /** @class */ (function () {
    function Memento(pluginId, isPluginGlobalData, storage) {
        var _this = this;
        this.pluginId = pluginId;
        this.isPluginGlobalData = isPluginGlobalData;
        this.storage = storage;
        this.cache = storage.getPerPluginData(pluginId, isPluginGlobalData);
        if (!this.isPluginGlobalData) {
            this.storage.storageDataChangedEvent(function (data) {
                _this.cache = data[_this.pluginId] ? data[_this.pluginId] : {};
            });
        }
    }
    Memento.prototype.get = function (key, defaultValue) {
        if (key && this.cache.hasOwnProperty(key)) {
            return this.cache[key];
        }
        else {
            return defaultValue;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Memento.prototype.update = function (key, value) {
        this.cache[key] = value;
        return this.storage.setPerPluginData(this.pluginId, this.cache, this.isPluginGlobalData).then(function (_) { return undefined; });
    };
    return Memento;
}());
exports.Memento = Memento;
/**
 * Singleton.
 * Is used to proxy storage requests to main side.
 */
var KeyValueStorageProxy = /** @class */ (function () {
    function KeyValueStorageProxy(rpc) {
        this.storageDataChangedEmitter = new event_1.Emitter();
        this.storageDataChangedEvent = this.storageDataChangedEmitter.event;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.STORAGE_MAIN);
    }
    KeyValueStorageProxy.prototype.init = function (initGlobalData, initWorkspaceData) {
        this.globalDataCache = initGlobalData;
        this.workspaceDataCache = initWorkspaceData;
    };
    KeyValueStorageProxy.prototype.getPerPluginData = function (key, isGlobal) {
        if (isGlobal) {
            var existed = this.globalDataCache[key];
            return existed ? existed : {};
        }
        else {
            var existed = this.workspaceDataCache[key];
            return existed ? existed : {};
        }
    };
    KeyValueStorageProxy.prototype.setPerPluginData = function (key, value, isGlobal) {
        if (isGlobal) {
            this.globalDataCache[key] = value;
        }
        else {
            this.workspaceDataCache[key] = value;
        }
        return this.proxy.$set(key, value, isGlobal);
    };
    KeyValueStorageProxy.prototype.$updatePluginsWorkspaceData = function (workspaceData) {
        this.workspaceDataCache = workspaceData;
        this.storageDataChangedEmitter.fire(workspaceData);
    };
    return KeyValueStorageProxy;
}());
exports.KeyValueStorageProxy = KeyValueStorageProxy;
//# sourceMappingURL=plugin-storage.js.map