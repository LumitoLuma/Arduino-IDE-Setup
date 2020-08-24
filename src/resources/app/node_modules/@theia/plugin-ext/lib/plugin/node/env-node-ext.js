"use strict";
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvNodeExtImpl = void 0;
var mac = require("macaddress");
var env_1 = require("../env");
var crypto_1 = require("crypto");
var uuid_1 = require("uuid");
/**
 * Provides machineId using mac address. It's only possible on node side
 * Extending the common class
 */
var EnvNodeExtImpl = /** @class */ (function (_super) {
    __extends(EnvNodeExtImpl, _super);
    function EnvNodeExtImpl(rpc) {
        var _this = _super.call(this, rpc) || this;
        mac.one(function (err, macAddress) {
            if (err) {
                _this.macMachineId = uuid_1.v4();
            }
            else {
                _this.macMachineId = crypto_1.createHash('sha256').update(macAddress, 'utf8').digest('hex');
            }
        });
        return _this;
    }
    Object.defineProperty(EnvNodeExtImpl.prototype, "machineId", {
        /**
         * override machineID
         */
        get: function () {
            return this.macMachineId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EnvNodeExtImpl.prototype, "appRoot", {
        /**
         * Provides application root.
         */
        get: function () {
            return __dirname;
        },
        enumerable: false,
        configurable: true
    });
    return EnvNodeExtImpl;
}(env_1.EnvExtImpl));
exports.EnvNodeExtImpl = EnvNodeExtImpl;
//# sourceMappingURL=env-node-ext.js.map