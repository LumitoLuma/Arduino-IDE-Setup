"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
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
var core_1 = require("@theia/core");
var inversify_1 = require("inversify");
var output_preferences_1 = require("./output-preferences");
var vscode_ws_jsonrpc_1 = require("vscode-ws-jsonrpc");
var OutputChannelManager = /** @class */ (function () {
    function OutputChannelManager() {
        this.channels = new Map();
        this.channelDeleteEmitter = new core_1.Emitter();
        this.channelAddedEmitter = new core_1.Emitter();
        this.selectedChannelEmitter = new core_1.Emitter();
        this.listOrSelectionEmitter = new core_1.Emitter();
        this.onChannelDelete = this.channelDeleteEmitter.event;
        this.onChannelAdded = this.channelAddedEmitter.event;
        this.onSelectedChannelChange = this.selectedChannelEmitter.event;
        this.onListOrSelectionChange = this.listOrSelectionEmitter.event;
        this.toDispose = new vscode_ws_jsonrpc_1.DisposableCollection();
    }
    OutputChannelManager.prototype.init = function () {
        var _this = this;
        this.getChannels().forEach(this.registerListener.bind(this));
        this.toDispose.push(this.onChannelAdded(function (channel) {
            _this.listOrSelectionEmitter.fire(undefined);
            _this.registerListener(channel);
        }));
        this.toDispose.push(this.onChannelDelete(function (event) {
            _this.listOrSelectionEmitter.fire(undefined);
            if (_this.selectedChannel && _this.selectedChannel.name === event.channelName) {
                _this.selectedChannel = _this.getVisibleChannels()[0];
            }
        }));
    };
    OutputChannelManager.prototype.registerListener = function (outputChannel) {
        var _this = this;
        if (!this.selectedChannel) {
            this.selectedChannel = outputChannel;
        }
        this.toDispose.push(outputChannel.onVisibilityChange(function (event) {
            if (event.visible) {
                _this.selectedChannel = outputChannel;
            }
            else if (outputChannel === _this.selectedChannel) {
                _this.selectedChannel = _this.getVisibleChannels()[0];
            }
        }));
    };
    OutputChannelManager.prototype.getChannel = function (name) {
        var existing = this.channels.get(name);
        if (existing) {
            return existing;
        }
        var channel = new OutputChannel(name, this.preferences);
        this.channels.set(name, channel);
        this.channelAddedEmitter.fire(channel);
        return channel;
    };
    OutputChannelManager.prototype.deleteChannel = function (name) {
        this.channels.delete(name);
        this.channelDeleteEmitter.fire({ channelName: name });
    };
    OutputChannelManager.prototype.getChannels = function () {
        return Array.from(this.channels.values());
    };
    OutputChannelManager.prototype.getVisibleChannels = function () {
        return this.getChannels().filter(function (channel) { return channel.isVisible; });
    };
    OutputChannelManager.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    Object.defineProperty(OutputChannelManager.prototype, "selectedChannel", {
        get: function () {
            return this.selectedChannelValue;
        },
        set: function (channel) {
            this.selectedChannelValue = channel;
            this.selectedChannelEmitter.fire(undefined);
            this.listOrSelectionEmitter.fire(undefined);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        inversify_1.inject(output_preferences_1.OutputPreferences),
        __metadata("design:type", Object)
    ], OutputChannelManager.prototype, "preferences", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OutputChannelManager.prototype, "init", null);
    OutputChannelManager = __decorate([
        inversify_1.injectable()
    ], OutputChannelManager);
    return OutputChannelManager;
}());
exports.OutputChannelManager = OutputChannelManager;
var OutputChannel = /** @class */ (function () {
    function OutputChannel(name, preferences) {
        this.name = name;
        this.preferences = preferences;
        this.visibilityChangeEmitter = new core_1.Emitter();
        this.contentChangeEmitter = new core_1.Emitter();
        this.lines = [];
        this.visible = true;
        this.onVisibilityChange = this.visibilityChangeEmitter.event;
        this.onContentChange = this.contentChangeEmitter.event;
    }
    OutputChannel.prototype.append = function (value) {
        if (this.currentLine === undefined) {
            this.currentLine = value;
        }
        else {
            this.currentLine += value;
        }
        this.contentChangeEmitter.fire(this);
    };
    OutputChannel.prototype.appendLine = function (line) {
        if (this.currentLine !== undefined) {
            this.lines.push(this.currentLine + line);
            this.currentLine = undefined;
        }
        else {
            this.lines.push(line);
        }
        var maxChannelHistory = this.preferences['output.maxChannelHistory'];
        if (this.lines.length > maxChannelHistory) {
            this.lines.splice(0, this.lines.length - maxChannelHistory);
        }
        this.contentChangeEmitter.fire(this);
    };
    OutputChannel.prototype.clear = function () {
        this.lines.length = 0;
        this.currentLine = undefined;
        this.contentChangeEmitter.fire(this);
    };
    OutputChannel.prototype.setVisibility = function (visible) {
        this.visible = visible;
        this.visibilityChangeEmitter.fire({ visible: visible });
    };
    OutputChannel.prototype.getLines = function () {
        if (this.currentLine !== undefined) {
            return __spread(this.lines, [this.currentLine]);
        }
        else {
            return this.lines;
        }
    };
    Object.defineProperty(OutputChannel.prototype, "isVisible", {
        get: function () {
            return this.visible;
        },
        enumerable: true,
        configurable: true
    });
    return OutputChannel;
}());
exports.OutputChannel = OutputChannel;
//# sourceMappingURL=output-channel.js.map