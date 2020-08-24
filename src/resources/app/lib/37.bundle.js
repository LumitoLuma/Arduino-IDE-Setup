(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config.js":
/*!********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/boards/boards-config.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsConfig = exports.Item = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var boards_service_1 = __webpack_require__(/*! ../../common/protocol/boards-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js");
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () {
            _this.props.onClick(_this.props.item);
        };
        return _this;
    }
    Item.prototype.render = function () {
        var _a = this.props, selected = _a.selected, label = _a.label, missing = _a.missing, details = _a.details;
        var classNames = ['item'];
        if (selected) {
            classNames.push('selected');
        }
        if (missing === true) {
            classNames.push('missing');
        }
        return React.createElement("div", { onClick: this.onClick, className: classNames.join(' '), title: "" + label + (!details ? '' : details) },
            React.createElement("div", { className: 'label' }, label),
            !details ? '' : React.createElement("div", { className: 'details' }, details),
            !selected ? '' : React.createElement("div", { className: 'selected-icon' },
                React.createElement("i", { className: 'fa fa-check' })));
    };
    return Item;
}(React.Component));
exports.Item = Item;
var BoardsConfig = /** @class */ (function (_super) {
    __extends(BoardsConfig, _super);
    function BoardsConfig(props) {
        var _this = _super.call(this, props) || this;
        _this.toDispose = new core_1.DisposableCollection();
        _this.updateBoards = function (eventOrQuery) {
            if (eventOrQuery === void 0) { eventOrQuery = ''; }
            var query = (typeof eventOrQuery === 'string'
                ? eventOrQuery
                : eventOrQuery.target.value.toLowerCase()).trim();
            _this.setState({ query: query });
            _this.queryBoards({ query: query }).then(function (searchResults) { return _this.setState({ searchResults: searchResults }); });
        };
        _this.updatePorts = function (ports, removedPorts) {
            if (ports === void 0) { ports = []; }
            if (removedPorts === void 0) { removedPorts = []; }
            _this.queryPorts(Promise.resolve(ports)).then(function (_a) {
                var knownPorts = _a.knownPorts;
                var selectedPort = _this.state.selectedPort;
                // If the currently selected port is not available anymore, unset the selected port.
                if (removedPorts.some(function (port) { return boards_service_1.Port.equals(port, selectedPort); })) {
                    selectedPort = undefined;
                }
                _this.setState({ knownPorts: knownPorts, selectedPort: selectedPort }, function () { return _this.fireConfigChanged(); });
            });
        };
        _this.queryBoards = function (options) {
            if (options === void 0) { options = {}; }
            return _this.props.boardsServiceClient.searchBoards(options);
        };
        _this.queryPorts = function (availablePorts) {
            if (availablePorts === void 0) { availablePorts = _this.availablePorts; }
            return __awaiter(_this, void 0, void 0, function () {
                var ports;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, availablePorts];
                        case 1:
                            ports = _a.sent();
                            return [2 /*return*/, { knownPorts: ports.sort(boards_service_1.Port.compare) }];
                    }
                });
            });
        };
        _this.toggleFilterPorts = function () {
            _this.setState({ showAllPorts: !_this.state.showAllPorts });
        };
        _this.selectPort = function (selectedPort) {
            _this.setState({ selectedPort: selectedPort }, function () { return _this.fireConfigChanged(); });
        };
        _this.selectBoard = function (selectedBoard) {
            _this.setState({ selectedBoard: selectedBoard }, function () { return _this.fireConfigChanged(); });
        };
        _this.focusNodeSet = function (element) {
            _this.props.onFocusNodeSet(element || undefined);
        };
        var boardsConfig = props.boardsServiceClient.boardsConfig;
        _this.state = __assign({ searchResults: [], knownPorts: [], showAllPorts: false, query: '' }, boardsConfig);
        return _this;
    }
    BoardsConfig.prototype.componentDidMount = function () {
        var _this = this;
        this.updateBoards();
        this.props.boardsService.getAvailablePorts().then(function (ports) { return _this.updatePorts(ports); });
        var _a = this.props, boardsServiceClient = _a.boardsServiceClient, coreServiceClient = _a.coreServiceClient, daemonClient = _a.daemonClient;
        this.toDispose.pushAll([
            boardsServiceClient.onAttachedBoardsChanged(function (event) { return _this.updatePorts(event.newState.ports, boards_service_1.AttachedBoardsChangeEvent.diff(event).detached.ports); }),
            boardsServiceClient.onBoardsConfigChanged(function (_a) {
                var selectedBoard = _a.selectedBoard, selectedPort = _a.selectedPort;
                _this.setState({ selectedBoard: selectedBoard, selectedPort: selectedPort }, function () { return _this.fireConfigChanged(); });
            }),
            boardsServiceClient.onBoardsPackageInstalled(function () { return _this.updateBoards(_this.state.query); }),
            boardsServiceClient.onBoardsPackageUninstalled(function () { return _this.updateBoards(_this.state.query); }),
            coreServiceClient.onIndexUpdated(function () { return _this.updateBoards(_this.state.query); }),
            daemonClient.onDaemonStarted(function () { return _this.updateBoards(_this.state.query); }),
            daemonClient.onDaemonStopped(function () { return _this.setState({ searchResults: [] }); })
        ]);
    };
    BoardsConfig.prototype.componentWillUnmount = function () {
        this.toDispose.dispose();
    };
    BoardsConfig.prototype.fireConfigChanged = function () {
        var _a = this.state, selectedBoard = _a.selectedBoard, selectedPort = _a.selectedPort;
        this.props.onConfigChange({ selectedBoard: selectedBoard, selectedPort: selectedPort });
    };
    Object.defineProperty(BoardsConfig.prototype, "availablePorts", {
        get: function () {
            return this.props.boardsService.getAvailablePorts();
        },
        enumerable: false,
        configurable: true
    });
    BoardsConfig.prototype.render = function () {
        return React.createElement("div", { className: 'body' },
            this.renderContainer('boards', this.renderBoards.bind(this)),
            this.renderContainer('ports', this.renderPorts.bind(this), this.renderPortsFooter.bind(this)));
    };
    BoardsConfig.prototype.renderContainer = function (title, contentRenderer, footerRenderer) {
        return React.createElement("div", { className: 'container' },
            React.createElement("div", { className: 'content' },
                React.createElement("div", { className: 'title' }, title),
                contentRenderer(),
                React.createElement("div", { className: 'footer' }, (footerRenderer ? footerRenderer() : ''))));
    };
    BoardsConfig.prototype.renderBoards = function () {
        var e_1, _a;
        var _this = this;
        var _b = this.state, selectedBoard = _b.selectedBoard, searchResults = _b.searchResults;
        // Board names are not unique per core https://github.com/arduino/arduino-pro-ide/issues/262#issuecomment-661019560
        // It is tricky when the core is not yet installed, no FQBNs are available.
        var distinctBoards = new Map();
        var toKey = function (_a) {
            var name = _a.name, packageName = _a.packageName, fqbn = _a.fqbn;
            return !!fqbn ? name + "-" + packageName + "-" + fqbn : name + "-" + packageName;
        };
        try {
            for (var _c = __values(boards_service_1.Board.decorateBoards(selectedBoard, searchResults)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var board = _d.value;
                var key = toKey(board);
                if (!distinctBoards.has(key)) {
                    distinctBoards.set(key, board);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'search' },
                React.createElement("input", { type: 'search', className: 'theia-input', placeholder: 'SEARCH BOARD', onChange: this.updateBoards, ref: this.focusNodeSet }),
                React.createElement("i", { className: 'fa fa-search' })),
            React.createElement("div", { className: 'boards list' }, Array.from(distinctBoards.values()).map(function (board) { return React.createElement(Item, { key: board.name + "-" + board.packageName, item: board, label: board.name, details: board.details, selected: board.selected, onClick: _this.selectBoard, missing: board.missing }); })));
    };
    BoardsConfig.prototype.renderPorts = function () {
        var _this = this;
        var filter = this.state.showAllPorts ? function () { return true; } : boards_service_1.Port.isBoardPort;
        var ports = this.state.knownPorts.filter(filter);
        return !ports.length ?
            (React.createElement("div", { className: 'loading noselect' }, "No ports discovered")) :
            (React.createElement("div", { className: 'ports list' }, ports.map(function (port) { return React.createElement(Item, { key: boards_service_1.Port.toString(port), item: port, label: boards_service_1.Port.toString(port), selected: boards_service_1.Port.equals(_this.state.selectedPort, port), onClick: _this.selectPort }); })));
    };
    BoardsConfig.prototype.renderPortsFooter = function () {
        return React.createElement("div", { className: 'noselect' },
            React.createElement("label", { title: 'Shows all available ports when enabled' },
                React.createElement("input", { type: 'checkbox', defaultChecked: this.state.showAllPorts, onChange: this.toggleFilterPorts }),
                React.createElement("span", null, "Show all ports")));
    };
    return BoardsConfig;
}(React.Component));
exports.BoardsConfig = BoardsConfig;
(function (BoardsConfig) {
    var Config;
    (function (Config) {
        function sameAs(config, other) {
            var selectedBoard = config.selectedBoard, selectedPort = config.selectedPort;
            if (boards_service_1.Board.is(other)) {
                return !!selectedBoard
                    && boards_service_1.Board.equals(other, selectedBoard)
                    && boards_service_1.Port.sameAs(selectedPort, other.port);
            }
            return sameAs(config, other);
        }
        Config.sameAs = sameAs;
        function equals(left, right) {
            return left.selectedBoard === right.selectedBoard
                && left.selectedPort === right.selectedPort;
        }
        Config.equals = equals;
        function toString(config, options) {
            if (options === void 0) { options = { default: '' }; }
            var selectedBoard = config.selectedBoard, port = config.selectedPort;
            if (!selectedBoard) {
                return options.default;
            }
            var name = selectedBoard.name;
            return "" + name + (port ? ' at ' + boards_service_1.Port.toString(port) : '');
        }
        Config.toString = toString;
    })(Config = BoardsConfig.Config || (BoardsConfig.Config = {}));
})(BoardsConfig = exports.BoardsConfig || (exports.BoardsConfig = {}));
exports.BoardsConfig = BoardsConfig;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableBoard = exports.BoardsServiceClientImpl = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var logger_1 = __webpack_require__(/*! @theia/core/lib/common/logger */ "./node_modules/@theia/core/lib/common/logger.js");
var message_service_1 = __webpack_require__(/*! @theia/core/lib/common/message-service */ "./node_modules/@theia/core/lib/common/message-service.js");
var storage_service_1 = __webpack_require__(/*! @theia/core/lib/browser/storage-service */ "./node_modules/@theia/core/lib/browser/storage-service.js");
var protocol_1 = __webpack_require__(/*! ../../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
var boards_config_1 = __webpack_require__(/*! ./boards-config */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config.js");
var utils_1 = __webpack_require__(/*! ../../common/utils */ "./node_modules/arduino-ide-extension/lib/common/utils.js");
var comparers_1 = __webpack_require__(/*! ../theia/monaco/comparers */ "./node_modules/arduino-ide-extension/lib/browser/theia/monaco/comparers.js");
var BoardsServiceClientImpl = /** @class */ (function () {
    function BoardsServiceClientImpl() {
        this.onBoardsPackageInstalledEmitter = new event_1.Emitter();
        this.onBoardsPackageUninstalledEmitter = new event_1.Emitter();
        this.onAttachedBoardsChangedEmitter = new event_1.Emitter();
        this.onBoardsConfigChangedEmitter = new event_1.Emitter();
        this.onAvailableBoardsChangedEmitter = new event_1.Emitter();
        /**
         * Used for the auto-reconnecting. Sometimes, the attached board gets disconnected after uploading something to it.
         * It happens with certain boards on Windows. For example, the `MKR1000` boards is selected on post `COM5` on Windows,
         * perform an upload, the board automatically disconnects and reconnects, but on another port, `COM10`.
         * We have to listen on such changes and auto-reconnect the same board on another port.
         * See: https://arduino.slack.com/archives/CJJHJCJSJ/p1568645417013000?thread_ts=1568640504.009400&cid=CJJHJCJSJ
         */
        this.latestValidBoardsConfig = undefined;
        this._boardsConfig = {};
        this._attachedBoards = []; // This does not contain the `Unknown` boards. They're visible from the available ports only.
        this._availablePorts = [];
        this._availableBoards = [];
        /**
         * Event when the state of the attached/detached boards has changed. For instance, the user have detached a physical board.
         */
        this.onAttachedBoardsChanged = this.onAttachedBoardsChangedEmitter.event;
        this.onBoardsPackageInstalled = this.onBoardsPackageInstalledEmitter.event;
        this.onBoardsPackageUninstalled = this.onBoardsPackageUninstalledEmitter.event;
        /**
         * Unlike `onAttachedBoardsChanged` this even fires when the user modifies the selected board in the IDE.\
         * This even also fires, when the boards package was not available for the currently selected board,
         * and the user installs the board package. Note: installing a board package will set the `fqbn` of the
         * currently selected board.\
         * This even also emitted when the board package for the currently selected board was uninstalled.
         */
        this.onBoardsConfigChanged = this.onBoardsConfigChangedEmitter.event;
        this.onAvailableBoardsChanged = this.onAvailableBoardsChangedEmitter.event;
    }
    BoardsServiceClientImpl.prototype.onStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.loadState()];
            });
        });
    };
    /**
     * When the FE connects to the BE, the BE stets the known boards and ports.\
     * This is a DI workaround for not being able to inject the service into the client.
     */
    BoardsServiceClientImpl.prototype.init = function (boardsService) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, attachedBoards, availablePorts;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.boardsService = boardsService;
                        return [4 /*yield*/, Promise.all([
                                this.boardsService.getAttachedBoards(),
                                this.boardsService.getAvailablePorts()
                            ])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), attachedBoards = _a[0], availablePorts = _a[1];
                        this._attachedBoards = attachedBoards;
                        this._availablePorts = availablePorts;
                        this.reconcileAvailableBoards().then(function () { return _this.tryReconnect(); });
                        return [2 /*return*/];
                }
            });
        });
    };
    BoardsServiceClientImpl.prototype.notifyAttachedBoardsChanged = function (event) {
        var _this = this;
        this.logger.info('Attached boards and available ports changed: ', JSON.stringify(event));
        this._attachedBoards = event.newState.boards;
        this.onAttachedBoardsChangedEmitter.fire(event);
        this._availablePorts = event.newState.ports;
        this.reconcileAvailableBoards().then(function () { return _this.tryReconnect(); });
    };
    BoardsServiceClientImpl.prototype.tryReconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, board, _c, _d, board;
            var e_1, _e, e_2, _f;
            return __generator(this, function (_g) {
                if (this.latestValidBoardsConfig && !this.canUploadTo(this.boardsConfig)) {
                    try {
                        for (_a = __values(this.availableBoards.filter(function (_a) {
                            var state = _a.state;
                            return state !== AvailableBoard.State.incomplete;
                        })), _b = _a.next(); !_b.done; _b = _a.next()) {
                            board = _b.value;
                            if (this.latestValidBoardsConfig.selectedBoard.fqbn === board.fqbn
                                && this.latestValidBoardsConfig.selectedBoard.name === board.name
                                && protocol_1.Port.sameAs(this.latestValidBoardsConfig.selectedPort, board.port)) {
                                this.boardsConfig = this.latestValidBoardsConfig;
                                return [2 /*return*/, true];
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    try {
                        // If we could not find an exact match, we compare the board FQBN-name pairs and ignore the port, as it might have changed.
                        // See documentation on `latestValidBoardsConfig`.
                        for (_c = __values(this.availableBoards.filter(function (_a) {
                            var state = _a.state;
                            return state !== AvailableBoard.State.incomplete;
                        })), _d = _c.next(); !_d.done; _d = _c.next()) {
                            board = _d.value;
                            if (this.latestValidBoardsConfig.selectedBoard.fqbn === board.fqbn
                                && this.latestValidBoardsConfig.selectedBoard.name === board.name) {
                                this.boardsConfig = __assign(__assign({}, this.latestValidBoardsConfig), { selectedPort: board.port });
                                return [2 /*return*/, true];
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                return [2 /*return*/, false];
            });
        });
    };
    BoardsServiceClientImpl.prototype.notifyBoardInstalled = function (event) {
        this.logger.info('Board installed: ', JSON.stringify(event));
        this.onBoardsPackageInstalledEmitter.fire(event);
        var selectedBoard = this.boardsConfig.selectedBoard;
        var _a = event.pkg, installedVersion = _a.installedVersion, id = _a.id;
        if (selectedBoard) {
            var installedBoard = event.pkg.boards.find(function (_a) {
                var name = _a.name;
                return name === selectedBoard.name;
            });
            if (installedBoard && (!selectedBoard.fqbn || selectedBoard.fqbn === installedBoard.fqbn)) {
                this.logger.info("Board package " + id + "[" + installedVersion + "] was installed. Updating the FQBN of the currently selected " + selectedBoard.name + " board. [FQBN: " + installedBoard.fqbn + "]");
                this.boardsConfig = __assign(__assign({}, this.boardsConfig), { selectedBoard: installedBoard });
            }
        }
    };
    BoardsServiceClientImpl.prototype.notifyBoardUninstalled = function (event) {
        this.logger.info('Board uninstalled: ', JSON.stringify(event));
        this.onBoardsPackageUninstalledEmitter.fire(event);
        var selectedBoard = this.boardsConfig.selectedBoard;
        if (selectedBoard && selectedBoard.fqbn) {
            var uninstalledBoard = event.pkg.boards.find(function (_a) {
                var name = _a.name;
                return name === selectedBoard.name;
            });
            if (uninstalledBoard && uninstalledBoard.fqbn === selectedBoard.fqbn) {
                this.logger.info("Board package " + event.pkg.id + " was uninstalled. Discarding the FQBN of the currently selected " + selectedBoard.name + " board.");
                var selectedBoardWithoutFqbn = {
                    name: selectedBoard.name
                    // No FQBN
                };
                this.boardsConfig = __assign(__assign({}, this.boardsConfig), { selectedBoard: selectedBoardWithoutFqbn });
            }
        }
    };
    Object.defineProperty(BoardsServiceClientImpl.prototype, "boardsConfig", {
        get: function () {
            return this._boardsConfig;
        },
        set: function (config) {
            var _this = this;
            this.doSetBoardsConfig(config);
            this.saveState().finally(function () { return _this.reconcileAvailableBoards().finally(function () { return _this.onBoardsConfigChangedEmitter.fire(_this._boardsConfig); }); });
        },
        enumerable: false,
        configurable: true
    });
    BoardsServiceClientImpl.prototype.doSetBoardsConfig = function (config) {
        this.logger.info('Board config changed: ', JSON.stringify(config));
        this._boardsConfig = config;
        if (this.canUploadTo(this._boardsConfig)) {
            this.latestValidBoardsConfig = this._boardsConfig;
        }
    };
    BoardsServiceClientImpl.prototype.searchBoards = function (_a) {
        var query = _a.query, cores = _a.cores;
        return __awaiter(this, void 0, void 0, function () {
            var boards, coresFilter, toMatch, compareEntries, normalizedQuery;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.boardsService.allBoards({})];
                    case 1:
                        boards = _b.sent();
                        coresFilter = !!cores && cores.length
                            ? (function (toFilter) { return cores.some(function (core) { return core === toFilter.packageName; }); })
                            : function () { return true; };
                        if (!query) {
                            return [2 /*return*/, boards.filter(coresFilter).sort(protocol_1.Board.compare)];
                        }
                        toMatch = (function (toFilter) { return (({ board: toFilter, matches: monaco.filters.matchesFuzzy(query, toFilter.name, true) })); });
                        compareEntries = function (left, right, lookFor) {
                            var leftMatches = left.matches || [];
                            var rightMatches = right.matches || [];
                            if (leftMatches.length && !rightMatches.length) {
                                return -1;
                            }
                            if (!leftMatches.length && rightMatches.length) {
                                return 1;
                            }
                            if (leftMatches.length === 0 && rightMatches.length === 0) {
                                return 0;
                            }
                            var leftLabel = left.board.name.replace(/\r?\n/g, ' ');
                            var rightLabel = right.board.name.replace(/\r?\n/g, ' ');
                            return comparers_1.compareAnything(leftLabel, rightLabel, lookFor);
                        };
                        normalizedQuery = query.toLowerCase();
                        return [2 /*return*/, boards
                                .filter(coresFilter)
                                .map(toMatch)
                                .filter(function (_a) {
                                var matches = _a.matches;
                                return !!matches;
                            })
                                .sort(function (left, right) { return compareEntries(left, right, normalizedQuery); })
                                .map(function (_a) {
                                var board = _a.board;
                                return board;
                            })];
                }
            });
        });
    };
    /**
     * `true` if the `config.selectedBoard` is defined; hence can compile against the board. Otherwise, `false`.
     */
    BoardsServiceClientImpl.prototype.canVerify = function (config, options) {
        if (config === void 0) { config = this.boardsConfig; }
        if (options === void 0) { options = { silent: true }; }
        if (!config) {
            return false;
        }
        if (!config.selectedBoard) {
            if (!options.silent && this.messageService) {
                this.messageService.warn('No boards selected.', { timeout: 3000 });
            }
            return false;
        }
        return true;
    };
    /**
     * `true` if `canVerify`, the board has an FQBN and the `config.selectedPort` is also set, hence can upload to board. Otherwise, `false`.
     */
    BoardsServiceClientImpl.prototype.canUploadTo = function (config, options) {
        if (config === void 0) { config = this.boardsConfig; }
        if (options === void 0) { options = { silent: true }; }
        if (!this.canVerify(config, options)) {
            return false;
        }
        var name = config.selectedBoard.name;
        if (!config.selectedPort) {
            if (!options.silent && this.messageService) {
                this.messageService.warn("No ports selected for board: '" + name + "'.", { timeout: 3000 });
            }
            return false;
        }
        if (!config.selectedBoard.fqbn) {
            if (!options.silent && this.messageService) {
                this.messageService.warn("The FQBN is not available for the selected board " + name + ". Do you have the corresponding core installed?", { timeout: 3000 });
            }
            return false;
        }
        return true;
    };
    Object.defineProperty(BoardsServiceClientImpl.prototype, "availableBoards", {
        get: function () {
            return this._availableBoards;
        },
        enumerable: false,
        configurable: true
    });
    BoardsServiceClientImpl.prototype.reconcileAvailableBoards = function () {
        return __awaiter(this, void 0, void 0, function () {
            var attachedBoards, availablePorts, boardsConfig, currentAvailableBoards, availableBoards, availableBoardPorts, attachedSerialBoards, _loop_1, this_1, availableBoardPorts_1, availableBoardPorts_1_1, boardPort, e_3_1, sortedAvailableBoards, hasChanged, i;
            var e_3, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        attachedBoards = this._attachedBoards;
                        availablePorts = this._availablePorts;
                        // Unset the port on the user's config, if it is not available anymore.
                        if (this.boardsConfig.selectedPort && !availablePorts.some(function (port) { return protocol_1.Port.sameAs(port, _this.boardsConfig.selectedPort); })) {
                            this.doSetBoardsConfig({ selectedBoard: this.boardsConfig.selectedBoard, selectedPort: undefined });
                            this.onBoardsConfigChangedEmitter.fire(this._boardsConfig);
                        }
                        boardsConfig = this.boardsConfig;
                        currentAvailableBoards = this._availableBoards;
                        availableBoards = [];
                        availableBoardPorts = availablePorts.filter(protocol_1.Port.isBoardPort);
                        attachedSerialBoards = attachedBoards.filter(function (_a) {
                            var port = _a.port;
                            return !!port;
                        });
                        _loop_1 = function (boardPort) {
                            var state, board, lastSelectedBoard, selected;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        state = AvailableBoard.State.incomplete;
                                        board = attachedSerialBoards.find(function (_a) {
                                            var port = _a.port;
                                            return protocol_1.Port.sameAs(boardPort, port);
                                        });
                                        if (!board) return [3 /*break*/, 1];
                                        state = AvailableBoard.State.recognized;
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, this_1.getLastSelectedBoardOnPort(boardPort)];
                                    case 2:
                                        lastSelectedBoard = _a.sent();
                                        if (lastSelectedBoard) {
                                            board = __assign(__assign({}, lastSelectedBoard), { port: boardPort });
                                            state = AvailableBoard.State.guessed;
                                        }
                                        _a.label = 3;
                                    case 3:
                                        if (!board) {
                                            availableBoards.push({ name: 'Unknown', port: boardPort, state: state });
                                        }
                                        else {
                                            selected = boards_config_1.BoardsConfig.Config.sameAs(boardsConfig, board);
                                            availableBoards.push(__assign(__assign({}, board), { state: state, selected: selected, port: boardPort }));
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        availableBoardPorts_1 = __values(availableBoardPorts), availableBoardPorts_1_1 = availableBoardPorts_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!availableBoardPorts_1_1.done) return [3 /*break*/, 5];
                        boardPort = availableBoardPorts_1_1.value;
                        return [5 /*yield**/, _loop_1(boardPort)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        availableBoardPorts_1_1 = availableBoardPorts_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (availableBoardPorts_1_1 && !availableBoardPorts_1_1.done && (_a = availableBoardPorts_1.return)) _a.call(availableBoardPorts_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        if (boardsConfig.selectedBoard && !availableBoards.some(function (_a) {
                            var selected = _a.selected;
                            return selected;
                        })) {
                            availableBoards.push(__assign(__assign({}, boardsConfig.selectedBoard), { port: boardsConfig.selectedPort, selected: true, state: AvailableBoard.State.incomplete }));
                        }
                        sortedAvailableBoards = availableBoards.sort(AvailableBoard.compare);
                        hasChanged = sortedAvailableBoards.length !== currentAvailableBoards.length;
                        for (i = 0; !hasChanged && i < sortedAvailableBoards.length; i++) {
                            hasChanged = AvailableBoard.compare(sortedAvailableBoards[i], currentAvailableBoards[i]) !== 0;
                        }
                        if (hasChanged) {
                            this._availableBoards = sortedAvailableBoards;
                            this.onAvailableBoardsChangedEmitter.fire(this._availableBoards);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BoardsServiceClientImpl.prototype.getLastSelectedBoardOnPort = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                if (!port) {
                    return [2 /*return*/, undefined];
                }
                key = this.getLastSelectedBoardOnPortKey(port);
                return [2 /*return*/, this.storageService.getData(key)];
            });
        });
    };
    BoardsServiceClientImpl.prototype.saveState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, selectedBoard, selectedPort, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.boardsConfig, selectedBoard = _a.selectedBoard, selectedPort = _a.selectedPort;
                        if (!(selectedBoard && selectedPort)) return [3 /*break*/, 2];
                        key = this.getLastSelectedBoardOnPortKey(selectedPort);
                        return [4 /*yield*/, this.storageService.setData(key, selectedBoard)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.storageService.setData('latest-valid-boards-config', this.latestValidBoardsConfig)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BoardsServiceClientImpl.prototype.getLastSelectedBoardOnPortKey = function (port) {
        // TODO: we lose the port's `protocol` info (`serial`, `network`, etc.) here if the `port` is a `string`.
        return "last-selected-board-on-port:" + (typeof port === 'string' ? port : protocol_1.Port.toString(port));
    };
    BoardsServiceClientImpl.prototype.loadState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var storedValidBoardsConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storageService.getData('latest-valid-boards-config')];
                    case 1:
                        storedValidBoardsConfig = _a.sent();
                        if (storedValidBoardsConfig) {
                            this.latestValidBoardsConfig = storedValidBoardsConfig;
                            if (this.canUploadTo(this.latestValidBoardsConfig)) {
                                this.boardsConfig = this.latestValidBoardsConfig;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], BoardsServiceClientImpl.prototype, "logger", void 0);
    __decorate([
        inversify_1.optional(),
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], BoardsServiceClientImpl.prototype, "messageService", void 0);
    __decorate([
        inversify_1.inject(storage_service_1.StorageService),
        __metadata("design:type", Object)
    ], BoardsServiceClientImpl.prototype, "storageService", void 0);
    BoardsServiceClientImpl = __decorate([
        inversify_1.injectable()
    ], BoardsServiceClientImpl);
    return BoardsServiceClientImpl;
}());
exports.BoardsServiceClientImpl = BoardsServiceClientImpl;
var AvailableBoard;
(function (AvailableBoard) {
    var State;
    (function (State) {
        /**
         * Retrieved from the CLI via the `board list` command.
         */
        State[State["recognized"] = 0] = "recognized";
        /**
         * Guessed the name/FQBN of the board from the available board ports (3rd party).
         */
        State[State["guessed"] = 1] = "guessed";
        /**
         * We do not know anything about this board, probably a 3rd party. The user has not selected a board for this port yet.
         */
        State[State["incomplete"] = 2] = "incomplete";
    })(State = AvailableBoard.State || (AvailableBoard.State = {}));
    function is(board) {
        return protocol_1.Board.is(board) && 'state' in board;
    }
    AvailableBoard.is = is;
    function hasPort(board) {
        return !!board.port;
    }
    AvailableBoard.hasPort = hasPort;
    AvailableBoard.compare = function (left, right) {
        if (left.selected && !right.selected) {
            return -1;
        }
        if (right.selected && !left.selected) {
            return 1;
        }
        var result = utils_1.naturalCompare(left.name, right.name);
        if (result !== 0) {
            return result;
        }
        if (left.fqbn && right.fqbn) {
            result = utils_1.naturalCompare(left.fqbn, right.fqbn);
            if (result !== 0) {
                return result;
            }
        }
        if (left.port && right.port) {
            result = protocol_1.Port.compare(left.port, right.port);
            if (result !== 0) {
                return result;
            }
        }
        if (!!left.selected && !right.selected) {
            return -1;
        }
        if (!!right.selected && !left.selected) {
            return 1;
        }
        return left.state - right.state;
    };
})(AvailableBoard = exports.AvailableBoard || (exports.AvailableBoard = {}));


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/core-service-client-impl.js":
/*!************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/core-service-client-impl.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreServiceClientImpl = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var logger_1 = __webpack_require__(/*! @theia/core/lib/common/logger */ "./node_modules/@theia/core/lib/common/logger.js");
var message_service_1 = __webpack_require__(/*! @theia/core/lib/common/message-service */ "./node_modules/@theia/core/lib/common/message-service.js");
var storage_service_1 = __webpack_require__(/*! @theia/core/lib/browser/storage-service */ "./node_modules/@theia/core/lib/browser/storage-service.js");
var CoreServiceClientImpl = /** @class */ (function () {
    function CoreServiceClientImpl() {
        this.onIndexUpdatedEmitter = new event_1.Emitter();
    }
    CoreServiceClientImpl.prototype.notifyIndexUpdated = function () {
        this.info('Index has been updated.');
        this.onIndexUpdatedEmitter.fire();
    };
    Object.defineProperty(CoreServiceClientImpl.prototype, "onIndexUpdated", {
        get: function () {
            return this.onIndexUpdatedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    CoreServiceClientImpl.prototype.info = function (message) {
        this.messageService.info(message, { timeout: 3000 });
        this.logger.info(message);
    };
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], CoreServiceClientImpl.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], CoreServiceClientImpl.prototype, "messageService", void 0);
    __decorate([
        inversify_1.inject(storage_service_1.LocalStorageService),
        __metadata("design:type", storage_service_1.LocalStorageService)
    ], CoreServiceClientImpl.prototype, "storageService", void 0);
    CoreServiceClientImpl = __decorate([
        inversify_1.injectable()
    ], CoreServiceClientImpl);
    return CoreServiceClientImpl;
}());
exports.CoreServiceClientImpl = CoreServiceClientImpl;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/monaco/comparers.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/monaco/comparers.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Copied from https://github.com/microsoft/vscode/blob/724c307bf35646ac549a8533a255c51b63fea5c7/src/vs/base/common/comparers.ts
// We cannot customize the monaco loader for Theia: https://github.com/eclipse-theia/theia/issues/8220
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareByPrefix = exports.compareAnything = exports.comparePaths = exports.compareFileExtensionsNumeric = exports.compareFileExtensions = exports.noIntlCompareFileNames = exports.compareFileNamesNumeric = exports.compareFileNames = void 0;
var os_1 = __webpack_require__(/*! @theia/core/lib/common/os */ "./node_modules/@theia/core/lib/common/os.js");
var sep = (os_1.isWindows ? '\\' : '/');
var runWhenIdle;
(function () {
    if (typeof requestIdleCallback !== 'function' || typeof cancelIdleCallback !== 'function') {
        var dummyIdle_1 = Object.freeze({
            didTimeout: true,
            timeRemaining: function () { return 15; }
        });
        runWhenIdle = function (runner) {
            var handle = setTimeout(function () { return runner(dummyIdle_1); });
            var disposed = false;
            return {
                dispose: function () {
                    if (disposed) {
                        return;
                    }
                    disposed = true;
                    clearTimeout(handle);
                }
            };
        };
    }
    else {
        runWhenIdle = function (runner, timeout) {
            var handle = requestIdleCallback(runner, typeof timeout === 'number' ? { timeout: timeout } : undefined);
            var disposed = false;
            return {
                dispose: function () {
                    if (disposed) {
                        return;
                    }
                    disposed = true;
                    cancelIdleCallback(handle);
                }
            };
        };
    }
})();
/**
 * An implementation of the "idle-until-urgent"-strategy as introduced
 * here: https://philipwalton.com/articles/idle-until-urgent/
 */
