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
require("reflect-metadata");
var logger_1 = require("vscode-ws-jsonrpc/lib/logger");
var vscode_jsonrpc_1 = require("vscode-jsonrpc");
var ipc_protocol_1 = require("./ipc-protocol");
ipc_protocol_1.checkParentAlive();
var reader = new vscode_jsonrpc_1.IPCMessageReader(process);
var writer = new vscode_jsonrpc_1.IPCMessageWriter(process);
var logger = new logger_1.ConsoleLogger();
var connection = vscode_jsonrpc_1.createMessageConnection(reader, writer, logger);
connection.trace(vscode_jsonrpc_1.Trace.Off, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log: function (message, data) { return console.log(message, data); }
});
var entryPoint = require(ipc_protocol_1.ipcEntryPoint).default;
entryPoint(connection);
//# sourceMappingURL=ipc-bootstrap.js.map