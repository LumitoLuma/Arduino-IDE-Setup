"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisposableCollection = exports.Disposable = void 0;
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
var event_1 = require("./event");
var Disposable;
(function (Disposable) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(arg) {
        return !!arg && typeof arg === 'object' && 'dispose' in arg && typeof arg['dispose'] === 'function';
    }
    Disposable.is = is;
    function create(func) {
        return {
            dispose: func
        };
    }
    Disposable.create = create;
    Disposable.NULL = create(function () { });
})(Disposable = exports.Disposable || (exports.Disposable = {}));
var DisposableCollection = /** @class */ (function () {
    function DisposableCollection() {
        var _this = this;
        var toDispose = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toDispose[_i] = arguments[_i];
        }
        this.disposables = [];
        this.onDisposeEmitter = new event_1.Emitter();
        this.disposingElements = false;
        toDispose.forEach(function (d) { return _this.push(d); });
    }
    Object.defineProperty(DisposableCollection.prototype, "onDispose", {
        /**
         * This event is fired only once
         * on first dispose of not empty collection.
         */
        get: function () {
            return this.onDisposeEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    DisposableCollection.prototype.checkDisposed = function () {
        if (this.disposed && !this.disposingElements) {
            this.onDisposeEmitter.fire(undefined);
            this.onDisposeEmitter.dispose();
        }
    };
    Object.defineProperty(DisposableCollection.prototype, "disposed", {
        get: function () {
            return this.disposables.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    DisposableCollection.prototype.dispose = function () {
        if (this.disposed || this.disposingElements) {
            return;
        }
        this.disposingElements = true;
        while (!this.disposed) {
            try {
                this.disposables.pop().dispose();
            }
            catch (e) {
                console.error(e);
            }
        }
        this.disposingElements = false;
        this.checkDisposed();
    };
    DisposableCollection.prototype.push = function (disposable) {
        var _this = this;
        var disposables = this.disposables;
        disposables.push(disposable);
        var originalDispose = disposable.dispose.bind(disposable);
        var toRemove = Disposable.create(function () {
            var index = disposables.indexOf(disposable);
            if (index !== -1) {
                disposables.splice(index, 1);
            }
            _this.checkDisposed();
        });
        disposable.dispose = function () {
            toRemove.dispose();
            originalDispose();
        };
        return toRemove;
    };
    DisposableCollection.prototype.pushAll = function (disposables) {
        var _this = this;
        return disposables.map(function (disposable) {
            return _this.push(disposable);
        });
    };
    return DisposableCollection;
}());
exports.DisposableCollection = DisposableCollection;
//# sourceMappingURL=disposable.js.map