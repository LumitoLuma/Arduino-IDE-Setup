(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/@theia/markers/lib/browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@theia/markers/lib/browser/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./marker-manager */ "./node_modules/@theia/markers/lib/browser/marker-manager.js"), exports);
__exportStar(__webpack_require__(/*! ./problem/problem-manager */ "./node_modules/@theia/markers/lib/browser/problem/problem-manager.js"), exports);


/***/ }),

/***/ "./node_modules/@theia/monaco/lib/browser/monaco-configurations.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@theia/monaco/lib/browser/monaco-configurations.js ***!
  \*************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.MonacoWorkspaceConfiguration = exports.MonacoConfigurations = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var common_1 = __webpack_require__(/*! @theia/core/lib/common */ "./node_modules/@theia/core/lib/common/index.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var MonacoConfigurations = /** @class */ (function () {
    function MonacoConfigurations() {
        this.onDidChangeConfigurationEmitter = new common_1.Emitter();
        this.onDidChangeConfiguration = this.onDidChangeConfigurationEmitter.event;
    }
    MonacoConfigurations_1 = MonacoConfigurations;
    MonacoConfigurations.prototype.init = function () {
        var _this = this;
        this.reconcileData();
        this.preferences.onPreferencesChanged(function (changes) { return _this.reconcileData(changes); });
    };
    MonacoConfigurations.prototype.reconcileData = function (changes) {
        var _this = this;
        this.onDidChangeConfigurationEmitter.fire({
            affectedSections: MonacoConfigurations_1.parseSections(changes),
            affectsConfiguration: function (section) { return _this.affectsConfiguration(section, changes); }
        });
    };
    MonacoConfigurations.prototype.affectsConfiguration = function (section, changes) {
        if (!changes) {
            return true;
        }
        for (var preferenceName in changes) {
            if (section.startsWith(preferenceName) || preferenceName.startsWith(section)) {
                return true;
            }
        }
        return false;
    };
    MonacoConfigurations.prototype.getConfiguration = function (section, resource) {
        return new MonacoWorkspaceConfiguration(this.preferences, this.preferenceSchemaProvider, section, resource);
    };
    var MonacoConfigurations_1;
    __decorate([
        inversify_1.inject(browser_1.PreferenceService),
        __metadata("design:type", Object)
    ], MonacoConfigurations.prototype, "preferences", void 0);
    __decorate([
        inversify_1.inject(browser_1.PreferenceSchemaProvider),
        __metadata("design:type", browser_1.PreferenceSchemaProvider)
    ], MonacoConfigurations.prototype, "preferenceSchemaProvider", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MonacoConfigurations.prototype, "init", null);
    MonacoConfigurations = MonacoConfigurations_1 = __decorate([
        inversify_1.injectable()
    ], MonacoConfigurations);
    return MonacoConfigurations;
}());
exports.MonacoConfigurations = MonacoConfigurations;
(function (MonacoConfigurations) {
    function parseSections(changes) {
        var e_1, _a;
        if (!changes) {
            return undefined;
        }
        var sections = [];
        try {
            for (var _b = __values(Object.keys(changes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var hasOverride = key.startsWith('[');
                while (key) {
                    sections.push(key);
                    if (hasOverride && key.indexOf('.') !== -1) {
                        sections.push(key.substr(key.indexOf('.')));
                    }
                    var index = key.lastIndexOf('.');
                    key = key.substring(0, index);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return sections;
    }
    MonacoConfigurations.parseSections = parseSections;
})(MonacoConfigurations = exports.MonacoConfigurations || (exports.MonacoConfigurations = {}));
exports.MonacoConfigurations = MonacoConfigurations;
var MonacoWorkspaceConfiguration = /** @class */ (function () {
    function MonacoWorkspaceConfiguration(preferences, preferenceSchemaProvider, section, resource) {
        this.preferences = preferences;
        this.preferenceSchemaProvider = preferenceSchemaProvider;
        this.section = section;
        this.resource = resource;
    }
    MonacoWorkspaceConfiguration.prototype.getSection = function (section) {
        if (this.section) {
            return this.section + '.' + section;
        }
        return section;
    };
    MonacoWorkspaceConfiguration.prototype.has = function (section) {
        return this.preferences.inspect(this.getSection(section), this.resource) !== undefined;
    };
    MonacoWorkspaceConfiguration.prototype.get = function (section, defaultValue) {
        return this.preferences.get(this.getSection(section), defaultValue, this.resource);
    };
    MonacoWorkspaceConfiguration.prototype.toJSON = function () {
        var proxy = browser_1.createPreferenceProxy(this.preferences, this.preferenceSchemaProvider.getCombinedSchema(), {
            resourceUri: this.resource,
            style: 'deep'
        });
        if (this.section) {
            return proxy[this.section];
        }
        return proxy;
    };
    return MonacoWorkspaceConfiguration;
}());
exports.MonacoWorkspaceConfiguration = MonacoWorkspaceConfiguration;


/***/ }),

/***/ "./node_modules/@theia/monaco/lib/browser/monaco-editor.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@theia/monaco/lib/browser/monaco-editor.js ***!
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
exports.MonacoEditor = exports.MonacoEditorServices = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var monaco_languageclient_1 = __webpack_require__(/*! monaco-languageclient */ "./node_modules/monaco-languageclient/lib/index.js");
var domutils_1 = __webpack_require__(/*! @phosphor/domutils */ "./node_modules/@phosphor/domutils/lib/index.js");
var context_key_service_1 = __webpack_require__(/*! @theia/core/lib/browser/context-key-service */ "./node_modules/@theia/core/lib/browser/context-key-service.js");
var common_1 = __webpack_require__(/*! @theia/core/lib/common */ "./node_modules/@theia/core/lib/common/index.js");
var MonacoEditorServices = /** @class */ (function () {
    function MonacoEditorServices(services) {
        Object.assign(this, services);
    }
    __decorate([
        inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter),
        __metadata("design:type", monaco_languageclient_1.MonacoToProtocolConverter)
    ], MonacoEditorServices.prototype, "m2p", void 0);
    __decorate([
        inversify_1.inject(monaco_languageclient_1.ProtocolToMonacoConverter),
        __metadata("design:type", monaco_languageclient_1.ProtocolToMonacoConverter)
    ], MonacoEditorServices.prototype, "p2m", void 0);
    __decorate([
        inversify_1.inject(context_key_service_1.ContextKeyService),
        __metadata("design:type", context_key_service_1.ContextKeyService)
    ], MonacoEditorServices.prototype, "contextKeyService", void 0);
    MonacoEditorServices = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.unmanaged()),
        __metadata("design:paramtypes", [MonacoEditorServices])
    ], MonacoEditorServices);
    return MonacoEditorServices;
}());
exports.MonacoEditorServices = MonacoEditorServices;
var MonacoEditor = /** @class */ (function (_super) {
    __extends(MonacoEditor, _super);
    function MonacoEditor(uri, document, node, services, options, override) {
        var _this = _super.call(this, services) || this;
        _this.uri = uri;
        _this.document = document;
        _this.node = node;
        _this.toDispose = new common_1.DisposableCollection();
        _this.onCursorPositionChangedEmitter = new common_1.Emitter();
        _this.onSelectionChangedEmitter = new common_1.Emitter();
        _this.onFocusChangedEmitter = new common_1.Emitter();
        _this.onDocumentContentChangedEmitter = new common_1.Emitter();
        _this.onMouseDownEmitter = new common_1.Emitter();
        _this.onLanguageChangedEmitter = new common_1.Emitter();
        _this.onLanguageChanged = _this.onLanguageChangedEmitter.event;
        _this.onScrollChangedEmitter = new common_1.Emitter();
        _this.onEncodingChangedEmitter = new common_1.Emitter();
        _this.onEncodingChanged = _this.onEncodingChangedEmitter.event;
        _this.documents = new Set();
        /* `true` because it is derived from an URI during the instantiation */
        _this._languageAutoDetected = true;
        _this.toDispose.pushAll([
            _this.onCursorPositionChangedEmitter,
            _this.onSelectionChangedEmitter,
            _this.onFocusChangedEmitter,
            _this.onDocumentContentChangedEmitter,
            _this.onMouseDownEmitter,
            _this.onLanguageChangedEmitter,
            _this.onScrollChangedEmitter,
            _this.onEncodingChangedEmitter
        ]);
        _this.documents.add(document);
        _this.autoSizing = options && options.autoSizing !== undefined ? options.autoSizing : false;
        _this.minHeight = options && options.minHeight !== undefined ? options.minHeight : -1;
        _this.maxHeight = options && options.maxHeight !== undefined ? options.maxHeight : -1;
        _this.toDispose.push(_this.create(options, override));
        _this.addHandlers(_this.editor);
        return _this;
    }
    MonacoEditor.prototype.getEncoding = function () {
        return this.document.getEncoding() || 'utf8';
    };
    MonacoEditor.prototype.setEncoding = function (encoding, mode) {
        var _this = this;
        if (mode === 1 /* Decode */) {
            // reopen file with encoding
            this.document.reopenWithEncoding(encoding)
                .then(function () { return _this.onEncodingChangedEmitter.fire(encoding); });
        }
        else {
            // encode and save file
            this.document.saveWithEncoding(encoding)
                .then(function () { return _this.onEncodingChangedEmitter.fire(encoding); });
        }
    };
    MonacoEditor.prototype.create = function (options, override) {
        return this.editor = monaco.editor.create(this.node, __assign(__assign({}, options), { lightbulb: { enabled: true }, fixedOverflowWidgets: true, scrollbar: {
                useShadows: false,
                verticalHasArrows: false,
                horizontalHasArrows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10
            } }), override);
    };
    MonacoEditor.prototype.addHandlers = function (codeEditor) {
        var _this = this;
        this.toDispose.push(codeEditor.onDidChangeModelLanguage(function (e) {
            return _this.fireLanguageChanged(e.newLanguage);
        }));
        this.toDispose.push(codeEditor.onDidChangeConfiguration(function () { return _this.refresh(); }));
        this.toDispose.push(codeEditor.onDidChangeModel(function () { return _this.refresh(); }));
        this.toDispose.push(codeEditor.onDidChangeModelContent(function (e) {
            _this.refresh();
            _this.onDocumentContentChangedEmitter.fire({ document: _this.document, contentChanges: e.changes.map(_this.mapModelContentChange.bind(_this)) });
        }));
        this.toDispose.push(codeEditor.onDidChangeCursorPosition(function () {
            return _this.onCursorPositionChangedEmitter.fire(_this.cursor);
        }));
        this.toDispose.push(codeEditor.onDidChangeCursorSelection(function () {
            return _this.onSelectionChangedEmitter.fire(_this.selection);
        }));
        this.toDispose.push(codeEditor.onDidFocusEditorText(function () {
            return _this.onFocusChangedEmitter.fire(_this.isFocused());
        }));
        this.toDispose.push(codeEditor.onDidBlurEditorText(function () {
            return _this.onFocusChangedEmitter.fire(_this.isFocused());
        }));
        this.toDispose.push(codeEditor.onMouseDown(function (e) {
            var _a = e.target, element = _a.element, position = _a.position, range = _a.range;
            _this.onMouseDownEmitter.fire({
                target: __assign(__assign({}, e.target), { element: element || undefined, mouseColumn: _this.m2p.asPosition(undefined, e.target.mouseColumn).character, range: range && _this.m2p.asRange(range) || undefined, position: position && _this.m2p.asPosition(position.lineNumber, position.column) || undefined }),
                event: e.event.browserEvent
            });
        }));
        this.toDispose.push(codeEditor.onDidScrollChange(function (e) {
            _this.onScrollChangedEmitter.fire(undefined);
        }));
    };
    MonacoEditor.prototype.getVisibleRanges = function () {
        var _this = this;
        return this.editor.getVisibleRanges().map(function (range) { return _this.m2p.asRange(range); });
    };
    MonacoEditor.prototype.mapModelContentChange = function (change) {
        return {
            range: this.m2p.asRange(change.range),
            rangeLength: change.rangeLength,
            text: change.text
        };
    };
    Object.defineProperty(MonacoEditor.prototype, "onDispose", {
        get: function () {
            return this.toDispose.onDispose;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "onDocumentContentChanged", {
        get: function () {
            return this.onDocumentContentChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "cursor", {
        get: function () {
            var _a = this.editor.getPosition(), lineNumber = _a.lineNumber, column = _a.column;
            return this.m2p.asPosition(lineNumber, column);
        },
        set: function (cursor) {
            var position = this.p2m.asPosition(cursor);
            this.editor.setPosition(position);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "onCursorPositionChanged", {
        get: function () {
            return this.onCursorPositionChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "selection", {
        get: function () {
            return this.m2p.asRange(this.editor.getSelection());
        },
        set: function (selection) {
            var range = this.p2m.asRange(selection);
            this.editor.setSelection(range);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "onSelectionChanged", {
        get: function () {
            return this.onSelectionChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "onScrollChanged", {
        get: function () {
            return this.onScrollChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    MonacoEditor.prototype.revealPosition = function (raw, options) {
        if (options === void 0) { options = { vertical: 'center' }; }
        var position = this.p2m.asPosition(raw);
        switch (options.vertical) {
            case 'auto':
                this.editor.revealPosition(position);
                break;
            case 'center':
                this.editor.revealPositionInCenter(position);
                break;
            case 'centerIfOutsideViewport':
                this.editor.revealPositionInCenterIfOutsideViewport(position);
                break;
        }
    };
    MonacoEditor.prototype.revealRange = function (raw, options) {
        if (options === void 0) { options = { at: 'center' }; }
        var range = this.p2m.asRange(raw);
        switch (options.at) {
            case 'top':
                this.editor.revealRangeAtTop(range);
                break;
            case 'center':
                this.editor.revealRangeInCenter(range);
                break;
            case 'centerIfOutsideViewport':
                this.editor.revealRangeInCenterIfOutsideViewport(range);
                break;
            case 'auto':
                this.editor.revealRange(range);
                break;
        }
    };
    MonacoEditor.prototype.focus = function () {
        /**
         * `this.editor.focus` forcefully changes the focus editor state,
         * regardless whether the textarea actually received the focus.
         * It could lead to issues like https://github.com/eclipse-theia/theia/issues/7902
         * Instead we focus the underlying textarea.
         */
        var node = this.editor.getDomNode();
        if (node) {
            var textarea = node.querySelector('textarea');
            textarea.focus();
        }
    };
    MonacoEditor.prototype.blur = function () {
        var node = this.editor.getDomNode();
        if (node) {
            var textarea = node.querySelector('textarea');
            textarea.blur();
        }
    };
    MonacoEditor.prototype.isFocused = function (_a) {
        var strict = (_a === void 0 ? { strict: false } : _a).strict;
        if (!this.editor.hasTextFocus()) {
            return false;
        }
        if (strict) {
            return !this.isSuggestWidgetVisible() && !this.isFindWidgetVisible() && !this.isRenameInputVisible();
        }
        return true;
    };
    Object.defineProperty(MonacoEditor.prototype, "onFocusChanged", {
        get: function () {
            return this.onFocusChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "onMouseDown", {
        get: function () {
            return this.onMouseDownEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * `true` if the suggest widget is visible in the editor. Otherwise, `false`.
     */
    MonacoEditor.prototype.isSuggestWidgetVisible = function () {
        return this.contextKeyService.match('suggestWidgetVisible', this.editor.getDomNode() || this.node);
    };
    /**
     * `true` if the find (and replace) widget is visible in the editor. Otherwise, `false`.
     */
    MonacoEditor.prototype.isFindWidgetVisible = function () {
        return this.contextKeyService.match('findWidgetVisible', this.editor.getDomNode() || this.node);
    };
    /**
     * `true` if the name rename refactoring input HTML element is visible. Otherwise, `false`.
     */
    MonacoEditor.prototype.isRenameInputVisible = function () {
        return this.contextKeyService.match('renameInputVisible', this.editor.getDomNode() || this.node);
    };
    MonacoEditor.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MonacoEditor.prototype.trigger = function (source, handlerId, payload) {
        this.editor.trigger(source, handlerId, payload);
    };
    MonacoEditor.prototype.getControl = function () {
        return this.editor;
    };
    MonacoEditor.prototype.refresh = function () {
        this.autoresize();
    };
    MonacoEditor.prototype.resizeToFit = function () {
        this.autoresize();
    };
    MonacoEditor.prototype.setSize = function (dimension) {
        this.resize(dimension);
    };
    MonacoEditor.prototype.autoresize = function () {
        if (this.autoSizing) {
            // eslint-disable-next-line no-null/no-null
            this.resize(null);
        }
    };
    MonacoEditor.prototype.resize = function (dimension) {
        if (this.node) {
            var layoutSize = this.computeLayoutSize(this.node, dimension);
            this.editor.layout(layoutSize);
        }
    };
    MonacoEditor.prototype.computeLayoutSize = function (hostNode, dimension) {
        if (dimension && dimension.width >= 0 && dimension.height >= 0) {
            return dimension;
        }
        var boxSizing = domutils_1.ElementExt.boxSizing(hostNode);
        var width = (!dimension || dimension.width < 0) ?
            this.getWidth(hostNode, boxSizing) :
            dimension.width;
        var height = (!dimension || dimension.height < 0) ?
            this.getHeight(hostNode, boxSizing) :
            dimension.height;
        return { width: width, height: height };
    };
    MonacoEditor.prototype.getWidth = function (hostNode, boxSizing) {
        return hostNode.offsetWidth - boxSizing.horizontalSum;
    };
    MonacoEditor.prototype.getHeight = function (hostNode, boxSizing) {
        if (!this.autoSizing) {
            return hostNode.offsetHeight - boxSizing.verticalSum;
        }
        var lineHeight = this.editor.getOption(monaco.editor.EditorOption.lineHeight);
        var lineCount = this.editor.getModel().getLineCount();
        var contentHeight = lineHeight * lineCount;
        var horizontalScrollbarHeight = this.editor.getLayoutInfo().horizontalScrollbarHeight;
        var editorHeight = contentHeight + horizontalScrollbarHeight;
        if (this.minHeight >= 0) {
            var minHeight = lineHeight * this.minHeight + horizontalScrollbarHeight;
            if (editorHeight < minHeight) {
                return minHeight;
            }
        }
        if (this.maxHeight >= 0) {
            var maxHeight = lineHeight * this.maxHeight + horizontalScrollbarHeight;
            return Math.min(maxHeight, editorHeight);
        }
        return editorHeight;
    };
    MonacoEditor.prototype.isActionSupported = function (id) {
        var action = this.editor.getAction(id);
        return !!action && action.isSupported();
    };
    MonacoEditor.prototype.runAction = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = this.editor.getAction(id);
                        if (!(action && action.isSupported())) return [3 /*break*/, 2];
                        return [4 /*yield*/, action.run()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(MonacoEditor.prototype, "commandService", {
        get: function () {
            return this.editor._commandService;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoEditor.prototype, "instantiationService", {
        get: function () {
            return this.editor._instantiationService;
        },
        enumerable: false,
        configurable: true
    });
    MonacoEditor.prototype.deltaDecorations = function (params) {
        var oldDecorations = params.oldDecorations;
        var newDecorations = this.toDeltaDecorations(params);
        return this.editor.deltaDecorations(oldDecorations, newDecorations);
    };
    MonacoEditor.prototype.toDeltaDecorations = function (params) {
        var _this = this;
        return params.newDecorations.map(function (decoration) { return (__assign(__assign({}, decoration), { range: _this.p2m.asRange(decoration.range) })); });
    };
    MonacoEditor.prototype.getLinesDecorations = function (startLineNumber, endLineNumber) {
        var _this = this;
        var toPosition = function (line) { return _this.p2m.asPosition({ line: line, character: 0 }); };
        var start = toPosition(startLineNumber).lineNumber;
        var end = toPosition(endLineNumber).lineNumber;
        return this.editor
            .getModel()
            .getLinesDecorations(start, end)
            .map(this.toEditorDecoration.bind(this));
    };
    MonacoEditor.prototype.toEditorDecoration = function (decoration) {
        var range = this.m2p.asRange(decoration.range);
        var id = decoration.id, options = decoration.options;
        return {
            options: options,
            range: range,
            id: id
        };
    };
    MonacoEditor.prototype.getVisibleColumn = function (position) {
        return this.editor.getVisibleColumnFromPosition(this.p2m.asPosition(position));
    };
    MonacoEditor.prototype.replaceText = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var edits;
            var _this = this;
            return __generator(this, function (_a) {
                edits = params.replaceOperations.map(function (param) {
                    var range = monaco.Range.fromPositions(_this.p2m.asPosition(param.range.start), _this.p2m.asPosition(param.range.end));
                    return {
                        forceMoveMarkers: true,
                        identifier: {
                            major: range.startLineNumber,
                            minor: range.startColumn
                        },
                        range: range,
                        text: param.text
                    };
                });
                return [2 /*return*/, this.editor.executeEdits(params.source, edits)];
            });
        });
    };
    MonacoEditor.prototype.executeEdits = function (edits) {
        return this.editor.executeEdits('MonacoEditor', this.p2m.asTextEdits(edits));
    };
    MonacoEditor.prototype.storeViewState = function () {
        return this.editor.saveViewState();
    };
    MonacoEditor.prototype.restoreViewState = function (state) {
        this.editor.restoreViewState(state);
    };
    Object.defineProperty(MonacoEditor.prototype, "languageAutoDetected", {
        get: function () {
            return this._languageAutoDetected;
        },
        enumerable: false,
        configurable: true
    });
    MonacoEditor.prototype.detectLanguage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modeService, firstLine, model, language;
            return __generator(this, function (_a) {
                modeService = monaco.services.StaticServices.modeService.get();
                firstLine = this.document.textEditorModel.getLineContent(1);
                model = this.getControl().getModel();
                language = modeService.createByFilepathOrFirstLine(model && model.uri, firstLine);
                this.setLanguage(language.languageIdentifier.language);
                this._languageAutoDetected = true;
                return [2 /*return*/];
            });
        });
    };
    MonacoEditor.prototype.setLanguage = function (languageId) {
        var e_1, _a;
        try {
            for (var _b = __values(this.documents), _c = _b.next(); !_c.done; _c = _b.next()) {
                var document_1 = _c.value;
                monaco.editor.setModelLanguage(document_1.textEditorModel, languageId);
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
    MonacoEditor.prototype.fireLanguageChanged = function (languageId) {
        this._languageAutoDetected = false;
        this.onLanguageChangedEmitter.fire(languageId);
    };
    MonacoEditor.prototype.getResourceUri = function () {
        return this.uri;
    };
    MonacoEditor.prototype.createMoveToUri = function (resourceUri) {
        return this.uri.withPath(resourceUri.path);
    };
    return MonacoEditor;
}(MonacoEditorServices));
exports.MonacoEditor = MonacoEditor;
(function (MonacoEditor) {
    function getAll(manager) {
        return manager.all.map(function (e) { return get(e); }).filter(function (e) { return !!e; });
    }
    MonacoEditor.getAll = getAll;
    function getCurrent(manager) {
        return get(manager.currentEditor);
    }
    MonacoEditor.getCurrent = getCurrent;
    function getActive(manager) {
        return get(manager.activeEditor);
    }
    MonacoEditor.getActive = getActive;
    function get(editorWidget) {
        if (editorWidget && editorWidget.editor instanceof MonacoEditor) {
            return editorWidget.editor;
        }
        return undefined;
    }
    MonacoEditor.get = get;
    function findByDocument(manager, document) {
        return getAll(manager).filter(function (editor) { return editor.documents.has(document); });
    }
    MonacoEditor.findByDocument = findByDocument;
    function getWidgetFor(manager, control) {
        if (!control) {
            return undefined;
        }
        return manager.all.find(function (widget) {
            var editor = get(widget);
            return !!editor && editor.getControl() === control;
        });
    }
    MonacoEditor.getWidgetFor = getWidgetFor;
})(MonacoEditor = exports.MonacoEditor || (exports.MonacoEditor = {}));
exports.MonacoEditor = MonacoEditor;
//# sourceMappingURL=monaco-editor.js.map

/***/ }),

/***/ "./node_modules/@theia/monaco/lib/browser/monaco-workspace.js":
/*!********************************************************************!*\
  !*** ./node_modules/@theia/monaco/lib/browser/monaco-workspace.js ***!
  \********************************************************************/
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoWorkspace = exports.EditsByEditor = exports.TextEdits = exports.RenameResourceEdit = exports.DeleteResourceEdit = exports.CreateResourceEdit = void 0;
/* eslint-disable no-null/no-null */
var vscode_uri_1 = __webpack_require__(/*! vscode-uri */ "./node_modules/vscode-uri/lib/esm/index.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var monaco_languageclient_1 = __webpack_require__(/*! monaco-languageclient */ "./node_modules/monaco-languageclient/lib/index.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var common_1 = __webpack_require__(/*! @theia/core/lib/common */ "./node_modules/@theia/core/lib/common/index.js");
var common_2 = __webpack_require__(/*! @theia/filesystem/lib/common */ "./node_modules/@theia/filesystem/lib/common/index.js");
var browser_1 = __webpack_require__(/*! @theia/filesystem/lib/browser */ "./node_modules/@theia/filesystem/lib/browser/index.js");
var browser_2 = __webpack_require__(/*! @theia/workspace/lib/browser */ "./node_modules/@theia/workspace/lib/browser/index.js");
var browser_3 = __webpack_require__(/*! @theia/editor/lib/browser */ "./node_modules/@theia/editor/lib/browser/index.js");
var lang = __webpack_require__(/*! @theia/languages/lib/browser */ "./node_modules/@theia/languages/lib/browser/index.js");
var browser_4 = __webpack_require__(/*! @theia/languages/lib/browser */ "./node_modules/@theia/languages/lib/browser/index.js");
var monaco_text_model_service_1 = __webpack_require__(/*! ./monaco-text-model-service */ "./node_modules/@theia/monaco/lib/browser/monaco-text-model-service.js");
var monaco_editor_1 = __webpack_require__(/*! ./monaco-editor */ "./node_modules/@theia/monaco/lib/browser/monaco-editor.js");
var monaco_configurations_1 = __webpack_require__(/*! ./monaco-configurations */ "./node_modules/@theia/monaco/lib/browser/monaco-configurations.js");
var browser_5 = __webpack_require__(/*! @theia/markers/lib/browser */ "./node_modules/@theia/markers/lib/browser/index.js");
var CreateResourceEdit;
(function (CreateResourceEdit) {
    function is(arg) {
        return 'newUri' in arg
            && typeof arg.newUri === 'string' // eslint-disable-line @typescript-eslint/no-explicit-any
            && (!('oldUri' in arg) || typeof arg.oldUri === 'undefined'); // eslint-disable-line @typescript-eslint/no-explicit-any
    }
    CreateResourceEdit.is = is;
})(CreateResourceEdit = exports.CreateResourceEdit || (exports.CreateResourceEdit = {}));
var DeleteResourceEdit;
(function (DeleteResourceEdit) {
    function is(arg) {
        return 'oldUri' in arg
            && typeof arg.oldUri === 'string' // eslint-disable-line @typescript-eslint/no-explicit-any
            && (!('newUri' in arg) || typeof arg.newUri === 'undefined'); // eslint-disable-line @typescript-eslint/no-explicit-any
    }
    DeleteResourceEdit.is = is;
})(DeleteResourceEdit = exports.DeleteResourceEdit || (exports.DeleteResourceEdit = {}));
var RenameResourceEdit;
(function (RenameResourceEdit) {
    function is(arg) {
        return 'oldUri' in arg
            && typeof arg.oldUri === 'string' // eslint-disable-line @typescript-eslint/no-explicit-any
            && 'newUri' in arg
            && typeof arg.newUri === 'string'; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
    RenameResourceEdit.is = is;
})(RenameResourceEdit = exports.RenameResourceEdit || (exports.RenameResourceEdit = {}));
var TextEdits;
(function (TextEdits) {
    function is(arg) {
        return 'uri' in arg
            && typeof arg.uri === 'string'; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
    TextEdits.is = is;
    function isVersioned(arg) {
        return is(arg) && arg.version !== undefined;
    }
    TextEdits.isVersioned = isVersioned;
})(TextEdits = exports.TextEdits || (exports.TextEdits = {}));
var EditsByEditor;
(function (EditsByEditor) {
    function is(arg) {
        return TextEdits.is(arg)
            && 'editor' in arg
            && arg.editor instanceof monaco_editor_1.MonacoEditor; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
    EditsByEditor.is = is;
})(EditsByEditor = exports.EditsByEditor || (exports.EditsByEditor = {}));
var MonacoWorkspace = /** @class */ (function () {
    function MonacoWorkspace() {
        var _this = this;
        this.capabilities = {
            applyEdit: true,
            workspaceEdit: {
                documentChanges: true
            }
        };
        this.ready = new Promise(function (resolve) {
            _this.resolveReady = resolve;
        });
        this.onDidOpenTextDocumentEmitter = new browser_4.Emitter();
        this.onDidOpenTextDocument = this.onDidOpenTextDocumentEmitter.event;
        this.onDidCloseTextDocumentEmitter = new browser_4.Emitter();
        this.onDidCloseTextDocument = this.onDidCloseTextDocumentEmitter.event;
        this.onDidChangeTextDocumentEmitter = new browser_4.Emitter();
        this.onDidChangeTextDocument = this.onDidChangeTextDocumentEmitter.event;
        this.onWillSaveTextDocumentEmitter = new browser_4.Emitter();
        this.onWillSaveTextDocument = this.onWillSaveTextDocumentEmitter.event;
        this.onDidSaveTextDocumentEmitter = new browser_4.Emitter();
        this.onDidSaveTextDocument = this.onDidSaveTextDocumentEmitter.event;
        this.onDidChangeWorkspaceFoldersEmitter = new browser_4.Emitter();
        this.onDidChangeWorkspaceFolders = this.onDidChangeWorkspaceFoldersEmitter.event;
        this._workspaceFolders = [];
        this.suppressedOpenIfDirty = [];
    }
    Object.defineProperty(MonacoWorkspace.prototype, "workspaceFolders", {
        get: function () {
            return this._workspaceFolders;
        },
        enumerable: false,
        configurable: true
    });
    MonacoWorkspace.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var roots, _a, _b, model;
            var e_1, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.workspaceService.roots];
                    case 1:
                        roots = _d.sent();
                        this.updateWorkspaceFolders(roots);
                        this.resolveReady();
                        this.workspaceService.onWorkspaceChanged(function (newRootDirs) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.updateWorkspaceFolders(newRootDirs);
                                return [2 /*return*/];
                            });
                        }); });
                        try {
                            for (_a = __values(this.textModelService.models), _b = _a.next(); !_b.done; _b = _a.next()) {
                                model = _b.value;
                                this.fireDidOpen(model);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        this.textModelService.onDidCreate(function (model) { return _this.fireDidOpen(model); });
                        return [2 /*return*/];
                }
            });
        });
    };
    MonacoWorkspace.prototype.updateWorkspaceFolders = function (newRootDirs) {
        var _this = this;
        var oldWorkspaceUris = this.workspaceFolders.map(function (folder) { return folder.uri.toString(); });
        var newWorkspaceUris = newRootDirs.map(function (folder) { return folder.uri; });
        var added = newWorkspaceUris.filter(function (uri) { return oldWorkspaceUris.indexOf(uri) < 0; }).map(function (dir, index) { return _this.toWorkspaceFolder(dir, index); });
        var removed = oldWorkspaceUris.filter(function (uri) { return newWorkspaceUris.indexOf(uri) < 0; }).map(function (dir, index) { return _this.toWorkspaceFolder(dir, index); });
        this._workspaceFolders = newWorkspaceUris.map(this.toWorkspaceFolder);
        this.onDidChangeWorkspaceFoldersEmitter.fire({ added: added, removed: removed });
    };
    MonacoWorkspace.prototype.toWorkspaceFolder = function (uriString, index) {
        var uri = vscode_uri_1.URI.parse(uriString);
        var path = uri.path;
        return {
            uri: uri,
            name: path.substring(path.lastIndexOf('/') + 1),
            index: index
        };
    };
    Object.defineProperty(MonacoWorkspace.prototype, "rootUri", {
        get: function () {
            if (this._workspaceFolders.length > 0) {
                return this._workspaceFolders[0].uri.toString();
            }
            else {
                return null;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoWorkspace.prototype, "rootPath", {
        get: function () {
            if (this._workspaceFolders.length > 0) {
                return new uri_1.default(this._workspaceFolders[0].uri).path.toString();
            }
            else {
                return null;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonacoWorkspace.prototype, "textDocuments", {
        get: function () {
            return this.textModelService.models;
        },
        enumerable: false,
        configurable: true
    });
    MonacoWorkspace.prototype.getTextDocument = function (uri) {
        return this.textModelService.get(uri);
    };
    MonacoWorkspace.prototype.fireDidOpen = function (model) {
        var _this = this;
        this.doFireDidOpen(model);
        model.textEditorModel.onDidChangeLanguage(function (e) {
            _this.problems.cleanAllMarkers(new uri_1.default(model.uri));
            model.setLanguageId(e.oldLanguage);
            try {
                _this.fireDidClose(model);
            }
            finally {
                model.setLanguageId(undefined);
            }
            _this.doFireDidOpen(model);
        });
        model.onDidChangeContent(function (event) { return _this.fireDidChangeContent(event); });
        model.onDidSaveModel(function () { return _this.fireDidSave(model); });
        model.onWillSaveModel(function (event) { return _this.fireWillSave(event); });
        model.onDirtyChanged(function () { return _this.openEditorIfDirty(model); });
        model.onDispose(function () { return _this.fireDidClose(model); });
    };
    MonacoWorkspace.prototype.doFireDidOpen = function (model) {
        this.onDidOpenTextDocumentEmitter.fire(model);
    };
    MonacoWorkspace.prototype.fireDidClose = function (model) {
        this.onDidCloseTextDocumentEmitter.fire(model);
    };
    MonacoWorkspace.prototype.fireDidChangeContent = function (event) {
        var model = event.model, contentChanges = event.contentChanges;
        this.onDidChangeTextDocumentEmitter.fire({
            textDocument: model,
            contentChanges: contentChanges
        });
    };
    MonacoWorkspace.prototype.fireWillSave = function (event) {
        var _this = this;
        var reason = event.reason;
        var timeout = new Promise(function (resolve) {
            return setTimeout(function () { return resolve([]); }, 1000);
        });
        var resolveEdits = new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var thenables, allEdits, _a, _b, listenerEdits, e_2_1;
            var e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        thenables = [];
                        allEdits = [];
                        this.onWillSaveTextDocumentEmitter.fire({
                            textDocument: event.model,
                            reason: reason,
                            waitUntil: function (thenable) {
                                thenables.push(thenable);
                            }
                        });
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        return [4 /*yield*/, Promise.all(thenables)];
                    case 2:
                        _a = __values.apply(void 0, [_d.sent()]), _b = _a.next();
                        _d.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 5];
                        listenerEdits = _b.value;
                        allEdits.push.apply(allEdits, __spread(listenerEdits));
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        resolve(allEdits);
                        return [2 /*return*/];
                }
            });
        }); });
        event.waitUntil(Promise.race([resolveEdits, timeout]).then(function (edits) {
            return _this.p2m.asTextEdits(edits).map(function (edit) { return edit; });
        }));
    };
    MonacoWorkspace.prototype.fireDidSave = function (model) {
        this.onDidSaveTextDocumentEmitter.fire(model);
    };
    MonacoWorkspace.prototype.openEditorIfDirty = function (model) {
        var _this = this;
        if (this.suppressedOpenIfDirty.indexOf(model) !== -1) {
            return;
        }
        if (model.dirty && monaco_editor_1.MonacoEditor.findByDocument(this.editorManager, model).length === 0) {
            // create a new reference to make sure the model is not disposed before it is
            // acquired by the editor, thus losing the changes that made it dirty.
            this.textModelService.createModelReference(model.textEditorModel.uri).then(function (ref) {
                _this.editorManager.open(new uri_1.default(model.uri), {
                    mode: 'open',
                }).then(function (editor) { return ref.dispose(); });
            });
        }
    };
    MonacoWorkspace.prototype.suppressOpenIfDirty = function (model, cb) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.suppressedOpenIfDirty.push(model);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, cb()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        i = this.suppressedOpenIfDirty.indexOf(model);
                        if (i !== -1) {
                            this.suppressedOpenIfDirty.splice(i, 1);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MonacoWorkspace.prototype.createFileSystemWatcher = function (globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents) {
        var disposables = new common_1.DisposableCollection();
        var onDidCreateEmitter = new lang.Emitter();
        disposables.push(onDidCreateEmitter);
        var onDidChangeEmitter = new lang.Emitter();
        disposables.push(onDidChangeEmitter);
        var onDidDeleteEmitter = new lang.Emitter();
        disposables.push(onDidDeleteEmitter);
        disposables.push(this.fileSystemWatcher.onFilesChanged(function (changes) {
            var e_3, _a;
            try {
                for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var change = changes_1_1.value;
                    var fileChangeType = change.type;
                    if (ignoreCreateEvents === true && fileChangeType === browser_1.FileChangeType.ADDED) {
                        continue;
                    }
                    if (ignoreChangeEvents === true && fileChangeType === browser_1.FileChangeType.UPDATED) {
                        continue;
                    }
                    if (ignoreDeleteEvents === true && fileChangeType === browser_1.FileChangeType.DELETED) {
                        continue;
                    }
                    var uri = change.uri.toString();
                    var codeUri = change.uri['codeUri'];
                    if (monaco_languageclient_1.testGlob(globPattern, uri)) {
                        if (fileChangeType === browser_1.FileChangeType.ADDED) {
                            onDidCreateEmitter.fire(codeUri);
                        }
                        else if (fileChangeType === browser_1.FileChangeType.UPDATED) {
                            onDidChangeEmitter.fire(codeUri);
                        }
                        else if (fileChangeType === browser_1.FileChangeType.DELETED) {
                            onDidDeleteEmitter.fire(codeUri);
                        }
                        else {
                            throw new Error("Unexpected file change type: " + fileChangeType + ".");
                        }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }));
        return {
            onDidCreate: onDidCreateEmitter.event,
            onDidChange: onDidChangeEmitter.event,
            onDidDelete: onDidDeleteEmitter.event,
            dispose: function () { return disposables.dispose(); }
        };
    };
    /**
     * Applies given edits to the given model.
     * The model is saved if no editors is opened for it.
     */
    MonacoWorkspace.prototype.applyBackgroundEdit = function (model, editOperations) {
        var _this = this;
        return this.suppressOpenIfDirty(model, function () { return __awaiter(_this, void 0, void 0, function () {
            var editor, cursorState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        editor = monaco_editor_1.MonacoEditor.findByDocument(this.editorManager, model)[0];
                        cursorState = editor && editor.getControl().getSelections() || [];
                        model.textEditorModel.pushStackElement();
                        model.textEditorModel.pushEditOperations(cursorState, editOperations, function () { return cursorState; });
                        model.textEditorModel.pushStackElement();
                        if (!!editor) return [3 /*break*/, 2];
                        return [4 /*yield*/, model.save()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    MonacoWorkspace.prototype.applyEdit = function (changes, options) {
        return __awaiter(this, void 0, void 0, function () {
            var workspaceEdit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workspaceEdit = this.p2m.asWorkspaceEdit(changes);
                        return [4 /*yield*/, this.applyBulkEdit(workspaceEdit, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MonacoWorkspace.prototype.applyBulkEdit = function (workspaceEdit, options) {
        return __awaiter(this, void 0, void 0, function () {
            var unresolvedEdits, edits, totalEdits, totalFiles, _loop_1, this_1, edits_1, edits_1_1, edit, e_4_1, ariaSummary, e_5, ariaSummary;
            var e_4, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        unresolvedEdits = this.groupEdits(workspaceEdit);
                        return [4 /*yield*/, this.openEditors(unresolvedEdits, options)];
                    case 1:
                        edits = _b.sent();
                        this.checkVersions(edits);
                        totalEdits = 0;
                        totalFiles = 0;
                        _loop_1 = function (edit) {
                            var editor, model, currentSelections_1, editOperations;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!TextEdits.is(edit)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_1.toTextEditWithEditor(edit)];
                                    case 1:
                                        editor = (_a.sent()).editor;
                                        model = editor.document.textEditorModel;
                                        currentSelections_1 = editor.getControl().getSelections() || [];
                                        editOperations = edit.textEdits.map(function (e) { return ({
                                            identifier: undefined,
                                            forceMoveMarkers: false,
                                            range: new monaco.Range(e.range.startLineNumber, e.range.startColumn, e.range.endLineNumber, e.range.endColumn),
                                            text: e.text
                                        }); });
                                        // start a fresh operation
                                        model.pushStackElement();
                                        model.pushEditOperations(currentSelections_1, editOperations, function (_) { return currentSelections_1; });
                                        // push again to make this change an undoable operation
                                        model.pushStackElement();
                                        totalFiles += 1;
                                        totalEdits += editOperations.length;
                                        return [3 /*break*/, 5];
                                    case 2:
                                        if (!(CreateResourceEdit.is(edit) || DeleteResourceEdit.is(edit) || RenameResourceEdit.is(edit))) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this_1.performResourceEdit(edit)];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 4: throw new Error("Unexpected edit type: " + JSON.stringify(edit));
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        edits_1 = __values(edits), edits_1_1 = edits_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!edits_1_1.done) return [3 /*break*/, 6];
                        edit = edits_1_1.value;
                        return [5 /*yield**/, _loop_1(edit)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        edits_1_1 = edits_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (edits_1_1 && !edits_1_1.done && (_a = edits_1.return)) _a.call(edits_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        ariaSummary = this.getAriaSummary(totalEdits, totalFiles);
                        return [2 /*return*/, { ariaSummary: ariaSummary }];
                    case 10:
                        e_5 = _b.sent();
                        ariaSummary = "Error applying workspace edits: " + e_5.toString();
                        console.error(ariaSummary);
                        return [2 /*return*/, { ariaSummary: ariaSummary }];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    MonacoWorkspace.prototype.openEditors = function (edits, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, edits_2, edits_2_1, edit, _a, _b, e_6_1;
            var e_6, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 7, 8, 9]);
                        edits_2 = __values(edits), edits_2_1 = edits_2.next();
                        _d.label = 2;
                    case 2:
                        if (!!edits_2_1.done) return [3 /*break*/, 6];
                        edit = edits_2_1.value;
                        if (!(TextEdits.is(edit) && TextEdits.isVersioned(edit) && !EditsByEditor.is(edit))) return [3 /*break*/, 4];
                        _b = (_a = result).push;
                        return [4 /*yield*/, this.toTextEditWithEditor(edit, options)];
                    case 3:
                        _b.apply(_a, [_d.sent()]);
                        return [3 /*break*/, 5];
                    case 4:
                        result.push(edit);
                        _d.label = 5;
                    case 5:
                        edits_2_1 = edits_2.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_6_1 = _d.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (edits_2_1 && !edits_2_1.done && (_c = edits_2.return)) _c.call(edits_2);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, result];
                }
            });
        });
    };
    MonacoWorkspace.prototype.toTextEditWithEditor = function (textEdit, options) {
        return __awaiter(this, void 0, void 0, function () {
            var editorWidget, editor, textEditWithEditor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (EditsByEditor.is(textEdit)) {
                            return [2 /*return*/, textEdit];
                        }
                        return [4 /*yield*/, this.editorManager.open(new uri_1.default(textEdit.uri), options)];
                    case 1:
                        editorWidget = _a.sent();
                        editor = monaco_editor_1.MonacoEditor.get(editorWidget);
                        if (!editor) {
                            throw Error("Could not open editor. URI: " + textEdit.uri);
                        }
                        textEditWithEditor = __assign(__assign({}, textEdit), { editor: editor });
                        return [2 /*return*/, textEditWithEditor];
                }
            });
        });
    };
    MonacoWorkspace.prototype.checkVersions = function (edits) {
        var e_7, _a;
        try {
            for (var _b = __values(edits.filter(TextEdits.is).filter(TextEdits.isVersioned)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var textEdit = _c.value;
                if (!EditsByEditor.is(textEdit)) {
                    throw Error("Could not open editor for URI: " + textEdit.uri + ".");
                }
                var model = textEdit.editor.document.textEditorModel;
                if (textEdit.version !== undefined && model.getVersionId() !== textEdit.version) {
                    throw Error("Version conflict in editor. URI: " + textEdit.uri);
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
    };
    MonacoWorkspace.prototype.getAriaSummary = function (totalEdits, totalFiles) {
        if (totalEdits === 0) {
            return 'Made no edits';
        }
        if (totalEdits > 1 && totalFiles > 1) {
            return "Made " + totalEdits + " text edits in " + totalFiles + " files";
        }
        return "Made " + totalEdits + " text edits in one file";
    };
    MonacoWorkspace.prototype.groupEdits = function (workspaceEdit) {
        var e_8, _a, _b;
        var map = new Map();
        var result = [];
        try {
            for (var _c = __values(workspaceEdit.edits), _d = _c.next(); !_d.done; _d = _c.next()) {
                var edit = _d.value;
                if (this.isResourceFileEdit(edit)) {
                    var resourceTextEdit = edit;
                    var uri = resourceTextEdit.resource.toString();
                    var version = resourceTextEdit.modelVersionId;
                    var editorEdit = map.get(uri);
                    if (!editorEdit) {
                        editorEdit = {
                            uri: uri,
                            version: version,
                            textEdits: []
                        };
                        map.set(uri, editorEdit);
                        result.push(editorEdit);
                    }
                    else {
                        if (editorEdit.version !== version) {
                            throw Error("Multiple versions for the same URI '" + uri + "' within the same workspace edit.");
                        }
                    }
                    (_b = editorEdit.textEdits).push.apply(_b, __spread(resourceTextEdit.edits));
                }
                else {
                    var options = edit.options;
                    var oldUri = !!edit.oldUri ? edit.oldUri.toString() : undefined;
                    var newUri = !!edit.newUri ? edit.newUri.toString() : undefined;
                    result.push({
                        oldUri: oldUri,
                        newUri: newUri,
                        options: options
                    });
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return result;
    };
    MonacoWorkspace.prototype.performResourceEdit = function (edit) {
        return __awaiter(this, void 0, void 0, function () {
            var options, _a, _b, exists, stat;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        options = edit.options || {};
                        if (!RenameResourceEdit.is(edit)) return [3 /*break*/, 4];
                        _a = options.overwrite === undefined && options.ignoreIfExists;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fileSystem.exists(edit.newUri)];
                    case 1:
                        _a = (_c.sent());
                        _c.label = 2;
                    case 2:
                        // rename
                        if (_a) {
                            return [2 /*return*/]; // not overwriting, but ignoring, and the target file exists
                        }
                        return [4 /*yield*/, this.fileSystem.move(edit.oldUri, edit.newUri, { overwrite: options.overwrite })];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 15];
                    case 4:
                        if (!DeleteResourceEdit.is(edit)) return [3 /*break*/, 9];
                        _b = !options.ignoreIfNotExists;
                        if (_b) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.fileSystem.exists(edit.oldUri)];
                    case 5:
                        _b = (_c.sent());
                        _c.label = 6;
                    case 6:
                        if (!_b) return [3 /*break*/, 8];
                        if (options.recursive === false) {
                            console.warn("Ignored 'recursive': 'false' option. Deleting recursively.");
                        }
                        return [4 /*yield*/, this.fileSystem.delete(edit.oldUri)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        if (!CreateResourceEdit.is(edit)) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.fileSystem.exists(edit.newUri)];
                    case 10:
                        exists = _c.sent();
                        // create file
                        if (options.overwrite === undefined && options.ignoreIfExists && exists) {
                            return [2 /*return*/]; // not overwriting, but ignoring, and the target file exists
                        }
                        if (!(exists && options.overwrite)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.fileSystem.getFileStat(edit.newUri)];
                    case 11:
                        stat = _c.sent();
                        if (!stat) {
                            throw new Error("Cannot get file stat for the resource: " + edit.newUri + ".");
                        }
                        return [4 /*yield*/, this.fileSystem.setContent(stat, '')];
                    case 12:
                        _c.sent();
                        return [3 /*break*/, 15];
                    case 13: return [4 /*yield*/, this.fileSystem.createFile(edit.newUri)];
                    case 14:
                        _c.sent();
                        _c.label = 15;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    MonacoWorkspace.prototype.isResourceFileEdit = function (edit) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return 'resource' in edit && edit.resource instanceof monaco.Uri;
    };
    __decorate([
        inversify_1.inject(common_2.FileSystem),
        __metadata("design:type", Object)
    ], MonacoWorkspace.prototype, "fileSystem", void 0);
    __decorate([
        inversify_1.inject(browser_2.WorkspaceService),
        __metadata("design:type", browser_2.WorkspaceService)
    ], MonacoWorkspace.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(browser_1.FileSystemWatcher),
        __metadata("design:type", browser_1.FileSystemWatcher)
    ], MonacoWorkspace.prototype, "fileSystemWatcher", void 0);
    __decorate([
        inversify_1.inject(monaco_text_model_service_1.MonacoTextModelService),
        __metadata("design:type", monaco_text_model_service_1.MonacoTextModelService)
    ], MonacoWorkspace.prototype, "textModelService", void 0);
    __decorate([
        inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter),
        __metadata("design:type", monaco_languageclient_1.MonacoToProtocolConverter)
    ], MonacoWorkspace.prototype, "m2p", void 0);
    __decorate([
        inversify_1.inject(monaco_languageclient_1.ProtocolToMonacoConverter),
        __metadata("design:type", monaco_languageclient_1.ProtocolToMonacoConverter)
    ], MonacoWorkspace.prototype, "p2m", void 0);
    __decorate([
        inversify_1.inject(browser_3.EditorManager),
        __metadata("design:type", browser_3.EditorManager)
    ], MonacoWorkspace.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(monaco_configurations_1.MonacoConfigurations),
        __metadata("design:type", monaco_configurations_1.MonacoConfigurations)
    ], MonacoWorkspace.prototype, "configurations", void 0);
    __decorate([
        inversify_1.inject(browser_5.ProblemManager),
        __metadata("design:type", browser_5.ProblemManager)
    ], MonacoWorkspace.prototype, "problems", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], MonacoWorkspace.prototype, "init", null);
    MonacoWorkspace = __decorate([
        inversify_1.injectable()
    ], MonacoWorkspace);
    return MonacoWorkspace;
}());
exports.MonacoWorkspace = MonacoWorkspace;


/***/ })

}]);
//# sourceMappingURL=15.bundle.js.map