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
exports.DebugAdapterSessionManager = void 0;
var coreutils_1 = require("@phosphor/coreutils");
var inversify_1 = require("inversify");
var debug_service_1 = require("../common/debug-service");
var debug_model_1 = require("../common/debug-model");
/**
 * Debug adapter session manager.
 */
var DebugAdapterSessionManager = /** @class */ (function () {
    function DebugAdapterSessionManager() {
        this.sessions = new Map();
    }
    DebugAdapterSessionManager.prototype.configure = function (service) {
        var _this = this;
        service.wsChannel(debug_service_1.DebugAdapterPath + "/:id", function (_a, channel) {
            var id = _a.id;
            var session = _this.find(id);
            if (!session) {
                channel.close();
                return;
            }
            channel.onClose(function () { return session.stop(); });
            session.start(channel);
        });
    };
    /**
     * Creates a new [debug adapter session](#DebugAdapterSession).
     * @param config The [DebugConfiguration](#DebugConfiguration)
     * @returns The debug adapter session
     */
    DebugAdapterSessionManager.prototype.create = function (config, registry) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionId, communicationProvider, executable, sessionFactory, session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionId = coreutils_1.UUID.uuid4();
                        if (!('debugServer' in config)) return [3 /*break*/, 1];
                        communicationProvider = this.debugAdapterFactory.connect(config.debugServer);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, registry.provideDebugAdapterExecutable(config)];
                    case 2:
                        executable = _a.sent();
                        communicationProvider = this.debugAdapterFactory.start(executable);
                        _a.label = 3;
                    case 3:
                        sessionFactory = registry.debugAdapterSessionFactory(config.type) || this.debugAdapterSessionFactory;
                        session = sessionFactory.get(sessionId, communicationProvider);
                        this.sessions.set(sessionId, session);
                        return [2 /*return*/, session];
                }
            });
        });
    };
    /**
     * Removes [debug adapter session](#DebugAdapterSession) from the list of the instantiated sessions.
     * Is invoked when session is terminated and isn't needed anymore.
     * @param sessionId The session identifier
     */
    DebugAdapterSessionManager.prototype.remove = function (sessionId) {
        this.sessions.delete(sessionId);
    };
    /**
     * Finds the debug adapter session by its id.
     * Returning the value 'undefined' means the session isn't found.
     * @param sessionId The session identifier
     * @returns The debug adapter session
     */
    DebugAdapterSessionManager.prototype.find = function (sessionId) {
        return this.sessions.get(sessionId);
    };
    /**
     * Returns all instantiated debug adapter sessions.
     * @returns An array of debug adapter sessions
     */
    DebugAdapterSessionManager.prototype.getAll = function () {
        return this.sessions.values();
    };
    __decorate([
        inversify_1.inject(debug_model_1.DebugAdapterSessionFactory),
        __metadata("design:type", Object)
    ], DebugAdapterSessionManager.prototype, "debugAdapterSessionFactory", void 0);
    __decorate([
        inversify_1.inject(debug_model_1.DebugAdapterFactory),
        __metadata("design:type", Object)
    ], DebugAdapterSessionManager.prototype, "debugAdapterFactory", void 0);
    DebugAdapterSessionManager = __decorate([
        inversify_1.injectable()
    ], DebugAdapterSessionManager);
    return DebugAdapterSessionManager;
}());
exports.DebugAdapterSessionManager = DebugAdapterSessionManager;
//# sourceMappingURL=debug-adapter-session-manager.js.map