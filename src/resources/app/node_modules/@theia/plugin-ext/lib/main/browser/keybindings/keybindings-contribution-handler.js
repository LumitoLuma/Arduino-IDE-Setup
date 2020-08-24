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
exports.KeybindingsContributionPointHandler = void 0;
var inversify_1 = require("inversify");
var keybinding_1 = require("@theia/core/lib/browser/keybinding");
var os_1 = require("@theia/core/lib/common/os");
var disposable_1 = require("@theia/core/lib/common/disposable");
var core_1 = require("@theia/core");
var KeybindingsContributionPointHandler = /** @class */ (function () {
    function KeybindingsContributionPointHandler() {
    }
    KeybindingsContributionPointHandler.prototype.handle = function (contributions) {
        var e_1, _a;
        if (!contributions || !contributions.keybindings) {
            return disposable_1.Disposable.NULL;
        }
        var toDispose = new core_1.DisposableCollection();
        try {
            for (var _b = __values(contributions.keybindings), _c = _b.next(); !_c.done; _c = _b.next()) {
                var raw = _c.value;
                var keybinding = this.toKeybinding(raw);
                if (keybinding) {
                    toDispose.push(this.keybindingRegistry.registerKeybinding(keybinding));
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
        return toDispose;
    };
    KeybindingsContributionPointHandler.prototype.toKeybinding = function (pluginKeybinding) {
        var keybinding = this.toOSKeybinding(pluginKeybinding);
        if (!keybinding) {
            return undefined;
        }
        var command = pluginKeybinding.command, when = pluginKeybinding.when;
        return { keybinding: keybinding, command: command, when: when };
    };
    KeybindingsContributionPointHandler.prototype.toOSKeybinding = function (pluginKeybinding) {
        var keybinding;
        var os = os_1.OS.type();
        if (os === os_1.OS.Type.Windows) {
            keybinding = pluginKeybinding.win;
        }
        else if (os === os_1.OS.Type.OSX) {
            keybinding = pluginKeybinding.mac;
        }
        else {
            keybinding = pluginKeybinding.linux;
        }
        return keybinding || pluginKeybinding.keybinding;
    };
    __decorate([
        inversify_1.inject(keybinding_1.KeybindingRegistry),
        __metadata("design:type", keybinding_1.KeybindingRegistry)
    ], KeybindingsContributionPointHandler.prototype, "keybindingRegistry", void 0);
    KeybindingsContributionPointHandler = __decorate([
        inversify_1.injectable()
    ], KeybindingsContributionPointHandler);
    return KeybindingsContributionPointHandler;
}());
exports.KeybindingsContributionPointHandler = KeybindingsContributionPointHandler;
//# sourceMappingURL=keybindings-contribution-handler.js.map