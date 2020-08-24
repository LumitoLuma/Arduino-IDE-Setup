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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.DugiteGit = exports.GitBlameParser = exports.CommitDetailsParser = exports.CommitPlaceholders = exports.NameStatusParser = exports.OutputParser = void 0;
var fs = require("fs-extra");
var Path = require("path");
var inversify_1 = require("inversify");
var git_1 = require("dugite-extra/lib/core/git");
var push_1 = require("dugite-extra/lib/command/push");
var pull_1 = require("dugite-extra/lib/command/pull");
var clone_1 = require("dugite-extra/lib/command/clone");
var fetch_1 = require("dugite-extra/lib/command/fetch");
var stash_1 = require("dugite-extra/lib/command/stash");
var merge_1 = require("dugite-extra/lib/command/merge");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var status_1 = require("dugite-extra/lib/command/status");
var commit_1 = require("dugite-extra/lib/command/commit");
var stage_1 = require("dugite-extra/lib/command/stage");
var reset_1 = require("dugite-extra/lib/command/reset");
var show_1 = require("dugite-extra/lib/command/show");
var checkout_1 = require("dugite-extra/lib/command/checkout");
var branch_1 = require("dugite-extra/lib/command/branch");
var status_2 = require("dugite-extra/lib/model/status");
var core_1 = require("@theia/core");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var strings = require("@theia/core/lib/common/strings");
var common_1 = require("../common");
var git_repository_manager_1 = require("./git-repository-manager");
var git_locator_protocol_1 = require("./git-locator/git-locator-protocol");
var git_exec_provider_1 = require("./git-exec-provider");
var git_env_provider_1 = require("./env/git-env-provider");
var git_init_1 = require("./init/git-init");
/**
 * Parsing and converting raw Git output into Git model instances.
 */
var OutputParser = /** @class */ (function () {
    function OutputParser() {
    }
    OutputParser.prototype.toUri = function (repositoryUri, pathSegment) {
        return file_uri_1.FileUri.create(Path.join(file_uri_1.FileUri.fsPath(repositoryUri), pathSegment)).toString();
    };
    OutputParser.prototype.split = function (input, delimiter) {
        return (Array.isArray(input) ? input : input.split(delimiter)).filter(function (item) { return item && item.length > 0; });
    };
    /** This is the `NUL` delimiter. Equals wih `%x00`. */
    OutputParser.LINE_DELIMITER = '\0';
    OutputParser = __decorate([
        inversify_1.injectable()
    ], OutputParser);
    return OutputParser;
}());
exports.OutputParser = OutputParser;
/**
 * Status parser for converting raw Git `--name-status` output into file change objects.
 */
var NameStatusParser = /** @class */ (function (_super) {
    __extends(NameStatusParser, _super);
    function NameStatusParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NameStatusParser.prototype.parse = function (repositoryUri, input, delimiter) {
        if (delimiter === void 0) { delimiter = OutputParser.LINE_DELIMITER; }
        var items = this.split(input, delimiter);
        var changes = [];
        var index = 0;
        while (index < items.length) {
            var rawStatus = items[index];
            var status_3 = common_1.GitUtils.mapStatus(rawStatus);
            if (common_1.GitUtils.isSimilarityStatus(rawStatus)) {
                var uri = this.toUri(repositoryUri, items[index + 2]);
                var oldUri = this.toUri(repositoryUri, items[index + 1]);
                changes.push({
                    status: status_3,
                    uri: uri,
                    oldUri: oldUri,
                    staged: true
                });
                index = index + 3;
            }
            else {
                var uri = this.toUri(repositoryUri, items[index + 1]);
                changes.push({
                    status: status_3,
                    uri: uri,
                    staged: true
                });
                index = index + 2;
            }
        }
        return changes;
    };
    NameStatusParser = __decorate([
        inversify_1.injectable()
    ], NameStatusParser);
    return NameStatusParser;
}(OutputParser));
exports.NameStatusParser = NameStatusParser;
/**
 * Built-in Git placeholders for tuning the `--format` option for `git diff` or `git log`.
 */
var CommitPlaceholders;
(function (CommitPlaceholders) {
    CommitPlaceholders["HASH"] = "%H";
    CommitPlaceholders["SHORT_HASH"] = "%h";
    CommitPlaceholders["AUTHOR_EMAIL"] = "%aE";
    CommitPlaceholders["AUTHOR_NAME"] = "%aN";
    CommitPlaceholders["AUTHOR_DATE"] = "%aI";
    CommitPlaceholders["AUTHOR_RELATIVE_DATE"] = "%ar";
    CommitPlaceholders["SUBJECT"] = "%s";
    CommitPlaceholders["BODY"] = "%b";
})(CommitPlaceholders = exports.CommitPlaceholders || (exports.CommitPlaceholders = {}));
/**
 * Parser for converting raw, Git commit details into `CommitWithChanges` instances.
 */
