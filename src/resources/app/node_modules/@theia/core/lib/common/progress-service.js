"use strict";
/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressService = void 0;
var inversify_1 = require("inversify");
var message_service_protocol_1 = require("./message-service-protocol");
var cancellation_1 = require("./cancellation");
var progress_service_protocol_1 = require("./progress-service-protocol");
var message_service_1 = require("./message-service");
var ProgressService = /** @class */ (function () {
    function ProgressService() {
        this.progressIdPrefix = Math.random().toString(36).substring(5);
        this.counter = 0;
    }
    ProgressService.prototype.showProgress = function (message, onDidCancel) {
        return __awaiter(this, void 0, void 0, function () {
            var id, cancellationSource, report, actions, clientMessage, result;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.shouldDelegate(message)) {
                    return [2 /*return*/, this.messageService.showProgress(message, onDidCancel)];
                }
                id = this.newProgressId();
                cancellationSource = new cancellation_1.CancellationTokenSource();
                report = function (update) {
                    _this.client.reportProgress(id, update, message, cancellationSource.token);
                };
                actions = new Set(message.actions);
                if (message_service_protocol_1.ProgressMessage.isCancelable(message)) {
                    actions.delete(message_service_protocol_1.ProgressMessage.Cancel);
                    actions.add(message_service_protocol_1.ProgressMessage.Cancel);
                }
                clientMessage = __assign(__assign({}, message), { actions: Array.from(actions) });
                result = this.client.showProgress(id, clientMessage, cancellationSource.token);
                if (message_service_protocol_1.ProgressMessage.isCancelable(message) && typeof onDidCancel === 'function') {
                    result.then(function (value) {
                        if (value === message_service_protocol_1.ProgressMessage.Cancel) {
                            onDidCancel();
                        }
                    });
                }
                return [2 /*return*/, {
                        id: id,
                        cancel: function () { return cancellationSource.cancel(); },
                        result: result,
                        report: report
                    }];
            });
        });
    };
    ProgressService.prototype.shouldDelegate = function (message) {
        var location = message.options && message.options.location;
        return location === 'notification';
    };
    ProgressService.prototype.newProgressId = function () {
        return this.progressIdPrefix + "-" + ++this.counter;
    };
    ProgressService.prototype.withProgress = function (text, locationId, task) {
        return __awaiter(this, void 0, void 0, function () {
            var progress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.showProgress({ text: text, options: { cancelable: true, location: locationId } })];
                    case 1:
                        progress = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, , 4, 5]);
                        return [4 /*yield*/, task()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        progress.cancel();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(progress_service_protocol_1.ProgressClient),
        __metadata("design:type", Object)
    ], ProgressService.prototype, "client", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], ProgressService.prototype, "messageService", void 0);
    ProgressService = __decorate([
        inversify_1.injectable()
    ], ProgressService);
    return ProgressService;
}());
exports.ProgressService = ProgressService;
//# sourceMappingURL=progress-service.js.map