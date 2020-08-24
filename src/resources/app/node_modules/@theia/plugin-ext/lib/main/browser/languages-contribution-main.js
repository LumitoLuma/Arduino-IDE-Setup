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
exports.LanguagesContributionMainImpl = void 0;
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var language_client_services_1 = require("@theia/languages/lib/browser/language-client-services");
var browser_1 = require("@theia/languages/lib/browser");
var core_1 = require("@theia/core");
var browser_2 = require("@theia/workspace/lib/browser");
var browser_3 = require("@theia/core/lib/browser");
var vscode_jsonrpc_1 = require("vscode-jsonrpc");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var disposable_1 = require("@theia/core/lib/common/disposable");
var language_client_contribution_provider_1 = require("./language-provider/language-client-contribution-provider");
/**
 * Implementation of languages contribution system of the plugin API.
 * Uses for registering new language server which was described in the plug-in.
 */
var LanguagesContributionMainImpl = /** @class */ (function () {
    function LanguagesContributionMainImpl(rpc, container, connectionMain) {
        this.rpc = rpc;
        this.container = container;
        this.connectionMain = connectionMain;
        this.toDispose = new disposable_1.DisposableCollection();
        this.languageClientContributionProvider = container.get(language_client_contribution_provider_1.LanguageClientContributionProvider);
    }
    LanguagesContributionMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    /**
     * Creates new client contribution for the language server and register it.
     *
     * @param languageServerInfo an information about the registered language server
     */
    LanguagesContributionMainImpl.prototype.$registerLanguageServerProvider = function (languageServerInfo) {
        var _this = this;
        var newLanguageContribution = new PluginLanguageClientContribution(this.container.get(language_client_services_1.Workspace), this.container.get(language_client_services_1.Languages), this.container.get(browser_1.LanguageClientFactory), this.connectionMain, languageServerInfo, this.rpc);
        newLanguageContribution.messageService = this.container.get(core_1.MessageService);
        newLanguageContribution.registry = this.container.get(core_1.CommandRegistry);
        newLanguageContribution.workspaceService = this.container.get(browser_2.WorkspaceService);
        newLanguageContribution.connectionProvider = this.container.get(browser_3.WebSocketConnectionProvider);
        newLanguageContribution.id = languageServerInfo.id;
        newLanguageContribution.name = languageServerInfo.name;
        newLanguageContribution.contains = languageServerInfo.workspaceContains;
        newLanguageContribution.patterns = languageServerInfo.globPatterns;
        this.languageClientContributionProvider.registerLanguageClientContribution(newLanguageContribution);
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.$stop(languageServerInfo.id); }));
    };
    /**
     * Removes language client contribution from the registry and clear related connections.
     *
     * @param id language server's id
     */
    LanguagesContributionMainImpl.prototype.$stop = function (id) {
        this.languageClientContributionProvider.unregisterLanguageClientContribution(id);
        this.connectionMain.ensureConnection(id).then(function (connection) {
            connection.dispose();
        });
    };
    return LanguagesContributionMainImpl;
}());
exports.LanguagesContributionMainImpl = LanguagesContributionMainImpl;
/**
 * The language client contribution for the language server which was described in the plug-in.
 */
var PluginLanguageClientContribution = /** @class */ (function (_super) {
    __extends(PluginLanguageClientContribution, _super);
    function PluginLanguageClientContribution(workspace, languages, languageClientFactory, connectionMain, languageContribution, rpc) {
        var _this = _super.call(this, workspace, languages, languageClientFactory) || this;
        _this.workspace = workspace;
        _this.languages = languages;
        _this.languageClientFactory = languageClientFactory;
        _this.connectionMain = connectionMain;
        _this.languageContribution = languageContribution;
        _this.rpc = rpc;
        return _this;
    }
    Object.defineProperty(PluginLanguageClientContribution.prototype, "globPatterns", {
        get: function () {
            return this.patterns ? this.patterns : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginLanguageClientContribution.prototype, "workspaceContains", {
        get: function () {
            return this.contains ? this.contains : [];
        },
        enumerable: false,
        configurable: true
    });
    PluginLanguageClientContribution.prototype.doActivate = function (toDeactivate) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, messageConnection, proxy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connectionMain.ensureConnection(this.id)];
                    case 1:
                        connection = _a.sent();
                        messageConnection = vscode_jsonrpc_1.createMessageConnection(connection.reader, connection.writer);
                        this.deferredConnection.resolve(messageConnection);
                        messageConnection.onDispose(function () { return _this.deferredConnection = new promise_util_1.Deferred(); });
                        if (toDeactivate.disposed) {
                            messageConnection.dispose();
                            return [2 /*return*/];
                        }
                        proxy = this.rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.LANGUAGES_CONTRIBUTION_EXT);
                        // Asks the plugin to start the process of language server.
                        proxy.$start(this.languageContribution);
                        toDeactivate.push(disposable_1.Disposable.create(function () { return _this.stop = (function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 3, , 4]);
                                        // avoid calling stop if start failed
                                        return [4 /*yield*/, this._languageClient.onReady()];
                                    case 1:
                                        // avoid calling stop if start failed
                                        _b.sent();
                                        // remove all listeners
                                        return [4 /*yield*/, this._languageClient.stop()];
                                    case 2:
                                        // remove all listeners
                                        _b.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _a = _b.sent();
                                        // if start or stop failed make sure the the connection is closed
                                        messageConnection.dispose();
                                        connection.dispose();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })(); }));
                        toDeactivate.push(messageConnection.onClose(function () { return _this.restart(); }));
                        this.onWillStart(this._languageClient);
                        this._languageClient.start();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PluginLanguageClientContribution;
}(browser_1.BaseLanguageClientContribution));
//# sourceMappingURL=languages-contribution-main.js.map