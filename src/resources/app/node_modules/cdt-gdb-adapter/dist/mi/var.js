"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function quote(expression) {
    return `"${expression}"`;
}
function sendVarCreate(gdb, params) {
    let command = '-var-create';
    command += ` ${params.name ? params.name : '-'}`;
    if (params.frameAddr) {
        command += ` ${params.frameAddr}`;
    }
    else if (params.frame) {
        switch (params.frame) {
            case 'current':
                command += ' *';
                break;
            case 'floating':
                command += ' @';
                break;
        }
    }
    command += ` ${quote(params.expression)}`;
    return gdb.sendCommand(command);
}
exports.sendVarCreate = sendVarCreate;
function sendVarListChildren(gdb, params) {
    let command = '-var-list-children';
    if (params.printValues) {
        command += ` --${params.printValues}`;
    }
    command += ` ${params.name}`;
    if (params.from && params.to) {
        command += ` ${params.from} ${params.to}`;
    }
    return gdb.sendCommand(command);
}
exports.sendVarListChildren = sendVarListChildren;
function sendVarUpdate(gdb, params) {
    let command = '-var-update';
    if (params.threadId) {
        command += ` ${params.threadId}`;
    }
    if (params.name) {
        command += ` ${params.name}`;
    }
    else {
        command += ' *';
    }
    return gdb.sendCommand(command);
}
exports.sendVarUpdate = sendVarUpdate;
function sendVarDelete(gdb, params) {
    const command = `-var-delete ${params.varname}`;
    return gdb.sendCommand(command);
}
exports.sendVarDelete = sendVarDelete;
function sendVarAssign(gdb, params) {
    const command = `-var-assign ${params.varname} ${params.expression}`;
    return gdb.sendCommand(command);
}
exports.sendVarAssign = sendVarAssign;
function sendVarEvaluateExpression(gdb, params) {
    const command = `-var-evaluate-expression ${params.varname}`;
    return gdb.sendCommand(command);
}
exports.sendVarEvaluateExpression = sendVarEvaluateExpression;
function sendVarInfoPathExpression(gdb, name) {
    const command = `-var-info-path-expression ${name}`;
    return gdb.sendCommand(command);
}
exports.sendVarInfoPathExpression = sendVarInfoPathExpression;
//# sourceMappingURL=var.js.map