"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendStackInfoDepth(gdb, params) {
    let command = '-stack-info-depth';
    if (params.maxDepth) {
        command += ` ${params.maxDepth}`;
    }
    return gdb.sendCommand(command);
}
exports.sendStackInfoDepth = sendStackInfoDepth;
function sendStackListFramesRequest(gdb, params) {
    let command = '-stack-list-frames';
    if (params.noFrameFilters) {
        command += ' -no-frame-filters';
    }
    if (params.lowFrame !== undefined) {
        command += ` ${params.lowFrame}`;
    }
    if (params.highFrame !== undefined) {
        command += ` ${params.highFrame}`;
    }
    return gdb.sendCommand(command);
}
exports.sendStackListFramesRequest = sendStackListFramesRequest;
function sendStackSelectFrame(gdb, params) {
    return gdb.sendCommand(`-stack-select-frame ${params.framenum}`);
}
exports.sendStackSelectFrame = sendStackSelectFrame;
function sendStackListVariables(gdb, params) {
    let command = '-stack-list-variables';
    if (params.noFrameFilters) {
        command += ' --no-frame-filters';
    }
    if (params.skipUnavailable) {
        command += ' --skip-unavailable';
    }
    if (params.thread) {
        command += ` --thread ${params.thread}`;
    }
    if (params.frame) {
        command += ` --frame ${params.frame}`;
    }
    command += ` --${params.printValues}`;
    return gdb.sendCommand(command);
}
exports.sendStackListVariables = sendStackListVariables;
//# sourceMappingURL=stack.js.map