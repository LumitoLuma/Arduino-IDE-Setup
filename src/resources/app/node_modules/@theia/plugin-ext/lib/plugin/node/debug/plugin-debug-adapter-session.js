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
exports.PluginDebugAdapterSession = void 0;
var debug_adapter_session_1 = require("@theia/debug/lib/node/debug-adapter-session");
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Server debug adapter session.
 */
var PluginDebugAdapterSession = /** @class */ (function (_super) {
    __extends(PluginDebugAdapterSession, _super);
    function PluginDebugAdapterSession(communicationProvider, tracker, theiaSession) {
        var _this = _super.call(this, theiaSession.id, communicationProvider) || this;
        _this.communicationProvider = communicationProvider;
        _this.tracker = tracker;
        _this.theiaSession = theiaSession;
        _this.type = theiaSession.type;
        _this.name = theiaSession.name;
        _this.configuration = theiaSession.configuration;
        return _this;
    }
    PluginDebugAdapterSession.prototype.start = function (channel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tracker.onWillStartSession) {
                            this.tracker.onWillStartSession();
                        }
                        return [4 /*yield*/, _super.prototype.start.call(this, channel)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginDebugAdapterSession.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tracker.onWillStopSession) {
                            this.tracker.onWillStopSession();
                        }
                        return [4 /*yield*/, _super.prototype.stop.call(this)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginDebugAdapterSession.prototype.customRequest = function (command, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.theiaSession.customRequest(command, args)];
            });
        });
    };
    PluginDebugAdapterSession.prototype.onDebugAdapterError = function (error) {
        if (this.tracker.onError) {
            this.tracker.onError(error);
        }
        _super.prototype.onDebugAdapterError.call(this, error);
    };
    PluginDebugAdapterSession.prototype.send = function (message) {
        try {
            _super.prototype.send.call(this, message);
        }
        finally {
            if (this.tracker.onDidSendMessage) {
                this.tracker.onDidSendMessage(JSON.parse(message));
            }
        }
    };
    PluginDebugAdapterSession.prototype.write = function (message) {
        if (this.tracker.onWillReceiveMessage) {
            this.tracker.onWillReceiveMessage(JSON.parse(message));
        }
        _super.prototype.write.call(this, message);
    };
    PluginDebugAdapterSession.prototype.onDebugAdapterExit = function (exitCode, signal) {
        if (this.tracker.onExit) {
            this.tracker.onExit(exitCode, signal);
        }
        _super.prototype.onDebugAdapterExit.call(this, exitCode, signal);
    };
    return PluginDebugAdapterSession;
}(debug_adapter_session_1.DebugAdapterSessionImpl));
exports.PluginDebugAdapterSession = PluginDebugAdapterSession;
//# sourceMappingURL=plugin-debug-adapter-session.js.map