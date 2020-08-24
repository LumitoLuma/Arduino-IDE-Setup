"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_uri_1 = require("vscode-uri");
var path_1 = require("./path");
var URI = /** @class */ (function () {
    function URI(uri) {
        if (uri === void 0) { uri = ''; }
        if (uri instanceof vscode_uri_1.URI) {
            this.codeUri = uri;
        }
        else {
            this.codeUri = vscode_uri_1.URI.parse(uri);
        }
    }
    Object.defineProperty(URI.prototype, "displayName", {
        /**
         * TODO move implementation to `DefaultUriLabelProviderContribution.getName`
         *
         * @deprecated use `LabelProvider.getName` instead
         */
        get: function () {
            var base = this.path.base;
            if (base) {
                return base;
            }
            if (this.path.isRoot) {
                return this.path.toString();
            }
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "allLocations", {
        /**
         * Return all uri from the current to the top most.
         */
        get: function () {
            var locations = [];
            var location = this;
            while (!location.path.isRoot && location.path.hasDir) {
                locations.push(location);
                location = location.parent;
            }
            locations.push(location);
            return locations;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "parent", {
        get: function () {
            if (this.path.isRoot) {
                return this;
            }
            return this.withPath(this.path.dir);
        },
        enumerable: false,
        configurable: true
    });
    URI.prototype.relative = function (uri) {
        if (this.authority !== uri.authority || this.scheme !== uri.scheme) {
            return undefined;
        }
        return this.path.relative(uri.path);
    };
    URI.prototype.resolve = function (path) {
        return this.withPath(this.path.join(path.toString()));
    };
    /**
     * return a new URI replacing the current with the given scheme
     */
    URI.prototype.withScheme = function (scheme) {
        var newCodeUri = vscode_uri_1.URI.from(__assign(__assign({}, this.codeUri.toJSON()), { scheme: scheme }));
        return new URI(newCodeUri);
    };
    /**
     * return a new URI replacing the current with the given authority
     */
    URI.prototype.withAuthority = function (authority) {
        var newCodeUri = vscode_uri_1.URI.from(__assign(__assign({}, this.codeUri.toJSON()), { scheme: this.codeUri.scheme, authority: authority }));
        return new URI(newCodeUri);
    };
    /**
     * return this URI without a authority
     */
    URI.prototype.withoutAuthority = function () {
        return this.withAuthority('');
    };
    /**
     * return a new URI replacing the current with the given path
     */
    URI.prototype.withPath = function (path) {
        var newCodeUri = vscode_uri_1.URI.from(__assign(__assign({}, this.codeUri.toJSON()), { scheme: this.codeUri.scheme, path: path.toString() }));
        return new URI(newCodeUri);
    };
    /**
     * return this URI without a path
     */
    URI.prototype.withoutPath = function () {
        return this.withPath('');
    };
    /**
     * return a new URI replacing the current with the given query
     */
    URI.prototype.withQuery = function (query) {
        var newCodeUri = vscode_uri_1.URI.from(__assign(__assign({}, this.codeUri.toJSON()), { scheme: this.codeUri.scheme, query: query }));
        return new URI(newCodeUri);
    };
    /**
     * return this URI without a query
     */
    URI.prototype.withoutQuery = function () {
        return this.withQuery('');
    };
    /**
     * return a new URI replacing the current with the given fragment
     */
    URI.prototype.withFragment = function (fragment) {
        var newCodeUri = vscode_uri_1.URI.from(__assign(__assign({}, this.codeUri.toJSON()), { scheme: this.codeUri.scheme, fragment: fragment }));
        return new URI(newCodeUri);
    };
    /**
     * return this URI without a fragment
     */
    URI.prototype.withoutFragment = function () {
        return this.withFragment('');
    };
    /**
     * return a new URI replacing the current with its normalized path, resolving '..' and '.' segments
     */
    URI.prototype.normalizePath = function () {
        return this.withPath(this.path.normalize());
    };
    Object.defineProperty(URI.prototype, "scheme", {
        get: function () {
            return this.codeUri.scheme;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "authority", {
        get: function () {
            return this.codeUri.authority;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "path", {
        get: function () {
            if (this._path === undefined) {
                this._path = new path_1.Path(this.codeUri.path);
            }
            return this._path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "query", {
        get: function () {
            return this.codeUri.query;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "fragment", {
        get: function () {
            return this.codeUri.fragment;
        },
        enumerable: false,
        configurable: true
    });
    URI.prototype.toString = function (skipEncoding) {
        return this.codeUri.toString(skipEncoding);
    };
    URI.prototype.isEqualOrParent = function (uri) {
        return this.authority === uri.authority && this.scheme === uri.scheme && this.path.isEqualOrParent(uri.path);
    };
    URI.getDistinctParents = function (uris) {
        var result = [];
        uris.forEach(function (uri, i) {
            if (!uris.some(function (otherUri, index) { return index !== i && otherUri.isEqualOrParent(uri); })) {
                result.push(uri);
            }
        });
        return result;
    };
    return URI;
}());
exports.default = URI;
//# sourceMappingURL=uri.js.map