"use strict";
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
exports.score = void 0;
/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
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
var glob_1 = require("./glob");
function score(selector, uriScheme, path, candidateLanguage, candidateIsSynchronized) {
    var e_1, _a;
    if (Array.isArray(selector)) {
        var ret = 0;
        try {
            for (var selector_1 = __values(selector), selector_1_1 = selector_1.next(); !selector_1_1.done; selector_1_1 = selector_1.next()) {
                var filter = selector_1_1.value;
                var value = score(filter, uriScheme, path, candidateLanguage, candidateIsSynchronized);
                if (value === 10) {
                    return value;
                }
                if (value > ret) {
                    ret = value;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (selector_1_1 && !selector_1_1.done && (_a = selector_1.return)) _a.call(selector_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return ret;
    }
    else if (typeof selector === 'string') {
        if (!candidateIsSynchronized) {
            return 0;
        }
        if (selector === '*') {
            return 5;
        }
        else if (selector === candidateLanguage) {
            return 10;
        }
        else {
            return 0;
        }
    }
    else if (selector) {
        var language = selector.language, pattern = selector.pattern, scheme = selector.scheme, hasAccessToAllModels = selector.hasAccessToAllModels;
        if (!candidateIsSynchronized && !hasAccessToAllModels) {
            return 0;
        }
        var result = 0;
        if (scheme) {
            if (scheme === uriScheme) {
                result = 10;
            }
            else if (scheme === '*') {
                result = 5;
            }
            else {
                return 0;
            }
        }
        if (language) {
            if (language === candidateLanguage) {
                result = 10;
            }
            else if (language === '*') {
                result = Math.max(result, 5);
            }
            else {
                return 0;
            }
        }
        if (pattern) {
            if (pattern === path || glob_1.match(pattern, path)) {
                result = 10;
            }
            else {
                return 0;
            }
        }
        return result;
    }
    else {
        return 0;
    }
}
exports.score = score;
//# sourceMappingURL=language-selector.js.map