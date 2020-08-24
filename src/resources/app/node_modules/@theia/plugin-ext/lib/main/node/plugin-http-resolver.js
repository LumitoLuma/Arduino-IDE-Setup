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
exports.HttpPluginDeployerResolver = void 0;
var inversify_1 = require("inversify");
var fs = require("fs");
var os = require("os");
var path = require("path");
var url = require("url");
var request = require("request");
/**
 * Resolver that handle the http(s): protocol
 * http://path/to/my.plugin
 * https://path/to/my.plugin
 */
var HttpPluginDeployerResolver = /** @class */ (function () {
    function HttpPluginDeployerResolver() {
        this.unpackedFolder = path.resolve(os.tmpdir(), 'http-remote');
        if (!fs.existsSync(this.unpackedFolder)) {
            fs.mkdirSync(this.unpackedFolder);
        }
    }
    /**
     * Grab the remote file specified by the given URL
     */
    HttpPluginDeployerResolver.prototype.resolve = function (pluginResolverContext) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // download the file
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // keep filename of the url
                        var urlPath = pluginResolverContext.getOriginId();
                        var link = url.parse(urlPath);
                        if (!link.pathname) {
                            reject(new Error('invalid link URI' + urlPath));
                            return;
                        }
                        var dirname = path.dirname(link.pathname);
                        var basename = path.basename(link.pathname);
                        var filename = dirname.replace(/\W/g, '_') + ('-') + basename;
                        var unpackedPath = path.resolve(_this.unpackedFolder, path.basename(filename));
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
                        request.get(pluginResolverContext.getOriginId())
                            .on('error', function (err) {
                            reject(err);
                        }).pipe(dest);
                    })];
            });
        });
    };
    /**
     * Handle only the plugins that starts with http or https:
     */
    HttpPluginDeployerResolver.prototype.accept = function (pluginId) {
        return /^http[s]?:\/\/.*$/gm.test(pluginId);
    };
    HttpPluginDeployerResolver = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], HttpPluginDeployerResolver);
    return HttpPluginDeployerResolver;
}());
exports.HttpPluginDeployerResolver = HttpPluginDeployerResolver;
//# sourceMappingURL=plugin-http-resolver.js.map