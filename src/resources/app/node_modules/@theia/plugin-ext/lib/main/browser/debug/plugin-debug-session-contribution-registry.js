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
exports.PluginDebugSessionContributionRegistry = void 0;
var debug_session_contribution_1 = require("@theia/debug/lib/browser/debug-session-contribution");
var inversify_1 = require("inversify");
var contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
var disposable_1 = require("@theia/core/lib/common/disposable");
/**
 * Plugin debug session contribution registry implementation with functionality
 * to register / unregister plugin contributions.
 */
var PluginDebugSessionContributionRegistry = /** @class */ (function () {
    function PluginDebugSessionContributionRegistry() {
        this.contribs = new Map();
    }
    PluginDebugSessionContributionRegistry.prototype.init = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.contributions.getContributions()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var contrib = _c.value;
                this.contribs.set(contrib.debugType, contrib);
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
    PluginDebugSessionContributionRegistry.prototype.get = function (debugType) {
        return this.contribs.get(debugType);
    };
    PluginDebugSessionContributionRegistry.prototype.registerDebugSessionContribution = function (contrib) {
        var _this = this;
        var debugType = contrib.debugType;
        if (this.contribs.has(debugType)) {
            console.warn("Debug session contribution already registered for " + debugType);
            return disposable_1.Disposable.NULL;
        }
        this.contribs.set(debugType, contrib);
        return disposable_1.Disposable.create(function () { return _this.unregisterDebugSessionContribution(debugType); });
    };
    PluginDebugSessionContributionRegistry.prototype.unregisterDebugSessionContribution = function (debugType) {
        this.contribs.delete(debugType);
    };
    __decorate([
        inversify_1.inject(contribution_provider_1.ContributionProvider),
        inversify_1.named(debug_session_contribution_1.DebugSessionContribution),
        __metadata("design:type", Object)
    ], PluginDebugSessionContributionRegistry.prototype, "contributions", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PluginDebugSessionContributionRegistry.prototype, "init", null);
    PluginDebugSessionContributionRegistry = __decorate([
        inversify_1.injectable()
    ], PluginDebugSessionContributionRegistry);
    return PluginDebugSessionContributionRegistry;
}());
exports.PluginDebugSessionContributionRegistry = PluginDebugSessionContributionRegistry;
//# sourceMappingURL=plugin-debug-session-contribution-registry.js.map