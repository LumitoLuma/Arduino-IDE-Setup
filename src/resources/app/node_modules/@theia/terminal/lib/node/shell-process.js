"use strict";
/********************************************************************************
 * Copyright (C) 2017 Ericsson and others.
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ShellProcess = exports.ShellProcessOptions = exports.ShellProcessFactory = void 0;
var inversify_1 = require("inversify");
var os = require("os");
var logger_1 = require("@theia/core/lib/common/logger");
var node_1 = require("@theia/process/lib/node");
var common_1 = require("@theia/core/lib/common");
var uri_1 = require("@theia/core/lib/common/uri");
var file_uri_1 = require("@theia/core/lib/node/file-uri");
var utils_1 = require("@theia/process/lib/node/utils");
exports.ShellProcessFactory = Symbol('ShellProcessFactory');
exports.ShellProcessOptions = Symbol('ShellProcessOptions');
function setUpEnvVariables(customEnv) {
    var e_1, _a;
    var processEnv = {};
    var prEnv = process.env;
    Object.keys(prEnv).forEach(function (key) {
        processEnv[key] = prEnv[key] || '';
    });
    if (customEnv) {
        try {
            for (var _b = __values(Object.keys(customEnv)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var envName = _c.value;
                processEnv[envName] = customEnv[envName] || '';
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return processEnv;
}
function getRootPath(rootURI) {
    if (rootURI) {
        var uri = new uri_1.default(rootURI);
        return file_uri_1.FileUri.fsPath(uri);
    }
    else {
        return os.homedir();
    }
}
var ShellProcess = /** @class */ (function (_super) {
    __extends(ShellProcess, _super);
    function ShellProcess(// eslint-disable-next-line @typescript-eslint/indent
    options, processManager, ringBuffer, logger) {
        return _super.call(this, {
            command: options.shell || ShellProcess_1.getShellExecutablePath(options.shellPreferences),
            args: options.args || ShellProcess_1.getShellExecutableArgs(options.shellPreferences),
            options: {
                name: 'xterm-color',
                cols: options.cols || ShellProcess_1.defaultCols,
                rows: options.rows || ShellProcess_1.defaultRows,
                cwd: getRootPath(options.rootURI),
                env: setUpEnvVariables(options.env),
            },
            isPseudo: options.isPseudo,
        }, processManager, ringBuffer, logger) || this;
    }
    ShellProcess_1 = ShellProcess;
    ShellProcess.getShellExecutablePath = function (preferences) {
        var shell = process.env.THEIA_SHELL;
        if (shell) {
            return shell;
        }
        if (preferences && preferences.shell[common_1.OS.type()]) {
            return preferences.shell[common_1.OS.type()];
        }
        else if (common_1.isWindows) {
            return 'cmd.exe';
        }
        else {
            return process.env.SHELL;
        }
    };
    ShellProcess.getShellExecutableArgs = function (preferences) {
        var args = process.env.THEIA_SHELL_ARGS;
        if (args) {
            return utils_1.parseArgs(args);
        }
        if (preferences) {
            return preferences.shellArgs[common_1.OS.type()];
        }
        else if (common_1.isOSX) {
            return ['-l'];
        }
        else {
            return [];
        }
    };
    var ShellProcess_1;
    ShellProcess.defaultCols = 80;
    ShellProcess.defaultRows = 24;
    ShellProcess = ShellProcess_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(exports.ShellProcessOptions)),
        __param(1, inversify_1.inject(node_1.ProcessManager)),
        __param(2, inversify_1.inject(node_1.MultiRingBuffer)),
        __param(3, inversify_1.inject(logger_1.ILogger)), __param(3, inversify_1.named('terminal')),
        __metadata("design:paramtypes", [Object, node_1.ProcessManager,
            node_1.MultiRingBuffer, Object])
    ], ShellProcess);
    return ShellProcess;
}(node_1.TerminalProcess));
exports.ShellProcess = ShellProcess;
//# sourceMappingURL=shell-process.js.map