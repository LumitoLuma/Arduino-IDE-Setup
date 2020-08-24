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
exports.CodeActionAdapter = void 0;
var Converter = require("../type-converters");
var types_impl_1 = require("../types-impl");
var disposable_1 = require("@theia/core/lib/common/disposable");
var CodeActionAdapter = /** @class */ (function () {
    function CodeActionAdapter(provider, document, diagnostics, pluginId, commands) {
        this.provider = provider;
        this.document = document;
        this.diagnostics = diagnostics;
        this.pluginId = pluginId;
        this.commands = commands;
    }
    CodeActionAdapter.prototype.provideCodeAction = function (resource, rangeOrSelection, context, token) {
        return __awaiter(this, void 0, void 0, function () {
            var document, doc, ran, allDiagnostics, _a, _b, diagnostic, codeActionContext, commandsOrActions, toDispose, result, commandsOrActions_1, commandsOrActions_1_1, candidate;
            var e_1, _c, e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        document = this.document.getDocumentData(resource);
                        if (!document) {
                            return [2 /*return*/, Promise.reject(new Error("There are no document for " + resource))];
                        }
                        doc = document.document;
                        ran = CodeActionAdapter._isSelection(rangeOrSelection)
                            ? Converter.toSelection(rangeOrSelection)
                            : Converter.toRange(rangeOrSelection);
                        allDiagnostics = [];
                        try {
                            for (_a = __values(this.diagnostics.getDiagnostics(resource)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                diagnostic = _b.value;
                                if (ran.intersection(diagnostic.range)) {
                                    allDiagnostics.push(diagnostic);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        codeActionContext = {
                            diagnostics: allDiagnostics,
                            only: context.only ? new types_impl_1.CodeActionKind(context.only) : undefined
                        };
                        return [4 /*yield*/, this.provider.provideCodeActions(doc, ran, codeActionContext, token)];
                    case 1:
                        commandsOrActions = _e.sent();
                        if (!Array.isArray(commandsOrActions) || commandsOrActions.length === 0) {
                            return [2 /*return*/, undefined];
                        }
                        toDispose = new disposable_1.DisposableCollection();
                        result = [];
                        try {
                            for (commandsOrActions_1 = __values(commandsOrActions), commandsOrActions_1_1 = commandsOrActions_1.next(); !commandsOrActions_1_1.done; commandsOrActions_1_1 = commandsOrActions_1.next()) {
                                candidate = commandsOrActions_1_1.value;
                                if (!candidate) {
                                    continue;
                                }
                                if (CodeActionAdapter._isCommand(candidate)) {
                                    result.push({
                                        title: candidate.title || '',
                                        command: this.commands.converter.toSafeCommand(candidate, toDispose)
                                    });
                                }
                                else {
                                    if (codeActionContext.only) {
                                        if (!candidate.kind) {
                                            /* eslint-disable-next-line max-len */
                                            console.warn(this.pluginId + " - Code actions of kind '" + codeActionContext.only.value + "' requested but returned code action does not have a 'kind'. Code action will be dropped. Please set 'CodeAction.kind'.");
                                        }
                                        else if (!codeActionContext.only.contains(candidate.kind)) {
                                            /* eslint-disable-next-line max-len */
                                            console.warn(this.pluginId + " - Code actions of kind '" + codeActionContext.only.value + "' requested but returned code action is of kind '" + candidate.kind.value + "'. Code action will be dropped. Please check 'CodeActionContext.only' to only return requested code action.");
                                        }
                                    }
                                    result.push({
                                        title: candidate.title,
                                        command: this.commands.converter.toSafeCommand(candidate.command, toDispose),
                                        diagnostics: candidate.diagnostics && candidate.diagnostics.map(Converter.convertDiagnosticToMarkerData),
                                        edit: candidate.edit && Converter.fromWorkspaceEdit(candidate.edit),
                                        kind: candidate.kind && candidate.kind.value
                                    });
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (commandsOrActions_1_1 && !commandsOrActions_1_1.done && (_d = commandsOrActions_1.return)) _d.call(commandsOrActions_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CodeActionAdapter._isCommand = function (smth) {
        return typeof smth.command === 'string' || typeof smth.id === 'string';
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CodeActionAdapter._isSelection = function (obj) {
        return (obj
            && (typeof obj.selectionStartLineNumber === 'number')
            && (typeof obj.selectionStartColumn === 'number')
            && (typeof obj.positionLineNumber === 'number')
            && (typeof obj.positionColumn === 'number'));
    };
    return CodeActionAdapter;
}());
exports.CodeActionAdapter = CodeActionAdapter;
//# sourceMappingURL=code-action.js.map