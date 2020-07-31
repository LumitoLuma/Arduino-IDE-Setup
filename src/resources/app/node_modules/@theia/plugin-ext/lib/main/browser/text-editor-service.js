"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var core_1 = require("@theia/core");
var browser_1 = require("@theia/editor/lib/browser");
var monaco_editor_1 = require("@theia/monaco/lib/browser/monaco-editor");
var inversify_1 = require("inversify");
var TextEditorService = /** @class */ (function () {
    function TextEditorService(editorManager) {
        var _this = this;
        this.editorManager = editorManager;
        this.onTextEditorAddEmitter = new core_1.Emitter();
        this.onTextEditorAdd = this.onTextEditorAddEmitter.event;
        this.onTextEditorRemoveEmitter = new core_1.Emitter();
        this.onTextEditorRemove = this.onTextEditorRemoveEmitter.event;
        editorManager.onCreated(function (w) { return _this.onEditorCreated(w); });
        editorManager.all.forEach(function (w) { return _this.onEditorCreated(w); });
    }
    TextEditorService.prototype.listTextEditors = function () {
        return this.editorManager.all.map(function (w) { return monaco_editor_1.MonacoEditor.get(w); }).filter(function (editor) { return editor !== undefined; });
    };
    TextEditorService.prototype.getActiveEditor = function () {
        return this.editorManager.activeEditor;
    };
    TextEditorService.prototype.onEditorCreated = function (editor) {
        var _this = this;
        var monacoEditor = monaco_editor_1.MonacoEditor.get(editor);
        if (monacoEditor) {
            this.onEditorAdded(monacoEditor);
            editor.disposed.connect(function (e) { return _this.onEditorRemoved(monacoEditor); });
        }
    };
    TextEditorService.prototype.onEditorAdded = function (editor) {
        this.onTextEditorAddEmitter.fire(editor);
    };
    TextEditorService.prototype.onEditorRemoved = function (editor) {
        this.onTextEditorRemoveEmitter.fire(editor);
    };
    TextEditorService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_1.EditorManager)),
        __metadata("design:paramtypes", [browser_1.EditorManager])
    ], TextEditorService);
    return TextEditorService;
}());
exports.TextEditorService = TextEditorService;
//# sourceMappingURL=text-editor-service.js.map