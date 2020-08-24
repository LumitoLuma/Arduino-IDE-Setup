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
exports.EditorsAndDocumentsMain = void 0;
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var disposable_1 = require("@theia/core/lib/common/disposable");
var text_editor_model_service_1 = require("./text-editor-model-service");
var monaco_editor_1 = require("@theia/monaco/lib/browser/monaco-editor");
var text_editor_main_1 = require("./text-editor-main");
var core_1 = require("@theia/core");
var core_2 = require("@theia/core");
var browser_1 = require("@theia/editor/lib/browser");
var EditorsAndDocumentsMain = /** @class */ (function () {
    function EditorsAndDocumentsMain(rpc, container) {
        var _this = this;
        this.textEditors = new Map();
        this.onTextEditorAddEmitter = new core_1.Emitter();
        this.onTextEditorRemoveEmitter = new core_1.Emitter();
        this.onDocumentAddEmitter = new core_1.Emitter();
        this.onDocumentRemoveEmitter = new core_1.Emitter();
        this.onTextEditorAdd = this.onTextEditorAddEmitter.event;
        this.onTextEditorRemove = this.onTextEditorRemoveEmitter.event;
        this.onDocumentAdd = this.onDocumentAddEmitter.event;
        this.onDocumentRemove = this.onDocumentRemoveEmitter.event;
        this.toDispose = new core_2.DisposableCollection(disposable_1.Disposable.create(function () { return _this.textEditors.clear(); }));
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.EDITORS_AND_DOCUMENTS_EXT);
        var editorService = container.get(browser_1.EditorManager);
        this.modelService = container.get(text_editor_model_service_1.EditorModelService);
        this.stateComputer = new EditorAndDocumentStateComputer(function (d) { return _this.onDelta(d); }, editorService, this.modelService);
        this.toDispose.push(this.stateComputer);
        this.toDispose.push(this.onTextEditorAddEmitter);
        this.toDispose.push(this.onTextEditorRemoveEmitter);
        this.toDispose.push(this.onDocumentAddEmitter);
        this.toDispose.push(this.onDocumentRemoveEmitter);
    }
    EditorsAndDocumentsMain.prototype.listen = function () {
        this.stateComputer.listen();
    };
    EditorsAndDocumentsMain.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    EditorsAndDocumentsMain.prototype.onDelta = function (delta) {
        var e_1, _a, e_2, _b;
        var _this = this;
        var removedEditors = new Array();
        var addedEditors = new Array();
        var removedDocuments = delta.removedDocuments.map(function (d) { return d.textEditorModel.uri; });
        try {
            for (var _c = __values(delta.addedEditors), _d = _c.next(); !_d.done; _d = _c.next()) {
                var editor = _d.value;
                var textEditorMain = new text_editor_main_1.TextEditorMain(editor.id, editor.editor.getControl().getModel(), editor.editor);
                this.textEditors.set(editor.id, textEditorMain);
                this.toDispose.push(textEditorMain);
                addedEditors.push(textEditorMain);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _e = __values(delta.removedEditors), _f = _e.next(); !_f.done; _f = _e.next()) {
                var id = _f.value.id;
                var textEditorMain = this.textEditors.get(id);
                if (textEditorMain) {
                    textEditorMain.dispose();
                    this.textEditors.delete(id);
                    removedEditors.push(id);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var deltaExt = {};
        var empty = true;
        if (delta.newActiveEditor !== undefined) {
            empty = false;
            deltaExt.newActiveEditor = delta.newActiveEditor;
        }
        if (removedDocuments.length > 0) {
            empty = false;
            deltaExt.removedDocuments = removedDocuments;
        }
        if (removedEditors.length > 0) {
            empty = false;
            deltaExt.removedEditors = removedEditors;
        }
        if (delta.addedDocuments.length > 0) {
            empty = false;
            deltaExt.addedDocuments = delta.addedDocuments.map(function (d) { return _this.toModelAddData(d); });
        }
        if (delta.addedEditors.length > 0) {
            empty = false;
            deltaExt.addedEditors = addedEditors.map(function (e) { return _this.toTextEditorAddData(e); });
        }
        if (!empty) {
            this.proxy.$acceptEditorsAndDocumentsDelta(deltaExt);
            this.onDocumentRemoveEmitter.fire(removedDocuments);
            this.onDocumentAddEmitter.fire(delta.addedDocuments);
            this.onTextEditorRemoveEmitter.fire(removedEditors);
            this.onTextEditorAddEmitter.fire(addedEditors);
        }
    };
    EditorsAndDocumentsMain.prototype.toModelAddData = function (model) {
        return {
            uri: model.textEditorModel.uri,
            versionId: model.textEditorModel.getVersionId(),
            lines: model.textEditorModel.getLinesContent(),
            EOL: model.textEditorModel.getEOL(),
            modeId: model.languageId,
            isDirty: model.dirty
        };
    };
    EditorsAndDocumentsMain.prototype.toTextEditorAddData = function (textEditor) {
        var properties = textEditor.getProperties();
        return {
            id: textEditor.getId(),
            documentUri: textEditor.getModel().uri,
            options: properties.options,
            selections: properties.selections,
            visibleRanges: properties.visibleRanges,
            editorPosition: this.findEditorPosition(textEditor)
        };
    };
    EditorsAndDocumentsMain.prototype.findEditorPosition = function (editor) {
        return plugin_api_rpc_1.EditorPosition.ONE; // TODO: fix this when Theia has support splitting editors
    };
    EditorsAndDocumentsMain.prototype.getEditor = function (id) {
        return this.textEditors.get(id);
    };
    EditorsAndDocumentsMain.prototype.saveAll = function (includeUntitled) {
        return this.modelService.saveAll(includeUntitled);
    };
    return EditorsAndDocumentsMain;
}());
exports.EditorsAndDocumentsMain = EditorsAndDocumentsMain;
var EditorAndDocumentStateComputer = /** @class */ (function () {
    function EditorAndDocumentStateComputer(callback, editorService, modelService) {
        var _this = this;
        this.callback = callback;
        this.editorService = editorService;
        this.modelService = modelService;
        this.editors = new Map();
        this.toDispose = new core_2.DisposableCollection(disposable_1.Disposable.create(function () { return _this.currentState = undefined; }));
    }
    EditorAndDocumentStateComputer.prototype.listen = function () {
        var e_3, _a;
        var _this = this;
        if (this.toDispose.disposed) {
            return;
        }
        this.toDispose.push(this.editorService.onCreated(function (widget) {
            _this.onTextEditorAdd(widget);
            _this.update();
        }));
        this.toDispose.push(this.editorService.onCurrentEditorChanged(function () { return _this.update(); }));
        this.toDispose.push(this.modelService.onModelAdded(this.onModelAdded, this));
        this.toDispose.push(this.modelService.onModelRemoved(function () { return _this.update(); }));
        try {
            for (var _b = __values(this.editorService.all), _c = _b.next(); !_c.done; _c = _b.next()) {
                var widget = _c.value;
                this.onTextEditorAdd(widget);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.update();
    };
    EditorAndDocumentStateComputer.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    EditorAndDocumentStateComputer.prototype.onModelAdded = function (model) {
        if (!this.currentState) {
            this.update();
            return;
        }
        this.currentState = new EditorAndDocumentState(this.currentState.documents.add(model), this.currentState.editors, this.currentState.activeEditor);
        this.callback(new EditorAndDocumentStateDelta([], [model], [], [], undefined, undefined));
    };
    EditorAndDocumentStateComputer.prototype.onTextEditorAdd = function (widget) {
        var _this = this;
        var editor = monaco_editor_1.MonacoEditor.get(widget);
        if (!editor) {
            return;
        }
        var id = editor.getControl().getId();
        var toDispose = new core_2.DisposableCollection(editor.onDispose(function () { return _this.onTextEditorRemove(editor); }), disposable_1.Disposable.create(function () { return _this.editors.delete(id); }));
        this.editors.set(id, toDispose);
        this.toDispose.push(toDispose);
    };
    EditorAndDocumentStateComputer.prototype.onTextEditorRemove = function (e) {
        var toDispose = this.editors.get(e.getControl().getId());
        if (toDispose) {
            toDispose.dispose();
            this.update();
        }
    };
    EditorAndDocumentStateComputer.prototype.update = function () {
        var e_4, _a, e_5, _b;
        var models = new Set();
        try {
            for (var _c = __values(this.modelService.getModels()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var model = _d.value;
                models.add(model);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var activeId = null;
        var activeEditor = monaco_editor_1.MonacoEditor.getCurrent(this.editorService);
        var editors = new Map();
        try {
            for (var _e = __values(this.editorService.all), _f = _e.next(); !_f.done; _f = _e.next()) {
                var widget = _f.value;
                var editor = monaco_editor_1.MonacoEditor.get(widget);
                // VS Code tracks only visible widgets
                if (!editor || !widget.isVisible) {
                    continue;
                }
                var model = editor.getControl().getModel();
                if (model && !model.isDisposed()) {
                    var editorSnapshot = new EditorSnapshot(editor);
                    editors.set(editorSnapshot.id, editorSnapshot);
                    if (activeEditor === editor) {
                        activeId = editorSnapshot.id;
                    }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var newState = new EditorAndDocumentState(models, editors, activeId);
        var delta = EditorAndDocumentState.compute(this.currentState, newState);
        if (!delta.isEmpty) {
            this.currentState = newState;
            this.callback(delta);
        }
    };
    return EditorAndDocumentStateComputer;
}());
var EditorAndDocumentStateDelta = /** @class */ (function () {
    function EditorAndDocumentStateDelta(removedDocuments, addedDocuments, removedEditors, addedEditors, oldActiveEditor, newActiveEditor) {
        this.removedDocuments = removedDocuments;
        this.addedDocuments = addedDocuments;
        this.removedEditors = removedEditors;
        this.addedEditors = addedEditors;
        this.oldActiveEditor = oldActiveEditor;
        this.newActiveEditor = newActiveEditor;
        this.isEmpty = this.removedDocuments.length === 0
            && this.addedDocuments.length === 0
            && this.addedEditors.length === 0
            && this.removedEditors.length === 0
            && this.newActiveEditor === this.oldActiveEditor;
    }
    return EditorAndDocumentStateDelta;
}());
var EditorAndDocumentState = /** @class */ (function () {
    function EditorAndDocumentState(documents, editors, activeEditor) {
        this.documents = documents;
        this.editors = editors;
        this.activeEditor = activeEditor;
    }
    EditorAndDocumentState.compute = function (before, after) {
        if (!before) {
            return new EditorAndDocumentStateDelta([], Array.from(after.documents), [], Array.from(after.editors.values()), undefined, after.activeEditor);
        }
        var documentDelta = Delta.ofSets(before.documents, after.documents);
        var editorDelta = Delta.ofMaps(before.editors, after.editors);
        var oldActiveEditor = before.activeEditor !== after.activeEditor ? before.activeEditor : undefined;
        var newActiveEditor = before.activeEditor !== after.activeEditor ? after.activeEditor : undefined;
        return new EditorAndDocumentStateDelta(documentDelta.removed, documentDelta.added, editorDelta.removed, editorDelta.added, oldActiveEditor, newActiveEditor);
    };
    return EditorAndDocumentState;
}());
var EditorSnapshot = /** @class */ (function () {
    function EditorSnapshot(editor) {
        this.editor = editor;
        this.id = editor.getControl().getId() + "," + editor.getControl().getModel().id;
    }
    return EditorSnapshot;
}());
var Delta;
(function (Delta) {
    function ofSets(before, after) {
        var removed = [];
        var added = [];
        before.forEach(function (element) {
            if (!after.has(element)) {
                removed.push(element);
            }
        });
        after.forEach(function (element) {
            if (!before.has(element)) {
                added.push(element);
            }
        });
        return { removed: removed, added: added };
    }
    Delta.ofSets = ofSets;
    function ofMaps(before, after) {
        var removed = [];
        var added = [];
        before.forEach(function (value, index) {
            if (!after.has(index)) {
                removed.push(value);
            }
        });
        after.forEach(function (value, index) {
            if (!before.has(index)) {
                added.push(value);
            }
        });
        return { removed: removed, added: added };
    }
    Delta.ofMaps = ofMaps;
})(Delta || (Delta = {}));
//# sourceMappingURL=editors-and-documents-main.js.map