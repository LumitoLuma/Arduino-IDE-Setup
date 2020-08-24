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
exports.DocumentsMainImpl = exports.ModelReferenceCollection = void 0;
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
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var core_1 = require("@theia/core");
var uri_1 = require("@theia/core/lib/common/uri");
var vscode_uri_1 = require("vscode-uri");
var browser_1 = require("@theia/core/lib/browser");
var disposable_util_1 = require("../../common/disposable-util");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var ModelReferenceCollection = /** @class */ (function () {
    function ModelReferenceCollection(maxAge, maxLength) {
        if (maxAge === void 0) { maxAge = 1000 * 60 * 3; }
        if (maxLength === void 0) { maxLength = 1024 * 1024 * 80; }
        this.maxAge = maxAge;
        this.maxLength = maxLength;
        this.data = new Array();
        this.length = 0;
    }
    ModelReferenceCollection.prototype.dispose = function () {
        this.data = disposable_util_1.dispose(this.data) || [];
    };
    ModelReferenceCollection.prototype.add = function (ref) {
        var length = ref.object.textEditorModel.getValueLength();
        var handle = setTimeout(_dispose, this.maxAge);
        var entry = { length: length, dispose: _dispose };
        var self = this;
        function _dispose() {
            var idx = self.data.indexOf(entry);
            if (idx >= 0) {
                self.length -= length;
                ref.dispose();
                clearTimeout(handle);
                self.data.splice(idx, 1);
            }
        }
        ;
        this.data.push(entry);
        this.length += length;
        this.cleanup();
    };
    ModelReferenceCollection.prototype.cleanup = function () {
        while (this.length > this.maxLength) {
            this.data[0].dispose();
        }
    };
    return ModelReferenceCollection;
}());
exports.ModelReferenceCollection = ModelReferenceCollection;
var DocumentsMainImpl = /** @class */ (function () {
    function DocumentsMainImpl(editorsAndDocuments, modelService, rpc, editorManager, openerService, shell, untitledResourceResolver, fileResourceResolver) {
        var _this = this;
        this.modelService = modelService;
        this.editorManager = editorManager;
        this.openerService = openerService;
        this.shell = shell;
        this.untitledResourceResolver = untitledResourceResolver;
        this.fileResourceResolver = fileResourceResolver;
        this.syncedModels = new Map();
        this.modelReferenceCache = new ModelReferenceCollection();
        this.saveTimeout = 1750;
        this.toDispose = new core_1.DisposableCollection(this.modelReferenceCache);
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.DOCUMENTS_EXT);
        this.toDispose.push(editorsAndDocuments);
        this.toDispose.push(editorsAndDocuments.onDocumentAdd(function (documents) { return documents.forEach(_this.onModelAdded, _this); }));
        this.toDispose.push(editorsAndDocuments.onDocumentRemove(function (documents) { return documents.forEach(_this.onModelRemoved, _this); }));
        this.toDispose.push(modelService.onModelModeChanged(this.onModelChanged, this));
        this.toDispose.push(modelService.onModelSaved(function (m) {
            _this.proxy.$acceptModelSaved(m.textEditorModel.uri);
        }));
        this.toDispose.push(modelService.onModelWillSave(function (onWillSaveModelEvent) {
            onWillSaveModelEvent.waitUntil(new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var edits, editOperations, edits_1, edits_1_1, edit, range, text;
                var e_1, _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            setTimeout(function () { return reject(new Error("Aborted onWillSaveTextDocument-event after " + _this.saveTimeout + "ms")); }, this.saveTimeout);
                            return [4 /*yield*/, this.proxy.$acceptModelWillSave(onWillSaveModelEvent.model.textEditorModel.uri, onWillSaveModelEvent.reason, this.saveTimeout)];
                        case 1:
                            edits = _b.sent();
                            editOperations = [];
                            try {
                                for (edits_1 = __values(edits), edits_1_1 = edits_1.next(); !edits_1_1.done; edits_1_1 = edits_1.next()) {
                                    edit = edits_1_1.value;
                                    range = edit.range, text = edit.text;
                                    if (!range && !text) {
                                        continue;
                                    }
                                    if (range && range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn && !edit.text) {
                                        continue;
                                    }
                                    editOperations.push({
                                        range: range ? monaco.Range.lift(range) : onWillSaveModelEvent.model.textEditorModel.getFullModelRange(),
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
                            resolve(editOperations);
                            return [2 /*return*/];
                    }
                });
            }); }));
        }));
        this.toDispose.push(modelService.onModelDirtyChanged(function (m) {
            _this.proxy.$acceptDirtyStateChanged(m.textEditorModel.uri, m.dirty);
        }));
    }
    DocumentsMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    DocumentsMainImpl.prototype.onModelChanged = function (event) {
        var modelUrl = event.model.textEditorModel.uri;
        if (this.syncedModels.has(modelUrl.toString())) {
            this.proxy.$acceptModelModeChanged(modelUrl, event.oldModeId, event.model.languageId);
        }
    };
    DocumentsMainImpl.prototype.onModelAdded = function (model) {
        var _this = this;
        var modelUri = model.textEditorModel.uri;
        var key = modelUri.toString();
        var toDispose = new core_1.DisposableCollection(model.textEditorModel.onDidChangeContent(function (e) {
            return _this.proxy.$acceptModelChanged(modelUri, {
                eol: e.eol,
                versionId: e.versionId,
                changes: e.changes.map(function (c) {
                    return ({
                        text: c.text,
                        range: c.range,
                        rangeLength: c.rangeLength,
                        rangeOffset: c.rangeOffset
                    });
                })
            }, model.dirty);
        }), core_1.Disposable.create(function () { return _this.syncedModels.delete(key); }));
        this.syncedModels.set(key, toDispose);
        this.toDispose.push(toDispose);
    };
    DocumentsMainImpl.prototype.onModelRemoved = function (url) {
        var model = this.syncedModels.get(url.toString());
        if (model) {
            model.dispose();
        }
    };
    DocumentsMainImpl.prototype.$tryCreateDocument = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var language, content, resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        language = options && options.language;
                        content = options && options.content;
                        return [4 /*yield*/, this.untitledResourceResolver.createUntitledResource(this.fileResourceResolver, content, language)];
                    case 1:
                        resource = _a.sent();
                        return [2 /*return*/, monaco.Uri.parse(resource.uri.toString())];
                }
            });
        });
    };
    DocumentsMainImpl.prototype.$tryShowDocument = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var editorOptions, uriArg, opener_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        editorOptions = DocumentsMainImpl.toEditorOpenerOptions(this.shell, options);
                        uriArg = new uri_1.default(vscode_uri_1.URI.revive(uri));
                        return [4 /*yield*/, this.openerService.getOpener(uriArg, editorOptions)];
                    case 1:
                        opener_1 = _a.sent();
                        return [4 /*yield*/, opener_1.open(uriArg, editorOptions)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error(err_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DocumentsMainImpl.prototype.$trySaveDocument = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.editorManager.getByUri(new uri_1.default(vscode_uri_1.URI.revive(uri)))];
                    case 1:
                        widget = _a.sent();
                        if (!widget) return [3 /*break*/, 3];
                        return [4 /*yield*/, browser_1.Saveable.save(widget)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    DocumentsMainImpl.prototype.$tryOpenDocument = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelService.createModelReference(new uri_1.default(vscode_uri_1.URI.revive(uri)))];
                    case 1:
                        ref = _a.sent();
                        if (ref.object) {
                            this.modelReferenceCache.add(ref);
                            return [2 /*return*/, true];
                        }
                        else {
                            ref.dispose();
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DocumentsMainImpl.prototype.$tryCloseDocument = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.editorManager.getByUri(new uri_1.default(vscode_uri_1.URI.revive(uri)))];
                    case 1:
                        widget = _a.sent();
                        if (!widget) return [3 /*break*/, 3];
                        return [4 /*yield*/, browser_1.Saveable.save(widget)];
                    case 2:
                        _a.sent();
                        widget.close();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    DocumentsMainImpl.toEditorOpenerOptions = function (shell, options) {
        if (!options) {
            return undefined;
        }
        var range;
        if (options.selection) {
            var selection = options.selection;
            range = {
                start: { line: selection.startLineNumber - 1, character: selection.startColumn - 1 },
                end: { line: selection.endLineNumber - 1, character: selection.endColumn - 1 }
            };
        }
        /* fall back to side group -> split relative to the active widget */
        var widgetOptions = { mode: 'split-right' };
        var viewColumn = options.viewColumn;
        if (viewColumn === undefined || viewColumn === -1) {
            /* active group -> skip (default behaviour) */
            widgetOptions = undefined;
        }
        else if (viewColumn > 0) {
            var tabBars = shell.mainAreaTabBars;
            // convert to zero-based index
            var tabBar = tabBars[viewColumn - 1];
            if (tabBar && tabBar.currentTitle) {
                widgetOptions = { ref: tabBar.currentTitle.owner };
            }
        }
        return {
            selection: range,
            mode: options.preserveFocus ? 'reveal' : 'activate',
            preview: options.preview,
            widgetOptions: widgetOptions
        };
    };
    return DocumentsMainImpl;
}());
exports.DocumentsMainImpl = DocumentsMainImpl;
//# sourceMappingURL=documents-main.js.map