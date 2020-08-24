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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubPluginDeployerResolver = void 0;
var inversify_1 = require("inversify");
var fs = require("fs");
var os = require("os");
var path = require("path");
var request = require("request");
/**
 * Resolver that handle the github: protocol
 * github:<org>/<repo>/<filename>@latest
 * github:<org>/<repo>/<filename>@<version>
 */
var GithubPluginDeployerResolver = /** @class */ (function () {
    function GithubPluginDeployerResolver() {
        this.unpackedFolder = path.resolve(os.tmpdir(), 'github-remote');
        if (!fs.existsSync(this.unpackedFolder)) {
            fs.mkdirSync(this.unpackedFolder);
        }
    }
    GithubPluginDeployerResolver_1 = GithubPluginDeployerResolver;
    /**
     * Grab the remote file specified by Github URL
     */
    GithubPluginDeployerResolver.prototype.resolve = function (pluginResolverContext) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // download the file
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // extract data
                        var extracted = /^github:(.*)\/(.*)\/(.*)$/gm.exec(pluginResolverContext.getOriginId());
                        if (!extracted || extracted === null || extracted.length !== 4) {
                            reject(new Error('Invalid extension' + pluginResolverContext.getOriginId()));
                            return;
                        }
                        var orgName = extracted[1];
                        var repoName = extracted[2];
                        var file = extracted[3];
                        // get version if any
                        var splitFile = file.split('@');
                        var version;
                        var filename;
                        if (splitFile.length === 1) {
                            filename = file;
                            version = 'latest';
                        }
                        else {
                            filename = splitFile[0];
                            version = splitFile[1];
                        }
                        // latest version, need to get the redirect
                        var url = GithubPluginDeployerResolver_1.GITHUB_ENDPOINT + orgName + '/' + repoName + '/releases/latest';
                        // disable redirect to grab the release
                        var options = {
                            followRedirect: false
                        };
                        // if latest, resolve first the real version
                        if (version === 'latest') {
                            request.get(url, options).on('response', function (response) {
                                // should have a redirect
                                if (response.statusCode === 302) {
                                    var redirectLocation = response.headers.location;
                                    if (!redirectLocation) {
                                        reject(new Error('Invalid github link with latest not being found'));
                                        return;
                                    }
                                    // parse redirect link
                                    var taggedValueArray = /^https:\/\/.*tag\/(.*)/gm.exec(redirectLocation);
                                    if (!taggedValueArray || taggedValueArray.length !== 2) {
                                        reject(new Error('The redirect link for latest is invalid ' + redirectLocation));
                                        return;
                                    }
                                    // grab version of tag
                                    _this.grabGithubFile(pluginResolverContext, orgName, repoName, filename, taggedValueArray[1], resolve, reject);
                                }
                            });
                        }
                        else {
                            _this.grabGithubFile(pluginResolverContext, orgName, repoName, filename, version, resolve, reject);
                        }
                    })];
            });
        });
    };
    /*
     * Grab the github file specified by the plugin's ID
     */
    GithubPluginDeployerResolver.prototype.grabGithubFile = function (pluginResolverContext, orgName, repoName, filename, version, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve, reject) {
        var unpackedPath = path.resolve(this.unpackedFolder, path.basename(version + filename));
        var finish = function () {
            pluginResolverContext.addPlugin(pluginResolverContext.getOriginId(), unpackedPath);
            resolve();
        };
        // use of cache. If file is already there use it directly
        if (fs.existsSync(unpackedPath)) {
            finish();
            return;
        }
        var dest = fs.createWriteStream(unpackedPath);
        dest.addListener('finish', finish);
        var url = GithubPluginDeployerResolver_1.GITHUB_ENDPOINT + orgName + '/' + repoName + '/releases/download/' + version + '/' + filename;
        request.get(url)
            .on('error', function (err) {
            reject(err);
        }).pipe(dest);
    };
    /**
     * Handle only the plugins that starts with github:
     */
    GithubPluginDeployerResolver.prototype.accept = function (pluginId) {
        return pluginId.startsWith(GithubPluginDeployerResolver_1.PREFIX);
    };
    var GithubPluginDeployerResolver_1;
    GithubPluginDeployerResolver.PREFIX = 'github:';
    GithubPluginDeployerResolver.GITHUB_ENDPOINT = 'https://github.com/';
    GithubPluginDeployerResolver = GithubPluginDeployerResolver_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], GithubPluginDeployerResolver);
    return GithubPluginDeployerResolver;
}());
exports.GithubPluginDeployerResolver = GithubPluginDeployerResolver;
//# sourceMappingURL=plugin-github-resolver.js.map