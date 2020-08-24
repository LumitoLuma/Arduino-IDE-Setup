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
exports.WaitUntilEvent = exports.Emitter = exports.Event = void 0;
var Event;
(function (Event) {
    var _disposable = { dispose: function () { } };
    Event.None = Object.assign(function () { return _disposable; }, {
        get maxListeners() { return 0; },
        set maxListeners(maxListeners) { }
    });
    /**
     * Given an event and a `map` function, returns another event which maps each element
     * through the mapping function.
     */
    function map(event, mapFunc) {
        return Object.assign(function (listener, thisArgs, disposables) { return event(function (i) { return listener.call(thisArgs, mapFunc(i)); }, undefined, disposables); }, {
            maxListeners: 0,
        });
    }
    Event.map = map;
})(Event = exports.Event || (exports.Event = {}));
var CallbackList = /** @class */ (function () {
    function CallbackList() {
    }
    Object.defineProperty(CallbackList.prototype, "length", {
        get: function () {
            return this._callbacks && this._callbacks.length || 0;
        },
        enumerable: false,
        configurable: true
    });
    CallbackList.prototype.add = function (callback, context, bucket) {
        var _this = this;
        if (context === void 0) { context = undefined; }
        if (!this._callbacks) {
            this._callbacks = [];
            this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
            bucket.push({ dispose: function () { return _this.remove(callback, context); } });
        }
    };
    CallbackList.prototype.remove = function (callback, context) {
        if (context === void 0) { context = undefined; }
        if (!this._callbacks) {
            return;
        }
        var foundCallbackWithDifferentContext = false;
        for (var i = 0; i < this._callbacks.length; i++) {
            if (this._callbacks[i] === callback) {
                if (this._contexts[i] === context) {
                    // callback & context match => remove it
                    this._callbacks.splice(i, 1);
                    this._contexts.splice(i, 1);
                    return;
                }
                else {
                    foundCallbackWithDifferentContext = true;
                }
            }
        }
        if (foundCallbackWithDifferentContext) {
            throw new Error('When adding a listener with a context, you should remove it with the same context');
        }
    };
    // tslint:disable-next-line:typedef
    CallbackList.prototype[Symbol.iterator] = function () {
        if (!this._callbacks) {
            return [][Symbol.iterator]();
        }
        var callbacks = this._callbacks.slice(0);
        var contexts = this._contexts.slice(0);
        return callbacks.map(function (callback, i) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return callback.apply(contexts[i], args);
            };
        })[Symbol.iterator]();
    };
    CallbackList.prototype.invoke = function () {
        var e_1, _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var ret = [];
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var callback = _c.value;
                try {
                    ret.push(callback.apply(void 0, __spread(args)));
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
        return ret;
    };
    CallbackList.prototype.isEmpty = function () {
        return !this._callbacks || this._callbacks.length === 0;
    };
    CallbackList.prototype.dispose = function () {
        this._callbacks = undefined;
        this._contexts = undefined;
    };
    return CallbackList;
}());
var Emitter = /** @class */ (function () {
    function Emitter(_options) {
        this._options = _options;
        this._disposed = false;
        this._leakWarnCountdown = 0;
    }
    Object.defineProperty(Emitter.prototype, "event", {
        /**
         * For the public to allow to subscribe
         * to events from this Emitter
         */
        get: function () {
            var _this = this;
            if (!this._event) {
                this._event = Object.assign(function (listener, thisArgs, disposables) {
                    if (!_this._callbacks) {
                        _this._callbacks = new CallbackList();
                    }
                    if (_this._options && _this._options.onFirstListenerAdd && _this._callbacks.isEmpty()) {
                        _this._options.onFirstListenerAdd(_this);
                    }
                    _this._callbacks.add(listener, thisArgs);
                    var removeMaxListenersCheck = _this.checkMaxListeners(_this._event.maxListeners);
                    var result = {
                        dispose: function () {
                            if (removeMaxListenersCheck) {
                                removeMaxListenersCheck();
                            }
                            result.dispose = Emitter._noop;
                            if (!_this._disposed) {
                                _this._callbacks.remove(listener, thisArgs);
                                result.dispose = Emitter._noop;
                                if (_this._options && _this._options.onLastListenerRemove && _this._callbacks.isEmpty()) {
                                    _this._options.onLastListenerRemove(_this);
                                }
                            }
                        }
                    };
                    if (Array.isArray(disposables)) {
                        disposables.push(result);
                    }
                    return result;
                }, {
                    maxListeners: Emitter.LEAK_WARNING_THRESHHOLD
                });
            }
            return this._event;
        },
        enumerable: false,
        configurable: true
    });
    Emitter.prototype.checkMaxListeners = function (maxListeners) {
        if (maxListeners === 0 || !this._callbacks) {
            return undefined;
        }
        var listenerCount = this._callbacks.length;
        if (listenerCount <= maxListeners) {
            return undefined;
        }
        var popStack = this.pushLeakingStack();
        this._leakWarnCountdown -= 1;
        if (this._leakWarnCountdown <= 0) {
            // only warn on first exceed and then every time the limit
            // is exceeded by 50% again
            this._leakWarnCountdown = maxListeners * 0.5;
            var topStack_1;
            var topCount_1 = 0;
            this._leakingStacks.forEach(function (stackCount, stack) {
                if (!topStack_1 || topCount_1 < stackCount) {
                    topStack_1 = stack;
                    topCount_1 = stackCount;
                }
            });
            // eslint-disable-next-line max-len
            console.warn("Possible Emitter memory leak detected. " + listenerCount + " listeners added. Use event.maxListeners to increase the limit (" + maxListeners + "). MOST frequent listener (" + topCount_1 + "):");
            console.warn(topStack_1);
        }
        return popStack;
    };
    Emitter.prototype.pushLeakingStack = function () {
        var _this = this;
        if (!this._leakingStacks) {
            this._leakingStacks = new Map();
        }
        var stack = new Error().stack.split('\n').slice(3).join('\n');
        var count = (this._leakingStacks.get(stack) || 0);
        this._leakingStacks.set(stack, count + 1);
        return function () { return _this.popLeakingStack(stack); };
    };
    Emitter.prototype.popLeakingStack = function (stack) {
        if (!this._leakingStacks) {
            return;
        }
        var count = (this._leakingStacks.get(stack) || 0);
        this._leakingStacks.set(stack, count - 1);
    };
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    Emitter.prototype.fire = function (event) {
        if (this._callbacks) {
            this._callbacks.invoke(event);
        }
    };
    /**
     * Process each listener one by one.
     * Return `false` to stop iterating over the listeners, `true` to continue.
     */
    Emitter.prototype.sequence = function (processor) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, listener, e_2_1;
            var e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this._callbacks) return [3 /*break*/, 8];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = __values(this._callbacks), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        listener = _b.value;
                        return [4 /*yield*/, processor(listener)];
                    case 3:
                        if (!(_d.sent())) {
                            return [3 /*break*/, 5];
                        }
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Emitter.prototype.dispose = function () {
        if (this._leakingStacks) {
            this._leakingStacks.clear();
            this._leakingStacks = undefined;
        }
        if (this._callbacks) {
            this._callbacks.dispose();
            this._callbacks = undefined;
        }
        this._disposed = true;
    };
    Emitter.LEAK_WARNING_THRESHHOLD = 175;
    Emitter._noop = function () { };
    return Emitter;
}());
exports.Emitter = Emitter;
var WaitUntilEvent;
(function (WaitUntilEvent) {
    function fire(emitter, event, timeout) {
        if (timeout === void 0) { timeout = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var waitables, asyncEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        waitables = [];
                        asyncEvent = Object.assign(event, {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            waitUntil: function (thenable) {
                                if (Object.isFrozen(waitables)) {
                                    throw new Error('waitUntil cannot be called asynchronously.');
                                }
                                waitables.push(thenable);
                            }
                        });
                        try {
                            emitter.fire(asyncEvent);
                            // Asynchronous calls to `waitUntil` should fail.
                            Object.freeze(waitables);
                        }
                        finally {
                            delete asyncEvent['waitUntil'];
                        }
                        if (!waitables.length) {
                            return [2 /*return*/];
                        }
                        if (!(timeout !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.race([Promise.all(waitables), new Promise(function (resolve) { return setTimeout(resolve, timeout); })])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, Promise.all(waitables)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    WaitUntilEvent.fire = fire;
})(WaitUntilEvent = exports.WaitUntilEvent || (exports.WaitUntilEvent = {}));
//# sourceMappingURL=event.js.map