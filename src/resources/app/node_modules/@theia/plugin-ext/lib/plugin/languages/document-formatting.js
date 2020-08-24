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
exports.DocumentFormattingAdapter = void 0;
var Converter = require("../type-converters");
var DocumentFormattingAdapter = /** @class */ (function () {
    function DocumentFormattingAdapter(provider, documents) {
        this.provider = provider;
        this.documents = documents;
    }
    DocumentFormattingAdapter.prototype.provideDocumentFormattingEdits = function (resource, options, token) {
        var document = this.documents.getDocumentData(resource);
        if (!document) {
            return Promise.reject(new Error("There are no document for " + resource));
        }
        var doc = document.document;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Promise.resolve(this.provider.provideDocumentFormattingEdits(doc, options, token)).then(function (value) {
            if (Array.isArray(value)) {
                return value.map(Converter.fromTextEdit);
            }
            return undefined;
        });
    };
    return DocumentFormattingAdapter;
}());
exports.DocumentFormattingAdapter = DocumentFormattingAdapter;
//# sourceMappingURL=document-formatting.js.map