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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.SignatureHelpAdapter = void 0;
var Converter = require("../type-converters");
var SignatureHelpAdapter = /** @class */ (function () {
    function SignatureHelpAdapter(delegate, documents) {
        this.delegate = delegate;
        this.documents = documents;
        this.idSequence = 1;
        this.cache = new Map();
    }
    SignatureHelpAdapter.prototype.provideSignatureHelp = function (resource, position, token, context) {
        return __awaiter(this, void 0, void 0, function () {
            var documentData, document, zeroBasedPosition, pluginHelpContext, value, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        documentData = this.documents.getDocumentData(resource);
                        if (!documentData) {
                            return [2 /*return*/, Promise.reject(new Error("There are no document for  " + resource))];
                        }
                        document = documentData.document;
                        zeroBasedPosition = Converter.toPosition(position);
                        pluginHelpContext = this.reviveContext(context);
                        return [4 /*yield*/, this.delegate.provideSignatureHelp(document, zeroBasedPosition, token, pluginHelpContext)];
                    case 1:
                        value = _a.sent();
                        if (!value) {
                            return [2 /*return*/, undefined];
                        }
                        id = this.idSequence++;
                        this.cache.set(id, value);
                        return [2 /*return*/, Converter.SignatureHelp.from(id, value)];
                }
            });
        });
    };
    SignatureHelpAdapter.prototype.reviveContext = function (context) {
        var activeSignatureHelp = undefined;
        if (context.activeSignatureHelp) {
            var revivedSignatureHelp = Converter.SignatureHelp.to(context.activeSignatureHelp);
            var saved = typeof context.activeSignatureHelp.id === 'number' && this.cache.get(context.activeSignatureHelp.id);
            if (saved) {
                activeSignatureHelp = saved;
                activeSignatureHelp.activeSignature = revivedSignatureHelp.activeSignature;
                activeSignatureHelp.activeParameter = revivedSignatureHelp.activeParameter;
            }
            else {
                activeSignatureHelp = revivedSignatureHelp;
            }
        }
        return __assign(__assign({}, context), { activeSignatureHelp: activeSignatureHelp });
    };
    SignatureHelpAdapter.prototype.releaseSignatureHelp = function (id) {
        this.cache.delete(id);
    };
    return SignatureHelpAdapter;
}());
exports.SignatureHelpAdapter = SignatureHelpAdapter;
//# sourceMappingURL=signature.js.map