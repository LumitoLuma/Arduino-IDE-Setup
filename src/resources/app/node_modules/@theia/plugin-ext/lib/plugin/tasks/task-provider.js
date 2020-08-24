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
exports.TaskProviderAdapter = void 0;
var Converter = require("../type-converters");
var TaskProviderAdapter = /** @class */ (function () {
    function TaskProviderAdapter(provider) {
        this.provider = provider;
    }
    TaskProviderAdapter.prototype.provideTasks = function (token) {
        return Promise.resolve(this.provider.provideTasks(token)).then(function (tasks) {
            var e_1, _a;
            if (!Array.isArray(tasks)) {
                return undefined;
            }
            var result = [];
            try {
                for (var tasks_1 = __values(tasks), tasks_1_1 = tasks_1.next(); !tasks_1_1.done; tasks_1_1 = tasks_1.next()) {
                    var task = tasks_1_1.value;
                    var data = Converter.fromTask(task);
                    if (!data) {
                        continue;
                    }
                    result.push(data);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (tasks_1_1 && !tasks_1_1.done && (_a = tasks_1.return)) _a.call(tasks_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        });
    };
    TaskProviderAdapter.prototype.resolveTask = function (task, token) {
        if (typeof this.provider.resolveTask !== 'function') {
            return Promise.resolve(undefined);
        }
        var item = Converter.toTask(task);
        if (!item) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(this.provider.resolveTask(item, token)).then(function (value) {
            if (value) {
                return Converter.fromTask(value);
            }
            return undefined;
        });
    };
    return TaskProviderAdapter;
}());
exports.TaskProviderAdapter = TaskProviderAdapter;
//# sourceMappingURL=task-provider.js.map