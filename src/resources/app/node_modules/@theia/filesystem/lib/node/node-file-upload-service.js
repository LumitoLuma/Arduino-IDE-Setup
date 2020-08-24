"use strict";
/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
exports.NodeFileUploadService = void 0;
var inversify_1 = require("inversify");
var node_file_upload_1 = require("./node-file-upload");
var NodeFileUploadService = /** @class */ (function () {
    function NodeFileUploadService() {
    }
    NodeFileUploadService_1 = NodeFileUploadService;
    NodeFileUploadService.prototype.configure = function (service) {
        var _this = this;
        service.ws(NodeFileUploadService_1.wsPath, function (_, socket) { return _this.handleFileUpload(socket); });
    };
    NodeFileUploadService.prototype.handleFileUpload = function (socket) {
        var _this = this;
        var done = 0;
        var upload;
        var commitUpload = function () { return __awaiter(_this, void 0, void 0, function () {
            var uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!upload) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, upload.rename()];
                    case 1:
                        _a.sent();
                        uri = upload.uri;
                        upload = undefined;
                        if (socket.readyState === 1) {
                            socket.send(JSON.stringify({ uri: uri }));
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        var queue = Promise.resolve();
        socket.on('message', function (data) { return queue = queue.then(function () { return __awaiter(_this, void 0, void 0, function () {
            var uploadedBytes, request, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        if (!upload) return [3 /*break*/, 4];
                        return [4 /*yield*/, upload.append(data)];
                    case 1:
                        _a.sent();
                        if (!(upload.uploadedBytes >= upload.size)) return [3 /*break*/, 3];
                        done += upload.size;
                        return [4 /*yield*/, commitUpload()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (socket.readyState === 1) {
                            uploadedBytes = done + (upload ? upload.uploadedBytes : 0);
                            socket.send(JSON.stringify({
                                done: uploadedBytes
                            }));
                        }
                        return [2 /*return*/];
                    case 4:
                        request = JSON.parse(data.toString());
                        if (request.ok) {
                            socket.send(JSON.stringify({ ok: true }));
                            return [2 /*return*/];
                        }
                        if (!request.uri) return [3 /*break*/, 8];
                        upload = new node_file_upload_1.NodeFileUpload(request.uri, request.size);
                        return [4 /*yield*/, upload.create()];
                    case 5:
                        _a.sent();
                        if (!!upload.size) return [3 /*break*/, 7];
                        return [4 /*yield*/, commitUpload()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                    case 8:
                        console.error('unknown upload request', data);
                        throw new Error('unknown upload request, see backend logs');
                    case 9:
                        e_1 = _a.sent();
                        console.error(e_1);
                        if (socket.readyState === 1) {
                            socket.send(JSON.stringify({
                                error: 'upload failed (see backend logs for details), reason: ' + e_1.message
                            }));
                            socket.close();
                        }
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); }); });
        socket.on('error', console.error);
        socket.on('close', function () {
            if (upload) {
                upload.dispose();
            }
        });
    };
    var NodeFileUploadService_1;
    NodeFileUploadService.wsPath = '/file-upload';
    NodeFileUploadService = NodeFileUploadService_1 = __decorate([
        inversify_1.injectable()
    ], NodeFileUploadService);
    return NodeFileUploadService;
}());
exports.NodeFileUploadService = NodeFileUploadService;
//# sourceMappingURL=node-file-upload-service.js.map