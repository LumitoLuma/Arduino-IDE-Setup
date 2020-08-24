"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.DocumentsExtImpl = void 0;
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * based on https://github.com/Microsoft/vscode/blob/bf9a27ec01f2ef82fc45f69e0c946c7d74a57d3e/src/vs/workbench/api/node/extHostDocumentSaveParticipant.ts
 */
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var vscode_uri_1 = require("vscode-uri");
var event_1 = require("@theia/core/lib/common/event");
var document_data_1 = require("./document-data");
var Converter = require("./type-converters");
var disposable_1 = require("@theia/core/lib/common/disposable");
var types_impl_1 = require("./types-impl");
var DocumentsExtImpl = /** @class */ (function () {
    function DocumentsExtImpl(rpc, editorsAndDocuments) {
        var _this = this;
        this.editorsAndDocuments = editorsAndDocuments;
        this.toDispose = new disposable_1.DisposableCollection();
        this._onDidAddDocument = new event_1.Emitter();
        this._onDidRemoveDocument = new event_1.Emitter();
        this._onDidChangeDocument = new event_1.Emitter();
        this._onDidSaveTextDocument = new event_1.Emitter();
        this._onWillSaveTextDocument = new event_1.Emitter();
        this.onDidAddDocument = this._onDidAddDocument.event;
        this.onDidRemoveDocument = this._onDidRemoveDocument.event;
        this.onDidChangeDocument = this._onDidChangeDocument.event;
        this.onDidSaveTextDocument = this._onDidSaveTextDocument.event;
        this.onWillSaveTextDocument = this._onWillSaveTextDocument.event;
        this.loadingDocuments = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.DOCUMENTS_MAIN);
        this.toDispose.push(this.editorsAndDocuments.onDidAddDocuments(function (documents) {
            var e_1, _a;
            try {
                for (var documents_1 = __values(documents), documents_1_1 = documents_1.next(); !documents_1_1.done; documents_1_1 = documents_1.next()) {
                    var document_1 = documents_1_1.value;
                    _this._onDidAddDocument.fire(document_1.document);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (documents_1_1 && !documents_1_1.done && (_a = documents_1.return)) _a.call(documents_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }));
        this.toDispose.push(this.editorsAndDocuments.onDidRemoveDocuments(function (documents) {
            var e_2, _a;
            try {
                for (var documents_2 = __values(documents), documents_2_1 = documents_2.next(); !documents_2_1.done; documents_2_1 = documents_2.next()) {
                    var data = documents_2_1.value;
                    _this._onDidRemoveDocument.fire(data.document);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (documents_2_1 && !documents_2_1.done && (_a = documents_2.return)) _a.call(documents_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }));
    }
    DocumentsExtImpl.prototype.$acceptModelModeChanged = function (startUrl, oldModeId, newModeId) {
        var uri = vscode_uri_1.URI.revive(startUrl);
        var uriString = uri.toString();
        var data = this.editorsAndDocuments.getDocument(uriString);
        if (data) {
            this._onDidRemoveDocument.fire(data.document);
            data.acceptLanguageId(newModeId);
            this._onDidAddDocument.fire(data.document);
        }
    };
    DocumentsExtImpl.prototype.$acceptModelSaved = function (strUrl) {
        var uri = vscode_uri_1.URI.revive(strUrl);
        var uriString = uri.toString();
        var data = this.editorsAndDocuments.getDocument(uriString);
        this.$acceptDirtyStateChanged(strUrl, false);
        if (data) {
            this._onDidSaveTextDocument.fire(data.document);
        }
    };
    DocumentsExtImpl.prototype.$acceptModelWillSave = function (strUrl, reason, saveTimeout) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, operations, didTimeout, didTimeoutHandle;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = vscode_uri_1.URI.revive(strUrl).toString();
                        operations = [];
                        didTimeout = false;
                        didTimeoutHandle = setTimeout(function () { return didTimeout = true; }, saveTimeout - 250);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, this._onWillSaveTextDocument.sequence(function (fireEvent) { return __awaiter(_this, void 0, void 0, function () {
                                var documentData, document_2, e_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (didTimeout) {
                                                return [2 /*return*/, false];
                                            }
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 4, , 5]);
                                            documentData = this.editorsAndDocuments.getDocument(uri);
                                            if (!documentData) return [3 /*break*/, 3];
                                            document_2 = documentData.document;
                                            return [4 /*yield*/, this.fireTextDocumentWillSaveEvent({
                                                    document: document_2, reason: reason, fireEvent: fireEvent,
                                                    accept: function (operation) { return operations.push(operation); }
                                                })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [3 /*break*/, 5];
                                        case 4:
                                            e_3 = _a.sent();
                                            console.error(e_3);
                                            return [3 /*break*/, 5];
                                        case 5: return [2 /*return*/, !didTimeout];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        clearTimeout(didTimeoutHandle);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/, operations];
                }
            });
        });
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    DocumentsExtImpl.prototype.fireTextDocumentWillSaveEvent = function (_a) {
        var document = _a.document, reason = _a.reason, fireEvent = _a.fireEvent, accept = _a.accept;
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promises = [];
                        fireEvent(Object.freeze({
                            document: document, reason: reason,
                            waitUntil: function (p) {
                                if (Object.isFrozen(promises)) {
                                    throw new Error('waitUntil can not be called async');
                                }
                                promises.push(p);
                            }
                        }));
                        Object.freeze(promises);
                        return [4 /*yield*/, Promise.all(promises).then(function (allEdits) { return allEdits.forEach(function (edits) {
                                if (Array.isArray(edits)) {
                                    edits.forEach(function (edit) {
                                        if (types_impl_1.TextEdit.isTextEdit(edit)) {
                                            accept(Converter.fromTextEdit(edit));
                                        }
                                    });
                                }
                            }); })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    DocumentsExtImpl.prototype.$acceptDirtyStateChanged = function (strUrl, isDirty) {
        var uri = vscode_uri_1.URI.revive(strUrl);
        var uriString = uri.toString();
        var data = this.editorsAndDocuments.getDocument(uriString);
        if (!data) {
            throw new Error('unknown document');
        }
        data.acceptIsDirty(isDirty);
        this._onDidChangeDocument.fire({
            document: data.document,
            contentChanges: []
        });
    };
    DocumentsExtImpl.prototype.$acceptModelChanged = function (strUrl, e, isDirty) {
        var uri = vscode_uri_1.URI.revive(strUrl);
        var uriString = uri.toString();
        var data = this.editorsAndDocuments.getDocument(uriString);
        if (!data) {
            throw new Error('unknown document');
        }
        data.acceptIsDirty(isDirty);
        data.onEvents(e);
        this._onDidChangeDocument.fire({
            document: data.document,
            contentChanges: e.changes.map(function (change) {
                return ({
                    range: Converter.toRange(change.range),
                    rangeOffset: change.rangeOffset,
                    rangeLength: change.rangeLength,
                    text: change.text
                });
            })
        });
    };
    DocumentsExtImpl.prototype.getAllDocumentData = function () {
        return this.editorsAndDocuments.allDocuments();
    };
    DocumentsExtImpl.prototype.getDocumentData = function (resource) {
        if (resource) {
            return this.editorsAndDocuments.getDocument(resource.toString());
        }
        return undefined;
    };
    /**
     * Retrieve document and open it in the editor if need.
     *
     * @param uri path to the resource
     * @param options if options exists, resource will be opened in editor, otherwise only document object is returned
     */
    DocumentsExtImpl.prototype.showDocument = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var loadingDocument, document_3, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loadingDocument = this.loadingDocuments.get(uri.toString());
                        if (loadingDocument) {
                            // return the promise if document is already loading
                            return [2 /*return*/, loadingDocument];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        document_3 = this.loadDocument(uri, options);
                        // add loader to the map
                        this.loadingDocuments.set(uri.toString(), document_3);
                        // wait the document being opened
                        return [4 /*yield*/, document_3];
                    case 2:
                        // wait the document being opened
                        _a.sent();
                        // return opened document
                        return [2 /*return*/, document_3];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 4:
                        // remove loader from the map
                        this.loadingDocuments.delete(uri.toString());
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DocumentsExtImpl.prototype.openDocument = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var cached;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cached = this.editorsAndDocuments.getDocument(uri.toString());
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, this.proxy.$tryOpenDocument(uri)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.editorsAndDocuments.getDocument(uri.toString())];
                }
            });
        });
    };
    DocumentsExtImpl.prototype.loadDocument = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var documentOptions, selection, _a, start, end;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (options) {
                            selection = void 0;
                            if (options.selection) {
                                _a = options.selection, start = _a.start, end = _a.end;
                                selection = {
                                    startLineNumber: start.line,
                                    startColumn: start.character,
                                    endLineNumber: end.line,
                                    endColumn: end.character
                                };
                            }
                            documentOptions = {
                                selection: selection,
                                preserveFocus: options.preserveFocus,
                                preview: options.preview,
                                viewColumn: options.viewColumn
                            };
                        }
                        return [4 /*yield*/, this.proxy.$tryShowDocument(uri, documentOptions)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, this.editorsAndDocuments.getDocument(uri.toString())];
                }
            });
        });
    };
    DocumentsExtImpl.prototype.createDocumentData = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.proxy.$tryCreateDocument(options).then(function (data) { return vscode_uri_1.URI.revive(data); })];
            });
        });
    };
    DocumentsExtImpl.prototype.setWordDefinitionFor = function (modeId, wordDefinition) {
        document_data_1.setWordDefinitionFor(modeId, wordDefinition);
    };
    return DocumentsExtImpl;
}());
exports.DocumentsExtImpl = DocumentsExtImpl;
//# sourceMappingURL=documents.js.map