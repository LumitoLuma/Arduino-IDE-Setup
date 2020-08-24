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
exports.DocumentHighlightAdapter = void 0;
var types = require("../types-impl");
var Converter = require("../type-converters");
var DocumentHighlightAdapter = /** @class */ (function () {
    function DocumentHighlightAdapter(provider, documents) {
        this.provider = provider;
        this.documents = documents;
    }
    DocumentHighlightAdapter.prototype.provideDocumentHighlights = function (resource, position, token) {
        var _this = this;
        var documentData = this.documents.getDocumentData(resource);
        if (!documentData) {
            return Promise.reject(new Error("There is no document for " + resource));
        }
        var document = documentData.document;
        var zeroBasedPosition = Converter.toPosition(position);
        return Promise.resolve(this.provider.provideDocumentHighlights(document, zeroBasedPosition, token)).then(function (documentHighlights) {
            var e_1, _a;
            if (!documentHighlights) {
                return undefined;
            }
            if (_this.isDocumentHighlightArray(documentHighlights)) {
                var highlights = [];
                try {
                    for (var documentHighlights_1 = __values(documentHighlights), documentHighlights_1_1 = documentHighlights_1.next(); !documentHighlights_1_1.done; documentHighlights_1_1 = documentHighlights_1.next()) {
                        var highlight = documentHighlights_1_1.value;
                        highlights.push(Converter.fromDocumentHighlight(highlight));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (documentHighlights_1_1 && !documentHighlights_1_1.done && (_a = documentHighlights_1.return)) _a.call(documentHighlights_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return highlights;
            }
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DocumentHighlightAdapter.prototype.isDocumentHighlightArray = function (array) {
        return Array.isArray(array) && array.length > 0 && array[0] instanceof types.DocumentHighlight;
    };
    return DocumentHighlightAdapter;
}());
exports.DocumentHighlightAdapter = DocumentHighlightAdapter;
//# sourceMappingURL=document-highlight.js.map