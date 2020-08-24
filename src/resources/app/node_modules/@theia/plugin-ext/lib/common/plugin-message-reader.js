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
exports.PluginMessageReader = void 0;
var types_1 = require("./types");
var messageReader_1 = require("vscode-jsonrpc/lib/messageReader");
/**
 * Support for reading string message through RPC protocol.
 */
var PluginMessageReader = /** @class */ (function (_super) {
    __extends(PluginMessageReader, _super);
    function PluginMessageReader() {
        var _this = _super.call(this) || this;
        _this.state = 'initial';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.events = [];
        return _this;
    }
    PluginMessageReader.prototype.listen = function (callback) {
        if (this.state === 'initial') {
            this.state = 'listening';
            this.callback = callback;
            while (this.events.length !== 0) {
                var event_1 = this.events.pop();
                if (event_1.message) {
                    this.readMessage(event_1.message);
                }
                else if (event_1.error) {
                    this.fireError(event_1.error);
                }
                else {
                    this.fireClose();
                }
            }
        }
    };
    PluginMessageReader.prototype.readMessage = function (message) {
        if (this.state === 'initial') {
            this.events.splice(0, 0, { message: message });
        }
        else if (this.state === 'listening') {
            var data = JSON.parse(message);
            this.callback(data);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PluginMessageReader.prototype.fireError = function (error) {
        if (this.state === 'initial') {
            this.events.splice(0, 0, { error: error });
        }
        else if (this.state === 'listening') {
            _super.prototype.fireError.call(this, error);
        }
    };
    PluginMessageReader.prototype.fireClose = function () {
        if (this.state === 'initial') {
            this.events.splice(0, 0, {});
        }
        else if (this.state === 'listening') {
            _super.prototype.fireClose.call(this);
        }
        this.state = 'closed';
    };
    return PluginMessageReader;
}(types_1.es5ClassCompat(messageReader_1.AbstractMessageReader)));
exports.PluginMessageReader = PluginMessageReader;
//# sourceMappingURL=plugin-message-reader.js.map