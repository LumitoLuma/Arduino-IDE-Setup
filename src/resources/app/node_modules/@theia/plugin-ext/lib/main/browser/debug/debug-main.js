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
exports.DebugMainImpl = void 0;
var plugin_api_rpc_1 = require("../../../common/plugin-api-rpc");
var debug_session_manager_1 = require("@theia/debug/lib/browser/debug-session-manager");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/editor/lib/browser");
var breakpoint_manager_1 = require("@theia/debug/lib/browser/breakpoint/breakpoint-manager");
var debug_source_breakpoint_1 = require("@theia/debug/lib/browser/model/debug-source-breakpoint");
var vscode_uri_1 = require("vscode-uri");
var debug_console_session_1 = require("@theia/debug/lib/browser/console/debug-console-session");
var debug_configuration_manager_1 = require("@theia/debug/lib/browser/debug-configuration-manager");
var terminal_service_1 = require("@theia/terminal/lib/browser/base/terminal-service");
var message_service_protocol_1 = require("@theia/core/lib/common/message-service-protocol");
var output_channel_1 = require("@theia/output/lib/common/output-channel");
var debug_preferences_1 = require("@theia/debug/lib/browser/debug-preferences");
var plugin_debug_adapter_contribution_1 = require("./plugin-debug-adapter-contribution");
var plugin_debug_session_contribution_registry_1 = require("./plugin-debug-session-contribution-registry");
var disposable_1 = require("@theia/core/lib/common/disposable");
var plugin_debug_session_factory_1 = require("./plugin-debug-session-factory");
var connection_1 = require("../../../common/connection");
var plugin_debug_service_1 = require("./plugin-debug-service");
var common_1 = require("@theia/filesystem/lib/common");
var hosted_plugin_1 = require("../../../hosted/browser/hosted-plugin");
var debug_function_breakpoint_1 = require("@theia/debug/lib/browser/model/debug-function-breakpoint");
var DebugMainImpl = /** @class */ (function () {
    function DebugMainImpl(rpc, connectionMain, container) {
        var _this = this;
        this.connectionMain = connectionMain;
        this.debuggerContributions = new Map();
        this.toDispose = new disposable_1.DisposableCollection();
        this.debugExt = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.DEBUG_EXT);
        this.sessionManager = container.get(debug_session_manager_1.DebugSessionManager);
        this.labelProvider = container.get(browser_1.LabelProvider);
        this.editorManager = container.get(browser_2.EditorManager);
        this.breakpointsManager = container.get(breakpoint_manager_1.BreakpointManager);
        this.debugConsoleSession = container.get(debug_console_session_1.DebugConsoleSession);
        this.configurationManager = container.get(debug_configuration_manager_1.DebugConfigurationManager);
        this.terminalService = container.get(terminal_service_1.TerminalService);
        this.messages = container.get(message_service_protocol_1.MessageClient);
        this.outputChannelManager = container.get(output_channel_1.OutputChannelManager);
        this.debugPreferences = container.get(debug_preferences_1.DebugPreferences);
        this.adapterContributionRegistrator = container.get(plugin_debug_service_1.PluginDebugService);
        this.sessionContributionRegistrator = container.get(plugin_debug_session_contribution_registry_1.PluginDebugSessionContributionRegistry);
        this.fileSystem = container.get(common_1.FileSystem);
        this.pluginService = container.get(hosted_plugin_1.HostedPluginSupport);
        var fireDidChangeBreakpoints = function (_a) {
            var added = _a.added, removed = _a.removed, changed = _a.changed;
            _this.debugExt.$breakpointsDidChange(_this.toTheiaPluginApiBreakpoints(added), removed.map(function (b) { return b.id; }), _this.toTheiaPluginApiBreakpoints(changed));
        };
        this.debugExt.$breakpointsDidChange(this.toTheiaPluginApiBreakpoints(this.breakpointsManager.getBreakpoints()), [], []);
        this.debugExt.$breakpointsDidChange(this.toTheiaPluginApiBreakpoints(this.breakpointsManager.getFunctionBreakpoints()), [], []);
        this.toDispose.pushAll([
            this.breakpointsManager.onDidChangeBreakpoints(fireDidChangeBreakpoints),
            this.breakpointsManager.onDidChangeFunctionBreakpoints(fireDidChangeBreakpoints),
            this.sessionManager.onDidCreateDebugSession(function (debugSession) { return _this.debugExt.$sessionDidCreate(debugSession.id); }),
            this.sessionManager.onDidDestroyDebugSession(function (debugSession) { return _this.debugExt.$sessionDidDestroy(debugSession.id); }),
            this.sessionManager.onDidChangeActiveDebugSession(function (event) { return _this.debugExt.$sessionDidChange(event.current && event.current.id); }),
            this.sessionManager.onDidReceiveDebugSessionCustomEvent(function (event) { return _this.debugExt.$onSessionCustomEvent(event.session.id, event.event, event.body); })
        ]);
    }
    DebugMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    DebugMainImpl.prototype.$appendToDebugConsole = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.debugConsoleSession.append(value);
                return [2 /*return*/];
            });
        });
    };
    DebugMainImpl.prototype.$appendLineToDebugConsole = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.debugConsoleSession.appendLine(value);
                return [2 /*return*/];
            });
        });
    };
    DebugMainImpl.prototype.$registerDebuggerContribution = function (description) {
        return __awaiter(this, void 0, void 0, function () {
            var debugType, terminalOptionsExt, debugSessionFactory, toDispose;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugType = description.type;
                        return [4 /*yield*/, this.debugExt.$getTerminalCreationOptions(debugType)];
                    case 1:
                        terminalOptionsExt = _a.sent();
                        if (this.toDispose.disposed) {
                            return [2 /*return*/];
                        }
                        debugSessionFactory = new plugin_debug_session_factory_1.PluginDebugSessionFactory(this.terminalService, this.editorManager, this.breakpointsManager, this.labelProvider, this.messages, this.outputChannelManager, this.debugPreferences, function (sessionId) { return __awaiter(_this, void 0, void 0, function () {
                            var connection;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.connectionMain.ensureConnection(sessionId)];
                                    case 1:
                                        connection = _a.sent();
                                        return [2 /*return*/, new connection_1.PluginWebSocketChannel(connection)];
                                }
                            });
                        }); }, this.fileSystem, terminalOptionsExt);
                        toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { return _this.debuggerContributions.delete(debugType); }));
                        this.debuggerContributions.set(debugType, toDispose);
                        toDispose.pushAll([
                            this.adapterContributionRegistrator.registerDebugAdapterContribution(new plugin_debug_adapter_contribution_1.PluginDebugAdapterContribution(description, this.debugExt, this.pluginService)),
                            this.sessionContributionRegistrator.registerDebugSessionContribution({
                                debugType: description.type,
                                debugSessionFactory: function () { return debugSessionFactory; }
                            })
                        ]);
                        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.$unregisterDebuggerConfiguration(debugType); }));
                        return [2 /*return*/];
                }
            });
        });
    };
    DebugMainImpl.prototype.$unregisterDebuggerConfiguration = function (debugType) {
        return __awaiter(this, void 0, void 0, function () {
            var disposable;
            return __generator(this, function (_a) {
                disposable = this.debuggerContributions.get(debugType);
                if (disposable) {
                    disposable.dispose();
                }
                return [2 /*return*/];
            });
        });
    };
    DebugMainImpl.prototype.$addBreakpoints = function (breakpoints) {
        return __awaiter(this, void 0, void 0, function () {
            var newBreakpoints, addedFunctionBreakpoints, functionBreakpoints, functionBreakpoints_1, functionBreakpoints_1_1, breakpoint, _a, _b, breakpoint, location_1, column;
            var e_1, _c, e_2, _d;
            return __generator(this, function (_e) {
                newBreakpoints = new Map();
                breakpoints.forEach(function (b) { return newBreakpoints.set(b.id, b); });
                this.breakpointsManager.findMarkers({
                    dataFilter: function (data) {
                        // install only new breakpoints
                        if (newBreakpoints.has(data.id)) {
                            newBreakpoints.delete(data.id);
                        }
                        return false;
                    }
                });
                addedFunctionBreakpoints = false;
                functionBreakpoints = this.breakpointsManager.getFunctionBreakpoints();
                try {
                    for (functionBreakpoints_1 = __values(functionBreakpoints), functionBreakpoints_1_1 = functionBreakpoints_1.next(); !functionBreakpoints_1_1.done; functionBreakpoints_1_1 = functionBreakpoints_1.next()) {
                        breakpoint = functionBreakpoints_1_1.value;
                        // install only new breakpoints
                        if (newBreakpoints.has(breakpoint.id)) {
                            newBreakpoints.delete(breakpoint.id);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (functionBreakpoints_1_1 && !functionBreakpoints_1_1.done && (_c = functionBreakpoints_1.return)) _c.call(functionBreakpoints_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (_a = __values(newBreakpoints.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        breakpoint = _b.value;
                        if (breakpoint.location) {
                            location_1 = breakpoint.location;
                            column = breakpoint.location.range.startColumn;
                            this.breakpointsManager.addBreakpoint({
                                id: breakpoint.id,
                                uri: vscode_uri_1.URI.revive(location_1.uri).toString(),
                                enabled: breakpoint.enabled,
                                raw: {
                                    line: breakpoint.location.range.startLineNumber + 1,
                                    column: column > 0 ? column + 1 : undefined,
                                    condition: breakpoint.condition,
                                    hitCondition: breakpoint.hitCondition,
                                    logMessage: breakpoint.logMessage
                                }
                            });
                        }
                        else if (breakpoint.functionName) {
                            addedFunctionBreakpoints = true;
                            functionBreakpoints.push({
                                id: breakpoint.id,
                                enabled: breakpoint.enabled,
                                raw: {
                                    name: breakpoint.functionName
                                }
                            });
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                if (addedFunctionBreakpoints) {
                    this.breakpointsManager.setFunctionBreakpoints(functionBreakpoints);
                }
                return [2 /*return*/];
            });
        });
    };
    DebugMainImpl.prototype.$removeBreakpoints = function (breakpoints) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, labelProvider, breakpointsManager, editorManager, session, ids, _b, _c, origin_1, breakpoint, _d, _e, origin_2, breakpoint;
            var e_3, _f, e_4, _g;
            return __generator(this, function (_h) {
                _a = this, labelProvider = _a.labelProvider, breakpointsManager = _a.breakpointsManager, editorManager = _a.editorManager;
                session = this.sessionManager.currentSession;
                ids = new Set(breakpoints);
                try {
                    for (_b = __values(this.breakpointsManager.findMarkers({ dataFilter: function (data) { return ids.has(data.id); } })), _c = _b.next(); !_c.done; _c = _b.next()) {
                        origin_1 = _c.value;
                        breakpoint = new debug_source_breakpoint_1.DebugSourceBreakpoint(origin_1.data, { labelProvider: labelProvider, breakpoints: breakpointsManager, editorManager: editorManager, session: session });
                        breakpoint.remove();
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_f = _b.return)) _f.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                try {
                    for (_d = __values(this.breakpointsManager.getFunctionBreakpoints()), _e = _d.next(); !_e.done; _e = _d.next()) {
                        origin_2 = _e.value;
                        if (ids.has(origin_2.id)) {
                            breakpoint = new debug_function_breakpoint_1.DebugFunctionBreakpoint(origin_2, { labelProvider: labelProvider, breakpoints: breakpointsManager, editorManager: editorManager, session: session });
                            breakpoint.remove();
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_g = _d.return)) _g.call(_d);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return [2 /*return*/];
            });
        });
    };
    DebugMainImpl.prototype.$customRequest = function (sessionId, command, args) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                session = this.sessionManager.getSession(sessionId);
                if (session) {
                    return [2 /*return*/, session.sendCustomRequest(command, args)];
                }
                throw new Error("Debug session '" + sessionId + "' not found");
            });
        });
    };
    DebugMainImpl.prototype.$startDebugging = function (folder, nameOrConfiguration) {
        return __awaiter(this, void 0, void 0, function () {
            var configuration, _a, _b, options, session;
            var e_5, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (typeof nameOrConfiguration === 'string') {
                            try {
                                for (_a = __values(this.configurationManager.all), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    options = _b.value;
                                    if (options.configuration.name === nameOrConfiguration) {
                                        configuration = options.configuration;
                                    }
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                        }
                        else {
                            configuration = nameOrConfiguration;
                        }
                        if (!configuration) {
                            console.error("There is no debug configuration for " + nameOrConfiguration);
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.sessionManager.start({
                                configuration: configuration,
                                workspaceFolderUri: folder && vscode_uri_1.URI.revive(folder.uri).toString()
                            })];
                    case 1:
                        session = _d.sent();
                        return [2 /*return*/, !!session];
                }
            });
        });
    };
    DebugMainImpl.prototype.toTheiaPluginApiBreakpoints = function (breakpoints) {
        var _this = this;
        return breakpoints.map(function (b) { return _this.toTheiaPluginApiBreakpoint(b); });
    };
    DebugMainImpl.prototype.toTheiaPluginApiBreakpoint = function (breakpoint) {
        if ('uri' in breakpoint) {
            var raw = breakpoint.raw;
            return {
                id: breakpoint.id,
                enabled: breakpoint.enabled,
                condition: breakpoint.raw.condition,
                hitCondition: breakpoint.raw.hitCondition,
                logMessage: raw.logMessage,
                location: {
                    uri: vscode_uri_1.URI.parse(breakpoint.uri),
                    range: {
                        startLineNumber: raw.line - 1,
                        startColumn: (raw.column || 1) - 1,
                        endLineNumber: raw.line - 1,
                        endColumn: (raw.column || 1) - 1
                    }
                }
            };
        }
        return {
            id: breakpoint.id,
            enabled: breakpoint.enabled,
            functionName: breakpoint.raw.name
        };
    };
    return DebugMainImpl;
}());
exports.DebugMainImpl = DebugMainImpl;
//# sourceMappingURL=debug-main.js.map