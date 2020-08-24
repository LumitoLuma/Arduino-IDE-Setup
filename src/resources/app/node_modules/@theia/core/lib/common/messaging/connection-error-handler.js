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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionErrorHandler = void 0;
var ConnectionErrorHandler = /** @class */ (function () {
    function ConnectionErrorHandler(options) {
        this.restarts = [];
        this.options = __assign({ maxErrors: 3, maxRestarts: 5, restartInterval: 3 }, options);
    }
    ConnectionErrorHandler.prototype.shouldStop = function (error, message, count) {
        return !count || count > this.options.maxErrors;
    };
    ConnectionErrorHandler.prototype.shouldRestart = function () {
        this.restarts.push(Date.now());
        if (this.restarts.length <= this.options.maxRestarts) {
            return true;
        }
        var diff = this.restarts[this.restarts.length - 1] - this.restarts[0];
        if (diff <= this.options.restartInterval * 60 * 1000) {
            // eslint-disable-next-line max-len
            this.options.logger.error("The " + this.options.serverName + " server crashed " + this.options.maxRestarts + " times in the last " + this.options.restartInterval + " minutes. The server will not be restarted.");
            return false;
        }
        this.restarts.shift();
        return true;
    };
    return ConnectionErrorHandler;
}());
exports.ConnectionErrorHandler = ConnectionErrorHandler;
//# sourceMappingURL=connection-error-handler.js.map