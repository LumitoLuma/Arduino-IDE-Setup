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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultGitInit = exports.GitInit = void 0;
var inversify_1 = require("inversify");
var find_git_exec_1 = require("find-git-exec");
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var logger_1 = require("@theia/core/lib/common/logger");
var disposable_1 = require("@theia/core/lib/common/disposable");
var core_1 = require("@theia/core");
/**
 * Initializer hook for Git.
 */
exports.GitInit = Symbol('GitInit');
/**
 * The default initializer. It is used in the browser.
 *
 * Configures the Git extension to use the Git executable from the `PATH`.
 */
var DefaultGitInit = /** @class */ (function () {
    function DefaultGitInit() {
        this.toDispose = new disposable_1.DisposableCollection();
    }
    DefaultGitInit.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var env, _a, execPath, path, version, dir, _b, execPathOk, pathOk, dirOk, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        env = process.env;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, find_git_exec_1.default()];
                    case 2:
                        _a = _c.sent(), execPath = _a.execPath, path = _a.path, version = _a.version;
                        if (!(!!execPath && !!path && !!version)) return [3 /*break*/, 4];
                        dir = path_1.dirname(path_1.dirname(path));
                        return [4 /*yield*/, Promise.all([fs_extra_1.pathExists(execPath), fs_extra_1.pathExists(path), fs_extra_1.pathExists(dir)])];
                    case 3:
                        _b = __read.apply(void 0, [_c.sent(), 3]), execPathOk = _b[0], pathOk = _b[1], dirOk = _b[2];
                        if (execPathOk && pathOk && dirOk) {
                            if (typeof env.LOCAL_GIT_DIRECTORY !== 'undefined' && env.LOCAL_GIT_DIRECTORY !== dir) {
                                this.logger.error("Misconfigured env.LOCAL_GIT_DIRECTORY: " + env.LOCAL_GIT_DIRECTORY + ". dir was: " + dir);
                                this.messages.error('The LOCAL_GIT_DIRECTORY env variable was already set to a different value.', { timeout: 0 });
                                return [2 /*return*/];
                            }
                            if (typeof env.GIT_EXEC_PATH !== 'undefined' && env.GIT_EXEC_PATH !== execPath) {
                                this.logger.error("Misconfigured env.GIT_EXEC_PATH: " + env.GIT_EXEC_PATH + ". execPath was: " + execPath);
                                this.messages.error('The GIT_EXEC_PATH env variable was already set to a different value.', { timeout: 0 });
                                return [2 /*return*/];
                            }
                            process.env.LOCAL_GIT_DIRECTORY = dir;
                            process.env.GIT_EXEC_PATH = execPath;
                            this.logger.info("Using Git [" + version + "] from the PATH. (" + path + ")");
                            return [2 /*return*/];
                        }
                        _c.label = 4;
                    case 4:
                        this.messages.error('Could not find Git on the PATH.', { timeout: 0 });
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _c.sent();
                        this.logger.error(err_1);
                        this.messages.error('An unexpected error occurred when locating the Git executable.', { timeout: 0 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DefaultGitInit.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], DefaultGitInit.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(core_1.MessageService),
        __metadata("design:type", core_1.MessageService)
    ], DefaultGitInit.prototype, "messages", void 0);
    DefaultGitInit = __decorate([
        inversify_1.injectable()
    ], DefaultGitInit);
    return DefaultGitInit;
}());
exports.DefaultGitInit = DefaultGitInit;
//# sourceMappingURL=git-init.js.map