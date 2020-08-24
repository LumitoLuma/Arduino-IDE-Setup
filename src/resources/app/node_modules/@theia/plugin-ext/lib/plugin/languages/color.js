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
exports.ColorProviderAdapter = void 0;
var Converter = require("../type-converters");
var ColorProviderAdapter = /** @class */ (function () {
    function ColorProviderAdapter(documents, provider) {
        this.documents = documents;
        this.provider = provider;
    }
    ColorProviderAdapter.prototype.provideColors = function (resource, token) {
        var document = this.documents.getDocumentData(resource);
        if (!document) {
            return Promise.reject(new Error("There are no document for " + resource));
        }
        var doc = document.document;
        return Promise.resolve(this.provider.provideDocumentColors(doc, token)).then(function (colors) {
            if (!Array.isArray(colors)) {
                return [];
            }
            var colorInfos = colors.map(function (colorInfo) { return ({
                color: Converter.fromColor(colorInfo.color),
                range: Converter.fromRange(colorInfo.range)
            }); });
            return colorInfos;
        });
    };
    ColorProviderAdapter.prototype.provideColorPresentations = function (resource, raw, token) {
        var document = this.documents.getDocumentData(resource);
        if (!document) {
            return Promise.reject(new Error("There are no document for " + resource));
        }
        var doc = document.document;
        var range = Converter.toRange(raw.range);
        var color = Converter.toColor(raw.color);
        return Promise.resolve(this.provider.provideColorPresentations(color, { document: doc, range: range }, token)).then(function (value) {
            if (!Array.isArray(value)) {
                return [];
            }
            return value.map(Converter.fromColorPresentation);
        });
    };
    return ColorProviderAdapter;
}());
exports.ColorProviderAdapter = ColorProviderAdapter;
//# sourceMappingURL=color.js.map