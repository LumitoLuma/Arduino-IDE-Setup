"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBarMessageRegistryExt = void 0;
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
var types_impl_1 = require("./types-impl");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var status_bar_item_1 = require("./status-bar/status-bar-item");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var StatusBarMessageRegistryExt = /** @class */ (function () {
    function StatusBarMessageRegistryExt(rpc) {
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.STATUS_BAR_MESSAGE_REGISTRY_MAIN);
        this.statusMessage = new StatusBarMessage(this);
    }
    // copied from https://github.com/Microsoft/vscode/blob/6c8f02b41db9ae5c4d15df767d47755e5c73b9d5/src/vs/workbench/api/node/extHostStatusBar.ts#L174
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    StatusBarMessageRegistryExt.prototype.setStatusBarMessage = function (text, timeoutOrThenable) {
        var d = this.statusMessage.setMessage(text);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var handle;
        if (typeof timeoutOrThenable === 'number') {
            handle = setTimeout(function () { return d.dispose(); }, timeoutOrThenable);
        }
        else if (typeof timeoutOrThenable !== 'undefined') {
            timeoutOrThenable.then(function () { return d.dispose(); }, function () { return d.dispose(); });
        }
        return new types_impl_1.Disposable(function () {
            d.dispose();
            clearTimeout(handle);
        });
    };
    StatusBarMessageRegistryExt.prototype.createStatusBarItem = function (alignment, priority) {
        return new status_bar_item_1.StatusBarItemImpl(this.proxy, alignment, priority);
    };
    return StatusBarMessageRegistryExt;
}());
exports.StatusBarMessageRegistryExt = StatusBarMessageRegistryExt;
// copied from https://github.com/Microsoft/vscode/blob/6c8f02b41db9ae5c4d15df767d47755e5c73b9d5/src/vs/workbench/api/node/extHostStatusBar.ts#L122
var StatusBarMessage = /** @class */ (function () {
    function StatusBarMessage(statusBar) {
        this._messages = [];
        this._item = statusBar.createStatusBarItem(types_impl_1.StatusBarAlignment.Left, Number.MIN_VALUE);
    }
    StatusBarMessage.prototype.dispose = function () {
        this._messages.length = 0;
        this._item.dispose();
    };
    StatusBarMessage.prototype.setMessage = function (message) {
        var _this = this;
        var data = { message: message }; // use object to not confuse equal strings
        this._messages.unshift(data);
        this._update();
        return new types_impl_1.Disposable(function () {
            var idx = _this._messages.indexOf(data);
            if (idx >= 0) {
                _this._messages.splice(idx, 1);
                _this._update();
            }
        });
    };
    StatusBarMessage.prototype._update = function () {
        if (this._messages.length > 0) {
            this._item.text = this._messages[0].message;
            this._item.show();
        }
        else {
            this._item.hide();
        }
    };
    return StatusBarMessage;
}());
//# sourceMappingURL=status-bar-message-registry.js.map