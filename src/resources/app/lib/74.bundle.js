(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[74],{

/***/ "./node_modules/@theia/core/lib/electron-common/electron-token.js":
/*!************************************************************************!*\
  !*** ./node_modules/@theia/core/lib/electron-common/electron-token.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronSecurityToken = void 0;
/**
 * This token is unique the the current running instance. It is used by the backend
 * to make sure it is an electron browser window that is connecting to its services.
 *
 * The identifier is a string, which makes it usable as a key for cookies or similar.
 */
exports.ElectronSecurityToken = 'x-theia-electron-token';
;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-widget-factory.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-widget-factory.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
exports.WebviewWidgetFactory = void 0;
var webview_1 = __webpack_require__(/*! ./webview */ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview.js");
var webview_environment_1 = __webpack_require__(/*! ./webview-environment */ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-environment.js");
var WebviewWidgetFactory = /** @class */ (function () {
    function WebviewWidgetFactory(container) {
        this.id = webview_1.WebviewWidget.FACTORY_ID;
        this.container = container;
    }
    WebviewWidgetFactory.prototype.createWidget = function (identifier) {
        return __awaiter(this, void 0, void 0, function () {
            var externalEndpoint, endpoint, child;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.get(webview_environment_1.WebviewEnvironment).externalEndpoint()];
                    case 1:
                        externalEndpoint = _a.sent();
                        endpoint = externalEndpoint.replace('{{uuid}}', identifier.id);
                        if (endpoint[endpoint.length - 1] === '/') {
                            endpoint = endpoint.slice(0, endpoint.length - 1);
                        }
                        child = this.container.createChild();
                        child.bind(webview_1.WebviewWidgetIdentifier).toConstantValue(identifier);
                        child.bind(webview_1.WebviewWidgetExternalEndpoint).toConstantValue(endpoint);
                        return [2 /*return*/, child.get(webview_1.WebviewWidget)];
                }
            });
        });
    };
    return WebviewWidgetFactory;
}());
exports.WebviewWidgetFactory = WebviewWidgetFactory;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/main/electron-browser/plugin-ext-frontend-electron-module.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/main/electron-browser/plugin-ext-frontend-electron-module.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var webview_widget_factory_1 = __webpack_require__(/*! ../browser/webview/webview-widget-factory */ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-widget-factory.js");
var electron_webview_widget_factory_1 = __webpack_require__(/*! ./webview/electron-webview-widget-factory */ "./node_modules/@theia/plugin-ext/lib/main/electron-browser/webview/electron-webview-widget-factory.js");
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    rebind(webview_widget_factory_1.WebviewWidgetFactory).toDynamicValue(function (ctx) { return new electron_webview_widget_factory_1.ElectronWebviewWidgetFactory(ctx.container); }).inSingletonScope();
});


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/main/electron-browser/webview/electron-webview-widget-factory.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/main/electron-browser/webview/electron-webview-widget-factory.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
exports.ElectronWebviewWidgetFactory = void 0;
var electron_1 = __webpack_require__(/*! electron */ "electron");
var electron_token_1 = __webpack_require__(/*! @theia/core/lib/electron-common/electron-token */ "./node_modules/@theia/core/lib/electron-common/electron-token.js");
var webview_widget_factory_1 = __webpack_require__(/*! ../../browser/webview/webview-widget-factory */ "./node_modules/@theia/plugin-ext/lib/main/browser/webview/webview-widget-factory.js");
var ElectronWebviewWidgetFactory = /** @class */ (function (_super) {
    __extends(ElectronWebviewWidgetFactory, _super);
    function ElectronWebviewWidgetFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElectronWebviewWidgetFactory.prototype.createWidget = function (identifier) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.createWidget.call(this, identifier)];
                    case 1:
                        widget = _a.sent();
                        return [4 /*yield*/, this.attachElectronSecurityCookie(widget.externalEndpoint)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, widget];
                }
            });
        });
    };
    /**
     * Attach the ElectronSecurityToken to a cookie that will be sent with each webview request.
     *
     * @param endpoint cookie's target url
     */
    ElectronWebviewWidgetFactory.prototype.attachElectronSecurityCookie = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, electron_1.remote.session.defaultSession.cookies.set({
                            url: endpoint,
                            name: electron_token_1.ElectronSecurityToken,
                            value: JSON.stringify(this.container.get(electron_token_1.ElectronSecurityToken)),
                            httpOnly: true
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ElectronWebviewWidgetFactory;
}(webview_widget_factory_1.WebviewWidgetFactory));
exports.ElectronWebviewWidgetFactory = ElectronWebviewWidgetFactory;


/***/ }),

/***/ "./node_modules/@theia/plugin-ext/lib/plugin-ext-frontend-electron-module.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@theia/plugin-ext/lib/plugin-ext-frontend-electron-module.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_ext_frontend_electron_module_1 = __webpack_require__(/*! ./main/electron-browser/plugin-ext-frontend-electron-module */ "./node_modules/@theia/plugin-ext/lib/main/electron-browser/plugin-ext-frontend-electron-module.js");
exports.default = plugin_ext_frontend_electron_module_1.default;


/***/ })

}]);
//# sourceMappingURL=74.bundle.js.map