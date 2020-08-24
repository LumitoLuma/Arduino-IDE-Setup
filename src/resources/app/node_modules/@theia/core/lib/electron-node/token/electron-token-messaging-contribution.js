"use strict";
/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
exports.ElectronMessagingContribution = void 0;
var inversify_1 = require("inversify");
var messaging_contribution_1 = require("../../node/messaging/messaging-contribution");
var electron_token_validator_1 = require("./electron-token-validator");
/**
 * Override the browser MessagingContribution class to refuse connections that do not include a specific token.
 */
var ElectronMessagingContribution = /** @class */ (function (_super) {
    __extends(ElectronMessagingContribution, _super);
    function ElectronMessagingContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Only allow token-bearers.
     */
    ElectronMessagingContribution.prototype.handleHttpUpgrade = function (request, socket, head) {
        if (this.tokenValidator.allowRequest(request)) {
            _super.prototype.handleHttpUpgrade.call(this, request, socket, head);
        }
        else {
            console.error("refused a websocket connection: " + request.connection.remoteAddress);
            socket.destroy(); // kill connection, client will take that as a "no".
        }
    };
    __decorate([
        inversify_1.inject(electron_token_validator_1.ElectronTokenValidator),
        __metadata("design:type", electron_token_validator_1.ElectronTokenValidator)
    ], ElectronMessagingContribution.prototype, "tokenValidator", void 0);
    ElectronMessagingContribution = __decorate([
        inversify_1.injectable()
    ], ElectronMessagingContribution);
    return ElectronMessagingContribution;
}(messaging_contribution_1.MessagingContribution));
exports.ElectronMessagingContribution = ElectronMessagingContribution;
//# sourceMappingURL=electron-token-messaging-contribution.js.map