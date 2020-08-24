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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLineMatcher = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var os_1 = require("@theia/core/lib/common/os");
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var problem_matcher_protocol_1 = require("../common/problem-matcher-protocol");
var uri_1 = require("@theia/core/lib/common/uri");
// TODO use only URI from '@theia/core'
var vscode_uri_1 = require("vscode-uri");
var severity_1 = require("@theia/core/lib/common/severity");
var endOfLine = os_1.isWindows ? '\r\n' : '\n';
var AbstractLineMatcher = /** @class */ (function () {
    function AbstractLineMatcher(matcher) {
        this.matcher = matcher;
        this.patterns = [];
        this.activePatternIndex = 0;
        if (Array.isArray(matcher.pattern)) {
            this.patterns = matcher.pattern;
        }
        else {
            this.patterns = [matcher.pattern];
        }
        this.cachedProblemData = this.getEmptyProblemData();
        if (this.patterns.slice(0, this.patternCount - 1).some(function (p) { return !!p.loop; })) {
            console.error('Problem Matcher: Only the last pattern can loop');
        }
    }
    Object.defineProperty(AbstractLineMatcher.prototype, "patternCount", {
        /**
         * Number of problem patterns that the line matcher uses.
         */
        get: function () {
            return this.patterns.length;
        },
        enumerable: false,
        configurable: true
    });
    AbstractLineMatcher.prototype.getEmptyProblemData = function () {
        // eslint-disable-next-line no-null/no-null
        return Object.create(null);
    };
    AbstractLineMatcher.prototype.fillProblemData = function (data, pattern, matches) {
        if (data) {
            this.fillProperty(data, 'file', pattern, matches, true);
            this.appendProperty(data, 'message', pattern, matches, true);
            this.fillProperty(data, 'code', pattern, matches, true);
            this.fillProperty(data, 'severity', pattern, matches, true);
            this.fillProperty(data, 'location', pattern, matches, true);
            this.fillProperty(data, 'line', pattern, matches);
            this.fillProperty(data, 'character', pattern, matches);
            this.fillProperty(data, 'endLine', pattern, matches);
            this.fillProperty(data, 'endCharacter', pattern, matches);
            return true;
        }
        return false;
    };
    AbstractLineMatcher.prototype.appendProperty = function (data, property, pattern, matches, trim) {
        if (trim === void 0) { trim = false; }
        var patternProperty = pattern[property];
        if (data[property] === undefined) {
            this.fillProperty(data, property, pattern, matches, trim);
        }
        else if (patternProperty !== undefined && patternProperty < matches.length) {
            var value = matches[patternProperty];
            if (trim) {
                value = value.trim();
            }
            data[property] += endOfLine + value;
        }
    };
    AbstractLineMatcher.prototype.fillProperty = function (data, property, pattern, matches, trim) {
        if (trim === void 0) { trim = false; }
        var patternAtProperty = pattern[property];
        if (data[property] === undefined && patternAtProperty !== undefined && patternAtProperty < matches.length) {
            var value = matches[patternAtProperty];
            if (value !== undefined) {
                if (trim) {
                    value = value.trim();
                }
                data[property] = value;
            }
        }
    };
    AbstractLineMatcher.prototype.getMarkerMatch = function (data) {
        try {
            var location_1 = this.getLocation(data);
            if (data.file && location_1 && data.message) {
                var marker = {
                    severity: this.getSeverity(data),
                    range: location_1,
                    message: data.message
                };
                if (data.code !== undefined) {
                    marker.code = data.code;
                }
                if (this.matcher.source !== undefined) {
                    marker.source = this.matcher.source;
                }
                return {
                    description: this.matcher,
                    resource: this.getResource(data.file, this.matcher),
                    marker: marker
                };
            }
            return {
                description: this.matcher
            };
        }
        catch (err) {
            console.error("Failed to convert problem data into match: " + JSON.stringify(data));
        }
        return undefined;
    };
    AbstractLineMatcher.prototype.getLocation = function (data) {
        if (data.kind === problem_matcher_protocol_1.ProblemLocationKind.File) {
            return this.createRange(0, 0, 0, 0);
        }
        if (data.location) {
            return this.parseLocationInfo(data.location);
        }
        if (!data.line) {
            // eslint-disable-next-line no-null/no-null
            return null;
        }
        var startLine = parseInt(data.line);
        var startColumn = data.character ? parseInt(data.character) : undefined;
        var endLine = data.endLine ? parseInt(data.endLine) : undefined;
        var endColumn = data.endCharacter ? parseInt(data.endCharacter) : undefined;
        return this.createRange(startLine, startColumn, endLine, endColumn);
    };
    AbstractLineMatcher.prototype.parseLocationInfo = function (value) {
        if (!value || !value.match(/(\d+|\d+,\d+|\d+,\d+,\d+,\d+)/)) {
            // eslint-disable-next-line no-null/no-null
            return null;
        }
        var parts = value.split(',');
        var startLine = parseInt(parts[0]);
        var startColumn = parts.length > 1 ? parseInt(parts[1]) : undefined;
        if (parts.length > 3) {
            return this.createRange(startLine, startColumn, parseInt(parts[2]), parseInt(parts[3]));
        }
        else {
            return this.createRange(startLine, startColumn, undefined, undefined);
        }
    };
    AbstractLineMatcher.prototype.createRange = function (startLine, startColumn, endLine, endColumn) {
        var range;
        if (startColumn !== undefined) {
            if (endColumn !== undefined) {
                range = vscode_languageserver_types_1.Range.create(startLine, startColumn, endLine || startLine, endColumn);
            }
            else {
                range = vscode_languageserver_types_1.Range.create(startLine, startColumn, startLine, startColumn);
            }
        }
        else {
            range = vscode_languageserver_types_1.Range.create(startLine, 1, startLine, Number.MAX_VALUE);
        }
        // range indexes should be zero-based
        return vscode_languageserver_types_1.Range.create(this.getZeroBasedRangeIndex(range.start.line), this.getZeroBasedRangeIndex(range.start.character), this.getZeroBasedRangeIndex(range.end.line), this.getZeroBasedRangeIndex(range.end.character));
    };
    AbstractLineMatcher.prototype.getZeroBasedRangeIndex = function (ind) {
        return ind === 0 ? ind : ind - 1;
    };
    AbstractLineMatcher.prototype.getSeverity = function (data) {
        // eslint-disable-next-line no-null/no-null
        var result = null;
        if (data.severity) {
            var value = data.severity;
            if (value) {
                result = severity_1.Severity.fromValue(value);
                if (result === severity_1.Severity.Ignore) {
                    if (value === 'E') {
                        result = severity_1.Severity.Error;
                    }
                    else if (value === 'W') {
                        result = severity_1.Severity.Warning;
                    }
                    else if (value === 'I') {
                        result = severity_1.Severity.Info;
                    }
                    else if (value.toLowerCase() === 'hint') {
                        result = severity_1.Severity.Info;
                    }
                    else if (value.toLowerCase() === 'note') {
                        result = severity_1.Severity.Info;
                    }
                }
            }
        }
        // eslint-disable-next-line no-null/no-null
        if (result === null || result === severity_1.Severity.Ignore) {
            result = this.matcher.severity || severity_1.Severity.Error;
        }
        return severity_1.Severity.toDiagnosticSeverity(result);
    };
    AbstractLineMatcher.prototype.getResource = function (filename, matcher) {
        var kind = matcher.fileLocation;
        var fullPath;
        if (kind === problem_matcher_protocol_1.FileLocationKind.Absolute) {
            fullPath = filename;
        }
        else if ((kind === problem_matcher_protocol_1.FileLocationKind.Relative) && matcher.filePrefix) {
            var relativeFileName = filename.replace(/\\/g, '/');
            if (relativeFileName.startsWith('./')) {
                relativeFileName = relativeFileName.slice(2);
            }
            fullPath = new uri_1.default(matcher.filePrefix).resolve(relativeFileName).path.toString();
        }
        if (fullPath === undefined) {
            throw new Error('FileLocationKind is not actionable. Does the matcher have a filePrefix? This should never happen.');
        }
        fullPath = fullPath.replace(/\\/g, '/');
        if (fullPath[0] !== '/') {
            fullPath = '/' + fullPath;
        }
        if (matcher.uriProvider !== undefined) {
            return matcher.uriProvider(fullPath);
        }
        else {
            return vscode_uri_1.URI.file(fullPath);
        }
    };
    AbstractLineMatcher.prototype.resetActivePatternIndex = function (defaultIndex) {
        if (defaultIndex === undefined) {
            defaultIndex = 0;
        }
        this.activePatternIndex = defaultIndex;
        this.activePattern = this.patterns[defaultIndex];
    };
    AbstractLineMatcher.prototype.nextProblemPattern = function () {
        this.activePatternIndex++;
        if (this.activePatternIndex > this.patternCount - 1) {
            this.resetActivePatternIndex();
        }
        else {
            this.activePattern = this.patterns[this.activePatternIndex];
        }
    };
    AbstractLineMatcher.prototype.doOneLineMatch = function (line) {
        if (this.activePattern) {
            var regexp = new RegExp(this.activePattern.regexp);
            var regexMatches = regexp.exec(line);
            if (regexMatches) {
                if (this.activePattern.kind !== undefined && this.cachedProblemData.kind !== undefined) {
                    this.cachedProblemData.kind = this.activePattern.kind;
                }
                return this.fillProblemData(this.cachedProblemData, this.activePattern, regexMatches);
            }
        }
        return false;
    };
    // check if active pattern is the last pattern
    AbstractLineMatcher.prototype.isUsingTheLastPattern = function () {
        return this.patternCount > 0 && this.activePatternIndex === this.patternCount - 1;
    };
    AbstractLineMatcher.prototype.isLastPatternLoop = function () {
        return this.patternCount > 0 && !!this.patterns[this.patternCount - 1].loop;
    };
    AbstractLineMatcher.prototype.resetCachedProblemData = function () {
        this.cachedProblemData = this.getEmptyProblemData();
    };
    return AbstractLineMatcher;
}());
exports.AbstractLineMatcher = AbstractLineMatcher;
//# sourceMappingURL=task-abstract-line-matcher.js.map