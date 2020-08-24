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
exports.PluginDeployerEntryImpl = void 0;
var plugin_protocol_1 = require("../../common/plugin-protocol");
var fs = require("fs");
var PluginDeployerEntryImpl = /** @class */ (function () {
    function PluginDeployerEntryImpl(originId, pluginId, initPath) {
        this.originId = originId;
        this.pluginId = pluginId;
        this._type = plugin_protocol_1.PluginType.System;
        this.map = new Map();
        this.changes = [];
        this.acceptedTypes = [];
        if (initPath) {
            this.currentPath = initPath;
            this.initPath = initPath;
            this.resolved = true;
        }
        else {
            this.resolved = false;
        }
    }
    PluginDeployerEntryImpl.prototype.id = function () {
        return this.pluginId;
    };
    PluginDeployerEntryImpl.prototype.originalPath = function () {
        return this.initPath;
    };
    PluginDeployerEntryImpl.prototype.path = function () {
        return this.currentPath;
    };
    PluginDeployerEntryImpl.prototype.getValue = function (key) {
        return this.map.get(key);
    };
    PluginDeployerEntryImpl.prototype.storeValue = function (key, value) {
        this.map.set(key, value);
    };
    PluginDeployerEntryImpl.prototype.updatePath = function (newPath, transformerName) {
        if (transformerName) {
            this.changes.push(transformerName);
        }
        this.currentPath = newPath;
    };
    PluginDeployerEntryImpl.prototype.getChanges = function () {
        return this.changes;
    };
    PluginDeployerEntryImpl.prototype.isFile = function () {
        try {
            return fs.statSync(this.currentPath).isFile();
        }
        catch (e) {
            return false;
        }
    };
    PluginDeployerEntryImpl.prototype.isDirectory = function () {
        try {
            return fs.statSync(this.currentPath).isDirectory();
        }
        catch (e) {
            return false;
        }
    };
    PluginDeployerEntryImpl.prototype.hasError = function () {
        throw new Error('Method not implemented.');
    };
    PluginDeployerEntryImpl.prototype.isResolved = function () {
        return this.resolved;
    };
    PluginDeployerEntryImpl.prototype.accept = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        this.acceptedTypes = types;
    };
    PluginDeployerEntryImpl.prototype.isAccepted = function () {
        var _this = this;
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        return types.some(function (type) { return _this.acceptedTypes.indexOf(type) >= 0; });
    };
    PluginDeployerEntryImpl.prototype.setResolvedBy = function (name) {
        this.resolvedByName = name;
    };
    PluginDeployerEntryImpl.prototype.resolvedBy = function () {
        return this.resolvedByName;
    };
    Object.defineProperty(PluginDeployerEntryImpl.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginDeployerEntryImpl.prototype, "rootPath", {
        get: function () {
            return !!this._rootPath ? this._rootPath : this.path();
        },
        set: function (rootPath) {
            this._rootPath = rootPath;
        },
        enumerable: false,
        configurable: true
    });
    return PluginDeployerEntryImpl;
}());
exports.PluginDeployerEntryImpl = PluginDeployerEntryImpl;
//# sourceMappingURL=plugin-deployer-entry-impl.js.map