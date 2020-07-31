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
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskPath = '/services/task';
exports.TaskServer = Symbol('TaskServer');
exports.TaskClient = Symbol('TaskClient');
var DependsOrder;
(function (DependsOrder) {
    DependsOrder["Sequence"] = "sequence";
    DependsOrder["Parallel"] = "parallel";
})(DependsOrder = exports.DependsOrder || (exports.DependsOrder = {}));
var RevealKind;
(function (RevealKind) {
    RevealKind[RevealKind["Always"] = 0] = "Always";
    RevealKind[RevealKind["Silent"] = 1] = "Silent";
    RevealKind[RevealKind["Never"] = 2] = "Never";
})(RevealKind = exports.RevealKind || (exports.RevealKind = {}));
var TaskOutputPresentation;
(function (TaskOutputPresentation) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function fromJson(task) {
        if (task && task.presentation) {
            var reveal = RevealKind.Always;
            if (task.presentation.reveal === 'silent') {
                reveal = RevealKind.Silent;
            }
            else if (task.presentation.reveal === 'never') {
                reveal = RevealKind.Never;
            }
            return {
                reveal: reveal,
                focus: !!task.presentation.focus
            };
        }
        return {
            reveal: RevealKind.Always,
            focus: false
        };
    }
    TaskOutputPresentation.fromJson = fromJson;
})(TaskOutputPresentation = exports.TaskOutputPresentation || (exports.TaskOutputPresentation = {}));
var TaskCustomization;
(function (TaskCustomization) {
    function isBuildTask(task) {
        return task.group === 'build' || !!task.group && typeof task.group === 'object' && task.group.kind === 'build';
    }
    TaskCustomization.isBuildTask = isBuildTask;
    function isDefaultBuildTask(task) {
        return !!task.group && typeof task.group === 'object' && task.group.kind === 'build' && task.group.isDefault;
    }
    TaskCustomization.isDefaultBuildTask = isDefaultBuildTask;
    function isTestTask(task) {
        return task.group === 'test' || !!task.group && typeof task.group === 'object' && task.group.kind === 'test';
    }
    TaskCustomization.isTestTask = isTestTask;
    function isDefaultTestTask(task) {
        return !!task.group && typeof task.group === 'object' && task.group.kind === 'test' && task.group.isDefault;
    }
    TaskCustomization.isDefaultTestTask = isDefaultTestTask;
})(TaskCustomization = exports.TaskCustomization || (exports.TaskCustomization = {}));
//# sourceMappingURL=task-protocol.js.map