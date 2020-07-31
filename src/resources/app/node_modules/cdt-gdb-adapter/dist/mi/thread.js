"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendThreadInfoRequest(gdb, params) {
    let command = '-thread-info';
    if (params.threadId) {
        command += ` ${params.threadId}`;
    }
    return gdb.sendCommand(command);
}
exports.sendThreadInfoRequest = sendThreadInfoRequest;
function sendThreadSelectRequest(gdb, params) {
    return gdb.sendCommand(`-thread-select ${params.threadId}`);
}
exports.sendThreadSelectRequest = sendThreadSelectRequest;
//# sourceMappingURL=thread.js.map