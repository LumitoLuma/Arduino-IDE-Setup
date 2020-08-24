/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as strings from '../../../base/common/strings';
export var MANIFEST_CACHE_FOLDER = 'CachedExtensions';
export var USER_MANIFEST_CACHE_FILE = 'user';
export var BUILTIN_MANIFEST_CACHE_FILE = 'builtin';
export function isIExtensionIdentifier(thing) {
    return thing
        && typeof thing === 'object'
        && typeof thing.id === 'string'
        && (!thing.uuid || typeof thing.uuid === 'string');
}
/**
 * **!Do not construct directly!**
 *
 * **!Only static methods because it gets serialized!**
 *
 * This represents the "canonical" version for an extension identifier. Extension ids
 * have to be case-insensitive (due to the marketplace), but we must ensure case
 * preservation because the extension API is already public at this time.
 *
 * For example, given an extension with the publisher `"Hello"` and the name `"World"`,
 * its canonical extension identifier is `"Hello.World"`. This extension could be
 * referenced in some other extension's dependencies using the string `"hello.world"`.
 *
 * To make matters more complicated, an extension can optionally have an UUID. When two
 * extensions have the same UUID, they are considered equal even if their identifier is different.
 */
var ExtensionIdentifier = /** @class */ (function () {
    function ExtensionIdentifier(value) {
        this.value = value;
        this._lower = value.toLowerCase();
    }
    ExtensionIdentifier.equals = function (a, b) {
        if (typeof a === 'undefined' || a === null) {
            return (typeof b === 'undefined' || b === null);
        }
        if (typeof b === 'undefined' || b === null) {
            return false;
        }
        if (typeof a === 'string' || typeof b === 'string') {
            // At least one of the arguments is an extension id in string form,
            // so we have to use the string comparison which ignores case.
            var aValue = (typeof a === 'string' ? a : a.value);
            var bValue = (typeof b === 'string' ? b : b.value);
            return strings.equalsIgnoreCase(aValue, bValue);
        }
        // Now we know both arguments are ExtensionIdentifier
        return (a._lower === b._lower);
    };
    /**
     * Gives the value by which to index (for equality).
     */
    ExtensionIdentifier.toKey = function (id) {
        if (typeof id === 'string') {
            return id.toLowerCase();
        }
        return id._lower;
    };
    return ExtensionIdentifier;
}());
export { ExtensionIdentifier };
export function isLanguagePackExtension(manifest) {
    return manifest.contributes && manifest.contributes.localizations ? manifest.contributes.localizations.length > 0 : false;
}
