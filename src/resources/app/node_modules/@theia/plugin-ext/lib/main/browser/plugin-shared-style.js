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
exports.PluginSharedStyle = void 0;
var inversify_1 = require("inversify");
var disposable_1 = require("@theia/core/lib/common/disposable");
var theming_1 = require("@theia/core/lib/browser/theming");
var reference_1 = require("@theia/core/lib/common/reference");
var endpoint_1 = require("@theia/core/lib/browser/endpoint");
var PluginSharedStyle = /** @class */ (function () {
    function PluginSharedStyle() {
        var _this = this;
        this.rules = [];
        this.toUpdate = new disposable_1.DisposableCollection();
        this.icons = new reference_1.SyncReferenceCollection(function (key) { return _this.createPluginIcon(key); });
        this.iconSequence = 0;
        this.update();
        theming_1.ThemeService.get().onThemeChange(function () { return _this.update(); });
    }
    PluginSharedStyle_1 = PluginSharedStyle;
    PluginSharedStyle.prototype.update = function () {
        var e_1, _a;
        this.toUpdate.dispose();
        var style = this.style = document.createElement('style');
        style.type = 'text/css';
        style.media = 'screen';
        document.getElementsByTagName('head')[0].appendChild(style);
        this.toUpdate.push(disposable_1.Disposable.create(function () {
            return document.getElementsByTagName('head')[0].removeChild(style);
        }));
        try {
            for (var _b = __values(this.rules), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rule = _c.value;
                this.doInsertRule(rule);
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
    PluginSharedStyle.prototype.insertRule = function (selector, body) {
        var _this = this;
        var rule = { selector: selector, body: body };
        this.rules.push(rule);
        this.doInsertRule(rule);
        return disposable_1.Disposable.create(function () {
            var index = _this.rules.indexOf(rule);
            if (index !== -1) {
                _this.rules.splice(index, 1);
                _this.deleteRule(selector);
            }
        });
    };
    PluginSharedStyle.prototype.doInsertRule = function (_a) {
        var selector = _a.selector, body = _a.body;
        var sheet = this.style.sheet;
        var cssBody = body(theming_1.ThemeService.get().getCurrentTheme());
        sheet.insertRule(selector + ' {\n' + cssBody + '\n}', 0);
    };
    PluginSharedStyle.prototype.deleteRule = function (selector) {
        var sheet = this.style.sheet;
        var rules = sheet.rules || sheet.cssRules || [];
        for (var i = rules.length - 1; i >= 0; i--) {
            var rule = rules[i];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (rule.selectorText.indexOf(selector) !== -1) {
                sheet.deleteRule(i);
            }
        }
    };
    PluginSharedStyle.prototype.toIconClass = function (url, _a) {
        var size = (_a === void 0 ? { size: 16 } : _a).size;
        return this.icons.acquire({ url: url, size: size });
    };
    PluginSharedStyle.prototype.createPluginIcon = function (key) {
        var iconUrl = key.url;
        var size = key.size;
        var darkIconUrl = PluginSharedStyle_1.toExternalIconUrl("" + (typeof iconUrl === 'object' ? iconUrl.dark : iconUrl));
        var lightIconUrl = PluginSharedStyle_1.toExternalIconUrl("" + (typeof iconUrl === 'object' ? iconUrl.light : iconUrl));
        var iconClass = 'plugin-icon-' + this.iconSequence++;
        var toDispose = new disposable_1.DisposableCollection();
        toDispose.push(this.insertRule('.' + iconClass, function (theme) { return "\n                display: inline-block;\n                background-position: 2px;\n                width: " + size + "px;\n                height: " + size + "px;\n                background: no-repeat url(\"" + (theme.type === 'light' ? lightIconUrl : darkIconUrl) + "\");\n                background-size: " + size + "px;\n            "; }));
        return {
            iconClass: iconClass,
            dispose: function () { return toDispose.dispose(); }
        };
    };
    PluginSharedStyle.toExternalIconUrl = function (iconUrl) {
        if (iconUrl.startsWith('hostedPlugin/')) {
            return new endpoint_1.Endpoint({ path: iconUrl }).getRestUrl().toString();
        }
        return iconUrl;
    };
    var PluginSharedStyle_1;
    PluginSharedStyle = PluginSharedStyle_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], PluginSharedStyle);
    return PluginSharedStyle;
}());
exports.PluginSharedStyle = PluginSharedStyle;
//# sourceMappingURL=plugin-shared-style.js.map