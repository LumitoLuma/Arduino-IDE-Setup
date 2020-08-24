(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[76],{

/***/ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js":
/*!******************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.ArduinoMenus = void 0;
var menu_1 = __webpack_require__(/*! @theia/core/lib/common/menu */ "./node_modules/@theia/core/lib/common/menu.js");
var common_frontend_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/common-frontend-contribution */ "./node_modules/@theia/core/lib/browser/common-frontend-contribution.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var ArduinoMenus;
(function (ArduinoMenus) {
    // Main menu
    // -- File
    ArduinoMenus.FILE__SKETCH_GROUP = __spread(common_frontend_contribution_1.CommonMenus.FILE, ['0_sketch']);
    ArduinoMenus.FILE__PRINT_GROUP = __spread(common_frontend_contribution_1.CommonMenus.FILE, ['1_print']);
    // XXX: on macOS, the settings group is not under `File`
    ArduinoMenus.FILE__SETTINGS_GROUP = __spread((core_1.isOSX ? menu_1.MAIN_MENU_BAR : common_frontend_contribution_1.CommonMenus.FILE), ['2_settings']);
    ArduinoMenus.FILE__QUIT_GROUP = __spread(common_frontend_contribution_1.CommonMenus.FILE, ['3_quit']);
    // -- Edit
    // `Copy`, `Copy to Forum`, `Paste`, etc.
    // Note: `1_undo` is the first group from Theia, we start with `2`
    ArduinoMenus.EDIT__TEXT_CONTROL_GROUP = __spread(common_frontend_contribution_1.CommonMenus.EDIT, ['2_text_control']);
    // `Comment/Uncomment`, etc.
    ArduinoMenus.EDIT__CODE_CONTROL_GROUP = __spread(common_frontend_contribution_1.CommonMenus.EDIT, ['3_code_control']);
    ArduinoMenus.EDIT__FONT_CONTROL_GROUP = __spread(common_frontend_contribution_1.CommonMenus.EDIT, ['4_font_control']);
    ArduinoMenus.EDIT__FIND_GROUP = __spread(common_frontend_contribution_1.CommonMenus.EDIT, ['5_find']);
    // -- Sketch
    ArduinoMenus.SKETCH = __spread(menu_1.MAIN_MENU_BAR, ['3_sketch']);
    ArduinoMenus.SKETCH__MAIN_GROUP = __spread(ArduinoMenus.SKETCH, ['0_main']);
    ArduinoMenus.SKETCH__UTILS_GROUP = __spread(ArduinoMenus.SKETCH, ['1_utils']);
    // -- Tools
    ArduinoMenus.TOOLS = __spread(menu_1.MAIN_MENU_BAR, ['4_tools']);
    // `Auto Format`, `Library Manager...`, `Boards Manager...`
    ArduinoMenus.TOOLS__MAIN_GROUP = __spread(ArduinoMenus.TOOLS, ['0_main']);
    // Core settings, such as `Processor` and `Programmers` for the board.
    ArduinoMenus.TOOLS__BOARD_SETTINGS_GROUP = __spread(ArduinoMenus.TOOLS, ['1_board_settings']);
    // Context menu
    // -- Open
    ArduinoMenus.OPEN_SKETCH__CONTEXT = ['arduino-open-sketch--context'];
    ArduinoMenus.OPEN_SKETCH__CONTEXT__OPEN_GROUP = __spread(ArduinoMenus.OPEN_SKETCH__CONTEXT, ['0_open']);
    ArduinoMenus.OPEN_SKETCH__CONTEXT__RECENT_GROUP = __spread(ArduinoMenus.OPEN_SKETCH__CONTEXT, ['1_recent']);
    ArduinoMenus.OPEN_SKETCH__CONTEXT__EXAMPLES_GROUP = __spread(ArduinoMenus.OPEN_SKETCH__CONTEXT, ['2_examples']);
    // -- Sketch control
    ArduinoMenus.SKETCH_CONTROL__CONTEXT = ['arduino-sketch-control--context'];
    // `New Tab`, `Rename`, `Delete`
    ArduinoMenus.SKETCH_CONTROL__CONTEXT__MAIN_GROUP = __spread(ArduinoMenus.SKETCH_CONTROL__CONTEXT, ['0_main']);
    // `Previous Tab`, `Next Tab`
    ArduinoMenus.SKETCH_CONTROL__CONTEXT__NAVIGATION_GROUP = __spread(ArduinoMenus.SKETCH_CONTROL__CONTEXT, ['1_navigation']);
    // Sketch files opened in editors
    ArduinoMenus.SKETCH_CONTROL__CONTEXT__RESOURCES_GROUP = __spread(ArduinoMenus.SKETCH_CONTROL__CONTEXT, ['2_resources']);
})(ArduinoMenus = exports.ArduinoMenus || (exports.ArduinoMenus = {}));


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


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/electron-browser/theia/core/electron-main-menu-factory.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/electron-browser/theia/core/electron-main-menu-factory.js ***!
  \**********************************************************************************************************/
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
exports.ElectronMainMenuFactory = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var electron_1 = __webpack_require__(/*! electron */ "electron");
var electron_main_menu_factory_1 = __webpack_require__(/*! @theia/core/lib/electron-browser/menu/electron-main-menu-factory */ "./node_modules/@theia/core/lib/electron-browser/menu/electron-main-menu-factory.js");
var arduino_menus_1 = __webpack_require__(/*! ../../../browser/menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var ElectronMainMenuFactory = /** @class */ (function (_super) {
    __extends(ElectronMainMenuFactory, _super);
    function ElectronMainMenuFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElectronMainMenuFactory.prototype.acceleratorFor = function (keybinding) {
        var _this = this;
        // TODO: https://github.com/eclipse-theia/theia/issues/8207
        return this.keybindingRegistry.resolveKeybinding(keybinding)
            .map(function (binding) { return _this.keybindingRegistry.acceleratorForKeyCode(binding, '+'); })
            .join('')
            .replace('←', 'Left')
            .replace('→', 'Right');
    };
    ElectronMainMenuFactory.prototype.createOSXMenu = function () {
        var submenu = _super.prototype.createOSXMenu.call(this).submenu;
        var label = 'Arduino Pro IDE';
        if (!!submenu && !(submenu instanceof electron_1.remote.Menu)) {
            var _a = __read(submenu), about = _a[0], rest = _a.slice(2);
            var menuModel = this.menuProvider.getMenu(arduino_menus_1.ArduinoMenus.FILE__SETTINGS_GROUP);
            var settings = this.fillMenuTemplate([], menuModel);
            return {
                label: label,
                submenu: __spread([
                    about,
                    { type: 'separator' }
                ], settings, [
                    { type: 'separator' }
                ], rest)
            };
        }
        return { label: label, submenu: submenu };
    };
    ElectronMainMenuFactory = __decorate([
        inversify_1.injectable()
    ], ElectronMainMenuFactory);
    return ElectronMainMenuFactory;
}(electron_main_menu_factory_1.ElectronMainMenuFactory));
exports.ElectronMainMenuFactory = ElectronMainMenuFactory;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/electron-browser/theia/core/electron-menu-contribution.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/electron-browser/theia/core/electron-menu-contribution.js ***!
  \**********************************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronMenuContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var electron_menu_contribution_1 = __webpack_require__(/*! @theia/core/lib/electron-browser/menu/electron-menu-contribution */ "./node_modules/@theia/core/lib/electron-browser/menu/electron-menu-contribution.js");
var ElectronMenuContribution = /** @class */ (function (_super) {
    __extends(ElectronMenuContribution, _super);
    function ElectronMenuContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElectronMenuContribution.prototype.hideTopPanel = function () {
        // NOOP
        // We reuse the `div` for the Arduino toolbar.
    };
    ElectronMenuContribution.prototype.update = function () {
        this.setMenu();
    };
    ElectronMenuContribution.prototype.registerCommands = function (registry) {
        _super.prototype.registerCommands.call(this, registry);
        registry.unregisterCommand(electron_menu_contribution_1.ElectronCommands.CLOSE_WINDOW);
    };
    ElectronMenuContribution.prototype.registerMenus = function (registry) {
        _super.prototype.registerMenus.call(this, registry);
        registry.unregisterMenuAction(electron_menu_contribution_1.ElectronCommands.CLOSE_WINDOW);
    };
    ElectronMenuContribution.prototype.registerKeybindings = function (registry) {
        _super.prototype.registerKeybindings.call(this, registry);
        registry.unregisterKeybinding(electron_menu_contribution_1.ElectronCommands.CLOSE_WINDOW.id);
        registry.unregisterKeybinding(electron_menu_contribution_1.ElectronCommands.ZOOM_IN.id);
        registry.unregisterKeybinding(electron_menu_contribution_1.ElectronCommands.ZOOM_OUT.id);
    };
    ElectronMenuContribution = __decorate([
        inversify_1.injectable()
    ], ElectronMenuContribution);
    return ElectronMenuContribution;
}(electron_menu_contribution_1.ElectronMenuContribution));
exports.ElectronMenuContribution = ElectronMenuContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/electron-browser/theia/core/electron-menu-module.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/electron-browser/theia/core/electron-menu-module.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var electron_menu_contribution_1 = __webpack_require__(/*! @theia/core/lib/electron-browser/menu/electron-menu-contribution */ "./node_modules/@theia/core/lib/electron-browser/menu/electron-menu-contribution.js");
var electron_menu_contribution_2 = __webpack_require__(/*! ./electron-menu-contribution */ "./node_modules/arduino-ide-extension/lib/electron-browser/theia/core/electron-menu-contribution.js");
var main_menu_manager_1 = __webpack_require__(/*! ../../../common/main-menu-manager */ "./node_modules/arduino-ide-extension/lib/common/main-menu-manager.js");
var electron_main_menu_factory_1 = __webpack_require__(/*! @theia/core/lib/electron-browser/menu/electron-main-menu-factory */ "./node_modules/@theia/core/lib/electron-browser/menu/electron-main-menu-factory.js");
var electron_main_menu_factory_2 = __webpack_require__(/*! ./electron-main-menu-factory */ "./node_modules/arduino-ide-extension/lib/electron-browser/theia/core/electron-main-menu-factory.js");
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    bind(electron_menu_contribution_2.ElectronMenuContribution).toSelf().inSingletonScope();
    bind(main_menu_manager_1.MainMenuManager).toService(electron_menu_contribution_2.ElectronMenuContribution);
    rebind(electron_menu_contribution_1.ElectronMenuContribution).to(electron_menu_contribution_2.ElectronMenuContribution);
    bind(electron_main_menu_factory_2.ElectronMainMenuFactory).toSelf().inRequestScope();
    rebind(electron_main_menu_factory_1.ElectronMainMenuFactory).toService(electron_main_menu_factory_2.ElectronMainMenuFactory);
});


/***/ })

}]);
//# sourceMappingURL=76.bundle.js.map