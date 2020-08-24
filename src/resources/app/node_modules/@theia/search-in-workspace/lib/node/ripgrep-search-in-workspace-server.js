"use strict";
/********************************************************************************
 * Copyright (C) 2017-2018 Ericsson and others.
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
exports.RipgrepSearchInWorkspaceServer = exports.RgPath = void 0;
var core_1 = require("@theia/core");
var node_1 = require("@theia/process/lib/node");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var uri_1 = require("@theia/core/lib/common/uri");
var inversify_1 = require("inversify");
exports.RgPath = Symbol('RgPath');
function bytesOrTextToString(obj) {
    return 'bytes' in obj ?
        Buffer.from(obj.bytes, 'base64').toString() :
        obj.text;
}
var RipgrepSearchInWorkspaceServer = /** @class */ (function () {
    function RipgrepSearchInWorkspaceServer(logger, rawProcessFactory) {
        this.logger = logger;
        this.rawProcessFactory = rawProcessFactory;
        // List of ongoing searches, maps search id to a the started rg process.
        this.ongoingSearches = new Map();
        // Each incoming search is given a unique id, returned to the client.  This is the next id we will assigned.
        this.nextSearchId = 1;
    }
    RipgrepSearchInWorkspaceServer.prototype.setClient = function (client) {
        this.client = client;
    };
    RipgrepSearchInWorkspaceServer.prototype.getArgs = function (options) {
        var e_1, _a, e_2, _b;
        var args = ['--hidden', '--json'];
        args.push(options && options.matchCase ? '--case-sensitive' : '--ignore-case');
        if (options && options.includeIgnored) {
            args.push('--no-ignore');
        }
        if (options && options.maxFileSize) {
            args.push('--max-filesize=' + options.maxFileSize.trim());
        }
        else {
            args.push('--max-filesize=20M');
        }
        if (options && options.include) {
            try {
                for (var _c = __values(options.include), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var include = _d.value;
                    if (include !== '') {
                        args.push('--glob=**/' + include);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (options && options.exclude) {
            try {
                for (var _e = __values(options.exclude), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var exclude = _f.value;
                    if (exclude !== '') {
                        args.push('--glob=!**/' + exclude);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (options && options.useRegExp || options && options.matchWholeWord) {
            args.push('--regexp');
        }
        else {
            args.push('--fixed-strings');
            args.push('--');
        }
        return args;
    };
    // Search for the string WHAT in directories ROOTURIS.  Return the assigned search id.
    RipgrepSearchInWorkspaceServer.prototype.search = function (what, rootUris, opts) {
        var _this = this;
        // Start the rg process.  Use --vimgrep to get one result per
        // line, --color=always to get color control characters that
        // we'll use to parse the lines.
        var searchId = this.nextSearchId++;
        var rgArgs = this.getArgs(opts);
        // if we use matchWholeWord we use regExp internally,
        // so, we need to escape regexp characters if we actually not set regexp true in UI.
        if (opts && opts.matchWholeWord && !opts.useRegExp) {
            what = what.replace(/[\-\\\{\}\*\+\?\|\^\$\.\[\]\(\)\#]/g, '\\$&');
            if (!/\B/.test(what.charAt(0))) {
                what = '\\b' + what;
            }
            if (!/\B/.test(what.charAt(what.length - 1))) {
                what = what + '\\b';
            }
        }
        var args = __spread(rgArgs, [what]).concat(rootUris.map(function (root) { return file_uri_1.FileUri.fsPath(root); }));
        var processOptions = {
            command: this.rgPath,
            args: args
        };
        // TODO: Use child_process directly instead of rawProcessFactory?
        var rgProcess = this.rawProcessFactory(processOptions);
        this.ongoingSearches.set(searchId, rgProcess);
        rgProcess.onError(function (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var errorCode = error.code;
            // Try to provide somewhat clearer error messages, if possible.
            if (errorCode === 'ENOENT') {
                errorCode = 'could not find the ripgrep (rg) binary';
            }
            else if (errorCode === 'EACCES') {
                errorCode = 'could not execute the ripgrep (rg) binary';
            }
            var errorStr = "An error happened while searching (" + errorCode + ").";
            _this.wrapUpSearch(searchId, errorStr);
        });
        // Running counter of results.
        var numResults = 0;
        // Buffer to accumulate incoming output.
        var databuf = '';
        var currentSearchResult;
        rgProcess.outputStream.on('data', function (chunk) {
            var e_3, _a;
            // We might have already reached the max number of
            // results, sent a TERM signal to rg, but we still get
            // the data that was already output in the mean time.
            // It's not necessary to return early here (the check
            // for maxResults below would avoid sending extra
            // results), but it avoids doing unnecessary work.
            if (opts && opts.maxResults && numResults >= opts.maxResults) {
                return;
            }
            databuf += chunk;
            while (1) {
                // Check if we have a complete line.
                var eolIdx = databuf.indexOf('\n');
                if (eolIdx < 0) {
                    break;
                }
                // Get and remove the line from the data buffer.
                var lineBuf = databuf.slice(0, eolIdx);
                databuf = databuf.slice(eolIdx + 1);
                var obj = JSON.parse(lineBuf);
                if (obj.type === 'begin') {
                    var file = bytesOrTextToString(obj.data.path);
                    if (file) {
                        currentSearchResult = {
                            fileUri: file_uri_1.FileUri.create(file).toString(),
                            root: _this.getRoot(file, rootUris).toString(),
                            matches: []
                        };
                    }
                    else {
                        _this.logger.error('Begin message without path. ' + JSON.stringify(obj));
                    }
                }
                else if (obj.type === 'end') {
                    if (currentSearchResult && _this.client) {
                        _this.client.onResult(searchId, currentSearchResult);
                    }
                    currentSearchResult = undefined;
                }
                else if (obj.type === 'match') {
                    if (!currentSearchResult) {
                        continue;
                    }
                    var data = obj.data;
                    var file = bytesOrTextToString(data.path);
                    var line = data.line_number;
                    var lineText = bytesOrTextToString(data.lines);
                    if (file === undefined || lineText === undefined) {
                        continue;
                    }
                    var lineInBytes = Buffer.from(lineText);
                    try {
                        for (var _b = (e_3 = void 0, __values(data.submatches)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var submatch = _c.value;
                            var startOffset = lineInBytes.slice(0, submatch.start).toString().length;
                            var match = bytesOrTextToString(submatch.match);
                            var lineInfo = lineText.trimRight();
                            if (lineInfo.length > 300) {
                                var prefixLength = 25;
                                var start = Math.max(startOffset - prefixLength, 0);
                                var length_1 = prefixLength + match.length + 70;
                                var prefix = '';
                                if (start >= prefixLength) {
                                    prefix = '...';
                                }
                                var character = (start < prefixLength ? start : prefixLength) + prefix.length + 1;
                                lineInfo = {
                                    text: prefix + lineInfo.substr(start, length_1),
                                    character: character
                                };
                            }
                            currentSearchResult.matches.push({
                                line: line,
                                character: startOffset + 1,
                                length: match.length,
                                lineText: lineInfo
                            });
                            numResults++;
                            // Did we reach the maximum number of results?
                            if (opts && opts.maxResults && numResults >= opts.maxResults) {
                                rgProcess.kill();
                                if (currentSearchResult && _this.client) {
                                    _this.client.onResult(searchId, currentSearchResult);
                                }
                                currentSearchResult = undefined;
                                _this.wrapUpSearch(searchId);
                                break;
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
        });
        rgProcess.outputStream.on('end', function () {
            // If we reached maxResults, we should have already
            // wrapped up the search.  Returning early avoids
            // logging a warning message in wrapUpSearch.
            if (opts && opts.maxResults && numResults >= opts.maxResults) {
                return;
            }
            _this.wrapUpSearch(searchId);
        });
        return Promise.resolve(searchId);
    };
    /**
     * Returns the root folder uri that a file belongs to.
     * In case that a file belongs to more than one root folders, returns the root folder that is closest to the file.
     * If the file is not from the current workspace, returns empty string.
     * @param filePath string path of the file
     * @param rootUris string URIs of the root folders in the current workspace
     */
    RipgrepSearchInWorkspaceServer.prototype.getRoot = function (filePath, rootUris) {
        var roots = rootUris.filter(function (root) { return new uri_1.default(root).withScheme('file').isEqualOrParent(file_uri_1.FileUri.create(filePath).withScheme('file')); });
        if (roots.length > 0) {
            return file_uri_1.FileUri.create(file_uri_1.FileUri.fsPath(roots.sort(function (r1, r2) { return r2.length - r1.length; })[0]));
        }
        return new uri_1.default();
    };
    // Cancel an ongoing search.  Trying to cancel a search that doesn't exist isn't an
    // error, otherwise we'd have to deal with race conditions, where a client cancels a
    // search that finishes normally at the same time.
    RipgrepSearchInWorkspaceServer.prototype.cancel = function (searchId) {
        var process = this.ongoingSearches.get(searchId);
        if (process) {
            process.kill();
            this.wrapUpSearch(searchId);
        }
        return Promise.resolve();
    };
    // Send onDone to the client and clean up what we know about search searchId.
    RipgrepSearchInWorkspaceServer.prototype.wrapUpSearch = function (searchId, error) {
        if (this.ongoingSearches.delete(searchId)) {
            if (this.client) {
                this.logger.debug('Sending onDone for ' + searchId, error);
                this.client.onDone(searchId, error);
            }
            else {
                this.logger.debug('Wrapping up search ' + searchId + ' but no client');
            }
        }
        else {
            this.logger.debug("Trying to wrap up a search we don't know about " + searchId);
        }
    };
    RipgrepSearchInWorkspaceServer.prototype.dispose = function () {
    };
    __decorate([
        inversify_1.inject(exports.RgPath),
        __metadata("design:type", String)
    ], RipgrepSearchInWorkspaceServer.prototype, "rgPath", void 0);
    RipgrepSearchInWorkspaceServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(core_1.ILogger)),
        __param(1, inversify_1.inject(node_1.RawProcessFactory)),
        __metadata("design:paramtypes", [Object, Function])
    ], RipgrepSearchInWorkspaceServer);
    return RipgrepSearchInWorkspaceServer;
}());
exports.RipgrepSearchInWorkspaceServer = RipgrepSearchInWorkspaceServer;
//# sourceMappingURL=ripgrep-search-in-workspace-server.js.map