"use strict";
/********************************************************************************
 * Copyright (C) 2020 Ericsson and others.
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
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This test suite assumes that we run in a NodeJS environment!
 */
var child_process_1 = require("child_process");
var path_1 = require("path");
var shell_command_builder_1 = require("./shell-command-builder");
var safe_1 = require("colors/safe"); // tslint:disable-line:no-implicit-dependencies
var isWindows = process.platform === 'win32';
/**
 * Extra debugging info (very verbose).
 */
var _debug = Boolean(process.env['THEIA_PROCESS_TEST_DEBUG']);
/**
 * On Windows, some shells simply mess up the terminal's output.
 * Enable if you still want to test those.
 */
var _runWeirdShell = Boolean(process.env['THEIA_PROCESS_TEST_WEIRD_SHELL']) || undefined;
/**
 * You might only have issues with a specific shell (`cmd.exe` I am looking at you).
 */
var _onlyTestShell = process.env['THEIA_PROCESS_TEST_ONLY'] || undefined;
/**
 * Only log if environment variable is set.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debug() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    if (_debug) {
        console.debug.apply(console, __spread(parts));
    }
}
var testResources = path_1.join(__dirname, '../../src/common/tests');
var spawnOptions = {
    // We do our own quoting, don't rely on the one done by NodeJS:
    windowsVerbatimArguments: true,
    stdio: ['pipe', 'pipe', 'pipe'],
};
// Formatting options, used with `scanLines` for debugging.
var stdoutFormat = function (prefix) { return function (data) {
    return safe_1.bold(safe_1.yellow(prefix + " STDOUT:")) + " " + safe_1.bgYellow(safe_1.black(data));
}; };
var stderrFormat = function (prefix) { return function (data) {
    return safe_1.bold(safe_1.red(prefix + " STDERR:")) + " " + safe_1.bgRed(safe_1.white(data));
}; };
// Default error scanner
var errorScanner = function (handle) {
    if (/^\s*\w+Error:/.test(handle.line) ||
        /^\s*Cannot find /.test(handle.line)) {
        throw new Error(handle.text);
    }
};
// Yarn mangles the PATH and creates some proxy script around node(.exe),
// which messes up our environment, failing the tests.
var hostNodePath = process.env['npm_node_execpath'] ||
    process.env['NODE'];
if (!hostNodePath) {
    throw new Error('Could not determine the real node path.');
}
var shellCommandBuilder = new shell_command_builder_1.ShellCommandBuilder();
var shellConfigs = [{
        name: 'bash',
        path: isWindows
            ? _runWeirdShell && execShellCommand('where bash.exe')
            : execShellCommand('command -v bash'),
        nodePath: isWindows && 'node' // Good enough
    }, {
        name: 'wsl',
        path: isWindows
            ? _runWeirdShell && execShellCommand('where wsl.exe')
            : undefined,
        nodePath: isWindows && 'node' // Good enough
    }, {
        name: 'cmd',
        path: isWindows
            ? execShellCommand('where cmd.exe')
            : undefined,
    }, {
        name: 'powershell',
        path: execShellCommand(isWindows
            ? 'where powershell'
            : 'command -v pwsh'),
    }];
/* eslint-disable max-len */
// 18d/12m/19y - Ubuntu 16.04:
// Powershell sometimes fails when running as part of an npm lifecycle script.
// See following error:
//
//
//  FailFast:
//  The type initializer for 'Microsoft.PowerShell.ApplicationInsightsTelemetry' threw an exception.
//
//     at System.Environment.FailFast(System.String, System.Exception)
//     at System.Environment.FailFast(System.String, System.Exception)
//     at Microsoft.PowerShell.UnmanagedPSEntry.Start(System.String, System.String[], Int32)
//     at Microsoft.PowerShell.ManagedPSEntry.Main(System.String[])
//
//  Exception details:
//  System.TypeInitializationException: The type initializer for 'Microsoft.PowerShell.ApplicationInsightsTelemetry' threw an exception. ---> System.ArgumentException: Item has already been added. Key in dictionary: 'SPAWN_WRAP_SHIM_ROOT'  Key being added: 'SPAWN_WRAP_SHIM_ROOT'
//     at System.Collections.Hashtable.Insert(Object key, Object nvalue, Boolean add)
//     at System.Environment.ToHashtable(IEnumerable`1 pairs)
//     at System.Environment.GetEnvironmentVariables()
//     at Microsoft.ApplicationInsights.Extensibility.Implementation.Platform.PlatformImplementation..ctor()
//     at Microsoft.ApplicationInsights.Extensibility.Implementation.Platform.PlatformSingleton.get_Current()
//     at Microsoft.ApplicationInsights.Extensibility.Implementation.TelemetryConfigurationFactory.Initialize(TelemetryConfiguration configuration, TelemetryModules modules)
//     at Microsoft.ApplicationInsights.Extensibility.TelemetryConfiguration.get_Active()
//     at Microsoft.PowerShell.ApplicationInsightsTelemetry..cctor()
//     --- End of inner exception stack trace ---
//     at Microsoft.PowerShell.ApplicationInsightsTelemetry.SendPSCoreStartupTelemetry()
//     at Microsoft.PowerShell.ConsoleHost.Start(String bannerText, String helpText, String[] args)
//     at Microsoft.PowerShell.ConsoleShell.Start(String bannerText, String helpText, String[] args)
//     at Microsoft.PowerShell.UnmanagedPSEntry.Start(String consoleFilePath, String[] args, Int32 argc)
/* eslint-enable max-len */
var id = 0;
var _loop_1 = function (shellConfig) {
    var skipMessage;
    if (typeof _onlyTestShell === 'string' && shellConfig.name !== _onlyTestShell) {
        skipMessage = "only testing " + _onlyTestShell;
    }
    else if (!shellConfig.path) {
        // For each shell, skip if we could not find the executable path.
        skipMessage = 'cannot find shell';
    }
    else {
        // Run a test in the shell to catch runtime issues.
        // CI seems to have issues with some shells depending on the environment...
        try {
            var debugName = shellConfig.name + "/test";
            var shellTest = child_process_1.spawnSync(shellConfig.path, {
                input: 'echo abcdefghijkl\n\n',
                timeout: 5000,
            });
            debug(stdoutFormat(debugName)(shellTest.stdout.toString()));
            debug(stderrFormat(debugName)(shellTest.stderr.toString()));
            if (!/abcdefghijkl/m.test(shellTest.output.toString())) {
                skipMessage = 'wrong test output';
            }
        }
        catch (error) {
            console.error(error);
            skipMessage = 'error occurred';
        }
    }
    /**
     * If skipMessage is set, we should skip the test and explain why.
     */
    var describeOrSkip = function (callback) {
        var describeMessage = "test " + shellConfig.name + " commands";
        if (typeof skipMessage === 'undefined') {
            describe(describeMessage, callback);
        }
        else {
            describe.skip(describeMessage + " - skip: " + skipMessage, callback);
        }
    };
    describeOrSkip(function () {
        var _this = this;
        this.timeout(10000);
        var nodePath;
        var cwd;
        var submit;
        var processInfo;
        var context;
        beforeEach(function () {
            // In WSL, the node path is different than the host one (Windows vs Linux).
            nodePath = shellConfig.nodePath || hostNodePath;
            // On windows, when running bash we need to convert paths from Windows
            // to their mounting point, assuming bash is running within WSL.
            if (isWindows && /bash|wsl/.test(shellConfig.name)) {
                cwd = convertWindowsPath(testResources);
            }
            else {
                cwd = testResources;
            }
            // When running powershell, it seems like good measure to send `\n` twice...
            if (shellConfig.name === 'powershell') {
                submit = '\n\n';
            }
            // TestContext holds all state for a given test.
            var testContextName = shellConfig.name + "/" + ++id;
            context = new TestCaseContext(testContextName, submit);
            processInfo = createShell(context, shellConfig.path);
        });
        afterEach(function () {
            processInfo.shell.kill();
            context.finalize();
        });
        it('use simple environment variables', function () { return __awaiter(_this, void 0, void 0, function () {
            var envName, envValue;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        envName = 'SIMPLE_NAME';
                        envValue = 'SIMPLE_VALUE';
                        return [4 /*yield*/, testCommandLine(context, processInfo, {
                                cwd: cwd, args: [nodePath, '-p', "`[${process.env['" + envName + "']}]`"],
                                env: (_a = {},
                                    _a[envName] = envValue,
                                    _a)
                            }, [
                                // stderr
                                scanLines(context, processInfo.shell.stderr, errorScanner, stderrFormat(context.name)),
                                // stdout
                                scanLines(context, processInfo.shell.stdout, function (handle) {
                                    errorScanner(handle);
                                    if (handle.line.includes("[" + envValue + "]")) {
                                        handle.resolve();
                                    }
                                }, stdoutFormat(context.name)),
                            ])];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('use problematic environment variables', function () { return __awaiter(_this, void 0, void 0, function () {
            var envName, envValue;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        envName = 'A?B_C | D $PATH';
                        envValue = 'SUCCESS';
                        return [4 /*yield*/, testCommandLine(context, processInfo, {
                                cwd: cwd, args: [nodePath, '-p', "`[${process.env['" + envName + "']}]`"],
                                env: (_a = {},
                                    _a[envName] = envValue,
                                    _a)
                            }, [
                                // stderr
                                scanLines(context, processInfo.shell.stderr, errorScanner, stderrFormat(context.name)),
                                // stdout
                                scanLines(context, processInfo.shell.stdout, function (handle) {
                                    errorScanner(handle);
                                    if (handle.line.includes("[" + envValue + "]")) {
                                        handle.resolve();
                                    }
                                    if (handle.line.includes('[undefined]')) {
                                        handle.reject(new Error(handle.text));
                                    }
                                }, stdoutFormat(context.name)),
                            ])];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('command with complex arguments', function () { return __awaiter(_this, void 0, void 0, function () {
            var left, right;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        left = 'ABC';
                        right = 'DEF';
                        return [4 /*yield*/, testCommandLine(context, processInfo, {
                                cwd: cwd, args: [nodePath, '-e', "{\n                        const left = '" + left + "';\n                        const right = '" + right + "';\n                        console.log(`[${left}|${right}]`);\n                    }"],
                            }, [
                                // stderr
                                scanLines(context, processInfo.shell.stderr, errorScanner, stderrFormat(context.name)),
                                // stdout
                                scanLines(context, processInfo.shell.stdout, function (handle) {
                                    errorScanner(handle);
                                    if (handle.line.includes("[" + left + "|" + right + "]")) {
                                        handle.resolve();
                                    }
                                }, stdoutFormat(context.name)),
                            ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
};
try {
    for (var shellConfigs_1 = __values(shellConfigs), shellConfigs_1_1 = shellConfigs_1.next(); !shellConfigs_1_1.done; shellConfigs_1_1 = shellConfigs_1.next()) {
        var shellConfig = shellConfigs_1_1.value;
        _loop_1(shellConfig);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (shellConfigs_1_1 && !shellConfigs_1_1.done && (_a = shellConfigs_1.return)) _a.call(shellConfigs_1);
    }
    finally { if (e_1) throw e_1.error; }
}
/**
 * Allow `command` to fail and return undefined instead.
 */
function execShellCommand(command) {
    try {
        // If trimmed output is an empty string, return `undefined` instead:
        return child_process_1.execSync(command).toString().trim() || undefined;
    }
    catch (error) {
        console.error(command, error);
        return undefined;
    }
}
/**
 * When executing `bash.exe` on Windows, the `C:`, `D:`, etc drives are mounted under `/mnt/<drive>/...`
 */
function convertWindowsPath(windowsPath) {
    return windowsPath
        // Convert back-slashes to forward-slashes
        .replace(/\\/g, '/')
        // Convert drive-letter to usual mounting point in WSL
        .replace(/^[A-Za-z]:\//, function (s) { return "/mnt/" + s[0].toLowerCase() + "/"; });
}
/**
 * Display trailing whitespace in a string, such as \r and \n.
 */
function displayWhitespaces(line) {
    return line
        .replace(/\r?\n/, function (s) { return s.length === 2 ? '<\\r\\n>\r\n' : '<\\n>\n'; });
}
/**
 * Actually run `prepareCommandLine`.
 */
function testCommandLine(context, processInfo, options, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
firstOf) {
    return __awaiter(this, void 0, void 0, function () {
        var commandLine;
        return __generator(this, function (_a) {
            commandLine = shellCommandBuilder.buildCommand(processInfo, options);
            debug(safe_1.bold(safe_1.white(context.name + " STDIN:")) + " " + safe_1.bgWhite(safe_1.black(displayWhitespaces(commandLine))));
            processInfo.shell.stdin.write(commandLine + context.submit);
            return [2 /*return*/, Promise.race(firstOf)];
        });
    });
}
/**
 * Creates a `(Test)ProcessInfo` object by spawning the specified shell.
 */
function createShell(context, shellExecutable, shellArguments) {
    if (shellArguments === void 0) { shellArguments = []; }
    var shell = child_process_1.spawn(shellExecutable, shellArguments, spawnOptions);
    debug(safe_1.magenta(safe_1.bold(context.name + " SPAWN:") + " " + shellExecutable + " " + shellArguments.join(' ')));
    shell.on('close', function (code, signal) { return debug(safe_1.magenta(safe_1.bold(context.name + " CLOSE:") + " " + shellExecutable + " code(" + code + ") signal(" + signal + ")")); });
    return {
        executable: shellExecutable,
        arguments: [],
        shell: shell,
    };
}
/**
 * Fire `callback` once per new detected line.
 */
function scanLines(context, stream, callback, debugFormat) {
    if (debugFormat === void 0) { debugFormat = function (s) { return s; }; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var line = '';
                    var text = '';
                    stream.on('close', function () {
                        debug(debugFormat('<CLOSED>'));
                    });
                    // The `data` listener will be collected on 'close', which will happen
                    // once we kill the process.
                    stream.on('data', function (data) {
                        if (context.resolved) {
                            return;
                        }
                        var split = data.toString().split('\n');
                        while (!context.resolved && split.length > 1) {
                            line += split.shift() + '\n';
                            text += line;
                            debug(debugFormat(displayWhitespaces(line)));
                            try {
                                callback({
                                    resolve: function (value) {
                                        if (!context.resolved) {
                                            context.resolve();
                                            resolve(value);
                                            debug(safe_1.bold(safe_1.green(context.name + " SCANLINES RESOLVED")));
                                        }
                                    },
                                    reject: function (reason) {
                                        if (!context.resolved) {
                                            context.resolve();
                                            reject(reason);
                                            debug(safe_1.bold(safe_1.red(context.name + " SCANLINES REJECTED")));
                                        }
                                    },
                                    line: line,
                                    text: text,
                                });
                            }
                            catch (error) {
                                debug(safe_1.bold(safe_1.red(context.name + " SCANLINES THROWED")));
                                context.resolve();
                                reject(error);
                                break;
                            }
                            line = '';
                        }
                        line += split[0];
                    });
                })];
        });
    });
}
/**
 * We need a test case context to help with catching listeners that timed-out,
 * and synchronize multiple listeners so that when one resolves the test case,
 * the others can be put in "sleep mode" until destruction.
 */
var TestCaseContext = /** @class */ (function () {
    function TestCaseContext(
    /**
     * A name associated with this context, to help with debugging.
     */
    name, 
    /**
     * The characters to send in order to submit a command (mostly
     * powershell is causing issues).
     */
    submit, 
    /**
     * @internal Current state of the test case, if it is finished or not.
     */
    resolved) {
        if (submit === void 0) { submit = '\n'; }
        if (resolved === void 0) { resolved = false; }
        this.name = name;
        this.submit = submit;
        this.resolved = resolved;
    }
    TestCaseContext.prototype.resolve = function () {
        this.resolved = true;
    };
    TestCaseContext.prototype.finalize = function () {
        if (!this.resolved) {
            this.resolve();
            debug(safe_1.red(safe_1.bold(this.name + " CONTEXT:") + " context wasn't resolved when finalizing, resolving!"));
        }
    };
    return TestCaseContext;
}());
//# sourceMappingURL=shell-command-builder.slow-spec.js.map