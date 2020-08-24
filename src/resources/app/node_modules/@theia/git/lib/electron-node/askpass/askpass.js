"use strict";
// tslint:disable:file-header
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Based on: https://github.com/Microsoft/vscode/blob/dd3e2d94f81139f9d18ba15a24c16c6061880b93/extensions/git/src/askpass.ts
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
exports.Askpass = void 0;
var inversify_1 = require("inversify");
var path = require("path");
var http = require("http");
var logger_1 = require("@theia/core/lib/common/logger");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var git_prompt_1 = require("../../common/git-prompt");
var dugite_git_prompt_1 = require("../../node/dugite-git-prompt");
var Askpass = /** @class */ (function () {
    function Askpass() {
        this.ready = new promise_util_1.Deferred();
    }
    Askpass.prototype.init = function () {
        var _this = this;
        this.server = http.createServer(function (req, res) { return _this.onRequest(req, res); });
        this.setup().then(function (serverAddress) {
            if (serverAddress) {
                _this.serverAddress = serverAddress;
                var _a = _this.serverAddress, address = _a.address, port = _a.port;
                _this.logger.info("Git askpass helper is listening on http://" + address + ":" + port + ".");
                _this.ready.resolve(true);
            }
            else {
                _this.logger.warn("Couldn't start the HTTP server for the Git askpass helper.");
                _this.ready.resolve(false);
            }
        }).catch(function () {
            _this.ready.resolve(false);
        });
    };
    Askpass.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, new Promise(function (resolve) {
                            _this.server.on('error', function (err) { return _this.logger.error(err); });
                            _this.server.listen(0, _this.hostname(), function () {
                                resolve(_this.server.address());
                            });
                        })];
                }
                catch (err) {
                    this.logger.error('Could not launch Git askpass helper.', err);
                    return [2 /*return*/, undefined];
                }
                return [2 /*return*/];
            });
        });
    };
    Askpass.prototype.onRequest = function (req, res) {
        var _this = this;
        var chunks = [];
        req.setEncoding('utf8');
        req.on('data', function (d) { return chunks.push(d); });
        req.on('end', function () {
            var _a = JSON.parse(chunks.join('')), gitRequest = _a.gitRequest, gitHost = _a.gitHost;
            _this.prompt(gitHost, gitRequest).then(function (result) {
                res.writeHead(200);
                res.end(JSON.stringify(result));
            }, function (err) {
                _this.logger.error(err);
                res.writeHead(500);
                res.end();
            });
        });
    };
    Askpass.prototype.prompt = function (requestingHost, request) {
        return __awaiter(this, void 0, void 0, function () {
            var answer, error, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.promptServer.ask({
                                password: /password/i.test(request),
                                text: request,
                                details: "Git: " + requestingHost + " (Press 'Enter' to confirm or 'Escape' to cancel.)"
                            })];
                    case 1:
                        answer = _a.sent();
                        if (git_prompt_1.GitPrompt.Success.is(answer) && typeof answer.result === 'string') {
                            return [2 /*return*/, answer.result];
                        }
                        else if (git_prompt_1.GitPrompt.Cancel.is(answer)) {
                            return [2 /*return*/, ''];
                        }
                        else if (git_prompt_1.GitPrompt.Failure.is(answer)) {
                            error = answer.error;
                            throw error;
                        }
                        throw new Error('Unexpected answer.'); // Do not ever log the `answer`, it might contain the password.
                    case 2:
                        e_1 = _a.sent();
                        this.logger.error("An unexpected error occurred when requesting " + request + " by " + requestingHost + ".", e_1);
                        return [2 /*return*/, ''];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Askpass.prototype.getEnv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ok, _a, ELECTRON_RUN_AS_NODE, GIT_ASKPASS, THEIA_GIT_ASKPASS_NODE, THEIA_GIT_ASKPASS_MAIN, THEIA_GIT_ASKPASS_HANDLE;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ready.promise];
                    case 1:
                        ok = _b.sent();
                        if (!ok) {
                            return [2 /*return*/, {
                                    GIT_ASKPASS: path.join(__dirname, '..', '..', '..', 'src', 'electron-node', 'askpass', 'askpass-empty.sh')
                                }];
                        }
                        return [4 /*yield*/, Promise.all([
                                this.ELECTRON_RUN_AS_NODE(),
                                this.GIT_ASKPASS(),
                                this.THEIA_GIT_ASKPASS_NODE(),
                                this.THEIA_GIT_ASKPASS_MAIN(),
                                this.THEIA_GIT_ASKPASS_HANDLE()
                            ])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 5]), ELECTRON_RUN_AS_NODE = _a[0], GIT_ASKPASS = _a[1], THEIA_GIT_ASKPASS_NODE = _a[2], THEIA_GIT_ASKPASS_MAIN = _a[3], THEIA_GIT_ASKPASS_HANDLE = _a[4];
                        return [2 /*return*/, {
                                ELECTRON_RUN_AS_NODE: ELECTRON_RUN_AS_NODE,
                                GIT_ASKPASS: GIT_ASKPASS,
                                THEIA_GIT_ASKPASS_NODE: THEIA_GIT_ASKPASS_NODE,
                                THEIA_GIT_ASKPASS_MAIN: THEIA_GIT_ASKPASS_MAIN,
                                THEIA_GIT_ASKPASS_HANDLE: THEIA_GIT_ASKPASS_HANDLE
                            }];
                }
            });
        });
    };
    Askpass.prototype.dispose = function () {
        this.server.close();
    };
    Askpass.prototype.hostname = function () {
        return 'localhost';
    };
    Askpass.prototype.GIT_ASKPASS = function () {
        return path.join(__dirname, '..', '..', '..', 'src', 'electron-node', 'askpass', 'askpass.sh');
    };
    Askpass.prototype.ELECTRON_RUN_AS_NODE = function () {
        return '1';
    };
    Askpass.prototype.THEIA_GIT_ASKPASS_NODE = function () {
        return process.execPath;
    };
    Askpass.prototype.THEIA_GIT_ASKPASS_MAIN = function () {
        return path.join(__dirname, 'askpass-main.js');
    };
    Askpass.prototype.THEIA_GIT_ASKPASS_HANDLE = function () {
        if (this.serverAddress) {
            return "http://" + this.hostname() + ":" + this.serverAddress.port;
        }
        return undefined;
    };
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], Askpass.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(dugite_git_prompt_1.DugiteGitPromptServer),
        __metadata("design:type", dugite_git_prompt_1.DugiteGitPromptServer)
    ], Askpass.prototype, "promptServer", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Askpass.prototype, "init", null);
    Askpass = __decorate([
        inversify_1.injectable()
    ], Askpass);
    return Askpass;
}());
exports.Askpass = Askpass;
//# sourceMappingURL=askpass.js.map