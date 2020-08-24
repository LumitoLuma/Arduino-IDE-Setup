"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBarItemImpl = void 0;
var types_impl_1 = require("../types-impl");
var uuid_1 = require("@phosphor/coreutils/lib/uuid");
var StatusBarItemImpl = /** @class */ (function () {
    function StatusBarItemImpl(_proxy, alignment, priority) {
        if (alignment === void 0) { alignment = types_impl_1.StatusBarAlignment.Left; }
        if (priority === void 0) { priority = 0; }
        this.id = StatusBarItemImpl.nextId();
        this._proxy = _proxy;
        this._alignment = alignment;
        this._priority = priority;
    }
    Object.defineProperty(StatusBarItemImpl.prototype, "alignment", {
        get: function () {
            return this._alignment;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StatusBarItemImpl.prototype, "priority", {
        get: function () {
            return this._priority;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StatusBarItemImpl.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = text;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StatusBarItemImpl.prototype, "tooltip", {
        get: function () {
            return this._tooltip;
        },
        set: function (tooltip) {
            this._tooltip = tooltip;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StatusBarItemImpl.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            this._color = color;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StatusBarItemImpl.prototype, "command", {
        get: function () {
            return this._command;
        },
        set: function (command) {
            this._command = command;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    StatusBarItemImpl.prototype.show = function () {
        this._isVisible = true;
        this.update();
    };
    StatusBarItemImpl.prototype.hide = function () {
        if (this._timeoutHandle) {
            clearTimeout(this._timeoutHandle);
        }
        this._proxy.$dispose(this.id);
        this._isVisible = false;
    };
    StatusBarItemImpl.prototype.update = function () {
        var _this = this;
        if (!this._isVisible) {
            return;
        }
        if (this._timeoutHandle) {
            clearTimeout(this._timeoutHandle);
        }
        // Defer the update so that multiple changes to setters don't cause a redraw each
        this._timeoutHandle = setTimeout(function () {
            _this._timeoutHandle = undefined;
            var commandId = typeof _this.command === 'object' ? _this.command.command : _this.command;
            var args = typeof _this.command === 'object' ? _this.command.arguments : undefined;
            // Set to status bar
            _this._proxy.$setMessage(_this.id, _this.text, _this.priority, _this.alignment, typeof _this.color === 'string' ? _this.color : _this.color && _this.color.id, _this.tooltip, commandId, args);
        }, 0);
    };
    StatusBarItemImpl.prototype.dispose = function () {
        this.hide();
    };
    StatusBarItemImpl.nextId = function () {
        return StatusBarItemImpl.ID_PREFIX + ':' + uuid_1.UUID.uuid4();
    };
    StatusBarItemImpl.ID_PREFIX = 'plugin-status-bar-item';
    return StatusBarItemImpl;
}());
exports.StatusBarItemImpl = StatusBarItemImpl;
//# sourceMappingURL=status-bar-item.js.map