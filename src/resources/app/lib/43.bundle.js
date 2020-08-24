(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[43],{

/***/ "./node_modules/@theia/output/lib/browser/output-context-menu.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@theia/output/lib/browser/output-context-menu.js ***!
  \***********************************************************************/
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
exports.OutputContextMenuService = exports.OutputContextMenu = void 0;
/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var monaco_context_menu_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-context-menu */ "./node_modules/@theia/monaco/lib/browser/monaco-context-menu.js");
var OutputContextMenu;
(function (OutputContextMenu) {
    OutputContextMenu.MENU_PATH = ['output_context_menu'];
    OutputContextMenu.TEXT_EDIT_GROUP = __spread(OutputContextMenu.MENU_PATH, ['0_text_edit_group']);
    OutputContextMenu.COMMAND_GROUP = __spread(OutputContextMenu.MENU_PATH, ['1_command_group']);
    OutputContextMenu.WIDGET_GROUP = __spread(OutputContextMenu.MENU_PATH, ['2_widget_group']);
})(OutputContextMenu = exports.OutputContextMenu || (exports.OutputContextMenu = {}));
var OutputContextMenuService = /** @class */ (function (_super) {
    __extends(OutputContextMenuService, _super);
    function OutputContextMenuService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OutputContextMenuService.prototype.menuPath = function () {
        return OutputContextMenu.MENU_PATH;
    };
    OutputContextMenuService = __decorate([
        inversify_1.injectable()
    ], OutputContextMenuService);
    return OutputContextMenuService;
}(monaco_context_menu_1.MonacoContextMenuService));
exports.OutputContextMenuService = OutputContextMenuService;


/***/ }),

