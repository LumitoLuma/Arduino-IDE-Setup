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
exports.bindPrompt = exports.bindRepositoryWatcher = exports.bindGit = exports.GitBindingOptions = void 0;
var inversify_1 = require("inversify");
var git_1 = require("../common/git");
var git_watcher_1 = require("../common/git-watcher");
var dugite_git_1 = require("./dugite-git");
var dugite_git_watcher_1 = require("./dugite-git-watcher");
var common_1 = require("@theia/core/lib/common");
var git_repository_manager_1 = require("./git-repository-manager");
var git_repository_watcher_1 = require("./git-repository-watcher");
var git_locator_protocol_1 = require("./git-locator/git-locator-protocol");
var git_locator_client_1 = require("./git-locator/git-locator-client");
var git_locator_impl_1 = require("./git-locator/git-locator-impl");
var git_exec_provider_1 = require("./git-exec-provider");
var git_prompt_1 = require("../common/git-prompt");
var dugite_git_prompt_1 = require("./dugite-git-prompt");
var connection_container_module_1 = require("@theia/core/lib/node/messaging/connection-container-module");
var git_init_1 = require("./init/git-init");
var SINGLE_THREADED = process.argv.indexOf('--no-cluster') !== -1;
var GitBindingOptions;
(function (GitBindingOptions) {
    GitBindingOptions.Default = {
        bindManager: function (binding) {
            return binding.to(git_repository_manager_1.GitRepositoryManager).inSingletonScope();
        }
    };
})(GitBindingOptions = exports.GitBindingOptions || (exports.GitBindingOptions = {}));
function bindGit(bind, bindingOptions) {
    if (bindingOptions === void 0) { bindingOptions = GitBindingOptions.Default; }
    bindingOptions.bindManager(bind(git_repository_manager_1.GitRepositoryManager));
    bind(git_repository_watcher_1.GitRepositoryWatcherFactory).toFactory(function (ctx) { return function (options) {
        // GitRepositoryWatcherFactory is injected into the singleton GitRepositoryManager only.
        // GitRepositoryWatcher instances created there should be able to access the (singleton) Git.
        var child = new inversify_1.Container({ defaultScope: 'Singleton' });
        child.parent = ctx.container;
        child.bind(git_repository_watcher_1.GitRepositoryWatcher).toSelf();
        child.bind(git_repository_watcher_1.GitRepositoryWatcherOptions).toConstantValue(options);
        return child.get(git_repository_watcher_1.GitRepositoryWatcher);
    }; });
    if (SINGLE_THREADED) {
        bind(git_locator_protocol_1.GitLocator).toDynamicValue(function (ctx) {
            var logger = ctx.container.get(common_1.ILogger);
            return new git_locator_impl_1.GitLocatorImpl({
                info: function (message) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return logger.info.apply(logger, __spread([message], args));
                },
                error: function (message) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return logger.error.apply(logger, __spread([message], args));
                }
            });
        });
    }
    else {
        bind(git_locator_protocol_1.GitLocator).to(git_locator_client_1.GitLocatorClient);
    }
    bind(dugite_git_1.OutputParser).toSelf().inSingletonScope();
    bind(dugite_git_1.NameStatusParser).toSelf().inSingletonScope();
    bind(dugite_git_1.CommitDetailsParser).toSelf().inSingletonScope();
    bind(dugite_git_1.GitBlameParser).toSelf().inSingletonScope();
    bind(git_exec_provider_1.GitExecProvider).toSelf().inSingletonScope();
    bind(dugite_git_1.DugiteGit).toSelf().inSingletonScope();
    bind(git_1.Git).toService(dugite_git_1.DugiteGit);
    bind(git_init_1.DefaultGitInit).toSelf();
    bind(git_init_1.GitInit).toService(git_init_1.DefaultGitInit);
    bind(connection_container_module_1.ConnectionContainerModule).toConstantValue(gitConnectionModule);
}
exports.bindGit = bindGit;
var gitConnectionModule = connection_container_module_1.ConnectionContainerModule.create(function (_a) {
    var bind = _a.bind, bindBackendService = _a.bindBackendService;
    // DugiteGit is bound in singleton scope; each connection should use a proxy for that.
    var GitProxy = Symbol('GitProxy');
    bind(GitProxy).toDynamicValue(function (ctx) { return new Proxy(ctx.container.get(dugite_git_1.DugiteGit), {}); });
    bindBackendService(git_1.GitPath, GitProxy);
});
function bindRepositoryWatcher(bind) {
    bind(dugite_git_watcher_1.DugiteGitWatcherServer).toSelf();
    bind(git_watcher_1.GitWatcherServer).toService(dugite_git_watcher_1.DugiteGitWatcherServer);
}
exports.bindRepositoryWatcher = bindRepositoryWatcher;
function bindPrompt(bind) {
    bind(dugite_git_prompt_1.DugiteGitPromptServer).toSelf().inSingletonScope();
    bind(git_prompt_1.GitPromptServer).toDynamicValue(function (context) { return context.container.get(dugite_git_prompt_1.DugiteGitPromptServer); });
}
exports.bindPrompt = bindPrompt;
exports.default = new inversify_1.ContainerModule(function (bind) {
    bindGit(bind);
    bindRepositoryWatcher(bind);
    bind(common_1.ConnectionHandler).toDynamicValue(function (context) {
        return new common_1.JsonRpcConnectionHandler(git_watcher_1.GitWatcherPath, function (client) {
            var server = context.container.get(git_watcher_1.GitWatcherServer);
            server.setClient(client);
            client.onDidCloseConnection(function () { return server.dispose(); });
            return server;
        });
    }).inSingletonScope();
    bindPrompt(bind);
    bind(common_1.ConnectionHandler).toDynamicValue(function (context) {
        return new common_1.JsonRpcConnectionHandler(git_prompt_1.GitPrompt.WS_PATH, function (client) {
            var server = context.container.get(git_prompt_1.GitPromptServer);
            server.setClient(client);
            client.onDidCloseConnection(function () { return server.dispose(); });
            return server;
        });
    }).inSingletonScope();
});
//# sourceMappingURL=git-backend-module.js.map