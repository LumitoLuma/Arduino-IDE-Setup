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
exports.LanguagesExtImpl = void 0;
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var types_impl_1 = require("./types-impl");
var vscode_uri_1 = require("vscode-uri");
var completion_1 = require("./languages/completion");
var diagnostics_1 = require("./languages/diagnostics");
var signature_1 = require("./languages/signature");
var hover_1 = require("./languages/hover");
var document_highlight_1 = require("./languages/document-highlight");
var document_formatting_1 = require("./languages/document-formatting");
var range_formatting_1 = require("./languages/range-formatting");
var on_type_formatting_1 = require("./languages/on-type-formatting");
var definition_1 = require("./languages/definition");
var implementation_1 = require("./languages/implementation");
var type_definition_1 = require("./languages/type-definition");
var code_action_1 = require("./languages/code-action");
var link_provider_1 = require("./languages/link-provider");
var lens_1 = require("./languages/lens");
var outline_1 = require("./languages/outline");
var reference_1 = require("./languages/reference");
var workspace_symbol_1 = require("./languages/workspace-symbol");
var folding_1 = require("./languages/folding");
var selection_range_1 = require("./languages/selection-range");
var color_1 = require("./languages/color");
var rename_1 = require("./languages/rename");
var declaration_1 = require("./languages/declaration");
var call_hierarchy_1 = require("./languages/call-hierarchy");
/* eslint-enable @typescript-eslint/indent */
var LanguagesExtImpl = /** @class */ (function () {
    function LanguagesExtImpl(rpc, documents, commands) {
        this.documents = documents;
        this.commands = commands;
        this.callId = 0;
        this.adaptersMap = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.LANGUAGES_MAIN);
        this.diagnostics = new diagnostics_1.Diagnostics(rpc);
    }
    Object.defineProperty(LanguagesExtImpl.prototype, "onDidChangeDiagnostics", {
        get: function () {
            return this.diagnostics.onDidChangeDiagnostics;
        },
        enumerable: false,
        configurable: true
    });
    LanguagesExtImpl.prototype.getLanguages = function () {
        return this.proxy.$getLanguages();
    };
    LanguagesExtImpl.prototype.changeLanguage = function (uri, languageId) {
        var _this = this;
        return this.proxy.$changeLanguage(uri, languageId).then(function () {
            var doc = _this.documents.getDocumentData(uri);
            if (!doc) {
                throw new Error('No document found by URI ' + uri.toString());
            }
            return doc.document;
        });
    };
    LanguagesExtImpl.prototype.setLanguageConfiguration = function (language, configuration) {
        var wordPattern = configuration.wordPattern;
        if (wordPattern) {
            this.documents.setWordDefinitionFor(language, wordPattern);
        }
        else {
            this.documents.setWordDefinitionFor(language, null);
        }
        var callId = this.nextCallId();
        var config = {
            brackets: configuration.brackets,
            comments: configuration.comments,
            onEnterRules: serializeEnterRules(configuration.onEnterRules),
            wordPattern: serializeRegExp(configuration.wordPattern),
            indentationRules: serializeIndentation(configuration.indentationRules)
        };
        this.proxy.$setLanguageConfiguration(callId, language, config);
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.nextCallId = function () {
        return this.callId++;
    };
    LanguagesExtImpl.prototype.createDisposable = function (callId) {
        var _this = this;
        return new types_impl_1.Disposable(function () {
            _this.adaptersMap.delete(callId);
            _this.proxy.$unregister(callId);
        });
    };
    LanguagesExtImpl.prototype.addNewAdapter = function (adapter) {
        var callId = this.nextCallId();
        this.adaptersMap.set(callId, adapter);
        return callId;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LanguagesExtImpl.prototype.withAdapter = function (handle, ctor, callback, fallbackValue) {
        return __awaiter(this, void 0, void 0, function () {
            var adapter;
            return __generator(this, function (_a) {
                adapter = this.adaptersMap.get(handle);
                if (!adapter) {
                    return [2 /*return*/, fallbackValue];
                }
                if (adapter instanceof ctor) {
                    return [2 /*return*/, callback(adapter)];
                }
                throw new Error('no adapter found');
            });
        });
    };
    LanguagesExtImpl.prototype.transformDocumentSelector = function (selector) {
        var _this = this;
        if (Array.isArray(selector)) {
            return selector.map(function (sel) { return _this.doTransformDocumentSelector(sel); });
        }
        return [this.doTransformDocumentSelector(selector)];
    };
    LanguagesExtImpl.prototype.doTransformDocumentSelector = function (selector) {
        if (typeof selector === 'string') {
            return {
                $serialized: true,
                language: selector
            };
        }
        if (selector) {
            return {
                $serialized: true,
                language: selector.language,
                scheme: selector.scheme,
                pattern: selector.pattern
            };
        }
        return undefined;
    };
    // ### Completion begin
    LanguagesExtImpl.prototype.$provideCompletionItems = function (handle, resource, position, context, token) {
        return this.withAdapter(handle, completion_1.CompletionAdapter, function (adapter) { return adapter.provideCompletionItems(vscode_uri_1.URI.revive(resource), position, context, token); }, undefined);
    };
    LanguagesExtImpl.prototype.$resolveCompletionItem = function (handle, parentId, id, token) {
        return this.withAdapter(handle, completion_1.CompletionAdapter, function (adapter) { return adapter.resolveCompletionItem(parentId, id, token); }, undefined);
    };
    LanguagesExtImpl.prototype.$releaseCompletionItems = function (handle, id) {
        var _this = this;
        this.withAdapter(handle, completion_1.CompletionAdapter, function (adapter) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, adapter.releaseCompletionItems(id)];
        }); }); }, undefined);
    };
    LanguagesExtImpl.prototype.registerCompletionItemProvider = function (selector, provider, triggerCharacters, pluginInfo) {
        var callId = this.addNewAdapter(new completion_1.CompletionAdapter(provider, this.documents, this.commands));
        this.proxy.$registerCompletionSupport(callId, pluginInfo, this.transformDocumentSelector(selector), triggerCharacters, completion_1.CompletionAdapter.hasResolveSupport(provider));
        return this.createDisposable(callId);
    };
    // ### Completion end
    // ### Definition provider begin
    LanguagesExtImpl.prototype.$provideDefinition = function (handle, resource, position, token) {
        return this.withAdapter(handle, definition_1.DefinitionAdapter, function (adapter) { return adapter.provideDefinition(vscode_uri_1.URI.revive(resource), position, token); }, undefined);
    };
    LanguagesExtImpl.prototype.registerDefinitionProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new definition_1.DefinitionAdapter(provider, this.documents));
        this.proxy.$registerDefinitionProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    // ### Definition provider end
    // ### Declaration provider begin
    LanguagesExtImpl.prototype.$provideDeclaration = function (handle, resource, position, token) {
        return this.withAdapter(handle, declaration_1.DeclarationAdapter, function (adapter) { return adapter.provideDeclaration(vscode_uri_1.URI.revive(resource), position, token); }, undefined);
    };
    LanguagesExtImpl.prototype.registerDeclarationProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new declaration_1.DeclarationAdapter(provider, this.documents));
        this.proxy.$registerDeclarationProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    // ### Declaration provider end
    // ### Signature help begin
    LanguagesExtImpl.prototype.$provideSignatureHelp = function (handle, resource, position, context, token) {
        return this.withAdapter(handle, signature_1.SignatureHelpAdapter, function (adapter) { return adapter.provideSignatureHelp(vscode_uri_1.URI.revive(resource), position, token, context); }, undefined);
    };
    LanguagesExtImpl.prototype.$releaseSignatureHelp = function (handle, id) {
        var _this = this;
        this.withAdapter(handle, signature_1.SignatureHelpAdapter, function (adapter) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, adapter.releaseSignatureHelp(id)];
        }); }); }, undefined);
    };
    LanguagesExtImpl.prototype.registerSignatureHelpProvider = function (selector, provider, metadata, pluginInfo) {
        var callId = this.addNewAdapter(new signature_1.SignatureHelpAdapter(provider, this.documents));
        this.proxy.$registerSignatureHelpProvider(callId, pluginInfo, this.transformDocumentSelector(selector), metadata);
        return this.createDisposable(callId);
    };
    // ### Signature help end
    // ### Diagnostics begin
    LanguagesExtImpl.prototype.getDiagnostics = function (resource) {
        return this.diagnostics.getDiagnostics(resource);
    };
    LanguagesExtImpl.prototype.createDiagnosticCollection = function (name) {
        return this.diagnostics.createDiagnosticCollection(name);
    };
    // ### Diagnostics end
    // ### Implementation provider begin
    LanguagesExtImpl.prototype.$provideImplementation = function (handle, resource, position, token) {
        return this.withAdapter(handle, implementation_1.ImplementationAdapter, function (adapter) { return adapter.provideImplementation(vscode_uri_1.URI.revive(resource), position, token); }, undefined);
    };
    LanguagesExtImpl.prototype.registerImplementationProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new implementation_1.ImplementationAdapter(provider, this.documents));
        this.proxy.$registerImplementationProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    // ### Implementation provider end
    // ### Type Definition provider begin
    LanguagesExtImpl.prototype.$provideTypeDefinition = function (handle, resource, position, token) {
        return this.withAdapter(handle, type_definition_1.TypeDefinitionAdapter, function (adapter) { return adapter.provideTypeDefinition(vscode_uri_1.URI.revive(resource), position, token); }, undefined);
    };
    LanguagesExtImpl.prototype.registerTypeDefinitionProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new type_definition_1.TypeDefinitionAdapter(provider, this.documents));
        this.proxy.$registerTypeDefinitionProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    // ### Type Definition provider end
    // ### Hover Provider begin
    LanguagesExtImpl.prototype.registerHoverProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new hover_1.HoverAdapter(provider, this.documents));
        this.proxy.$registerHoverProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideHover = function (handle, resource, position, token) {
        return this.withAdapter(handle, hover_1.HoverAdapter, function (adapter) { return adapter.provideHover(vscode_uri_1.URI.revive(resource), position, token); }, undefined);
    };
    // ### Hover Provider end
    // ### Document Highlight Provider begin
    LanguagesExtImpl.prototype.registerDocumentHighlightProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new document_highlight_1.DocumentHighlightAdapter(provider, this.documents));
        this.proxy.$registerDocumentHighlightProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideDocumentHighlights = function (handle, resource, position, token) {
        return this.withAdapter(handle, document_highlight_1.DocumentHighlightAdapter, function (adapter) { return adapter.provideDocumentHighlights(vscode_uri_1.URI.revive(resource), position, token); }, undefined);
    };
    // ### Document Highlight Provider end
    // ### WorkspaceSymbol Provider begin
    LanguagesExtImpl.prototype.registerWorkspaceSymbolProvider = function (provider, pluginInfo) {
        var callId = this.addNewAdapter(new workspace_symbol_1.WorkspaceSymbolAdapter(provider));
        this.proxy.$registerWorkspaceSymbolProvider(callId, pluginInfo);
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideWorkspaceSymbols = function (handle, query, token) {
        return this.withAdapter(handle, workspace_symbol_1.WorkspaceSymbolAdapter, function (adapter) { return adapter.provideWorkspaceSymbols(query, token); }, []);
    };
    LanguagesExtImpl.prototype.$resolveWorkspaceSymbol = function (handle, symbol, token) {
        return this.withAdapter(handle, workspace_symbol_1.WorkspaceSymbolAdapter, function (adapter) { return adapter.resolveWorkspaceSymbol(symbol, token); }, undefined);
    };
    // ### WorkspaceSymbol Provider end
    // ### Document Formatting Edit begin
    LanguagesExtImpl.prototype.registerDocumentFormattingEditProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new document_formatting_1.DocumentFormattingAdapter(provider, this.documents));
        this.proxy.$registerDocumentFormattingSupport(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideDocumentFormattingEdits = function (handle, resource, options, token) {
        return this.withAdapter(handle, document_formatting_1.DocumentFormattingAdapter, function (adapter) { return adapter.provideDocumentFormattingEdits(vscode_uri_1.URI.revive(resource), options, token); }, undefined);
    };
    // ### Document Formatting Edit end
    // ### Document Range Formatting Edit begin
    LanguagesExtImpl.prototype.registerDocumentRangeFormattingEditProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new range_formatting_1.RangeFormattingAdapter(provider, this.documents));
        this.proxy.$registerRangeFormattingProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideDocumentRangeFormattingEdits = function (handle, resource, range, options, token) {
        return this.withAdapter(handle, range_formatting_1.RangeFormattingAdapter, function (adapter) { return adapter.provideDocumentRangeFormattingEdits(vscode_uri_1.URI.revive(resource), range, options, token); }, undefined);
    };
    // ### Document Range Formatting Edit end
    // ### On Type Formatting Edit begin
    LanguagesExtImpl.prototype.registerOnTypeFormattingEditProvider = function (selector, provider, triggerCharacters, pluginInfo) {
        var callId = this.addNewAdapter(new on_type_formatting_1.OnTypeFormattingAdapter(provider, this.documents));
        this.proxy.$registerOnTypeFormattingProvider(callId, pluginInfo, this.transformDocumentSelector(selector), triggerCharacters);
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideOnTypeFormattingEdits = function (handle, resource, position, ch, options, token) {
        return this.withAdapter(handle, on_type_formatting_1.OnTypeFormattingAdapter, function (adapter) { return adapter.provideOnTypeFormattingEdits(vscode_uri_1.URI.revive(resource), position, ch, options, token); }, undefined);
    };
    // ### On Type Formatting Edit end
    // ### Document Link Provider begin
    LanguagesExtImpl.prototype.$provideDocumentLinks = function (handle, resource, token) {
        return this.withAdapter(handle, link_provider_1.LinkProviderAdapter, function (adapter) { return adapter.provideLinks(vscode_uri_1.URI.revive(resource), token); }, undefined);
    };
    LanguagesExtImpl.prototype.$resolveDocumentLink = function (handle, link, token) {
        return this.withAdapter(handle, link_provider_1.LinkProviderAdapter, function (adapter) { return adapter.resolveLink(link, token); }, undefined);
    };
    LanguagesExtImpl.prototype.registerLinkProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new link_provider_1.LinkProviderAdapter(provider, this.documents));
        this.proxy.$registerDocumentLinkProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$releaseDocumentLinks = function (handle, ids) {
        var _this = this;
        this.withAdapter(handle, link_provider_1.LinkProviderAdapter, function (adapter) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, adapter.releaseDocumentLinks(ids)];
        }); }); }, undefined);
    };
    // ### Document Link Provider end
    // ### Code Actions Provider begin
    LanguagesExtImpl.prototype.registerCodeActionsProvider = function (selector, provider, pluginModel, pluginInfo, metadata) {
        var callId = this.addNewAdapter(new code_action_1.CodeActionAdapter(provider, this.documents, this.diagnostics, pluginModel ? pluginModel.id : '', this.commands));
        this.proxy.$registerQuickFixProvider(callId, pluginInfo, this.transformDocumentSelector(selector), metadata && metadata.providedCodeActionKinds ? metadata.providedCodeActionKinds.map(function (kind) { return kind.value; }) : undefined);
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideCodeActions = function (handle, resource, rangeOrSelection, context, token) {
        return this.withAdapter(handle, code_action_1.CodeActionAdapter, function (adapter) { return adapter.provideCodeAction(vscode_uri_1.URI.revive(resource), rangeOrSelection, context, token); }, undefined);
    };
    // ### Code Actions Provider end
    // ### Code Lens Provider begin
    LanguagesExtImpl.prototype.registerCodeLensProvider = function (selector, provider, pluginInfo) {
        var _this = this;
        var callId = this.addNewAdapter(new lens_1.CodeLensAdapter(provider, this.documents, this.commands));
        var eventHandle = typeof provider.onDidChangeCodeLenses === 'function' ? this.nextCallId() : undefined;
        this.proxy.$registerCodeLensSupport(callId, pluginInfo, this.transformDocumentSelector(selector), eventHandle);
        var result = this.createDisposable(callId);
        if (eventHandle !== undefined && provider.onDidChangeCodeLenses) {
            var subscription = provider.onDidChangeCodeLenses(function (e) { return _this.proxy.$emitCodeLensEvent(eventHandle); });
            result = types_impl_1.Disposable.from(result, subscription);
        }
        return result;
    };
    LanguagesExtImpl.prototype.$provideCodeLenses = function (handle, resource, token) {
        return this.withAdapter(handle, lens_1.CodeLensAdapter, function (adapter) { return adapter.provideCodeLenses(vscode_uri_1.URI.revive(resource), token); }, undefined);
    };
    LanguagesExtImpl.prototype.$resolveCodeLens = function (handle, resource, symbol, token) {
        return this.withAdapter(handle, lens_1.CodeLensAdapter, function (adapter) { return adapter.resolveCodeLens(vscode_uri_1.URI.revive(resource), symbol, token); }, undefined);
    };
    LanguagesExtImpl.prototype.$releaseCodeLenses = function (handle, ids) {
        var _this = this;
        this.withAdapter(handle, lens_1.CodeLensAdapter, function (adapter) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, adapter.releaseCodeLenses(ids)];
        }); }); }, undefined);
    };
    // ### Code Lens Provider end
    // ### Code Reference Provider begin
    LanguagesExtImpl.prototype.$provideReferences = function (handle, resource, position, context, token) {
        return this.withAdapter(handle, reference_1.ReferenceAdapter, function (adapter) { return adapter.provideReferences(vscode_uri_1.URI.revive(resource), position, context, token); }, undefined);
    };
    LanguagesExtImpl.prototype.registerReferenceProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new reference_1.ReferenceAdapter(provider, this.documents));
        this.proxy.$registerReferenceProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    // ### Code Reference Provider end
    // ### Document Symbol Provider begin
    LanguagesExtImpl.prototype.registerDocumentSymbolProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new outline_1.OutlineAdapter(this.documents, provider));
        this.proxy.$registerOutlineSupport(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideDocumentSymbols = function (handle, resource, token) {
        return this.withAdapter(handle, outline_1.OutlineAdapter, function (adapter) { return adapter.provideDocumentSymbols(vscode_uri_1.URI.revive(resource), token); }, undefined);
    };
    // ### Document Symbol Provider end
    // ### Color Provider begin
    LanguagesExtImpl.prototype.registerColorProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new color_1.ColorProviderAdapter(this.documents, provider));
        this.proxy.$registerDocumentColorProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideDocumentColors = function (handle, resource, token) {
        return this.withAdapter(handle, color_1.ColorProviderAdapter, function (adapter) { return adapter.provideColors(vscode_uri_1.URI.revive(resource), token); }, []);
    };
    LanguagesExtImpl.prototype.$provideColorPresentations = function (handle, resource, colorInfo, token) {
        return this.withAdapter(handle, color_1.ColorProviderAdapter, function (adapter) { return adapter.provideColorPresentations(vscode_uri_1.URI.revive(resource), colorInfo, token); }, []);
    };
    // ### Color Provider end
    // ### Folding Range Provider begin
    LanguagesExtImpl.prototype.registerFoldingRangeProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new folding_1.FoldingProviderAdapter(provider, this.documents));
        this.proxy.$registerFoldingRangeProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideFoldingRange = function (callId, resource, context, token) {
        return this.withAdapter(callId, folding_1.FoldingProviderAdapter, function (adapter) { return adapter.provideFoldingRanges(vscode_uri_1.URI.revive(resource), context, token); }, undefined);
    };
    // ### Folding Range Provider end
    LanguagesExtImpl.prototype.registerSelectionRangeProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new selection_range_1.SelectionRangeProviderAdapter(provider, this.documents));
        this.proxy.$registerSelectionRangeProvider(callId, pluginInfo, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideSelectionRanges = function (handle, resource, positions, token) {
        return this.withAdapter(handle, selection_range_1.SelectionRangeProviderAdapter, function (adapter) { return adapter.provideSelectionRanges(vscode_uri_1.URI.revive(resource), positions, token); }, []);
    };
    // ### Rename Provider begin
    LanguagesExtImpl.prototype.registerRenameProvider = function (selector, provider, pluginInfo) {
        var callId = this.addNewAdapter(new rename_1.RenameAdapter(provider, this.documents));
        this.proxy.$registerRenameProvider(callId, pluginInfo, this.transformDocumentSelector(selector), rename_1.RenameAdapter.supportsResolving(provider));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideRenameEdits = function (handle, resource, position, newName, token) {
        return this.withAdapter(handle, rename_1.RenameAdapter, function (adapter) { return adapter.provideRenameEdits(vscode_uri_1.URI.revive(resource), position, newName, token); }, undefined);
    };
    LanguagesExtImpl.prototype.$resolveRenameLocation = function (handle, resource, position, token) {
        return this.withAdapter(handle, rename_1.RenameAdapter, function (adapter) { return adapter.resolveRenameLocation(vscode_uri_1.URI.revive(resource), position, token); }, undefined);
    };
    // ### Rename Provider end
    // ### Call Hierarchy Provider begin
    LanguagesExtImpl.prototype.registerCallHierarchyProvider = function (selector, provider) {
        var callId = this.addNewAdapter(new call_hierarchy_1.CallHierarchyAdapter(provider, this.documents));
        this.proxy.$registerCallHierarchyProvider(callId, this.transformDocumentSelector(selector));
        return this.createDisposable(callId);
    };
    LanguagesExtImpl.prototype.$provideRootDefinition = function (handle, resource, location, token) {
        return this.withAdapter(handle, call_hierarchy_1.CallHierarchyAdapter, function (adapter) { return adapter.provideRootDefinition(vscode_uri_1.URI.revive(resource), location, token); }, undefined);
    };
    LanguagesExtImpl.prototype.$provideCallers = function (handle, definition, token) {
        return this.withAdapter(handle, call_hierarchy_1.CallHierarchyAdapter, function (adapter) { return adapter.provideCallers(definition, token); }, undefined);
    };
    return LanguagesExtImpl;
}());
exports.LanguagesExtImpl = LanguagesExtImpl;
function serializeEnterRules(rules) {
    if (typeof rules === 'undefined' || rules === null) {
        return undefined;
    }
    return rules.map(function (r) {
        return ({
            action: r.action,
            beforeText: serializeRegExp(r.beforeText),
            afterText: serializeRegExp(r.afterText)
        });
    });
}
function serializeRegExp(regexp) {
    if (typeof regexp === 'undefined' || regexp === null) {
        return undefined;
    }
    return {
        pattern: regexp.source,
        flags: (regexp.global ? 'g' : '') + (regexp.ignoreCase ? 'i' : '') + (regexp.multiline ? 'm' : '')
    };
}
function serializeIndentation(indentationRules) {
    if (typeof indentationRules === 'undefined' || indentationRules === null) {
        return undefined;
    }
    return {
        increaseIndentPattern: serializeRegExp(indentationRules.increaseIndentPattern),
        decreaseIndentPattern: serializeRegExp(indentationRules.decreaseIndentPattern),
        indentNextLinePattern: serializeRegExp(indentationRules.indentNextLinePattern),
        unIndentedLinePattern: serializeRegExp(indentationRules.unIndentedLinePattern)
    };
}
//# sourceMappingURL=languages.js.map