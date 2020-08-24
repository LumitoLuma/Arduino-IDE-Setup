"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginWebSocketChannel = exports.PluginConnection = void 0;
/**
 * The container for message reader and writer which can be used to create connection between plugins and main side.
 */
var PluginConnection = /** @class */ (function () {
    function PluginConnection(reader, writer, dispose) {
        this.reader = reader;
        this.writer = writer;
        this.dispose = dispose;
    }
    PluginConnection.prototype.forward = function (to, map) {
        if (map === void 0) { map = function (message) { return message; }; }
        this.reader.listen(function (input) {
            var output = map(input);
            to.writer.write(output);
        });
    };
    return PluginConnection;
}());
exports.PluginConnection = PluginConnection;
/**
 * [IWebSocket](#IWebSocket) implementation over RPC.
 */
var PluginWebSocketChannel = /** @class */ (function () {
    function PluginWebSocketChannel(connection) {
        this.connection = connection;
    }
    PluginWebSocketChannel.prototype.send = function (content) {
        this.connection.writer.write(content);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PluginWebSocketChannel.prototype.onMessage = function (cb) {
        this.connection.reader.listen(cb);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PluginWebSocketChannel.prototype.onError = function (cb) {
        this.connection.reader.onError(function (e) { return cb(e); });
    };
    PluginWebSocketChannel.prototype.onClose = function (cb) {
        this.connection.reader.onClose(function () { return cb(-1, 'closed'); });
    };
    PluginWebSocketChannel.prototype.dispose = function () {
        this.connection.dispose();
    };
    return PluginWebSocketChannel;
}());
exports.PluginWebSocketChannel = PluginWebSocketChannel;
//# sourceMappingURL=connection.js.map