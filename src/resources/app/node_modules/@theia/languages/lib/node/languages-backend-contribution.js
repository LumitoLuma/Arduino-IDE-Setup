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
exports.LanguagesBackendContribution = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var messages_1 = require("vscode-jsonrpc/lib/messages");
var vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
var common_2 = require("../common");
var language_server_contribution_1 = require("./language-server-contribution");
var LanguagesBackendContribution = /** @class */ (function () {
    function LanguagesBackendContribution() {
        this.nextId = 1;
        this.sessions = new Map();
    }
    LanguagesBackendContribution.prototype.create = function (contributionId, startParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var id, sessionId;
            return __generator(this, function (_a) {
                id = this.nextId;
                this.nextId++;
                sessionId = String(id);
                this.sessions.set(sessionId, startParameters);
                return [2 /*return*/, sessionId];
            });
        });
    };
    LanguagesBackendContribution.prototype.destroy = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.sessions.delete(sessionId);
                return [2 /*return*/];
            });
        });
    };
    LanguagesBackendContribution.prototype.configure = function (service) {
        var e_1, _a;
        var _this = this;
        var _loop_1 = function (contribution) {
            var path = common_2.LanguageContribution.getPath(contribution);
            service.forward(path, function (_a, connection) {
                var id = _a.id;
                return __awaiter(_this, void 0, void 0, function () {
                    var parameters, e_2;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                parameters = this.sessions.get(id);
                                connection.onClose(function () { return _this.destroy(id); });
                                return [4 /*yield*/, contribution.start(connection, { sessionId: id, parameters: parameters })];
                            case 1:
                                _b.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                e_2 = _b.sent();
                                this.logger.error("Error occurred while starting language contribution. " + path + ".", e_2);
                                this.handleStartError(e_2, connection);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            });
        };
        try {
            for (var _b = __values(this.contributors.getContributions()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var contribution = _c.value;
                _loop_1(contribution);
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
    LanguagesBackendContribution.prototype.handleStartError = function (cause, connection) {
        var _this = this;
        connection.reader.listen(function (message) {
            if (messages_1.isRequestMessage(message)) {
                var method = message.method, jsonrpc = message.jsonrpc, id = message.id;
                if (method === vscode_languageserver_protocol_1.InitializeRequest.type.method) {
                    var error = new messages_1.ResponseError(messages_1.ErrorCodes.serverErrorStart, "" + cause).toJson();
                    connection.writer.write({
                        jsonrpc: jsonrpc,
                        id: id,
                        error: error
                    });
                }
                else if (method === vscode_languageserver_protocol_1.ShutdownRequest.type.method) {
                    // The client expects a `null` as the response.
                    // https://microsoft.github.io/language-server-protocol/specification#shutdown
                    var data = null; // eslint-disable-line no-null/no-null
                    connection.writer.write({
                        jsonrpc: jsonrpc,
                        id: id,
                        data: data
                    });
                    // We do not dispose the `connection` here.
                    // The client contribution will do it for us on LS start-up error.
                }
            }
            else {
                _this.logger.warn("Ignored request message: " + message);
            }
        });
    };
    __decorate([
        inversify_1.inject(common_1.ILogger),
        inversify_1.named('languages'),
        __metadata("design:type", Object)
    ], LanguagesBackendContribution.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(common_1.ContributionProvider),
        inversify_1.named(language_server_contribution_1.LanguageServerContribution),
        __metadata("design:type", Object)
    ], LanguagesBackendContribution.prototype, "contributors", void 0);
    LanguagesBackendContribution = __decorate([
        inversify_1.injectable()
    ], LanguagesBackendContribution);
    return LanguagesBackendContribution;
}());
exports.LanguagesBackendContribution = LanguagesBackendContribution;
//# sourceMappingURL=languages-backend-contribution.js.map