/***/ "./node_modules/@theia/output/lib/browser/output-contribution.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@theia/output/lib/browser/output-contribution.js ***!
  \***********************************************************************/
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
exports.OutputContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var widget_1 = __webpack_require__(/*! @theia/core/lib/browser/widgets/widget */ "./node_modules/@theia/core/lib/browser/widgets/widget.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var common_1 = __webpack_require__(/*! @theia/core/lib/common */ "./node_modules/@theia/core/lib/common/index.js");
var view_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/view-contribution */ "./node_modules/@theia/core/lib/browser/shell/view-contribution.js");
var output_widget_1 = __webpack_require__(/*! ./output-widget */ "./node_modules/@theia/output/lib/browser/output-widget.js");
var output_context_menu_1 = __webpack_require__(/*! ./output-context-menu */ "./node_modules/@theia/output/lib/browser/output-context-menu.js");
var output_uri_1 = __webpack_require__(/*! ../common/output-uri */ "./node_modules/@theia/output/lib/common/output-uri.js");
var clipboard_service_1 = __webpack_require__(/*! @theia/core/lib/browser/clipboard-service */ "./node_modules/@theia/core/lib/browser/clipboard-service.js");
var output_channel_1 = __webpack_require__(/*! ../common/output-channel */ "./node_modules/@theia/output/lib/common/output-channel.js");
var output_commands_1 = __webpack_require__(/*! ./output-commands */ "./node_modules/@theia/output/lib/browser/output-commands.js");
var OutputContribution = /** @class */ (function (_super) {
    __extends(OutputContribution, _super);
    function OutputContribution() {
        var _this = _super.call(this, {
            widgetId: output_widget_1.OutputWidget.ID,
            widgetName: 'Output',
            defaultWidgetOptions: {
                area: 'bottom'
            },
            toggleCommandId: 'output:toggle',
            toggleKeybinding: 'CtrlCmd+Shift+U'
        }) || this;
        _this.id = output_widget_1.OutputWidget.ID + "-opener";
        return _this;
    }
    OutputContribution.prototype.init = function () {
        var _this = this;
        this.outputChannelManager.onChannelWasShown(function (_a) {
            var name = _a.name, preserveFocus = _a.preserveFocus;
            return browser_1.open(_this.openerService, output_uri_1.OutputUri.create(name), { activate: !preserveFocus, reveal: true });
        });
    };
    OutputContribution.prototype.registerCommands = function (registry) {
        var _this = this;
        _super.prototype.registerCommands.call(this, registry);
        registry.registerCommand(output_commands_1.OutputCommands.CLEAR__WIDGET, {
            isEnabled: function (arg) {
                if (arg instanceof widget_1.Widget) {
                    return arg instanceof output_widget_1.OutputWidget;
                }
                return _this.shell.currentWidget instanceof output_widget_1.OutputWidget;
            },
            isVisible: function (arg) {
                if (arg instanceof widget_1.Widget) {
                    return arg instanceof output_widget_1.OutputWidget;
                }
                return _this.shell.currentWidget instanceof output_widget_1.OutputWidget;
            },
            execute: function () {
                _this.widget.then(function (widget) {
                    _this.withWidget(widget, function (output) {
                        output.clear();
                        return true;
                    });
                });
            }
        });
        registry.registerCommand(output_commands_1.OutputCommands.LOCK__WIDGET, {
            isEnabled: function (widget) { return _this.withWidget(widget, function (output) { return !output.isLocked; }); },
            isVisible: function (widget) { return _this.withWidget(widget, function (output) { return !output.isLocked; }); },
            execute: function (widget) { return _this.withWidget(widget, function (output) {
                output.lock();
                return true;
            }); }
        });
        registry.registerCommand(output_commands_1.OutputCommands.UNLOCK__WIDGET, {
            isEnabled: function (widget) { return _this.withWidget(widget, function (output) { return output.isLocked; }); },
            isVisible: function (widget) { return _this.withWidget(widget, function (output) { return output.isLocked; }); },
            execute: function (widget) { return _this.withWidget(widget, function (output) {
                output.unlock();
                return true;
            }); }
        });
        registry.registerCommand(output_commands_1.OutputCommands.COPY_ALL, {
            execute: function () {
                var _a;
                var textToCopy = (_a = _this.tryGetWidget()) === null || _a === void 0 ? void 0 : _a.getText();
                if (textToCopy) {
                    _this.clipboardService.writeText(textToCopy);
                }
            }
        });
    };
    OutputContribution.prototype.registerMenus = function (registry) {
        _super.prototype.registerMenus.call(this, registry);
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.TEXT_EDIT_GROUP, {
            commandId: browser_1.CommonCommands.COPY.id
        });
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.TEXT_EDIT_GROUP, {
            commandId: output_commands_1.OutputCommands.COPY_ALL.id,
            label: 'Copy All'
        });
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.COMMAND_GROUP, {
            commandId: browser_1.quickCommand.id,
            label: 'Find Command...'
        });
        registry.registerMenuAction(output_context_menu_1.OutputContextMenu.WIDGET_GROUP, {
            commandId: output_commands_1.OutputCommands.CLEAR__WIDGET.id,
            label: 'Clear Output'
        });
    };
    OutputContribution.prototype.canHandle = function (uri) {
        return output_uri_1.OutputUri.is(uri) ? 200 : 0;
    };
    OutputContribution.prototype.open = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!output_uri_1.OutputUri.is(uri)) {
                            throw new Error("Expected '" + output_uri_1.OutputUri.SCHEME + "' URI scheme. Got: " + uri + " instead.");
                        }
                        return [4 /*yield*/, this.openView(options)];
                    case 1:
                        widget = _a.sent();
                        return [2 /*return*/, widget];
                }
            });
        });
    };
    OutputContribution.prototype.withWidget = function (widget, predicate) {
        if (widget === void 0) { widget = this.tryGetWidget(); }
        if (predicate === void 0) { predicate = function () { return true; }; }
        return widget instanceof output_widget_1.OutputWidget ? predicate(widget) : false;
    };
    __decorate([
        inversify_1.inject(clipboard_service_1.ClipboardService),
        __metadata("design:type", Object)
    ], OutputContribution.prototype, "clipboardService", void 0);
    __decorate([
        inversify_1.inject(common_1.CommandService),
        __metadata("design:type", Object)
    ], OutputContribution.prototype, "commandService", void 0);
    __decorate([
        inversify_1.inject(output_channel_1.OutputChannelManager),
        __metadata("design:type", output_channel_1.OutputChannelManager)
    ], OutputContribution.prototype, "outputChannelManager", void 0);
    __decorate([
        inversify_1.inject(browser_1.OpenerService),
        __metadata("design:type", Object)
    ], OutputContribution.prototype, "openerService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OutputContribution.prototype, "init", null);
    OutputContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], OutputContribution);
    return OutputContribution;
}(view_contribution_1.AbstractViewContribution));
exports.OutputContribution = OutputContribution;


/***/ })

}]);
//# sourceMappingURL=43.bundle.js.map