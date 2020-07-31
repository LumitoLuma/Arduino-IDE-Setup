"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendExecArguments(gdb, params) {
    return gdb.sendCommand(`-exec-arguments ${params.arguments}`);
}
exports.sendExecArguments = sendExecArguments;
function sendExecRun(gdb) {
    return gdb.sendCommand('-exec-run');
}
exports.sendExecRun = sendExecRun;
function sendExecContinue(gdb, threadId) {
    let command = '-exec-continue';
    if (threadId) {
        command += ` --thread ${threadId}`;
    }
    return gdb.sendCommand(command);
}
exports.sendExecContinue = sendExecContinue;
function sendExecNext(gdb, threadId) {
    let command = '-exec-next';
    if (threadId) {
        command += ` --thread ${threadId}`;
    }
    return gdb.sendCommand(command);
}
exports.sendExecNext = sendExecNext;
function sendExecStep(gdb, threadId) {
    let command = '-exec-step';
    if (threadId) {
        command += ` --thread ${threadId}`;
    }
    return gdb.sendCommand(command);
}
exports.sendExecStep = sendExecStep;
function sendExecFinish(gdb, threadId) {
    let command = '-exec-finish';
    if (threadId) {
        command += ` --thread ${threadId}`;
    }
    return gdb.sendCommand(command);
}
exports.sendExecFinish = sendExecFinish;
//# sourceMappingURL=exec.js.map