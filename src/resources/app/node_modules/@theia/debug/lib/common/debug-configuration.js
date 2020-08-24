"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugConfiguration = void 0;
var DebugConfiguration;
(function (DebugConfiguration) {
    function is(arg) {
        return !!arg && typeof arg === 'object' && 'type' in arg && 'name' in arg && 'request' in arg;
    }
    DebugConfiguration.is = is;
})(DebugConfiguration = exports.DebugConfiguration || (exports.DebugConfiguration = {}));
//# sourceMappingURL=debug-configuration.js.map