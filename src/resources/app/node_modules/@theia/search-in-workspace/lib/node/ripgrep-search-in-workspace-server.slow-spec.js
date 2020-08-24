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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var mock_logger_1 = require("@theia/core/lib/common/test/mock-logger");
var node_1 = require("@theia/process/lib/node");
var ripgrep_search_in_workspace_server_1 = require("./ripgrep-search-in-workspace-server");
var search_in_workspace_interface_1 = require("../common/search-in-workspace-interface");
var path = require("path");
var temp = require("temp");
var fs = require("fs");
var chai_1 = require("chai");
var vscode_ripgrep_1 = require("vscode-ripgrep");
// Allow creating temporary files, but remove them when we are done.
var track = temp.track();
// The root dirs we'll use to test searching.
var rootDirA;
var rootDirB;
var rootSubdirA;
var rootDirAUri;
var rootDirBUri;
var rootSubdirAUri;
// Remember the content of the test files we create, to validate that the
// reported line text is right.
var fileLines = new Map();
// The class under test.
var ripgrepServer;
// Mock client that accumulates the returned results in a list.
var ResultAccumulator = /** @class */ (function () {
    function ResultAccumulator(onDoneCallback) {
        this.results = [];
        this.onDoneCallback = onDoneCallback;
    }
    ResultAccumulator.prototype.onResult = function (searchId, result) {
        this.results.push(result);
    };
    ResultAccumulator.prototype.onDone = function (searchId) {
        // Sort the results, so that the order is predictable.
        this.results.sort(search_in_workspace_interface_1.SearchInWorkspaceResult.compare);
        this.onDoneCallback();
    };
    return ResultAccumulator;
}());
// Create a test file relative to rootDir.
function createTestFile(filename, text) {
    var dir = getRootPathFromName(filename);
    fs.writeFileSync(path.join(dir, filename), text);
    fileLines.set(filename, text.split('\n'));
}
// Returns the path of the root folder by the file name
var getRootPathFromName = function (name) {
    var names = {
        carrots: rootDirA,
        potatoes: rootDirA,
        pastas: rootDirA,
        regexes: rootDirA,
        'long-line': rootDirA,
        small: rootDirA + "/small",
        'file:with:some:colons': rootDirA,
        'file with spaces': rootDirA,
        'utf8-file': rootDirA,
        'special shell characters': rootDirA,
        'glob.txt': rootDirA,
        glob: rootDirA,
        'lots-of-matches': rootDirA,
        orange: rootDirB,
        folderSubfolder: rootSubdirA
    };
    return names[name];
};
before(function () {
    rootDirA = track.mkdirSync();
    rootDirB = track.mkdirSync();
    rootSubdirA = track.mkdirSync({ dir: rootDirA });
    rootDirAUri = file_uri_1.FileUri.create(rootDirA).toString();
    rootDirBUri = file_uri_1.FileUri.create(rootDirB).toString();
    rootSubdirAUri = file_uri_1.FileUri.create(rootSubdirA).toString();
    var contents = '';
    for (var x = 0; x < 10000; x++) {
        var str = '' + x;
        var pad = '00000';
        contents += ('long-' + pad.substring(0, pad.length - str.length) + str);
    }
    createTestFile('long-line', contents);
    createTestFile('carrots', "This is a carrot.\nMost carrots are orange, but some carrots are not.\nOnce capitalized, the word carrot looks like this: CARROT.\nCarrot is a funny word.\n");
    createTestFile('potatoes', "Potatoes, unlike carrots, are generally not orange.  But sweet potatoes are,\nit's very confusing.\n");
    createTestFile('pastas', 'pasta pasta');
    createTestFile('regexes', "aaa hello. x h3lo y hell0h3lllo\nhello1\n");
    fs.mkdirSync(rootDirA + '/small');
    createTestFile('small', 'A small file.\n');
    if (!core_1.isWindows) {
        createTestFile('file:with:some:colons', "Are you looking for this: --foobar?\n");
    }
    createTestFile('file with spaces', "Are you looking for this: --foobar?\n");
    createTestFile('utf8-file', "Var \u00E4r jag?  Varf\u00F6r \u00E4r jag h\u00E4r?\n");
    createTestFile('special shell characters', "If one uses `salut\";' echo foo && echo bar; \"` as a search term it should not be a problem to find here.\n");
    createTestFile('glob.txt', "test -glob patterns\n");
    createTestFile('glob', "test --glob patterns\n");
    var lotsOfMatchesText = '';
    for (var i = 0; i < 100000; i++) {
        lotsOfMatchesText += 'lots-of-matches\n';
    }
    createTestFile('lots-of-matches', lotsOfMatchesText);
    createTestFile('orange', "the oranges' orange looks slightly different from carrots' orange.\n");
    createTestFile('folderSubfolder', 'a file in the subfolder of a folder.');
});
// Create an instance of RipgrepSearchInWorkspaceServer which uses rgPath as
// the rg binary.
function createInstance(rgPath) {
    var container = new inversify_1.Container();
    container.bind(core_1.ILogger).to(mock_logger_1.MockLogger);
    container.bind(ripgrep_search_in_workspace_server_1.RipgrepSearchInWorkspaceServer).toSelf();
    container.bind(node_1.ProcessManager).toSelf().inSingletonScope();
    container.bind(node_1.RawProcess).toSelf().inTransientScope();
    container.bind(node_1.RawProcessFactory).toFactory(function (ctx) {
        return function (options) {
            var child = new inversify_1.Container({ defaultScope: 'Singleton' });
            child.parent = ctx.container;
            child.bind(node_1.RawProcessOptions).toConstantValue(options);
            return child.get(node_1.RawProcess);
        };
    });
    container.bind(ripgrep_search_in_workspace_server_1.RgPath).toConstantValue(rgPath);
    return container.get(ripgrep_search_in_workspace_server_1.RipgrepSearchInWorkspaceServer);
}
beforeEach(function () {
    ripgrepServer = createInstance(vscode_ripgrep_1.rgPath);
});
after(function () {
    try {
        track.cleanupSync();
    }
    catch (ex) {
        console.log("Couldn't cleanup search-in-workspace temp directory.", ex);
    }
});
// Compare expected and actual search results.
//
// For convenience, the expected entries do not have their lineText field set
// by individual tests.  Using on the file and line fields, this function
// retrieves the expected line text based on what we have written to the test
// files.
//
// The expected entries should also have the file field set relatively to
// rootDir.  This function will update the field to contain the absolute path.
function compareSearchResults(expected, actual) {
    var allMatches = actual.reduceRight(function (p, v) { return p + v.matches.length; }, 0);
    chai_1.expect(allMatches).eq(expected.length);
    if (actual.length !== expected.length) {
        return;
    }
    var _loop_1 = function (i) {
        var e = expected[i];
        var lines = fileLines.get(e.fileUri);
        if (lines) {
            var line = lines[e.line - 1];
            e.lineText = line;
            e.fileUri = file_uri_1.FileUri.create(path.join(getRootPathFromName(e.fileUri), e.fileUri)).toString();
            var a = actual.find(function (l) { return l.fileUri === e.fileUri; });
            var match = a.matches.find(function (m) { return m.line === e.line && m.character === e.character; });
            if (!match) {
                console.log(a);
            }
            chai_1.expect(match.length).eq(e.length);
            if (typeof match.lineText === 'string') {
                chai_1.expect(match.lineText).eq(e.lineText);
            }
        }
        else {
            // We don't know this file...
            chai_1.expect.fail();
        }
    };
    for (var i = 0; i < actual.length; i++) {
        _loop_1(i);
    }
}
describe('ripgrep-search-in-workspace-server', function () {
    var _this = this;
    this.timeout(10000);
    it('should return 1 result when searching for " pasta", respecting the leading whitespace', function (done) {
        var pattern = ' pasta';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'pastas', line: 1, character: 6, length: pattern.length, lineText: '' },
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri]);
    });
    it('should return 1 result when searching for "pasta", respecting the trailing whitespace', function (done) {
        var pattern = 'pasta ';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'pastas', line: 1, character: 1, length: pattern.length, lineText: '' },
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri]);
    });
    // Try some simple patterns with different case.
    it('should return 7 results when searching for "carrot"', function (done) {
        var pattern = 'carrot';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'carrots', line: 1, character: 11, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 2, character: 6, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 2, character: 35, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 3, character: 28, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 3, character: 52, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 4, character: 1, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'potatoes', line: 1, character: 18, length: pattern.length, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri]);
    });
    it('should return 5 results when searching for "carrot" case sensitive', function (done) {
        var pattern = 'carrot';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'carrots', line: 1, character: 11, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 2, character: 6, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 2, character: 35, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 3, character: 28, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'potatoes', line: 1, character: 18, length: pattern.length, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], {
            matchCase: true
        });
    });
    it('should return 4 results when searching for "carrot" matching whole words, case insensitive', function (done) {
        var pattern = 'carrot';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'carrots', line: 1, character: 11, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 3, character: 28, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 3, character: 52, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 4, character: 1, length: pattern.length, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], {
            matchWholeWord: true
        });
    });
    it('should return 4 results when searching for "carrot" matching whole words, case sensitive', function (done) {
        var pattern = 'carrot';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'carrots', line: 1, character: 11, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 3, character: 28, length: pattern.length, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], {
            matchWholeWord: true,
            matchCase: true
        });
    });
    it('should return 1 result when searching for "Carrot"', function (done) {
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'carrots', line: 4, character: 1, length: 6, lineText: '' },
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search('Carrot', [rootDirAUri], { matchCase: true });
    });
    it('should return 0 result when searching for "CarroT"', function (done) {
        var pattern = 'CarroT';
        var client = new ResultAccumulator(function () {
            compareSearchResults([], client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], { matchCase: true });
    });
    // Try something that we know isn't there.
    it('should find 0 result when searching for "PINEAPPLE"', function (done) {
        var pattern = 'PINEAPPLE';
        var client = new ResultAccumulator(function () {
            compareSearchResults([], client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri]);
    });
    // Try a pattern with a space.
    it('should find 1 result when searching for "carrots are orange"', function (done) {
        var pattern = 'carrots are orange';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'carrots', line: 2, character: 6, length: pattern.length, lineText: '' },
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri]);
    });
    it('should deal with very long lines."', function (done) {
        var pattern = 'long-00400';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'long-line', line: 1, character: 4001, length: pattern.length, lineText: '' },
            ];
            compareSearchResults(expected, client.results);
            var match = client.results[0].matches[0];
            if (typeof match.lineText === 'string') {
                done(new Error('unexpected lineText'));
            }
            else {
                chai_1.expect(match.lineText.text.substr(match.lineText.character - 1, pattern.length)).eq(pattern);
                done();
            }
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri]);
    });
    // Try with an output size that exceeds the default node buffer size
    // (200 * 1024) when spawning a new process.
    it('should work with a lot of results', function (done) {
        // This can take a bit of time.
        _this.timeout(150000);
        var pattern = 'lots-of-matches';
        var client = new ResultAccumulator(function () {
            var expected = [];
            for (var i = 1; i <= 100000; i++) {
                expected.push({
                    root: rootDirAUri,
                    fileUri: 'lots-of-matches',
                    line: i,
                    character: 1,
                    length: pattern.length,
                    lineText: '',
                });
            }
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri]);
    });
    // Try limiting the number of returned results.
    it('should limit the number of returned results', function (done) {
        var pattern = 'lots-of-matches';
        var client = new ResultAccumulator(function () {
            var expected = [];
            for (var i = 1; i <= 1000; i++) {
                expected.push({
                    root: rootDirAUri,
                    fileUri: 'lots-of-matches',
                    line: i,
                    character: 1,
                    length: pattern.length,
                    lineText: '',
                });
            }
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], {
            maxResults: 1000,
        });
    });
    // Try with regexes.
    it('should search for regexes', function (done) {
        var pattern = 'h[e3]l+[o0]';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'regexes', line: 1, character: 5, length: 5, lineText: '' },
                { root: rootDirAUri, fileUri: 'regexes', line: 1, character: 14, length: 4, lineText: '' },
                { root: rootDirAUri, fileUri: 'regexes', line: 1, character: 21, length: 5, lineText: '' },
                { root: rootDirAUri, fileUri: 'regexes', line: 1, character: 26, length: 6, lineText: '' },
                { root: rootDirAUri, fileUri: 'regexes', line: 2, character: 1, length: 5, lineText: '' },
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], {
            useRegExp: true
        });
    });
    // Try without regex
    it('should search for fixed string', function (done) {
        var pattern = 'hello.';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'regexes', line: 1, character: 5, length: 6, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], {
            useRegExp: false
        });
    });
    // Try with a pattern starting with -, and in filenames containing colons and spaces.
    it('should search a pattern starting with -', function (done) {
        var pattern = '-fo+bar';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'file with spaces', line: 1, character: 28, length: 7, lineText: '' },
            ];
            if (!core_1.isWindows) {
                expected.push({ root: rootDirAUri, fileUri: 'file:with:some:colons', line: 1, character: 28, length: 7, lineText: '' });
            }
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], { useRegExp: true });
    });
    // Try with a pattern starting with --, and in filenames containing colons and spaces.
    it('should search a pattern starting with --', function (done) {
        var pattern = '--fo+bar';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'file with spaces', line: 1, character: 27, length: 8, lineText: '' },
            ];
            if (!core_1.isWindows) {
                expected.push({ root: rootDirAUri, fileUri: 'file:with:some:colons', line: 1, character: 27, length: 8, lineText: '' });
            }
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], { useRegExp: true });
    });
    it('should search a pattern starting with a dash w/o regex', function (done) {
        var pattern = '-foobar';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'file with spaces', line: 1, character: 28, length: 7, lineText: '' },
            ];
            if (!core_1.isWindows) {
                expected.push({ root: rootDirAUri, fileUri: 'file:with:some:colons', line: 1, character: 28, length: 7, lineText: '' });
            }
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri]);
    });
    it('should search a pattern starting with two dashes w/o regex', function (done) {
        var pattern = '--foobar';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'file with spaces', line: 1, character: 27, length: 8, lineText: '' },
            ];
            if (!core_1.isWindows) {
                expected.push({ root: rootDirAUri, fileUri: 'file:with:some:colons', line: 1, character: 27, length: 8, lineText: '' });
            }
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri]);
    });
    it('should search a whole pattern starting with - w/o regex', function (done) {
        var pattern = '-glob';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'glob', line: 1, character: 7, length: 5, lineText: '' },
                { root: rootDirAUri, fileUri: 'glob.txt', line: 1, character: 6, length: 5, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], { matchWholeWord: true });
    });
    it('should search a whole pattern starting with -- w/o regex', function (done) {
        var pattern = '--glob';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'glob', line: 1, character: 6, length: 6, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], { matchWholeWord: true });
    });
    it('should search a pattern in .txt file', function (done) {
        var pattern = '-glob';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'glob.txt', line: 1, character: 6, length: 5, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], { include: ['*.txt'] });
    });
    it('should search a whole pattern in .txt file', function (done) {
        var pattern = '-glob';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'glob.txt', line: 1, character: 6, length: 5, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], { include: ['*.txt'], matchWholeWord: true });
    });
    // Try searching in an UTF-8 file.
    it('should search in a UTF-8 file', function (done) {
        var pattern = ' jag';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'utf8-file', line: 1, character: 7, length: 4, lineText: '' },
                { root: rootDirAUri, fileUri: 'utf8-file', line: 1, character: 23, length: 4, lineText: '' },
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri]);
    });
    // Try searching a pattern that contains unicode characters.
    it('should search a UTF-8 pattern', function (done) {
        var pattern = ' h?är';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'utf8-file', line: 1, character: 4, length: 3, lineText: '' },
                { root: rootDirAUri, fileUri: 'utf8-file', line: 1, character: 20, length: 3, lineText: '' },
                { root: rootDirAUri, fileUri: 'utf8-file', line: 1, character: 27, length: 4, lineText: '' },
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], { useRegExp: true });
    });
    // A regex that may match an empty string should not return zero-length
    // results.  Run the test in a directory without big files, because it
    // makes rg print all searched lines, which can take a lot of time.
    it('should not return zero-length matches', function (done) {
        var pattern = '(hello)?';
        var client = new ResultAccumulator(function () {
            var expected = [];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri + '/small']);
    });
    it('should search a pattern with special characters ', function (done) {
        var pattern = 'salut";\' echo foo && echo bar; "';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirAUri, fileUri: 'special shell characters', line: 1, character: 14, length: 32, lineText: '' },
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri], { useRegExp: true });
    });
    it('should find patterns across all directories', function (done) {
        var pattern = 'carrot';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootDirBUri, fileUri: 'orange', line: 1, character: 51, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 1, character: 11, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 2, character: 6, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 2, character: 35, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 3, character: 28, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 3, character: 52, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'carrots', line: 4, character: 1, length: pattern.length, lineText: '' },
                { root: rootDirAUri, fileUri: 'potatoes', line: 1, character: 18, length: pattern.length, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri, rootDirBUri]);
    });
    it('should only find patterns from the folder closest to the file', function (done) {
        var pattern = 'folder';
        var client = new ResultAccumulator(function () {
            var expected = [
                { root: rootSubdirAUri, fileUri: 'folderSubfolder', line: 1, character: 18, length: pattern.length, lineText: '' },
                { root: rootSubdirAUri, fileUri: 'folderSubfolder', line: 1, character: 30, length: pattern.length, lineText: '' },
                { root: rootSubdirAUri, fileUri: 'folderSubfolder', line: 1, character: 18, length: pattern.length, lineText: '' },
                { root: rootSubdirAUri, fileUri: 'folderSubfolder', line: 1, character: 30, length: pattern.length, lineText: '' }
            ];
            compareSearchResults(expected, client.results);
            done();
        });
        ripgrepServer.setClient(client);
        ripgrepServer.search(pattern, [rootDirAUri, rootSubdirAUri]);
    });
    it('fails gracefully when rg isn\'t found', function () {
        return __awaiter(this, void 0, void 0, function () {
            var errorString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var rgServer = createInstance('/non-existent/rg');
                            rgServer.setClient({
                                onResult: function (searchId, result) {
                                    reject();
                                },
                                onDone: function (searchId, error) {
                                    resolve(error);
                                },
                            });
                            rgServer.search('pattern', [rootDirA]);
                        })];
                    case 1:
                        errorString = _a.sent();
                        chai_1.expect(errorString).contains('could not find the ripgrep (rg) binary');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('fails gracefully when rg isn\'t executable', function () {
        return __awaiter(this, void 0, void 0, function () {
            var errorString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            // Create temporary file, ensure it is not executable.
                            var rg = temp.openSync();
                            var mode = fs.fstatSync(rg.fd).mode;
                            mode &= ~(fs.constants.S_IXUSR | fs.constants.S_IXGRP | fs.constants.S_IXOTH);
                            fs.fchmodSync(rg.fd, mode);
                            fs.closeSync(rg.fd);
                            var rgServer = createInstance(rg.path);
                            rgServer.setClient({
                                onResult: function (searchId, result) {
                                    reject();
                                },
                                onDone: function (searchId, error) {
                                    resolve(error);
                                },
                            });
                            rgServer.search('pattern', [rootDirA]);
                        })];
                    case 1:
                        errorString = _a.sent();
                        if (core_1.isWindows) {
                            chai_1.expect(errorString).contains('An error happened while searching (UNKNOWN).');
                        }
                        else {
                            chai_1.expect(errorString).contains('could not execute the ripgrep (rg) binary');
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=ripgrep-search-in-workspace-server.slow-spec.js.map