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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common/");
var task_manager_1 = require("./task-manager");
var Task = /** @class */ (function () {
    function Task(taskManager, logger, options) {
        this.taskManager = taskManager;
        this.logger = logger;
        this.options = options;
        this.toDispose = new common_1.DisposableCollection();
        this.taskId = this.taskManager.register(this, this.options.context);
        this.exitEmitter = new common_1.Emitter();
        this.outputEmitter = new common_1.Emitter();
        this.toDispose.push(this.exitEmitter);
        this.toDispose.push(this.outputEmitter);
    }
    Object.defineProperty(Task.prototype, "onExit", {
        get: function () {
            return this.exitEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "onOutput", {
        get: function () {
            return this.outputEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    /** Has to be called when a task has concluded its execution. */
    Task.prototype.fireTaskExited = function (event) {
        this.exitEmitter.fire(event);
    };
    Task.prototype.fireOutputLine = function (event) {
        this.outputEmitter.fire(event);
    };
    Object.defineProperty(Task.prototype, "id", {
        get: function () {
            return this.taskId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "context", {
        get: function () {
            return this.options.context;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "label", {
        get: function () {
            return this.options.label;
        },
        enumerable: false,
        configurable: true
    });
    Task.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    Task = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [task_manager_1.TaskManager, Object, Object])
    ], Task);
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.js.map