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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var messaging_1 = require("../../common/messaging");
var keyboard_layout_provider_1 = require("../../common/keyboard/keyboard-layout-provider");
var electron_keyboard_layout_provider_1 = require("./electron-keyboard-layout-provider");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(electron_keyboard_layout_provider_1.ElectronKeyboardLayoutProvider).toSelf().inSingletonScope();
    bind(keyboard_layout_provider_1.KeyboardLayoutProvider).toService(electron_keyboard_layout_provider_1.ElectronKeyboardLayoutProvider);
    bind(messaging_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new messaging_1.JsonRpcConnectionHandler(keyboard_layout_provider_1.keyboardPath, function () {
            return ctx.container.get(keyboard_layout_provider_1.KeyboardLayoutProvider);
        });
    }).inSingletonScope();
});
//# sourceMappingURL=electron-backend-keyboard-module.js.map