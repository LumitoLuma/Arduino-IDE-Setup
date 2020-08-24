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
exports.SelectionCommandHandler = void 0;
var SelectionCommandHandler = /** @class */ (function () {
    function SelectionCommandHandler(selectionService, toSelection, options) {
        this.selectionService = selectionService;
        this.toSelection = toSelection;
        this.options = options;
    }
    SelectionCommandHandler.prototype.execute = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var selection = this.getSelection.apply(this, __spread(args));
        return selection ? (_a = this.options).execute.apply(_a, __spread([selection], args)) : undefined;
    };
    SelectionCommandHandler.prototype.isVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var selection = this.getSelection.apply(this, __spread(args));
        return !!selection && (!this.options.isVisible || (_a = this.options).isVisible.apply(_a, __spread([selection], args)));
    };
    SelectionCommandHandler.prototype.isEnabled = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var selection = this.getSelection.apply(this, __spread(args));
        return !!selection && (!this.options.isEnabled || (_a = this.options).isEnabled.apply(_a, __spread([selection], args)));
    };
    SelectionCommandHandler.prototype.isMulti = function () {
        return this.options && !!this.options.multi;
    };
    SelectionCommandHandler.prototype.getSelection = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var givenSelection = args.length && this.toSelection(args[0]);
        if (givenSelection) {
            return this.isMulti() ? [givenSelection] : givenSelection;
        }
        var globalSelection = this.getSingleSelection(this.selectionService.selection);
        if (this.isMulti()) {
            return this.getMultiSelection(globalSelection);
        }
        return this.getSingleSelection(globalSelection);
    };
    SelectionCommandHandler.prototype.getSingleSelection = function (arg) {
        var e_1, _a;
        var selection = this.toSelection(arg);
        if (selection) {
            return selection;
        }
        if (Array.isArray(arg)) {
            try {
                for (var arg_1 = __values(arg), arg_1_1 = arg_1.next(); !arg_1_1.done; arg_1_1 = arg_1.next()) {
                    var element = arg_1_1.value;
                    selection = this.toSelection(element);
                    if (selection) {
                        return selection;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (arg_1_1 && !arg_1_1.done && (_a = arg_1.return)) _a.call(arg_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return undefined;
    };
    SelectionCommandHandler.prototype.getMultiSelection = function (arg) {
        var e_2, _a;
        var selection = this.toSelection(arg);
        if (selection) {
            return [selection];
        }
        var result = [];
        if (Array.isArray(arg)) {
            try {
                for (var arg_2 = __values(arg), arg_2_1 = arg_2.next(); !arg_2_1.done; arg_2_1 = arg_2.next()) {
                    var element = arg_2_1.value;
                    selection = this.toSelection(element);
                    if (selection) {
                        result.push(selection);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (arg_2_1 && !arg_2_1.done && (_a = arg_2.return)) _a.call(arg_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return result.length ? result : undefined;
    };
    return SelectionCommandHandler;
}());
exports.SelectionCommandHandler = SelectionCommandHandler;
//# sourceMappingURL=selection-command-handler.js.map