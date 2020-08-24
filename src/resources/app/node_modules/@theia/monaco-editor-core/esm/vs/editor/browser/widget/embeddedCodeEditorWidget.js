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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import * as objects from '../../../base/common/objects';
import { ICodeEditorService } from '../services/codeEditorService';
import { CodeEditorWidget } from './codeEditorWidget';
import { DiffEditorWidget } from './diffEditorWidget';
import { IEditorWorkerService } from '../../common/services/editorWorkerService';
import { ICommandService } from '../../../platform/commands/common/commands';
import { IContextKeyService } from '../../../platform/contextkey/common/contextkey';
import { IInstantiationService } from '../../../platform/instantiation/common/instantiation';
import { INotificationService } from '../../../platform/notification/common/notification';
import { IThemeService } from '../../../platform/theme/common/themeService';
import { IAccessibilityService } from '../../../platform/accessibility/common/accessibility';
import { IContextMenuService } from '../../../platform/contextview/browser/contextView';
import { IClipboardService } from '../../../platform/clipboard/common/clipboardService';
import { IEditorProgressService } from '../../../platform/progress/common/progress';
var EmbeddedCodeEditorWidget = /** @class */ (function (_super) {
    __extends(EmbeddedCodeEditorWidget, _super);
    function EmbeddedCodeEditorWidget(domElement, options, parentEditor, instantiationService, codeEditorService, commandService, contextKeyService, themeService, notificationService, accessibilityService) {
        var _this = _super.call(this, domElement, parentEditor.getRawOptions(), {}, instantiationService, codeEditorService, commandService, contextKeyService, themeService, notificationService, accessibilityService) || this;
        _this._parentEditor = parentEditor;
        _this._overwriteOptions = options;
        // Overwrite parent's options
        _super.prototype.updateOptions.call(_this, _this._overwriteOptions);
        _this._register(parentEditor.onDidChangeConfiguration(function (e) { return _this._onParentConfigurationChanged(e); }));
        return _this;
    }
    EmbeddedCodeEditorWidget.prototype.getParentEditor = function () {
        return this._parentEditor;
    };
    EmbeddedCodeEditorWidget.prototype._onParentConfigurationChanged = function (e) {
        _super.prototype.updateOptions.call(this, this._parentEditor.getRawOptions());
        _super.prototype.updateOptions.call(this, this._overwriteOptions);
    };
    EmbeddedCodeEditorWidget.prototype.updateOptions = function (newOptions) {
        objects.mixin(this._overwriteOptions, newOptions, true);
        _super.prototype.updateOptions.call(this, this._overwriteOptions);
    };
    EmbeddedCodeEditorWidget = __decorate([
        __param(3, IInstantiationService),
        __param(4, ICodeEditorService),
        __param(5, ICommandService),
        __param(6, IContextKeyService),
        __param(7, IThemeService),
        __param(8, INotificationService),
        __param(9, IAccessibilityService)
    ], EmbeddedCodeEditorWidget);
    return EmbeddedCodeEditorWidget;
}(CodeEditorWidget));
export { EmbeddedCodeEditorWidget };
var EmbeddedDiffEditorWidget = /** @class */ (function (_super) {
    __extends(EmbeddedDiffEditorWidget, _super);
    function EmbeddedDiffEditorWidget(domElement, options, parentEditor, editorWorkerService, contextKeyService, instantiationService, codeEditorService, themeService, notificationService, contextMenuService, clipboardService, editorProgressService) {
        var _this = _super.call(this, domElement, parentEditor.getRawOptions(), clipboardService, editorWorkerService, contextKeyService, instantiationService, codeEditorService, themeService, notificationService, contextMenuService, editorProgressService) || this;
        _this._parentEditor = parentEditor;
        _this._overwriteOptions = options;
        // Overwrite parent's options
        _super.prototype.updateOptions.call(_this, _this._overwriteOptions);
        _this._register(parentEditor.onDidChangeConfiguration(function (e) { return _this._onParentConfigurationChanged(e); }));
        return _this;
    }
    EmbeddedDiffEditorWidget.prototype.getParentEditor = function () {
        return this._parentEditor;
    };
    EmbeddedDiffEditorWidget.prototype._onParentConfigurationChanged = function (e) {
        _super.prototype.updateOptions.call(this, this._parentEditor.getRawOptions());
        _super.prototype.updateOptions.call(this, this._overwriteOptions);
    };
    EmbeddedDiffEditorWidget.prototype.updateOptions = function (newOptions) {
        objects.mixin(this._overwriteOptions, newOptions, true);
        _super.prototype.updateOptions.call(this, this._overwriteOptions);
    };
    EmbeddedDiffEditorWidget = __decorate([
        __param(3, IEditorWorkerService),
        __param(4, IContextKeyService),
        __param(5, IInstantiationService),
        __param(6, ICodeEditorService),
        __param(7, IThemeService),
        __param(8, INotificationService),
        __param(9, IContextMenuService),
        __param(10, IClipboardService),
        __param(11, IEditorProgressService)
    ], EmbeddedDiffEditorWidget);
    return EmbeddedDiffEditorWidget;
}(DiffEditorWidget));
export { EmbeddedDiffEditorWidget };
