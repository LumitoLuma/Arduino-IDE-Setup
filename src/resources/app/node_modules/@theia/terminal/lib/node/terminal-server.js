"use strict";
/********************************************************************************
 * Copyright (C) 2017 Ericsson and others.
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
exports.TerminalServer = void 0;
var inversify_1 = require("inversify");
var logger_1 = require("@theia/core/lib/common/logger");
var base_terminal_server_1 = require("./base-terminal-server");
var node_1 = require("@theia/process/lib/node");
var TerminalServer = /** @class */ (function (_super) {
    __extends(TerminalServer, _super);
    function TerminalServer(terminalFactory, processManager, logger) {
        var _this = _super.call(this, processManager, logger) || this;
        _this.terminalFactory = terminalFactory;
        _this.processManager = processManager;
        _this.logger = logger;
        return _this;
    }
    TerminalServer.prototype.create = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var term = _this.terminalFactory(options);
            term.onStart(function (_) {
                _this.postCreate(term);
                resolve(term.id);
            });
            term.onError(function (error) {
                _this.logger.error('Error while creating terminal', error);
                resolve(-1);
            });
        });
    };
    TerminalServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(node_1.TerminalProcessFactory)),
        __param(1, inversify_1.inject(node_1.ProcessManager)),
        __param(2, inversify_1.inject(logger_1.ILogger)), __param(2, inversify_1.named('terminal')),
        __metadata("design:paramtypes", [Function, node_1.ProcessManager, Object])
    ], TerminalServer);
    return TerminalServer;
}(base_terminal_server_1.BaseTerminalServer));
exports.TerminalServer = TerminalServer;
//# sourceMappingURL=terminal-server.js.map