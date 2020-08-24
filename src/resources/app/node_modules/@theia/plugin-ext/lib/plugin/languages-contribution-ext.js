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
exports.createConnection = exports.LanguagesContributionExtImpl = void 0;
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var child_process_1 = require("child_process");
var vscode_jsonrpc_1 = require("vscode-jsonrpc");
var types_impl_1 = require("./types-impl");
var vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
var vscode_ws_jsonrpc_1 = require("vscode-ws-jsonrpc");
/**
 * Implementation of languages contribution system of the plugin API.
 * It allows to register new language contribution in main side and to start language server.
 */
var LanguagesContributionExtImpl = /** @class */ (function () {
    function LanguagesContributionExtImpl(rpc, connectionExt) {
        this.connectionExt = connectionExt;
        this.serverConnections = new Map();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.LANGUAGES_CONTRIBUTION_MAIN);
    }
    /**
     * Says main side to register new language server.
     *
     * @param languageServerInfo information about new language server contribution
     */
    LanguagesContributionExtImpl.prototype.registerLanguageServerProvider = function (languageServerInfo) {
        var _this = this;
        this.proxy.$registerLanguageServerProvider(languageServerInfo);
        return types_impl_1.Disposable.create(function () {
            _this.stop(languageServerInfo.id);
        });
    };
    /**
     * Stops the language server.
     *
     * @param id language server's id
     */
    LanguagesContributionExtImpl.prototype.stop = function (id) {
        var connection = this.serverConnections.get(id);
        if (!connection) {
            return;
        }
        connection.dispose();
        this.serverConnections.delete(id);
        this.proxy.$stop(id);
    };
    /**
     * Starts language server.
     *
     * @param languageContribution is information about language server contribution
     */
    LanguagesContributionExtImpl.prototype.$start = function (languageServerInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var clientConnection, childProcess, serverConnection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connectionExt.ensureConnection(languageServerInfo.id)];
                    case 1:
                        clientConnection = _a.sent();
                        if (!languageServerInfo.command) {
                            throw new Error('The command to start language server has to be set');
                        }
                        childProcess = this.spawnProcess(languageServerInfo.command, languageServerInfo.args);
                        serverConnection = createConnection(childProcess);
                        this.serverConnections.set(languageServerInfo.id, serverConnection);
                        clientConnection.forward(serverConnection, this.map.bind(this));
                        serverConnection.forward(clientConnection, this.map.bind(this));
                        return [2 /*return*/];
                }
            });
        });
    };
    LanguagesContributionExtImpl.prototype.spawnProcess = function (command, args, options) {
        return child_process_1.spawn(command, args, options);
    };
    LanguagesContributionExtImpl.prototype.map = function (message) {
        if (vscode_ws_jsonrpc_1.isRequestMessage(message)) {
            if (message.method === vscode_languageserver_protocol_1.InitializeRequest.type.method) {
                var initializeParams = message.params;
                initializeParams.processId = process.pid;
            }
        }
        return message;
    };
    return LanguagesContributionExtImpl;
}());
exports.LanguagesContributionExtImpl = LanguagesContributionExtImpl;
function createConnection(childProcess) {
    var reader = new vscode_jsonrpc_1.StreamMessageReader(childProcess.stdout);
    var writer = new vscode_jsonrpc_1.StreamMessageWriter(childProcess.stdin);
    return {
        reader: reader, writer: writer,
        forward: function (to, map) {
            if (map === void 0) { map = function (message) { return message; }; }
            reader.listen(function (input) {
                var output = map(input);
                to.writer.write(output);
            });
        },
        dispose: function () {
            childProcess.kill();
            reader.dispose();
            writer.dispose();
        }
    };
}
exports.createConnection = createConnection;
//# sourceMappingURL=languages-contribution-ext.js.map