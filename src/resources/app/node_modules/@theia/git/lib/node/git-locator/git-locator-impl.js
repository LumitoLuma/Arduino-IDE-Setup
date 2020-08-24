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
exports.GitLocatorImpl = void 0;
var fs = require("fs-extra");
var path = require("path");
var findGitRepositories = require('find-git-repositories');
var GitLocatorImpl = /** @class */ (function () {
    function GitLocatorImpl(options) {
        this.options = __assign({ info: function (message) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return console.info.apply(console, __spread([message], args));
            }, error: function (message) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return console.error.apply(console, __spread([message], args));
            } }, options);
    }
    GitLocatorImpl.prototype.dispose = function () {
    };
    GitLocatorImpl.prototype.locate = function (basePath, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.doLocate(basePath, {
                        maxCount: typeof options.maxCount === 'number' ? options.maxCount : -1,
                        visited: new Map()
                    })];
            });
        });
    };
    GitLocatorImpl.prototype.doLocate = function (basePath, context) {
        return __awaiter(this, void 0, void 0, function () {
            var realBasePath, stat, progress_1, paths, repositoryPaths_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        realBasePath = fs.realpathSync(basePath);
                        if (context.visited.has(realBasePath)) {
                            return [2 /*return*/, []];
                        }
                        context.visited.set(realBasePath, true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fs.stat(realBasePath)];
                    case 2:
                        stat = _a.sent();
                        if (!stat.isDirectory()) {
                            return [2 /*return*/, []];
                        }
                        progress_1 = [];
                        return [4 /*yield*/, findGitRepositories(realBasePath, function (repositories) {
                                progress_1.push.apply(progress_1, __spread(repositories));
                                if (context.maxCount >= 0 && progress_1.length >= context.maxCount) {
                                    return progress_1.slice(0, context.maxCount).map(GitLocatorImpl.map);
                                }
                            })];
                    case 3:
                        paths = _a.sent();
                        if (context.maxCount >= 0 && paths.length >= context.maxCount) {
                            return [2 /*return*/, paths.slice(0, context.maxCount).map(GitLocatorImpl.map)];
                        }
                        repositoryPaths_1 = paths.map(GitLocatorImpl.map);
                        return [2 /*return*/, this.locateFrom(function (newContext) { return _this.generateNested(repositoryPaths_1, newContext); }, context, repositoryPaths_1)];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GitLocatorImpl.prototype.generateNested = function (repositoryPaths, context) {
        var repositoryPaths_2, repositoryPaths_2_1, repository, e_2_1;
        var e_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    repositoryPaths_2 = __values(repositoryPaths), repositoryPaths_2_1 = repositoryPaths_2.next();
                    _b.label = 1;
                case 1:
                    if (!!repositoryPaths_2_1.done) return [3 /*break*/, 4];
                    repository = repositoryPaths_2_1.value;
                    return [4 /*yield*/, this.locateNested(repository, context)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    repositoryPaths_2_1 = repositoryPaths_2.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (repositoryPaths_2_1 && !repositoryPaths_2_1.done && (_a = repositoryPaths_2.return)) _a.call(repositoryPaths_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    };
    GitLocatorImpl.prototype.locateNested = function (repositoryPath, context) {
        var _this = this;
        return new Promise(function (resolve) {
            fs.readdir(repositoryPath, function (err, files) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (err) {
                        this.options.error(err.message, err);
                        resolve([]);
                    }
                    else {
                        resolve(this.locateFrom(function (newContext) { return _this.generateRepositories(repositoryPath, files, newContext); }, context));
                    }
                    return [2 /*return*/];
                });
            }); });
        });
    };
    GitLocatorImpl.prototype.generateRepositories = function (repositoryPath, files, context) {
        var files_1, files_1_1, file, e_3_1;
        var e_3, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    files_1 = __values(files), files_1_1 = files_1.next();
                    _b.label = 1;
                case 1:
                    if (!!files_1_1.done) return [3 /*break*/, 4];
                    file = files_1_1.value;
                    if (!(file !== '.git')) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.doLocate(path.join(repositoryPath, file), __assign({}, context))];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    files_1_1 = files_1.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    };
    GitLocatorImpl.prototype.locateFrom = function (generator, parentContext, initial) {
        return __awaiter(this, void 0, void 0, function () {
            var result, context, _a, _b, locateRepositories, repositories, e_4_1;
            var e_4, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result = [];
                        if (initial) {
                            result.push.apply(result, __spread(initial));
                        }
                        context = __assign(__assign({}, parentContext), { maxCount: parentContext.maxCount - result.length });
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = __values(generator(context)), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        locateRepositories = _b.value;
                        return [4 /*yield*/, locateRepositories];
                    case 3:
                        repositories = _d.sent();
                        result.push.apply(result, __spread(repositories));
                        if (context.maxCount >= 0) {
                            if (result.length >= context.maxCount) {
                                return [2 /*return*/, result.slice(0, context.maxCount)];
                            }
                            context.maxCount -= repositories.length;
                        }
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_4_1 = _d.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, result];
                }
            });
        });
    };
    GitLocatorImpl.map = function (repository) {
        return fs.realpathSync(path.dirname(repository));
    };
    return GitLocatorImpl;
}());
exports.GitLocatorImpl = GitLocatorImpl;
//# sourceMappingURL=git-locator-impl.js.map