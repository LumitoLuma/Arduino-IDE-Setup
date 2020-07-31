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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var inversify_1 = require("inversify");
var core_1 = require("@theia/core");
var messaging_1 = require("@theia/core/lib/node/messaging");
var filesystem_watcher_protocol_1 = require("../common/filesystem-watcher-protocol");
exports.NSFW_WATCHER = 'nsfw-watcher';
var FileSystemWatcherServerClient = /** @class */ (function () {
    function FileSystemWatcherServerClient(logger, ipcConnectionProvider) {
        var _this = this;
        this.logger = logger;
        this.ipcConnectionProvider = ipcConnectionProvider;
        this.proxyFactory = new core_1.JsonRpcProxyFactory();
        this.remote = new filesystem_watcher_protocol_1.ReconnectingFileSystemWatcherServer(this.proxyFactory.createProxy());
        this.toDispose = new core_1.DisposableCollection();
        this.remote.setClient({
            onDidFilesChanged: function (e) {
                if (_this.client) {
                    _this.client.onDidFilesChanged(e);
                }
            }
        });
        this.toDispose.push(this.remote);
        this.toDispose.push(this.listen());
    }
    FileSystemWatcherServerClient.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    FileSystemWatcherServerClient.prototype.watchFileChanges = function (uri, options) {
        return this.remote.watchFileChanges(uri, options);
    };
    FileSystemWatcherServerClient.prototype.unwatchFileChanges = function (watcher) {
        return this.remote.unwatchFileChanges(watcher);
    };
    FileSystemWatcherServerClient.prototype.setClient = function (client) {
        this.client = client;
    };
    FileSystemWatcherServerClient.prototype.listen = function () {
        var _this = this;
        return this.ipcConnectionProvider.listen({
            serverName: exports.NSFW_WATCHER,
            entryPoint: path.resolve(__dirname, exports.NSFW_WATCHER),
            errorHandler: new core_1.ConnectionErrorHandler({
                serverName: exports.NSFW_WATCHER,
                logger: this.logger
            }),
            env: process.env
        }, function (connection) { return _this.proxyFactory.listen(connection); });
    };
    FileSystemWatcherServerClient = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(core_1.ILogger)),
        __param(1, inversify_1.inject(messaging_1.IPCConnectionProvider)),
        __metadata("design:paramtypes", [Object, messaging_1.IPCConnectionProvider])
    ], FileSystemWatcherServerClient);
    return FileSystemWatcherServerClient;
}());
exports.FileSystemWatcherServerClient = FileSystemWatcherServerClient;
//# sourceMappingURL=filesystem-watcher-client.js.map