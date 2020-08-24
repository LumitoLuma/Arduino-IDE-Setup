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
exports.RawProcess = exports.RawProcessFactory = exports.RawProcessOptions = void 0;
var inversify_1 = require("inversify");
var process_manager_1 = require("./process-manager");
var common_1 = require("@theia/core/lib/common");
var process_1 = require("./process");
var child_process_1 = require("child_process");
// The class was here before, exporting to not break anything.
var dev_null_stream_1 = require("./dev-null-stream");
Object.defineProperty(exports, "DevNullStream", { enumerable: true, get: function () { return dev_null_stream_1.DevNullStream; } });
var dev_null_stream_2 = require("./dev-null-stream");
exports.RawProcessOptions = Symbol('RawProcessOptions');
exports.RawProcessFactory = Symbol('RawProcessFactory');
var RawProcess = /** @class */ (function (_super) {
    __extends(RawProcess, _super);
    function RawProcess(// eslint-disable-next-line @typescript-eslint/indent
    options, processManager, logger) {
        var _this = _super.call(this, processManager, logger, process_1.ProcessType.Raw, options) || this;
        var executable = _this.isForkOptions(options) ? options.modulePath : options.command;
        _this.logger.debug("Starting raw process: " + executable + ","
            + (" with args: " + (options.args ? options.args.join(' ') : '') + ", ")
            + (" with options: " + JSON.stringify(options.options)));
        // About catching errors: spawn will sometimes throw directly
        // (EACCES on Linux), sometimes return a Process object with the pid
        // property undefined (ENOENT on Linux) and then emit an 'error' event.
        // For now, we try to normalize that into always emitting an 'error'
        // event.
        try {
            if (_this.isForkOptions(options)) {
                _this.process = child_process_1.fork(options.modulePath, options.args || [], options.options || {});
            }
            else {
                _this.process = child_process_1.spawn(options.command, options.args || [], options.options || {});
            }
            _this.process.on('error', function (error) {
                error.code = error.code || 'Unknown error';
                _this.emitOnError(error);
            });
            // When no stdio option is passed, it is null by default.
            _this.outputStream = _this.process.stdout || new dev_null_stream_2.DevNullStream({ autoDestroy: true });
            _this.inputStream = _this.process.stdin || new dev_null_stream_2.DevNullStream({ autoDestroy: true });
            _this.errorStream = _this.process.stderr || new dev_null_stream_2.DevNullStream({ autoDestroy: true });
            _this.process.on('exit', function (exitCode, signal) {
                // node's child_process exit sets the unused parameter to null,
                // but we want it to be undefined instead.
                _this.emitOnExit(typeof exitCode === 'number' ? exitCode : undefined, typeof signal === 'string' ? signal : undefined);
            });
            _this.process.on('close', function (exitCode, signal) {
                // node's child_process exit sets the unused parameter to null,
                // but we want it to be undefined instead.
                _this.emitOnClose(typeof exitCode === 'number' ? exitCode : undefined, typeof signal === 'string' ? signal : undefined);
            });
            if (_this.process.pid !== undefined) {
                process.nextTick(_this.emitOnStarted.bind(_this));
            }
        }
        catch (error) {
            /* When an error is thrown, set up some fake streams, so the client
               code doesn't break because these field are undefined.  */
            _this.outputStream = new dev_null_stream_2.DevNullStream({ autoDestroy: true });
            _this.inputStream = new dev_null_stream_2.DevNullStream({ autoDestroy: true });
            _this.errorStream = new dev_null_stream_2.DevNullStream({ autoDestroy: true });
            /* Call the client error handler, but first give them a chance to register it.  */
            _this.emitOnErrorAsync(error);
        }
        return _this;
    }
    Object.defineProperty(RawProcess.prototype, "input", {
        /**
         * @deprecated use `inputStream` instead.
         */
        get: function () { return this.inputStream; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RawProcess.prototype, "output", {
        /**
         * @deprecated use `outputStream` instead.
         */
        get: function () { return this.outputStream; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RawProcess.prototype, "errorOutput", {
        /**
         * @deprecated use `errorStream` instead.
         */
        get: function () { return this.errorStream; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RawProcess.prototype, "pid", {
        get: function () {
            if (!this.process) {
                throw new Error('process did not start correctly');
            }
            return this.process.pid;
        },
        enumerable: false,
        configurable: true
    });
    RawProcess.prototype.kill = function (signal) {
        if (this.process && this.killed === false) {
            this.process.kill(signal);
        }
    };
    RawProcess = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.RawProcessOptions)),
        __param(1, inversify_1.inject(process_manager_1.ProcessManager)),
        __param(2, inversify_1.inject(common_1.ILogger)), __param(2, inversify_1.named('process')),
        __metadata("design:paramtypes", [Object, process_manager_1.ProcessManager, Object])
    ], RawProcess);
    return RawProcess;
}(process_1.Process));
exports.RawProcess = RawProcess;
//# sourceMappingURL=raw-process.js.map