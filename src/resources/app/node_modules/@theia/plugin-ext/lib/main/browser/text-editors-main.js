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
exports.TextEditorsMainImpl = void 0;
var vscode_uri_1 = require("vscode-uri");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var disposable_1 = require("@theia/core/lib/common/disposable");
var errors_1 = require("../../common/errors");
var languages_main_1 = require("./languages-main");
var uri_components_1 = require("../../common/uri-components");
var endpoint_1 = require("@theia/core/lib/browser/endpoint");
var TextEditorsMainImpl = /** @class */ (function () {
    function TextEditorsMainImpl(editorsAndDocuments, rpc, bulkEditService, monacoEditorService) {
        var _this = this;
        this.editorsAndDocuments = editorsAndDocuments;
        this.bulkEditService = bulkEditService;
        this.monacoEditorService = monacoEditorService;
        this.toDispose = new disposable_1.DisposableCollection();
        this.editorsToDispose = new Map();
        this.fileEndpoint = new endpoint_1.Endpoint({ path: 'file' }).getRestUrl();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.TEXT_EDITORS_EXT);
        this.toDispose.push(editorsAndDocuments);
        this.toDispose.push(editorsAndDocuments.onTextEditorAdd(function (editors) { return editors.forEach(_this.onTextEditorAdd, _this); }));
        this.toDispose.push(editorsAndDocuments.onTextEditorRemove(function (editors) { return editors.forEach(_this.onTextEditorRemove, _this); }));
    }
    TextEditorsMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    TextEditorsMainImpl.prototype.onTextEditorAdd = function (editor) {
        var _this = this;
        var id = editor.getId();
        var toDispose = new disposable_1.DisposableCollection(editor.onPropertiesChangedEvent(function (e) {
            _this.proxy.$acceptEditorPropertiesChanged(id, e);
        }), disposable_1.Disposable.create(function () { return _this.editorsToDispose.delete(id); }));
        this.editorsToDispose.set(id, toDispose);
        this.toDispose.push(toDispose);
    };
    TextEditorsMainImpl.prototype.onTextEditorRemove = function (id) {
        var disposables = this.editorsToDispose.get(id);
        if (disposables) {
            disposables.dispose();
        }
    };
    TextEditorsMainImpl.prototype.$trySetOptions = function (id, options) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor: " + id));
        }
        this.editorsAndDocuments.getEditor(id).setConfiguration(options);
        return Promise.resolve();
    };
    TextEditorsMainImpl.prototype.$trySetSelections = function (id, selections) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor: " + id));
        }
        this.editorsAndDocuments.getEditor(id).setSelections(selections);
        return Promise.resolve();
    };
    TextEditorsMainImpl.prototype.$tryRevealRange = function (id, range, revealType) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor(" + id + ")"));
        }
        this.editorsAndDocuments.getEditor(id).revealRange(new monaco.Range(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn), revealType);
        return Promise.resolve();
    };
    TextEditorsMainImpl.prototype.$tryApplyEdits = function (id, modelVersionId, edits, opts) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor(" + id + ")"));
        }
        return Promise.resolve(this.editorsAndDocuments.getEditor(id).applyEdits(modelVersionId, edits, opts));
    };
    TextEditorsMainImpl.prototype.$tryApplyWorkspaceEdit = function (dto) {
        var _this = this;
        var edits = languages_main_1.toMonacoWorkspaceEdit(dto);
        return new Promise(function (resolve) {
            _this.bulkEditService.apply(edits).then(function () { return resolve(true); }, function (err) { return resolve(false); });
        });
    };
    TextEditorsMainImpl.prototype.$tryInsertSnippet = function (id, template, ranges, opts) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor(" + id + ")"));
        }
        return Promise.resolve(this.editorsAndDocuments.getEditor(id).insertSnippet(template, ranges, opts));
    };
    TextEditorsMainImpl.prototype.$registerTextEditorDecorationType = function (key, options) {
        var _this = this;
        this.injectRemoteUris(options);
        this.monacoEditorService.registerDecorationType(key, options);
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.$removeTextEditorDecorationType(key); }));
    };
    TextEditorsMainImpl.prototype.injectRemoteUris = function (options) {
        if (options.before) {
            options.before.contentIconPath = this.toRemoteUri(options.before.contentIconPath);
        }
        if (options.after) {
            options.after.contentIconPath = this.toRemoteUri(options.after.contentIconPath);
        }
        if ('gutterIconPath' in options) {
            options.gutterIconPath = this.toRemoteUri(options.gutterIconPath);
        }
        if ('dark' in options && options.dark) {
            this.injectRemoteUris(options.dark);
        }
        if ('light' in options && options.light) {
            this.injectRemoteUris(options.light);
        }
    };
    TextEditorsMainImpl.prototype.toRemoteUri = function (uri) {
        if (uri && uri.scheme === 'file') {
            return uri_components_1.theiaUritoUriComponents(this.fileEndpoint.withQuery(vscode_uri_1.URI.revive(uri).toString()));
        }
        return uri;
    };
    TextEditorsMainImpl.prototype.$removeTextEditorDecorationType = function (key) {
        this.monacoEditorService.removeDecorationType(key);
    };
    TextEditorsMainImpl.prototype.$trySetDecorations = function (id, key, ranges) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor(" + id + ")"));
        }
        this.editorsAndDocuments.getEditor(id).setDecorations(key, ranges);
        return Promise.resolve();
    };
    TextEditorsMainImpl.prototype.$trySetDecorationsFast = function (id, key, ranges) {
        if (!this.editorsAndDocuments.getEditor(id)) {
            return Promise.reject(errors_1.disposed("TextEditor(" + id + ")"));
        }
        this.editorsAndDocuments.getEditor(id).setDecorationsFast(key, ranges);
        return Promise.resolve();
    };
    TextEditorsMainImpl.prototype.$saveAll = function (includeUntitled) {
        return this.editorsAndDocuments.saveAll(includeUntitled);
    };
    return TextEditorsMainImpl;
}());
exports.TextEditorsMainImpl = TextEditorsMainImpl;
//# sourceMappingURL=text-editors-main.js.map