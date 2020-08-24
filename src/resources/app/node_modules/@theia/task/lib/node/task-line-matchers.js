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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchModeLineMatcher = exports.StartStopLineMatcher = void 0;
var task_abstract_line_matcher_1 = require("./task-abstract-line-matcher");
var StartStopLineMatcher = /** @class */ (function (_super) {
    __extends(StartStopLineMatcher, _super);
    function StartStopLineMatcher(matcher) {
        var _this = _super.call(this, matcher) || this;
        _this.matcher = matcher;
        return _this;
    }
    /**
     * Finds the problem identified by this line matcher.
     *
     * @param line the line of text to find the problem from
     * @return the identified problem. If the problem is not found, `undefined` is returned.
     */
    StartStopLineMatcher.prototype.match = function (line) {
        if (!this.activePattern) {
            this.resetActivePatternIndex();
        }
        if (this.activePattern) {
            var originalProblemData = Object.assign(this.getEmptyProblemData(), this.cachedProblemData);
            var foundMatch = this.doOneLineMatch(line);
            if (foundMatch) {
                if (this.isUsingTheLastPattern()) {
                    var matchResult = this.getMarkerMatch(this.cachedProblemData);
                    if (this.isLastPatternLoop()) {
                        this.cachedProblemData = originalProblemData;
                    }
                    else {
                        this.resetCachedProblemData();
                        this.resetActivePatternIndex();
                    }
                    return matchResult;
                }
                else {
                    this.nextProblemPattern();
                }
            }
            else {
                this.resetCachedProblemData();
                if (this.activePatternIndex !== 0) { // if no match, use the first pattern to parse the same line
                    this.resetActivePatternIndex();
                    return this.match(line);
                }
            }
        }
        return undefined;
    };
    return StartStopLineMatcher;
}(task_abstract_line_matcher_1.AbstractLineMatcher));
exports.StartStopLineMatcher = StartStopLineMatcher;
var WatchModeLineMatcher = /** @class */ (function (_super) {
    __extends(WatchModeLineMatcher, _super);
    function WatchModeLineMatcher(matcher) {
        var _this = _super.call(this, matcher) || this;
        _this.matcher = matcher;
        _this.activeOnStart = false;
        _this.beginsPattern = matcher.watching.beginsPattern;
        _this.endsPattern = matcher.watching.endsPattern;
        _this.activeOnStart = matcher.watching.activeOnStart === true;
        _this.resetActivePatternIndex(_this.activeOnStart ? 0 : -1);
        return _this;
    }
    /**
     * Finds the problem identified by this line matcher.
     *
     * @param line the line of text to find the problem from
     * @return the identified problem. If the problem is not found, `undefined` is returned.
     */
    WatchModeLineMatcher.prototype.match = function (line) {
        if (this.activeOnStart) {
            this.activeOnStart = false;
            this.resetActivePatternIndex(0);
            this.resetCachedProblemData();
            return _super.prototype.match.call(this, line);
        }
        if (this.matchBegin(line)) {
            var beginsPatternMatch = this.getMarkerMatch(this.cachedProblemData);
            this.resetCachedProblemData();
            return beginsPatternMatch;
        }
        if (this.matchEnd(line)) {
            this.resetCachedProblemData();
            return undefined;
        }
        if (this.activePattern) {
            return _super.prototype.match.call(this, line);
        }
        return undefined;
    };
    WatchModeLineMatcher.prototype.matchBegin = function (line) {
        var beginRegexp = new RegExp(this.beginsPattern.regexp);
        var regexMatches = beginRegexp.exec(line);
        if (regexMatches) {
            this.fillProblemData(this.cachedProblemData, this.beginsPattern, regexMatches);
            this.resetActivePatternIndex(0);
            return true;
        }
        return false;
    };
    WatchModeLineMatcher.prototype.matchEnd = function (line) {
        var endRegexp = new RegExp(this.endsPattern.regexp);
        var match = endRegexp.exec(line);
        if (match) {
            this.resetActivePatternIndex(-1);
            return true;
        }
        return false;
    };
    return WatchModeLineMatcher;
}(StartStopLineMatcher));
exports.WatchModeLineMatcher = WatchModeLineMatcher;
//# sourceMappingURL=task-line-matchers.js.map