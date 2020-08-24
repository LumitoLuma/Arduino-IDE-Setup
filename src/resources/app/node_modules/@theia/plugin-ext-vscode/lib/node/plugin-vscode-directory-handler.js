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
exports.PluginVsCodeDirectoryHandler = void 0;
var fs = require("fs");
var path = require("path");
var inversify_1 = require("inversify");
var plugin_ext_1 = require("@theia/plugin-ext");
var PluginVsCodeDirectoryHandler = /** @class */ (function () {
    function PluginVsCodeDirectoryHandler() {
    }
    PluginVsCodeDirectoryHandler.prototype.accept = function (plugin) {
        console.debug("Resolving \"" + plugin.id() + "\" as a VS Code extension...");
        return this.resolvePackage(plugin) || this.resolveFromSources(plugin) || this.resolveFromVSIX(plugin) || this.resolveFromNpmTarball(plugin);
    };
    PluginVsCodeDirectoryHandler.prototype.handle = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                context.pluginEntry().accept(plugin_ext_1.PluginDeployerEntryType.BACKEND);
                return [2 /*return*/];
            });
        });
    };
    PluginVsCodeDirectoryHandler.prototype.resolveFromSources = function (plugin) {
        var pluginPath = plugin.path();
        return this.resolvePackage(plugin, { pluginPath: pluginPath, pck: this.requirePackage(pluginPath) });
    };
    PluginVsCodeDirectoryHandler.prototype.resolveFromVSIX = function (plugin) {
        if (!fs.existsSync(path.join(plugin.path(), 'extension.vsixmanifest'))) {
            return false;
        }
        var pluginPath = path.join(plugin.path(), 'extension');
        return this.resolvePackage(plugin, { pluginPath: pluginPath, pck: this.requirePackage(pluginPath) });
    };
    PluginVsCodeDirectoryHandler.prototype.resolveFromNpmTarball = function (plugin) {
        var pluginPath = path.join(plugin.path(), 'package');
        return this.resolvePackage(plugin, { pluginPath: pluginPath, pck: this.requirePackage(pluginPath) });
    };
    PluginVsCodeDirectoryHandler.prototype.resolvePackage = function (plugin, options) {
        var _a = options || {
            pluginPath: plugin.path(),
            pck: plugin.getValue('package.json')
        }, pluginPath = _a.pluginPath, pck = _a.pck;
        if (!pck || !pck.name || !pck.version || !pck.engines || !pck.engines.vscode) {
            return false;
        }
        if (options) {
            plugin.storeValue('package.json', pck);
            plugin.rootPath = plugin.path();
            plugin.updatePath(pluginPath);
        }
        console.log("Resolved \"" + plugin.id() + "\" to a VS Code extension \"" + pck.name + "@" + pck.version + "\" with engines:", pck.engines);
        return true;
    };
    PluginVsCodeDirectoryHandler.prototype.requirePackage = function (pluginPath) {
        try {
            return require(path.join(pluginPath, 'package.json'));
        }
        catch (_a) {
            return undefined;
        }
    };
    PluginVsCodeDirectoryHandler = __decorate([
        inversify_1.injectable()
    ], PluginVsCodeDirectoryHandler);
    return PluginVsCodeDirectoryHandler;
}());
exports.PluginVsCodeDirectoryHandler = PluginVsCodeDirectoryHandler;
//# sourceMappingURL=plugin-vscode-directory-handler.js.map