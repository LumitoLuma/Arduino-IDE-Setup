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
exports.ReferenceAdapter = void 0;
var Converter = require("../type-converters");
var util_1 = require("./util");
var ReferenceAdapter = /** @class */ (function () {
    function ReferenceAdapter(provider, documents) {
        this.provider = provider;
        this.documents = documents;
    }
    ReferenceAdapter.prototype.provideReferences = function (resource, position, context, token) {
        var documentData = this.documents.getDocumentData(resource);
        if (!documentData) {
            return Promise.reject(new Error("There is no document for " + resource));
        }
        var document = documentData.document;
        var zeroBasedPosition = Converter.toPosition(position);
        return Promise.resolve(this.provider.provideReferences(document, zeroBasedPosition, context, token)).then(function (reference) {
            var e_1, _a;
            if (!reference) {
                return undefined;
            }
            if (util_1.isLocationArray(reference)) {
                var locations = [];
                try {
                    for (var reference_1 = __values(reference), reference_1_1 = reference_1.next(); !reference_1_1.done; reference_1_1 = reference_1.next()) {
                        var location_1 = reference_1_1.value;
                        locations.push(Converter.fromLocation(location_1));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (reference_1_1 && !reference_1_1.done && (_a = reference_1.return)) _a.call(reference_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return locations;
            }
        });
    };
    return ReferenceAdapter;
}());
exports.ReferenceAdapter = ReferenceAdapter;
//# sourceMappingURL=reference.js.map