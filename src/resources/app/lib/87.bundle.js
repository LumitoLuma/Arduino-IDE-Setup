(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[87],{

/***/ "./node_modules/@theia/core/lib/electron-browser/menu/electron-context-menu-renderer.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@theia/core/lib/electron-browser/menu/electron-context-menu-renderer.js ***!
  \**********************************************************************************************/
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
exports.ElectronContextMenuRenderer = exports.ElectronTextInputContextMenuContribution = exports.ElectronTextInputContextMenu = exports.ElectronContextMenuAccess = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! ../../browser */ "./node_modules/@theia/core/lib/browser/index.js");
var electron_main_menu_factory_1 = __webpack_require__(/*! ./electron-main-menu-factory */ "./node_modules/@theia/core/lib/electron-browser/menu/electron-main-menu-factory.js");
var context_menu_context_1 = __webpack_require__(/*! ../../browser/menu/context-menu-context */ "./node_modules/@theia/core/lib/browser/menu/context-menu-context.js");
var ElectronContextMenuAccess = /** @class */ (function (_super) {
    __extends(ElectronContextMenuAccess, _super);
    function ElectronContextMenuAccess(menu) {
        var _this = _super.call(this, {
            dispose: function () { return menu.closePopup(); }
        }) || this;
        _this.menu = menu;
        return _this;
    }
    return ElectronContextMenuAccess;
}(browser_1.ContextMenuAccess));
exports.ElectronContextMenuAccess = ElectronContextMenuAccess;
var ElectronTextInputContextMenu;
(function (ElectronTextInputContextMenu) {
    ElectronTextInputContextMenu.MENU_PATH = ['electron_text_input'];
    ElectronTextInputContextMenu.UNDO_REDO_EDIT_GROUP = __spread(ElectronTextInputContextMenu.MENU_PATH, ['0_undo_redo_group']);
    ElectronTextInputContextMenu.EDIT_GROUP = __spread(ElectronTextInputContextMenu.MENU_PATH, ['1_edit_group']);
    ElectronTextInputContextMenu.SELECT_GROUP = __spread(ElectronTextInputContextMenu.MENU_PATH, ['2_select_group']);
})(ElectronTextInputContextMenu = exports.ElectronTextInputContextMenu || (exports.ElectronTextInputContextMenu = {}));
var ElectronTextInputContextMenuContribution = /** @class */ (function () {
    function ElectronTextInputContextMenuContribution() {
    }
    ElectronTextInputContextMenuContribution.prototype.onStart = function () {
        var _this = this;
        window.document.addEventListener('contextmenu', function (event) {
            if (event.target instanceof HTMLElement) {
                var target_1 = event.target;
                if (target_1.nodeName && (target_1.nodeName.toLowerCase() === 'input' || target_1.nodeName.toLowerCase() === 'textarea')) {
                    event.preventDefault();
                    event.stopPropagation();
                    _this.contextMenuRenderer.render({
                        anchor: event,
                        menuPath: ElectronTextInputContextMenu.MENU_PATH,
                        onHide: function () { return target_1.focus(); }
                    });
                }
            }
        });
    };
    ElectronTextInputContextMenuContribution.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(ElectronTextInputContextMenu.UNDO_REDO_EDIT_GROUP, { commandId: browser_1.CommonCommands.UNDO.id });
        registry.registerMenuAction(ElectronTextInputContextMenu.UNDO_REDO_EDIT_GROUP, { commandId: browser_1.CommonCommands.REDO.id });
        registry.registerMenuAction(ElectronTextInputContextMenu.EDIT_GROUP, { commandId: browser_1.CommonCommands.CUT.id });
        registry.registerMenuAction(ElectronTextInputContextMenu.EDIT_GROUP, { commandId: browser_1.CommonCommands.COPY.id });
        registry.registerMenuAction(ElectronTextInputContextMenu.EDIT_GROUP, { commandId: browser_1.CommonCommands.PASTE.id });
        registry.registerMenuAction(ElectronTextInputContextMenu.SELECT_GROUP, { commandId: browser_1.CommonCommands.SELECT_ALL.id });
    };
    __decorate([
        inversify_1.inject(browser_1.ContextMenuRenderer),
        __metadata("design:type", browser_1.ContextMenuRenderer)
    ], ElectronTextInputContextMenuContribution.prototype, "contextMenuRenderer", void 0);
    ElectronTextInputContextMenuContribution = __decorate([
        inversify_1.injectable()
    ], ElectronTextInputContextMenuContribution);
    return ElectronTextInputContextMenuContribution;
}());
exports.ElectronTextInputContextMenuContribution = ElectronTextInputContextMenuContribution;
var ElectronContextMenuRenderer = /** @class */ (function (_super) {
    __extends(ElectronContextMenuRenderer, _super);
    function ElectronContextMenuRenderer(menuFactory) {
        var _this = _super.call(this) || this;
        _this.menuFactory = menuFactory;
        return _this;
    }
    ElectronContextMenuRenderer.prototype.doRender = function (_a) {
        var menuPath = _a.menuPath, anchor = _a.anchor, args = _a.args, onHide = _a.onHide;
        var menu = this.menuFactory.createContextMenu(menuPath, args);
        var _b = anchor instanceof MouseEvent ? { x: anchor.clientX, y: anchor.clientY } : anchor, x = _b.x, y = _b.y;
        // x and y values must be Ints or else there is a conversion error
        menu.popup({ x: Math.round(x), y: Math.round(y) });
        // native context menu stops the event loop, so there is no keyboard events
        this.context.resetAltPressed();
        if (onHide) {
            menu.once('menu-will-close', function () { return onHide(); });
        }
        return new ElectronContextMenuAccess(menu);
    };
    __decorate([
        inversify_1.inject(context_menu_context_1.ContextMenuContext),
        __metadata("design:type", context_menu_context_1.ContextMenuContext)
    ], ElectronContextMenuRenderer.prototype, "context", void 0);
    ElectronContextMenuRenderer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(electron_main_menu_factory_1.ElectronMainMenuFactory)),
        __metadata("design:paramtypes", [electron_main_menu_factory_1.ElectronMainMenuFactory])
    ], ElectronContextMenuRenderer);
    return ElectronContextMenuRenderer;
}(browser_1.ContextMenuRenderer));
exports.ElectronContextMenuRenderer = ElectronContextMenuRenderer;


