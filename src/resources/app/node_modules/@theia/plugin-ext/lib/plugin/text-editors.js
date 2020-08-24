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
exports.TextEditorDecorationType = exports.TextEditorsExtImpl = void 0;
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var event_1 = require("@theia/core/lib/common/event");
var Converters = require("./type-converters");
var types_impl_1 = require("./types-impl");
var id_generator_1 = require("../common/id-generator");
var TextEditorsExtImpl = /** @class */ (function () {
    function TextEditorsExtImpl(rpc, editorsAndDocuments) {
        var _this = this;
        this.editorsAndDocuments = editorsAndDocuments;
        this._onDidChangeTextEditorSelection = new event_1.Emitter();
        this._onDidChangeTextEditorOptions = new event_1.Emitter();
        this._onDidChangeTextEditorVisibleRanges = new event_1.Emitter();
        this._onDidChangeTextEditorViewColumn = new event_1.Emitter();
        this._onDidChangeActiveTextEditor = new event_1.Emitter();
        this._onDidChangeVisibleTextEditors = new event_1.Emitter();
        this.onDidChangeTextEditorSelection = this._onDidChangeTextEditorSelection.event;
        this.onDidChangeTextEditorOptions = this._onDidChangeTextEditorOptions.event;
        this.onDidChangeTextEditorVisibleRanges = this._onDidChangeTextEditorVisibleRanges.event;
        this.onDidChangeTextEditorViewColumn = this._onDidChangeTextEditorViewColumn.event;
        this.onDidChangeActiveTextEditor = this._onDidChangeActiveTextEditor.event;
        this.onDidChangeVisibleTextEditors = this._onDidChangeVisibleTextEditors.event;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.TEXT_EDITORS_MAIN);
        this.editorsAndDocuments.onDidChangeActiveTextEditor(function (e) { return _this._onDidChangeActiveTextEditor.fire(e); });
        this.editorsAndDocuments.onDidChangeVisibleTextEditors(function (e) { return _this._onDidChangeVisibleTextEditors.fire(e); });
    }
    TextEditorsExtImpl.prototype.$acceptEditorPropertiesChanged = function (id, props) {
        var textEditor = this.editorsAndDocuments.getEditor(id);
        if (!textEditor) {
            return;
        }
        if (props.options) {
            textEditor.acceptOptions(props.options);
        }
        if (props.selections) {
            var selections = props.selections.selections.map(Converters.toSelection);
            textEditor.acceptSelections(selections);
        }
        if (props.visibleRanges) {
            var visibleRanges = props.visibleRanges.map(Converters.toRange);
            textEditor.acceptVisibleRanges(visibleRanges);
        }
        if (props.options) {
            this._onDidChangeTextEditorOptions.fire({
                textEditor: textEditor,
                options: props.options
            });
        }
        if (props.selections) {
            var kind = types_impl_1.TextEditorSelectionChangeKind.fromValue(props.selections.source);
            var selections = props.selections.selections.map(Converters.toSelection);
            this._onDidChangeTextEditorSelection.fire({
                textEditor: textEditor,
                selections: selections,
                kind: kind
            });
        }
        if (props.visibleRanges) {
            var visibleRanges = props.visibleRanges.map(Converters.toRange);
            this._onDidChangeTextEditorVisibleRanges.fire({
                textEditor: textEditor,
                visibleRanges: visibleRanges
            });
        }
    };
    TextEditorsExtImpl.prototype.$acceptEditorPositionData = function (data) {
        for (var id in data) {
            if (data.hasOwnProperty(id)) {
                var textEditor = this.editorsAndDocuments.getEditor(id);
                var viewColumn = Converters.toViewColumn(data[id]);
                if (textEditor && viewColumn) {
                    if (textEditor.viewColumn !== viewColumn) {
                        textEditor.acceptViewColumn(viewColumn);
                        this._onDidChangeTextEditorViewColumn.fire({ textEditor: textEditor, viewColumn: viewColumn });
                    }
                }
            }
        }
    };
    TextEditorsExtImpl.prototype.getActiveEditor = function () {
        return this.editorsAndDocuments.activeEditor();
    };
    TextEditorsExtImpl.prototype.getVisibleTextEditors = function () {
        return this.editorsAndDocuments.allEditors();
    };
    TextEditorsExtImpl.prototype.createTextEditorDecorationType = function (options) {
        return new TextEditorDecorationType(this.proxy, options);
    };
    TextEditorsExtImpl.prototype.applyWorkspaceEdit = function (edit) {
        var dto = Converters.fromWorkspaceEdit(edit, this.editorsAndDocuments);
        return this.proxy.$tryApplyWorkspaceEdit(dto);
    };
    TextEditorsExtImpl.prototype.saveAll = function (includeUntitled) {
        return this.proxy.$saveAll(includeUntitled);
    };
    return TextEditorsExtImpl;
}());
exports.TextEditorsExtImpl = TextEditorsExtImpl;
var TextEditorDecorationType = /** @class */ (function () {
    function TextEditorDecorationType(proxy, options) {
        this.key = TextEditorDecorationType.Keys.nextId();
        this.proxy = proxy;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.proxy.$registerTextEditorDecorationType(this.key, Converters.DecorationRenderOptions.from(options));
    }
    TextEditorDecorationType.prototype.dispose = function () {
        this.proxy.$removeTextEditorDecorationType(this.key);
    };
    TextEditorDecorationType.Keys = new id_generator_1.IdGenerator('TextEditorDecorationType');
    return TextEditorDecorationType;
}());
exports.TextEditorDecorationType = TextEditorDecorationType;
//# sourceMappingURL=text-editors.js.map