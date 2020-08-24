/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
import { Disposable } from '../../../common/lifecycle';
import { Emitter } from '../../../common/event';
import * as dom from '../../dom';
import * as arrays from '../../../common/arrays';
import { isMacintosh } from '../../../common/platform';
import { Gesture, EventType } from '../../touch';
var SelectBoxNative = /** @class */ (function (_super) {
    __extends(SelectBoxNative, _super);
    function SelectBoxNative(options, selected, styles, selectBoxOptions) {
        var _this = _super.call(this) || this;
        _this.selected = 0;
        _this.selectBoxOptions = selectBoxOptions || Object.create(null);
        _this.options = [];
        _this.selectElement = document.createElement('select');
        _this.selectElement.className = 'monaco-select-box';
        if (typeof _this.selectBoxOptions.ariaLabel === 'string') {
            _this.selectElement.setAttribute('aria-label', _this.selectBoxOptions.ariaLabel);
        }
        _this._onDidSelect = _this._register(new Emitter());
        _this.styles = styles;
        _this.registerListeners();
        _this.setOptions(options, selected);
        return _this;
    }
    SelectBoxNative.prototype.registerListeners = function () {
        var _this = this;
        this._register(Gesture.addTarget(this.selectElement));
        [EventType.Tap].forEach(function (eventType) {
            _this._register(dom.addDisposableListener(_this.selectElement, eventType, function (e) {
                _this.selectElement.focus();
            }));
        });
        this._register(dom.addStandardDisposableListener(this.selectElement, 'change', function (e) {
            _this.selectElement.title = e.target.value;
            _this._onDidSelect.fire({
                index: e.target.selectedIndex,
                selected: e.target.value
            });
        }));
        this._register(dom.addStandardDisposableListener(this.selectElement, 'keydown', function (e) {
            var showSelect = false;
            if (isMacintosh) {
                if (e.keyCode === 18 /* DownArrow */ || e.keyCode === 16 /* UpArrow */ || e.keyCode === 10 /* Space */) {
                    showSelect = true;
                }
            }
            else {
                if (e.keyCode === 18 /* DownArrow */ && e.altKey || e.keyCode === 10 /* Space */ || e.keyCode === 3 /* Enter */) {
                    showSelect = true;
                }
            }
            if (showSelect) {
                // Space, Enter, is used to expand select box, do not propagate it (prevent action bar action run)
                e.stopPropagation();
            }
        }));
    };
    Object.defineProperty(SelectBoxNative.prototype, "onDidSelect", {
        get: function () {
            return this._onDidSelect.event;
        },
        enumerable: true,
        configurable: true
    });
    SelectBoxNative.prototype.setOptions = function (options, selected) {
        var _this = this;
        if (!this.options || !arrays.equals(this.options, options)) {
            this.options = options;
            this.selectElement.options.length = 0;
            this.options.forEach(function (option, index) {
                _this.selectElement.add(_this.createOption(option.text, index, option.isDisabled));
            });
        }
        if (selected !== undefined) {
            this.select(selected);
        }
    };
    SelectBoxNative.prototype.select = function (index) {
        if (this.options.length === 0) {
            this.selected = 0;
        }
        else if (index >= 0 && index < this.options.length) {
            this.selected = index;
        }
        else if (index > this.options.length - 1) {
            // Adjust index to end of list
            // This could make client out of sync with the select
            this.select(this.options.length - 1);
        }
        else if (this.selected < 0) {
            this.selected = 0;
        }
        this.selectElement.selectedIndex = this.selected;
        if ((this.selected < this.options.length) && typeof this.options[this.selected].text === 'string') {
            this.selectElement.title = this.options[this.selected].text;
        }
        else {
            this.selectElement.title = '';
        }
    };
    SelectBoxNative.prototype.setAriaLabel = function (label) {
        this.selectBoxOptions.ariaLabel = label;
        this.selectElement.setAttribute('aria-label', label);
    };
    SelectBoxNative.prototype.focus = function () {
        if (this.selectElement) {
            this.selectElement.focus();
        }
    };
    SelectBoxNative.prototype.blur = function () {
        if (this.selectElement) {
            this.selectElement.blur();
        }
    };
    SelectBoxNative.prototype.render = function (container) {
        dom.addClass(container, 'select-container');
        container.appendChild(this.selectElement);
        this.setOptions(this.options, this.selected);
        this.applyStyles();
    };
    SelectBoxNative.prototype.style = function (styles) {
        this.styles = styles;
        this.applyStyles();
    };
    SelectBoxNative.prototype.applyStyles = function () {
        // Style native select
        if (this.selectElement) {
            var background = this.styles.selectBackground ? this.styles.selectBackground.toString() : '';
            var foreground = this.styles.selectForeground ? this.styles.selectForeground.toString() : '';
            var border = this.styles.selectBorder ? this.styles.selectBorder.toString() : '';
            this.selectElement.style.backgroundColor = background;
            this.selectElement.style.color = foreground;
            this.selectElement.style.borderColor = border;
        }
    };
    SelectBoxNative.prototype.createOption = function (value, index, disabled) {
        var option = document.createElement('option');
        option.value = value;
        option.text = value;
        option.disabled = !!disabled;
        return option;
    };
    return SelectBoxNative;
}(Disposable));
export { SelectBoxNative };
