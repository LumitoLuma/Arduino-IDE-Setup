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
var event_1 = require("@theia/core/lib/common/event");
var rpc_protocol_1 = require("../../common/rpc-protocol");
var plugin_host_rpc_1 = require("./plugin-host-rpc");
console.log('PLUGIN_HOST(' + process.pid + ') starting instance');
// override exit() function, to do not allow plugin kill this node
process.exit = function (code) {
    var err = new Error('An plugin call process.exit() and it was prevented.');
    console.warn(err.stack);
};
// same for 'crash'(works only in electron)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var proc = process;
if (proc.crash) {
    proc.crash = function () {
        var err = new Error('An plugin call process.crash() and it was prevented.');
        console.warn(err.stack);
    };
}
process.on('uncaughtException', function (err) {
    console.error(err);
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var unhandledPromises = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', function (reason, promise) {
    unhandledPromises.push(promise);
    setTimeout(function () {
        var index = unhandledPromises.indexOf(promise);
        if (index >= 0) {
            promise.catch(function (err) {
                unhandledPromises.splice(index, 1);
                if (terminating && (rpc_protocol_1.ConnectionClosedError.is(err) || rpc_protocol_1.ConnectionClosedError.is(reason))) {
                    // during termination it is expected that pending rpc request are rejected
                    return;
                }
                console.error("Promise rejection not handled in one second: " + err + " , reason: " + reason);
                if (err && err.stack) {
                    console.error("With stack trace: " + err.stack);
                }
            });
        }
    }, 1000);
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('rejectionHandled', function (promise) {
    var index = unhandledPromises.indexOf(promise);
    if (index >= 0) {
        unhandledPromises.splice(index, 1);
    }
});
var terminating = false;
var emitter = new event_1.Emitter();
var rpc = new rpc_protocol_1.RPCProtocolImpl({
    onMessage: emitter.event,
    send: function (m) {
        if (process.send && !terminating) {
            process.send(JSON.stringify(m));
        }
    }
});
process.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var msg_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (terminating) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                msg_1 = JSON.parse(message);
                if (!('type' in msg_1 && msg_1.type === 5 /* Terminate */)) return [3 /*break*/, 6];
                terminating = true;
                emitter.dispose();
                if (!('stopTimeout' in msg_1 && typeof msg_1.stopTimeout === 'number' && msg_1.stopTimeout)) return [3 /*break*/, 3];
                return [4 /*yield*/, Promise.race([
                        pluginHostRPC.terminate(),
                        new Promise(function (resolve) { return setTimeout(resolve, msg_1.stopTimeout); })
                    ])];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, pluginHostRPC.terminate()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                rpc.dispose();
                if (process.send) {
                    process.send(JSON.stringify({ type: 6 /* Terminated */ }));
                }
                return [3 /*break*/, 7];
            case 6:
                emitter.fire(msg_1);
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
var pluginHostRPC = new plugin_host_rpc_1.PluginHostRPC(rpc);
pluginHostRPC.initialize();
//# sourceMappingURL=plugin-host.js.map