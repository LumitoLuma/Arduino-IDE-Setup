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
var Keybinding;
(function (Keybinding) {
    /**
     * Returns with the string representation of the binding.
     * Any additional properties which are not described on
     * the `Keybinding` API will be ignored.
     *
     * @param binding the binding to stringify.
     */
    function stringify(binding) {
        var copy = {
            command: binding.command,
            keybinding: binding.keybinding,
            context: binding.context,
            when: binding.when,
            args: binding.args
        };
        return JSON.stringify(copy);
    }
    Keybinding.stringify = stringify;
    /* Determine whether object is a KeyBinding */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(arg) {
        return !!arg && arg === Object(arg) && 'command' in arg && 'keybinding' in arg;
    }
    Keybinding.is = is;
})(Keybinding = exports.Keybinding || (exports.Keybinding = {}));
//# sourceMappingURL=keybinding.js.map