/***/ }),

/***/ "./node_modules/@theia/core/lib/electron-browser/menu/electron-menu-module.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@theia/core/lib/electron-browser/menu/electron-menu-module.js ***!
  \************************************************************************************/
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
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var common_1 = __webpack_require__(/*! ../../common */ "./node_modules/@theia/core/lib/common/index.js");
var browser_1 = __webpack_require__(/*! ../../browser */ "./node_modules/@theia/core/lib/browser/index.js");
var electron_main_menu_factory_1 = __webpack_require__(/*! ./electron-main-menu-factory */ "./node_modules/@theia/core/lib/electron-browser/menu/electron-main-menu-factory.js");
var electron_context_menu_renderer_1 = __webpack_require__(/*! ./electron-context-menu-renderer */ "./node_modules/@theia/core/lib/electron-browser/menu/electron-context-menu-renderer.js");
var electron_menu_contribution_1 = __webpack_require__(/*! ./electron-menu-contribution */ "./node_modules/@theia/core/lib/electron-browser/menu/electron-menu-contribution.js");
exports.default = new inversify_1.ContainerModule(function (bind) {
    var e_1, _a;
    bind(electron_main_menu_factory_1.ElectronMainMenuFactory).toSelf().inSingletonScope();
    bind(browser_1.ContextMenuRenderer).to(electron_context_menu_renderer_1.ElectronContextMenuRenderer).inSingletonScope();
    bind(browser_1.KeybindingContext).toConstantValue({
        id: 'theia.context',
        isEnabled: true
    });
    bind(electron_menu_contribution_1.ElectronMenuContribution).toSelf().inSingletonScope();
    try {
        for (var _b = __values([browser_1.FrontendApplicationContribution, browser_1.KeybindingContribution, common_1.CommandContribution, common_1.MenuContribution]), _c = _b.next(); !_c.done; _c = _b.next()) {
            var serviceIdentifier = _c.value;
            bind(serviceIdentifier).toService(electron_menu_contribution_1.ElectronMenuContribution);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    bind(browser_1.FrontendApplicationContribution).to(electron_context_menu_renderer_1.ElectronTextInputContextMenuContribution).inSingletonScope();
    bind(common_1.MenuContribution).to(electron_context_menu_renderer_1.ElectronTextInputContextMenuContribution).inSingletonScope();
});


/***/ })

}]);
//# sourceMappingURL=87.bundle.js.map