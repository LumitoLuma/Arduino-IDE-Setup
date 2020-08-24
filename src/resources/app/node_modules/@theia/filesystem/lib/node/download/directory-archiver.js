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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.DirectoryArchiver = void 0;
var inversify_1 = require("inversify");
var fs = require("fs-extra");
var tar_fs_1 = require("tar-fs");
var uri_1 = require("@theia/core/lib/common/uri");
var filesystem_1 = require("../../common/filesystem");
var DirectoryArchiver = /** @class */ (function () {
    function DirectoryArchiver() {
    }
    DirectoryArchiver.prototype.archive = function (inputPath, outputPath, entries) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            tar_fs_1.pack(inputPath, { entries: entries }).pipe(fs.createWriteStream(outputPath)).on('finish', function () { return resolve(); }).on('error', function (e) { return reject(e); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DirectoryArchiver.prototype.findCommonParents = function (uris) {
        return __awaiter(this, void 0, void 0, function () {
            var map, uris_1, uris_1_1, uri, containerUri, containerUriStr, _a, _b, knownContainerUri, entries, collapsed, knownContainerUris, i, j, left, right, commonParent, leftEntries, rightEntries, e_1_1;
            var e_1, _c, e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        map = new Map();
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        uris_1 = __values(uris), uris_1_1 = uris_1.next();
                        _e.label = 2;
                    case 2:
                        if (!!uris_1_1.done) return [3 /*break*/, 5];
                        uri = uris_1_1.value;
                        return [4 /*yield*/, this.isDir(uri)];
                    case 3:
                        containerUri = (_e.sent()) ? uri : uri.parent;
                        containerUriStr = this.toUriString(containerUri);
                        // 2. If the container already registered, just append the current URI to it.
                        if (map.has(containerUriStr)) {
                            map.set(containerUriStr, __spread(map.get(containerUriStr), [this.toUriString(uri)]));
                        }
                        else {
                            try {
                                // 3. Try to find the longest container URI that we can use.
                                // When we have `/A/B/` and `/A/C` and a file `A/B/C/D.txt` then we need to find `/A/B`. The longest URIs come first.
                                for (_a = (e_2 = void 0, __values(Array.from(map.keys()).sort(function (left, right) { return right.length - left.length; }))), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    knownContainerUri = _b.value;
                                    if (uri.toString().startsWith(knownContainerUri)) {
                                        containerUriStr = knownContainerUri;
                                        break;
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            entries = map.get(containerUriStr) || [];
                            entries.push(this.toUriString(uri));
                            map.set(containerUriStr, entries);
                        }
                        collapsed = false;
                        collapseLoop: while (!collapsed) {
                            knownContainerUris = Array.from(map.keys()).sort(function (left, right) { return right.length - left.length; });
                            if (knownContainerUris.length > 1) {
                                for (i = 0; i < knownContainerUris.length; i++) {
                                    for (j = i + 1; j < knownContainerUris.length; j++) {
                                        left = knownContainerUris[i];
                                        right = knownContainerUris[j];
                                        commonParent = this.closestCommonParentUri(new uri_1.default(left), new uri_1.default(right));
                                        if (commonParent && !commonParent.path.isRoot) {
                                            leftEntries = map.get(left) || [];
                                            rightEntries = map.get(right) || [];
                                            map.delete(left);
                                            map.delete(right);
                                            map.set(this.toUriString(commonParent), __spread(leftEntries, rightEntries));
                                            break collapseLoop;
                                        }
                                    }
                                }
                            }
                            collapsed = true;
                        }
                        _e.label = 4;
                    case 4:
                        uris_1_1 = uris_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (uris_1_1 && !uris_1_1.done && (_c = uris_1.return)) _c.call(uris_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, map];
                }
            });
        });
    };
    DirectoryArchiver.prototype.closestCommonParentUri = function (left, right) {
        var e_3, _a, e_4, _b;
        if (left.scheme !== right.scheme) {
            return undefined;
        }
        var allLeft = left.allLocations;
        var allRight = right.allLocations;
        try {
            for (var allLeft_1 = __values(allLeft), allLeft_1_1 = allLeft_1.next(); !allLeft_1_1.done; allLeft_1_1 = allLeft_1.next()) {
                var leftUri = allLeft_1_1.value;
                try {
                    for (var allRight_1 = (e_4 = void 0, __values(allRight)), allRight_1_1 = allRight_1.next(); !allRight_1_1.done; allRight_1_1 = allRight_1.next()) {
                        var rightUri = allRight_1_1.value;
                        if (this.equal(leftUri, rightUri)) {
                            return leftUri;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (allRight_1_1 && !allRight_1_1.done && (_b = allRight_1.return)) _b.call(allRight_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (allLeft_1_1 && !allLeft_1_1.done && (_a = allLeft_1.return)) _a.call(allLeft_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return undefined;
    };
    DirectoryArchiver.prototype.isDir = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var stat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileSystem.getFileStat(uri.toString())];
                    case 1:
                        stat = _a.sent();
                        if (!stat) {
                            throw new Error("File does not exist under: " + uri + ".");
                        }
                        return [2 /*return*/, stat.isDirectory];
                }
            });
        });
    };
    DirectoryArchiver.prototype.equal = function (left, right) {
        if (Array.isArray(left) && Array.isArray(right)) {
            if (left === right) {
                return true;
            }
            if (left.length !== right.length) {
                return false;
            }
            return left.map(this.toUriString).sort().toString() === right.map(this.toUriString).sort().toString();
        }
        else if (left instanceof uri_1.default && right instanceof uri_1.default) {
            return this.toUriString(left) === this.toUriString(right);
        }
        return false;
    };
    DirectoryArchiver.prototype.toUriString = function (uri) {
        var raw = uri.toString();
        return raw.endsWith('/') ? raw.slice(0, -1) : raw;
    };
    __decorate([
        inversify_1.inject(filesystem_1.FileSystem),
        __metadata("design:type", Object)
    ], DirectoryArchiver.prototype, "fileSystem", void 0);
    DirectoryArchiver = __decorate([
        inversify_1.injectable()
    ], DirectoryArchiver);
    return DirectoryArchiver;
}());
exports.DirectoryArchiver = DirectoryArchiver;
//# sourceMappingURL=directory-archiver.js.map