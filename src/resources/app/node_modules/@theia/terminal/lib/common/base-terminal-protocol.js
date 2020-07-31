"use strict";
/********************************************************************************
 * Copyright (C) 2017 Ericsson and others.
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
var core_1 = require("@theia/core");
var IBaseTerminalServer;
(function (IBaseTerminalServer) {
    function validateId(id) {
        return typeof id === 'number' && id !== -1;
    }
    IBaseTerminalServer.validateId = validateId;
})(IBaseTerminalServer = exports.IBaseTerminalServer || (exports.IBaseTerminalServer = {}));
var DispatchingBaseTerminalClient = /** @class */ (function () {
    function DispatchingBaseTerminalClient() {
        this.clients = new Set();
    }
    DispatchingBaseTerminalClient.prototype.push = function (client) {
        var _this = this;
        this.clients.add(client);
        return core_1.Disposable.create(function () { return _this.clients.delete(client); });
    };
    DispatchingBaseTerminalClient.prototype.onTerminalExitChanged = function (event) {
        this.clients.forEach(function (c) {
            try {
                c.onTerminalExitChanged(event);
            }
            catch (e) {
                console.error(e);
            }
        });
    };
    DispatchingBaseTerminalClient.prototype.onTerminalError = function (event) {
        this.clients.forEach(function (c) {
            try {
                c.onTerminalError(event);
            }
            catch (e) {
                console.error(e);
            }
        });
    };
    return DispatchingBaseTerminalClient;
}());
exports.DispatchingBaseTerminalClient = DispatchingBaseTerminalClient;
//# sourceMappingURL=base-terminal-protocol.js.map