var IdleValue = /** @class */ (function () {
    function IdleValue(executor) {
        var _this = this;
        this._didRun = false;
        this._executor = function () {
            try {
                _this._value = executor();
            }
            catch (err) {
                _this._error = err;
            }
            finally {
                _this._didRun = true;
            }
        };
        this._handle = runWhenIdle(function () { return _this._executor(); });
    }
    IdleValue.prototype.dispose = function () {
        this._handle.dispose();
    };
    Object.defineProperty(IdleValue.prototype, "value", {
        get: function () {
            if (!this._didRun) {
                this._handle.dispose();
                this._executor();
            }
            if (this._error) {
                throw this._error;
            }
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    return IdleValue;
}());
// When comparing large numbers of strings, such as in sorting large arrays, is better for
// performance to create an Intl.Collator object and use the function provided by its compare
// property than it is to use String.prototype.localeCompare()
// A collator with numeric sorting enabled, and no sensitivity to case or to accents
var intlFileNameCollatorBaseNumeric = new IdleValue(function () {
    var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    return {
        collator: collator,
        collatorIsNumeric: collator.resolvedOptions().numeric
    };
});
// A collator with numeric sorting enabled.
var intlFileNameCollatorNumeric = new IdleValue(function () {
    var collator = new Intl.Collator(undefined, { numeric: true });
    return {
        collator: collator
    };
});
// A collator with numeric sorting enabled, and sensitivity to accents and diacritics but not case.
var intlFileNameCollatorNumericCaseInsenstive = new IdleValue(function () {
    var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'accent' });
    return {
        collator: collator
    };
});
function compareFileNames(one, other, caseSensitive) {
    if (caseSensitive === void 0) { caseSensitive = false; }
    var a = one || '';
    var b = other || '';
    var result = intlFileNameCollatorBaseNumeric.value.collator.compare(a, b);
    // Using the numeric option in the collator will
    // make compare(`foo1`, `foo01`) === 0. We must disambiguate.
    if (intlFileNameCollatorBaseNumeric.value.collatorIsNumeric && result === 0 && a !== b) {
        return a < b ? -1 : 1;
    }
    return result;
}
exports.compareFileNames = compareFileNames;
/** Compares filenames by name then extension, sorting numbers numerically instead of alphabetically. */
function compareFileNamesNumeric(one, other) {
    var _a = __read(extractNameAndExtension(one, true), 2), oneName = _a[0], oneExtension = _a[1];
    var _b = __read(extractNameAndExtension(other, true), 2), otherName = _b[0], otherExtension = _b[1];
    var collatorNumeric = intlFileNameCollatorNumeric.value.collator;
    var collatorNumericCaseInsensitive = intlFileNameCollatorNumericCaseInsenstive.value.collator;
    var result;
    // Check for name differences, comparing numbers numerically instead of alphabetically.
    result = compareAndDisambiguateByLength(collatorNumeric, oneName, otherName);
    if (result !== 0) {
        return result;
    }
    // Check for case insensitive extension differences, comparing numbers numerically instead of alphabetically.
    result = compareAndDisambiguateByLength(collatorNumericCaseInsensitive, oneExtension, otherExtension);
    if (result !== 0) {
        return result;
    }
    // Disambiguate the extension case if needed.
    if (oneExtension !== otherExtension) {
        return collatorNumeric.compare(oneExtension, otherExtension);
    }
    return 0;
}
exports.compareFileNamesNumeric = compareFileNamesNumeric;
var FileNameMatch = /^(.*?)(\.([^.]*))?$/;
function noIntlCompareFileNames(one, other, caseSensitive) {
    if (caseSensitive === void 0) { caseSensitive = false; }
    if (!caseSensitive) {
        one = one && one.toLowerCase();
        other = other && other.toLowerCase();
    }
    var _a = __read(extractNameAndExtension(one), 2), oneName = _a[0], oneExtension = _a[1];
    var _b = __read(extractNameAndExtension(other), 2), otherName = _b[0], otherExtension = _b[1];
    if (oneName !== otherName) {
        return oneName < otherName ? -1 : 1;
    }
    if (oneExtension === otherExtension) {
        return 0;
    }
    return oneExtension < otherExtension ? -1 : 1;
}
exports.noIntlCompareFileNames = noIntlCompareFileNames;
function compareFileExtensions(one, other) {
    var _a = __read(extractNameAndExtension(one), 2), oneName = _a[0], oneExtension = _a[1];
    var _b = __read(extractNameAndExtension(other), 2), otherName = _b[0], otherExtension = _b[1];
    var result = intlFileNameCollatorBaseNumeric.value.collator.compare(oneExtension, otherExtension);
    if (result === 0) {
        // Using the numeric option in the collator will
        // make compare(`foo1`, `foo01`) === 0. We must disambiguate.
        if (intlFileNameCollatorBaseNumeric.value.collatorIsNumeric && oneExtension !== otherExtension) {
            return oneExtension < otherExtension ? -1 : 1;
        }
        // Extensions are equal, compare filenames
        result = intlFileNameCollatorBaseNumeric.value.collator.compare(oneName, otherName);
        if (intlFileNameCollatorBaseNumeric.value.collatorIsNumeric && result === 0 && oneName !== otherName) {
            return oneName < otherName ? -1 : 1;
        }
    }
    return result;
}
exports.compareFileExtensions = compareFileExtensions;
/** Compares filenames by extenson, then by name. Sorts numbers numerically, not alphabetically. */
function compareFileExtensionsNumeric(one, other) {
    var _a = __read(extractNameAndExtension(one, true), 2), oneName = _a[0], oneExtension = _a[1];
    var _b = __read(extractNameAndExtension(other, true), 2), otherName = _b[0], otherExtension = _b[1];
    var collatorNumeric = intlFileNameCollatorNumeric.value.collator;
    var collatorNumericCaseInsensitive = intlFileNameCollatorNumericCaseInsenstive.value.collator;
    var result;
    // Check for extension differences, ignoring differences in case and comparing numbers numerically.
    result = compareAndDisambiguateByLength(collatorNumericCaseInsensitive, oneExtension, otherExtension);
    if (result !== 0) {
        return result;
    }
    // Compare names.
    result = compareAndDisambiguateByLength(collatorNumeric, oneName, otherName);
    if (result !== 0) {
        return result;
    }
    // Disambiguate extension case if needed.
    if (oneExtension !== otherExtension) {
        return collatorNumeric.compare(oneExtension, otherExtension);
    }
    return 0;
}
exports.compareFileExtensionsNumeric = compareFileExtensionsNumeric;
/** Extracts the name and extension from a full filename, with optional special handling for dotfiles */
function extractNameAndExtension(str, dotfilesAsNames) {
    if (dotfilesAsNames === void 0) { dotfilesAsNames = false; }
    var match = str ? FileNameMatch.exec(str) : [];
    var result = [(match && match[1]) || '', (match && match[3]) || ''];
    // if the dotfilesAsNames option is selected, treat an empty filename with an extension,
    // or a filename that starts with a dot, as a dotfile name
    if (dotfilesAsNames && (!result[0] && result[1] || result[0] && result[0].charAt(0) === '.')) {
        result = [result[0] + '.' + result[1], ''];
    }
    return result;
}
function compareAndDisambiguateByLength(collator, one, other) {
    // Check for differences
    var result = collator.compare(one, other);
    if (result !== 0) {
        return result;
    }
    // In a numeric comparison, `foo1` and `foo01` will compare as equivalent.
    // Disambiguate by sorting the shorter string first.
    if (one.length !== other.length) {
        return one.length < other.length ? -1 : 1;
    }
    return 0;
}
function comparePathComponents(one, other, caseSensitive) {
    if (caseSensitive === void 0) { caseSensitive = false; }
    if (!caseSensitive) {
        one = one && one.toLowerCase();
        other = other && other.toLowerCase();
    }
    if (one === other) {
        return 0;
    }
    return one < other ? -1 : 1;
}
function comparePaths(one, other, caseSensitive) {
    if (caseSensitive === void 0) { caseSensitive = false; }
    var oneParts = one.split(sep);
    var otherParts = other.split(sep);
    var lastOne = oneParts.length - 1;
    var lastOther = otherParts.length - 1;
    var endOne, endOther;
    for (var i = 0;; i++) {
        endOne = lastOne === i;
        endOther = lastOther === i;
        if (endOne && endOther) {
            return compareFileNames(oneParts[i], otherParts[i], caseSensitive);
        }
        else if (endOne) {
            return -1;
        }
        else if (endOther) {
            return 1;
        }
        var result = comparePathComponents(oneParts[i], otherParts[i], caseSensitive);
        if (result !== 0) {
            return result;
        }
    }
}
exports.comparePaths = comparePaths;
function compareAnything(one, other, lookFor) {
    var elementAName = one.toLowerCase();
    var elementBName = other.toLowerCase();
    // Sort prefix matches over non prefix matches
    var prefixCompare = compareByPrefix(one, other, lookFor);
    if (prefixCompare) {
        return prefixCompare;
    }
    // Sort suffix matches over non suffix matches
    var elementASuffixMatch = elementAName.endsWith(lookFor);
    var elementBSuffixMatch = elementBName.endsWith(lookFor);
    if (elementASuffixMatch !== elementBSuffixMatch) {
        return elementASuffixMatch ? -1 : 1;
    }
    // Understand file names
    var r = compareFileNames(elementAName, elementBName);
    if (r !== 0) {
        return r;
    }
    // Compare by name
    return elementAName.localeCompare(elementBName);
}
exports.compareAnything = compareAnything;
function compareByPrefix(one, other, lookFor) {
    var elementAName = one.toLowerCase();
    var elementBName = other.toLowerCase();
    // Sort prefix matches over non prefix matches
    var elementAPrefixMatch = elementAName.startsWith(lookFor);
    var elementBPrefixMatch = elementBName.startsWith(lookFor);
    if (elementAPrefixMatch !== elementBPrefixMatch) {
        return elementAPrefixMatch ? -1 : 1;
    }
    // Same prefix: Sort shorter matches to the top to have those on top that match more precisely
    // tslint:disable-next-line: one-line
    else if (elementAPrefixMatch && elementBPrefixMatch) {
        if (elementAName.length < elementBName.length) {
            return -1;
        }
        if (elementAName.length > elementBName.length) {
            return 1;
        }
    }
    return 0;
}
exports.compareByPrefix = compareByPrefix;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/arduino-component.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/arduino-component.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/arduino-daemon.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/arduino-daemon.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ArduinoDaemon = exports.ArduinoDaemonPath = exports.ArduinoDaemonClient = void 0;
exports.ArduinoDaemonClient = Symbol('ArduinoDaemonClient');
exports.ArduinoDaemonPath = '/services/arduino-daemon';
exports.ArduinoDaemon = Symbol('ArduinoDaemon');


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.Programmer = exports.ConfigOption = exports.Port = exports.BoardsService = exports.BoardsServicePath = exports.BoardsServiceClient = exports.AttachedBoardsChangeEvent = void 0;
var os_1 = __webpack_require__(/*! @theia/core/lib/common/os */ "./node_modules/@theia/core/lib/common/os.js");
var utils_1 = __webpack_require__(/*! ./../utils */ "./node_modules/arduino-ide-extension/lib/common/utils.js");
var AttachedBoardsChangeEvent;
(function (AttachedBoardsChangeEvent) {
    function diff(event) {
        // In `lefts` AND not in `rights`.
        var diff = function (lefts, rights, sameAs) {
            return lefts.filter(function (left) { return rights.findIndex(function (right) { return sameAs(left, right); }) === -1; });
        };
        var newBoards = event.newState.boards;
        var oldBoards = event.oldState.boards;
        var newPorts = event.newState.ports;
        var oldPorts = event.oldState.ports;
        var boardSameAs = function (left, right) { return Board.sameAs(left, right); };
        var portSameAs = function (left, right) { return Port.sameAs(left, right); };
        return {
            detached: {
                boards: diff(oldBoards, newBoards, boardSameAs),
                ports: diff(oldPorts, newPorts, portSameAs)
            },
            attached: {
                boards: diff(newBoards, oldBoards, boardSameAs),
                ports: diff(newPorts, oldPorts, portSameAs)
            }
        };
    }
    AttachedBoardsChangeEvent.diff = diff;
})(AttachedBoardsChangeEvent = exports.AttachedBoardsChangeEvent || (exports.AttachedBoardsChangeEvent = {}));
exports.BoardsServiceClient = Symbol('BoardsServiceClient');
exports.BoardsServicePath = '/services/boards-service';
exports.BoardsService = Symbol('BoardsService');
var Port;
(function (Port) {
    var Protocol;
    (function (Protocol) {
        function toProtocol(protocol) {
            if (protocol === 'serial') {
                return 'serial';
            }
            else if (protocol === 'network') {
                return 'network';
            }
            else {
                return 'unknown';
            }
        }
        Protocol.toProtocol = toProtocol;
    })(Protocol = Port.Protocol || (Port.Protocol = {}));
    function is(arg) {
        return !!arg && 'address' in arg && typeof arg['address'] === 'string' && 'protocol' in arg && typeof arg['protocol'] === 'string';
    }
    Port.is = is;
    function toString(port, options) {
        if (options === void 0) { options = { useLabel: false }; }
        if (options.useLabel && port.label) {
            return port.address + " " + port.label;
        }
        return port.address;
    }
    Port.toString = toString;
    function compare(left, right) {
        // Board ports have higher priorities, they come first.
        if (isBoardPort(left) && !isBoardPort(right)) {
            return -1;
        }
        if (!isBoardPort(left) && isBoardPort(right)) {
            return 1;
        }
        var result = utils_1.naturalCompare(left.protocol.toLocaleLowerCase(), right.protocol.toLocaleLowerCase());
        if (result !== 0) {
            return result;
        }
        result = utils_1.naturalCompare(left.address, right.address);
        if (result !== 0) {
            return result;
        }
        return utils_1.naturalCompare(left.label || '', right.label || '');
    }
    Port.compare = compare;
    function equals(left, right) {
        if (left && right) {
            return left.address === right.address
                && left.protocol === right.protocol
                && (left.label || '') === (right.label || '');
        }
        return left === right;
    }
    Port.equals = equals;
    // Based on: https://github.com/arduino/Arduino/blob/93581b03d723e55c60caedb4729ffc6ea808fe78/arduino-core/src/processing/app/SerialPortList.java#L48-L74   
    function isBoardPort(port) {
        var address = port.address.toLocaleLowerCase();
        if (os_1.isWindows) {
            // `COM1` seems to be the default serial port on Windows.
            return address !== 'COM1'.toLocaleLowerCase();
        }
        // On macOS and Linux, the port should start with `/dev/`.
        if (!address.startsWith('/dev/')) {
            return false;
        }
        if (os_1.isOSX) {
            // Example: `/dev/cu.usbmodem14401`
            if (/(tty|cu)\..*/i.test(address.substring('/dev/'.length))) {
                return [
                    '/dev/cu.MALS',
                    '/dev/cu.SOC',
                    '/dev/cu.Bluetooth-Incoming-Port'
                ].map(function (a) { return a.toLocaleLowerCase(); }).every(function (a) { return a !== address; });
            }
        }
        // Example: `/dev/ttyACM0`
        if (/(ttyS|ttyUSB|ttyACM|ttyAMA|rfcomm|ttyO)[0-9]{1,3}/i.test(address.substring('/dev/'.length))) {
            // Default ports were `/dev/ttyS0` -> `/dev/ttyS31` on Ubuntu 16.04.2.
            if (address.startsWith('/dev/ttyS')) {
                var index = Number.parseInt(address.substring('/dev/ttyS'.length), 10);
                if (!Number.isNaN(index) && 0 <= index && 31 >= index) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    Port.isBoardPort = isBoardPort;
    function sameAs(left, right) {
        if (left && right) {
            if (left.protocol !== 'serial') {
                console.log("Unexpected protocol for 'left' port: " + JSON.stringify(left) + ". Ignoring 'protocol', comparing 'addresses' with " + JSON.stringify(right) + ".");
            }
            if (typeof right === 'string') {
                return left.address === right;
            }
            if (right.protocol !== 'serial') {
                console.log("Unexpected protocol for 'right' port: " + JSON.stringify(right) + ". Ignoring 'protocol', comparing 'addresses' with " + JSON.stringify(left) + ".");
            }
            return left.address === right.address;
        }
        return false;
    }
    Port.sameAs = sameAs;
})(Port = exports.Port || (exports.Port = {}));
var ConfigOption;
(function (ConfigOption) {
    function is(arg) {
        return !!arg && 'option' in arg && 'label' in arg && 'values' in arg
            && typeof arg['option'] === 'string' && typeof arg['label'] === 'string' && Array.isArray(arg['values']);
    }
    ConfigOption.is = is;
    /**
     * Appends the configuration options to the `fqbn` argument.
     * Throws an error if the `fqbn` does not have the `segment(':'segment)*` format.
     * The provided output format is always segment(':'segment)*(':'option'='value(','option'='value)*)?
     */
    function decorate(fqbn, configOptions) {
        if (!configOptions.length) {
            return fqbn;
        }
        var toValue = function (values) {
            var selectedValue = values.find(function (_a) {
                var selected = _a.selected;
                return selected;
            });
            if (!selectedValue) {
                console.warn("None of the config values was selected. Values were: " + JSON.stringify(values));
                return undefined;
            }
            return selectedValue.value;
        };
        var options = configOptions
            .map(function (_a) {
            var option = _a.option, values = _a.values;
            return [option, toValue(values)];
        })
            .filter(function (_a) {
            var _b = __read(_a, 2), value = _b[1];
            return !!value;
        })
            .map(function (_a) {
            var _b = __read(_a, 2), option = _b[0], value = _b[1];
            return option + "=" + value;
        })
            .join(',');
        return fqbn + ":" + options;
    }
    ConfigOption.decorate = decorate;
    var ConfigOptionError = /** @class */ (function (_super) {
        __extends(ConfigOptionError, _super);
        function ConfigOptionError(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, ConfigOptionError.prototype);
            return _this;
        }
        return ConfigOptionError;
    }(Error));
    ConfigOption.ConfigOptionError = ConfigOptionError;
    ConfigOption.LABEL_COMPARATOR = function (left, right) { return utils_1.naturalCompare(left.label.toLocaleLowerCase(), right.label.toLocaleLowerCase()); };
})(ConfigOption = exports.ConfigOption || (exports.ConfigOption = {}));
var Programmer;
(function (Programmer) {
    function equals(left, right) {
        if (!left) {
            return !right;
        }
        if (!right) {
            return !left;
        }
        return left.id === right.id && left.name === right.name && left.platform === right.platform;
    }
    Programmer.equals = equals;
})(Programmer = exports.Programmer || (exports.Programmer = {}));
var Board;
(function (Board) {
    function is(board) {
        return !!board && 'name' in board;
    }
    Board.is = is;
    function equals(left, right) {
        return left.name === right.name && left.fqbn === right.fqbn;
    }
    Board.equals = equals;
    function sameAs(left, right) {
        // How to associate a selected board with one of the available cores: https://typefox.slack.com/archives/CJJHJCJSJ/p1571142327059200
        // 1. How to use the FQBN if any and infer the package ID from it: https://typefox.slack.com/archives/CJJHJCJSJ/p1571147549069100
        // 2. How to trim the `/Genuino` from the name: https://arduino.slack.com/archives/CJJHJCJSJ/p1571146951066800?thread_ts=1571142327.059200&cid=CJJHJCJSJ
        var other = typeof right === 'string' ? { name: right } : right;
        if (left.fqbn && other.fqbn) {
            return left.fqbn === other.fqbn;
        }
        return left.name.replace('/Genuino', '') === other.name.replace('/Genuino', '');
    }
    Board.sameAs = sameAs;
    function compare(left, right) {
        var result = utils_1.naturalCompare(left.name, right.name);
        if (result === 0) {
            result = utils_1.naturalCompare(left.fqbn || '', right.fqbn || '');
        }
        return result;
    }
    Board.compare = compare;
    function installed(board) {
        return !!board.fqbn;
    }
    Board.installed = installed;
    function toString(board, options) {
        if (options === void 0) { options = { useFqbn: true }; }
        var fqbn = options && options.useFqbn && board.fqbn ? " [" + board.fqbn + "]" : '';
        return "" + board.name + fqbn;
    }
    Board.toString = toString;
    function decorateBoards(selectedBoard, boards) {
        var e_1, _a;
        // Board names are not unique. We show the corresponding core name as a detail.
        // https://github.com/arduino/arduino-cli/pull/294#issuecomment-513764948
        var distinctBoardNames = new Map();
        try {
            for (var boards_1 = __values(boards), boards_1_1 = boards_1.next(); !boards_1_1.done; boards_1_1 = boards_1.next()) {
                var name_1 = boards_1_1.value.name;
                var counter = distinctBoardNames.get(name_1) || 0;
                distinctBoardNames.set(name_1, counter + 1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (boards_1_1 && !boards_1_1.done && (_a = boards_1.return)) _a.call(boards_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Due to the non-unique board names, we have to check the package name as well.
        var selected = function (board) {
            if (!!selectedBoard) {
                if (Board.equals(board, selectedBoard)) {
                    if ('packageName' in selectedBoard) {
                        return board.packageName === selectedBoard.packageName;
                    }
                    return true;
                }
            }
            return false;
        };
        return boards.map(function (board) { return (__assign(__assign({}, board), { details: (distinctBoardNames.get(board.name) || 0) > 1 ? " - " + board.packageName : undefined, selected: selected(board), missing: !installed(board) })); });
    }
    Board.decorateBoards = decorateBoards;
})(Board = exports.Board || (exports.Board = {}));


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/config-service.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/config-service.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = exports.ConfigServicePath = exports.ConfigServiceClient = void 0;
exports.ConfigServiceClient = Symbol('ConfigServiceClient');
exports.ConfigServicePath = '/services/config-service';
exports.ConfigService = Symbol('ConfigService');


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/core-service.js":
/*!********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/core-service.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreService = exports.CoreServicePath = exports.CoreServiceClient = void 0;
exports.CoreServiceClient = Symbol('CoreServiceClient');
exports.CoreServicePath = '/services/core-service';
exports.CoreService = Symbol('CoreService');


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/filesystem-ext.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/filesystem-ext.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemExt = exports.FileSystemExtPath = void 0;
exports.FileSystemExtPath = '/services/file-system-ext';
exports.FileSystemExt = Symbol('FileSystemExt');


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./arduino-component */ "./node_modules/arduino-ide-extension/lib/common/protocol/arduino-component.js"), exports);
__exportStar(__webpack_require__(/*! ./arduino-daemon */ "./node_modules/arduino-ide-extension/lib/common/protocol/arduino-daemon.js"), exports);
__exportStar(__webpack_require__(/*! ./boards-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js"), exports);
__exportStar(__webpack_require__(/*! ./config-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/config-service.js"), exports);
__exportStar(__webpack_require__(/*! ./core-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/core-service.js"), exports);
__exportStar(__webpack_require__(/*! ./filesystem-ext */ "./node_modules/arduino-ide-extension/lib/common/protocol/filesystem-ext.js"), exports);
__exportStar(__webpack_require__(/*! ./installable */ "./node_modules/arduino-ide-extension/lib/common/protocol/installable.js"), exports);
__exportStar(__webpack_require__(/*! ./library-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/library-service.js"), exports);
__exportStar(__webpack_require__(/*! ./monitor-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/monitor-service.js"), exports);
__exportStar(__webpack_require__(/*! ./searchable */ "./node_modules/arduino-ide-extension/lib/common/protocol/searchable.js"), exports);
__exportStar(__webpack_require__(/*! ./sketches-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service.js"), exports);
__exportStar(__webpack_require__(/*! ./tool-output-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/tool-output-service.js"), exports);


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/installable.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/installable.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Installable = void 0;
var utils_1 = __webpack_require__(/*! ./../utils */ "./node_modules/arduino-ide-extension/lib/common/utils.js");
var Installable;
(function (Installable) {
    var Version;
    (function (Version) {
        /**
         * Most recent version comes first, then the previous versions. (`1.8.1`, `1.6.3`, `1.6.2`, `1.6.1` and so on.)
         */
        Version.COMPARATOR = function (left, right) { return utils_1.naturalCompare(right, left); };
    })(Version = Installable.Version || (Installable.Version = {}));
})(Installable = exports.Installable || (exports.Installable = {}));


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/library-service.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/library-service.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryService = exports.LibraryServicePath = void 0;
exports.LibraryServicePath = '/services/library-service';
exports.LibraryService = Symbol('LibraryService');


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/monitor-service.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/monitor-service.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorError = exports.MonitorServiceClient = exports.MonitorConfig = exports.MonitorService = exports.MonitorServicePath = exports.Status = void 0;
var Status;
(function (Status) {
    function isOK(status) {
        return typeof status.message !== 'string';
    }
    Status.isOK = isOK;
    Status.OK = {};
    Status.NOT_CONNECTED = { message: 'Not connected.' };
    Status.ALREADY_CONNECTED = { message: 'Already connected.' };
})(Status = exports.Status || (exports.Status = {}));
exports.MonitorServicePath = '/services/serial-monitor';
exports.MonitorService = Symbol('MonitorService');
var MonitorConfig;
(function (MonitorConfig) {
    var BaudRate;
    (function (BaudRate) {
        BaudRate.DEFAULT = 9600;
    })(BaudRate = MonitorConfig.BaudRate || (MonitorConfig.BaudRate = {}));
    var ConnectionType;
    (function (ConnectionType) {
        ConnectionType[ConnectionType["SERIAL"] = 0] = "SERIAL";
    })(ConnectionType = MonitorConfig.ConnectionType || (MonitorConfig.ConnectionType = {}));
})(MonitorConfig = exports.MonitorConfig || (exports.MonitorConfig = {}));
exports.MonitorServiceClient = Symbol('MonitorServiceClient');
var MonitorError;
(function (MonitorError) {
    var ErrorCodes;
    (function (ErrorCodes) {
        /**
         * The frontend has refreshed the browser, for instance.
         */
        ErrorCodes.CLIENT_CANCEL = 1;
        /**
         * When detaching a physical device when the duplex channel is still opened.
         */
        ErrorCodes.DEVICE_NOT_CONFIGURED = 2;
        /**
         * Another serial monitor was opened on this port. For another electron-instance, Java IDE.
         */
        ErrorCodes.DEVICE_BUSY = 3;
    })(ErrorCodes = MonitorError.ErrorCodes || (MonitorError.ErrorCodes = {}));
})(MonitorError = exports.MonitorError || (exports.MonitorError = {}));


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/searchable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/searchable.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service.js":
/*!************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sketch = exports.SketchesService = exports.SketchesServicePath = void 0;
exports.SketchesServicePath = '/services/sketches-service';
exports.SketchesService = Symbol('SketchesService');
var Sketch;
(function (Sketch) {
    function is(arg) {
        return !!arg && 'name' in arg && 'uri' in arg && typeof arg.name === 'string' && typeof arg.uri === 'string';
    }
    Sketch.is = is;
    var Extensions;
    (function (Extensions) {
        Extensions.MAIN = ['.ino', '.pde'];
        Extensions.SOURCE = ['.c', '.cpp', '.s'];
        Extensions.ADDITIONAL = ['.h', '.c', '.hpp', '.hh', '.cpp', '.s'];
        Extensions.ALL = Array.from(new Set(__spread(Extensions.MAIN, Extensions.SOURCE, Extensions.ADDITIONAL)));
    })(Extensions = Sketch.Extensions || (Sketch.Extensions = {}));
    function isInSketch(uri, sketch) {
        var mainFileUri = sketch.mainFileUri, otherSketchFileUris = sketch.otherSketchFileUris, additionalFileUris = sketch.additionalFileUris;
        return __spread([mainFileUri], otherSketchFileUris, additionalFileUris).indexOf(uri.toString()) !== -1;
    }
    Sketch.isInSketch = isInSketch;
})(Sketch = exports.Sketch || (exports.Sketch = {}));


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/tool-output-service.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/tool-output-service.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolOutputService = exports.ToolOutputServiceClient = exports.ToolOutputServiceServer = void 0;
exports.ToolOutputServiceServer = Symbol('ToolOutputServiceServer');
exports.ToolOutputServiceClient = Symbol('ToolOutputServiceClient');
var ToolOutputService;
(function (ToolOutputService) {
    ToolOutputService.SERVICE_PATH = '/tool-output-service';
})(ToolOutputService = exports.ToolOutputService || (exports.ToolOutputService = {}));


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/utils.js":
/*!****************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/utils.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.firstToLowerCase = exports.notEmpty = exports.naturalCompare = void 0;
exports.naturalCompare = __webpack_require__(/*! string-natural-compare */ "./node_modules/string-natural-compare/natural-compare.js").caseInsensitive;
function notEmpty(arg) {
    return !!arg;
}
exports.notEmpty = notEmpty;
function firstToLowerCase(what) {
    return what.charAt(0).toLowerCase() + what.slice(1);
}
exports.firstToLowerCase = firstToLowerCase;


/***/ }),

/***/ "./node_modules/string-natural-compare/natural-compare.js":
/*!****************************************************************!*\
  !*** ./node_modules/string-natural-compare/natural-compare.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet;
var alphabetIndexMap;
var alphabetIndexMapLength = 0;

function isNumberCode(code) {
  return code >= 48 && code <= 57;
}

function naturalCompare(a, b) {
  var lengthA = (a += '').length;
  var lengthB = (b += '').length;
  var aIndex = 0;
  var bIndex = 0;

  while (aIndex < lengthA && bIndex < lengthB) {
    var charCodeA = a.charCodeAt(aIndex);
    var charCodeB = b.charCodeAt(bIndex);

    if (isNumberCode(charCodeA)) {
      if (!isNumberCode(charCodeB)) {
        return charCodeA - charCodeB;
      }

      var numStartA = aIndex;
      var numStartB = bIndex;

      while (charCodeA === 48 && ++numStartA < lengthA) {
        charCodeA = a.charCodeAt(numStartA);
      }
      while (charCodeB === 48 && ++numStartB < lengthB) {
        charCodeB = b.charCodeAt(numStartB);
      }

      var numEndA = numStartA;
      var numEndB = numStartB;

      while (numEndA < lengthA && isNumberCode(a.charCodeAt(numEndA))) {
        ++numEndA;
      }
      while (numEndB < lengthB && isNumberCode(b.charCodeAt(numEndB))) {
        ++numEndB;
      }

      var difference = numEndA - numStartA - numEndB + numStartB; // numA length - numB length
      if (difference) {
        return difference;
      }

      while (numStartA < numEndA) {
        difference = a.charCodeAt(numStartA++) - b.charCodeAt(numStartB++);
        if (difference) {
          return difference;
        }
      }

      aIndex = numEndA;
      bIndex = numEndB;
      continue;
    }

    if (charCodeA !== charCodeB) {
      if (
        charCodeA < alphabetIndexMapLength &&
        charCodeB < alphabetIndexMapLength &&
        alphabetIndexMap[charCodeA] !== -1 &&
        alphabetIndexMap[charCodeB] !== -1
      ) {
        return alphabetIndexMap[charCodeA] - alphabetIndexMap[charCodeB];
      }

      return charCodeA - charCodeB;
    }

    ++aIndex;
    ++bIndex;
  }

  if (aIndex >= lengthA && bIndex < lengthB && lengthA >= lengthB) {
    return -1;
  }

  if (bIndex >= lengthB && aIndex < lengthA && lengthB >= lengthA) {
    return 1;
  }

  return lengthA - lengthB;
}

naturalCompare.caseInsensitive = naturalCompare.i = function(a, b) {
  return naturalCompare(('' + a).toLowerCase(), ('' + b).toLowerCase());
};

Object.defineProperties(naturalCompare, {
  alphabet: {
    get: function() {
      return alphabet;
    },

    set: function(value) {
      alphabet = value;
      alphabetIndexMap = [];

      var i = 0;

      if (alphabet) {
        for (; i < alphabet.length; i++) {
          alphabetIndexMap[alphabet.charCodeAt(i)] = i;
        }
      }

      alphabetIndexMapLength = alphabetIndexMap.length;

      for (i = 0; i < alphabetIndexMapLength; i++) {
        if (alphabetIndexMap[i] === undefined) {
          alphabetIndexMap[i] = -1;
        }
      }
    },
  },
});

module.exports = naturalCompare;


/***/ })

}]);
//# sourceMappingURL=37.bundle.js.map