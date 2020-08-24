"use strict";
/********************************************************************************
 * Copyright (C) 2017-2019 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
// tslint:disable-next-line:no-implicit-dependencies
require("reflect-metadata");
var task_test_container_1 = require("./test/task-test-container");
var backend_application_1 = require("@theia/core/lib/node/backend-application");
var common_1 = require("../common");
var os_1 = require("@theia/core/lib/common/os");
var node_1 = require("@theia/core/lib/node");
var terminal_protocol_1 = require("@theia/terminal/lib/common/terminal-protocol");
var expect_1 = require("@theia/core/lib/common/test/expect");
var test_web_socket_channel_1 = require("@theia/core/lib/node/messaging/test/test-web-socket-channel");
var chai_1 = require("chai");
// test scripts that we bundle with tasks
var commandShortRunning = './task';
var commandShortRunningOsx = './task-osx';
var commandShortRunningWindows = '.\\task.bat';
var commandLongRunning = './task-long-running';
var commandLongRunningOsx = './task-long-running-osx';
var commandLongRunningWindows = '.\\task-long-running.bat';
var bogusCommand = 'thisisnotavalidcommand';
var commandUnixNoop = 'true';
var commandWindowsNoop = 'rundll32.exe';
/** Expects argv to be ['a', 'b', 'c'] */
var script0 = './test-arguments-0.js';
/** Expects argv to be ['a', 'b', '   c'] */
var script1 = './test-arguments-1.js';
/** Expects argv to be ['a', 'b', 'c"'] */
var script2 = './test-arguments-2.js';
// we use test-resources subfolder ('<theia>/packages/task/test-resources/'),
// as workspace root, for these tests
var wsRootUri = node_1.FileUri.create(__dirname).resolve('../../test-resources');
var wsRoot = node_1.FileUri.fsPath(wsRootUri);
describe('Task server / back-end', function () {
    var _this = this;
    this.timeout(10000);
    var backend;
    var server;
    var taskServer;
    var taskWatcher;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var testContainer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    delete process.env['THEIA_TASK_TEST_DEBUG'];
                    testContainer = task_test_container_1.createTaskTestContainer();
                    taskWatcher = testContainer.get(common_1.TaskWatcher);
                    taskServer = testContainer.get(common_1.TaskServer);
                    taskServer.setClient(taskWatcher.getTaskClient());
                    backend = testContainer.get(backend_application_1.BackendApplication);
                    return [4 /*yield*/, backend.start()];
                case 1:
                    server = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var _backend, _server;
        return __generator(this, function (_a) {
            _backend = backend;
            _server = server;
            backend = undefined;
            taskServer = undefined;
            taskWatcher = undefined;
            server = undefined;
            _backend['onStop']();
            _server.close();
            return [2 /*return*/];
        });
    }); });
    it('task running in terminal - expected data is received from the terminal ws server', function () {
        return __awaiter(this, void 0, void 0, function () {
            var someString, command, taskInfo, terminalId, messagesToWaitFor, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        someString = 'someSingleWordString';
                        // This test is flaky on Windows and fails intermittently. Disable it for now
                        if (os_1.isWindows) {
                            this.skip();
                            return [2 /*return*/];
                        }
                        command = os_1.isWindows ? commandShortRunningWindows : (os_1.isOSX ? commandShortRunningOsx : commandShortRunning);
                        return [4 /*yield*/, taskServer.run(createProcessTaskConfig('shell', command + " " + someString), wsRoot)];
                    case 1:
                        taskInfo = _a.sent();
                        terminalId = taskInfo.terminalId;
                        messagesToWaitFor = 10;
                        messages = [];
                        // hook-up to terminal's ws and confirm that it outputs expected tasks' output
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                var channel = new test_web_socket_channel_1.TestWebSocketChannel({ server: server, path: terminal_protocol_1.terminalsPath + "/" + terminalId });
                                channel.onError(reject);
                                channel.onClose(function (code, reason) { return reject(new Error("channel is closed with '" + code + "' code and '" + reason + "' reason")); });
                                channel.onMessage(function (msg) {
                                    // check output of task on terminal is what we expect
                                    var expected = (os_1.isOSX ? 'tasking osx' : 'tasking') + "... " + someString;
                                    // Instead of waiting for one message from the terminal, we wait for several ones as the very first message can be something unexpected.
                                    // For instance: `nvm is not compatible with the \"PREFIX\" environment variable: currently set to \"/usr/local\"\r\n`
                                    var currentMessage = msg.toString();
                                    messages.unshift(currentMessage);
                                    if (currentMessage.indexOf(expected) !== -1) {
                                        resolve();
                                        channel.close();
                                        return;
                                    }
                                    if (messages.length >= messagesToWaitFor) {
                                        reject(new Error("expected sub-string not found in terminal output. Expected: \"" + expected + "\" vs Actual messages: " + JSON.stringify(messages)));
                                        channel.close();
                                    }
                                });
                            })];
                    case 2:
                        // hook-up to terminal's ws and confirm that it outputs expected tasks' output
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('task using raw process - task server success response shall not contain a terminal id', function () {
        return __awaiter(this, void 0, void 0, function () {
            var someString, command, executable, taskInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        someString = 'someSingleWordString';
                        command = os_1.isWindows ? commandShortRunningWindows : (os_1.isOSX ? commandShortRunningOsx : commandShortRunning);
                        executable = node_1.FileUri.fsPath(wsRootUri.resolve(command));
                        return [4 /*yield*/, taskServer.run(createProcessTaskConfig('process', executable, [someString]), wsRoot)];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                var toDispose = taskWatcher.onTaskExit(function (event) {
                                    if (event.taskId === taskInfo.taskId && event.code === 0) {
                                        if (typeof taskInfo.terminalId === 'number') {
                                            resolve();
                                        }
                                        else {
                                            reject(new Error("terminal id was expected to be a number, got: " + typeof taskInfo.terminalId));
                                        }
                                        toDispose.dispose();
                                    }
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('task is executed successfully with cwd as a file URI', function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, config, taskInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = os_1.isWindows ? commandShortRunningWindows : (os_1.isOSX ? commandShortRunningOsx : commandShortRunning);
                        config = createProcessTaskConfig('shell', command, undefined, node_1.FileUri.create(wsRoot).toString());
                        return [4 /*yield*/, taskServer.run(config, wsRoot)];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, checkSuccessfulProcessExit(taskInfo, taskWatcher)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('task is executed successfully using terminal process', function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, taskInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = os_1.isWindows ? commandShortRunningWindows : (os_1.isOSX ? commandShortRunningOsx : commandShortRunning);
                        return [4 /*yield*/, taskServer.run(createProcessTaskConfig('shell', command, undefined), wsRoot)];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, checkSuccessfulProcessExit(taskInfo, taskWatcher)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('task is executed successfully using raw process', function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, executable, taskInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = os_1.isWindows ? commandShortRunningWindows : (os_1.isOSX ? commandShortRunningOsx : commandShortRunning);
                        executable = node_1.FileUri.fsPath(wsRootUri.resolve(command));
                        return [4 /*yield*/, taskServer.run(createProcessTaskConfig('process', executable, []))];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, checkSuccessfulProcessExit(taskInfo, taskWatcher)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('task without a specific runner is executed successfully using as a process', function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, taskConfig, taskInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = os_1.isWindows ? commandWindowsNoop : commandUnixNoop;
                        taskConfig = createTaskConfig('npm', command, []);
                        return [4 /*yield*/, taskServer.run(taskConfig, wsRoot)];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, checkSuccessfulProcessExit(taskInfo, taskWatcher)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('task can successfully execute command found in system path using a terminal process', function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, opts, taskInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = os_1.isWindows ? commandWindowsNoop : commandUnixNoop;
                        opts = createProcessTaskConfig('shell', command, []);
                        return [4 /*yield*/, taskServer.run(opts, wsRoot)];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, checkSuccessfulProcessExit(taskInfo, taskWatcher)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('task can successfully execute command found in system path using a raw process', function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, taskInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = os_1.isWindows ? commandWindowsNoop : commandUnixNoop;
                        return [4 /*yield*/, taskServer.run(createProcessTaskConfig('process', command, []), wsRoot)];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, checkSuccessfulProcessExit(taskInfo, taskWatcher)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('task using type "shell" can be killed', function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, exitStatusPromise, exitStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskServer.run(createTaskConfigTaskLongRunning('shell'), wsRoot)];
                    case 1:
                        taskInfo = _a.sent();
                        exitStatusPromise = getExitStatus(taskInfo, taskWatcher);
                        taskServer.kill(taskInfo.taskId);
                        return [4 /*yield*/, exitStatusPromise];
                    case 2:
                        exitStatus = _a.sent();
                        // node-pty reports different things on Linux/macOS vs Windows when
                        // killing a process.  This is not ideal, but that's how things are
                        // currently.  Ideally, its behavior should be aligned as much as
                        // possible on what node's child_process module does.
                        if (os_1.isWindows) {
                            // On Windows, node-pty just reports an exit code of 0.
                            chai_1.expect(exitStatus).equals(0);
                        }
                        else {
                            // On Linux/macOS, node-pty sends SIGHUP by default, for some reason.
                            chai_1.expect(exitStatus).equals('SIGHUP');
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('task using type "process" can be killed', function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, exitStatusPromise, exitStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskServer.run(createTaskConfigTaskLongRunning('process'), wsRoot)];
                    case 1:
                        taskInfo = _a.sent();
                        exitStatusPromise = getExitStatus(taskInfo, taskWatcher);
                        taskServer.kill(taskInfo.taskId);
                        return [4 /*yield*/, exitStatusPromise];
                    case 2:
                        exitStatus = _a.sent();
                        // node-pty reports different things on Linux/macOS vs Windows when
                        // killing a process.  This is not ideal, but that's how things are
                        // currently.  Ideally, its behavior should be aligned as much as
                        // possible on what node's child_process module does.
                        if (os_1.isWindows) {
                            // On Windows, node-pty just reports an exit code of 0.
                            chai_1.expect(exitStatus).equals(0);
                        }
                        else {
                            // On Linux/macOS, node-pty sends SIGHUP by default, for some reason.
                            chai_1.expect(exitStatus).equals('SIGHUP');
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    /**
     * TODO: Figure out how to debug a process that correctly starts but exits with a return code > 0
     */
    it('task using terminal process can handle command that does not exist', function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskServer.run(createProcessTaskConfig2('shell', bogusCommand, []), wsRoot)];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                taskWatcher.onTaskExit(function (event) {
                                    if (event.taskId !== taskInfo.taskId || event.code === undefined) {
                                        reject(new Error(JSON.stringify(event)));
                                    }
                                    resolve(event.code);
                                });
                            })];
                    case 2:
                        code = _a.sent();
                        // node-pty reports different things on Linux/macOS vs Windows when
                        // killing a process.  This is not ideal, but that's how things are
                        // currently.  Ideally, its behavior should be aligned as much as
                        // possible on what node's child_process module does.
                        if (os_1.isWindows) {
                            chai_1.expect(code).equals(1);
                        }
                        else {
                            chai_1.expect(code).equals(127);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('task using raw process can handle command that does not exist', function () {
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = taskServer.run(createProcessTaskConfig2('process', bogusCommand, []), wsRoot);
                        return [4 /*yield*/, expect_1.expectThrowsAsync(p, 'ENOENT')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('getTasks(ctx) returns tasks according to created context', function () {
        return __awaiter(this, void 0, void 0, function () {
            var context1, context2, task1, task2, task3, task4, task5, task6, runningTasksCtx1, runningTasksCtx2, runningTasksAll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context1 = 'aContext';
                        context2 = 'anotherContext';
                        return [4 /*yield*/, taskServer.run(createTaskConfigTaskLongRunning('shell'), context1)];
                    case 1:
                        task1 = _a.sent();
                        return [4 /*yield*/, taskServer.run(createTaskConfigTaskLongRunning('process'), context2)];
                    case 2:
                        task2 = _a.sent();
                        return [4 /*yield*/, taskServer.run(createTaskConfigTaskLongRunning('shell'), context1)];
                    case 3:
                        task3 = _a.sent();
                        return [4 /*yield*/, taskServer.run(createTaskConfigTaskLongRunning('process'), context2)];
                    case 4:
                        task4 = _a.sent();
                        return [4 /*yield*/, taskServer.run(createTaskConfigTaskLongRunning('shell'), context1)];
                    case 5:
                        task5 = _a.sent();
                        return [4 /*yield*/, taskServer.run(createTaskConfigTaskLongRunning('process'), context1)];
                    case 6:
                        task6 = _a.sent();
                        return [4 /*yield*/, taskServer.getTasks(context1)];
                    case 7:
                        runningTasksCtx1 = _a.sent();
                        return [4 /*yield*/, taskServer.getTasks(context2)];
                    case 8:
                        runningTasksCtx2 = _a.sent();
                        return [4 /*yield*/, taskServer.getTasks()];
                    case 9:
                        runningTasksAll = _a.sent();
                        if (runningTasksCtx1.length !== 4) {
                            throw new Error("Error: unexpected number of running tasks for context 1: expected: 4, actual: " + runningTasksCtx1.length);
                        }
                        if (runningTasksCtx2.length !== 2) {
                            throw new Error("Error: unexpected number of running tasks for context 2: expected: 2, actual: " + runningTasksCtx1.length);
                        }
                        if (runningTasksAll.length !== 6) {
                            throw new Error("Error: unexpected total number of running tasks for all contexts:  expected: 6, actual: " + runningTasksCtx1.length);
                        }
                        // cleanup
                        return [4 /*yield*/, taskServer.kill(task1.taskId)];
                    case 10:
                        // cleanup
                        _a.sent();
                        return [4 /*yield*/, taskServer.kill(task2.taskId)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, taskServer.kill(task3.taskId)];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, taskServer.kill(task4.taskId)];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, taskServer.kill(task5.taskId)];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, taskServer.kill(task6.taskId)];
                    case 15:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('creating and killing a bunch of tasks works as expected', function () {
        return __awaiter(this, void 0, void 0, function () {
            var numTasks, taskInfo, i, _a, _b, _c, _d, numRunningTasksAfterCreated, i, numRunningTasksAfterKilled;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        numTasks = 20;
                        taskInfo = [];
                        i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(i < numTasks)) return [3 /*break*/, 6];
                        if (!(i % 2 === 0)) return [3 /*break*/, 3];
                        _b = (_a = taskInfo).push;
                        return [4 /*yield*/, taskServer.run(createTaskConfigTaskLongRunning('shell'))];
                    case 2:
                        _b.apply(_a, [_e.sent()]);
                        return [3 /*break*/, 5];
                    case 3:
                        _d = (_c = taskInfo).push;
                        return [4 /*yield*/, taskServer.run(createTaskConfigTaskLongRunning('process'))];
                    case 4:
                        _d.apply(_c, [_e.sent()]);
                        _e.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [4 /*yield*/, taskServer.getTasks()];
                    case 7:
                        numRunningTasksAfterCreated = _e.sent();
                        i = 0;
                        _e.label = 8;
                    case 8:
                        if (!(i < taskInfo.length)) return [3 /*break*/, 11];
                        return [4 /*yield*/, taskServer.kill(taskInfo[i].taskId)];
                    case 9:
                        _e.sent();
                        _e.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 8];
                    case 11: return [4 /*yield*/, taskServer.getTasks()];
                    case 12:
                        numRunningTasksAfterKilled = _e.sent();
                        if (numRunningTasksAfterCreated.length !== numTasks) {
                            throw new Error("Error: unexpected number of running tasks: expected: " + numTasks + ", actual: " + numRunningTasksAfterCreated.length);
                        }
                        if (numRunningTasksAfterKilled.length !== 0) {
                            throw new Error("Error: remaining running tasks, after all killed: expected: 0, actual: " + numRunningTasksAfterKilled.length);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    it('shell task should execute the command as a whole if not arguments are specified', function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, exitStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskServer.run(createProcessTaskConfig2('shell', "node " + script0 + " debug-hint:0a a b c"))];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, getExitStatus(taskInfo, taskWatcher)];
                    case 2:
                        exitStatus = _a.sent();
                        chai_1.expect(exitStatus).eq(0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('shell task should fail if user defines a full command line and arguments', function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, exitStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskServer.run(createProcessTaskConfig2('shell', "node " + script0 + " debug-hint:0b a b c", []))];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, getExitStatus(taskInfo, taskWatcher)];
                    case 2:
                        exitStatus = _a.sent();
                        chai_1.expect(exitStatus).not.eq(0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('shell task should be able to exec using simple arguments', function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, exitStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskServer.run(createProcessTaskConfig2('shell', 'node', [script0, 'debug-hint:0c', 'a', 'b', 'c']))];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, getExitStatus(taskInfo, taskWatcher)];
                    case 2:
                        exitStatus = _a.sent();
                        chai_1.expect(exitStatus).eq(0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('shell task should be able to run using arguments containing whitespace', function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, exitStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskServer.run(createProcessTaskConfig2('shell', 'node', [script1, 'debug-hint:1', 'a', 'b', '   c']))];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, getExitStatus(taskInfo, taskWatcher)];
                    case 2:
                        exitStatus = _a.sent();
                        chai_1.expect(exitStatus).eq(0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('shell task will fail if user specify problematic arguments', function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, exitStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskServer.run(createProcessTaskConfig2('shell', 'node', [script2, 'debug-hint:2a', 'a', 'b', 'c"']))];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, getExitStatus(taskInfo, taskWatcher)];
                    case 2:
                        exitStatus = _a.sent();
                        chai_1.expect(exitStatus).not.eq(0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('shell task should be able to run using arguments specifying which quoting method to use', function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, exitStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskServer.run(createProcessTaskConfig2('shell', 'node', [script2, 'debug-hint:2b', 'a', 'b', { value: 'c"', quoting: 'escape' }]))];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, getExitStatus(taskInfo, taskWatcher)];
                    case 2:
                        exitStatus = _a.sent();
                        chai_1.expect(exitStatus).eq(0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('shell task should be able to run using arguments with forbidden characters but no whitespace', function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, exitStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, taskServer.run(createProcessTaskConfig2('shell', 'node', ['-e', 'setTimeout(console.log,1000,1+2)']))];
                    case 1:
                        taskInfo = _a.sent();
                        return [4 /*yield*/, getExitStatus(taskInfo, taskWatcher)];
                    case 2:
                        exitStatus = _a.sent();
                        chai_1.expect(exitStatus).eq(0);
                        return [2 /*return*/];
                }
            });
        });
    });
});
function createTaskConfig(taskType, command, args) {
    var options = {
        label: 'test task',
        type: taskType,
        _source: '/source/folder',
        _scope: '/source/folder',
        command: command,
        args: args,
        options: { cwd: wsRoot }
    };
    return options;
}
function createProcessTaskConfig(processType, command, args, cwd) {
    if (cwd === void 0) { cwd = wsRoot; }
    return {
        label: 'test task',
        type: processType,
        _source: '/source/folder',
        _scope: '/source/folder',
        command: command,
        args: args,
        options: { cwd: cwd },
    };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createProcessTaskConfig2(processType, command, args) {
    return {
        label: 'test task',
        type: processType,
        command: command,
        args: args,
        options: { cwd: wsRoot },
    };
}
function createTaskConfigTaskLongRunning(processType) {
    return {
        label: '[Task] long running test task (~300s)',
        type: processType,
        _source: '/source/folder',
        _scope: '/source/folder',
        options: { cwd: wsRoot },
        command: commandLongRunning,
        windows: {
            command: node_1.FileUri.fsPath(wsRootUri.resolve(commandLongRunningWindows)),
            options: { cwd: wsRoot }
        },
        osx: {
            command: node_1.FileUri.fsPath(wsRootUri.resolve(commandLongRunningOsx))
        }
    };
}
function checkSuccessfulProcessExit(taskInfo, taskWatcher) {
    return new Promise(function (resolve, reject) {
        var toDispose = taskWatcher.onTaskExit(function (event) {
            if (event.taskId === taskInfo.taskId && event.code === 0) {
                toDispose.dispose();
                resolve();
            }
        });
    });
}
function getExitStatus(taskInfo, taskWatcher) {
    return new Promise(function (resolve, reject) {
        taskWatcher.onTaskExit(function (event) {
            if (event.taskId === taskInfo.taskId) {
                if (typeof event.signal === 'string') {
                    resolve(event.signal);
                }
                else if (typeof event.code === 'number') {
                    resolve(event.code);
                }
                else {
                    reject(new Error('no code nor signal'));
                }
            }
        });
    });
}
//# sourceMappingURL=task-server.slow-spec.js.map