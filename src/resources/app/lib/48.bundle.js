(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[48],{

/***/ "./node_modules/arduino-ide-extension/lib/browser/arduino-daemon-client-impl.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/arduino-daemon-client-impl.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArduinoDaemonClientImpl = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var logger_1 = __webpack_require__(/*! @theia/core/lib/common/logger */ "./node_modules/@theia/core/lib/common/logger.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var message_service_1 = __webpack_require__(/*! @theia/core/lib/common/message-service */ "./node_modules/@theia/core/lib/common/message-service.js");
var ArduinoDaemonClientImpl = /** @class */ (function () {
    function ArduinoDaemonClientImpl() {
        this.onStartedEmitter = new event_1.Emitter();
        this.onStoppedEmitter = new event_1.Emitter();
        this._isRunning = false;
    }
    ArduinoDaemonClientImpl.prototype.notifyStopped = function () {
        if (this._isRunning) {
            this._isRunning = false;
            this.onStoppedEmitter.fire();
            this.info('The CLI daemon process has stopped.');
        }
    };
    ArduinoDaemonClientImpl.prototype.notifyStarted = function () {
        if (!this._isRunning) {
            this._isRunning = true;
            this.onStartedEmitter.fire();
            this.info('The CLI daemon process has started.');
        }
    };
    Object.defineProperty(ArduinoDaemonClientImpl.prototype, "onDaemonStarted", {
        get: function () {
            return this.onStartedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArduinoDaemonClientImpl.prototype, "onDaemonStopped", {
        get: function () {
            return this.onStoppedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArduinoDaemonClientImpl.prototype, "isRunning", {
        get: function () {
            return this._isRunning;
        },
        enumerable: false,
        configurable: true
    });
    ArduinoDaemonClientImpl.prototype.info = function (message) {
        this.messageService.info(message, { timeout: 3000 });
        this.logger.info(message);
    };
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], ArduinoDaemonClientImpl.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], ArduinoDaemonClientImpl.prototype, "messageService", void 0);
    ArduinoDaemonClientImpl = __decorate([
        inversify_1.injectable()
    ], ArduinoDaemonClientImpl);
    return ArduinoDaemonClientImpl;
}());
exports.ArduinoDaemonClientImpl = ArduinoDaemonClientImpl;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-list-widget.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/boards/boards-list-widget.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsListWidget = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var boards_service_1 = __webpack_require__(/*! ../../common/protocol/boards-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js");
var list_widget_1 = __webpack_require__(/*! ../widgets/component-list/list-widget */ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-widget.js");
var list_item_renderer_1 = __webpack_require__(/*! ../widgets/component-list/list-item-renderer */ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-item-renderer.js");
var BoardsListWidget = /** @class */ (function (_super) {
    __extends(BoardsListWidget, _super);
    function BoardsListWidget(service, itemRenderer) {
        var _this = _super.call(this, {
            id: BoardsListWidget_1.WIDGET_ID,
            label: BoardsListWidget_1.WIDGET_LABEL,
            iconClass: 'fa fa-microchip',
            searchable: service,
            installable: service,
            itemLabel: function (item) { return item.name; },
            itemRenderer: itemRenderer
        }) || this;
        _this.service = service;
        _this.itemRenderer = itemRenderer;
        return _this;
    }
    BoardsListWidget_1 = BoardsListWidget;
    var BoardsListWidget_1;
    BoardsListWidget.WIDGET_ID = 'boards-list-widget';
    BoardsListWidget.WIDGET_LABEL = 'Boards Manager';
    BoardsListWidget = BoardsListWidget_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(boards_service_1.BoardsService)),
        __param(1, inversify_1.inject(list_item_renderer_1.ListItemRenderer)),
        __metadata("design:paramtypes", [Object, list_item_renderer_1.ListItemRenderer])
    ], BoardsListWidget);
    return BoardsListWidget;
}(list_widget_1.ListWidget));
exports.BoardsListWidget = BoardsListWidget;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/editor-mode.js":
/*!***********************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/editor-mode.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
exports.EditorMode = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/editor/lib/browser */ "./node_modules/@theia/editor/lib/browser/index.js");
var output_widget_1 = __webpack_require__(/*! @theia/output/lib/browser/output-widget */ "./node_modules/@theia/output/lib/browser/output-widget.js");
var main_menu_manager_1 = __webpack_require__(/*! ../common/main-menu-manager */ "./node_modules/arduino-ide-extension/lib/common/main-menu-manager.js");
var boards_list_widget_1 = __webpack_require__(/*! ./boards/boards-list-widget */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-list-widget.js");
var library_list_widget_1 = __webpack_require__(/*! ./library/library-list-widget */ "./node_modules/arduino-ide-extension/lib/browser/library/library-list-widget.js");
var EditorMode = /** @class */ (function () {
    function EditorMode() {
    }
    EditorMode_1 = EditorMode;
    EditorMode.prototype.onStart = function (app) {
        this.app = app;
        if (this.proMode) {
            // We use this CSS class on the body to modify the visibility of the close button for the editors and views.
            document.body.classList.add(EditorMode_1.PRO_MODE_KEY);
        }
    };
    Object.defineProperty(EditorMode.prototype, "proMode", {
        get: function () {
            var value = window.localStorage.getItem(EditorMode_1.PRO_MODE_KEY);
            return value === 'true';
        },
        enumerable: false,
        configurable: true
    });
    EditorMode.prototype.toggleProMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldState, inAdvancedMode, shell, _a, _b, area, layoutRestorer;
            var e_1, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        oldState = this.proMode;
                        inAdvancedMode = !oldState;
                        window.localStorage.setItem(EditorMode_1.PRO_MODE_KEY, String(inAdvancedMode));
                        if (!inAdvancedMode) {
                            shell = this.app.shell;
                            try {
                                // Close all widgets that are neither editor nor `Output` / `Boards Manager` / `Library Manager`.
                                for (_a = __values(['left', 'right', 'bottom', 'main']), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    area = _b.value;
                                    shell.closeTabs(area, function (title) { return !_this.isInSimpleMode(title.owner); });
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        layoutRestorer = this.app.layoutRestorer;
                        return [4 /*yield*/, layoutRestorer.storeLayoutAsync(this.app)];
                    case 1:
                        _d.sent();
                        window.location.reload(true);
                        return [2 /*return*/];
                }
            });
        });
    };
    EditorMode.prototype.isInSimpleMode = function (widget) {
        return widget instanceof browser_1.EditorWidget
            || widget instanceof output_widget_1.OutputWidget
            || widget instanceof boards_list_widget_1.BoardsListWidget
            || widget instanceof library_list_widget_1.LibraryListWidget;
    };
    Object.defineProperty(EditorMode.prototype, "compileForDebug", {
        get: function () {
            var value = window.localStorage.getItem(EditorMode_1.COMPILE_FOR_DEBUG_KEY);
            return value === 'true';
        },
        enumerable: false,
        configurable: true
    });
    EditorMode.prototype.toggleCompileForDebug = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldState, newState;
            return __generator(this, function (_a) {
                oldState = this.compileForDebug;
                newState = !oldState;
                window.localStorage.setItem(EditorMode_1.COMPILE_FOR_DEBUG_KEY, String(newState));
                this.mainMenuManager.update();
                return [2 /*return*/];
            });
        });
    };
    var EditorMode_1;
    __decorate([
        inversify_1.inject(main_menu_manager_1.MainMenuManager),
        __metadata("design:type", Object)
    ], EditorMode.prototype, "mainMenuManager", void 0);
    EditorMode = EditorMode_1 = __decorate([
        inversify_1.injectable()
    ], EditorMode);
    return EditorMode;
}());
exports.EditorMode = EditorMode;
(function (EditorMode) {
    EditorMode.PRO_MODE_KEY = 'arduino-advanced-mode';
    EditorMode.COMPILE_FOR_DEBUG_KEY = 'arduino-compile-for-debug';
})(EditorMode = exports.EditorMode || (exports.EditorMode = {}));
exports.EditorMode = EditorMode;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/library/library-list-widget.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/library/library-list-widget.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryListWidget = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var library_service_1 = __webpack_require__(/*! ../../common/protocol/library-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/library-service.js");
var list_widget_1 = __webpack_require__(/*! ../widgets/component-list/list-widget */ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-widget.js");
var list_item_renderer_1 = __webpack_require__(/*! ../widgets/component-list/list-item-renderer */ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-item-renderer.js");
var LibraryListWidget = /** @class */ (function (_super) {
    __extends(LibraryListWidget, _super);
    function LibraryListWidget(service, itemRenderer) {
        var _this = _super.call(this, {
            id: LibraryListWidget_1.WIDGET_ID,
            label: LibraryListWidget_1.WIDGET_LABEL,
            iconClass: 'library-tab-icon',
            searchable: service,
            installable: service,
            itemLabel: function (item) { return item.name; },
            itemRenderer: itemRenderer
        }) || this;
        _this.service = service;
        _this.itemRenderer = itemRenderer;
        return _this;
    }
    LibraryListWidget_1 = LibraryListWidget;
    var LibraryListWidget_1;
    LibraryListWidget.WIDGET_ID = 'library-list-widget';
    LibraryListWidget.WIDGET_LABEL = 'Library Manager';
    LibraryListWidget = LibraryListWidget_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(library_service_1.LibraryService)),
        __param(1, inversify_1.inject(list_item_renderer_1.ListItemRenderer)),
        __metadata("design:paramtypes", [Object, list_item_renderer_1.ListItemRenderer])
    ], LibraryListWidget);
    return LibraryListWidget;
}(list_widget_1.ListWidget));
exports.LibraryListWidget = LibraryListWidget;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.ArduinoToolbar = exports.ArduinoToolbarComponent = exports.ARDUINO_TOOLBAR_ITEM_CLASS = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var tab_bar_toolbar_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/tab-bar-toolbar */ "./node_modules/@theia/core/lib/browser/shell/tab-bar-toolbar.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var label_parser_1 = __webpack_require__(/*! @theia/core/lib/browser/label-parser */ "./node_modules/@theia/core/lib/browser/label-parser.js");
exports.ARDUINO_TOOLBAR_ITEM_CLASS = 'arduino-tool-item';
var ArduinoToolbarComponent = /** @class */ (function (_super) {
    __extends(ArduinoToolbarComponent, _super);
    function ArduinoToolbarComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.renderItem = function (item) {
            var e_1, _a;
            var innerText = '';
            var className = "arduino-tool-icon " + item.id + "-icon";
            if (item.text) {
                try {
                    for (var _b = __values(_this.props.labelParser.parse(item.text)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var labelPart = _c.value;
                        if (typeof labelPart !== 'string' && label_parser_1.LabelIcon.is(labelPart)) {
                            className += " fa fa-" + labelPart.name;
                        }
                        else {
                            innerText = labelPart;
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
            }
            var command = _this.props.commands.getCommand(item.command);
            var cls = exports.ARDUINO_TOOLBAR_ITEM_CLASS + " " + tab_bar_toolbar_1.TabBarToolbar.Styles.TAB_BAR_TOOLBAR_ITEM + " " + (command && _this.props.commandIsEnabled(command.id) ? 'enabled' : '');
            return React.createElement("div", { key: item.id, className: cls },
                React.createElement("div", { className: item.id },
                    React.createElement("div", { key: item.id + '-icon', id: item.id, className: className, onClick: _this.props.executeCommand, onMouseOver: function () { return _this.setState({ tooltip: item.tooltip || '' }); }, onMouseOut: function () { return _this.setState({ tooltip: '' }); }, title: item.tooltip }, innerText)));
        };
        _this.state = { tooltip: '' };
        return _this;
    }
    ArduinoToolbarComponent.prototype.render = function () {
        var _this = this;
        var tooltip = React.createElement("div", { key: 'arduino-toolbar-tooltip', className: 'arduino-toolbar-tooltip' }, this.state.tooltip);
        var items = [
            React.createElement(React.Fragment, { key: this.props.side + '-arduino-toolbar-tooltip' }, __spread(this.props.items).map(function (item) { return tab_bar_toolbar_1.TabBarToolbarItem.is(item) ? _this.renderItem(item) : item.render(); }))
        ];
        if (this.props.side === 'left') {
            items.unshift(tooltip);
        }
        else {
            items.push(tooltip);
        }
        return items;
    };
    return ArduinoToolbarComponent;
}(React.Component));
exports.ArduinoToolbarComponent = ArduinoToolbarComponent;
var ArduinoToolbar = /** @class */ (function (_super) {
    __extends(ArduinoToolbar, _super);
    function ArduinoToolbar(tabBarToolbarRegistry, commands, labelParser, side) {
        var _this = _super.call(this) || this;
        _this.tabBarToolbarRegistry = tabBarToolbarRegistry;
        _this.commands = commands;
        _this.labelParser = labelParser;
        _this.side = side;
        _this.items = new Map();
        _this.doCommandIsEnabled = function (id) { return _this.commandIsEnabled(id); };
        _this.executeCommand = function (e) {
            var item = _this.items.get(e.currentTarget.id);
            if (tab_bar_toolbar_1.TabBarToolbarItem.is(item)) {
                _this.commands.executeCommand(item.command, _this, e.target);
            }
        };
        _this.id = side + '-arduino-toolbar';
        _this.addClass(tab_bar_toolbar_1.TabBarToolbar.Styles.TAB_BAR_TOOLBAR);
        _this.init();
        _this.tabBarToolbarRegistry.onDidChange(function () { return _this.updateToolbar(); });
        return _this;
    }
    ArduinoToolbar.prototype.updateItems = function (items) {
        var e_2, _a;
        this.items.clear();
        var revItems = items.sort(tab_bar_toolbar_1.TabBarToolbarItem.PRIORITY_COMPARATOR).reverse();
        try {
            for (var revItems_1 = __values(revItems), revItems_1_1 = revItems_1.next(); !revItems_1_1.done; revItems_1_1 = revItems_1.next()) {
                var item = revItems_1_1.value;
                this.items.set(item.id, item);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (revItems_1_1 && !revItems_1_1.done && (_a = revItems_1.return)) _a.call(revItems_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.update();
    };
    ArduinoToolbar.prototype.updateToolbar = function () {
        var items = this ? this.tabBarToolbarRegistry.visibleItems(this) : [];
        this.updateItems(items);
    };
    ArduinoToolbar.prototype.init = function () {
        this.node.classList.add('theia-arduino-toolbar', this.side);
        this.update();
    };
    ArduinoToolbar.prototype.commandIsEnabled = function (command) {
        return this.commands.isEnabled(command, this);
    };
    ArduinoToolbar.prototype.render = function () {
        return React.createElement(ArduinoToolbarComponent, { key: 'arduino-toolbar-component', side: this.side, labelParser: this.labelParser, items: __spread(this.items.values()), commands: this.commands, commandIsEnabled: this.doCommandIsEnabled, executeCommand: this.executeCommand });
    };
    return ArduinoToolbar;
}(browser_1.ReactWidget));
exports.ArduinoToolbar = ArduinoToolbar;
(function (ArduinoToolbar) {
    function is(maybeToolbarWidget) {
        return maybeToolbarWidget instanceof ArduinoToolbar;
    }
    ArduinoToolbar.is = is;
})(ArduinoToolbar = exports.ArduinoToolbar || (exports.ArduinoToolbar = {}));
exports.ArduinoToolbar = ArduinoToolbar;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/component-list-item.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/component-list-item.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.ComponentListItem = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ComponentListItem = /** @class */ (function (_super) {
    __extends(ComponentListItem, _super);
    function ComponentListItem(props) {
        var _this = _super.call(this, props) || this;
        if (props.item.installable) {
            var version = props.item.availableVersions.filter(function (version) { return version !== props.item.installedVersion; })[0];
            _this.state = {
                selectedVersion: version
            };
        }
        return _this;
    }
    ComponentListItem.prototype.install = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var toInstall, version, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        toInstall = this.state.selectedVersion;
                        version = this.props.item.availableVersions.filter(function (version) { return version !== _this.state.selectedVersion; })[0];
                        this.setState({
                            selectedVersion: version
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.props.install(item, toInstall)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        this.setState({
                            selectedVersion: toInstall
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ComponentListItem.prototype.uninstall = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.uninstall(item)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentListItem.prototype.onVersionChange = function (version) {
        this.setState({ selectedVersion: version });
    };
    ComponentListItem.prototype.render = function () {
        var _a = this.props, item = _a.item, itemRenderer = _a.itemRenderer;
        return itemRenderer.renderItem(Object.assign(this.state, { item: item }), this.install.bind(this), this.uninstall.bind(this), this.onVersionChange.bind(this));
    };
    return ComponentListItem;
}(React.Component));
exports.ComponentListItem = ComponentListItem;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/component-list.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/component-list.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentList = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var component_list_item_1 = __webpack_require__(/*! ./component-list-item */ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/component-list-item.js");
var ComponentList = /** @class */ (function (_super) {
    __extends(ComponentList, _super);
    function ComponentList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setRef = function (element) {
            _this.container = element || undefined;
        };
        return _this;
    }
    ComponentList.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { className: 'items-container', ref: this.setRef }, this.props.items.map(function (item) { return _this.createItem(item); }));
    };
    ComponentList.prototype.componentDidMount = function () {
        if (this.container && this.props.resolveContainer) {
            this.props.resolveContainer(this.container);
        }
    };
    ComponentList.prototype.createItem = function (item) {
        return React.createElement(component_list_item_1.ComponentListItem, { key: this.props.itemLabel(item), item: item, itemRenderer: this.props.itemRenderer, install: this.props.install, uninstall: this.props.uninstall });
    };
    return ComponentList;
}(React.Component));
exports.ComponentList = ComponentList;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/filterable-list-container.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/filterable-list-container.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.FilterableListContainer = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var debounce = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
var dialogs_1 = __webpack_require__(/*! @theia/core/lib/browser/dialogs */ "./node_modules/@theia/core/lib/browser/dialogs.js");
var progress_dialog_1 = __webpack_require__(/*! ../progress-dialog */ "./node_modules/arduino-ide-extension/lib/browser/widgets/progress-dialog.js");
var search_bar_1 = __webpack_require__(/*! ./search-bar */ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/search-bar.js");
var component_list_1 = __webpack_require__(/*! ./component-list */ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/component-list.js");
var FilterableListContainer = /** @class */ (function (_super) {
    __extends(FilterableListContainer, _super);
    function FilterableListContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleFilterTextChange = function (filterText) {
            if (filterText === void 0) { filterText = _this.state.filterText; }
            _this.setState({ filterText: filterText });
            _this.search(filterText);
        };
        _this.state = {
            filterText: '',
            items: []
        };
        return _this;
    }
    FilterableListContainer.prototype.componentDidMount = function () {
        this.search = debounce(this.search, 500);
        this.handleFilterTextChange('');
        this.props.filterTextChangeEvent(this.handleFilterTextChange.bind(this));
    };
    FilterableListContainer.prototype.componentDidUpdate = function () {
        // See: arduino/arduino-pro-ide#101
        // Resets the top of the perfect scroll-bar's thumb.
        this.props.container.updateScrollBar();
    };
    FilterableListContainer.prototype.render = function () {
        return React.createElement("div", { className: 'filterable-list-container' },
            this.renderSearchFilter(),
            this.renderSearchBar(),
            this.renderComponentList());
    };
    FilterableListContainer.prototype.renderSearchFilter = function () {
        return undefined;
    };
    FilterableListContainer.prototype.renderSearchBar = function () {
        return React.createElement(search_bar_1.SearchBar, { resolveFocus: this.props.resolveFocus, filterText: this.state.filterText, onFilterTextChanged: this.handleFilterTextChange });
    };
    FilterableListContainer.prototype.renderComponentList = function () {
        var _a = this.props, itemLabel = _a.itemLabel, resolveContainer = _a.resolveContainer, itemRenderer = _a.itemRenderer;
        return React.createElement(component_list_1.ComponentList, { items: this.state.items, itemLabel: itemLabel, itemRenderer: itemRenderer, install: this.install.bind(this), uninstall: this.uninstall.bind(this), resolveContainer: resolveContainer });
    };
    FilterableListContainer.prototype.search = function (query) {
        var _this = this;
        var searchable = this.props.searchable;
        searchable.search({ query: query.trim() }).then(function (items) { return _this.setState({ items: _this.sort(items) }); });
    };
    FilterableListContainer.prototype.sort = function (items) {
        var itemLabel = this.props.itemLabel;
        return items.sort(function (left, right) { return itemLabel(left).localeCompare(itemLabel(right)); });
    };
    FilterableListContainer.prototype.install = function (item, version) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, installable, searchable, itemLabel, dialog, items;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, installable = _a.installable, searchable = _a.searchable, itemLabel = _a.itemLabel;
                        dialog = new progress_dialog_1.InstallationProgressDialog(itemLabel(item), version);
                        dialog.open();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 4, 5]);
                        return [4 /*yield*/, installable.install({ item: item, version: version })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, searchable.search({ query: this.state.filterText })];
                    case 3:
                        items = _b.sent();
                        this.setState({ items: this.sort(items) });
                        return [3 /*break*/, 5];
                    case 4:
                        dialog.close();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FilterableListContainer.prototype.uninstall = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var uninstall, _a, installable, searchable, itemLabel, dialog, items;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new dialogs_1.ConfirmDialog({
                            title: 'Uninstall',
                            msg: "Do you want to uninstall " + item.name + "?",
                            ok: 'Yes',
                            cancel: 'No'
                        }).open()];
                    case 1:
                        uninstall = _b.sent();
                        if (!uninstall) {
                            return [2 /*return*/];
                        }
                        _a = this.props, installable = _a.installable, searchable = _a.searchable, itemLabel = _a.itemLabel;
                        dialog = new progress_dialog_1.UninstallationProgressDialog(itemLabel(item));
                        dialog.open();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, , 5, 6]);
                        return [4 /*yield*/, installable.uninstall({ item: item })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, searchable.search({ query: this.state.filterText })];
                    case 4:
                        items = _b.sent();
                        this.setState({ items: this.sort(items) });
                        return [3 /*break*/, 6];
                    case 5:
                        dialog.close();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return FilterableListContainer;
}(React.Component));
exports.FilterableListContainer = FilterableListContainer;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-item-renderer.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-item-renderer.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemRenderer = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var window_service_1 = __webpack_require__(/*! @theia/core/lib/browser/window/window-service */ "./node_modules/@theia/core/lib/browser/window/window-service.js");
var ListItemRenderer = /** @class */ (function () {
    function ListItemRenderer() {
        var _this = this;
        this.onMoreInfoClick = function (event) {
            var target = event.nativeEvent.target;
            if (target instanceof HTMLAnchorElement) {
                _this.windowService.openNewWindow(target.href, { external: true });
                event.nativeEvent.preventDefault();
            }
        };
    }
    ListItemRenderer.prototype.renderItem = function (input, install, uninstall, onVersionChange) {
        var item = input.item;
        var nameAndAuthor;
        if (item.name && item.author) {
            var name_1 = React.createElement("span", { className: 'name' }, item.name);
            var author = React.createElement("span", { className: 'author' }, item.author);
            nameAndAuthor = React.createElement("span", null,
                name_1,
                " by ",
                author);
        }
        else if (item.name) {
            nameAndAuthor = React.createElement("span", { className: 'name' }, item.name);
        }
        else if (item.id) {
            nameAndAuthor = React.createElement("span", { className: 'name' }, item.id);
        }
        else {
            nameAndAuthor = React.createElement("span", { className: 'name' }, "Unknown");
        }
        var onClickUninstall = function () { return uninstall(item); };
        var installedVersion = !!item.installedVersion && React.createElement("div", { className: 'version-info' },
            React.createElement("span", { className: 'version' },
                "Version ",
                item.installedVersion),
            React.createElement("span", { className: 'installed', onClick: onClickUninstall }));
        var summary = React.createElement("div", { className: 'summary' }, item.summary);
        var description = React.createElement("div", { className: 'summary' }, item.description);
        var moreInfo = !!item.moreInfoLink && React.createElement("a", { href: item.moreInfoLink, onClick: this.onMoreInfoClick }, "More info");
        var onClickInstall = function () { return install(item); };
        var installButton = item.installable &&
            React.createElement("button", { className: 'theia-button install', onClick: onClickInstall }, "INSTALL");
        var onSelectChange = function (event) {
            var version = event.target.value;
            if (version) {
                onVersionChange(version);
            }
        };
        var versions = (function () {
            var availableVersions = item.availableVersions;
            if (availableVersions.length === 0) {
                return undefined;
            }
            else if (availableVersions.length === 1) {
                return React.createElement("label", null, availableVersions[0]);
            }
            else {
                return React.createElement("select", { className: 'theia-select', value: input.selectedVersion, onChange: onSelectChange }, item.availableVersions
                    .filter(function (version) { return version !== item.installedVersion; }) // Filter the version that is currently installed.
                    .map(function (version) { return React.createElement("option", { value: version, key: version }, version); }));
            }
        })();
        return React.createElement("div", { className: 'component-list-item noselect' },
            React.createElement("div", { className: 'header' },
                nameAndAuthor,
                installedVersion),
            React.createElement("div", { className: 'content' },
                summary,
                description),
            React.createElement("div", { className: 'info' }, moreInfo),
            React.createElement("div", { className: 'footer' },
                installButton,
                versions));
    };
    __decorate([
        inversify_1.inject(window_service_1.WindowService),
        __metadata("design:type", Object)
    ], ListItemRenderer.prototype, "windowService", void 0);
    ListItemRenderer = __decorate([
        inversify_1.injectable()
    ], ListItemRenderer);
    return ListItemRenderer;
}());
exports.ListItemRenderer = ListItemRenderer;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-widget.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-widget.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.ListWidget = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var promise_util_1 = __webpack_require__(/*! @theia/core/lib/common/promise-util */ "./node_modules/@theia/core/lib/common/promise-util.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var react_widget_1 = __webpack_require__(/*! @theia/core/lib/browser/widgets/react-widget */ "./node_modules/@theia/core/lib/browser/widgets/react-widget.js");
var filterable_list_container_1 = __webpack_require__(/*! ./filterable-list-container */ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/filterable-list-container.js");
var core_service_client_impl_1 = __webpack_require__(/*! ../../core-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/core-service-client-impl.js");
var arduino_daemon_client_impl_1 = __webpack_require__(/*! ../../arduino-daemon-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/arduino-daemon-client-impl.js");
var ListWidget = /** @class */ (function (_super) {
    __extends(ListWidget, _super);
    function ListWidget(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.deferredContainer = new promise_util_1.Deferred();
        _this.filterTextChangeEmitter = new event_1.Emitter();
        _this.onFocusResolved = function (element) {
            _this.focusNode = element;
        };
        var id = options.id, label = options.label, iconClass = options.iconClass;
        _this.id = id;
        _this.title.label = label;
        _this.title.caption = label;
        _this.title.iconClass = iconClass;
        _this.title.closable = true;
        _this.addClass('arduino-list-widget');
        _this.node.tabIndex = 0; // To be able to set the focus on the widget.
        _this.scrollOptions = {
            suppressScrollX: true
        };
        _this.toDispose.push(_this.filterTextChangeEmitter);
        return _this;
    }
    ListWidget.prototype.init = function () {
        var _this = this;
        this.update();
        this.toDispose.pushAll([
            this.coreServiceClient.onIndexUpdated(function () { return _this.refresh(undefined); }),
            this.daemonClient.onDaemonStarted(function () { return _this.refresh(undefined); }),
            this.daemonClient.onDaemonStopped(function () { return _this.refresh(undefined); })
        ]);
    };
    ListWidget.prototype.getScrollContainer = function () {
        return this.deferredContainer.promise;
    };
    ListWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        (this.focusNode || this.node).focus();
    };
    ListWidget.prototype.onUpdateRequest = function (msg) {
        _super.prototype.onUpdateRequest.call(this, msg);
        this.render();
    };
    ListWidget.prototype.render = function () {
        return React.createElement(filterable_list_container_1.FilterableListContainer, { container: this, resolveContainer: this.deferredContainer.resolve, resolveFocus: this.onFocusResolved, searchable: this.options.searchable, installable: this.options.installable, itemLabel: this.options.itemLabel, itemRenderer: this.options.itemRenderer, filterTextChangeEvent: this.filterTextChangeEmitter.event });
    };
    /**
     * If `filterText` is defined, sets the filter text to the argument.
     * If it is `undefined`, updates the view state by re-running the search with the current `filterText` term.
     */
    ListWidget.prototype.refresh = function (filterText) {
        var _this = this;
        this.deferredContainer.promise.then(function () { return _this.filterTextChangeEmitter.fire(filterText); });
    };
    ListWidget.prototype.updateScrollBar = function () {
        if (this.scrollBar) {
            this.scrollBar.update();
        }
    };
    __decorate([
        inversify_1.inject(core_service_client_impl_1.CoreServiceClientImpl),
        __metadata("design:type", core_service_client_impl_1.CoreServiceClientImpl)
    ], ListWidget.prototype, "coreServiceClient", void 0);
    __decorate([
        inversify_1.inject(arduino_daemon_client_impl_1.ArduinoDaemonClientImpl),
        __metadata("design:type", arduino_daemon_client_impl_1.ArduinoDaemonClientImpl)
    ], ListWidget.prototype, "daemonClient", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ListWidget.prototype, "init", null);
    ListWidget = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [Object])
    ], ListWidget);
    return ListWidget;
}(react_widget_1.ReactWidget));
exports.ListWidget = ListWidget;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/search-bar.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/search-bar.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBar = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var SearchBar = /** @class */ (function (_super) {
    __extends(SearchBar, _super);
    function SearchBar(props) {
        var _this = _super.call(this, props) || this;
        _this.setRef = function (element) {
            if (_this.props.resolveFocus) {
                _this.props.resolveFocus(element || undefined);
            }
        };
        _this.handleFilterTextChange = _this.handleFilterTextChange.bind(_this);
        return _this;
    }
    SearchBar.prototype.render = function () {
        return React.createElement("input", { ref: this.setRef, className: "theia-input " + SearchBar.Styles.SEARCH_BAR_CLASS, type: 'text', placeholder: 'Filter your search...', size: 1, value: this.props.filterText, onChange: this.handleFilterTextChange });
    };
    SearchBar.prototype.handleFilterTextChange = function (event) {
        this.props.onFilterTextChanged(event.target.value);
    };
    return SearchBar;
}(React.Component));
exports.SearchBar = SearchBar;
(function (SearchBar) {
    var Styles;
    (function (Styles) {
        Styles.SEARCH_BAR_CLASS = 'search-bar';
    })(Styles = SearchBar.Styles || (SearchBar.Styles = {}));
})(SearchBar = exports.SearchBar || (exports.SearchBar = {}));
exports.SearchBar = SearchBar;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/widgets/progress-dialog.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/widgets/progress-dialog.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UninstallationProgressDialog = exports.InstallationProgressDialog = void 0;
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var InstallationProgressDialog = /** @class */ (function (_super) {
    __extends(InstallationProgressDialog, _super);
    function InstallationProgressDialog(componentName, version) {
        var _this = _super.call(this, { title: 'Installation in progress' }) || this;
        _this.value = undefined;
        _this.contentNode.textContent = "Installing " + componentName + " [" + version + "]. Please wait...";
        return _this;
    }
    return InstallationProgressDialog;
}(browser_1.AbstractDialog));
exports.InstallationProgressDialog = InstallationProgressDialog;
var UninstallationProgressDialog = /** @class */ (function (_super) {
    __extends(UninstallationProgressDialog, _super);
    function UninstallationProgressDialog(componentName) {
        var _this = _super.call(this, { title: 'Uninstallation in progress' }) || this;
        _this.value = undefined;
        _this.contentNode.textContent = "Uninstalling " + componentName + ". Please wait...";
        return _this;
    }
    return UninstallationProgressDialog;
}(browser_1.AbstractDialog));
exports.UninstallationProgressDialog = UninstallationProgressDialog;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/main-menu-manager.js":
/*!****************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/main-menu-manager.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MainMenuManager = void 0;
exports.MainMenuManager = Symbol('MainMenuManager');


/***/ })

}]);
//# sourceMappingURL=48.bundle.js.map