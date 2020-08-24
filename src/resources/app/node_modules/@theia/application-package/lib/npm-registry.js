"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpmRegistry = exports.NpmRegistryOptions = exports.sortByKey = exports.PublishedNodePackage = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var request = require("request");
var ChangesStream = require('changes-stream');
var application_props_1 = require("./application-props");
var PublishedNodePackage;
(function (PublishedNodePackage) {
    function is(pck) {
        return !!pck && !!pck.name && !!pck.version;
    }
    PublishedNodePackage.is = is;
})(PublishedNodePackage = exports.PublishedNodePackage || (exports.PublishedNodePackage = {}));
function sortByKey(object) {
    return Object.keys(object).sort().reduce(function (sorted, key) {
        sorted[key] = object[key];
        return sorted;
    }, {});
}
exports.sortByKey = sortByKey;
var NpmRegistryOptions = /** @class */ (function () {
    function NpmRegistryOptions() {
    }
    return NpmRegistryOptions;
}());
exports.NpmRegistryOptions = NpmRegistryOptions;
var NpmRegistry = /** @class */ (function () {
    function NpmRegistry(options) {
        this.props = __assign({}, application_props_1.NpmRegistryProps.DEFAULT);
        this.index = new Map();
        this.options = __assign({ watchChanges: false }, options);
        this.resetIndex();
    }
    NpmRegistry.prototype.updateProps = function (props) {
        var oldRegistry = this.props.registry;
        Object.assign(this.props, props);
        var newRegistry = this.props.registry;
        if (oldRegistry !== newRegistry) {
            this.resetIndex();
        }
    };
    NpmRegistry.prototype.resetIndex = function () {
        var _this = this;
        this.index.clear();
        if (this.options.watchChanges && this.props.registry === application_props_1.NpmRegistryProps.DEFAULT.registry) {
            if (this.changes) {
                this.changes.destroy();
            }
            // invalidate index with NPM registry web hooks
            // see: https://github.com/npm/registry-follower-tutorial
            var db = 'https://replicate.npmjs.com';
            this.changes = new ChangesStream({ db: db });
            this.changes.on('data', function (change) { return _this.invalidate(change.id); });
        }
    };
    NpmRegistry.prototype.invalidate = function (name) {
        if (this.index.delete(name)) {
            this.view(name);
        }
    };
    NpmRegistry.prototype.view = function (name) {
        var _this = this;
        var indexed = this.index.get(name);
        if (indexed) {
            return indexed;
        }
        var result = this.doView(name);
        this.index.set(name, result);
        result.catch(function () { return _this.index.delete(name); });
        return result;
    };
    NpmRegistry.prototype.doView = function (name) {
        var url = this.props.registry;
        if (name[0] === '@') {
            url += '@' + encodeURIComponent(name.substr(1));
        }
        else {
            url += encodeURIComponent(name);
        }
        var headers = {};
        return new Promise(function (resolve, reject) {
            request({
                url: url, headers: headers
            }, function (err, response, body) {
                if (err) {
                    reject(err);
                }
                else if (response.statusCode !== 200) {
                    reject(new Error(response.statusCode + ": " + response.statusMessage + " for " + url));
                }
                else {
                    var data = JSON.parse(body);
                    resolve(data);
                }
            });
        });
    };
    return NpmRegistry;
}());
exports.NpmRegistry = NpmRegistry;
//# sourceMappingURL=npm-registry.js.map