"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileChangeCollection = void 0;
var filesystem_watcher_protocol_1 = require("../common/filesystem-watcher-protocol");
/**
 * A file change collection guarantees that only one change is reported for each URI.
 *
 * Changes are normalized according following rules:
 * - ADDED + ADDED => ADDED
 * - ADDED + UPDATED => ADDED
 * - ADDED + DELETED => [ADDED, DELETED]
 * - UPDATED + ADDED => UPDATED
 * - UPDATED + UPDATED => UPDATED
 * - UPDATED + DELETED => DELETED
 * - DELETED + ADDED => UPDATED
 * - DELETED + UPDATED => UPDATED
 * - DELETED + DELETED => DELETED
 */
var FileChangeCollection = /** @class */ (function () {
    function FileChangeCollection() {
        this.changes = new Map();
    }
    FileChangeCollection.prototype.push = function (change) {
        var changes = this.changes.get(change.uri) || [];
        this.normalize(changes, change);
        this.changes.set(change.uri, changes);
    };
    FileChangeCollection.prototype.normalize = function (changes, change) {
        var currentType;
        var nextType = change.type;
        do {
            var current = changes.pop();
            currentType = current && current.type;
            nextType = this.reduce(currentType, nextType);
        } while (!Array.isArray(nextType) && currentType !== undefined && currentType !== nextType);
        var uri = change.uri;
        if (Array.isArray(nextType)) {
            changes.push.apply(changes, __spread(nextType.map(function (type) { return ({ uri: uri, type: type }); })));
        }
        else {
            changes.push({ uri: uri, type: nextType });
        }
    };
    FileChangeCollection.prototype.reduce = function (current, change) {
        if (current === undefined) {
            return change;
        }
        if (current === filesystem_watcher_protocol_1.FileChangeType.ADDED) {
            if (change === filesystem_watcher_protocol_1.FileChangeType.DELETED) {
                return [filesystem_watcher_protocol_1.FileChangeType.ADDED, filesystem_watcher_protocol_1.FileChangeType.DELETED];
            }
            return filesystem_watcher_protocol_1.FileChangeType.ADDED;
        }
        if (change === filesystem_watcher_protocol_1.FileChangeType.DELETED) {
            return filesystem_watcher_protocol_1.FileChangeType.DELETED;
        }
        return filesystem_watcher_protocol_1.FileChangeType.UPDATED;
    };
    FileChangeCollection.prototype.values = function () {
        return Array.from(this.changes.values()).reduce(function (acc, val) { return acc.concat(val); }, []);
    };
    return FileChangeCollection;
}());
exports.FileChangeCollection = FileChangeCollection;
//# sourceMappingURL=file-change-collection.js.map