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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputChannelRegistryMainImpl = void 0;
var inversify_1 = require("inversify");
var output_contribution_1 = require("@theia/output/lib/browser/output-contribution");
var output_channel_1 = require("@theia/output/lib/common/output-channel");
var OutputChannelRegistryMainImpl = /** @class */ (function () {
    function OutputChannelRegistryMainImpl() {
        this.channels = new Map();
    }
    OutputChannelRegistryMainImpl.prototype.$append = function (channelName, value, pluginInfo) {
        var outputChannel = this.getChannel(channelName);
        if (outputChannel) {
            outputChannel.append(value);
        }
        return Promise.resolve();
    };
    OutputChannelRegistryMainImpl.prototype.$clear = function (channelName) {
        var outputChannel = this.getChannel(channelName);
        if (outputChannel) {
            outputChannel.clear();
        }
        return Promise.resolve();
    };
    OutputChannelRegistryMainImpl.prototype.$dispose = function (channelName) {
        this.outputChannelManager.deleteChannel(channelName);
        if (this.channels.has(channelName)) {
            this.channels.delete(channelName);
        }
        return Promise.resolve();
    };
    OutputChannelRegistryMainImpl.prototype.$reveal = function (channelName, preserveFocus) {
        return __awaiter(this, void 0, void 0, function () {
            var outputChannel, activate, reveal, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        outputChannel = this.getChannel(channelName);
                        if (!outputChannel) return [3 /*break*/, 2];
                        activate = !preserveFocus;
                        reveal = preserveFocus;
                        _a = this;
                        return [4 /*yield*/, this.outputContribution.openView({ activate: activate, reveal: reveal })];
                    case 1:
                        _a.commonOutputWidget = _b.sent();
                        outputChannel.setVisibility(true);
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    OutputChannelRegistryMainImpl.prototype.$close = function (channelName) {
        var outputChannel = this.getChannel(channelName);
        if (outputChannel) {
            outputChannel.setVisibility(false);
        }
        var channels = this.outputChannelManager.getChannels();
        var isEmpty = channels.findIndex(function (channel) { return channel.isVisible; }) === -1;
        if (isEmpty && this.commonOutputWidget) {
            this.commonOutputWidget.close();
        }
        return Promise.resolve();
    };
    OutputChannelRegistryMainImpl.prototype.getChannel = function (channelName) {
        var outputChannel;
        if (this.channels.has(channelName)) {
            outputChannel = this.channels.get(channelName);
        }
        else {
            outputChannel = this.outputChannelManager.getChannel(channelName);
            this.channels.set(channelName, outputChannel);
        }
        return outputChannel;
    };
    __decorate([
        inversify_1.inject(output_channel_1.OutputChannelManager),
        __metadata("design:type", output_channel_1.OutputChannelManager)
    ], OutputChannelRegistryMainImpl.prototype, "outputChannelManager", void 0);
    __decorate([
        inversify_1.inject(output_contribution_1.OutputContribution),
        __metadata("design:type", output_contribution_1.OutputContribution)
    ], OutputChannelRegistryMainImpl.prototype, "outputContribution", void 0);
    OutputChannelRegistryMainImpl = __decorate([
        inversify_1.injectable()
    ], OutputChannelRegistryMainImpl);
    return OutputChannelRegistryMainImpl;
}());
exports.OutputChannelRegistryMainImpl = OutputChannelRegistryMainImpl;
//# sourceMappingURL=output-channel-registry-main.js.map