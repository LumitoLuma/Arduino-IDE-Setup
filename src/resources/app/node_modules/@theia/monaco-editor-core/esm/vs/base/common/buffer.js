/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as strings from './strings';
import * as streams from './stream';
var hasBuffer = (typeof Buffer !== 'undefined');
var hasTextEncoder = (typeof TextEncoder !== 'undefined');
var hasTextDecoder = (typeof TextDecoder !== 'undefined');
var textEncoder;
var textDecoder;
var VSBuffer = /** @class */ (function () {
    function VSBuffer(buffer) {
        this.buffer = buffer;
        this.byteLength = this.buffer.byteLength;
    }
    VSBuffer.alloc = function (byteLength) {
        if (hasBuffer) {
            return new VSBuffer(Buffer.allocUnsafe(byteLength));
        }
        else {
            return new VSBuffer(new Uint8Array(byteLength));
        }
    };
    VSBuffer.wrap = function (actual) {
        if (hasBuffer && !(Buffer.isBuffer(actual))) {
            // https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
            // Create a zero-copy Buffer wrapper around the ArrayBuffer pointed to by the Uint8Array
            actual = Buffer.from(actual.buffer, actual.byteOffset, actual.byteLength);
        }
        return new VSBuffer(actual);
    };
    VSBuffer.fromString = function (source) {
        if (hasBuffer) {
            return new VSBuffer(Buffer.from(source));
        }
        else if (hasTextEncoder) {
            if (!textEncoder) {
                textEncoder = new TextEncoder();
            }
            return new VSBuffer(textEncoder.encode(source));
        }
        else {
            return new VSBuffer(strings.encodeUTF8(source));
        }
    };
    VSBuffer.concat = function (buffers, totalLength) {
        if (typeof totalLength === 'undefined') {
            totalLength = 0;
            for (var i = 0, len = buffers.length; i < len; i++) {
                totalLength += buffers[i].byteLength;
            }
        }
        var ret = VSBuffer.alloc(totalLength);
        var offset = 0;
        for (var i = 0, len = buffers.length; i < len; i++) {
            var element = buffers[i];
            ret.set(element, offset);
            offset += element.byteLength;
        }
        return ret;
    };
    VSBuffer.prototype.toString = function () {
        if (hasBuffer) {
            return this.buffer.toString();
        }
        else if (hasTextDecoder) {
            if (!textDecoder) {
                textDecoder = new TextDecoder();
            }
            return textDecoder.decode(this.buffer);
        }
        else {
            return strings.decodeUTF8(this.buffer);
        }
    };
    VSBuffer.prototype.slice = function (start, end) {
        // IMPORTANT: use subarray instead of slice because TypedArray#slice
        // creates shallow copy and NodeBuffer#slice doesn't. The use of subarray
        // ensures the same, performant, behaviour.
        return new VSBuffer(this.buffer.subarray(start /*bad lib.d.ts*/, end));
    };
    VSBuffer.prototype.set = function (array, offset) {
        this.buffer.set(array.buffer, offset);
    };
    VSBuffer.prototype.readUInt32BE = function (offset) {
        return readUInt32BE(this.buffer, offset);
    };
    VSBuffer.prototype.writeUInt32BE = function (value, offset) {
        writeUInt32BE(this.buffer, value, offset);
    };
    VSBuffer.prototype.readUInt8 = function (offset) {
        return readUInt8(this.buffer, offset);
    };
    VSBuffer.prototype.writeUInt8 = function (value, offset) {
        writeUInt8(this.buffer, value, offset);
    };
    return VSBuffer;
}());
export { VSBuffer };
export function readUInt32BE(source, offset) {
    return (source[offset] * Math.pow(2, 24)
        + source[offset + 1] * Math.pow(2, 16)
        + source[offset + 2] * Math.pow(2, 8)
        + source[offset + 3]);
}
export function writeUInt32BE(destination, value, offset) {
    destination[offset + 3] = value;
    value = value >>> 8;
    destination[offset + 2] = value;
    value = value >>> 8;
    destination[offset + 1] = value;
    value = value >>> 8;
    destination[offset] = value;
}
function readUInt8(source, offset) {
    return source[offset];
}
function writeUInt8(destination, value, offset) {
    destination[offset] = value;
}
export function readableToBuffer(readable) {
    return streams.consumeReadable(readable, function (chunks) { return VSBuffer.concat(chunks); });
}
export function bufferToReadable(buffer) {
    return streams.toReadable(buffer);
}
export function streamToBuffer(stream) {
    return streams.consumeStream(stream, function (chunks) { return VSBuffer.concat(chunks); });
}
export function bufferToStream(buffer) {
    return streams.toStream(buffer, function (chunks) { return VSBuffer.concat(chunks); });
}
export function streamToBufferReadableStream(stream) {
    return streams.transform(stream, { data: function (data) { return typeof data === 'string' ? VSBuffer.fromString(data) : VSBuffer.wrap(data); } }, function (chunks) { return VSBuffer.concat(chunks); });
}
export function newWriteableBufferStream() {
    return streams.newWriteableStream(function (chunks) { return VSBuffer.concat(chunks); });
}
