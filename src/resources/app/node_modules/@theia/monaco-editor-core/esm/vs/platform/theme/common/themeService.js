/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createDecorator } from '../../instantiation/common/instantiation';
import { toDisposable } from '../../../base/common/lifecycle';
import * as platform from '../../registry/common/platform';
import { Emitter } from '../../../base/common/event';
export var IThemeService = createDecorator('themeService');
export function themeColorFromId(id) {
    return { id: id };
}
export var ThemeIcon;
(function (ThemeIcon) {
    function isThemeIcon(obj) {
        return obj && typeof obj === 'object' && typeof obj.id === 'string';
    }
    ThemeIcon.isThemeIcon = isThemeIcon;
    var _regexFromString = /^\$\(([a-z.]+\/)?([a-z-~]+)\)$/i;
    function fromString(str) {
        var match = _regexFromString.exec(str);
        if (!match) {
            return undefined;
        }
        var owner = match[1], name = match[2];
        if (!owner) {
            owner = "codicon/";
        }
        return { id: owner + name };
    }
    ThemeIcon.fromString = fromString;
    var _regexAsClassName = /^(codicon\/)?([a-z-]+)(~[a-z]+)?$/i;
    function asClassName(icon) {
        // todo@martin,joh -> this should go into the ThemeService
        var match = _regexAsClassName.exec(icon.id);
        if (!match) {
            return undefined;
        }
        var name = match[2], modifier = match[3];
        var className = "codicon codicon-" + name;
        if (modifier) {
            className += " " + modifier.substr(1);
        }
        return className;
    }
    ThemeIcon.asClassName = asClassName;
})(ThemeIcon || (ThemeIcon = {}));
export var FileThemeIcon = { id: 'file' };
export var FolderThemeIcon = { id: 'folder' };
// base themes
export var DARK = 'dark';
export var LIGHT = 'light';
export var HIGH_CONTRAST = 'hc';
export function getThemeTypeSelector(type) {
    switch (type) {
        case DARK: return 'vs-dark';
        case HIGH_CONTRAST: return 'hc-black';
        default: return 'vs';
    }
}
// static theming participant
export var Extensions = {
    ThemingContribution: 'base.contributions.theming'
};
var ThemingRegistry = /** @class */ (function () {
    function ThemingRegistry() {
        this.themingParticipants = [];
        this.themingParticipants = [];
        this.onThemingParticipantAddedEmitter = new Emitter();
    }
    ThemingRegistry.prototype.onThemeChange = function (participant) {
        var _this = this;
        this.themingParticipants.push(participant);
        this.onThemingParticipantAddedEmitter.fire(participant);
        return toDisposable(function () {
            var idx = _this.themingParticipants.indexOf(participant);
            _this.themingParticipants.splice(idx, 1);
        });
    };
    Object.defineProperty(ThemingRegistry.prototype, "onThemingParticipantAdded", {
        get: function () {
            return this.onThemingParticipantAddedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    ThemingRegistry.prototype.getThemingParticipants = function () {
        return this.themingParticipants;
    };
    return ThemingRegistry;
}());
var themingRegistry = new ThemingRegistry();
platform.Registry.add(Extensions.ThemingContribution, themingRegistry);
export function registerThemingParticipant(participant) {
    return themingRegistry.onThemeChange(participant);
}
