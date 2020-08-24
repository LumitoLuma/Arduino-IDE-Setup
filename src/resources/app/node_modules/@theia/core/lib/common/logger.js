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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.Logger = exports.ILogger = exports.LoggerName = exports.LoggerFactory = exports.setRootLogger = exports.unsetRootLogger = exports.logger = exports.rootLoggerName = exports.LogLevel = void 0;
var inversify_1 = require("inversify");
var logger_watcher_1 = require("./logger-watcher");
var logger_protocol_1 = require("./logger-protocol");
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return logger_protocol_1.LogLevel; } });
Object.defineProperty(exports, "rootLoggerName", { enumerable: true, get: function () { return logger_protocol_1.rootLoggerName; } });
/**
 * Counterpart of the `#setRootLogger(ILogger)`. Restores the `console.xxx` bindings to the original one.
 * Invoking has no side-effect if `setRootLogger` was not called before. Multiple function invocation has
 * no side-effect either.
 */
function unsetRootLogger() {
    if (exports.logger !== undefined) {
        logger_protocol_1.ConsoleLogger.reset();
        exports.logger = undefined;
    }
}
exports.unsetRootLogger = unsetRootLogger;
function setRootLogger(aLogger) {
    exports.logger = aLogger;
    var log = function (logLevel, message) {
        var optionalParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            optionalParams[_i - 2] = arguments[_i];
        }
        return exports.logger.log.apply(exports.logger, __spread([logLevel, message], optionalParams));
    };
    console.error = log.bind(undefined, logger_protocol_1.LogLevel.ERROR);
    console.warn = log.bind(undefined, logger_protocol_1.LogLevel.WARN);
    console.info = log.bind(undefined, logger_protocol_1.LogLevel.INFO);
    console.debug = log.bind(undefined, logger_protocol_1.LogLevel.DEBUG);
    console.trace = log.bind(undefined, logger_protocol_1.LogLevel.TRACE);
    console.log = log.bind(undefined, logger_protocol_1.LogLevel.INFO);
}
exports.setRootLogger = setRootLogger;
exports.LoggerFactory = Symbol('LoggerFactory');
exports.LoggerName = Symbol('LoggerName');
exports.ILogger = Symbol('ILogger');
var Logger = /** @class */ (function () {
    /**
     * Build a new Logger.
     */
    function Logger(server, loggerWatcher, factory, name) {
        var _this = this;
        this.server = server;
        this.loggerWatcher = loggerWatcher;
        this.factory = factory;
        this.name = name;
        if (name !== logger_protocol_1.rootLoggerName) {
            /* Creating a child logger.  */
            this.created = server.child(name);
        }
        else {
            /* Creating the root logger (it already exists at startup).  */
            this.created = Promise.resolve();
        }
        /* Fetch the log level so it's cached in the frontend.  */
        this._logLevel = this.created.then(function (_) { return _this.server.getLogLevel(name); });
        /* Update the log level if it changes in the backend. */
        loggerWatcher.onLogLevelChanged(function (event) {
            _this.created.then(function () {
                if (event.loggerName === name) {
                    _this._logLevel = Promise.resolve(event.newLogLevel);
                }
            });
        });
    }
    Logger.prototype.setLogLevel = function (logLevel) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.created.then(function () {
                _this._logLevel.then(function (oldLevel) {
                    _this.server.setLogLevel(_this.name, logLevel).then(function () {
                        _this._logLevel = Promise.resolve(logLevel);
                        resolve();
                    });
                });
            });
        });
    };
    Logger.prototype.getLogLevel = function () {
        return this._logLevel;
    };
    Logger.prototype.isEnabled = function (logLevel) {
        return this._logLevel.then(function (level) {
            return logLevel >= level;
        });
    };
    Logger.prototype.ifEnabled = function (logLevel) {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.isEnabled(logLevel).then(function (enabled) {
                if (enabled) {
                    resolve();
                }
            });
        });
    };
    Logger.prototype.log = function (logLevel, arg2) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        return this.getLog(logLevel).then(function (log) {
            if (typeof arg2 === 'function') {
                var loggable = arg2;
                loggable(log);
            }
            else if (arg2) {
                log.apply(void 0, __spread([arg2], params));
            }
        });
    };
    Logger.prototype.getLog = function (logLevel) {
        var _this = this;
        return this.ifEnabled(logLevel).then(function () {
            return _this.created.then(function () {
                return function (message) {
                    var params = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        params[_i - 1] = arguments[_i];
                    }
                    return _this.server.log(_this.name, logLevel, _this.format(message), params.map(function (p) { return _this.format(p); }));
                };
            });
        });
    };
    Logger.prototype.format = function (value) {
        if (value instanceof Error) {
            return value.stack || value.toString();
        }
        return value;
    };
    Logger.prototype.isTrace = function () {
        return this.isEnabled(logger_protocol_1.LogLevel.TRACE);
    };
    Logger.prototype.ifTrace = function () {
        return this.ifEnabled(logger_protocol_1.LogLevel.TRACE);
    };
    Logger.prototype.trace = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, __spread([logger_protocol_1.LogLevel.TRACE, arg], params));
    };
    Logger.prototype.isDebug = function () {
        return this.isEnabled(logger_protocol_1.LogLevel.DEBUG);
    };
    Logger.prototype.ifDebug = function () {
        return this.ifEnabled(logger_protocol_1.LogLevel.DEBUG);
    };
    Logger.prototype.debug = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, __spread([logger_protocol_1.LogLevel.DEBUG, arg], params));
    };
    Logger.prototype.isInfo = function () {
        return this.isEnabled(logger_protocol_1.LogLevel.INFO);
    };
    Logger.prototype.ifInfo = function () {
        return this.ifEnabled(logger_protocol_1.LogLevel.INFO);
    };
    Logger.prototype.info = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, __spread([logger_protocol_1.LogLevel.INFO, arg], params));
    };
    Logger.prototype.isWarn = function () {
        return this.isEnabled(logger_protocol_1.LogLevel.WARN);
    };
    Logger.prototype.ifWarn = function () {
        return this.ifEnabled(logger_protocol_1.LogLevel.WARN);
    };
    Logger.prototype.warn = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, __spread([logger_protocol_1.LogLevel.WARN, arg], params));
    };
    Logger.prototype.isError = function () {
        return this.isEnabled(logger_protocol_1.LogLevel.ERROR);
    };
    Logger.prototype.ifError = function () {
        return this.ifEnabled(logger_protocol_1.LogLevel.ERROR);
    };
    Logger.prototype.error = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, __spread([logger_protocol_1.LogLevel.ERROR, arg], params));
    };
    Logger.prototype.isFatal = function () {
        return this.isEnabled(logger_protocol_1.LogLevel.FATAL);
    };
    Logger.prototype.ifFatal = function () {
        return this.ifEnabled(logger_protocol_1.LogLevel.FATAL);
    };
    Logger.prototype.fatal = function (arg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, __spread([logger_protocol_1.LogLevel.FATAL, arg], params));
    };
    Logger.prototype.child = function (name) {
        return this.factory(name);
    };
    Logger = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(logger_protocol_1.ILoggerServer)),
        __param(1, inversify_1.inject(logger_watcher_1.LoggerWatcher)),
        __param(2, inversify_1.inject(exports.LoggerFactory)),
        __param(3, inversify_1.inject(exports.LoggerName)),
        __metadata("design:paramtypes", [Object, logger_watcher_1.LoggerWatcher, Function, String])
    ], Logger);
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map