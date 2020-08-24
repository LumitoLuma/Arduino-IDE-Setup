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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugAdapterSessionImpl = void 0;
var disposable_1 = require("@theia/core/lib/common/disposable");
/**
 * [DebugAdapterSession](#DebugAdapterSession) implementation.
 */
var DebugAdapterSessionImpl = /** @class */ (function () {
    function DebugAdapterSessionImpl(id, communicationProvider) {
        var _this = this;
        this.id = id;
        this.communicationProvider = communicationProvider;
        this.toDispose = new disposable_1.DisposableCollection();
        this.contentLength = -1;
        this.buffer = Buffer.alloc(0);
        this.toDispose.pushAll([
            this.communicationProvider,
            disposable_1.Disposable.create(function () { return _this.write(JSON.stringify({ seq: -1, type: 'request', command: 'disconnect' })); }),
            disposable_1.Disposable.create(function () { return _this.write(JSON.stringify({ seq: -1, type: 'request', command: 'terminate' })); })
        ]);
    }
    DebugAdapterSessionImpl.prototype.start = function (channel) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.channel) {
                    throw new Error('The session has already been started, id: ' + this.id);
                }
                this.channel = channel;
                this.channel.onMessage(function (message) { return _this.write(message); });
                this.channel.onClose(function () { return _this.channel = undefined; });
                this.communicationProvider.output.on('data', function (data) { return _this.handleData(data); });
                this.communicationProvider.output.on('close', function () { return _this.onDebugAdapterExit(1, undefined); }); // FIXME pass a proper exit code
                this.communicationProvider.output.on('error', function (error) { return _this.onDebugAdapterError(error); });
                this.communicationProvider.input.on('error', function (error) { return _this.onDebugAdapterError(error); });
                return [2 /*return*/];
            });
        });
    };
    DebugAdapterSessionImpl.prototype.onDebugAdapterExit = function (exitCode, signal) {
        var event = {
            type: 'event',
            event: 'exited',
            seq: -1,
            body: {
                exitCode: exitCode
            }
        };
        this.send(JSON.stringify(event));
    };
    DebugAdapterSessionImpl.prototype.onDebugAdapterError = function (error) {
        var event = {
            type: 'event',
            event: 'error',
            seq: -1,
            body: error
        };
        this.send(JSON.stringify(event));
    };
    DebugAdapterSessionImpl.prototype.handleData = function (data) {
        this.buffer = Buffer.concat([this.buffer, data]);
        while (true) {
            if (this.contentLength >= 0) {
                if (this.buffer.length >= this.contentLength) {
                    var message = this.buffer.toString('utf8', 0, this.contentLength);
                    this.buffer = this.buffer.slice(this.contentLength);
                    this.contentLength = -1;
                    if (message.length > 0) {
                        this.send(message);
                    }
                    continue; // there may be more complete messages to process
                }
            }
            else {
                var idx = this.buffer.indexOf(DebugAdapterSessionImpl.CONTENT_LENGTH);
                if (idx > 0) {
                    // log unrecognized output
                    var output = this.buffer.slice(0, idx);
                    console.log(output.toString('utf-8'));
                    this.buffer = this.buffer.slice(idx);
                }
                idx = this.buffer.indexOf(DebugAdapterSessionImpl.TWO_CRLF);
                if (idx !== -1) {
                    var header = this.buffer.toString('utf8', 0, idx);
                    var lines = header.split('\r\n');
                    for (var i = 0; i < lines.length; i++) {
                        var pair = lines[i].split(/: +/);
                        if (pair[0] === DebugAdapterSessionImpl.CONTENT_LENGTH) {
                            this.contentLength = +pair[1];
                        }
                    }
                    this.buffer = this.buffer.slice(idx + DebugAdapterSessionImpl.TWO_CRLF.length);
                    continue;
                }
            }
            break;
        }
    };
    DebugAdapterSessionImpl.prototype.send = function (message) {
        if (this.channel) {
            this.channel.send(message);
        }
    };
    DebugAdapterSessionImpl.prototype.write = function (message) {
        this.communicationProvider.input.write("Content-Length: " + Buffer.byteLength(message, 'utf8') + "\r\n\r\n" + message, 'utf8');
    };
    DebugAdapterSessionImpl.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.toDispose.dispose();
                return [2 /*return*/];
            });
        });
    };
    DebugAdapterSessionImpl.TWO_CRLF = '\r\n\r\n';
    DebugAdapterSessionImpl.CONTENT_LENGTH = 'Content-Length';
    return DebugAdapterSessionImpl;
}());
exports.DebugAdapterSessionImpl = DebugAdapterSessionImpl;
//# sourceMappingURL=debug-adapter-session.js.map