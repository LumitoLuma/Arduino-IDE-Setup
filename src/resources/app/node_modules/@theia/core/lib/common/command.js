"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
exports.CommandRegistry = exports.CommandService = exports.commandServicePath = exports.CommandContribution = exports.Command = void 0;
var inversify_1 = require("inversify");
var event_1 = require("./event");
var disposable_1 = require("./disposable");
var contribution_provider_1 = require("./contribution-provider");
var Command;
(function (Command) {
    /* Determine whether object is a Command */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(arg) {
        return !!arg && arg === Object(arg) && 'id' in arg;
    }
    Command.is = is;
    /** Comparator function for when sorting commands */
    function compareCommands(a, b) {
        if (a.label && b.label) {
            var aCommand = (a.category ? a.category + ": " + a.label : a.label).toLowerCase();
            var bCommand = (b.category ? b.category + ": " + b.label : b.label).toLowerCase();
            return (aCommand).localeCompare(bCommand);
        }
        else {
            return 0;
        }
    }
    Command.compareCommands = compareCommands;
    /**
     * Determine if two commands are equal.
     *
     * @param a the first command for comparison.
     * @param b the second command for comparison.
     */
    function equals(a, b) {
        return (a.id === b.id &&
            a.label === b.label &&
            a.iconClass === b.iconClass &&
            a.category === b.category);
    }
    Command.equals = equals;
})(Command = exports.Command || (exports.Command = {}));
exports.CommandContribution = Symbol('CommandContribution');
exports.commandServicePath = '/services/commands';
exports.CommandService = Symbol('CommandService');
/**
 * The command registry manages commands and handlers.
 */
