"use strict";
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
exports.MessageRegistryMainImpl = void 0;
var message_service_1 = require("@theia/core/lib/common/message-service");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var modal_notification_1 = require("./dialogs/modal-notification");
var MessageRegistryMainImpl = /** @class */ (function () {
    function MessageRegistryMainImpl(container) {
        this.messageService = container.get(message_service_1.MessageService);
    }
    MessageRegistryMainImpl.prototype.$showMessage = function (type, message, options, actions) {
        return __awaiter(this, void 0, void 0, function () {
            var action, handle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doShowMessage(type, message, options, actions)];
                    case 1:
                        action = _a.sent();
                        handle = action
                            ? actions.map(function (a) { return a.title; }).indexOf(action)
                            : undefined;
                        return [2 /*return*/, handle === undefined && options.modal ? options.onCloseActionHandle : handle];
                }
            });
        });
    };
    MessageRegistryMainImpl.prototype.doShowMessage = function (type, message, options, actions) {
        return __awaiter(this, void 0, void 0, function () {
            var messageType, modalNotification;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                if (options.modal) {
                    messageType = type === plugin_api_rpc_1.MainMessageType.Error ? modal_notification_1.MessageType.Error :
                        type === plugin_api_rpc_1.MainMessageType.Warning ? modal_notification_1.MessageType.Warning :
                            modal_notification_1.MessageType.Info;
                    modalNotification = new modal_notification_1.ModalNotification();
                    return [2 /*return*/, modalNotification.showDialog(messageType, message, actions)];
                }
                switch (type) {
                    case plugin_api_rpc_1.MainMessageType.Info:
                        return [2 /*return*/, (_a = this.messageService).info.apply(_a, __spread([message], actions.map(function (a) { return a.title; })))];
                    case plugin_api_rpc_1.MainMessageType.Warning:
                        return [2 /*return*/, (_b = this.messageService).warn.apply(_b, __spread([message], actions.map(function (a) { return a.title; })))];
                    case plugin_api_rpc_1.MainMessageType.Error:
                        return [2 /*return*/, (_c = this.messageService).error.apply(_c, __spread([message], actions.map(function (a) { return a.title; })))];
                }
                throw new Error("Message type '" + type + "' is not supported yet!");
            });
        });
    };
    return MessageRegistryMainImpl;
}());
exports.MessageRegistryMainImpl = MessageRegistryMainImpl;
//# sourceMappingURL=message-registry-main.js.map