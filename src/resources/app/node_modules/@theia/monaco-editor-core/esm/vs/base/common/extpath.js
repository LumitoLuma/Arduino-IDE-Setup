/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { isWindows } from './platform';
import { startsWithIgnoreCase, equalsIgnoreCase, endsWith, rtrim } from './strings';
import { sep, posix, isAbsolute, join, normalize } from './path';
export function isPathSeparator(code) {
    return code === 47 /* Slash */ || code === 92 /* Backslash */;
}
/**
 * Takes a Windows OS path and changes backward slashes to forward slashes.
 * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
 * Using it on a Linux or MaxOS path might change it.
 */
export function toSlashes(osPath) {
    return osPath.replace(/[\\/]/g, posix.sep);
}
/**
 * Computes the _root_ this path, like `getRoot('c:\files') === c:\`,
 * `getRoot('files:///files/path') === files:///`,
 * or `getRoot('\\server\shares\path') === \\server\shares\`
 */
export function getRoot(path, sep) {
    if (sep === void 0) { sep = posix.sep; }
    if (!path) {
        return '';
    }
    var len = path.length;
    var firstLetter = path.charCodeAt(0);
    if (isPathSeparator(firstLetter)) {
        if (isPathSeparator(path.charCodeAt(1))) {
            // UNC candidate \\localhost\shares\ddd
            //               ^^^^^^^^^^^^^^^^^^^
            if (!isPathSeparator(path.charCodeAt(2))) {
                var pos_1 = 3;
                var start = pos_1;
                for (; pos_1 < len; pos_1++) {
                    if (isPathSeparator(path.charCodeAt(pos_1))) {
                        break;
                    }
                }
                if (start !== pos_1 && !isPathSeparator(path.charCodeAt(pos_1 + 1))) {
                    pos_1 += 1;
                    for (; pos_1 < len; pos_1++) {
                        if (isPathSeparator(path.charCodeAt(pos_1))) {
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
    else if (isWindowsDriveLetter(firstLetter)) {
        // check for windows drive letter c:\ or c:
        if (path.charCodeAt(1) === 58 /* Colon */) {
            if (isPathSeparator(path.charCodeAt(2))) {
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
            if (isPathSeparator(path.charCodeAt(pos))) {
                return path.slice(0, pos + 1); // consume this separator
            }
        }
    }
    return '';
}
/**
 * Check if the path follows this pattern: `\\hostname\sharename`.
 *
 * @see https://msdn.microsoft.com/en-us/library/gg465305.aspx
 * @return A boolean indication if the path is a UNC path, on none-windows
 * always false.
 */
export function isUNC(path) {
    if (!isWindows) {
        // UNC is a windows concept
        return false;
    }
    if (!path || path.length < 5) {
        // at least \\a\b
        return false;
    }
    var code = path.charCodeAt(0);
    if (code !== 92 /* Backslash */) {
        return false;
    }
    code = path.charCodeAt(1);
    if (code !== 92 /* Backslash */) {
        return false;
    }
    var pos = 2;
    var start = pos;
    for (; pos < path.length; pos++) {
        code = path.charCodeAt(pos);
        if (code === 92 /* Backslash */) {
            break;
        }
    }
    if (start === pos) {
        return false;
    }
    code = path.charCodeAt(pos + 1);
    if (isNaN(code) || code === 92 /* Backslash */) {
        return false;
    }
    return true;
}
// Reference: https://en.wikipedia.org/wiki/Filename
var WINDOWS_INVALID_FILE_CHARS = /[\\/:\*\?"<>\|]/g;
var UNIX_INVALID_FILE_CHARS = /[\\/]/g;
var WINDOWS_FORBIDDEN_NAMES = /^(con|prn|aux|clock\$|nul|lpt[0-9]|com[0-9])$/i;
export function isValidBasename(name, isWindowsOS) {
    if (isWindowsOS === void 0) { isWindowsOS = isWindows; }
    var invalidFileChars = isWindowsOS ? WINDOWS_INVALID_FILE_CHARS : UNIX_INVALID_FILE_CHARS;
    if (!name || name.length === 0 || /^\s+$/.test(name)) {
        return false; // require a name that is not just whitespace
    }
    invalidFileChars.lastIndex = 0; // the holy grail of software development
    if (invalidFileChars.test(name)) {
        return false; // check for certain invalid file characters
    }
    if (isWindowsOS && WINDOWS_FORBIDDEN_NAMES.test(name)) {
        return false; // check for certain invalid file names
    }
    if (name === '.' || name === '..') {
        return false; // check for reserved values
    }
    if (isWindowsOS && name[name.length - 1] === '.') {
        return false; // Windows: file cannot end with a "."
    }
    if (isWindowsOS && name.length !== name.trim().length) {
        return false; // Windows: file cannot end with a whitespace
    }
    if (name.length > 255) {
        return false; // most file systems do not allow files > 255 length
    }
    return true;
}
export function isEqual(pathA, pathB, ignoreCase) {
    var identityEquals = (pathA === pathB);
    if (!ignoreCase || identityEquals) {
        return identityEquals;
    }
    if (!pathA || !pathB) {
        return false;
    }
    return equalsIgnoreCase(pathA, pathB);
}
export function isEqualOrParent(path, candidate, ignoreCase, separator) {
    if (separator === void 0) { separator = sep; }
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
        var beginsWith = startsWithIgnoreCase(path, candidate);
        if (!beginsWith) {
            return false;
        }
        if (candidate.length === path.length) {
            return true; // same path, different casing
        }
        var sepOffset = candidate.length;
        if (candidate.charAt(candidate.length - 1) === separator) {
            sepOffset--; // adjust the expected sep offset in case our candidate already ends in separator character
        }
        return path.charAt(sepOffset) === separator;
    }
    if (candidate.charAt(candidate.length - 1) !== separator) {
        candidate += separator;
    }
    return path.indexOf(candidate) === 0;
}
export function isWindowsDriveLetter(char0) {
    return char0 >= 65 /* A */ && char0 <= 90 /* Z */ || char0 >= 97 /* a */ && char0 <= 122 /* z */;
}
export function sanitizeFilePath(candidate, cwd) {
    // Special case: allow to open a drive letter without trailing backslash
    if (isWindows && endsWith(candidate, ':')) {
        candidate += sep;
    }
    // Ensure absolute
    if (!isAbsolute(candidate)) {
        candidate = join(cwd, candidate);
    }
    // Ensure normalized
    candidate = normalize(candidate);
    // Ensure no trailing slash/backslash
    if (isWindows) {
        candidate = rtrim(candidate, sep);
        // Special case: allow to open drive root ('C:\')
        if (endsWith(candidate, ':')) {
            candidate += sep;
        }
    }
    else {
        candidate = rtrim(candidate, sep);
        // Special case: allow to open root ('/')
        if (!candidate) {
            candidate = sep;
        }
    }
    return candidate;
}
export function isRootOrDriveLetter(path) {
    var pathNormalized = normalize(path);
    if (isWindows) {
        if (path.length > 3) {
            return false;
        }
        return isWindowsDriveLetter(pathNormalized.charCodeAt(0))
            && pathNormalized.charCodeAt(1) === 58 /* Colon */
            && (path.length === 2 || pathNormalized.charCodeAt(2) === 92 /* Backslash */);
    }
    return pathNormalized === posix.sep;
}
