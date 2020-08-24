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
exports.bindWebviewPreferences = exports.createWebviewPreferences = exports.WebviewPreferences = exports.WebviewConfigSchema = void 0;
var preferences_1 = require("@theia/core/lib/browser/preferences");
exports.WebviewConfigSchema = {
    'type': 'object',
    'properties': {
        'webview.trace': {
            'type': 'string',
            'enum': ['off', 'on', 'verbose'],
            'description': 'Controls communication tracing with webviews.',
            'default': 'off'
        }
    }
};
exports.WebviewPreferences = Symbol('WebviewPreferences');
function createWebviewPreferences(preferences) {
    return preferences_1.createPreferenceProxy(preferences, exports.WebviewConfigSchema);
}
exports.createWebviewPreferences = createWebviewPreferences;
function bindWebviewPreferences(bind) {
    bind(exports.WebviewPreferences).toDynamicValue(function (ctx) {
        var preferences = ctx.container.get(preferences_1.PreferenceService);
        return createWebviewPreferences(preferences);
    });
    bind(preferences_1.PreferenceContribution).toConstantValue({ schema: exports.WebviewConfigSchema });
}
exports.bindWebviewPreferences = bindWebviewPreferences;
//# sourceMappingURL=webview-preferences.js.map