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
exports.TasksExtImpl = void 0;
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var converter = require("../type-converters");
var types_impl_1 = require("../types-impl");
var rpc_protocol_1 = require("../../common/rpc-protocol");
var task_provider_1 = require("./task-provider");
var event_1 = require("@theia/core/lib/common/event");
var TasksExtImpl = /** @class */ (function () {
    function TasksExtImpl(rpc) {
        this.callId = 0;
        this.adaptersMap = new Map();
        this.executions = new Map();
        this.onDidExecuteTask = new event_1.Emitter();
        this.onDidTerminateTask = new event_1.Emitter();
        this.onDidExecuteTaskProcess = new event_1.Emitter();
        this.onDidTerminateTaskProcess = new event_1.Emitter();
        this.disposed = false;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.TASKS_MAIN);
        this.fetchTaskExecutions();
    }
    TasksExtImpl.prototype.dispose = function () {
        this.disposed = true;
    };
    Object.defineProperty(TasksExtImpl.prototype, "taskExecutions", {
        get: function () {
            return __spread(this.executions.values());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TasksExtImpl.prototype, "onDidStartTask", {
        get: function () {
            return this.onDidExecuteTask.event;
        },
        enumerable: false,
        configurable: true
    });
    TasksExtImpl.prototype.$onDidStartTask = function (execution) {
        this.onDidExecuteTask.fire({
            execution: this.getTaskExecution(execution)
        });
    };
    Object.defineProperty(TasksExtImpl.prototype, "onDidEndTask", {
        get: function () {
            return this.onDidTerminateTask.event;
        },
        enumerable: false,
        configurable: true
    });
    TasksExtImpl.prototype.$onDidEndTask = function (id) {
        var taskExecution = this.executions.get(id);
        if (!taskExecution) {
            throw new Error("Task execution with id " + id + " is not found");
        }
        this.executions.delete(id);
        this.onDidTerminateTask.fire({
            execution: taskExecution
        });
    };
    Object.defineProperty(TasksExtImpl.prototype, "onDidStartTaskProcess", {
        get: function () {
            return this.onDidExecuteTaskProcess.event;
        },
        enumerable: false,
        configurable: true
    });
    TasksExtImpl.prototype.$onDidStartTaskProcess = function (processId, executionDto) {
        this.onDidExecuteTaskProcess.fire({
            processId: processId,
            execution: this.getTaskExecution(executionDto)
        });
    };
    Object.defineProperty(TasksExtImpl.prototype, "onDidEndTaskProcess", {
        get: function () {
            return this.onDidTerminateTaskProcess.event;
        },
        enumerable: false,
        configurable: true
    });
    TasksExtImpl.prototype.$onDidEndTaskProcess = function (exitCode, taskId) {
        var taskExecution = this.executions.get(taskId);
        if (!taskExecution) {
            throw new Error("Task execution with id " + taskId + " is not found");
        }
        this.onDidTerminateTaskProcess.fire({
            execution: taskExecution,
            exitCode: exitCode
        });
    };
    TasksExtImpl.prototype.registerTaskProvider = function (type, provider) {
        var callId = this.addNewAdapter(new task_provider_1.TaskProviderAdapter(provider));
        this.proxy.$registerTaskProvider(callId, type);
        return this.createDisposable(callId);
    };
    TasksExtImpl.prototype.fetchTasks = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var taskVersion, taskType, taskDtos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskVersion = filter ? filter.version : undefined;
                        taskType = filter ? filter.type : undefined;
                        return [4 /*yield*/, this.proxy.$fetchTasks(taskVersion, taskType)];
                    case 1:
                        taskDtos = _a.sent();
                        return [2 /*return*/, taskDtos.map(function (dto) { return converter.toTask(dto); })];
                }
            });
        });
    };
    TasksExtImpl.prototype.executeTask = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var taskDto, executionDto, taskExecution;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskDto = converter.fromTask(task);
                        if (!taskDto) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.proxy.$executeTask(taskDto)];
                    case 1:
                        executionDto = _a.sent();
                        if (executionDto) {
                            taskExecution = this.getTaskExecution(executionDto);
                            return [2 /*return*/, taskExecution];
                        }
                        throw new Error('Run task config does not return after being started');
                    case 2: throw new Error('Task was not successfully transformed into a task config');
                }
            });
        });
    };
    TasksExtImpl.prototype.$provideTasks = function (handle, token) {
        var adapter = this.adaptersMap.get(handle);
        if (adapter) {
            return adapter.provideTasks(token);
        }
        else {
            return Promise.reject(new Error('No adapter found to provide tasks'));
        }
    };
    TasksExtImpl.prototype.$resolveTask = function (handle, task, token) {
        var adapter = this.adaptersMap.get(handle);
        if (adapter) {
            return adapter.resolveTask(task, token);
        }
        else {
            return Promise.reject(new Error('No adapter found to resolve task'));
        }
    };
    TasksExtImpl.prototype.addNewAdapter = function (adapter) {
        var callId = this.nextCallId();
        this.adaptersMap.set(callId, adapter);
        return callId;
    };
    TasksExtImpl.prototype.nextCallId = function () {
        return this.callId++;
    };
    TasksExtImpl.prototype.createDisposable = function (callId) {
        var _this = this;
        return new types_impl_1.Disposable(function () {
            _this.adaptersMap.delete(callId);
            _this.proxy.$unregister(callId);
        });
    };
    TasksExtImpl.prototype.fetchTaskExecutions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskExecutions, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.proxy.$taskExecutions()];
                    case 1:
                        taskExecutions = _a.sent();
                        taskExecutions.forEach(function (execution) { return _this.getTaskExecution(execution); });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        if (this.disposed && rpc_protocol_1.ConnectionClosedError.is(error_1)) {
                            return [2 /*return*/];
                        }
                        console.error("Can not fetch running tasks: " + error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TasksExtImpl.prototype.getTaskExecution = function (execution) {
        var _this = this;
        var executionId = execution.id;
        var result = this.executions.get(executionId);
        if (result) {
            return result;
        }
        result = {
            task: converter.toTask(execution.task),
            terminate: function () {
                _this.proxy.$terminateTask(executionId);
            }
        };
        this.executions.set(executionId, result);
        return result;
    };
    return TasksExtImpl;
}());
exports.TasksExtImpl = TasksExtImpl;
//# sourceMappingURL=tasks.js.map