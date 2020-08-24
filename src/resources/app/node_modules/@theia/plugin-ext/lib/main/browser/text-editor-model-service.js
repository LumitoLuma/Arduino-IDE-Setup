"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorModelService = void 0;
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
var core_1 = require("@theia/core");
var inversify_1 = require("inversify");
var monaco_text_model_service_1 = require("@theia/monaco/lib/browser/monaco-text-model-service");
var monaco_workspace_1 = require("@theia/monaco/lib/browser/monaco-workspace");
var uri_components_1 = require("../../common/uri-components");
var EditorModelService = /** @class */ (function () {
    function EditorModelService(monacoModelService, monacoWorkspace) {
        var _this = this;
        this.modelModeChangedEmitter = new core_1.Emitter();
        this.onModelRemovedEmitter = new core_1.Emitter();
        this.modelDirtyEmitter = new core_1.Emitter();
        this.modelSavedEmitter = new core_1.Emitter();
        this.onModelWillSavedEmitter = new core_1.Emitter();
        this.onModelDirtyChanged = this.modelDirtyEmitter.event;
        this.onModelSaved = this.modelSavedEmitter.event;
        this.onModelModeChanged = this.modelModeChangedEmitter.event;
        this.onModelRemoved = this.onModelRemovedEmitter.event;
        this.onModelWillSave = this.onModelWillSavedEmitter.event;
        this.monacoModelService = monacoModelService;
        monacoModelService.models.forEach(function (model) { return _this.modelCreated(model); });
        monacoModelService.onDidCreate(this.modelCreated, this);
        monacoWorkspace.onDidCloseTextDocument(function (model) {
            setTimeout(function () {
                _this.onModelRemovedEmitter.fire(model);
            }, 1);
        });
    }
    EditorModelService.prototype.modelCreated = function (model) {
        var _this = this;
        model.textEditorModel.onDidChangeLanguage(function (e) {
            _this.modelModeChangedEmitter.fire({ model: model, oldModeId: e.oldLanguage });
        });
        model.onDidSaveModel(function (_) {
            _this.modelSavedEmitter.fire(model);
        });
        model.onDirtyChanged(function (_) {
            _this.modelDirtyEmitter.fire(model);
        });
        model.onWillSaveModel(function (willSaveModelEvent) {
            _this.onModelWillSavedEmitter.fire(willSaveModelEvent);
        });
    };
    Object.defineProperty(EditorModelService.prototype, "onModelAdded", {
        get: function () {
            return this.monacoModelService.onDidCreate;
        },
        enumerable: false,
        configurable: true
    });
    EditorModelService.prototype.getModels = function () {
        return this.monacoModelService.models;
    };
    EditorModelService.prototype.saveAll = function (includeUntitled) {
        return __awaiter(this, void 0, void 0, function () {
            var saves, _loop_1, _a, _b, model, results;
            var e_1, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        saves = [];
                        _loop_1 = function (model) {
                            var uri = model.textEditorModel.uri;
                            if (model.dirty && (includeUntitled || uri.scheme !== uri_components_1.Schemes.UNTITLED)) {
                                saves.push((function () { return __awaiter(_this, void 0, void 0, function () {
                                    var e_2;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _a.trys.push([0, 2, , 3]);
                                                return [4 /*yield*/, model.save()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/, true];
                                            case 2:
                                                e_2 = _a.sent();
                                                console.error('Failed to save ', uri.toString(), e_2);
                                                return [2 /*return*/, false];
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); })());
                            }
                        };
                        try {
                            for (_a = __values(this.monacoModelService.models), _b = _a.next(); !_b.done; _b = _a.next()) {
                                model = _b.value;
                                _loop_1(model);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, Promise.all(saves)];
                    case 1:
                        results = _d.sent();
                        return [2 /*return*/, results.reduce(function (a, b) { return a && b; }, true)];
                }
            });
        });
    };
    EditorModelService.prototype.createModelReference = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.monacoModelService.createModelReference(uri)];
            });
        });
    };
    EditorModelService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(monaco_text_model_service_1.MonacoTextModelService)),
        __param(1, inversify_1.inject(monaco_workspace_1.MonacoWorkspace)),
        __metadata("design:paramtypes", [monaco_text_model_service_1.MonacoTextModelService,
            monaco_workspace_1.MonacoWorkspace])
    ], EditorModelService);
    return EditorModelService;
}());
exports.EditorModelService = EditorModelService;
//# sourceMappingURL=text-editor-model-service.js.map