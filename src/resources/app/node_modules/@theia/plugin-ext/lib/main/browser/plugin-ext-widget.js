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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginWidget = void 0;
var React = require("react");
var inversify_1 = require("inversify");
var react_widget_1 = require("@theia/core/lib/browser/widgets/react-widget");
var alert_message_1 = require("@theia/core/lib/browser/widgets/alert-message");
var hosted_plugin_1 = require("../../hosted/browser/hosted-plugin");
var progress_bar_factory_1 = require("@theia/core/lib/browser/progress-bar-factory");
var disposable_1 = require("@theia/core/lib/common/disposable");
var PluginWidget = /** @class */ (function (_super) {
    __extends(PluginWidget, _super);
    function PluginWidget() {
        var _this = _super.call(this) || this;
        _this.toDisposeProgress = new disposable_1.DisposableCollection();
        _this.id = 'plugins';
        _this.title.label = 'Plugins';
        _this.title.caption = 'Plugins';
        _this.title.iconClass = 'fa plugins-tab-icon';
        _this.title.closable = true;
        _this.node.tabIndex = 0;
        _this.addClass('theia-plugins');
        _this.update();
        return _this;
    }
    PluginWidget.prototype.init = function () {
        var _this = this;
        this.toDispose.push(this.pluginService.onDidChangePlugins(function () { return _this.update(); }));
    };
    PluginWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        this.node.focus();
    };
    PluginWidget.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { ref: function (ref) {
                _this.toDisposeProgress.dispose();
                _this.toDispose.push(_this.toDisposeProgress);
                if (ref) {
                    _this.toDispose.push(_this.progressBarFactory({ container: _this.node, insertMode: 'prepend', locationId: hosted_plugin_1.PluginProgressLocation }));
                }
            } }, this.doRender());
    };
    PluginWidget.prototype.doRender = function () {
        var plugins = this.pluginService.plugins;
        if (!plugins.length) {
            return React.createElement(alert_message_1.AlertMessage, { type: 'INFO', header: 'No plugins currently available.' });
        }
        return React.createElement(React.Fragment, null, this.renderPlugins(plugins));
    };
    PluginWidget.prototype.renderPlugins = function (plugins) {
        var _this = this;
        return React.createElement("div", { id: 'pluginListContainer' }, plugins.sort(function (a, b) { return _this.compareMetadata(a, b); }).map(function (plugin) { return _this.renderPlugin(plugin); }));
    };
    PluginWidget.prototype.renderPlugin = function (plugin) {
        return React.createElement("div", { key: plugin.model.name, className: this.createPluginClassName(plugin) },
            React.createElement("div", { className: 'column flexcontainer pluginInformationContainer' },
                React.createElement("div", { className: 'row flexcontainer' },
                    React.createElement("div", { className: 'fa fa-puzzle-piece fa-2x fa-fw' }),
                    React.createElement("div", { title: plugin.model.name, className: 'pluginName noWrapInfo' }, plugin.model.name)),
                React.createElement("div", { className: 'row flexcontainer' },
                    React.createElement("div", { className: 'pluginVersion' }, plugin.model.version)),
                React.createElement("div", { className: 'row flexcontainer' },
                    React.createElement("div", { className: 'pluginDescription noWrapInfo' }, plugin.model.description)),
                React.createElement("div", { className: 'row flexcontainer' },
                    React.createElement("div", { className: 'pluginPublisher noWrapInfo flexcontainer' }, plugin.model.publisher))));
    };
    PluginWidget.prototype.createPluginClassName = function (plugin) {
        var classNames = ['pluginHeaderContainer'];
        return classNames.join(' ');
    };
    /**
     * Compare two plugins based on their names, and publishers.
     * @param a the first plugin metadata.
     * @param b the second plugin metadata.
     */
    PluginWidget.prototype.compareMetadata = function (a, b) {
        // Determine the name of the plugins.
        var nameA = a.model.name.toLowerCase();
        var nameB = b.model.name.toLowerCase();
        // Determine the publisher of the plugin (when names are equal).
        var publisherA = a.model.publisher.toLowerCase();
        var publisherB = b.model.publisher.toLowerCase();
        return (nameA === nameA)
            ? nameA.localeCompare(nameB)
            : publisherA.localeCompare(publisherB);
    };
    __decorate([
        inversify_1.inject(hosted_plugin_1.HostedPluginSupport),
        __metadata("design:type", hosted_plugin_1.HostedPluginSupport)
    ], PluginWidget.prototype, "pluginService", void 0);
    __decorate([
        inversify_1.inject(progress_bar_factory_1.ProgressBarFactory),
        __metadata("design:type", Function)
    ], PluginWidget.prototype, "progressBarFactory", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PluginWidget.prototype, "init", null);
    PluginWidget = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], PluginWidget);
    return PluginWidget;
}(react_widget_1.ReactWidget));
exports.PluginWidget = PluginWidget;
//# sourceMappingURL=plugin-ext-widget.js.map