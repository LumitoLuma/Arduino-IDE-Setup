"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendTargetAttachRequest(gdb, params) {
    return gdb.sendCommand(`-target-attach ${params.pid}`);
}
exports.sendTargetAttachRequest = sendTargetAttachRequest;
function sendTargetSelectRequest(gdb, params) {
    return gdb.sendCommand(`-target-select ${params.type} ${params.parameters.join(' ')}`);
}
exports.sendTargetSelectRequest = sendTargetSelectRequest;
//# sourceMappingURL=target.js.map