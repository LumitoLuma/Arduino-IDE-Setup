"use strict";
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
exports.DecorationsExtImpl = void 0;
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var vscode_uri_1 = require("vscode-uri");
var types_impl_1 = require("./types-impl");
var DecorationsExtImpl = /** @class */ (function () {
    function DecorationsExtImpl(rpc) {
        this.rpc = rpc;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.DECORATIONS_MAIN);
        this.providersMap = new Map();
    }
    DecorationsExtImpl.prototype.registerDecorationProvider = function (provider) {
        var _this = this;
        var id = DecorationsExtImpl.PROVIDER_ID++;
        provider.onDidChangeDecorations(function (arg) {
            var argument;
            if (Array.isArray(arg)) {
                argument = arg.map(function (uri) { return uri.toString(); });
            }
            else if (arg) {
                argument = arg.toString();
            }
            _this.proxy.$fireDidChangeDecorations(id, argument);
        });
        var providerMain = {
            provideDecoration: function (uri) {
                return __awaiter(this, void 0, void 0, function () {
                    var res, color, ob;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, provider.provideDecoration(vscode_uri_1.URI.parse(uri), new CancellationTokenImpl())];
                            case 1:
                                res = _a.sent();
                                if (res) {
                                    color = void 0;
                                    if (res.color) {
                                        ob = res.color;
                                        color = { id: ob.id };
                                    }
                                    return [2 /*return*/, {
                                            letter: res.letter,
                                            title: res.title,
                                            color: color,
                                            priority: res.priority,
                                            bubble: res.bubble,
                                            source: res.source
                                        }];
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            }
        };
        this.proxy.$registerDecorationProvider(id, providerMain);
        this.providersMap.set(id, providerMain);
        return new types_impl_1.Disposable(function () {
            _this.proxy.$dispose(id);
        });
    };
    DecorationsExtImpl.prototype.$provideDecoration = function (id, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                provider = this.providersMap.get(id);
                if (provider) {
                    return [2 /*return*/, provider.provideDecoration(uri)];
                }
                return [2 /*return*/];
            });
        });
    };
    DecorationsExtImpl.PROVIDER_ID = 0;
    return DecorationsExtImpl;
}());
exports.DecorationsExtImpl = DecorationsExtImpl;
var CancellationTokenImpl = /** @class */ (function () {
    function CancellationTokenImpl() {
    }
    return CancellationTokenImpl;
}());
//# sourceMappingURL=decorations.js.map