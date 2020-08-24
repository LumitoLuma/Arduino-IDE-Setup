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
exports.CommandsConverter = exports.CommandRegistryImpl = void 0;
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var types_impl_1 = require("./types-impl");
var known_commands_1 = require("./known-commands");
var CommandRegistryImpl = /** @class */ (function () {
    function CommandRegistryImpl(rpc) {
        this.commands = new Set();
        this.handlers = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.COMMAND_REGISTRY_MAIN);
        this.argumentProcessors = [];
        this.commandsConverter = new CommandsConverter(this);
    }
    Object.defineProperty(CommandRegistryImpl.prototype, "converter", {
        get: function () {
            return this.commandsConverter;
        },
        enumerable: false,
        configurable: true
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistryImpl.prototype.registerCommand = function (command, handler, thisArg) {
        var _this = this;
        if (this.commands.has(command.id)) {
            throw new Error("Command " + command.id + " already exist");
        }
        this.commands.add(command.id);
        this.proxy.$registerCommand(command);
        var toDispose = [];
        if (handler) {
            toDispose.push(this.registerHandler(command.id, handler, thisArg));
        }
        toDispose.push(types_impl_1.Disposable.create(function () {
            _this.commands.delete(command.id);
            _this.proxy.$unregisterCommand(command.id);
        }));
        return types_impl_1.Disposable.from.apply(types_impl_1.Disposable, __spread(toDispose));
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistryImpl.prototype.registerHandler = function (commandId, handler, thisArg) {
        var _this = this;
        if (this.handlers.has(commandId)) {
            throw new Error("Command \"" + commandId + "\" already has handler");
        }
        this.proxy.$registerHandler(commandId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.handlers.set(commandId, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return handler.apply(thisArg, args);
        });
        return types_impl_1.Disposable.create(function () {
            _this.handlers.delete(commandId);
            _this.proxy.$unregisterHandler(commandId);
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistryImpl.prototype.$executeCommand = function (id) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.handlers.has(id)) {
            return this.executeLocalCommand.apply(this, __spread([id], args));
        }
        else {
            return Promise.reject(new Error("Command: " + id + " does not exist."));
        }
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    CommandRegistryImpl.prototype.executeCommand = function (id) {
        var _a;
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.handlers.has(id)) {
            return this.executeLocalCommand.apply(this, __spread([id], args));
        }
        else if (known_commands_1.KnownCommands.mapped(id)) {
            // Using the KnownCommand exclusions, convert the commands manually
            return known_commands_1.KnownCommands.map(id, args, function (mappedId, mappedArgs, mappedResult) {
                var _a;
                var mr = mappedResult;
                return (_a = _this.proxy).$executeCommand.apply(_a, __spread([mappedId], mappedArgs)).then(function (result) {
                    if (!result) {
                        return undefined;
                    }
                    if (!mr) {
                        return result;
                    }
                    return mr(result);
                });
            });
        }
        else {
            return (_a = this.proxy).$executeCommand.apply(_a, __spread([id], args));
        }
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    CommandRegistryImpl.prototype.getKeyBinding = function (commandId) {
        return this.proxy.$getKeyBinding(commandId);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistryImpl.prototype.executeLocalCommand = function (id) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var handler;
            var _this = this;
            return __generator(this, function (_a) {
                handler = this.handlers.get(id);
                if (handler) {
                    return [2 /*return*/, handler.apply(void 0, __spread(args.map(function (arg) { return _this.argumentProcessors.reduce(function (r, p) { return p.processArgument(r); }, arg); })))];
                }
                else {
                    throw new Error("Command " + id + " doesn't exist");
                }
                return [2 /*return*/];
            });
        });
    };
    CommandRegistryImpl.prototype.getCommands = function (filterUnderscoreCommands) {
        if (filterUnderscoreCommands === void 0) { filterUnderscoreCommands = false; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.proxy.$getCommands()];
                    case 1:
                        result = _a.sent();
                        if (filterUnderscoreCommands) {
                            return [2 /*return*/, result.filter(function (command) { return command[0] !== '_'; })];
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    CommandRegistryImpl.prototype.registerArgumentProcessor = function (processor) {
        this.argumentProcessors.push(processor);
    };
    return CommandRegistryImpl;
}());
exports.CommandRegistryImpl = CommandRegistryImpl;
// copied and modified from https://github.com/microsoft/vscode/blob/1.37.1/src/vs/workbench/api/common/extHostCommands.ts#L217-L259
var CommandsConverter = /** @class */ (function () {
    function CommandsConverter(commands) {
        this.commandsMap = new Map();
        this.handle = 0;
        this.safeCommandId = "theia_safe_cmd_" + Date.now().toString();
        this.commands = commands;
        this.isSafeCommandRegistered = false;
    }
    CommandsConverter.prototype.toSafeCommand = function (command, disposables) {
        var _this = this;
        if (!command) {
            return undefined;
        }
        var result = this.toInternalCommand(command);
        if (known_commands_1.KnownCommands.mapped(result.id)) {
            return result;
        }
        if (!this.isSafeCommandRegistered) {
            this.commands.registerCommand({ id: this.safeCommandId }, this.executeSafeCommand, this);
            this.isSafeCommandRegistered = true;
        }
        if (command.command && command.arguments && command.arguments.length > 0) {
            var id_1 = this.handle++;
            this.commandsMap.set(id_1, command);
            disposables.push(new types_impl_1.Disposable(function () { return _this.commandsMap.delete(id_1); }));
            result.id = this.safeCommandId;
            result.arguments = [id_1];
        }
        return result;
    };
    CommandsConverter.prototype.toInternalCommand = function (external) {
        // we're deprecating Command.id, so it has to be optional.
        // Existing code will have compiled against a non - optional version of the field, so asserting it to exist is ok
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return known_commands_1.KnownCommands.map((external.command || external.id), external.arguments, function (mappedId, mappedArgs) {
            return ({
                id: mappedId,
                title: external.title || external.label || ' ',
                tooltip: external.tooltip,
                arguments: mappedArgs
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandsConverter.prototype.executeSafeCommand = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var command = this.commandsMap.get(args[0]);
        if (!command || !command.command) {
            return Promise.reject('command NOT FOUND');
        }
        return (_a = this.commands).executeCommand.apply(_a, __spread([command.command], (command.arguments || [])));
    };
    return CommandsConverter;
}());
exports.CommandsConverter = CommandsConverter;
//# sourceMappingURL=command-registry.js.map