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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronTokenValidator = void 0;
var cookie = require("cookie");
var crypto = require("crypto");
var inversify_1 = require("inversify");
var electron_token_1 = require("../../electron-common/electron-token");
/**
 * On Electron, we want to make sure that only Electron's browser-windows access the backend services.
 */
var ElectronTokenValidator = /** @class */ (function () {
    function ElectronTokenValidator() {
        this.electronSecurityToken = this.getToken();
    }
    /**
     * Expects the token to be passed via cookies by default.
     */
    ElectronTokenValidator.prototype.allowRequest = function (request) {
        var cookieHeader = request.headers.cookie;
        if (typeof cookieHeader === 'string') {
            var token = cookie.parse(cookieHeader)[electron_token_1.ElectronSecurityToken];
            if (typeof token === 'string') {
                return this.isTokenValid(JSON.parse(token));
            }
        }
        return false;
    };
    /**
     * Validates a token.
     *
     * This method both checks the shape of the parsed token data and its actual value.
     *
     * @param token Parsed object sent by the client as the token.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ElectronTokenValidator.prototype.isTokenValid = function (token) {
        // eslint-disable-next-line no-null/no-null
        if (typeof token === 'object' && token !== null && typeof token.value === 'string') {
            try {
                var received = Buffer.from(token.value, 'utf8');
                var expected = Buffer.from(this.electronSecurityToken.value, 'utf8');
                return received.byteLength === expected.byteLength && crypto.timingSafeEqual(received, expected);
            }
            catch (error) {
                console.error(error);
            }
        }
        return false;
    };
    /**
     * Returns the token to compare to when authorizing requests.
     */
    ElectronTokenValidator.prototype.getToken = function () {
        return JSON.parse(process.env[electron_token_1.ElectronSecurityToken]);
    };
    ElectronTokenValidator = __decorate([
        inversify_1.injectable()
    ], ElectronTokenValidator);
    return ElectronTokenValidator;
}());
exports.ElectronTokenValidator = ElectronTokenValidator;
//# sourceMappingURL=electron-token-validator.js.map