"use strict";
/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
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
exports.DevNullStream = void 0;
var stream = require("stream");
/**
 * A Node stream like `/dev/null`.
 *
 * Writing goes to a black hole, reading returns `EOF`.
 */
var DevNullStream = /** @class */ (function (_super) {
    __extends(DevNullStream, _super);
    function DevNullStream(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        if (options.autoDestroy) {
            _this.destroy();
        }
        return _this;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DevNullStream.prototype._write = function (chunk, encoding, callback) {
        callback();
    };
    DevNullStream.prototype._read = function (size) {
        // eslint-disable-next-line no-null/no-null
        this.push(null);
    };
    return DevNullStream;
}(stream.Duplex));
exports.DevNullStream = DevNullStream;
//# sourceMappingURL=dev-null-stream.js.map