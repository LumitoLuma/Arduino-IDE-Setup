/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
import { createDecorator } from '../../instantiation/common/instantiation';
import { CancellationTokenSource } from '../../../base/common/cancellation';
import { toDisposable, DisposableStore, Disposable } from '../../../base/common/lifecycle';
export var IProgressService = createDecorator('progressService');
export var emptyProgress = { report: function () { } };
export var emptyProgressRunner = Object.freeze({
    total: function () { },
    worked: function () { },
    done: function () { }
});
var Progress = /** @class */ (function () {
    function Progress(callback) {
        this._callback = callback;
    }
    Object.defineProperty(Progress.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Progress.prototype.report = function (item) {
        this._value = item;
        this._callback(this._value);
    };
    return Progress;
}());
export { Progress };
var LongRunningOperation = /** @class */ (function (_super) {
    __extends(LongRunningOperation, _super);
    function LongRunningOperation(progressIndicator) {
        var _this = _super.call(this) || this;
        _this.progressIndicator = progressIndicator;
        _this.currentOperationId = 0;
        _this.currentOperationDisposables = _this._register(new DisposableStore());
        return _this;
    }
    LongRunningOperation.prototype.start = function (progressDelay) {
        var _this = this;
        // Stop any previous operation
        this.stop();
        // Start new
        var newOperationId = ++this.currentOperationId;
        var newOperationToken = new CancellationTokenSource();
        this.currentProgressTimeout = setTimeout(function () {
            if (newOperationId === _this.currentOperationId) {
                _this.currentProgressRunner = _this.progressIndicator.show(true);
            }
        }, progressDelay);
        this.currentOperationDisposables.add(toDisposable(function () { return clearTimeout(_this.currentProgressTimeout); }));
        this.currentOperationDisposables.add(toDisposable(function () { return newOperationToken.cancel(); }));
        this.currentOperationDisposables.add(toDisposable(function () { return _this.currentProgressRunner ? _this.currentProgressRunner.done() : undefined; }));
        return {
            id: newOperationId,
            token: newOperationToken.token,
            stop: function () { return _this.doStop(newOperationId); },
            isCurrent: function () { return _this.currentOperationId === newOperationId; }
        };
    };
    LongRunningOperation.prototype.stop = function () {
        this.doStop(this.currentOperationId);
    };
    LongRunningOperation.prototype.doStop = function (operationId) {
        if (this.currentOperationId === operationId) {
            this.currentOperationDisposables.clear();
        }
    };
    return LongRunningOperation;
}(Disposable));
export { LongRunningOperation };
export var IEditorProgressService = createDecorator('editorProgressService');
