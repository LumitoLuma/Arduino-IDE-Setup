"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
exports.TerminalBackendContribution = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var node_1 = require("@theia/process/lib/node");
var terminal_protocol_1 = require("../common/terminal-protocol");
var TerminalBackendContribution = /** @class */ (function () {
    function TerminalBackendContribution() {
    }
    TerminalBackendContribution.prototype.configure = function (service) {
        var _this = this;
        service.listen(terminal_protocol_1.terminalsPath + "/:id", function (params, connection) {
            var id = parseInt(params.id, 10);
            var termProcess = _this.processManager.get(id);
            if (termProcess instanceof node_1.TerminalProcess) {
                var output_1 = termProcess.createOutputStream();
                output_1.on('data', function (data) { return connection.sendNotification('onData', data.toString()); });
                connection.onRequest('write', function (data) { return termProcess.write(data); });
                connection.onClose(function () { return output_1.dispose(); });
                connection.listen();
            }
            else {
                connection.dispose();
            }
        });
    };
    __decorate([
        inversify_1.inject(node_1.ProcessManager),
        __metadata("design:type", node_1.ProcessManager)
    ], TerminalBackendContribution.prototype, "processManager", void 0);
    __decorate([
        inversify_1.inject(common_1.ILogger),
        inversify_1.named('terminal'),
        __metadata("design:type", Object)
    ], TerminalBackendContribution.prototype, "logger", void 0);
    TerminalBackendContribution = __decorate([
        inversify_1.injectable()
    ], TerminalBackendContribution);
    return TerminalBackendContribution;
}());
exports.TerminalBackendContribution = TerminalBackendContribution;
//# sourceMappingURL=terminal-backend-contribution.js.map