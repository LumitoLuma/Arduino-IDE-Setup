(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/@theia/output/lib/browser/output-widget.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@theia/output/lib/browser/output-widget.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.OUTPUT_WIDGET_KIND = exports.OutputWidget = void 0;
__webpack_require__(/*! ../../src/browser/style/output.css */ "./node_modules/@theia/output/src/browser/style/output.css");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var algorithm_1 = __webpack_require__(/*! @phosphor/algorithm */ "./node_modules/@phosphor/algorithm/lib/index.js");
var browser_1 = __webpack_require__(/*! @theia/editor/lib/browser */ "./node_modules/@theia/editor/lib/browser/index.js");
var monaco_editor_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-editor */ "./node_modules/@theia/monaco/lib/browser/monaco-editor.js");
var selection_service_1 = __webpack_require__(/*! @theia/core/lib/common/selection-service */ "./node_modules/@theia/core/lib/common/selection-service.js");
var monaco_editor_provider_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-editor-provider */ "./node_modules/@theia/monaco/lib/browser/monaco-editor-provider.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var browser_2 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var output_uri_1 = __webpack_require__(/*! ../common/output-uri */ "./node_modules/@theia/output/lib/common/output-uri.js");
var output_channel_1 = __webpack_require__(/*! ../common/output-channel */ "./node_modules/@theia/output/lib/common/output-channel.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var OutputWidget = /** @class */ (function (_super) {
    __extends(OutputWidget, _super);
    function OutputWidget() {
        var _this = _super.call(this) || this;
        _this._state = { locked: false };
        _this.toDisposeOnSelectedChannelChanged = new disposable_1.DisposableCollection();
        _this.onStateChangedEmitter = new core_1.Emitter();
        _this.id = OutputWidget_1.ID;
        _this.title.label = 'Output';
        _this.title.caption = 'Output';
        _this.title.iconClass = 'fa fa-flag';
        _this.title.closable = true;
        _this.addClass('theia-output');
        _this.node.tabIndex = 0;
        _this.editorContainer = new NoopDragOverDockPanel({ spacing: 0, mode: 'single-document' });
        _this.editorContainer.addClass('editor-container');
        _this.editorContainer.node.tabIndex = -1;
        return _this;
    }
    OutputWidget_1 = OutputWidget;
    OutputWidget.prototype.init = function () {
        var _this = this;
        this.toDispose.pushAll([
            this.outputChannelManager.onChannelWasHidden(function () { return _this.refreshEditorWidget(); }),
            this.outputChannelManager.onChannelWasShown(function (_a) {
                var preserveFocus = _a.preserveFocus;
                return _this.refreshEditorWidget({ preserveFocus: !!preserveFocus });
            }),
            this.toDisposeOnSelectedChannelChanged,
            this.onStateChangedEmitter,
            this.onStateChanged(function () { return _this.update(); })
        ]);
        this.refreshEditorWidget();
    };
    OutputWidget.prototype.storeState = function () {
        return this.state;
    };
    OutputWidget.prototype.restoreState = function (oldState) {
        var copy = core_1.deepClone(this.state);
        if (oldState.locked) {
            copy.locked = oldState.locked;
        }
        this.state = copy;
    };
    Object.defineProperty(OutputWidget.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (state) {
            this._state = state;
            this.onStateChangedEmitter.fire(this._state);
        },
        enumerable: false,
        configurable: true
    });
    OutputWidget.prototype.refreshEditorWidget = function (_a) {
        var preserveFocus = (_a === void 0 ? { preserveFocus: false } : _a).preserveFocus;
        return __awaiter(this, void 0, void 0, function () {
            var selectedChannel, editorWidget, model, widget_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        selectedChannel = this.selectedChannel;
                        editorWidget = this.editorWidget;
                        if (selectedChannel && editorWidget) {
                            model = editorWidget.editor.getControl().getModel();
                            if (model && model.uri.toString() === selectedChannel.uri.toString()) {
                                if (!preserveFocus) {
                                    this.activate();
                                }
                                return [2 /*return*/];
                            }
                        }
                        this.toDisposeOnSelectedChannelChanged.dispose();
                        if (!selectedChannel) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createEditorWidget()];
                    case 1:
                        widget_1 = _b.sent();
                        if (widget_1) {
                            this.editorContainer.addWidget(widget_1);
                            this.toDisposeOnSelectedChannelChanged.pushAll([
                                disposable_1.Disposable.create(function () { return widget_1.close(); }),
                                selectedChannel.onContentChange(function () { return _this.revealLastLine(); })
                            ]);
                            if (!preserveFocus) {
                                this.activate();
                            }
                            this.revealLastLine();
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    OutputWidget.prototype.onAfterAttach = function (message) {
        var _this = this;
        _super.prototype.onAfterAttach.call(this, message);
        browser_2.Widget.attach(this.editorContainer, this.node);
        this.toDisposeOnDetach.push(disposable_1.Disposable.create(function () { return browser_2.Widget.detach(_this.editorContainer); }));
    };
    OutputWidget.prototype.onActivateRequest = function (message) {
        _super.prototype.onActivateRequest.call(this, message);
        if (this.editor) {
            this.editor.focus();
        }
        else {
            this.node.focus();
        }
    };
    OutputWidget.prototype.onResize = function (message) {
        var e_1, _a;
        _super.prototype.onResize.call(this, message);
        browser_2.MessageLoop.sendMessage(this.editorContainer, browser_2.Widget.ResizeMessage.UnknownSize);
        try {
            for (var _b = __values(algorithm_1.toArray(this.editorContainer.widgets())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var widget = _c.value;
                browser_2.MessageLoop.sendMessage(widget, browser_2.Widget.ResizeMessage.UnknownSize);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Object.defineProperty(OutputWidget.prototype, "onStateChanged", {
        get: function () {
            return this.onStateChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    OutputWidget.prototype.clear = function () {
        if (this.selectedChannel) {
            this.selectedChannel.clear();
        }
    };
    OutputWidget.prototype.selectAll = function () {
        var editor = this.editor;
        if (editor) {
            var model = editor.getControl().getModel();
            if (model) {
                var endLine = model.getLineCount();
                var endCharacter = model.getLineMaxColumn(endLine);
                editor.getControl().setSelection(new monaco.Range(1, 1, endLine, endCharacter));
            }
        }
    };
    OutputWidget.prototype.lock = function () {
        this.state = __assign(__assign({}, core_1.deepClone(this.state)), { locked: true });
    };
    OutputWidget.prototype.unlock = function () {
        this.state = __assign(__assign({}, core_1.deepClone(this.state)), { locked: false });
    };
    Object.defineProperty(OutputWidget.prototype, "isLocked", {
        get: function () {
            return !!this.state.locked;
        },
        enumerable: false,
        configurable: true
    });
    OutputWidget.prototype.revealLastLine = function () {
        if (this.isLocked) {
            return;
        }
        var editor = this.editor;
        if (editor) {
            var model = editor.getControl().getModel();
            if (model) {
                var lineNumber = model.getLineCount();
                var column = model.getLineMaxColumn(lineNumber);
                editor.getControl().revealPosition({ lineNumber: lineNumber, column: column }, monaco.editor.ScrollType.Smooth);
            }
        }
    };
    Object.defineProperty(OutputWidget.prototype, "selectedChannel", {
        get: function () {
            return this.outputChannelManager.selectedChannel;
        },
        enumerable: false,
        configurable: true
    });
    OutputWidget.prototype.createEditorWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name, editor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.selectedChannel) {
                            return [2 /*return*/, undefined];
                        }
                        name = this.selectedChannel.name;
                        return [4 /*yield*/, this.editorProvider.get(output_uri_1.OutputUri.create(name))];
                    case 1:
                        editor = _a.sent();
                        return [2 /*return*/, new browser_1.EditorWidget(editor, this.selectionService)];
                }
            });
        });
    };
    Object.defineProperty(OutputWidget.prototype, "editorWidget", {
        get: function () {
            var e_2, _a;
            try {
                for (var _b = __values(algorithm_1.toArray(this.editorContainer.children())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var widget = _c.value;
                    if (widget instanceof browser_1.EditorWidget) {
                        return widget;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OutputWidget.prototype, "editor", {
        get: function () {
            var widget = this.editorWidget;
            if (widget instanceof browser_1.EditorWidget) {
                if (widget.editor instanceof monaco_editor_1.MonacoEditor) {
                    return widget.editor;
                }
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    OutputWidget.prototype.getText = function () {
        var _a, _b;
        return (_b = (_a = this.editor) === null || _a === void 0 ? void 0 : _a.getControl().getModel()) === null || _b === void 0 ? void 0 : _b.getValue();
    };
    var OutputWidget_1;
    OutputWidget.ID = 'outputView';
    __decorate([
        inversify_1.inject(selection_service_1.SelectionService),
        __metadata("design:type", selection_service_1.SelectionService)
    ], OutputWidget.prototype, "selectionService", void 0);
    __decorate([
        inversify_1.inject(monaco_editor_provider_1.MonacoEditorProvider),
        __metadata("design:type", monaco_editor_provider_1.MonacoEditorProvider)
    ], OutputWidget.prototype, "editorProvider", void 0);
    __decorate([
        inversify_1.inject(output_channel_1.OutputChannelManager),
        __metadata("design:type", output_channel_1.OutputChannelManager)
    ], OutputWidget.prototype, "outputChannelManager", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OutputWidget.prototype, "init", null);
    OutputWidget = OutputWidget_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], OutputWidget);
    return OutputWidget;
}(browser_2.BaseWidget));
exports.OutputWidget = OutputWidget;
/**
 * @deprecated Use `OutputWidget.ID` instead.
 */
exports.OUTPUT_WIDGET_KIND = OutputWidget.ID;
/**
 * Customized `DockPanel` that does not allow dropping widgets into it.
 * Intercepts `'p-dragover'` events, and sets the desired drop action to `'none'`.
 */
var NoopDragOverDockPanel = /** @class */ (function (_super) {
    __extends(NoopDragOverDockPanel, _super);
    function NoopDragOverDockPanel(options) {
        var _this = _super.call(this, options) || this;
        NoopDragOverDockPanel.prototype['_evtDragOver'] = function (event) {
            event.preventDefault();
            event.stopPropagation();
            event.dropAction = 'none';
        };
        return _this;
    }
    return NoopDragOverDockPanel;
}(browser_2.DockPanel));


/***/ }),

/***/ "./node_modules/@theia/output/src/browser/style/output.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@theia/output/src/browser/style/output.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../css-loader!./output.css */ "./node_modules/css-loader/index.js!./node_modules/@theia/output/src/browser/style/output.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/@theia/output/src/browser/style/output.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/@theia/output/src/browser/style/output.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/********************************************************************************\n * Copyright (C) 2018 TypeFox and others.\n *\n * This program and the accompanying materials are made available under the\n * terms of the Eclipse Public License v. 2.0 which is available at\n * http://www.eclipse.org/legal/epl-2.0.\n *\n * This Source Code may also be made available under the following Secondary\n * Licenses when the conditions for such availability set forth in the Eclipse\n * Public License v. 2.0 are satisfied: GNU General Public License, version 2\n * with the GNU Classpath Exception which is available at\n * https://www.gnu.org/software/classpath/license.html.\n *\n * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0\n ********************************************************************************/\n\n.theia-output .editor-container {\n    height: 100%;\n}\n\n.theia-output-error {\n    color: var(--theia-errorForeground);\n}\n\n.theia-output-warning {\n    color: var(--theia-editorWarning-foreground);\n}\n", ""]);

// exports


/***/ })

}]);
//# sourceMappingURL=32.bundle.js.map