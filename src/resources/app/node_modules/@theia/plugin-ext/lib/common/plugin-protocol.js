"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginHostEnvironmentVariable = exports.ServerPluginRunner = exports.PluginServer = exports.pluginServerJsonRpcPath = exports.HostedPluginServer = exports.PluginDeployerHandler = exports.HostedPluginClient = exports.buildFrontendModuleName = exports.getPluginId = exports.MetadataProcessor = exports.PluginType = exports.PluginDeployerEntryType = exports.PluginDeployerParticipant = exports.PluginDeployer = exports.PluginDeployerFileHandler = exports.PluginDeployerDirectoryHandler = exports.PluginDeployerResolver = exports.PluginScanner = exports.PluginPackage = exports.hostedServicePath = void 0;
exports.hostedServicePath = '/services/hostedPlugin';
var PluginPackage;
(function (PluginPackage) {
    function toPluginUrl(pck, relativePath) {
        return "hostedPlugin/" + getPluginId(pck) + "/" + encodeURIComponent(relativePath);
    }
    PluginPackage.toPluginUrl = toPluginUrl;
})(PluginPackage = exports.PluginPackage || (exports.PluginPackage = {}));
exports.PluginScanner = Symbol('PluginScanner');
/**
 * A plugin resolver is handling how to resolve a plugin link into a local resource.
 */
exports.PluginDeployerResolver = Symbol('PluginDeployerResolver');
exports.PluginDeployerDirectoryHandler = Symbol('PluginDeployerDirectoryHandler');
exports.PluginDeployerFileHandler = Symbol('PluginDeployerFileHandler');
exports.PluginDeployer = Symbol('PluginDeployer');
exports.PluginDeployerParticipant = Symbol('PluginDeployerParticipant');
var PluginDeployerEntryType;
(function (PluginDeployerEntryType) {
    PluginDeployerEntryType[PluginDeployerEntryType["FRONTEND"] = 0] = "FRONTEND";
    PluginDeployerEntryType[PluginDeployerEntryType["BACKEND"] = 1] = "BACKEND";
})(PluginDeployerEntryType = exports.PluginDeployerEntryType || (exports.PluginDeployerEntryType = {}));
/**
 * Whether a plugin installed by a user or system.
 */
var PluginType;
(function (PluginType) {
    PluginType[PluginType["System"] = 0] = "System";
    PluginType[PluginType["User"] = 1] = "User";
})(PluginType = exports.PluginType || (exports.PluginType = {}));
;
exports.MetadataProcessor = Symbol('MetadataProcessor');
function getPluginId(plugin) {
    return (plugin.publisher + "_" + plugin.name).replace(/\W/g, '_');
}
exports.getPluginId = getPluginId;
function buildFrontendModuleName(plugin) {
    return (plugin.publisher + "_" + plugin.name).replace(/\W/g, '_');
}
exports.buildFrontendModuleName = buildFrontendModuleName;
exports.HostedPluginClient = Symbol('HostedPluginClient');
exports.PluginDeployerHandler = Symbol('PluginDeployerHandler');
exports.HostedPluginServer = Symbol('HostedPluginServer');
/**
 * The JSON-RPC workspace interface.
 */
exports.pluginServerJsonRpcPath = '/services/plugin-ext';
exports.PluginServer = Symbol('PluginServer');
exports.ServerPluginRunner = Symbol('ServerPluginRunner');
exports.PluginHostEnvironmentVariable = Symbol('PluginHostEnvironmentVariable');
//# sourceMappingURL=plugin-protocol.js.map