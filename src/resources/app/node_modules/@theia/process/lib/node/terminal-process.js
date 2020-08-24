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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalProcess = exports.TerminalProcessFactory = exports.TerminalProcessOptions = void 0;
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var common_1 = require("@theia/core/lib/common");
var process_1 = require("./process");
var process_manager_1 = require("./process-manager");
var node_pty_1 = require("@theia/node-pty");
var multi_ring_buffer_1 = require("./multi-ring-buffer");
var dev_null_stream_1 = require("./dev-null-stream");
var utils_1 = require("./utils");
var pseudo_pty_1 = require("./pseudo-pty");
var stream_1 = require("stream");
exports.TerminalProcessOptions = Symbol('TerminalProcessOptions');
exports.TerminalProcessFactory = Symbol('TerminalProcessFactory');
/**
 * Run arbitrary processes inside pseudo-terminals (PTY).
 *
 * Note: a PTY is not a shell process (bash/pwsh/cmd...)
 */
var TerminalProcess = /** @class */ (function (_super) {
    __extends(TerminalProcess, _super);
    function TerminalProcess(// eslint-disable-next-line @typescript-eslint/indent
    options, processManager, ringBuffer, logger) {
        var _this = _super.call(this, processManager, logger, process_1.ProcessType.Terminal, options) || this;
        _this.options = options;
        _this.ringBuffer = ringBuffer;
        _this.outputStream = _this.createOutputStream();
        _this.errorStream = new dev_null_stream_1.DevNullStream({ autoDestroy: true });
        if (options.isPseudo) {
            // do not need to spawn a process, new a pseudo pty instead
            _this.terminal = new pseudo_pty_1.PseudoPty();
            _this.inputStream = new dev_null_stream_1.DevNullStream({ autoDestroy: true });
            return _this;
        }
        if (_this.isForkOptions(_this.options)) {
            throw new Error('terminal processes cannot be forked as of today');
        }
        _this.logger.debug('Starting terminal process', JSON.stringify(options, undefined, 2));
        try {
            _this.terminal = node_pty_1.spawn(options.command, (core_1.isWindows && options.commandLine) || options.args || [], options.options || {});
            _this.terminal.on('exec', function (reason) {
                if (reason === undefined) {
                    _this.emitOnStarted();
                }
                else {
                    var error = new Error(reason);
                    error.code = reason;
                    _this.emitOnError(error);
                }
            });
            // node-pty actually wait for the underlying streams to be closed before emitting exit.
            // We should emulate the `exit` and `close` sequence.
            _this.terminal.on('exit', function (code, signal) {
                // Make sure to only pass either code or signal as !undefined, not
                // both.
                //
                // node-pty quirk: On Linux/macOS, if the process exited through the
                // exit syscall (with an exit code), signal will be 0 (an invalid
                // signal value).  If it was terminated because of a signal, the
                // signal parameter will hold the signal number and code should
                // be ignored.
                if (signal === undefined || signal === 0) {
                    _this.emitOnExit(code, undefined);
                }
                else {
                    _this.emitOnExit(undefined, utils_1.signame(signal));
                }
                process.nextTick(function () {
                    if (signal === undefined || signal === 0) {
                        _this.emitOnClose(code, undefined);
                    }
                    else {
                        _this.emitOnClose(undefined, utils_1.signame(signal));
                    }
                });
            });
            _this.terminal.on('data', function (data) {
                ringBuffer.enq(data);
            });
            _this.inputStream = new stream_1.Writable({
                write: function (chunk) {
                    _this.write(chunk);
                },
            });
        }
        catch (error) {
            _this.inputStream = new dev_null_stream_1.DevNullStream({ autoDestroy: true });
            // Normalize the error to make it as close as possible as what
            // node's child_process.spawn would generate in the same
            // situation.
            var message = error.message;
            if (message.startsWith('File not found: ')) {
                error.errno = 'ENOENT';
                error.code = 'ENOENT';
                error.path = options.command;
            }
            // node-pty throws exceptions on Windows.
            // Call the client error handler, but first give them a chance to register it.
            _this.emitOnErrorAsync(error);
        }
        return _this;
    }
    TerminalProcess.prototype.createOutputStream = function () {
        return this.ringBuffer.getStream();
    };
    Object.defineProperty(TerminalProcess.prototype, "pid", {
        get: function () {
            this.checkTerminal();
            return this.terminal.pid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TerminalProcess.prototype, "executable", {
        get: function () {
            return this.options.command;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TerminalProcess.prototype, "arguments", {
        get: function () {
            return this.options.args || [];
        },
        enumerable: false,
        configurable: true
    });
    TerminalProcess.prototype.kill = function (signal) {
        if (this.terminal && this.killed === false) {
            this.terminal.kill(signal);
        }
    };
    TerminalProcess.prototype.resize = function (cols, rows) {
        this.checkTerminal();
        this.terminal.resize(cols, rows);
    };
    TerminalProcess.prototype.write = function (data) {
        this.checkTerminal();
        this.terminal.write(data);
    };
    TerminalProcess.prototype.checkTerminal = function () {
        if (!this.terminal) {
            throw new Error('pty process did not start correctly');
        }
    };
    TerminalProcess = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.TerminalProcessOptions)),
        __param(1, inversify_1.inject(process_manager_1.ProcessManager)),
        __param(2, inversify_1.inject(multi_ring_buffer_1.MultiRingBuffer)),
        __param(3, inversify_1.inject(common_1.ILogger)), __param(3, inversify_1.named('process')),
        __metadata("design:paramtypes", [Object, process_manager_1.ProcessManager,
            multi_ring_buffer_1.MultiRingBuffer, Object])
    ], TerminalProcess);
    return TerminalProcess;
}(process_1.Process));
exports.TerminalProcess = TerminalProcess;
//# sourceMappingURL=terminal-process.js.map