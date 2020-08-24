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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUntitledURI = exports.UntitledResource = exports.UntitledResourceResolver = void 0;
var event_1 = require("@theia/core/lib/common/event");
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var uri_components_1 = require("../../../common/uri-components");
var browser_1 = require("@theia/filesystem/lib/browser");
var index = 0;
var UntitledResourceResolver = /** @class */ (function () {
    function UntitledResourceResolver() {
        this.resources = new Map();
    }
    UntitledResourceResolver.prototype.resolve = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var untitledResource;
            return __generator(this, function (_a) {
                if (uri.scheme !== uri_components_1.Schemes.UNTITLED) {
                    throw new Error('The given uri is not untitled file uri: ' + uri);
                }
                else {
                    untitledResource = this.resources.get(uri.toString());
                    if (!untitledResource) {
                        return [2 /*return*/, this.createUntitledResource(this.fileResourceResolver, '', '', uri)];
                    }
                    else {
                        return [2 /*return*/, untitledResource];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    UntitledResourceResolver.prototype.createUntitledResource = function (fileResourceResolver, content, language, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var extension, _a, _b, lang;
            var e_1, _c;
            return __generator(this, function (_d) {
                if (language) {
                    try {
                        for (_a = __values(monaco.languages.getLanguages()), _b = _a.next(); !_b.done; _b = _a.next()) {
                            lang = _b.value;
                            if (lang.id === language) {
                                if (lang.extensions) {
                                    extension = lang.extensions[0];
                                    break;
                                }
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
                }
                return [2 /*return*/, new UntitledResource(this.resources, uri ? uri : new uri_1.default().withScheme(uri_components_1.Schemes.UNTITLED).withPath("/Untitled-" + index++ + (extension ? extension : '')), fileResourceResolver, content)];
            });
        });
    };
    __decorate([
        inversify_1.inject(browser_1.FileResourceResolver),
        __metadata("design:type", browser_1.FileResourceResolver)
    ], UntitledResourceResolver.prototype, "fileResourceResolver", void 0);
    UntitledResourceResolver = __decorate([
        inversify_1.injectable()
    ], UntitledResourceResolver);
    return UntitledResourceResolver;
}());
exports.UntitledResourceResolver = UntitledResourceResolver;
var UntitledResource = /** @class */ (function () {
    function UntitledResource(resources, uri, fileResourceResolver, content) {
        this.resources = resources;
        this.uri = uri;
        this.fileResourceResolver = fileResourceResolver;
        this.content = content;
        this.onDidChangeContentsEmitter = new event_1.Emitter();
        this.onDidChangeContents = this.onDidChangeContentsEmitter.event;
        this.resources.set(this.uri.toString(), this);
    }
    UntitledResource.prototype.dispose = function () {
        this.resources.delete(this.uri.toString());
        this.onDidChangeContentsEmitter.dispose();
        if (this.fileResource) {
            this.fileResource.dispose();
        }
    };
    UntitledResource.prototype.readContents = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.fileResource) {
                    return [2 /*return*/, this.fileResource.readContents(options)];
                }
                else if (this.content) {
                    return [2 /*return*/, this.content];
                }
                else {
                    return [2 /*return*/, ''];
                }
                return [2 /*return*/];
            });
        });
    };
    UntitledResource.prototype.saveContents = function (content, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.fileResource) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.fileResourceResolver.resolve(new uri_1.default(this.uri.path.toString()))];
                    case 1:
                        _a.fileResource = _b.sent();
                        if (this.fileResource.onDidChangeContents) {
                            this.fileResource.onDidChangeContents(function () { return _this.fireDidChangeContents(); });
                        }
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.fileResource.saveContents(content, options)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UntitledResource.prototype.saveContentChanges = function (changes, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.fileResource) {
                            throw new Error('FileResource is not available for: ' + this.uri.path.toString());
                        }
                        return [4 /*yield*/, this.fileResource.saveContentChanges(changes, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UntitledResource.prototype.guessEncoding = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.fileResource) {
                    return [2 /*return*/, this.fileResource.guessEncoding()];
                }
                return [2 /*return*/];
            });
        });
    };
    UntitledResource.prototype.fireDidChangeContents = function () {
        this.onDidChangeContentsEmitter.fire(undefined);
    };
    Object.defineProperty(UntitledResource.prototype, "version", {
        get: function () {
            if (this.fileResource) {
                return this.fileResource.version;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    return UntitledResource;
}());
exports.UntitledResource = UntitledResource;
function createUntitledURI(language) {
    var e_2, _a;
    var extension;
    if (language) {
        try {
            for (var _b = __values(monaco.languages.getLanguages()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var lang = _c.value;
                if (lang.id === language) {
                    if (lang.extensions) {
                        extension = lang.extensions[0];
                        break;
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return new uri_1.default().withScheme(uri_components_1.Schemes.UNTITLED).withPath("/Untitled-" + index++ + (extension ? extension : ''));
}
exports.createUntitledURI = createUntitledURI;
//# sourceMappingURL=untitled-resource.js.map