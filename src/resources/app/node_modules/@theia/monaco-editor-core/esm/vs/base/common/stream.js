/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export function isReadableStream(obj) {
    var candidate = obj;
    return candidate && [candidate.on, candidate.pause, candidate.resume, candidate.destroy].every(function (fn) { return typeof fn === 'function'; });
}
export function newWriteableStream(reducer) {
    return new WriteableStreamImpl(reducer);
}
var WriteableStreamImpl = /** @class */ (function () {
    function WriteableStreamImpl(reducer) {
        this.reducer = reducer;
        this.state = {
            flowing: false,
            ended: false,
            destroyed: false
        };
        this.buffer = {
            data: [],
            error: []
        };
        this.listeners = {
            data: [],
            error: [],
            end: []
        };
    }
    WriteableStreamImpl.prototype.pause = function () {
        if (this.state.destroyed) {
            return;
        }
        this.state.flowing = false;
    };
    WriteableStreamImpl.prototype.resume = function () {
        if (this.state.destroyed) {
            return;
        }
        if (!this.state.flowing) {
            this.state.flowing = true;
            // emit buffered events
            this.flowData();
            this.flowErrors();
            this.flowEnd();
        }
    };
    WriteableStreamImpl.prototype.write = function (data) {
        if (this.state.destroyed) {
            return;
        }
        // flowing: directly send the data to listeners
        if (this.state.flowing) {
            this.listeners.data.forEach(function (listener) { return listener(data); });
        }
        // not yet flowing: buffer data until flowing
        else {
            this.buffer.data.push(data);
        }
    };
    WriteableStreamImpl.prototype.error = function (error) {
        if (this.state.destroyed) {
            return;
        }
        // flowing: directly send the error to listeners
        if (this.state.flowing) {
            this.listeners.error.forEach(function (listener) { return listener(error); });
        }
        // not yet flowing: buffer errors until flowing
        else {
            this.buffer.error.push(error);
        }
    };
    WriteableStreamImpl.prototype.end = function (result) {
        if (this.state.destroyed) {
            return;
        }
        // end with data or error if provided
        if (result instanceof Error) {
            this.error(result);
        }
        else if (result) {
            this.write(result);
        }
        // flowing: send end event to listeners
        if (this.state.flowing) {
            this.listeners.end.forEach(function (listener) { return listener(); });
            this.destroy();
        }
        // not yet flowing: remember state
        else {
            this.state.ended = true;
        }
    };
    WriteableStreamImpl.prototype.on = function (event, callback) {
        if (this.state.destroyed) {
            return;
        }
        switch (event) {
            case 'data':
                this.listeners.data.push(callback);
                // switch into flowing mode as soon as the first 'data'
                // listener is added and we are not yet in flowing mode
                this.resume();
                break;
            case 'end':
                this.listeners.end.push(callback);
                // emit 'end' event directly if we are flowing
                // and the end has already been reached
                //
                // finish() when it went through
                if (this.state.flowing && this.flowEnd()) {
                    this.destroy();
                }
                break;
            case 'error':
                this.listeners.error.push(callback);
                // emit buffered 'error' events unless done already
                // now that we know that we have at least one listener
                if (this.state.flowing) {
                    this.flowErrors();
                }
                break;
        }
    };
    WriteableStreamImpl.prototype.flowData = function () {
        if (this.buffer.data.length > 0) {
            var fullDataBuffer_1 = this.reducer(this.buffer.data);
            this.listeners.data.forEach(function (listener) { return listener(fullDataBuffer_1); });
            this.buffer.data.length = 0;
        }
    };
    WriteableStreamImpl.prototype.flowErrors = function () {
        if (this.listeners.error.length > 0) {
            var _loop_1 = function (error) {
                this_1.listeners.error.forEach(function (listener) { return listener(error); });
            };
            var this_1 = this;
            for (var _i = 0, _a = this.buffer.error; _i < _a.length; _i++) {
                var error = _a[_i];
                _loop_1(error);
            }
            this.buffer.error.length = 0;
        }
    };
    WriteableStreamImpl.prototype.flowEnd = function () {
        if (this.state.ended) {
            this.listeners.end.forEach(function (listener) { return listener(); });
            return this.listeners.end.length > 0;
        }
        return false;
    };
    WriteableStreamImpl.prototype.destroy = function () {
        if (!this.state.destroyed) {
            this.state.destroyed = true;
            this.state.ended = true;
            this.buffer.data.length = 0;
            this.buffer.error.length = 0;
            this.listeners.data.length = 0;
            this.listeners.error.length = 0;
            this.listeners.end.length = 0;
        }
    };
    return WriteableStreamImpl;
}());
/**
 * Helper to fully read a T readable into a T.
 */
