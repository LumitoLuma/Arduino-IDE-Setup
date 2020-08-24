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
exports.PluginMessageWriter = void 0;
var types_1 = require("./types");
var messageWriter_1 = require("vscode-jsonrpc/lib/messageWriter");
/**
 * Support for writing string message through RPC protocol.
 */
var PluginMessageWriter = /** @class */ (function (_super) {
    __extends(PluginMessageWriter, _super);
    function PluginMessageWriter(id, proxy) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.proxy = proxy;
        return _this;
    }
    PluginMessageWriter.prototype.write = function (arg) {
        var content = JSON.stringify(arg);
        this.proxy.$sendMessage(this.id, content);
    };
    return PluginMessageWriter;
}(types_1.es5ClassCompat(messageWriter_1.AbstractMessageWriter)));
exports.PluginMessageWriter = PluginMessageWriter;
//# sourceMappingURL=plugin-message-writer.js.map