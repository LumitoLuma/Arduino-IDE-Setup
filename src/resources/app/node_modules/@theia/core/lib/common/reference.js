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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.SyncReferenceCollection = exports.ReferenceCollection = exports.AbstractReferenceCollection = void 0;
var disposable_1 = require("./disposable");
var event_1 = require("./event");
var AbstractReferenceCollection = /** @class */ (function () {
    function AbstractReferenceCollection() {
        var _this = this;
        this._keys = new Map();
        this._values = new Map();
        this.references = new Map();
        this.onDidCreateEmitter = new event_1.Emitter();
        this.onDidCreate = this.onDidCreateEmitter.event;
        this.onWillDisposeEmitter = new event_1.Emitter();
        this.onWillDispose = this.onWillDisposeEmitter.event;
        this.toDispose = new disposable_1.DisposableCollection();
        this.toDispose.push(this.onDidCreateEmitter);
        this.toDispose.push(this.onWillDisposeEmitter);
        this.toDispose.push(disposable_1.Disposable.create(function () { return _this.clear(); }));
    }
    AbstractReferenceCollection.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    AbstractReferenceCollection.prototype.clear = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this._values.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                try {
                    value.dispose();
                }
                catch (e) {
                    console.error(e);
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
    };
    AbstractReferenceCollection.prototype.has = function (args) {
        var key = this.toKey(args);
        return this.references.has(key);
    };
    AbstractReferenceCollection.prototype.keys = function () {
        return __spread(this._keys.values());
    };
    AbstractReferenceCollection.prototype.values = function () {
        return __spread(this._values.values());
    };
    AbstractReferenceCollection.prototype.get = function (args) {
        var key = this.toKey(args);
        return this._values.get(key);
    };
    AbstractReferenceCollection.prototype.doAcquire = function (key, object) {
        var references = this.references.get(key) || this.createReferences(key, object);
        var reference = {
            object: object,
            dispose: function () { }
        };
        references.push(reference);
        return reference;
    };
    AbstractReferenceCollection.prototype.toKey = function (args) {
        return JSON.stringify(args);
    };
    AbstractReferenceCollection.prototype.createReferences = function (key, value) {
        var _this = this;
        var references = new disposable_1.DisposableCollection();
        references.onDispose(function () { return value.dispose(); });
        var disposeObject = value.dispose.bind(value);
        value.dispose = function () {
            _this.onWillDisposeEmitter.fire(value);
            disposeObject();
            _this._values.delete(key);
            _this._keys.delete(key);
            _this.references.delete(key);
            references.dispose();
        };
        this.references.set(key, references);
        return references;
    };
    return AbstractReferenceCollection;
}());
exports.AbstractReferenceCollection = AbstractReferenceCollection;
var ReferenceCollection = /** @class */ (function (_super) {
    __extends(ReferenceCollection, _super);
    function ReferenceCollection(factory) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.pendingValues = new Map();
        return _this;
    }
    ReferenceCollection.prototype.acquire = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var key, existing, object;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = this.toKey(args);
                        existing = this._values.get(key);
                        if (existing) {
                            return [2 /*return*/, this.doAcquire(key, existing)];
                        }
                        return [4 /*yield*/, this.getOrCreateValue(key, args)];
                    case 1:
                        object = _a.sent();
                        return [2 /*return*/, this.doAcquire(key, object)];
                }
            });
        });
    };
    ReferenceCollection.prototype.getOrCreateValue = function (key, args) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, pending, value, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        existing = this.pendingValues.get(key);
                        if (existing) {
                            return [2 /*return*/, existing];
                        }
                        pending = this.factory(args);
                        this._keys.set(key, args);
                        this.pendingValues.set(key, pending);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, pending];
                    case 2:
                        value = _a.sent();
                        this._values.set(key, value);
                        this.onDidCreateEmitter.fire(value);
                        return [2 /*return*/, value];
                    case 3:
                        e_2 = _a.sent();
                        this._keys.delete(key);
                        throw e_2;
                    case 4:
                        this.pendingValues.delete(key);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ReferenceCollection;
}(AbstractReferenceCollection));
exports.ReferenceCollection = ReferenceCollection;
var SyncReferenceCollection = /** @class */ (function (_super) {
    __extends(SyncReferenceCollection, _super);
    function SyncReferenceCollection(factory) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        return _this;
    }
    SyncReferenceCollection.prototype.acquire = function (args) {
        var key = this.toKey(args);
        var object = this.getOrCreateValue(key, args);
        return this.doAcquire(key, object);
    };
    SyncReferenceCollection.prototype.getOrCreateValue = function (key, args) {
        var existing = this._values.get(key);
        if (existing) {
            return existing;
        }
        var value = this.factory(args);
        this._keys.set(key, args);
        this._values.set(key, value);
        this.onDidCreateEmitter.fire(value);
        return value;
    };
    return SyncReferenceCollection;
}(AbstractReferenceCollection));
exports.SyncReferenceCollection = SyncReferenceCollection;
//# sourceMappingURL=reference.js.map