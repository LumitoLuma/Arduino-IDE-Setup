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
exports.FileSearchServiceImpl = void 0;
var fuzzy = require("fuzzy");
var readline = require("readline");
var vscode_ripgrep_1 = require("vscode-ripgrep");
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var core_1 = require("@theia/core");
var node_1 = require("@theia/process/lib/node");
var path = require("path");
var FileSearchServiceImpl = /** @class */ (function () {
    function FileSearchServiceImpl(logger, rawProcessFactory) {
        this.logger = logger;
        this.rawProcessFactory = rawProcessFactory;
    }
    FileSearchServiceImpl.prototype.find = function (searchPattern, options, clientToken) {
        return __awaiter(this, void 0, void 0, function () {
            var cancellationSource, token, opts, roots, _a, _b, rootUri, rootUri, rootOptions, includePatterns, excludePatterns, exactMatches, fuzzyMatches, stringPattern;
            var e_1, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        cancellationSource = new core_1.CancellationTokenSource();
                        if (clientToken) {
                            clientToken.onCancellationRequested(function () { return cancellationSource.cancel(); });
                        }
                        token = cancellationSource.token;
                        opts = __assign({ fuzzyMatch: true, limit: Number.MAX_SAFE_INTEGER, useGitIgnore: true }, options);
                        roots = options.rootOptions || {};
                        if (options.rootUris) {
                            try {
                                for (_a = __values(options.rootUris), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    rootUri = _b.value;
                                    if (!roots[rootUri]) {
                                        roots[rootUri] = {};
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
                        // eslint-disable-next-line guard-for-in
                        for (rootUri in roots) {
                            rootOptions = roots[rootUri];
                            if (opts.includePatterns) {
                                includePatterns = rootOptions.includePatterns || [];
                                rootOptions.includePatterns = __spread(includePatterns, opts.includePatterns);
                            }
                            if (opts.excludePatterns) {
                                excludePatterns = rootOptions.excludePatterns || [];
                                rootOptions.excludePatterns = __spread(excludePatterns, opts.excludePatterns);
                            }
                            if (rootOptions.useGitIgnore === undefined) {
                                rootOptions.useGitIgnore = opts.useGitIgnore;
                            }
                        }
                        exactMatches = new Set();
                        fuzzyMatches = new Set();
                        if (core_1.isWindows) {
                            // Allow users on Windows to search for paths using either forwards or backwards slash
                            searchPattern = searchPattern.replace(/\//g, '\\');
                        }
                        stringPattern = searchPattern.toLocaleLowerCase();
                        return [4 /*yield*/, Promise.all(Object.keys(roots).map(function (root) { return __awaiter(_this, void 0, void 0, function () {
                                var rootUri, rootPath_1, rootOptions, e_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            rootUri = new uri_1.default(root);
                                            rootPath_1 = file_uri_1.FileUri.fsPath(rootUri);
                                            rootOptions = roots[root];
                                            return [4 /*yield*/, this.doFind(rootUri, rootOptions, function (candidate) {
                                                    // Convert OS-native candidate path to a file URI string
                                                    var fileUri = file_uri_1.FileUri.create(path.resolve(rootPath_1, candidate)).toString();
                                                    // Skip results that have already been matched.
                                                    if (exactMatches.has(fileUri) || fuzzyMatches.has(fileUri)) {
                                                        return;
                                                    }
                                                    if (!searchPattern || searchPattern === '*' || candidate.toLocaleLowerCase().indexOf(stringPattern) !== -1) {
                                                        exactMatches.add(fileUri);
                                                    }
                                                    else if (opts.fuzzyMatch && fuzzy.test(searchPattern, candidate)) {
                                                        fuzzyMatches.add(fileUri);
                                                    }
                                                    // Preemptively terminate the search when the list of exact matches reaches the limit.
                                                    if (exactMatches.size === opts.limit) {
                                                        cancellationSource.cancel();
                                                    }
                                                }, token)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            e_2 = _a.sent();
                                            console.error('Failed to search:', root, e_2);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _d.sent();
                        if (clientToken && clientToken.isCancellationRequested) {
                            return [2 /*return*/, []];
                        }
                        // Return the list of results limited by the search limit.
                        return [2 /*return*/, __spread(exactMatches, fuzzyMatches).slice(0, opts.limit)];
                }
            });
        });
    };
    FileSearchServiceImpl.prototype.doFind = function (rootUri, options, accept, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var cwd = file_uri_1.FileUri.fsPath(rootUri);
                var args = _this.getSearchArgs(options);
                // TODO: why not just child_process.spawn, theia process are supposed to be used for user processes like tasks and terminals, not internal
                var process_1 = _this.rawProcessFactory({ command: vscode_ripgrep_1.rgPath, args: args, options: { cwd: cwd } });
                process_1.onError(reject);
                process_1.outputStream.on('close', resolve);
                token.onCancellationRequested(function () { return process_1.kill(); });
                var lineReader = readline.createInterface({
                    input: process_1.outputStream,
                    output: process_1.inputStream
                });
                lineReader.on('line', function (line) {
                    if (token.isCancellationRequested) {
                        process_1.kill();
                    }
                    else {
                        accept(line);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    FileSearchServiceImpl.prototype.getSearchArgs = function (options) {
        var e_3, _a, e_4, _b;
        var args = ['--files', '--hidden', '--case-sensitive'];
        if (options.includePatterns) {
            try {
                for (var _c = __values(options.includePatterns), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var includePattern = _d.value;
                    if (includePattern) {
                        args.push('--glob', includePattern);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        if (options.excludePatterns) {
            try {
                for (var _e = __values(options.excludePatterns), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var excludePattern = _f.value;
                    if (excludePattern) {
                        args.push('--glob', "!" + excludePattern);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        if (!options.useGitIgnore) {
            args.push('-uu');
        }
        return args;
    };
    FileSearchServiceImpl = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(core_1.ILogger)),
        __param(1, inversify_1.inject(node_1.RawProcessFactory)),
        __metadata("design:paramtypes", [Object, Function])
    ], FileSearchServiceImpl);
    return FileSearchServiceImpl;
}());
exports.FileSearchServiceImpl = FileSearchServiceImpl;
//# sourceMappingURL=file-search-service-impl.js.map