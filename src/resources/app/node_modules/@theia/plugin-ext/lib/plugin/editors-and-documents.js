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
exports.EditorsAndDocumentsExtImpl = void 0;
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var text_editor_1 = require("./text-editor");
var event_1 = require("@theia/core/lib/common/event");
var document_data_1 = require("./document-data");
var assert_1 = require("../common/assert");
var Converter = require("./type-converters");
var disposable_util_1 = require("../common/disposable-util");
var vscode_uri_1 = require("vscode-uri");
var EditorsAndDocumentsExtImpl = /** @class */ (function () {
    function EditorsAndDocumentsExtImpl(rpc) {
        this.rpc = rpc;
        this.activeEditorId = null;
        this._onDidAddDocuments = new event_1.Emitter();
        this._onDidRemoveDocuments = new event_1.Emitter();
        this._onDidChangeVisibleTextEditors = new event_1.Emitter();
        this._onDidChangeActiveTextEditor = new event_1.Emitter();
        this.onDidAddDocuments = this._onDidAddDocuments.event;
        this.onDidRemoveDocuments = this._onDidRemoveDocuments.event;
        this.onDidChangeVisibleTextEditors = this._onDidChangeVisibleTextEditors.event;
        this.onDidChangeActiveTextEditor = this._onDidChangeActiveTextEditor.event;
        this.documents = new Map();
        this.editors = new Map();
    }
    EditorsAndDocumentsExtImpl.prototype.$acceptEditorsAndDocumentsDelta = function (delta) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        var removedDocuments = new Array();
        var addedDocuments = new Array();
        var removedEditors = new Array();
        if (delta.removedDocuments) {
            try {
                for (var _e = __values(delta.removedDocuments), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var uriComponent = _f.value;
                    var uri = vscode_uri_1.URI.revive(uriComponent);
                    var id = uri.toString();
                    var data = this.documents.get(id);
                    this.documents.delete(id);
                    if (data) {
                        removedDocuments.push(data);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (delta.addedDocuments) {
            try {
                for (var _g = __values(delta.addedDocuments), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var data = _h.value;
                    var resource = vscode_uri_1.URI.revive(data.uri);
                    assert_1.ok(!this.documents.has(resource.toString()), "document '" + resource + "' already exists!");
                    var documentData = new document_data_1.DocumentDataExt(this.rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.DOCUMENTS_MAIN), resource, data.lines, data.EOL, data.modeId, data.versionId, data.isDirty);
                    this.documents.set(resource.toString(), documentData);
                    addedDocuments.push(documentData);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (delta.removedEditors) {
            try {
                for (var _j = __values(delta.removedEditors), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var id = _k.value;
                    var editor = this.editors.get(id);
                    this.editors.delete(id);
                    if (editor) {
                        removedEditors.push(editor);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        if (delta.addedEditors) {
            try {
                for (var _l = __values(delta.addedEditors), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var data = _m.value;
                    var resource = vscode_uri_1.URI.revive(data.documentUri);
                    assert_1.ok(this.documents.has(resource.toString()), "document '" + resource + "' doesn't exist");
                    assert_1.ok(!this.editors.has(data.id), "editor '" + data.id + "' already exists!");
                    var documentData = this.documents.get(resource.toString());
                    var editor = new text_editor_1.TextEditorExt(this.rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.TEXT_EDITORS_MAIN), data.id, documentData, data.selections.map(Converter.toSelection), data.options, data.visibleRanges.map(Converter.toRange), Converter.toViewColumn(data.editorPosition));
                    this.editors.set(data.id, editor);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        // TODO investigate how to get rid of it to align with VS Code extension host code
        if (this.activeEditorId && delta.removedEditors && delta.removedEditors.indexOf(this.activeEditorId) !== -1 && this.editors.size !== 0) {
            // to be compatible with VSCode, when active editor is closed onDidChangeActiveTextEditor
            // should be triggered with undefined before next editor, if any, become active.
            this.activeEditorId = null;
            this._onDidChangeActiveTextEditor.fire(undefined);
        }
        if (delta.newActiveEditor !== undefined) {
            assert_1.ok(delta.newActiveEditor === null || this.editors.has(delta.newActiveEditor), "active editor '" + delta.newActiveEditor + "' does not exist");
            this.activeEditorId = delta.newActiveEditor;
        }
        disposable_util_1.dispose(removedDocuments);
        disposable_util_1.dispose(removedEditors);
        // now that the internal state is complete, fire events
        if (delta.removedDocuments) {
            this._onDidRemoveDocuments.fire(removedDocuments);
        }
        if (delta.addedDocuments) {
            this._onDidAddDocuments.fire(addedDocuments);
        }
        if (delta.removedEditors || delta.addedEditors) {
            this._onDidChangeVisibleTextEditors.fire(this.allEditors());
        }
        if (delta.newActiveEditor !== undefined) {
            this._onDidChangeActiveTextEditor.fire(this.activeEditor());
        }
    };
    EditorsAndDocumentsExtImpl.prototype.allEditors = function () {
        var result = new Array();
        this.editors.forEach(function (editor) { return result.push(editor); });
        return result;
    };
    EditorsAndDocumentsExtImpl.prototype.activeEditor = function () {
        if (!this.activeEditorId) {
            return undefined;
        }
        else {
            return this.editors.get(this.activeEditorId);
        }
    };
    EditorsAndDocumentsExtImpl.prototype.allDocuments = function () {
        var result = new Array();
        this.documents.forEach(function (data) { return result.push(data); });
        return result;
    };
    EditorsAndDocumentsExtImpl.prototype.getDocument = function (uri) {
        return this.documents.get(uri);
    };
    EditorsAndDocumentsExtImpl.prototype.getEditor = function (id) {
        return this.editors.get(id);
    };
    return EditorsAndDocumentsExtImpl;
}());
exports.EditorsAndDocumentsExtImpl = EditorsAndDocumentsExtImpl;
//# sourceMappingURL=editors-and-documents.js.map