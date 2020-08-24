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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskWatcher = void 0;
var inversify_1 = require("inversify");
var event_1 = require("@theia/core/lib/common/event");
var TaskWatcher = /** @class */ (function () {
    function TaskWatcher() {
        this.onTaskCreatedEmitter = new event_1.Emitter();
        this.onTaskExitEmitter = new event_1.Emitter();
        this.onDidStartTaskProcessEmitter = new event_1.Emitter();
        this.onDidEndTaskProcessEmitter = new event_1.Emitter();
        this.onOutputProcessedEmitter = new event_1.Emitter();
        this.onBackgroundTaskEndedEmitter = new event_1.Emitter();
    }
    TaskWatcher.prototype.getTaskClient = function () {
        var newTaskEmitter = this.onTaskCreatedEmitter;
        var exitEmitter = this.onTaskExitEmitter;
        var taskProcessStartedEmitter = this.onDidStartTaskProcessEmitter;
        var taskProcessEndedEmitter = this.onDidEndTaskProcessEmitter;
        var outputProcessedEmitter = this.onOutputProcessedEmitter;
        var backgroundTaskEndedEmitter = this.onBackgroundTaskEndedEmitter;
        return {
            onTaskCreated: function (event) {
                newTaskEmitter.fire(event);
            },
            onTaskExit: function (event) {
                exitEmitter.fire(event);
            },
            onDidStartTaskProcess: function (event) {
                taskProcessStartedEmitter.fire(event);
            },
            onDidEndTaskProcess: function (event) {
                taskProcessEndedEmitter.fire(event);
            },
            onDidProcessTaskOutput: function (event) {
                outputProcessedEmitter.fire(event);
            },
            onBackgroundTaskEnded: function (event) {
                backgroundTaskEndedEmitter.fire(event);
            }
        };
    };
    Object.defineProperty(TaskWatcher.prototype, "onTaskCreated", {
        get: function () {
            return this.onTaskCreatedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskWatcher.prototype, "onTaskExit", {
        get: function () {
            return this.onTaskExitEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskWatcher.prototype, "onDidStartTaskProcess", {
        get: function () {
            return this.onDidStartTaskProcessEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskWatcher.prototype, "onDidEndTaskProcess", {
        get: function () {
            return this.onDidEndTaskProcessEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskWatcher.prototype, "onOutputProcessed", {
        get: function () {
            return this.onOutputProcessedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskWatcher.prototype, "onBackgroundTaskEnded", {
        get: function () {
            return this.onBackgroundTaskEndedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    TaskWatcher = __decorate([
        inversify_1.injectable()
    ], TaskWatcher);
    return TaskWatcher;
}());
exports.TaskWatcher = TaskWatcher;
//# sourceMappingURL=task-watcher.js.map