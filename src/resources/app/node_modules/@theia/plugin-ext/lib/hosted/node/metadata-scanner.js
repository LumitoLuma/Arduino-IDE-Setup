"use strict";
/********************************************************************************
 * Copyright (C) 2015-2018 Red Hat, Inc.
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataScanner = void 0;
var inversify_1 = require("inversify");
var plugin_protocol_1 = require("../../common/plugin-protocol");
var MetadataScanner = /** @class */ (function () {
    function MetadataScanner(// eslint-disable-next-line @typescript-eslint/indent
    scanners) {
        var _this = this;
        this.scanners = new Map();
        scanners.forEach(function (scanner) {
            _this.scanners.set(scanner.apiType, scanner);
        });
    }
    MetadataScanner.prototype.getPluginMetadata = function (plugin) {
        var scanner = this.getScanner(plugin);
        return {
            host: 'main',
            model: scanner.getModel(plugin),
            lifecycle: scanner.getLifecycle(plugin)
        };
    };
    /**
     * Returns the first suitable scanner.
     *
     * @param {PluginPackage} plugin
     * @returns {PluginScanner}
     */
    MetadataScanner.prototype.getScanner = function (plugin) {
        var _this = this;
        var scanner;
        if (plugin && plugin.engines) {
            var scanners = Object.keys(plugin.engines)
                .filter(function (engineName) { return _this.scanners.has(engineName); })
                .map(function (engineName) { return _this.scanners.get(engineName); });
            // get the first suitable scanner from the list
            scanner = scanners[0];
        }
        if (!scanner) {
            throw new Error('There is no suitable scanner found for ' + plugin.name);
        }
        return scanner;
    };
    MetadataScanner = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.multiInject(plugin_protocol_1.PluginScanner)),
        __metadata("design:paramtypes", [Array])
    ], MetadataScanner);
    return MetadataScanner;
}());
exports.MetadataScanner = MetadataScanner;
//# sourceMappingURL=metadata-scanner.js.map