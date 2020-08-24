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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDownloadEndpoint = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var url = require("url");
var inversify_1 = require("inversify");
var body_parser_1 = require("body-parser");
var express_1 = require("express");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var file_download_handler_1 = require("./file-download-handler");
var FileDownloadEndpoint = /** @class */ (function () {
    function FileDownloadEndpoint() {
    }
    FileDownloadEndpoint_1 = FileDownloadEndpoint;
    FileDownloadEndpoint.prototype.configure = function (app) {
        var _this = this;
        var router = express_1.Router();
        router.get('/download', function (request, response) { return _this.downloadLinkHandler.handle(request, response); });
        router.get('/', function (request, response) { return _this.singleFileDownloadHandler.handle(request, response); });
        router.put('/', function (request, response) { return _this.multiFileDownloadHandler.handle(request, response); });
        // Content-Type: application/json
        app.use(body_parser_1.json());
        app.use(FileDownloadEndpoint_1.PATH, router);
        app.get('/file', function (request, response) {
            var uri = url.parse(request.url).query;
            if (!uri) {
                response.status(400).send('invalid uri');
                return;
            }
            var fsPath = file_uri_1.FileUri.fsPath(decodeURIComponent(uri));
            response.sendFile(fsPath);
        });
    };
    var FileDownloadEndpoint_1;
    FileDownloadEndpoint.PATH = '/files';
    __decorate([
        inversify_1.inject(file_download_handler_1.FileDownloadHandler),
        inversify_1.named(file_download_handler_1.FileDownloadHandler.SINGLE),
        __metadata("design:type", file_download_handler_1.FileDownloadHandler)
    ], FileDownloadEndpoint.prototype, "singleFileDownloadHandler", void 0);
    __decorate([
        inversify_1.inject(file_download_handler_1.FileDownloadHandler),
        inversify_1.named(file_download_handler_1.FileDownloadHandler.MULTI),
        __metadata("design:type", file_download_handler_1.FileDownloadHandler)
    ], FileDownloadEndpoint.prototype, "multiFileDownloadHandler", void 0);
    __decorate([
        inversify_1.inject(file_download_handler_1.FileDownloadHandler),
        inversify_1.named(file_download_handler_1.FileDownloadHandler.DOWNLOAD_LINK),
        __metadata("design:type", file_download_handler_1.FileDownloadHandler)
    ], FileDownloadEndpoint.prototype, "downloadLinkHandler", void 0);
    FileDownloadEndpoint = FileDownloadEndpoint_1 = __decorate([
        inversify_1.injectable()
    ], FileDownloadEndpoint);
    return FileDownloadEndpoint;
}());
exports.FileDownloadEndpoint = FileDownloadEndpoint;
//# sourceMappingURL=file-download-endpoint.js.map