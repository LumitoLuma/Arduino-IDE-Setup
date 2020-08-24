"use strict";
/* eslint-disable */
// copied from https://github.com/microsoft/vscode/blob/1.37.0/src/vs/base/common/objects.ts
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
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
exports.cloneAndChange = void 0;
var types_1 = require("./types");
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function cloneAndChange(obj, changer) {
    return _cloneAndChange(obj, changer, new Set());
}
exports.cloneAndChange = cloneAndChange;
function _cloneAndChange(obj, changer, seen) {
    var e_1, _a;
    if (types_1.isUndefinedOrNull(obj)) {
        return obj;
    }
    var changed = changer(obj);
    if (typeof changed !== 'undefined') {
        return changed;
    }
    if (types_1.isArray(obj)) {
        var r1 = [];
        try {
            for (var obj_1 = __values(obj), obj_1_1 = obj_1.next(); !obj_1_1.done; obj_1_1 = obj_1.next()) {
                var e = obj_1_1.value;
                r1.push(_cloneAndChange(e, changer, seen));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (obj_1_1 && !obj_1_1.done && (_a = obj_1.return)) _a.call(obj_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return r1;
    }
    if (types_1.isObject(obj)) {
        if (seen.has(obj)) {
            throw new Error('Cannot clone recursive data-structure');
        }
        seen.add(obj);
        var r2 = {};
        for (var i2 in obj) {
            if (_hasOwnProperty.call(obj, i2)) {
                r2[i2] = _cloneAndChange(obj[i2], changer, seen);
            }
        }
        seen.delete(obj);
        return r2;
    }
    return obj;
}
//# sourceMappingURL=objects.js.map