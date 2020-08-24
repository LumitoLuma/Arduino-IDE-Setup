"use strict";
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginDebugAdapterTracker = void 0;
var PluginDebugAdapterTracker = /** @class */ (function () {
    function PluginDebugAdapterTracker(trackers) {
        this.trackers = trackers;
    }
    PluginDebugAdapterTracker.create = function (session, trackerFactories) {
        return __awaiter(this, void 0, void 0, function () {
            var trackers, factories, factories_1, factories_1_1, factory, tracker, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        trackers = [];
                        factories = trackerFactories.filter(function (tuple) { return tuple[0] === '*' || tuple[0] === session.type; }).map(function (tuple) { return tuple[1]; });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        factories_1 = __values(factories), factories_1_1 = factories_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!factories_1_1.done) return [3 /*break*/, 5];
                        factory = factories_1_1.value;
                        return [4 /*yield*/, factory.createDebugAdapterTracker(session)];
                    case 3:
                        tracker = _b.sent();
                        if (tracker) {
                            trackers.push(tracker);
                        }
                        _b.label = 4;
                    case 4:
                        factories_1_1 = factories_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (factories_1_1 && !factories_1_1.done && (_a = factories_1.return)) _a.call(factories_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, new PluginDebugAdapterTracker(trackers)];
                }
            });
        });
    };
    PluginDebugAdapterTracker.prototype.onWillStartSession = function () {
        this.trackers.forEach(function (tracker) {
            if (tracker.onWillStartSession) {
                tracker.onWillStartSession();
            }
        });
    };
    PluginDebugAdapterTracker.prototype.onWillReceiveMessage = function (message) {
        this.trackers.forEach(function (tracker) {
            if (tracker.onWillReceiveMessage) {
                tracker.onWillReceiveMessage(message);
            }
        });
    };
    PluginDebugAdapterTracker.prototype.onDidSendMessage = function (message) {
        this.trackers.forEach(function (tracker) {
            if (tracker.onDidSendMessage) {
                tracker.onDidSendMessage(message);
            }
        });
    };
    PluginDebugAdapterTracker.prototype.onWillStopSession = function () {
        this.trackers.forEach(function (tracker) {
            if (tracker.onWillStopSession) {
                tracker.onWillStopSession();
            }
        });
    };
    PluginDebugAdapterTracker.prototype.onError = function (error) {
        this.trackers.forEach(function (tracker) {
            if (tracker.onError) {
                tracker.onError(error);
            }
        });
    };
    PluginDebugAdapterTracker.prototype.onExit = function (code, signal) {
        this.trackers.forEach(function (tracker) {
            if (tracker.onExit) {
                tracker.onExit(code, signal);
            }
        });
    };
    return PluginDebugAdapterTracker;
}());
exports.PluginDebugAdapterTracker = PluginDebugAdapterTracker;
//# sourceMappingURL=plugin-debug-adapter-tracker.js.map