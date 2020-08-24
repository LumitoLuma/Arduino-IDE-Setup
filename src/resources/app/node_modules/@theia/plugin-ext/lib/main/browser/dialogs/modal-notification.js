"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalNotification = exports.MessageType = void 0;
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
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var dialogs_1 = require("@theia/core/lib/browser/dialogs");
require("../../../../src/main/browser/dialogs/style/modal-notification.css");
var MessageType;
(function (MessageType) {
    MessageType["Error"] = "error";
    MessageType["Warning"] = "warning";
    MessageType["Info"] = "info";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var NOTIFICATION = 'modal-Notification';
var ICON = 'icon';
var TEXT = 'text';
var ModalNotification = /** @class */ (function (_super) {
    __extends(ModalNotification, _super);
    function ModalNotification() {
        return _super.call(this, { title: 'Theia' }) || this;
    }
    ModalNotification.prototype.onCloseRequest = function (msg) {
        this.actionTitle = undefined;
        this.accept();
    };
    Object.defineProperty(ModalNotification.prototype, "value", {
        get: function () {
            return this.actionTitle;
        },
        enumerable: false,
        configurable: true
    });
    ModalNotification.prototype.showDialog = function (messageType, text, actions) {
        this.contentNode.appendChild(this.createMessageNode(messageType, text, actions));
        return this.open();
    };
    ModalNotification.prototype.createMessageNode = function (messageType, text, actions) {
        var _this = this;
        var messageNode = document.createElement('div');
        messageNode.classList.add(NOTIFICATION);
        var iconContainer = messageNode.appendChild(document.createElement('div'));
        iconContainer.classList.add(ICON);
        var iconElement = iconContainer.appendChild(document.createElement('i'));
        iconElement.classList.add('fa', this.toIconClass(messageType), 'fa-fw', messageType.toString());
        var textContainer = messageNode.appendChild(document.createElement('div'));
        textContainer.classList.add(TEXT);
        var textElement = textContainer.appendChild(document.createElement('p'));
        textElement.textContent = text;
        actions.forEach(function (action) {
            var button = _this.createButton(action.title);
            button.classList.add('main');
            _this.controlPanel.appendChild(button);
            _this.addKeyListener(button, browser_1.Key.ENTER, function () {
                _this.actionTitle = action.title;
                _this.accept();
            }, 'click');
        });
        if (!actions.some(function (action) { return action.isCloseAffordance === true; })) {
            this.appendCloseButton('close');
        }
        return messageNode;
    };
    ModalNotification.prototype.toIconClass = function (icon) {
        if (icon === MessageType.Error) {
            return 'fa-times-circle';
        }
        if (icon === MessageType.Warning) {
            return 'fa-warning';
        }
        return 'fa-info-circle';
    };
    ModalNotification = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ModalNotification);
    return ModalNotification;
}(dialogs_1.AbstractDialog));
exports.ModalNotification = ModalNotification;
//# sourceMappingURL=modal-notification.js.map