var CommitDetailsParser = /** @class */ (function (_super) {
    __extends(CommitDetailsParser, _super);
    function CommitDetailsParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommitDetailsParser_1 = CommitDetailsParser;
    CommitDetailsParser.prototype.parse = function (repositoryUri, input, delimiter) {
        var e_1, _a;
        if (delimiter === void 0) { delimiter = CommitDetailsParser_1.COMMIT_CHUNK_DELIMITER; }
        var chunks = this.split(input, delimiter);
        var changes = [];
        try {
            for (var chunks_1 = __values(chunks), chunks_1_1 = chunks_1.next(); !chunks_1_1.done; chunks_1_1 = chunks_1.next()) {
                var chunk = chunks_1_1.value;
                var _b = __read(chunk.trim().split(CommitDetailsParser_1.ENTRY_DELIMITER), 8), sha = _b[0], email = _b[1], name_1 = _b[2], timestamp = _b[3], authorDateRelative = _b[4], summary = _b[5], body = _b[6], rawChanges = _b[7];
                var fileChanges = this.nameStatusParser.parse(repositoryUri, (rawChanges || '').trim());
                changes.push({
                    sha: sha,
                    author: { timestamp: timestamp, email: email, name: name_1 },
                    authorDateRelative: authorDateRelative,
                    summary: summary,
                    body: body,
                    fileChanges: fileChanges
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (chunks_1_1 && !chunks_1_1.done && (_a = chunks_1.return)) _a.call(chunks_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return changes;
    };
    CommitDetailsParser.prototype.getFormat = function () {
        var placeholders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            placeholders[_i] = arguments[_i];
        }
        return '%x02' + placeholders.join('%x01') + '%x01';
    };
    var CommitDetailsParser_1;
    CommitDetailsParser.ENTRY_DELIMITER = '\x01';
    CommitDetailsParser.COMMIT_CHUNK_DELIMITER = '\x02';
    CommitDetailsParser.DEFAULT_PLACEHOLDERS = [
        CommitPlaceholders.HASH,
        CommitPlaceholders.AUTHOR_EMAIL,
        CommitPlaceholders.AUTHOR_NAME,
        CommitPlaceholders.AUTHOR_DATE,
        CommitPlaceholders.AUTHOR_RELATIVE_DATE,
        CommitPlaceholders.SUBJECT,
        CommitPlaceholders.BODY
    ];
    __decorate([
        inversify_1.inject(NameStatusParser),
        __metadata("design:type", NameStatusParser)
    ], CommitDetailsParser.prototype, "nameStatusParser", void 0);
    CommitDetailsParser = CommitDetailsParser_1 = __decorate([
        inversify_1.injectable()
    ], CommitDetailsParser);
    return CommitDetailsParser;
}(OutputParser));
exports.CommitDetailsParser = CommitDetailsParser;
var GitBlameParser = /** @class */ (function () {
    function GitBlameParser() {
    }
    GitBlameParser_1 = GitBlameParser;
    GitBlameParser.prototype.parse = function (fileUri, gitBlameOutput, commitBody) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedEntries;
            return __generator(this, function (_a) {
                if (!gitBlameOutput) {
                    return [2 /*return*/, undefined];
                }
                parsedEntries = this.parseEntries(gitBlameOutput);
                return [2 /*return*/, this.createFileBlame(fileUri, parsedEntries, commitBody)];
            });
        });
    };
    GitBlameParser.prototype.parseEntries = function (rawOutput) {
        var e_2, _a;
        var result = [];
        var current;
        try {
            for (var _b = __values(strings.split(rawOutput, '\n')), _c = _b.next(); !_c.done; _c = _b.next()) {
                var line = _c.value;
                if (current === undefined) {
                    current = {};
                }
                if (GitBlameParser_1.pumpEntry(current, line)) {
                    result.push(current);
                    current = undefined;
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
        return result;
    };
    GitBlameParser.prototype.createFileBlame = function (uri, blameEntries, commitBody) {
        return __awaiter(this, void 0, void 0, function () {
            var commits, lines, blameEntries_1, blameEntries_1_1, entry, sha, commit, _a, lineCount, lineOffset, line, e_3_1, fileBlame;
            var e_3, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        commits = new Map();
                        lines = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, 8, 9]);
                        blameEntries_1 = __values(blameEntries), blameEntries_1_1 = blameEntries_1.next();
                        _c.label = 2;
                    case 2:
                        if (!!blameEntries_1_1.done) return [3 /*break*/, 6];
                        entry = blameEntries_1_1.value;
                        sha = entry.sha;
                        commit = commits.get(sha);
                        if (!!commit) return [3 /*break*/, 4];
                        _a = {
                            sha: sha,
                            author: {
                                name: entry.author,
                                email: entry.authorMail,
                                timestamp: entry.authorTime ? new Date(entry.authorTime * 1000).toISOString() : '',
                            },
                            summary: entry.summary
                        };
                        return [4 /*yield*/, commitBody(sha)];
                    case 3:
                        commit = (_a.body = _c.sent(),
                            _a);
                        commits.set(sha, commit);
                        _c.label = 4;
                    case 4:
                        lineCount = entry.lineCount;
                        for (lineOffset = 0; lineOffset < lineCount; lineOffset++) {
                            line = {
                                sha: sha,
                                line: entry.line + lineOffset
                            };
                            lines[line.line] = line;
                        }
                        _c.label = 5;
                    case 5:
                        blameEntries_1_1 = blameEntries_1.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_3_1 = _c.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (blameEntries_1_1 && !blameEntries_1_1.done && (_b = blameEntries_1.return)) _b.call(blameEntries_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        fileBlame = { uri: uri, commits: Array.from(commits.values()), lines: lines };
                        return [2 /*return*/, fileBlame];
                }
            });
        });
    };
    var GitBlameParser_1;
    GitBlameParser = GitBlameParser_1 = __decorate([
        inversify_1.injectable()
    ], GitBlameParser);
    return GitBlameParser;
}());
exports.GitBlameParser = GitBlameParser;
(function (GitBlameParser) {
    function isUncommittedSha(sha) {
        return (sha || '').startsWith('0000000');
    }
    GitBlameParser.isUncommittedSha = isUncommittedSha;
    function pumpEntry(entry, outputLine) {
        var parts = outputLine.split(' ');
        if (parts.length < 2) {
            return false;
        }
        var uncommitted = isUncommittedSha(entry.sha);
        var firstPart = parts[0];
        if (entry.sha === undefined) {
            entry.sha = firstPart;
            entry.line = parseInt(parts[2], 10) - 1; // to zero based
            entry.lineCount = parseInt(parts[3], 10);
        }
        else if (firstPart === 'author') {
            entry.author = uncommitted ? 'You' : parts.slice(1).join(' ');
        }
        else if (firstPart === 'author-mail') {
            var rest = parts.slice(1).join(' ');
            var matches = rest.match(/(<(.*)>)/);
            entry.authorMail = matches ? matches[2] : rest;
        }
        else if (firstPart === 'author-time') {
            entry.authorTime = parseInt(parts[1], 10);
        }
        else if (firstPart === 'summary') {
            var summary = parts.slice(1).join(' ');
            if (summary.startsWith('"') && summary.endsWith('"')) {
                summary = summary.substr(1, summary.length - 2);
            }
            entry.summary = uncommitted ? 'uncommitted' : summary;
        }
        else if (firstPart === 'previous') {
            entry.previousSha = parts[1];
        }
        else if (firstPart === 'filename') {
            entry.fileName = parts.slice(1).join(' ');
            return true;
        }
        return false;
    }
    GitBlameParser.pumpEntry = pumpEntry;
})(GitBlameParser = exports.GitBlameParser || (exports.GitBlameParser = {}));
exports.GitBlameParser = GitBlameParser;
/**
 * `dugite-extra` based Git implementation.
 */
