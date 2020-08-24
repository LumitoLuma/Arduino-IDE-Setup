"use strict";
/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionRangeProviderAdapter = void 0;
var Converter = require("../type-converters");
var SelectionRangeProviderAdapter = /** @class */ (function () {
    function SelectionRangeProviderAdapter(provider, documents) {
        this.provider = provider;
        this.documents = documents;
    }
    SelectionRangeProviderAdapter.prototype.provideSelectionRanges = function (resource, position, token) {
        var documentData = this.documents.getDocumentData(resource);
        if (!documentData) {
            return Promise.reject(new Error("There are no document for  " + resource));
        }
        var document = documentData.document;
        var positions = position.map(function (pos) { return Converter.toPosition(pos); });
        return Promise.resolve(this.provider.provideSelectionRanges(document, positions, token)).then(function (allProviderRanges) {
            if (!Array.isArray(allProviderRanges) || allProviderRanges.length === 0) {
                return [];
            }
            if (allProviderRanges.length !== positions.length) {
                return [];
            }
            var allResults = [];
            for (var i = 0; i < positions.length; i++) {
                var oneResult = [];
                allResults.push(oneResult);
                var last = positions[i];
                var selectionRange = allProviderRanges[i];
                while (true) {
                    if (!selectionRange.range.contains(last)) {
                        return Promise.reject(new Error('INVALID selection range, must contain the previous range'));
                    }
                    oneResult.push(Converter.fromSelectionRange(selectionRange));
                    if (!selectionRange.parent) {
                        break;
                    }
                    last = selectionRange.range;
                    selectionRange = selectionRange.parent;
                }
            }
            return allResults;
        });
    };
    return SelectionRangeProviderAdapter;
}());
exports.SelectionRangeProviderAdapter = SelectionRangeProviderAdapter;
//# sourceMappingURL=selection-range.js.map