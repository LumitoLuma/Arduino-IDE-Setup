/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var Lazy = /** @class */ (function () {
    function Lazy(executor) {
        this.executor = executor;
        this._didRun = false;
    }
    /**
     * True if the lazy value has been resolved.
     */
    Lazy.prototype.hasValue = function () { return this._didRun; };
    /**
     * Get the wrapped value.
     *
     * This will force evaluation of the lazy value if it has not been resolved yet. Lazy values are only
     * resolved once. `getValue` will re-throw exceptions that are hit while resolving the value
     */
    Lazy.prototype.getValue = function () {
        if (!this._didRun) {
            try {
                this._value = this.executor();
            }
            catch (err) {
                this._error = err;
            }
            finally {
                this._didRun = true;
            }
        }
        if (this._error) {
            throw this._error;
        }
        return this._value;
    };
    Object.defineProperty(Lazy.prototype, "rawValue", {
        /**
         * Get the wrapped value without forcing evaluation.
         */
        get: function () { return this._value; },
        enumerable: true,
        configurable: true
    });
    /**
     * Create a new lazy value that is the result of applying `f` to the wrapped value.
     *
     * This does not force the evaluation of the current lazy value.
     */
    Lazy.prototype.map = function (f) {
        var _this = this;
        return new Lazy(function () { return f(_this.getValue()); });
    };
    return Lazy;
}());
export { Lazy };