var DugiteGit = /** @class */ (function () {
    function DugiteGit() {
        this.limit = 1000;
        this.ready = new promise_util_1.Deferred();
        this.gitEnv = new promise_util_1.Deferred();
    }
    DugiteGit.prototype.init = function () {
        var _this = this;
        this.envProvider.getEnv().then(function (env) { return _this.gitEnv.resolve(env); });
        this.gitInit.init()
            .catch(function (err) {
            _this.logger.error('An error occurred during the Git initialization.', err);
            _this.ready.resolve();
        })
            .then(function () { return _this.ready.resolve(); });
    };
    DugiteGit.prototype.dispose = function () {
        this.locator.dispose();
        this.execProvider.dispose();
        this.gitInit.dispose();
    };
    DugiteGit.prototype.clone = function (remoteUrl, options) {
        return __awaiter(this, void 0, void 0, function () {
            var localUri, branch, _a, exec, env;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        localUri = options.localUri, branch = options.branch;
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [4 /*yield*/, clone_1.clone(remoteUrl, this.getFsPath(localUri), { branch: branch }, { exec: exec, env: env })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, { localUri: localUri }];
                }
            });
        });
    };
    DugiteGit.prototype.repositories = function (workspaceRootUri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var workspaceRootPath, repositories, containingPath, maxCount, _a, _b, repositoryPath, e_4_1;
            var e_4, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _d.sent();
                        workspaceRootPath = this.getFsPath(workspaceRootUri);
                        repositories = [];
                        return [4 /*yield*/, this.resolveContainingPath(workspaceRootPath)];
                    case 2:
                        containingPath = _d.sent();
                        if (containingPath) {
                            repositories.push({
                                localUri: this.getUri(containingPath)
                            });
                        }
                        maxCount = typeof options.maxCount === 'number' ? options.maxCount - repositories.length : undefined;
                        if (typeof maxCount === 'number' && maxCount <= 0) {
                            return [2 /*return*/, repositories];
                        }
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 8, 9, 10]);
                        return [4 /*yield*/, this.locator.locate(workspaceRootPath, {
                                maxCount: maxCount
                            })];
                    case 4:
                        _a = __values.apply(void 0, [_d.sent()]), _b = _a.next();
                        _d.label = 5;
                    case 5:
                        if (!!_b.done) return [3 /*break*/, 7];
                        repositoryPath = _b.value;
                        if (containingPath !== repositoryPath) {
                            repositories.push({
                                localUri: this.getUri(repositoryPath)
                            });
                        }
                        _d.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 5];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_4_1 = _d.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, repositories];
                }
            });
        });
    };
    DugiteGit.prototype.status = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, _a, exec, env, dugiteStatus;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [4 /*yield*/, status_1.getStatus(repositoryPath, true, this.limit, { exec: exec, env: env })];
                    case 3:
                        dugiteStatus = _b.sent();
                        return [2 /*return*/, this.mapStatus(dugiteStatus, repository)];
                }
            });
        });
    };
    DugiteGit.prototype.add = function (repository, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var paths, _a, exec, env;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        paths = (Array.isArray(uri) ? uri : [uri]).map(file_uri_1.FileUri.fsPath);
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [2 /*return*/, this.manager.run(repository, function () {
                                return stage_1.stage(_this.getFsPath(repository), paths, { exec: exec, env: env });
                            })];
                }
            });
        });
    };
    DugiteGit.prototype.unstage = function (repository, uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var paths, treeish, where, _a, exec, env;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        paths = (Array.isArray(uri) ? uri : [uri]).map(file_uri_1.FileUri.fsPath);
                        treeish = options && options.treeish ? options.treeish : undefined;
                        where = options && options.reset ? options.reset : undefined;
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [2 /*return*/, this.manager.run(repository, function () {
                                return stage_1.unstage(_this.getFsPath(repository), paths, treeish, where, { exec: exec, env: env });
                            })];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DugiteGit.prototype.branch = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exec, env, repositoryPath, currentBranch, branches;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        repositoryPath = this.getFsPath(repository);
                        if (!common_1.GitUtils.isBranchList(options)) return [3 /*break*/, 6];
                        if (!(options.type === 'current')) return [3 /*break*/, 4];
                        return [4 /*yield*/, branch_1.listBranch(repositoryPath, options.type, { exec: exec, env: env })];
                    case 3:
                        currentBranch = _b.sent();
                        return [2 /*return*/, currentBranch ? this.mapBranch(currentBranch) : undefined];
                    case 4: return [4 /*yield*/, branch_1.listBranch(repositoryPath, options.type, { exec: exec, env: env })];
                    case 5:
                        branches = _b.sent();
                        return [2 /*return*/, Promise.all(branches.map(function (branch) { return _this.mapBranch(branch); }))];
                    case 6: return [2 /*return*/, this.manager.run(repository, function () {
                            if (common_1.GitUtils.isBranchCreate(options)) {
                                return branch_1.createBranch(repositoryPath, options.toCreate, { startPoint: options.startPoint }, { exec: exec, env: env });
                            }
                            if (common_1.GitUtils.isBranchRename(options)) {
                                return branch_1.renameBranch(repositoryPath, options.newName, options.newName, { force: !!options.force }, { exec: exec, env: env });
                            }
                            if (common_1.GitUtils.isBranchDelete(options)) {
                                return branch_1.deleteBranch(repositoryPath, options.toDelete, { force: !!options.force, remote: !!options.remote }, { exec: exec, env: env });
                            }
                            return _this.fail(repository, "Unexpected git branch options: " + options + ".");
                        })];
                }
            });
        });
    };
    DugiteGit.prototype.checkout = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exec, env;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [2 /*return*/, this.manager.run(repository, function () {
                                var repositoryPath = _this.getFsPath(repository);
                                if (common_1.GitUtils.isBranchCheckout(options)) {
                                    return checkout_1.checkoutBranch(repositoryPath, options.branch, { exec: exec, env: env });
                                }
                                if (common_1.GitUtils.isWorkingTreeFileCheckout(options)) {
                                    var paths = (Array.isArray(options.paths) ? options.paths : [options.paths]).map(file_uri_1.FileUri.fsPath);
                                    return checkout_1.checkoutPaths(repositoryPath, paths, { exec: exec, env: env });
                                }
                                return _this.fail(repository, "Unexpected git checkout options: " + options + ".");
                            })];
                }
            });
        });
    };
    DugiteGit.prototype.commit = function (repository, message, options) {
        return __awaiter(this, void 0, void 0, function () {
            var signOff, amend, _a, exec, env;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        signOff = options && options.signOff;
                        amend = options && options.amend;
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [2 /*return*/, this.manager.run(repository, function () {
                                return commit_1.createCommit(_this.getFsPath(repository), message || '', signOff, amend, { exec: exec, env: env });
                            })];
                }
            });
        });
    };
    DugiteGit.prototype.fetch = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, r, _a, exec_1, env_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, this.getDefaultRemote(repositoryPath, options ? options.remote : undefined)];
                    case 2:
                        r = _b.sent();
                        if (!r) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 3:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec_1 = _a[0], env_1 = _a[1];
                        return [2 /*return*/, this.manager.run(repository, function () {
                                return fetch_1.fetch(repositoryPath, r, { exec: exec_1, env: env_1 });
                            })];
                    case 4:
                        this.fail(repository, 'No remote repository specified. Please, specify either a URL or a remote name from which new revisions should be fetched.');
                        return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.push = function (repository, _a) {
        var _b = _a === void 0 ? {} : _a, remote = _b.remote, localBranch = _b.localBranch, remoteBranch = _b.remoteBranch, setUpstream = _b.setUpstream, force = _b.force;
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, currentRemote, branch, branchName, args, _c, exec_2, env_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _d.sent();
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, this.getDefaultRemote(repositoryPath, remote)];
                    case 2:
                        currentRemote = _d.sent();
                        if (currentRemote === undefined) {
                            this.fail(repository, 'No configured push destination.');
                        }
                        return [4 /*yield*/, this.getCurrentBranch(repositoryPath, localBranch)];
                    case 3:
                        branch = _d.sent();
                        branchName = typeof branch === 'string' ? branch : branch.name;
                        if (!(setUpstream || force)) return [3 /*break*/, 5];
                        args = ['push'];
                        if (force) {
                            args.push('--force');
                        }
                        if (setUpstream) {
                            args.push('--set-upstream');
                        }
                        if (currentRemote) {
                            args.push(currentRemote);
                        }
                        args.push(branchName + (remoteBranch ? ":" + remoteBranch : ''));
                        return [4 /*yield*/, this.exec(repository, args)];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 6:
                        _c = __read.apply(void 0, [_d.sent(), 2]), exec_2 = _c[0], env_2 = _c[1];
                        return [2 /*return*/, this.manager.run(repository, function () {
                                return push_1.push(repositoryPath, currentRemote, branchName, remoteBranch, { exec: exec_2, env: env_2 });
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.pull = function (repository, _a) {
        var _b = _a === void 0 ? {} : _a, remote = _b.remote, branch = _b.branch, rebase = _b.rebase;
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, currentRemote, args, _c, exec_3, env_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _d.sent();
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, this.getDefaultRemote(repositoryPath, remote)];
                    case 2:
                        currentRemote = _d.sent();
                        if (currentRemote === undefined) {
                            this.fail(repository, 'No remote repository specified. Please, specify either a URL or a remote name from which new revisions should be fetched.');
                        }
                        if (!rebase) return [3 /*break*/, 4];
                        args = ['pull'];
                        if (rebase) {
                            args.push('-r');
                        }
                        if (currentRemote) {
                            args.push(currentRemote);
                        }
                        if (branch) {
                            args.push(branch);
                        }
                        return [4 /*yield*/, this.exec(repository, args)];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 5:
                        _c = __read.apply(void 0, [_d.sent(), 2]), exec_3 = _c[0], env_3 = _c[1];
                        return [2 /*return*/, this.manager.run(repository, function () { return pull_1.pull(repositoryPath, currentRemote, branch, { exec: exec_3, env: env_3 }); })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.reset = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, mode, _a, exec, env;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        repositoryPath = this.getFsPath(repository);
                        mode = this.getResetMode(options.mode);
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [2 /*return*/, this.manager.run(repository, function () {
                                return reset_1.reset(repositoryPath, mode, options.ref ? options.ref : 'HEAD', { exec: exec, env: env });
                            })];
                }
            });
        });
    };
    DugiteGit.prototype.merge = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, _a, exec, env;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [2 /*return*/, this.manager.run(repository, function () {
                                return merge_1.merge(repositoryPath, options.branch, { exec: exec, env: env });
                            })];
                }
            });
        });
    };
    DugiteGit.prototype.show = function (repository, uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var encoding, commitish, repositoryPath, path, _a, exec, env;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        encoding = options ? options.encoding || 'utf8' : 'utf8';
                        commitish = this.getCommitish(options);
                        repositoryPath = this.getFsPath(repository);
                        path = this.getFsPath(uri);
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        if (!(encoding === 'binary')) return [3 /*break*/, 4];
                        return [4 /*yield*/, show_1.getBlobContents(repositoryPath, commitish, path, { exec: exec, env: env })];
                    case 3: return [2 /*return*/, (_b.sent()).toString()];
                    case 4: return [4 /*yield*/, show_1.getTextContents(repositoryPath, commitish, path, { exec: exec, env: env })];
                    case 5: return [2 /*return*/, (_b.sent()).toString()];
                }
            });
        });
    };
    DugiteGit.prototype.stash = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, _a, stashList, stashes_1, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 15, , 16]);
                        if (!(!options || (options && !options.action))) return [3 /*break*/, 3];
                        return [4 /*yield*/, stash_1.stash.push(repositoryPath, options ? options.message : undefined)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                    case 3:
                        _a = options.action;
                        switch (_a) {
                            case 'push': return [3 /*break*/, 4];
                            case 'apply': return [3 /*break*/, 6];
                            case 'pop': return [3 /*break*/, 8];
                            case 'list': return [3 /*break*/, 10];
                            case 'drop': return [3 /*break*/, 12];
                        }
                        return [3 /*break*/, 14];
                    case 4: return [4 /*yield*/, stash_1.stash.push(repositoryPath, options.message)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 6: return [4 /*yield*/, stash_1.stash.apply(repositoryPath, options.id)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 8: return [4 /*yield*/, stash_1.stash.pop(repositoryPath, options.id)];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 10: return [4 /*yield*/, stash_1.stash.list(repositoryPath)];
                    case 11:
                        stashList = _b.sent();
                        stashes_1 = [];
                        stashList.forEach(function (stashItem) {
                            var splitIndex = stashItem.indexOf(':');
                            stashes_1.push({
                                id: stashItem.substring(0, splitIndex),
                                message: stashItem.substring(splitIndex + 1)
                            });
                        });
                        return [2 /*return*/, stashes_1];
                    case 12: return [4 /*yield*/, stash_1.stash.drop(repositoryPath, options.id)];
                    case 13:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        err_1 = _b.sent();
                        this.fail(repository, err_1);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.remote = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, remotes, names;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _a.sent();
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, this.getRemotes(repositoryPath)];
                    case 2:
                        remotes = _a.sent();
                        names = remotes.map(function (a) { return a.name; });
                        return [2 /*return*/, (options && options.verbose === true) ? remotes : names];
                }
            });
        });
    };
    DugiteGit.prototype.exec = function (repository, args, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _a.sent();
                        repositoryPath = this.getFsPath(repository);
                        return [2 /*return*/, this.manager.run(repository, function () { return __awaiter(_this, void 0, void 0, function () {
                                var name, _a, exec, env, opts;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            name = options && options.name ? options.name : '';
                                            return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                                        case 1:
                                            _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                                            opts = {};
                                            if (options) {
                                                opts = __assign({}, options);
                                                if (options.successExitCodes) {
                                                    opts = __assign(__assign({}, opts), { successExitCodes: new Set(options.successExitCodes) });
                                                }
                                                if (options.expectedErrors) {
                                                    opts = __assign(__assign({}, opts), { expectedErrors: new Set(options.expectedErrors) });
                                                }
                                            }
                                            opts = __assign(__assign({}, opts), { exec: exec,
                                                env: env });
                                            return [2 /*return*/, git_1.git(args, repositoryPath, name, opts)];
                                    }
                                });
                            }); })];
                }
            });
        });
    };
    DugiteGit.prototype.diff = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var args, relativePath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _a.sent();
                        args = ['diff', '--name-status', '-C', '-M', '-z'];
                        args.push(this.mapRange((options || {}).range));
                        if (options && options.uri) {
                            relativePath = Path.relative(this.getFsPath(repository), this.getFsPath(options.uri));
                            args.push.apply(args, __spread(['--', relativePath !== '' ? relativePath : '.']));
                        }
                        return [4 /*yield*/, this.exec(repository, args)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.nameStatusParser.parse(repository.localUri, result.stdout.trim())];
                }
            });
        });
    };
    DugiteGit.prototype.log = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var args, range, maxCount, placeholders, file, successExitCodes, result, rangeInvolvesHead, repositoryHasNoHead;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        args = ['log'];
                        if (options && options.branch) {
                            args.push(options.branch);
                        }
                        range = this.mapRange((options || {}).range);
                        args.push.apply(args, __spread([range, '-C', '-M', '-m', '--first-parent']));
                        maxCount = options && options.maxCount ? options.maxCount : 0;
                        if (Number.isInteger(maxCount) && maxCount > 0) {
                            args.push.apply(args, __spread(['-n', "" + maxCount]));
                        }
                        placeholders = options && options.shortSha ? __spread([CommitPlaceholders.SHORT_HASH], CommitDetailsParser.DEFAULT_PLACEHOLDERS.slice(1)) : CommitDetailsParser.DEFAULT_PLACEHOLDERS;
                        args.push.apply(args, __spread(['--name-status', '--date=unix', "--format=" + (_a = this.commitDetailsParser).getFormat.apply(_a, __spread(placeholders)), '-z', '--']));
                        if (options && options.uri) {
                            file = Path.relative(this.getFsPath(repository), this.getFsPath(options.uri)) || '.';
                            args.push.apply(args, __spread([file]));
                        }
                        successExitCodes = [0, 128];
                        return [4 /*yield*/, this.exec(repository, args, { successExitCodes: successExitCodes })];
                    case 2:
                        result = _b.sent();
                        if (!(result.exitCode !== 0)) return [3 /*break*/, 5];
                        rangeInvolvesHead = !options || !options.range || options.range.toRevision === 'HEAD';
                        return [4 /*yield*/, this.revParse(repository, { ref: 'HEAD' })];
                    case 3:
                        repositoryHasNoHead = !(_b.sent());
                        // The 'log' command could potentially be valid when no HEAD if the revision range does not involve HEAD */
                        if (rangeInvolvesHead && repositoryHasNoHead) {
                            // The range involves HEAD but there is no HEAD.  'no head' most likely means a newly created repository with
                            // no commits, but could potentially have commits with no HEAD.  This is effectively an empty repository.
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.exec(repository, args)];
                    case 4:
                        // Either the range did not involve HEAD or HEAD exists.  The error must be something else,
                        // so re-run but this time we don't ignore the error.
                        result = _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, this.commitDetailsParser.parse(repository.localUri, result.stdout.trim()
                            .split(CommitDetailsParser.COMMIT_CHUNK_DELIMITER)
                            .filter(function (item) { return item && item.length > 0; }))];
                }
            });
        });
    };
    DugiteGit.prototype.revParse = function (repository, options) {
        return __awaiter(this, void 0, void 0, function () {
            var ref, successExitCodes, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ref = options.ref;
                        successExitCodes = [0, 128];
                        return [4 /*yield*/, this.exec(repository, ['rev-parse', ref], { successExitCodes: successExitCodes })];
                    case 1:
                        result = _a.sent();
                        if (result.exitCode === 0) {
                            return [2 /*return*/, result.stdout]; // sha
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.blame = function (repository, uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var args, file, repositoryPath, _a, exec, env, status, isUncommitted, changes, stdin, gitResult, output, commitBodyReader, blame;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        args = ['blame', '--root', '--incremental'];
                        file = Path.relative(this.getFsPath(repository), this.getFsPath(uri));
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [4 /*yield*/, status_1.getStatus(repositoryPath, true, this.limit, { exec: exec, env: env })];
                    case 3:
                        status = _b.sent();
                        isUncommitted = function (change) { return change.status === status_2.AppFileStatus.New && change.path === file; };
                        changes = status.workingDirectory.files;
                        if (changes.some(isUncommitted)) {
                            return [2 /*return*/, undefined];
                        }
                        stdin = options ? options.content : undefined;
                        if (stdin) {
                            args.push('--contents', '-');
                        }
                        return [4 /*yield*/, this.exec(repository, __spread(args, ['--', file]), { stdin: stdin })];
                    case 4:
                        gitResult = _b.sent();
                        output = gitResult.stdout.trim();
                        commitBodyReader = function (sha) { return __awaiter(_this, void 0, void 0, function () {
                            var revResult, revOutput, nl;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (GitBlameParser.isUncommittedSha(sha)) {
                                            return [2 /*return*/, ''];
                                        }
                                        return [4 /*yield*/, this.exec(repository, ['rev-list', '--format=%B', '--max-count=1', sha])];
                                    case 1:
                                        revResult = _a.sent();
                                        revOutput = revResult.stdout;
                                        nl = revOutput.indexOf('\n');
                                        if (nl > 0) {
                                            nl = revOutput.indexOf('\n', nl + 1);
                                        }
                                        return [2 /*return*/, revOutput.substr(Math.max(0, nl)).trim()];
                                }
                            });
                        }); };
                        return [4 /*yield*/, this.blameParser.parse(uri, output, commitBodyReader)];
                    case 5:
                        blame = _b.sent();
                        return [2 /*return*/, blame];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DugiteGit.prototype.lsFiles = function (repository, uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var args, relativePath, file, successExitCodes, expectedErrors, result, exitCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _a.sent();
                        args = ['ls-files'];
                        relativePath = Path.relative(this.getFsPath(repository), this.getFsPath(uri));
                        file = (relativePath === '') ? '.' : relativePath;
                        if (!(options && options.errorUnmatch)) return [3 /*break*/, 3];
                        args.push('--error-unmatch', file);
                        successExitCodes = [0, 1];
                        expectedErrors = [common_1.GitError.OutsideRepository];
                        return [4 /*yield*/, this.exec(repository, args, { successExitCodes: successExitCodes, expectedErrors: expectedErrors })];
                    case 2:
                        result = _a.sent();
                        exitCode = result.exitCode;
                        return [2 /*return*/, exitCode === 0];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.getCommitish = function (options) {
        if (options && options.commitish) {
            return 'index' === options.commitish ? '' : options.commitish;
        }
        return '';
    };
    // TODO: akitta what about symlinks? What if the workspace root is a symlink?
    // Maybe, we should use `--show-cdup` here instead of `--show-toplevel` because `show-toplevel` dereferences symlinks.
    DugiteGit.prototype.resolveContainingPath = function (repositoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exec, env, options, result, out;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        options = { successExitCodes: new Set([0, 128]), exec: exec, env: env };
                        return [4 /*yield*/, git_1.git(['rev-parse', '--show-toplevel'], repositoryPath, 'rev-parse', options)];
                    case 3:
                        result = _b.sent();
                        out = result.stdout;
                        if (out && out.length !== 0) {
                            try {
                                return [2 /*return*/, fs.realpathSync(out.trim())];
                            }
                            catch (e) {
                                this.logger.error(e);
                                return [2 /*return*/, undefined];
                            }
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    DugiteGit.prototype.getRemotes = function (repositoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exec, env, result, out, results, values, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [4 /*yield*/, git_1.git(['remote', '-v'], repositoryPath, 'remote', { exec: exec, env: env })];
                    case 3:
                        result = _b.sent();
                        out = result.stdout || '';
                        results = out.trim().match(/\S+/g);
                        if (results) {
                            values = [];
                            for (i = 0; i < results.length; i += 6) {
                                values.push({ name: results[i], fetch: results[i + 1], push: results[i + 4] });
                            }
                            return [2 /*return*/, values];
                        }
                        else {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DugiteGit.prototype.getDefaultRemote = function (repositoryPath, remote) {
        return __awaiter(this, void 0, void 0, function () {
            var remotes, name_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(remote === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getRemotes(repositoryPath)];
                    case 1:
                        remotes = _a.sent();
                        name_2 = remotes.map(function (a) { return a.name; });
                        return [2 /*return*/, name_2.shift()];
                    case 2: return [2 /*return*/, remote];
                }
            });
        });
    };
    DugiteGit.prototype.getCurrentBranch = function (repositoryPath, localBranch) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exec, env, branch;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        _b.sent();
                        if (localBranch !== undefined) {
                            return [2 /*return*/, localBranch];
                        }
                        return [4 /*yield*/, Promise.all([this.execProvider.exec(), this.gitEnv.promise])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), exec = _a[0], env = _a[1];
                        return [4 /*yield*/, branch_1.listBranch(repositoryPath, 'current', { exec: exec, env: env })];
                    case 3:
                        branch = _b.sent();
                        if (branch === undefined) {
                            return [2 /*return*/, this.fail(repositoryPath, 'No current branch.')];
                        }
                        if (Array.isArray(branch)) {
                            return [2 /*return*/, this.fail(repositoryPath, "Implementation error. Listing branch with the 'current' flag must return with single value. Was: " + branch)];
                        }
                        return [2 /*return*/, this.mapBranch(branch)];
                }
            });
        });
    };
    DugiteGit.prototype.getResetMode = function (mode) {
        switch (mode) {
            case 'hard': return 0 /* Hard */;
            case 'soft': return 1 /* Soft */;
            case 'mixed': return 2 /* Mixed */;
            default: throw new Error("Unexpected Git reset mode: " + mode + ".");
        }
    };
    DugiteGit.prototype.mapBranch = function (toMap) {
        return __awaiter(this, void 0, void 0, function () {
            var tip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapTip(toMap.tip)];
                    case 1:
                        tip = _a.sent();
                        return [2 /*return*/, {
                                name: toMap.name,
                                nameWithoutRemote: toMap.nameWithoutRemote,
                                remote: toMap.remote,
                                type: toMap.type,
                                upstream: toMap.upstream,
                                upstreamWithoutRemote: toMap.upstreamWithoutRemote,
                                tip: tip
                            }];
                }
            });
        });
    };
    DugiteGit.prototype.mapTip = function (toMap) {
        return __awaiter(this, void 0, void 0, function () {
            var author;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mapCommitIdentity(toMap.author)];
                    case 1:
                        author = _a.sent();
                        return [2 /*return*/, {
                                author: author,
                                body: toMap.body,
                                parentSHAs: __spread(toMap.parentSHAs),
                                sha: toMap.sha,
                                summary: toMap.summary
                            }];
                }
            });
        });
    };
    DugiteGit.prototype.mapCommitIdentity = function (toMap) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        timestamp: toMap.date.toISOString(),
                        email: toMap.email,
                        name: toMap.name,
                    }];
            });
        });
    };
    DugiteGit.prototype.mapStatus = function (toMap, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var repositoryPath, _a, aheadBehind, changes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        repositoryPath = this.getFsPath(repository);
                        return [4 /*yield*/, Promise.all([this.mapAheadBehind(toMap.branchAheadBehind), this.mapFileChanges(toMap.workingDirectory, repositoryPath)])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), aheadBehind = _a[0], changes = _a[1];
                        return [2 /*return*/, {
                                exists: toMap.exists,
                                branch: toMap.currentBranch,
                                upstreamBranch: toMap.currentUpstreamBranch,
                                aheadBehind: aheadBehind,
                                changes: changes,
                                currentHead: toMap.currentTip,
                                incomplete: toMap.incomplete
                            }];
                }
            });
        });
    };
    DugiteGit.prototype.mapAheadBehind = function (toMap) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, toMap ? __assign({}, toMap) : undefined];
            });
        });
    };
    DugiteGit.prototype.mapFileChanges = function (toMap, repositoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(toMap.files.map(function (file) { return _this.mapFileChange(file, repositoryPath); }))];
            });
        });
    };
    DugiteGit.prototype.mapFileChange = function (toMap, repositoryPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, uri, status, oldUri;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.getUri(Path.join(repositoryPath, toMap.path)),
                            this.mapFileStatus(toMap.status),
                            toMap.oldPath ? this.getUri(Path.join(repositoryPath, toMap.oldPath)) : undefined
                        ])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 3]), uri = _a[0], status = _a[1], oldUri = _a[2];
                        return [2 /*return*/, {
                                uri: uri,
                                status: status,
                                oldUri: oldUri,
                                staged: toMap.staged
                            }];
                }
            });
        });
    };
    DugiteGit.prototype.mapFileStatus = function (toMap) {
        switch (toMap) {
            case status_2.AppFileStatus.Conflicted: return common_1.GitFileStatus.Conflicted;
            case status_2.AppFileStatus.Copied: return common_1.GitFileStatus.Copied;
            case status_2.AppFileStatus.Deleted: return common_1.GitFileStatus.Deleted;
            case status_2.AppFileStatus.Modified: return common_1.GitFileStatus.Modified;
            case status_2.AppFileStatus.New: return common_1.GitFileStatus.New;
            case status_2.AppFileStatus.Renamed: return common_1.GitFileStatus.Renamed;
            default: throw new Error("Unexpected application file status: " + toMap);
        }
    };
    DugiteGit.prototype.mapRange = function (toMap) {
        var range = 'HEAD';
        if (toMap) {
            if (typeof toMap.fromRevision === 'number') {
                var toRevision = toMap.toRevision || 'HEAD';
                range = toRevision + "~" + toMap.fromRevision + ".." + toRevision;
            }
            else if (typeof toMap.fromRevision === 'string') {
                range = "" + toMap.fromRevision + (toMap.toRevision ? '..' + toMap.toRevision : '');
            }
            else if (toMap.toRevision) {
                range = toMap.toRevision;
            }
        }
        return range;
    };
    DugiteGit.prototype.getFsPath = function (repository) {
        var uri = typeof repository === 'string' ? repository : repository.localUri;
        return file_uri_1.FileUri.fsPath(uri);
    };
    DugiteGit.prototype.getUri = function (path) {
        return file_uri_1.FileUri.create(path).toString();
    };
    DugiteGit.prototype.fail = function (repository, message) {
        var p = typeof repository === 'string' ? repository : repository.localUri;
        var m = message ? message + " " : '';
        throw new Error(m + "[" + p + "]");
    };
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], DugiteGit.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(git_locator_protocol_1.GitLocator),
        __metadata("design:type", Object)
    ], DugiteGit.prototype, "locator", void 0);
    __decorate([
        inversify_1.inject(git_repository_manager_1.GitRepositoryManager),
        __metadata("design:type", git_repository_manager_1.GitRepositoryManager)
    ], DugiteGit.prototype, "manager", void 0);
    __decorate([
        inversify_1.inject(NameStatusParser),
        __metadata("design:type", NameStatusParser)
    ], DugiteGit.prototype, "nameStatusParser", void 0);
    __decorate([
        inversify_1.inject(CommitDetailsParser),
        __metadata("design:type", CommitDetailsParser)
    ], DugiteGit.prototype, "commitDetailsParser", void 0);
    __decorate([
        inversify_1.inject(GitBlameParser),
        __metadata("design:type", GitBlameParser)
    ], DugiteGit.prototype, "blameParser", void 0);
    __decorate([
        inversify_1.inject(git_exec_provider_1.GitExecProvider),
        __metadata("design:type", git_exec_provider_1.GitExecProvider)
    ], DugiteGit.prototype, "execProvider", void 0);
    __decorate([
        inversify_1.inject(git_env_provider_1.GitEnvProvider),
        __metadata("design:type", Object)
    ], DugiteGit.prototype, "envProvider", void 0);
    __decorate([
        inversify_1.inject(git_init_1.GitInit),
        __metadata("design:type", Object)
    ], DugiteGit.prototype, "gitInit", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DugiteGit.prototype, "init", null);
    DugiteGit = __decorate([
        inversify_1.injectable()
    ], DugiteGit);
    return DugiteGit;
}());
exports.DugiteGit = DugiteGit;
//# sourceMappingURL=dugite-git.js.map