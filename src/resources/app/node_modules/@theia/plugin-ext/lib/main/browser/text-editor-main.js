"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
exports.TextEditorPropertiesMain = exports.TextEditorMain = void 0;
var disposable_1 = require("@theia/core/lib/common/disposable");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var core_1 = require("@theia/core");
var editor_options_1 = require("../../common/editor-options");
var types_impl_1 = require("../../plugin/types-impl");
var TextEditorMain = /** @class */ (function () {
    function TextEditorMain(id, model, editor) {
        var _this = this;
        this.id = id;
        this.model = model;
        this.onPropertiesChangedEmitter = new core_1.Emitter();
        this.toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { return _this.properties = undefined; }), this.onPropertiesChangedEmitter);
        this.toDisposeOnEditor = new disposable_1.DisposableCollection();
        this.toDispose.push(this.model.onDidChangeOptions(function () {
            return _this.updateProperties(undefined);
        }));
        this.setEditor(editor);
        this.updateProperties(undefined);
    }
    TextEditorMain.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    TextEditorMain.prototype.updateProperties = function (source) {
        this.setProperties(TextEditorPropertiesMain.readFromEditor(this.properties, this.model, this.editor), source);
    };
    TextEditorMain.prototype.setProperties = function (newProperties, source) {
        var result = newProperties.generateDelta(this.properties, source);
        this.properties = newProperties;
        if (result) {
            this.onPropertiesChangedEmitter.fire(result);
        }
    };
    TextEditorMain.prototype.setEditor = function (editor) {
        var _this = this;
        if (this.editor === editor) {
            return;
        }
        this.toDisposeOnEditor.dispose();
        this.toDispose.push(this.toDisposeOnEditor);
        this.editor = editor;
        this.toDisposeOnEditor.push(disposable_1.Disposable.create(function () { return _this.editor = undefined; }));
        if (this.editor) {
            var monaco_1 = this.editor.getControl();
            this.toDisposeOnEditor.push(this.editor.onSelectionChanged(function (_) {
                _this.updateProperties();
            }));
            this.toDisposeOnEditor.push(monaco_1.onDidChangeModel(function () {
                _this.setEditor(undefined);
            }));
            this.toDisposeOnEditor.push(monaco_1.onDidChangeCursorSelection(function (e) {
                _this.updateProperties(e.source);
            }));
            this.toDisposeOnEditor.push(monaco_1.onDidChangeConfiguration(function () {
                _this.updateProperties();
            }));
            this.toDisposeOnEditor.push(monaco_1.onDidLayoutChange(function () {
                _this.updateProperties();
            }));
            this.toDisposeOnEditor.push(monaco_1.onDidScrollChange(function () {
                _this.updateProperties();
            }));
            this.updateProperties();
        }
    };
    TextEditorMain.prototype.getId = function () {
        return this.id;
    };
    TextEditorMain.prototype.getModel = function () {
        return this.model;
    };
    TextEditorMain.prototype.getProperties = function () {
        return this.properties;
    };
    Object.defineProperty(TextEditorMain.prototype, "onPropertiesChangedEvent", {
        get: function () {
            return this.onPropertiesChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    TextEditorMain.prototype.setSelections = function (selections) {
        if (this.editor) {
            this.editor.getControl().setSelections(selections);
            return;
        }
        var monacoSelections = selections.map(TextEditorMain.toMonacoSelections);
        this.setProperties(new TextEditorPropertiesMain(monacoSelections, this.properties.options, this.properties.visibleRanges), undefined);
    };
    TextEditorMain.prototype.setConfiguration = function (newConfiguration) {
        this.setIndentConfiguration(newConfiguration);
        if (!this.editor) {
            return;
        }
        if (newConfiguration.cursorStyle) {
            var newCursorStyle = editor_options_1.cursorStyleToString(newConfiguration.cursorStyle);
            this.editor.getControl().updateOptions({
                cursorStyle: newCursorStyle
            });
        }
        if (typeof newConfiguration.lineNumbers !== 'undefined') {
            var lineNumbers = void 0;
            switch (newConfiguration.lineNumbers) {
                case types_impl_1.TextEditorLineNumbersStyle.On:
                    lineNumbers = 'on';
                    break;
                case types_impl_1.TextEditorLineNumbersStyle.Relative:
                    lineNumbers = 'relative';
                    break;
                default:
                    lineNumbers = 'off';
            }
            this.editor.getControl().updateOptions({
                lineNumbers: lineNumbers
            });
        }
    };
    TextEditorMain.prototype.setIndentConfiguration = function (newConfiguration) {
        if (newConfiguration.tabSize === 'auto' || newConfiguration.insertSpaces === 'auto') {
            var creationOpts = this.model.getOptions();
            var insertSpaces = creationOpts.insertSpaces;
            var tabSize = creationOpts.tabSize;
            if (newConfiguration.insertSpaces !== 'auto' && typeof newConfiguration.insertSpaces !== 'undefined') {
                insertSpaces = newConfiguration.insertSpaces;
            }
            if (newConfiguration.tabSize !== 'auto' && typeof newConfiguration.tabSize !== 'undefined') {
                tabSize = newConfiguration.tabSize;
            }
            this.model.detectIndentation(insertSpaces, tabSize);
            return;
        }
        var newOpts = {};
        if (typeof newConfiguration.insertSpaces !== 'undefined') {
            newOpts.insertSpaces = newConfiguration.insertSpaces;
        }
        if (typeof newConfiguration.tabSize !== 'undefined') {
            newOpts.tabSize = newConfiguration.tabSize;
        }
        this.model.updateOptions(newOpts);
    };
    TextEditorMain.prototype.revealRange = function (range, revealType) {
        if (!this.editor) {
            return;
        }
        switch (revealType) {
            case plugin_api_rpc_1.TextEditorRevealType.Default:
                this.editor.getControl().revealRange(range, monaco.editor.ScrollType.Smooth);
                break;
            case plugin_api_rpc_1.TextEditorRevealType.InCenter:
                this.editor.getControl().revealRangeInCenter(range, monaco.editor.ScrollType.Smooth);
                break;
            case plugin_api_rpc_1.TextEditorRevealType.InCenterIfOutsideViewport:
                this.editor.getControl().revealRangeInCenterIfOutsideViewport(range, monaco.editor.ScrollType.Smooth);
                break;
            case plugin_api_rpc_1.TextEditorRevealType.AtTop:
                this.editor.getControl().revealRangeAtTop(range, monaco.editor.ScrollType.Smooth);
                break;
            default:
                console.warn("Unknown revealType: " + revealType);
                break;
        }
    };
    TextEditorMain.prototype.applyEdits = function (versionId, edits, opts) {
        var e_1, _a;
        if (this.model.getVersionId() !== versionId) {
            // model changed in the meantime
            return false;
        }
        if (!this.editor) {
            return false;
        }
        if (opts.setEndOfLine === types_impl_1.EndOfLine.CRLF) {
            this.model.setEOL(monaco.editor.EndOfLineSequence.CRLF);
        }
        else if (opts.setEndOfLine === types_impl_1.EndOfLine.LF) {
            this.model.setEOL(monaco.editor.EndOfLineSequence.LF);
        }
        var editOperations = [];
        try {
            for (var edits_1 = __values(edits), edits_1_1 = edits_1.next(); !edits_1_1.done; edits_1_1 = edits_1.next()) {
                var edit = edits_1_1.value;
                var range = edit.range, text = edit.text;
                if (!range && !text) {
                    continue;
                }
                if (range && range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn && !edit.text) {
                    continue;
                }
                editOperations.push({
                    range: range ? monaco.Range.lift(range) : this.editor.getControl().getModel().getFullModelRange(),
                    /* eslint-disable-next-line no-null/no-null */
                    text: text || null,
                    forceMoveMarkers: edit.forceMoveMarkers
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (edits_1_1 && !edits_1_1.done && (_a = edits_1.return)) _a.call(edits_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (opts.undoStopBefore) {
            this.editor.getControl().pushUndoStop();
        }
        this.editor.getControl().executeEdits('MainThreadTextEditor', editOperations);
        if (opts.undoStopAfter) {
            this.editor.getControl().pushUndoStop();
        }
        return true;
    };
    TextEditorMain.prototype.insertSnippet = function (template, ranges, opts) {
        if (!this.editor) {
            return false;
        }
        var snippetController = this.editor.getControl().getContribution('snippetController2');
        var selections = ranges.map(function (r) { return new monaco.Selection(r.startLineNumber, r.startColumn, r.endLineNumber, r.endColumn); });
        this.editor.getControl().setSelections(selections);
        this.editor.focus();
        snippetController.insert(template, 0, 0, opts.undoStopBefore, opts.undoStopAfter);
        return true;
    };
    TextEditorMain.prototype.setDecorations = function (key, ranges) {
        if (!this.editor) {
            return;
        }
        this.editor.getControl().setDecorations(key, ranges.map(function (option) { return Object.assign(option, { color: undefined }); }));
    };
    TextEditorMain.prototype.setDecorationsFast = function (key, _ranges) {
        if (!this.editor) {
            return;
        }
        var ranges = [];
        var len = Math.floor(_ranges.length / 4);
        for (var i = 0; i < len; i++) {
            ranges[i] = new monaco.Range(_ranges[4 * i], _ranges[4 * i + 1], _ranges[4 * i + 2], _ranges[4 * i + 3]);
        }
        this.editor.getControl().setDecorationsFast(key, ranges);
    };
    TextEditorMain.toMonacoSelections = function (selection) {
        return new monaco.Selection(selection.selectionStartLineNumber, selection.selectionStartColumn, selection.positionLineNumber, selection.positionColumn);
    };
    return TextEditorMain;
}());
exports.TextEditorMain = TextEditorMain;
var TextEditorPropertiesMain = /** @class */ (function () {
    function TextEditorPropertiesMain(selections, options, visibleRanges) {
        this.selections = selections;
        this.options = options;
        this.visibleRanges = visibleRanges;
    }
    TextEditorPropertiesMain.prototype.generateDelta = function (old, source) {
        var result = {
            options: undefined,
            selections: undefined,
            visibleRanges: undefined
        };
        if (!old || !TextEditorPropertiesMain.selectionsEqual(old.selections, this.selections)) {
            result.selections = {
                selections: this.selections,
                source: source
            };
        }
        if (!old || !TextEditorPropertiesMain.optionsEqual(old.options, this.options)) {
            result.options = this.options;
        }
        if (!old || !TextEditorPropertiesMain.rangesEqual(old.visibleRanges, this.visibleRanges)) {
            result.visibleRanges = this.visibleRanges;
        }
        if (result.selections || result.visibleRanges || result.options) {
            return result;
        }
        return undefined;
    };
    TextEditorPropertiesMain.readFromEditor = function (prevProperties, model, editor) {
        var selections = TextEditorPropertiesMain.getSelectionsFromEditor(prevProperties, editor);
        var options = TextEditorPropertiesMain.getOptionsFromEditor(prevProperties, model, editor);
        var visibleRanges = TextEditorPropertiesMain.getVisibleRangesFromEditor(prevProperties, editor);
        return new TextEditorPropertiesMain(selections, options, visibleRanges);
    };
    TextEditorPropertiesMain.getSelectionsFromEditor = function (prevProperties, editor) {
        var result = undefined;
        if (editor) {
            result = editor.getControl().getSelections() || undefined;
        }
        if (!result && prevProperties) {
            result = prevProperties.selections;
        }
        if (!result) {
            result = [new monaco.Selection(1, 1, 1, 1)];
        }
        return result;
    };
    TextEditorPropertiesMain.getOptionsFromEditor = function (prevProperties, model, editor) {
        if (model.isDisposed()) {
            return prevProperties.options;
        }
        var cursorStyle;
        var lineNumbers;
        if (editor) {
            var editorOptions = editor.getControl().getOptions();
            var lineNumbersOpts = editorOptions.get(monaco.editor.EditorOption.lineNumbers);
            cursorStyle = editorOptions.get(monaco.editor.EditorOption.cursorStyle);
            switch (lineNumbersOpts.renderType) {
                case monaco.editor.RenderLineNumbersType.Off:
                    lineNumbers = types_impl_1.TextEditorLineNumbersStyle.Off;
                    break;
                case monaco.editor.RenderLineNumbersType.Relative:
                    lineNumbers = types_impl_1.TextEditorLineNumbersStyle.Relative;
                    break;
                default:
                    lineNumbers = types_impl_1.TextEditorLineNumbersStyle.On;
                    break;
            }
        }
        else if (prevProperties) {
            cursorStyle = prevProperties.options.cursorStyle;
            lineNumbers = prevProperties.options.lineNumbers;
        }
        else {
            cursorStyle = editor_options_1.TextEditorCursorStyle.Line;
            lineNumbers = types_impl_1.TextEditorLineNumbersStyle.On;
        }
        var modelOptions = model.getOptions();
        return {
            insertSpaces: modelOptions.insertSpaces,
            tabSize: modelOptions.tabSize,
            cursorStyle: cursorStyle,
            lineNumbers: lineNumbers,
        };
    };
    TextEditorPropertiesMain.getVisibleRangesFromEditor = function (prevProperties, editor) {
        if (editor) {
            return editor.getControl().getVisibleRanges();
        }
        return [];
    };
    TextEditorPropertiesMain.selectionsEqual = function (a, b) {
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length; i++) {
            if (!a[i].equalsSelection(b[i])) {
                return false;
            }
        }
        return true;
    };
    TextEditorPropertiesMain.optionsEqual = function (a, b) {
        if (a && !b || !a && b) {
            return false;
        }
        if (!a && !b) {
            return true;
        }
        return (a.tabSize === b.tabSize
            && a.insertSpaces === b.insertSpaces
            && a.cursorStyle === b.cursorStyle
            && a.lineNumbers === b.lineNumbers);
    };
    TextEditorPropertiesMain.rangesEqual = function (a, b) {
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length; i++) {
            if (!a[i].equalsRange(b[i])) {
                return false;
            }
        }
        return true;
    };
    return TextEditorPropertiesMain;
}());
exports.TextEditorPropertiesMain = TextEditorPropertiesMain;
//# sourceMappingURL=text-editor-main.js.map