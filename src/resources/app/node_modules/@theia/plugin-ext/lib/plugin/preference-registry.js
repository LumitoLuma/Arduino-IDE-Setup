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
exports.PreferenceRegistryExtImpl = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var event_1 = require("@theia/core/lib/common/event");
var plugin_api_rpc_1 = require("../common/plugin-api-rpc");
var types_1 = require("../common/types");
var configuration_1 = require("./preferences/configuration");
var cloneDeep = require("lodash.clonedeep");
var ConfigurationTarget;
(function (ConfigurationTarget) {
    ConfigurationTarget[ConfigurationTarget["Global"] = 1] = "Global";
    ConfigurationTarget[ConfigurationTarget["Workspace"] = 2] = "Workspace";
    ConfigurationTarget[ConfigurationTarget["WorkspaceFolder"] = 3] = "WorkspaceFolder";
})(ConfigurationTarget || (ConfigurationTarget = {}));
var PreferenceScope;
(function (PreferenceScope) {
    PreferenceScope[PreferenceScope["Default"] = 0] = "Default";
    PreferenceScope[PreferenceScope["User"] = 1] = "User";
    PreferenceScope[PreferenceScope["Workspace"] = 2] = "Workspace";
    PreferenceScope[PreferenceScope["Folder"] = 3] = "Folder";
})(PreferenceScope || (PreferenceScope = {}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lookUp(tree, key) {
    if (!key) {
        return;
    }
    var parts = key.split('.');
    var node = tree;
    for (var i = 0; node && i < parts.length; i++) {
        node = node[parts[i]];
    }
    return node;
}
var PreferenceRegistryExtImpl = /** @class */ (function () {
    function PreferenceRegistryExtImpl(rpc, workspace) {
        this.workspace = workspace;
        this._onDidChangeConfiguration = new event_1.Emitter();
        this.onDidChangeConfiguration = this._onDidChangeConfiguration.event;
        this.OVERRIDE_PROPERTY = '\\[(.*)\\]$';
        this.OVERRIDE_PROPERTY_PATTERN = new RegExp(this.OVERRIDE_PROPERTY);
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.PREFERENCE_REGISTRY_MAIN);
    }
    PreferenceRegistryExtImpl.prototype.init = function (data) {
        this._preferences = this.parse(data);
    };
    PreferenceRegistryExtImpl.prototype.$acceptConfigurationChanged = function (data, eventData) {
        this.init(data);
        this._onDidChangeConfiguration.fire(this.toConfigurationChangeEvent(eventData));
    };
    PreferenceRegistryExtImpl.prototype.getConfiguration = function (section, resource, extensionId) {
        var _this = this;
        resource = resource === null ? undefined : resource;
        var preferences = this.toReadonlyValue(section
            ? lookUp(this._preferences.getValue(undefined, this.workspace, resource), section)
            : this._preferences.getValue(undefined, this.workspace, resource));
        var configuration = {
            has: function (key) {
                return typeof lookUp(preferences, key) !== 'undefined';
            },
            get: function (key, defaultValue) {
                var result = lookUp(preferences, key);
                if (typeof result === 'undefined') {
                    return defaultValue;
                }
                else {
                    var clonedConfig_1 = undefined;
                    var cloneOnWriteProxy_1 = function (target, accessor) {
                        var clonedTarget = undefined;
                        var cloneTarget = function () {
                            clonedConfig_1 = clonedConfig_1 ? clonedConfig_1 : cloneDeep(preferences);
                            clonedTarget = clonedTarget ? cloneTarget : lookUp(clonedConfig_1, accessor);
                        };
                        if (!types_1.isObject(target)) {
                            return target;
                        }
                        return new Proxy(target, {
                            get: function (targ, prop) {
                                if (typeof prop === 'string' && prop.toLowerCase() === 'tojson') {
                                    cloneTarget();
                                    return function () { return clonedTarget; };
                                }
                                if (clonedConfig_1) {
                                    clonedTarget = clonedTarget ? clonedTarget : lookUp(clonedConfig_1, accessor);
                                    return clonedTarget[prop];
                                }
                                var res = targ[prop];
                                if (typeof prop === 'string') {
                                    return cloneOnWriteProxy_1(res, accessor + "." + prop);
                                }
                                return res;
                            },
                            set: function (targ, prop, val) {
                                cloneTarget();
                                clonedTarget[prop] = val;
                                return true;
                            },
                            deleteProperty: function (targ, prop) {
                                cloneTarget();
                                delete clonedTarget[prop];
                                return true;
                            },
                            defineProperty: function (targ, prop, descr) {
                                cloneTarget();
                                Object.defineProperty(clonedTarget, prop, descr);
                                return true;
                            }
                        });
                    };
                    return cloneOnWriteProxy_1(result, key);
                }
            },
            update: function (key, value, arg) {
                key = section ? section + "." + key : key;
                var resourceStr = resource ? resource.toString() : undefined;
                if (typeof value !== 'undefined') {
                    return _this.proxy.$updateConfigurationOption(arg, key, value, resourceStr);
                }
                else {
                    return _this.proxy.$removeConfigurationOption(arg, key, resourceStr);
                }
            },
            inspect: function (key) {
                key = section ? section + "." + key : key;
                resource = resource === null ? undefined : resource;
                var result = cloneDeep(_this._preferences.inspect(key, _this.workspace, resource));
                if (!result) {
                    return undefined;
                }
                var configInspect = { key: key };
                if (typeof result.default !== 'undefined') {
                    configInspect.defaultValue = result.default;
                }
                if (typeof result.user !== 'undefined') {
                    configInspect.globalValue = result.user;
                }
                if (typeof result.workspace !== 'undefined') {
                    configInspect.workspaceValue = result.workspace;
                }
                if (typeof result.workspaceFolder !== 'undefined') {
                    configInspect.workspaceFolderValue = result.workspaceFolder;
                }
                return configInspect;
            }
        };
        if (typeof preferences === 'object') {
            types_1.mixin(configuration, preferences, false);
        }
        return Object.freeze(configuration);
    };
    PreferenceRegistryExtImpl.prototype.toReadonlyValue = function (data) {
        var readonlyProxy = function (target) { return types_1.isObject(target)
            ? new Proxy(target, {
                get: function (targ, prop) { return readonlyProxy(targ[prop]); },
                set: function (targ, prop, val) {
                    throw new Error("TypeError: Cannot assign to read only property '" + prop + "' of object");
                },
                deleteProperty: function (targ, prop) {
                    throw new Error("TypeError: Cannot delete read only property '" + prop + "' of object");
                },
                defineProperty: function (targ, prop) {
                    throw new Error("TypeError: Cannot define property '" + prop + "' of a readonly object");
                },
                setPrototypeOf: function (targ) {
                    throw new Error('TypeError: Cannot set prototype for a readonly object');
                },
                isExtensible: function () { return false; },
                preventExtensions: function () { return true; }
            })
            : target; };
        return readonlyProxy(data);
    };
    PreferenceRegistryExtImpl.prototype.parse = function (data) {
        var _this = this;
        var defaultConfiguration = this.getConfigurationModel(data[PreferenceScope.Default]);
        var userConfiguration = this.getConfigurationModel(data[PreferenceScope.User]);
        var workspaceConfiguration = this.getConfigurationModel(data[PreferenceScope.Workspace]);
        var folderConfigurations = {};
        Object.keys(data[PreferenceScope.Folder]).forEach(function (resource) {
            folderConfigurations[resource] = _this.getConfigurationModel(data[PreferenceScope.Folder][resource]);
        });
        return new configuration_1.Configuration(defaultConfiguration, userConfiguration, workspaceConfiguration, folderConfigurations);
    };
    PreferenceRegistryExtImpl.prototype.getConfigurationModel = function (data) {
        if (!data) {
            return new configuration_1.ConfigurationModel();
        }
        return new configuration_1.ConfigurationModel(this.parseConfigurationData(data), Object.keys(data));
    };
    PreferenceRegistryExtImpl.prototype.parseConfigurationData = function (data) {
        var _this = this;
        return Object.keys(data).reduce(function (result, key) {
            var parts = key.split('.');
            var branch = result;
            for (var i = 0; i < parts.length; i++) {
                if (i === parts.length - 1) {
                    branch[parts[i]] = data[key];
                    continue;
                }
                if (!branch[parts[i]]) {
                    branch[parts[i]] = {};
                }
                branch = branch[parts[i]];
                // overridden properties should be transformed into
                // "[overridden_identifier]" : {
                //              "property1" : "value1"
                //              "property2" : "value2"
                //  }
                if (i === 0 && _this.OVERRIDE_PROPERTY_PATTERN.test(parts[i])) {
                    branch[key.substring(parts[0].length + 1)] = data[key];
                    break;
                }
            }
            return result;
        }, {});
    };
    PreferenceRegistryExtImpl.prototype.toConfigurationChangeEvent = function (eventData) {
        return Object.freeze({
            affectsConfiguration: function (section, uri) {
                var e_1, _a;
                try {
                    // TODO respect uri
                    // TODO respect scopes shadowing
                    for (var eventData_1 = __values(eventData), eventData_1_1 = eventData_1.next(); !eventData_1_1.done; eventData_1_1 = eventData_1.next()) {
                        var change = eventData_1_1.value;
                        var tree = change.preferenceName
                            .split('.')
                            .reverse()
                            .reduce(function (prevValue, curValue) {
                            var _a;
                            return (_a = {}, _a[curValue] = prevValue, _a);
                        }, change.newValue);
                        return typeof lookUp(tree, section) !== 'undefined';
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (eventData_1_1 && !eventData_1_1.done && (_a = eventData_1.return)) _a.call(eventData_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return false;
            }
        });
    };
    return PreferenceRegistryExtImpl;
}());
exports.PreferenceRegistryExtImpl = PreferenceRegistryExtImpl;
//# sourceMappingURL=preference-registry.js.map