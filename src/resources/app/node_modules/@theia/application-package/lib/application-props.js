"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var NpmRegistryProps;
(function (NpmRegistryProps) {
    NpmRegistryProps.DEFAULT = {
        next: false,
        registry: 'https://registry.npmjs.org/'
    };
})(NpmRegistryProps = exports.NpmRegistryProps || (exports.NpmRegistryProps = {}));
var ApplicationProps;
(function (ApplicationProps) {
    ApplicationProps.DEFAULT = __assign({}, NpmRegistryProps.DEFAULT, { target: 'browser', backend: {
            config: {}
        }, frontend: {
            config: {
                applicationName: 'Theia'
            }
        }, generator: {
            config: {
                preloadTemplate: ''
            }
        } });
})(ApplicationProps = exports.ApplicationProps || (exports.ApplicationProps = {}));
//# sourceMappingURL=application-props.js.map