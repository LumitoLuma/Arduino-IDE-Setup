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
exports.LinkProviderAdapter = void 0;
var Converter = require("../type-converters");
var object_identifier_1 = require("../../common/object-identifier");
var LinkProviderAdapter = /** @class */ (function () {
    function LinkProviderAdapter(provider, documents) {
        this.provider = provider;
        this.documents = documents;
        this.cacheId = 0;
        this.cache = new Map();
    }
    LinkProviderAdapter.prototype.provideLinks = function (resource, token) {
        var _this = this;
        var document = this.documents.getDocumentData(resource);
        if (!document) {
            return Promise.reject(new Error("There is no document for " + resource));
        }
        var doc = document.document;
        return Promise.resolve(this.provider.provideDocumentLinks(doc, token)).then(function (links) {
            var e_1, _a;
            if (!Array.isArray(links)) {
                return undefined;
            }
            var result = [];
            try {
                for (var links_1 = __values(links), links_1_1 = links_1.next(); !links_1_1.done; links_1_1 = links_1.next()) {
                    var link = links_1_1.value;
                    var data = Converter.fromDocumentLink(link);
                    var id = _this.cacheId++;
                    object_identifier_1.ObjectIdentifier.mixin(data, id);
                    _this.cache.set(id, link);
                    result.push(data);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (links_1_1 && !links_1_1.done && (_a = links_1.return)) _a.call(links_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        });
    };
    LinkProviderAdapter.prototype.resolveLink = function (link, token) {
        if (typeof this.provider.resolveDocumentLink !== 'function') {
            return Promise.resolve(undefined);
        }
        var id = object_identifier_1.ObjectIdentifier.of(link);
        var item = this.cache.get(id);
        if (!item) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(this.provider.resolveDocumentLink(item, token)).then(function (value) {
            if (value) {
                return Converter.fromDocumentLink(value);
            }
            return undefined;
        });
    };
    LinkProviderAdapter.prototype.releaseDocumentLinks = function (ids) {
        var _this = this;
        ids.forEach(function (id) {
            _this.cache.delete(id);
        });
    };
    return LinkProviderAdapter;
}());
exports.LinkProviderAdapter = LinkProviderAdapter;
//# sourceMappingURL=link-provider.js.map