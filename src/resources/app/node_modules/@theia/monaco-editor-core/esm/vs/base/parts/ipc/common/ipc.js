/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Event, Emitter, Relay } from '../../../common/event';
import { toDisposable, combinedDisposable } from '../../../common/lifecycle';
import { createCancelablePromise, timeout } from '../../../common/async';
import { CancellationToken, CancellationTokenSource } from '../../../common/cancellation';
import * as errors from '../../../common/errors';
import { VSBuffer } from '../../../common/buffer';
var State;
(function (State) {
    State[State["Uninitialized"] = 0] = "Uninitialized";
    State[State["Idle"] = 1] = "Idle";
})(State || (State = {}));
var BufferReader = /** @class */ (function () {
    function BufferReader(buffer) {
        this.buffer = buffer;
        this.pos = 0;
    }
    BufferReader.prototype.read = function (bytes) {
        var result = this.buffer.slice(this.pos, this.pos + bytes);
        this.pos += result.byteLength;
        return result;
    };
    return BufferReader;
}());
var BufferWriter = /** @class */ (function () {
    function BufferWriter() {
        this.buffers = [];
    }
    Object.defineProperty(BufferWriter.prototype, "buffer", {
        get: function () {
            return VSBuffer.concat(this.buffers);
        },
        enumerable: true,
        configurable: true
    });
    BufferWriter.prototype.write = function (buffer) {
        this.buffers.push(buffer);
    };
    return BufferWriter;
}());
var DataType;
(function (DataType) {
    DataType[DataType["Undefined"] = 0] = "Undefined";
    DataType[DataType["String"] = 1] = "String";
    DataType[DataType["Buffer"] = 2] = "Buffer";
    DataType[DataType["VSBuffer"] = 3] = "VSBuffer";
    DataType[DataType["Array"] = 4] = "Array";
    DataType[DataType["Object"] = 5] = "Object";
})(DataType || (DataType = {}));
function createSizeBuffer(size) {
    var result = VSBuffer.alloc(4);
    result.writeUInt32BE(size, 0);
    return result;
}
function readSizeBuffer(reader) {
    return reader.read(4).readUInt32BE(0);
}
function createOneByteBuffer(value) {
    var result = VSBuffer.alloc(1);
    result.writeUInt8(value, 0);
    return result;
}
var BufferPresets = {
    Undefined: createOneByteBuffer(DataType.Undefined),
    String: createOneByteBuffer(DataType.String),
    Buffer: createOneByteBuffer(DataType.Buffer),
    VSBuffer: createOneByteBuffer(DataType.VSBuffer),
    Array: createOneByteBuffer(DataType.Array),
    Object: createOneByteBuffer(DataType.Object),
};
var hasBuffer = (typeof Buffer !== 'undefined');
function serialize(writer, data) {
    if (typeof data === 'undefined') {
        writer.write(BufferPresets.Undefined);
    }
    else if (typeof data === 'string') {
        var buffer = VSBuffer.fromString(data);
        writer.write(BufferPresets.String);
        writer.write(createSizeBuffer(buffer.byteLength));
        writer.write(buffer);
    }
    else if (hasBuffer && Buffer.isBuffer(data)) {
        var buffer = VSBuffer.wrap(data);
        writer.write(BufferPresets.Buffer);
        writer.write(createSizeBuffer(buffer.byteLength));
        writer.write(buffer);
    }
    else if (data instanceof VSBuffer) {
        writer.write(BufferPresets.VSBuffer);
        writer.write(createSizeBuffer(data.byteLength));
        writer.write(data);
    }
    else if (Array.isArray(data)) {
        writer.write(BufferPresets.Array);
        writer.write(createSizeBuffer(data.length));
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var el = data_1[_i];
            serialize(writer, el);
        }
    }
    else {
        var buffer = VSBuffer.fromString(JSON.stringify(data));
        writer.write(BufferPresets.Object);
        writer.write(createSizeBuffer(buffer.byteLength));
        writer.write(buffer);
    }
}
function deserialize(reader) {
    var type = reader.read(1).readUInt8(0);
    switch (type) {
        case DataType.Undefined: return undefined;
        case DataType.String: return reader.read(readSizeBuffer(reader)).toString();
        case DataType.Buffer: return reader.read(readSizeBuffer(reader)).buffer;
        case DataType.VSBuffer: return reader.read(readSizeBuffer(reader));
        case DataType.Array: {
            var length_1 = readSizeBuffer(reader);
            var result = [];
            for (var i = 0; i < length_1; i++) {
                result.push(deserialize(reader));
            }
            return result;
        }
        case DataType.Object: return JSON.parse(reader.read(readSizeBuffer(reader)).toString());
    }
}
var ChannelServer = /** @class */ (function () {
    function ChannelServer(protocol, ctx, timeoutDelay) {
        var _this = this;
        if (timeoutDelay === void 0) { timeoutDelay = 1000; }
        this.protocol = protocol;
        this.ctx = ctx;
        this.timeoutDelay = timeoutDelay;
        this.channels = new Map();
        this.activeRequests = new Map();
        // Requests might come in for channels which are not yet registered.
        // They will timeout after `timeoutDelay`.
        this.pendingRequests = new Map();
        this.protocolListener = this.protocol.onMessage(function (msg) { return _this.onRawMessage(msg); });
        this.sendResponse({ type: 200 /* Initialize */ });
    }
    ChannelServer.prototype.registerChannel = function (channelName, channel) {
        var _this = this;
        this.channels.set(channelName, channel);
        // https://github.com/microsoft/vscode/issues/72531
        setTimeout(function () { return _this.flushPendingRequests(channelName); }, 0);
    };
    ChannelServer.prototype.sendResponse = function (response) {
        switch (response.type) {
            case 200 /* Initialize */:
                return this.send([response.type]);
            case 201 /* PromiseSuccess */:
            case 202 /* PromiseError */:
            case 204 /* EventFire */:
            case 203 /* PromiseErrorObj */:
                return this.send([response.type, response.id], response.data);
        }
    };
    ChannelServer.prototype.send = function (header, body) {
        if (body === void 0) { body = undefined; }
        var writer = new BufferWriter();
        serialize(writer, header);
        serialize(writer, body);
        this.sendBuffer(writer.buffer);
    };
    ChannelServer.prototype.sendBuffer = function (message) {
        try {
            this.protocol.send(message);
        }
        catch (err) {
            // noop
        }
    };
    ChannelServer.prototype.onRawMessage = function (message) {
        var reader = new BufferReader(message);
        var header = deserialize(reader);
        var body = deserialize(reader);
        var type = header[0];
        switch (type) {
            case 100 /* Promise */:
                return this.onPromise({ type: type, id: header[1], channelName: header[2], name: header[3], arg: body });
            case 102 /* EventListen */:
                return this.onEventListen({ type: type, id: header[1], channelName: header[2], name: header[3], arg: body });
            case 101 /* PromiseCancel */:
                return this.disposeActiveRequest({ type: type, id: header[1] });
            case 103 /* EventDispose */:
                return this.disposeActiveRequest({ type: type, id: header[1] });
        }
    };
    ChannelServer.prototype.onPromise = function (request) {
        var _this = this;
        var channel = this.channels.get(request.channelName);
        if (!channel) {
            this.collectPendingRequest(request);
            return;
        }
        var cancellationTokenSource = new CancellationTokenSource();
        var promise;
        try {
            promise = channel.call(this.ctx, request.name, request.arg, cancellationTokenSource.token);
        }
        catch (err) {
            promise = Promise.reject(err);
        }
        var id = request.id;
        promise.then(function (data) {
            _this.sendResponse({ id: id, data: data, type: 201 /* PromiseSuccess */ });
            _this.activeRequests.delete(request.id);
        }, function (err) {
            if (err instanceof Error) {
                _this.sendResponse({
                    id: id, data: {
                        message: err.message,
                        name: err.name,
                        stack: err.stack ? (err.stack.split ? err.stack.split('\n') : err.stack) : undefined
                    }, type: 202 /* PromiseError */
                });
            }
            else {
                _this.sendResponse({ id: id, data: err, type: 203 /* PromiseErrorObj */ });
            }
            _this.activeRequests.delete(request.id);
        });
        var disposable = toDisposable(function () { return cancellationTokenSource.cancel(); });
        this.activeRequests.set(request.id, disposable);
    };
    ChannelServer.prototype.onEventListen = function (request) {
        var _this = this;
        var channel = this.channels.get(request.channelName);
        if (!channel) {
            this.collectPendingRequest(request);
            return;
        }
        var id = request.id;
        var event = channel.listen(this.ctx, request.name, request.arg);
        var disposable = event(function (data) { return _this.sendResponse({ id: id, data: data, type: 204 /* EventFire */ }); });
        this.activeRequests.set(request.id, disposable);
    };
    ChannelServer.prototype.disposeActiveRequest = function (request) {
        var disposable = this.activeRequests.get(request.id);
        if (disposable) {
            disposable.dispose();
            this.activeRequests.delete(request.id);
        }
    };
    ChannelServer.prototype.collectPendingRequest = function (request) {
        var _this = this;
        var pendingRequests = this.pendingRequests.get(request.channelName);
        if (!pendingRequests) {
            pendingRequests = [];
            this.pendingRequests.set(request.channelName, pendingRequests);
        }
        var timer = setTimeout(function () {
            console.error("Unknown channel: " + request.channelName);
            if (request.type === 100 /* Promise */) {
                _this.sendResponse({
                    id: request.id,
                    data: { name: 'Unknown channel', message: "Channel name '" + request.channelName + "' timed out after " + _this.timeoutDelay + "ms", stack: undefined },
                    type: 202 /* PromiseError */
                });
            }
        }, this.timeoutDelay);
        pendingRequests.push({ request: request, timeoutTimer: timer });
    };
    ChannelServer.prototype.flushPendingRequests = function (channelName) {
        var requests = this.pendingRequests.get(channelName);
        if (requests) {
            for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
                var request = requests_1[_i];
                clearTimeout(request.timeoutTimer);
                switch (request.request.type) {
                    case 100 /* Promise */:
                        this.onPromise(request.request);
                        break;
                    case 102 /* EventListen */:
                        this.onEventListen(request.request);
                        break;
                }
            }
            this.pendingRequests.delete(channelName);
        }
    };
    ChannelServer.prototype.dispose = function () {
        if (this.protocolListener) {
            this.protocolListener.dispose();
            this.protocolListener = null;
        }
        this.activeRequests.forEach(function (d) { return d.dispose(); });
        this.activeRequests.clear();
    };
    return ChannelServer;
}());
export { ChannelServer };
var ChannelClient = /** @class */ (function () {
    function ChannelClient(protocol) {
        var _this = this;
        this.protocol = protocol;
        this.state = State.Uninitialized;
        this.activeRequests = new Set();
        this.handlers = new Map();
        this.lastRequestId = 0;
        this._onDidInitialize = new Emitter();
        this.onDidInitialize = this._onDidInitialize.event;
        this.protocolListener = this.protocol.onMessage(function (msg) { return _this.onBuffer(msg); });
    }
    ChannelClient.prototype.getChannel = function (channelName) {
        var that = this;
        return {
            call: function (command, arg, cancellationToken) {
                return that.requestPromise(channelName, command, arg, cancellationToken);
            },
            listen: function (event, arg) {
                return that.requestEvent(channelName, event, arg);
            }
        };
    };
    ChannelClient.prototype.requestPromise = function (channelName, name, arg, cancellationToken) {
        var _this = this;
        if (cancellationToken === void 0) { cancellationToken = CancellationToken.None; }
        var id = this.lastRequestId++;
        var type = 100 /* Promise */;
        var request = { id: id, type: type, channelName: channelName, name: name, arg: arg };
        if (cancellationToken.isCancellationRequested) {
            return Promise.reject(errors.canceled());
        }
        var disposable;
        var result = new Promise(function (c, e) {
            if (cancellationToken.isCancellationRequested) {
                return e(errors.canceled());
            }
            var uninitializedPromise = createCancelablePromise(function (_) { return _this.whenInitialized(); });
            uninitializedPromise.then(function () {
                uninitializedPromise = null;
                var handler = function (response) {
                    switch (response.type) {
                        case 201 /* PromiseSuccess */:
                            _this.handlers.delete(id);
                            c(response.data);
                            break;
                        case 202 /* PromiseError */:
                            _this.handlers.delete(id);
                            var error = new Error(response.data.message);
                            error.stack = response.data.stack;
                            error.name = response.data.name;
                            e(error);
                            break;
                        case 203 /* PromiseErrorObj */:
                            _this.handlers.delete(id);
                            e(response.data);
                            break;
                    }
                };
                _this.handlers.set(id, handler);
                _this.sendRequest(request);
            });
            var cancel = function () {
                if (uninitializedPromise) {
                    uninitializedPromise.cancel();
                    uninitializedPromise = null;
                }
                else {
                    _this.sendRequest({ id: id, type: 101 /* PromiseCancel */ });
                }
                e(errors.canceled());
            };
            var cancellationTokenListener = cancellationToken.onCancellationRequested(cancel);
            disposable = combinedDisposable(toDisposable(cancel), cancellationTokenListener);
            _this.activeRequests.add(disposable);
        });
        return result.finally(function () { return _this.activeRequests.delete(disposable); });
    };
    ChannelClient.prototype.requestEvent = function (channelName, name, arg) {
        var _this = this;
        var id = this.lastRequestId++;
        var type = 102 /* EventListen */;
        var request = { id: id, type: type, channelName: channelName, name: name, arg: arg };
        var uninitializedPromise = null;
        var emitter = new Emitter({
            onFirstListenerAdd: function () {
                uninitializedPromise = createCancelablePromise(function (_) { return _this.whenInitialized(); });
                uninitializedPromise.then(function () {
                    uninitializedPromise = null;
                    _this.activeRequests.add(emitter);
                    _this.sendRequest(request);
                });
            },
            onLastListenerRemove: function () {
                if (uninitializedPromise) {
                    uninitializedPromise.cancel();
                    uninitializedPromise = null;
                }
                else {
                    _this.activeRequests.delete(emitter);
                    _this.sendRequest({ id: id, type: 103 /* EventDispose */ });
                }
            }
        });
        var handler = function (res) { return emitter.fire(res.data); };
        this.handlers.set(id, handler);
        return emitter.event;
    };
    ChannelClient.prototype.sendRequest = function (request) {
        switch (request.type) {
            case 100 /* Promise */:
            case 102 /* EventListen */:
                return this.send([request.type, request.id, request.channelName, request.name], request.arg);
            case 101 /* PromiseCancel */:
            case 103 /* EventDispose */:
                return this.send([request.type, request.id]);
        }
    };
    ChannelClient.prototype.send = function (header, body) {
        if (body === void 0) { body = undefined; }
        var writer = new BufferWriter();
        serialize(writer, header);
        serialize(writer, body);
        this.sendBuffer(writer.buffer);
    };
    ChannelClient.prototype.sendBuffer = function (message) {
        try {
            this.protocol.send(message);
        }
        catch (err) {
            // noop
        }
    };
    ChannelClient.prototype.onBuffer = function (message) {
        var reader = new BufferReader(message);
        var header = deserialize(reader);
        var body = deserialize(reader);
        var type = header[0];
        switch (type) {
            case 200 /* Initialize */:
                return this.onResponse({ type: header[0] });
            case 201 /* PromiseSuccess */:
            case 202 /* PromiseError */:
            case 204 /* EventFire */:
            case 203 /* PromiseErrorObj */:
                return this.onResponse({ type: header[0], id: header[1], data: body });
        }
    };
    ChannelClient.prototype.onResponse = function (response) {
        if (response.type === 200 /* Initialize */) {
            this.state = State.Idle;
            this._onDidInitialize.fire();
            return;
        }
        var handler = this.handlers.get(response.id);
        if (handler) {
            handler(response);
        }
    };
    ChannelClient.prototype.whenInitialized = function () {
        if (this.state === State.Idle) {
            return Promise.resolve();
        }
        else {
            return Event.toPromise(this.onDidInitialize);
        }
    };
    ChannelClient.prototype.dispose = function () {
        if (this.protocolListener) {
            this.protocolListener.dispose();
            this.protocolListener = null;
        }
        this.activeRequests.forEach(function (p) { return p.dispose(); });
        this.activeRequests.clear();
    };
    return ChannelClient;
}());
export { ChannelClient };
/**
 * An `IPCServer` is both a channel server and a routing channel
 * client.
 *
 * As the owner of a protocol, you should extend both this
 * and the `IPCClient` classes to get IPC implementations
 * for your protocol.
 */
