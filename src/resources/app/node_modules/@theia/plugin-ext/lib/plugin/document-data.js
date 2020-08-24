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
Object.defineProperty(exports, "__esModule", { value: true });
exports.regExpLeadsToEndlessLoop = exports.DocumentDataExt = exports.getWordDefinitionFor = exports.setWordDefinitionFor = void 0;
var assert_1 = require("../common/assert");
var types_impl_1 = require("./types-impl");
var prefix_sum_computer_1 = require("./prefix-sum-computer");
var word_helper_1 = require("./word-helper");
var _modeId2WordDefinition = new Map();
function setWordDefinitionFor(modeId, wordDefinition) {
    _modeId2WordDefinition.set(modeId, wordDefinition);
}
exports.setWordDefinitionFor = setWordDefinitionFor;
function getWordDefinitionFor(modeId) {
    return _modeId2WordDefinition.get(modeId);
}
exports.getWordDefinitionFor = getWordDefinitionFor;
var DocumentDataExt = /** @class */ (function () {
    function DocumentDataExt(proxy, uri, lines, eol, languageId, versionId, isDirty) {
        this.proxy = proxy;
        this.uri = uri;
        this.lines = lines;
        this.eol = eol;
        this.languageId = languageId;
        this.versionId = versionId;
        this.disposed = false;
        this.textLines = new Array();
        this.dirty = isDirty;
    }
    DocumentDataExt.prototype.dispose = function () {
        assert_1.ok(!this.disposed);
        this.dirty = false;
        this.disposed = true;
    };
    DocumentDataExt.prototype.onEvents = function (e) {
        if (e.eol && e.eol !== this.eol) {
            this.eol = e.eol;
            this.lineStarts = undefined;
        }
        // Update my lines
        var changes = e.changes;
        // tslint:disable-next-line:one-variable-per-declaration
        for (var i = 0, len = changes.length; i < len; i++) {
            var change = changes[i];
            this.acceptDeleteRange(change.range);
            this.acceptInsertText(new types_impl_1.Position(change.range.startLineNumber, change.range.startColumn), change.text);
        }
        this.versionId = e.versionId;
    };
    DocumentDataExt.prototype.acceptIsDirty = function (isDirty) {
        assert_1.ok(!this.disposed);
        this.dirty = isDirty;
    };
    DocumentDataExt.prototype.acceptLanguageId = function (langId) {
        assert_1.ok(!this.disposed);
        this.languageId = langId;
    };
    Object.defineProperty(DocumentDataExt.prototype, "document", {
        get: function () {
            if (!this._document) {
                var that_1 = this;
                this._document = {
                    get uri() { return that_1.uri; },
                    get fileName() { return that_1.uri.fsPath; },
                    get isUntitled() { return that_1.uri.scheme === 'untitled'; },
                    get languageId() { return that_1.languageId; },
                    get version() { return that_1.versionId; },
                    get isClosed() { return that_1.disposed; },
                    get isDirty() { return that_1.dirty; },
                    save: function () { return that_1.save(); },
                    getText: function (range) { return range ? that_1.getTextInRange(range) : that_1.getText(); },
                    get eol() { return that_1.eol === '\n' ? types_impl_1.EndOfLine.LF : types_impl_1.EndOfLine.CRLF; },
                    get lineCount() { return that_1.lines.length; },
                    lineAt: function (lineOrPos) { return that_1.lineAt(lineOrPos); },
                    offsetAt: function (pos) { return that_1.offsetAt(pos); },
                    positionAt: function (offset) { return that_1.positionAt(offset); },
                    validateRange: function (ran) { return that_1.validateRange(ran); },
                    validatePosition: function (pos) { return that_1.validatePosition(pos); },
                    getWordRangeAtPosition: function (pos, regexp) { return that_1.getWordRangeAtPosition(pos, regexp); }
                };
            }
            return Object.freeze(this._document);
        },
        enumerable: false,
        configurable: true
    });
    DocumentDataExt.prototype.acceptInsertText = function (position, insertText) {
        if (insertText.length === 0) {
            // Nothing to insert
            return;
        }
        var insertLines = insertText.split(/\r\n|\r|\n/);
        if (insertLines.length === 1) {
            // Inserting text on one line
            this.setLineText(position.line - 1, this.lines[position.line - 1].substring(0, position.character - 1)
                + insertLines[0]
                + this.lines[position.line - 1].substring(position.character - 1));
            return;
        }
        // Append overflowing text from first line to the end of text to insert
        insertLines[insertLines.length - 1] += this.lines[position.line - 1].substring(position.character - 1);
        // Delete overflowing text from first line and insert text on first line
        this.setLineText(position.line - 1, this.lines[position.line - 1].substring(0, position.character - 1)
            + insertLines[0]);
        // Insert new lines & store lengths
        var newLengths = new Uint32Array(insertLines.length - 1);
        for (var i = 1; i < insertLines.length; i++) {
            this.lines.splice(position.line + i - 1, 0, insertLines[i]);
            newLengths[i - 1] = insertLines[i].length + this.eol.length;
        }
        if (this.lineStarts) {
            // update prefix sum
            this.lineStarts.insertValues(position.line, newLengths);
        }
    };
    DocumentDataExt.prototype.acceptDeleteRange = function (range) {
        if (range.startLineNumber === range.endLineNumber) {
            if (range.startColumn === range.endColumn) {
                // Nothing to delete
                return;
            }
            // Delete text on the affected line
            this.setLineText(range.startLineNumber - 1, this.lines[range.startLineNumber - 1].substring(0, range.startColumn - 1)
                + this.lines[range.startLineNumber - 1].substring(range.endColumn - 1));
            return;
        }
        // Take remaining text on last line and append it to remaining text on first line
        this.setLineText(range.startLineNumber - 1, this.lines[range.startLineNumber - 1].substring(0, range.startColumn - 1)
            + this.lines[range.endLineNumber - 1].substring(range.endColumn - 1));
        // Delete middle lines
        this.lines.splice(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        if (this.lineStarts) {
            this.lineStarts.removeValues(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        }
    };
    DocumentDataExt.prototype.setLineText = function (lineIndex, newValue) {
        this.lines[lineIndex] = newValue;
        if (this.lineStarts) {
            this.lineStarts.changeValue(lineIndex, this.lines[lineIndex].length + this.eol.length);
        }
    };
    DocumentDataExt.prototype.save = function () {
        if (this.disposed) {
            return Promise.reject(new Error('Document is closed'));
        }
        return this.proxy.$trySaveDocument(this.uri);
    };
    DocumentDataExt.prototype.getTextInRange = function (_range) {
        var range = this.validateRange(_range);
        if (range.isEmpty) {
            return '';
        }
        if (range.isSingleLine) {
            return this.lines[range.start.line].substring(range.start.character, range.end.character);
        }
        var lineEnding = this.eol;
        var startLineIndex = range.start.line;
        var endLineIndex = range.end.line;
        var resultLines = [];
        resultLines.push(this.lines[startLineIndex].substring(range.start.character));
        for (var i = startLineIndex + 1; i < endLineIndex; i++) {
            resultLines.push(this.lines[i]);
        }
        resultLines.push(this.lines[endLineIndex].substring(0, range.end.character));
        return resultLines.join(lineEnding);
    };
    DocumentDataExt.prototype.validateRange = function (range) {
        if (!(range instanceof types_impl_1.Range)) {
            throw new Error('Invalid argument');
        }
        var start = this.validatePosition(range.start);
        var end = this.validatePosition(range.end);
        if (start === range.start && end === range.end) {
            return range;
        }
        return new types_impl_1.Range(start.line, start.character, end.line, end.character);
    };
    DocumentDataExt.prototype.getText = function () {
        return this.lines.join(this.eol);
    };
    DocumentDataExt.prototype.validatePosition = function (position) {
        if (!(position instanceof types_impl_1.Position)) {
            throw new Error('Invalid argument');
        }
        var line = position.line, character = position.character;
        var hasChanged = false;
        if (line < 0) {
            line = 0;
            character = 0;
            hasChanged = true;
        }
        else if (line >= this.lines.length) {
            line = this.lines.length - 1;
            character = this.lines[line].length;
            hasChanged = true;
        }
        else {
            var maxCharacter = this.lines[line].length;
            if (character < 0) {
                character = 0;
                hasChanged = true;
            }
            else if (character > maxCharacter) {
                character = maxCharacter;
                hasChanged = true;
            }
        }
        if (!hasChanged) {
            return position;
        }
        return new types_impl_1.Position(line, character);
    };
    DocumentDataExt.prototype.lineAt = function (lineOrPosition) {
        var line = -1;
        if (lineOrPosition instanceof types_impl_1.Position) {
            line = lineOrPosition.line;
        }
        else if (typeof lineOrPosition === 'number') {
            line = lineOrPosition;
        }
        if (line < 0 || line >= this.lines.length) {
            throw new Error('Illegal value for `line`');
        }
        var result = this.textLines[line];
        if (!result || result.lineNumber !== line || result.text !== this.lines[line]) {
            var text = this.lines[line];
            var firstNonWhitespaceCharacterIndex = /^(\s*)/.exec(text)[1].length;
            var range = new types_impl_1.Range(line, 0, line, text.length);
            var rangeIncludingLineBreak = line < this.lines.length - 1
                ? new types_impl_1.Range(line, 0, line + 1, 0)
                : range;
            result = Object.freeze({
                lineNumber: line,
                range: range,
                rangeIncludingLineBreak: rangeIncludingLineBreak,
                text: text,
                firstNonWhitespaceCharacterIndex: firstNonWhitespaceCharacterIndex,
                isEmptyOrWhitespace: firstNonWhitespaceCharacterIndex === text.length
            });
            this.textLines[line] = result;
        }
        return result;
    };
    DocumentDataExt.prototype.offsetAt = function (position) {
        position = this.validatePosition(position);
        this.ensureLineStarts();
        return this.lineStarts.getAccumulatedValue(position.line - 1) + position.character;
    };
    DocumentDataExt.prototype.ensureLineStarts = function () {
        if (!this.lineStarts) {
            var eolLength = this.eol.length;
            var linesLength = this.lines.length;
            var lineStartValues = new Uint32Array(linesLength);
            for (var i = 0; i < linesLength; i++) {
                lineStartValues[i] = this.lines[i].length + eolLength;
            }
            this.lineStarts = new prefix_sum_computer_1.PrefixSumComputer(lineStartValues);
        }
    };
    DocumentDataExt.prototype.positionAt = function (offset) {
        offset = Math.floor(offset);
        offset = Math.max(0, offset);
        this.ensureLineStarts();
        var out = this.lineStarts.getIndexOf(offset);
        var lineLength = this.lines[out.index].length;
        return new types_impl_1.Position(out.index, Math.min(out.remainder, lineLength));
    };
    DocumentDataExt.prototype.getWordRangeAtPosition = function (_position, regexp) {
        var position = this.validatePosition(_position);
        if (!regexp) {
            // use default when custom-regexp isn't provided
            regexp = getWordDefinitionFor(this.languageId);
        }
        else if (regExpLeadsToEndlessLoop(regexp)) {
            // use default when custom-regexp is bad
            console.warn("[getWordRangeAtPosition]: ignoring custom regexp '" + regexp.source + "' because it matches the empty string.");
            regexp = getWordDefinitionFor(this.languageId);
        }
        var wordAtText = word_helper_1.getWordAtText(position.character + 1, word_helper_1.ensureValidWordDefinition(regexp), this.lines[position.line], 0);
        if (wordAtText) {
            return new types_impl_1.Range(position.line, wordAtText.startColumn - 1, position.line, wordAtText.endColumn - 1);
        }
        return undefined;
    };
    return DocumentDataExt;
}());
exports.DocumentDataExt = DocumentDataExt;
function regExpLeadsToEndlessLoop(regexp) {
    // Exit early if it's one of these special cases which are meant to match
    // against an empty string
    if (regexp.source === '^' || regexp.source === '^$' || regexp.source === '$' || regexp.source === '^\\s*$') {
        return false;
    }
    // We check against an empty string. If the regular expression doesn't advance
    // (e.g. ends in an endless loop) it will match an empty string.
    var match = regexp.exec('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (match && regexp.lastIndex === 0);
}
exports.regExpLeadsToEndlessLoop = regExpLeadsToEndlessLoop;
//# sourceMappingURL=document-data.js.map