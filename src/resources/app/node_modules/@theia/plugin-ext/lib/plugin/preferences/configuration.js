"use strict";
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationModel = exports.Configuration = void 0;
var types_1 = require("../../common/types");
var cloneDeep = require("lodash.clonedeep");
/* eslint-disable @typescript-eslint/no-explicit-any */
var Configuration = /** @class */ (function () {
    function Configuration(defaultConfiguration, userConfiguration, workspaceConfiguration, folderConfigurations) {
        if (workspaceConfiguration === void 0) { workspaceConfiguration = new ConfigurationModel(); }
        if (folderConfigurations === void 0) { folderConfigurations = {}; }
        this.defaultConfiguration = defaultConfiguration;
        this.userConfiguration = userConfiguration;
        this.workspaceConfiguration = workspaceConfiguration;
        this.folderConfigurations = folderConfigurations;
        this.folderCombinedConfigs = {};
    }
    Configuration.prototype.getValue = function (section, workspace, resource) {
        return this.getCombinedResourceConfig(workspace, resource).getValue(section);
    };
    Configuration.prototype.inspect = function (key, workspace, resource) {
        var combinedConfiguration = this.getCombinedResourceConfig(workspace, resource);
        var folderConfiguration = this.getFolderResourceConfig(workspace, resource);
        return {
            default: this.defaultConfiguration.getValue(key),
            user: this.userConfiguration.getValue(key),
            workspace: workspace ? this.workspaceConfiguration.getValue(key) : undefined,
            workspaceFolder: folderConfiguration ? folderConfiguration.getValue(key) : undefined,
            value: combinedConfiguration.getValue(key)
        };
    };
    Configuration.prototype.getCombinedResourceConfig = function (workspace, resource) {
        var combinedConfig = this.getCombinedConfig();
        if (!workspace || !resource) {
            return combinedConfig;
        }
        var workspaceFolder = workspace.getWorkspaceFolder(resource);
        if (!workspaceFolder) {
            return combinedConfig;
        }
        return this.getFolderCombinedConfig(workspaceFolder.uri.toString()) || combinedConfig;
    };
    Configuration.prototype.getCombinedConfig = function () {
        if (!this.combinedConfig) {
            this.combinedConfig = this.defaultConfiguration.merge(this.userConfiguration, this.workspaceConfiguration);
        }
        return this.combinedConfig;
    };
    Configuration.prototype.getFolderCombinedConfig = function (folder) {
        if (this.folderCombinedConfigs[folder]) {
            return this.folderCombinedConfigs[folder];
        }
        var combinedConfig = this.getCombinedConfig();
        var folderConfig = this.folderConfigurations[folder];
        if (!folderConfig) {
            return combinedConfig;
        }
        var folderCombinedConfig = combinedConfig.merge(folderConfig);
        this.folderCombinedConfigs[folder] = folderCombinedConfig;
        return folderCombinedConfig;
    };
    Configuration.prototype.getFolderResourceConfig = function (workspace, resource) {
        if (!workspace || !resource) {
            return;
        }
        var workspaceFolder = workspace.getWorkspaceFolder(resource);
        if (!workspaceFolder) {
            return;
        }
        return this.folderConfigurations[workspaceFolder.uri.toString()];
    };
    return Configuration;
}());
exports.Configuration = Configuration;
var ConfigurationModel = /** @class */ (function () {
    function ConfigurationModel(contents, keys) {
        if (contents === void 0) { contents = {}; }
        if (keys === void 0) { keys = []; }
        this.contents = contents;
        this.keys = keys;
    }
    ConfigurationModel.prototype.getValue = function (section) {
        if (!section) {
            return this.contents;
        }
        var path = section.split('.');
        var current = this.contents;
        for (var i = 0; i < path.length; i++) {
            if (typeof current !== 'object' || current === null) {
                return undefined;
            }
            current = current[path[i]];
        }
        return current;
    };
    ConfigurationModel.prototype.merge = function () {
        var e_1, _a;
        var others = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            others[_i] = arguments[_i];
        }
        var contents = cloneDeep(this.contents);
        var allKeys = __spread(this.keys);
        try {
            for (var others_1 = __values(others), others_1_1 = others_1.next(); !others_1_1.done; others_1_1 = others_1.next()) {
                var other = others_1_1.value;
                this.mergeContents(contents, other.contents);
                this.mergeKeys(allKeys, other.keys);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (others_1_1 && !others_1_1.done && (_a = others_1.return)) _a.call(others_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new ConfigurationModel(contents, allKeys);
    };
    ConfigurationModel.prototype.mergeContents = function (source, target) {
        var e_2, _a;
        try {
            for (var _b = __values(Object.keys(target)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (key in source) {
                    if (types_1.isObject(source[key]) && types_1.isObject(target[key])) {
                        this.mergeContents(source[key], target[key]);
                        continue;
                    }
                }
                source[key] = cloneDeep(target[key]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    ConfigurationModel.prototype.mergeKeys = function (source, target) {
        var e_3, _a;
        try {
            for (var target_1 = __values(target), target_1_1 = target_1.next(); !target_1_1.done; target_1_1 = target_1.next()) {
                var key = target_1_1.value;
                if (source.indexOf(key) === -1) {
                    source.push(key);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (target_1_1 && !target_1_1.done && (_a = target_1.return)) _a.call(target_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    return ConfigurationModel;
}());
exports.ConfigurationModel = ConfigurationModel;
//# sourceMappingURL=configuration.js.map