var IPCServer = /** @class */ (function () {
    function IPCServer(onDidClientConnect) {
        var _this = this;
        this.channels = new Map();
        this._connections = new Set();
        this._onDidChangeConnections = new Emitter();
        this.onDidChangeConnections = this._onDidChangeConnections.event;
        onDidClientConnect(function (_a) {
            var protocol = _a.protocol, onDidClientDisconnect = _a.onDidClientDisconnect;
            var onFirstMessage = Event.once(protocol.onMessage);
            onFirstMessage(function (msg) {
                var reader = new BufferReader(msg);
                var ctx = deserialize(reader);
                var channelServer = new ChannelServer(protocol, ctx);
                var channelClient = new ChannelClient(protocol);
                _this.channels.forEach(function (channel, name) { return channelServer.registerChannel(name, channel); });
                var connection = { channelServer: channelServer, channelClient: channelClient, ctx: ctx };
                _this._connections.add(connection);
                _this._onDidChangeConnections.fire(connection);
                onDidClientDisconnect(function () {
                    channelServer.dispose();
                    channelClient.dispose();
                    _this._connections.delete(connection);
                });
            });
        });
    }
    Object.defineProperty(IPCServer.prototype, "connections", {
        get: function () {
            var result = [];
            this._connections.forEach(function (ctx) { return result.push(ctx); });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    IPCServer.prototype.getChannel = function (channelName, router) {
        var that = this;
        return {
            call: function (command, arg, cancellationToken) {
                var channelPromise = router.routeCall(that, command, arg)
                    .then(function (connection) { return connection.channelClient.getChannel(channelName); });
                return getDelayedChannel(channelPromise)
                    .call(command, arg, cancellationToken);
            },
            listen: function (event, arg) {
                var channelPromise = router.routeEvent(that, event, arg)
                    .then(function (connection) { return connection.channelClient.getChannel(channelName); });
                return getDelayedChannel(channelPromise)
                    .listen(event, arg);
            }
        };
    };
    IPCServer.prototype.registerChannel = function (channelName, channel) {
        this.channels.set(channelName, channel);
        this._connections.forEach(function (connection) {
            connection.channelServer.registerChannel(channelName, channel);
        });
    };
    IPCServer.prototype.dispose = function () {
        this.channels.clear();
        this._connections.clear();
        this._onDidChangeConnections.dispose();
    };
    return IPCServer;
}());
export { IPCServer };
/**
 * An `IPCClient` is both a channel client and a channel server.
 *
 * As the owner of a protocol, you should extend both this
 * and the `IPCClient` classes to get IPC implementations
 * for your protocol.
 */
var IPCClient = /** @class */ (function () {
    function IPCClient(protocol, ctx) {
        var writer = new BufferWriter();
        serialize(writer, ctx);
        protocol.send(writer.buffer);
        this.channelClient = new ChannelClient(protocol);
        this.channelServer = new ChannelServer(protocol, ctx);
    }
    IPCClient.prototype.getChannel = function (channelName) {
        return this.channelClient.getChannel(channelName);
    };
    IPCClient.prototype.registerChannel = function (channelName, channel) {
        this.channelServer.registerChannel(channelName, channel);
    };
    IPCClient.prototype.dispose = function () {
        this.channelClient.dispose();
        this.channelServer.dispose();
    };
    return IPCClient;
}());
export { IPCClient };
export function getDelayedChannel(promise) {
    return {
        call: function (command, arg, cancellationToken) {
            return promise.then(function (c) { return c.call(command, arg, cancellationToken); });
        },
        listen: function (event, arg) {
            var relay = new Relay();
            promise.then(function (c) { return relay.input = c.listen(event, arg); });
            return relay.event;
        }
    };
}
export function getNextTickChannel(channel) {
    var didTick = false;
    return {
        call: function (command, arg, cancellationToken) {
            if (didTick) {
                return channel.call(command, arg, cancellationToken);
            }
            return timeout(0)
                .then(function () { return didTick = true; })
                .then(function () { return channel.call(command, arg, cancellationToken); });
        },
        listen: function (event, arg) {
            if (didTick) {
                return channel.listen(event, arg);
            }
            var relay = new Relay();
            timeout(0)
                .then(function () { return didTick = true; })
                .then(function () { return relay.input = channel.listen(event, arg); });
            return relay.event;
        }
    };
}
var StaticRouter = /** @class */ (function () {
    function StaticRouter(fn) {
        this.fn = fn;
    }
    StaticRouter.prototype.routeCall = function (hub) {
        return this.route(hub);
    };
    StaticRouter.prototype.routeEvent = function (hub) {
        return this.route(hub);
    };
    StaticRouter.prototype.route = function (hub) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, connection;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = hub.connections;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        connection = _a[_i];
                        return [4 /*yield*/, Promise.resolve(this.fn(connection.ctx))];
                    case 2:
                        if (_b.sent()) {
                            return [2 /*return*/, Promise.resolve(connection)];
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, Event.toPromise(hub.onDidChangeConnections)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.route(hub)];
                    case 6: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return StaticRouter;
}());
export { StaticRouter };
