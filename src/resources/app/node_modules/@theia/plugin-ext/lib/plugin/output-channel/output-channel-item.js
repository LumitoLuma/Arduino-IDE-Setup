"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputChannelImpl = void 0;
var OutputChannelImpl = /** @class */ (function () {
    function OutputChannelImpl(name, proxy, pluginInfo) {
        this.name = name;
        this.proxy = proxy;
        this.pluginInfo = pluginInfo;
    }
    OutputChannelImpl.prototype.dispose = function () {
        var _this = this;
        if (!this.disposed) {
            this.proxy.$dispose(this.name).then(function () {
                _this.disposed = true;
            });
        }
    };
    OutputChannelImpl.prototype.append = function (value) {
        this.validate();
        this.proxy.$append(this.name, value, this.pluginInfo);
    };
    OutputChannelImpl.prototype.appendLine = function (value) {
        this.validate();
        this.append(value + '\n');
    };
    OutputChannelImpl.prototype.clear = function () {
        this.validate();
        this.proxy.$clear(this.name);
    };
    OutputChannelImpl.prototype.show = function (preserveFocus) {
        this.validate();
        this.proxy.$reveal(this.name, !!preserveFocus);
    };
    OutputChannelImpl.prototype.hide = function () {
        this.validate();
        this.proxy.$close(this.name);
    };
    OutputChannelImpl.prototype.validate = function () {
        if (this.disposed) {
            throw new Error('Channel has been closed');
        }
    };
    return OutputChannelImpl;
}());
exports.OutputChannelImpl = OutputChannelImpl;
//# sourceMappingURL=output-channel-item.js.map