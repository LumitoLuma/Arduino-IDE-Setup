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
exports.WorkspaceSymbolAdapter = void 0;
var Converter = require("../type-converters");
var WorkspaceSymbolAdapter = /** @class */ (function () {
    function WorkspaceSymbolAdapter(provider) {
        this.provider = provider;
    }
    WorkspaceSymbolAdapter.prototype.provideWorkspaceSymbols = function (query, token) {
        return Promise.resolve(this.provider.provideWorkspaceSymbols(query, token)).then(function (workspaceSymbols) {
            var e_1, _a;
            if (!workspaceSymbols) {
                return [];
            }
            var newSymbols = [];
            try {
                for (var workspaceSymbols_1 = __values(workspaceSymbols), workspaceSymbols_1_1 = workspaceSymbols_1.next(); !workspaceSymbols_1_1.done; workspaceSymbols_1_1 = workspaceSymbols_1.next()) {
                    var sym = workspaceSymbols_1_1.value;
                    var convertedSymbol = Converter.fromSymbolInformation(sym);
                    if (convertedSymbol) {
                        newSymbols.push(convertedSymbol);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (workspaceSymbols_1_1 && !workspaceSymbols_1_1.done && (_a = workspaceSymbols_1.return)) _a.call(workspaceSymbols_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return newSymbols;
        });
    };
    WorkspaceSymbolAdapter.prototype.resolveWorkspaceSymbol = function (symbol, token) {
        if (this.provider.resolveWorkspaceSymbol && typeof this.provider.resolveWorkspaceSymbol === 'function') {
            var theiaSymbol = Converter.toSymbolInformation(symbol);
            if (!theiaSymbol) {
                return Promise.resolve(symbol);
            }
            else {
                return Promise.resolve(this.provider.resolveWorkspaceSymbol(theiaSymbol, token)).then(function (workspaceSymbol) {
                    if (!workspaceSymbol) {
                        return symbol;
                    }
                    var converted = Converter.fromSymbolInformation(workspaceSymbol);
                    if (converted) {
                        return converted;
                    }
                    return symbol;
                });
            }
        }
        return Promise.resolve(symbol);
    };
    return WorkspaceSymbolAdapter;
}());
exports.WorkspaceSymbolAdapter = WorkspaceSymbolAdapter;
//# sourceMappingURL=workspace-symbol.js.map