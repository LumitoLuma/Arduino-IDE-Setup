"use strict";
/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
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
exports.PreferenceScope = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var PreferenceScope;
(function (PreferenceScope) {
    PreferenceScope[PreferenceScope["Default"] = 0] = "Default";
    PreferenceScope[PreferenceScope["User"] = 1] = "User";
    PreferenceScope[PreferenceScope["Workspace"] = 2] = "Workspace";
    PreferenceScope[PreferenceScope["Folder"] = 3] = "Folder";
})(PreferenceScope = exports.PreferenceScope || (exports.PreferenceScope = {}));
(function (PreferenceScope) {
    function is(scope) {
        return typeof scope === 'number' && getScopes().findIndex(function (s) { return s === scope; }) >= 0;
    }
    PreferenceScope.is = is;
    function getScopes() {
        return Object.keys(PreferenceScope)
            .filter(function (k) { return typeof PreferenceScope[k] === 'string'; })
            .map(function (v) { return Number(v); });
    }
    PreferenceScope.getScopes = getScopes;
    function getReversedScopes() {
        return getScopes().reverse();
    }
    PreferenceScope.getReversedScopes = getReversedScopes;
    function getScopeNames(scope) {
        var e_1, _a;
        var names = [];
        var allNames = Object.keys(PreferenceScope)
            .filter(function (k) { return typeof PreferenceScope[k] === 'number'; });
        if (scope) {
            try {
                for (var allNames_1 = __values(allNames), allNames_1_1 = allNames_1.next(); !allNames_1_1.done; allNames_1_1 = allNames_1.next()) {
                    var name_1 = allNames_1_1.value;
                    if (PreferenceScope[name_1] <= scope) {
                        names.push(name_1);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (allNames_1_1 && !allNames_1_1.done && (_a = allNames_1.return)) _a.call(allNames_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return names;
    }
    PreferenceScope.getScopeNames = getScopeNames;
    function fromString(strScope) {
        switch (strScope) {
            case 'application':
                return PreferenceScope.User;
            case 'window':
                return PreferenceScope.Folder;
            case 'resource':
                return PreferenceScope.Folder;
        }
    }
    PreferenceScope.fromString = fromString;
})(PreferenceScope = exports.PreferenceScope || (exports.PreferenceScope = {}));
//# sourceMappingURL=preference-scope.js.map