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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.InMemoryResources = exports.MutableResource = exports.DefaultResourceProvider = exports.ResourceProvider = exports.ResourceResolver = exports.ResourceError = exports.Resource = void 0;
var inversify_1 = require("inversify");
var contribution_provider_1 = require("./contribution-provider");
var event_1 = require("./event");
var application_error_1 = require("./application-error");
var Resource;
(function (Resource) {
    function save(resource, context, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!resource.saveContents) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, trySaveContentChanges(resource, context)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/];
                        }
                        if (token && token.isCancellationRequested) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, resource.saveContents(context.content, context.options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    Resource.save = save;
    function trySaveContentChanges(resource, context) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!context.changes || !resource.saveContentChanges || shouldSaveContent(context)) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, resource.saveContentChanges(context.changes, context.options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_1 = _a.sent();
                        if (!ResourceError.NotFound.is(e_1) && !ResourceError.OutOfSync.is(e_1)) {
                            console.error("Failed to apply incremental changes to '" + resource.uri.toString() + "':", e_1);
                        }
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    Resource.trySaveContentChanges = trySaveContentChanges;
    function shouldSaveContent(_a) {
        var e_2, _b;
        var content = _a.content, changes = _a.changes;
        if (!changes) {
            return true;
        }
        var contentChangesLength = 0;
        var contentLength = content.length;
        try {
            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                var change = changes_1_1.value;
                contentChangesLength += JSON.stringify(change).length;
                if (contentChangesLength > contentLength) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (changes_1_1 && !changes_1_1.done && (_b = changes_1.return)) _b.call(changes_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return contentChangesLength > contentLength;
    }
    Resource.shouldSaveContent = shouldSaveContent;
})(Resource = exports.Resource || (exports.Resource = {}));
var ResourceError;
(function (ResourceError) {
    ResourceError.NotFound = application_error_1.ApplicationError.declare(-40000, function (raw) { return raw; });
    ResourceError.OutOfSync = application_error_1.ApplicationError.declare(-40001, function (raw) { return raw; });
})(ResourceError = exports.ResourceError || (exports.ResourceError = {}));
exports.ResourceResolver = Symbol('ResourceResolver');
exports.ResourceProvider = Symbol('ResourceProvider');
var DefaultResourceProvider = /** @class */ (function () {
    function DefaultResourceProvider(resolversProvider) {
        this.resolversProvider = resolversProvider;
    }
    /**
     * Reject if a resource cannot be provided.
     */
    DefaultResourceProvider.prototype.get = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvers, resolvers_1, resolvers_1_1, resolver, err_1, e_3_1;
            var e_3, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resolvers = this.resolversProvider.getContributions();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 10]);
                        resolvers_1 = __values(resolvers), resolvers_1_1 = resolvers_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!resolvers_1_1.done) return [3 /*break*/, 7];
                        resolver = resolvers_1_1.value;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, resolver.resolve(uri)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5:
                        err_1 = _b.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        resolvers_1_1 = resolvers_1.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (resolvers_1_1 && !resolvers_1_1.done && (_a = resolvers_1.return)) _a.call(resolvers_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, Promise.reject(new Error("A resource provider for '" + uri.toString() + "' is not registered."))];
                }
            });
        });
    };
    DefaultResourceProvider = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(contribution_provider_1.ContributionProvider)), __param(0, inversify_1.named(exports.ResourceResolver)),
        __metadata("design:paramtypes", [Object])
    ], DefaultResourceProvider);
    return DefaultResourceProvider;
}());
exports.DefaultResourceProvider = DefaultResourceProvider;
var MutableResource = /** @class */ (function () {
    function MutableResource(uri, contents, dispose) {
        this.uri = uri;
        this.dispose = dispose;
        this.onDidChangeContentsEmitter = new event_1.Emitter();
        this.onDidChangeContents = this.onDidChangeContentsEmitter.event;
        this.contents = contents;
    }
    MutableResource.prototype.readContents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.contents];
            });
        });
    };
    MutableResource.prototype.saveContents = function (contents) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.contents = contents;
                this.fireDidChangeContents();
                return [2 /*return*/];
            });
        });
    };
    MutableResource.prototype.fireDidChangeContents = function () {
        this.onDidChangeContentsEmitter.fire(undefined);
    };
    return MutableResource;
}());
exports.MutableResource = MutableResource;
var InMemoryResources = /** @class */ (function () {
    function InMemoryResources() {
        this.resources = new Map();
    }
    InMemoryResources.prototype.add = function (uri, contents) {
        var _this = this;
        var resourceUri = uri.toString();
        if (this.resources.has(resourceUri)) {
            throw new Error("Cannot add already existing in-memory resource '" + resourceUri + "'");
        }
        var resource = new MutableResource(uri, contents, function () { return _this.resources.delete(resourceUri); });
        this.resources.set(resourceUri, resource);
        return resource;
    };
    InMemoryResources.prototype.update = function (uri, contents) {
        var resourceUri = uri.toString();
        var resource = this.resources.get(resourceUri);
        if (!resource) {
            throw new Error("Cannot update non-existed in-memory resource '" + resourceUri + "'");
        }
        resource.saveContents(contents);
        return resource;
    };
    InMemoryResources.prototype.resolve = function (uri) {
        var uriString = uri.toString();
        if (!this.resources.has(uriString)) {
            throw new Error("In memory '" + uriString + "' resource does not exist.");
        }
        return this.resources.get(uriString);
    };
    InMemoryResources = __decorate([
        inversify_1.injectable()
    ], InMemoryResources);
    return InMemoryResources;
}());
exports.InMemoryResources = InMemoryResources;
//# sourceMappingURL=resource.js.map