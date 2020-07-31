"use strict";
/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
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
var selection_1 = require("../common/selection");
var uri_1 = require("./uri");
/**
 * @todo Create different classes for single and multi-uris. State can be
 * corrupt if the developer does something like:
 * ```ts
 * new UriAwareCommandHandler<URI[]>(selectionService, handler, { multi: false })
 * ```
 */
var UriAwareCommandHandler = /** @class */ (function () {
    function UriAwareCommandHandler(selectionService, handler, options) {
        this.selectionService = selectionService;
        this.handler = handler;
        this.options = options;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UriAwareCommandHandler.prototype.getUri = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args && args[0] instanceof uri_1.default) {
            // @ts-ignore we want to always return URIs
            return this.isMulti() ? [args[0]] : args[0];
        }
        var selection = this.selectionService.selection;
        if (!this.isMulti()) {
            return selection_1.UriSelection.getUri(selection);
        }
        var uris = selection_1.UriSelection.getUris(selection);
        return uris;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UriAwareCommandHandler.prototype.execute = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var uri = this.getUri.apply(this, __spread(args));
        return uri ? (_a = this.handler).execute.apply(_a, __spread([uri], args)) : undefined;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UriAwareCommandHandler.prototype.isVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var uri = this.getUri.apply(this, __spread(args));
        if (uri) {
            if (this.handler.isVisible) {
                return (_a = this.handler).isVisible.apply(_a, __spread([uri], args));
            }
            return true;
        }
        return false;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UriAwareCommandHandler.prototype.isEnabled = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var uri = this.getUri.apply(this, __spread(args));
        if (uri) {
            if (this.handler.isEnabled) {
                return (_a = this.handler).isEnabled.apply(_a, __spread([uri], args));
            }
            return true;
        }
        return false;
    };
    UriAwareCommandHandler.prototype.isMulti = function () {
        return this.options && !!this.options.multi;
    };
    return UriAwareCommandHandler;
}());
exports.UriAwareCommandHandler = UriAwareCommandHandler;
//# sourceMappingURL=uri-command-handler.js.map