export function consumeReadable(readable, reducer) {
    var chunks = [];
    var chunk;
    while ((chunk = readable.read()) !== null) {
        chunks.push(chunk);
    }
    return reducer(chunks);
}
/**
 * Helper to read a T readable up to a maximum of chunks. If the limit is
 * reached, will return a readable instead to ensure all data can still
 * be read.
 */
export function consumeReadableWithLimit(readable, reducer, maxChunks) {
    var chunks = [];
    var chunk = undefined;
    while ((chunk = readable.read()) !== null && chunks.length < maxChunks) {
        chunks.push(chunk);
    }
    // If the last chunk is null, it means we reached the end of
    // the readable and return all the data at once
    if (chunk === null && chunks.length > 0) {
        return reducer(chunks);
    }
    // Otherwise, we still have a chunk, it means we reached the maxChunks
    // value and as such we return a new Readable that first returns
    // the existing read chunks and then continues with reading from
    // the underlying readable.
    return {
        read: function () {
            // First consume chunks from our array
            if (chunks.length > 0) {
                return chunks.shift();
            }
            // Then ensure to return our last read chunk
            if (typeof chunk !== 'undefined') {
                var lastReadChunk = chunk;
                // explicitly use undefined here to indicate that we consumed
                // the chunk, which could have either been null or valued.
                chunk = undefined;
                return lastReadChunk;
            }
            // Finally delegate back to the Readable
            return readable.read();
        }
    };
}
/**
 * Helper to fully read a T stream into a T.
 */
export function consumeStream(stream, reducer) {
    return new Promise(function (resolve, reject) {
        var chunks = [];
        stream.on('data', function (data) { return chunks.push(data); });
        stream.on('error', function (error) { return reject(error); });
        stream.on('end', function () { return resolve(reducer(chunks)); });
    });
}
/**
 * Helper to read a T stream up to a maximum of chunks. If the limit is
 * reached, will return a stream instead to ensure all data can still
 * be read.
 */
export function consumeStreamWithLimit(stream, reducer, maxChunks) {
    return new Promise(function (resolve, reject) {
        var chunks = [];
        var wrapperStream = undefined;
        stream.on('data', function (data) {
            // If we reach maxChunks, we start to return a stream
            // and make sure that any data we have already read
            // is in it as well
            if (!wrapperStream && chunks.length === maxChunks) {
                wrapperStream = newWriteableStream(reducer);
                while (chunks.length) {
                    wrapperStream.write(chunks.shift());
                }
                wrapperStream.write(data);
                return resolve(wrapperStream);
            }
            if (wrapperStream) {
                wrapperStream.write(data);
            }
            else {
                chunks.push(data);
            }
        });
        stream.on('error', function (error) {
            if (wrapperStream) {
                wrapperStream.error(error);
            }
            else {
                return reject(error);
            }
        });
        stream.on('end', function () {
            if (wrapperStream) {
                while (chunks.length) {
                    wrapperStream.write(chunks.shift());
                }
                wrapperStream.end();
            }
            else {
                return resolve(reducer(chunks));
            }
        });
    });
}
/**
 * Helper to create a readable stream from an existing T.
 */
export function toStream(t, reducer) {
    var stream = newWriteableStream(reducer);
    stream.end(t);
    return stream;
}
/**
 * Helper to convert a T into a Readable<T>.
 */
export function toReadable(t) {
    var consumed = false;
    return {
        read: function () {
            if (consumed) {
                return null;
            }
            consumed = true;
            return t;
        }
    };
}
/**
 * Helper to transform a readable stream into another stream.
 */
export function transform(stream, transformer, reducer) {
    var target = newWriteableStream(reducer);
    stream.on('data', function (data) { return target.write(transformer.data(data)); });
    stream.on('end', function () { return target.end(); });
    stream.on('error', function (error) { return target.error(transformer.error ? transformer.error(error) : error); });
    return target;
}
