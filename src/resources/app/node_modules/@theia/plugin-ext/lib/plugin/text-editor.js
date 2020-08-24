"use strict";
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
exports.TextEditorEdit = exports.TextEditorOptionsExt = exports.TextEditorExt = void 0;
var types_impl_1 = require("./types-impl");
var errors_1 = require("../common/errors");
var assert_1 = require("../common/assert");
var Converter = require("./type-converters");
var TextEditorExt = /** @class */ (function () {
    function TextEditorExt(proxy, id, document, _selections, options, _visibleRanges, viewColumn) {
        this.proxy = proxy;
        this.id = id;
        this._selections = _selections;
        this._visibleRanges = _visibleRanges;
        this.disposed = false;
        this._options = new TextEditorOptionsExt(proxy, id, options);
        this._viewColumn = viewColumn;
        this._document = document;
    }
    Object.defineProperty(TextEditorExt.prototype, "document", {
        get: function () {
            return this._document.document;
        },
        set: function (doc) {
            throw errors_1.readonly('Document');
        },
        enumerable: false,
        configurable: true
    });
    TextEditorExt.prototype.acceptViewColumn = function (val) {
        this._viewColumn = val;
    };
    TextEditorExt.prototype.dispose = function () {
        this.disposed = true;
    };
    Object.defineProperty(TextEditorExt.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            if (!this.disposed) {
                this._options.assign(val);
            }
        },
        enumerable: false,
        configurable: true
    });
    TextEditorExt.prototype.acceptOptions = function (options) {
        assert_1.ok(!this.disposed);
        this._options.accept(options);
    };
    Object.defineProperty(TextEditorExt.prototype, "selection", {
        get: function () {
            return this._selections && this._selections[0];
        },
        set: function (val) {
            if (!(val instanceof types_impl_1.Selection)) {
                throw errors_1.illegalArgument('selection');
            }
            this._selections = [val];
            this.trySetSelection();
        },
        enumerable: false,
        configurable: true
    });
    TextEditorExt.prototype.trySetSelection = function () {
        var _this = this;
        var selection = this._selections.map(Converter.fromSelection);
        return this.runOnProxy(function () { return _this.proxy.$trySetSelections(_this.id, selection); });
    };
    Object.defineProperty(TextEditorExt.prototype, "selections", {
        get: function () {
            return this._selections;
        },
        set: function (val) {
            if (!Array.isArray(val) || val.some(function (s) { return !(s instanceof types_impl_1.Selection); })) {
                throw errors_1.illegalArgument('selections');
            }
            this._selections = val;
            this.trySetSelection();
        },
        enumerable: false,
        configurable: true
    });
    TextEditorExt.prototype.acceptSelections = function (selections) {
        assert_1.ok(!this.disposed);
        this._selections = selections;
    };
    Object.defineProperty(TextEditorExt.prototype, "visibleRanges", {
        get: function () {
            return this._visibleRanges;
        },
        set: function (val) {
            throw errors_1.readonly('visibleRanges');
        },
        enumerable: false,
        configurable: true
    });
    TextEditorExt.prototype.acceptVisibleRanges = function (range) {
        assert_1.ok(!this.disposed);
        this._visibleRanges = range;
    };
    Object.defineProperty(TextEditorExt.prototype, "viewColumn", {
        get: function () {
            return this._viewColumn;
        },
        set: function (value) {
            throw errors_1.readonly('viewColumn');
        },
        enumerable: false,
        configurable: true
    });
    TextEditorExt.prototype._acceptViewColumn = function (value) {
        assert_1.ok(!this.disposed);
        this._viewColumn = value;
    };
    // eslint-disable-next-line max-len
    TextEditorExt.prototype.edit = function (callback, options) {
        if (options === void 0) { options = { undoStopBefore: true, undoStopAfter: true }; }
        if (this.disposed) {
            return Promise.reject(new Error('TextEditor#edit not possible on closed editor'));
        }
        var edit = new TextEditorEdit(this._document.document, options);
        callback(edit);
        return this.applyEdit(edit);
    };
    // eslint-disable-next-line max-len
    TextEditorExt.prototype.insertSnippet = function (snippet, location, options) {
        var e_1, _a;
        if (options === void 0) { options = { undoStopBefore: true, undoStopAfter: true }; }
        if (this.disposed) {
            return Promise.reject(new Error('TextEditor#insertSnippet not possible on closed editors'));
        }
        var ranges;
        if (!location || (Array.isArray(location) && location.length === 0)) {
            ranges = this._selections.map(function (s) { return Converter.fromRange(s); });
        }
        else if (location instanceof types_impl_1.Position) {
            var _b = Converter.fromPosition(location), lineNumber = _b.lineNumber, column = _b.column;
            ranges = [{ startLineNumber: lineNumber, startColumn: column, endLineNumber: lineNumber, endColumn: column }];
        }
        else if (location instanceof types_impl_1.Range) {
            ranges = [Converter.fromRange(location)];
        }
        else {
            ranges = [];
            try {
                for (var location_1 = __values(location), location_1_1 = location_1.next(); !location_1_1.done; location_1_1 = location_1.next()) {
                    var posOrRange = location_1_1.value;
                    if (posOrRange instanceof types_impl_1.Range) {
                        ranges.push(Converter.fromRange(posOrRange));
                    }
                    else {
                        var _c = Converter.fromPosition(posOrRange), lineNumber = _c.lineNumber, column = _c.column;
                        ranges.push({ startLineNumber: lineNumber, startColumn: column, endLineNumber: lineNumber, endColumn: column });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (location_1_1 && !location_1_1.done && (_a = location_1.return)) _a.call(location_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return this.proxy.$tryInsertSnippet(this.id, snippet.value, ranges, options);
    };
    TextEditorExt.prototype.setDecorations = function (decorationType, rangesOrOptions) {
        var _this = this;
        this.runOnProxy(function () {
            if (Converter.isDecorationOptionsArr(rangesOrOptions)) {
                return _this.proxy.$trySetDecorations(_this.id, decorationType.key, Converter.fromRangeOrRangeWithMessage(rangesOrOptions));
            }
            else {
                var ranges = new Array(4 * rangesOrOptions.length);
                var len = rangesOrOptions.length;
                for (var i = 0; i < len; i++) {
                    var range = rangesOrOptions[i];
                    ranges[4 * i] = range.start.line + 1;
                    ranges[4 * i + 1] = range.start.character + 1;
                    ranges[4 * i + 2] = range.end.line + 1;
                    ranges[4 * i + 3] = range.end.character + 1;
                }
                return _this.proxy.$trySetDecorationsFast(_this.id, decorationType.key, ranges);
            }
        });
    };
    TextEditorExt.prototype.revealRange = function (range, revealType) {
        var _this = this;
        this.runOnProxy(function () { return _this.proxy.$tryRevealRange(_this.id, Converter.fromRange(range), (revealType || types_impl_1.TextEditorRevealType.Default)); });
    };
    TextEditorExt.prototype.applyEdit = function (edit) {
        var editData = edit.finalize();
        var editRanges = editData.edits.map(function (e) { return e.range; });
        editRanges.sort(function (a, b) {
            if (a.end.line === b.end.line) {
                if (a.end.character === b.end.character) {
                    if (a.start.line === b.start.line) {
                        return a.start.character - b.start.character;
                    }
                    return a.start.line - b.start.line;
                }
                return a.end.character - b.end.character;
            }
            return a.end.line - b.end.line;
        });
        var count = editRanges.length - 1;
        for (var i = 0; i < count; i++) {
            var rangeEnd = editRanges[i].end;
            var nextRangeStart = editRanges[i + 1].start;
            if (nextRangeStart.isBefore(rangeEnd)) {
                return Promise.reject(new Error('Overlapping ranges are not allowed!'));
            }
        }
        // prepare data for serialization
        var edits = editData.edits.map(function (e) {
            return ({
                range: Converter.fromRange(e.range),
                text: e.text,
                forceMoveMarkers: e.forceMoveMarkers
            });
        });
        return this.proxy.$tryApplyEdits(this.id, editData.documentVersionId, edits, {
            setEndOfLine: editData.setEndOfLine,
            undoStopBefore: editData.undoStopBefore,
            undoStopAfter: editData.undoStopAfter
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TextEditorExt.prototype.runOnProxy = function (callback) {
        var _this = this;
        if (this.disposed) {
            console.warn('TextEditor is disposed!');
            return Promise.resolve(undefined);
        }
        return callback().then(function () { return _this; }, function (err) {
            if (!(err instanceof Error && err.name === 'DISPOSED')) {
                console.warn(err);
            }
            return undefined;
        });
    };
    return TextEditorExt;
}());
exports.TextEditorExt = TextEditorExt;
var TextEditorOptionsExt = /** @class */ (function () {
    function TextEditorOptionsExt(proxy, id, source) {
        this.proxy = proxy;
        this.id = id;
        this.accept(source);
    }
    TextEditorOptionsExt.prototype.accept = function (source) {
        this._tabSize = source.tabSize;
        this._insertSpace = source.insertSpaces;
        this._cursorStyle = source.cursorStyle;
        this._lineNumbers = source.lineNumbers;
    };
    Object.defineProperty(TextEditorOptionsExt.prototype, "tabSize", {
        get: function () {
            return this._tabSize;
        },
        set: function (val) {
            var tabSize = this.validateTabSize(val);
            if (!tabSize) {
                return; // ignore invalid values
            }
            if (typeof tabSize === 'number') {
                if (this.tabSize === tabSize) {
                    return;
                }
                this.tabSize = tabSize;
            }
            warnOnError(this.proxy.$trySetOptions(this.id, {
                tabSize: tabSize
            }));
        },
        enumerable: false,
        configurable: true
    });
    TextEditorOptionsExt.prototype.validateTabSize = function (val) {
        if (val === 'auto') {
            return 'auto';
        }
        if (typeof val === 'number') {
            var r = Math.floor(val);
            return r > 0 ? r : undefined;
        }
        if (typeof val === 'string') {
            var r = parseInt(val, undefined);
            if (isNaN(r)) {
                return undefined;
            }
            return r > 0 ? r : undefined;
        }
        return undefined;
    };
    Object.defineProperty(TextEditorOptionsExt.prototype, "insertSpaces", {
        get: function () {
            return this._insertSpace;
        },
        set: function (val) {
            var insertSpaces = this.validateInsertSpaces(val);
            if (typeof insertSpaces === 'boolean') {
                if (this._insertSpace === insertSpaces) {
                    return;
                }
                this._insertSpace = insertSpaces;
            }
            warnOnError(this.proxy.$trySetOptions(this.id, { insertSpaces: insertSpaces }));
        },
        enumerable: false,
        configurable: true
    });
    TextEditorOptionsExt.prototype.validateInsertSpaces = function (val) {
        if (val === 'auto') {
            return 'auto';
        }
        return val === 'false' ? false : Boolean(val);
    };
    Object.defineProperty(TextEditorOptionsExt.prototype, "cursorStyle", {
        get: function () {
            return this._cursorStyle;
        },
        set: function (val) {
            if (this._cursorStyle === val) {
                return;
            }
            this._cursorStyle = val;
            warnOnError(this.proxy.$trySetOptions(this.id, { cursorStyle: val }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextEditorOptionsExt.prototype, "lineNumbers", {
        get: function () {
            return this._lineNumbers;
        },
        set: function (val) {
            if (this._lineNumbers === val) {
                return;
            }
            this._lineNumbers = val;
            warnOnError(this.proxy.$trySetOptions(this.id, { lineNumbers: val }));
        },
        enumerable: false,
        configurable: true
    });
    TextEditorOptionsExt.prototype.assign = function (newOptions) {
        var configurationUpdate = {};
        var hasUpdate = false;
        if (typeof newOptions.tabSize !== 'undefined') {
            var tabSize = this.validateTabSize(newOptions.tabSize);
            if (tabSize === 'auto') {
                hasUpdate = true;
                configurationUpdate.tabSize = tabSize;
            }
            else if (typeof tabSize === 'number' && this._tabSize !== tabSize) {
                this._tabSize = tabSize;
                hasUpdate = true;
                configurationUpdate.tabSize = tabSize;
            }
        }
        if (typeof newOptions.insertSpaces !== 'undefined') {
            var insertSpaces = this.validateInsertSpaces(newOptions.insertSpaces);
            if (insertSpaces === 'auto') {
                hasUpdate = true;
                configurationUpdate.insertSpaces = insertSpaces;
            }
            else if (this.insertSpaces !== insertSpaces) {
                this.insertSpaces = insertSpaces;
                hasUpdate = true;
                configurationUpdate.insertSpaces = insertSpaces;
            }
        }
        if (typeof newOptions.cursorStyle !== 'undefined') {
            if (this._cursorStyle !== newOptions.cursorStyle) {
                this._cursorStyle = newOptions.cursorStyle;
                hasUpdate = true;
                configurationUpdate.cursorStyle = newOptions.cursorStyle;
            }
        }
        if (typeof newOptions.lineNumbers !== 'undefined') {
            if (this._lineNumbers !== newOptions.lineNumbers) {
                this._lineNumbers = newOptions.lineNumbers;
                hasUpdate = true;
                configurationUpdate.lineNumbers = newOptions.lineNumbers;
            }
        }
        if (hasUpdate) {
            warnOnError(this.proxy.$trySetOptions(this.id, configurationUpdate));
        }
    };
    return TextEditorOptionsExt;
}());
exports.TextEditorOptionsExt = TextEditorOptionsExt;
var TextEditorEdit = /** @class */ (function () {
    function TextEditorEdit(document, options) {
        this.document = document;
        this.documentVersionId = document.version;
        this.collectedEdits = [];
        this.eol = 0;
        this.undoStopBefore = options.undoStopBefore;
        this.undoStopAfter = options.undoStopAfter;
    }
    TextEditorEdit.prototype.finalize = function () {
        return {
            documentVersionId: this.documentVersionId,
            edits: this.collectedEdits,
            setEndOfLine: this.eol,
            undoStopAfter: this.undoStopAfter,
            undoStopBefore: this.undoStopBefore
        };
    };
    TextEditorEdit.prototype.replace = function (location, val) {
        var range;
        if (location instanceof types_impl_1.Position) {
            range = new types_impl_1.Range(location, location);
        }
        else if (location instanceof types_impl_1.Range) {
            range = location;
        }
        else {
            throw new Error('Unknown location');
        }
        this.addEdit(range, val, false);
    };
    TextEditorEdit.prototype.insert = function (location, val) {
        this.addEdit(new types_impl_1.Range(location, location), val, true);
    };
    TextEditorEdit.prototype.delete = function (location) {
        var range;
        if (location instanceof types_impl_1.Range) {
            range = location;
        }
        else {
            throw new Error('Unknown location');
        }
        this.addEdit(range, undefined, true);
    };
    TextEditorEdit.prototype.setEndOfLine = function (endOfLine) {
        if (endOfLine !== types_impl_1.EndOfLine.CRLF && endOfLine !== types_impl_1.EndOfLine.LF) {
            throw errors_1.illegalArgument('endOfLine');
        }
        this.eol = endOfLine;
    };
    TextEditorEdit.prototype.addEdit = function (range, text, moveMarkers) {
        var validatedRange = this.document.validateRange(range);
        this.collectedEdits.push({
            range: validatedRange,
            forceMoveMarkers: moveMarkers,
            text: text
        });
    };
    return TextEditorEdit;
}());
exports.TextEditorEdit = TextEditorEdit;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function warnOnError(promise) {
    promise.then(undefined, function (err) {
        console.warn(err);
    });
}
//# sourceMappingURL=text-editor.js.map