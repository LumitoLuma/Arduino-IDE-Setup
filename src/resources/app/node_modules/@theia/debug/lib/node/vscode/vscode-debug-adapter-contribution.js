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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AbstractVSCodeDebugAdapterContribution = exports.VSCodeDebuggerContribution = void 0;
var fs = require("fs-extra");
var path = require("path");
var os_1 = require("@theia/core/lib/common/os");
var objects_1 = require("@theia/core/lib/common/objects");
var inversify_1 = require("inversify");
var nls;
(function (nls) {
    function localize(key, _default) {
        return _default;
    }
    nls.localize = localize;
})(nls || (nls = {}));
var INTERNAL_CONSOLE_OPTIONS_SCHEMA = {
    enum: ['neverOpen', 'openOnSessionStart', 'openOnFirstSessionStart'],
    default: 'openOnFirstSessionStart',
    description: nls.localize('internalConsoleOptions', 'Controls when the internal debug console should open.')
};
var VSCodeDebuggerContribution;
(function (VSCodeDebuggerContribution) {
    function toPlatformInfo(executable) {
        if (os_1.isWindows && !process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')) {
            return executable.winx86 || executable.win || executable.windows;
        }
        if (os_1.isWindows) {
            return executable.win || executable.windows;
        }
        if (os_1.isOSX) {
            return executable.osx;
        }
        return executable.linux;
    }
    VSCodeDebuggerContribution.toPlatformInfo = toPlatformInfo;
})(VSCodeDebuggerContribution = exports.VSCodeDebuggerContribution || (exports.VSCodeDebuggerContribution = {}));
var AbstractVSCodeDebugAdapterContribution = /** @class */ (function () {
    function AbstractVSCodeDebugAdapterContribution(type, extensionPath) {
        this.type = type;
        this.extensionPath = extensionPath;
        this.pckPath = path.join(this.extensionPath, 'package.json');
        this.pck = this.parse();
        this.debuggerContribution = this.resolveDebuggerContribution();
        this.label = this.debuggerContribution.then(function (_a) {
            var label = _a.label;
            return label;
        });
        this.languages = this.debuggerContribution.then(function (_a) {
            var languages = _a.languages;
            return languages;
        });
        this.schemaAttributes = this.resolveSchemaAttributes();
    }
    AbstractVSCodeDebugAdapterContribution.prototype.parse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var text, nlsPath, nlsMap, _a, _b, key, value;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, fs.readFile(this.pckPath)];
                    case 1:
                        text = (_d.sent()).toString();
                        nlsPath = path.join(this.extensionPath, 'package.nls.json');
                        if (fs.existsSync(nlsPath)) {
                            nlsMap = require(nlsPath);
                            try {
                                for (_a = __values(Object.keys(nlsMap)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    key = _b.value;
                                    value = nlsMap[key].replace(/\"/g, '\\"');
                                    text = text.split('%' + key + '%').join(value);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        return [2 /*return*/, JSON.parse(text)];
                }
            });
        });
    };
    AbstractVSCodeDebugAdapterContribution.prototype.resolveDebuggerContribution = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pck, debuggerContribution;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pck];
                    case 1:
                        pck = _a.sent();
                        debuggerContribution = pck.contributes.debuggers.find(function (d) { return d.type === _this.type; });
                        if (!debuggerContribution) {
                            throw new Error("Debugger contribution for '" + this.type + "' type is not found in " + this.pckPath);
                        }
                        return [2 /*return*/, debuggerContribution];
                }
            });
        });
    };
    AbstractVSCodeDebugAdapterContribution.prototype.getSchemaAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.schemaAttributes || (this.schemaAttributes = this.resolveSchemaAttributes())];
            });
        });
    };
    AbstractVSCodeDebugAdapterContribution.prototype.resolveSchemaAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var debuggerContribution, taskSchema, configurationAttributes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.debuggerContribution];
                    case 1:
                        debuggerContribution = _a.sent();
                        if (!debuggerContribution.configurationAttributes) {
                            return [2 /*return*/, []];
                        }
                        taskSchema = {};
                        configurationAttributes = debuggerContribution.configurationAttributes;
                        return [2 /*return*/, Object.keys(configurationAttributes).map(function (request) {
                                var attributes = objects_1.deepClone(configurationAttributes[request]);
                                var defaultRequired = ['name', 'type', 'request'];
                                attributes.required = attributes.required && attributes.required.length ? defaultRequired.concat(attributes.required) : defaultRequired;
                                attributes.additionalProperties = false;
                                attributes.type = 'object';
                                if (!attributes.properties) {
                                    attributes.properties = {};
                                }
                                var properties = attributes.properties;
                                properties['type'] = {
                                    enum: [_this.type],
                                    description: nls.localize('debugType', 'Type of configuration.'),
                                    pattern: '^(?!node2)',
                                    errorMessage: nls.localize('debugTypeNotRecognised', 'The debug type is not recognized. Make sure that you have a corresponding debug extension installed and that it is enabled.'),
                                    patternErrorMessage: nls.localize('node2NotSupported', '"node2" is no longer supported, use "node" instead and set the "protocol" attribute to "inspector".')
                                };
                                properties['name'] = {
                                    type: 'string',
                                    description: nls.localize('debugName', 'Name of configuration; appears in the launch configuration drop down menu.'),
                                    default: 'Launch'
                                };
                                properties['request'] = {
                                    enum: [request],
                                    description: nls.localize('debugRequest', 'Request type of configuration. Can be "launch" or "attach".'),
                                };
                                properties['debugServer'] = {
                                    type: 'number',
                                    description: nls.localize('debugServer', 'For debug extension development only: if a port is specified VS Code tries to connect to a debug adapter running in server mode'),
                                    default: 4711
                                };
                                properties['preLaunchTask'] = {
                                    anyOf: [taskSchema, {
                                            type: ['string'],
                                        }],
                                    default: '',
                                    defaultSnippets: [{ body: { task: '', type: '' } }],
                                    description: nls.localize('debugPrelaunchTask', 'Task to run before debug session starts.')
                                };
                                properties['postDebugTask'] = {
                                    anyOf: [taskSchema, {
                                            type: ['string',],
                                        }],
                                    default: '',
                                    defaultSnippets: [{ body: { task: '', type: '' } }],
                                    description: nls.localize('debugPostDebugTask', 'Task to run after debug session ends.')
                                };
                                properties['internalConsoleOptions'] = INTERNAL_CONSOLE_OPTIONS_SCHEMA;
                                var osProperties = Object.assign({}, properties);
                                properties['windows'] = {
                                    type: 'object',
                                    description: nls.localize('debugWindowsConfiguration', 'Windows specific launch configuration attributes.'),
                                    properties: osProperties
                                };
                                properties['osx'] = {
                                    type: 'object',
                                    description: nls.localize('debugOSXConfiguration', 'OS X specific launch configuration attributes.'),
                                    properties: osProperties
                                };
                                properties['linux'] = {
                                    type: 'object',
                                    description: nls.localize('debugLinuxConfiguration', 'Linux specific launch configuration attributes.'),
                                    properties: osProperties
                                };
                                Object.keys(attributes.properties).forEach(function (name) {
                                    // Use schema allOf property to get independent error reporting #21113
                                    attributes.properties[name].pattern = attributes.properties[name].pattern || '^(?!.*\\$\\{(env|config|command)\\.)';
                                    attributes.properties[name].patternErrorMessage = attributes.properties[name].patternErrorMessage ||
                                        nls.localize('deprecatedVariables', "'env.', 'config.' and 'command.' are deprecated, use 'env:', 'config:' and 'command:' instead.");
                                });
                                return attributes;
                            })];
                }
            });
        });
    };
    AbstractVSCodeDebugAdapterContribution.prototype.getConfigurationSnippets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var debuggerContribution;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.debuggerContribution];
                    case 1:
                        debuggerContribution = _a.sent();
                        return [2 /*return*/, debuggerContribution.configurationSnippets || []];
                }
            });
        });
    };
    AbstractVSCodeDebugAdapterContribution.prototype.provideDebugAdapterExecutable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contribution, info, program, programArgs, runtime, runtimeArgs, modulePath, command, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.debuggerContribution];
                    case 1:
                        contribution = _a.sent();
                        info = VSCodeDebuggerContribution.toPlatformInfo(contribution);
                        program = (info && info.program || contribution.program);
                        if (!program) {
                            return [2 /*return*/, undefined];
                        }
                        program = path.join(this.extensionPath, program);
                        programArgs = info && info.args || contribution.args || [];
                        runtime = info && info.runtime || contribution.runtime;
                        if (runtime && runtime.indexOf('./') === 0) {
                            runtime = path.join(this.extensionPath, runtime);
                        }
                        runtimeArgs = info && info.runtimeArgs || contribution.runtimeArgs || [];
                        if (runtime === 'node') {
                            modulePath = program;
                            return [2 /*return*/, {
                                    modulePath: modulePath,
                                    execArgv: runtimeArgs,
                                    args: programArgs
                                }];
                        }
                        else {
                            command = runtime ? runtime : program;
                            args = runtime ? __spread(runtimeArgs, [program], programArgs) : programArgs;
                            return [2 /*return*/, {
                                    command: command,
                                    args: args
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AbstractVSCodeDebugAdapterContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.unmanaged()),
        __param(1, inversify_1.unmanaged()),
        __metadata("design:paramtypes", [String, String])
    ], AbstractVSCodeDebugAdapterContribution);
    return AbstractVSCodeDebugAdapterContribution;
}());
exports.AbstractVSCodeDebugAdapterContribution = AbstractVSCodeDebugAdapterContribution;
//# sourceMappingURL=vscode-debug-adapter-contribution.js.map