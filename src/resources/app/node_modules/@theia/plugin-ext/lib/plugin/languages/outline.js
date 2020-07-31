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
var Converter = require("../type-converters");
var types = require("../types-impl");
/** Adapts the calls from main to extension thread for providing the document symbols. */
var OutlineAdapter = /** @class */ (function () {
    function OutlineAdapter(documents, provider) {
        this.documents = documents;
        this.provider = provider;
    }
    OutlineAdapter.prototype.provideDocumentSymbols = function (resource, token) {
        var document = this.documents.getDocumentData(resource);
        if (!document) {
            return Promise.reject(new Error("There is no document for " + resource));
        }
        var doc = document.document;
        return Promise.resolve(this.provider.provideDocumentSymbols(doc, token)).then(function (value) {
            if (!value || value.length === 0) {
                return undefined;
            }
            if (value[0] instanceof types.DocumentSymbol) {
                return value.map(Converter.fromDocumentSymbol);
            }
            else {
                return OutlineAdapter.asDocumentSymbolTree(resource, value);
            }
        });
    };
    OutlineAdapter.asDocumentSymbolTree = function (resource, info) {
        // first sort by start (and end) and then loop over all elements
        // and build a tree based on containment.
        info = info.slice(0).sort(function (a, b) {
            var r = a.location.range.start.compareTo(b.location.range.start);
            if (r === 0) {
                r = b.location.range.end.compareTo(a.location.range.end);
            }
            return r;
        });
        var res = [];
        var parentStack = [];
        for (var i = 0; i < info.length; i++) {
            var element = {
                name: info[i].name,
                detail: '',
                kind: Converter.SymbolKind.fromSymbolKind(info[i].kind),
                containerName: info[i].containerName,
                range: Converter.fromRange(info[i].location.range),
                selectionRange: Converter.fromRange(info[i].location.range),
                children: []
            };
            while (true) {
                if (parentStack.length === 0) {
                    parentStack.push(element);
                    res.push(element);
                    break;
                }
                var parent_1 = parentStack[parentStack.length - 1];
                if (OutlineAdapter.containsRange(parent_1.range, element.range) && !OutlineAdapter.equalsRange(parent_1.range, element.range)) {
                    parent_1.children.push(element);
                    parentStack.push(element);
                    break;
                }
                parentStack.pop();
            }
        }
        return res;
    };
    /**
     * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
     */
    OutlineAdapter.containsRange = function (range, otherRange) {
        if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
            return false;
        }
        if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
            return false;
        }
        if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn < range.startColumn) {
            return false;
        }
        if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn > range.endColumn) {
            return false;
        }
        return true;
    };
    /**
     * Test if range `a` equals `b`.
     */
    OutlineAdapter.equalsRange = function (a, b) {
        return (!!a &&
            !!b &&
            a.startLineNumber === b.startLineNumber &&
            a.startColumn === b.startColumn &&
            a.endLineNumber === b.endLineNumber &&
            a.endColumn === b.endColumn);
    };
    return OutlineAdapter;
}());
exports.OutlineAdapter = OutlineAdapter;
//# sourceMappingURL=outline.js.map