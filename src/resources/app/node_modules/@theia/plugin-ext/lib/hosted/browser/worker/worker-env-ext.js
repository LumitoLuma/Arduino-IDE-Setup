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
exports.WorkerEnvExtImpl = void 0;
var env_1 = require("../../../plugin/env");
/**
 * Worker specific implementation not returning any FileSystem details
 * Extending the common class
 */
var WorkerEnvExtImpl = /** @class */ (function (_super) {
    __extends(WorkerEnvExtImpl, _super);
    function WorkerEnvExtImpl(rpc) {
        return _super.call(this, rpc) || this;
    }
    Object.defineProperty(WorkerEnvExtImpl.prototype, "appRoot", {
        /**
         * Throw error for app-root as there is no filesystem in worker context
         */
        get: function () {
            throw new Error('There is no app root in worker context');
        },
        enumerable: false,
        configurable: true
    });
    return WorkerEnvExtImpl;
}(env_1.EnvExtImpl));
exports.WorkerEnvExtImpl = WorkerEnvExtImpl;
//# sourceMappingURL=worker-env-ext.js.map