/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { URI } from './uri';
import { regExpFlags } from './strings';
export function stringify(obj) {
    return JSON.stringify(obj, replacer);
}
export function parse(text) {
    var data = JSON.parse(text);
    data = revive(data);
    return data;
}
function replacer(key, value) {
    // URI is done via toJSON-member
    if (value instanceof RegExp) {
        return {
            $mid: 2,
            source: value.source,
            flags: regExpFlags(value),
        };
    }
    return value;
}
export function revive(obj, depth) {
    if (depth === void 0) { depth = 0; }
    if (!obj || depth > 200) {
        return obj;
    }
    if (typeof obj === 'object') {
        switch (obj.$mid) {
            case 1: return URI.revive(obj);
            case 2: return new RegExp(obj.source, obj.flags);
        }
        // walk object (or array)
        for (var key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                obj[key] = revive(obj[key], depth + 1);
            }
        }
    }
    return obj;
}