var CommandRegistry = /** @class */ (function () {
    function CommandRegistry(contributionProvider) {
        this.contributionProvider = contributionProvider;
        this._commands = {};
        this._handlers = {};
        this.toUnregisterCommands = new Map();
        // List of recently used commands.
        this._recent = [];
        this.onWillExecuteCommandEmitter = new event_1.Emitter();
        this.onWillExecuteCommand = this.onWillExecuteCommandEmitter.event;
        this.onDidExecuteCommandEmitter = new event_1.Emitter();
        this.onDidExecuteCommand = this.onDidExecuteCommandEmitter.event;
    }
    CommandRegistry.prototype.onStart = function () {
        var e_1, _a;
        var contributions = this.contributionProvider.getContributions();
        try {
            for (var contributions_1 = __values(contributions), contributions_1_1 = contributions_1.next(); !contributions_1_1.done; contributions_1_1 = contributions_1.next()) {
                var contrib = contributions_1_1.value;
                contrib.registerCommands(this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (contributions_1_1 && !contributions_1_1.done && (_a = contributions_1.return)) _a.call(contributions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Register the given command and handler if present.
     *
     * Throw if a command is already registered for the given command identifier.
     */
    CommandRegistry.prototype.registerCommand = function (command, handler) {
        var _this = this;
        if (this._commands[command.id]) {
            console.warn("A command " + command.id + " is already registered.");
            return disposable_1.Disposable.NULL;
        }
        var toDispose = new disposable_1.DisposableCollection(this.doRegisterCommand(command));
        if (handler) {
            toDispose.push(this.registerHandler(command.id, handler));
        }
        this.toUnregisterCommands.set(command.id, toDispose);
        toDispose.push(disposable_1.Disposable.create(function () { return _this.toUnregisterCommands.delete(command.id); }));
        return toDispose;
    };
    CommandRegistry.prototype.doRegisterCommand = function (command) {
        var _this = this;
        this._commands[command.id] = command;
        return {
            dispose: function () {
                delete _this._commands[command.id];
            }
        };
    };
    CommandRegistry.prototype.unregisterCommand = function (commandOrId) {
        var id = Command.is(commandOrId) ? commandOrId.id : commandOrId;
        var toUnregister = this.toUnregisterCommands.get(id);
        if (toUnregister) {
            toUnregister.dispose();
        }
    };
    /**
     * Register the given handler for the given command identifier.
     *
     * If there is already a handler for the given command
     * then the given handler is registered as more specific, and
     * has higher priority during enablement, visibility and toggle state evaluations.
     */
    CommandRegistry.prototype.registerHandler = function (commandId, handler) {
        var handlers = this._handlers[commandId];
        if (!handlers) {
            this._handlers[commandId] = handlers = [];
        }
        handlers.unshift(handler);
        return {
            dispose: function () {
                var idx = handlers.indexOf(handler);
                if (idx >= 0) {
                    handlers.splice(idx, 1);
                }
            }
        };
    };
    /**
     * Test whether there is an active handler for the given command.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistry.prototype.isEnabled = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return typeof this.getActiveHandler.apply(this, __spread([command], args)) !== 'undefined';
    };
    /**
     * Test whether there is a visible handler for the given command.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistry.prototype.isVisible = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return typeof this.getVisibleHandler.apply(this, __spread([command], args)) !== 'undefined';
    };
    /**
     * Test whether there is a toggled handler for the given command.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistry.prototype.isToggled = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return typeof this.getToggledHandler.apply(this, __spread([command], args)) !== 'undefined';
    };
    /**
     * Execute the active handler for the given command and arguments.
     *
     * Reject if a command cannot be executed.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistry.prototype.executeCommand = function (commandId) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var handler, result, argsMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handler = this.getActiveHandler.apply(this, __spread([commandId], args));
                        if (!handler) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fireWillExecuteCommand(commandId, args)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, handler.execute.apply(handler, __spread(args))];
                    case 2:
                        result = _a.sent();
                        this.onDidExecuteCommandEmitter.fire({ commandId: commandId, args: args });
                        return [2 /*return*/, result];
                    case 3:
                        argsMessage = args && args.length > 0 ? " (args: " + JSON.stringify(args) + ")" : '';
                        // eslint-disable-next-line max-len
                        throw Object.assign(new Error("The command '" + commandId + "' cannot be executed. There are no active handlers available for the command." + argsMessage), { code: 'NO_ACTIVE_HANDLER' });
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistry.prototype.fireWillExecuteCommand = function (commandId, args) {
        if (args === void 0) { args = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event_1.WaitUntilEvent.fire(this.onWillExecuteCommandEmitter, { commandId: commandId, args: args }, 30000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a visible handler for the given command or `undefined`.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistry.prototype.getVisibleHandler = function (commandId) {
        var e_2, _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this._handlers[commandId];
        if (handlers) {
            try {
                for (var handlers_1 = __values(handlers), handlers_1_1 = handlers_1.next(); !handlers_1_1.done; handlers_1_1 = handlers_1.next()) {
                    var handler = handlers_1_1.value;
                    try {
                        if (!handler.isVisible || handler.isVisible.apply(handler, __spread(args))) {
                            return handler;
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (handlers_1_1 && !handlers_1_1.done && (_a = handlers_1.return)) _a.call(handlers_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return undefined;
    };
    /**
     * Get an active handler for the given command or `undefined`.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistry.prototype.getActiveHandler = function (commandId) {
        var e_3, _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this._handlers[commandId];
        if (handlers) {
            try {
                for (var handlers_2 = __values(handlers), handlers_2_1 = handlers_2.next(); !handlers_2_1.done; handlers_2_1 = handlers_2.next()) {
                    var handler = handlers_2_1.value;
                    try {
                        if (!handler.isEnabled || handler.isEnabled.apply(handler, __spread(args))) {
                            return handler;
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (handlers_2_1 && !handlers_2_1.done && (_a = handlers_2.return)) _a.call(handlers_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return undefined;
    };
    /**
     * Get a toggled handler for the given command or `undefined`.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistry.prototype.getToggledHandler = function (commandId) {
        var e_4, _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this._handlers[commandId];
        if (handlers) {
            try {
                for (var handlers_3 = __values(handlers), handlers_3_1 = handlers_3.next(); !handlers_3_1.done; handlers_3_1 = handlers_3.next()) {
                    var handler = handlers_3_1.value;
                    try {
                        if (handler.isToggled && handler.isToggled.apply(handler, __spread(args))) {
                            return handler;
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (handlers_3_1 && !handlers_3_1.done && (_a = handlers_3.return)) _a.call(handlers_3);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return undefined;
    };
    /**
     * Returns with all handlers for the given command. If the command does not have any handlers,
     * or the command is not registered, returns an empty array.
     */
    CommandRegistry.prototype.getAllHandlers = function (commandId) {
        var handlers = this._handlers[commandId];
        return handlers ? handlers.slice() : [];
    };
    Object.defineProperty(CommandRegistry.prototype, "commands", {
        /**
         * Get all registered commands.
         */
        get: function () {
            var e_5, _a;
            var commands = [];
            try {
                for (var _b = __values(this.commandIds), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var id = _c.value;
                    var cmd = this.getCommand(id);
                    if (cmd) {
                        commands.push(cmd);
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return commands;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get a command for the given command identifier.
     */
    CommandRegistry.prototype.getCommand = function (id) {
        return this._commands[id];
    };
    Object.defineProperty(CommandRegistry.prototype, "commandIds", {
        /**
         * Get all registered commands identifiers.
         */
        get: function () {
            return Object.keys(this._commands);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandRegistry.prototype, "recent", {
        /**
         * Get the list of recently used commands.
         */
        get: function () {
            return this._recent;
        },
        /**
         * Set the list of recently used commands.
         * @param commands the list of recently used commands.
         */
        set: function (commands) {
            this._recent = commands;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds a command to recently used list.
     * Prioritizes commands that were recently executed to be most recent.
     *
     * @param recent a recent command, or array of recent commands.
     */
    CommandRegistry.prototype.addRecentCommand = function (recent) {
        var _this = this;
        if (Array.isArray(recent)) {
            recent.forEach(function (command) { return _this.addRecentCommand(command); });
        }
        else {
            // Determine if the command currently exists in the recently used list.
            var index = this._recent.findIndex(function (command) { return Command.equals(recent, command); });
            // If the command exists, remove it from the array so it can later be placed at the top.
            if (index >= 0) {
                this._recent.splice(index, 1);
            }
            // Add the recent command to the beginning of the array (most recent).
            this._recent.unshift(recent);
        }
    };
    /**
     * Clear the list of recently used commands.
     */
    CommandRegistry.prototype.clearCommandHistory = function () {
        this.recent = [];
    };
    CommandRegistry = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(contribution_provider_1.ContributionProvider)), __param(0, inversify_1.named(exports.CommandContribution)),
        __metadata("design:paramtypes", [Object])
    ], CommandRegistry);
    return CommandRegistry;
}());
exports.CommandRegistry = CommandRegistry;
//# sourceMappingURL=command.js.map