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
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = exports.Deferred = void 0;
var cancellation_1 = require("./cancellation");
/**
 * Simple implementation of the deferred pattern.
 * An object that exposes a promise and functions to resolve and reject it.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());
exports.Deferred = Deferred;
/**
 * @returns resolves after a specified number of milliseconds
 * @throws cancelled if a given token is cancelled before a specified number of milliseconds
 */
function timeout(ms, token) {
    if (token === void 0) { token = cancellation_1.CancellationToken.None; }
    var deferred = new Deferred();
    var handle = setTimeout(function () { return deferred.resolve(); }, ms);
    token.onCancellationRequested(function () {
        clearTimeout(handle);
        deferred.reject(cancellation_1.cancelled());
    });
    return deferred.promise;
}
exports.timeout = timeout;
//# sourceMappingURL=promise-util.js.map