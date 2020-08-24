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
exports.DialogsMainImpl = void 0;
var browser_1 = require("@theia/filesystem/lib/browser");
var browser_2 = require("@theia/workspace/lib/browser");
var common_1 = require("@theia/filesystem/lib/common");
var selection_1 = require("@theia/core/lib/common/selection");
var uri_1 = require("@theia/core/lib/common/uri");
var file_upload_service_1 = require("@theia/filesystem/lib/browser/file-upload-service");
var DialogsMainImpl = /** @class */ (function () {
    function DialogsMainImpl(rpc, container) {
        this.workspaceService = container.get(browser_2.WorkspaceService);
        this.fileSystem = container.get(common_1.FileSystem);
        this.openFileDialogFactory = container.get(browser_1.OpenFileDialogFactory);
        this.saveFileDialogFactory = container.get(browser_1.SaveFileDialogFactory);
        this.uploadService = container.get(file_upload_service_1.FileUploadService);
    }
    DialogsMainImpl.prototype.getRootUri = function (defaultUri) {
        return __awaiter(this, void 0, void 0, function () {
            var rootStat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!defaultUri) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fileSystem.getFileStat(defaultUri)];
                    case 1:
                        rootStat = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(rootStat && !rootStat.isDirectory || !rootStat)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fileSystem.getFileStat(new uri_1.default(defaultUri).parent.toString())];
                    case 3:
                        rootStat = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!!rootStat) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.workspaceService.roots];
                    case 5:
                        rootStat = (_a.sent())[0];
                        _a.label = 6;
                    case 6:
                        if (!!rootStat) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.fileSystem.getCurrentUserHome()];
                    case 7:
                        rootStat = _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/, rootStat];
                }
            });
        });
    };
    DialogsMainImpl.prototype.$showOpenDialog = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var rootStat, rootNode, canSelectFiles, canSelectFolders, title, dialogProps, dialog, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRootUri(options.defaultUri ? options.defaultUri : undefined)];
                    case 1:
                        rootStat = _a.sent();
                        // Fail if root not fount
                        if (!rootStat) {
                            throw new Error('Unable to find the rootStat');
                        }
                        rootNode = browser_1.DirNode.createRoot(rootStat);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        canSelectFiles = typeof options.canSelectFiles === 'boolean' ? options.canSelectFiles : true;
                        canSelectFolders = typeof options.canSelectFolders === 'boolean' ? options.canSelectFolders : true;
                        title = void 0;
                        if (canSelectFiles && canSelectFolders) {
                            title = 'Open';
                        }
                        else {
                            if (canSelectFiles) {
                                title = 'Open File';
                            }
                            else {
                                title = 'Open Folder';
                            }
                            if (options.canSelectMany) {
                                title += '(s)';
                            }
                        }
                        dialogProps = {
                            title: title,
                            openLabel: options.openLabel,
                            canSelectFiles: options.canSelectFiles,
                            canSelectFolders: options.canSelectFolders,
                            canSelectMany: options.canSelectMany,
                            filters: options.filters
                        };
                        dialog = this.openFileDialogFactory(dialogProps);
                        dialog.model.navigateTo(rootNode);
                        return [4 /*yield*/, dialog.open()];
                    case 3:
                        result = _a.sent();
                        // Return the result
                        return [2 /*return*/, selection_1.UriSelection.getUris(result).map(function (uri) { return uri.path.toString(); })];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, undefined];
                }
            });
        });
    };
    DialogsMainImpl.prototype.$showSaveDialog = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var rootStat, rootNode, fileNameValue, defaultURIStat, dialogProps, dialog, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRootUri(options.defaultUri ? options.defaultUri : undefined)];
                    case 1:
                        rootStat = _a.sent();
                        // Fail if root not found
                        if (!rootStat) {
                            throw new Error('Unable to find the rootStat');
                        }
                        rootNode = browser_1.DirNode.createRoot(rootStat);
                        fileNameValue = '';
                        if (!options.defaultUri) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fileSystem.getFileStat(options.defaultUri)];
                    case 2:
                        defaultURIStat = _a.sent();
                        if (defaultURIStat && !defaultURIStat.isDirectory || !defaultURIStat) {
                            fileNameValue = new uri_1.default(options.defaultUri).path.base;
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        dialogProps = {
                            title: 'Save',
                            saveLabel: options.saveLabel,
                            filters: options.filters,
                            inputValue: fileNameValue
                        };
                        dialog = this.saveFileDialogFactory(dialogProps);
                        dialog.model.navigateTo(rootNode);
                        return [4 /*yield*/, dialog.open()];
                    case 4:
                        result = _a.sent();
                        // Return the result
                        if (result) {
                            return [2 /*return*/, result.path.toString()];
                        }
                        return [2 /*return*/, undefined];
                    case 5:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, undefined];
                }
            });
        });
    };
    DialogsMainImpl.prototype.$showUploadDialog = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var rootStat, uploadResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRootUri(options.defaultUri)];
                    case 1:
                        rootStat = _a.sent();
                        // Fail if root not fount
                        if (!rootStat) {
                            throw new Error('Failed to resolve base directory where files should be uploaded');
                        }
                        return [4 /*yield*/, this.uploadService.upload(rootStat.uri)];
                    case 2:
                        uploadResult = _a.sent();
                        if (uploadResult) {
                            return [2 /*return*/, uploadResult.uploaded];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    return DialogsMainImpl;
}());
exports.DialogsMainImpl = DialogsMainImpl;
//# sourceMappingURL=dialogs-main.js.map