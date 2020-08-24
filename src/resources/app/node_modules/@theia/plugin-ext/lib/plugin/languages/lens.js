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
exports.CodeLensAdapter = void 0;
var Converter = require("../type-converters");
var object_identifier_1 = require("../../common/object-identifier");
var disposable_1 = require("@theia/core/lib/common/disposable");
/** Adapts the calls from main to extension thread for providing/resolving the code lenses. */
var CodeLensAdapter = /** @class */ (function () {
    function CodeLensAdapter(provider, documents, commands) {
        this.provider = provider;
        this.documents = documents;
        this.commands = commands;
        this.cacheId = 0;
        this.cache = new Map();
        this.disposables = new Map();
    }
    CodeLensAdapter.prototype.provideCodeLenses = function (resource, token) {
        var _this = this;
        var document = this.documents.getDocumentData(resource);
        if (!document) {
            return Promise.reject(new Error("There is no document for " + resource));
        }
        var doc = document.document;
        return Promise.resolve(this.provider.provideCodeLenses(doc, token)).then(function (lenses) {
            if (Array.isArray(lenses)) {
                return lenses.map(function (lens) {
                    var cacheId = _this.cacheId++;
                    var toDispose = new disposable_1.DisposableCollection();
                    var lensSymbol = object_identifier_1.ObjectIdentifier.mixin({
                        range: Converter.fromRange(lens.range),
                        command: _this.commands.converter.toSafeCommand(lens.command, toDispose)
                    }, cacheId);
                    _this.cache.set(cacheId, lens);
                    _this.disposables.set(cacheId, toDispose);
                    return lensSymbol;
                });
            }
            return undefined;
        });
    };
    CodeLensAdapter.prototype.resolveCodeLens = function (resource, symbol, token) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheId, lens, newLens, disposables;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheId = object_identifier_1.ObjectIdentifier.of(symbol);
                        lens = this.cache.get(cacheId);
                        if (!lens) {
                            return [2 /*return*/, undefined];
                        }
                        if (!(typeof this.provider.resolveCodeLens === 'function' && !lens.isResolved)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.provider.resolveCodeLens(lens, token)];
                    case 1:
                        newLens = _a.sent();
                        if (token.isCancellationRequested) {
                            return [2 /*return*/, undefined];
                        }
                        _a.label = 2;
                    case 2:
                        newLens = newLens || lens;
                        disposables = this.disposables.get(cacheId);
                        if (!disposables) {
                            // already been disposed of
                            return [2 /*return*/, undefined];
                        }
                        symbol.command = this.commands.converter.toSafeCommand(newLens.command ? newLens.command : CodeLensAdapter.BAD_CMD, disposables);
                        return [2 /*return*/, symbol];
                }
            });
        });
    };
    CodeLensAdapter.prototype.releaseCodeLenses = function (ids) {
        var _this = this;
        ids.forEach(function (id) {
            _this.cache.delete(id);
            var toDispose = _this.disposables.get(id);
            if (toDispose) {
                toDispose.dispose();
                _this.disposables.delete(id);
            }
        });
    };
    CodeLensAdapter.BAD_CMD = { command: 'missing', title: '<<MISSING COMMAND>>' };
    return CodeLensAdapter;
}());
exports.CodeLensAdapter = CodeLensAdapter;
//# sourceMappingURL=lens.js.map