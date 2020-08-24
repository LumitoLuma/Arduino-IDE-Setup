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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostedPluginWatcher = void 0;
var inversify_1 = require("inversify");
var event_1 = require("@theia/core/lib/common/event");
var HostedPluginWatcher = /** @class */ (function () {
    function HostedPluginWatcher() {
        this.onPostMessage = new event_1.Emitter();
        this.onLogMessage = new event_1.Emitter();
        this.onDidDeployEmitter = new event_1.Emitter();
        this.onDidDeploy = this.onDidDeployEmitter.event;
    }
    HostedPluginWatcher.prototype.getHostedPluginClient = function () {
        var _this = this;
        var messageEmitter = this.onPostMessage;
        var logEmitter = this.onLogMessage;
        return {
            postMessage: function (message) {
                messageEmitter.fire(JSON.parse(message));
                return Promise.resolve();
            },
            log: function (logPart) {
                logEmitter.fire(logPart);
                return Promise.resolve();
            },
            onDidDeploy: function () { return _this.onDidDeployEmitter.fire(undefined); }
        };
    };
    Object.defineProperty(HostedPluginWatcher.prototype, "onPostMessageEvent", {
        get: function () {
            return this.onPostMessage.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HostedPluginWatcher.prototype, "onLogMessageEvent", {
        get: function () {
            return this.onLogMessage.event;
        },
        enumerable: false,
        configurable: true
    });
    HostedPluginWatcher = __decorate([
        inversify_1.injectable()
    ], HostedPluginWatcher);
    return HostedPluginWatcher;
}());
exports.HostedPluginWatcher = HostedPluginWatcher;
//# sourceMappingURL=hosted-plugin-watcher.js.map