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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIpcEnv = exports.ipcEntryPoint = exports.checkParentAlive = void 0;
var THEIA_PARENT_PID = 'THEIA_PARENT_PID';
var THEIA_ENTRY_POINT = 'THEIA_ENTRY_POINT';
/**
 * Exit the current process if the parent process is not alive.
 * Relevant only for some OS, like Windows
 */
function checkParentAlive() {
    if (process.env[THEIA_PARENT_PID]) {
        var parentPid_1 = Number(process.env[THEIA_PARENT_PID]);
        if (typeof parentPid_1 === 'number' && !isNaN(parentPid_1)) {
            setInterval(function () {
                try {
                    // throws an exception if the main process doesn't exist anymore.
                    process.kill(parentPid_1, 0);
                }
                catch (_a) {
                    process.exit();
                }
            }, 5000);
        }
    }
}
exports.checkParentAlive = checkParentAlive;
exports.ipcEntryPoint = process.env[THEIA_ENTRY_POINT];
var THEIA_ENV_REGEXP_EXCLUSION = new RegExp('^THEIA_*');
function createIpcEnv(options) {
    var e_1, _a;
    var op = Object.assign({}, options);
    var childEnv = Object.assign({}, op.env);
    try {
        for (var _b = __values(Object.keys(childEnv)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (THEIA_ENV_REGEXP_EXCLUSION.test(key)) {
                delete childEnv[key];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    childEnv[THEIA_PARENT_PID] = String(process.pid);
    childEnv[THEIA_ENTRY_POINT] = op.entryPoint;
    return childEnv;
}
exports.createIpcEnv = createIpcEnv;
//# sourceMappingURL=ipc-protocol.js.map