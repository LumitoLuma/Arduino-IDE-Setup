"use strict";
/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
exports.DeclarationAdapter = void 0;
var types = require("../types-impl");
var Converter = require("../type-converters");
var util_1 = require("./util");
var DeclarationAdapter = /** @class */ (function () {
    function DeclarationAdapter(provider, documents) {
        this.provider = provider;
        this.documents = documents;
    }
    DeclarationAdapter.prototype.provideDeclaration = function (resource, position, token) {
        var documentData = this.documents.getDocumentData(resource);
        if (!documentData) {
            return Promise.reject(new Error("There is no document for " + resource));
        }
        var document = documentData.document;
        var zeroBasedPosition = Converter.toPosition(position);
        return Promise.resolve(this.provider.provideDeclaration(document, zeroBasedPosition, token)).then(function (definition) {
            var e_1, _a, e_2, _b;
            if (!definition) {
                return undefined;
            }
            if (definition instanceof types.Location) {
                return Converter.fromLocation(definition);
            }
            if (util_1.isLocationArray(definition)) {
                var locations = [];
                try {
                    for (var definition_1 = __values(definition), definition_1_1 = definition_1.next(); !definition_1_1.done; definition_1_1 = definition_1.next()) {
                        var location_1 = definition_1_1.value;
                        locations.push(Converter.fromLocation(location_1));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (definition_1_1 && !definition_1_1.done && (_a = definition_1.return)) _a.call(definition_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return locations;
            }
            if (util_1.isDefinitionLinkArray(definition)) {
                var definitionLinks = [];
                try {
                    for (var definition_2 = __values(definition), definition_2_1 = definition_2.next(); !definition_2_1.done; definition_2_1 = definition_2.next()) {
                        var definitionLink = definition_2_1.value;
                        definitionLinks.push(Converter.fromDefinitionLink(definitionLink));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (definition_2_1 && !definition_2_1.done && (_b = definition_2.return)) _b.call(definition_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return definitionLinks;
            }
        });
    };
    return DeclarationAdapter;
}());
exports.DeclarationAdapter = DeclarationAdapter;
//# sourceMappingURL=declaration.js.map