"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
exports.QuickOpenOptions = exports.QuickOpenHideReason = void 0;
var QuickOpenHideReason;
(function (QuickOpenHideReason) {
    QuickOpenHideReason[QuickOpenHideReason["ELEMENT_SELECTED"] = 0] = "ELEMENT_SELECTED";
    QuickOpenHideReason[QuickOpenHideReason["FOCUS_LOST"] = 1] = "FOCUS_LOST";
    QuickOpenHideReason[QuickOpenHideReason["CANCELED"] = 2] = "CANCELED";
})(QuickOpenHideReason = exports.QuickOpenHideReason || (exports.QuickOpenHideReason = {}));
var QuickOpenOptions;
(function (QuickOpenOptions) {
    QuickOpenOptions.defaultOptions = Object.freeze({
        enabled: true,
        trimInput: true,
        prefix: '',
        placeholder: '',
        ignoreFocusOut: false,
        valueSelection: [-1, -1],
        fuzzyMatchLabel: false,
        fuzzyMatchDetail: false,
        fuzzyMatchDescription: false,
        fuzzySort: false,
        skipPrefix: 0,
        showItemsWithoutHighlight: false,
        password: false,
        onClose: function () { },
        selectIndex: function () { return -1; }
    });
    function resolve(options, source) {
        if (options === void 0) { options = {}; }
        if (source === void 0) { source = QuickOpenOptions.defaultOptions; }
        return Object.assign({}, source, options);
    }
    QuickOpenOptions.resolve = resolve;
})(QuickOpenOptions = exports.QuickOpenOptions || (exports.QuickOpenOptions = {}));
//# sourceMappingURL=quick-open-service.js.map