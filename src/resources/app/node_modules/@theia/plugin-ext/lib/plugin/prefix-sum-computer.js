"use strict";
/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.PrefixSumComputer = exports.PrefixSumIndexOfResult = exports.toUint32 = void 0;
// Copied from https://github.com/Microsoft/vscode/blob/master/src/vs/editor/common/viewModel/prefixSumComputer.ts
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Max unsigned integer that fits on 32 bits.
 */
var MAX_UINT_32 = 4294967295; // 2^32 - 1
function toUint32(v) {
    if (v < 0) {
        return 0;
    }
    if (v > MAX_UINT_32) {
        return MAX_UINT_32;
    }
    return v | 0;
}
exports.toUint32 = toUint32;
var PrefixSumIndexOfResult = /** @class */ (function () {
    function PrefixSumIndexOfResult(index, remainder) {
        this.index = index;
        this.remainder = remainder;
    }
    return PrefixSumIndexOfResult;
}());
exports.PrefixSumIndexOfResult = PrefixSumIndexOfResult;
var PrefixSumComputer = /** @class */ (function () {
    function PrefixSumComputer(values) {
        this.values = values;
        this.prefixSum = new Uint32Array(values.length);
        this.prefixSumValidIndex = new Int32Array(1);
        this.prefixSumValidIndex[0] = -1;
    }
    PrefixSumComputer.prototype.getCount = function () {
        return this.values.length;
    };
    PrefixSumComputer.prototype.insertValues = function (insertIndex, insertValues) {
        insertIndex = toUint32(insertIndex);
        var oldValues = this.values;
        var oldPrefixSum = this.prefixSum;
        var insertValuesLen = insertValues.length;
        if (insertValuesLen === 0) {
            return false;
        }
        this.values = new Uint32Array(oldValues.length + insertValuesLen);
        this.values.set(oldValues.subarray(0, insertIndex), 0);
        this.values.set(oldValues.subarray(insertIndex), insertIndex + insertValuesLen);
        this.values.set(insertValues, insertIndex);
        if (insertIndex - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = insertIndex - 1;
        }
        this.prefixSum = new Uint32Array(this.values.length);
        if (this.prefixSumValidIndex[0] >= 0) {
            this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        }
        return true;
    };
    PrefixSumComputer.prototype.changeValue = function (index, value) {
        index = toUint32(index);
        value = toUint32(value);
        if (this.values[index] === value) {
            return false;
        }
        this.values[index] = value;
        if (index - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = index - 1;
        }
        return true;
    };
    PrefixSumComputer.prototype.removeValues = function (startIndex, cnt) {
        startIndex = toUint32(startIndex);
        cnt = toUint32(cnt);
        var oldValues = this.values;
        var oldPrefixSum = this.prefixSum;
        if (startIndex >= oldValues.length) {
            return false;
        }
        var maxCnt = oldValues.length - startIndex;
        if (cnt >= maxCnt) {
            cnt = maxCnt;
        }
        if (cnt === 0) {
            return false;
        }
        this.values = new Uint32Array(oldValues.length - cnt);
        this.values.set(oldValues.subarray(0, startIndex), 0);
        this.values.set(oldValues.subarray(startIndex + cnt), startIndex);
        this.prefixSum = new Uint32Array(this.values.length);
        if (startIndex - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = startIndex - 1;
        }
        if (this.prefixSumValidIndex[0] >= 0) {
            this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        }
        return true;
    };
    PrefixSumComputer.prototype.getTotalValue = function () {
        if (this.values.length === 0) {
            return 0;
        }
        return this._getAccumulatedValue(this.values.length - 1);
    };
    PrefixSumComputer.prototype.getAccumulatedValue = function (index) {
        if (index < 0) {
            return 0;
        }
        index = toUint32(index);
        return this._getAccumulatedValue(index);
    };
    PrefixSumComputer.prototype._getAccumulatedValue = function (index) {
        if (index <= this.prefixSumValidIndex[0]) {
            return this.prefixSum[index];
        }
        var startIndex = this.prefixSumValidIndex[0] + 1;
        if (startIndex === 0) {
            this.prefixSum[0] = this.values[0];
            startIndex++;
        }
        if (index >= this.values.length) {
            index = this.values.length - 1;
        }
        for (var i = startIndex; i <= index; i++) {
            this.prefixSum[i] = this.prefixSum[i - 1] + this.values[i];
        }
        this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], index);
        return this.prefixSum[index];
    };
    PrefixSumComputer.prototype.getIndexOf = function (accumulatedValue) {
        accumulatedValue = Math.floor(accumulatedValue);
        // Compute all sums (to get a fully valid prefixSum)
        this.getTotalValue();
        var low = 0;
        var high = this.values.length - 1;
        var mid;
        var midStop;
        var midStart;
        while (low <= high) {
            mid = low + ((high - low) / 2) | 0;
            midStop = this.prefixSum[mid];
            midStart = midStop - this.values[mid];
            if (accumulatedValue < midStart) {
                high = mid - 1;
            }
            else if (accumulatedValue >= midStop) {
                low = mid + 1;
            }
            else {
                break;
            }
        }
        return new PrefixSumIndexOfResult(mid, accumulatedValue - midStart);
    };
    return PrefixSumComputer;
}());
exports.PrefixSumComputer = PrefixSumComputer;
//# sourceMappingURL=prefix-sum-computer.js.map