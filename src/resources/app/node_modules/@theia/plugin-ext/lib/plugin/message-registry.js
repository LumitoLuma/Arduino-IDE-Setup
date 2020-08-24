"use strict";
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
exports.MessageRegistryExt = void 0;
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
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var MessageRegistryExt = /** @class */ (function () {
    function MessageRegistryExt(rpc) {
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.MESSAGE_REGISTRY_MAIN);
    }
    MessageRegistryExt.prototype.showMessage = function (type, message, optionsOrFirstItem) {
        var rest = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            rest[_i - 3] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var options, actions, items, pushItem, rest_1, rest_1_1, item, actionHandle;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = {};
                        actions = [];
                        items = [];
                        pushItem = function (item) {
                            items.push(item);
                            if (typeof item === 'string') {
                                actions.push({ title: item });
                            }
                            else {
                                actions.push({ title: item.title, isCloseAffordance: item.isCloseAffordance });
                                if (item.isCloseAffordance) {
                                    options.onCloseActionHandle = actions.length - 1;
                                }
                            }
                        };
                        if (optionsOrFirstItem) {
                            if (typeof optionsOrFirstItem === 'string' || 'title' in optionsOrFirstItem) {
                                pushItem(optionsOrFirstItem);
                            }
                            else {
                                if ('modal' in optionsOrFirstItem) {
                                    options.modal = optionsOrFirstItem.modal;
                                }
                            }
                        }
                        try {
                            for (rest_1 = __values(rest), rest_1_1 = rest_1.next(); !rest_1_1.done; rest_1_1 = rest_1.next()) {
                                item = rest_1_1.value;
                                pushItem(item);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (rest_1_1 && !rest_1_1.done && (_a = rest_1.return)) _a.call(rest_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, this.proxy.$showMessage(type, message, options, actions)];
                    case 1:
                        actionHandle = _b.sent();
                        return [2 /*return*/, actionHandle !== undefined ? items[actionHandle] : undefined];
                }
            });
        });
    };
    return MessageRegistryExt;
}());
exports.MessageRegistryExt = MessageRegistryExt;
//# sourceMappingURL=message-registry.js.map