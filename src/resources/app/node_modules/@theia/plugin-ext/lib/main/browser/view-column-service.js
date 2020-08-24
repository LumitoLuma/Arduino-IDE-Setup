"use strict";
/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ViewColumnService = void 0;
var inversify_1 = require("inversify");
var event_1 = require("@theia/core/lib/common/event");
var application_shell_1 = require("@theia/core/lib/browser/shell/application-shell");
var algorithm_1 = require("@phosphor/algorithm");
var ViewColumnService = /** @class */ (function () {
    function ViewColumnService(shell) {
        var _this = this;
        this.shell = shell;
        this.columnValues = new Map();
        this.viewColumnIds = new Map();
        this.onViewColumnChangedEmitter = new event_1.Emitter();
        var oldColumnValues = new Map();
        var update = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise((function (resolve) { return setTimeout(function () { return resolve(); }); }))];
                    case 1:
                        _a.sent();
                        this.updateViewColumns();
                        this.viewColumnIds.forEach(function (ids, viewColumn) {
                            ids.forEach(function (id) {
                                if (!oldColumnValues.has(id) || oldColumnValues.get(id) !== viewColumn) {
                                    _this.onViewColumnChangedEmitter.fire({ id: id, viewColumn: viewColumn });
                                }
                            });
                        });
                        oldColumnValues = new Map(this.columnValues.entries());
                        return [2 /*return*/];
                }
            });
        }); };
        this.shell.mainPanel.widgetAdded.connect(function () { return update(); });
        this.shell.mainPanel.widgetRemoved.connect(function () { return update(); });
    }
    Object.defineProperty(ViewColumnService.prototype, "onViewColumnChanged", {
        get: function () {
            return this.onViewColumnChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    ViewColumnService.prototype.updateViewColumns = function () {
        var e_1, _a;
        this.columnValues.clear();
        this.viewColumnIds.clear();
        var rows = new Map();
        var columns = new Map();
        try {
            for (var _b = __values(algorithm_1.toArray(this.shell.mainPanel.tabBars())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var tabBar = _c.value;
                if (!tabBar.node.style.top || !tabBar.node.style.left) {
                    continue;
                }
                var top_1 = parseInt(tabBar.node.style.top);
                var left = parseInt(tabBar.node.style.left);
                var row = rows.get(top_1) || new Set();
                row.add(left);
                rows.set(top_1, row);
                var column = columns.get(left) || new Map();
                column.set(top_1, tabBar);
                columns.set(left, column);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var firstRow = rows.get(__spread(rows.keys()).sort()[0]);
        if (!firstRow) {
            return;
        }
        var lefts = __spread(firstRow.keys()).sort();
        for (var i = 0; i < lefts.length; i++) {
            var column = columns.get(lefts[i]);
            if (!column) {
                break;
            }
            var cellIndexes = __spread(column.keys()).sort();
            var viewColumn = Math.min(i, 2);
            for (var j = 0; j < cellIndexes.length; j++) {
                var cell = column.get(cellIndexes[j]);
                if (!cell) {
                    break;
                }
                this.setViewColumn(cell, viewColumn);
                if (viewColumn < 7) {
                    viewColumn += 3;
                }
            }
        }
    };
    ViewColumnService.prototype.setViewColumn = function (tabBar, viewColumn) {
        var e_2, _a;
        var ids = [];
        try {
            for (var _b = __values(tabBar.titles), _c = _b.next(); !_c.done; _c = _b.next()) {
                var title = _c.value;
                var id = title.owner.id;
                ids.push(id);
                this.columnValues.set(id, viewColumn);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.viewColumnIds.set(viewColumn, ids);
    };
    ViewColumnService.prototype.getViewColumnIds = function (viewColumn) {
        return this.viewColumnIds.get(viewColumn) || [];
    };
    ViewColumnService.prototype.getViewColumn = function (id) {
        return this.columnValues.get(id);
    };
    ViewColumnService.prototype.hasViewColumn = function (id) {
        return this.columnValues.has(id);
    };
    ViewColumnService.prototype.viewColumnsSize = function () {
        return this.viewColumnIds.size;
    };
    ViewColumnService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(application_shell_1.ApplicationShell)),
        __metadata("design:paramtypes", [application_shell_1.ApplicationShell])
    ], ViewColumnService);
    return ViewColumnService;
}());
exports.ViewColumnService = ViewColumnService;
//# sourceMappingURL=view-column-service.js.map