"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
exports.WebSocketChannel = void 0;
var disposable_1 = require("../disposable");
var event_1 = require("../event");
var WebSocketChannel = /** @class */ (function () {
    function WebSocketChannel(id, doSend) {
        this.id = id;
        this.doSend = doSend;
        this.closeEmitter = new event_1.Emitter();
        this.toDispose = new disposable_1.DisposableCollection(this.closeEmitter);
        this.fireOpen = function () { };
        this.fireMessage = function () { };
        this.fireError = function () { };
        this.closing = false;
    }
    WebSocketChannel.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    WebSocketChannel.prototype.checkNotDisposed = function () {
        if (this.toDispose.disposed) {
            throw new Error('The channel has been disposed.');
        }
    };
    WebSocketChannel.prototype.handleMessage = function (message) {
        if (message.kind === 'ready') {
            this.fireOpen();
        }
        else if (message.kind === 'data') {
            this.fireMessage(message.content);
        }
        else if (message.kind === 'close') {
            this.fireClose(message.code, message.reason);
        }
    };
    WebSocketChannel.prototype.open = function (path) {
        this.checkNotDisposed();
        this.doSend(JSON.stringify({
            kind: 'open',
            id: this.id,
            path: path
        }));
    };
    WebSocketChannel.prototype.ready = function () {
        this.checkNotDisposed();
        this.doSend(JSON.stringify({
            kind: 'ready',
            id: this.id
        }));
    };
    WebSocketChannel.prototype.send = function (content) {
        this.checkNotDisposed();
        this.doSend(JSON.stringify({
            kind: 'data',
            id: this.id,
            content: content
        }));
    };
    WebSocketChannel.prototype.close = function (code, reason) {
        if (code === void 0) { code = 1000; }
        if (reason === void 0) { reason = ''; }
        if (this.closing) {
            // Do not try to close the channel if it is already closing.
            return;
        }
        this.checkNotDisposed();
        this.doSend(JSON.stringify({
            kind: 'close',
            id: this.id,
            code: code,
            reason: reason
        }));
        this.fireClose(code, reason);
    };
    WebSocketChannel.prototype.tryClose = function (code, reason) {
        if (code === void 0) { code = 1000; }
        if (reason === void 0) { reason = ''; }
        if (this.closing || this.toDispose.disposed) {
            // Do not try to close the channel if it is already closing or disposed.
            return;
        }
        this.doSend(JSON.stringify({
            kind: 'close',
            id: this.id,
            code: code,
            reason: reason
        }));
        this.fireClose(code, reason);
    };
    WebSocketChannel.prototype.onOpen = function (cb) {
        var _this = this;
        this.checkNotDisposed();
        this.fireOpen = cb;
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.fireOpen = function () { }; }));
    };
    WebSocketChannel.prototype.onMessage = function (cb) {
        var _this = this;
        this.checkNotDisposed();
        this.fireMessage = cb;
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.fireMessage = function () { }; }));
    };
    WebSocketChannel.prototype.onError = function (cb) {
        var _this = this;
        this.checkNotDisposed();
        this.fireError = cb;
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.fireError = function () { }; }));
    };
    WebSocketChannel.prototype.fireClose = function (code, reason) {
        if (this.closing) {
            return;
        }
        this.closing = true;
        try {
            this.closeEmitter.fire([code, reason]);
        }
        finally {
            this.closing = false;
        }
        this.dispose();
    };
    WebSocketChannel.prototype.onClose = function (cb) {
        this.checkNotDisposed();
        return this.closeEmitter.event(function (_a) {
            var _b = __read(_a, 2), code = _b[0], reason = _b[1];
            return cb(code, reason);
        });
    };
    WebSocketChannel.wsPath = '/services';
    return WebSocketChannel;
}());
exports.WebSocketChannel = WebSocketChannel;
//# sourceMappingURL=web-socket-channel.js.map