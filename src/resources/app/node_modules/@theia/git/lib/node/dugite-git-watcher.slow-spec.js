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
var fs = require("fs-extra");
var temp = require("temp");
var path = require("path");
var chai_1 = require("chai");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var dugite_git_1 = require("./dugite-git");
var binding_helper_1 = require("./test/binding-helper");
var dugite_git_watcher_1 = require("./dugite-git-watcher");
var git_backend_module_1 = require("./git-backend-module");
/* eslint-disable no-unused-expressions */
var track = temp.track();
describe('git-watcher-slow', function () {
    var git;
    var repository;
    var watcher;
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            var root, localUri, _a, container, bind;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.timeout(40000);
                        root = track.mkdirSync('git-watcher-slow');
                        localUri = file_uri_1.FileUri.create(root).toString();
                        _a = binding_helper_1.initializeBindings(), container = _a.container, bind = _a.bind;
                        git_backend_module_1.bindGit(bind);
                        git_backend_module_1.bindRepositoryWatcher(bind);
                        git = container.get(dugite_git_1.DugiteGit);
                        watcher = container.get(dugite_git_watcher_1.DugiteGitWatcherServer);
                        repository = { localUri: localUri };
                        return [4 /*yield*/, git.clone('https://github.com/TypeFox/find-git-exec.git', { localUri: localUri })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        this.timeout(40000);
        track.cleanupSync();
    });
    it('watching the same repository multiple times should not duplicate the events', function () {
        return __awaiter(this, void 0, void 0, function () {
            var ignoredEvents, events, watchers, client, _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.timeout(40000);
                        ignoredEvents = 1;
                        events = [];
                        watchers = [];
                        client = {
                            onGitChanged: function (event) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(ignoredEvents > 0)) return [3 /*break*/, 4];
                                                chai_1.expect(event.status.changes).to.be.empty;
                                                ignoredEvents--;
                                                if (!(ignoredEvents === 0)) return [3 /*break*/, 3];
                                                // Once we consumed all the events we wanted to ignore, make the FS change.
                                                return [4 /*yield*/, fs.createFile(path.join(file_uri_1.FileUri.fsPath(repository.localUri), 'A.txt'))];
                                            case 1:
                                                // Once we consumed all the events we wanted to ignore, make the FS change.
                                                _a.sent();
                                                return [4 /*yield*/, sleep(6000)];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3: return [3 /*break*/, 5];
                                            case 4:
                                                events.push(event);
                                                _a.label = 5;
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                });
                            }
                        };
                        watcher.setClient(client);
                        _b = (_a = watchers).push;
                        return [4 /*yield*/, watcher.watchGitChanges(repository)];
                    case 1:
                        _b.apply(_a, [_e.sent()]);
                        _d = (_c = watchers).push;
                        return [4 /*yield*/, watcher.watchGitChanges(repository)];
                    case 2:
                        _d.apply(_c, [_e.sent()]);
                        return [4 /*yield*/, sleep(6000)];
                    case 3:
                        _e.sent();
                        watchers.forEach(function (watcherId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, watcher.unwatchGitChanges(watcherId)];
                        }); }); });
                        chai_1.expect(events.length).to.be.equal(1, JSON.stringify(events));
                        chai_1.expect(events[0].status.changes.length).to.be.equal(1, JSON.stringify(events));
                        chai_1.expect(events[0].status.changes[0].uri.toString().endsWith('A.txt')).to.be.true;
                        events.length = 0;
                        // Revert the change we've made, and check for the notifications. Zero should be received.
                        return [4 /*yield*/, fs.unlink(path.join(file_uri_1.FileUri.fsPath(repository.localUri), 'A.txt'))];
                    case 4:
                        // Revert the change we've made, and check for the notifications. Zero should be received.
                        _e.sent();
                        return [4 /*yield*/, sleep(6000)];
                    case 5:
                        _e.sent();
                        chai_1.expect(events).to.be.empty;
                        return [2 /*return*/];
                }
            });
        });
    });
});
function sleep(time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
//# sourceMappingURL=dugite-git-watcher.slow-spec.js.map