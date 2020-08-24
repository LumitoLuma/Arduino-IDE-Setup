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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
/**
 * On POSIX:
 * ┌──────────────────────┬────────────┐
 * │          dir         │    base    │
 * ├──────┬               ├──────┬─────┤
 * │ root │               │ name │ ext │
 * "  /     home/user/dir / file  .txt "
 * └──────┴───────────────┴──────┴─────┘
 *
 * On Windows:
 * ┌──────────────────────┬────────────┐
 * │           dir        │    base    │
 * ├──────┬               ├──────┬─────┤
 * │ root │               │ name │ ext │
 * "  /c: / home/user/dir / file  .txt "
 * └──────┴───────────────┴──────┴─────┘
 */
var Path = /** @class */ (function () {
    /**
     * The raw should be normalized, meaning that only '/' is allowed as a path separator.
     */
    function Path(raw) {
        this.raw = Path.normalizeDrive(raw);
        var firstIndex = raw.indexOf(Path.separator);
        var lastIndex = raw.lastIndexOf(Path.separator);
        this.isAbsolute = firstIndex === 0;
        this.base = lastIndex === -1 ? raw : raw.substr(lastIndex + 1);
        this.isRoot = this.isAbsolute && firstIndex === lastIndex && (!this.base || Path.isDrive(this.base));
        this.root = this.computeRoot();
        var extIndex = this.base.lastIndexOf('.');
        this.name = extIndex === -1 ? this.base : this.base.substr(0, extIndex);
        this.ext = extIndex === -1 ? '' : this.base.substr(extIndex);
    }
    Path.isDrive = function (segment) {
        return segment.endsWith(':');
    };
    /**
     * vscode-uri always normalizes drive letters to lower case:
     * https://github.com/Microsoft/vscode-uri/blob/b1d3221579f97f28a839b6f996d76fc45e9964d8/src/index.ts#L1025
     * Theia path should be adjusted to this.
     */
    Path.normalizeDrive = function (path) {
        // lower-case windows drive letters in /C:/fff or C:/fff
        if (path.length >= 3 && path.charCodeAt(0) === 47 /* '/' */ && path.charCodeAt(2) === 58 /* ':' */) {
            var code = path.charCodeAt(1);
            if (code >= 65 /* A */ && code <= 90 /* Z */) {
                path = "/" + String.fromCharCode(code + 32) + ":" + path.substr(3); // "/c:".length === 3
            }
        }
        else if (path.length >= 2 && path.charCodeAt(1) === 58 /* ':' */) {
            var code = path.charCodeAt(0);
            if (code >= 65 /* A */ && code <= 90 /* Z */) {
                path = String.fromCharCode(code + 32) + ":" + path.substr(2); // "/c:".length === 3
            }
        }
        return path;
    };
    Path.prototype.computeRoot = function () {
        // '/' -> '/'
        // '/c:' -> '/c:'
        if (this.isRoot) {
            return this;
        }
        // 'foo/bar' -> `undefined`
        if (!this.isAbsolute) {
            return undefined;
        }
        var index = this.raw.indexOf(Path.separator, Path.separator.length);
        if (index === -1) {
            // '/foo/bar' -> '/'
            return new Path(Path.separator);
        }
        // '/c:/foo/bar' -> '/c:'
        // '/foo/bar' -> '/'
        return new Path(this.raw.substr(0, index)).root;
    };
    Object.defineProperty(Path.prototype, "dir", {
        /**
         * Returns the parent directory if it exists (`hasDir === true`) or `this` otherwise.
         */
        get: function () {
            if (this._dir === undefined) {
                this._dir = this.computeDir();
            }
            return this._dir;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Path.prototype, "hasDir", {
        /**
         * Returns `true` if this has a parent directory, `false` otherwise.
         *
         * _This implementation returns `true` if and only if this is not the root dir and
         * there is a path separator in the raw path._
         */
        get: function () {
            return !this.isRoot && this.raw.lastIndexOf(Path.separator) !== -1;
        },
        enumerable: false,
        configurable: true
    });
    Path.prototype.computeDir = function () {
        if (!this.hasDir) {
            return this;
        }
        var lastIndex = this.raw.lastIndexOf(Path.separator);
        if (this.isAbsolute) {
            var firstIndex = this.raw.indexOf(Path.separator);
            if (firstIndex === lastIndex) {
                return new Path(this.raw.substr(0, firstIndex + 1));
            }
        }
        return new Path(this.raw.substr(0, lastIndex));
    };
    Path.prototype.join = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        var relativePath = paths.filter(function (s) { return !!s; }).join(Path.separator);
        if (!relativePath) {
            return this;
        }
        if (this.raw.endsWith(Path.separator)) {
            return new Path(this.raw + relativePath);
        }
        return new Path(this.raw + Path.separator + relativePath);
    };
    Path.prototype.toString = function () {
        return this.raw;
    };
    Path.prototype.relative = function (path) {
        if (this.raw === path.raw) {
            return new Path('');
        }
        if (!this.raw || !path.raw) {
            return undefined;
        }
        var raw = this.base ? this.raw + Path.separator : this.raw;
        if (!path.raw.startsWith(raw)) {
            return undefined;
        }
        var relativePath = path.raw.substr(raw.length);
        return new Path(relativePath);
    };
    Path.prototype.isEqualOrParent = function (path) {
        return !!this.relative(path);
    };
    Path.prototype.relativity = function (path) {
        var relative = this.relative(path);
        if (relative) {
            var relativeStr = relative.toString();
            if (relativeStr === '') {
                return 0;
            }
            return relativeStr.split(Path.separator).length;
        }
        return -1;
    };
    /*
     * return a normalized Path, resolving '..' and '.' segments
     */
    Path.prototype.normalize = function () {
        var _this = this;
        var trailingSlash = this.raw.endsWith('/');
        var pathArray = this.toString().split('/');
        var resultArray = [];
        pathArray.forEach(function (value, index) {
            if (!value || value === '.') {
                return;
            }
            if (value === '..') {
                if (resultArray.length && resultArray[resultArray.length - 1] !== '..') {
                    resultArray.pop();
                }
                else if (!_this.isAbsolute) {
                    resultArray.push('..');
                }
            }
            else {
                resultArray.push(value);
            }
        });
        if (resultArray.length === 0) {
            if (this.isRoot) {
                return new Path('/');
            }
            else {
                return new Path('.');
            }
        }
        return new Path((this.isAbsolute ? '/' : '') + resultArray.join('/') + (trailingSlash ? '/' : ''));
    };
    Path.separator = '/';
    return Path;
}());
exports.Path = Path;
//# sourceMappingURL=path.js.map