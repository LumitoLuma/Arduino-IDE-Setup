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
// copied from https://github.com/Microsoft/vscode/blob/bf7ac9201e7a7d01741d4e6e64b5dc9f3197d97b/src/vs/base/common/paths.ts
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable no-void */
/* eslint-disable no-null/no-null */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("@theia/core/lib/common/os");
var strings_1 = require("./strings");
/**
 * The forward slash path separator.
 */
exports.sep = '/';
/**
 * The native path separator depending on the OS.
 */
exports.nativeSep = os_1.isWindows ? '\\' : '/';
var _posixBadPath = /(\/\.\.?\/)|(\/\.\.?)$|^(\.\.?\/)|(\/\/+)|(\\)/;
var _winBadPath = /(\\\.\.?\\)|(\\\.\.?)$|^(\.\.?\\)|(\\\\+)|(\/)/;
function _isNormal(path, win) {
    return win
        ? !_winBadPath.test(path)
        : !_posixBadPath.test(path);
}
/**
 * @returns the base name of a path.
 */
function basename(path) {
    var idx = ~path.lastIndexOf('/') || ~path.lastIndexOf('\\');
    if (idx === 0) {
        return path;
    }
    else if (~idx === path.length - 1) {
        return basename(path.substring(0, path.length - 1));
    }
    else {
        return path.substr(~idx + 1);
    }
}
exports.basename = basename;
/**
 * @returns `.far` from `boo.far` or the empty string.
 */
function extname(path) {
    path = basename(path);
    var idx = ~path.lastIndexOf('.');
    return idx ? path.substring(~idx) : '';
}
exports.extname = extname;
function normalize(path, toOSPath) {
    if (path === null || path === void 0) {
        return path;
    }
    var len = path.length;
    if (len === 0) {
        return '.';
    }
    var wantsBackslash = os_1.isWindows && toOSPath;
    if (_isNormal(path, wantsBackslash)) {
        return path;
    }
    // eslint-disable-next-line no-shadow
    var sep = wantsBackslash ? '\\' : '/';
    var root = getRoot(path, sep);
    // skip the root-portion of the path
    var start = root.length;
    var skip = false;
    var res = '';
    for (var end = root.length; end <= len; end++) {
        // either at the end or at a path-separator character
        if (end === len || path.charCodeAt(end) === 47 /* Slash */ || path.charCodeAt(end) === 92 /* Backslash */) {
            if (streql(path, start, end, '..')) {
                // skip current and remove parent (if there is already something)
                var prev_start = res.lastIndexOf(sep);
                var prev_part = res.slice(prev_start + 1);
                if ((root || prev_part.length > 0) && prev_part !== '..') {
                    res = prev_start === -1 ? '' : res.slice(0, prev_start);
                    skip = true;
                }
            }
            else if (streql(path, start, end, '.') && (root || res || end < len - 1)) {
                // skip current (if there is already something or if there is more to come)
                skip = true;
            }
            if (!skip) {
                var part = path.slice(start, end);
                if (res !== '' && res[res.length - 1] !== sep) {
                    res += sep;
                }
                res += part;
            }
            start = end + 1;
            skip = false;
        }
    }
    return root + res;
}
exports.normalize = normalize;
function streql(value, start, end, other) {
    return start + other.length === end && value.indexOf(other, start) === start;
}
/**
 * Computes the _root_ this path, like `getRoot('c:\files') === c:\`,
 * `getRoot('files:///files/path') === files:///`,
 * or `getRoot('\\server\shares\path') === \\server\shares\`
 */
// eslint-disable-next-line no-shadow
function getRoot(path, sep) {
    if (sep === void 0) { sep = '/'; }
    if (!path) {
        return '';
    }
    var len = path.length;
    var code = path.charCodeAt(0);
    if (code === 47 /* Slash */ || code === 92 /* Backslash */) {
        code = path.charCodeAt(1);
        if (code === 47 /* Slash */ || code === 92 /* Backslash */) {
            // UNC candidate \\localhost\shares\ddd
            //               ^^^^^^^^^^^^^^^^^^^
            code = path.charCodeAt(2);
            if (code !== 47 /* Slash */ && code !== 92 /* Backslash */) {
                // eslint-disable-next-line no-shadow
                var pos_1 = 3;
                var start = pos_1;
                for (; pos_1 < len; pos_1++) {
                    code = path.charCodeAt(pos_1);
                    if (code === 47 /* Slash */ || code === 92 /* Backslash */) {
                        break;
                    }
                }
                code = path.charCodeAt(pos_1 + 1);
                if (start !== pos_1 && code !== 47 /* Slash */ && code !== 92 /* Backslash */) {
                    pos_1 += 1;
                    for (; pos_1 < len; pos_1++) {
                        code = path.charCodeAt(pos_1);
                        if (code === 47 /* Slash */ || code === 92 /* Backslash */) {
                            return path.slice(0, pos_1 + 1) // consume this separator
                                .replace(/[\\/]/g, sep);
                        }
                    }
                }
            }
        }
        // /user/far
        // ^
        return sep;
    }
    else if ((code >= 65 /* A */ && code <= 90 /* Z */) || (code >= 97 /* a */ && code <= 122 /* z */)) {
        // check for windows drive letter c:\ or c:
        if (path.charCodeAt(1) === 58 /* Colon */) {
            code = path.charCodeAt(2);
            if (code === 47 /* Slash */ || code === 92 /* Backslash */) {
                // C:\fff
                // ^^^
                return path.slice(0, 2) + sep;
            }
            else {
                // C:
                // ^^
                return path.slice(0, 2);
            }
        }
    }
    // check for URI
    // scheme://authority/path
    // ^^^^^^^^^^^^^^^^^^^
    var pos = path.indexOf('://');
    if (pos !== -1) {
        pos += 3; // 3 -> "://".length
        for (; pos < len; pos++) {
            code = path.charCodeAt(pos);
            if (code === 47 /* Slash */ || code === 92 /* Backslash */) {
                return path.slice(0, pos + 1); // consume this separator
            }
        }
    }
    return '';
}
exports.getRoot = getRoot;
function isEqualOrParent(path, candidate, ignoreCase) {
    if (path === candidate) {
        return true;
    }
    if (!path || !candidate) {
        return false;
    }
    if (candidate.length > path.length) {
        return false;
    }
    if (ignoreCase) {
        var beginsWith = strings_1.startsWithIgnoreCase(path, candidate);
        if (!beginsWith) {
            return false;
        }
        if (candidate.length === path.length) {
            return true; // same path, different casing
        }
        var sepOffset = candidate.length;
        if (candidate.charAt(candidate.length - 1) === exports.nativeSep) {
            sepOffset--; // adjust the expected sep offset in case our candidate already ends in separator character
        }
        return path.charAt(sepOffset) === exports.nativeSep;
    }
    if (candidate.charAt(candidate.length - 1) !== exports.nativeSep) {
        candidate += exports.nativeSep;
    }
    return path.indexOf(candidate) === 0;
}
exports.isEqualOrParent = isEqualOrParent;
//# sourceMappingURL=paths.js.map