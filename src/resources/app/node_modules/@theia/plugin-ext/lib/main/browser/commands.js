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
exports.OpenUriCommandHandler = void 0;
var inversify_1 = require("inversify");
var command_1 = require("@theia/core/lib/common/command");
var browser_1 = require("@theia/core/lib/browser");
var window_service_1 = require("@theia/core/lib/browser/window/window-service");
var OpenUriCommandHandler = /** @class */ (function () {
    function OpenUriCommandHandler(windowService, commandService) {
        this.windowService = windowService;
        this.commandService = commandService;
        this.openNewTabDialog = new OpenNewTabDialog(windowService);
    }
    OpenUriCommandHandler.prototype.execute = function (resource) {
        if (!resource) {
            return;
        }
        var uriString = resource.toString();
        if (uriString.startsWith('http://') || uriString.startsWith('https://')) {
            this.openWebUri(uriString);
        }
        else {
            this.commandService.executeCommand('editor.action.openLink', uriString);
        }
    };
    OpenUriCommandHandler.prototype.openWebUri = function (uri) {
        try {
            this.windowService.openNewWindow(uri);
        }
        catch (err) {
            // browser has blocked opening of a new tab
            this.openNewTabDialog.showOpenNewTabDialog(uri);
        }
    };
    OpenUriCommandHandler.COMMAND_METADATA = {
        id: 'theia.open'
    };
    OpenUriCommandHandler = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(window_service_1.WindowService)),
        __param(1, inversify_1.inject(command_1.CommandService)),
        __metadata("design:paramtypes", [Object, Object])
    ], OpenUriCommandHandler);
    return OpenUriCommandHandler;
}());
exports.OpenUriCommandHandler = OpenUriCommandHandler;
var OpenNewTabDialog = /** @class */ (function (_super) {
    __extends(OpenNewTabDialog, _super);
    function OpenNewTabDialog(windowService) {
        var _this = _super.call(this, {
            title: 'Your browser prevented opening of a new tab'
        }) || this;
        _this.windowService = windowService;
        _this.linkNode = document.createElement('a');
        _this.linkNode.target = '_blank';
        _this.linkNode.setAttribute('style', 'color: var(--theia-editorWidget-foreground);');
        _this.contentNode.appendChild(_this.linkNode);
        var messageNode = document.createElement('div');
        messageNode.innerText = 'You are going to open: ';
        messageNode.appendChild(_this.linkNode);
        _this.contentNode.appendChild(messageNode);
        _this.appendCloseButton();
        _this.openButton = _this.appendAcceptButton('Open');
        return _this;
    }
    OpenNewTabDialog.prototype.showOpenNewTabDialog = function (uri) {
        var _this = this;
        this.value = uri;
        this.linkNode.innerHTML = uri;
        this.linkNode.href = uri;
        this.openButton.onclick = function () {
            _this.windowService.openNewWindow(uri);
        };
        // show dialog window to user
        this.open();
    };
    return OpenNewTabDialog;
}(browser_1.AbstractDialog));
//# sourceMappingURL=commands.js.map