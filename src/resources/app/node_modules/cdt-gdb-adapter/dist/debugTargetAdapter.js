"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*********************************************************************
 * Copyright (c) 2018 QNX Software Systems and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *********************************************************************/
const process = require("process");
const logger_1 = require("vscode-debugadapter/lib/logger");
const GDBTargetDebugSession_1 = require("./GDBTargetDebugSession");
process.on('uncaughtException', (err) => {
    logger_1.logger.error(JSON.stringify(err));
});
GDBTargetDebugSession_1.GDBTargetDebugSession.run(GDBTargetDebugSession_1.GDBTargetDebugSession);
//# sourceMappingURL=debugTargetAdapter.js.map