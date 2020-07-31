"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*********************************************************************
 * Copyright (c) 2018 Ericsson and others
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *********************************************************************/
const net_1 = require("net");
// tslint:disable-next-line:variable-name
const tty_wrap = process.binding('tty_wrap');
// tslint:disable-next-line:no-var-requires
const pty = require('../../build/Release/pty.node');
class Pty {
    constructor() {
        const handles = pty.create_pty();
        const backup = tty_wrap.guessHandleType;
        tty_wrap.guessHandleType = () => 'PIPE';
        this.master = new net_1.Socket({ fd: handles.master_fd });
        tty_wrap.guessHandleType = backup;
        this.name = handles.slave_name;
    }
}
exports.Pty = Pty;
//# sourceMappingURL=pty.js.map