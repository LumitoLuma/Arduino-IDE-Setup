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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.LogLevel = exports.rootLoggerName = exports.DispatchingLoggerClient = exports.ILoggerClient = exports.loggerPath = exports.ILoggerServer = void 0;
var inversify_1 = require("inversify");
exports.ILoggerServer = Symbol('ILoggerServer');
exports.loggerPath = '/services/logger';
exports.ILoggerClient = Symbol('ILoggerClient');
var DispatchingLoggerClient = /** @class */ (function () {
    function DispatchingLoggerClient() {
        this.clients = new Set();
    }
    DispatchingLoggerClient.prototype.onLogLevelChanged = function (event) {
        this.clients.forEach(function (client) { return client.onLogLevelChanged(event); });
    };
    DispatchingLoggerClient = __decorate([
        inversify_1.injectable()
    ], DispatchingLoggerClient);
    return DispatchingLoggerClient;
}());
exports.DispatchingLoggerClient = DispatchingLoggerClient;
exports.rootLoggerName = 'root';
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["FATAL"] = 60] = "FATAL";
    LogLevel[LogLevel["ERROR"] = 50] = "ERROR";
    LogLevel[LogLevel["WARN"] = 40] = "WARN";
    LogLevel[LogLevel["INFO"] = 30] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 20] = "DEBUG";
    LogLevel[LogLevel["TRACE"] = 10] = "TRACE";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
(function (LogLevel) {
    LogLevel.strings = new Map([
        [LogLevel.FATAL, 'fatal'],
        [LogLevel.ERROR, 'error'],
        [LogLevel.WARN, 'warn'],
        [LogLevel.INFO, 'info'],
        [LogLevel.DEBUG, 'debug'],
        [LogLevel.TRACE, 'trace']
    ]);
    function toString(level) {
        return LogLevel.strings.get(level);
    }
    LogLevel.toString = toString;
    function fromString(levelStr) {
        var e_1, _a;
        try {
            for (var strings_1 = __values(LogLevel.strings), strings_1_1 = strings_1.next(); !strings_1_1.done; strings_1_1 = strings_1.next()) {
                var pair = strings_1_1.value;
                if (pair[1] === levelStr) {
                    return pair[0];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (strings_1_1 && !strings_1_1.done && (_a = strings_1.return)) _a.call(strings_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return undefined;
    }
    LogLevel.fromString = fromString;
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
/* eslint-disable @typescript-eslint/no-explicit-any */
var ConsoleLogger;
(function (ConsoleLogger) {
    var originalConsoleLog = console.log;
    var consoles = new Map([
        [LogLevel.FATAL, console.error],
        [LogLevel.ERROR, console.error],
        [LogLevel.WARN, console.warn],
        [LogLevel.INFO, console.info],
        [LogLevel.DEBUG, console.debug],
        [LogLevel.TRACE, console.trace]
    ]);
    function reset() {
        console.error = consoles.get(LogLevel.ERROR);
        console.warn = consoles.get(LogLevel.WARN);
        console.info = consoles.get(LogLevel.INFO);
        console.debug = consoles.get(LogLevel.DEBUG);
        console.trace = consoles.get(LogLevel.TRACE);
        console.log = originalConsoleLog;
    }
    ConsoleLogger.reset = reset;
    function log(name, logLevel, message, params) {
        var console = consoles.get(logLevel) || originalConsoleLog;
        var severity = (LogLevel.strings.get(logLevel) || 'unknown').toUpperCase();
        console.apply(void 0, __spread([name + " " + severity + " " + message], params));
    }
    ConsoleLogger.log = log;
})(ConsoleLogger = exports.ConsoleLogger || (exports.ConsoleLogger = {}));
//# sourceMappingURL=logger-protocol.js.map