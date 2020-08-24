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
exports.LanguageClientContributionProviderImpl = void 0;
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var disposable_1 = require("@theia/core/lib/common/disposable");
var browser_1 = require("@theia/core/lib/browser");
var logger_1 = require("@theia/core/lib/common/logger");
var browser_2 = require("@theia/languages/lib/browser");
var LanguageClientContributionProviderImpl = /** @class */ (function () {
    function LanguageClientContributionProviderImpl() {
        this.languageClientContributors = new Map();
    }
    LanguageClientContributionProviderImpl.prototype.collectContributions = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.contributions.getContributions()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var contribution = _c.value;
                this.languageClientContributors.set(contribution.id, contribution);
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
    LanguageClientContributionProviderImpl.prototype.getLanguageClientContributions = function () {
        return this.languageClientContributors.values();
    };
    LanguageClientContributionProviderImpl.prototype.registerLanguageClientContribution = function (clientContribution) {
        var _this = this;
        var id = clientContribution.id;
        if (this.languageClientContributors.has(id)) {
            this.logger.warn("The language contribution with type '" + id + "' was already registered.");
            return disposable_1.Disposable.NULL;
        }
        this.languageClientContributors.set(clientContribution.id, clientContribution);
        clientContribution.waitForActivation(this.app).then(function () {
            return clientContribution.activate(_this.app);
        });
        this.logger.info("The language contribution with type '" + id + "' was activated.");
        return disposable_1.Disposable.create(function () { return _this.unregisterLanguageClientContribution(id); });
    };
    LanguageClientContributionProviderImpl.prototype.unregisterLanguageClientContribution = function (id) {
        var contribution = this.languageClientContributors.get(id);
        if (!contribution) {
            return;
        }
        contribution.deactivate();
        this.languageClientContributors.delete(id);
        this.logger.info("The language contribution with type '" + id + "' was deactivated.");
    };
    __decorate([
        inversify_1.inject(browser_1.FrontendApplication),
        __metadata("design:type", browser_1.FrontendApplication)
    ], LanguageClientContributionProviderImpl.prototype, "app", void 0);
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], LanguageClientContributionProviderImpl.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(common_1.ContributionProvider),
        inversify_1.named(browser_2.LanguageClientContribution),
        __metadata("design:type", Object)
    ], LanguageClientContributionProviderImpl.prototype, "contributions", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LanguageClientContributionProviderImpl.prototype, "collectContributions", null);
    LanguageClientContributionProviderImpl = __decorate([
        inversify_1.injectable()
    ], LanguageClientContributionProviderImpl);
    return LanguageClientContributionProviderImpl;
}());
exports.LanguageClientContributionProviderImpl = LanguageClientContributionProviderImpl;
//# sourceMappingURL=language-client-contribution-provider-impl.js.map