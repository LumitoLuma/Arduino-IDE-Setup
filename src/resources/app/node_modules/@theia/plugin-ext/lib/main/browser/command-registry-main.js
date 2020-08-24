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
exports.CommandRegistryMainImpl = void 0;
var command_1 = require("@theia/core/lib/common/command");
var disposable_1 = require("@theia/core/lib/common/disposable");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var browser_1 = require("@theia/core/lib/browser");
var plugin_contribution_handler_1 = require("./plugin-contribution-handler");
var CommandRegistryMainImpl = /** @class */ (function () {
    function CommandRegistryMainImpl(rpc, container) {
        this.commands = new Map();
        this.handlers = new Map();
        this.toDispose = new disposable_1.DisposableCollection();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.COMMAND_REGISTRY_EXT);
        this.delegate = container.get(command_1.CommandRegistry);
        this.keyBinding = container.get(browser_1.KeybindingRegistry);
        this.contributions = container.get(plugin_contribution_handler_1.PluginContributionHandler);
    }
    CommandRegistryMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    CommandRegistryMainImpl.prototype.$registerCommand = function (command) {
        var _this = this;
        var id = command.id;
        this.commands.set(id, this.contributions.registerCommand(command));
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.$unregisterCommand(id); }));
    };
    CommandRegistryMainImpl.prototype.$unregisterCommand = function (id) {
        var command = this.commands.get(id);
        if (command) {
            command.dispose();
            this.commands.delete(id);
        }
    };
    CommandRegistryMainImpl.prototype.$registerHandler = function (id) {
        var _this = this;
        this.handlers.set(id, this.contributions.registerCommandHandler(id, function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return (_a = _this.proxy).$executeCommand.apply(_a, __spread([id], args));
        }));
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.$unregisterHandler(id); }));
    };
    CommandRegistryMainImpl.prototype.$unregisterHandler = function (id) {
        var handler = this.handlers.get(id);
        if (handler) {
            handler.dispose();
            this.handlers.delete(id);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CommandRegistryMainImpl.prototype.$executeCommand = function (id) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.delegate.getCommand(id)) {
                            throw new Error("Command with id '" + id + "' is not registered.");
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (_a = this.delegate).executeCommand.apply(_a, __spread([id], args))];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        e_1 = _b.sent();
                        // Command handler may be not active at the moment so the error must be caught. See https://github.com/eclipse-theia/theia/pull/6687#discussion_r354810079
                        if ('code' in e_1 && e_1['code'] === 'NO_ACTIVE_HANDLER') {
                            return [2 /*return*/];
                        }
                        else {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommandRegistryMainImpl.prototype.$getKeyBinding = function (commandId) {
        try {
            var keyBindings = this.keyBinding.getKeybindingsForCommand(commandId);
            if (keyBindings) {
                // transform inner type to CommandKeyBinding
                return Promise.resolve(keyBindings.map(function (keyBinding) { return ({ id: commandId, value: keyBinding.keybinding }); }));
            }
            else {
                return Promise.resolve(undefined);
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    CommandRegistryMainImpl.prototype.$getCommands = function () {
        return Promise.resolve(this.delegate.commandIds);
    };
    return CommandRegistryMainImpl;
}());
exports.CommandRegistryMainImpl = CommandRegistryMainImpl;
//# sourceMappingURL=command-registry-main.js.map