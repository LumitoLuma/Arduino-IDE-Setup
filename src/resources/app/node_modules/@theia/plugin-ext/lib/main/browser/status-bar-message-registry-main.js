"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBarMessageRegistryMainImpl = void 0;
var disposable_1 = require("@theia/core/lib/common/disposable");
var types = require("../../plugin/types-impl");
var status_bar_1 = require("@theia/core/lib/browser/status-bar/status-bar");
var color_registry_1 = require("@theia/core/lib/browser/color-registry");
var StatusBarMessageRegistryMainImpl = /** @class */ (function () {
    function StatusBarMessageRegistryMainImpl(container) {
        this.entries = new Map();
        this.toDispose = new disposable_1.DisposableCollection(disposable_1.Disposable.create(function () { }));
        this.delegate = container.get(status_bar_1.StatusBar);
        this.colorRegistry = container.get(color_registry_1.ColorRegistry);
    }
    StatusBarMessageRegistryMainImpl.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    StatusBarMessageRegistryMainImpl.prototype.$setMessage = function (id, text, priority, alignment, color, tooltip, command, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args) {
        return __awaiter(this, void 0, void 0, function () {
            var entry;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = {
                            text: text || '',
                            priority: priority,
                            alignment: alignment === types.StatusBarAlignment.Left ? status_bar_1.StatusBarAlignment.LEFT : status_bar_1.StatusBarAlignment.RIGHT,
                            color: color && (this.colorRegistry.getCurrentColor(color) || color),
                            tooltip: tooltip,
                            command: command,
                            args: args
                        };
                        this.entries.set(id, entry);
                        return [4 /*yield*/, this.delegate.setElement(id, entry)];
                    case 1:
                        _a.sent();
                        if (this.toDispose.disposed) {
                            this.$dispose(id);
                        }
                        else {
                            this.toDispose.push(disposable_1.Disposable.create(function () { return _this.$dispose(id); }));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    StatusBarMessageRegistryMainImpl.prototype.$dispose = function (id) {
        var entry = this.entries.get(id);
        if (entry) {
            this.entries.delete(id);
            this.delegate.removeElement(id);
        }
    };
    return StatusBarMessageRegistryMainImpl;
}());
exports.StatusBarMessageRegistryMainImpl = StatusBarMessageRegistryMainImpl;
//# sourceMappingURL=status-bar-message-registry-main.js.map