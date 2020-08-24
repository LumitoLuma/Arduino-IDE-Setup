"use strict";
/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.LogLevelCliContribution = void 0;
var inversify_1 = require("inversify");
var logger_1 = require("../common/logger");
var fs = require("fs-extra");
var nsfw = require("nsfw");
var event_1 = require("../common/event");
var path = require("path");
/**
 * Parses command line switches related to log levels, then watches the log
 * levels file (if specified) for changes.  This is the source of truth for
 * what the log level per logger should be.
 */
var LogLevelCliContribution = /** @class */ (function () {
    function LogLevelCliContribution() {
        this._logLevels = {};
        /**
         * Log level to use for loggers not specified in `logLevels`.
         */
        this._defaultLogLevel = logger_1.LogLevel.INFO;
        this.logConfigChangedEvent = new event_1.Emitter();
    }
    Object.defineProperty(LogLevelCliContribution.prototype, "defaultLogLevel", {
        get: function () {
            return this._defaultLogLevel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogLevelCliContribution.prototype, "logLevels", {
        get: function () {
            return this._logLevels;
        },
        enumerable: false,
        configurable: true
    });
    LogLevelCliContribution.prototype.configure = function (conf) {
        conf.option('log-level', {
            description: 'Sets the default log level',
            choices: Array.from(logger_1.LogLevel.strings.values()),
            nargs: 1,
        });
        conf.option('log-config', {
            description: 'Path to the JSON file specifying the configuration of various loggers',
            type: 'string',
            nargs: 1,
        });
    };
    LogLevelCliContribution.prototype.setArguments = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (args['log-level'] !== undefined && args['log-config'] !== undefined) {
                            throw new Error('--log-level and --log-config are mutually exclusive.');
                        }
                        if (args['log-level'] !== undefined) {
                            this._defaultLogLevel = this.readLogLevelString(args['log-level'], 'Unknown log level passed to --log-level');
                        }
                        if (!(args['log-config'] !== undefined)) return [3 /*break*/, 5];
                        filename = args['log-config'];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        filename = path.resolve(filename);
                        return [4 /*yield*/, this.slurpLogConfigFile(filename)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.watchLogConfigFile(filename)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error("Error reading log config file " + filename + ": " + e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LogLevelCliContribution.prototype.watchLogConfigFile = function (filename) {
        var _this = this;
        return nsfw(filename, function (events) { return __awaiter(_this, void 0, void 0, function () {
            var events_1, events_1_1, event_2, _a, e_2_1, e_3;
            var e_2, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 10, , 11]);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, 8, 9]);
                        events_1 = __values(events), events_1_1 = events_1.next();
                        _c.label = 2;
                    case 2:
                        if (!!events_1_1.done) return [3 /*break*/, 6];
                        event_2 = events_1_1.value;
                        _a = event_2.action;
                        switch (_a) {
                            case nsfw.actions.CREATED: return [3 /*break*/, 3];
                            case nsfw.actions.MODIFIED: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.slurpLogConfigFile(filename)];
                    case 4:
                        _c.sent();
                        this.logConfigChangedEvent.fire(undefined);
                        return [3 /*break*/, 5];
                    case 5:
                        events_1_1 = events_1.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _c.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (events_1_1 && !events_1_1.done && (_b = events_1.return)) _b.call(events_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_3 = _c.sent();
                        console.error("Error reading log config file " + filename + ": " + e_3);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); }).then(function (watcher) {
            watcher.start();
        });
    };
    LogLevelCliContribution.prototype.slurpLogConfigFile = function (filename) {
        return __awaiter(this, void 0, void 0, function () {
            var content, data, newDefaultLogLevel, newLogLevels, loggers, _a, _b, logger, levelStr, e_4;
            var e_5, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.readFile(filename, 'utf-8')];
                    case 1:
                        content = _d.sent();
                        data = JSON.parse(content);
                        newDefaultLogLevel = logger_1.LogLevel.INFO;
                        if ('defaultLevel' in data) {
                            newDefaultLogLevel = this.readLogLevelString(data['defaultLevel'], "Unknown default log level in " + filename);
                        }
                        newLogLevels = {};
                        if ('levels' in data) {
                            loggers = data['levels'];
                            try {
                                for (_a = __values(Object.keys(loggers)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    logger = _b.value;
                                    levelStr = loggers[logger];
                                    newLogLevels[logger] = this.readLogLevelString(levelStr, "Unknown log level for logger " + logger + " in " + filename);
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                        }
                        this._defaultLogLevel = newDefaultLogLevel;
                        this._logLevels = newLogLevels;
                        console.log("Successfully read new log config from " + filename + ".");
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _d.sent();
                        throw new Error("Error reading log config file " + filename + ": " + e_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(LogLevelCliContribution.prototype, "onLogConfigChanged", {
        get: function () {
            return this.logConfigChangedEvent.event;
        },
        enumerable: false,
        configurable: true
    });
    LogLevelCliContribution.prototype.logLevelFor = function (loggerName) {
        var level = this._logLevels[loggerName];
        if (level !== undefined) {
            return level;
        }
        else {
            return this.defaultLogLevel;
        }
    };
    /**
     * Converts the string to a `LogLevel`. Throws an error if invalid.
     */
    LogLevelCliContribution.prototype.readLogLevelString = function (levelStr, errMessagePrefix) {
        var level = logger_1.LogLevel.fromString(levelStr);
        if (level === undefined) {
            throw new Error(errMessagePrefix + ": \"" + levelStr + "\".");
        }
        return level;
    };
    LogLevelCliContribution = __decorate([
        inversify_1.injectable()
    ], LogLevelCliContribution);
    return LogLevelCliContribution;
}());
exports.LogLevelCliContribution = LogLevelCliContribution;
//# sourceMappingURL=logger-cli-contribution.js.map