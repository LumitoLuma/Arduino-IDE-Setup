/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import BaseSeverity from '../../../base/common/severity';
import { createDecorator } from '../../instantiation/common/instantiation';
import { Emitter } from '../../../base/common/event';
export var Severity = BaseSeverity;
export var INotificationService = createDecorator('notificationService');
export var NeverShowAgainScope;
(function (NeverShowAgainScope) {
    /**
     * Will never show this notification on the current workspace again.
     */
    NeverShowAgainScope[NeverShowAgainScope["WORKSPACE"] = 0] = "WORKSPACE";
    /**
     * Will never show this notification on any workspace again.
     */
    NeverShowAgainScope[NeverShowAgainScope["GLOBAL"] = 1] = "GLOBAL";
})(NeverShowAgainScope || (NeverShowAgainScope = {}));
export var NotificationsFilter;
(function (NotificationsFilter) {
    /**
     * No filter is enabled.
     */
    NotificationsFilter[NotificationsFilter["OFF"] = 0] = "OFF";
    /**
     * All notifications are configured as silent. See
     * `INotificationProperties.silent` for more info.
     */
    NotificationsFilter[NotificationsFilter["SILENT"] = 1] = "SILENT";
    /**
     * All notifications are silent except error notifications.
    */
    NotificationsFilter[NotificationsFilter["ERROR"] = 2] = "ERROR";
})(NotificationsFilter || (NotificationsFilter = {}));
var NoOpNotification = /** @class */ (function () {
    function NoOpNotification() {
        this.progress = new NoOpProgress();
        this._onDidClose = new Emitter();
        this.onDidClose = this._onDidClose.event;
    }
    NoOpNotification.prototype.updateSeverity = function (severity) { };
    NoOpNotification.prototype.updateMessage = function (message) { };
    NoOpNotification.prototype.updateActions = function (actions) { };
    NoOpNotification.prototype.close = function () {
        this._onDidClose.dispose();
    };
    return NoOpNotification;
}());
export { NoOpNotification };
var NoOpProgress = /** @class */ (function () {
    function NoOpProgress() {
    }
    NoOpProgress.prototype.infinite = function () { };
    NoOpProgress.prototype.done = function () { };
    NoOpProgress.prototype.total = function (value) { };
    NoOpProgress.prototype.worked = function (value) { };
    return NoOpProgress;
}());
export { NoOpProgress };
