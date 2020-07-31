"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*********************************************************************
 * Copyright (c) 2019 Arm Ltd. and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *********************************************************************/
const vscode_debugadapter_1 = require("vscode-debugadapter");
class StoppedEvent extends vscode_debugadapter_1.Event {
    constructor(reason, threadId, allThreadsStopped = false) {
        super('stopped');
        this.body = {
            reason,
            allThreadsStopped,
        };
        if (typeof threadId === 'number') {
            this.body.threadId = threadId;
        }
    }
}
exports.StoppedEvent = StoppedEvent;
//# sourceMappingURL=stoppedEvent.js.map