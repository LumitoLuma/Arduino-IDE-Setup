"use strict";
/********************************************************************************
 * Copyright (C) 2017 Ericsson and others.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiRingBuffer = exports.MultiRingBufferOptions = exports.MultiRingBufferReadableStream = void 0;
var stream = require("stream");
var inversify_1 = require("inversify");
/**
 * The MultiRingBuffer is a ring buffer implementation that allows
 * multiple independent readers.
 *
 * These readers are created using the getReader or getStream functions
 * to create a reader that can be read using deq() or one that is a readable stream.
 */
var MultiRingBufferReadableStream = /** @class */ (function (_super) {
    __extends(MultiRingBufferReadableStream, _super);
    function MultiRingBufferReadableStream(ringBuffer, reader, encoding) {
        if (encoding === void 0) { encoding = 'utf8'; }
        var _this = _super.call(this) || this;
        _this.ringBuffer = ringBuffer;
        _this.reader = reader;
        _this.encoding = encoding;
        _this.more = false;
        _this.disposed = false;
        _this.setEncoding(encoding);
        return _this;
    }
    MultiRingBufferReadableStream.prototype._read = function (size) {
        this.more = true;
        this.deq(size);
    };
    MultiRingBufferReadableStream.prototype._destroy = function (err, callback) {
        this.ringBuffer.closeStream(this);
        this.ringBuffer.closeReader(this.reader);
        this.disposed = true;
        this.removeAllListeners();
        callback(err);
    };
    MultiRingBufferReadableStream.prototype.onData = function () {
        if (this.more === true) {
            this.deq(-1);
        }
    };
    MultiRingBufferReadableStream.prototype.deq = function (size) {
        if (this.disposed === true) {
            return;
        }
        var buffer = undefined;
        do {
            buffer = this.ringBuffer.deq(this.reader, size, this.encoding);
            if (buffer !== undefined) {
                this.more = this.push(buffer, this.encoding);
            }
        } while (buffer !== undefined && this.more === true && this.disposed === false);
    };
    MultiRingBufferReadableStream.prototype.dispose = function () {
        this.destroy();
    };
    return MultiRingBufferReadableStream;
}(stream.Readable));
exports.MultiRingBufferReadableStream = MultiRingBufferReadableStream;
exports.MultiRingBufferOptions = Symbol('MultiRingBufferOptions');
var MultiRingBuffer = /** @class */ (function () {
    function MultiRingBuffer(options) {
        this.options = options;
        this.head = -1;
        this.tail = -1;
        this.readerId = 0;
        this.maxSize = options.size;
        if (options.encoding !== undefined) {
            this.encoding = options.encoding;
        }
        else {
            this.encoding = 'utf8';
        }
        this.buffer = Buffer.alloc(this.maxSize);
        this.readers = new Map();
        this.streams = new Map();
    }
    MultiRingBuffer.prototype.enq = function (str, encoding) {
        if (encoding === void 0) { encoding = 'utf8'; }
        var buffer = Buffer.from(str, encoding);
        // Take the last elements of string if it's too big, drop the rest
        if (buffer.length > this.maxSize) {
            buffer = buffer.slice(buffer.length - this.maxSize);
        }
        if (buffer.length === 0) {
            return;
        }
        // empty
        if (this.head === -1 && this.tail === -1) {
            this.head = 0;
            this.tail = 0;
            buffer.copy(this.buffer, this.head, 0, buffer.length);
            this.head = buffer.length - 1;
            this.onData(0);
            return;
        }
        var startHead = this.inc(this.head, 1).newPos;
        if (this.inc(startHead, buffer.length).wrap === true) {
            buffer.copy(this.buffer, startHead, 0, this.maxSize - startHead);
            buffer.copy(this.buffer, 0, this.maxSize - startHead);
        }
        else {
            buffer.copy(this.buffer, startHead);
        }
        this.incTails(buffer.length);
        this.head = this.inc(this.head, buffer.length).newPos;
        this.onData(startHead);
    };
    MultiRingBuffer.prototype.getReader = function () {
        this.readers.set(this.readerId, this.tail);
        return this.readerId++;
    };
    MultiRingBuffer.prototype.closeReader = function (id) {
        this.readers.delete(id);
    };
    MultiRingBuffer.prototype.getStream = function (encoding) {
        var reader = this.getReader();
        var readableStream = new MultiRingBufferReadableStream(this, reader, encoding);
        this.streams.set(readableStream, reader);
        return readableStream;
    };
    MultiRingBuffer.prototype.closeStream = function (readableStream) {
        this.streams.delete(readableStream);
    };
    MultiRingBuffer.prototype.onData = function (start) {
        var e_1, _a, e_2, _b;
        try {
            /*  Any stream that has read everything already
             *  Should go back to the last buffer in start offset */
            for (var _c = __values(this.readers), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), id = _e[0], pos = _e[1];
                if (pos === -1) {
                    this.readers.set(id, start);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            /* Notify the streams there's new data. */
            for (var _f = __values(this.streams), _g = _f.next(); !_g.done; _g = _f.next()) {
                var _h = __read(_g.value, 1), readableStream = _h[0];
                readableStream.onData();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    MultiRingBuffer.prototype.deq = function (id, size, encoding) {
        if (size === void 0) { size = -1; }
        if (encoding === void 0) { encoding = 'utf8'; }
        var pos = this.readers.get(id);
        if (pos === undefined || pos === -1) {
            return undefined;
        }
        if (size === 0) {
            return undefined;
        }
        var buffer = '';
        var maxDeqSize = this.sizeForReader(id);
        var wrapped = this.isWrapped(pos, this.head);
        var deqSize;
        if (size === -1) {
            deqSize = maxDeqSize;
        }
        else {
            deqSize = Math.min(size, maxDeqSize);
        }
        if (wrapped === false) { // no wrap
            buffer = this.buffer.toString(encoding, pos, pos + deqSize);
        }
        else { // wrap
            buffer = buffer.concat(this.buffer.toString(encoding, pos, this.maxSize), this.buffer.toString(encoding, 0, deqSize - (this.maxSize - pos)));
        }
        var lastIndex = this.inc(pos, deqSize - 1).newPos;
        // everything is read
        if (lastIndex === this.head) {
            this.readers.set(id, -1);
        }
        else {
            this.readers.set(id, this.inc(pos, deqSize).newPos);
        }
        return buffer;
    };
    MultiRingBuffer.prototype.sizeForReader = function (id) {
        var pos = this.readers.get(id);
        if (pos === undefined) {
            return 0;
        }
        return this.sizeFrom(pos, this.head, this.isWrapped(pos, this.head));
    };
    MultiRingBuffer.prototype.size = function () {
        return this.sizeFrom(this.tail, this.head, this.isWrapped(this.tail, this.head));
    };
    MultiRingBuffer.prototype.isWrapped = function (from, to) {
        if (to < from) {
            return true;
        }
        else {
            return false;
        }
    };
    MultiRingBuffer.prototype.sizeFrom = function (from, to, wrap) {
        if (from === -1 || to === -1) {
            return 0;
        }
        else {
            if (wrap === false) {
                return to - from + 1;
            }
            else {
                return to + 1 + this.maxSize - from;
            }
        }
    };
    MultiRingBuffer.prototype.emptyForReader = function (id) {
        var pos = this.readers.get(id);
        if (pos === undefined || pos === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    MultiRingBuffer.prototype.empty = function () {
        if (this.head === -1 && this.tail === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    MultiRingBuffer.prototype.streamsSize = function () {
        return this.streams.size;
    };
    MultiRingBuffer.prototype.readersSize = function () {
        return this.readers.size;
    };
    /**
     * Dispose all the attached readers/streams.
     */
    MultiRingBuffer.prototype.dispose = function () {
        var e_3, _a;
        try {
            for (var _b = __values(this.streams.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var readableStream = _c.value;
                readableStream.dispose();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    /* Position should be incremented if it goes pass end.  */
    MultiRingBuffer.prototype.shouldIncPos = function (pos, end, size) {
        var _a = this.inc(end, size), newHead = _a.newPos, wrap = _a.wrap;
        /* Tail Head */
        if (this.isWrapped(pos, end) === false) {
            // Head needs to wrap to push the tail
            if (wrap === true && newHead >= pos) {
                return true;
            }
        }
        else { /* Head Tail */
            //  If we wrap head is pushing tail, or if it goes over pos
            if (wrap === true || newHead >= pos) {
                return true;
            }
        }
        return false;
    };
    MultiRingBuffer.prototype.incTailSize = function (pos, head, size) {
        var newHead = this.inc(head, size).newPos;
        /* New tail is 1 past newHead.  */
        return this.inc(newHead, 1);
    };
    MultiRingBuffer.prototype.incTail = function (pos, size) {
        if (this.shouldIncPos(pos, this.head, size) === false) {
            return { newPos: pos, wrap: false };
        }
        return this.incTailSize(pos, this.head, size);
    };
    /* Increment the main tail and all the reader positions. */
    MultiRingBuffer.prototype.incTails = function (size) {
        var e_4, _a;
        this.tail = this.incTail(this.tail, size).newPos;
        try {
            for (var _b = __values(this.readers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), id = _d[0], pos = _d[1];
                if (pos !== -1) {
                    if (this.shouldIncPos(pos, this.tail, size) === true) {
                        this.readers.set(id, this.tail);
                    }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    MultiRingBuffer.prototype.inc = function (pos, size) {
        if (size === 0) {
            return { newPos: pos, wrap: false };
        }
        var newPos = (pos + size) % this.maxSize;
        var wrap = newPos <= pos;
        return { newPos: newPos, wrap: wrap };
    };
    MultiRingBuffer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.MultiRingBufferOptions)),
        __metadata("design:paramtypes", [Object])
    ], MultiRingBuffer);
    return MultiRingBuffer;
}());
exports.MultiRingBuffer = MultiRingBuffer;
//# sourceMappingURL=multi-ring-buffer.js.map