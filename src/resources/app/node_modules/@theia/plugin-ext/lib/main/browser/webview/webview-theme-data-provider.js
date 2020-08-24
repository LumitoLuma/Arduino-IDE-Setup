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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// copied and modified from https://github.com/microsoft/vscode/blob/ba40bd16433d5a817bfae15f3b4350e18f144af4/src/vs/workbench/contrib/webview/common/themeing.ts
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
exports.WebviewThemeDataProvider = void 0;
var inversify_1 = require("inversify");
var event_1 = require("@theia/core/lib/common/event");
var editor_preferences_1 = require("@theia/editor/lib/browser/editor-preferences");
var theming_1 = require("@theia/core/lib/browser/theming");
var color_registry_1 = require("@theia/core/lib/browser/color-registry");
var color_application_contribution_1 = require("@theia/core/lib/browser/color-application-contribution");
var WebviewThemeDataProvider = /** @class */ (function () {
    function WebviewThemeDataProvider() {
        this.onDidChangeThemeDataEmitter = new event_1.Emitter();
        this.onDidChangeThemeData = this.onDidChangeThemeDataEmitter.event;
        this.editorStyles = new Map([
            ['editor.fontFamily', 'editor-font-family'],
            ['editor.fontWeight', 'editor-font-weight'],
            ['editor.fontSize', 'editor-font-size']
        ]);
    }
    WebviewThemeDataProvider.prototype.init = function () {
        var _this = this;
        this.colorContribution.onDidChange(function () { return _this.reset(); });
        this.editorPreferences.onPreferenceChanged(function (e) {
            if (_this.editorStyles.has(e.preferenceName)) {
                _this.reset();
            }
        });
    };
    WebviewThemeDataProvider.prototype.reset = function () {
        if (this.themeData) {
            this.themeData = undefined;
            this.onDidChangeThemeDataEmitter.fire(undefined);
        }
    };
    WebviewThemeDataProvider.prototype.getThemeData = function () {
        if (!this.themeData) {
            this.themeData = this.computeThemeData();
        }
        return this.themeData;
    };
    WebviewThemeDataProvider.prototype.computeThemeData = function () {
        var e_1, _a;
        var _this = this;
        var styles = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var addStyle = function (id, rawValue) {
            if (rawValue) {
                var value = typeof rawValue === 'number' || typeof rawValue === 'string' ? rawValue : String(rawValue);
                styles[_this.colors.toCssVariableName(id).substr(2)] = value;
                styles[_this.colors.toCssVariableName(id, 'vscode').substr(2)] = value;
            }
        };
        addStyle('font-family', '-apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "Ubuntu", "Droid Sans", sans-serif');
        addStyle('font-weight', 'normal');
        addStyle('font-size', '13px');
        this.editorStyles.forEach(function (value, key) { return addStyle(value, _this.editorPreferences[key]); });
        try {
            for (var _b = __values(this.colors.getColors()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                var color = this.colors.getCurrentColor(id);
                if (color) {
                    addStyle(id, color.toString());
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var activeTheme = this.getActiveTheme();
        return { styles: styles, activeTheme: activeTheme };
    };
    WebviewThemeDataProvider.prototype.getActiveTheme = function () {
        var theme = theming_1.ThemeService.get().getCurrentTheme();
        switch (theme.type) {
            case 'light': return 'vscode-light';
            case 'dark': return 'vscode-dark';
            default: return 'vscode-high-contrast';
        }
    };
    __decorate([
        inversify_1.inject(editor_preferences_1.EditorPreferences),
        __metadata("design:type", Object)
    ], WebviewThemeDataProvider.prototype, "editorPreferences", void 0);
    __decorate([
        inversify_1.inject(color_registry_1.ColorRegistry),
        __metadata("design:type", color_registry_1.ColorRegistry)
    ], WebviewThemeDataProvider.prototype, "colors", void 0);
    __decorate([
        inversify_1.inject(color_application_contribution_1.ColorApplicationContribution),
        __metadata("design:type", color_application_contribution_1.ColorApplicationContribution)
    ], WebviewThemeDataProvider.prototype, "colorContribution", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], WebviewThemeDataProvider.prototype, "init", null);
    WebviewThemeDataProvider = __decorate([
        inversify_1.injectable()
    ], WebviewThemeDataProvider);
    return WebviewThemeDataProvider;
}());
exports.WebviewThemeDataProvider = WebviewThemeDataProvider;
//# sourceMappingURL=webview-theme-data-provider.js.map