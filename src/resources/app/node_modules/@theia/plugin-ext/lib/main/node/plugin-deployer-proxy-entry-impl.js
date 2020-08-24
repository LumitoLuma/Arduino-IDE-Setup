"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyPluginDeployerEntry = void 0;
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
var inversify_1 = require("inversify");
var plugin_deployer_entry_impl_1 = require("./plugin-deployer-entry-impl");
/**
 * Proxify call to plugin deployer entry by adding the deployer name as part of the updating path
 */
var ProxyPluginDeployerEntry = /** @class */ (function () {
    function ProxyPluginDeployerEntry(deployer, delegate) {
        this.deployer = deployer;
        this.delegate = delegate;
        this.deployerName = this.deployer.constructor.name;
    }
    ProxyPluginDeployerEntry.prototype.id = function () {
        return this.delegate.id();
    };
    ProxyPluginDeployerEntry.prototype.originalPath = function () {
        return this.delegate.originalPath();
    };
    ProxyPluginDeployerEntry.prototype.path = function () {
        return this.delegate.path();
    };
    ProxyPluginDeployerEntry.prototype.getValue = function (key) {
        return this.delegate.getValue(key);
    };
    ProxyPluginDeployerEntry.prototype.storeValue = function (key, value) {
        this.delegate.storeValue(key, value);
    };
    ProxyPluginDeployerEntry.prototype.updatePath = function (newPath) {
        this.delegate.updatePath(newPath, this.deployerName);
    };
    ProxyPluginDeployerEntry.prototype.getChanges = function () {
        return this.delegate.getChanges();
    };
    ProxyPluginDeployerEntry.prototype.isFile = function () {
        return this.delegate.isFile();
    };
    ProxyPluginDeployerEntry.prototype.isDirectory = function () {
        return this.delegate.isDirectory();
    };
    ProxyPluginDeployerEntry.prototype.isResolved = function () {
        return this.delegate.isResolved();
    };
    ProxyPluginDeployerEntry.prototype.isAccepted = function () {
        var _a;
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        return (_a = this.delegate).isAccepted.apply(_a, __spread(types));
    };
    ProxyPluginDeployerEntry.prototype.accept = function () {
        var _a;
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        (_a = this.delegate).accept.apply(_a, __spread(types));
    };
    ProxyPluginDeployerEntry.prototype.hasError = function () {
        return this.delegate.hasError();
    };
    ProxyPluginDeployerEntry.prototype.resolvedBy = function () {
        return this.delegate.resolvedBy();
    };
    Object.defineProperty(ProxyPluginDeployerEntry.prototype, "type", {
        get: function () {
            return this.delegate.type;
        },
        set: function (type) {
            this.delegate.type = type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProxyPluginDeployerEntry.prototype, "rootPath", {
        get: function () {
            return this.delegate.rootPath;
        },
        set: function (rootPath) {
            this.delegate.rootPath = rootPath;
        },
        enumerable: false,
        configurable: true
    });
    ProxyPluginDeployerEntry = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [Object, plugin_deployer_entry_impl_1.PluginDeployerEntryImpl])
    ], ProxyPluginDeployerEntry);
    return ProxyPluginDeployerEntry;
}());
exports.ProxyPluginDeployerEntry = ProxyPluginDeployerEntry;
//# sourceMappingURL=plugin-deployer-proxy-entry-impl.js.map