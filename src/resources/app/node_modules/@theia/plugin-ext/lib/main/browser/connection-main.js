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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionMainImpl = void 0;
var disposable_1 = require("@theia/core/lib/common/disposable");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var connection_1 = require("../../common/connection");
var plugin_message_reader_1 = require("../../common/plugin-message-reader");
var plugin_message_writer_1 = require("../../common/plugin-message-writer");
/**
 * Implementation of connection system of the plugin API.
 * Creates holds the connections to the plugins. Allows to send a message to the plugin by getting already created connection via id.
 */
var ConnectionMainImpl = /** @class */ (function () {
    function ConnectionMainImpl(rpc) {
        this.connections = new Map();
        this.toDispose = new disposable_1.DisposableCollection();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.CONNECTION_EXT);
    }
    ConnectionMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    /**
     * Gets the connection between plugin by id and sends string message to it.
     *
     * @param id connection's id
     * @param message incoming message
     */
    ConnectionMainImpl.prototype.$sendMessage = function (id, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.connections.has(id)) {
                    this.connections.get(id).reader.readMessage(message);
                }
                else {
                    console.warn('It is not possible to read message. Connection missed.');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Instantiates a new connection by the given id.
     * @param id the connection id
     */
    ConnectionMainImpl.prototype.$createConnection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doEnsureConnection(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Deletes a connection.
     * @param id the connection id
     */
    ConnectionMainImpl.prototype.$deleteConnection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.connections.delete(id);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Returns existed connection or creates a new one.
     * @param id the connection id
     */
    ConnectionMainImpl.prototype.ensureConnection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doEnsureConnection(id)];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, this.proxy.$createConnection(id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, connection];
                }
            });
        });
    };
    /**
     * Returns existed connection or creates a new one.
     * @param id the connection id
     */
    ConnectionMainImpl.prototype.doEnsureConnection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.connections.get(id);
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.doCreateConnection(id)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        connection = _a;
                        this.connections.set(id, connection);
                        return [2 /*return*/, connection];
                }
            });
        });
    };
    ConnectionMainImpl.prototype.doCreateConnection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var reader, writer, connection, toClose;
            var _this = this;
            return __generator(this, function (_a) {
                reader = new plugin_message_reader_1.PluginMessageReader();
                writer = new plugin_message_writer_1.PluginMessageWriter(id, this.proxy);
                connection = new connection_1.PluginConnection(reader, writer, function () {
                    _this.connections.delete(id);
                    if (!toClose.disposed) {
                        _this.proxy.$deleteConnection(id);
                    }
                });
                toClose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { return reader.fireClose(); }));
                this.toDispose.push(toClose);
                return [2 /*return*/, connection];
            });
        });
    };
    return ConnectionMainImpl;
}());
exports.ConnectionMainImpl = ConnectionMainImpl;
//# sourceMappingURL=connection-main.js.map