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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessTask = exports.TaskFactory = exports.TaskProcessOptions = exports.removeAnsiEscapeCodes = void 0;
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common/");
var task_1 = require("../task");
var task_manager_1 = require("../task-manager");
// copied from https://github.com/Microsoft/vscode/blob/1.33.1/src/vs/base/common/strings.ts
// Escape codes
// http://en.wikipedia.org/wiki/ANSI_escape_code
var EL = /\x1B\x5B[12]?K/g; // Erase in line
var COLOR_START = /\x1b\[\d+(;\d+)*m/g; // Color
var COLOR_END = /\x1b\[0?m/g; // Color
function removeAnsiEscapeCodes(str) {
    if (str) {
        str = str.replace(EL, '');
        str = str.replace(COLOR_START, '');
        str = str.replace(COLOR_END, '');
    }
    return str.trimRight();
}
exports.removeAnsiEscapeCodes = removeAnsiEscapeCodes;
exports.TaskProcessOptions = Symbol('TaskProcessOptions');
exports.TaskFactory = Symbol('TaskFactory');
/** Represents a Task launched as a process by `ProcessTaskRunner`. */
var ProcessTask = /** @class */ (function (_super) {
    __extends(ProcessTask, _super);
    function ProcessTask(taskManager, logger, options) {
        var _this = _super.call(this, taskManager, logger, options) || this;
        _this.taskManager = taskManager;
        _this.logger = logger;
        _this.options = options;
        var toDispose = _this.process.onClose(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        toDispose.dispose();
                        _a = this.fireTaskExited;
                        return [4 /*yield*/, this.getTaskExitedEvent(event)];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
        // Buffer to accumulate incoming output.
        var dataBuffer = '';
        _this.process.outputStream.on('data', function (chunk) {
            dataBuffer += chunk;
            while (1) {
                // Check if we have a complete line.
                var eolIdx = dataBuffer.indexOf('\n');
                if (eolIdx < 0) {
                    break;
                }
                // Get and remove the line from the data buffer.
                var lineBuf = dataBuffer.slice(0, eolIdx);
                dataBuffer = dataBuffer.slice(eolIdx + 1);
                var processedLine = removeAnsiEscapeCodes(lineBuf);
                _this.fireOutputLine({
                    taskId: _this.taskId,
                    ctx: _this.context,
                    line: processedLine
                });
            }
        });
        _this.command = _this.options.command;
        _this.logger.info("Created new task, id: " + _this.id + ", process id: " + _this.options.process.id + ", OS PID: " + _this.process.pid + ", context: " + _this.context);
        return _this;
    }
    ProcessTask.prototype.kill = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.process.killed) {
                resolve();
            }
            else {
                var toDispose_1 = _this.process.onClose(function (event) {
                    toDispose_1.dispose();
                    resolve();
                });
                _this.process.kill();
            }
        });
    };
    ProcessTask.prototype.getTaskExitedEvent = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        taskId: this.taskId,
                        ctx: this.context,
                        code: evt.code,
                        signal: evt.signal,
                        config: this.options.config,
                        terminalId: this.process.id,
                        processId: this.process.id
                    }];
            });
        });
    };
    ProcessTask.prototype.getRuntimeInfo = function () {
        return {
            taskId: this.id,
            ctx: this.context,
            config: this.options.config,
            terminalId: this.process.id,
            processId: this.process.id,
            command: this.command
        };
    };
    Object.defineProperty(ProcessTask.prototype, "process", {
        get: function () {
            return this.options.process;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProcessTask.prototype, "processType", {
        get: function () {
            return this.options.processType;
        },
        enumerable: false,
        configurable: true
    });
    ProcessTask = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(task_manager_1.TaskManager)),
        __param(1, inversify_1.inject(common_1.ILogger)), __param(1, inversify_1.named('task')),
        __param(2, inversify_1.inject(exports.TaskProcessOptions)),
        __metadata("design:paramtypes", [task_manager_1.TaskManager, Object, Object])
    ], ProcessTask);
    return ProcessTask;
}(task_1.Task));
exports.ProcessTask = ProcessTask;
//# sourceMappingURL=process-task.js.map