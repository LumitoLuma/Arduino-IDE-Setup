"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.FileDownloadCache = void 0;
/********************************************************************************
 * Copyright (C) 2019 Bitsler and others.
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
var inversify_1 = require("inversify");
var logger_1 = require("@theia/core/lib/common/logger");
var rimraf = require("rimraf");
var FileDownloadCache = /** @class */ (function () {
    function FileDownloadCache() {
        this.downloads = new Map();
        this.expireTimeInMinutes = 1;
    }
    FileDownloadCache.prototype.addDownload = function (id, downloadInfo) {
        downloadInfo.file = encodeURIComponent(downloadInfo.file);
        if (downloadInfo.root) {
            downloadInfo.root = encodeURIComponent(downloadInfo.root);
        }
        // expires in 1 minute enough for parallel connections to be connected.
        downloadInfo.expire = Date.now() + (this.expireTimeInMinutes * 600000);
        this.downloads.set(id, downloadInfo);
    };
    FileDownloadCache.prototype.getDownload = function (id) {
        this.expireDownloads();
        var downloadInfo = this.downloads.get(id);
        if (downloadInfo) {
            downloadInfo.file = decodeURIComponent(downloadInfo.file);
            if (downloadInfo.root) {
                downloadInfo.root = decodeURIComponent(downloadInfo.root);
            }
        }
        return downloadInfo;
    };
    FileDownloadCache.prototype.deleteDownload = function (id) {
        var downloadInfo = this.downloads.get(id);
        if (downloadInfo && downloadInfo.remove) {
            this.deleteRecursively(downloadInfo.root || downloadInfo.file);
        }
        this.downloads.delete(id);
    };
    FileDownloadCache.prototype.values = function () {
        this.expireDownloads();
        return __spread(this.downloads.entries()).reduce(function (downloads, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], value = _c[1];
            return (__assign(__assign({}, downloads), (_b = {}, _b[key] = value, _b)));
        }, {});
    };
    FileDownloadCache.prototype.deleteRecursively = function (pathToDelete) {
        var _this = this;
        rimraf(pathToDelete, function (error) {
            if (error) {
                _this.logger.warn("An error occurred while deleting the temporary data from the disk. Cannot clean up: " + pathToDelete + ".", error);
            }
        });
    };
    FileDownloadCache.prototype.expireDownloads = function () {
        var e_1, _a;
        var time = Date.now();
        try {
            for (var _b = __values(this.downloads.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), id = _d[0], download = _d[1];
                if (download.expire && download.expire <= time) {
                    this.deleteDownload(id);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], FileDownloadCache.prototype, "logger", void 0);
    FileDownloadCache = __decorate([
        inversify_1.injectable()
    ], FileDownloadCache);
    return FileDownloadCache;
}());
exports.FileDownloadCache = FileDownloadCache;
//# sourceMappingURL=file-download-cache.js.map