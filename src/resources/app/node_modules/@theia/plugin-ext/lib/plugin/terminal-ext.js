"use strict";
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
var uuid_1 = require("@phosphor/coreutils/lib/uuid");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var event_1 = require("@theia/core/lib/common/event");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
/**
 * Provides high level terminal plugin api to use in the Theia plugins.
 * This service allow(with help proxy) create and use terminal emulator.
 */
var TerminalServiceExtImpl = /** @class */ (function () {
    function TerminalServiceExtImpl(rpc) {
        this._terminals = new Map();
        this.onDidCloseTerminalEmitter = new event_1.Emitter();
        this.onDidCloseTerminal = this.onDidCloseTerminalEmitter.event;
        this.onDidOpenTerminalEmitter = new event_1.Emitter();
        this.onDidOpenTerminal = this.onDidOpenTerminalEmitter.event;
        this.onDidChangeActiveTerminalEmitter = new event_1.Emitter();
        this.onDidChangeActiveTerminal = this.onDidChangeActiveTerminalEmitter.event;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.TERMINAL_MAIN);
    }
    Object.defineProperty(TerminalServiceExtImpl.prototype, "terminals", {
        get: function () {
            return __spread(this._terminals.values());
        },
        enumerable: true,
        configurable: true
    });
    TerminalServiceExtImpl.prototype.createTerminal = function (nameOrOptions, shellPath, shellArgs) {
        var options;
        if (typeof nameOrOptions === 'object') {
            options = nameOrOptions;
        }
        else {
            options = {
                name: nameOrOptions,
                shellPath: shellPath,
                shellArgs: shellArgs
            };
        }
        var id = "plugin-terminal-" + uuid_1.UUID.uuid4();
        this.proxy.$createTerminal(id, options);
        return this.obtainTerminal(id, options.name || 'Terminal');
    };
    TerminalServiceExtImpl.prototype.obtainTerminal = function (id, name) {
        var terminal = this._terminals.get(id);
        if (!terminal) {
            terminal = new TerminalExtImpl(this.proxy);
            this._terminals.set(id, terminal);
        }
        terminal.name = name;
        return terminal;
    };
    TerminalServiceExtImpl.prototype.$terminalCreated = function (id, name) {
        var terminal = this.obtainTerminal(id, name);
        terminal.id.resolve(id);
        this.onDidOpenTerminalEmitter.fire(terminal);
    };
    TerminalServiceExtImpl.prototype.$terminalNameChanged = function (id, name) {
        var terminal = this._terminals.get(id);
        if (terminal) {
            terminal.name = name;
        }
    };
    TerminalServiceExtImpl.prototype.$terminalOpened = function (id, processId) {
        var terminal = this._terminals.get(id);
        if (terminal) {
            // resolve for existing clients
            terminal.deferredProcessId.resolve(processId);
            // install new if terminal is reconnected
            terminal.deferredProcessId = new promise_util_1.Deferred();
            terminal.deferredProcessId.resolve(processId);
        }
    };
    TerminalServiceExtImpl.prototype.$terminalClosed = function (id) {
        var terminal = this._terminals.get(id);
        if (terminal) {
            this.onDidCloseTerminalEmitter.fire(terminal);
            this._terminals.delete(id);
        }
    };
    Object.defineProperty(TerminalServiceExtImpl.prototype, "activeTerminal", {
        get: function () {
            return this.activeTerminalId && this._terminals.get(this.activeTerminalId) || undefined;
        },
        enumerable: true,
        configurable: true
    });
    TerminalServiceExtImpl.prototype.$currentTerminalChanged = function (id) {
        this.activeTerminalId = id;
        this.onDidChangeActiveTerminalEmitter.fire(this.activeTerminal);
    };
    return TerminalServiceExtImpl;
}());
exports.TerminalServiceExtImpl = TerminalServiceExtImpl;
var TerminalExtImpl = /** @class */ (function () {
    function TerminalExtImpl(proxy) {
        this.proxy = proxy;
        this.id = new promise_util_1.Deferred();
        this.deferredProcessId = new promise_util_1.Deferred();
    }
    Object.defineProperty(TerminalExtImpl.prototype, "processId", {
        get: function () {
            return this.deferredProcessId.promise;
        },
        enumerable: true,
        configurable: true
    });
    TerminalExtImpl.prototype.sendText = function (text, addNewLine) {
        var _this = this;
        if (addNewLine === void 0) { addNewLine = true; }
        this.id.promise.then(function (id) { return _this.proxy.$sendText(id, text, addNewLine); });
    };
    TerminalExtImpl.prototype.show = function (preserveFocus) {
        var _this = this;
        this.id.promise.then(function (id) { return _this.proxy.$show(id, preserveFocus); });
    };
    TerminalExtImpl.prototype.hide = function () {
        var _this = this;
        this.id.promise.then(function (id) { return _this.proxy.$hide(id); });
    };
    TerminalExtImpl.prototype.dispose = function () {
        var _this = this;
        this.id.promise.then(function (id) { return _this.proxy.$dispose(id); });
    };
    return TerminalExtImpl;
}());
exports.TerminalExtImpl = TerminalExtImpl;
//# sourceMappingURL=terminal-ext.js.map