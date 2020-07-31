"use strict";
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
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
// inspired by process-manager.ts
var TaskManager = /** @class */ (function () {
    function TaskManager(logger) {
        this.logger = logger;
        /** contains all running tasks */
        this.tasks = new Map();
        /** contains running tasks per context */
        this.tasksPerCtx = new Map();
        /** each task has this unique task id, for this back-end */
        this.id = -1;
        this.deleteEmitter = new common_1.Emitter();
    }
    TaskManager.prototype.register = function (task, ctx) {
        var id = ++this.id;
        this.tasks.set(id, task);
        if (ctx) {
            var tks = this.tasksPerCtx.get(ctx);
            if (tks === undefined) {
                tks = [];
            }
            tks.push(task);
            this.tasksPerCtx.set(ctx, tks);
        }
        return id;
    };
    TaskManager.prototype.get = function (id) {
        return this.tasks.get(id);
    };
    /**
     * Returns all running tasks. If a context is provided, filter-down to
     * only tasks started from that context
     */
    TaskManager.prototype.getTasks = function (ctx) {
        if (!ctx) {
            return __spread(this.tasks.values());
        }
        else {
            if (this.tasksPerCtx.has(ctx)) {
                return this.tasksPerCtx.get(ctx);
            }
        }
    };
    /** Deletes a task from the task manager */
    TaskManager.prototype.delete = function (task) {
        this.tasks.delete(task.id);
        var ctx = task.context;
        if (ctx && this.tasksPerCtx.has(ctx)) {
            var tasksForWS = this.tasksPerCtx.get(ctx);
            if (tasksForWS !== undefined) {
                var idx = tasksForWS.indexOf(task);
                tasksForWS.splice(idx, 1);
            }
        }
        this.deleteEmitter.fire(task.id);
    };
    Object.defineProperty(TaskManager.prototype, "onDelete", {
        get: function () {
            return this.deleteEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    /** When the application stops, clean-up all ongoing tasks */
    TaskManager.prototype.onStop = function () {
        var _this = this;
        this.tasks.forEach(function (task, id) {
            _this.logger.debug("Task Backend application: onStop(): cleaning task id: " + id);
            _this.delete(task);
        });
    };
    TaskManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.ILogger)), __param(0, inversify_1.named('task')),
        __metadata("design:paramtypes", [Object])
    ], TaskManager);
    return TaskManager;
}());
exports.TaskManager = TaskManager;
//# sourceMappingURL=task-manager.js.map