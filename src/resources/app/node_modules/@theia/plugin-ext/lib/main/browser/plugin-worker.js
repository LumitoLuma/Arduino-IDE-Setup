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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginWorker = void 0;
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
var event_1 = require("@theia/core/lib/common/event");
var rpc_protocol_1 = require("../../common/rpc-protocol");
var PluginWorker = /** @class */ (function () {
    function PluginWorker() {
        var _this = this;
        var emitter = new event_1.Emitter();
        this.worker = new (require('../../hosted/browser/worker/worker-main'));
        this.worker.onmessage = function (message) {
            emitter.fire(message.data);
        };
        this.worker.onerror = function (e) { return console.error(e); };
        this.rpc = new rpc_protocol_1.RPCProtocolImpl({
            onMessage: emitter.event,
            send: function (m) {
                _this.worker.postMessage(m);
            }
        });
    }
    PluginWorker = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], PluginWorker);
    return PluginWorker;
}());
exports.PluginWorker = PluginWorker;
//# sourceMappingURL=plugin-worker.js.map