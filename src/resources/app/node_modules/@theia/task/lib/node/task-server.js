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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskServerImpl = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common/");
var task_manager_1 = require("./task-manager");
var task_runner_1 = require("./task-runner");
var process_task_1 = require("./process/process-task");
var task_problem_collector_1 = require("./task-problem-collector");
var TaskServerImpl = /** @class */ (function () {
    function TaskServerImpl() {
        /** Task clients, to send notifications-to. */
        this.clients = [];
        /** Map of task id and task disposable */
        this.toDispose = new Map();
        /** Map of task id and task background status. */
        // Currently there is only one property ('isActive'), but in the future we may want to store more properties
        this.backgroundTaskStatusMap = new Map();
        /** task context - {task id - problem collector} */
        this.problemCollectors = new Map();
    }
    TaskServerImpl.prototype.dispose = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.toDispose.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var toDispose = _c.value;
                toDispose.dispose();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.toDispose.clear();
        this.backgroundTaskStatusMap.clear();
    };
    TaskServerImpl.prototype.disposeByTaskId = function (taskId) {
        if (this.toDispose.has(taskId)) {
            this.toDispose.get(taskId).dispose();
            this.toDispose.delete(taskId);
        }
        if (this.backgroundTaskStatusMap.has(taskId)) {
            this.backgroundTaskStatusMap.delete(taskId);
        }
    };
    TaskServerImpl.prototype.getTasks = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, tasks, tasks_1, tasks_1_1, task, _a, _b, e_2_1;
            var e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        taskInfo = [];
                        tasks = this.taskManager.getTasks(context);
                        if (!(tasks !== undefined)) return [3 /*break*/, 8];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        tasks_1 = __values(tasks), tasks_1_1 = tasks_1.next();
                        _d.label = 2;
                    case 2:
                        if (!!tasks_1_1.done) return [3 /*break*/, 5];
                        task = tasks_1_1.value;
                        _b = (_a = taskInfo).push;
                        return [4 /*yield*/, task.getRuntimeInfo()];
                    case 3:
                        _b.apply(_a, [_d.sent()]);
                        _d.label = 4;
                    case 4:
                        tasks_1_1 = tasks_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (tasks_1_1 && !tasks_1_1.done && (_c = tasks_1.return)) _c.call(tasks_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        this.logger.debug("getTasks(): about to return task information for " + taskInfo.length + " tasks");
                        return [2 /*return*/, Promise.resolve(taskInfo)];
                }
            });
        });
    };
    TaskServerImpl.prototype.run = function (taskConfiguration, ctx, option) {
        return __awaiter(this, void 0, void 0, function () {
            var runner, task, resolvedMatchers, taskInfo;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        runner = this.runnerRegistry.getRunner(taskConfiguration.type);
                        return [4 /*yield*/, runner.run(taskConfiguration, ctx)];
                    case 1:
                        task = _a.sent();
                        if (!this.toDispose.has(task.id)) {
                            this.toDispose.set(task.id, new common_1.DisposableCollection());
                        }
                        if (taskConfiguration.isBackground && !this.backgroundTaskStatusMap.has(task.id)) {
                            this.backgroundTaskStatusMap.set(task.id, { 'isActive': false });
                        }
                        this.toDispose.get(task.id).push(task.onExit(function (event) {
                            _this.taskManager.delete(task);
                            _this.fireTaskExitedEvent(event, task);
                            _this.removedCachedProblemCollector(event.ctx || '', event.taskId);
                            _this.disposeByTaskId(event.taskId);
                        }));
                        resolvedMatchers = option && option.customization ? option.customization.problemMatcher || [] : [];
                        if (resolvedMatchers.length > 0) {
                            this.toDispose.get(task.id).push(task.onOutput(function (event) {
                                var collector = _this.getCachedProblemCollector(event.ctx || '', event.taskId);
                                if (!collector) {
                                    collector = new task_problem_collector_1.ProblemCollector(resolvedMatchers);
                                    _this.cacheProblemCollector(event.ctx || '', event.taskId, collector);
                                }
                                var problems = collector.processLine(event.line);
                                if (problems.length > 0) {
                                    _this.fireTaskOutputProcessedEvent({
                                        taskId: event.taskId,
                                        config: taskConfiguration,
                                        ctx: event.ctx,
                                        problems: problems
                                    });
                                }
                                if (taskConfiguration.isBackground) {
                                    var backgroundTaskStatus = _this.backgroundTaskStatusMap.get(event.taskId);
                                    if (!backgroundTaskStatus.isActive) {
                                        // Get the 'activeOnStart' value of the problem matcher 'background' property
                                        var activeOnStart = collector.isTaskActiveOnStart();
                                        if (activeOnStart) {
                                            backgroundTaskStatus.isActive = true;
                                        }
                                        else {
                                            var isBeginsPatternMatch = collector.matchBeginMatcher(event.line);
                                            if (isBeginsPatternMatch) {
                                                backgroundTaskStatus.isActive = true;
                                            }
                                        }
                                    }
                                    if (backgroundTaskStatus.isActive) {
                                        var isEndsPatternMatch = collector.matchEndMatcher(event.line);
                                        // Mark ends pattern as matches, only after begins pattern matches
                                        if (isEndsPatternMatch) {
                                            _this.fireBackgroundTaskEndedEvent({
                                                taskId: event.taskId,
                                                ctx: event.ctx
                                            });
                                        }
                                    }
                                }
                            }));
                        }
                        this.toDispose.get(task.id).push(task);
                        return [4 /*yield*/, task.getRuntimeInfo()];
                    case 2:
                        taskInfo = _a.sent();
                        this.fireTaskCreatedEvent(taskInfo);
                        return [2 /*return*/, taskInfo];
                }
            });
        });
    };
    TaskServerImpl.prototype.getRegisteredTaskTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.runnerRegistry.getRunnerTypes()];
            });
        });
    };
    TaskServerImpl.prototype.fireTaskExitedEvent = function (event, task) {
        this.logger.debug(function (log) { return log('task has exited:', event); });
        if (task instanceof process_task_1.ProcessTask) {
            this.clients.forEach(function (client) {
                client.onDidEndTaskProcess(event);
            });
        }
        this.clients.forEach(function (client) {
            client.onTaskExit(event);
        });
    };
    TaskServerImpl.prototype.fireTaskCreatedEvent = function (event, task) {
        this.logger.debug(function (log) { return log('task created:', event); });
        this.clients.forEach(function (client) {
            client.onTaskCreated(event);
        });
        if (task && task instanceof process_task_1.ProcessTask) {
            this.clients.forEach(function (client) {
                client.onDidStartTaskProcess(event);
            });
        }
    };
    TaskServerImpl.prototype.fireTaskOutputProcessedEvent = function (event) {
        this.clients.forEach(function (client) { return client.onDidProcessTaskOutput(event); });
    };
    TaskServerImpl.prototype.fireBackgroundTaskEndedEvent = function (event) {
        this.clients.forEach(function (client) { return client.onBackgroundTaskEnded(event); });
    };
    /** Kill task for a given id. Rejects if task is not found */
    TaskServerImpl.prototype.kill = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var taskToKill;
            return __generator(this, function (_a) {
                taskToKill = this.taskManager.get(id);
                if (taskToKill !== undefined) {
                    this.logger.info("Killing task id " + id);
                    return [2 /*return*/, taskToKill.kill()];
                }
                else {
                    this.logger.info("Could not find task to kill, task id " + id + ". Already terminated?");
                    return [2 /*return*/, Promise.reject(new Error("Could not find task to kill, task id " + id + ". Already terminated?"))];
                }
                return [2 /*return*/];
            });
        });
    };
    /** Adds a client to this server */
    TaskServerImpl.prototype.setClient = function (client) {
        this.logger.debug('a client has connected - adding it to the list:');
        this.clients.push(client);
    };
    /** Removes a client, from this server */
    TaskServerImpl.prototype.disconnectClient = function (client) {
        this.logger.debug('a client has disconnected - removed from list:');
        var idx = this.clients.indexOf(client);
        if (idx > -1) {
            this.clients.splice(idx, 1);
        }
    };
    TaskServerImpl.prototype.getCachedProblemCollector = function (ctx, taskId) {
        if (this.problemCollectors.has(ctx)) {
            return this.problemCollectors.get(ctx).get(taskId);
        }
    };
    TaskServerImpl.prototype.cacheProblemCollector = function (ctx, taskId, problemCollector) {
        if (this.problemCollectors.has(ctx)) {
            if (!this.problemCollectors.get(ctx).has(taskId)) {
                this.problemCollectors.get(ctx).set(taskId, problemCollector);
            }
        }
        else {
            var forNewContext = new Map();
            forNewContext.set(taskId, problemCollector);
            this.problemCollectors.set(ctx, forNewContext);
        }
    };
    TaskServerImpl.prototype.removedCachedProblemCollector = function (ctx, taskId) {
        if (this.problemCollectors.has(ctx) && this.problemCollectors.get(ctx).has(taskId)) {
            this.problemCollectors.get(ctx).delete(taskId);
        }
    };
    __decorate([
        inversify_1.inject(common_1.ILogger),
        inversify_1.named('task'),
        __metadata("design:type", Object)
    ], TaskServerImpl.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(task_manager_1.TaskManager),
        __metadata("design:type", task_manager_1.TaskManager)
    ], TaskServerImpl.prototype, "taskManager", void 0);
    __decorate([
        inversify_1.inject(task_runner_1.TaskRunnerRegistry),
        __metadata("design:type", task_runner_1.TaskRunnerRegistry)
    ], TaskServerImpl.prototype, "runnerRegistry", void 0);
    TaskServerImpl = __decorate([
        inversify_1.injectable()
    ], TaskServerImpl);
    return TaskServerImpl;
}());
exports.TaskServerImpl = TaskServerImpl;
//# sourceMappingURL=task-server.js.map