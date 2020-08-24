"use strict";
/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
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
exports.ProblemCollector = void 0;
var problem_matcher_protocol_1 = require("../common/problem-matcher-protocol");
var task_line_matchers_1 = require("./task-line-matchers");
var ProblemCollector = /** @class */ (function () {
    function ProblemCollector(problemMatchers) {
        var e_1, _a;
        this.problemMatchers = problemMatchers;
        this.lineMatchers = [];
        try {
            for (var problemMatchers_1 = __values(problemMatchers), problemMatchers_1_1 = problemMatchers_1.next(); !problemMatchers_1_1.done; problemMatchers_1_1 = problemMatchers_1.next()) {
                var matcher = problemMatchers_1_1.value;
                if (problem_matcher_protocol_1.ProblemMatcher.isWatchModeWatcher(matcher)) {
                    this.lineMatchers.push(new task_line_matchers_1.WatchModeLineMatcher(matcher));
                }
                else {
                    this.lineMatchers.push(new task_line_matchers_1.StartStopLineMatcher(matcher));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (problemMatchers_1_1 && !problemMatchers_1_1.done && (_a = problemMatchers_1.return)) _a.call(problemMatchers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    ProblemCollector.prototype.processLine = function (line) {
        var markers = [];
        this.lineMatchers.forEach(function (lineMatcher) {
            var match = lineMatcher.match(line);
            if (match) {
                markers.push(match);
            }
        });
        return markers;
    };
    ProblemCollector.prototype.isTaskActiveOnStart = function () {
        var activeOnStart = this.lineMatchers.some(function (lineMatcher) { return (lineMatcher instanceof task_line_matchers_1.WatchModeLineMatcher) && lineMatcher.activeOnStart; });
        return activeOnStart;
    };
    ProblemCollector.prototype.matchBeginMatcher = function (line) {
        var match = this.lineMatchers.some(function (lineMatcher) { return (lineMatcher instanceof task_line_matchers_1.WatchModeLineMatcher) && lineMatcher.matchBegin(line); });
        return match;
    };
    ProblemCollector.prototype.matchEndMatcher = function (line) {
        var match = this.lineMatchers.some(function (lineMatcher) { return (lineMatcher instanceof task_line_matchers_1.WatchModeLineMatcher) && lineMatcher.matchEnd(line); });
        return match;
    };
    return ProblemCollector;
}());
exports.ProblemCollector = ProblemCollector;
//# sourceMappingURL=task-problem-collector.js.map