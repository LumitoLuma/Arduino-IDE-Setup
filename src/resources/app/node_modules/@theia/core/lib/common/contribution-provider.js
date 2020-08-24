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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindContributionProvider = exports.Bindable = exports.ContributionProvider = void 0;
exports.ContributionProvider = Symbol('ContributionProvider');
var ContainerBasedContributionProvider = /** @class */ (function () {
    function ContainerBasedContributionProvider(serviceIdentifier, container) {
        this.serviceIdentifier = serviceIdentifier;
        this.container = container;
    }
    ContainerBasedContributionProvider.prototype.getContributions = function (recursive) {
        if (this.services === undefined) {
            var currentServices = [];
            var currentContainer = this.container;
            // eslint-disable-next-line no-null/no-null
            while (currentContainer !== null) {
                if (currentContainer.isBound(this.serviceIdentifier)) {
                    try {
                        currentServices.push.apply(currentServices, __spread(currentContainer.getAll(this.serviceIdentifier)));
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
                // eslint-disable-next-line no-null/no-null
                currentContainer = recursive === true ? currentContainer.parent : null;
            }
            this.services = currentServices;
        }
        return this.services;
    };
    return ContainerBasedContributionProvider;
}());
var Bindable;
(function (Bindable) {
    function isContainer(arg) {
        return typeof arg !== 'function'
            // https://github.com/eclipse-theia/theia/issues/3204#issue-371029654
            // In InversifyJS `4.14.0` containers no longer have a property `guid`.
            && ('guid' in arg || 'parent' in arg);
    }
    Bindable.isContainer = isContainer;
})(Bindable = exports.Bindable || (exports.Bindable = {}));
function bindContributionProvider(bindable, id) {
    var bindingToSyntax = (Bindable.isContainer(bindable) ? bindable.bind(exports.ContributionProvider) : bindable(exports.ContributionProvider));
    bindingToSyntax
        .toDynamicValue(function (ctx) { return new ContainerBasedContributionProvider(id, ctx.container); })
        .inSingletonScope().whenTargetNamed(id);
}
exports.bindContributionProvider = bindContributionProvider;
//# sourceMappingURL=contribution-provider.js.map