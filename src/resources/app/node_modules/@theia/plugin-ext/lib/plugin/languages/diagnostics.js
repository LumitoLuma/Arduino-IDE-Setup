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
exports.Diagnostics = exports.DiagnosticCollection = void 0;
var event_1 = require("@theia/core/lib/common/event");
var type_converters_1 = require("../type-converters");
var types_impl_1 = require("../types-impl");
var plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
var vscode_uri_1 = require("vscode-uri");
var uuid_1 = require("uuid");
var DiagnosticCollection = /** @class */ (function () {
    function DiagnosticCollection(name, maxCountPerFile, proxy, onDidChangeDiagnosticsEmitter) {
        this.collectionName = name;
        this.diagnosticsLimitPerResource = maxCountPerFile;
        this.proxy = proxy;
        this.onDidChangeDiagnosticsEmitter = onDidChangeDiagnosticsEmitter;
        this.diagnostics = new Map();
        this.isDisposed = false;
        this.onDisposeCallback = undefined;
    }
    Object.defineProperty(DiagnosticCollection.prototype, "name", {
        get: function () {
            return this.collectionName;
        },
        enumerable: false,
        configurable: true
    });
    DiagnosticCollection.prototype.set = function (arg, diagnostics) {
        this.ensureNotDisposed();
        if (arg instanceof vscode_uri_1.URI) {
            this.setDiagnosticsForUri(arg, diagnostics);
        }
        else if (!arg) {
            this.clear();
        }
        else if (arg instanceof Array) {
            this.setDiagnostics(arg);
        }
    };
    DiagnosticCollection.prototype.setDiagnosticsForUri = function (uri, diagnostics) {
        if (!diagnostics) {
            this.diagnostics.delete(uri.toString());
        }
        else {
            this.diagnostics.set(uri.toString(), diagnostics);
        }
        this.fireDiagnosticChangeEvent(uri);
        this.sendChangesToEditor([uri]);
    };
    DiagnosticCollection.prototype.setDiagnostics = function (entries) {
        var e_1, _a, e_2, _b;
        var delta = [];
        try {
            // clear old diagnostics for given resources
            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var _c = __read(entries_1_1.value, 1), uri = _c[0];
                this.diagnostics.delete(uri.toString());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var entries_2 = __values(entries), entries_2_1 = entries_2.next(); !entries_2_1.done; entries_2_1 = entries_2.next()) {
                var _d = __read(entries_2_1.value, 2), uri = _d[0], diagnostics = _d[1];
                var uriString = uri.toString();
                if (!diagnostics) {
                    // clear existed
                    this.diagnostics.delete(uriString);
                    delta.push(uri);
                }
                else {
                    // merge with existed if any
                    var existedDiagnostics = this.diagnostics.get(uriString);
                    if (existedDiagnostics) {
                        existedDiagnostics.push.apply(existedDiagnostics, __spread(diagnostics));
                    }
                    else {
                        this.diagnostics.set(uriString, diagnostics);
                    }
                }
                if (delta.indexOf(uri) === -1) {
                    delta.push(uri);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (entries_2_1 && !entries_2_1.done && (_b = entries_2.return)) _b.call(entries_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.fireDiagnosticChangeEvent(delta);
        this.sendChangesToEditor(delta);
    };
    DiagnosticCollection.prototype.delete = function (uri) {
        if (this.has(uri)) {
            this.fireDiagnosticChangeEvent(uri);
            this.diagnostics.delete(uri.toString());
            this.proxy.$changeDiagnostics(this.name, [[uri.toString(), []]]);
        }
    };
    DiagnosticCollection.prototype.clear = function () {
        this.ensureNotDisposed();
        this.fireDiagnosticChangeEvent(this.getAllResourcesUris());
        this.diagnostics.clear();
        this.proxy.$clearDiagnostics(this.name);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DiagnosticCollection.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this.ensureNotDisposed();
        this.diagnostics.forEach(function (diagnostics, uriString) {
            var uri = vscode_uri_1.URI.parse(uriString);
            callback.apply(thisArg, [uri, _this.getDiagnosticsByUri(uri), _this]);
        });
    };
    DiagnosticCollection.prototype.get = function (uri) {
        this.ensureNotDisposed();
        return this.getDiagnosticsByUri(uri);
    };
    DiagnosticCollection.prototype.has = function (uri) {
        this.ensureNotDisposed();
        return (this.diagnostics.get(uri.toString()) instanceof Array);
    };
    DiagnosticCollection.prototype.dispose = function () {
        if (!this.isDisposed) {
            if (this.onDisposeCallback) {
                this.onDisposeCallback();
            }
            this.clear();
            this.isDisposed = true;
        }
    };
    DiagnosticCollection.prototype.setOnDisposeCallback = function (onDisposeCallback) {
        this.onDisposeCallback = onDisposeCallback;
    };
    DiagnosticCollection.prototype.ensureNotDisposed = function () {
        if (this.isDisposed) {
            throw new Error('Diagnostic collection with name "' + this.name + '" is already disposed.');
        }
    };
    DiagnosticCollection.prototype.getAllResourcesUris = function () {
        var resourcesUris = [];
        this.diagnostics.forEach(function (diagnostics, uri) { return resourcesUris.push(uri); });
        return resourcesUris;
    };
    DiagnosticCollection.prototype.getDiagnosticsByUri = function (uri) {
        var diagnostics = this.diagnostics.get(uri.toString());
        return (diagnostics instanceof Array) ? Object.freeze(diagnostics) : undefined;
    };
    DiagnosticCollection.prototype.fireDiagnosticChangeEvent = function (arg) {
        this.onDidChangeDiagnosticsEmitter.fire({ uris: this.toUrisArray(arg) });
    };
    DiagnosticCollection.prototype.toUrisArray = function (arg) {
        var e_3, _a;
        if (arg instanceof Array) {
            if (arg.length === 0) {
                return [];
            }
            if (arg[0] instanceof vscode_uri_1.URI) {
                return arg;
            }
            else {
                var result = [];
                try {
                    for (var _b = __values(arg), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var uriString = _c.value;
                        result.push(vscode_uri_1.URI.parse(uriString));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return result;
            }
        }
        else {
            if (arg instanceof vscode_uri_1.URI) {
                return [arg];
            }
            else {
                return [vscode_uri_1.URI.parse(arg)];
            }
        }
    };
    DiagnosticCollection.prototype.sendChangesToEditor = function (uris) {
        var e_4, _a;
        var markers = [];
        var _loop_1 = function (uri) {
            var e_5, _a, e_6, _b;
            var uriMarkers = [];
            var uriDiagnostics = this_1.diagnostics.get(uri.toString());
            if (uriDiagnostics) {
                if (uriDiagnostics.length > this_1.diagnosticsLimitPerResource) {
                    try {
                        for (var _c = (e_5 = void 0, __values(DiagnosticCollection.DIAGNOSTICS_PRIORITY)), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var severity = _d.value;
                            try {
                                for (var uriDiagnostics_1 = (e_6 = void 0, __values(uriDiagnostics)), uriDiagnostics_1_1 = uriDiagnostics_1.next(); !uriDiagnostics_1_1.done; uriDiagnostics_1_1 = uriDiagnostics_1.next()) {
                                    var diagnostic = uriDiagnostics_1_1.value;
                                    if (severity === diagnostic.severity) {
                                        if (uriMarkers.push(type_converters_1.convertDiagnosticToMarkerData(diagnostic)) + 1 === this_1.diagnosticsLimitPerResource) {
                                            var lastMarker = uriMarkers[uriMarkers.length - 1];
                                            uriMarkers.push({
                                                severity: types_impl_1.MarkerSeverity.Info,
                                                message: 'Limit of diagnostics is reached. ' + (uriDiagnostics.length - this_1.diagnosticsLimitPerResource) + ' items are hidden',
                                                startLineNumber: lastMarker.startLineNumber,
                                                startColumn: lastMarker.startColumn,
                                                endLineNumber: lastMarker.endLineNumber,
                                                endColumn: lastMarker.endColumn
                                            });
                                            markers.push([uri.toString(), uriMarkers]);
                                            return "continue-nextUri";
                                        }
                                    }
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (uriDiagnostics_1_1 && !uriDiagnostics_1_1.done && (_b = uriDiagnostics_1.return)) _b.call(uriDiagnostics_1);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
                else {
                    uriDiagnostics.forEach(function (diagnostic) { return uriMarkers.push(type_converters_1.convertDiagnosticToMarkerData(diagnostic)); });
                    markers.push([uri.toString(), uriMarkers]);
                }
            }
            else {
                markers.push([uri.toString(), []]);
            }
        };
        var this_1 = this;
        try {
            nextUri: for (var uris_1 = __values(uris), uris_1_1 = uris_1.next(); !uris_1_1.done; uris_1_1 = uris_1.next()) {
                var uri = uris_1_1.value;
                var state_1 = _loop_1(uri);
                switch (state_1) {
                    case "continue-nextUri": continue nextUri;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (uris_1_1 && !uris_1_1.done && (_a = uris_1.return)) _a.call(uris_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.proxy.$changeDiagnostics(this.name, markers);
    };
    DiagnosticCollection.DIAGNOSTICS_PRIORITY = [
        types_impl_1.DiagnosticSeverity.Error, types_impl_1.DiagnosticSeverity.Warning, types_impl_1.DiagnosticSeverity.Information, types_impl_1.DiagnosticSeverity.Hint
    ];
    return DiagnosticCollection;
}());
exports.DiagnosticCollection = DiagnosticCollection;
var Diagnostics = /** @class */ (function () {
    function Diagnostics(rpc) {
        this.diagnosticsChangedEmitter = new event_1.Emitter();
        this.onDidChangeDiagnostics = this.diagnosticsChangedEmitter.event;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.LANGUAGES_MAIN);
        this.diagnosticCollections = new Map();
    }
    Diagnostics.prototype.getDiagnostics = function (resource) {
        if (resource) {
            return this.getAllDiagnosticsForResource(resource);
        }
        else {
            return this.getAllDiagnostics();
        }
    };
    Diagnostics.prototype.createDiagnosticCollection = function (name) {
        var _this = this;
        if (!name) {
            do {
                name = Diagnostics.GENERATED_DIAGNOSTIC_COLLECTION_NAME_PREFIX + this.getNextId();
            } while (this.diagnosticCollections.has(name));
        }
        else if (this.diagnosticCollections.has(name)) {
            console.warn("Diagnostic collection with name '" + name + "' already exist.");
        }
        var diagnosticCollection = new DiagnosticCollection(name, Diagnostics.MAX_DIAGNOSTICS_PER_FILE, this.proxy, this.diagnosticsChangedEmitter);
        diagnosticCollection.setOnDisposeCallback(function () {
            _this.diagnosticCollections.delete(name);
        });
        this.diagnosticCollections.set(name, diagnosticCollection);
        return diagnosticCollection;
    };
    Diagnostics.prototype.getNextId = function () {
        return uuid_1.v4();
    };
    Diagnostics.prototype.getAllDiagnosticsForResource = function (uri) {
        var result = [];
        this.diagnosticCollections.forEach(function (diagnosticCollection) {
            var diagnostics = diagnosticCollection.get(uri);
            if (diagnostics) {
                result = result.concat.apply(result, __spread(diagnostics));
            }
        });
        return result;
    };
    Diagnostics.prototype.getAllDiagnostics = function () {
        var result = [];
        // Holds uri index in result array of tuples.
        var urisIndexes = new Map();
        var nextIndex = 0;
        this.diagnosticCollections.forEach(function (diagnosticsCollection) {
            return diagnosticsCollection.forEach(function (uri, diagnostics) {
                var _a;
                var uriIndex = urisIndexes.get(uri.toString());
                if (uriIndex === undefined) {
                    uriIndex = nextIndex++;
                    urisIndexes.set(uri.toString(), uriIndex);
                    result.push([uri, __spread(diagnostics)]);
                }
                else {
                    result[uriIndex][1] = (_a = result[uriIndex][1]).concat.apply(_a, __spread(diagnostics));
                }
            });
        });
        return result;
    };
    Diagnostics.MAX_DIAGNOSTICS_PER_FILE = 1000;
    Diagnostics.GENERATED_DIAGNOSTIC_COLLECTION_NAME_PREFIX = '_generated_diagnostic_collection_name_#';
    return Diagnostics;
}());
exports.Diagnostics = Diagnostics;
//# sourceMappingURL=diagnostics.js.map