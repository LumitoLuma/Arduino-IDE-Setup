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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletionAdapter = void 0;
var types_impl_1 = require("../types-impl");
var Converter = require("../type-converters");
var plugin_api_rpc_model_1 = require("../../common/plugin-api-rpc-model");
var disposable_1 = require("@theia/core/lib/common/disposable");
var CompletionAdapter = /** @class */ (function () {
    function CompletionAdapter(delegate, documents, commands) {
        this.delegate = delegate;
        this.documents = documents;
        this.commands = commands;
        this.cacheId = 0;
        this.cache = new Map();
        this.disposables = new Map();
    }
    CompletionAdapter.prototype.provideCompletionItems = function (resource, position, context, token) {
        var _this = this;
        var document = this.documents.getDocumentData(resource);
        if (!document) {
            return Promise.reject(new Error("There are no document for  " + resource));
        }
        var doc = document.document;
        var pos = Converter.toPosition(position);
        // The default insert/replace ranges. It's important to compute them
        // before asynchronously asking the provider for its results. See
        // https://github.com/microsoft/vscode/issues/83400#issuecomment-546851421
        var replacing = doc.getWordRangeAtPosition(pos) || new types_impl_1.Range(pos, pos);
        var inserting = replacing.with({ end: pos });
        return Promise.resolve(this.delegate.provideCompletionItems(doc, pos, token, context)).then(function (value) {
            var id = _this.cacheId++;
            var toDispose = new disposable_1.DisposableCollection();
            _this.disposables.set(id, toDispose);
            var result = {
                id: id,
                completions: [],
                defaultRange: {
                    insert: Converter.fromRange(inserting),
                    replace: Converter.fromRange(replacing)
                }
            };
            var list;
            if (!value) {
                return undefined;
            }
            else if (Array.isArray(value)) {
                list = new types_impl_1.CompletionList(value);
            }
            else {
                list = value;
                result.incomplete = list.isIncomplete;
            }
            for (var i = 0; i < list.items.length; i++) {
                var suggestion = _this.convertCompletionItem(list.items[i], i, id, inserting, replacing);
                if (suggestion) {
                    result.completions.push(suggestion);
                }
            }
            _this.cache.set(id, list.items);
            return result;
        });
    };
    CompletionAdapter.prototype.resolveCompletionItem = function (parentId, id, token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var item, resolvedItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof this.delegate.resolveCompletionItem !== 'function') {
                            return [2 /*return*/, undefined];
                        }
                        item = (_a = this.cache.get(parentId)) === null || _a === void 0 ? void 0 : _a[id];
                        if (!item) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, this.delegate.resolveCompletionItem(item, token)];
                    case 1:
                        resolvedItem = _b.sent();
                        if (!resolvedItem) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, this.convertCompletionItem(resolvedItem, id, parentId)];
                }
            });
        });
    };
    CompletionAdapter.prototype.releaseCompletionItems = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var toDispose;
            return __generator(this, function (_a) {
                this.cache.delete(id);
                toDispose = this.disposables.get(id);
                if (toDispose) {
                    toDispose.dispose();
                    this.disposables.delete(id);
                }
                return [2 /*return*/];
            });
        });
    };
    CompletionAdapter.prototype.convertCompletionItem = function (item, id, parentId, defaultInserting, defaultReplacing) {
        var _a;
        if (typeof item.label !== 'string' || item.label.length === 0) {
            console.warn('Invalid Completion Item -> must have at least a label');
            return undefined;
        }
        var toDispose = this.disposables.get(parentId);
        if (!toDispose) {
            throw Error('DisposableCollection is missing...');
        }
        var insertText = item.label;
        var insertTextRules = item.keepWhitespace ? plugin_api_rpc_model_1.CompletionItemInsertTextRule.KeepWhitespace : 0;
        if (item.textEdit) {
            insertText = item.textEdit.newText;
        }
        else if (typeof item.insertText === 'string') {
            insertText = item.insertText;
        }
        else if (item.insertText instanceof types_impl_1.SnippetString) {
            insertText = item.insertText.value;
            insertTextRules |= plugin_api_rpc_model_1.CompletionItemInsertTextRule.InsertAsSnippet;
        }
        var range;
        var itemRange = ((_a = item.textEdit) === null || _a === void 0 ? void 0 : _a.range) || item.range;
        if (types_impl_1.Range.isRange(itemRange)) {
            range = Converter.fromRange(itemRange);
        }
        else if (itemRange && (!(defaultInserting === null || defaultInserting === void 0 ? void 0 : defaultInserting.isEqual(itemRange.inserting)) || !(defaultReplacing === null || defaultReplacing === void 0 ? void 0 : defaultReplacing.isEqual(itemRange.replacing)))) {
            range = {
                insert: Converter.fromRange(itemRange.inserting),
                replace: Converter.fromRange(itemRange.replacing)
            };
        }
        return {
            id: id,
            parentId: parentId,
            label: item.label,
            kind: Converter.fromCompletionItemKind(item.kind),
            detail: item.detail,
            documentation: item.documentation,
            filterText: item.filterText,
            sortText: item.sortText,
            preselect: item.preselect,
            insertText: insertText,
            insertTextRules: insertTextRules,
            range: range,
            additionalTextEdits: item.additionalTextEdits && item.additionalTextEdits.map(Converter.fromTextEdit),
            command: this.commands.converter.toSafeCommand(item.command, toDispose),
            commitCharacters: item.commitCharacters
        };
    };
    CompletionAdapter.hasResolveSupport = function (provider) {
        return typeof provider.resolveCompletionItem === 'function';
    };
    return CompletionAdapter;
}());
exports.CompletionAdapter = CompletionAdapter;
//# sourceMappingURL=completion.js.map