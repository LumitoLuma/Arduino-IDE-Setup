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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawExtensionPackage = exports.ExtensionPackage = void 0;
var fs = require("fs-extra");
var paths = require("path");
var semver = require("semver");
var npm_registry_1 = require("./npm-registry");
var ExtensionPackage = /** @class */ (function () {
    function ExtensionPackage(raw, registry) {
        this.raw = raw;
        this.registry = registry;
    }
    Object.defineProperty(ExtensionPackage.prototype, "name", {
        get: function () {
            return this.raw.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtensionPackage.prototype, "version", {
        get: function () {
            if (this.raw.installed) {
                return this.raw.installed.version;
            }
            if (this.raw.view) {
                var latestVersion = this.raw.view.latestVersion;
                if (latestVersion) {
                    return latestVersion;
                }
            }
            return this.raw.version;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtensionPackage.prototype, "description", {
        get: function () {
            return this.raw.description || '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtensionPackage.prototype, "theiaExtensions", {
        get: function () {
            return this.raw.theiaExtensions || [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtensionPackage.prototype, "installed", {
        get: function () {
            return !!this.raw.installed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtensionPackage.prototype, "dependent", {
        get: function () {
            if (!this.transitive) {
                return undefined;
            }
            var current = this.parent;
            var parent = current.parent;
            while (parent !== undefined) {
                current = parent;
                parent = current.parent;
            }
            return current.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtensionPackage.prototype, "transitive", {
        get: function () {
            return !!this.raw.installed && this.raw.installed.transitive;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtensionPackage.prototype, "parent", {
        get: function () {
            if (this.raw.installed) {
                return this.raw.installed.parent;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    ExtensionPackage.prototype.view = function () {
        return __awaiter(this, void 0, void 0, function () {
            var raw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.raw.view === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, RawExtensionPackage.view(this.registry, this.name, this.version)];
                    case 1:
                        raw = _a.sent();
                        this.raw.view = raw ? raw.view : new RawExtensionPackage.ViewState(this.registry);
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.raw.view];
                }
            });
        });
    };
    ExtensionPackage.prototype.getReadme = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.readme === undefined)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.resolveReadme()];
                    case 1:
                        _a.readme = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.readme];
                }
            });
        });
    };
    ExtensionPackage.prototype.resolveReadme = function () {
        return __awaiter(this, void 0, void 0, function () {
            var raw, readmePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.view()];
                    case 1:
                        raw = _a.sent();
                        if (raw && raw.readme) {
                            return [2 /*return*/, raw.readme];
                        }
                        if (!this.raw.installed) return [3 /*break*/, 3];
                        readmePath = paths.resolve(this.raw.installed.packagePath, '..', 'README.md');
                        return [4 /*yield*/, fs.pathExists(readmePath)];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, fs.readFile(readmePath, { encoding: 'utf8' })];
                        }
                        return [2 /*return*/, ''];
                    case 3: return [2 /*return*/, ''];
                }
            });
        });
    };
    ExtensionPackage.prototype.getLatestVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var raw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.view()];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, raw.latestVersion];
                }
            });
        });
    };
    ExtensionPackage.prototype.getVersionRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.versionRange === undefined)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.resolveVersionRange()];
                    case 1:
                        _a.versionRange = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.versionRange];
                }
            });
        });
    };
    ExtensionPackage.prototype.resolveVersionRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var version, validVersion, validRange, raw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        version = this.raw.version;
                        validVersion = semver.valid(version);
                        if (validVersion) {
                            return [2 /*return*/, validVersion];
                        }
                        validRange = semver.validRange(version);
                        if (validRange) {
                            return [2 /*return*/, validRange];
                        }
                        return [4 /*yield*/, this.view()];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, raw.tags ? raw.tags[version] : undefined];
                }
            });
        });
    };
    ExtensionPackage.prototype.getAuthor = function () {
        if (this.raw.publisher) {
            return this.raw.publisher.username;
        }
        if (typeof this.raw.author === 'string') {
            return this.raw.author;
        }
        if (this.raw.author && this.raw.author.name) {
            return this.raw.author.name;
        }
        if (!!this.raw.maintainers && this.raw.maintainers.length > 0) {
            return this.raw.maintainers[0].username;
        }
        return '';
    };
    ExtensionPackage.prototype.isOutdated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var latestVersion, versionRange;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLatestVersion()];
                    case 1:
                        latestVersion = _a.sent();
                        if (!latestVersion) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.getVersionRange()];
                    case 2:
                        versionRange = _a.sent();
                        if (versionRange && semver.gtr(latestVersion, versionRange)) {
                            return [2 /*return*/, true];
                        }
                        if (this.raw.installed) {
                            return [2 /*return*/, semver.gt(latestVersion, this.raw.installed.version)];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    return ExtensionPackage;
}());
exports.ExtensionPackage = ExtensionPackage;
var RawExtensionPackage;
(function (RawExtensionPackage) {
    var ViewState = /** @class */ (function () {
        function ViewState(registry) {
            this.registry = registry;
        }
        Object.defineProperty(ViewState.prototype, "latestVersion", {
            get: function () {
                if (this.tags) {
                    if (this.registry.props.next) {
                        var next = this.tags['next'];
                        if (next !== undefined) {
                            return next;
                        }
                    }
                    var latest = this.tags['latest'];
                    if (this.registry.props.next || !semver.prerelease(latest)) {
                        return latest;
                    }
                    return undefined;
                }
                return undefined;
            },
            enumerable: false,
            configurable: true
        });
        return ViewState;
    }());
    RawExtensionPackage.ViewState = ViewState;
    function is(pck) {
        return npm_registry_1.PublishedNodePackage.is(pck) && !!pck.theiaExtensions;
    }
    RawExtensionPackage.is = is;
    function view(registry, name, version) {
        return __awaiter(this, void 0, void 0, function () {
            var result, tags, versions, _a, _b, current, raw, viewState;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, registry.view(name).catch(function () { return undefined; })];
                    case 1:
                        result = _d.sent();
                        if (!result) {
                            return [2 /*return*/, undefined];
                        }
                        tags = result['dist-tags'];
                        versions = [tags['latest']];
                        if (registry.props.next) {
                            versions.push(tags['next']);
                        }
                        if (version) {
                            versions.push(tags[version], version);
                        }
                        try {
                            for (_a = __values(versions.reverse()), _b = _a.next(); !_b.done; _b = _a.next()) {
                                current = _b.value;
                                raw = result.versions[current];
                                if (is(raw)) {
                                    viewState = new ViewState(registry);
                                    viewState.readme = result.readme;
                                    viewState.tags = tags;
                                    raw.view = viewState;
                                    return [2 /*return*/, raw];
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    }
    RawExtensionPackage.view = view;
})(RawExtensionPackage = exports.RawExtensionPackage || (exports.RawExtensionPackage = {}));
//# sourceMappingURL=extension-package.js.map