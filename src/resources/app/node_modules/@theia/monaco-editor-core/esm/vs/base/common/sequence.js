/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Emitter } from './event';
var Sequence = /** @class */ (function () {
    function Sequence() {
        this.elements = [];
        this._onDidSplice = new Emitter();
        this.onDidSplice = this._onDidSplice.event;
    }
    Sequence.prototype.splice = function (start, deleteCount, toInsert) {
        var _a;
        if (toInsert === void 0) { toInsert = []; }
        (_a = this.elements).splice.apply(_a, __spreadArrays([start, deleteCount], toInsert));
        this._onDidSplice.fire({ start: start, deleteCount: deleteCount, toInsert: toInsert });
    };
    return Sequence;
}());
export { Sequence };
