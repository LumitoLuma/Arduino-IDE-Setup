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
exports.codename = exports.signame = exports.parseArgs = void 0;
var core_1 = require("@theia/core");
var os = require("os");
var stringArgv = require('string-argv');
/**
 * Parses the given line into an array of args respecting escapes and string literals.
 * @param line the given line to parse
 */
function parseArgs(line) {
    if (line) {
        return stringArgv(line);
    }
    return [];
}
exports.parseArgs = parseArgs;
// Polyfill for Object.entries, until we upgrade to ES2017.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function objectEntries(obj) {
    var props = Object.keys(obj);
    var result = new Array(props.length);
    for (var i = 0; i < props.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result[i] = [props[i], obj[props[i]]];
    }
    return result;
}
/**
 * Convert a signal number to its short name (using the signal definitions of
 * the current host).  Should never be called on Windows.  For Linux, this is
 * only valid for the x86 and ARM architectures, since other architectures may
 * use different numbers, see signal(7).
 */
function signame(sig) {
    var e_1, _a;
    // We should never reach this on Windows, since signals are not a thing
    // there.
    if (core_1.isWindows) {
        throw new Error('Trying to get a signal name on Windows.');
    }
    try {
        for (var _b = __values(objectEntries(os.constants.signals)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var entry = _c.value;
            if (entry[1] === sig) {
                return entry[0];
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
    // Don't know this signal?  Return the number as a string.
    return sig.toString(10);
}
exports.signame = signame;
/**
 * Convert a code number to its short name
 */
function codename(code) {
    var e_2, _a;
    try {
        for (var _b = __values(objectEntries(os.constants.errno)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var entry = _c.value;
            if (entry[1] === code) {
                return entry[0];
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    // Return the number as string if we did not find a name for it.
    return code.toString(10);
}
exports.codename = codename;
//# sourceMappingURL=utils.js.map