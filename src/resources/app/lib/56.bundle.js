(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[56],{

/***/ "./node_modules/@babel/runtime/helpers/inheritsLoose.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inheritsLoose.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),

/***/ "./node_modules/@emotion/cache/dist/cache.browser.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/cache.browser.esm.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/sheet.browser.esm.js");
/* harmony import */ var _emotion_stylis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/stylis */ "./node_modules/@emotion/stylis/dist/stylis.browser.esm.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js");




// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};
var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new _emotion_stylis__WEBPACK_IMPORTED_MODULE_1__["default"](stylisOptions);

  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;

  {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      if ( true && serialized.map !== undefined) {
        var map = serialized.map;
        Sheet.current = {
          insert: function insert(rule) {
            sheet.insert(rule + map);
          }
        };
      }

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  }

  if (true) {
    // https://esbench.com/bench/5bf7371a4cd7e6009ef61d0a
    var commentStart = /\/\*/g;
    var commentEnd = /\*\//g;
    stylis.use(function (context, content) {
      switch (context) {
        case -1:
          {
            while (commentStart.test(content)) {
              commentEnd.lastIndex = commentStart.lastIndex;

              if (commentEnd.test(content)) {
                commentStart.lastIndex = commentEnd.lastIndex;
                continue;
              }

              throw new Error('Your styles have an unterminated comment ("/*" without corresponding "*/").');
            }

            commentStart.lastIndex = 0;
            break;
          }
      }
    });
    stylis.use(function (context, content, selectors) {
      switch (context) {
        case -1:
          {
            var flag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
            var unsafePseudoClasses = content.match(/(:first|:nth|:nth-last)-child/g);

            if (unsafePseudoClasses && cache.compat !== true) {
              unsafePseudoClasses.forEach(function (unsafePseudoClass) {
                var ignoreRegExp = new RegExp(unsafePseudoClass + ".*\\/\\* " + flag + " \\*\\/");
                var ignore = ignoreRegExp.test(content);

                if (unsafePseudoClass && !ignore) {
                  console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
                }
              });
            }

            break;
          }
      }
    });
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__["StyleSheet"]({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

/* harmony default export */ __webpack_exports__["default"] = (createCache);


/***/ }),

/***/ "./node_modules/@emotion/core/dist/core.browser.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/core/dist/core.browser.esm.js ***!
  \*************************************************************/
/*! exports provided: css, CacheProvider, ClassNames, Global, ThemeContext, jsx, keyframes, withEmotionCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheProvider", function() { return CacheProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassNames", function() { return ClassNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Global", function() { return Global; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeContext", function() { return ThemeContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsx", function() { return jsx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withEmotionCache", function() { return withEmotionCache; });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/cache.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js");
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/sheet.browser.esm.js");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/css */ "./node_modules/@emotion/css/dist/css.browser.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "css", function() { return _emotion_css__WEBPACK_IMPORTED_MODULE_6__["default"]; });










var EmotionCacheContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? Object(_emotion_cache__WEBPACK_IMPORTED_MODULE_2__["default"])() : null);
var ThemeContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])({});
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  var render = function render(props, ref) {
    return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(EmotionCacheContext.Consumer, null, function (cache) {
      return func(props, cache, ref);
    });
  }; // $FlowFixMe


  return Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(render);
};

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var render = function render(cache, props, theme, ref) {
  var cssProp = theme === null ? props.css : props.css(theme); // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_3__["getRegisteredStyles"])(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__["serializeStyles"])(registeredStyles);

  if ( true && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__["serializeStyles"])([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_3__["insertStyles"])(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(type, newProps);

  return ele;
};

var Emotion =
/* #__PURE__ */
withEmotionCache(function (props, cache, ref) {
  // use Context.read for the theme when it's stable
  if (typeof props.css === 'function') {
    return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(ThemeContext.Consumer, null, function (theme) {
      return render(cache, props, theme, ref);
    });
  }

  return render(cache, props, null, ref);
});

if (true) {
  Emotion.displayName = 'EmotionCssPropInternal';
} // $FlowFixMe


var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"].apply(undefined, args);
  }

  if ( true && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css`" + props.css + "`");
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type;

  if (true) {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|)jsx.*\n\s+at ([A-Z][A-Za-z$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  createElementArgArray[1] = newProps;

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"].apply(null, createElementArgArray);
};

var warnedAboutCssPropForGlobal = false;
var Global =
/* #__PURE__ */
withEmotionCache(function (props, cache) {
  if ( true && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;

  if (typeof styles === 'function') {
    return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(ThemeContext.Consumer, null, function (theme) {
      var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__["serializeStyles"])([styles(theme)]);
      return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(InnerGlobal, {
        serialized: serialized,
        cache: cache
      });
    });
  }

  var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__["serializeStyles"])([styles]);
  return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(InnerGlobal, {
    serialized: serialized,
    cache: cache
  });
});

// maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag
var InnerGlobal =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(InnerGlobal, _React$Component);

  function InnerGlobal(props, context, updater) {
    return _React$Component.call(this, props, context, updater) || this;
  }

  var _proto = InnerGlobal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.sheet = new _emotion_sheet__WEBPACK_IMPORTED_MODULE_5__["StyleSheet"]({
      key: this.props.cache.key + "-global",
      nonce: this.props.cache.sheet.nonce,
      container: this.props.cache.sheet.container
    }); // $FlowFixMe

    var node = document.querySelector("style[data-emotion-" + this.props.cache.key + "=\"" + this.props.serialized.name + "\"]");

    if (node !== null) {
      this.sheet.tags.push(node);
    }

    if (this.props.cache.sheet.tags.length) {
      this.sheet.before = this.props.cache.sheet.tags[0];
    }

    this.insertStyles();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.serialized.name !== this.props.serialized.name) {
      this.insertStyles();
    }
  };

  _proto.insertStyles = function insertStyles$1() {
    if (this.props.serialized.next !== undefined) {
      // insert keyframes
      Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_3__["insertStyles"])(this.props.cache, this.props.serialized.next, true);
    }

    if (this.sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = this.sheet.tags[this.sheet.tags.length - 1].nextElementSibling;
      this.sheet.before = element;
      this.sheet.flush();
    }

    this.props.cache.insert("", this.props.serialized, this.sheet, false);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.sheet.flush();
  };

  _proto.render = function render() {

    return null;
  };

  return InnerGlobal;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

var keyframes = function keyframes() {
  var insertable = _emotion_css__WEBPACK_IMPORTED_MODULE_6__["default"].apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_3__["getRegisteredStyles"])(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = withEmotionCache(function (props, context) {
  return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(ThemeContext.Consumer, null, function (theme) {
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && "development" !== 'production') {
        throw new Error('css can only be used during render');
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__["serializeStyles"])(args, context.registered);

      {
        Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_3__["insertStyles"])(context, serialized, false);
      }

      return context.key + "-" + serialized.name;
    };

    var cx = function cx() {
      if (hasRendered && "development" !== 'production') {
        throw new Error('cx can only be used during render');
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;

    return ele;
  });
});




/***/ }),

/***/ "./node_modules/@emotion/css/dist/css.browser.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@emotion/css/dist/css.browser.esm.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js");


function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_0__["serializeStyles"])(args);
}

/* harmony default export */ __webpack_exports__["default"] = (css);


/***/ }),

/***/ "./node_modules/@emotion/hash/dist/hash.browser.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/hash.browser.esm.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ __webpack_exports__["default"] = (murmur2);


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/memoize.browser.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/memoize.browser.esm.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ __webpack_exports__["default"] = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/serialize.browser.esm.js ***!
  \***********************************************************************/
/*! exports provided: serializeStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeStyles", function() { return serializeStyles; });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/hash.browser.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/unitless.browser.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/memoize.browser.esm.js");




var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = Object(_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__["default"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if ( true && couldBeSelectorInterpolation && shouldWarnAboutInterpolatingClassNameFromCss && cached !== undefined) {
    console.error('Interpolating a className from css`` is not recommended and will cause problems with composition.\n' + 'Interpolating a className from css`` will be completely unsupported in a future major version of Emotion');
    shouldWarnAboutInterpolatingClassNameFromCss = false;
  }

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = Object(_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(styles) + identifierName;

  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};




/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/sheet.browser.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/sheet.browser.esm.js ***!
  \***************************************************************/
/*! exports provided: StyleSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheet", function() { return StyleSheet; });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
        if (true) {
          console.warn("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/stylis/dist/stylis.browser.esm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@emotion/stylis/dist/stylis.browser.esm.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

/* harmony default export */ __webpack_exports__["default"] = (stylis_min);


/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/unitless.browser.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/unitless.browser.esm.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ __webpack_exports__["default"] = (unitlessKeys);


/***/ }),

/***/ "./node_modules/@emotion/utils/dist/utils.browser.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/utils.browser.esm.js ***!
  \***************************************************************/
/*! exports provided: getRegisteredStyles, insertStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRegisteredStyles", function() { return getRegisteredStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertStyles", function() { return insertStyles; });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (weakMemoize);


/***/ }),

/***/ "./node_modules/@theia/monaco/lib/browser/textmate/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@theia/monaco/lib/browser/textmate/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./textmate-registry */ "./node_modules/@theia/monaco/lib/browser/textmate/textmate-registry.js"), exports);
__exportStar(__webpack_require__(/*! ./textmate-contribution */ "./node_modules/@theia/monaco/lib/browser/textmate/textmate-contribution.js"), exports);
__exportStar(__webpack_require__(/*! ./monaco-textmate-service */ "./node_modules/@theia/monaco/lib/browser/textmate/monaco-textmate-service.js"), exports);
__exportStar(__webpack_require__(/*! ./monaco-textmate-frontend-bindings */ "./node_modules/@theia/monaco/lib/browser/textmate/monaco-textmate-frontend-bindings.js"), exports);


/***/ }),

/***/ "./node_modules/@theia/outline-view/lib/browser/outline-view-contribution.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@theia/outline-view/lib/browser/outline-view-contribution.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineViewContribution = exports.OutlineViewCommands = exports.OUTLINE_WIDGET_FACTORY_ID = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var view_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/view-contribution */ "./node_modules/@theia/core/lib/browser/shell/view-contribution.js");
var outline_view_widget_1 = __webpack_require__(/*! ./outline-view-widget */ "./node_modules/@theia/outline-view/lib/browser/outline-view-widget.js");
var tree_1 = __webpack_require__(/*! @theia/core/lib/browser/tree */ "./node_modules/@theia/core/lib/browser/tree/index.js");
var os_1 = __webpack_require__(/*! @theia/core/lib/common/os */ "./node_modules/@theia/core/lib/common/os.js");
exports.OUTLINE_WIDGET_FACTORY_ID = 'outline-view';
/**
 * Collection of `outline-view` commands.
 */
var OutlineViewCommands;
(function (OutlineViewCommands) {
    /**
     * Command which collapses all nodes
     * from the `outline-view` tree.
     */
    OutlineViewCommands.COLLAPSE_ALL = {
        id: 'outlineView.collapse.all',
        iconClass: 'collapse-all'
    };
})(OutlineViewCommands = exports.OutlineViewCommands || (exports.OutlineViewCommands = {}));
var OutlineViewContribution = /** @class */ (function (_super) {
    __extends(OutlineViewContribution, _super);
    function OutlineViewContribution() {
        return _super.call(this, {
            widgetId: exports.OUTLINE_WIDGET_FACTORY_ID,
            widgetName: 'Outline',
            defaultWidgetOptions: {
                area: 'right',
                rank: 500
            },
            toggleCommandId: 'outlineView:toggle',
            toggleKeybinding: os_1.OS.type() !== os_1.OS.Type.Linux
                ? 'ctrlcmd+shift+i'
                : undefined
        }) || this;
    }
    OutlineViewContribution.prototype.initializeLayout = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openView()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OutlineViewContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        _super.prototype.registerCommands.call(this, commands);
        commands.registerCommand(OutlineViewCommands.COLLAPSE_ALL, {
            isEnabled: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            isVisible: function (widget) { return _this.withWidget(widget, function () { return true; }); },
            execute: function () { return _this.collapseAllItems(); }
        });
    };
    OutlineViewContribution.prototype.registerToolbarItems = function (toolbar) {
        toolbar.registerItem({
            id: OutlineViewCommands.COLLAPSE_ALL.id,
            command: OutlineViewCommands.COLLAPSE_ALL.id,
            tooltip: 'Collapse All',
            priority: 0
        });
    };
    /**
     * Collapse all nodes in the outline view tree.
     */
    OutlineViewContribution.prototype.collapseAllItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var model, root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.widget];
                    case 1:
                        model = (_a.sent()).model;
                        root = model.root;
                        if (tree_1.CompositeTreeNode.is(root)) {
                            model.collapseAll(root);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Determine if the current widget is the `outline-view`.
     */
    OutlineViewContribution.prototype.withWidget = function (widget, cb) {
        if (widget === void 0) { widget = this.tryGetWidget(); }
        if (widget instanceof outline_view_widget_1.OutlineViewWidget && widget.id === exports.OUTLINE_WIDGET_FACTORY_ID) {
            return cb(widget);
        }
        return false;
    };
    OutlineViewContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], OutlineViewContribution);
    return OutlineViewContribution;
}(view_contribution_1.AbstractViewContribution));
exports.OutlineViewContribution = OutlineViewContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/data/ino.tmLanguage.json":
/*!*********************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/data/ino.tmLanguage.json ***!
  \*********************************************************************/
/*! exports provided: information_for_contributors, version, name, scopeName, patterns, repository, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"information_for_contributors\":[\"This file has been converted from https://github.com/atom/language-c/blob/master/grammars/c.cson\",\"If you want to provide a fix or improvement, please create a pull request against the original repository.\",\"Once accepted there, we are happy to receive an update request.\"],\"version\":\"https://github.com/atom/language-c/commit/9c0c5f202741a5647025db8d5df5fefba47b036c\",\"name\":\"Ino\",\"scopeName\":\"source.ino\",\"patterns\":[{\"include\":\"#special_block\"},{\"include\":\"#strings\"},{\"match\":\"\\\\b(friend|explicit|virtual|override|final|noexcept)\\\\b\",\"name\":\"storage.modifier.cpp\"},{\"match\":\"\\\\b(private:|protected:|public:)\",\"name\":\"storage.modifier.cpp\"},{\"match\":\"\\\\b(catch|operator|try|throw|using)\\\\b\",\"name\":\"keyword.control.cpp\"},{\"match\":\"\\\\bdelete\\\\b(\\\\s*\\\\[\\\\])?|\\\\bnew\\\\b(?!])\",\"name\":\"keyword.control.cpp\"},{\"match\":\"\\\\b(f|m)[A-Z]\\\\w*\\\\b\",\"name\":\"variable.other.readwrite.member.cpp\"},{\"match\":\"\\\\bthis\\\\b\",\"name\":\"variable.language.this.cpp\"},{\"match\":\"\\\\bnullptr\\\\b\",\"name\":\"constant.language.cpp\"},{\"match\":\"\\\\btemplate\\\\b\\\\s*\",\"name\":\"storage.type.template.cpp\"},{\"match\":\"\\\\b(const_cast|dynamic_cast|reinterpret_cast|static_cast)\\\\b\\\\s*\",\"name\":\"keyword.operator.cast.cpp\"},{\"match\":\"::\",\"name\":\"punctuation.separator.namespace.access.cpp\"},{\"match\":\"\\\\b(and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eq|alignof|alignas)\\\\b\",\"name\":\"keyword.operator.cpp\"},{\"match\":\"\\\\b(class|decltype|wchar_t|char16_t|char32_t)\\\\b\",\"name\":\"storage.type.cpp\"},{\"match\":\"\\\\b(constexpr|export|mutable|typename|thread_local)\\\\b\",\"name\":\"storage.modifier.cpp\"},{\"begin\":\"(?x)\\n(?:\\n  ^ |                  # beginning of line\\n  (?:(?<!else|new|=))  # or word + space before name\\n)\\n((?:[A-Za-z_][A-Za-z0-9_]*::)*+~[A-Za-z_][A-Za-z0-9_]*) # actual name\\n\\\\s*(\\\\()              # opening bracket\",\"beginCaptures\":{\"1\":{\"name\":\"entity.name.function.cpp\"},\"2\":{\"name\":\"punctuation.definition.parameters.begin.c\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.parameters.end.c\"}},\"name\":\"meta.function.destructor.cpp\",\"patterns\":[{\"include\":\"$base\"}]},{\"begin\":\"(?x)\\n(?:\\n  ^ |                  # beginning of line\\n  (?:(?<!else|new|=))  # or word + space before name\\n)\\n((?:[A-Za-z_][A-Za-z0-9_]*::)*+~[A-Za-z_][A-Za-z0-9_]*) # actual name\\n\\\\s*(\\\\()              # opening bracket\",\"beginCaptures\":{\"1\":{\"name\":\"entity.name.function.cpp\"},\"2\":{\"name\":\"punctuation.definition.parameters.begin.c\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.parameters.end.c\"}},\"name\":\"meta.function.destructor.prototype.cpp\",\"patterns\":[{\"include\":\"$base\"}]},{\"include\":\"source.c\"},{\"include\":\"#preprocessor-rule-enabled\"},{\"include\":\"#preprocessor-rule-disabled\"},{\"include\":\"#preprocessor-rule-conditional\"},{\"include\":\"#comments\"},{\"match\":\"\\\\b(break|case|continue|default|do|else|for|goto|if|_Pragma|return|switch|while)\\\\b\",\"name\":\"keyword.control.c\"},{\"match\":\"\\\\b(loop|setup)\\\\b\",\"name\":\"support.function\"},{\"include\":\"#storage_types\"},{\"match\":\"\\\\b(const|extern|register|restrict|static|volatile|inline)\\\\b\",\"name\":\"storage.modifier.c\"},{\"match\":\"\\\\bk[A-Z]\\\\w*\\\\b\",\"name\":\"constant.other.variable.mac-classic.c\"},{\"match\":\"\\\\bg[A-Z]\\\\w*\\\\b\",\"name\":\"variable.other.readwrite.global.mac-classic.c\"},{\"match\":\"\\\\bs[A-Z]\\\\w*\\\\b\",\"name\":\"variable.other.readwrite.static.mac-classic.c\"},{\"match\":\"\\\\b(NULL|true|false|TRUE|FALSE)\\\\b\",\"name\":\"constant.language.c\"},{\"include\":\"#operators\"},{\"include\":\"#numbers\"},{\"include\":\"#strings\"},{\"begin\":\"(?x)\\n^\\\\s* ((\\\\#)\\\\s*define) \\\\s+    # define\\n((?<id>[a-zA-Z_$][\\\\w$]*))      # macro name\\n(?:\\n  (\\\\()\\n    (\\n      \\\\s* \\\\g<id> \\\\s*         # first argument\\n      ((,) \\\\s* \\\\g<id> \\\\s*)*  # additional arguments\\n      (?:\\\\.\\\\.\\\\.)?            # varargs ellipsis?\\n    )\\n  (\\\\))\\n)?\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.directive.define.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"},\"3\":{\"name\":\"entity.name.function.preprocessor.c\"},\"5\":{\"name\":\"punctuation.definition.parameters.begin.c\"},\"6\":{\"name\":\"variable.parameter.preprocessor.c\"},\"8\":{\"name\":\"punctuation.separator.parameters.c\"},\"9\":{\"name\":\"punctuation.definition.parameters.end.c\"}},\"end\":\"(?=(?://|/\\\\*))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.macro.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-define-line-contents\"}]},{\"begin\":\"^\\\\s*((#)\\\\s*(error|warning))\\\\b\",\"captures\":{\"1\":{\"name\":\"keyword.control.directive.diagnostic.$3.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?<!\\\\\\\\)(?=\\\\n)|(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"name\":\"meta.preprocessor.diagnostic.c\",\"patterns\":[{\"include\":\"#comments\"},{\"include\":\"#strings\"},{\"include\":\"#line_continuation_character\"}]},{\"begin\":\"^\\\\s*((#)\\\\s*(include(?:_next)?|import))\\\\b\\\\s*\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.directive.$3.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=(?://|/\\\\*))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.include.c\",\"patterns\":[{\"include\":\"#line_continuation_character\"},{\"begin\":\"\\\"\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.c\"}},\"end\":\"\\\"\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.c\"}},\"name\":\"string.quoted.double.include.c\"},{\"begin\":\"<\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.c\"}},\"end\":\">\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.c\"}},\"name\":\"string.quoted.other.lt-gt.include.c\"}]},{\"include\":\"#pragma-mark\"},{\"begin\":\"^\\\\s*((#)\\\\s*line)\\\\b\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.directive.line.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=(?://|/\\\\*))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#strings\"},{\"include\":\"#numbers\"},{\"include\":\"#line_continuation_character\"}]},{\"begin\":\"^\\\\s*(?:((#)\\\\s*undef))\\\\b\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.directive.undef.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=(?://|/\\\\*))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"match\":\"[a-zA-Z_$][\\\\w$]*\",\"name\":\"entity.name.function.preprocessor.c\"},{\"include\":\"#line_continuation_character\"}]},{\"begin\":\"^\\\\s*(?:((#)\\\\s*pragma))\\\\b\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.directive.pragma.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=(?://|/\\\\*))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.pragma.c\",\"patterns\":[{\"include\":\"#strings\"},{\"match\":\"[a-zA-Z_$][\\\\w\\\\-$]*\",\"name\":\"entity.other.attribute-name.pragma.preprocessor.c\"},{\"include\":\"#numbers\"},{\"include\":\"#line_continuation_character\"}]},{\"match\":\"\\\\b(u_char|u_short|u_int|u_long|ushort|uint|u_quad_t|quad_t|qaddr_t|caddr_t|daddr_t|div_t|dev_t|fixpt_t|blkcnt_t|blksize_t|gid_t|in_addr_t|in_port_t|ino_t|key_t|mode_t|nlink_t|id_t|pid_t|off_t|segsz_t|swblk_t|uid_t|id_t|clock_t|size_t|ssize_t|time_t|useconds_t|suseconds_t)\\\\b\",\"name\":\"support.type.sys-types.c\"},{\"match\":\"\\\\b(pthread_attr_t|pthread_cond_t|pthread_condattr_t|pthread_mutex_t|pthread_mutexattr_t|pthread_once_t|pthread_rwlock_t|pthread_rwlockattr_t|pthread_t|pthread_key_t)\\\\b\",\"name\":\"support.type.pthread.c\"},{\"match\":\"(?x) \\\\b\\n(int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|int_least8_t\\n|int_least16_t|int_least32_t|int_least64_t|uint_least8_t|uint_least16_t|uint_least32_t\\n|uint_least64_t|int_fast8_t|int_fast16_t|int_fast32_t|int_fast64_t|uint_fast8_t\\n|uint_fast16_t|uint_fast32_t|uint_fast64_t|intptr_t|uintptr_t|intmax_t|intmax_t\\n|uintmax_t|uintmax_t)\\n\\\\b\",\"name\":\"support.type.stdint.c\"},{\"match\":\"\\\\b(noErr|kNilOptions|kInvalidID|kVariableLengthArray)\\\\b\",\"name\":\"support.constant.mac-classic.c\"},{\"match\":\"(?x) \\\\b\\n(AbsoluteTime|Boolean|Byte|ByteCount|ByteOffset|BytePtr|CompTimeValue|ConstLogicalAddress|ConstStrFileNameParam\\n|ConstStringPtr|Duration|Fixed|FixedPtr|Float32|Float32Point|Float64|Float80|Float96|FourCharCode|Fract|FractPtr\\n|Handle|ItemCount|LogicalAddress|OptionBits|OSErr|OSStatus|OSType|OSTypePtr|PhysicalAddress|ProcessSerialNumber\\n|ProcessSerialNumberPtr|ProcHandle|Ptr|ResType|ResTypePtr|ShortFixed|ShortFixedPtr|SignedByte|SInt16|SInt32|SInt64\\n|SInt8|Size|StrFileName|StringHandle|StringPtr|TimeBase|TimeRecord|TimeScale|TimeValue|TimeValue64|UInt16|UInt32\\n|UInt64|UInt8|UniChar|UniCharCount|UniCharCountPtr|UniCharPtr|UnicodeScalarValue|UniversalProcHandle|UniversalProcPtr\\n|UnsignedFixed|UnsignedFixedPtr|UnsignedWide|UTF16Char|UTF32Char|UTF8Char)\\n\\\\b\",\"name\":\"support.type.mac-classic.c\"},{\"match\":\"\\\\b([A-Za-z0-9_]+_t)\\\\b\",\"name\":\"support.type.posix-reserved.c\"},{\"include\":\"#block\"},{\"include\":\"#parens\"},{\"begin\":\"(?x)\\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|[cr]?iterate|asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|long|short|signed|struct|typedef|union|unsigned|void)\\\\s*\\\\()\\n(?=\\n  (?:[A-Za-z_][A-Za-z0-9_]*+|::)++\\\\s*\\\\(  # actual name\\n  |\\n  (?:(?<=operator)(?:[-*&<>=+!]+|\\\\(\\\\)|\\\\[\\\\]))\\\\s*\\\\(\\n)\",\"end\":\"(?<=\\\\))(?!\\\\w)\",\"name\":\"meta.function.c\",\"patterns\":[{\"include\":\"#function-innards\"}]},{\"include\":\"#line_continuation_character\"},{\"match\":\"(\\\\[)|(\\\\])\",\"captures\":{\"1\":{\"name\":\"punctuation.definition.begin.bracket.square.c\"},\"2\":{\"name\":\"punctuation.definition.end.bracket.square.c\"}}},{\"match\":\";\",\"name\":\"punctuation.terminator.statement.c\"},{\"match\":\",\",\"name\":\"punctuation.separator.delimiter.c\"}],\"repository\":{\"access\":{\"captures\":{\"2\":{\"name\":\"punctuation.separator.dot-access.c\"},\"3\":{\"name\":\"punctuation.separator.pointer-access.c\"},\"4\":{\"name\":\"variable.other.member.c\"}},\"match\":\"((\\\\.)|(->))\\\\s*(([a-zA-Z_][a-zA-Z_0-9]*)\\\\b(?!\\\\s*\\\\())?\"},\"block\":{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.block.begin.bracket.curly.c\"}},\"end\":\"\\\\}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.block.end.bracket.curly.c\"}},\"name\":\"meta.block.cpp\",\"patterns\":[{\"begin\":\"{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.block.begin.bracket.curly.c\"}},\"end\":\"}|(?=\\\\s*#\\\\s*(?:elif|else|endif)\\\\b)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.block.end.bracket.curly.c\"}},\"name\":\"meta.block.c\",\"patterns\":[{\"include\":\"#block_innards\"}]},{\"include\":\"$base\"}]},\"block_innards\":{\"patterns\":[{\"include\":\"#preprocessor-rule-enabled-block\"},{\"include\":\"#preprocessor-rule-disabled-block\"},{\"include\":\"#preprocessor-rule-conditional-block\"},{\"include\":\"#access\"},{\"include\":\"#libc\"},{\"include\":\"#c_function_call\"},{\"captures\":{\"1\":{\"name\":\"variable.other.c\"},\"2\":{\"name\":\"punctuation.definition.parameters.c\"}},\"match\":\"(?x)\\n(?:\\n  (?:\\n    (?=\\\\s)(?<!else|new|return)\\n    (?<=\\\\w) \\\\s+  # or word + space before name\\n  )\\n)\\n(\\n  (?:[A-Za-z_][A-Za-z0-9_]*+ | :: )++   # actual name\\n  |\\n  (?:(?<=operator) (?:[-*&<>=+!]+ | \\\\(\\\\) | \\\\[\\\\]))\\n)\\n\\\\s*(\\\\() # opening bracket\",\"name\":\"meta.initialization.c\"},{\"begin\":\"{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.block.begin.bracket.curly.c\"}},\"end\":\"}|(?=\\\\s*#\\\\s*(?:elif|else|endif)\\\\b)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.block.end.bracket.curly.c\"}},\"patterns\":[{\"include\":\"#block_innards\"}]},{\"include\":\"#parens-block\"},{\"include\":\"$base\"}]},\"c_function_call\":{\"begin\":\"(?x)\\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|[cr]?iterate)\\\\s*\\\\()\\n(?=\\n(?:[A-Za-z_][A-Za-z0-9_]*+|::)++\\\\s*\\\\(  # actual name\\n|\\n(?:(?<=operator)(?:[-*&<>=+!]+|\\\\(\\\\)|\\\\[\\\\]))\\\\s*\\\\(\\n)\",\"end\":\"(?<=\\\\))(?!\\\\w)\",\"name\":\"meta.function-call.c\",\"patterns\":[{\"include\":\"#function-call-innards\"}]},\"comments\":{\"patterns\":[{\"captures\":{\"1\":{\"name\":\"meta.toc-list.banner.block.c\"}},\"match\":\"^/\\\\* =(\\\\s*.*?)\\\\s*= \\\\*/$\\\\n?\",\"name\":\"comment.block.c\"},{\"begin\":\"/\\\\*\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.begin.c\"}},\"end\":\"\\\\*/\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.end.c\"}},\"name\":\"comment.block.c\"},{\"match\":\"\\\\*/.*\\\\n\",\"name\":\"invalid.illegal.stray-comment-end.c\"},{\"captures\":{\"1\":{\"name\":\"meta.toc-list.banner.line.c\"}},\"match\":\"^// =(\\\\s*.*?)\\\\s*=\\\\s*$\\\\n?\",\"name\":\"comment.line.banner.cpp\"},{\"begin\":\"(^[ \\\\t]+)?(?=//)\",\"beginCaptures\":{\"1\":{\"name\":\"punctuation.whitespace.comment.leading.cpp\"}},\"end\":\"(?!\\\\G)\",\"patterns\":[{\"begin\":\"//\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.comment.cpp\"}},\"end\":\"(?=\\\\n)\",\"name\":\"comment.line.double-slash.cpp\",\"patterns\":[{\"include\":\"#line_continuation_character\"}]}]}]},\"disabled\":{\"begin\":\"^\\\\s*#\\\\s*if(n?def)?\\\\b.*$\",\"end\":\"^\\\\s*#\\\\s*endif\\\\b\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]},\"libc\":{\"captures\":{\"1\":{\"name\":\"punctuation.whitespace.support.function.leading.c\"},\"2\":{\"name\":\"support.function.C99.c\"}},\"match\":\"(?x) (\\\\s*) \\\\b\\n(_Exit|(?:nearbyint|nextafter|nexttoward|netoward|nan)[fl]?|a(?:cos|sin)h?[fl]?|abort|abs|asctime|assert\\n|atan(?:[h2]?[fl]?)?|atexit|ato[ifl]|atoll|bsearch|btowc|cabs[fl]?|cacos|cacos[fl]|cacosh[fl]?\\n|calloc|carg[fl]?|casinh?[fl]?|catanh?[fl]?|cbrt[fl]?|ccosh?[fl]?|ceil[fl]?|cexp[fl]?|cimag[fl]?\\n|clearerr|clock|clog[fl]?|conj[fl]?|copysign[fl]?|cosh?[fl]?|cpow[fl]?|cproj[fl]?|creal[fl]?\\n|csinh?[fl]?|csqrt[fl]?|ctanh?[fl]?|ctime|difftime|div|erfc?[fl]?|exit|fabs[fl]?\\n|exp(?:2[fl]?|[fl]|m1[fl]?)?|fclose|fdim[fl]?|fe[gs]et(?:env|exceptflag|round)|feclearexcept\\n|feholdexcept|feof|feraiseexcept|ferror|fetestexcept|feupdateenv|fflush|fgetpos|fgetw?[sc]\\n|floor[fl]?|fmax?[fl]?|fmin[fl]?|fmod[fl]?|fopen|fpclassify|fprintf|fputw?[sc]|fread|free|freopen\\n|frexp[fl]?|fscanf|fseek|fsetpos|ftell|fwide|fwprintf|fwrite|fwscanf|genv|get[sc]|getchar|gmtime\\n|gwc|gwchar|hypot[fl]?|ilogb[fl]?|imaxabs|imaxdiv|isalnum|isalpha|isblank|iscntrl|isdigit|isfinite\\n|isgraph|isgreater|isgreaterequal|isinf|isless(?:equal|greater)?|isw?lower|isnan|isnormal|isw?print\\n|isw?punct|isw?space|isunordered|isw?upper|iswalnum|iswalpha|iswblank|iswcntrl|iswctype|iswdigit|iswgraph\\n|isw?xdigit|labs|ldexp[fl]?|ldiv|lgamma[fl]?|llabs|lldiv|llrint[fl]?|llround[fl]?|localeconv|localtime\\n|log[2b]?[fl]?|log1[p0][fl]?|longjmp|lrint[fl]?|lround[fl]?|malloc|mbr?len|mbr?towc|mbsinit|mbsrtowcs\\n|mbstowcs|memchr|memcmp|memcpy|memmove|memset|mktime|modf[fl]?|perror|pow[fl]?|printf|puts|putw?c(?:har)?\\n|qsort|raise|rand|remainder[fl]?|realloc|remove|remquo[fl]?|rename|rewind|rint[fl]?|round[fl]?|scalbl?n[fl]?\\n|scanf|setbuf|setjmp|setlocale|setvbuf|signal|signbit|sinh?[fl]?|snprintf|sprintf|sqrt[fl]?|srand|sscanf\\n|strcat|strchr|strcmp|strcoll|strcpy|strcspn|strerror|strftime|strlen|strncat|strncmp|strncpy|strpbrk\\n|strrchr|strspn|strstr|strto[kdf]|strtoimax|strtol[dl]?|strtoull?|strtoumax|strxfrm|swprintf|swscanf\\n|system|tan|tan[fl]|tanh[fl]?|tgamma[fl]?|time|tmpfile|tmpnam|tolower|toupper|trunc[fl]?|ungetw?c|va_arg\\n|va_copy|va_end|va_start|vfw?printf|vfw?scanf|vprintf|vscanf|vsnprintf|vsprintf|vsscanf|vswprintf|vswscanf\\n|vwprintf|vwscanf|wcrtomb|wcscat|wcschr|wcscmp|wcscoll|wcscpy|wcscspn|wcsftime|wcslen|wcsncat|wcsncmp|wcsncpy\\n|wcspbrk|wcsrchr|wcsrtombs|wcsspn|wcsstr|wcsto[dkf]|wcstoimax|wcstol[dl]?|wcstombs|wcstoull?|wcstoumax|wcsxfrm\\n|wctom?b|wmem(?:set|chr|cpy|cmp|move)|wprintf|wscanf)\\\\b\"},\"line_continuation_character\":{\"patterns\":[{\"match\":\"(\\\\\\\\)\\\\n\",\"captures\":{\"1\":{\"name\":\"constant.character.escape.line-continuation.c\"}}}]},\"numbers\":{\"patterns\":[{\"match\":\"\\\\b((0(x|X)[0-9a-fA-F]([0-9a-fA-F']*[0-9a-fA-F])?)|(0(b|B)[01]([01']*[01])?)|(([0-9]([0-9']*[0-9])?\\\\.?[0-9]*([0-9']*[0-9])?)|(\\\\.[0-9]([0-9']*[0-9])?))((e|E)(\\\\+|-)?[0-9]([0-9']*[0-9])?)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\\\b\",\"name\":\"constant.numeric.c\"}]},\"parens\":{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.begin.bracket.round.c\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.end.bracket.round.c\"}},\"patterns\":[{\"include\":\"$base\"}]},\"parens-block\":{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.begin.bracket.round.c\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.end.bracket.round.c\"}},\"patterns\":[{\"include\":\"#block_innards\"}]},\"pragma-mark\":{\"captures\":{\"1\":{\"name\":\"meta.preprocessor.pragma.c\"},\"2\":{\"name\":\"keyword.control.directive.pragma.pragma-mark.c\"},\"3\":{\"name\":\"punctuation.definition.directive.c\"},\"4\":{\"name\":\"entity.name.tag.pragma-mark.c\"}},\"match\":\"^\\\\s*(((#)\\\\s*pragma\\\\s+mark)\\\\s+(.*))\",\"name\":\"meta.section\"},\"operators\":{\"patterns\":[{\"match\":\"(?<![\\\\w$])(sizeof)(?![\\\\w$])\",\"name\":\"keyword.operator.sizeof.c\"},{\"match\":\"--\",\"name\":\"keyword.operator.decrement.c\"},{\"match\":\"\\\\+\\\\+\",\"name\":\"keyword.operator.increment.c\"},{\"match\":\"%=|\\\\+=|-=|\\\\*=|(?<!\\\\()/=\",\"name\":\"keyword.operator.assignment.compound.c\"},{\"match\":\"&=|\\\\^=|<<=|>>=|\\\\|=\",\"name\":\"keyword.operator.assignment.compound.bitwise.c\"},{\"match\":\"<<|>>\",\"name\":\"keyword.operator.bitwise.shift.c\"},{\"match\":\"!=|<=|>=|==|<|>\",\"name\":\"keyword.operator.comparison.c\"},{\"match\":\"&&|!|\\\\|\\\\|\",\"name\":\"keyword.operator.logical.c\"},{\"match\":\"&|\\\\||\\\\^|~\",\"name\":\"keyword.operator.c\"},{\"match\":\"=\",\"name\":\"keyword.operator.assignment.c\"},{\"match\":\"%|\\\\*|/|-|\\\\+\",\"name\":\"keyword.operator.c\"},{\"begin\":\"\\\\?\",\"beginCaptures\":{\"0\":{\"name\":\"keyword.operator.ternary.c\"}},\"end\":\":\",\"applyEndPatternLast\":true,\"endCaptures\":{\"0\":{\"name\":\"keyword.operator.ternary.c\"}},\"patterns\":[{\"include\":\"#access\"},{\"include\":\"#libc\"},{\"include\":\"#c_function_call\"},{\"include\":\"$base\"}]}]},\"strings\":{\"patterns\":[{\"begin\":\"\\\"\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.c\"}},\"end\":\"\\\"\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.c\"}},\"name\":\"string.quoted.double.c\",\"patterns\":[{\"include\":\"#string_escaped_char\"},{\"include\":\"#string_placeholder\"},{\"include\":\"#line_continuation_character\"}]},{\"begin\":\"'\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.c\"}},\"end\":\"'\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.c\"}},\"name\":\"string.quoted.single.c\",\"patterns\":[{\"include\":\"#string_escaped_char\"},{\"include\":\"#line_continuation_character\"}]},{\"begin\":\"(u|u8|U|L)?\\\"\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.cpp\"},\"1\":{\"name\":\"meta.encoding.cpp\"}},\"end\":\"\\\"\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.cpp\"}},\"name\":\"string.quoted.double.cpp\",\"patterns\":[{\"match\":\"\\\\\\\\u\\\\h{4}|\\\\\\\\U\\\\h{8}\",\"name\":\"constant.character.escape.cpp\"},{\"match\":\"\\\\\\\\['\\\"?\\\\\\\\abfnrtv]\",\"name\":\"constant.character.escape.cpp\"},{\"match\":\"\\\\\\\\[0-7]{1,3}\",\"name\":\"constant.character.escape.cpp\"},{\"match\":\"\\\\\\\\x\\\\h+\",\"name\":\"constant.character.escape.cpp\"},{\"include\":\"source.c#string_placeholder\"}]},{\"begin\":\"(u|u8|U|L)?R\\\"(?:([^ ()\\\\\\\\\\\\t]{0,16})|([^ ()\\\\\\\\\\\\t]*))\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.cpp\"},\"1\":{\"name\":\"meta.encoding.cpp\"},\"3\":{\"name\":\"invalid.illegal.delimiter-too-long.cpp\"}},\"end\":\"\\\\)\\\\2(\\\\3)\\\"\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.cpp\"},\"1\":{\"name\":\"invalid.illegal.delimiter-too-long.cpp\"}},\"name\":\"string.quoted.double.raw.cpp\"}]},\"string_escaped_char\":{\"patterns\":[{\"match\":\"(?x)\\\\\\\\ (\\n\\\\\\\\             |\\n[abefnprtv'\\\"?]   |\\n[0-3]\\\\d{,2}     |\\n[4-7]\\\\d?        |\\nx[a-fA-F0-9]{,2} |\\nu[a-fA-F0-9]{,4} |\\nU[a-fA-F0-9]{,8} )\",\"name\":\"constant.character.escape.c\"},{\"match\":\"\\\\\\\\.\",\"name\":\"invalid.illegal.unknown-escape.c\"}]},\"string_placeholder\":{\"patterns\":[{\"match\":\"(?x) %\\n(\\\\d+\\\\$)?                           # field (argument #)\\n[#0\\\\- +']*                          # flags\\n[,;:_]?                              # separator character (AltiVec)\\n((-?\\\\d+)|\\\\*(-?\\\\d+\\\\$)?)?          # minimum field width\\n(\\\\.((-?\\\\d+)|\\\\*(-?\\\\d+\\\\$)?)?)?    # precision\\n(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)? # length modifier\\n[diouxXDOUeEfFgGaACcSspn%]           # conversion type\",\"name\":\"constant.other.placeholder.c\"},{\"match\":\"(%)(?!\\\"\\\\s*(PRI|SCN))\",\"captures\":{\"1\":{\"name\":\"invalid.illegal.placeholder.c\"}}}]},\"storage_types\":{\"patterns\":[{\"match\":\"\\\\b(asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|long|short|signed|struct|typedef|union|unsigned|void)\\\\b\",\"name\":\"storage.type.c\"}]},\"vararg_ellipses\":{\"match\":\"(?<!\\\\.)\\\\.\\\\.\\\\.(?!\\\\.)\",\"name\":\"punctuation.vararg-ellipses.c\"},\"preprocessor-rule-conditional\":{\"patterns\":[{\"begin\":\"^\\\\s*((#)\\\\s*if(?:n?def)?\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"^\\\\s*((#)\\\\s*endif\\\\b)\",\"endCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#preprocessor-rule-enabled-elif\"},{\"include\":\"#preprocessor-rule-enabled-else\"},{\"include\":\"#preprocessor-rule-disabled-elif\"},{\"begin\":\"^\\\\s*((#)\\\\s*elif\\\\b)\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"$base\"}]},{\"match\":\"^\\\\s*#\\\\s*(else|elif|endif)\\\\b\",\"captures\":{\"0\":{\"name\":\"invalid.illegal.stray-$1.c\"}}}]},\"preprocessor-rule-conditional-block\":{\"patterns\":[{\"begin\":\"^\\\\s*((#)\\\\s*if(?:n?def)?\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"^\\\\s*((#)\\\\s*endif\\\\b)\",\"endCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#preprocessor-rule-enabled-elif-block\"},{\"include\":\"#preprocessor-rule-enabled-else-block\"},{\"include\":\"#preprocessor-rule-disabled-elif\"},{\"begin\":\"^\\\\s*((#)\\\\s*elif\\\\b)\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#block_innards\"}]},{\"match\":\"^\\\\s*#\\\\s*(else|elif|endif)\\\\b\",\"captures\":{\"0\":{\"name\":\"invalid.illegal.stray-$1.c\"}}}]},\"preprocessor-rule-conditional-line\":{\"patterns\":[{\"match\":\"(?:\\\\bdefined\\\\b\\\\s*$)|(?:\\\\bdefined\\\\b(?=\\\\s*\\\\(*\\\\s*(?:(?!defined\\\\b)[a-zA-Z_$][\\\\w$]*\\\\b)\\\\s*\\\\)*\\\\s*(?:\\\\n|//|/\\\\*|\\\\?|\\\\:|&&|\\\\|\\\\||\\\\\\\\\\\\s*\\\\n)))\",\"name\":\"keyword.control.directive.conditional.c\"},{\"match\":\"\\\\bdefined\\\\b\",\"name\":\"invalid.illegal.macro-name.c\"},{\"include\":\"#comments\"},{\"include\":\"#strings\"},{\"include\":\"#numbers\"},{\"begin\":\"\\\\?\",\"beginCaptures\":{\"0\":{\"name\":\"keyword.operator.ternary.c\"}},\"end\":\":\",\"endCaptures\":{\"0\":{\"name\":\"keyword.operator.ternary.c\"}},\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#operators\"},{\"match\":\"\\\\b(NULL|true|false|TRUE|FALSE)\\\\b\",\"name\":\"constant.language.c\"},{\"match\":\"[a-zA-Z_$][\\\\w$]*\",\"name\":\"entity.name.function.preprocessor.c\"},{\"include\":\"#line_continuation_character\"},{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.begin.bracket.round.c\"}},\"end\":\"\\\\)|(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?<!\\\\\\\\)(?=\\\\n)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.end.bracket.round.c\"}},\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]}]},\"preprocessor-rule-disabled\":{\"patterns\":[{\"begin\":\"^\\\\s*((#)\\\\s*if\\\\b)(?=\\\\s*\\\\(*\\\\b0+\\\\b\\\\)*\\\\s*(?:$|//|/\\\\*))\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"^\\\\s*((#)\\\\s*endif\\\\b)\",\"endCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#comments\"},{\"include\":\"#preprocessor-rule-enabled-elif\"},{\"include\":\"#preprocessor-rule-enabled-else\"},{\"include\":\"#preprocessor-rule-disabled-elif\"},{\"begin\":\"^\\\\s*((#)\\\\s*elif\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*(?:elif|else|endif)\\\\b))\",\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"$base\"}]},{\"begin\":\"\\\\n\",\"end\":\"(?=^\\\\s*((#)\\\\s*(?:else|elif|endif)\\\\b))\",\"contentName\":\"comment.block.preprocessor.if-branch.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]}]}]},\"preprocessor-rule-disabled-block\":{\"patterns\":[{\"begin\":\"^\\\\s*((#)\\\\s*if\\\\b)(?=\\\\s*\\\\(*\\\\b0+\\\\b\\\\)*\\\\s*(?:$|//|/\\\\*))\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"^\\\\s*((#)\\\\s*endif\\\\b)\",\"endCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#comments\"},{\"include\":\"#preprocessor-rule-enabled-elif-block\"},{\"include\":\"#preprocessor-rule-enabled-else-block\"},{\"include\":\"#preprocessor-rule-disabled-elif\"},{\"begin\":\"^\\\\s*((#)\\\\s*elif\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*(?:elif|else|endif)\\\\b))\",\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#block_innards\"}]},{\"begin\":\"\\\\n\",\"end\":\"(?=^\\\\s*((#)\\\\s*(?:else|elif|endif)\\\\b))\",\"contentName\":\"comment.block.preprocessor.if-branch.in-block.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]}]}]},\"preprocessor-rule-disabled-elif\":{\"begin\":\"^\\\\s*((#)\\\\s*elif\\\\b)(?=\\\\s*\\\\(*\\\\b0+\\\\b\\\\)*\\\\s*(?:$|//|/\\\\*))\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*(?:elif|else|endif)\\\\b))\",\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#comments\"},{\"begin\":\"\\\\n\",\"end\":\"(?=^\\\\s*((#)\\\\s*(?:else|elif|endif)\\\\b))\",\"contentName\":\"comment.block.preprocessor.elif-branch.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]}]},\"preprocessor-rule-enabled\":{\"patterns\":[{\"begin\":\"^\\\\s*((#)\\\\s*if\\\\b)(?=\\\\s*\\\\(*\\\\b0*1\\\\b\\\\)*\\\\s*(?:$|//|/\\\\*))\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"},\"3\":{\"name\":\"constant.numeric.preprocessor.c\"}},\"end\":\"^\\\\s*((#)\\\\s*endif\\\\b)\",\"endCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#comments\"},{\"begin\":\"^\\\\s*((#)\\\\s*else\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*endif\\\\b))\",\"contentName\":\"comment.block.preprocessor.else-branch.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]},{\"begin\":\"^\\\\s*((#)\\\\s*elif\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*(?:else|elif|endif)\\\\b))\",\"contentName\":\"comment.block.preprocessor.if-branch.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]},{\"begin\":\"\\\\n\",\"end\":\"(?=^\\\\s*((#)\\\\s*(?:else|elif|endif)\\\\b))\",\"patterns\":[{\"include\":\"$base\"}]}]}]},\"preprocessor-rule-enabled-block\":{\"patterns\":[{\"begin\":\"^\\\\s*((#)\\\\s*if\\\\b)(?=\\\\s*\\\\(*\\\\b0*1\\\\b\\\\)*\\\\s*(?:$|//|/\\\\*))\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"^\\\\s*((#)\\\\s*endif\\\\b)\",\"endCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#comments\"},{\"begin\":\"^\\\\s*((#)\\\\s*else\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*endif\\\\b))\",\"contentName\":\"comment.block.preprocessor.else-branch.in-block.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]},{\"begin\":\"^\\\\s*((#)\\\\s*elif\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*(?:else|elif|endif)\\\\b))\",\"contentName\":\"comment.block.preprocessor.if-branch.in-block.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]},{\"begin\":\"\\\\n\",\"end\":\"(?=^\\\\s*((#)\\\\s*(?:else|elif|endif)\\\\b))\",\"patterns\":[{\"include\":\"#block_innards\"}]}]}]},\"preprocessor-rule-enabled-elif\":{\"begin\":\"^\\\\s*((#)\\\\s*elif\\\\b)(?=\\\\s*\\\\(*\\\\b0*1\\\\b\\\\)*\\\\s*(?:$|//|/\\\\*))\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*endif\\\\b))\",\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#comments\"},{\"begin\":\"\\\\n\",\"end\":\"(?=^\\\\s*((#)\\\\s*(?:endif)\\\\b))\",\"patterns\":[{\"begin\":\"^\\\\s*((#)\\\\s*(else)\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*endif\\\\b))\",\"contentName\":\"comment.block.preprocessor.elif-branch.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]},{\"begin\":\"^\\\\s*((#)\\\\s*(elif)\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*(?:else|elif|endif)\\\\b))\",\"contentName\":\"comment.block.preprocessor.elif-branch.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]},{\"include\":\"$base\"}]}]},\"preprocessor-rule-enabled-elif-block\":{\"begin\":\"^\\\\s*((#)\\\\s*elif\\\\b)(?=\\\\s*\\\\(*\\\\b0*1\\\\b\\\\)*\\\\s*(?:$|//|/\\\\*))\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*endif\\\\b))\",\"patterns\":[{\"begin\":\"\\\\G(?=.)(?!//|/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))\",\"end\":\"(?=//)|(?=/\\\\*(?!.*\\\\\\\\\\\\s*\\\\n))|(?<!\\\\\\\\)(?=\\\\n)\",\"name\":\"meta.preprocessor.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-conditional-line\"}]},{\"include\":\"#comments\"},{\"begin\":\"\\\\n\",\"end\":\"(?=^\\\\s*((#)\\\\s*(?:endif)\\\\b))\",\"patterns\":[{\"begin\":\"^\\\\s*((#)\\\\s*(else)\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*endif\\\\b))\",\"contentName\":\"comment.block.preprocessor.elif-branch.in-block.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]},{\"begin\":\"^\\\\s*((#)\\\\s*(elif)\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*(?:else|elif|endif)\\\\b))\",\"contentName\":\"comment.block.preprocessor.elif-branch.c\",\"patterns\":[{\"include\":\"#disabled\"},{\"include\":\"#pragma-mark\"}]},{\"include\":\"#block_innards\"}]}]},\"preprocessor-rule-enabled-else\":{\"begin\":\"^\\\\s*((#)\\\\s*else\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*endif\\\\b))\",\"patterns\":[{\"include\":\"$base\"}]},\"preprocessor-rule-enabled-else-block\":{\"begin\":\"^\\\\s*((#)\\\\s*else\\\\b)\",\"beginCaptures\":{\"0\":{\"name\":\"meta.preprocessor.c\"},\"1\":{\"name\":\"keyword.control.directive.conditional.c\"},\"2\":{\"name\":\"punctuation.definition.directive.c\"}},\"end\":\"(?=^\\\\s*((#)\\\\s*endif\\\\b))\",\"patterns\":[{\"include\":\"#block_innards\"}]},\"preprocessor-rule-define-line-contents\":{\"patterns\":[{\"include\":\"#vararg_ellipses\"},{\"begin\":\"{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.block.begin.bracket.curly.c\"}},\"end\":\"}|(?=\\\\s*#\\\\s*(?:elif|else|endif)\\\\b)|(?<!\\\\\\\\)(?=\\\\s*\\\\n)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.block.end.bracket.curly.c\"}},\"name\":\"meta.block.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-define-line-blocks\"}]},{\"match\":\"\\\\(\",\"name\":\"punctuation.section.parens.begin.bracket.round.c\"},{\"match\":\"\\\\)\",\"name\":\"punctuation.section.parens.end.bracket.round.c\"},{\"begin\":\"(?x)\\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|[cr]?iterate|asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|long|short|signed|struct|typedef|union|unsigned|void)\\\\s*\\\\()\\n(?=\\n  (?:[A-Za-z_][A-Za-z0-9_]*+|::)++\\\\s*\\\\(  # actual name\\n  |\\n  (?:(?<=operator)(?:[-*&<>=+!]+|\\\\(\\\\)|\\\\[\\\\]))\\\\s*\\\\(\\n)\",\"end\":\"(?<=\\\\))(?!\\\\w)|(?<!\\\\\\\\)(?=\\\\s*\\\\n)\",\"name\":\"meta.function.c\",\"patterns\":[{\"include\":\"#preprocessor-rule-define-line-functions\"}]},{\"begin\":\"\\\"\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.c\"}},\"end\":\"\\\"|(?<!\\\\\\\\)(?=\\\\s*\\\\n)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.c\"}},\"name\":\"string.quoted.double.c\",\"patterns\":[{\"include\":\"#string_escaped_char\"},{\"include\":\"#string_placeholder\"},{\"include\":\"#line_continuation_character\"}]},{\"begin\":\"'\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.begin.c\"}},\"end\":\"'|(?<!\\\\\\\\)(?=\\\\s*\\\\n)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.string.end.c\"}},\"name\":\"string.quoted.single.c\",\"patterns\":[{\"include\":\"#string_escaped_char\"},{\"include\":\"#line_continuation_character\"}]},{\"include\":\"#access\"},{\"include\":\"#libc\"},{\"include\":\"$base\"}]},\"preprocessor-rule-define-line-blocks\":{\"patterns\":[{\"begin\":\"{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.block.begin.bracket.curly.c\"}},\"end\":\"}|(?=\\\\s*#\\\\s*(?:elif|else|endif)\\\\b)|(?<!\\\\\\\\)(?=\\\\s*\\\\n)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.block.end.bracket.curly.c\"}},\"patterns\":[{\"include\":\"#preprocessor-rule-define-line-blocks\"},{\"include\":\"#preprocessor-rule-define-line-contents\"}]},{\"include\":\"#preprocessor-rule-define-line-contents\"}]},\"preprocessor-rule-define-line-functions\":{\"patterns\":[{\"include\":\"#comments\"},{\"include\":\"#storage_types\"},{\"include\":\"#vararg_ellipses\"},{\"include\":\"#access\"},{\"include\":\"#operators\"},{\"begin\":\"(?x)\\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|[cr]?iterate)\\\\s*\\\\()\\n(\\n(?:[A-Za-z_][A-Za-z0-9_]*+|::)++  # actual name\\n|\\n(?:(?<=operator)(?:[-*&<>=+!]+|\\\\(\\\\)|\\\\[\\\\]))\\n)\\n\\\\s*(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"entity.name.function.c\"},\"2\":{\"name\":\"punctuation.section.arguments.begin.bracket.round.c\"}},\"end\":\"(\\\\))|(?<!\\\\\\\\)(?=\\\\s*\\\\n)\",\"endCaptures\":{\"1\":{\"name\":\"punctuation.section.arguments.end.bracket.round.c\"}},\"patterns\":[{\"include\":\"#preprocessor-rule-define-line-functions\"}]},{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.begin.bracket.round.c\"}},\"end\":\"(\\\\))|(?<!\\\\\\\\)(?=\\\\s*\\\\n)\",\"endCaptures\":{\"1\":{\"name\":\"punctuation.section.parens.end.bracket.round.c\"}},\"patterns\":[{\"include\":\"#preprocessor-rule-define-line-functions\"}]},{\"include\":\"#preprocessor-rule-define-line-contents\"}]},\"function-innards\":{\"patterns\":[{\"include\":\"#comments\"},{\"include\":\"#storage_types\"},{\"include\":\"#operators\"},{\"include\":\"#vararg_ellipses\"},{\"begin\":\"(?x)\\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|[cr]?iterate)\\\\s*\\\\()\\n(\\n(?:[A-Za-z_][A-Za-z0-9_]*+|::)++  # actual name\\n|\\n(?:(?<=operator)(?:[-*&<>=+!]+|\\\\(\\\\)|\\\\[\\\\]))\\n)\\n\\\\s*(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"entity.name.function.c\"},\"2\":{\"name\":\"punctuation.section.parameters.begin.bracket.round.c\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.parameters.end.bracket.round.c\"}},\"patterns\":[{\"include\":\"#function-innards\"}]},{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.begin.bracket.round.c\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.end.bracket.round.c\"}},\"patterns\":[{\"include\":\"#function-innards\"}]},{\"include\":\"$base\"}]},\"function-call-innards\":{\"patterns\":[{\"include\":\"#comments\"},{\"include\":\"#storage_types\"},{\"include\":\"#access\"},{\"include\":\"#operators\"},{\"begin\":\"(?x)\\n(?!(?:while|for|do|if|else|switch|catch|enumerate|return|typeid|alignof|alignas|sizeof|[cr]?iterate)\\\\s*\\\\()\\n(\\n(?:[A-Za-z_][A-Za-z0-9_]*+|::)++  # actual name\\n|\\n(?:(?<=operator)(?:[-*&<>=+!]+|\\\\(\\\\)|\\\\[\\\\]))\\n)\\n\\\\s*(\\\\()\",\"beginCaptures\":{\"1\":{\"name\":\"entity.name.function.c\"},\"2\":{\"name\":\"punctuation.section.arguments.begin.bracket.round.c\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.arguments.end.bracket.round.c\"}},\"patterns\":[{\"include\":\"#function-call-innards\"}]},{\"begin\":\"\\\\(\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.begin.bracket.round.c\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.parens.end.bracket.round.c\"}},\"patterns\":[{\"include\":\"#function-call-innards\"}]},{\"include\":\"#block_innards\"}]},\"angle_brackets\":{\"begin\":\"<\",\"end\":\">\",\"name\":\"meta.angle-brackets.cpp\",\"patterns\":[{\"include\":\"#angle_brackets\"},{\"include\":\"$base\"}]},\"constructor\":{\"patterns\":[{\"begin\":\"(?x)\\n(?:^\\\\s*)  # beginning of line\\n((?!while|for|do|if|else|switch|catch|enumerate|r?iterate)[A-Za-z_][A-Za-z0-9_:]*) # actual name\\n\\\\s*(\\\\()  # opening bracket\",\"beginCaptures\":{\"1\":{\"name\":\"entity.name.function.cpp\"},\"2\":{\"name\":\"punctuation.definition.parameters.begin.c\"}},\"end\":\"\\\\)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.parameters.end.c\"}},\"name\":\"meta.function.constructor.cpp\",\"patterns\":[{\"include\":\"$base\"}]},{\"begin\":\"(?x)\\n(:)\\n(\\n  (?=\\n    \\\\s*[A-Za-z_][A-Za-z0-9_:]* # actual name\\n    \\\\s* (\\\\() # opening bracket\\n  )\\n)\",\"beginCaptures\":{\"1\":{\"name\":\"punctuation.definition.parameters.c\"}},\"end\":\"(?=\\\\{)\",\"name\":\"meta.function.constructor.initializer-list.cpp\",\"patterns\":[{\"include\":\"$base\"}]}]},\"special_block\":{\"patterns\":[{\"begin\":\"\\\\b(using)\\\\b\\\\s*(namespace)\\\\b\\\\s*((?:[_A-Za-z][_A-Za-z0-9]*\\\\b(::)?)*)\",\"beginCaptures\":{\"1\":{\"name\":\"keyword.control.cpp\"},\"2\":{\"name\":\"storage.type.cpp\"},\"3\":{\"name\":\"entity.name.type.cpp\"}},\"end\":\"(;)\",\"name\":\"meta.using-namespace-declaration.cpp\"},{\"begin\":\"\\\\b(namespace)\\\\b\\\\s*([_A-Za-z][_A-Za-z0-9]*\\\\b)?+\",\"beginCaptures\":{\"1\":{\"name\":\"storage.type.cpp\"},\"2\":{\"name\":\"entity.name.type.cpp\"}},\"captures\":{\"1\":{\"name\":\"keyword.control.namespace.$2\"}},\"end\":\"(?<=\\\\})|(?=(;|,|\\\\(|\\\\)|>|\\\\[|\\\\]|=))\",\"name\":\"meta.namespace-block.cpp\",\"patterns\":[{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.definition.scope.cpp\"}},\"end\":\"\\\\}\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.definition.scope.cpp\"}},\"patterns\":[{\"include\":\"#special_block\"},{\"include\":\"#constructor\"},{\"include\":\"$base\"}]},{\"include\":\"$base\"}]},{\"begin\":\"\\\\b(class|struct)\\\\b\\\\s*([_A-Za-z][_A-Za-z0-9]*\\\\b)?+(\\\\s*:\\\\s*(public|protected|private)\\\\s*([_A-Za-z][_A-Za-z0-9]*\\\\b)((\\\\s*,\\\\s*(public|protected|private)\\\\s*[_A-Za-z][_A-Za-z0-9]*\\\\b)*))?\",\"beginCaptures\":{\"1\":{\"name\":\"storage.type.cpp\"},\"2\":{\"name\":\"entity.name.type.cpp\"},\"4\":{\"name\":\"storage.type.modifier.cpp\"},\"5\":{\"name\":\"entity.name.type.inherited.cpp\"},\"6\":{\"patterns\":[{\"match\":\"(public|protected|private)\",\"name\":\"storage.type.modifier.cpp\"},{\"match\":\"[_A-Za-z][_A-Za-z0-9]*\",\"name\":\"entity.name.type.inherited.cpp\"}]}},\"end\":\"(?<=\\\\})|(?=(;|\\\\(|\\\\)|>|\\\\[|\\\\]|=))\",\"name\":\"meta.class-struct-block.cpp\",\"patterns\":[{\"include\":\"#angle_brackets\"},{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.block.begin.bracket.curly.cpp\"}},\"end\":\"(\\\\})(\\\\s*\\\\n)?\",\"endCaptures\":{\"1\":{\"name\":\"punctuation.section.block.end.bracket.curly.cpp\"},\"2\":{\"name\":\"invalid.illegal.you-forgot-semicolon.cpp\"}},\"patterns\":[{\"include\":\"#special_block\"},{\"include\":\"#constructor\"},{\"include\":\"$base\"}]},{\"include\":\"$base\"}]},{\"begin\":\"\\\\b(extern)(?=\\\\s*\\\")\",\"beginCaptures\":{\"1\":{\"name\":\"storage.modifier.cpp\"}},\"end\":\"(?<=\\\\})|(?=\\\\w)|(?=\\\\s*#\\\\s*endif\\\\b)\",\"name\":\"meta.extern-block.cpp\",\"patterns\":[{\"begin\":\"\\\\{\",\"beginCaptures\":{\"0\":{\"name\":\"punctuation.section.block.begin.bracket.curly.c\"}},\"end\":\"\\\\}|(?=\\\\s*#\\\\s*endif\\\\b)\",\"endCaptures\":{\"0\":{\"name\":\"punctuation.section.block.end.bracket.curly.c\"}},\"patterns\":[{\"include\":\"#special_block\"},{\"include\":\"$base\"}]},{\"include\":\"$base\"}]}]}}}");

/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/arduino-commands.js":
/*!****************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/arduino-commands.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ArduinoCommands = void 0;
/**
 * @deprecated all these commands should go under contributions and have their command, menu, keybinding, and toolbar contributions.
 */
var ArduinoCommands;
(function (ArduinoCommands) {
    ArduinoCommands.TOGGLE_COMPILE_FOR_DEBUG = {
        id: 'arduino-toggle-compile-for-debug'
    };
    /**
     * Unlike `OPEN_SKETCH`, it opens all files from a sketch folder. (ino, cpp, etc...)
     */
    ArduinoCommands.OPEN_SKETCH_FILES = {
        id: 'arduino-open-sketch-files'
    };
    ArduinoCommands.OPEN_BOARDS_DIALOG = {
        id: 'arduino-open-boards-dialog'
    };
    ArduinoCommands.TOGGLE_ADVANCED_MODE = {
        id: 'arduino-toggle-advanced-mode'
    };
    ArduinoCommands.TOGGLE_ADVANCED_MODE_TOOLBAR = {
        id: 'arduino-toggle-advanced-mode-toolbar'
    };
})(ArduinoCommands = exports.ArduinoCommands || (exports.ArduinoCommands = {}));


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/arduino-frontend-contribution.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/arduino-frontend-contribution.js ***!
  \*****************************************************************************************/
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
exports.ArduinoFrontendContribution = void 0;
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var common_frontend_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/common-frontend-contribution */ "./node_modules/@theia/core/lib/browser/common-frontend-contribution.js");
var command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "./node_modules/@theia/core/lib/common/command.js");
var message_service_1 = __webpack_require__(/*! @theia/core/lib/common/message-service */ "./node_modules/@theia/core/lib/common/message-service.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var browser_2 = __webpack_require__(/*! @theia/editor/lib/browser */ "./node_modules/@theia/editor/lib/browser/index.js");
var file_dialog_1 = __webpack_require__(/*! @theia/filesystem/lib/browser/file-dialog */ "./node_modules/@theia/filesystem/lib/browser/file-dialog/index.js");
var common_1 = __webpack_require__(/*! @theia/filesystem/lib/common */ "./node_modules/@theia/filesystem/lib/common/index.js");
var problem_contribution_1 = __webpack_require__(/*! @theia/markers/lib/browser/problem/problem-contribution */ "./node_modules/@theia/markers/lib/browser/problem/problem-contribution.js");
var monaco_menu_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-menu */ "./node_modules/@theia/monaco/lib/browser/monaco-menu.js");
var navigator_contribution_1 = __webpack_require__(/*! @theia/navigator/lib/browser/navigator-contribution */ "./node_modules/@theia/navigator/lib/browser/navigator-contribution.js");
var outline_view_contribution_1 = __webpack_require__(/*! @theia/outline-view/lib/browser/outline-view-contribution */ "./node_modules/@theia/outline-view/lib/browser/outline-view-contribution.js");
var output_contribution_1 = __webpack_require__(/*! @theia/output/lib/browser/output-contribution */ "./node_modules/@theia/output/lib/browser/output-contribution.js");
var scm_contribution_1 = __webpack_require__(/*! @theia/scm/lib/browser/scm-contribution */ "./node_modules/@theia/scm/lib/browser/scm-contribution.js");
var search_in_workspace_frontend_contribution_1 = __webpack_require__(/*! @theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution */ "./node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution.js");
var terminal_frontend_contribution_1 = __webpack_require__(/*! @theia/terminal/lib/browser/terminal-frontend-contribution */ "./node_modules/@theia/terminal/lib/browser/terminal-frontend-contribution.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var main_menu_manager_1 = __webpack_require__(/*! ../common/main-menu-manager */ "./node_modules/arduino-ide-extension/lib/common/main-menu-manager.js");
var protocol_1 = __webpack_require__(/*! ../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
var arduino_daemon_1 = __webpack_require__(/*! ../common/protocol/arduino-daemon */ "./node_modules/arduino-ide-extension/lib/common/protocol/arduino-daemon.js");
var config_service_1 = __webpack_require__(/*! ../common/protocol/config-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/config-service.js");
var filesystem_ext_1 = __webpack_require__(/*! ../common/protocol/filesystem-ext */ "./node_modules/arduino-ide-extension/lib/common/protocol/filesystem-ext.js");
var arduino_commands_1 = __webpack_require__(/*! ./arduino-commands */ "./node_modules/arduino-ide-extension/lib/browser/arduino-commands.js");
var boards_config_dialog_1 = __webpack_require__(/*! ./boards/boards-config-dialog */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config-dialog.js");
var boards_data_store_1 = __webpack_require__(/*! ./boards/boards-data-store */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-data-store.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ./boards/boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var boards_toolbar_item_1 = __webpack_require__(/*! ./boards/boards-toolbar-item */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-toolbar-item.js");
var editor_mode_1 = __webpack_require__(/*! ./editor-mode */ "./node_modules/arduino-ide-extension/lib/browser/editor-mode.js");
var arduino_menus_1 = __webpack_require__(/*! ./menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var monitor_connection_1 = __webpack_require__(/*! ./monitor/monitor-connection */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-connection.js");
var monitor_view_contribution_1 = __webpack_require__(/*! ./monitor/monitor-view-contribution */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-view-contribution.js");
var workspace_service_1 = __webpack_require__(/*! ./theia/workspace/workspace-service */ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-service.js");
var arduino_toolbar_1 = __webpack_require__(/*! ./toolbar/arduino-toolbar */ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar.js");
var ArduinoFrontendContribution = /** @class */ (function () {
    function ArduinoFrontendContribution() {
    }
    ArduinoFrontendContribution.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var updateStatusBar;
            var _this = this;
            return __generator(this, function (_a) {
                if (!window.navigator.onLine) {
                    // tslint:disable-next-line:max-line-length
                    this.messageService.warn('You appear to be offline. Without an Internet connection, the Arduino CLI might not be able to download the required resources and could cause malfunction. Please connect to the Internet and restart the application.');
                }
                updateStatusBar = function (_a) {
                    var selectedBoard = _a.selectedBoard, selectedPort = _a.selectedPort;
                    _this.statusBar.setElement('arduino-selected-board', {
                        alignment: browser_1.StatusBarAlignment.RIGHT,
                        text: selectedBoard ? "$(microchip) " + selectedBoard.name : '$(close) no board selected',
                        className: 'arduino-selected-board'
                    });
                    if (selectedBoard) {
                        _this.statusBar.setElement('arduino-selected-port', {
                            alignment: browser_1.StatusBarAlignment.RIGHT,
                            text: selectedPort ? "on " + protocol_1.Port.toString(selectedPort) : '[not connected]',
                            className: 'arduino-selected-port'
                        });
                    }
                };
                this.boardsServiceClientImpl.onBoardsConfigChanged(updateStatusBar);
                updateStatusBar(this.boardsServiceClientImpl.boardsConfig);
                return [2 /*return*/];
            });
        });
    };
    ArduinoFrontendContribution.prototype.onStart = function (app) {
        var e_1, _a;
        try {
            // Initialize all `pro-mode` widgets. This is a NOOP if in normal mode.
            for (var _b = __values([
                this.fileNavigatorContributions,
                this.outputContribution,
                this.outlineContribution,
                this.problemContribution,
                this.scmContribution,
                this.siwContribution
            ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var viewContribution = _c.value;
                if (viewContribution.initializeLayout) {
                    viewContribution.initializeLayout(app);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ArduinoFrontendContribution.prototype.registerToolbarItems = function (registry) {
        var _this = this;
        registry.registerItem({
            id: boards_toolbar_item_1.BoardsToolBarItem.TOOLBAR_ID,
            render: function () { return React.createElement(boards_toolbar_item_1.BoardsToolBarItem, { key: 'boardsToolbarItem', commands: _this.commandRegistry, boardsServiceClient: _this.boardsServiceClientImpl }); },
            isVisible: function (widget) { return arduino_toolbar_1.ArduinoToolbar.is(widget) && widget.side === 'left'; },
            priority: 7
        });
        registry.registerItem({
            id: 'toggle-serial-monitor',
            command: monitor_view_contribution_1.MonitorViewContribution.TOGGLE_SERIAL_MONITOR_TOOLBAR,
            tooltip: 'Serial Monitor'
        });
        registry.registerItem({
            id: arduino_commands_1.ArduinoCommands.TOGGLE_ADVANCED_MODE.id,
            command: arduino_commands_1.ArduinoCommands.TOGGLE_ADVANCED_MODE_TOOLBAR.id,
            tooltip: this.editorMode.proMode ? 'Switch to Classic Mode' : 'Switch to Advanced Mode',
            text: this.editorMode.proMode ? '$(toggle-on)' : '$(toggle-off)'
        });
    };
    ArduinoFrontendContribution.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(arduino_commands_1.ArduinoCommands.TOGGLE_COMPILE_FOR_DEBUG, {
            execute: function () { return _this.editorMode.toggleCompileForDebug(); },
            isToggled: function () { return _this.editorMode.compileForDebug; }
        });
        registry.registerCommand(arduino_commands_1.ArduinoCommands.OPEN_SKETCH_FILES, {
            execute: function (uri) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.openSketchFiles(uri);
                    return [2 /*return*/];
                });
            }); }
        });
        registry.registerCommand(arduino_commands_1.ArduinoCommands.OPEN_BOARDS_DIALOG, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var boardsConfig;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.boardsConfigDialog.open()];
                        case 1:
                            boardsConfig = _a.sent();
                            if (boardsConfig) {
                                this.boardsServiceClientImpl.boardsConfig = boardsConfig;
                            }
                            return [2 /*return*/];
                    }
                });
            }); }
        });
        registry.registerCommand(arduino_commands_1.ArduinoCommands.TOGGLE_ADVANCED_MODE, {
            isToggled: function () { return _this.editorMode.proMode; },
            execute: function () { return _this.editorMode.toggleProMode(); }
        });
        registry.registerCommand(arduino_commands_1.ArduinoCommands.TOGGLE_ADVANCED_MODE_TOOLBAR, {
            isVisible: function (widget) { return arduino_toolbar_1.ArduinoToolbar.is(widget) && widget.side === 'right'; },
            isToggled: function () { return _this.editorMode.proMode; },
            execute: function () { return _this.editorMode.toggleProMode(); }
        });
    };
    ArduinoFrontendContribution.prototype.registerMenus = function (registry) {
        if (!this.editorMode.proMode) {
            var menuId = function (menuPath) {
                var index = menuPath.length - 1;
                var menuId = menuPath[index];
                return menuId;
            };
            registry.getMenu(core_1.MAIN_MENU_BAR).removeNode(menuId(monaco_menu_1.MonacoMenus.SELECTION));
            registry.getMenu(core_1.MAIN_MENU_BAR).removeNode(menuId(browser_2.EditorMainMenu.GO));
            registry.getMenu(core_1.MAIN_MENU_BAR).removeNode(menuId(terminal_frontend_contribution_1.TerminalMenus.TERMINAL));
            registry.getMenu(core_1.MAIN_MENU_BAR).removeNode(menuId(common_frontend_contribution_1.CommonMenus.VIEW));
        }
        registry.registerSubmenu(arduino_menus_1.ArduinoMenus.SKETCH, 'Sketch');
        registry.registerSubmenu(arduino_menus_1.ArduinoMenus.TOOLS, 'Tools');
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH, {
            commandId: arduino_commands_1.ArduinoCommands.TOGGLE_COMPILE_FOR_DEBUG.id,
            label: 'Optimize for Debugging',
            order: '1'
        });
        registry.registerMenuAction(common_frontend_contribution_1.CommonMenus.HELP, {
            commandId: arduino_commands_1.ArduinoCommands.TOGGLE_ADVANCED_MODE.id,
            label: 'Advanced Mode'
        });
    };
    ArduinoFrontendContribution.prototype.openSketchFiles = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var sketch, mainFileUri, otherSketchFileUris, additionalFileUris, _a, _b, uri_2, e_2_1, e_3, message;
            var e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, this.sketchService.loadSketch(uri)];
                    case 1:
                        sketch = _d.sent();
                        mainFileUri = sketch.mainFileUri, otherSketchFileUris = sketch.otherSketchFileUris, additionalFileUris = sketch.additionalFileUris;
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 9]);
                        _a = __values(__spread([mainFileUri], otherSketchFileUris, additionalFileUris)), _b = _a.next();
                        _d.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 6];
                        uri_2 = _b.value;
                        return [4 /*yield*/, this.ensureOpened(uri_2)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9: return [4 /*yield*/, this.ensureOpened(mainFileUri, true)];
                    case 10:
                        _d.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_3 = _d.sent();
                        console.error(e_3);
                        message = e_3 instanceof Error ? e_3.message : JSON.stringify(e_3);
                        this.messageService.error(message);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ArduinoFrontendContribution.prototype.ensureOpened = function (uri, forceOpen) {
        if (forceOpen === void 0) { forceOpen = false; }
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                widget = this.editorManager.all.find(function (widget) { return widget.editor.uri.toString() === uri; });
                if (!widget || forceOpen) {
                    return [2 /*return*/, this.editorManager.open(new uri_1.default(uri))];
                }
                return [2 /*return*/];
            });
        });
    };
    ArduinoFrontendContribution.prototype.registerColors = function (colors) {
        colors.register({
            id: 'arduino.branding.primary',
            defaults: {
                dark: 'statusBar.background',
                light: 'statusBar.background'
            },
            description: 'The primary branding color, such as dialog titles, library, and board manager list labels.'
        }, {
            id: 'arduino.branding.secondary',
            defaults: {
                dark: 'statusBar.background',
                light: 'statusBar.background'
            },
            description: 'Secondary branding color for list selections, dropdowns, and widget borders.'
        }, {
            id: 'arduino.foreground',
            defaults: {
                dark: 'editorWidget.background',
                light: 'editorWidget.background',
                hc: 'editorWidget.background'
            },
            description: 'Color of the Arduino Pro IDE foreground which is used for dialogs, such as the Select Board dialog.'
        }, {
            id: 'arduino.toolbar.background',
            defaults: {
                dark: 'button.background',
                light: 'button.background',
                hc: 'activityBar.inactiveForeground'
            },
            description: 'Background color of the toolbar items. Such as Upload, Verify, etc.'
        }, {
            id: 'arduino.toolbar.hoverBackground',
            defaults: {
                dark: 'button.hoverBackground',
                light: 'button.hoverBackground',
                hc: 'activityBar.inactiveForeground'
            },
            description: 'Background color of the toolbar items when hovering over them. Such as Upload, Verify, etc.'
        }, {
            id: 'arduino.output.foreground',
            defaults: {
                dark: 'editor.foreground',
                light: 'editor.foreground',
                hc: 'editor.foreground'
            },
            description: 'Color of the text in the Output view.'
        }, {
            id: 'arduino.output.background',
            defaults: {
                dark: 'editor.background',
                light: 'editor.background',
                hc: 'editor.background'
            },
            description: 'Background color of the Output view.'
        });
    };
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], ArduinoFrontendContribution.prototype, "messageService", void 0);
    __decorate([
        inversify_1.inject(protocol_1.BoardsService),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "boardsService", void 0);
    __decorate([
        inversify_1.inject(protocol_1.CoreService),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "coreService", void 0);
    __decorate([
        inversify_1.inject(protocol_1.ToolOutputServiceClient),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "toolOutputServiceClient", void 0);
    __decorate([
        inversify_1.inject(boards_service_client_impl_1.BoardsServiceClientImpl),
        __metadata("design:type", boards_service_client_impl_1.BoardsServiceClientImpl)
    ], ArduinoFrontendContribution.prototype, "boardsServiceClientImpl", void 0);
    __decorate([
        inversify_1.inject(protocol_1.BoardsServiceClient),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "boardsServiceClient", void 0);
    __decorate([
        inversify_1.inject(core_1.SelectionService),
        __metadata("design:type", core_1.SelectionService)
    ], ArduinoFrontendContribution.prototype, "selectionService", void 0);
    __decorate([
        inversify_1.inject(browser_2.EditorManager),
        __metadata("design:type", browser_2.EditorManager)
    ], ArduinoFrontendContribution.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(browser_1.ContextMenuRenderer),
        __metadata("design:type", browser_1.ContextMenuRenderer)
    ], ArduinoFrontendContribution.prototype, "contextMenuRenderer", void 0);
    __decorate([
        inversify_1.inject(file_dialog_1.FileDialogService),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "fileDialogService", void 0);
    __decorate([
        inversify_1.inject(common_1.FileSystem),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "fileSystem", void 0);
    __decorate([
        inversify_1.inject(protocol_1.SketchesService),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "sketchService", void 0);
    __decorate([
        inversify_1.inject(boards_config_dialog_1.BoardsConfigDialog),
        __metadata("design:type", boards_config_dialog_1.BoardsConfigDialog)
    ], ArduinoFrontendContribution.prototype, "boardsConfigDialog", void 0);
    __decorate([
        inversify_1.inject(core_1.MenuModelRegistry),
        __metadata("design:type", core_1.MenuModelRegistry)
    ], ArduinoFrontendContribution.prototype, "menuRegistry", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandRegistry),
        __metadata("design:type", command_1.CommandRegistry)
    ], ArduinoFrontendContribution.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(browser_1.StatusBar),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "statusBar", void 0);
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], ArduinoFrontendContribution.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(monitor_connection_1.MonitorConnection),
        __metadata("design:type", monitor_connection_1.MonitorConnection)
    ], ArduinoFrontendContribution.prototype, "monitorConnection", void 0);
    __decorate([
        inversify_1.inject(navigator_contribution_1.FileNavigatorContribution),
        __metadata("design:type", navigator_contribution_1.FileNavigatorContribution)
    ], ArduinoFrontendContribution.prototype, "fileNavigatorContributions", void 0);
    __decorate([
        inversify_1.inject(output_contribution_1.OutputContribution),
        __metadata("design:type", output_contribution_1.OutputContribution)
    ], ArduinoFrontendContribution.prototype, "outputContribution", void 0);
    __decorate([
        inversify_1.inject(outline_view_contribution_1.OutlineViewContribution),
        __metadata("design:type", outline_view_contribution_1.OutlineViewContribution)
    ], ArduinoFrontendContribution.prototype, "outlineContribution", void 0);
    __decorate([
        inversify_1.inject(problem_contribution_1.ProblemContribution),
        __metadata("design:type", problem_contribution_1.ProblemContribution)
    ], ArduinoFrontendContribution.prototype, "problemContribution", void 0);
    __decorate([
        inversify_1.inject(scm_contribution_1.ScmContribution),
        __metadata("design:type", scm_contribution_1.ScmContribution)
    ], ArduinoFrontendContribution.prototype, "scmContribution", void 0);
    __decorate([
        inversify_1.inject(search_in_workspace_frontend_contribution_1.SearchInWorkspaceFrontendContribution),
        __metadata("design:type", search_in_workspace_frontend_contribution_1.SearchInWorkspaceFrontendContribution)
    ], ArduinoFrontendContribution.prototype, "siwContribution", void 0);
    __decorate([
        inversify_1.inject(editor_mode_1.EditorMode),
        __metadata("design:type", editor_mode_1.EditorMode)
    ], ArduinoFrontendContribution.prototype, "editorMode", void 0);
    __decorate([
        inversify_1.inject(arduino_daemon_1.ArduinoDaemon),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "daemon", void 0);
    __decorate([
        inversify_1.inject(browser_1.OpenerService),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "openerService", void 0);
    __decorate([
        inversify_1.inject(config_service_1.ConfigService),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "configService", void 0);
    __decorate([
        inversify_1.inject(boards_data_store_1.BoardsDataStore),
        __metadata("design:type", boards_data_store_1.BoardsDataStore)
    ], ArduinoFrontendContribution.prototype, "boardsDataStore", void 0);
    __decorate([
        inversify_1.inject(main_menu_manager_1.MainMenuManager),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "mainMenuManager", void 0);
    __decorate([
        inversify_1.inject(filesystem_ext_1.FileSystemExt),
        __metadata("design:type", Object)
    ], ArduinoFrontendContribution.prototype, "fileSystemExt", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ArduinoFrontendContribution.prototype, "init", null);
    ArduinoFrontendContribution = __decorate([
        inversify_1.injectable()
    ], ArduinoFrontendContribution);
    return ArduinoFrontendContribution;
}());
exports.ArduinoFrontendContribution = ArduinoFrontendContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/arduino-ide-frontend-module.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/arduino-ide-frontend-module.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
__webpack_require__(/*! ../../src/browser/style/index.css */ "./node_modules/arduino-ide-extension/src/browser/style/index.css");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var widget_manager_1 = __webpack_require__(/*! @theia/core/lib/browser/widget-manager */ "./node_modules/@theia/core/lib/browser/widget-manager.js");
var command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "./node_modules/@theia/core/lib/common/command.js");
var view_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/view-contribution */ "./node_modules/@theia/core/lib/browser/shell/view-contribution.js");
var tab_bar_toolbar_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/tab-bar-toolbar */ "./node_modules/@theia/core/lib/browser/shell/tab-bar-toolbar.js");
var ws_connection_provider_1 = __webpack_require__(/*! @theia/core/lib/browser/messaging/ws-connection-provider */ "./node_modules/@theia/core/lib/browser/messaging/ws-connection-provider.js");
var frontend_application_1 = __webpack_require__(/*! @theia/core/lib/browser/frontend-application */ "./node_modules/@theia/core/lib/browser/frontend-application.js");
var textmate_1 = __webpack_require__(/*! @theia/monaco/lib/browser/textmate */ "./node_modules/@theia/monaco/lib/browser/textmate/index.js");
var browser_1 = __webpack_require__(/*! @theia/languages/lib/browser */ "./node_modules/@theia/languages/lib/browser/index.js");
var arduino_language_client_contribution_1 = __webpack_require__(/*! ./language/arduino-language-client-contribution */ "./node_modules/arduino-ide-extension/lib/browser/language/arduino-language-client-contribution.js");
var library_list_widget_1 = __webpack_require__(/*! ./library/library-list-widget */ "./node_modules/arduino-ide-extension/lib/browser/library/library-list-widget.js");
var arduino_frontend_contribution_1 = __webpack_require__(/*! ./arduino-frontend-contribution */ "./node_modules/arduino-ide-extension/lib/browser/arduino-frontend-contribution.js");
var arduino_language_grammar_contribution_1 = __webpack_require__(/*! ./language/arduino-language-grammar-contribution */ "./node_modules/arduino-ide-extension/lib/browser/language/arduino-language-grammar-contribution.js");
var library_service_1 = __webpack_require__(/*! ../common/protocol/library-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/library-service.js");
var boards_service_1 = __webpack_require__(/*! ../common/protocol/boards-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js");
var sketches_service_1 = __webpack_require__(/*! ../common/protocol/sketches-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service.js");
var sketches_service_client_impl_1 = __webpack_require__(/*! ../common/protocol/sketches-service-client-impl */ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service-client-impl.js");
var core_service_1 = __webpack_require__(/*! ../common/protocol/core-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/core-service.js");
var boards_list_widget_1 = __webpack_require__(/*! ./boards/boards-list-widget */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-list-widget.js");
var boards_widget_frontend_contribution_1 = __webpack_require__(/*! ./boards/boards-widget-frontend-contribution */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-widget-frontend-contribution.js");
var tool_output_service_1 = __webpack_require__(/*! ../common/protocol/tool-output-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/tool-output-service.js");
var tool_output_service_2 = __webpack_require__(/*! ../common/protocol/tool-output-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/tool-output-service.js");
var client_service_impl_1 = __webpack_require__(/*! ./tool-output/client-service-impl */ "./node_modules/arduino-ide-extension/lib/browser/tool-output/client-service-impl.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ./boards/boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var workspace_service_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-service */ "./node_modules/@theia/workspace/lib/browser/workspace-service.js");
var workspace_service_2 = __webpack_require__(/*! ./theia/workspace/workspace-service */ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-service.js");
var outline_view_contribution_1 = __webpack_require__(/*! @theia/outline-view/lib/browser/outline-view-contribution */ "./node_modules/@theia/outline-view/lib/browser/outline-view-contribution.js");
var outline_contribution_1 = __webpack_require__(/*! ./theia/outline/outline-contribution */ "./node_modules/arduino-ide-extension/lib/browser/theia/outline/outline-contribution.js");
var problem_contribution_1 = __webpack_require__(/*! @theia/markers/lib/browser/problem/problem-contribution */ "./node_modules/@theia/markers/lib/browser/problem/problem-contribution.js");
var problem_contribution_2 = __webpack_require__(/*! ./theia/markers/problem-contribution */ "./node_modules/arduino-ide-extension/lib/browser/theia/markers/problem-contribution.js");
var navigator_contribution_1 = __webpack_require__(/*! ./theia/navigator/navigator-contribution */ "./node_modules/arduino-ide-extension/lib/browser/theia/navigator/navigator-contribution.js");
var navigator_contribution_2 = __webpack_require__(/*! @theia/navigator/lib/browser/navigator-contribution */ "./node_modules/@theia/navigator/lib/browser/navigator-contribution.js");
var arduino_toolbar_contribution_1 = __webpack_require__(/*! ./toolbar/arduino-toolbar-contribution */ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar-contribution.js");
var editor_contribution_1 = __webpack_require__(/*! @theia/editor/lib/browser/editor-contribution */ "./node_modules/@theia/editor/lib/browser/editor-contribution.js");
var editor_contribution_2 = __webpack_require__(/*! ./theia/editor/editor-contribution */ "./node_modules/arduino-ide-extension/lib/browser/theia/editor/editor-contribution.js");
var monaco_status_bar_contribution_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-status-bar-contribution */ "./node_modules/@theia/monaco/lib/browser/monaco-status-bar-contribution.js");
var monaco_status_bar_contribution_2 = __webpack_require__(/*! ./theia/monaco/monaco-status-bar-contribution */ "./node_modules/arduino-ide-extension/lib/browser/theia/monaco/monaco-status-bar-contribution.js");
var browser_2 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var menu_1 = __webpack_require__(/*! @theia/core/lib/common/menu */ "./node_modules/@theia/core/lib/common/menu.js");
var application_shell_1 = __webpack_require__(/*! ./theia/core/application-shell */ "./node_modules/arduino-ide-extension/lib/browser/theia/core/application-shell.js");
var frontend_application_2 = __webpack_require__(/*! ./theia/core/frontend-application */ "./node_modules/arduino-ide-extension/lib/browser/theia/core/frontend-application.js");
var boards_config_dialog_1 = __webpack_require__(/*! ./boards/boards-config-dialog */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config-dialog.js");
var boards_config_dialog_widget_1 = __webpack_require__(/*! ./boards/boards-config-dialog-widget */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config-dialog-widget.js");
var scm_contribution_1 = __webpack_require__(/*! @theia/scm/lib/browser/scm-contribution */ "./node_modules/@theia/scm/lib/browser/scm-contribution.js");
var scm_contribution_2 = __webpack_require__(/*! ./theia/scm/scm-contribution */ "./node_modules/arduino-ide-extension/lib/browser/theia/scm/scm-contribution.js");
var search_in_workspace_frontend_contribution_1 = __webpack_require__(/*! @theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution */ "./node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution.js");
var search_in_workspace_frontend_contribution_2 = __webpack_require__(/*! ./theia/search-in-workspace/search-in-workspace-frontend-contribution */ "./node_modules/arduino-ide-extension/lib/browser/theia/search-in-workspace/search-in-workspace-frontend-contribution.js");
var library_widget_frontend_contribution_1 = __webpack_require__(/*! ./library/library-widget-frontend-contribution */ "./node_modules/arduino-ide-extension/lib/browser/library/library-widget-frontend-contribution.js");
var monitor_service_client_impl_1 = __webpack_require__(/*! ./monitor/monitor-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-service-client-impl.js");
var monitor_service_1 = __webpack_require__(/*! ../common/protocol/monitor-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/monitor-service.js");
var config_service_1 = __webpack_require__(/*! ../common/protocol/config-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/config-service.js");
var monitor_widget_1 = __webpack_require__(/*! ./monitor/monitor-widget */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-widget.js");
var monitor_view_contribution_1 = __webpack_require__(/*! ./monitor/monitor-view-contribution */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-view-contribution.js");
var monitor_connection_1 = __webpack_require__(/*! ./monitor/monitor-connection */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-connection.js");
var monitor_model_1 = __webpack_require__(/*! ./monitor/monitor-model */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-model.js");
var tab_bar_decorator_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/tab-bar-decorator */ "./node_modules/@theia/core/lib/browser/shell/tab-bar-decorator.js");
var tab_bar_decorator_2 = __webpack_require__(/*! ./theia/core/tab-bar-decorator */ "./node_modules/arduino-ide-extension/lib/browser/theia/core/tab-bar-decorator.js");
var browser_3 = __webpack_require__(/*! @theia/markers/lib/browser */ "./node_modules/@theia/markers/lib/browser/index.js");
var problem_manager_1 = __webpack_require__(/*! ./theia/markers/problem-manager */ "./node_modules/arduino-ide-extension/lib/browser/theia/markers/problem-manager.js");
var boards_auto_installer_1 = __webpack_require__(/*! ./boards/boards-auto-installer */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-auto-installer.js");
var about_dialog_1 = __webpack_require__(/*! @theia/core/lib/browser/about-dialog */ "./node_modules/@theia/core/lib/browser/about-dialog.js");
var about_dialog_2 = __webpack_require__(/*! ./theia/core/about-dialog */ "./node_modules/arduino-ide-extension/lib/browser/theia/core/about-dialog.js");
var shell_layout_restorer_1 = __webpack_require__(/*! ./theia/core/shell-layout-restorer */ "./node_modules/arduino-ide-extension/lib/browser/theia/core/shell-layout-restorer.js");
var editor_mode_1 = __webpack_require__(/*! ./editor-mode */ "./node_modules/arduino-ide-extension/lib/browser/editor-mode.js");
var list_item_renderer_1 = __webpack_require__(/*! ./widgets/component-list/list-item-renderer */ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-item-renderer.js");
var color_application_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/color-application-contribution */ "./node_modules/@theia/core/lib/browser/color-application-contribution.js");
var monaco_theming_service_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-theming-service */ "./node_modules/@theia/monaco/lib/browser/monaco-theming-service.js");
var arduino_daemon_client_impl_1 = __webpack_require__(/*! ./arduino-daemon-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/arduino-daemon-client-impl.js");
var arduino_daemon_1 = __webpack_require__(/*! ../common/protocol/arduino-daemon */ "./node_modules/arduino-ide-extension/lib/common/protocol/arduino-daemon.js");
var browser_4 = __webpack_require__(/*! @theia/editor/lib/browser */ "./node_modules/@theia/editor/lib/browser/index.js");
var editor_manager_1 = __webpack_require__(/*! ./theia/editor/editor-manager */ "./node_modules/arduino-ide-extension/lib/browser/theia/editor/editor-manager.js");
var connection_status_service_1 = __webpack_require__(/*! ./theia/core/connection-status-service */ "./node_modules/arduino-ide-extension/lib/browser/theia/core/connection-status-service.js");
var connection_status_service_2 = __webpack_require__(/*! @theia/core/lib/browser/connection-status-service */ "./node_modules/@theia/core/lib/browser/connection-status-service.js");
var config_service_client_impl_1 = __webpack_require__(/*! ./config-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/config-service-client-impl.js");
var core_service_client_impl_1 = __webpack_require__(/*! ./core-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/core-service-client-impl.js");
var boards_data_menu_updater_1 = __webpack_require__(/*! ./boards/boards-data-menu-updater */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-data-menu-updater.js");
var boards_data_store_1 = __webpack_require__(/*! ./boards/boards-data-store */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-data-store.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var filesystem_ext_1 = __webpack_require__(/*! ../common/protocol/filesystem-ext */ "./node_modules/arduino-ide-extension/lib/common/protocol/filesystem-ext.js");
var browser_5 = __webpack_require__(/*! @theia/workspace/lib/browser */ "./node_modules/@theia/workspace/lib/browser/index.js");
var workspace_frontend_contribution_1 = __webpack_require__(/*! ./theia/workspace/workspace-frontend-contribution */ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-frontend-contribution.js");
var contribution_1 = __webpack_require__(/*! ./contributions/contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var new_sketch_1 = __webpack_require__(/*! ./contributions/new-sketch */ "./node_modules/arduino-ide-extension/lib/browser/contributions/new-sketch.js");
var open_sketch_1 = __webpack_require__(/*! ./contributions/open-sketch */ "./node_modules/arduino-ide-extension/lib/browser/contributions/open-sketch.js");
var close_sketch_1 = __webpack_require__(/*! ./contributions/close-sketch */ "./node_modules/arduino-ide-extension/lib/browser/contributions/close-sketch.js");
var save_as_sketch_1 = __webpack_require__(/*! ./contributions/save-as-sketch */ "./node_modules/arduino-ide-extension/lib/browser/contributions/save-as-sketch.js");
var save_sketch_1 = __webpack_require__(/*! ./contributions/save-sketch */ "./node_modules/arduino-ide-extension/lib/browser/contributions/save-sketch.js");
var verify_sketch_1 = __webpack_require__(/*! ./contributions/verify-sketch */ "./node_modules/arduino-ide-extension/lib/browser/contributions/verify-sketch.js");
var upload_sketch_1 = __webpack_require__(/*! ./contributions/upload-sketch */ "./node_modules/arduino-ide-extension/lib/browser/contributions/upload-sketch.js");
var common_frontend_contribution_1 = __webpack_require__(/*! ./theia/core/common-frontend-contribution */ "./node_modules/arduino-ide-extension/lib/browser/theia/core/common-frontend-contribution.js");
var edit_contributions_1 = __webpack_require__(/*! ./contributions/edit-contributions */ "./node_modules/arduino-ide-extension/lib/browser/contributions/edit-contributions.js");
var open_sketch_external_1 = __webpack_require__(/*! ./contributions/open-sketch-external */ "./node_modules/arduino-ide-extension/lib/browser/contributions/open-sketch-external.js");
var preferences_contribution_1 = __webpack_require__(/*! @theia/preferences/lib/browser/preferences-contribution */ "./node_modules/@theia/preferences/lib/browser/preferences-contribution.js");
var preferences_contribution_2 = __webpack_require__(/*! ./theia/preferences/preferences-contribution */ "./node_modules/arduino-ide-extension/lib/browser/theia/preferences/preferences-contribution.js");
var quit_app_1 = __webpack_require__(/*! ./contributions/quit-app */ "./node_modules/arduino-ide-extension/lib/browser/contributions/quit-app.js");
var sketch_control_1 = __webpack_require__(/*! ./contributions/sketch-control */ "./node_modules/arduino-ide-extension/lib/browser/contributions/sketch-control.js");
var settings_1 = __webpack_require__(/*! ./contributions/settings */ "./node_modules/arduino-ide-extension/lib/browser/contributions/settings.js");
var keybindings_1 = __webpack_require__(/*! ./theia/core/keybindings */ "./node_modules/arduino-ide-extension/lib/browser/theia/core/keybindings.js");
var workspace_commands_1 = __webpack_require__(/*! ./theia/workspace/workspace-commands */ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-commands.js");
var workspace_delete_handler_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-delete-handler */ "./node_modules/@theia/workspace/lib/browser/workspace-delete-handler.js");
var workspace_delete_handler_2 = __webpack_require__(/*! ./theia/workspace/workspace-delete-handler */ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-delete-handler.js");
var tab_bar_toolbar_2 = __webpack_require__(/*! ./theia/core/tab-bar-toolbar */ "./node_modules/arduino-ide-extension/lib/browser/theia/core/tab-bar-toolbar.js");
var editor_widget_factory_1 = __webpack_require__(/*! @theia/editor/lib/browser/editor-widget-factory */ "./node_modules/@theia/editor/lib/browser/editor-widget-factory.js");
var editor_widget_factory_2 = __webpack_require__(/*! ./theia/editor/editor-widget-factory */ "./node_modules/arduino-ide-extension/lib/browser/theia/editor/editor-widget-factory.js");
var output_widget_1 = __webpack_require__(/*! @theia/output/lib/browser/output-widget */ "./node_modules/@theia/output/lib/browser/output-widget.js");
var output_widget_2 = __webpack_require__(/*! ./theia/output/output-widget */ "./node_modules/arduino-ide-extension/lib/browser/theia/output/output-widget.js");
var ElementQueries = __webpack_require__(/*! css-element-queries/src/ElementQueries */ "./node_modules/css-element-queries/src/ElementQueries.js");
monaco_theming_service_1.MonacoThemingService.register({
    id: 'arduinoTheme',
    label: 'Light (Arduino)',
    uiTheme: 'vs',
    json: __webpack_require__(/*! ../../src/browser/data/arduino.color-theme.json */ "./node_modules/arduino-ide-extension/src/browser/data/arduino.color-theme.json")
});
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    ElementQueries.listen();
    ElementQueries.init();
    // Commands and toolbar items
    bind(arduino_frontend_contribution_1.ArduinoFrontendContribution).toSelf().inSingletonScope();
    bind(command_1.CommandContribution).toService(arduino_frontend_contribution_1.ArduinoFrontendContribution);
    bind(menu_1.MenuContribution).toService(arduino_frontend_contribution_1.ArduinoFrontendContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(arduino_frontend_contribution_1.ArduinoFrontendContribution);
    bind(frontend_application_1.FrontendApplicationContribution).toService(arduino_frontend_contribution_1.ArduinoFrontendContribution);
    bind(color_application_contribution_1.ColorContribution).toService(arduino_frontend_contribution_1.ArduinoFrontendContribution);
    bind(arduino_toolbar_contribution_1.ArduinoToolbarContribution).toSelf().inSingletonScope();
    bind(frontend_application_1.FrontendApplicationContribution).toService(arduino_toolbar_contribution_1.ArduinoToolbarContribution);
    // `ino` TextMate grammar and language client
    bind(textmate_1.LanguageGrammarDefinitionContribution).to(arduino_language_grammar_contribution_1.ArduinoLanguageGrammarContribution).inSingletonScope();
    bind(browser_1.LanguageClientContribution).to(arduino_language_client_contribution_1.ArduinoLanguageClientContribution).inSingletonScope();
    // Renderer for both the library and the core widgets.
    bind(list_item_renderer_1.ListItemRenderer).toSelf().inSingletonScope();
    // Library service
    bind(library_service_1.LibraryService).toDynamicValue(function (context) { return ws_connection_provider_1.WebSocketConnectionProvider.createProxy(context.container, library_service_1.LibraryServicePath); }).inSingletonScope();
    // Library list widget
    bind(library_list_widget_1.LibraryListWidget).toSelf();
    view_contribution_1.bindViewContribution(bind, library_widget_frontend_contribution_1.LibraryListWidgetFrontendContribution);
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: library_list_widget_1.LibraryListWidget.WIDGET_ID,
        createWidget: function () { return context.container.get(library_list_widget_1.LibraryListWidget); }
    }); });
    bind(frontend_application_1.FrontendApplicationContribution).toService(library_widget_frontend_contribution_1.LibraryListWidgetFrontendContribution);
    // Sketch list service
    bind(sketches_service_1.SketchesService).toDynamicValue(function (context) { return ws_connection_provider_1.WebSocketConnectionProvider.createProxy(context.container, sketches_service_1.SketchesServicePath); }).inSingletonScope();
    bind(sketches_service_client_impl_1.SketchesServiceClientImpl).toSelf().inSingletonScope();
    // Config service
    bind(config_service_1.ConfigService).toDynamicValue(function (context) {
        var connection = context.container.get(ws_connection_provider_1.WebSocketConnectionProvider);
        var client = context.container.get(config_service_client_impl_1.ConfigServiceClientImpl);
        return connection.createProxy(config_service_1.ConfigServicePath, client);
    }).inSingletonScope();
    bind(config_service_client_impl_1.ConfigServiceClientImpl).toSelf().inSingletonScope();
    bind(config_service_1.ConfigServiceClient).toDynamicValue(function (context) {
        var client = context.container.get(config_service_client_impl_1.ConfigServiceClientImpl);
        ws_connection_provider_1.WebSocketConnectionProvider.createProxy(context.container, config_service_1.ConfigServicePath, client);
        return client;
    }).inSingletonScope();
    // Boards service
    bind(boards_service_1.BoardsService).toDynamicValue(function (context) {
        var connection = context.container.get(ws_connection_provider_1.WebSocketConnectionProvider);
        var client = context.container.get(boards_service_client_impl_1.BoardsServiceClientImpl);
        return connection.createProxy(boards_service_1.BoardsServicePath, client);
    }).inSingletonScope();
    // Boards service client to receive and delegate notifications from the backend.
    bind(boards_service_client_impl_1.BoardsServiceClientImpl).toSelf().inSingletonScope();
    bind(frontend_application_1.FrontendApplicationContribution).toService(boards_service_client_impl_1.BoardsServiceClientImpl);
    bind(boards_service_1.BoardsServiceClient).toDynamicValue(function (context) { return __awaiter(void 0, void 0, void 0, function () {
        var client, service;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = context.container.get(boards_service_client_impl_1.BoardsServiceClientImpl);
                    service = context.container.get(boards_service_1.BoardsService);
                    return [4 /*yield*/, client.init(service)];
                case 1:
                    _a.sent();
                    ws_connection_provider_1.WebSocketConnectionProvider.createProxy(context.container, boards_service_1.BoardsServicePath, client);
                    return [2 /*return*/, client];
            }
        });
    }); }).inSingletonScope();
    // To be able to track, and update the menu based on the core settings (aka. board details) of the currently selected board.
    bind(frontend_application_1.FrontendApplicationContribution).to(boards_data_menu_updater_1.BoardsDataMenuUpdater).inSingletonScope();
    bind(boards_data_store_1.BoardsDataStore).toSelf().inSingletonScope();
    bind(frontend_application_1.FrontendApplicationContribution).toService(boards_data_store_1.BoardsDataStore);
    // Logger for the Arduino daemon
    bind(core_1.ILogger).toDynamicValue(function (ctx) {
        var parentLogger = ctx.container.get(core_1.ILogger);
        return parentLogger.child('store');
    }).inSingletonScope().whenTargetNamed('store');
    // Boards auto-installer
    bind(boards_auto_installer_1.BoardsAutoInstaller).toSelf().inSingletonScope();
    bind(frontend_application_1.FrontendApplicationContribution).toService(boards_auto_installer_1.BoardsAutoInstaller);
    // Boards list widget
    bind(boards_list_widget_1.BoardsListWidget).toSelf();
    view_contribution_1.bindViewContribution(bind, boards_widget_frontend_contribution_1.BoardsListWidgetFrontendContribution);
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: boards_list_widget_1.BoardsListWidget.WIDGET_ID,
        createWidget: function () { return context.container.get(boards_list_widget_1.BoardsListWidget); }
    }); });
    bind(frontend_application_1.FrontendApplicationContribution).toService(boards_widget_frontend_contribution_1.BoardsListWidgetFrontendContribution);
    // Board select dialog
    bind(boards_config_dialog_widget_1.BoardsConfigDialogWidget).toSelf().inSingletonScope();
    bind(boards_config_dialog_1.BoardsConfigDialog).toSelf().inSingletonScope();
    bind(boards_config_dialog_1.BoardsConfigDialogProps).toConstantValue({
        title: 'Select Board'
    });
    // Core service
    bind(core_service_1.CoreService).toDynamicValue(function (context) {
        var connection = context.container.get(ws_connection_provider_1.WebSocketConnectionProvider);
        var client = context.container.get(core_service_client_impl_1.CoreServiceClientImpl);
        return connection.createProxy(core_service_1.CoreServicePath, client);
    }).inSingletonScope();
    // Core service client to receive and delegate notifications when the index or the library index has been updated.
    bind(core_service_client_impl_1.CoreServiceClientImpl).toSelf().inSingletonScope();
    bind(core_service_1.CoreServiceClient).toDynamicValue(function (context) {
        var client = context.container.get(core_service_client_impl_1.CoreServiceClientImpl);
        ws_connection_provider_1.WebSocketConnectionProvider.createProxy(context.container, core_service_1.CoreServicePath, client);
        return client;
    }).inSingletonScope();
    // Tool output service client
    bind(client_service_impl_1.ToolOutputServiceClientImpl).toSelf().inSingletonScope();
    bind(tool_output_service_1.ToolOutputServiceClient).toDynamicValue(function (context) {
        var client = context.container.get(client_service_impl_1.ToolOutputServiceClientImpl);
        ws_connection_provider_1.WebSocketConnectionProvider.createProxy(context.container, tool_output_service_2.ToolOutputService.SERVICE_PATH, client);
        return client;
    }).inSingletonScope();
    // Serial monitor
    bind(monitor_model_1.MonitorModel).toSelf().inSingletonScope();
    bind(frontend_application_1.FrontendApplicationContribution).toService(monitor_model_1.MonitorModel);
    bind(monitor_widget_1.MonitorWidget).toSelf();
    view_contribution_1.bindViewContribution(bind, monitor_view_contribution_1.MonitorViewContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(monitor_view_contribution_1.MonitorViewContribution);
    bind(widget_manager_1.WidgetFactory).toDynamicValue(function (context) { return ({
        id: monitor_widget_1.MonitorWidget.ID,
        createWidget: function () { return context.container.get(monitor_widget_1.MonitorWidget); }
    }); });
    // Frontend binding for the serial monitor service
    bind(monitor_service_1.MonitorService).toDynamicValue(function (context) {
        var connection = context.container.get(ws_connection_provider_1.WebSocketConnectionProvider);
        var client = context.container.get(monitor_service_client_impl_1.MonitorServiceClientImpl);
        return connection.createProxy(monitor_service_1.MonitorServicePath, client);
    }).inSingletonScope();
    bind(monitor_connection_1.MonitorConnection).toSelf().inSingletonScope();
    // Serial monitor service client to receive and delegate notifications from the backend.
    bind(monitor_service_client_impl_1.MonitorServiceClientImpl).toSelf().inSingletonScope();
    bind(monitor_service_1.MonitorServiceClient).toDynamicValue(function (context) {
        var client = context.container.get(monitor_service_client_impl_1.MonitorServiceClientImpl);
        ws_connection_provider_1.WebSocketConnectionProvider.createProxy(context.container, monitor_service_1.MonitorServicePath, client);
        return client;
    }).inSingletonScope();
    bind(workspace_service_2.WorkspaceService).toSelf().inSingletonScope();
    rebind(workspace_service_1.WorkspaceService).toService(workspace_service_2.WorkspaceService);
    // Customizing default Theia layout based on the editor mode: `pro-mode` or `classic`.
    bind(editor_mode_1.EditorMode).toSelf().inSingletonScope();
    bind(frontend_application_1.FrontendApplicationContribution).toService(editor_mode_1.EditorMode);
    // Layout and shell customizations.
    rebind(outline_view_contribution_1.OutlineViewContribution).to(outline_contribution_1.OutlineViewContribution).inSingletonScope();
    rebind(problem_contribution_1.ProblemContribution).to(problem_contribution_2.ProblemContribution).inSingletonScope();
    rebind(navigator_contribution_2.FileNavigatorContribution).to(navigator_contribution_1.FileNavigatorContribution).inSingletonScope();
    rebind(editor_contribution_1.EditorContribution).to(editor_contribution_2.EditorContribution).inSingletonScope();
    rebind(monaco_status_bar_contribution_1.MonacoStatusBarContribution).to(monaco_status_bar_contribution_2.MonacoStatusBarContribution).inSingletonScope();
    rebind(browser_2.ApplicationShell).to(application_shell_1.ApplicationShell).inSingletonScope();
    rebind(scm_contribution_1.ScmContribution).to(scm_contribution_2.ScmContribution).inSingletonScope();
    rebind(search_in_workspace_frontend_contribution_1.SearchInWorkspaceFrontendContribution).to(search_in_workspace_frontend_contribution_2.SearchInWorkspaceFrontendContribution).inSingletonScope();
    rebind(frontend_application_1.FrontendApplication).to(frontend_application_2.FrontendApplication).inSingletonScope();
    rebind(browser_5.WorkspaceFrontendContribution).to(workspace_frontend_contribution_1.WorkspaceFrontendContribution).inSingletonScope();
    rebind(browser_5.FileMenuContribution).to(workspace_frontend_contribution_1.ArduinoFileMenuContribution).inSingletonScope();
    rebind(browser_2.CommonFrontendContribution).to(common_frontend_contribution_1.CommonFrontendContribution).inSingletonScope();
    rebind(preferences_contribution_1.PreferencesContribution).to(preferences_contribution_2.PreferencesContribution).inSingletonScope();
    rebind(browser_2.KeybindingRegistry).to(keybindings_1.KeybindingRegistry).inSingletonScope();
    rebind(browser_5.WorkspaceCommandContribution).to(workspace_commands_1.WorkspaceCommandContribution).inSingletonScope();
    rebind(workspace_delete_handler_1.WorkspaceDeleteHandler).to(workspace_delete_handler_2.WorkspaceDeleteHandler).inSingletonScope();
    rebind(editor_widget_factory_1.EditorWidgetFactory).to(editor_widget_factory_2.EditorWidgetFactory).inSingletonScope();
    rebind(tab_bar_toolbar_1.TabBarToolbarFactory).toFactory(function (_a) {
        var parentContainer = _a.container;
        return function () {
            var container = parentContainer.createChild();
            container.bind(tab_bar_toolbar_2.TabBarToolbar).toSelf().inSingletonScope();
            return container.get(tab_bar_toolbar_2.TabBarToolbar);
        };
    });
    bind(output_widget_2.OutputWidget).toSelf().inSingletonScope();
    rebind(output_widget_1.OutputWidget).toService(output_widget_2.OutputWidget);
    // Show a disconnected status bar, when the daemon is not available
    bind(connection_status_service_1.ApplicationConnectionStatusContribution).toSelf().inSingletonScope();
    rebind(connection_status_service_2.ApplicationConnectionStatusContribution).toService(connection_status_service_1.ApplicationConnectionStatusContribution);
    bind(connection_status_service_1.FrontendConnectionStatusService).toSelf().inSingletonScope();
    rebind(connection_status_service_2.FrontendConnectionStatusService).toService(connection_status_service_1.FrontendConnectionStatusService);
    // Editor customizations. Sets the editor to `readOnly` if under the data dir.
    bind(editor_manager_1.EditorManager).toSelf().inSingletonScope();
    rebind(browser_4.EditorManager).toService(editor_manager_1.EditorManager);
    // Decorator customizations
    bind(tab_bar_decorator_2.TabBarDecoratorService).toSelf().inSingletonScope();
    rebind(tab_bar_decorator_1.TabBarDecoratorService).toService(tab_bar_decorator_2.TabBarDecoratorService);
    // Problem markers
    bind(problem_manager_1.ProblemManager).toSelf().inSingletonScope();
    rebind(browser_3.ProblemManager).toService(problem_manager_1.ProblemManager);
    // About dialog to show the CLI version
    bind(about_dialog_2.AboutDialog).toSelf().inSingletonScope();
    rebind(about_dialog_1.AboutDialog).toService(about_dialog_2.AboutDialog);
    // Customized layout restorer that can restore the state in async way: https://github.com/eclipse-theia/theia/issues/6579
    bind(shell_layout_restorer_1.ShellLayoutRestorer).toSelf().inSingletonScope();
    rebind(browser_2.ShellLayoutRestorer).toService(shell_layout_restorer_1.ShellLayoutRestorer);
    // Arduino daemon client. Receives notifications from the backend if the CLI daemon process has been restarted.
    bind(arduino_daemon_1.ArduinoDaemon).toDynamicValue(function (context) {
        var connection = context.container.get(ws_connection_provider_1.WebSocketConnectionProvider);
        var client = context.container.get(arduino_daemon_client_impl_1.ArduinoDaemonClientImpl);
        return connection.createProxy(arduino_daemon_1.ArduinoDaemonPath, client);
    }).inSingletonScope();
    bind(arduino_daemon_client_impl_1.ArduinoDaemonClientImpl).toSelf().inSingletonScope();
    bind(arduino_daemon_1.ArduinoDaemonClient).toDynamicValue(function (context) {
        var client = context.container.get(arduino_daemon_client_impl_1.ArduinoDaemonClientImpl);
        ws_connection_provider_1.WebSocketConnectionProvider.createProxy(context.container, arduino_daemon_1.ArduinoDaemonPath, client);
        return client;
    }).inSingletonScope();
    // File-system extension
    bind(filesystem_ext_1.FileSystemExt).toDynamicValue(function (context) { return ws_connection_provider_1.WebSocketConnectionProvider.createProxy(context.container, filesystem_ext_1.FileSystemExtPath); }).inSingletonScope();
    contribution_1.Contribution.configure(bind, new_sketch_1.NewSketch);
    contribution_1.Contribution.configure(bind, open_sketch_1.OpenSketch);
    contribution_1.Contribution.configure(bind, close_sketch_1.CloseSketch);
    contribution_1.Contribution.configure(bind, save_sketch_1.SaveSketch);
    contribution_1.Contribution.configure(bind, save_as_sketch_1.SaveAsSketch);
    contribution_1.Contribution.configure(bind, verify_sketch_1.VerifySketch);
    contribution_1.Contribution.configure(bind, upload_sketch_1.UploadSketch);
    contribution_1.Contribution.configure(bind, open_sketch_external_1.OpenSketchExternal);
    contribution_1.Contribution.configure(bind, edit_contributions_1.EditContributions);
    contribution_1.Contribution.configure(bind, quit_app_1.QuitApp);
    contribution_1.Contribution.configure(bind, sketch_control_1.SketchControl);
    contribution_1.Contribution.configure(bind, settings_1.Settings);
});


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/arduino-workspace-resolver.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/arduino-workspace-resolver.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
exports.ArduinoWorkspaceRootResolver = void 0;
var upath_1 = __webpack_require__(/*! upath */ "./node_modules/upath/build/code/upath.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var os_1 = __webpack_require__(/*! @theia/core/lib/common/os */ "./node_modules/@theia/core/lib/common/os.js");
var objects_1 = __webpack_require__(/*! @theia/core/lib/common/objects */ "./node_modules/@theia/core/lib/common/objects.js");
var ArduinoWorkspaceRootResolver = /** @class */ (function () {
    function ArduinoWorkspaceRootResolver(options) {
        this.options = options;
    }
    ArduinoWorkspaceRootResolver.prototype.resolve = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, recentWorkspaces, recentSketches, _a, _b, uri, valid, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        hash = options.hash, recentWorkspaces = options.recentWorkspaces, recentSketches = options.recentSketches;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = __values(__spread([this.hashToUri(hash)], recentWorkspaces, recentSketches).filter(objects_1.notEmpty)), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        uri = _b.value;
                        return [4 /*yield*/, this.isValid(uri)];
                    case 3:
                        valid = _d.sent();
                        if (valid) {
                            return [2 /*return*/, { uri: uri }];
                        }
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, undefined];
                }
            });
        });
    };
    ArduinoWorkspaceRootResolver.prototype.isValid = function (uri) {
        return this.options.isValid(uri);
    };
    // Note: here, the `hash` was defined as new `URI(yourValidFsPath).path` so we have to map it to a valid FS path first.
    // This is important for Windows only and a NOOP on POSIX.
    // Note: we set the `new URI(myValidUri).path.toString()` as the `hash`. See:
    // - https://github.com/eclipse-theia/theia/blob/8196e9dcf9c8de8ea0910efeb5334a974f426966/packages/workspace/src/browser/workspace-service.ts#L143 and
    // - https://github.com/eclipse-theia/theia/blob/8196e9dcf9c8de8ea0910efeb5334a974f426966/packages/workspace/src/browser/workspace-service.ts#L423
    ArduinoWorkspaceRootResolver.prototype.hashToUri = function (hash) {
        if (hash
            && hash.length > 1
            && hash.startsWith('#')) {
            var path = hash.slice(1); // Trim the leading `#`.
            return new uri_1.default(upath_1.toUnix(path.slice(os_1.isWindows && hash.startsWith('/') ? 1 : 0))).withScheme('file').toString();
        }
        return undefined;
    };
    return ArduinoWorkspaceRootResolver;
}());
exports.ArduinoWorkspaceRootResolver = ArduinoWorkspaceRootResolver;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-auto-installer.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/boards/boards-auto-installer.js ***!
  \****************************************************************************************/
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
exports.BoardsAutoInstaller = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var message_service_1 = __webpack_require__(/*! @theia/core/lib/common/message-service */ "./node_modules/@theia/core/lib/common/message-service.js");
var boards_service_1 = __webpack_require__(/*! ../../common/protocol/boards-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ./boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var boards_widget_frontend_contribution_1 = __webpack_require__(/*! ./boards-widget-frontend-contribution */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-widget-frontend-contribution.js");
var progress_dialog_1 = __webpack_require__(/*! ../widgets/progress-dialog */ "./node_modules/arduino-ide-extension/lib/browser/widgets/progress-dialog.js");
/**
 * Listens on `BoardsConfig.Config` changes, if a board is selected which does not
 * have the corresponding core installed, it proposes the user to install the core.
 */
var BoardsAutoInstaller = /** @class */ (function () {
    function BoardsAutoInstaller() {
    }
    BoardsAutoInstaller.prototype.onStart = function () {
        this.boardsServiceClient.onBoardsConfigChanged(this.ensureCoreExists.bind(this));
        this.ensureCoreExists(this.boardsServiceClient.boardsConfig);
    };
    BoardsAutoInstaller.prototype.ensureCoreExists = function (config) {
        var _this = this;
        var selectedBoard = config.selectedBoard;
        if (selectedBoard) {
            this.boardsService.search({}).then(function (packages) {
                var e_1, _a;
                var candidates = packages
                    .filter(function (pkg) { return pkg.boards.some(function (board) { return boards_service_1.Board.sameAs(board, selectedBoard); }); })
                    .filter(function (_a) {
                    var installable = _a.installable, installedVersion = _a.installedVersion;
                    return installable && !installedVersion;
                });
                var _loop_1 = function (candidate) {
                    // tslint:disable-next-line:max-line-length
                    _this.messageService.info("The `\"" + candidate.name + "\"` core has to be installed for the currently selected `\"" + selectedBoard.name + "\"` board. Do you want to install it now?", 'Install Manually', 'Yes').then(function (answer) { return __awaiter(_this, void 0, void 0, function () {
                        var dialog;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(answer === 'Yes')) return [3 /*break*/, 4];
                                    dialog = new progress_dialog_1.InstallationProgressDialog(candidate.name, candidate.availableVersions[0]);
                                    dialog.open();
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, , 3, 4]);
                                    return [4 /*yield*/, this.boardsService.install({ item: candidate })];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    dialog.close();
                                    return [7 /*endfinally*/];
                                case 4:
                                    if (answer) {
                                        this.boardsManagerFrontendContribution.openView({ reveal: true }).then(function (widget) { return widget.refresh(candidate.name.toLocaleLowerCase()); });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                };
                try {
                    for (var candidates_1 = __values(candidates), candidates_1_1 = candidates_1.next(); !candidates_1_1.done; candidates_1_1 = candidates_1.next()) {
                        var candidate = candidates_1_1.value;
                        _loop_1(candidate);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (candidates_1_1 && !candidates_1_1.done && (_a = candidates_1.return)) _a.call(candidates_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        }
    };
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], BoardsAutoInstaller.prototype, "messageService", void 0);
    __decorate([
        inversify_1.inject(boards_service_1.BoardsService),
        __metadata("design:type", Object)
    ], BoardsAutoInstaller.prototype, "boardsService", void 0);
    __decorate([
        inversify_1.inject(boards_service_client_impl_1.BoardsServiceClientImpl),
        __metadata("design:type", boards_service_client_impl_1.BoardsServiceClientImpl)
    ], BoardsAutoInstaller.prototype, "boardsServiceClient", void 0);
    __decorate([
        inversify_1.inject(boards_widget_frontend_contribution_1.BoardsListWidgetFrontendContribution),
        __metadata("design:type", boards_widget_frontend_contribution_1.BoardsListWidgetFrontendContribution)
    ], BoardsAutoInstaller.prototype, "boardsManagerFrontendContribution", void 0);
    BoardsAutoInstaller = __decorate([
        inversify_1.injectable()
    ], BoardsAutoInstaller);
    return BoardsAutoInstaller;
}());
exports.BoardsAutoInstaller = BoardsAutoInstaller;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config-dialog-widget.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/boards/boards-config-dialog-widget.js ***!
  \**********************************************************************************************/
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
exports.BoardsConfigDialogWidget = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var boards_service_1 = __webpack_require__(/*! ../../common/protocol/boards-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js");
var boards_config_1 = __webpack_require__(/*! ./boards-config */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ./boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var core_service_client_impl_1 = __webpack_require__(/*! ../core-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/core-service-client-impl.js");
var arduino_daemon_client_impl_1 = __webpack_require__(/*! ../arduino-daemon-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/arduino-daemon-client-impl.js");
var BoardsConfigDialogWidget = /** @class */ (function (_super) {
    __extends(BoardsConfigDialogWidget, _super);
    function BoardsConfigDialogWidget() {
        var _this = _super.call(this) || this;
        _this.onBoardConfigChangedEmitter = new event_1.Emitter();
        _this.onBoardConfigChanged = _this.onBoardConfigChangedEmitter.event;
        _this.fireConfigChanged = function (config) {
            _this.onBoardConfigChangedEmitter.fire(config);
        };
        _this.setFocusNode = function (element) {
            _this.focusNode = element;
        };
        _this.id = 'select-board-dialog';
        return _this;
    }
    BoardsConfigDialogWidget.prototype.render = function () {
        return React.createElement("div", { className: 'selectBoardContainer' },
            React.createElement(boards_config_1.BoardsConfig, { boardsService: this.boardsService, boardsServiceClient: this.boardsServiceClient, coreServiceClient: this.coreServiceClient, daemonClient: this.daemonClient, onConfigChange: this.fireConfigChanged, onFocusNodeSet: this.setFocusNode }));
    };
    BoardsConfigDialogWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        if (this.focusNode instanceof HTMLInputElement) {
            this.focusNode.select();
        }
        (this.focusNode || this.node).focus();
    };
    __decorate([
        inversify_1.inject(boards_service_1.BoardsService),
        __metadata("design:type", Object)
    ], BoardsConfigDialogWidget.prototype, "boardsService", void 0);
    __decorate([
        inversify_1.inject(boards_service_client_impl_1.BoardsServiceClientImpl),
        __metadata("design:type", boards_service_client_impl_1.BoardsServiceClientImpl)
    ], BoardsConfigDialogWidget.prototype, "boardsServiceClient", void 0);
    __decorate([
        inversify_1.inject(core_service_client_impl_1.CoreServiceClientImpl),
        __metadata("design:type", core_service_client_impl_1.CoreServiceClientImpl)
    ], BoardsConfigDialogWidget.prototype, "coreServiceClient", void 0);
    __decorate([
        inversify_1.inject(arduino_daemon_client_impl_1.ArduinoDaemonClientImpl),
        __metadata("design:type", arduino_daemon_client_impl_1.ArduinoDaemonClientImpl)
    ], BoardsConfigDialogWidget.prototype, "daemonClient", void 0);
    BoardsConfigDialogWidget = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], BoardsConfigDialogWidget);
    return BoardsConfigDialogWidget;
}(browser_1.ReactWidget));
exports.BoardsConfigDialogWidget = BoardsConfigDialogWidget;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config-dialog.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/boards/boards-config-dialog.js ***!
  \***************************************************************************************/
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
exports.BoardsConfigDialog = exports.BoardsConfigDialogProps = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var boards_service_1 = __webpack_require__(/*! ../../common/protocol/boards-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js");
var boards_config_dialog_widget_1 = __webpack_require__(/*! ./boards-config-dialog-widget */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config-dialog-widget.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ./boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var BoardsConfigDialogProps = /** @class */ (function (_super) {
    __extends(BoardsConfigDialogProps, _super);
    function BoardsConfigDialogProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoardsConfigDialogProps = __decorate([
        inversify_1.injectable()
    ], BoardsConfigDialogProps);
    return BoardsConfigDialogProps;
}(browser_1.DialogProps));
exports.BoardsConfigDialogProps = BoardsConfigDialogProps;
var BoardsConfigDialog = /** @class */ (function (_super) {
    __extends(BoardsConfigDialog, _super);
    function BoardsConfigDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        _this.config = {};
        _this.contentNode.classList.add('select-board-dialog');
        _this.contentNode.appendChild(_this.createDescription());
        _this.appendCloseButton('CANCEL');
        _this.appendAcceptButton('OK');
        return _this;
    }
    BoardsConfigDialog.prototype.init = function () {
        var _this = this;
        this.toDispose.push(this.boardsServiceClient.onBoardsConfigChanged(function (config) {
            _this.config = config;
            _this.update();
        }));
    };
    BoardsConfigDialog.prototype.createDescription = function () {
        var e_1, _a;
        var head = document.createElement('div');
        head.classList.add('head');
        var title = document.createElement('div');
        title.textContent = 'Select Other Board & Port';
        title.classList.add('title');
        head.appendChild(title);
        var text = document.createElement('div');
        text.classList.add('text');
        head.appendChild(text);
        try {
            for (var _b = __values([
                'Select both a Board and a Port if you want to upload a sketch.',
                'If you only select a Board you will be able just to compile, but not to upload your sketch.'
            ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var paragraph = _c.value;
                var p = document.createElement('p');
                p.textContent = paragraph;
                text.appendChild(p);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return head;
    };
    BoardsConfigDialog.prototype.onAfterAttach = function (msg) {
        var _this = this;
        if (this.widget.isAttached) {
            browser_1.Widget.detach(this.widget);
        }
        browser_1.Widget.attach(this.widget, this.contentNode);
        this.toDisposeOnDetach.push(this.widget.onBoardConfigChanged(function (config) {
            _this.config = config;
            _this.update();
        }));
        _super.prototype.onAfterAttach.call(this, msg);
        this.update();
    };
    BoardsConfigDialog.prototype.onUpdateRequest = function (msg) {
        _super.prototype.onUpdateRequest.call(this, msg);
        this.widget.update();
    };
    BoardsConfigDialog.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        this.widget.activate();
    };
    BoardsConfigDialog.prototype.handleEnter = function (event) {
        if (event.target instanceof HTMLTextAreaElement) {
            return false;
        }
    };
    BoardsConfigDialog.prototype.isValid = function (value) {
        if (!value.selectedBoard) {
            if (value.selectedPort) {
                return 'Please pick a board connected to the port you have selected.';
            }
            return false;
        }
        return '';
    };
    Object.defineProperty(BoardsConfigDialog.prototype, "value", {
        get: function () {
            return this.config;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        inversify_1.inject(boards_config_dialog_widget_1.BoardsConfigDialogWidget),
        __metadata("design:type", boards_config_dialog_widget_1.BoardsConfigDialogWidget)
    ], BoardsConfigDialog.prototype, "widget", void 0);
    __decorate([
        inversify_1.inject(boards_service_1.BoardsService),
        __metadata("design:type", Object)
    ], BoardsConfigDialog.prototype, "boardService", void 0);
    __decorate([
        inversify_1.inject(boards_service_client_impl_1.BoardsServiceClientImpl),
        __metadata("design:type", boards_service_client_impl_1.BoardsServiceClientImpl)
    ], BoardsConfigDialog.prototype, "boardsServiceClient", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BoardsConfigDialog.prototype, "init", null);
    BoardsConfigDialog = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(BoardsConfigDialogProps)),
        __metadata("design:paramtypes", [BoardsConfigDialogProps])
    ], BoardsConfigDialog);
    return BoardsConfigDialog;
}(browser_1.AbstractDialog));
exports.BoardsConfigDialog = BoardsConfigDialog;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-data-menu-updater.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/boards/boards-data-menu-updater.js ***!
  \*******************************************************************************************/
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
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
exports.BoardsDataMenuUpdater = void 0;
var PQueue = __webpack_require__(/*! p-queue */ "./node_modules/arduino-ide-extension/node_modules/p-queue/index.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "./node_modules/@theia/core/lib/common/command.js");
var menu_1 = __webpack_require__(/*! @theia/core/lib/common/menu */ "./node_modules/@theia/core/lib/common/menu.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ./boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var protocol_1 = __webpack_require__(/*! ../../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
var boards_data_store_1 = __webpack_require__(/*! ./boards-data-store */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-data-store.js");
var main_menu_manager_1 = __webpack_require__(/*! ../../common/main-menu-manager */ "./node_modules/arduino-ide-extension/lib/common/main-menu-manager.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var BoardsDataMenuUpdater = /** @class */ (function () {
    function BoardsDataMenuUpdater() {
        this.queue = new PQueue({ autoStart: true, concurrency: 1 });
        this.toDisposeOnBoardChange = new disposable_1.DisposableCollection();
    }
    BoardsDataMenuUpdater.prototype.onStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.updateMenuActions(this.boardsServiceClient.boardsConfig.selectedBoard);
                this.boardsDataStore.onChanged(function () { return _this.updateMenuActions(_this.boardsServiceClient.boardsConfig.selectedBoard); });
                this.boardsServiceClient.onBoardsConfigChanged(function (_a) {
                    var selectedBoard = _a.selectedBoard;
                    return _this.updateMenuActions(selectedBoard);
                });
                return [2 /*return*/];
            });
        });
    };
    BoardsDataMenuUpdater.prototype.updateMenuActions = function (selectedBoard) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.queue.add(function () { return __awaiter(_this, void 0, void 0, function () {
                        var fqbn_1, _a, configOptions, programmers, selectedProgrammer_1, boardsConfigMenuPath, _loop_1, this_1, _b, _c, _d, label, option, values, programmersMenuPath_1, label, _loop_2, this_2, programmers_1, programmers_1_1, programmer;
                        var e_1, _e, e_2, _f;
                        var _this = this;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    this.toDisposeOnBoardChange.dispose();
                                    this.mainMenuManager.update();
                                    if (!selectedBoard) return [3 /*break*/, 2];
                                    fqbn_1 = selectedBoard.fqbn;
                                    if (!fqbn_1) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.boardsDataStore.getData(fqbn_1)];
                                case 1:
                                    _a = _g.sent(), configOptions = _a.configOptions, programmers = _a.programmers, selectedProgrammer_1 = _a.selectedProgrammer;
                                    if (configOptions.length) {
                                        boardsConfigMenuPath = __spread(arduino_menus_1.ArduinoMenus.TOOLS__BOARD_SETTINGS_GROUP, ['z01_boardsConfig']);
                                        _loop_1 = function (label, option, values) {
                                            var e_3, _a;
                                            var menuPath = __spread(boardsConfigMenuPath, ["" + option]);
                                            var commands = new Map();
                                            var _loop_3 = function (value) {
                                                var id = fqbn_1 + "-" + option + "--" + value.value;
                                                var command = { id: id };
                                                var selectedValue = value.value;
                                                var handler = {
                                                    execute: function () { return _this.boardsDataStore.selectConfigOption({ fqbn: fqbn_1, option: option, selectedValue: selectedValue }); },
                                                    isToggled: function () { return value.selected; }
                                                };
                                                commands.set(id, Object.assign(this_1.commandRegistry.registerCommand(command, handler), { label: value.label }));
                                            };
                                            try {
                                                for (var values_1 = (e_3 = void 0, __values(values)), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                                                    var value = values_1_1.value;
                                                    _loop_3(value);
                                                }
                                            }
                                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                            finally {
                                                try {
                                                    if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                                                }
                                                finally { if (e_3) throw e_3.error; }
                                            }
                                            this_1.menuRegistry.registerSubmenu(menuPath, label);
                                            this_1.toDisposeOnBoardChange.pushAll(__spread(commands.values(), [
                                                disposable_1.Disposable.create(function () { return _this.unregisterSubmenu(menuPath); })
                                            ], Array.from(commands.keys()).map(function (commandId, i) {
                                                var label = commands.get(commandId).label;
                                                _this.menuRegistry.registerMenuAction(menuPath, { commandId: commandId, order: "" + i, label: label });
                                                return disposable_1.Disposable.create(function () { return _this.menuRegistry.unregisterMenuAction(commandId); });
                                            })));
                                        };
                                        this_1 = this;
                                        try {
                                            for (_b = __values(configOptions.sort(protocol_1.ConfigOption.LABEL_COMPARATOR)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                                _d = _c.value, label = _d.label, option = _d.option, values = _d.values;
                                                _loop_1(label, option, values);
                                            }
                                        }
                                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                        finally {
                                            try {
                                                if (_c && !_c.done && (_e = _b.return)) _e.call(_b);
                                            }
                                            finally { if (e_1) throw e_1.error; }
                                        }
                                    }
                                    if (programmers.length) {
                                        programmersMenuPath_1 = __spread(arduino_menus_1.ArduinoMenus.TOOLS__BOARD_SETTINGS_GROUP, ['z02_programmers']);
                                        label = selectedProgrammer_1 ? "Programmer: \"" + selectedProgrammer_1.name + "\"" : 'Programmer';
                                        this.menuRegistry.registerSubmenu(programmersMenuPath_1, label);
                                        this.toDisposeOnBoardChange.push(disposable_1.Disposable.create(function () { return _this.unregisterSubmenu(programmersMenuPath_1); }));
                                        _loop_2 = function (programmer) {
                                            var id = programmer.id, name_1 = programmer.name;
                                            var command = { id: fqbn_1 + "-programmer--" + id };
                                            var handler = {
                                                execute: function () { return _this.boardsDataStore.selectProgrammer({ fqbn: fqbn_1, selectedProgrammer: programmer }); },
                                                isToggled: function () { return protocol_1.Programmer.equals(programmer, selectedProgrammer_1); }
                                            };
                                            this_2.menuRegistry.registerMenuAction(programmersMenuPath_1, { commandId: command.id, label: name_1 });
                                            this_2.commandRegistry.registerCommand(command, handler);
                                            this_2.toDisposeOnBoardChange.pushAll([
                                                disposable_1.Disposable.create(function () { return _this.commandRegistry.unregisterCommand(command); }),
                                                disposable_1.Disposable.create(function () { return _this.menuRegistry.unregisterMenuAction(command.id); })
                                            ]);
                                        };
                                        this_2 = this;
                                        try {
                                            for (programmers_1 = __values(programmers), programmers_1_1 = programmers_1.next(); !programmers_1_1.done; programmers_1_1 = programmers_1.next()) {
                                                programmer = programmers_1_1.value;
                                                _loop_2(programmer);
                                            }
                                        }
                                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                        finally {
                                            try {
                                                if (programmers_1_1 && !programmers_1_1.done && (_f = programmers_1.return)) _f.call(programmers_1);
                                            }
                                            finally { if (e_2) throw e_2.error; }
                                        }
                                    }
                                    this.mainMenuManager.update();
                                    _g.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    BoardsDataMenuUpdater.prototype.unregisterSubmenu = function (menuPath) {
        if (menuPath.length < 2) {
            throw new Error("Expected at least two item as a menu-path. Got " + JSON.stringify(menuPath) + " instead.");
        }
        var toRemove = menuPath[menuPath.length - 1];
        var parentMenuPath = menuPath.slice(0, menuPath.length - 1);
        // This is unsafe. Calling `getMenu` with a non-existing menu-path will result in a new menu creation.
        // https://github.com/eclipse-theia/theia/issues/7300
        var parent = this.menuRegistry.getMenu(parentMenuPath);
        var index = parent.children.findIndex(function (_a) {
            var id = _a.id;
            return id === toRemove;
        });
        if (index === -1) {
            throw new Error("Could not find menu with menu-path: " + JSON.stringify(menuPath) + ".");
        }
        parent.children.splice(index, 1);
    };
    __decorate([
        inversify_1.inject(command_1.CommandRegistry),
        __metadata("design:type", command_1.CommandRegistry)
    ], BoardsDataMenuUpdater.prototype, "commandRegistry", void 0);
    __decorate([
        inversify_1.inject(menu_1.MenuModelRegistry),
        __metadata("design:type", menu_1.MenuModelRegistry)
    ], BoardsDataMenuUpdater.prototype, "menuRegistry", void 0);
    __decorate([
        inversify_1.inject(main_menu_manager_1.MainMenuManager),
        __metadata("design:type", Object)
    ], BoardsDataMenuUpdater.prototype, "mainMenuManager", void 0);
    __decorate([
        inversify_1.inject(boards_data_store_1.BoardsDataStore),
        __metadata("design:type", boards_data_store_1.BoardsDataStore)
    ], BoardsDataMenuUpdater.prototype, "boardsDataStore", void 0);
    __decorate([
        inversify_1.inject(boards_service_client_impl_1.BoardsServiceClientImpl),
        __metadata("design:type", boards_service_client_impl_1.BoardsServiceClientImpl)
    ], BoardsDataMenuUpdater.prototype, "boardsServiceClient", void 0);
    BoardsDataMenuUpdater = __decorate([
        inversify_1.injectable()
    ], BoardsDataMenuUpdater);
    return BoardsDataMenuUpdater;
}());
exports.BoardsDataMenuUpdater = BoardsDataMenuUpdater;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-toolbar-item.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/boards/boards-toolbar-item.js ***!
  \**************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsToolBarItem = exports.BoardsDropDown = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var protocol_1 = __webpack_require__(/*! ../../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
var boards_config_1 = __webpack_require__(/*! ./boards-config */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config.js");
var arduino_commands_1 = __webpack_require__(/*! ../arduino-commands */ "./node_modules/arduino-ide-extension/lib/browser/arduino-commands.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ./boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var BoardsDropDown = /** @class */ (function (_super) {
    __extends(BoardsDropDown, _super);
    function BoardsDropDown(props) {
        var _this = _super.call(this, props) || this;
        var list = document.getElementById('boards-dropdown-container');
        if (!list) {
            list = document.createElement('div');
            list.id = 'boards-dropdown-container';
            document.body.appendChild(list);
            _this.dropdownElement = list;
        }
        return _this;
    }
    BoardsDropDown.prototype.render = function () {
        return ReactDOM.createPortal(this.renderNode(), this.dropdownElement);
    };
    BoardsDropDown.prototype.renderNode = function () {
        var _this = this;
        var _a = this.props, coords = _a.coords, items = _a.items;
        if (coords === 'hidden') {
            return '';
        }
        return React.createElement("div", { className: 'arduino-boards-dropdown-list', style: __assign({ position: 'absolute' }, coords) },
            this.renderItem({
                label: 'Select Other Board & Port',
                onClick: function () { return _this.props.openBoardsConfig(); }
            }),
            items.map(function (_a) {
                var name = _a.name, port = _a.port, selected = _a.selected, onClick = _a.onClick;
                return ({ label: name + " at " + protocol_1.Port.toString(port), selected: selected, onClick: onClick });
            }).map(this.renderItem));
    };
    BoardsDropDown.prototype.renderItem = function (_a) {
        var label = _a.label, selected = _a.selected, onClick = _a.onClick;
        return React.createElement("div", { key: label, className: "arduino-boards-dropdown-item " + (selected ? 'selected' : ''), onClick: onClick },
            React.createElement("div", null, label),
            selected ? React.createElement("span", { className: 'fa fa-check' }) : '');
    };
    return BoardsDropDown;
}(React.Component));
exports.BoardsDropDown = BoardsDropDown;
var BoardsToolBarItem = /** @class */ (function (_super) {
    __extends(BoardsToolBarItem, _super);
    function BoardsToolBarItem(props) {
        var _this = _super.call(this, props) || this;
        _this.toDispose = new disposable_1.DisposableCollection();
        _this.show = function (event) {
            var element = event.currentTarget;
            if (element instanceof HTMLElement) {
                if (_this.state.coords === 'hidden') {
                    var rect = element.getBoundingClientRect();
                    _this.setState({
                        coords: {
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                            paddingTop: rect.height
                        }
                    });
                }
                else {
                    _this.setState({ coords: 'hidden' });
                }
            }
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
        };
        _this.openDialog = function () {
            _this.props.commands.executeCommand(arduino_commands_1.ArduinoCommands.OPEN_BOARDS_DIALOG.id);
            _this.setState({ coords: 'hidden' });
        };
        var availableBoards = props.boardsServiceClient.availableBoards;
        _this.state = {
            availableBoards: availableBoards,
            coords: 'hidden'
        };
        document.addEventListener('click', function () {
            _this.setState({ coords: 'hidden' });
        });
        return _this;
    }
    BoardsToolBarItem.prototype.componentDidMount = function () {
        var _this = this;
        this.props.boardsServiceClient.onAvailableBoardsChanged(function (availableBoards) { return _this.setState({ availableBoards: availableBoards }); });
    };
    BoardsToolBarItem.prototype.componentWillUnmount = function () {
        this.toDispose.dispose();
    };
    BoardsToolBarItem.prototype.render = function () {
        var _this = this;
        var _a = this.state, coords = _a.coords, availableBoards = _a.availableBoards;
        var boardsConfig = this.props.boardsServiceClient.boardsConfig;
        var title = boards_config_1.BoardsConfig.Config.toString(boardsConfig, { default: 'no board selected' });
        var decorator = (function () {
            var selectedBoard = availableBoards.find(function (_a) {
                var selected = _a.selected;
                return selected;
            });
            if (!selectedBoard || !selectedBoard.port) {
                return 'fa fa-times notAttached';
            }
            if (selectedBoard.state === boards_service_client_impl_1.AvailableBoard.State.guessed) {
                return 'fa fa-exclamation-triangle guessed';
            }
            return '';
        })();
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'arduino-boards-toolbar-item-container' },
                React.createElement("div", { className: 'arduino-boards-toolbar-item', title: title },
                    React.createElement("div", { className: 'inner-container', onClick: this.show },
                        React.createElement("span", { className: decorator }),
                        React.createElement("div", { className: 'label noWrapInfo' },
                            React.createElement("div", { className: 'noWrapInfo noselect' }, title)),
                        React.createElement("span", { className: 'fa fa-caret-down caret' })))),
            React.createElement(BoardsDropDown, { coords: coords, items: availableBoards.filter(boards_service_client_impl_1.AvailableBoard.hasPort).map(function (board) { return (__assign(__assign({}, board), { onClick: function () {
                        if (board.state === boards_service_client_impl_1.AvailableBoard.State.incomplete) {
                            _this.props.boardsServiceClient.boardsConfig = {
                                selectedPort: board.port
                            };
                            _this.openDialog();
                        }
                        else {
                            _this.props.boardsServiceClient.boardsConfig = {
                                selectedBoard: board,
                                selectedPort: board.port
                            };
                        }
                    } })); }), openBoardsConfig: this.openDialog }));
    };
    return BoardsToolBarItem;
}(React.Component));
exports.BoardsToolBarItem = BoardsToolBarItem;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-widget-frontend-contribution.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/boards/boards-widget-frontend-contribution.js ***!
  \******************************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsListWidgetFrontendContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var boards_list_widget_1 = __webpack_require__(/*! ./boards-list-widget */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-list-widget.js");
var list_widget_frontend_contribution_1 = __webpack_require__(/*! ../widgets/component-list/list-widget-frontend-contribution */ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-widget-frontend-contribution.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var BoardsListWidgetFrontendContribution = /** @class */ (function (_super) {
    __extends(BoardsListWidgetFrontendContribution, _super);
    function BoardsListWidgetFrontendContribution() {
        return _super.call(this, {
            widgetId: boards_list_widget_1.BoardsListWidget.WIDGET_ID,
            widgetName: boards_list_widget_1.BoardsListWidget.WIDGET_LABEL,
            defaultWidgetOptions: {
                area: 'left',
                rank: 600
            },
            toggleCommandId: BoardsListWidgetFrontendContribution_1.OPEN_MANAGER,
            toggleKeybinding: 'CtrlCmd+Shift+B'
        }) || this;
    }
    BoardsListWidgetFrontendContribution_1 = BoardsListWidgetFrontendContribution;
    BoardsListWidgetFrontendContribution.prototype.initializeLayout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.openView();
                return [2 /*return*/];
            });
        });
    };
    BoardsListWidgetFrontendContribution.prototype.registerMenus = function (menus) {
        if (this.toggleCommand) {
            menus.registerMenuAction(arduino_menus_1.ArduinoMenus.TOOLS__MAIN_GROUP, {
                commandId: this.toggleCommand.id,
                label: 'Boards Manager...',
                order: '4'
            });
        }
    };
    var BoardsListWidgetFrontendContribution_1;
    BoardsListWidgetFrontendContribution.OPEN_MANAGER = boards_list_widget_1.BoardsListWidget.WIDGET_ID + ":toggle";
    BoardsListWidgetFrontendContribution = BoardsListWidgetFrontendContribution_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], BoardsListWidgetFrontendContribution);
    return BoardsListWidgetFrontendContribution;
}(list_widget_frontend_contribution_1.ListWidgetFrontendContribution));
exports.BoardsListWidgetFrontendContribution = BoardsListWidgetFrontendContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/config-service-client-impl.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/config-service-client-impl.js ***!
  \**************************************************************************************/
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
exports.ConfigServiceClientImpl = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var logger_1 = __webpack_require__(/*! @theia/core/lib/common/logger */ "./node_modules/@theia/core/lib/common/logger.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "./node_modules/@theia/core/lib/common/command.js");
var message_service_1 = __webpack_require__(/*! @theia/core/lib/common/message-service */ "./node_modules/@theia/core/lib/common/message-service.js");
var settings_1 = __webpack_require__(/*! ./contributions/settings */ "./node_modules/arduino-ide-extension/lib/browser/contributions/settings.js");
var ConfigServiceClientImpl = /** @class */ (function () {
    function ConfigServiceClientImpl() {
        this.onConfigChangedEmitter = new event_1.Emitter();
    }
    ConfigServiceClientImpl.prototype.notifyConfigChanged = function (config) {
        this.invalidConfigPopup = undefined;
        this.info("The CLI configuration has been successfully reloaded.");
        this.onConfigChangedEmitter.fire(config);
    };
    ConfigServiceClientImpl.prototype.notifyInvalidConfig = function () {
        var _this = this;
        if (!this.invalidConfigPopup) {
            this.invalidConfigPopup = this.messageService.error("Your CLI configuration is invalid. Do you want to correct it now?", 'No', 'Yes')
                .then(function (answer) {
                if (answer === 'Yes') {
                    _this.commandService.executeCommand(settings_1.Settings.Commands.OPEN_CLI_CONFIG.id);
                }
                _this.invalidConfigPopup = undefined;
            });
        }
    };
    Object.defineProperty(ConfigServiceClientImpl.prototype, "onConfigChanged", {
        get: function () {
            return this.onConfigChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    ConfigServiceClientImpl.prototype.info = function (message) {
        this.messageService.info(message, { timeout: 3000 });
        this.logger.info(message);
    };
    __decorate([
        inversify_1.inject(command_1.CommandService),
        __metadata("design:type", Object)
    ], ConfigServiceClientImpl.prototype, "commandService", void 0);
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], ConfigServiceClientImpl.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], ConfigServiceClientImpl.prototype, "messageService", void 0);
    ConfigServiceClientImpl = __decorate([
        inversify_1.injectable()
    ], ConfigServiceClientImpl);
    return ConfigServiceClientImpl;
}());
exports.ConfigServiceClientImpl = ConfigServiceClientImpl;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/close-sketch.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/close-sketch.js ***!
  \**************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseSketch = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var electron_1 = __webpack_require__(/*! electron */ "electron");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var save_as_sketch_1 = __webpack_require__(/*! ./save-as-sketch */ "./node_modules/arduino-ide-extension/lib/browser/contributions/save-as-sketch.js");
var browser_1 = __webpack_require__(/*! @theia/editor/lib/browser */ "./node_modules/@theia/editor/lib/browser/index.js");
var monaco_editor_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-editor */ "./node_modules/@theia/monaco/lib/browser/monaco-editor.js");
var CloseSketch = /** @class */ (function (_super) {
    __extends(CloseSketch, _super);
    function CloseSketch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloseSketch_1 = CloseSketch;
    CloseSketch.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(CloseSketch_1.Commands.CLOSE_SKETCH, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var sketch, isTemp, uri, _a, response, saved;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.sketchServiceClient.currentSketch()];
                        case 1:
                            sketch = _b.sent();
                            if (!sketch) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.sketchService.isTemp(sketch)];
                        case 2:
                            isTemp = _b.sent();
                            return [4 /*yield*/, this.sketchServiceClient.currentSketchFile()];
                        case 3:
                            uri = _b.sent();
                            if (!uri) {
                                return [2 /*return*/];
                            }
                            _a = isTemp;
                            if (!_a) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.wasTouched(uri)];
                        case 4:
                            _a = (_b.sent());
                            _b.label = 5;
                        case 5:
                            if (!_a) return [3 /*break*/, 8];
                            return [4 /*yield*/, electron_1.remote.dialog.showMessageBox({
                                    type: 'question',
                                    buttons: ["Don't Save", 'Cancel', 'Save'],
                                    message: 'Do you want to save changes to this sketch before closing?',
                                    detail: "If you don't save, your changes will be lost."
                                })];
                        case 6:
                            response = (_b.sent()).response;
                            if (response === 1) { // Cancel
                                return [2 /*return*/];
                            }
                            if (!(response === 2)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.commandService.executeCommand(save_as_sketch_1.SaveAsSketch.Commands.SAVE_AS_SKETCH.id, { openAfterMove: false, execOnlyIfTemp: true })];
                        case 7:
                            saved = _b.sent();
                            if (!saved) { // If it was not saved, do bail the close.
                                return [2 /*return*/];
                            }
                            _b.label = 8;
                        case 8:
                            window.close();
                            return [2 /*return*/];
                    }
                });
            }); }
        });
    };
    CloseSketch.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.FILE__SKETCH_GROUP, {
            commandId: CloseSketch_1.Commands.CLOSE_SKETCH.id,
            label: 'Close',
            order: '5'
        });
    };
    CloseSketch.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: CloseSketch_1.Commands.CLOSE_SKETCH.id,
            keybinding: 'CtrlCmd+W'
        });
    };
    /**
     * If the file was ever touched/modified. We get this based on the `version` of the monaco model.
     */
    CloseSketch.prototype.wasTouched = function (uri) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var editorWidget, editor, versionId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.editorManager.getByUri(new contribution_1.URI(uri))];
                    case 1:
                        editorWidget = _b.sent();
                        if (editorWidget) {
                            editor = editorWidget.editor;
                            if (editor instanceof monaco_editor_1.MonacoEditor) {
                                versionId = (_a = editor.getControl().getModel()) === null || _a === void 0 ? void 0 : _a.getVersionId();
                                if (Number.isInteger(versionId) && versionId > 1) {
                                    return [2 /*return*/, true];
                                }
                            }
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    var CloseSketch_1;
    __decorate([
        inversify_1.inject(browser_1.EditorManager),
        __metadata("design:type", browser_1.EditorManager)
    ], CloseSketch.prototype, "editorManager", void 0);
    CloseSketch = CloseSketch_1 = __decorate([
        inversify_1.injectable()
    ], CloseSketch);
    return CloseSketch;
}(contribution_1.SketchContribution));
exports.CloseSketch = CloseSketch;
(function (CloseSketch) {
    var Commands;
    (function (Commands) {
        Commands.CLOSE_SKETCH = {
            id: 'arduino-close-sketch'
        };
    })(Commands = CloseSketch.Commands || (CloseSketch.Commands = {}));
})(CloseSketch = exports.CloseSketch || (exports.CloseSketch = {}));
exports.CloseSketch = CloseSketch;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js ***!
  \**************************************************************************************/
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
exports.SketchContribution = exports.Contribution = exports.open = exports.Sketch = exports.URI = exports.TabBarToolbarRegistry = exports.KeybindingRegistry = exports.MenuModelRegistry = exports.CommandRegistry = exports.Command = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
exports.URI = uri_1.default;
var logger_1 = __webpack_require__(/*! @theia/core/lib/common/logger */ "./node_modules/@theia/core/lib/common/logger.js");
var common_1 = __webpack_require__(/*! @theia/filesystem/lib/common */ "./node_modules/@theia/filesystem/lib/common/index.js");
var label_provider_1 = __webpack_require__(/*! @theia/core/lib/browser/label-provider */ "./node_modules/@theia/core/lib/browser/label-provider.js");
var message_service_1 = __webpack_require__(/*! @theia/core/lib/common/message-service */ "./node_modules/@theia/core/lib/common/message-service.js");
var workspace_service_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-service */ "./node_modules/@theia/workspace/lib/browser/workspace-service.js");
var opener_service_1 = __webpack_require__(/*! @theia/core/lib/browser/opener-service */ "./node_modules/@theia/core/lib/browser/opener-service.js");
Object.defineProperty(exports, "open", { enumerable: true, get: function () { return opener_service_1.open; } });
var menu_1 = __webpack_require__(/*! @theia/core/lib/common/menu */ "./node_modules/@theia/core/lib/common/menu.js");
Object.defineProperty(exports, "MenuModelRegistry", { enumerable: true, get: function () { return menu_1.MenuModelRegistry; } });
var keybinding_1 = __webpack_require__(/*! @theia/core/lib/browser/keybinding */ "./node_modules/@theia/core/lib/browser/keybinding.js");
Object.defineProperty(exports, "KeybindingRegistry", { enumerable: true, get: function () { return keybinding_1.KeybindingRegistry; } });
var tab_bar_toolbar_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/tab-bar-toolbar */ "./node_modules/@theia/core/lib/browser/shell/tab-bar-toolbar.js");
Object.defineProperty(exports, "TabBarToolbarRegistry", { enumerable: true, get: function () { return tab_bar_toolbar_1.TabBarToolbarRegistry; } });
var command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "./node_modules/@theia/core/lib/common/command.js");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return command_1.Command; } });
Object.defineProperty(exports, "CommandRegistry", { enumerable: true, get: function () { return command_1.CommandRegistry; } });
var editor_mode_1 = __webpack_require__(/*! ../editor-mode */ "./node_modules/arduino-ide-extension/lib/browser/editor-mode.js");
var sketches_service_client_impl_1 = __webpack_require__(/*! ../../common/protocol/sketches-service-client-impl */ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service-client-impl.js");
var protocol_1 = __webpack_require__(/*! ../../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
Object.defineProperty(exports, "Sketch", { enumerable: true, get: function () { return protocol_1.Sketch; } });
var Contribution = /** @class */ (function () {
    function Contribution() {
    }
    Contribution.prototype.registerCommands = function (registry) {
    };
    Contribution.prototype.registerMenus = function (registry) {
    };
    Contribution.prototype.registerKeybindings = function (registry) {
    };
    Contribution.prototype.registerToolbarItems = function (registry) {
    };
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], Contribution.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], Contribution.prototype, "messageService", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandService),
        __metadata("design:type", Object)
    ], Contribution.prototype, "commandService", void 0);
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], Contribution.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(editor_mode_1.EditorMode),
        __metadata("design:type", editor_mode_1.EditorMode)
    ], Contribution.prototype, "editorMode", void 0);
    __decorate([
        inversify_1.inject(label_provider_1.LabelProvider),
        __metadata("design:type", label_provider_1.LabelProvider)
    ], Contribution.prototype, "labelProvider", void 0);
    Contribution = __decorate([
        inversify_1.injectable()
    ], Contribution);
    return Contribution;
}());
exports.Contribution = Contribution;
var SketchContribution = /** @class */ (function (_super) {
    __extends(SketchContribution, _super);
    function SketchContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        inversify_1.inject(common_1.FileSystem),
        __metadata("design:type", Object)
    ], SketchContribution.prototype, "fileSystem", void 0);
    __decorate([
        inversify_1.inject(protocol_1.FileSystemExt),
        __metadata("design:type", Object)
    ], SketchContribution.prototype, "fileSystemExt", void 0);
    __decorate([
        inversify_1.inject(protocol_1.ConfigService),
        __metadata("design:type", Object)
    ], SketchContribution.prototype, "configService", void 0);
    __decorate([
        inversify_1.inject(protocol_1.SketchesService),
        __metadata("design:type", Object)
    ], SketchContribution.prototype, "sketchService", void 0);
    __decorate([
        inversify_1.inject(opener_service_1.OpenerService),
        __metadata("design:type", Object)
    ], SketchContribution.prototype, "openerService", void 0);
    __decorate([
        inversify_1.inject(sketches_service_client_impl_1.SketchesServiceClientImpl),
        __metadata("design:type", sketches_service_client_impl_1.SketchesServiceClientImpl)
    ], SketchContribution.prototype, "sketchServiceClient", void 0);
    SketchContribution = __decorate([
        inversify_1.injectable()
    ], SketchContribution);
    return SketchContribution;
}(Contribution));
exports.SketchContribution = SketchContribution;
(function (Contribution) {
    function configure(bind, serviceIdentifier) {
        bind(serviceIdentifier).toSelf().inSingletonScope();
        bind(command_1.CommandContribution).toService(serviceIdentifier);
        bind(menu_1.MenuContribution).toService(serviceIdentifier);
        bind(keybinding_1.KeybindingContribution).toService(serviceIdentifier);
        bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(serviceIdentifier);
    }
    Contribution.configure = configure;
})(Contribution = exports.Contribution || (exports.Contribution = {}));
exports.Contribution = Contribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/edit-contributions.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/edit-contributions.js ***!
  \********************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditContributions = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var common_frontend_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/common-frontend-contribution */ "./node_modules/@theia/core/lib/browser/common-frontend-contribution.js");
var clipboard_service_1 = __webpack_require__(/*! @theia/core/lib/browser/clipboard-service */ "./node_modules/@theia/core/lib/browser/clipboard-service.js");
var preference_service_1 = __webpack_require__(/*! @theia/core/lib/browser/preferences/preference-service */ "./node_modules/@theia/core/lib/browser/preferences/preference-service.js");
var monaco_editor_service_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-editor-service */ "./node_modules/@theia/monaco/lib/browser/monaco-editor-service.js");
var editor_preferences_1 = __webpack_require__(/*! @theia/editor/lib/browser/editor-preferences */ "./node_modules/@theia/editor/lib/browser/editor-preferences.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
// TODO: [macOS]: to remove `Start Dictation...` and `Emoji & Symbol` see this thread: https://github.com/electron/electron/issues/8283#issuecomment-269522072
// Depends on https://github.com/eclipse-theia/theia/pull/7964
var EditContributions = /** @class */ (function (_super) {
    __extends(EditContributions, _super);
    function EditContributions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditContributions_1 = EditContributions;
    EditContributions.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(EditContributions_1.Commands.GO_TO_LINE, { execute: function () { return _this.run('editor.action.gotoLine'); } });
        registry.registerCommand(EditContributions_1.Commands.TOGGLE_COMMENT, { execute: function () { return _this.run('editor.action.commentLine'); } });
        registry.registerCommand(EditContributions_1.Commands.INDENT_LINES, { execute: function () { return _this.run('editor.action.indentLines'); } });
        registry.registerCommand(EditContributions_1.Commands.OUTDENT_LINES, { execute: function () { return _this.run('editor.action.outdentLines'); } });
        registry.registerCommand(EditContributions_1.Commands.FIND, { execute: function () { return _this.run('actions.find'); } });
        registry.registerCommand(EditContributions_1.Commands.FIND_NEXT, { execute: function () { return _this.run('actions.findWithSelection'); } });
        registry.registerCommand(EditContributions_1.Commands.FIND_PREVIOUS, { execute: function () { return _this.run('editor.action.nextMatchFindAction'); } });
        registry.registerCommand(EditContributions_1.Commands.USE_FOR_FIND, { execute: function () { return _this.run('editor.action.previousSelectionMatchFindAction'); } });
        registry.registerCommand(EditContributions_1.Commands.INCREASE_FONT_SIZE, {
            execute: function () { return _this.preferences.set('editor.fontSize', _this.preferences.get('editor.fontSize', editor_preferences_1.EDITOR_FONT_DEFAULTS.fontSize) + 1); }
        });
        registry.registerCommand(EditContributions_1.Commands.DECREASE_FONT_SIZE, {
            execute: function () { return _this.preferences.set('editor.fontSize', _this.preferences.get('editor.fontSize', editor_preferences_1.EDITOR_FONT_DEFAULTS.fontSize) - 1); }
        });
        /* Tools */ registry.registerCommand(EditContributions_1.Commands.AUTO_FORMAT, { execute: function () { return _this.run('editor.action.formatDocument'); } });
        registry.registerCommand(EditContributions_1.Commands.COPY_FOR_FORUM, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.currentValue()];
                        case 1:
                            value = _a.sent();
                            if (value !== undefined) {
                                this.clipboardService.writeText("[code]\n" + value + "\n[/code]");
                            }
                            return [2 /*return*/];
                    }
                });
            }); }
        });
        registry.registerCommand(EditContributions_1.Commands.COPY_FOR_GITHUB, {
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.currentValue()];
                        case 1:
                            value = _a.sent();
                            if (value !== undefined) {
                                this.clipboardService.writeText("```cpp\n" + value + "\n```");
                            }
                            return [2 /*return*/];
                    }
                });
            }); }
        });
    };
    EditContributions.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__TEXT_CONTROL_GROUP, {
            commandId: common_frontend_contribution_1.CommonCommands.CUT.id,
            order: '0'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__TEXT_CONTROL_GROUP, {
            commandId: common_frontend_contribution_1.CommonCommands.COPY.id,
            order: '1'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__TEXT_CONTROL_GROUP, {
            commandId: EditContributions_1.Commands.COPY_FOR_FORUM.id,
            label: 'Copy for Forum',
            order: '2'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__TEXT_CONTROL_GROUP, {
            commandId: EditContributions_1.Commands.COPY_FOR_GITHUB.id,
            label: 'Copy for GitHub',
            order: '3'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__TEXT_CONTROL_GROUP, {
            commandId: common_frontend_contribution_1.CommonCommands.PASTE.id,
            order: '4'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__TEXT_CONTROL_GROUP, {
            commandId: common_frontend_contribution_1.CommonCommands.SELECT_ALL.id,
            order: '5'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__TEXT_CONTROL_GROUP, {
            commandId: EditContributions_1.Commands.GO_TO_LINE.id,
            label: 'Go to Line...',
            order: '6'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__CODE_CONTROL_GROUP, {
            commandId: EditContributions_1.Commands.TOGGLE_COMMENT.id,
            label: 'Comment/Uncomment',
            order: '0'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__CODE_CONTROL_GROUP, {
            commandId: EditContributions_1.Commands.INDENT_LINES.id,
            label: 'Increase Indent',
            order: '1'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__CODE_CONTROL_GROUP, {
            commandId: EditContributions_1.Commands.OUTDENT_LINES.id,
            label: 'Decrease Indent',
            order: '2'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__FONT_CONTROL_GROUP, {
            commandId: EditContributions_1.Commands.INCREASE_FONT_SIZE.id,
            label: 'Increase Font Size',
            order: '0'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__FONT_CONTROL_GROUP, {
            commandId: EditContributions_1.Commands.DECREASE_FONT_SIZE.id,
            label: 'Decrease Font Size',
            order: '1'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__FIND_GROUP, {
            commandId: EditContributions_1.Commands.FIND.id,
            label: 'Find',
            order: '0'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__FIND_GROUP, {
            commandId: EditContributions_1.Commands.FIND_NEXT.id,
            label: 'Find Next',
            order: '1'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__FIND_GROUP, {
            commandId: EditContributions_1.Commands.FIND_PREVIOUS.id,
            label: 'Find Previous',
            order: '2'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.EDIT__FIND_GROUP, {
            commandId: EditContributions_1.Commands.USE_FOR_FIND.id,
            label: 'Use Selection for Find',
            order: '3'
        });
        // `Tools`
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.TOOLS__MAIN_GROUP, {
            commandId: EditContributions_1.Commands.AUTO_FORMAT.id,
            label: 'Auto Format',
            order: '0'
        });
    };
    EditContributions.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: EditContributions_1.Commands.COPY_FOR_FORUM.id,
            keybinding: 'CtrlCmd+Shift+C',
            when: 'editorFocus'
        });
        registry.registerKeybinding({
            command: EditContributions_1.Commands.COPY_FOR_GITHUB.id,
            keybinding: 'CtrlCmd+Alt+C',
            when: 'editorFocus'
        });
        registry.registerKeybinding({
            command: EditContributions_1.Commands.GO_TO_LINE.id,
            keybinding: 'CtrlCmd+L',
            when: 'editorFocus'
        });
        registry.registerKeybinding({
            command: EditContributions_1.Commands.TOGGLE_COMMENT.id,
            keybinding: 'CtrlCmd+/',
            when: 'editorFocus'
        });
        registry.registerKeybinding({
            command: EditContributions_1.Commands.INCREASE_FONT_SIZE.id,
            keybinding: 'CtrlCmd+='
        });
        registry.registerKeybinding({
            command: EditContributions_1.Commands.DECREASE_FONT_SIZE.id,
            keybinding: 'CtrlCmd+-'
        });
        registry.registerKeybinding({
            command: EditContributions_1.Commands.FIND.id,
            keybinding: 'CtrlCmd+F'
        });
        registry.registerKeybinding({
            command: EditContributions_1.Commands.FIND_NEXT.id,
            keybinding: 'CtrlCmd+G'
        });
        registry.registerKeybinding({
            command: EditContributions_1.Commands.FIND_PREVIOUS.id,
            keybinding: 'CtrlCmd+Shift+G'
        });
        registry.registerKeybinding({
            command: EditContributions_1.Commands.USE_FOR_FIND.id,
            keybinding: 'CtrlCmd+E'
        });
        // `Tools`
        registry.registerKeybinding({
            command: EditContributions_1.Commands.AUTO_FORMAT.id,
            keybinding: 'CtrlCmd+T'
        });
    };
    EditContributions.prototype.current = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.codeEditorService.getFocusedCodeEditor() || this.codeEditorService.getActiveCodeEditor()];
            });
        });
    };
    EditContributions.prototype.currentValue = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentEditor, selection;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.current()];
                    case 1:
                        currentEditor = _b.sent();
                        if (currentEditor) {
                            selection = currentEditor.getSelection();
                            if (!selection || selection.isEmpty()) {
                                return [2 /*return*/, currentEditor.getValue()];
                            }
                            return [2 /*return*/, (_a = currentEditor.getModel()) === null || _a === void 0 ? void 0 : _a.getValueInRange(selection)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    EditContributions.prototype.run = function (commandId) {
        return __awaiter(this, void 0, void 0, function () {
            var editor, action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.current()];
                    case 1:
                        editor = _a.sent();
                        if (editor) {
                            action = editor.getAction(commandId);
                            if (action) {
                                return [2 /*return*/, action.run()];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    var EditContributions_1;
    __decorate([
        inversify_1.inject(monaco_editor_service_1.MonacoEditorService),
        __metadata("design:type", monaco_editor_service_1.MonacoEditorService)
    ], EditContributions.prototype, "codeEditorService", void 0);
    __decorate([
        inversify_1.inject(clipboard_service_1.ClipboardService),
        __metadata("design:type", Object)
    ], EditContributions.prototype, "clipboardService", void 0);
    __decorate([
        inversify_1.inject(preference_service_1.PreferenceService),
        __metadata("design:type", Object)
    ], EditContributions.prototype, "preferences", void 0);
    EditContributions = EditContributions_1 = __decorate([
        inversify_1.injectable()
    ], EditContributions);
    return EditContributions;
}(contribution_1.Contribution));
exports.EditContributions = EditContributions;
(function (EditContributions) {
    var Commands;
    (function (Commands) {
        Commands.COPY_FOR_FORUM = {
            id: 'arduino-copy-for-forum'
        };
        Commands.COPY_FOR_GITHUB = {
            id: 'arduino-copy-for-github'
        };
        Commands.GO_TO_LINE = {
            id: 'arduino-go-to-line'
        };
        Commands.TOGGLE_COMMENT = {
            id: 'arduino-toggle-comment'
        };
        Commands.INDENT_LINES = {
            id: 'arduino-indent-lines'
        };
        Commands.OUTDENT_LINES = {
            id: 'arduino-outdent-lines'
        };
        Commands.FIND = {
            id: 'arduino-find'
        };
        Commands.FIND_NEXT = {
            id: 'arduino-find-next'
        };
        Commands.FIND_PREVIOUS = {
            id: 'arduino-find-previous'
        };
        Commands.USE_FOR_FIND = {
            id: 'arduino-for-find'
        };
        Commands.INCREASE_FONT_SIZE = {
            id: 'arduino-increase-font-size'
        };
        Commands.DECREASE_FONT_SIZE = {
            id: 'arduino-decrease-font-size'
        };
        Commands.AUTO_FORMAT = {
            id: 'arduino-auto-format' // `Auto Format` should belong to `Tool`.
        };
    })(Commands = EditContributions.Commands || (EditContributions.Commands = {}));
})(EditContributions = exports.EditContributions || (exports.EditContributions = {}));
exports.EditContributions = EditContributions;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/new-sketch.js":
/*!************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/new-sketch.js ***!
  \************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewSketch = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var arduino_toolbar_1 = __webpack_require__(/*! ../toolbar/arduino-toolbar */ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var NewSketch = /** @class */ (function (_super) {
    __extends(NewSketch, _super);
    function NewSketch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewSketch_1 = NewSketch;
    NewSketch.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(NewSketch_1.Commands.NEW_SKETCH, {
            execute: function () { return _this.newSketch(); }
        });
        registry.registerCommand(NewSketch_1.Commands.NEW_SKETCH__TOOLBAR, {
            isVisible: function (widget) { return arduino_toolbar_1.ArduinoToolbar.is(widget) && widget.side === 'left'; },
            execute: function () { return registry.executeCommand(NewSketch_1.Commands.NEW_SKETCH.id); }
        });
    };
    NewSketch.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.FILE__SKETCH_GROUP, {
            commandId: NewSketch_1.Commands.NEW_SKETCH.id,
            label: 'New',
            order: '0'
        });
    };
    NewSketch.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: NewSketch_1.Commands.NEW_SKETCH.id,
            keybinding: 'CtrlCmd+N'
        });
    };
    NewSketch.prototype.registerToolbarItems = function (registry) {
        registry.registerItem({
            id: NewSketch_1.Commands.NEW_SKETCH__TOOLBAR.id,
            command: NewSketch_1.Commands.NEW_SKETCH__TOOLBAR.id,
            tooltip: 'New',
            priority: 3
        });
    };
    NewSketch.prototype.newSketch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sketch, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.sketchService.createNewSketch()];
                    case 1:
                        sketch = _a.sent();
                        this.workspaceService.open(new contribution_1.URI(sketch.uri));
                        return [3 /*break*/, 4];
                    case 2:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this.messageService.error(e_1.toString())];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var NewSketch_1;
    NewSketch = NewSketch_1 = __decorate([
        inversify_1.injectable()
    ], NewSketch);
    return NewSketch;
}(contribution_1.SketchContribution));
exports.NewSketch = NewSketch;
(function (NewSketch) {
    var Commands;
    (function (Commands) {
        Commands.NEW_SKETCH = {
            id: 'arduino-new-sketch'
        };
        Commands.NEW_SKETCH__TOOLBAR = {
            id: 'arduino-new-sketch--toolbar'
        };
    })(Commands = NewSketch.Commands || (NewSketch.Commands = {}));
})(NewSketch = exports.NewSketch || (exports.NewSketch = {}));
exports.NewSketch = NewSketch;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/open-sketch-external.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/open-sketch-external.js ***!
  \**********************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSketchExternal = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var electron_1 = __webpack_require__(/*! electron */ "electron");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var OpenSketchExternal = /** @class */ (function (_super) {
    __extends(OpenSketchExternal, _super);
    function OpenSketchExternal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpenSketchExternal_1 = OpenSketchExternal;
    OpenSketchExternal.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(OpenSketchExternal_1.Commands.OPEN_EXTERNAL, {
            execute: function () { return _this.openExternal(); }
        });
    };
    OpenSketchExternal.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH__UTILS_GROUP, {
            commandId: OpenSketchExternal_1.Commands.OPEN_EXTERNAL.id,
            label: 'Show Sketch Folder',
            order: '0'
        });
    };
    OpenSketchExternal.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: OpenSketchExternal_1.Commands.OPEN_EXTERNAL.id,
            keybinding: 'CtrlCmd+Alt+K'
        });
    };
    OpenSketchExternal.prototype.openExternal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uri, exists, fsPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sketchServiceClient.currentSketchFile()];
                    case 1:
                        uri = _a.sent();
                        if (!uri) return [3 /*break*/, 3];
                        exists = this.fileSystem.exists(uri);
                        if (!exists) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fileSystem.getFsPath(uri)];
                    case 2:
                        fsPath = _a.sent();
                        if (fsPath) {
                            electron_1.remote.shell.showItemInFolder(fsPath);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var OpenSketchExternal_1;
    OpenSketchExternal = OpenSketchExternal_1 = __decorate([
        inversify_1.injectable()
    ], OpenSketchExternal);
    return OpenSketchExternal;
}(contribution_1.SketchContribution));
exports.OpenSketchExternal = OpenSketchExternal;
(function (OpenSketchExternal) {
    var Commands;
    (function (Commands) {
        Commands.OPEN_EXTERNAL = {
            id: 'arduino-open-sketch-external'
        };
    })(Commands = OpenSketchExternal.Commands || (OpenSketchExternal.Commands = {}));
})(OpenSketchExternal = exports.OpenSketchExternal || (exports.OpenSketchExternal = {}));
exports.OpenSketchExternal = OpenSketchExternal;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/open-sketch.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/open-sketch.js ***!
  \*************************************************************************************/
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
exports.OpenSketch = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var electron_1 = __webpack_require__(/*! electron */ "electron");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var arduino_toolbar_1 = __webpack_require__(/*! ../toolbar/arduino-toolbar */ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var OpenSketch = /** @class */ (function (_super) {
    __extends(OpenSketch, _super);
    function OpenSketch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toDisposeBeforeCreateNewContextMenu = new disposable_1.DisposableCollection();
        return _this;
    }
    OpenSketch_1 = OpenSketch;
    OpenSketch.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(OpenSketch_1.Commands.OPEN_SKETCH, {
            execute: function (arg) { return contribution_1.Sketch.is(arg) ? _this.openSketch(arg) : _this.openSketch(); }
        });
        registry.registerCommand(OpenSketch_1.Commands.OPEN_SKETCH__TOOLBAR, {
            isVisible: function (widget) { return arduino_toolbar_1.ArduinoToolbar.is(widget) && widget.side === 'left'; },
            execute: function (_, target) { return __awaiter(_this, void 0, void 0, function () {
                var sketches, parentElement, _loop_1, this_1, sketches_1, sketches_1_1, sketch, options;
                var e_1, _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.sketchService.getSketches()];
                        case 1:
                            sketches = _b.sent();
                            if (!sketches.length) {
                                this.openSketch();
                            }
                            else {
                                this.toDisposeBeforeCreateNewContextMenu.dispose();
                                if (!(target instanceof HTMLElement)) {
                                    return [2 /*return*/];
                                }
                                parentElement = target.parentElement;
                                if (!parentElement) {
                                    return [2 /*return*/];
                                }
                                this.menuRegistry.registerMenuAction(arduino_menus_1.ArduinoMenus.OPEN_SKETCH__CONTEXT__OPEN_GROUP, {
                                    commandId: OpenSketch_1.Commands.OPEN_SKETCH.id,
                                    label: 'Open...'
                                });
                                this.toDisposeBeforeCreateNewContextMenu.push(disposable_1.Disposable.create(function () { return _this.menuRegistry.unregisterMenuAction(OpenSketch_1.Commands.OPEN_SKETCH); }));
                                _loop_1 = function (sketch) {
                                    var command = { id: "arduino-open-sketch--" + sketch.uri };
                                    var handler = { execute: function () { return _this.openSketch(sketch); } };
                                    this_1.toDisposeBeforeCreateNewContextMenu.push(registry.registerCommand(command, handler));
                                    this_1.menuRegistry.registerMenuAction(arduino_menus_1.ArduinoMenus.OPEN_SKETCH__CONTEXT__RECENT_GROUP, {
                                        commandId: command.id,
                                        label: sketch.name
                                    });
                                    this_1.toDisposeBeforeCreateNewContextMenu.push(disposable_1.Disposable.create(function () { return _this.menuRegistry.unregisterMenuAction(command); }));
                                };
                                this_1 = this;
                                try {
                                    for (sketches_1 = __values(sketches), sketches_1_1 = sketches_1.next(); !sketches_1_1.done; sketches_1_1 = sketches_1.next()) {
                                        sketch = sketches_1_1.value;
                                        _loop_1(sketch);
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (sketches_1_1 && !sketches_1_1.done && (_a = sketches_1.return)) _a.call(sketches_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                options = {
                                    menuPath: arduino_menus_1.ArduinoMenus.OPEN_SKETCH__CONTEXT,
                                    anchor: {
                                        x: parentElement.getBoundingClientRect().left,
                                        y: parentElement.getBoundingClientRect().top + parentElement.offsetHeight
                                    }
                                };
                                this.contextMenuRenderer.render(options);
                            }
                            return [2 /*return*/];
                    }
                });
            }); }
        });
    };
    OpenSketch.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.FILE__SKETCH_GROUP, {
            commandId: OpenSketch_1.Commands.OPEN_SKETCH.id,
            label: 'Open...',
            order: '1'
        });
    };
    OpenSketch.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: OpenSketch_1.Commands.OPEN_SKETCH.id,
            keybinding: 'CtrlCmd+O'
        });
    };
    OpenSketch.prototype.registerToolbarItems = function (registry) {
        registry.registerItem({
            id: OpenSketch_1.Commands.OPEN_SKETCH__TOOLBAR.id,
            command: OpenSketch_1.Commands.OPEN_SKETCH__TOOLBAR.id,
            tooltip: 'Open',
            priority: 4
        });
    };
    OpenSketch.prototype.openSketch = function (toOpen) {
        if (toOpen === void 0) { toOpen = this.selectSketch(); }
        return __awaiter(this, void 0, void 0, function () {
            var sketch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, toOpen];
                    case 1:
                        sketch = _a.sent();
                        if (sketch) {
                            this.workspaceService.open(new contribution_1.URI(sketch.uri));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OpenSketch.prototype.selectSketch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, defaultPath, filePaths, sketchFilePath, sketchFileUri, sketch, name_1, nameWithExt, response, newSketchUri, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.getConfiguration()];
                    case 1:
                        config = _a.sent();
                        return [4 /*yield*/, this.fileSystem.getFsPath(config.sketchDirUri)];
                    case 2:
                        defaultPath = _a.sent();
                        return [4 /*yield*/, electron_1.remote.dialog.showOpenDialog({
                                defaultPath: defaultPath,
                                properties: ['createDirectory', 'openFile'],
                                filters: [
                                    {
                                        name: 'Sketch',
                                        extensions: ['ino']
                                    }
                                ]
                            })];
                    case 3:
                        filePaths = (_a.sent()).filePaths;
                        if (!filePaths.length) {
                            return [2 /*return*/, undefined];
                        }
                        if (filePaths.length > 1) {
                            this.logger.warn("Multiple sketches were selected: " + filePaths + ". Using the first one.");
                        }
                        sketchFilePath = filePaths[0];
                        return [4 /*yield*/, this.fileSystemExt.getUri(sketchFilePath)];
                    case 4:
                        sketchFileUri = _a.sent();
                        return [4 /*yield*/, this.sketchService.getSketchFolder(sketchFileUri)];
                    case 5:
                        sketch = _a.sent();
                        if (sketch) {
                            return [2 /*return*/, sketch];
                        }
                        if (!sketchFileUri.endsWith('.ino')) return [3 /*break*/, 12];
                        name_1 = new contribution_1.URI(sketchFileUri).path.name;
                        nameWithExt = this.labelProvider.getName(new contribution_1.URI(sketchFileUri));
                        return [4 /*yield*/, electron_1.remote.dialog.showMessageBox({
                                title: 'Moving',
                                type: 'question',
                                buttons: ['Cancel', 'OK'],
                                message: "The file \"" + nameWithExt + "\" needs to be inside a sketch folder named as \"" + name_1 + "\".\nCreate this folder, move the file, and continue?"
                            })];
                    case 6:
                        response = (_a.sent()).response;
                        if (!(response === 1)) return [3 /*break*/, 12];
                        newSketchUri = new contribution_1.URI(sketchFileUri).parent.resolve(name_1);
                        return [4 /*yield*/, this.fileSystem.exists(newSketchUri.toString())];
                    case 7:
                        exists = _a.sent();
                        if (!exists) return [3 /*break*/, 9];
                        return [4 /*yield*/, electron_1.remote.dialog.showMessageBox({
                                type: 'error',
                                title: 'Error',
                                message: "A folder named \"" + name_1 + "\" already exists. Can't open sketch."
                            })];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, undefined];
                    case 9: return [4 /*yield*/, this.fileSystem.createFolder(newSketchUri.toString())];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.fileSystem.move(sketchFileUri, newSketchUri.resolve(nameWithExt).toString())];
                    case 11:
                        _a.sent();
                        return [2 /*return*/, this.sketchService.getSketchFolder(newSketchUri.toString())];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    var OpenSketch_1;
    __decorate([
        inversify_1.inject(contribution_1.MenuModelRegistry),
        __metadata("design:type", contribution_1.MenuModelRegistry)
    ], OpenSketch.prototype, "menuRegistry", void 0);
    __decorate([
        inversify_1.inject(browser_1.ContextMenuRenderer),
        __metadata("design:type", browser_1.ContextMenuRenderer)
    ], OpenSketch.prototype, "contextMenuRenderer", void 0);
    OpenSketch = OpenSketch_1 = __decorate([
        inversify_1.injectable()
    ], OpenSketch);
    return OpenSketch;
}(contribution_1.SketchContribution));
exports.OpenSketch = OpenSketch;
(function (OpenSketch) {
    var Commands;
    (function (Commands) {
        Commands.OPEN_SKETCH = {
            id: 'arduino-open-sketch'
        };
        Commands.OPEN_SKETCH__TOOLBAR = {
            id: 'arduino-open-sketch--toolbar'
        };
    })(Commands = OpenSketch.Commands || (OpenSketch.Commands = {}));
})(OpenSketch = exports.OpenSketch || (exports.OpenSketch = {}));
exports.OpenSketch = OpenSketch;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/quit-app.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/quit-app.js ***!
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuitApp = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var electron_1 = __webpack_require__(/*! electron */ "electron");
var os_1 = __webpack_require__(/*! @theia/core/lib/common/os */ "./node_modules/@theia/core/lib/common/os.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var QuitApp = /** @class */ (function (_super) {
    __extends(QuitApp, _super);
    function QuitApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuitApp_1 = QuitApp;
    QuitApp.prototype.registerCommands = function (registry) {
        if (!os_1.isOSX) {
            registry.registerCommand(QuitApp_1.Commands.QUIT_APP, {
                execute: function () { return electron_1.remote.app.quit(); }
            });
        }
    };
    QuitApp.prototype.registerMenus = function (registry) {
        // On macOS we will get the `Quit ${YOUR_APP_NAME}` menu item natively, no need to duplicate it. 
        if (!os_1.isOSX) {
            registry.registerMenuAction(arduino_menus_1.ArduinoMenus.FILE__QUIT_GROUP, {
                commandId: QuitApp_1.Commands.QUIT_APP.id,
                label: 'Quit',
                order: '0'
            });
        }
    };
    QuitApp.prototype.registerKeybindings = function (registry) {
        if (!os_1.isOSX) {
            registry.registerKeybinding({
                command: QuitApp_1.Commands.QUIT_APP.id,
                keybinding: 'CtrlCmd+Q'
            });
        }
    };
    var QuitApp_1;
    QuitApp = QuitApp_1 = __decorate([
        inversify_1.injectable()
    ], QuitApp);
    return QuitApp;
}(contribution_1.Contribution));
exports.QuitApp = QuitApp;
(function (QuitApp) {
    var Commands;
    (function (Commands) {
        Commands.QUIT_APP = {
            id: 'arduino-quit-app'
        };
    })(Commands = QuitApp.Commands || (QuitApp.Commands = {}));
})(QuitApp = exports.QuitApp || (exports.QuitApp = {}));
exports.QuitApp = QuitApp;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/save-as-sketch.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/save-as-sketch.js ***!
  \****************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveAsSketch = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var electron_1 = __webpack_require__(/*! electron */ "electron");
var dateFormat = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var SaveAsSketch = /** @class */ (function (_super) {
    __extends(SaveAsSketch, _super);
    function SaveAsSketch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SaveAsSketch_1 = SaveAsSketch;
    SaveAsSketch.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(SaveAsSketch_1.Commands.SAVE_AS_SKETCH, {
            execute: function (args) { return _this.saveAs(args); }
        });
    };
    SaveAsSketch.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.FILE__SKETCH_GROUP, {
            commandId: SaveAsSketch_1.Commands.SAVE_AS_SKETCH.id,
            label: 'Save As...',
            order: '7'
        });
    };
    SaveAsSketch.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: SaveAsSketch_1.Commands.SAVE_AS_SKETCH.id,
            keybinding: 'CtrlCmd+Shift+S'
        });
    };
    /**
     * Resolves `true` if the sketch was successfully saved as something.
     */
    SaveAsSketch.prototype.saveAs = function (_a) {
        var _b = _a === void 0 ? SaveAsSketch_1.Options.DEFAULT : _a, execOnlyIfTemp = _b.execOnlyIfTemp, openAfterMove = _b.openAfterMove, wipeOriginal = _b.wipeOriginal;
        return __awaiter(this, void 0, void 0, function () {
            var sketch, isTemp, sketchDirUri, _c, exists, defaultUri, defaultPath, _d, filePath, canceled, destinationUri, workspaceUri;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.sketchServiceClient.currentSketch()];
                    case 1:
                        sketch = _e.sent();
                        if (!sketch) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.sketchService.isTemp(sketch)];
                    case 2:
                        isTemp = _e.sent();
                        if (!isTemp && !!execOnlyIfTemp) {
                            return [2 /*return*/, false];
                        }
                        _c = contribution_1.URI.bind;
                        return [4 /*yield*/, this.configService.getConfiguration()];
                    case 3:
                        sketchDirUri = new (_c.apply(contribution_1.URI, [void 0, (_e.sent()).sketchDirUri]))();
                        return [4 /*yield*/, this.fileSystem.exists(sketchDirUri.resolve(sketch.name).toString())];
                    case 4:
                        exists = _e.sent();
                        defaultUri = exists
                            ? sketchDirUri.resolve(sketchDirUri.resolve(sketch.name + "_copy_" + dateFormat(new Date(), 'yyyymmddHHMMss')).toString())
                            : sketchDirUri.resolve(sketch.name);
                        return [4 /*yield*/, this.fileSystem.getFsPath(defaultUri.toString())];
                    case 5:
                        defaultPath = _e.sent();
                        return [4 /*yield*/, electron_1.remote.dialog.showSaveDialog({ title: 'Save sketch folder as...', defaultPath: defaultPath })];
                    case 6:
                        _d = _e.sent(), filePath = _d.filePath, canceled = _d.canceled;
                        if (!filePath || canceled) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.fileSystemExt.getUri(filePath)];
                    case 7:
                        destinationUri = _e.sent();
                        if (!destinationUri) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.sketchService.copy(sketch, { destinationUri: destinationUri })];
                    case 8:
                        workspaceUri = _e.sent();
                        if (!(workspaceUri && openAfterMove)) return [3 /*break*/, 11];
                        if (!wipeOriginal) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.fileSystem.delete(sketch.uri)];
                    case 9:
                        _e.sent();
                        _e.label = 10;
                    case 10:
                        this.workspaceService.open(new contribution_1.URI(workspaceUri), { preserveWindow: true });
                        _e.label = 11;
                    case 11: return [2 /*return*/, !!workspaceUri];
                }
            });
        });
    };
    var SaveAsSketch_1;
    SaveAsSketch = SaveAsSketch_1 = __decorate([
        inversify_1.injectable()
    ], SaveAsSketch);
    return SaveAsSketch;
}(contribution_1.SketchContribution));
exports.SaveAsSketch = SaveAsSketch;
(function (SaveAsSketch) {
    var Commands;
    (function (Commands) {
        Commands.SAVE_AS_SKETCH = {
            id: 'arduino-save-as-sketch'
        };
    })(Commands = SaveAsSketch.Commands || (SaveAsSketch.Commands = {}));
    var Options;
    (function (Options) {
        Options.DEFAULT = {
            execOnlyIfTemp: false,
            openAfterMove: true,
            wipeOriginal: false
        };
    })(Options = SaveAsSketch.Options || (SaveAsSketch.Options = {}));
})(SaveAsSketch = exports.SaveAsSketch || (exports.SaveAsSketch = {}));
exports.SaveAsSketch = SaveAsSketch;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/save-sketch.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/save-sketch.js ***!
  \*************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveSketch = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var common_frontend_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/common-frontend-contribution */ "./node_modules/@theia/core/lib/browser/common-frontend-contribution.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var arduino_toolbar_1 = __webpack_require__(/*! ../toolbar/arduino-toolbar */ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var SaveSketch = /** @class */ (function (_super) {
    __extends(SaveSketch, _super);
    function SaveSketch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SaveSketch_1 = SaveSketch;
    SaveSketch.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(SaveSketch_1.Commands.SAVE_SKETCH, {
            execute: function () { return _this.saveSketch(); }
        });
        registry.registerCommand(SaveSketch_1.Commands.SAVE_SKETCH__TOOLBAR, {
            isVisible: function (widget) { return arduino_toolbar_1.ArduinoToolbar.is(widget) && widget.side === 'left'; },
            execute: function () { return registry.executeCommand(SaveSketch_1.Commands.SAVE_SKETCH.id); }
        });
    };
    SaveSketch.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.FILE__SKETCH_GROUP, {
            commandId: SaveSketch_1.Commands.SAVE_SKETCH.id,
            label: 'Save',
            order: '6'
        });
    };
    SaveSketch.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: SaveSketch_1.Commands.SAVE_SKETCH.id,
            keybinding: 'CtrlCmd+S'
        });
    };
    SaveSketch.prototype.registerToolbarItems = function (registry) {
        registry.registerItem({
            id: SaveSketch_1.Commands.SAVE_SKETCH__TOOLBAR.id,
            command: SaveSketch_1.Commands.SAVE_SKETCH__TOOLBAR.id,
            tooltip: 'Save',
            priority: 5
        });
    };
    SaveSketch.prototype.saveSketch = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.commandService.executeCommand(common_frontend_contribution_1.CommonCommands.SAVE_ALL.id)];
            });
        });
    };
    var SaveSketch_1;
    SaveSketch = SaveSketch_1 = __decorate([
        inversify_1.injectable()
    ], SaveSketch);
    return SaveSketch;
}(contribution_1.SketchContribution));
exports.SaveSketch = SaveSketch;
(function (SaveSketch) {
    var Commands;
    (function (Commands) {
        Commands.SAVE_SKETCH = {
            id: 'arduino-save-sketch'
        };
        Commands.SAVE_SKETCH__TOOLBAR = {
            id: 'arduino-save-sketch--toolbar'
        };
    })(Commands = SaveSketch.Commands || (SaveSketch.Commands = {}));
})(SaveSketch = exports.SaveSketch || (exports.SaveSketch = {}));
exports.SaveSketch = SaveSketch;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/settings.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/settings.js ***!
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var common_frontend_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/common-frontend-contribution */ "./node_modules/@theia/core/lib/browser/common-frontend-contribution.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Settings_1 = Settings;
    Settings.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(Settings_1.Commands.OPEN_CLI_CONFIG, {
            execute: function () { return _this.configService.getCliConfigFileUri().then(function (uri) { return contribution_1.open(_this.openerService, new contribution_1.URI(uri)); }); }
        });
    };
    Settings.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.FILE__SETTINGS_GROUP, {
            commandId: common_frontend_contribution_1.CommonCommands.OPEN_PREFERENCES.id,
            label: 'Preferences...',
            order: '0'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.FILE__SETTINGS_GROUP, {
            commandId: Settings_1.Commands.OPEN_CLI_CONFIG.id,
            label: 'Open CLI Configuration',
            order: '1',
        });
    };
    var Settings_1;
    Settings = Settings_1 = __decorate([
        inversify_1.injectable()
    ], Settings);
    return Settings;
}(contribution_1.SketchContribution));
exports.Settings = Settings;
(function (Settings) {
    var Commands;
    (function (Commands) {
        Commands.OPEN_CLI_CONFIG = {
            id: 'arduino-open-cli-config',
            label: 'Open CLI Configuration',
            category: 'Arduino'
        };
    })(Commands = Settings.Commands || (Settings.Commands = {}));
})(Settings = exports.Settings || (exports.Settings = {}));
exports.Settings = Settings;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/sketch-control.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/sketch-control.js ***!
  \****************************************************************************************/
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SketchControl = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var common_frontend_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/common-frontend-contribution */ "./node_modules/@theia/core/lib/browser/common-frontend-contribution.js");
var application_shell_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/application-shell */ "./node_modules/@theia/core/lib/browser/shell/application-shell.js");
var browser_1 = __webpack_require__(/*! @theia/workspace/lib/browser */ "./node_modules/@theia/workspace/lib/browser/index.js");
var context_menu_renderer_1 = __webpack_require__(/*! @theia/core/lib/browser/context-menu-renderer */ "./node_modules/@theia/core/lib/browser/context-menu-renderer.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var SketchControl = /** @class */ (function (_super) {
    __extends(SketchControl, _super);
    function SketchControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toDisposeBeforeCreateNewContextMenu = new disposable_1.DisposableCollection();
        return _this;
    }
    SketchControl_1 = SketchControl;
    SketchControl.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(SketchControl_1.Commands.OPEN_SKETCH_CONTROL__TOOLBAR, {
            isVisible: function (widget) { return _this.shell.getWidgets('main').indexOf(widget) !== -1; },
            execute: function () { return __awaiter(_this, void 0, void 0, function () {
                var sketch, target, parentElement, _a, mainFileUri, otherSketchFileUris, additionalFileUris, uris, _loop_1, this_1, i, options;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.toDisposeBeforeCreateNewContextMenu.dispose();
                            return [4 /*yield*/, this.sketchServiceClient.currentSketch()];
                        case 1:
                            sketch = _b.sent();
                            if (!sketch) {
                                return [2 /*return*/];
                            }
                            target = document.getElementById(SketchControl_1.Commands.OPEN_SKETCH_CONTROL__TOOLBAR.id);
                            if (!(target instanceof HTMLElement)) {
                                return [2 /*return*/];
                            }
                            parentElement = target.parentElement;
                            if (!parentElement) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.sketchService.loadSketch(sketch.uri)];
                        case 2:
                            _a = _b.sent(), mainFileUri = _a.mainFileUri, otherSketchFileUris = _a.otherSketchFileUris, additionalFileUris = _a.additionalFileUris;
                            uris = __spread([mainFileUri], otherSketchFileUris, additionalFileUris);
                            _loop_1 = function (i) {
                                var uri = new contribution_1.URI(uris[i]);
                                var command = { id: "arduino-focus-file--" + uri.toString() };
                                var handler = { execute: function () { return contribution_1.open(_this.openerService, uri); } };
                                this_1.toDisposeBeforeCreateNewContextMenu.push(registry.registerCommand(command, handler));
                                this_1.menuRegistry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH_CONTROL__CONTEXT__RESOURCES_GROUP, {
                                    commandId: command.id,
                                    label: this_1.labelProvider.getName(uri),
                                    order: "" + i
                                });
                                this_1.toDisposeBeforeCreateNewContextMenu.push(disposable_1.Disposable.create(function () { return _this.menuRegistry.unregisterMenuAction(command); }));
                            };
                            this_1 = this;
                            for (i = 0; i < uris.length; i++) {
                                _loop_1(i);
                            }
                            options = {
                                menuPath: arduino_menus_1.ArduinoMenus.SKETCH_CONTROL__CONTEXT,
                                anchor: {
                                    x: parentElement.getBoundingClientRect().left,
                                    y: parentElement.getBoundingClientRect().top + parentElement.offsetHeight
                                }
                            };
                            this.contextMenuRenderer.render(options);
                            return [2 /*return*/];
                    }
                });
            }); }
        });
    };
    SketchControl.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH_CONTROL__CONTEXT__MAIN_GROUP, {
            commandId: browser_1.WorkspaceCommands.NEW_FILE.id,
            label: 'New Tab',
            order: '0'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH_CONTROL__CONTEXT__MAIN_GROUP, {
            commandId: browser_1.WorkspaceCommands.FILE_RENAME.id,
            label: 'Rename',
            order: '1'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH_CONTROL__CONTEXT__MAIN_GROUP, {
            commandId: browser_1.WorkspaceCommands.FILE_DELETE.id,
            label: 'Delete',
            order: '2'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH_CONTROL__CONTEXT__NAVIGATION_GROUP, {
            commandId: common_frontend_contribution_1.CommonCommands.PREVIOUS_TAB.id,
            label: 'Previous Tab',
            order: '0'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH_CONTROL__CONTEXT__NAVIGATION_GROUP, {
            commandId: common_frontend_contribution_1.CommonCommands.NEXT_TAB.id,
            label: 'Next Tab',
            order: '0'
        });
    };
    SketchControl.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: browser_1.WorkspaceCommands.NEW_FILE.id,
            keybinding: 'CtrlCmd+Shift+N'
        });
        registry.registerKeybinding({
            command: common_frontend_contribution_1.CommonCommands.PREVIOUS_TAB.id,
            keybinding: 'CtrlCmd+Alt+Left' // TODO: check why electron does not show the keybindings in the UI.
        });
        registry.registerKeybinding({
            command: common_frontend_contribution_1.CommonCommands.NEXT_TAB.id,
            keybinding: 'CtrlCmd+Alt+Right'
        });
    };
    SketchControl.prototype.registerToolbarItems = function (registry) {
        registry.registerItem({
            id: SketchControl_1.Commands.OPEN_SKETCH_CONTROL__TOOLBAR.id,
            command: SketchControl_1.Commands.OPEN_SKETCH_CONTROL__TOOLBAR.id
        });
    };
    var SketchControl_1;
    __decorate([
        inversify_1.inject(application_shell_1.ApplicationShell),
        __metadata("design:type", application_shell_1.ApplicationShell)
    ], SketchControl.prototype, "shell", void 0);
    __decorate([
        inversify_1.inject(contribution_1.MenuModelRegistry),
        __metadata("design:type", contribution_1.MenuModelRegistry)
    ], SketchControl.prototype, "menuRegistry", void 0);
    __decorate([
        inversify_1.inject(context_menu_renderer_1.ContextMenuRenderer),
        __metadata("design:type", context_menu_renderer_1.ContextMenuRenderer)
    ], SketchControl.prototype, "contextMenuRenderer", void 0);
    SketchControl = SketchControl_1 = __decorate([
        inversify_1.injectable()
    ], SketchControl);
    return SketchControl;
}(contribution_1.SketchContribution));
exports.SketchControl = SketchControl;
(function (SketchControl) {
    var Commands;
    (function (Commands) {
        Commands.OPEN_SKETCH_CONTROL__TOOLBAR = {
            id: 'arduino-open-sketch-control--toolbar',
            iconClass: 'fa fa-caret-down'
        };
    })(Commands = SketchControl.Commands || (SketchControl.Commands = {}));
})(SketchControl = exports.SketchControl || (exports.SketchControl = {}));
exports.SketchControl = SketchControl;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/upload-sketch.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/upload-sketch.js ***!
  \***************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadSketch = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var output_channel_1 = __webpack_require__(/*! @theia/output/lib/common/output-channel */ "./node_modules/@theia/output/lib/common/output-channel.js");
var protocol_1 = __webpack_require__(/*! ../../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var arduino_toolbar_1 = __webpack_require__(/*! ../toolbar/arduino-toolbar */ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar.js");
var boards_data_store_1 = __webpack_require__(/*! ../boards/boards-data-store */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-data-store.js");
var monitor_connection_1 = __webpack_require__(/*! ../monitor/monitor-connection */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-connection.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ../boards/boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var UploadSketch = /** @class */ (function (_super) {
    __extends(UploadSketch, _super);
    function UploadSketch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UploadSketch_1 = UploadSketch;
    UploadSketch.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(UploadSketch_1.Commands.UPLOAD_SKETCH, {
            execute: function () { return _this.uploadSketch(); }
        });
        registry.registerCommand(UploadSketch_1.Commands.UPLOAD_SKETCH_USING_PROGRAMMER, {
            execute: function () { return _this.uploadSketch(true); }
        });
        registry.registerCommand(UploadSketch_1.Commands.UPLOAD_SKETCH_TOOLBAR, {
            isVisible: function (widget) { return arduino_toolbar_1.ArduinoToolbar.is(widget) && widget.side === 'left'; },
            execute: function () { return registry.executeCommand(UploadSketch_1.Commands.UPLOAD_SKETCH.id); }
        });
    };
    UploadSketch.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH__MAIN_GROUP, {
            commandId: UploadSketch_1.Commands.UPLOAD_SKETCH.id,
            label: 'Upload',
            order: '0'
        });
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH__MAIN_GROUP, {
            commandId: UploadSketch_1.Commands.UPLOAD_SKETCH_USING_PROGRAMMER.id,
            label: 'Upload Using Programmer',
            order: '1'
        });
    };
    UploadSketch.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: UploadSketch_1.Commands.UPLOAD_SKETCH.id,
            keybinding: 'CtrlCmd+U'
        });
        registry.registerKeybinding({
            command: UploadSketch_1.Commands.UPLOAD_SKETCH_USING_PROGRAMMER.id,
            keybinding: 'CtrlCmd+Shift+U'
        });
    };
    UploadSketch.prototype.registerToolbarItems = function (registry) {
        registry.registerItem({
            id: UploadSketch_1.Commands.UPLOAD_SKETCH_TOOLBAR.id,
            command: UploadSketch_1.Commands.UPLOAD_SKETCH_TOOLBAR.id,
            tooltip: 'Upload',
            priority: 1
        });
    };
    UploadSketch.prototype.uploadSketch = function (usingProgrammer) {
        if (usingProgrammer === void 0) { usingProgrammer = false; }
        return __awaiter(this, void 0, void 0, function () {
            var uri, monitorConfig, boardsConfig, _a, fqbn, selectedProgrammer, options, sketchUri, optimizeForDebug, selectedPort, programmer, port, port, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.sketchServiceClient.currentSketchFile()];
                    case 1:
                        uri = _b.sent();
                        if (!uri) {
                            return [2 /*return*/];
                        }
                        monitorConfig = this.monitorConnection.monitorConfig;
                        if (!monitorConfig) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.monitorConnection.disconnect()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 6, 7, 10]);
                        boardsConfig = this.boardsServiceClientImpl.boardsConfig;
                        if (!boardsConfig || !boardsConfig.selectedBoard) {
                            throw new Error('No boards selected. Please select a board.');
                        }
                        if (!boardsConfig.selectedBoard.fqbn) {
                            throw new Error("No core is installed for the '" + boardsConfig.selectedBoard.name + "' board. Please install the core.");
                        }
                        return [4 /*yield*/, Promise.all([
                                this.boardsDataStore.appendConfigToFqbn(boardsConfig.selectedBoard.fqbn),
                                this.boardsDataStore.getData(boardsConfig.selectedBoard.fqbn)
                            ])];
                    case 4:
                        _a = __read.apply(void 0, [_b.sent(), 2]), fqbn = _a[0], selectedProgrammer = _a[1].selectedProgrammer;
                        options = undefined;
                        sketchUri = uri;
                        optimizeForDebug = this.editorMode.compileForDebug;
                        selectedPort = boardsConfig.selectedPort;
                        if (usingProgrammer) {
                            programmer = selectedProgrammer;
                            if (!programmer) {
                                throw new Error('Programmer is not selected. Please select a programmer.');
                            }
                            port = undefined;
                            // If the port is set by the user, we pass it to the CLI as it might be required.
                            // If it is not set but the CLI requires it, we let the CLI to complain.
                            if (selectedPort) {
                                port = selectedPort.address;
                            }
                            options = {
                                sketchUri: sketchUri,
                                fqbn: fqbn,
                                optimizeForDebug: optimizeForDebug,
                                programmer: programmer,
                                port: port
                            };
                        }
                        else {
                            if (!selectedPort) {
                                throw new Error('No ports selected. Please select a port.');
                            }
                            port = selectedPort.address;
                            options = {
                                sketchUri: sketchUri,
                                fqbn: fqbn,
                                optimizeForDebug: optimizeForDebug,
                                port: port
                            };
                        }
                        this.outputChannelManager.getChannel('Arduino: upload').clear();
                        return [4 /*yield*/, this.coreService.upload(options)];
                    case 5:
                        _b.sent();
                        this.messageService.info('Done uploading.', { timeout: 1000 });
                        return [3 /*break*/, 10];
                    case 6:
                        e_1 = _b.sent();
                        this.messageService.error(e_1.toString());
                        return [3 /*break*/, 10];
                    case 7:
                        if (!monitorConfig) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.monitorConnection.connect(monitorConfig)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    var UploadSketch_1;
    __decorate([
        inversify_1.inject(protocol_1.CoreService),
        __metadata("design:type", Object)
    ], UploadSketch.prototype, "coreService", void 0);
    __decorate([
        inversify_1.inject(monitor_connection_1.MonitorConnection),
        __metadata("design:type", monitor_connection_1.MonitorConnection)
    ], UploadSketch.prototype, "monitorConnection", void 0);
    __decorate([
        inversify_1.inject(boards_data_store_1.BoardsDataStore),
        __metadata("design:type", boards_data_store_1.BoardsDataStore)
    ], UploadSketch.prototype, "boardsDataStore", void 0);
    __decorate([
        inversify_1.inject(boards_service_client_impl_1.BoardsServiceClientImpl),
        __metadata("design:type", boards_service_client_impl_1.BoardsServiceClientImpl)
    ], UploadSketch.prototype, "boardsServiceClientImpl", void 0);
    __decorate([
        inversify_1.inject(output_channel_1.OutputChannelManager),
        __metadata("design:type", output_channel_1.OutputChannelManager)
    ], UploadSketch.prototype, "outputChannelManager", void 0);
    UploadSketch = UploadSketch_1 = __decorate([
        inversify_1.injectable()
    ], UploadSketch);
    return UploadSketch;
}(contribution_1.SketchContribution));
exports.UploadSketch = UploadSketch;
(function (UploadSketch) {
    var Commands;
    (function (Commands) {
        Commands.UPLOAD_SKETCH = {
            id: 'arduino-upload-sketch'
        };
        Commands.UPLOAD_SKETCH_USING_PROGRAMMER = {
            id: 'arduino-upload-sketch-using-programmer'
        };
        Commands.UPLOAD_SKETCH_TOOLBAR = {
            id: 'arduino-upload-sketch--toolbar'
        };
    })(Commands = UploadSketch.Commands || (UploadSketch.Commands = {}));
})(UploadSketch = exports.UploadSketch || (exports.UploadSketch = {}));
exports.UploadSketch = UploadSketch;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/contributions/verify-sketch.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/contributions/verify-sketch.js ***!
  \***************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifySketch = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var output_channel_1 = __webpack_require__(/*! @theia/output/lib/common/output-channel */ "./node_modules/@theia/output/lib/common/output-channel.js");
var protocol_1 = __webpack_require__(/*! ../../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var arduino_toolbar_1 = __webpack_require__(/*! ../toolbar/arduino-toolbar */ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar.js");
var boards_data_store_1 = __webpack_require__(/*! ../boards/boards-data-store */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-data-store.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ../boards/boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var contribution_1 = __webpack_require__(/*! ./contribution */ "./node_modules/arduino-ide-extension/lib/browser/contributions/contribution.js");
var VerifySketch = /** @class */ (function (_super) {
    __extends(VerifySketch, _super);
    function VerifySketch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VerifySketch_1 = VerifySketch;
    VerifySketch.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(VerifySketch_1.Commands.VERIFY_SKETCH, {
            execute: function () { return _this.verifySketch(); }
        });
        registry.registerCommand(VerifySketch_1.Commands.VERIFY_SKETCH_TOOLBAR, {
            isVisible: function (widget) { return arduino_toolbar_1.ArduinoToolbar.is(widget) && widget.side === 'left'; },
            execute: function () { return registry.executeCommand(VerifySketch_1.Commands.VERIFY_SKETCH.id); }
        });
    };
    VerifySketch.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(arduino_menus_1.ArduinoMenus.SKETCH__MAIN_GROUP, {
            commandId: VerifySketch_1.Commands.VERIFY_SKETCH.id,
            label: 'Verify/Compile',
            order: '2'
        });
    };
    VerifySketch.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: VerifySketch_1.Commands.VERIFY_SKETCH.id,
            keybinding: 'CtrlCmd+R'
        });
    };
    VerifySketch.prototype.registerToolbarItems = function (registry) {
        registry.registerItem({
            id: VerifySketch_1.Commands.VERIFY_SKETCH_TOOLBAR.id,
            command: VerifySketch_1.Commands.VERIFY_SKETCH_TOOLBAR.id,
            tooltip: 'Verify',
            priority: 0
        });
    };
    VerifySketch.prototype.verifySketch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uri, boardsConfig, fqbn, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sketchServiceClient.currentSketchFile()];
                    case 1:
                        uri = _a.sent();
                        if (!uri) {
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        boardsConfig = this.boardsServiceClientImpl.boardsConfig;
                        if (!boardsConfig || !boardsConfig.selectedBoard) {
                            throw new Error('No boards selected. Please select a board.');
                        }
                        if (!boardsConfig.selectedBoard.fqbn) {
                            throw new Error("No core is installed for the '" + boardsConfig.selectedBoard.name + "' board. Please install the core.");
                        }
                        return [4 /*yield*/, this.boardsDataStore.appendConfigToFqbn(boardsConfig.selectedBoard.fqbn)];
                    case 3:
                        fqbn = _a.sent();
                        this.outputChannelManager.getChannel('Arduino: compile').clear();
                        return [4 /*yield*/, this.coreService.compile({
                                sketchUri: uri,
                                fqbn: fqbn,
                                optimizeForDebug: this.editorMode.compileForDebug
                            })];
                    case 4:
                        _a.sent();
                        this.messageService.info('Done compiling.', { timeout: 1000 });
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this.messageService.error(e_1.toString());
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    var VerifySketch_1;
    __decorate([
        inversify_1.inject(protocol_1.CoreService),
        __metadata("design:type", Object)
    ], VerifySketch.prototype, "coreService", void 0);
    __decorate([
        inversify_1.inject(boards_data_store_1.BoardsDataStore),
        __metadata("design:type", boards_data_store_1.BoardsDataStore)
    ], VerifySketch.prototype, "boardsDataStore", void 0);
    __decorate([
        inversify_1.inject(boards_service_client_impl_1.BoardsServiceClientImpl),
        __metadata("design:type", boards_service_client_impl_1.BoardsServiceClientImpl)
    ], VerifySketch.prototype, "boardsServiceClientImpl", void 0);
    __decorate([
        inversify_1.inject(output_channel_1.OutputChannelManager),
        __metadata("design:type", output_channel_1.OutputChannelManager)
    ], VerifySketch.prototype, "outputChannelManager", void 0);
    VerifySketch = VerifySketch_1 = __decorate([
        inversify_1.injectable()
    ], VerifySketch);
    return VerifySketch;
}(contribution_1.SketchContribution));
exports.VerifySketch = VerifySketch;
(function (VerifySketch) {
    var Commands;
    (function (Commands) {
        Commands.VERIFY_SKETCH = {
            id: 'arduino-verify-sketch'
        };
        Commands.VERIFY_SKETCH_TOOLBAR = {
            id: 'arduino-verify-sketch--toolbar'
        };
    })(Commands = VerifySketch.Commands || (VerifySketch.Commands = {}));
})(VerifySketch = exports.VerifySketch || (exports.VerifySketch = {}));
exports.VerifySketch = VerifySketch;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/language/arduino-language-client-contribution.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/language/arduino-language-client-contribution.js ***!
  \*********************************************************************************************************/
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
exports.ArduinoLanguageClientContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/languages/lib/browser */ "./node_modules/@theia/languages/lib/browser/index.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ../boards/boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var ArduinoLanguageClientContribution = /** @class */ (function (_super) {
    __extends(ArduinoLanguageClientContribution, _super);
    function ArduinoLanguageClientContribution() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'ino';
        _this.name = 'Arduino';
        return _this;
    }
    Object.defineProperty(ArduinoLanguageClientContribution.prototype, "documentSelector", {
        get: function () {
            return ['ino'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArduinoLanguageClientContribution.prototype, "globPatterns", {
        get: function () {
            return ['**/*.ino'];
        },
        enumerable: false,
        configurable: true
    });
    ArduinoLanguageClientContribution.prototype.init = function () {
        this.boardsServiceClient.onBoardsConfigChanged(this.selectBoard.bind(this));
    };
    ArduinoLanguageClientContribution.prototype.selectBoard = function (config) {
        this.boardConfig = config;
        // Force a restart to send the new board config to the language server
        this.restart();
    };
    ArduinoLanguageClientContribution.prototype.getStartParameters = function () {
        return this.boardConfig;
    };
    __decorate([
        inversify_1.inject(boards_service_client_impl_1.BoardsServiceClientImpl),
        __metadata("design:type", boards_service_client_impl_1.BoardsServiceClientImpl)
    ], ArduinoLanguageClientContribution.prototype, "boardsServiceClient", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ArduinoLanguageClientContribution.prototype, "init", null);
    ArduinoLanguageClientContribution = __decorate([
        inversify_1.injectable()
    ], ArduinoLanguageClientContribution);
    return ArduinoLanguageClientContribution;
}(browser_1.BaseLanguageClientContribution));
exports.ArduinoLanguageClientContribution = ArduinoLanguageClientContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/language/arduino-language-grammar-contribution.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/language/arduino-language-grammar-contribution.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArduinoLanguageGrammarContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var ArduinoLanguageGrammarContribution = /** @class */ (function () {
    function ArduinoLanguageGrammarContribution() {
        this.configuration = {
            comments: {
                lineComment: '//',
                blockComment: ['/*', '*/'],
            },
            brackets: [
                ['{', '}'],
                ['[', ']'],
                ['(', ')']
            ],
            autoClosingPairs: [
                { open: '[', close: ']' },
                { open: '{', close: '}' },
                { open: '(', close: ')' },
                { open: '\'', close: '\'', notIn: ['string', 'comment'] },
                { open: '"', close: '"', notIn: ['string'] },
                { open: '/*', close: ' */', notIn: ['string'] }
            ],
            surroundingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '"', close: '"' },
                { open: '\'', close: '\'' },
            ],
            folding: {
                markers: {
                    start: new RegExp('^\\s*#pragma\\s+region\\b'),
                    end: new RegExp('^\\s*#pragma\\s+endregion\\b')
                }
            }
        };
    }
    ArduinoLanguageGrammarContribution_1 = ArduinoLanguageGrammarContribution;
    ArduinoLanguageGrammarContribution.prototype.registerTextmateLanguage = function (registry) {
        monaco.languages.register({
            id: ArduinoLanguageGrammarContribution_1.INO_LANGUAGE_ID,
            extensions: ['.ino'],
            aliases: ['INO', 'Ino', 'ino'],
        });
        monaco.languages.setLanguageConfiguration(ArduinoLanguageGrammarContribution_1.INO_LANGUAGE_ID, this.configuration);
        var inoGrammar = __webpack_require__(/*! ../../../data/ino.tmLanguage.json */ "./node_modules/arduino-ide-extension/data/ino.tmLanguage.json");
        registry.registerTextmateGrammarScope('source.ino', {
            getGrammarDefinition: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, {
                                format: 'json',
                                content: inoGrammar
                            }];
                    });
                });
            }
        });
        registry.mapLanguageIdToTextmateGrammar(ArduinoLanguageGrammarContribution_1.INO_LANGUAGE_ID, 'source.ino');
    };
    var ArduinoLanguageGrammarContribution_1;
    ArduinoLanguageGrammarContribution.INO_LANGUAGE_ID = 'ino';
    ArduinoLanguageGrammarContribution = ArduinoLanguageGrammarContribution_1 = __decorate([
        inversify_1.injectable()
    ], ArduinoLanguageGrammarContribution);
    return ArduinoLanguageGrammarContribution;
}());
exports.ArduinoLanguageGrammarContribution = ArduinoLanguageGrammarContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/library/library-widget-frontend-contribution.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/library/library-widget-frontend-contribution.js ***!
  \********************************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryListWidgetFrontendContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var view_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/view-contribution */ "./node_modules/@theia/core/lib/browser/shell/view-contribution.js");
var library_list_widget_1 = __webpack_require__(/*! ./library-list-widget */ "./node_modules/arduino-ide-extension/lib/browser/library/library-list-widget.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var LibraryListWidgetFrontendContribution = /** @class */ (function (_super) {
    __extends(LibraryListWidgetFrontendContribution, _super);
    function LibraryListWidgetFrontendContribution() {
        return _super.call(this, {
            widgetId: library_list_widget_1.LibraryListWidget.WIDGET_ID,
            widgetName: library_list_widget_1.LibraryListWidget.WIDGET_LABEL,
            defaultWidgetOptions: {
                area: 'left',
                rank: 700
            },
            toggleCommandId: library_list_widget_1.LibraryListWidget.WIDGET_ID + ":toggle",
            toggleKeybinding: 'CtrlCmd+Shift+I'
        }) || this;
    }
    LibraryListWidgetFrontendContribution.prototype.initializeLayout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.openView();
                return [2 /*return*/];
            });
        });
    };
    LibraryListWidgetFrontendContribution.prototype.registerMenus = function (menus) {
        if (this.toggleCommand) {
            menus.registerMenuAction(arduino_menus_1.ArduinoMenus.TOOLS__MAIN_GROUP, {
                commandId: this.toggleCommand.id,
                label: 'Manage Libraries...',
                order: '3'
            });
        }
    };
    LibraryListWidgetFrontendContribution = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], LibraryListWidgetFrontendContribution);
    return LibraryListWidgetFrontendContribution;
}(view_contribution_1.AbstractViewContribution));
exports.LibraryListWidgetFrontendContribution = LibraryListWidgetFrontendContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js":
/*!******************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js ***!
  \******************************************************************************/
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
exports.ArduinoMenus = void 0;
var menu_1 = __webpack_require__(/*! @theia/core/lib/common/menu */ "./node_modules/@theia/core/lib/common/menu.js");
var common_frontend_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/common-frontend-contribution */ "./node_modules/@theia/core/lib/browser/common-frontend-contribution.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var ArduinoMenus;
(function (ArduinoMenus) {
    // Main menu
    // -- File
    ArduinoMenus.FILE__SKETCH_GROUP = __spread(common_frontend_contribution_1.CommonMenus.FILE, ['0_sketch']);
    ArduinoMenus.FILE__PRINT_GROUP = __spread(common_frontend_contribution_1.CommonMenus.FILE, ['1_print']);
    // XXX: on macOS, the settings group is not under `File`
    ArduinoMenus.FILE__SETTINGS_GROUP = __spread((core_1.isOSX ? menu_1.MAIN_MENU_BAR : common_frontend_contribution_1.CommonMenus.FILE), ['2_settings']);
    ArduinoMenus.FILE__QUIT_GROUP = __spread(common_frontend_contribution_1.CommonMenus.FILE, ['3_quit']);
    // -- Edit
    // `Copy`, `Copy to Forum`, `Paste`, etc.
    // Note: `1_undo` is the first group from Theia, we start with `2`
    ArduinoMenus.EDIT__TEXT_CONTROL_GROUP = __spread(common_frontend_contribution_1.CommonMenus.EDIT, ['2_text_control']);
    // `Comment/Uncomment`, etc.
    ArduinoMenus.EDIT__CODE_CONTROL_GROUP = __spread(common_frontend_contribution_1.CommonMenus.EDIT, ['3_code_control']);
    ArduinoMenus.EDIT__FONT_CONTROL_GROUP = __spread(common_frontend_contribution_1.CommonMenus.EDIT, ['4_font_control']);
    ArduinoMenus.EDIT__FIND_GROUP = __spread(common_frontend_contribution_1.CommonMenus.EDIT, ['5_find']);
    // -- Sketch
    ArduinoMenus.SKETCH = __spread(menu_1.MAIN_MENU_BAR, ['3_sketch']);
    ArduinoMenus.SKETCH__MAIN_GROUP = __spread(ArduinoMenus.SKETCH, ['0_main']);
    ArduinoMenus.SKETCH__UTILS_GROUP = __spread(ArduinoMenus.SKETCH, ['1_utils']);
    // -- Tools
    ArduinoMenus.TOOLS = __spread(menu_1.MAIN_MENU_BAR, ['4_tools']);
    // `Auto Format`, `Library Manager...`, `Boards Manager...`
    ArduinoMenus.TOOLS__MAIN_GROUP = __spread(ArduinoMenus.TOOLS, ['0_main']);
    // Core settings, such as `Processor` and `Programmers` for the board.
    ArduinoMenus.TOOLS__BOARD_SETTINGS_GROUP = __spread(ArduinoMenus.TOOLS, ['1_board_settings']);
    // Context menu
    // -- Open
    ArduinoMenus.OPEN_SKETCH__CONTEXT = ['arduino-open-sketch--context'];
    ArduinoMenus.OPEN_SKETCH__CONTEXT__OPEN_GROUP = __spread(ArduinoMenus.OPEN_SKETCH__CONTEXT, ['0_open']);
    ArduinoMenus.OPEN_SKETCH__CONTEXT__RECENT_GROUP = __spread(ArduinoMenus.OPEN_SKETCH__CONTEXT, ['1_recent']);
    ArduinoMenus.OPEN_SKETCH__CONTEXT__EXAMPLES_GROUP = __spread(ArduinoMenus.OPEN_SKETCH__CONTEXT, ['2_examples']);
    // -- Sketch control
    ArduinoMenus.SKETCH_CONTROL__CONTEXT = ['arduino-sketch-control--context'];
    // `New Tab`, `Rename`, `Delete`
    ArduinoMenus.SKETCH_CONTROL__CONTEXT__MAIN_GROUP = __spread(ArduinoMenus.SKETCH_CONTROL__CONTEXT, ['0_main']);
    // `Previous Tab`, `Next Tab`
    ArduinoMenus.SKETCH_CONTROL__CONTEXT__NAVIGATION_GROUP = __spread(ArduinoMenus.SKETCH_CONTROL__CONTEXT, ['1_navigation']);
    // Sketch files opened in editors
    ArduinoMenus.SKETCH_CONTROL__CONTEXT__RESOURCES_GROUP = __spread(ArduinoMenus.SKETCH_CONTROL__CONTEXT, ['2_resources']);
})(ArduinoMenus = exports.ArduinoMenus || (exports.ArduinoMenus = {}));


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-connection.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-connection.js ***!
  \**************************************************************************************/
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
exports.MonitorConnection = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var objects_1 = __webpack_require__(/*! @theia/core/lib/common/objects */ "./node_modules/@theia/core/lib/common/objects.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var message_service_1 = __webpack_require__(/*! @theia/core/lib/common/message-service */ "./node_modules/@theia/core/lib/common/message-service.js");
var frontend_application_state_1 = __webpack_require__(/*! @theia/core/lib/browser/frontend-application-state */ "./node_modules/@theia/core/lib/browser/frontend-application-state.js");
var monitor_service_1 = __webpack_require__(/*! ../../common/protocol/monitor-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/monitor-service.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ../boards/boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var boards_service_1 = __webpack_require__(/*! ../../common/protocol/boards-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js");
var monitor_service_client_impl_1 = __webpack_require__(/*! ./monitor-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-service-client-impl.js");
var boards_config_1 = __webpack_require__(/*! ../boards/boards-config */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-config.js");
var monitor_model_1 = __webpack_require__(/*! ./monitor-model */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-model.js");
var MonitorConnection = /** @class */ (function () {
    function MonitorConnection() {
        /**
         * Note: The idea is to toggle this property from the UI (`Monitor` view)
         * and the boards config and the boards attachment/detachment logic can be at on place, here.
         */
        this._autoConnect = false;
        this.onConnectionChangedEmitter = new event_1.Emitter();
        /**
         * This emitter forwards all read events **iff** the connection is established.
         */
        this.onReadEmitter = new event_1.Emitter();
        /**
         * Array for storing previous monitor errors received from the server, and based on the number of elements in this array,
         * we adjust the reconnection delay.
         * Super naive way: we wait `array.length * 1000` ms. Once we hit 10 errors, we do not try to reconnect and clean the array.
         */
        this.monitorErrors = [];
    }
    MonitorConnection_1 = MonitorConnection;
    MonitorConnection.prototype.init = function () {
        var _this = this;
        // Forward the messages from the board **iff** connected.
        this.monitorServiceClient.onRead(function (event) {
            if (_this.connected) {
                _this.onReadEmitter.fire(event);
            }
        });
        this.monitorServiceClient.onError(function (error) { return __awaiter(_this, void 0, void 0, function () {
            var shouldReconnect, code, config, board, port, options, oldState_1, attempts, timeout;
            var _this = this;
            return __generator(this, function (_a) {
                shouldReconnect = false;
                if (this.state) {
                    code = error.code, config = error.config;
                    board = config.board, port = config.port;
                    options = { timeout: 3000 };
                    switch (code) {
                        case monitor_service_1.MonitorError.ErrorCodes.CLIENT_CANCEL: {
                            console.debug("Connection was canceled by client: " + MonitorConnection_1.State.toString(this.state) + ".");
                            break;
                        }
                        case monitor_service_1.MonitorError.ErrorCodes.DEVICE_BUSY: {
                            this.messageService.warn("Connection failed. Serial port is busy: " + boards_service_1.Port.toString(port) + ".", options);
                            shouldReconnect = this.autoConnect;
                            this.monitorErrors.push(error);
                            break;
                        }
                        case monitor_service_1.MonitorError.ErrorCodes.DEVICE_NOT_CONFIGURED: {
                            this.messageService.info("Disconnected " + boards_service_1.Board.toString(board, { useFqbn: false }) + " from " + boards_service_1.Port.toString(port) + ".", options);
                            break;
                        }
                        case undefined: {
                            this.messageService.error("Unexpected error. Reconnecting " + boards_service_1.Board.toString(board) + " on port " + boards_service_1.Port.toString(port) + ".", options);
                            console.error(JSON.stringify(error));
                            shouldReconnect = this.connected && this.autoConnect;
                            break;
                        }
                    }
                    oldState_1 = this.state;
                    this.state = undefined;
                    this.onConnectionChangedEmitter.fire(this.state);
                    if (shouldReconnect) {
                        if (this.monitorErrors.length >= 10) {
                            this.messageService.warn("Failed to reconnect " + boards_service_1.Board.toString(board, { useFqbn: false }) + " to the the serial-monitor after 10 consecutive attempts. The " + boards_service_1.Port.toString(port) + " serial port is busy. after 10 consecutive attempts.");
                            this.monitorErrors.length = 0;
                        }
                        else {
                            attempts = (this.monitorErrors.length || 1);
                            if (this.reconnectTimeout !== undefined) {
                                // Clear the previous timer.
                                window.clearTimeout(this.reconnectTimeout);
                            }
                            timeout = attempts * 1000;
                            this.messageService.warn("Reconnecting " + boards_service_1.Board.toString(board, { useFqbn: false }) + " to " + boards_service_1.Port.toString(port) + " in " + attempts + " seconds...", { timeout: timeout });
                            this.reconnectTimeout = window.setTimeout(function () { return _this.connect(oldState_1.config); }, timeout);
                        }
                    }
                }
                return [2 /*return*/];
            });
        }); });
        this.boardsServiceClient.onBoardsConfigChanged(this.handleBoardConfigChange.bind(this));
        this.boardsServiceClient.onAttachedBoardsChanged(function (event) {
            if (_this.autoConnect && _this.connected) {
                var boardsConfig_1 = _this.boardsServiceClient.boardsConfig;
                if (_this.boardsServiceClient.canUploadTo(boardsConfig_1, { silent: false })) {
                    var attached = boards_service_1.AttachedBoardsChangeEvent.diff(event).attached;
                    if (attached.boards.some(function (board) { return !!board.port && boards_config_1.BoardsConfig.Config.sameAs(boardsConfig_1, board); })) {
                        var board_1 = boardsConfig_1.selectedBoard, port_1 = boardsConfig_1.selectedPort;
                        var baudRate_1 = _this.monitorModel.baudRate;
                        _this.disconnect()
                            .then(function () { return _this.connect({ board: board_1, port: port_1, baudRate: baudRate_1 }); });
                    }
                }
            }
        });
        // Handles the `baudRate` changes by reconnecting if required.
        this.monitorModel.onChange(function (_a) {
            var property = _a.property;
            if (property === 'baudRate' && _this.autoConnect && _this.connected) {
                var boardsConfig = _this.boardsServiceClient.boardsConfig;
                _this.handleBoardConfigChange(boardsConfig);
            }
        });
    };
    Object.defineProperty(MonitorConnection.prototype, "connected", {
        get: function () {
            return !!this.state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonitorConnection.prototype, "monitorConfig", {
        get: function () {
            return this.state ? this.state.config : undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonitorConnection.prototype, "autoConnect", {
        get: function () {
            return this._autoConnect;
        },
        set: function (value) {
            var _this = this;
            var oldValue = this._autoConnect;
            this._autoConnect = value;
            // When we enable the auto-connect, we have to connect
            if (!oldValue && value) {
                // We have to make sure the previous boards config has been restored.
                // Otherwise, we might start the auto-connection without configured boards.
                this.applicationState.reachedState('started_contributions').then(function () {
                    var boardsConfig = _this.boardsServiceClient.boardsConfig;
                    _this.handleBoardConfigChange(boardsConfig);
                });
            }
            else if (oldValue && !value) {
                if (this.reconnectTimeout !== undefined) {
                    window.clearTimeout(this.reconnectTimeout);
                    this.monitorErrors.length = 0;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    MonitorConnection.prototype.connect = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var disconnectStatus, connectStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.disconnect()];
                    case 1:
                        disconnectStatus = _a.sent();
                        if (!monitor_service_1.Status.isOK(disconnectStatus)) {
                            return [2 /*return*/, disconnectStatus];
                        }
                        _a.label = 2;
                    case 2:
                        console.info(">>> Creating serial monitor connection for " + boards_service_1.Board.toString(config.board) + " on port " + boards_service_1.Port.toString(config.port) + "...");
                        return [4 /*yield*/, this.monitorService.connect(config)];
                    case 3:
                        connectStatus = _a.sent();
                        if (monitor_service_1.Status.isOK(connectStatus)) {
                            this.state = { config: config };
                            console.info("<<< Serial monitor connection created for " + boards_service_1.Board.toString(config.board, { useFqbn: false }) + " on port " + boards_service_1.Port.toString(config.port) + ".");
                        }
                        this.onConnectionChangedEmitter.fire(this.state);
                        return [2 /*return*/, monitor_service_1.Status.isOK(connectStatus)];
                }
            });
        });
    };
    MonitorConnection.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateCopy, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            return [2 /*return*/, monitor_service_1.Status.OK];
                        }
                        stateCopy = objects_1.deepClone(this.state);
                        if (!stateCopy) {
                            return [2 /*return*/, monitor_service_1.Status.OK];
                        }
                        console.log('>>> Disposing existing monitor connection...');
                        return [4 /*yield*/, this.monitorService.disconnect()];
                    case 1:
                        status = _a.sent();
                        if (monitor_service_1.Status.isOK(status)) {
                            console.log("<<< Disposed connection. Was: " + MonitorConnection_1.State.toString(stateCopy));
                        }
                        else {
                            console.warn("<<< Could not dispose connection. Activate connection: " + MonitorConnection_1.State.toString(stateCopy));
                        }
                        this.state = undefined;
                        this.onConnectionChangedEmitter.fire(this.state);
                        return [2 /*return*/, status];
                }
            });
        });
    };
    /**
     * Sends the data to the connected serial monitor.
     * The desired EOL is appended to `data`, you do not have to add it.
     * It is a NOOP if connected.
     */
    MonitorConnection.prototype.send = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.connected) {
                    return [2 /*return*/, monitor_service_1.Status.NOT_CONNECTED];
                }
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.monitorService.send(data + _this.monitorModel.lineEnding)
                            .then(function () { return resolve(monitor_service_1.Status.OK); });
                    })];
            });
        });
    };
    Object.defineProperty(MonitorConnection.prototype, "onConnectionChanged", {
        get: function () {
            return this.onConnectionChangedEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonitorConnection.prototype, "onRead", {
        get: function () {
            return this.onReadEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    MonitorConnection.prototype.handleBoardConfigChange = function (boardsConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.autoConnect) {
                    if (this.boardsServiceClient.canUploadTo(boardsConfig, { silent: false })) {
                        // Instead of calling `getAttachedBoards` and filtering for `AttachedSerialBoard` we have to check the available ports.
                        // The connected board might be unknown. See: https://github.com/arduino/arduino-pro-ide/issues/127#issuecomment-563251881
                        this.boardsService.getAvailablePorts().then(function (ports) {
                            if (ports.some(function (port) { return boards_service_1.Port.equals(port, boardsConfig.selectedPort); })) {
                                new Promise(function (resolve) {
                                    // First, disconnect if connected.
                                    if (_this.connected) {
                                        _this.disconnect().then(function () { return resolve(); });
                                        return;
                                    }
                                    resolve();
                                }).then(function () {
                                    // Then (re-)connect.
                                    var board = boardsConfig.selectedBoard, port = boardsConfig.selectedPort;
                                    var baudRate = _this.monitorModel.baudRate;
                                    _this.connect({ board: board, port: port, baudRate: baudRate });
                                });
                            }
                        });
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    var MonitorConnection_1;
    __decorate([
        inversify_1.inject(monitor_model_1.MonitorModel),
        __metadata("design:type", monitor_model_1.MonitorModel)
    ], MonitorConnection.prototype, "monitorModel", void 0);
    __decorate([
        inversify_1.inject(monitor_service_1.MonitorService),
        __metadata("design:type", Object)
    ], MonitorConnection.prototype, "monitorService", void 0);
    __decorate([
        inversify_1.inject(monitor_service_client_impl_1.MonitorServiceClientImpl),
        __metadata("design:type", monitor_service_client_impl_1.MonitorServiceClientImpl)
    ], MonitorConnection.prototype, "monitorServiceClient", void 0);
    __decorate([
        inversify_1.inject(boards_service_1.BoardsService),
        __metadata("design:type", Object)
    ], MonitorConnection.prototype, "boardsService", void 0);
    __decorate([
        inversify_1.inject(boards_service_client_impl_1.BoardsServiceClientImpl),
        __metadata("design:type", boards_service_client_impl_1.BoardsServiceClientImpl)
    ], MonitorConnection.prototype, "boardsServiceClient", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], MonitorConnection.prototype, "messageService", void 0);
    __decorate([
        inversify_1.inject(frontend_application_state_1.FrontendApplicationStateService),
        __metadata("design:type", frontend_application_state_1.FrontendApplicationStateService)
    ], MonitorConnection.prototype, "applicationState", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MonitorConnection.prototype, "init", null);
    MonitorConnection = MonitorConnection_1 = __decorate([
        inversify_1.injectable()
    ], MonitorConnection);
    return MonitorConnection;
}());
exports.MonitorConnection = MonitorConnection;
(function (MonitorConnection) {
    var State;
    (function (State) {
        function toString(state) {
            var config = state.config;
            var board = config.board, port = config.port;
            return boards_service_1.Board.toString(board) + " " + boards_service_1.Port.toString(port);
        }
        State.toString = toString;
    })(State = MonitorConnection.State || (MonitorConnection.State = {}));
})(MonitorConnection = exports.MonitorConnection || (exports.MonitorConnection = {}));
exports.MonitorConnection = MonitorConnection;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-model.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-model.js ***!
  \*********************************************************************************/
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
exports.MonitorModel = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var monitor_service_1 = __webpack_require__(/*! ../../common/protocol/monitor-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/monitor-service.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var boards_service_client_impl_1 = __webpack_require__(/*! ../boards/boards-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/boards/boards-service-client-impl.js");
var MonitorModel = /** @class */ (function () {
    function MonitorModel() {
        this._autoscroll = true;
        this._timestamp = false;
        this._baudRate = monitor_service_1.MonitorConfig.BaudRate.DEFAULT;
        this._lineEnding = MonitorModel_1.EOL.DEFAULT;
        this.onChangeEmitter = new event_1.Emitter();
    }
    MonitorModel_1 = MonitorModel;
    MonitorModel.prototype.onStart = function () {
        var _this = this;
        this.localStorageService.getData(MonitorModel_1.STORAGE_ID).then(function (state) {
            if (state) {
                _this.restoreState(state);
            }
        });
    };
    Object.defineProperty(MonitorModel.prototype, "onChange", {
        get: function () {
            return this.onChangeEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonitorModel.prototype, "autoscroll", {
        get: function () {
            return this._autoscroll;
        },
        enumerable: false,
        configurable: true
    });
    MonitorModel.prototype.toggleAutoscroll = function () {
        var _this = this;
        this._autoscroll = !this._autoscroll;
        this.storeState();
        this.storeState().then(function () { return _this.onChangeEmitter.fire({ property: 'autoscroll', value: _this._autoscroll }); });
    };
    Object.defineProperty(MonitorModel.prototype, "timestamp", {
        get: function () {
            return this._timestamp;
        },
        enumerable: false,
        configurable: true
    });
    MonitorModel.prototype.toggleTimestamp = function () {
        var _this = this;
        this._timestamp = !this._timestamp;
        this.storeState().then(function () { return _this.onChangeEmitter.fire({ property: 'timestamp', value: _this._timestamp }); });
    };
    Object.defineProperty(MonitorModel.prototype, "baudRate", {
        get: function () {
            return this._baudRate;
        },
        set: function (baudRate) {
            var _this = this;
            this._baudRate = baudRate;
            this.storeState().then(function () { return _this.onChangeEmitter.fire({ property: 'baudRate', value: _this._baudRate }); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonitorModel.prototype, "lineEnding", {
        get: function () {
            return this._lineEnding;
        },
        set: function (lineEnding) {
            var _this = this;
            this._lineEnding = lineEnding;
            this.storeState().then(function () { return _this.onChangeEmitter.fire({ property: 'lineEnding', value: _this._lineEnding }); });
        },
        enumerable: false,
        configurable: true
    });
    MonitorModel.prototype.restoreState = function (state) {
        this._autoscroll = state.autoscroll;
        this._timestamp = state.timestamp;
        this._baudRate = state.baudRate;
        this._lineEnding = state.lineEnding;
    };
    MonitorModel.prototype.storeState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.localStorageService.setData(MonitorModel_1.STORAGE_ID, {
                        autoscroll: this._autoscroll,
                        timestamp: this._timestamp,
                        baudRate: this._baudRate,
                        lineEnding: this._lineEnding
                    })];
            });
        });
    };
    var MonitorModel_1;
    MonitorModel.STORAGE_ID = 'arduino-monitor-model';
    __decorate([
        inversify_1.inject(browser_1.LocalStorageService),
        __metadata("design:type", browser_1.LocalStorageService)
    ], MonitorModel.prototype, "localStorageService", void 0);
    __decorate([
        inversify_1.inject(boards_service_client_impl_1.BoardsServiceClientImpl),
        __metadata("design:type", boards_service_client_impl_1.BoardsServiceClientImpl)
    ], MonitorModel.prototype, "boardsServiceClient", void 0);
    MonitorModel = MonitorModel_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], MonitorModel);
    return MonitorModel;
}());
exports.MonitorModel = MonitorModel;
(function (MonitorModel) {
    var EOL;
    (function (EOL) {
        EOL.DEFAULT = '\n';
    })(EOL = MonitorModel.EOL || (MonitorModel.EOL = {}));
})(MonitorModel = exports.MonitorModel || (exports.MonitorModel = {}));
exports.MonitorModel = MonitorModel;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-service-client-impl.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-service-client-impl.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorServiceClientImpl = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var MonitorServiceClientImpl = /** @class */ (function () {
    function MonitorServiceClientImpl() {
        this.onReadEmitter = new event_1.Emitter();
        this.onErrorEmitter = new event_1.Emitter();
        this.onRead = this.onReadEmitter.event;
        this.onError = this.onErrorEmitter.event;
    }
    MonitorServiceClientImpl.prototype.notifyRead = function (event) {
        this.onReadEmitter.fire(event);
        var data = event.data;
        console.debug("Received data: " + data);
    };
    MonitorServiceClientImpl.prototype.notifyError = function (error) {
        this.onErrorEmitter.fire(error);
    };
    MonitorServiceClientImpl = __decorate([
        inversify_1.injectable()
    ], MonitorServiceClientImpl);
    return MonitorServiceClientImpl;
}());
exports.MonitorServiceClientImpl = MonitorServiceClientImpl;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-view-contribution.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-view-contribution.js ***!
  \*********************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorViewContribution = exports.SerialMonitor = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var monitor_widget_1 = __webpack_require__(/*! ./monitor-widget */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-widget.js");
var arduino_toolbar_1 = __webpack_require__(/*! ../toolbar/arduino-toolbar */ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar.js");
var monitor_model_1 = __webpack_require__(/*! ./monitor-model */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-model.js");
var arduino_menus_1 = __webpack_require__(/*! ../menu/arduino-menus */ "./node_modules/arduino-ide-extension/lib/browser/menu/arduino-menus.js");
var SerialMonitor;
(function (SerialMonitor) {
    var Commands;
    (function (Commands) {
        Commands.AUTOSCROLL = {
            id: 'serial-monitor-autoscroll',
            label: 'Autoscroll'
        };
        Commands.TIMESTAMP = {
            id: 'serial-monitor-timestamp',
            label: 'Timestamp'
        };
        Commands.CLEAR_OUTPUT = {
            id: 'serial-monitor-clear-output',
            label: 'Clear Output',
            iconClass: 'clear-all'
        };
    })(Commands = SerialMonitor.Commands || (SerialMonitor.Commands = {}));
})(SerialMonitor = exports.SerialMonitor || (exports.SerialMonitor = {}));
var MonitorViewContribution = /** @class */ (function (_super) {
    __extends(MonitorViewContribution, _super);
    function MonitorViewContribution() {
        var _this = _super.call(this, {
            widgetId: monitor_widget_1.MonitorWidget.ID,
            widgetName: 'Serial Monitor',
            defaultWidgetOptions: {
                area: 'bottom'
            },
            toggleCommandId: MonitorViewContribution_1.TOGGLE_SERIAL_MONITOR,
            toggleKeybinding: 'CtrlCmd+Shift+M'
        }) || this;
        _this.toggleAutoScroll = function () { return _this.doToggleAutoScroll(); };
        _this.toggleTimestamp = function () { return _this.doToggleTimestamp(); };
        return _this;
    }
    MonitorViewContribution_1 = MonitorViewContribution;
    MonitorViewContribution.prototype.registerMenus = function (menus) {
        if (this.toggleCommand) {
            menus.registerMenuAction(arduino_menus_1.ArduinoMenus.TOOLS__MAIN_GROUP, {
                commandId: this.toggleCommand.id,
                label: 'Serial Monitor',
                order: '5'
            });
        }
    };
    MonitorViewContribution.prototype.registerToolbarItems = function (registry) {
        var _this = this;
        registry.registerItem({
            id: 'monitor-autoscroll',
            render: function () { return _this.renderAutoScrollButton(); },
            isVisible: function (widget) { return widget instanceof monitor_widget_1.MonitorWidget; },
            onDidChange: this.model.onChange // XXX: it's a hack. See: https://github.com/eclipse-theia/theia/pull/6696/
        });
        registry.registerItem({
            id: 'monitor-timestamp',
            render: function () { return _this.renderTimestampButton(); },
            isVisible: function (widget) { return widget instanceof monitor_widget_1.MonitorWidget; },
            onDidChange: this.model.onChange // XXX: it's a hack. See: https://github.com/eclipse-theia/theia/pull/6696/
        });
        registry.registerItem({
            id: SerialMonitor.Commands.CLEAR_OUTPUT.id,
            command: SerialMonitor.Commands.CLEAR_OUTPUT.id,
            tooltip: 'Clear Output'
        });
    };
    MonitorViewContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(SerialMonitor.Commands.CLEAR_OUTPUT, {
            isEnabled: function (widget) { return widget instanceof monitor_widget_1.MonitorWidget; },
            isVisible: function (widget) { return widget instanceof monitor_widget_1.MonitorWidget; },
            execute: function (widget) {
                if (widget instanceof monitor_widget_1.MonitorWidget) {
                    widget.clearConsole();
                }
            }
        });
        if (this.toggleCommand) {
            commands.registerCommand(this.toggleCommand, { execute: function () { return _this.toggle(); } });
            commands.registerCommand({ id: MonitorViewContribution_1.TOGGLE_SERIAL_MONITOR_TOOLBAR }, {
                isVisible: function (widget) { return arduino_toolbar_1.ArduinoToolbar.is(widget) && widget.side === 'right'; },
                execute: function () { return _this.toggle(); }
            });
        }
    };
    MonitorViewContribution.prototype.toggle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        widget = this.tryGetWidget();
                        if (!widget) return [3 /*break*/, 1];
                        widget.dispose();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.openView({ activate: true, reveal: true })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MonitorViewContribution.prototype.renderAutoScrollButton = function () {
        return React.createElement(React.Fragment, { key: 'autoscroll-toolbar-item' },
            React.createElement("div", { title: 'Toggle Autoscroll', className: "item enabled fa fa-angle-double-down arduino-monitor " + (this.model.autoscroll ? 'toggled' : ''), onClick: this.toggleAutoScroll }));
    };
    MonitorViewContribution.prototype.doToggleAutoScroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.model.toggleAutoscroll();
                return [2 /*return*/];
            });
        });
    };
    MonitorViewContribution.prototype.renderTimestampButton = function () {
        return React.createElement(React.Fragment, { key: 'line-ending-toolbar-item' },
            React.createElement("div", { title: 'Toggle Timestamp', className: "item enabled fa fa-clock-o arduino-monitor " + (this.model.timestamp ? 'toggled' : ''), onClick: this.toggleTimestamp }));
    };
    MonitorViewContribution.prototype.doToggleTimestamp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.model.toggleTimestamp();
                return [2 /*return*/];
            });
        });
    };
    var MonitorViewContribution_1;
    MonitorViewContribution.TOGGLE_SERIAL_MONITOR = monitor_widget_1.MonitorWidget.ID + ':toggle';
    MonitorViewContribution.TOGGLE_SERIAL_MONITOR_TOOLBAR = monitor_widget_1.MonitorWidget.ID + ':toggle-toolbar';
    __decorate([
        inversify_1.inject(monitor_model_1.MonitorModel),
        __metadata("design:type", monitor_model_1.MonitorModel)
    ], MonitorViewContribution.prototype, "model", void 0);
    MonitorViewContribution = MonitorViewContribution_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], MonitorViewContribution);
    return MonitorViewContribution;
}(browser_1.AbstractViewContribution));
exports.MonitorViewContribution = MonitorViewContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-widget.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-widget.js ***!
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerialMonitorOutput = exports.SerialMonitorSendInput = exports.MonitorWidget = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var dateFormat = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var os_1 = __webpack_require__(/*! @theia/core/lib/common/os */ "./node_modules/@theia/core/lib/common/os.js");
var event_1 = __webpack_require__(/*! @theia/core/lib/common/event */ "./node_modules/@theia/core/lib/common/event.js");
var keys_1 = __webpack_require__(/*! @theia/core/lib/browser/keys */ "./node_modules/@theia/core/lib/browser/keys.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var widgets_1 = __webpack_require__(/*! @theia/core/lib/browser/widgets */ "./node_modules/@theia/core/lib/browser/widgets/index.js");
var boards_service_1 = __webpack_require__(/*! ../../common/protocol/boards-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/boards-service.js");
var arduino_select_1 = __webpack_require__(/*! ../widgets/arduino-select */ "./node_modules/arduino-ide-extension/lib/browser/widgets/arduino-select.js");
var monitor_model_1 = __webpack_require__(/*! ./monitor-model */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-model.js");
var monitor_connection_1 = __webpack_require__(/*! ./monitor-connection */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-connection.js");
var monitor_service_client_impl_1 = __webpack_require__(/*! ./monitor-service-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/monitor/monitor-service-client-impl.js");
var MonitorWidget = /** @class */ (function (_super) {
    __extends(MonitorWidget, _super);
    function MonitorWidget() {
        var _this = _super.call(this) || this;
        /**
         * Guard against re-rendering the view after the close was requested.
         * See: https://github.com/eclipse-theia/theia/issues/6704
         */
        _this.closing = false;
        _this.clearOutputEmitter = new event_1.Emitter();
        _this.onFocusResolved = function (element) {
            _this.focusNode = element;
            requestAnimationFrame(function () { return widgets_1.MessageLoop.sendMessage(_this, widgets_1.Widget.Msg.ActivateRequest); });
        };
        _this.onSend = function (value) { return _this.doSend(value); };
        _this.onChangeLineEnding = function (option) {
            _this.monitorModel.lineEnding = option.value;
        };
        _this.onChangeBaudRate = function (option) {
            _this.monitorModel.baudRate = option.value;
        };
        _this.id = MonitorWidget_1.ID;
        _this.title.label = 'Serial Monitor';
        _this.title.iconClass = 'arduino-serial-monitor-tab-icon';
        _this.title.closable = true;
        _this.scrollOptions = undefined;
        _this.toDispose.push(_this.clearOutputEmitter);
        return _this;
    }
    MonitorWidget_1 = MonitorWidget;
    MonitorWidget.prototype.init = function () {
        var _this = this;
        this.update();
        this.toDispose.push(this.monitorConnection.onConnectionChanged(function () { return _this.clearConsole(); }));
    };
    MonitorWidget.prototype.clearConsole = function () {
        this.clearOutputEmitter.fire(undefined);
        this.update();
    };
    MonitorWidget.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    MonitorWidget.prototype.onAfterAttach = function (msg) {
        _super.prototype.onAfterAttach.call(this, msg);
        this.monitorConnection.autoConnect = true;
    };
    MonitorWidget.prototype.onCloseRequest = function (msg) {
        this.closing = true;
        this.monitorConnection.autoConnect = false;
        if (this.monitorConnection.connected) {
            this.monitorConnection.disconnect();
        }
        _super.prototype.onCloseRequest.call(this, msg);
    };
    MonitorWidget.prototype.onUpdateRequest = function (msg) {
        // TODO: `this.isAttached`
        // See: https://github.com/eclipse-theia/theia/issues/6704#issuecomment-562574713
        if (!this.closing && this.isAttached) {
            _super.prototype.onUpdateRequest.call(this, msg);
        }
    };
    MonitorWidget.prototype.onResize = function (msg) {
        _super.prototype.onResize.call(this, msg);
        this.widgetHeight = msg.height;
        this.update();
    };
    MonitorWidget.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        (this.focusNode || this.node).focus();
    };
    Object.defineProperty(MonitorWidget.prototype, "lineEndings", {
        get: function () {
            return [
                {
                    label: 'No Line Ending',
                    value: ''
                },
                {
                    label: 'New Line',
                    value: '\n'
                },
                {
                    label: 'Carriage Return',
                    value: '\r'
                },
                {
                    label: 'Both NL & CR',
                    value: '\r\n'
                }
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonitorWidget.prototype, "baudRates", {
        get: function () {
            var baudRates = [300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200];
            return baudRates.map(function (baudRate) { return ({ label: baudRate + ' baud', value: baudRate }); });
        },
        enumerable: false,
        configurable: true
    });
    MonitorWidget.prototype.render = function () {
        var _this = this;
        var _a = this, baudRates = _a.baudRates, lineEndings = _a.lineEndings;
        var lineEnding = lineEndings.find(function (item) { return item.value === _this.monitorModel.lineEnding; }) || lineEndings[1]; // Defaults to `\n`.
        var baudRate = baudRates.find(function (item) { return item.value === _this.monitorModel.baudRate; }) || baudRates[4]; // Defaults to `9600`.
        return React.createElement("div", { className: 'serial-monitor' },
            React.createElement("div", { className: 'head' },
                React.createElement("div", { className: 'send' },
                    React.createElement(SerialMonitorSendInput, { monitorConfig: this.monitorConnection.monitorConfig, resolveFocus: this.onFocusResolved, onSend: this.onSend })),
                React.createElement("div", { className: 'config' },
                    React.createElement("div", { className: 'select' },
                        React.createElement(arduino_select_1.ArduinoSelect, { maxMenuHeight: this.widgetHeight - 40, options: lineEndings, defaultValue: lineEnding, onChange: this.onChangeLineEnding })),
                    React.createElement("div", { className: 'select' },
                        React.createElement(arduino_select_1.ArduinoSelect, { className: 'select', maxMenuHeight: this.widgetHeight - 40, options: baudRates, defaultValue: baudRate, onChange: this.onChangeBaudRate })))),
            React.createElement("div", { className: 'body' },
                React.createElement(SerialMonitorOutput, { monitorModel: this.monitorModel, monitorConnection: this.monitorConnection, clearConsoleEvent: this.clearOutputEmitter.event })));
    };
    MonitorWidget.prototype.doSend = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.monitorConnection.send(value);
                return [2 /*return*/];
            });
        });
    };
    var MonitorWidget_1;
    MonitorWidget.ID = 'serial-monitor';
    __decorate([
        inversify_1.inject(monitor_model_1.MonitorModel),
        __metadata("design:type", monitor_model_1.MonitorModel)
    ], MonitorWidget.prototype, "monitorModel", void 0);
    __decorate([
        inversify_1.inject(monitor_connection_1.MonitorConnection),
        __metadata("design:type", monitor_connection_1.MonitorConnection)
    ], MonitorWidget.prototype, "monitorConnection", void 0);
    __decorate([
        inversify_1.inject(monitor_service_client_impl_1.MonitorServiceClientImpl),
        __metadata("design:type", monitor_service_client_impl_1.MonitorServiceClientImpl)
    ], MonitorWidget.prototype, "monitorServiceClient", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MonitorWidget.prototype, "init", null);
    MonitorWidget = MonitorWidget_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], MonitorWidget);
    return MonitorWidget;
}(widgets_1.ReactWidget));
exports.MonitorWidget = MonitorWidget;
var SerialMonitorSendInput = /** @class */ (function (_super) {
    __extends(SerialMonitorSendInput, _super);
    function SerialMonitorSendInput(props) {
        var _this = _super.call(this, props) || this;
        _this.setRef = function (element) {
            if (_this.props.resolveFocus) {
                _this.props.resolveFocus(element || undefined);
            }
        };
        _this.state = { text: '' };
        _this.onChange = _this.onChange.bind(_this);
        _this.onSend = _this.onSend.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        return _this;
    }
    SerialMonitorSendInput.prototype.render = function () {
        return React.createElement("input", { ref: this.setRef, type: 'text', className: "theia-input " + (this.props.monitorConfig ? '' : 'warning'), placeholder: this.placeholder, value: this.state.text, onChange: this.onChange, onKeyDown: this.onKeyDown });
    };
    Object.defineProperty(SerialMonitorSendInput.prototype, "placeholder", {
        get: function () {
            var monitorConfig = this.props.monitorConfig;
            if (!monitorConfig) {
                return 'Not connected. Select a board and a port to connect automatically.';
            }
            var board = monitorConfig.board, port = monitorConfig.port;
            return "Message (" + (os_1.isOSX ? '⌘' : 'Ctrl') + "+Enter to send message to '" + boards_service_1.Board.toString(board, { useFqbn: false }) + "' on '" + boards_service_1.Port.toString(port) + "')";
        },
        enumerable: false,
        configurable: true
    });
    SerialMonitorSendInput.prototype.onChange = function (event) {
        this.setState({ text: event.target.value });
    };
    SerialMonitorSendInput.prototype.onSend = function () {
        this.props.onSend(this.state.text);
        this.setState({ text: '' });
    };
    SerialMonitorSendInput.prototype.onKeyDown = function (event) {
        var keyCode = keys_1.KeyCode.createKeyCode(event.nativeEvent);
        if (keyCode) {
            var key = keyCode.key, meta = keyCode.meta, ctrl = keyCode.ctrl;
            if (key === keys_1.Key.ENTER && ((os_1.isOSX && meta) || (!os_1.isOSX && ctrl))) {
                this.onSend();
            }
        }
    };
    return SerialMonitorSendInput;
}(React.Component));
exports.SerialMonitorSendInput = SerialMonitorSendInput;
var SerialMonitorOutput = /** @class */ (function (_super) {
    __extends(SerialMonitorOutput, _super);
    function SerialMonitorOutput(props) {
        var _this = _super.call(this, props) || this;
        _this.toDisposeBeforeUnmount = new disposable_1.DisposableCollection();
        _this.state = { content: '', timestamp: _this.props.monitorModel.timestamp };
        return _this;
    }
    SerialMonitorOutput.prototype.render = function () {
        var _this = this;
        return React.createElement(React.Fragment, null,
            React.createElement("div", { style: ({ whiteSpace: 'pre', fontFamily: 'monospace' }) }, this.state.content),
            React.createElement("div", { style: { float: 'left', clear: 'both' }, ref: function (element) { _this.anchor = element; } }));
    };
    SerialMonitorOutput.prototype.componentDidMount = function () {
        var _this = this;
        this.scrollToBottom();
        this.toDisposeBeforeUnmount.pushAll([
            this.props.monitorConnection.onRead(function (_a) {
                var data = _a.data;
                var rawLines = data.split('\n');
                var lines = [];
                var timestamp = function () { return _this.state.timestamp ? dateFormat(new Date(), 'H:M:ss.l') + " -> " : ''; };
                for (var i = 0; i < rawLines.length; i++) {
                    if (i === 0 && _this.state.content.length !== 0) {
                        lines.push(rawLines[i]);
                    }
                    else {
                        lines.push(timestamp() + rawLines[i]);
                    }
                }
                var content = _this.state.content + lines.join('\n');
                _this.setState({ content: content });
            }),
            this.props.clearConsoleEvent(function () { return _this.setState({ content: '' }); }),
            this.props.monitorModel.onChange(function (_a) {
                var property = _a.property;
                if (property === 'timestamp') {
                    var timestamp = _this.props.monitorModel.timestamp;
                    _this.setState({ timestamp: timestamp });
                }
            })
        ]);
    };
    SerialMonitorOutput.prototype.componentDidUpdate = function () {
        this.scrollToBottom();
    };
    SerialMonitorOutput.prototype.componentWillUnmount = function () {
        // TODO: "Your preferred browser's local storage is almost full." Discard `content` before saving layout?
        this.toDisposeBeforeUnmount.dispose();
    };
    SerialMonitorOutput.prototype.scrollToBottom = function () {
        if (this.props.monitorModel.autoscroll && this.anchor) {
            this.anchor.scrollIntoView();
        }
    };
    return SerialMonitorOutput;
}(React.Component));
exports.SerialMonitorOutput = SerialMonitorOutput;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/core/about-dialog.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/core/about-dialog.js ***!
  \***********************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutDialog = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var about_dialog_1 = __webpack_require__(/*! @theia/core/lib/browser/about-dialog */ "./node_modules/@theia/core/lib/browser/about-dialog.js");
var config_service_1 = __webpack_require__(/*! ../../../common/protocol/config-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/config-service.js");
var AboutDialog = /** @class */ (function (_super) {
    __extends(AboutDialog, _super);
    function AboutDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AboutDialog.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, version, firstChild, cliVersion;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([_super.prototype.init.call(this), this.configService.getVersion()])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), version = _a[1];
                        if (version) {
                            firstChild = this.contentNode.firstChild;
                            if (firstChild instanceof HTMLElement && firstChild.classList.contains(about_dialog_1.ABOUT_CONTENT_CLASS)) {
                                cliVersion = document.createElement('div');
                                cliVersion.textContent = version;
                                firstChild.appendChild(cliVersion);
                                // TODO: anchor to the commit in the `arduino-cli` repository.
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(config_service_1.ConfigService),
        __metadata("design:type", Object)
    ], AboutDialog.prototype, "configService", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], AboutDialog.prototype, "init", null);
    AboutDialog = __decorate([
        inversify_1.injectable()
    ], AboutDialog);
    return AboutDialog;
}(about_dialog_1.AboutDialog));
exports.AboutDialog = AboutDialog;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/core/application-shell.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/core/application-shell.js ***!
  \****************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationShell = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/editor/lib/browser */ "./node_modules/@theia/editor/lib/browser/index.js");
var command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "./node_modules/@theia/core/lib/common/command.js");
var output_widget_1 = __webpack_require__(/*! @theia/output/lib/browser/output-widget */ "./node_modules/@theia/output/lib/browser/output-widget.js");
var browser_2 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var protocol_1 = __webpack_require__(/*! ../../../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
var editor_mode_1 = __webpack_require__(/*! ../../editor-mode */ "./node_modules/arduino-ide-extension/lib/browser/editor-mode.js");
var save_as_sketch_1 = __webpack_require__(/*! ../../contributions/save-as-sketch */ "./node_modules/arduino-ide-extension/lib/browser/contributions/save-as-sketch.js");
var sketches_service_client_impl_1 = __webpack_require__(/*! ../../../common/protocol/sketches-service-client-impl */ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service-client-impl.js");
var ApplicationShell = /** @class */ (function (_super) {
    __extends(ApplicationShell, _super);
    function ApplicationShell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplicationShell.prototype.track = function (widget) {
        _super.prototype.track.call(this, widget);
        if (widget instanceof output_widget_1.OutputWidget) {
            widget.title.closable = false; // TODO: https://arduino.slack.com/archives/C01698YT7S4/p1598011990133700
        }
        if (!this.editorMode.proMode && widget instanceof browser_1.EditorWidget) {
            // Make the editor un-closeable asynchronously.
            this.sketchesServiceClient.currentSketch().then(function (sketch) {
                if (sketch) {
                    if (protocol_1.Sketch.isInSketch(widget.editor.uri, sketch)) {
                        widget.title.closable = false;
                    }
                }
            });
        }
    };
    ApplicationShell.prototype.addWidget = function (widget, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ref, area, tabBar, last;
            return __generator(this, function (_a) {
                // By default, Theia open a widget **next** to the currently active in the target area.
                // Instead of this logic, we want to open the new widget after the last of the target area.
                if (!widget.id) {
                    console.error('Widgets added to the application shell must have a unique id property.');
                    return [2 /*return*/];
                }
                ref = options.ref;
                area = options.area || 'main';
                if (!ref && (area === 'main' || area === 'bottom')) {
                    tabBar = this.getTabBarFor(area);
                    if (tabBar) {
                        last = tabBar.titles[tabBar.titles.length - 1];
                        if (last) {
                            ref = last.owner;
                        }
                    }
                }
                return [2 /*return*/, _super.prototype.addWidget.call(this, widget, __assign(__assign({}, options), { ref: ref }))];
            });
        });
    };
    ApplicationShell.prototype.saveAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.saveAll.call(this)];
                    case 1:
                        _a.sent();
                        options = { execOnlyIfTemp: true, openAfterMove: true };
                        return [4 /*yield*/, this.commandService.executeCommand(save_as_sketch_1.SaveAsSketch.Commands.SAVE_AS_SKETCH.id, options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(editor_mode_1.EditorMode),
        __metadata("design:type", editor_mode_1.EditorMode)
    ], ApplicationShell.prototype, "editorMode", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandService),
        __metadata("design:type", Object)
    ], ApplicationShell.prototype, "commandService", void 0);
    __decorate([
        inversify_1.inject(sketches_service_client_impl_1.SketchesServiceClientImpl),
        __metadata("design:type", sketches_service_client_impl_1.SketchesServiceClientImpl)
    ], ApplicationShell.prototype, "sketchesServiceClient", void 0);
    ApplicationShell = __decorate([
        inversify_1.injectable()
    ], ApplicationShell);
    return ApplicationShell;
}(browser_2.ApplicationShell));
exports.ApplicationShell = ApplicationShell;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/core/common-frontend-contribution.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/core/common-frontend-contribution.js ***!
  \***************************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.CommonFrontendContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var common_frontend_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/common-frontend-contribution */ "./node_modules/@theia/core/lib/browser/common-frontend-contribution.js");
var CommonFrontendContribution = /** @class */ (function (_super) {
    __extends(CommonFrontendContribution, _super);
    function CommonFrontendContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonFrontendContribution.prototype.registerMenus = function (registry) {
        var e_1, _a;
        _super.prototype.registerMenus.call(this, registry);
        try {
            for (var _b = __values([
                common_frontend_contribution_1.CommonCommands.SAVE,
                common_frontend_contribution_1.CommonCommands.SAVE_ALL,
                common_frontend_contribution_1.CommonCommands.CUT,
                common_frontend_contribution_1.CommonCommands.COPY,
                common_frontend_contribution_1.CommonCommands.PASTE,
                common_frontend_contribution_1.CommonCommands.COPY_PATH,
                common_frontend_contribution_1.CommonCommands.FIND,
                common_frontend_contribution_1.CommonCommands.REPLACE,
                common_frontend_contribution_1.CommonCommands.AUTO_SAVE,
                common_frontend_contribution_1.CommonCommands.OPEN_PREFERENCES,
                common_frontend_contribution_1.CommonCommands.SELECT_ICON_THEME,
                common_frontend_contribution_1.CommonCommands.SELECT_COLOR_THEME
            ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var command = _c.value;
                registry.unregisterMenuAction(command);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    CommonFrontendContribution = __decorate([
        inversify_1.injectable()
    ], CommonFrontendContribution);
    return CommonFrontendContribution;
}(common_frontend_contribution_1.CommonFrontendContribution));
exports.CommonFrontendContribution = CommonFrontendContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/core/connection-status-service.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/core/connection-status-service.js ***!
  \************************************************************************************************/
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
exports.ApplicationConnectionStatusContribution = exports.FrontendConnectionStatusService = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var disposable_1 = __webpack_require__(/*! @theia/core/lib/common/disposable */ "./node_modules/@theia/core/lib/common/disposable.js");
var status_bar_1 = __webpack_require__(/*! @theia/core/lib/browser/status-bar/status-bar */ "./node_modules/@theia/core/lib/browser/status-bar/status-bar.js");
var connection_status_service_1 = __webpack_require__(/*! @theia/core/lib/browser/connection-status-service */ "./node_modules/@theia/core/lib/browser/connection-status-service.js");
var arduino_daemon_client_impl_1 = __webpack_require__(/*! ../../arduino-daemon-client-impl */ "./node_modules/arduino-ide-extension/lib/browser/arduino-daemon-client-impl.js");
var FrontendConnectionStatusService = /** @class */ (function (_super) {
    __extends(FrontendConnectionStatusService, _super);
    function FrontendConnectionStatusService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FrontendConnectionStatusService.prototype.init = function () {
        var _this = this;
        this.schedulePing();
        this.wsConnectionProvider.onIncomingMessageActivity(function () {
            // natural activity
            _this.updateStatus(_this.daemonClient.isRunning);
            _this.schedulePing();
        });
    };
    __decorate([
        inversify_1.inject(arduino_daemon_client_impl_1.ArduinoDaemonClientImpl),
        __metadata("design:type", arduino_daemon_client_impl_1.ArduinoDaemonClientImpl)
    ], FrontendConnectionStatusService.prototype, "daemonClient", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FrontendConnectionStatusService.prototype, "init", null);
    FrontendConnectionStatusService = __decorate([
        inversify_1.injectable()
    ], FrontendConnectionStatusService);
    return FrontendConnectionStatusService;
}(connection_status_service_1.FrontendConnectionStatusService));
exports.FrontendConnectionStatusService = FrontendConnectionStatusService;
var ApplicationConnectionStatusContribution = /** @class */ (function (_super) {
    __extends(ApplicationConnectionStatusContribution, _super);
    function ApplicationConnectionStatusContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplicationConnectionStatusContribution.prototype.onStateChange = function (state) {
        if (!this.daemonClient.isRunning && state === connection_status_service_1.ConnectionStatus.ONLINE) {
            return;
        }
        _super.prototype.onStateChange.call(this, state);
    };
    ApplicationConnectionStatusContribution.prototype.handleOffline = function () {
        var _this = this;
        var isRunning = this.daemonClient.isRunning;
        this.statusBar.setElement('connection-status', {
            alignment: status_bar_1.StatusBarAlignment.LEFT,
            text: isRunning ? 'Offline' : '$(bolt) CLI Daemon Offline',
            tooltip: isRunning ? 'Cannot connect to the backend.' : 'Cannot connect to the CLI daemon.',
            priority: 5000
        });
        this.toDisposeOnOnline.push(disposable_1.Disposable.create(function () { return _this.statusBar.removeElement('connection-status'); }));
        document.body.classList.add('theia-mod-offline');
        this.toDisposeOnOnline.push(disposable_1.Disposable.create(function () { return document.body.classList.remove('theia-mod-offline'); }));
    };
    __decorate([
        inversify_1.inject(arduino_daemon_client_impl_1.ArduinoDaemonClientImpl),
        __metadata("design:type", arduino_daemon_client_impl_1.ArduinoDaemonClientImpl)
    ], ApplicationConnectionStatusContribution.prototype, "daemonClient", void 0);
    ApplicationConnectionStatusContribution = __decorate([
        inversify_1.injectable()
    ], ApplicationConnectionStatusContribution);
    return ApplicationConnectionStatusContribution;
}(connection_status_service_1.ApplicationConnectionStatusContribution));
exports.ApplicationConnectionStatusContribution = ApplicationConnectionStatusContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/core/frontend-application.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/core/frontend-application.js ***!
  \*******************************************************************************************/
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
exports.FrontendApplication = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var filesystem_1 = __webpack_require__(/*! @theia/filesystem/lib/common/filesystem */ "./node_modules/@theia/filesystem/lib/common/filesystem.js");
var command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "./node_modules/@theia/core/lib/common/command.js");
var workspace_service_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-service */ "./node_modules/@theia/workspace/lib/browser/workspace-service.js");
var frontend_application_1 = __webpack_require__(/*! @theia/core/lib/browser/frontend-application */ "./node_modules/@theia/core/lib/browser/frontend-application.js");
var arduino_commands_1 = __webpack_require__(/*! ../../arduino-commands */ "./node_modules/arduino-ide-extension/lib/browser/arduino-commands.js");
var FrontendApplication = /** @class */ (function (_super) {
    __extends(FrontendApplication, _super);
    function FrontendApplication() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FrontendApplication.prototype.initializeLayout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var roots, roots_1, roots_1_1, root, exists, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.initializeLayout.call(this)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.workspaceService.roots];
                    case 2:
                        roots = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, 10, 11]);
                        roots_1 = __values(roots), roots_1_1 = roots_1.next();
                        _b.label = 4;
                    case 4:
                        if (!!roots_1_1.done) return [3 /*break*/, 8];
                        root = roots_1_1.value;
                        return [4 /*yield*/, this.fileSystem.exists(root.uri)];
                    case 5:
                        exists = _b.sent();
                        if (!exists) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.commandService.executeCommand(arduino_commands_1.ArduinoCommands.OPEN_SKETCH_FILES.id, root.uri)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        roots_1_1 = roots_1.next();
                        return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (roots_1_1 && !roots_1_1.done && (_a = roots_1.return)) _a.call(roots_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(filesystem_1.FileSystem),
        __metadata("design:type", Object)
    ], FrontendApplication.prototype, "fileSystem", void 0);
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], FrontendApplication.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandService),
        __metadata("design:type", Object)
    ], FrontendApplication.prototype, "commandService", void 0);
    FrontendApplication = __decorate([
        inversify_1.injectable()
    ], FrontendApplication);
    return FrontendApplication;
}(frontend_application_1.FrontendApplication));
exports.FrontendApplication = FrontendApplication;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/core/keybindings.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/core/keybindings.js ***!
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.KeybindingRegistry = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "./node_modules/@theia/core/lib/common/command.js");
var keybinding_1 = __webpack_require__(/*! @theia/core/lib/common/keybinding */ "./node_modules/@theia/core/lib/common/keybinding.js");
var keybinding_2 = __webpack_require__(/*! @theia/core/lib/browser/keybinding */ "./node_modules/@theia/core/lib/browser/keybinding.js");
var KeybindingRegistry = /** @class */ (function (_super) {
    __extends(KeybindingRegistry, _super);
    function KeybindingRegistry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeybindingRegistry.prototype.unregisterKeybinding = function (arg) {
        var e_1, _a;
        var keymap = this.keymaps[keybinding_2.KeybindingScope.DEFAULT];
        var filter = command_1.Command.is(arg)
            ? function (_a) {
                var command = _a.command;
                return command === arg.id;
            }
            : function (_a) {
                var keybinding = _a.keybinding;
                return keybinding_1.Keybinding.is(arg)
                    ? keybinding === arg.keybinding
                    : keybinding === arg;
            };
        try {
            for (var _b = __values(keymap.filter(filter)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var binding = _c.value;
                var idx = keymap.indexOf(binding);
                if (idx !== -1) {
                    keymap.splice(idx, 1);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    KeybindingRegistry = __decorate([
        inversify_1.injectable()
    ], KeybindingRegistry);
    return KeybindingRegistry;
}(keybinding_2.KeybindingRegistry));
exports.KeybindingRegistry = KeybindingRegistry;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/core/shell-layout-restorer.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/core/shell-layout-restorer.js ***!
  \********************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellLayoutRestorer = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var shell_layout_restorer_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/shell-layout-restorer */ "./node_modules/@theia/core/lib/browser/shell/shell-layout-restorer.js");
var ShellLayoutRestorer = /** @class */ (function (_super) {
    __extends(ShellLayoutRestorer, _super);
    function ShellLayoutRestorer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Workaround for https://github.com/eclipse-theia/theia/issues/6579.
    ShellLayoutRestorer.prototype.storeLayoutAsync = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            var layoutData, serializedLayoutData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldStoreLayout) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        this.logger.info('>>> Storing the layout...');
                        layoutData = app.shell.getLayoutData();
                        serializedLayoutData = this.deflate(layoutData);
                        return [4 /*yield*/, this.storageService.setData(this.storageKey, serializedLayoutData)];
                    case 2:
                        _a.sent();
                        this.logger.info('<<< The layout has been successfully stored.');
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.storageService.setData(this.storageKey, undefined)];
                    case 4:
                        _a.sent();
                        this.logger.error('Error during serialization of layout data', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ShellLayoutRestorer = __decorate([
        inversify_1.injectable()
    ], ShellLayoutRestorer);
    return ShellLayoutRestorer;
}(shell_layout_restorer_1.ShellLayoutRestorer));
exports.ShellLayoutRestorer = ShellLayoutRestorer;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/core/tab-bar-decorator.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/core/tab-bar-decorator.js ***!
  \****************************************************************************************/
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
exports.TabBarDecoratorService = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var tab_bar_decorator_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/tab-bar-decorator */ "./node_modules/@theia/core/lib/browser/shell/tab-bar-decorator.js");
var config_service_1 = __webpack_require__(/*! ../../../common/protocol/config-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/config-service.js");
var browser_1 = __webpack_require__(/*! @theia/editor/lib/browser */ "./node_modules/@theia/editor/lib/browser/index.js");
var TabBarDecoratorService = /** @class */ (function (_super) {
    __extends(TabBarDecoratorService, _super);
    function TabBarDecoratorService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabBarDecoratorService.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.configService.getConfiguration()
            .then(function (_a) {
            var dataDirUri = _a.dataDirUri;
            return _this.dataDirUri = new uri_1.default(dataDirUri);
        })
            .catch(function (err) { return _this.logger.error("Failed to determine the data directory: " + err); });
    };
    TabBarDecoratorService.prototype.getDecorations = function (title) {
        if (title.owner instanceof browser_1.EditorWidget) {
            var editor = title.owner.editor;
            if (this.dataDirUri && this.dataDirUri.isEqualOrParent(editor.uri)) {
                return [];
            }
        }
        return _super.prototype.getDecorations.call(this, title);
    };
    __decorate([
        inversify_1.inject(config_service_1.ConfigService),
        __metadata("design:type", Object)
    ], TabBarDecoratorService.prototype, "configService", void 0);
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], TabBarDecoratorService.prototype, "logger", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TabBarDecoratorService.prototype, "init", null);
    TabBarDecoratorService = __decorate([
        inversify_1.injectable()
    ], TabBarDecoratorService);
    return TabBarDecoratorService;
}(tab_bar_decorator_1.TabBarDecoratorService));
exports.TabBarDecoratorService = TabBarDecoratorService;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/core/tab-bar-toolbar.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/core/tab-bar-toolbar.js ***!
  \**************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.TabBarToolbar = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var label_parser_1 = __webpack_require__(/*! @theia/core/lib/browser/label-parser */ "./node_modules/@theia/core/lib/browser/label-parser.js");
var tab_bar_toolbar_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/tab-bar-toolbar */ "./node_modules/@theia/core/lib/browser/shell/tab-bar-toolbar.js");
var TabBarToolbar = /** @class */ (function (_super) {
    __extends(TabBarToolbar, _super);
    function TabBarToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabBarToolbar_1 = TabBarToolbar;
    /**
     * Copied over from Theia. Added an ID to the parent of the toolbar item (`--container`).
     * CSS3 does not support parent selectors but we want to style the parent of the toolbar item.
     */
    TabBarToolbar.prototype.renderItem = function (item) {
        var e_1, _a;
        var innerText = '';
        var classNames = [];
        if (item.text) {
            try {
                for (var _b = __values(this.labelParser.parse(item.text)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var labelPart = _c.value;
                    if (typeof labelPart !== 'string' && label_parser_1.LabelIcon.is(labelPart)) {
                        var className = "fa fa-" + labelPart.name + (labelPart.animation ? ' fa-' + labelPart.animation : '');
                        classNames.push.apply(classNames, __spread(className.split(' ')));
                    }
                    else {
                        innerText = labelPart;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var command = this.commands.getCommand(item.command);
        var iconClass = (typeof item.icon === 'function' && item.icon()) || item.icon || (command && command.iconClass);
        if (iconClass) {
            classNames.push(iconClass);
        }
        var tooltip = item.tooltip || (command && command.label);
        return React.createElement("div", { id: item.id + "--container", key: item.id, className: "" + TabBarToolbar_1.Styles.TAB_BAR_TOOLBAR_ITEM + (command && this.commandIsEnabled(command.id) ? ' enabled' : ''), onMouseDown: this.onMouseDownEvent, onMouseUp: this.onMouseUpEvent, onMouseOut: this.onMouseUpEvent },
            React.createElement("div", { id: item.id, className: classNames.join(' '), onClick: this.executeCommand, title: tooltip }, innerText));
    };
    var TabBarToolbar_1;
    TabBarToolbar = TabBarToolbar_1 = __decorate([
        inversify_1.injectable()
    ], TabBarToolbar);
    return TabBarToolbar;
}(tab_bar_toolbar_1.TabBarToolbar));
exports.TabBarToolbar = TabBarToolbar;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/editor/editor-contribution.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/editor/editor-contribution.js ***!
  \********************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var editor_contribution_1 = __webpack_require__(/*! @theia/editor/lib/browser/editor-contribution */ "./node_modules/@theia/editor/lib/browser/editor-contribution.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var EditorContribution = /** @class */ (function (_super) {
    __extends(EditorContribution, _super);
    function EditorContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorContribution.prototype.updateLanguageStatus = function (editor) {
    };
    EditorContribution.prototype.setCursorPositionStatus = function (editor) {
        if (!editor) {
            this.statusBar.removeElement('editor-status-cursor-position');
            return;
        }
        var cursor = editor.cursor;
        this.statusBar.setElement('editor-status-cursor-position', {
            text: "" + (cursor.line + 1),
            alignment: browser_1.StatusBarAlignment.LEFT,
            priority: 100
        });
    };
    EditorContribution = __decorate([
        inversify_1.injectable()
    ], EditorContribution);
    return EditorContribution;
}(editor_contribution_1.EditorContribution));
exports.EditorContribution = EditorContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/editor/editor-manager.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/editor/editor-manager.js ***!
  \***************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorManager = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var editor_manager_1 = __webpack_require__(/*! @theia/editor/lib/browser/editor-manager */ "./node_modules/@theia/editor/lib/browser/editor-manager.js");
var config_service_1 = __webpack_require__(/*! ../../../common/protocol/config-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/config-service.js");
var monaco_editor_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-editor */ "./node_modules/@theia/monaco/lib/browser/monaco-editor.js");
var EditorManager = /** @class */ (function (_super) {
    __extends(EditorManager, _super);
    function EditorManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorManager.prototype.open = function (uri, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, widget, readOnly, editor, codeEditor;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([_super.prototype.open.call(this, uri, options), this.isReadOnly(uri)])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), widget = _a[0], readOnly = _a[1];
                        if (readOnly) {
                            editor = widget.editor;
                            if (editor instanceof monaco_editor_1.MonacoEditor) {
                                codeEditor = editor.getControl();
                                codeEditor.updateOptions({ readOnly: readOnly });
                            }
                        }
                        return [2 /*return*/, widget];
                }
            });
        });
    };
    EditorManager.prototype.isReadOnly = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, config, configFileUri;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.configService.getConfiguration(),
                            this.configService.getCliConfigFileUri()
                        ])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), config = _a[0], configFileUri = _a[1];
                        if (new uri_1.default(configFileUri).toString(true) === uri.toString(true)) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, new uri_1.default(config.dataDirUri).isEqualOrParent(uri)];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(config_service_1.ConfigService),
        __metadata("design:type", Object)
    ], EditorManager.prototype, "configService", void 0);
    EditorManager = __decorate([
        inversify_1.injectable()
    ], EditorManager);
    return EditorManager;
}(editor_manager_1.EditorManager));
exports.EditorManager = EditorManager;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/editor/editor-widget-factory.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/editor/editor-widget-factory.js ***!
  \**********************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorWidgetFactory = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var editor_widget_factory_1 = __webpack_require__(/*! @theia/editor/lib/browser/editor-widget-factory */ "./node_modules/@theia/editor/lib/browser/editor-widget-factory.js");
var sketches_service_client_impl_1 = __webpack_require__(/*! ../../../common/protocol/sketches-service-client-impl */ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service-client-impl.js");
var protocol_1 = __webpack_require__(/*! ../../../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
var EditorWidgetFactory = /** @class */ (function (_super) {
    __extends(EditorWidgetFactory, _super);
    function EditorWidgetFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorWidgetFactory.prototype.createEditor = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var widget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.createEditor.call(this, uri)];
                    case 1:
                        widget = _a.sent();
                        return [2 /*return*/, this.maybeUpdateCaption(widget)];
                }
            });
        });
    };
    EditorWidgetFactory.prototype.maybeUpdateCaption = function (widget) {
        return __awaiter(this, void 0, void 0, function () {
            var sketch, uri, isTemp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sketchesServiceClient.currentSketch()];
                    case 1:
                        sketch = _a.sent();
                        uri = widget.editor.uri;
                        if (!(sketch && protocol_1.Sketch.isInSketch(uri, sketch))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sketchesService.isTemp(sketch)];
                    case 2:
                        isTemp = _a.sent();
                        if (isTemp) {
                            widget.title.caption = "Unsaved \u2013 " + this.labelProvider.getName(uri);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, widget];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(protocol_1.SketchesService),
        __metadata("design:type", Object)
    ], EditorWidgetFactory.prototype, "sketchesService", void 0);
    __decorate([
        inversify_1.inject(sketches_service_client_impl_1.SketchesServiceClientImpl),
        __metadata("design:type", sketches_service_client_impl_1.SketchesServiceClientImpl)
    ], EditorWidgetFactory.prototype, "sketchesServiceClient", void 0);
    __decorate([
        inversify_1.inject(browser_1.LabelProvider),
        __metadata("design:type", browser_1.LabelProvider)
    ], EditorWidgetFactory.prototype, "labelProvider", void 0);
    EditorWidgetFactory = __decorate([
        inversify_1.injectable()
    ], EditorWidgetFactory);
    return EditorWidgetFactory;
}(editor_widget_factory_1.EditorWidgetFactory));
exports.EditorWidgetFactory = EditorWidgetFactory;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/markers/problem-contribution.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/markers/problem-contribution.js ***!
  \**********************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var problem_contribution_1 = __webpack_require__(/*! @theia/markers/lib/browser/problem/problem-contribution */ "./node_modules/@theia/markers/lib/browser/problem/problem-contribution.js");
var editor_mode_1 = __webpack_require__(/*! ../../editor-mode */ "./node_modules/arduino-ide-extension/lib/browser/editor-mode.js");
var ProblemContribution = /** @class */ (function (_super) {
    __extends(ProblemContribution, _super);
    function ProblemContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProblemContribution.prototype.initializeLayout = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.editorMode.proMode) {
                    return [2 /*return*/, _super.prototype.initializeLayout.call(this, app)];
                }
                return [2 /*return*/];
            });
        });
    };
    ProblemContribution.prototype.setStatusBarElement = function (problemStat) {
        if (this.editorMode.proMode) {
            _super.prototype.setStatusBarElement.call(this, problemStat);
        }
    };
    ProblemContribution.prototype.registerKeybindings = function (keybindings) {
        if (this.toggleCommand) {
            keybindings.registerKeybinding({
                command: this.toggleCommand.id,
                keybinding: 'ctrlcmd+alt+shift+m'
            });
        }
    };
    __decorate([
        inversify_1.inject(editor_mode_1.EditorMode),
        __metadata("design:type", editor_mode_1.EditorMode)
    ], ProblemContribution.prototype, "editorMode", void 0);
    ProblemContribution = __decorate([
        inversify_1.injectable()
    ], ProblemContribution);
    return ProblemContribution;
}(problem_contribution_1.ProblemContribution));
exports.ProblemContribution = ProblemContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/markers/problem-manager.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/markers/problem-manager.js ***!
  \*****************************************************************************************/
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
exports.ProblemManager = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var problem_manager_1 = __webpack_require__(/*! @theia/markers/lib/browser/problem/problem-manager */ "./node_modules/@theia/markers/lib/browser/problem/problem-manager.js");
var config_service_1 = __webpack_require__(/*! ../../../common/protocol/config-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/config-service.js");
var ProblemManager = /** @class */ (function (_super) {
    __extends(ProblemManager, _super);
    function ProblemManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProblemManager.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.configService.getConfiguration()
            .then(function (_a) {
            var dataDirUri = _a.dataDirUri;
            return _this.dataDirUri = new uri_1.default(dataDirUri);
        })
            .catch(function (err) { return _this.logger.error("Failed to determine the data directory: " + err); });
    };
    ProblemManager.prototype.setMarkers = function (uri, owner, data) {
        if (this.dataDirUri && this.dataDirUri.isEqualOrParent(uri)) {
            return [];
        }
        return _super.prototype.setMarkers.call(this, uri, owner, data);
    };
    __decorate([
        inversify_1.inject(config_service_1.ConfigService),
        __metadata("design:type", Object)
    ], ProblemManager.prototype, "configService", void 0);
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], ProblemManager.prototype, "logger", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProblemManager.prototype, "init", null);
    ProblemManager = __decorate([
        inversify_1.injectable()
    ], ProblemManager);
    return ProblemManager;
}(problem_manager_1.ProblemManager));
exports.ProblemManager = ProblemManager;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/monaco/monaco-status-bar-contribution.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/monaco/monaco-status-bar-contribution.js ***!
  \*******************************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoStatusBarContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var monaco_status_bar_contribution_1 = __webpack_require__(/*! @theia/monaco/lib/browser/monaco-status-bar-contribution */ "./node_modules/@theia/monaco/lib/browser/monaco-status-bar-contribution.js");
var MonacoStatusBarContribution = /** @class */ (function (_super) {
    __extends(MonacoStatusBarContribution, _super);
    function MonacoStatusBarContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonacoStatusBarContribution.prototype.setConfigTabSizeWidget = function () {
    };
    MonacoStatusBarContribution.prototype.setLineEndingWidget = function () {
    };
    MonacoStatusBarContribution = __decorate([
        inversify_1.injectable()
    ], MonacoStatusBarContribution);
    return MonacoStatusBarContribution;
}(monaco_status_bar_contribution_1.MonacoStatusBarContribution));
exports.MonacoStatusBarContribution = MonacoStatusBarContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/navigator/navigator-contribution.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/navigator/navigator-contribution.js ***!
  \**************************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNavigatorContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var workspace_commands_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-commands */ "./node_modules/@theia/workspace/lib/browser/workspace-commands.js");
var navigator_contribution_1 = __webpack_require__(/*! @theia/navigator/lib/browser/navigator-contribution */ "./node_modules/@theia/navigator/lib/browser/navigator-contribution.js");
var editor_mode_1 = __webpack_require__(/*! ../../editor-mode */ "./node_modules/arduino-ide-extension/lib/browser/editor-mode.js");
var FileNavigatorContribution = /** @class */ (function (_super) {
    __extends(FileNavigatorContribution, _super);
    function FileNavigatorContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileNavigatorContribution.prototype.initializeLayout = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.editorMode.proMode) {
                    return [2 /*return*/, _super.prototype.initializeLayout.call(this, app)];
                }
                return [2 /*return*/];
            });
        });
    };
    FileNavigatorContribution.prototype.registerKeybindings = function (registry) {
        _super.prototype.registerKeybindings.call(this, registry);
        [
            workspace_commands_1.WorkspaceCommands.FILE_RENAME,
            workspace_commands_1.WorkspaceCommands.FILE_DELETE
        ].forEach(registry.unregisterKeybinding.bind(registry));
    };
    __decorate([
        inversify_1.inject(editor_mode_1.EditorMode),
        __metadata("design:type", editor_mode_1.EditorMode)
    ], FileNavigatorContribution.prototype, "editorMode", void 0);
    FileNavigatorContribution = __decorate([
        inversify_1.injectable()
    ], FileNavigatorContribution);
    return FileNavigatorContribution;
}(navigator_contribution_1.FileNavigatorContribution));
exports.FileNavigatorContribution = FileNavigatorContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/outline/outline-contribution.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/outline/outline-contribution.js ***!
  \**********************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineViewContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var outline_view_contribution_1 = __webpack_require__(/*! @theia/outline-view/lib/browser/outline-view-contribution */ "./node_modules/@theia/outline-view/lib/browser/outline-view-contribution.js");
var editor_mode_1 = __webpack_require__(/*! ../../editor-mode */ "./node_modules/arduino-ide-extension/lib/browser/editor-mode.js");
var OutlineViewContribution = /** @class */ (function (_super) {
    __extends(OutlineViewContribution, _super);
    function OutlineViewContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OutlineViewContribution.prototype.initializeLayout = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.editorMode.proMode) {
                    return [2 /*return*/, _super.prototype.initializeLayout.call(this, app)];
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        inversify_1.inject(editor_mode_1.EditorMode),
        __metadata("design:type", editor_mode_1.EditorMode)
    ], OutlineViewContribution.prototype, "editorMode", void 0);
    OutlineViewContribution = __decorate([
        inversify_1.injectable()
    ], OutlineViewContribution);
    return OutlineViewContribution;
}(outline_view_contribution_1.OutlineViewContribution));
exports.OutlineViewContribution = OutlineViewContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/output/output-widget.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/output/output-widget.js ***!
  \**************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputWidget = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var output_widget_1 = __webpack_require__(/*! @theia/output/lib/browser/output-widget */ "./node_modules/@theia/output/lib/browser/output-widget.js");
// Patched after https://github.com/eclipse-theia/theia/issues/8361
// Remove this module after ATL-222 and the Theia update.
var OutputWidget = /** @class */ (function (_super) {
    __extends(OutputWidget, _super);
    function OutputWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OutputWidget.prototype.onAfterShow = function (msg) {
        _super.prototype.onAfterShow.call(this, msg);
        this.onResize(browser_1.Widget.ResizeMessage.UnknownSize);
    };
    OutputWidget = __decorate([
        inversify_1.injectable()
    ], OutputWidget);
    return OutputWidget;
}(output_widget_1.OutputWidget));
exports.OutputWidget = OutputWidget;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/preferences/preferences-contribution.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/preferences/preferences-contribution.js ***!
  \******************************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var preferences_contribution_1 = __webpack_require__(/*! @theia/preferences/lib/browser/preferences-contribution */ "./node_modules/@theia/preferences/lib/browser/preferences-contribution.js");
var PreferencesContribution = /** @class */ (function (_super) {
    __extends(PreferencesContribution, _super);
    function PreferencesContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreferencesContribution.prototype.registerMenus = function (registry) {
        _super.prototype.registerMenus.call(this, registry);
        // The settings group: preferences, CLI config is not part of the `File` menu on macOS.
        // On Windows and Linux, we rebind it to `Preferences...`. It is safe to remove here.
        registry.unregisterMenuAction(browser_1.CommonCommands.OPEN_PREFERENCES.id, browser_1.CommonMenus.FILE_SETTINGS_SUBMENU_OPEN);
    };
    PreferencesContribution.prototype.registerKeybindings = function (registry) {
        // https://github.com/eclipse-theia/theia/issues/8202
        registry.registerKeybinding({
            command: browser_1.CommonCommands.OPEN_PREFERENCES.id,
            keybinding: 'CtrlCmd+,',
        });
    };
    PreferencesContribution = __decorate([
        inversify_1.injectable()
    ], PreferencesContribution);
    return PreferencesContribution;
}(preferences_contribution_1.PreferencesContribution));
exports.PreferencesContribution = PreferencesContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/scm/scm-contribution.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/scm/scm-contribution.js ***!
  \**************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScmContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var scm_contribution_1 = __webpack_require__(/*! @theia/scm/lib/browser/scm-contribution */ "./node_modules/@theia/scm/lib/browser/scm-contribution.js");
var editor_mode_1 = __webpack_require__(/*! ../../editor-mode */ "./node_modules/arduino-ide-extension/lib/browser/editor-mode.js");
var ScmContribution = /** @class */ (function (_super) {
    __extends(ScmContribution, _super);
    function ScmContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScmContribution.prototype.initializeLayout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.editorMode.proMode) {
                    return [2 /*return*/, _super.prototype.initializeLayout.call(this)];
                }
                return [2 /*return*/];
            });
        });
    };
    ScmContribution.prototype.setStatusBarEntry = function (id, entry) {
        if (this.editorMode.proMode) {
            _super.prototype.setStatusBarEntry.call(this, id, entry);
        }
    };
    __decorate([
        inversify_1.inject(editor_mode_1.EditorMode),
        __metadata("design:type", editor_mode_1.EditorMode)
    ], ScmContribution.prototype, "editorMode", void 0);
    ScmContribution = __decorate([
        inversify_1.injectable()
    ], ScmContribution);
    return ScmContribution;
}(scm_contribution_1.ScmContribution));
exports.ScmContribution = ScmContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/search-in-workspace/search-in-workspace-frontend-contribution.js":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/search-in-workspace/search-in-workspace-frontend-contribution.js ***!
  \*******************************************************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInWorkspaceFrontendContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var search_in_workspace_frontend_contribution_1 = __webpack_require__(/*! @theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution */ "./node_modules/@theia/search-in-workspace/lib/browser/search-in-workspace-frontend-contribution.js");
var editor_mode_1 = __webpack_require__(/*! ../../editor-mode */ "./node_modules/arduino-ide-extension/lib/browser/editor-mode.js");
var SearchInWorkspaceFrontendContribution = /** @class */ (function (_super) {
    __extends(SearchInWorkspaceFrontendContribution, _super);
    function SearchInWorkspaceFrontendContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchInWorkspaceFrontendContribution.prototype.initializeLayout = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.editorMode.proMode) {
                    return [2 /*return*/, _super.prototype.initializeLayout.call(this, app)];
                }
                return [2 /*return*/];
            });
        });
    };
    SearchInWorkspaceFrontendContribution.prototype.registerMenus = function (registry) {
        _super.prototype.registerMenus.call(this, registry);
        registry.unregisterMenuAction(search_in_workspace_frontend_contribution_1.SearchInWorkspaceCommands.OPEN_SIW_WIDGET);
    };
    __decorate([
        inversify_1.inject(editor_mode_1.EditorMode),
        __metadata("design:type", editor_mode_1.EditorMode)
    ], SearchInWorkspaceFrontendContribution.prototype, "editorMode", void 0);
    SearchInWorkspaceFrontendContribution = __decorate([
        inversify_1.injectable()
    ], SearchInWorkspaceFrontendContribution);
    return SearchInWorkspaceFrontendContribution;
}(search_in_workspace_frontend_contribution_1.SearchInWorkspaceFrontendContribution));
exports.SearchInWorkspaceFrontendContribution = SearchInWorkspaceFrontendContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-commands.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-commands.js ***!
  \**********************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceCommandContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var opener_service_1 = __webpack_require__(/*! @theia/core/lib/browser/opener-service */ "./node_modules/@theia/core/lib/browser/opener-service.js");
var command_1 = __webpack_require__(/*! @theia/core/lib/common/command */ "./node_modules/@theia/core/lib/common/command.js");
var workspace_commands_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-commands */ "./node_modules/@theia/workspace/lib/browser/workspace-commands.js");
var protocol_1 = __webpack_require__(/*! ../../../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
var workspace_input_dialog_1 = __webpack_require__(/*! ./workspace-input-dialog */ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-input-dialog.js");
var sketches_service_client_impl_1 = __webpack_require__(/*! ../../../common/protocol/sketches-service-client-impl */ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service-client-impl.js");
var save_as_sketch_1 = __webpack_require__(/*! ../../contributions/save-as-sketch */ "./node_modules/arduino-ide-extension/lib/browser/contributions/save-as-sketch.js");
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var WorkspaceCommandContribution = /** @class */ (function (_super) {
    __extends(WorkspaceCommandContribution, _super);
    function WorkspaceCommandContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkspaceCommandContribution.prototype.registerCommands = function (registry) {
        var _this = this;
        _super.prototype.registerCommands.call(this, registry);
        registry.unregisterCommand(workspace_commands_1.WorkspaceCommands.NEW_FILE);
        registry.registerCommand(workspace_commands_1.WorkspaceCommands.NEW_FILE, this.newWorkspaceRootUriAwareCommandHandler({
            execute: function (uri) { return _this.newFile(uri); }
        }));
        registry.unregisterCommand(workspace_commands_1.WorkspaceCommands.FILE_RENAME);
        registry.registerCommand(workspace_commands_1.WorkspaceCommands.FILE_RENAME, this.newUriAwareCommandHandler({
            execute: function (uri) { return _this.renameFile(uri); }
        }));
    };
    WorkspaceCommandContribution.prototype.newFile = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var parent, parentUri, dialog, name, nameWithExt, fileUri;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!uri) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getDirectory(uri)];
                    case 1:
                        parent = _a.sent();
                        if (!parent) {
                            return [2 /*return*/];
                        }
                        parentUri = new uri_1.default(parent.uri);
                        dialog = new workspace_input_dialog_1.WorkspaceInputDialog({
                            title: 'Name for new file',
                            parentUri: parentUri,
                            validate: function (name) { return _this.validateFileName(name, parent, true); }
                        }, this.labelProvider);
                        return [4 /*yield*/, dialog.open()];
                    case 2:
                        name = _a.sent();
                        nameWithExt = this.maybeAppendInoExt(name);
                        if (!nameWithExt) return [3 /*break*/, 4];
                        fileUri = parentUri.resolve(nameWithExt);
                        return [4 /*yield*/, this.fileSystem.createFile(fileUri.toString())];
                    case 3:
                        _a.sent();
                        this.fireCreateNewFile({ parent: parentUri, uri: fileUri });
                        opener_service_1.open(this.openerService, fileUri);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WorkspaceCommandContribution.prototype.validateFileName = function (name, parent, recursive) {
        if (recursive === void 0) { recursive = false; }
        return __awaiter(this, void 0, void 0, function () {
            var nameWithExt, errorMessage, extension;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nameWithExt = this.maybeAppendInoExt(name);
                        return [4 /*yield*/, _super.prototype.validateFileName.call(this, nameWithExt, parent, recursive)];
                    case 1:
                        errorMessage = _a.sent();
                        if (errorMessage) {
                            return [2 /*return*/, errorMessage];
                        }
                        extension = nameWithExt.split('.').pop();
                        if (!extension) {
                            return [2 /*return*/, 'Invalid filename.']; // XXX: this should not happen as we forcefully append `.ino` if it's not there.
                        }
                        if (protocol_1.Sketch.Extensions.ALL.indexOf("." + extension) === -1) {
                            return [2 /*return*/, "." + extension + " is not a valid extension."];
                        }
                        return [2 /*return*/, ''];
                }
            });
        });
    };
    WorkspaceCommandContribution.prototype.maybeAppendInoExt = function (name) {
        if (!name) {
            return '';
        }
        if (name.trim().length) {
            if (name.indexOf('.') === -1) {
                return name + ".ino";
            }
            if (name.lastIndexOf('.') === name.length - 1) {
                return name.slice(0, -1) + ".ino";
            }
        }
        return name;
    };
    WorkspaceCommandContribution.prototype.renameFile = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var sketch, options, parent, initialValue, dialog, newName, newNameWithExt, oldUri, newUri;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!uri) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.sketchesServiceClient.currentSketch()];
                    case 1:
                        sketch = _a.sent();
                        if (!sketch) {
                            return [2 /*return*/];
                        }
                        if (!(uri.toString() === sketch.mainFileUri)) return [3 /*break*/, 3];
                        options = {
                            execOnlyIfTemp: false,
                            openAfterMove: true,
                            wipeOriginal: true
                        };
                        return [4 /*yield*/, this.commandService.executeCommand(save_as_sketch_1.SaveAsSketch.Commands.SAVE_AS_SKETCH.id, options)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, this.getParent(uri)];
                    case 4:
                        parent = _a.sent();
                        if (!parent) {
                            return [2 /*return*/];
                        }
                        initialValue = uri.path.base;
                        dialog = new browser_1.SingleTextInputDialog({
                            title: 'New name for file',
                            initialValue: initialValue,
                            initialSelectionRange: {
                                start: 0,
                                end: uri.path.name.length
                            },
                            validate: function (name, mode) {
                                if (initialValue === name && mode === 'preview') {
                                    return false;
                                }
                                return _this.validateFileName(name, parent, false);
                            }
                        });
                        return [4 /*yield*/, dialog.open()];
                    case 5:
                        newName = _a.sent();
                        newNameWithExt = this.maybeAppendInoExt(newName);
                        if (newNameWithExt) {
                            oldUri = uri;
                            newUri = uri.parent.resolve(newNameWithExt);
                            this.fileSystem.move(oldUri.toString(), newUri.toString());
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(sketches_service_client_impl_1.SketchesServiceClientImpl),
        __metadata("design:type", sketches_service_client_impl_1.SketchesServiceClientImpl)
    ], WorkspaceCommandContribution.prototype, "sketchesServiceClient", void 0);
    __decorate([
        inversify_1.inject(command_1.CommandService),
        __metadata("design:type", Object)
    ], WorkspaceCommandContribution.prototype, "commandService", void 0);
    WorkspaceCommandContribution = __decorate([
        inversify_1.injectable()
    ], WorkspaceCommandContribution);
    return WorkspaceCommandContribution;
}(workspace_commands_1.WorkspaceCommandContribution));
exports.WorkspaceCommandContribution = WorkspaceCommandContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-delete-handler.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-delete-handler.js ***!
  \****************************************************************************************************/
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceDeleteHandler = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var electron_1 = __webpack_require__(/*! electron */ "electron");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var workspace_delete_handler_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-delete-handler */ "./node_modules/@theia/workspace/lib/browser/workspace-delete-handler.js");
var sketches_service_client_impl_1 = __webpack_require__(/*! ../../../common/protocol/sketches-service-client-impl */ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service-client-impl.js");
var WorkspaceDeleteHandler = /** @class */ (function (_super) {
    __extends(WorkspaceDeleteHandler, _super);
    function WorkspaceDeleteHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkspaceDeleteHandler.prototype.execute = function (uris) {
        return __awaiter(this, void 0, void 0, function () {
            var sketch, response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sketchesServiceClient.currentSketch()];
                    case 1:
                        sketch = _a.sent();
                        if (!sketch) {
                            return [2 /*return*/];
                        }
                        if (!uris.map(function (uri) { return uri.toString(); }).some(function (uri) { return uri === sketch.mainFileUri; })) return [3 /*break*/, 6];
                        return [4 /*yield*/, electron_1.remote.dialog.showMessageBox({
                                title: 'Delete',
                                type: 'question',
                                buttons: ['Cancel', 'OK'],
                                message: 'Do you want to delete the current sketch?'
                            })];
                    case 2:
                        response = (_a.sent()).response;
                        if (!(response === 1)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Promise.all(__spread(sketch.additionalFileUris, sketch.otherSketchFileUris, [sketch.mainFileUri]).map(function (uri) { return _this.closeWithoutSaving(new uri_1.default(uri)); }))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.fileSystem.delete(sketch.uri)];
                    case 4:
                        _a.sent();
                        window.close();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                    case 6: return [2 /*return*/, _super.prototype.execute.call(this, uris)];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(sketches_service_client_impl_1.SketchesServiceClientImpl),
        __metadata("design:type", sketches_service_client_impl_1.SketchesServiceClientImpl)
    ], WorkspaceDeleteHandler.prototype, "sketchesServiceClient", void 0);
    WorkspaceDeleteHandler = __decorate([
        inversify_1.injectable()
    ], WorkspaceDeleteHandler);
    return WorkspaceDeleteHandler;
}(workspace_delete_handler_1.WorkspaceDeleteHandler));
exports.WorkspaceDeleteHandler = WorkspaceDeleteHandler;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-frontend-contribution.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-frontend-contribution.js ***!
  \***********************************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArduinoFileMenuContribution = exports.WorkspaceFrontendContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var workspace_commands_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-commands */ "./node_modules/@theia/workspace/lib/browser/workspace-commands.js");
var workspace_frontend_contribution_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-frontend-contribution */ "./node_modules/@theia/workspace/lib/browser/workspace-frontend-contribution.js");
var WorkspaceFrontendContribution = /** @class */ (function (_super) {
    __extends(WorkspaceFrontendContribution, _super);
    function WorkspaceFrontendContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkspaceFrontendContribution.prototype.registerCommands = function (registry) {
        _super.prototype.registerCommands.call(this, registry);
        // TODO: instead of blacklisting commands to remove, it would be more robust to whitelist the ones we want to keep
        var commands = new Set(registry.commands);
        [
            workspace_commands_1.WorkspaceCommands.OPEN,
            workspace_commands_1.WorkspaceCommands.OPEN_FILE,
            workspace_commands_1.WorkspaceCommands.OPEN_FOLDER,
            workspace_commands_1.WorkspaceCommands.OPEN_WORKSPACE,
            workspace_commands_1.WorkspaceCommands.OPEN_RECENT_WORKSPACE,
            workspace_commands_1.WorkspaceCommands.SAVE_WORKSPACE_AS,
            workspace_commands_1.WorkspaceCommands.SAVE_AS,
            workspace_commands_1.WorkspaceCommands.CLOSE
        ].filter(commands.has.bind(commands)).forEach(registry.unregisterCommand.bind(registry));
    };
    WorkspaceFrontendContribution.prototype.registerMenus = function (_) {
    };
    WorkspaceFrontendContribution.prototype.registerKeybindings = function (registry) {
        _super.prototype.registerKeybindings.call(this, registry);
        [
            workspace_commands_1.WorkspaceCommands.NEW_FILE,
            workspace_commands_1.WorkspaceCommands.FILE_RENAME,
            workspace_commands_1.WorkspaceCommands.FILE_DELETE
        ].map(function (_a) {
            var id = _a.id;
            return id;
        }).forEach(registry.unregisterKeybinding.bind(registry));
    };
    WorkspaceFrontendContribution = __decorate([
        inversify_1.injectable()
    ], WorkspaceFrontendContribution);
    return WorkspaceFrontendContribution;
}(workspace_frontend_contribution_1.WorkspaceFrontendContribution));
exports.WorkspaceFrontendContribution = WorkspaceFrontendContribution;
var ArduinoFileMenuContribution = /** @class */ (function (_super) {
    __extends(ArduinoFileMenuContribution, _super);
    function ArduinoFileMenuContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArduinoFileMenuContribution.prototype.registerMenus = function (_) {
        // NOOP
    };
    ArduinoFileMenuContribution = __decorate([
        inversify_1.injectable()
    ], ArduinoFileMenuContribution);
    return ArduinoFileMenuContribution;
}(workspace_commands_1.FileMenuContribution));
exports.ArduinoFileMenuContribution = ArduinoFileMenuContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-input-dialog.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-input-dialog.js ***!
  \**************************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceInputDialog = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var label_provider_1 = __webpack_require__(/*! @theia/core/lib/browser/label-provider */ "./node_modules/@theia/core/lib/browser/label-provider.js");
var dialogs_1 = __webpack_require__(/*! @theia/core/lib/browser/dialogs */ "./node_modules/@theia/core/lib/browser/dialogs.js");
var workspace_input_dialog_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-input-dialog */ "./node_modules/@theia/workspace/lib/browser/workspace-input-dialog.js");
var WorkspaceInputDialog = /** @class */ (function (_super) {
    __extends(WorkspaceInputDialog, _super);
    function WorkspaceInputDialog(props, labelProvider) {
        var _this = _super.call(this, props, labelProvider) || this;
        _this.props = props;
        _this.labelProvider = labelProvider;
        _this.wasTouched = false;
        _this.appendCloseButton('Cancel');
        return _this;
    }
    WorkspaceInputDialog.prototype.appendParentPath = function () {
        // NOOP
    };
    WorkspaceInputDialog.prototype.isValid = function (value, mode) {
        if (value !== '') {
            this.wasTouched = true;
        }
        return _super.prototype.isValid.call(this, value, mode);
    };
    WorkspaceInputDialog.prototype.setErrorMessage = function (error) {
        if (this.acceptButton) {
            this.acceptButton.disabled = !dialogs_1.DialogError.getResult(error);
        }
        if (this.wasTouched) {
            this.errorMessageNode.innerText = dialogs_1.DialogError.getMessage(error);
        }
    };
    WorkspaceInputDialog = __decorate([
        __param(0, inversify_1.inject(workspace_input_dialog_1.WorkspaceInputDialogProps)),
        __param(1, inversify_1.inject(label_provider_1.LabelProvider)),
        __metadata("design:paramtypes", [workspace_input_dialog_1.WorkspaceInputDialogProps,
            label_provider_1.LabelProvider])
    ], WorkspaceInputDialog);
    return WorkspaceInputDialog;
}(workspace_input_dialog_1.WorkspaceInputDialog));
exports.WorkspaceInputDialog = WorkspaceInputDialog;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-service.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/theia/workspace/workspace-service.js ***!
  \*********************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceService = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var uri_1 = __webpack_require__(/*! @theia/core/lib/common/uri */ "./node_modules/@theia/core/lib/common/uri.js");
var browser_1 = __webpack_require__(/*! @theia/editor/lib/browser */ "./node_modules/@theia/editor/lib/browser/index.js");
var label_provider_1 = __webpack_require__(/*! @theia/core/lib/browser/label-provider */ "./node_modules/@theia/core/lib/browser/label-provider.js");
var message_service_1 = __webpack_require__(/*! @theia/core/lib/common/message-service */ "./node_modules/@theia/core/lib/common/message-service.js");
var application_protocol_1 = __webpack_require__(/*! @theia/core/lib/common/application-protocol */ "./node_modules/@theia/core/lib/common/application-protocol.js");
var workspace_service_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-service */ "./node_modules/@theia/workspace/lib/browser/workspace-service.js");
var config_service_1 = __webpack_require__(/*! ../../../common/protocol/config-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/config-service.js");
var sketches_service_1 = __webpack_require__(/*! ../../../common/protocol/sketches-service */ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service.js");
var arduino_workspace_resolver_1 = __webpack_require__(/*! ../../arduino-workspace-resolver */ "./node_modules/arduino-ide-extension/lib/browser/arduino-workspace-resolver.js");
var WorkspaceService = /** @class */ (function (_super) {
    __extends(WorkspaceService, _super);
    function WorkspaceService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkspaceService.prototype.onStart = function (application) {
        return __awaiter(this, void 0, void 0, function () {
            var info, newValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.applicationServer.getApplicationInfo()];
                    case 1:
                        info = _a.sent();
                        this.version = info === null || info === void 0 ? void 0 : info.version;
                        application.shell.onDidChangeCurrentWidget(this.onCurrentWidgetChange.bind(this));
                        newValue = application.shell.currentWidget ? application.shell.currentWidget : null;
                        this.onCurrentWidgetChange({ newValue: newValue, oldValue: null });
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkspaceService.prototype.getDefaultWorkspaceUri = function () {
        var _this = this;
        if (this.workspaceUri) {
            // Avoid creating a new sketch twice
            return this.workspaceUri;
        }
        this.workspaceUri = (function () { return __awaiter(_this, void 0, void 0, function () {
            var hash, _a, recentWorkspaces, recentSketches, toOpen, uri, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        hash = window.location.hash;
                        return [4 /*yield*/, Promise.all([
                                this.server.getRecentWorkspaces(),
                                this.sketchService.getSketches().then(function (sketches) { return sketches.map(function (s) { return s.uri; }); })
                            ])];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), recentWorkspaces = _a[0], recentSketches = _a[1];
                        return [4 /*yield*/, new arduino_workspace_resolver_1.ArduinoWorkspaceRootResolver({
                                isValid: this.isValid.bind(this)
                            }).resolve({ hash: hash, recentWorkspaces: recentWorkspaces, recentSketches: recentSketches })];
                    case 2:
                        toOpen = _b.sent();
                        if (!toOpen) return [3 /*break*/, 4];
                        uri = toOpen.uri;
                        return [4 /*yield*/, this.server.setMostRecentlyUsedWorkspace(uri)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, toOpen.uri];
                    case 4: return [4 /*yield*/, this.sketchService.createNewSketch()];
                    case 5: return [2 /*return*/, (_b.sent()).uri];
                    case 6:
                        err_1 = _b.sent();
                        this.logger.fatal("Failed to determine the sketch directory: " + err_1);
                        this.messageService.error('There was an error creating the sketch directory. ' +
                            'See the log for more details. ' +
                            'The application will probably not work as expected.');
                        return [2 /*return*/, _super.prototype.getDefaultWorkspaceUri.call(this)];
                    case 7: return [2 /*return*/];
                }
            });
        }); })();
        return this.workspaceUri;
    };
    WorkspaceService.prototype.isValid = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileSystem.exists(uri)];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, this.sketchService.isSketchFolder(uri)];
                }
            });
        });
    };
    WorkspaceService.prototype.onCurrentWidgetChange = function (_a) {
        var newValue = _a.newValue;
        if (newValue instanceof browser_1.EditorWidget) {
            var uri = newValue.editor.uri;
            if (uri.toString().endsWith('.ino')) {
                this.updateTitle();
            }
            else {
                var title = this.workspaceTitle;
                var fileName = this.labelProvider.getName(uri);
                document.title = this.formatTitle(title ? title + " - " + fileName : fileName);
            }
        }
        else {
            this.updateTitle();
        }
    };
    WorkspaceService.prototype.formatTitle = function (title) {
        var version = this.version ? " " + this.version : '';
        var name = this.applicationName + " " + version;
        return title ? title + " | " + name : name;
    };
    Object.defineProperty(WorkspaceService.prototype, "workspaceTitle", {
        get: function () {
            if (this.workspace) {
                var uri = new uri_1.default(this.workspace.uri);
                return this.labelProvider.getName(uri);
            }
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        inversify_1.inject(sketches_service_1.SketchesService),
        __metadata("design:type", Object)
    ], WorkspaceService.prototype, "sketchService", void 0);
    __decorate([
        inversify_1.inject(config_service_1.ConfigService),
        __metadata("design:type", Object)
    ], WorkspaceService.prototype, "configService", void 0);
    __decorate([
        inversify_1.inject(label_provider_1.LabelProvider),
        __metadata("design:type", label_provider_1.LabelProvider)
    ], WorkspaceService.prototype, "labelProvider", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], WorkspaceService.prototype, "messageService", void 0);
    __decorate([
        inversify_1.inject(application_protocol_1.ApplicationServer),
        __metadata("design:type", Object)
    ], WorkspaceService.prototype, "applicationServer", void 0);
    WorkspaceService = __decorate([
        inversify_1.injectable()
    ], WorkspaceService);
    return WorkspaceService;
}(workspace_service_1.WorkspaceService));
exports.WorkspaceService = WorkspaceService;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/tool-output/client-service-impl.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/tool-output/client-service-impl.js ***!
  \*******************************************************************************************/
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
exports.ToolOutputServiceClientImpl = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var output_contribution_1 = __webpack_require__(/*! @theia/output/lib/browser/output-contribution */ "./node_modules/@theia/output/lib/browser/output-contribution.js");
var output_channel_1 = __webpack_require__(/*! @theia/output/lib/common/output-channel */ "./node_modules/@theia/output/lib/common/output-channel.js");
var ToolOutputServiceClientImpl = /** @class */ (function () {
    function ToolOutputServiceClientImpl() {
    }
    ToolOutputServiceClientImpl.prototype.onMessageReceived = function (message) {
        var _this = this;
        var tool = message.tool, chunk = message.chunk;
        var name = "Arduino: " + tool;
        var channel = this.outputChannelManager.getChannel(name);
        // Zen-mode: we do not reveal the output for daemon messages.
        var show = tool === 'daemon'
            // This will open and reveal the view but won't show it. You will see the toggle bottom panel on the status bar
            ? this.outputContribution.openView({ activate: false, reveal: false })
            // This will open, reveal but do not activate the Output view.
            : Promise.resolve(channel.show({ preserveFocus: true }));
        show.then(function () { return channel.append(chunk, _this.toOutputSeverity(message)); });
    };
    ToolOutputServiceClientImpl.prototype.toOutputSeverity = function (message) {
        if (message.severity) {
            switch (message.severity) {
                case 'error': return output_channel_1.OutputChannelSeverity.Error;
                case 'warning': return output_channel_1.OutputChannelSeverity.Warning;
                case 'info': return output_channel_1.OutputChannelSeverity.Info;
                default: return output_channel_1.OutputChannelSeverity.Info;
            }
        }
        return output_channel_1.OutputChannelSeverity.Info;
    };
    __decorate([
        inversify_1.inject(output_contribution_1.OutputContribution),
        __metadata("design:type", output_contribution_1.OutputContribution)
    ], ToolOutputServiceClientImpl.prototype, "outputContribution", void 0);
    __decorate([
        inversify_1.inject(output_channel_1.OutputChannelManager),
        __metadata("design:type", output_channel_1.OutputChannelManager)
    ], ToolOutputServiceClientImpl.prototype, "outputChannelManager", void 0);
    ToolOutputServiceClientImpl = __decorate([
        inversify_1.injectable()
    ], ToolOutputServiceClientImpl);
    return ToolOutputServiceClientImpl;
}());
exports.ToolOutputServiceClientImpl = ToolOutputServiceClientImpl;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar-contribution.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar-contribution.js ***!
  \************************************************************************************************/
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
exports.ArduinoToolbarContribution = exports.ArduinoToolbarContainer = void 0;
var browser_1 = __webpack_require__(/*! @theia/core/lib/browser */ "./node_modules/@theia/core/lib/browser/index.js");
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var arduino_toolbar_1 = __webpack_require__(/*! ./arduino-toolbar */ "./node_modules/arduino-ide-extension/lib/browser/toolbar/arduino-toolbar.js");
var tab_bar_toolbar_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/tab-bar-toolbar */ "./node_modules/@theia/core/lib/browser/shell/tab-bar-toolbar.js");
var core_1 = __webpack_require__(/*! @theia/core */ "./node_modules/@theia/core/lib/common/index.js");
var label_parser_1 = __webpack_require__(/*! @theia/core/lib/browser/label-parser */ "./node_modules/@theia/core/lib/browser/label-parser.js");
var ArduinoToolbarContainer = /** @class */ (function (_super) {
    __extends(ArduinoToolbarContainer, _super);
    function ArduinoToolbarContainer() {
        var toolbars = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toolbars[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.id = 'arduino-toolbar-container';
        _this.toolbars = toolbars;
        return _this;
    }
    ArduinoToolbarContainer.prototype.onAfterAttach = function (msg) {
        var e_1, _a;
        try {
            for (var _b = __values(this.toolbars), _c = _b.next(); !_c.done; _c = _b.next()) {
                var toolbar_1 = _c.value;
                browser_1.Widget.attach(toolbar_1, this.node);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return ArduinoToolbarContainer;
}(browser_1.Widget));
exports.ArduinoToolbarContainer = ArduinoToolbarContainer;
var ArduinoToolbarContribution = /** @class */ (function () {
    function ArduinoToolbarContribution(tabBarToolBarRegistry, commandRegistry, labelParser) {
        this.tabBarToolBarRegistry = tabBarToolBarRegistry;
        this.commandRegistry = commandRegistry;
        this.labelParser = labelParser;
        var leftToolbarWidget = new arduino_toolbar_1.ArduinoToolbar(tabBarToolBarRegistry, commandRegistry, labelParser, 'left');
        var rightToolbarWidget = new arduino_toolbar_1.ArduinoToolbar(tabBarToolBarRegistry, commandRegistry, labelParser, 'right');
        this.arduinoToolbarContainer = new ArduinoToolbarContainer(leftToolbarWidget, rightToolbarWidget);
    }
    ArduinoToolbarContribution.prototype.onStart = function (app) {
        app.shell.addWidget(this.arduinoToolbarContainer, {
            area: 'top'
        });
    };
    ArduinoToolbarContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(tab_bar_toolbar_1.TabBarToolbarRegistry)),
        __param(1, inversify_1.inject(core_1.CommandRegistry)),
        __param(2, inversify_1.inject(label_parser_1.LabelParser)),
        __metadata("design:paramtypes", [tab_bar_toolbar_1.TabBarToolbarRegistry,
            core_1.CommandRegistry,
            label_parser_1.LabelParser])
    ], ArduinoToolbarContribution);
    return ArduinoToolbarContribution;
}());
exports.ArduinoToolbarContribution = ArduinoToolbarContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/widgets/arduino-select.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/widgets/arduino-select.js ***!
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArduinoSelect = void 0;
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var react_select_1 = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
var ArduinoSelect = /** @class */ (function (_super) {
    __extends(ArduinoSelect, _super);
    function ArduinoSelect(props) {
        return _super.call(this, props) || this;
    }
    ArduinoSelect.prototype.render = function () {
        var controlHeight = 27; // from `monitor.css` -> `.serial-monitor-container .head` (`height: 27px;`)
        var styles = {
            control: function (styles) { return (__assign(__assign({}, styles), { minWidth: 120, color: 'var(--theia-foreground)' })); },
            dropdownIndicator: function (styles) { return (__assign(__assign({}, styles), { padding: 0 })); },
            indicatorSeparator: function () { return ({
                display: 'none'
            }); },
            indicatorsContainer: function () { return ({
                padding: '0px 5px'
            }); },
            menu: function (styles) { return (__assign(__assign({}, styles), { marginTop: 0 })); }
        };
        var theme = function (theme) { return (__assign(__assign({}, theme), { borderRadius: 0, spacing: {
                controlHeight: controlHeight,
                baseUnit: 2,
                menuGutter: 4
            }, colors: __assign(__assign({}, theme.colors), { 
                // `primary50`??? it's crazy but apparently, without this, we would get a light-blueish
                // color when selecting an option in the select by clicking and then not releasing the button.
                // https://react-select.com/styles#overriding-the-theme
                primary50: 'var(--theia-list-activeSelectionBackground)' }) })); };
        var DropdownIndicator = function () { return React.createElement("span", { className: 'fa fa-caret-down caret' }); };
        return React.createElement(react_select_1.default, __assign({}, this.props, { components: { DropdownIndicator: DropdownIndicator }, theme: theme, styles: styles, classNamePrefix: 'arduino-select', isSearchable: false }));
    };
    return ArduinoSelect;
}(react_select_1.default));
exports.ArduinoSelect = ArduinoSelect;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-widget-frontend-contribution.js":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/browser/widgets/component-list/list-widget-frontend-contribution.js ***!
  \********************************************************************************************************************/
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListWidgetFrontendContribution = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var view_contribution_1 = __webpack_require__(/*! @theia/core/lib/browser/shell/view-contribution */ "./node_modules/@theia/core/lib/browser/shell/view-contribution.js");
var ListWidgetFrontendContribution = /** @class */ (function (_super) {
    __extends(ListWidgetFrontendContribution, _super);
    function ListWidgetFrontendContribution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWidgetFrontendContribution.prototype.initializeLayout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ListWidgetFrontendContribution = __decorate([
        inversify_1.injectable()
    ], ListWidgetFrontendContribution);
    return ListWidgetFrontendContribution;
}(view_contribution_1.AbstractViewContribution));
exports.ListWidgetFrontendContribution = ListWidgetFrontendContribution;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service-client-impl.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/lib/common/protocol/sketches-service-client-impl.js ***!
  \************************************************************************************************/
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
exports.SketchesServiceClientImpl = void 0;
var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
var objects_1 = __webpack_require__(/*! @theia/core/lib/common/objects */ "./node_modules/@theia/core/lib/common/objects.js");
var common_1 = __webpack_require__(/*! @theia/filesystem/lib/common */ "./node_modules/@theia/filesystem/lib/common/index.js");
var message_service_1 = __webpack_require__(/*! @theia/core/lib/common/message-service */ "./node_modules/@theia/core/lib/common/message-service.js");
var workspace_service_1 = __webpack_require__(/*! @theia/workspace/lib/browser/workspace-service */ "./node_modules/@theia/workspace/lib/browser/workspace-service.js");
var protocol_1 = __webpack_require__(/*! ../../common/protocol */ "./node_modules/arduino-ide-extension/lib/common/protocol/index.js");
var SketchesServiceClientImpl = /** @class */ (function () {
    function SketchesServiceClientImpl() {
    }
    SketchesServiceClientImpl.prototype.currentSketch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sketches;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.workspaceService.tryGetRoots().map(function (_a) {
                            var uri = _a.uri;
                            return _this.sketchService.getSketchFolder(uri);
                        }))];
                    case 1:
                        sketches = (_a.sent()).filter(objects_1.notEmpty);
                        if (!sketches.length) {
                            return [2 /*return*/, undefined];
                        }
                        if (sketches.length > 1) {
                            console.log("Multiple sketch folders were found in the workspace. Falling back to the first one. Sketch folders: " + JSON.stringify(sketches));
                        }
                        return [2 /*return*/, sketches[0]];
                }
            });
        });
    };
    SketchesServiceClientImpl.prototype.currentSketchFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sketch, uri, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.currentSketch()];
                    case 1:
                        sketch = _a.sent();
                        if (!sketch) return [3 /*break*/, 3];
                        uri = sketch.mainFileUri;
                        return [4 /*yield*/, this.fileSystem.exists(uri)];
                    case 2:
                        exists = _a.sent();
                        if (!exists) {
                            this.messageService.warn("Could not find sketch file: " + uri);
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, uri];
                    case 3: return [2 /*return*/, undefined];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(common_1.FileSystem),
        __metadata("design:type", Object)
    ], SketchesServiceClientImpl.prototype, "fileSystem", void 0);
    __decorate([
        inversify_1.inject(message_service_1.MessageService),
        __metadata("design:type", message_service_1.MessageService)
    ], SketchesServiceClientImpl.prototype, "messageService", void 0);
    __decorate([
        inversify_1.inject(protocol_1.SketchesService),
        __metadata("design:type", Object)
    ], SketchesServiceClientImpl.prototype, "sketchService", void 0);
    __decorate([
        inversify_1.inject(workspace_service_1.WorkspaceService),
        __metadata("design:type", workspace_service_1.WorkspaceService)
    ], SketchesServiceClientImpl.prototype, "workspaceService", void 0);
    SketchesServiceClientImpl = __decorate([
        inversify_1.injectable()
    ], SketchesServiceClientImpl);
    return SketchesServiceClientImpl;
}());
exports.SketchesServiceClientImpl = SketchesServiceClientImpl;


/***/ }),

/***/ "./node_modules/arduino-ide-extension/node_modules/p-queue/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/node_modules/p-queue/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const EventEmitter = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");

// Port of lower_bound from http://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion
function lowerBound(array, value, comp) {
	let first = 0;
	let count = array.length;

	while (count > 0) {
		const step = (count / 2) | 0;
		let it = first + step;

		if (comp(array[it], value) <= 0) {
			first = ++it;
			count -= step + 1;
		} else {
			count = step;
		}
	}

	return first;
}

class PriorityQueue {
	constructor() {
		this._queue = [];
	}

	enqueue(run, options) {
		options = {
			priority: 0,
			...options
		};

		const element = {
			priority: options.priority,
			run
		};

		if (this.size && this._queue[this.size - 1].priority >= options.priority) {
			this._queue.push(element);
			return;
		}

		const index = lowerBound(this._queue, element, (a, b) => b.priority - a.priority);
		this._queue.splice(index, 0, element);
	}

	dequeue() {
		return this._queue.shift().run;
	}

	get size() {
		return this._queue.length;
	}
}

module.exports = class PQueue extends EventEmitter {
	constructor(options) {
		super();

		options = {
			carryoverConcurrencyCount: false,
			intervalCap: Infinity,
			interval: 0,
			concurrency: Infinity,
			autoStart: true,
			queueClass: PriorityQueue,
			...options
		};

		if (!(typeof options.concurrency === 'number' && options.concurrency >= 1)) {
			throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${options.concurrency}\` (${typeof options.concurrency})`);
		}

		if (!(typeof options.intervalCap === 'number' && options.intervalCap >= 1)) {
			throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${options.intervalCap}\` (${typeof options.intervalCap})`);
		}

		if (!(Number.isFinite(options.interval) && options.interval >= 0)) {
			throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${options.interval}\` (${typeof options.interval})`);
		}

		this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
		this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
		this._intervalCount = 0;
		this._intervalCap = options.intervalCap;
		this._interval = options.interval;
		this._intervalId = null;
		this._intervalEnd = 0;
		this._timeoutId = null;

		this.queue = new options.queueClass(); // eslint-disable-line new-cap
		this._queueClass = options.queueClass;
		this._pendingCount = 0;
		this._concurrency = options.concurrency;
		this._isPaused = options.autoStart === false;
		this._resolveEmpty = () => {};
		this._resolveIdle = () => {};
	}

	get _doesIntervalAllowAnother() {
		return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
	}

	get _doesConcurrentAllowAnother() {
		return this._pendingCount < this._concurrency;
	}

	_next() {
		this._pendingCount--;
		this._tryToStartAnother();
	}

	_resolvePromises() {
		this._resolveEmpty();
		this._resolveEmpty = () => {};

		if (this._pendingCount === 0) {
			this._resolveIdle();
			this._resolveIdle = () => {};
		}
	}

	_onResumeInterval() {
		this._onInterval();
		this._initializeIntervalIfNeeded();
		this._timeoutId = null;
	}

	_intervalPaused() {
		const now = Date.now();

		if (this._intervalId === null) {
			const delay = this._intervalEnd - now;
			if (delay < 0) {
				// Act as the interval was done
				// We don't need to resume it here,
				// because it'll be resumed on line 160
				this._intervalCount = (this._carryoverConcurrencyCount) ? this._pendingCount : 0;
			} else {
				// Act as the interval is pending
				if (this._timeoutId === null) {
					this._timeoutId = setTimeout(() => {
						this._onResumeInterval();
					}, delay);
				}

				return true;
			}
		}

		return false;
	}

	_tryToStartAnother() {
		if (this.queue.size === 0) {
			// We can clear the interval ("pause")
			// because we can redo it later ("resume")
			clearInterval(this._intervalId);
			this._intervalId = null;

			this._resolvePromises();

			return false;
		}

		if (!this._isPaused) {
			const canInitializeInterval = !this._intervalPaused();
			if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
				this.emit('active');
				this.queue.dequeue()();
				if (canInitializeInterval) {
					this._initializeIntervalIfNeeded();
				}

				return true;
			}
		}

		return false;
	}

	_initializeIntervalIfNeeded() {
		if (this._isIntervalIgnored || this._intervalId !== null) {
			return;
		}

		this._intervalId = setInterval(() => this._onInterval(), this._interval);
		this._intervalEnd = Date.now() + this._interval;
	}

	_onInterval() {
		if (this._intervalCount === 0 && this._pendingCount === 0) {
			clearInterval(this._intervalId);
			this._intervalId = null;
		}

		this._intervalCount = (this._carryoverConcurrencyCount) ? this._pendingCount : 0;
		while (this._tryToStartAnother()) {} // eslint-disable-line no-empty
	}

	async add(fn, options) {
		return new Promise((resolve, reject) => {
			const run = async () => {
				this._pendingCount++;
				this._intervalCount++;

				try {
					resolve(await fn());
				} catch (error) {
					reject(error);
				}

				this._next();
			};

			this.queue.enqueue(run, options);
			this._tryToStartAnother();
		});
	}

	async addAll(fns, options) {
		return Promise.all(fns.map(fn => this.add(fn, options)));
	}

	start() {
		if (!this._isPaused) {
			return;
		}

		this._isPaused = false;
		while (this._tryToStartAnother()) {} // eslint-disable-line no-empty
	}

	pause() {
		this._isPaused = true;
	}

	clear() {
		this.queue = new this._queueClass();
	}

	async onEmpty() {
		// Instantly resolve if the queue is empty
		if (this.queue.size === 0) {
			return;
		}

		return new Promise(resolve => {
			const existingResolve = this._resolveEmpty;
			this._resolveEmpty = () => {
				existingResolve();
				resolve();
			};
		});
	}

	async onIdle() {
		// Instantly resolve if none pending and if nothing else is queued
		if (this._pendingCount === 0 && this.queue.size === 0) {
			return;
		}

		return new Promise(resolve => {
			const existingResolve = this._resolveIdle;
			this._resolveIdle = () => {
				existingResolve();
				resolve();
			};
		});
	}

	get size() {
		return this.queue.size;
	}

	get pending() {
		return this._pendingCount;
	}

	get isPaused() {
		return this._isPaused;
	}
};


/***/ }),

/***/ "./node_modules/arduino-ide-extension/src/browser/data/arduino.color-theme.json":
/*!**************************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/src/browser/data/arduino.color-theme.json ***!
  \**************************************************************************************/
/*! exports provided: tokenColors, colors, type, name, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tokenColors\":[{\"settings\":{\"foreground\":\"#434f54\"}},{\"name\":\"Comments\",\"scope\":\"comment\",\"settings\":{\"foreground\":\"#95a5a6cc\"}},{\"name\":\"Keywords Attributes\",\"scope\":[\"storage\",\"support\",\"string.quoted.single.c\"],\"settings\":{\"foreground\":\"#00979D\"}},{\"name\":\"literal\",\"scope\":[\"meta.function.c\",\"entity.name.function\",\"meta.function-call.c\"],\"settings\":{\"foreground\":\"#D35400\"}},{\"name\":\"punctuation\",\"scope\":[\"punctuation.section\",\"meta.function-call.c\",\"meta.block.c\",\"meta.function.c\",\"entity.name.function.preprocessor.c\",\"meta.preprocessor.macro.c\"],\"settings\":{\"foreground\":\"#434f54\"}},{\"name\":\"strings\",\"scope\":[\"string.quoted.double\"],\"settings\":{\"foreground\":\"#005C5F\"}},{\"name\":\"meta keywords\",\"scope\":[\"keyword.control\",\"meta.preprocessor.c\"],\"settings\":{\"foreground\":\"#728E00\"}},{\"name\":\"numeric preprocessor\",\"scope\":[\"meta.preprocessor.macro.c\",\"constant.numeric.preprocessor.c\",\"meta.preprocessor.c\"],\"settings\":{\"foreground\":\"#434f54\"}}],\"colors\":{\"list.highlightForeground\":\"#006468\",\"list.activeSelectionBackground\":\"#006468\",\"editor.background\":\"#ffffff\",\"editorCursor.foreground\":\"#434f54\",\"editor.foreground\":\"#434f54\",\"editorWhitespace.foreground\":\"#bfbfbf\",\"editor.lineHighlightBackground\":\"#434f5410\",\"editor.selectionBackground\":\"#ffcb00\",\"focusBorder\":\"#4db7bb99\",\"menubar.selectionBackground\":\"#ffffff\",\"menubar.selectionForeground\":\"#212121\",\"menu.selectionBackground\":\"#dae3e3\",\"menu.selectionForeground\":\"#212121\",\"editorGroupHeader.tabsBackground\":\"#f7f9f9\",\"button.background\":\"#4db7bb\",\"titleBar.activeBackground\":\"#006468\",\"titleBar.activeForeground\":\"#ffffff\",\"terminal.background\":\"#000000\",\"terminal.foreground\":\"#e0e0e0\",\"dropdown.border\":\"#ececec\",\"dropdown.background\":\"#ececec\",\"activityBar.background\":\"#ececec\",\"activityBar.foreground\":\"#616161\",\"statusBar.background\":\"#006468\",\"secondaryButton.background\":\"#b5c8c9\",\"secondaryButton.hoverBackground\":\"#dae3e3\",\"arduino.branding.primary\":\"#00979d\",\"arduino.branding.secondary\":\"#b5c8c9\",\"arduino.foreground\":\"#edf1f1\",\"arduino.output.foreground\":\"#FFFFFF\",\"arduino.output.background\":\"#000000\"},\"type\":\"light\",\"name\":\"Arduino\"}");

/***/ }),

/***/ "./node_modules/arduino-ide-extension/src/browser/icons/buttons.svg":
/*!**************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/src/browser/icons/buttons.svg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "be47faa7d89df1a7be9c38e0f4f139cc.svg";

/***/ }),

/***/ "./node_modules/arduino-ide-extension/src/browser/icons/library-tab-icon.svg":
/*!***********************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/src/browser/icons/library-tab-icon.svg ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMCIgeT0iMCIgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiB2aWV3Qm94PSIwLCAwLCA3MCwgNzAiPg0KICA8ZyBpZD0iTGF5ZXJfMSI+DQogICAgPHBhdGggZD0iTTYwLjIsMTguMiBMNTcuNCwxOC4yIEw1Ny40LDEyLjMyIEM1Ny4xMiw5LjUyIDU0Ljg4LDcuMjggNTEuOCw3IEw0NS45Miw3IEM0Mi44NCw3IDQwLjg4LDkuMjQgNDAuNiwxMi4zMiBMNDAuNiwxOC4yIEwyOS40LDE4LjIgTDI5LjQsMTIuMzIgQzI5LjEyLDkuMjQgMjYuODgsNyAyNC4wOCw3IEwxOC4yLDcgQzE1LjEyLDcgMTIuODgsOS4yNCAxMi42LDEyLjMyIEwxMi42LDE4LjIgTDkuOCwxOC4yIEM4LjEyLDE4LjIgNywxOS4zMiA3LDIxIEw3LDYwLjIgQzcsNjEuODggOC4xMiw2MyA5LjgsNjMgTDYwLjIsNjMgQzYxLjg4LDYzIDYzLDYxLjg4IDYzLDYwLjIgTDYzLDIxIEM2MywxOS4zMiA2MS44OCwxOC4yIDYwLjIsMTguMiB6IE00NS45MiwxMi42IEw1MS44LDEyLjYgTDUxLjgsMTguMiBMNDUuOTIsMTguMiBMNDUuOTIsMTIuNiB6IE0xOC4yLDEyLjYgTDI0LjA4LDEyLjYgTDI0LjA4LDE4LjIgTDE4LjIsMTguMiBMMTguMiwxMi42IHogTTE4LjIsMjMuOCBMNTcuNCwyMy44IEw1Ny40LDM5LjIgTDEyLjYsMzkuMiBMMTIuNiwyMy44IEwxOC4yLDIzLjggeiBNMzUsNTcuNCBMMTIuNiw1Ny40IEwxMi42LDQyIEw1Ny40LDQyIEw1Ny40LDU3LjQgTDM1LDU3LjQgeiIgZmlsbD0iIzAwMDAwMCIvPg0KICA8L2c+DQo8L3N2Zz4="

/***/ }),

/***/ "./node_modules/arduino-ide-extension/src/browser/icons/mask-buttons.svg":
/*!*******************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/src/browser/icons/mask-buttons.svg ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApLS0+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiB3aWR0aD0iMTk4cHgiIGhlaWdodD0iOTlweCIgeD0iMHB4IiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE5OCA5OSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTk4IDk5IiBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIgc29kaXBvZGk6ZG9jbmFtZT0iYnV0dG9ucy5zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KICA8bWV0YWRhdGEgaWQ9Im1ldGFkYXRhMzI3Ij4NCiAgICA8cmRmOlJERj4NCiAgICAgIDxjYzpXb3JrIHJkZjphYm91dD0iIj4NCiAgICAgICAgPGRjOmZvcm1hdD4NCiAgICAgICAgICBpbWFnZS9zdmcreG1sDQogICAgICAgIDwvZGM6Zm9ybWF0Pg0KICAgICAgICA8ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIi8+DQogICAgICAgIDxkYzp0aXRsZS8+DQogICAgICA8L2NjOldvcms+DQogICAgPC9yZGY6UkRGPg0KICA8L21ldGFkYXRhPg0KICA8ZGVmcyBpZD0iZGVmczMyNSIvPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3IGlkPSJuYW1lZHZpZXczMjMiIGJvcmRlcmNvbG9yPSIjNjY2NjY2IiBib3JkZXJvcGFjaXR5PSIxIiBncmlkdG9sZXJhbmNlPSIxMCIgZ3VpZGV0b2xlcmFuY2U9IjEwIiBvYmplY3R0b2xlcmFuY2U9IjEwIiBwYWdlY29sb3I9IiNmZmZmZmYiIHNob3dncmlkPSJmYWxzZSIgc2hvd2d1aWRlcz0idHJ1ZSIgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0iTGF5ZXJfMSIgaW5rc2NhcGU6Y3g9IjQ1LjI1MjM4NSIgaW5rc2NhcGU6Y3k9IjM2LjIyNDk4NyIgaW5rc2NhcGU6Z3VpZGUtYmJveD0idHJ1ZSIgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMDAiIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTIxNSIgaW5rc2NhcGU6d2luZG93LXg9IjY1IiBpbmtzY2FwZTp3aW5kb3cteT0iMjQiIGlua3NjYXBlOnpvb209IjQiLz4NCiAgPGcgaWQ9Imc1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4xMjAwMDA4NCwwKSI+DQogICAgPHBvbHlsaW5lIGlkPSJwb2x5bGluZTkiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyMS40NTMsMTIuNzQ1IDE1Ljc4OCwyMC41NzEgICAgMTEuNzc1LDE2LjY1OCAgIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyLjMwNDg5OTkzO3N0cm9rZS1taXRlcmxpbWl0OjEwIi8+DQogIDwvZz4NCiAgPGcgaWQ9ImcyMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMjYxMDAxNTksMCkiPg0KICAgIDxwb2x5Z29uIGlkPSJwb2x5Z29uMjciIHBvaW50cz0iNDUuNDEyLDE1LjMxMyA0OS4zMDcsMTUuMzEzIDQ5LjMwNywxMS41MyA1NC43MDEsMTYuODc1IDQ5LjMzMSwyMi4yNDUgNDkuMzMxLDE4LjU2MyA0NS40MTIsMTguNTM5ICIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICA8L2c+DQogIDxnIGlkPSJnNDEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjU0Mzk5ODcyLDApIj4NCiAgICA8cG9seWdvbiBpZD0icG9seWdvbjQ1IiBwb2ludHM9IjExNC40NCwxOS4wODMgMTE0LjQ0LDE1LjExNiAxMTAuNTg2LDE1LjExNiAxMTYuMDMyLDkuNjIxIDEyMS41MDIsMTUuMDkxIDExNy43NTEsMTUuMDkxIDExNy43MjYsMTkuMDgzICIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0NDciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjExMC41MTEiIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0NDkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjExMi41MTgiIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0NTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjExNC41MTciIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0NTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjExNi41MjUiIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0NTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjExOC41MjQiIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0NTciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjEyMC41MzEiIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICA8L2c+DQogIDxnIGlkPSJnNTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjY4NjAwNDY0LDApIj4NCiAgICA8cG9seWdvbiBpZD0icG9seWdvbjYzIiBwb2ludHM9IjE1MC43OSw5LjYyMSAxNTAuNzksMTMuNTg4IDE1NC42NDQsMTMuNTg4IDE0OS4xOTgsMTkuMDgzIDE0My43MjgsMTMuNjEyIDE0Ny40NzksMTMuNjEzIDE0Ny41MDQsOS42MjEgIiBzdHlsZT0iZmlsbDojMDAwMDAwIi8+DQogICAgPHJlY3QgaWQ9InJlY3Q2NSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgeD0iMTQzLjY1MTk5IiB5PSIyMi4xOTMwMDEiIHN0eWxlPSJmaWxsOiMwMDAwMDAiLz4NCiAgICA8cmVjdCBpZD0icmVjdDY3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4PSIxNDUuNjYiIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0NjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjE0Ny42NTkiIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0NzEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjE0OS42NjYiIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0NzMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjE1MS42NjYiIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0NzUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjE1My42NzMiIHk9IjIyLjE5MzAwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICA8L2c+DQogIDxnIGlkPSJnMTQ5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC40MDI5OTk4OCwwKSI+DQogICAgPHBhdGggaWQ9InBhdGgxNTEiIGQ9Ik0gODcuNDQ1LDIyLjA5NyIgc3R5bGU9ImZpbGw6IzAwMDAwMCIgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIvPg0KICAgIDxwb2x5Z29uIGlkPSJwb2x5Z29uMTU1IiBwb2ludHM9IjgzLjQ0LDEwLjA5NCA4NC40NDEsMTAuMDk0IDg4LjQyMSwxNC4wNzkgODguNDIxLDE1LjA1NyA4Ny40NDUsMTUuMDU3IDgzLjQ0LDE1LjA1NyAiIHN0eWxlPSJmaWxsOiMwMDAwMDAiLz4NCiAgICA8cG9seWdvbiBpZD0icG9seWdvbjE1NyIgcG9pbnRzPSI3OC40MDQsMTEuMDkzIDc4LjQwNCwyMi4wOTcgODcuNDQ1LDIyLjA5NyA4Ny40NDUsMTQuODcgODguNDIxLDE0Ljg3IDg4LjQyMSwyMy4xMzQgNzcuMzk5LDIzLjEzNCA3Ny4zOTksMTAuMDk0IDgzLjU2MiwxMC4wOTQgODMuNTY4LDExLjA5MyAiIHN0eWxlPSJmaWxsOiMwMDAwMDAiLz4NCiAgICA8cmVjdCBpZD0icmVjdDE1OSIgd2lkdGg9IjAuOTk1IiBoZWlnaHQ9IjAuOTk1OTk5OTkiIHg9Ijc5LjM5OTAwMiIgeT0iMTIuMTExIiBzdHlsZT0iZmlsbDojMDAwMDAwIi8+DQogICAgPHJlY3QgaWQ9InJlY3QxNjEiIHdpZHRoPSIwLjk5NSIgaGVpZ2h0PSIwLjk5NTk5OTk5IiB4PSI4MS4zOTQ5OTciIHk9IjEyLjExMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0MTYzIiB3aWR0aD0iMC45OTUiIGhlaWdodD0iMC45OTU5OTk5OSIgeD0iNzkuMzk5MDAyIiB5PSIxNC4xMDMiIHN0eWxlPSJmaWxsOiMwMDAwMDAiLz4NCiAgICA8cmVjdCBpZD0icmVjdDE2NSIgd2lkdGg9IjAuOTk1IiBoZWlnaHQ9IjAuOTk1OTk5OTkiIHg9IjgxLjM5NDk5NyIgeT0iMTQuMTAzIiBzdHlsZT0iZmlsbDojMDAwMDAwIi8+DQogICAgPHJlY3QgaWQ9InJlY3QxNjciIHdpZHRoPSIwLjk5NSIgaGVpZ2h0PSIwLjk5NTk5OTk5IiB4PSI3OS4zOTkwMDIiIHk9IjE2LjExNTk5OSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0MTY5IiB3aWR0aD0iMC45OTUiIGhlaWdodD0iMC45OTU5OTk5OSIgeD0iODEuMzk0OTk3IiB5PSIxNi4xMTU5OTkiIHN0eWxlPSJmaWxsOiMwMDAwMDAiLz4NCiAgICA8cmVjdCBpZD0icmVjdDE3MSIgd2lkdGg9IjAuOTk1IiBoZWlnaHQ9IjAuOTk1OTk5OTkiIHg9IjgzLjQwMyIgeT0iMTYuMTE1OTk5IiBzdHlsZT0iZmlsbDojMDAwMDAwIi8+DQogICAgPHJlY3QgaWQ9InJlY3QxNzMiIHdpZHRoPSIwLjk5NSIgaGVpZ2h0PSIwLjk5NTk5OTk5IiB4PSI4NS40MDAwMDIiIHk9IjE2LjExNTk5OSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0MTc1IiB3aWR0aD0iMC45OTUiIGhlaWdodD0iMC45OTU5OTk5OSIgeD0iNzkuMzk5MDAyIiB5PSIxOC4xMTgiIHN0eWxlPSJmaWxsOiMwMDAwMDAiLz4NCiAgICA8cmVjdCBpZD0icmVjdDE3NyIgd2lkdGg9IjAuOTk1IiBoZWlnaHQ9IjAuOTk1OTk5OTkiIHg9IjgxLjM5NDk5NyIgeT0iMTguMTE4IiBzdHlsZT0iZmlsbDojMDAwMDAwIi8+DQogICAgPHJlY3QgaWQ9InJlY3QxNzkiIHdpZHRoPSIwLjk5NSIgaGVpZ2h0PSIwLjk5NTk5OTk5IiB4PSI3OS4zOTkwMDIiIHk9IjIwLjEzMiIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0MTgxIiB3aWR0aD0iMC45OTUiIGhlaWdodD0iMC45OTU5OTk5OSIgeD0iODEuMzk0OTk3IiB5PSIyMC4xMzIiIHN0eWxlPSJmaWxsOiMwMDAwMDAiLz4NCiAgICA8cmVjdCBpZD0icmVjdDE4MyIgd2lkdGg9IjAuOTk1IiBoZWlnaHQ9IjAuOTk1OTk5OTkiIHg9IjgzLjQwMyIgeT0iMTguMTE4IiBzdHlsZT0iZmlsbDojMDAwMDAwIi8+DQogICAgPHJlY3QgaWQ9InJlY3QxODUiIHdpZHRoPSIwLjk5NSIgaGVpZ2h0PSIwLjk5NTk5OTk5IiB4PSI4NS40MDAwMDIiIHk9IjE4LjExOCIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0MTg3IiB3aWR0aD0iMC45OTUiIGhlaWdodD0iMC45OTU5OTk5OSIgeD0iODMuNDAzIiB5PSIyMC4xMzIiIHN0eWxlPSJmaWxsOiMwMDAwMDAiLz4NCiAgICA8cmVjdCBpZD0icmVjdDE4OSIgd2lkdGg9IjAuOTk1IiBoZWlnaHQ9IjAuOTk1OTk5OTkiIHg9Ijg1LjQwMDAwMiIgeT0iMjAuMTMyIiBzdHlsZT0iZmlsbDojMDAwMDAwIi8+DQogIDwvZz4NCiAgPGcgaWQ9ImcyNzUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjgyODAwMjkzLDApIj4NCiAgICA8cmVjdCBpZD0icmVjdDI3OSIgd2lkdGg9IjAuOTk5MDAwMDEiIGhlaWdodD0iMC45OTgwMDAwMyIgeD0iMTg3LjgxOSIgeT0iMTYuMTAxIiBzdHlsZT0iZmlsbDojMDAwMDAwIi8+DQogICAgPHJlY3QgaWQ9InJlY3QyODEiIHdpZHRoPSIwLjk5OTAwMDAxIiBoZWlnaHQ9IjAuOTk4MDAwMDMiIHg9IjE4OS44MjUiIHk9IjE2LjEwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxyZWN0IGlkPSJyZWN0MjgzIiB3aWR0aD0iMC45OTkwMDAwMSIgaGVpZ2h0PSIwLjk5ODAwMDAzIiB4PSIxNzQuODMyOTkiIHk9IjE2LjEwMSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICAgIDxjaXJjbGUgaWQ9ImNpcmNsZTI4NSIgY3g9IjE4MS44MDI5OSIgY3k9IjE2LjEwMSIgcj0iNC4wOTAwMDAyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTU0Mzk5OTQ7c3Ryb2tlLW1pdGVybGltaXQ6MTAiLz4NCiAgICA8cmVjdCBpZD0icmVjdDI4NyIgd2lkdGg9IjIuNjgwMDAwMSIgaGVpZ2h0PSI0LjQyMjk5OTkiIHg9IjE3NS44OTUiIHk9IjE4LjQyNzk5OSIgc3R5bGU9ImZpbGw6IzAwMDAwMCIgdHJhbnNmb3JtPSJtYXRyaXgoMC42OTE1LDAuNzIyNCwtMC43MjI0LDAuNjkxNSw2OS41ODI3LC0xMjEuNjU5OSkiLz4NCiAgICA8cmVjdCBpZD0icmVjdDI4OSIgd2lkdGg9IjIuMDI4MDAwMSIgaGVpZ2h0PSIxLjk5NjAwMDEiIHg9IjE4MC43ODkiIHk9IjE1LjEwMyIgc3R5bGU9ImZpbGw6IzAwMDAwMCIvPg0KICA8L2c+DQo8L3N2Zz4NCg=="

/***/ }),

/***/ "./node_modules/arduino-ide-extension/src/browser/style/index.css":
/*!************************************************************************!*\
  !*** ./node_modules/arduino-ide-extension/src/browser/style/index.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../css-loader!./index.css */ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/css-element-queries/src/ElementQueries.js":
/*!****************************************************************!*\
  !*** ./node_modules/css-element-queries/src/ElementQueries.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./ResizeSensor.js */ "./node_modules/css-element-queries/src/ResizeSensor.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(typeof window !== 'undefined' ? window : this, function (ResizeSensor) {

    /**
     *
     * @type {Function}
     * @constructor
     */
    var ElementQueries = function () {
        //<style> element with our dynamically created styles
        var cssStyleElement;

        //all rules found for element queries
        var allQueries = {};

        //association map to identify which selector belongs to a element from the animationstart event.
        var idToSelectorMapping = [];

        /**
         *
         * @param element
         * @returns {Number}
         */
        function getEmSize(element) {
            if (!element) {
                element = document.documentElement;
            }
            var fontSize = window.getComputedStyle(element, null).fontSize;
            return parseFloat(fontSize) || 16;
        }

        /**
         * Get element size
         * @param {HTMLElement} element
         * @returns {Object} {width, height}
         */
        function getElementSize(element) {
            if (!element.getBoundingClientRect) {
                return {
                    width: element.offsetWidth,
                    height: element.offsetHeight
                }
            }

            var rect = element.getBoundingClientRect();
            return {
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            }
        }

        /**
         *
         * @copyright https://github.com/Mr0grog/element-query/blob/master/LICENSE
         *
         * @param {HTMLElement} element
         * @param {*} value
         * @returns {*}
         */
        function convertToPx(element, value) {
            var numbers = value.split(/\d/);
            var units = numbers[numbers.length - 1];
            value = parseFloat(value);
            switch (units) {
                case "px":
                    return value;
                case "em":
                    return value * getEmSize(element);
                case "rem":
                    return value * getEmSize();
                // Viewport units!
                // According to http://quirksmode.org/mobile/tableViewport.html
                // documentElement.clientWidth/Height gets us the most reliable info
                case "vw":
                    return value * document.documentElement.clientWidth / 100;
                case "vh":
                    return value * document.documentElement.clientHeight / 100;
                case "vmin":
                case "vmax":
                    var vw = document.documentElement.clientWidth / 100;
                    var vh = document.documentElement.clientHeight / 100;
                    var chooser = Math[units === "vmin" ? "min" : "max"];
                    return value * chooser(vw, vh);
                default:
                    return value;
                // for now, not supporting physical units (since they are just a set number of px)
                // or ex/ch (getting accurate measurements is hard)
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {String} id
         * @constructor
         */
        function SetupInformation(element, id) {
            this.element = element;
            var key, option, elementSize, value, actualValue, attrValues, attrValue, attrName;

            var attributes = ['min-width', 'min-height', 'max-width', 'max-height'];

            /**
             * Extracts the computed width/height and sets to min/max- attribute.
             */
            this.call = function () {
                // extract current dimensions
                elementSize = getElementSize(this.element);

                attrValues = {};

                for (key in allQueries[id]) {
                    if (!allQueries[id].hasOwnProperty(key)) {
                        continue;
                    }
                    option = allQueries[id][key];

                    value = convertToPx(this.element, option.value);

                    actualValue = option.property === 'width' ? elementSize.width : elementSize.height;
                    attrName = option.mode + '-' + option.property;
                    attrValue = '';

                    if (option.mode === 'min' && actualValue >= value) {
                        attrValue += option.value;
                    }

                    if (option.mode === 'max' && actualValue <= value) {
                        attrValue += option.value;
                    }

                    if (!attrValues[attrName]) attrValues[attrName] = '';
                    if (attrValue && -1 === (' ' + attrValues[attrName] + ' ').indexOf(' ' + attrValue + ' ')) {
                        attrValues[attrName] += ' ' + attrValue;
                    }
                }

                for (var k in attributes) {
                    if (!attributes.hasOwnProperty(k)) continue;

                    if (attrValues[attributes[k]]) {
                        this.element.setAttribute(attributes[k], attrValues[attributes[k]].substr(1));
                    } else {
                        this.element.removeAttribute(attributes[k]);
                    }
                }
            };
        }

        /**
         * @param {HTMLElement} element
         * @param {Object}      id
         */
        function setupElement(element, id) {
            if (!element.elementQueriesSetupInformation) {
                element.elementQueriesSetupInformation = new SetupInformation(element, id);
            }

            if (!element.elementQueriesSensor) {
                element.elementQueriesSensor = new ResizeSensor(element, function () {
                    element.elementQueriesSetupInformation.call();
                });
            }
        }

        /**
         * Stores rules to the selector that should be applied once resized.
         *
         * @param {String} selector
         * @param {String} mode min|max
         * @param {String} property width|height
         * @param {String} value
         */
        function queueQuery(selector, mode, property, value) {
            if (typeof(allQueries[selector]) === 'undefined') {
                allQueries[selector] = [];
                // add animation to trigger animationstart event, so we know exactly when a element appears in the DOM

                var id = idToSelectorMapping.length;
                cssStyleElement.innerHTML += '\n' + selector + ' {animation: 0.1s element-queries;}';
                cssStyleElement.innerHTML += '\n' + selector + ' > .resize-sensor {min-width: '+id+'px;}';
                idToSelectorMapping.push(selector);
            }

            allQueries[selector].push({
                mode: mode,
                property: property,
                value: value
            });
        }

        function getQuery(container) {
            var query;
            if (document.querySelectorAll) query = (container) ? container.querySelectorAll.bind(container) : document.querySelectorAll.bind(document);
            if (!query && 'undefined' !== typeof $$) query = $$;
            if (!query && 'undefined' !== typeof jQuery) query = jQuery;

            if (!query) {
                throw 'No document.querySelectorAll, jQuery or Mootools\'s $$ found.';
            }

            return query;
        }

        /**
         * If animationStart didn't catch a new element in the DOM, we can manually search for it
         */
        function findElementQueriesElements(container) {
            var query = getQuery(container);

            for (var selector in allQueries) if (allQueries.hasOwnProperty(selector)) {
                // find all elements based on the extract query selector from the element query rule
                var elements = query(selector, container);

                for (var i = 0, j = elements.length; i < j; i++) {
                    setupElement(elements[i], selector);
                }
            }
        }

        /**
         *
         * @param {HTMLElement} element
         */
        function attachResponsiveImage(element) {
            var children = [];
            var rules = [];
            var sources = [];
            var defaultImageId = 0;
            var lastActiveImage = -1;
            var loadedImages = [];

            for (var i in element.children) {
                if (!element.children.hasOwnProperty(i)) continue;

                if (element.children[i].tagName && element.children[i].tagName.toLowerCase() === 'img') {
                    children.push(element.children[i]);

                    var minWidth = element.children[i].getAttribute('min-width') || element.children[i].getAttribute('data-min-width');
                    //var minHeight = element.children[i].getAttribute('min-height') || element.children[i].getAttribute('data-min-height');
                    var src = element.children[i].getAttribute('data-src') || element.children[i].getAttribute('url');

                    sources.push(src);

                    var rule = {
                        minWidth: minWidth
                    };

                    rules.push(rule);

                    if (!minWidth) {
                        defaultImageId = children.length - 1;
                        element.children[i].style.display = 'block';
                    } else {
                        element.children[i].style.display = 'none';
                    }
                }
            }

            lastActiveImage = defaultImageId;

            function check() {
                var imageToDisplay = false, i;

                for (i in children) {
                    if (!children.hasOwnProperty(i)) continue;

                    if (rules[i].minWidth) {
                        if (element.offsetWidth > rules[i].minWidth) {
                            imageToDisplay = i;
                        }
                    }
                }

                if (!imageToDisplay) {
                    //no rule matched, show default
                    imageToDisplay = defaultImageId;
                }

                if (lastActiveImage !== imageToDisplay) {
                    //image change

                    if (!loadedImages[imageToDisplay]) {
                        //image has not been loaded yet, we need to load the image first in memory to prevent flash of
                        //no content

                        var image = new Image();
                        image.onload = function () {
                            children[imageToDisplay].src = sources[imageToDisplay];

                            children[lastActiveImage].style.display = 'none';
                            children[imageToDisplay].style.display = 'block';

                            loadedImages[imageToDisplay] = true;

                            lastActiveImage = imageToDisplay;
                        };

                        image.src = sources[imageToDisplay];
                    } else {
                        children[lastActiveImage].style.display = 'none';
                        children[imageToDisplay].style.display = 'block';
                        lastActiveImage = imageToDisplay;
                    }
                } else {
                    //make sure for initial check call the .src is set correctly
                    children[imageToDisplay].src = sources[imageToDisplay];
                }
            }

            element.resizeSensorInstance = new ResizeSensor(element, check);
            check();
        }

        function findResponsiveImages() {
            var query = getQuery();

            var elements = query('[data-responsive-image],[responsive-image]');
            for (var i = 0, j = elements.length; i < j; i++) {
                attachResponsiveImage(elements[i]);
            }
        }

        var regex = /,?[\s\t]*([^,\n]*?)((?:\[[\s\t]*?(?:min|max)-(?:width|height)[\s\t]*?[~$\^]?=[\s\t]*?"[^"]*?"[\s\t]*?])+)([^,\n\s\{]*)/mgi;
        var attrRegex = /\[[\s\t]*?(min|max)-(width|height)[\s\t]*?[~$\^]?=[\s\t]*?"([^"]*?)"[\s\t]*?]/mgi;

        /**
         * @param {String} css
         */
        function extractQuery(css) {
            var match, smatch, attrs, attrMatch;

            css = css.replace(/'/g, '"');
            while (null !== (match = regex.exec(css))) {
                smatch = match[1] + match[3];
                attrs = match[2];

                while (null !== (attrMatch = attrRegex.exec(attrs))) {
                    queueQuery(smatch, attrMatch[1], attrMatch[2], attrMatch[3]);
                }
            }
        }

        /**
         * @param {CssRule[]|String} rules
         */
        function readRules(rules) {
            var selector = '';

            if (!rules) {
                return;
            }

            if ('string' === typeof rules) {
                rules = rules.toLowerCase();
                if (-1 !== rules.indexOf('min-width') || -1 !== rules.indexOf('max-width')) {
                    extractQuery(rules);
                }
            } else {
                for (var i = 0, j = rules.length; i < j; i++) {
                    if (1 === rules[i].type) {
                        selector = rules[i].selectorText || rules[i].cssText;
                        if (-1 !== selector.indexOf('min-height') || -1 !== selector.indexOf('max-height')) {
                            extractQuery(selector);
                        } else if (-1 !== selector.indexOf('min-width') || -1 !== selector.indexOf('max-width')) {
                            extractQuery(selector);
                        }
                    } else if (4 === rules[i].type) {
                        readRules(rules[i].cssRules || rules[i].rules);
                    } else if (3 === rules[i].type) {
                        if(rules[i].styleSheet.hasOwnProperty("cssRules")) {
                            readRules(rules[i].styleSheet.cssRules);
                        }
                    }
                }
            }
        }

        var defaultCssInjected = false;

        /**
         * Searches all css rules and setups the event listener to all elements with element query rules..
         */
        this.init = function () {
            var animationStart = 'animationstart';
            if (typeof document.documentElement.style['webkitAnimationName'] !== 'undefined') {
                animationStart = 'webkitAnimationStart';
            } else if (typeof document.documentElement.style['MozAnimationName'] !== 'undefined') {
                animationStart = 'mozanimationstart';
            } else if (typeof document.documentElement.style['OAnimationName'] !== 'undefined') {
                animationStart = 'oanimationstart';
            }

            document.body.addEventListener(animationStart, function (e) {
                var element = e.target;
                var styles = element && window.getComputedStyle(element, null);
                var animationName = styles && styles.getPropertyValue('animation-name');
                var requiresSetup = animationName && (-1 !== animationName.indexOf('element-queries'));

                if (requiresSetup) {
                    element.elementQueriesSensor = new ResizeSensor(element, function () {
                        if (element.elementQueriesSetupInformation) {
                            element.elementQueriesSetupInformation.call();
                        }
                    });

                    var sensorStyles = window.getComputedStyle(element.resizeSensor, null);
                    var id = sensorStyles.getPropertyValue('min-width');
                    id = parseInt(id.replace('px', ''));
                    setupElement(e.target, idToSelectorMapping[id]);
                }
            });

            if (!defaultCssInjected) {
                cssStyleElement = document.createElement('style');
                cssStyleElement.type = 'text/css';
                cssStyleElement.innerHTML = '[responsive-image] > img, [data-responsive-image] {overflow: hidden; padding: 0; } [responsive-image] > img, [data-responsive-image] > img {width: 100%;}';

                //safari wants at least one rule in keyframes to start working
                cssStyleElement.innerHTML += '\n@keyframes element-queries { 0% { visibility: inherit; } }';
                document.getElementsByTagName('head')[0].appendChild(cssStyleElement);
                defaultCssInjected = true;
            }

            for (var i = 0, j = document.styleSheets.length; i < j; i++) {
                try {
                    if (document.styleSheets[i].href && 0 === document.styleSheets[i].href.indexOf('file://')) {
                        console.warn("CssElementQueries: unable to parse local css files, " + document.styleSheets[i].href);
                    }

                    readRules(document.styleSheets[i].cssRules || document.styleSheets[i].rules || document.styleSheets[i].cssText);
                } catch (e) {
                }
            }

            findResponsiveImages();
        };

        /**
         * Go through all collected rules (readRules()) and attach the resize-listener.
         * Not necessary to call it manually, since we detect automatically when new elements
         * are available in the DOM. However, sometimes handy for dirty DOM modifications.
         *
         * @param {HTMLElement} container only elements of the container are considered (document.body if not set)
         */
        this.findElementQueriesElements = function (container) {
            findElementQueriesElements(container);
        };

        this.update = function () {
            this.init();
        };
    };

    ElementQueries.update = function () {
        ElementQueries.instance.update();
    };

    /**
     * Removes all sensor and elementquery information from the element.
     *
     * @param {HTMLElement} element
     */
    ElementQueries.detach = function (element) {
        if (element.elementQueriesSetupInformation) {
            //element queries
            element.elementQueriesSensor.detach();
            delete element.elementQueriesSetupInformation;
            delete element.elementQueriesSensor;

        } else if (element.resizeSensorInstance) {
            //responsive image

            element.resizeSensorInstance.detach();
            delete element.resizeSensorInstance;
        }
    };

    ElementQueries.init = function () {
        if (!ElementQueries.instance) {
            ElementQueries.instance = new ElementQueries();
        }

        ElementQueries.instance.init();
    };

    var domLoaded = function (callback) {
        /* Mozilla, Chrome, Opera */
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', callback, false);
        }
        /* Safari, iCab, Konqueror */
        else if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
            var DOMLoadTimer = setInterval(function () {
                if (/loaded|complete/i.test(document.readyState)) {
                    callback();
                    clearInterval(DOMLoadTimer);
                }
            }, 10);
        }
        /* Other web browsers */
        else window.onload = callback;
    };

    ElementQueries.findElementQueriesElements = function (container) {
        ElementQueries.instance.findElementQueriesElements(container);
    };

    ElementQueries.listen = function () {
        domLoaded(ElementQueries.init);
    };

    return ElementQueries;

}));


/***/ }),

/***/ "./node_modules/css-element-queries/src/ResizeSensor.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-element-queries/src/ResizeSensor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(typeof window !== 'undefined' ? window : this, function () {

    // Make sure it does not throw in a SSR (Server Side Rendering) situation
    if (typeof window === "undefined") {
        return null;
    }
    // https://github.com/Semantic-Org/Semantic-UI/issues/3855
    // https://github.com/marcj/css-element-queries/issues/257
    var globalWindow = typeof window != 'undefined' && window.Math == Math
        ? window
        : typeof self != 'undefined' && self.Math == Math
            ? self
            : Function('return this')();
    // Only used for the dirty checking, so the event callback count is limited to max 1 call per fps per sensor.
    // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
    // would generate too many unnecessary events.
    var requestAnimationFrame = globalWindow.requestAnimationFrame ||
        globalWindow.mozRequestAnimationFrame ||
        globalWindow.webkitRequestAnimationFrame ||
        function (fn) {
            return globalWindow.setTimeout(fn, 20);
        };

    var cancelAnimationFrame = globalWindow.cancelAnimationFrame ||
        globalWindow.mozCancelAnimationFrame ||
        globalWindow.webkitCancelAnimationFrame ||
        function (timer) {
            globalWindow.clearTimeout(timer);
        };

    /**
     * Iterate over each of the provided element(s).
     *
     * @param {HTMLElement|HTMLElement[]} elements
     * @param {Function}                  callback
     */
    function forEachElement(elements, callback){
        var elementsType = Object.prototype.toString.call(elements);
        var isCollectionTyped = ('[object Array]' === elementsType
            || ('[object NodeList]' === elementsType)
            || ('[object HTMLCollection]' === elementsType)
            || ('[object Object]' === elementsType)
            || ('undefined' !== typeof jQuery && elements instanceof jQuery) //jquery
            || ('undefined' !== typeof Elements && elements instanceof Elements) //mootools
        );
        var i = 0, j = elements.length;
        if (isCollectionTyped) {
            for (; i < j; i++) {
                callback(elements[i]);
            }
        } else {
            callback(elements);
        }
    }

    /**
    * Get element size
    * @param {HTMLElement} element
    * @returns {Object} {width, height}
    */
    function getElementSize(element) {
        if (!element.getBoundingClientRect) {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            }
        }

        var rect = element.getBoundingClientRect();
        return {
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        }
    }

    /**
     * Apply CSS styles to element.
     *
     * @param {HTMLElement} element
     * @param {Object} style
     */
    function setStyle(element, style) {
        Object.keys(style).forEach(function(key) {
            element.style[key] = style[key];
        });
    }

    /**
     * Class for dimension change detection.
     *
     * @param {Element|Element[]|Elements|jQuery} element
     * @param {Function} callback
     *
     * @constructor
     */
    var ResizeSensor = function(element, callback) {
        //Is used when checking in reset() only for invisible elements
        var lastAnimationFrameForInvisibleCheck = 0;

        /**
         *
         * @constructor
         */
        function EventQueue() {
            var q = [];
            this.add = function(ev) {
                q.push(ev);
            };

            var i, j;
            this.call = function(sizeInfo) {
                for (i = 0, j = q.length; i < j; i++) {
                    q[i].call(this, sizeInfo);
                }
            };

            this.remove = function(ev) {
                var newQueue = [];
                for(i = 0, j = q.length; i < j; i++) {
                    if(q[i] !== ev) newQueue.push(q[i]);
                }
                q = newQueue;
            };

            this.length = function() {
                return q.length;
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (!element) return;
            if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }

            element.resizedAttached = new EventQueue();
            element.resizedAttached.add(resized);

            element.resizeSensor = document.createElement('div');
            element.resizeSensor.dir = 'ltr';
            element.resizeSensor.className = 'resize-sensor';

            var style = {
                pointerEvents: 'none',
                position: 'absolute',
                left: '0px',
                top: '0px',
                right: '0px',
                bottom: '0px',
                overflow: 'hidden',
                zIndex: '-1',
                visibility: 'hidden',
                maxWidth: '100%'
            };
            var styleChild = {
                position: 'absolute',
                left: '0px',
                top: '0px',
                transition: '0s',
            };

            setStyle(element.resizeSensor, style);

            var expand = document.createElement('div');
            expand.className = 'resize-sensor-expand';
            setStyle(expand, style);

            var expandChild = document.createElement('div');
            setStyle(expandChild, styleChild);
            expand.appendChild(expandChild);

            var shrink = document.createElement('div');
            shrink.className = 'resize-sensor-shrink';
            setStyle(shrink, style);

            var shrinkChild = document.createElement('div');
            setStyle(shrinkChild, styleChild);
            setStyle(shrinkChild, { width: '200%', height: '200%' });
            shrink.appendChild(shrinkChild);

            element.resizeSensor.appendChild(expand);
            element.resizeSensor.appendChild(shrink);
            element.appendChild(element.resizeSensor);

            var computedStyle = window.getComputedStyle(element);
            var position = computedStyle ? computedStyle.getPropertyValue('position') : null;
            if ('absolute' !== position && 'relative' !== position && 'fixed' !== position && 'sticky' !== position) {
                element.style.position = 'relative';
            }

            var dirty = false;

            //last request animation frame id used in onscroll event
            var rafId = 0;
            var size = getElementSize(element);
            var lastWidth = 0;
            var lastHeight = 0;
            var initialHiddenCheck = true;
            lastAnimationFrameForInvisibleCheck = 0;

            var resetExpandShrink = function () {
                var width = element.offsetWidth;
                var height = element.offsetHeight;

                expandChild.style.width = (width + 10) + 'px';
                expandChild.style.height = (height + 10) + 'px';

                expand.scrollLeft = width + 10;
                expand.scrollTop = height + 10;

                shrink.scrollLeft = width + 10;
                shrink.scrollTop = height + 10;
            };

            var reset = function() {
                // Check if element is hidden
                if (initialHiddenCheck) {
                    var invisible = element.offsetWidth === 0 && element.offsetHeight === 0;
                    if (invisible) {
                        // Check in next frame
                        if (!lastAnimationFrameForInvisibleCheck){
                            lastAnimationFrameForInvisibleCheck = requestAnimationFrame(function(){
                                lastAnimationFrameForInvisibleCheck = 0;
                                reset();
                            });
                        }

                        return;
                    } else {
                        // Stop checking
                        initialHiddenCheck = false;
                    }
                }

                resetExpandShrink();
            };
            element.resizeSensor.resetSensor = reset;

            var onResized = function() {
                rafId = 0;

                if (!dirty) return;

                lastWidth = size.width;
                lastHeight = size.height;

                if (element.resizedAttached) {
                    element.resizedAttached.call(size);
                }
            };

            var onScroll = function() {
                size = getElementSize(element);
                dirty = size.width !== lastWidth || size.height !== lastHeight;

                if (dirty && !rafId) {
                    rafId = requestAnimationFrame(onResized);
                }

                reset();
            };

            var addEvent = function(el, name, cb) {
                if (el.attachEvent) {
                    el.attachEvent('on' + name, cb);
                } else {
                    el.addEventListener(name, cb);
                }
            };

            addEvent(expand, 'scroll', onScroll);
            addEvent(shrink, 'scroll', onScroll);

            // Fix for custom Elements and invisible elements
            lastAnimationFrameForInvisibleCheck = requestAnimationFrame(function(){
                lastAnimationFrameForInvisibleCheck = 0;
                reset();
            });
        }

        forEachElement(element, function(elem){
            attachResizeEvent(elem, callback);
        });

        this.detach = function(ev) {
            // clean up the unfinished animation frame to prevent a potential endless requestAnimationFrame of reset
            if (!lastAnimationFrameForInvisibleCheck) {
                cancelAnimationFrame(lastAnimationFrameForInvisibleCheck);
                lastAnimationFrameForInvisibleCheck = 0;
            }
            ResizeSensor.detach(element, ev);
        };

        this.reset = function() {
            element.resizeSensor.resetSensor();
        };
    };

    ResizeSensor.reset = function(element) {
        forEachElement(element, function(elem){
            elem.resizeSensor.resetSensor();
        });
    };

    ResizeSensor.detach = function(element, ev) {
        forEachElement(element, function(elem){
            if (!elem) return;
            if(elem.resizedAttached && typeof ev === "function"){
                elem.resizedAttached.remove(ev);
                if(elem.resizedAttached.length()) return;
            }
            if (elem.resizeSensor) {
                if (elem.contains(elem.resizeSensor)) {
                    elem.removeChild(elem.resizeSensor);
                }
                delete elem.resizeSensor;
                delete elem.resizedAttached;
            }
        });
    };

    if (typeof MutationObserver !== "undefined") {
        var observer = new MutationObserver(function (mutations) {
            for (var i in mutations) {
                if (mutations.hasOwnProperty(i)) {
                    var items = mutations[i].addedNodes;
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].resizeSensor) {
                            ResizeSensor.reset(items[j]);
                        }
                    }
                }
            }
        });

        document.addEventListener("DOMContentLoaded", function (event) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }

    return ResizeSensor;

}));


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/arduino-select.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/arduino-ide-extension/src/browser/style/arduino-select.css ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".arduino-select__control {\r\n    border: var(--theia-sideBar-background) var(--theia-border-width) solid !important;\r\n    background: var(--theia-sideBar-background) !important;\r\n}\r\n\r\n.arduino-select__control:hover {\r\n    border: var(--theia-focusBorder) var(--theia-border-width) solid !important;\r\n}\r\n\r\n.arduino-select__control--is-focused {\r\n    box-shadow: none !important;\r\n}\r\n\r\n.arduino-select__option--is-selected {\r\n    background-color: var(--theia-list-activeSelectionBackground) !important;\r\n    color: var(--theia-list-activeSelectionForeground) !important;\r\n    border-color: var(--theia-focusBorder) !important;\r\n}\r\n\r\n.arduino-select__option--is-focused {\r\n    background-color: var(--theia-list-hoverBackground) !important;\r\n    border-color: var(--theia-focusBorder) !important;\r\n}\r\n\r\n.arduino-select__option--is-focused.arduino-select__option--is-selected {\r\n    background-color: var(--theia-list-activeSelectionBackground) !important;\r\n    color: var(--theia-list-activeSelectionForeground) !important;\r\n    border-color: var(--theia-focusBorder) !important;\r\n}\r\n\r\n.arduino-select__menu {\r\n    background-color: var(--theia-sideBar-background) !important;\r\n    border: 1px solid var(--theia-focusBorder) !important;\r\n    top: auto !important; /* to align the top of the menu with the bottom of the control */\r\n    box-shadow: none !important;\r\n}\r\n\r\n.arduino-select__control.arduino-select__control--menu-is-open {\r\n    border: 1px solid !important;\r\n    border-color: var(--theia-focusBorder) !important;\r\n    border-bottom-color: var(--theia-sideBar-background) !important; /* if the bottom border color has the same color as the background of the control, we make the border \"invisible\" */\r\n}\r\n\r\n.arduino-select__value-container .arduino-select__single-value {\r\n    color: var(--theia-descriptionForeground) !important;\r\n}\r\n\r\n.arduino-select__menu-list {\r\n    padding-top: 0 !important;\r\n    padding-bottom: 0 !important;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/boards-config-dialog.css":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/arduino-ide-extension/src/browser/style/boards-config-dialog.css ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div#select-board-dialog {\r\n    margin: 5px 20px 50px 20px;\r\n}\r\n\r\ndiv#select-board-dialog .selectBoardContainer .body {\r\n    display: flex;\r\n    overflow: hidden;\r\n}\r\n\r\ndiv.dialogContent.select-board-dialog > div.head {\r\n    padding-left: 21px;\r\n}\r\n\r\ndiv.dialogContent.select-board-dialog > div.head .title {\r\n    font-weight: 400;\r\n    letter-spacing: .02em;\r\n    font-size: 1.2em;\r\n    color: var(--theia-arduino-branding-primary);\r\n    margin: 17px 0;\r\n}\r\n\r\ndiv#select-board-dialog .selectBoardContainer .head .text {\r\n    margin-bottom: 21px;\r\n}\r\n\r\ndiv#select-board-dialog .selectBoardContainer .body .list .item.selected {\r\n    background: var(--theia-secondaryButton-hoverBackground);\r\n}\r\n\r\ndiv#select-board-dialog .selectBoardContainer .body .list .item.selected i {\r\n    color: var(--theia-arduino-branding-primary);\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .search,\r\n#select-board-dialog .selectBoardContainer .search input,\r\n#select-board-dialog .selectBoardContainer .list,\r\n#select-board-dialog .selectBoardContainer .list {\r\n    background: var(--theia-editor-background);\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .search input {\r\n    border: none;\r\n    width: 100%;\r\n    height: auto;\r\n    max-height: 37px;\r\n    padding: 10px 5px 10px 10px;\r\n    margin: 0;\r\n    vertical-align: top;\r\n    display: flex;\r\n    color: var(--theia-editor-foreground);\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .search input:focus {\r\n    box-shadow: none;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .container {\r\n    flex: 1;\r\n    padding: 0px 10px 0px 0px;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .left.container .content {\r\n    margin: 0 5px 0 0;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .right.container .content {\r\n    margin: 0 0 0 5px;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .container .content .title {\r\n    color: #7f8c8d;\r\n    padding: 0px 0px 10px 0px;\r\n    text-transform: uppercase;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .container .content .footer {\r\n    padding: 10px 5px 10px 0px;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .container .content .loading {\r\n    font-size: var(--theia-ui-font-size1);\r\n    color: var(--theia-arduino-branding-secondary);\r\n    padding: 10px 5px 10px 10px;\r\n    text-transform: uppercase;\r\n    /* The max, min-height comes from `.body .list` 265px + 47px top padding - 2 * 10px top padding */\r\n    max-height: 292px;\r\n    min-height: 292px;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .list .item {\r\n    padding: 10px 5px 10px 10px;\r\n    display: flex;\r\n    justify-content: end;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .list .item .selected-icon {\r\n    margin-left: auto;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .list .item .details {\r\n    font-size: var(--theia-ui-font-size1);\r\n    opacity: var(--theia-mod-disabled-opacity);\r\n    width: 155px; /* used heuristics for the calculation */\r\n    white-space: pre;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .list .item.missing {\r\n    opacity: var(--theia-mod-disabled-opacity);\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .list .item:hover {\r\n    background: var(--theia-secondaryButton-hoverBackground);\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .list {\r\n    max-height: 265px;\r\n    min-height: 265px;\r\n    overflow-y: auto;\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .ports.list {\r\n    margin: 47px 0px 0px 0px /* 47 is 37 as input height for the `Boards`, plus 10 margin bottom. */\r\n}\r\n\r\n#select-board-dialog .selectBoardContainer .body .search {\r\n    margin-bottom: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    padding-right: 5px;\r\n}\r\n\r\n.p-Widget.dialogOverlay .dialogContent.select-board-dialog {\r\n    width: 740px;\r\n}\r\n\r\nbutton.theia-button {\r\n    height: 31px;\r\n}\r\n\r\nbutton.theia-button.secondary {\r\n    background-color: var(--theia-secondaryButton-background);\r\n    color: var(--theia-foreground);\r\n}\r\n\r\nbutton.theia-button.main {\r\n    color: var(--theia-button-foreground);\r\n}\r\n\r\n.dialogControl {\r\n    margin: 0 20px 30px 0;\r\n}\r\n\r\n.arduino-boards-toolbar-item-container {\r\n    margin-left: 3px;\r\n}\r\n\r\n.arduino-boards-toolbar-item-container .arduino-boards-toolbar-item .inner-container {\r\n    display: flex;\r\n    align-items: baseline;\r\n    width: 100%;\r\n}\r\n\r\n.arduino-boards-toolbar-item-container .arduino-boards-toolbar-item .inner-container .notAttached {\r\n    width: 10px;\r\n    height: 10px;\r\n    color: red;\r\n    margin: 0 5px;\r\n}\r\n\r\n.arduino-boards-toolbar-item-container .arduino-boards-toolbar-item .inner-container .guessed {\r\n    width: 10px;\r\n    height: 10px;\r\n    color: var(--theia-warningBackground);\r\n    margin: 0 5px;\r\n}\r\n\r\n.arduino-boards-toolbar-item-container {\r\n    display: flex;\r\n    align-items: center;\r\n    width: 220px;\r\n}\r\n\r\n.arduino-boards-toolbar-item .label {\r\n    height: 100%;\r\n    display: flex;\r\n    align-items: center;\r\n    margin: 0 5px;\r\n    width: 100%;\r\n}\r\n\r\n.arduino-boards-toolbar-item .caret {\r\n    width: 10px;\r\n    margin-right: 5px;\r\n}\r\n\r\n.arduino-boards-toolbar-item {\r\n    background: var(--theia-tab-unfocusedActiveBackground);\r\n    color: var(--theia-foreground);\r\n    height: 22px;\r\n    display: flex;\r\n    width: 100%;\r\n    overflow: hidden;\r\n    margin: 0px 3px 0px 3px;\r\n}\r\n\r\n.arduino-boards-dropdown-list {\r\n    border: 3px solid var(--theia-activityBar-background);\r\n    margin: -3px;\r\n    z-index: 1;\r\n}\r\n\r\n.arduino-boards-dropdown-item {\r\n    font-size: var(--theia-ui-font-size1);\r\n    display: flex;\r\n    padding: 10px;\r\n    cursor: pointer;\r\n    color: var(--theia-foreground);\r\n    background: var(--theia-tab-unfocusedActiveBackground);\r\n}\r\n\r\n.arduino-boards-dropdown-item .fa-check {\r\n    color: var(--theia-arduino-branding-primary);\r\n    align-self: center;\r\n}\r\n\r\n.arduino-boards-dropdown-item.selected,\r\n.arduino-boards-dropdown-item:hover {\r\n    background: var(--theia-list-hoverBackground);\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/index.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/arduino-ide-extension/src/browser/style/index.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__(/*! -!../../../../css-loader!./list-widget.css */ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/list-widget.css"), "");
exports.i(__webpack_require__(/*! -!../../../../css-loader!./boards-config-dialog.css */ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/boards-config-dialog.css"), "");
exports.i(__webpack_require__(/*! -!../../../../css-loader!./main.css */ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/main.css"), "");
exports.i(__webpack_require__(/*! -!../../../../css-loader!./monitor.css */ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/monitor.css"), "");
exports.i(__webpack_require__(/*! -!../../../../css-loader!./arduino-select.css */ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/arduino-select.css"), "");
exports.i(__webpack_require__(/*! -!../../../../css-loader!./status-bar.css */ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/status-bar.css"), "");
exports.i(__webpack_require__(/*! -!../../../../css-loader!./terminal.css */ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/terminal.css"), "");

// module
exports.push([module.i, ".theia-input.warning:focus {\r\n    outline-width: 1px;\r\n    outline-style: solid;\r\n    outline-offset: -1px;\r\n    opacity: 1 !important;\r\n    color: var(--theia-warningForeground);\r\n    background-color: var(--theia-warningBackground);\r\n}\r\n\r\n.theia-input.warning {\r\n    background-color: var(--theia-warningBackground);\r\n}\r\n\r\n.theia-input.warning::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */\r\n    color: var(--theia-warningForeground);\r\n    background-color: var(--theia-warningBackground);\r\n    opacity: 1; /* Firefox */\r\n}\r\n\r\n.theia-input.warning:-ms-input-placeholder { /* Internet Explorer 10-11 */\r\n    color: var(--theia-warningForeground);\r\n    background-color: var(--theia-warningBackground);\r\n}\r\n\r\n.theia-input.warning::-ms-input-placeholder { /* Microsoft Edge */\r\n    color: var(--theia-warningForeground);\r\n    background-color: var(--theia-warningBackground);\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/list-widget.css":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/arduino-ide-extension/src/browser/style/list-widget.css ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../../css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".library-tab-icon {\r\n    -webkit-mask: url(" + escape(__webpack_require__(/*! ../icons/library-tab-icon.svg */ "./node_modules/arduino-ide-extension/src/browser/icons/library-tab-icon.svg")) + ");\r\n    mask: url(" + escape(__webpack_require__(/*! ../icons/library-tab-icon.svg */ "./node_modules/arduino-ide-extension/src/browser/icons/library-tab-icon.svg")) + ");\r\n}\r\n\r\n.arduino-list-widget {\r\n    color: var(--theia-foreground);\r\n}\r\n\r\n.arduino-list-widget .search-bar {\r\n    margin: 0px 10px 10px 15px;\r\n}\r\n\r\n.arduino-list-widget .search-bar:focus {\r\n    border-color: var(--theia-focusBorder);\r\n}\r\n\r\n.filterable-list-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n    height: 100%; /* This has top be 100% down to the `scrollContainer`. */\r\n}\r\n\r\n.filterable-list-container .items-container {\r\n    height: 100%; /* This has to be propagated down from the widget. */\r\n    position: relative; /* To fix the `top` of the vertical toolbar.  */\r\n}\r\n\r\n.filterable-list-container .items-container > div:nth-child(odd) {\r\n    background-color: var(--theia-sideBar-background);\r\n    filter: contrast(105%);\r\n}\r\n\r\n.filterable-list-container .items-container > div:nth-child(even) {\r\n    background-color: var(--theia-sideBar-background);\r\n    filter: contrast(95%);\r\n}\r\n\r\n.filterable-list-container .items-container > div:hover {\r\n    background-color: var(--theia-sideBar-background);\r\n    filter: contrast(90%);\r\n}\r\n\r\n/* Perfect scrollbar does not like if we explicitly set the `background-color` of the contained elements.\r\nSee above: `.filterable-list-container .items-container > div:nth-child(odd|event)`.\r\nWe have to increase `z-index` of the scroll-bar thumb. Otherwise, the thumb is not visible.\r\nhttps://github.com/arduino/arduino-pro-ide/issues/82 */\r\n.arduino-list-widget .filterable-list-container .items-container .ps__rail-y {\r\n    z-index: 1;\r\n}\r\n\r\n.component-list-item {\r\n    padding: 10px 10px 10px 15px;\r\n    font-size: var(--theia-ui-font-size1);\r\n}\r\n\r\n.component-list-item:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.component-list-item .header {\r\n    padding-bottom: 2px;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.component-list-item .header .version-info {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n}\r\n\r\n.component-list-item .header .name {\r\n    font-weight: bold;\r\n}\r\n\r\n.component-list-item .header .author {\r\n    font-weight: bold;\r\n    color: var(--theia-panelTitle-inactiveForeground);\r\n}\r\n\r\n.component-list-item:hover .header .author {\r\n    color: var(--theia-foreground);\r\n}\r\n\r\n.component-list-item .header .version {\r\n    color: var(--theia-panelTitle-inactiveForeground);\r\n}\r\n\r\n.component-list-item .footer .theia-button.install {\r\n    height: auto; /* resets the default Theia button height in the filterable list widget */\r\n}\r\n\r\n.component-list-item .header .installed:before {\r\n    margin-left: 4px;\r\n    display: inline-block;\r\n    justify-self: end;\r\n    background-color: var(--theia-button-background);\r\n    padding: 2px 4px 2px 4px;\r\n    font-size: 10px;\r\n    font-weight: bold;\r\n    max-height: calc(1em + 4px);\r\n    color: var(--theia-button-foreground);\r\n    content: 'INSTALLED';\r\n}\r\n\r\n.component-list-item .header .installed:hover:before {\r\n    background-color: var(--theia-button-foreground);\r\n    color: var(--theia-button-background);\r\n    content: 'UNINSTALL';\r\n}\r\n\r\n.component-list-item[min-width~=\"170px\"] .footer {\r\n    padding: 5px 5px 0px 0px;\r\n    min-height: 26px; /* 21 + 5 from the footer margin top */\r\n    display: flex;\r\n    flex-direction: row-reverse;\r\n}\r\n\r\n.component-list-item .footer {\r\n    flex-direction: column-reverse;\r\n}\r\n\r\n.component-list-item .footer > * {\r\n    display: none\r\n}\r\n\r\n.component-list-item:hover .footer > * {\r\n    display: block;\r\n    margin: 5px 0px 0px 10px;\r\n}\r\n\r\n.component-list-item:hover .footer > label {\r\n    display: block;\r\n    align-self: center;\r\n    margin: 5px 0px 0px 10px;\r\n}\r\n\r\n.component-list-item .info a {\r\n    color: var(--theia-button-background);\r\n    text-decoration: none;\r\n}\r\n\r\n.component-list-item a:hover {\r\n    text-decoration: underline;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/main.css":
/*!*************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/arduino-ide-extension/src/browser/style/main.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../../css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#theia-bottom-content-panel .p-TabBar[data-orientation='horizontal'].theia-app-bottom {\r\n    background: var(--theia-editorGroupHeader-tabsBackground);\r\n}\r\n\r\n.p-TabBar-toolbar .item.arduino-tool-item {\r\n    margin-left: 3px;\r\n}\r\n\r\n.p-TabBar-toolbar .item.arduino-tool-item > div {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    height: 24px;\r\n    width: 24px;\r\n    background: var(--theia-arduino-toolbar-background);\r\n}\r\n\r\n.p-TabBar-toolbar .item.arduino-tool-item > div:hover {\r\n    background: (--theia-arduino-toolbar-hoverBackground);\r\n}\r\n\r\n.arduino-verify-sketch--toolbar,\r\n.arduino-upload-sketch--toolbar {\r\n    border-radius: 12px;\r\n}\r\n\r\n.arduino-tool-icon {\r\n    height: 24px;\r\n    width: 24px;\r\n    background-color: var(--theia-titleBar-activeBackground);\r\n    -webkit-mask: url(" + escape(__webpack_require__(/*! ../icons/mask-buttons.svg */ "./node_modules/arduino-ide-extension/src/browser/icons/mask-buttons.svg")) + ");\r\n    mask: url(" + escape(__webpack_require__(/*! ../icons/mask-buttons.svg */ "./node_modules/arduino-ide-extension/src/browser/icons/mask-buttons.svg")) + ");\r\n    -webkit-mask-size: 800%;\r\n    mask-size: 800%;\r\n}\r\n\r\n.arduino-save-sketch--toolbar-icon {\r\n    -webkit-mask-position: 59px -4px;\r\n    mask-position: 59px -4px;\r\n}\r\n\r\n.arduino-verify-sketch--toolbar-icon {\r\n    -webkit-mask-position: 188px -4px;\r\n    mask-position: 188px -4px;\r\n}\r\n\r\n.arduino-upload-sketch--toolbar-icon {\r\n    -webkit-mask-position: 156px -4px;\r\n    mask-position: 156px -4px;\r\n}\r\n\r\n.arduino-new-sketch--toolbar-icon {\r\n    -webkit-mask-position: 124px -4px;\r\n    mask-position: 124px -4px;\r\n}\r\n\r\n.arduino-open-sketch--toolbar-icon {\r\n    -webkit-mask-position: 92px -4px;\r\n    mask-position: 92px -4px;\r\n}\r\n\r\n.toggle-serial-monitor-icon {\r\n    -webkit-mask-position: 28px -4px;\r\n    mask-position: 28px -4px;\r\n}\r\n\r\n#arduino-toolbar-container {\r\n    display: flex;\r\n    width: 100%;\r\n}\r\n\r\n.p-TabBar-toolbar.theia-arduino-toolbar {\r\n    flex: 1;\r\n    z-index: 0;\r\n}\r\n\r\n#theia-top-panel .p-TabBar-toolbar {\r\n    padding-left: 4px !important; /* moves the `verify`, upload and other toolbar items to the left */\r\n}\r\n\r\n.p-Widget .p-MenuBar {\r\n    padding-left: 1px !important; /* moves the menubar: `File`, `Edit`, etc to the left */\r\n}\r\n\r\n#theia-top-panel .p-TabBar-toolbar.theia-arduino-toolbar.right {\r\n    justify-content: flex-start;\r\n    min-width: 190px;\r\n}\r\n\r\n#theia-top-panel .p-TabBar-toolbar.theia-arduino-toolbar.left {\r\n    min-width: 398px;\r\n    justify-content: flex-end;\r\n}\r\n\r\n.arduino-toolbar-tooltip {\r\n    margin-left: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    color: var(--theia-titleBar-activeForeground);\r\n}\r\n\r\n.p-TabBar-toolbar .item > div.arduino-toggle-advanced-mode {\r\n    display: flex;\r\n    width: 24px;\r\n    height: 24px;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.arduino-toggle-advanced-mode-icon {\r\n    mask: none;\r\n    -webkit-mask: none;\r\n    background: none;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    color: var(--theia-titleBar-activeBackground);\r\n}\r\n\r\n.arduino-open-boards-control-icon {\r\n    mask: none;\r\n    -webkit-mask: none;\r\n    background: none;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    color: var(--theia-titleBar-activeBackground);\r\n}\r\n\r\n.monaco-editor .margin {\r\n    border-right: 2px solid var(--theia-sideBar-background);\r\n    box-sizing: border-box;\r\n}\r\n\r\n.noWrapInfo {\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.theia-sidepanel-toolbar .theia-sidepanel-title {\r\n    margin-left: 10px;\r\n}\r\n\r\n.p-Widget.dialogOverlay .dialogBlock {\r\n    background-color: var(--theia-arduino-foreground);\r\n}\r\n\r\n#arduino-open-sketch-control--toolbar--container {\r\n    background-color: var(--theia-arduino-toolbar-background);\r\n    padding: 8px 8px 8px 8px; /* based on pure heuristics */\r\n}\r\n\r\n#arduino-open-sketch-control--toolbar {\r\n    height: unset;\r\n    width: unset;\r\n    line-height: unset;\r\n    color: var(--theia-titleBar-activeBackground);\r\n}\r\n\r\n/* Output */\r\n.theia-output .editor-container {\r\n    background-color: var(--theia-arduino-output-background);\r\n}\r\n\r\n.theia-output .monaco-editor .lines-content.monaco-editor-background {\r\n    background-color: var(--theia-arduino-output-background);\r\n}\r\n\r\n.theia-output .monaco-editor .lines-content.monaco-editor-background .view-lines .view-line .mtk1:not(.theia-output-error):not(.theia-output-warning) {\r\n    color: var(--theia-arduino-output-foreground);\r\n}\r\n\r\n.theia-output .monaco-editor .margin {\r\n    border-right: none;\r\n    background-color: var(--theia-arduino-output-background);\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/monitor.css":
/*!****************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/arduino-ide-extension/src/browser/style/monitor.css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../../css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".p-TabBar.theia-app-centers .p-TabBar-tabIcon.arduino-serial-monitor-tab-icon {\r\n    background: url(" + escape(__webpack_require__(/*! ../icons/buttons.svg */ "./node_modules/arduino-ide-extension/src/browser/icons/buttons.svg")) + ");\r\n    background-size: 800%;\r\n    background-position-y: 41px;\r\n    background-position-x: 19px;\r\n}\r\n\r\n.serial-monitor {\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.serial-monitor .head {\r\n    display: flex;\r\n    padding: 5px;\r\n    height: 27px;\r\n}\r\n\r\n.serial-monitor .head .send {\r\n    display: flex;\r\n    flex: 1;\r\n    margin-right: 2px;\r\n}\r\n\r\n.serial-monitor .head .send > input {\r\n    line-height: var(--theia-content-line-height);\r\n    width: 100%;\r\n}\r\n\r\n.serial-monitor .head .send > input:focus {\r\n    border-color: var(--theia-focusBorder);\r\n}\r\n\r\n.serial-monitor .head .config {\r\n    display: flex;\r\n}\r\n\r\n.serial-monitor .head .config .select {\r\n    margin-left: 3px;\r\n}\r\n\r\n.serial-monitor .body {\r\n    overflow: auto;\r\n    flex: 1;\r\n    padding: 5px;\r\n}\r\n\r\n.p-TabBar-toolbar .item.arduino-monitor {\r\n    width: 24px;\r\n    justify-content: center;\r\n    font-size: medium;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.p-TabBar-toolbar .item.arduino-monitor.toggled {\r\n    background: var(--theia-sideBarSectionHeader-background);\r\n    filter: contrast(80%);\r\n}\r\n\r\n.p-TabBar-toolbar .item .clear-all {\r\n    background: var(--theia-icon-clear) no-repeat;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/status-bar.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/arduino-ide-extension/src/browser/style/status-bar.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#theia-statusBar .area .element.arduino-selected-port {\r\n    margin-left: 0px;\r\n}\r\n\r\n#theia-statusBar .area .element.arduino-selected-board > *:last-child {\r\n    margin-right: 0px;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/arduino-ide-extension/src/browser/style/terminal.css":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/arduino-ide-extension/src/browser/style/terminal.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".terminal-container .xterm .xterm-helper-textarea {\r\n    opacity: 0 !important; /* fix secondary cursor-like issue. See https://github.com/eclipse-theia/theia/issues/8158 */\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/dateformat/lib/dateformat.js":
/*!***************************************************!*\
  !*** ./node_modules/dateformat/lib/dateformat.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

(function(global) {
  'use strict';

  var dateFormat = (function() {
      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      var timezoneClip = /[^-+\dA-Z]/g;
  
      // Regexes and supporting functions are cached through closure
      return function (date, mask, utc, gmt) {
  
        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
          mask = date;
          date = undefined;
        }
  
        date = date || new Date;
  
        if(!(date instanceof Date)) {
          date = new Date(date);
        }
  
        if (isNaN(date)) {
          throw TypeError('Invalid date');
        }
  
        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
  
        // Allow setting the utc/gmt argument via the mask
        var maskSlice = mask.slice(0, 4);
        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
          mask = mask.slice(4);
          utc = true;
          if (maskSlice === 'GMT:') {
            gmt = true;
          }
        }
  
        var _ = utc ? 'getUTC' : 'get';
        var d = date[_ + 'Date']();
        var D = date[_ + 'Day']();
        var m = date[_ + 'Month']();
        var y = date[_ + 'FullYear']();
        var H = date[_ + 'Hours']();
        var M = date[_ + 'Minutes']();
        var s = date[_ + 'Seconds']();
        var L = date[_ + 'Milliseconds']();
        var o = utc ? 0 : date.getTimezoneOffset();
        var W = getWeek(date);
        var N = getDayOfWeek(date);
        var flags = {
          d:    d,
          dd:   pad(d),
          ddd:  dateFormat.i18n.dayNames[D],
          dddd: dateFormat.i18n.dayNames[D + 7],
          m:    m + 1,
          mm:   pad(m + 1),
          mmm:  dateFormat.i18n.monthNames[m],
          mmmm: dateFormat.i18n.monthNames[m + 12],
          yy:   String(y).slice(2),
          yyyy: y,
          h:    H % 12 || 12,
          hh:   pad(H % 12 || 12),
          H:    H,
          HH:   pad(H),
          M:    M,
          MM:   pad(M),
          s:    s,
          ss:   pad(s),
          l:    pad(L, 3),
          L:    pad(Math.round(L / 10)),
          t:    H < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1],
          tt:   H < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3],
          T:    H < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5],
          TT:   H < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7],
          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
          W:    W,
          N:    N
        };
  
        return mask.replace(token, function (match) {
          if (match in flags) {
            return flags[match];
          }
          return match.slice(1, match.length - 1);
        });
      };
    })();

  dateFormat.masks = {
    'default':               'ddd mmm dd yyyy HH:MM:ss',
    'shortDate':             'm/d/yy',
    'mediumDate':            'mmm d, yyyy',
    'longDate':              'mmmm d, yyyy',
    'fullDate':              'dddd, mmmm d, yyyy',
    'shortTime':             'h:MM TT',
    'mediumTime':            'h:MM:ss TT',
    'longTime':              'h:MM:ss TT Z',
    'isoDate':               'yyyy-mm-dd',
    'isoTime':               'HH:MM:ss',
    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    timeNames: [
      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
  };

function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

/**
 * Get the ISO 8601 week number
 * Based on comments from
 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
 *
 * @param  {Object} `date`
 * @return {Number}
 */
function getWeek(date) {
  // Remove time components of date
  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occurred and correct for it
  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
  return 1 + Math.floor(weekDiff);
}

/**
 * Get ISO-8601 numeric representation of the day of the week
 * 1 (for Monday) through 7 (for Sunday)
 * 
 * @param  {Object} `date`
 * @return {Number}
 */
function getDayOfWeek(date) {
  var dow = date.getDay();
  if(dow === 0) {
    dow = 7;
  }
  return dow;
}

/**
 * kind-of shortcut
 * @param  {*} val
 * @return {String}
 */
function kindOf(val) {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (typeof val !== 'object') {
    return typeof val;
  }

  if (Array.isArray(val)) {
    return 'array';
  }

  return {}.toString.call(val)
    .slice(8, -1).toLowerCase();
};



  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return dateFormat;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this);


/***/ }),

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/memoize-one/dist/memoize-one.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/memoize-one/dist/memoize-one.esm.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (newInputs[i] !== lastInputs[i]) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    }
    return memoized;
}

/* harmony default export */ __webpack_exports__["default"] = (memoizeOne);


/***/ }),

/***/ "./node_modules/react-input-autosize/lib/AutosizeInput.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-input-autosize/lib/AutosizeInput.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizerStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre'
};

var INPUT_PROPS_BLACKLIST = ['extraWidth', 'injectStyles', 'inputClassName', 'inputRef', 'inputStyle', 'minWidth', 'onAutosize', 'placeholderIsMinWidth'];

var cleanInputProps = function cleanInputProps(inputProps) {
	INPUT_PROPS_BLACKLIST.forEach(function (field) {
		return delete inputProps[field];
	});
	return inputProps;
};

var copyStyles = function copyStyles(styles, node) {
	node.style.fontSize = styles.fontSize;
	node.style.fontFamily = styles.fontFamily;
	node.style.fontWeight = styles.fontWeight;
	node.style.fontStyle = styles.fontStyle;
	node.style.letterSpacing = styles.letterSpacing;
	node.style.textTransform = styles.textTransform;
};

var isIE = typeof window !== 'undefined' && window.navigator ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent) : false;

var generateId = function generateId() {
	// we only need an auto-generated ID for stylesheet injection, which is only
	// used for IE. so if the browser is not IE, this should return undefined.
	return isIE ? '_' + Math.random().toString(36).substr(2, 12) : undefined;
};

var AutosizeInput = function (_Component) {
	_inherits(AutosizeInput, _Component);

	function AutosizeInput(props) {
		_classCallCheck(this, AutosizeInput);

		var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

		_this.inputRef = function (el) {
			_this.input = el;
			if (typeof _this.props.inputRef === 'function') {
				_this.props.inputRef(el);
			}
		};

		_this.placeHolderSizerRef = function (el) {
			_this.placeHolderSizer = el;
		};

		_this.sizerRef = function (el) {
			_this.sizer = el;
		};

		_this.state = {
			inputWidth: props.minWidth,
			inputId: props.id || generateId()
		};
		return _this;
	}

	_createClass(AutosizeInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.mounted = true;
			this.copyInputStyles();
			this.updateInputWidth();
		}
	}, {
		key: 'UNSAFE_componentWillReceiveProps',
		value: function UNSAFE_componentWillReceiveProps(nextProps) {
			var id = nextProps.id;

			if (id !== this.props.id) {
				this.setState({ inputId: id || generateId() });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.inputWidth !== this.state.inputWidth) {
				if (typeof this.props.onAutosize === 'function') {
					this.props.onAutosize(this.state.inputWidth);
				}
			}
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: 'copyInputStyles',
		value: function copyInputStyles() {
			if (!this.mounted || !window.getComputedStyle) {
				return;
			}
			var inputStyles = this.input && window.getComputedStyle(this.input);
			if (!inputStyles) {
				return;
			}
			copyStyles(inputStyles, this.sizer);
			if (this.placeHolderSizer) {
				copyStyles(inputStyles, this.placeHolderSizer);
			}
		}
	}, {
		key: 'updateInputWidth',
		value: function updateInputWidth() {
			if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = void 0;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.sizer.scrollWidth + 2;
			}
			// add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
			var extraWidth = this.props.type === 'number' && this.props.extraWidth === undefined ? 16 : parseInt(this.props.extraWidth) || 0;
			newInputWidth += extraWidth;
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		}
	}, {
		key: 'getInput',
		value: function getInput() {
			return this.input;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.input.focus();
		}
	}, {
		key: 'blur',
		value: function blur() {
			this.input.blur();
		}
	}, {
		key: 'select',
		value: function select() {
			this.input.select();
		}
	}, {
		key: 'renderStyles',
		value: function renderStyles() {
			// this method injects styles to hide IE's clear indicator, which messes
			// with input size detection. the stylesheet is only injected when the
			// browser is IE, and can also be disabled by the `injectStyles` prop.
			var injectStyles = this.props.injectStyles;

			return isIE && injectStyles ? _react2.default.createElement('style', { dangerouslySetInnerHTML: {
					__html: 'input#' + this.state.inputId + '::-ms-clear {display: none;}'
				} }) : null;
		}
	}, {
		key: 'render',
		value: function render() {
			var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
				if (previousValue !== null && previousValue !== undefined) {
					return previousValue;
				}
				return currentValue;
			});

			var wrapperStyle = _extends({}, this.props.style);
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

			var inputStyle = _extends({
				boxSizing: 'content-box',
				width: this.state.inputWidth + 'px'
			}, this.props.inputStyle);

			var inputProps = _objectWithoutProperties(this.props, []);

			cleanInputProps(inputProps);
			inputProps.className = this.props.inputClassName;
			inputProps.id = this.state.inputId;
			inputProps.style = inputStyle;

			return _react2.default.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				this.renderStyles(),
				_react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
				_react2.default.createElement(
					'div',
					{ ref: this.sizerRef, style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? _react2.default.createElement(
					'div',
					{ ref: this.placeHolderSizerRef, style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	}]);

	return AutosizeInput;
}(_react.Component);

AutosizeInput.propTypes = {
	className: _propTypes2.default.string, // className for the outer element
	defaultValue: _propTypes2.default.any, // default field value
	extraWidth: _propTypes2.default.oneOfType([// additional width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	id: _propTypes2.default.string, // id to use for the input, can be set for consistent snapshots
	injectStyles: _propTypes2.default.bool, // inject the custom stylesheet to hide clear UI, defaults to true
	inputClassName: _propTypes2.default.string, // className for the input element
	inputRef: _propTypes2.default.func, // ref callback for the input element
	inputStyle: _propTypes2.default.object, // css styles for the input element
	minWidth: _propTypes2.default.oneOfType([// minimum width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
	onChange: _propTypes2.default.func, // onChange handler: function(event) {}
	placeholder: _propTypes2.default.string, // placeholder text
	placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
	style: _propTypes2.default.object, // css styles for the outer element
	value: _propTypes2.default.any // field value
};
AutosizeInput.defaultProps = {
	minWidth: 1,
	injectStyles: true
};

exports.default = AutosizeInput;

/***/ }),

/***/ "./node_modules/react-select/dist/Select-9fdb8cd0.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-select/dist/Select-9fdb8cd0.browser.esm.js ***!
  \***********************************************************************/
/*! exports provided: S, a, c, d, m */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return Select; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return defaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return mergeStyles; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils-06b0d5a4.browser.esm.js */ "./node_modules/react-select/dist/utils-06b0d5a4.browser.esm.js");
/* harmony import */ var _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index-4322c0ed.browser.esm.js */ "./node_modules/react-select/dist/index-4322c0ed.browser.esm.js");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/css */ "./node_modules/@emotion/css/dist/css.browser.esm.js");








var diacritics = [{
  base: 'A',
  letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
}, {
  base: 'AA',
  letters: /[\uA732]/g
}, {
  base: 'AE',
  letters: /[\u00C6\u01FC\u01E2]/g
}, {
  base: 'AO',
  letters: /[\uA734]/g
}, {
  base: 'AU',
  letters: /[\uA736]/g
}, {
  base: 'AV',
  letters: /[\uA738\uA73A]/g
}, {
  base: 'AY',
  letters: /[\uA73C]/g
}, {
  base: 'B',
  letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
}, {
  base: 'C',
  letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
}, {
  base: 'D',
  letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
}, {
  base: 'DZ',
  letters: /[\u01F1\u01C4]/g
}, {
  base: 'Dz',
  letters: /[\u01F2\u01C5]/g
}, {
  base: 'E',
  letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
}, {
  base: 'F',
  letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
}, {
  base: 'G',
  letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
}, {
  base: 'H',
  letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
}, {
  base: 'I',
  letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
}, {
  base: 'J',
  letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
}, {
  base: 'K',
  letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
}, {
  base: 'L',
  letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
}, {
  base: 'LJ',
  letters: /[\u01C7]/g
}, {
  base: 'Lj',
  letters: /[\u01C8]/g
}, {
  base: 'M',
  letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
}, {
  base: 'N',
  letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
}, {
  base: 'NJ',
  letters: /[\u01CA]/g
}, {
  base: 'Nj',
  letters: /[\u01CB]/g
}, {
  base: 'O',
  letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
}, {
  base: 'OI',
  letters: /[\u01A2]/g
}, {
  base: 'OO',
  letters: /[\uA74E]/g
}, {
  base: 'OU',
  letters: /[\u0222]/g
}, {
  base: 'P',
  letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
}, {
  base: 'Q',
  letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
}, {
  base: 'R',
  letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
}, {
  base: 'S',
  letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
}, {
  base: 'T',
  letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
}, {
  base: 'TZ',
  letters: /[\uA728]/g
}, {
  base: 'U',
  letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
}, {
  base: 'V',
  letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
}, {
  base: 'VY',
  letters: /[\uA760]/g
}, {
  base: 'W',
  letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
}, {
  base: 'X',
  letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
}, {
  base: 'Y',
  letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
}, {
  base: 'Z',
  letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
}, {
  base: 'a',
  letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
}, {
  base: 'aa',
  letters: /[\uA733]/g
}, {
  base: 'ae',
  letters: /[\u00E6\u01FD\u01E3]/g
}, {
  base: 'ao',
  letters: /[\uA735]/g
}, {
  base: 'au',
  letters: /[\uA737]/g
}, {
  base: 'av',
  letters: /[\uA739\uA73B]/g
}, {
  base: 'ay',
  letters: /[\uA73D]/g
}, {
  base: 'b',
  letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
}, {
  base: 'c',
  letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
}, {
  base: 'd',
  letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
}, {
  base: 'dz',
  letters: /[\u01F3\u01C6]/g
}, {
  base: 'e',
  letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
}, {
  base: 'f',
  letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
}, {
  base: 'g',
  letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
}, {
  base: 'h',
  letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
}, {
  base: 'hv',
  letters: /[\u0195]/g
}, {
  base: 'i',
  letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
}, {
  base: 'j',
  letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
}, {
  base: 'k',
  letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
}, {
  base: 'l',
  letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
}, {
  base: 'lj',
  letters: /[\u01C9]/g
}, {
  base: 'm',
  letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
}, {
  base: 'n',
  letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
}, {
  base: 'nj',
  letters: /[\u01CC]/g
}, {
  base: 'o',
  letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
}, {
  base: 'oi',
  letters: /[\u01A3]/g
}, {
  base: 'ou',
  letters: /[\u0223]/g
}, {
  base: 'oo',
  letters: /[\uA74F]/g
}, {
  base: 'p',
  letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
}, {
  base: 'q',
  letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
}, {
  base: 'r',
  letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
}, {
  base: 's',
  letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
}, {
  base: 't',
  letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
}, {
  base: 'tz',
  letters: /[\uA729]/g
}, {
  base: 'u',
  letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
}, {
  base: 'v',
  letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
}, {
  base: 'vy',
  letters: /[\uA761]/g
}, {
  base: 'w',
  letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
}, {
  base: 'x',
  letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
}, {
  base: 'y',
  letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
}, {
  base: 'z',
  letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
}];
var stripDiacritics = function stripDiacritics(str) {
  for (var i = 0; i < diacritics.length; i++) {
    str = str.replace(diacritics[i].letters, diacritics[i].base);
  }

  return str;
};

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var trimString = function trimString(str) {
  return str.replace(/^\s+|\s+$/g, '');
};

var defaultStringify = function defaultStringify(option) {
  return option.label + " " + option.value;
};

var createFilter = function createFilter(config) {
  return function (option, rawInput) {
    var _ignoreCase$ignoreAcc = _extends({
      ignoreCase: true,
      ignoreAccents: true,
      stringify: defaultStringify,
      trim: true,
      matchFrom: 'any'
    }, config),
        ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
        ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
        stringify = _ignoreCase$ignoreAcc.stringify,
        trim = _ignoreCase$ignoreAcc.trim,
        matchFrom = _ignoreCase$ignoreAcc.matchFrom;

    var input = trim ? trimString(rawInput) : rawInput;
    var candidate = trim ? trimString(stringify(option)) : stringify(option);

    if (ignoreCase) {
      input = input.toLowerCase();
      candidate = candidate.toLowerCase();
    }

    if (ignoreAccents) {
      input = stripDiacritics(input);
      candidate = stripDiacritics(candidate);
    }

    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
};

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var _ref =  false ? undefined : {
  name: "1laao21-a11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFNIiwiZmlsZSI6IkExMXlUZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgdHlwZSBFbGVtZW50Q29uZmlnIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5cbi8vIEFzc2lzdGl2ZSB0ZXh0IHRvIGRlc2NyaWJlIHZpc3VhbCBlbGVtZW50cy4gSGlkZGVuIGZvciBzaWdodGVkIHVzZXJzLlxuY29uc3QgQTExeVRleHQgPSAocHJvcHM6IEVsZW1lbnRDb25maWc8J3NwYW4nPikgPT4gKFxuICAgIDxzcGFuXG4gICAgICBjc3M9e3tcbiAgICAgICAgbGFiZWw6ICdhMTF5VGV4dCcsXG4gICAgICAgIHpJbmRleDogOTk5OSxcbiAgICAgICAgYm9yZGVyOiAwLFxuICAgICAgICBjbGlwOiAncmVjdCgxcHgsIDFweCwgMXB4LCAxcHgpJyxcbiAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICB9fVxuICAgICAgey4uLnByb3BzfVxuICAgIC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBBMTF5VGV4dDtcbiJdfQ== */"
};

var A11yText = function A11yText(props) {
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_2__["jsx"])("span", _extends$1({
    css: _ref
  }, props));
};

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function DummyInput(_ref) {
  var inProp = _ref.in,
      out = _ref.out,
      onExited = _ref.onExited,
      appear = _ref.appear,
      enter = _ref.enter,
      exit = _ref.exit,
      innerRef = _ref.innerRef,
      emotion = _ref.emotion,
      props = _objectWithoutPropertiesLoose(_ref, ["in", "out", "onExited", "appear", "enter", "exit", "innerRef", "emotion"]);

  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_2__["jsx"])("input", _extends$2({
    ref: innerRef
  }, props, {
    css:
    /*#__PURE__*/
    Object(_emotion_css__WEBPACK_IMPORTED_MODULE_6__["default"])({
      label: 'dummyInput',
      // get rid of any default styles
      background: 0,
      border: 0,
      fontSize: 'inherit',
      outline: 0,
      padding: 0,
      // important! without `width` browsers won't allow focus
      width: 1,
      // remove cursor on desktop
      color: 'transparent',
      // remove cursor on mobile whilst maintaining "scroll into view" behaviour
      left: -100,
      opacity: 0,
      position: 'relative',
      transform: 'scale(0)'
    },  false ? undefined : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJNIiwiZmlsZSI6IkR1bW15SW5wdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHVtbXlJbnB1dCh7XG4gIGluOiBpblByb3AsXG4gIG91dCxcbiAgb25FeGl0ZWQsXG4gIGFwcGVhcixcbiAgZW50ZXIsXG4gIGV4aXQsXG4gIGlubmVyUmVmLFxuICBlbW90aW9uLFxuICAuLi5wcm9wc1xufTogYW55KSB7XG4gIHJldHVybiAoXG4gICAgPGlucHV0XG4gICAgICByZWY9e2lubmVyUmVmfVxuICAgICAgey4uLnByb3BzfVxuICAgICAgY3NzPXt7XG4gICAgICAgIGxhYmVsOiAnZHVtbXlJbnB1dCcsXG4gICAgICAgIC8vIGdldCByaWQgb2YgYW55IGRlZmF1bHQgc3R5bGVzXG4gICAgICAgIGJhY2tncm91bmQ6IDAsXG4gICAgICAgIGJvcmRlcjogMCxcbiAgICAgICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICAgICAgb3V0bGluZTogMCxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgLy8gaW1wb3J0YW50ISB3aXRob3V0IGB3aWR0aGAgYnJvd3NlcnMgd29uJ3QgYWxsb3cgZm9jdXNcbiAgICAgICAgd2lkdGg6IDEsXG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1cnNvciBvbiBkZXNrdG9wXG4gICAgICAgIGNvbG9yOiAndHJhbnNwYXJlbnQnLFxuXG4gICAgICAgIC8vIHJlbW92ZSBjdXJzb3Igb24gbW9iaWxlIHdoaWxzdCBtYWludGFpbmluZyBcInNjcm9sbCBpbnRvIHZpZXdcIiBiZWhhdmlvdXJcbiAgICAgICAgbGVmdDogLTEwMCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDApJyxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn1cbiJdfQ== */")
  }));
}

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var NodeResolver =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(NodeResolver, _Component);

  function NodeResolver() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = NodeResolver.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.innerRef(Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["findDOMNode"])(this));
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.props.innerRef(null);
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return NodeResolver;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
var LOCK_STYLES = {
  boxSizing: 'border-box',
  // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%'
};

function preventTouchMove(e) {
  e.preventDefault();
}
function allowTouchMove(e) {
  e.stopPropagation();
}
function preventInertiaScroll() {
  var top = this.scrollTop;
  var totalScroll = this.scrollHeight;
  var currentScroll = top + this.offsetHeight;

  if (top === 0) {
    this.scrollTop = 1;
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1;
  }
} // `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

function _inheritsLoose$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }
var canUseDOM = !!( window.document && window.document.createElement);
var activeScrollLocks = 0;

var ScrollLock =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$1(ScrollLock, _Component);

  function ScrollLock() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.originalStyles = {};
    _this.listenerOptions = {
      capture: false,
      passive: false
    };
    return _this;
  }

  var _proto = ScrollLock.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!canUseDOM) return;
    var _this$props = this.props,
        accountForScrollbars = _this$props.accountForScrollbars,
        touchScrollTarget = _this$props.touchScrollTarget;
    var target = document.body;
    var targetStyle = target && target.style;

    if (accountForScrollbars) {
      // store any styles already applied to the body
      STYLE_KEYS.forEach(function (key) {
        var val = targetStyle && targetStyle[key];
        _this2.originalStyles[key] = val;
      });
    } // apply the lock styles and padding if this is the first scroll lock


    if (accountForScrollbars && activeScrollLocks < 1) {
      var currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0;
      var clientWidth = document.body ? document.body.clientWidth : 0;
      var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
      Object.keys(LOCK_STYLES).forEach(function (key) {
        var val = LOCK_STYLES[key];

        if (targetStyle) {
          targetStyle[key] = val;
        }
      });

      if (targetStyle) {
        targetStyle.paddingRight = adjustedPadding + "px";
      }
    } // account for touch devices


    if (target && isTouchDevice()) {
      // Mobile Safari ignores { overflow: hidden } declaration on the body.
      target.addEventListener('touchmove', preventTouchMove, this.listenerOptions); // Allow scroll on provided target

      if (touchScrollTarget) {
        touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
        touchScrollTarget.addEventListener('touchmove', allowTouchMove, this.listenerOptions);
      }
    } // increment active scroll locks


    activeScrollLocks += 1;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    if (!canUseDOM) return;
    var _this$props2 = this.props,
        accountForScrollbars = _this$props2.accountForScrollbars,
        touchScrollTarget = _this$props2.touchScrollTarget;
    var target = document.body;
    var targetStyle = target && target.style; // safely decrement active scroll locks

    activeScrollLocks = Math.max(activeScrollLocks - 1, 0); // reapply original body styles, if any

    if (accountForScrollbars && activeScrollLocks < 1) {
      STYLE_KEYS.forEach(function (key) {
        var val = _this3.originalStyles[key];

        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
    } // remove touch listeners


    if (target && isTouchDevice()) {
      target.removeEventListener('touchmove', preventTouchMove, this.listenerOptions);

      if (touchScrollTarget) {
        touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
        touchScrollTarget.removeEventListener('touchmove', allowTouchMove, this.listenerOptions);
      }
    }
  };

  _proto.render = function render() {
    return null;
  };

  return ScrollLock;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ScrollLock.defaultProps = {
  accountForScrollbars: true
};

function _inheritsLoose$2(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _ref$1 =  false ? undefined : {
  name: "1dsbpcp",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0;",
  map: ""
};

// NOTE:
// We shouldn't need this after updating to React v16.3.0, which introduces:
// - createRef() https://reactjs.org/docs/react-api.html#reactcreateref
// - forwardRef() https://reactjs.org/docs/react-api.html#reactforwardref
var ScrollBlock =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose$2(ScrollBlock, _PureComponent);

  function ScrollBlock() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      touchScrollTarget: null
    };

    _this.getScrollTarget = function (ref) {
      if (ref === _this.state.touchScrollTarget) return;

      _this.setState({
        touchScrollTarget: ref
      });
    };

    _this.blurSelectInput = function () {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    };

    return _this;
  }

  var _proto = ScrollBlock.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        isEnabled = _this$props.isEnabled;
    var touchScrollTarget = this.state.touchScrollTarget; // bail early if not enabled

    if (!isEnabled) return children;
    /*
     * Div
     * ------------------------------
     * blocks scrolling on non-body elements behind the menu
      * NodeResolver
     * ------------------------------
     * we need a reference to the scrollable element to "unlock" scroll on
     * mobile devices
      * ScrollLock
     * ------------------------------
     * actually does the scroll locking
     */

    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_2__["jsx"])("div", null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_2__["jsx"])("div", {
      onClick: this.blurSelectInput,
      css: _ref$1
    }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_2__["jsx"])(NodeResolver, {
      innerRef: this.getScrollTarget
    }, children), touchScrollTarget ? Object(_emotion_core__WEBPACK_IMPORTED_MODULE_2__["jsx"])(ScrollLock, {
      touchScrollTarget: touchScrollTarget
    }) : null);
  };

  return ScrollBlock;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose$3(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ScrollCaptor =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$3(ScrollCaptor, _Component);

  function ScrollCaptor() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.isBottom = false;
    _this.isTop = false;
    _this.scrollTarget = void 0;
    _this.touchStart = void 0;

    _this.cancelScroll = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };

    _this.handleEventDelta = function (event, delta) {
      var _this$props = _this.props,
          onBottomArrive = _this$props.onBottomArrive,
          onBottomLeave = _this$props.onBottomLeave,
          onTopArrive = _this$props.onTopArrive,
          onTopLeave = _this$props.onTopLeave;
      var _this$scrollTarget = _this.scrollTarget,
          scrollTop = _this$scrollTarget.scrollTop,
          scrollHeight = _this$scrollTarget.scrollHeight,
          clientHeight = _this$scrollTarget.clientHeight;
      var target = _this.scrollTarget;
      var isDeltaPositive = delta > 0;
      var availableScroll = scrollHeight - clientHeight - scrollTop;
      var shouldCancelScroll = false; // reset bottom/top flags

      if (availableScroll > delta && _this.isBottom) {
        if (onBottomLeave) onBottomLeave(event);
        _this.isBottom = false;
      }

      if (isDeltaPositive && _this.isTop) {
        if (onTopLeave) onTopLeave(event);
        _this.isTop = false;
      } // bottom limit


      if (isDeltaPositive && delta > availableScroll) {
        if (onBottomArrive && !_this.isBottom) {
          onBottomArrive(event);
        }

        target.scrollTop = scrollHeight;
        shouldCancelScroll = true;
        _this.isBottom = true; // top limit
      } else if (!isDeltaPositive && -delta > scrollTop) {
        if (onTopArrive && !_this.isTop) {
          onTopArrive(event);
        }

        target.scrollTop = 0;
        shouldCancelScroll = true;
        _this.isTop = true;
      } // cancel scroll


      if (shouldCancelScroll) {
        _this.cancelScroll(event);
      }
    };

    _this.onWheel = function (event) {
      _this.handleEventDelta(event, event.deltaY);
    };

    _this.onTouchStart = function (event) {
      // set touch start so we can calculate touchmove delta
      _this.touchStart = event.changedTouches[0].clientY;
    };

    _this.onTouchMove = function (event) {
      var deltaY = _this.touchStart - event.changedTouches[0].clientY;

      _this.handleEventDelta(event, deltaY);
    };

    _this.getScrollTarget = function (ref) {
      _this.scrollTarget = ref;
    };

    return _this;
  }

  var _proto = ScrollCaptor.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.startListening(this.scrollTarget);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.stopListening(this.scrollTarget);
  };

  _proto.startListening = function startListening(el) {
    // bail early if no element is available to attach to
    if (!el) return; // all the if statements are to appease Flow 😢

    if (typeof el.addEventListener === 'function') {
      el.addEventListener('wheel', this.onWheel, false);
    }

    if (typeof el.addEventListener === 'function') {
      el.addEventListener('touchstart', this.onTouchStart, false);
    }

    if (typeof el.addEventListener === 'function') {
      el.addEventListener('touchmove', this.onTouchMove, false);
    }
  };

  _proto.stopListening = function stopListening(el) {
    // all the if statements are to appease Flow 😢
    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('wheel', this.onWheel, false);
    }

    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('touchstart', this.onTouchStart, false);
    }

    if (typeof el.removeEventListener === 'function') {
      el.removeEventListener('touchmove', this.onTouchMove, false);
    }
  };

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NodeResolver, {
      innerRef: this.getScrollTarget
    }, this.props.children);
  };

  return ScrollCaptor;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function ScrollCaptorSwitch(_ref) {
  var _ref$isEnabled = _ref.isEnabled,
      isEnabled = _ref$isEnabled === void 0 ? true : _ref$isEnabled,
      props = _objectWithoutPropertiesLoose$1(_ref, ["isEnabled"]);

  return isEnabled ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ScrollCaptor, props) : props.children;
}

var instructionsAriaMessage = function instructionsAriaMessage(event, context) {
  if (context === void 0) {
    context = {};
  }

  var _context = context,
      isSearchable = _context.isSearchable,
      isMulti = _context.isMulti,
      label = _context.label,
      isDisabled = _context.isDisabled;

  switch (event) {
    case 'menu':
      return "Use Up and Down to choose options" + (isDisabled ? '' : ', press Enter to select the currently focused option') + ", press Escape to exit the menu, press Tab to select the option and exit the menu.";

    case 'input':
      return (label ? label : 'Select') + " is focused " + (isSearchable ? ',type to refine list' : '') + ", press Down to open the menu, " + (isMulti ? ' press left to focus selected values' : '');

    case 'value':
      return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
  }
};
var valueEventAriaMessage = function valueEventAriaMessage(event, context) {
  var value = context.value,
      isDisabled = context.isDisabled;
  if (!value) return;

  switch (event) {
    case 'deselect-option':
    case 'pop-value':
    case 'remove-value':
      return "option " + value + ", deselected.";

    case 'select-option':
      return isDisabled ? "option " + value + " is disabled. Select another option." : "option " + value + ", selected.";
  }
};
var valueFocusAriaMessage = function valueFocusAriaMessage(_ref) {
  var focusedValue = _ref.focusedValue,
      getOptionLabel = _ref.getOptionLabel,
      selectValue = _ref.selectValue;
  return "value " + getOptionLabel(focusedValue) + " focused, " + (selectValue.indexOf(focusedValue) + 1) + " of " + selectValue.length + ".";
};
var optionFocusAriaMessage = function optionFocusAriaMessage(_ref2) {
  var focusedOption = _ref2.focusedOption,
      getOptionLabel = _ref2.getOptionLabel,
      options = _ref2.options;
  return "option " + getOptionLabel(focusedOption) + " focused" + (focusedOption.isDisabled ? ' disabled' : '') + ", " + (options.indexOf(focusedOption) + 1) + " of " + options.length + ".";
};
var resultsAriaMessage = function resultsAriaMessage(_ref3) {
  var inputValue = _ref3.inputValue,
      screenReaderMessage = _ref3.screenReaderMessage;
  return "" + screenReaderMessage + (inputValue ? ' for search term ' + inputValue : '') + ".";
};

var formatGroupLabel = function formatGroupLabel(group) {
  return group.label;
};
var getOptionLabel = function getOptionLabel(option) {
  return option.label;
};
var getOptionValue = function getOptionValue(option) {
  return option.value;
};
var isOptionDisabled = function isOptionDisabled(option) {
  return !!option.isDisabled;
};

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var defaultStyles = {
  clearIndicator: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["c"],
  container: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["a"],
  control: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["b"],
  dropdownIndicator: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["d"],
  group: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["g"],
  groupHeading: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["e"],
  indicatorsContainer: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["i"],
  indicatorSeparator: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["f"],
  input: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["h"],
  loadingIndicator: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["l"],
  loadingMessage: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["j"],
  menu: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["m"],
  menuList: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["k"],
  menuPortal: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["n"],
  multiValue: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["o"],
  multiValueLabel: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["p"],
  multiValueRemove: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["q"],
  noOptionsMessage: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["r"],
  option: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["s"],
  placeholder: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["t"],
  singleValue: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["u"],
  valueContainer: _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["v"]
}; // Merge Utility
// Allows consumers to extend a base Select with additional styles

function mergeStyles(source, target) {
  if (target === void 0) {
    target = {};
  }

  // initialize with source styles
  var styles = _extends$3({}, source); // massage in target styles


  Object.keys(target).forEach(function (key) {
    if (source[key]) {
      styles[key] = function (rsCss, props) {
        return target[key](source[key](rsCss, props), props);
      };
    } else {
      styles[key] = target[key];
    }
  });
  return styles;
}

var colors = {
  primary: '#2684FF',
  primary75: '#4C9AFF',
  primary50: '#B2D4FF',
  primary25: '#DEEBFF',
  danger: '#DE350B',
  dangerLight: '#FFBDAD',
  neutral0: 'hsl(0, 0%, 100%)',
  neutral5: 'hsl(0, 0%, 95%)',
  neutral10: 'hsl(0, 0%, 90%)',
  neutral20: 'hsl(0, 0%, 80%)',
  neutral30: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral50: 'hsl(0, 0%, 50%)',
  neutral60: 'hsl(0, 0%, 40%)',
  neutral70: 'hsl(0, 0%, 30%)',
  neutral80: 'hsl(0, 0%, 20%)',
  neutral90: 'hsl(0, 0%, 10%)'
};
var borderRadius = 4; // Used to calculate consistent margin/padding on elements

var baseUnit = 4; // The minimum height of the control

var controlHeight = 38; // The amount of space between the control and menu */

var menuGutter = baseUnit * 2;
var spacing = {
  baseUnit: baseUnit,
  controlHeight: controlHeight,
  menuGutter: menuGutter
};
var defaultTheme = {
  borderRadius: borderRadius,
  colors: colors,
  spacing: spacing
};

function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

function _inheritsLoose$4(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
var defaultProps = {
  backspaceRemovesValue: true,
  blurInputOnSelect: Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["i"])(),
  captureMenuScroll: !Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["i"])(),
  closeMenuOnSelect: true,
  closeMenuOnScroll: false,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel,
  getOptionValue: getOptionValue,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: function loadingMessage() {
    return 'Loading...';
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuPosition: 'absolute',
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["d"])(),
  noOptionsMessage: function noOptionsMessage() {
    return 'No options';
  },
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: function screenReaderStatus(_ref) {
    var count = _ref.count;
    return count + " result" + (count !== 1 ? 's' : '') + " available";
  },
  styles: {},
  tabIndex: '0',
  tabSelectsValue: true
};
var instanceId = 1;

var Select =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose$4(Select, _Component);

  // Misc. Instance Properties
  // ------------------------------
  // TODO
  // Refs
  // ------------------------------
  // Lifecycle
  // ------------------------------
  function Select(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;
    _this.state = {
      ariaLiveSelection: '',
      ariaLiveContext: '',
      focusedOption: null,
      focusedValue: null,
      inputIsHidden: false,
      isFocused: false,
      menuOptions: {
        render: [],
        focusable: []
      },
      selectValue: []
    };
    _this.blockOptionHover = false;
    _this.isComposing = false;
    _this.clearFocusValueOnUpdate = false;
    _this.commonProps = void 0;
    _this.components = void 0;
    _this.hasGroups = false;
    _this.initialTouchX = 0;
    _this.initialTouchY = 0;
    _this.inputIsHiddenAfterUpdate = void 0;
    _this.instancePrefix = '';
    _this.openAfterFocus = false;
    _this.scrollToFocusedOptionOnUpdate = false;
    _this.userIsDragging = void 0;
    _this.controlRef = null;

    _this.getControlRef = function (ref) {
      _this.controlRef = ref;
    };

    _this.focusedOptionRef = null;

    _this.getFocusedOptionRef = function (ref) {
      _this.focusedOptionRef = ref;
    };

    _this.menuListRef = null;

    _this.getMenuListRef = function (ref) {
      _this.menuListRef = ref;
    };

    _this.inputRef = null;

    _this.getInputRef = function (ref) {
      _this.inputRef = ref;
    };

    _this.cacheComponents = function (components) {
      _this.components = Object(_index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["w"])({
        components: components
      });
    };

    _this.focus = _this.focusInput;
    _this.blur = _this.blurInput;

    _this.onChange = function (newValue, actionMeta) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          name = _this$props.name;
      onChange(newValue, _extends$4({}, actionMeta, {
        name: name
      }));
    };

    _this.setValue = function (newValue, action, option) {
      if (action === void 0) {
        action = 'set-value';
      }

      var _this$props2 = _this.props,
          closeMenuOnSelect = _this$props2.closeMenuOnSelect,
          isMulti = _this$props2.isMulti;

      _this.onInputChange('', {
        action: 'set-value'
      });

      if (closeMenuOnSelect) {
        _this.inputIsHiddenAfterUpdate = !isMulti;

        _this.onMenuClose();
      } // when the select value should change, we should reset focusedValue


      _this.clearFocusValueOnUpdate = true;

      _this.onChange(newValue, {
        action: action,
        option: option
      });
    };

    _this.selectOption = function (newValue) {
      var _this$props3 = _this.props,
          blurInputOnSelect = _this$props3.blurInputOnSelect,
          isMulti = _this$props3.isMulti;
      var selectValue = _this.state.selectValue;

      if (isMulti) {
        if (_this.isOptionSelected(newValue, selectValue)) {
          var candidate = _this.getOptionValue(newValue);

          _this.setValue(selectValue.filter(function (i) {
            return _this.getOptionValue(i) !== candidate;
          }), 'deselect-option', newValue);

          _this.announceAriaLiveSelection({
            event: 'deselect-option',
            context: {
              value: _this.getOptionLabel(newValue)
            }
          });
        } else {
          if (!_this.isOptionDisabled(newValue, selectValue)) {
            _this.setValue([].concat(selectValue, [newValue]), 'select-option', newValue);

            _this.announceAriaLiveSelection({
              event: 'select-option',
              context: {
                value: _this.getOptionLabel(newValue)
              }
            });
          } else {
            // announce that option is disabled
            _this.announceAriaLiveSelection({
              event: 'select-option',
              context: {
                value: _this.getOptionLabel(newValue),
                isDisabled: true
              }
            });
          }
        }
      } else {
        if (!_this.isOptionDisabled(newValue, selectValue)) {
          _this.setValue(newValue, 'select-option');

          _this.announceAriaLiveSelection({
            event: 'select-option',
            context: {
              value: _this.getOptionLabel(newValue)
            }
          });
        } else {
          // announce that option is disabled
          _this.announceAriaLiveSelection({
            event: 'select-option',
            context: {
              value: _this.getOptionLabel(newValue),
              isDisabled: true
            }
          });
        }
      }

      if (blurInputOnSelect) {
        _this.blurInput();
      }
    };

    _this.removeValue = function (removedValue) {
      var selectValue = _this.state.selectValue;

      var candidate = _this.getOptionValue(removedValue);

      var newValue = selectValue.filter(function (i) {
        return _this.getOptionValue(i) !== candidate;
      });

      _this.onChange(newValue.length ? newValue : null, {
        action: 'remove-value',
        removedValue: removedValue
      });

      _this.announceAriaLiveSelection({
        event: 'remove-value',
        context: {
          value: removedValue ? _this.getOptionLabel(removedValue) : ''
        }
      });

      _this.focusInput();
    };

    _this.clearValue = function () {
      var isMulti = _this.props.isMulti;

      _this.onChange(isMulti ? [] : null, {
        action: 'clear'
      });
    };

    _this.popValue = function () {
      var selectValue = _this.state.selectValue;
      var lastSelectedValue = selectValue[selectValue.length - 1];
      var newValue = selectValue.slice(0, selectValue.length - 1);

      _this.announceAriaLiveSelection({
        event: 'pop-value',
        context: {
          value: lastSelectedValue ? _this.getOptionLabel(lastSelectedValue) : ''
        }
      });

      _this.onChange(newValue.length ? newValue : null, {
        action: 'pop-value',
        removedValue: lastSelectedValue
      });
    };

    _this.getOptionLabel = function (data) {
      return _this.props.getOptionLabel(data);
    };

    _this.getOptionValue = function (data) {
      return _this.props.getOptionValue(data);
    };

    _this.getStyles = function (key, props) {
      var base = defaultStyles[key](props);
      base.boxSizing = 'border-box';
      var custom = _this.props.styles[key];
      return custom ? custom(base, props) : base;
    };

    _this.getElementId = function (element) {
      return _this.instancePrefix + "-" + element;
    };

    _this.getActiveDescendentId = function () {
      var menuIsOpen = _this.props.menuIsOpen;
      var _this$state = _this.state,
          menuOptions = _this$state.menuOptions,
          focusedOption = _this$state.focusedOption;
      if (!focusedOption || !menuIsOpen) return undefined;
      var index = menuOptions.focusable.indexOf(focusedOption);
      var option = menuOptions.render[index];
      return option && option.key;
    };

    _this.announceAriaLiveSelection = function (_ref2) {
      var event = _ref2.event,
          context = _ref2.context;

      _this.setState({
        ariaLiveSelection: valueEventAriaMessage(event, context)
      });
    };

    _this.announceAriaLiveContext = function (_ref3) {
      var event = _ref3.event,
          context = _ref3.context;

      _this.setState({
        ariaLiveContext: instructionsAriaMessage(event, _extends$4({}, context, {
          label: _this.props['aria-label']
        }))
      });
    };

    _this.onMenuMouseDown = function (event) {
      if (event.button !== 0) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      _this.focusInput();
    };

    _this.onMenuMouseMove = function (event) {
      _this.blockOptionHover = false;
    };

    _this.onControlMouseDown = function (event) {
      var openMenuOnClick = _this.props.openMenuOnClick;

      if (!_this.state.isFocused) {
        if (openMenuOnClick) {
          _this.openAfterFocus = true;
        }

        _this.focusInput();
      } else if (!_this.props.menuIsOpen) {
        if (openMenuOnClick) {
          _this.openMenu('first');
        }
      } else {
        if ( // $FlowFixMe
        event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
          _this.onMenuClose();
        }
      }

      if ( // $FlowFixMe
      event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
      }
    };

    _this.onDropdownIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }

      if (_this.props.isDisabled) return;
      var _this$props4 = _this.props,
          isMulti = _this$props4.isMulti,
          menuIsOpen = _this$props4.menuIsOpen;

      _this.focusInput();

      if (menuIsOpen) {
        _this.inputIsHiddenAfterUpdate = !isMulti;

        _this.onMenuClose();
      } else {
        _this.openMenu('first');
      }

      event.preventDefault();
      event.stopPropagation();
    };

    _this.onClearIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }

      _this.clearValue();

      event.stopPropagation();
      _this.openAfterFocus = false;

      if (event.type === 'touchend') {
        _this.focusInput();
      } else {
        setTimeout(function () {
          return _this.focusInput();
        });
      }
    };

    _this.onScroll = function (event) {
      if (typeof _this.props.closeMenuOnScroll === 'boolean') {
        if (event.target instanceof HTMLElement && Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["j"])(event.target)) {
          _this.props.onMenuClose();
        }
      } else if (typeof _this.props.closeMenuOnScroll === 'function') {
        if (_this.props.closeMenuOnScroll(event)) {
          _this.props.onMenuClose();
        }
      }
    };

    _this.onCompositionStart = function () {
      _this.isComposing = true;
    };

    _this.onCompositionEnd = function () {
      _this.isComposing = false;
    };

    _this.onTouchStart = function (_ref4) {
      var touches = _ref4.touches;
      var touch = touches.item(0);

      if (!touch) {
        return;
      }

      _this.initialTouchX = touch.clientX;
      _this.initialTouchY = touch.clientY;
      _this.userIsDragging = false;
    };

    _this.onTouchMove = function (_ref5) {
      var touches = _ref5.touches;
      var touch = touches.item(0);

      if (!touch) {
        return;
      }

      var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
      var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
      var moveThreshold = 5;
      _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
    };

    _this.onTouchEnd = function (event) {
      if (_this.userIsDragging) return; // close the menu if the user taps outside
      // we're checking on event.target here instead of event.currentTarget, because we want to assert information
      // on events on child elements, not the document (which we've attached this handler to).

      if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
        _this.blurInput();
      } // reset move vars


      _this.initialTouchX = 0;
      _this.initialTouchY = 0;
    };

    _this.onControlTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      _this.onControlMouseDown(event);
    };

    _this.onClearIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      _this.onClearIndicatorMouseDown(event);
    };

    _this.onDropdownIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      _this.onDropdownIndicatorMouseDown(event);
    };

    _this.handleInputChange = function (event) {
      var inputValue = event.currentTarget.value;
      _this.inputIsHiddenAfterUpdate = false;

      _this.onInputChange(inputValue, {
        action: 'input-change'
      });

      _this.onMenuOpen();
    };

    _this.onInputFocus = function (event) {
      var _this$props5 = _this.props,
          isSearchable = _this$props5.isSearchable,
          isMulti = _this$props5.isMulti;

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }

      _this.inputIsHiddenAfterUpdate = false;

      _this.announceAriaLiveContext({
        event: 'input',
        context: {
          isSearchable: isSearchable,
          isMulti: isMulti
        }
      });

      _this.setState({
        isFocused: true
      });

      if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
        _this.openMenu('first');
      }

      _this.openAfterFocus = false;
    };

    _this.onInputBlur = function (event) {
      if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
        _this.inputRef.focus();

        return;
      }

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }

      _this.onInputChange('', {
        action: 'input-blur'
      });

      _this.onMenuClose();

      _this.setState({
        focusedValue: null,
        isFocused: false
      });
    };

    _this.onOptionHover = function (focusedOption) {
      if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
        return;
      }

      _this.setState({
        focusedOption: focusedOption
      });
    };

    _this.shouldHideSelectedOptions = function () {
      var _this$props6 = _this.props,
          hideSelectedOptions = _this$props6.hideSelectedOptions,
          isMulti = _this$props6.isMulti;
      if (hideSelectedOptions === undefined) return isMulti;
      return hideSelectedOptions;
    };

    _this.onKeyDown = function (event) {
      var _this$props7 = _this.props,
          isMulti = _this$props7.isMulti,
          backspaceRemovesValue = _this$props7.backspaceRemovesValue,
          escapeClearsValue = _this$props7.escapeClearsValue,
          inputValue = _this$props7.inputValue,
          isClearable = _this$props7.isClearable,
          isDisabled = _this$props7.isDisabled,
          menuIsOpen = _this$props7.menuIsOpen,
          onKeyDown = _this$props7.onKeyDown,
          tabSelectsValue = _this$props7.tabSelectsValue,
          openMenuOnFocus = _this$props7.openMenuOnFocus;
      var _this$state2 = _this.state,
          focusedOption = _this$state2.focusedOption,
          focusedValue = _this$state2.focusedValue,
          selectValue = _this$state2.selectValue;
      if (isDisabled) return;

      if (typeof onKeyDown === 'function') {
        onKeyDown(event);

        if (event.defaultPrevented) {
          return;
        }
      } // Block option hover events when the user has just pressed a key


      _this.blockOptionHover = true;

      switch (event.key) {
        case 'ArrowLeft':
          if (!isMulti || inputValue) return;

          _this.focusValue('previous');

          break;

        case 'ArrowRight':
          if (!isMulti || inputValue) return;

          _this.focusValue('next');

          break;

        case 'Delete':
        case 'Backspace':
          if (inputValue) return;

          if (focusedValue) {
            _this.removeValue(focusedValue);
          } else {
            if (!backspaceRemovesValue) return;

            if (isMulti) {
              _this.popValue();
            } else if (isClearable) {
              _this.clearValue();
            }
          }

          break;

        case 'Tab':
          if (_this.isComposing) return;

          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || // don't capture the event if the menu opens on focus and the focused
          // option is already selected; it breaks the flow of navigation
          openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
            return;
          }

          _this.selectOption(focusedOption);

          break;

        case 'Enter':
          if (event.keyCode === 229) {
            // ignore the keydown event from an Input Method Editor(IME)
            // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
            break;
          }

          if (menuIsOpen) {
            if (!focusedOption) return;
            if (_this.isComposing) return;

            _this.selectOption(focusedOption);

            break;
          }

          return;

        case 'Escape':
          if (menuIsOpen) {
            _this.inputIsHiddenAfterUpdate = false;

            _this.onInputChange('', {
              action: 'menu-close'
            });

            _this.onMenuClose();
          } else if (isClearable && escapeClearsValue) {
            _this.clearValue();
          }

          break;

        case ' ':
          // space
          if (inputValue) {
            return;
          }

          if (!menuIsOpen) {
            _this.openMenu('first');

            break;
          }

          if (!focusedOption) return;

          _this.selectOption(focusedOption);

          break;

        case 'ArrowUp':
          if (menuIsOpen) {
            _this.focusOption('up');
          } else {
            _this.openMenu('last');
          }

          break;

        case 'ArrowDown':
          if (menuIsOpen) {
            _this.focusOption('down');
          } else {
            _this.openMenu('first');
          }

          break;

        case 'PageUp':
          if (!menuIsOpen) return;

          _this.focusOption('pageup');

          break;

        case 'PageDown':
          if (!menuIsOpen) return;

          _this.focusOption('pagedown');

          break;

        case 'Home':
          if (!menuIsOpen) return;

          _this.focusOption('first');

          break;

        case 'End':
          if (!menuIsOpen) return;

          _this.focusOption('last');

          break;

        default:
          return;
      }

      event.preventDefault();
    };

    _this.buildMenuOptions = function (props, selectValue) {
      var _props$inputValue = props.inputValue,
          inputValue = _props$inputValue === void 0 ? '' : _props$inputValue,
          options = props.options;

      var toOption = function toOption(option, id) {
        var isDisabled = _this.isOptionDisabled(option, selectValue);

        var isSelected = _this.isOptionSelected(option, selectValue);

        var label = _this.getOptionLabel(option);

        var value = _this.getOptionValue(option);

        if (_this.shouldHideSelectedOptions() && isSelected || !_this.filterOption({
          label: label,
          value: value,
          data: option
        }, inputValue)) {
          return;
        }

        var onHover = isDisabled ? undefined : function () {
          return _this.onOptionHover(option);
        };
        var onSelect = isDisabled ? undefined : function () {
          return _this.selectOption(option);
        };
        var optionId = _this.getElementId('option') + "-" + id;
        return {
          innerProps: {
            id: optionId,
            onClick: onSelect,
            onMouseMove: onHover,
            onMouseOver: onHover,
            tabIndex: -1
          },
          data: option,
          isDisabled: isDisabled,
          isSelected: isSelected,
          key: optionId,
          label: label,
          type: 'option',
          value: value
        };
      };

      return options.reduce(function (acc, item, itemIndex) {
        if (item.options) {
          // TODO needs a tidier implementation
          if (!_this.hasGroups) _this.hasGroups = true;
          var items = item.options;
          var children = items.map(function (child, i) {
            var option = toOption(child, itemIndex + "-" + i);
            if (option) acc.focusable.push(child);
            return option;
          }).filter(Boolean);

          if (children.length) {
            var groupId = _this.getElementId('group') + "-" + itemIndex;
            acc.render.push({
              type: 'group',
              key: groupId,
              data: item,
              options: children
            });
          }
        } else {
          var option = toOption(item, "" + itemIndex);

          if (option) {
            acc.render.push(option);
            acc.focusable.push(item);
          }
        }

        return acc;
      }, {
        render: [],
        focusable: []
      });
    };

    var _value = _props.value;
    _this.cacheComponents = Object(memoize_one__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.cacheComponents, _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["x"]).bind(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.cacheComponents(_props.components);

    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);

    var _selectValue = Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["e"])(_value);

    _this.buildMenuOptions = Object(memoize_one__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.buildMenuOptions, function (newArgs, lastArgs) {
      var _ref6 = newArgs,
          newProps = _ref6[0],
          newSelectValue = _ref6[1];
      var _ref7 = lastArgs,
          lastProps = _ref7[0],
          lastSelectValue = _ref7[1];
      return Object(_index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["x"])(newSelectValue, lastSelectValue) && Object(_index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["x"])(newProps.inputValue, lastProps.inputValue) && Object(_index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["x"])(newProps.options, lastProps.options);
    }).bind(_assertThisInitialized(_assertThisInitialized(_this)));

    var _menuOptions = _props.menuIsOpen ? _this.buildMenuOptions(_props, _selectValue) : {
      render: [],
      focusable: []
    };

    _this.state.menuOptions = _menuOptions;
    _this.state.selectValue = _selectValue;
    return _this;
  }

  var _proto = Select.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.startListeningComposition();
    this.startListeningToTouch();

    if (this.props.closeMenuOnScroll && document && document.addEventListener) {
      // Listen to all scroll events, and filter them out inside of 'onScroll'
      document.addEventListener('scroll', this.onScroll, true);
    }

    if (this.props.autoFocus) {
      this.focusInput();
    }
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    var _this$props8 = this.props,
        options = _this$props8.options,
        value = _this$props8.value,
        menuIsOpen = _this$props8.menuIsOpen,
        inputValue = _this$props8.inputValue; // re-cache custom components

    this.cacheComponents(nextProps.components); // rebuild the menu options

    if (nextProps.value !== value || nextProps.options !== options || nextProps.menuIsOpen !== menuIsOpen || nextProps.inputValue !== inputValue) {
      var selectValue = Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["e"])(nextProps.value);
      var menuOptions = nextProps.menuIsOpen ? this.buildMenuOptions(nextProps, selectValue) : {
        render: [],
        focusable: []
      };
      var focusedValue = this.getNextFocusedValue(selectValue);
      var focusedOption = this.getNextFocusedOption(menuOptions.focusable);
      this.setState({
        menuOptions: menuOptions,
        selectValue: selectValue,
        focusedOption: focusedOption,
        focusedValue: focusedValue
      });
    } // some updates should toggle the state of the input visibility


    if (this.inputIsHiddenAfterUpdate != null) {
      this.setState({
        inputIsHidden: this.inputIsHiddenAfterUpdate
      });
      delete this.inputIsHiddenAfterUpdate;
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props9 = this.props,
        isDisabled = _this$props9.isDisabled,
        menuIsOpen = _this$props9.menuIsOpen;
    var isFocused = this.state.isFocused;

    if ( // ensure focus is restored correctly when the control becomes enabled
    isFocused && !isDisabled && prevProps.isDisabled || // ensure focus is on the Input when the menu opens
    isFocused && menuIsOpen && !prevProps.menuIsOpen) {
      this.focusInput();
    } // scroll the focused option into view if necessary


    if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
      Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["f"])(this.menuListRef, this.focusedOptionRef);
      this.scrollToFocusedOptionOnUpdate = false;
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.stopListeningComposition();
    this.stopListeningToTouch();
    document.removeEventListener('scroll', this.onScroll, true);
  };

  // ==============================
  // Consumer Handlers
  // ==============================
  _proto.onMenuOpen = function onMenuOpen() {
    this.props.onMenuOpen();
  };

  _proto.onMenuClose = function onMenuClose() {
    var _this$props10 = this.props,
        isSearchable = _this$props10.isSearchable,
        isMulti = _this$props10.isMulti;
    this.announceAriaLiveContext({
      event: 'input',
      context: {
        isSearchable: isSearchable,
        isMulti: isMulti
      }
    });
    this.onInputChange('', {
      action: 'menu-close'
    });
    this.props.onMenuClose();
  };

  _proto.onInputChange = function onInputChange(newValue, actionMeta) {
    this.props.onInputChange(newValue, actionMeta);
  } // ==============================
  // Methods
  // ==============================
  ;

  _proto.focusInput = function focusInput() {
    if (!this.inputRef) return;
    this.inputRef.focus();
  };

  _proto.blurInput = function blurInput() {
    if (!this.inputRef) return;
    this.inputRef.blur();
  } // aliased for consumers
  ;

  _proto.openMenu = function openMenu(focusOption) {
    var _this2 = this;

    var _this$state3 = this.state,
        selectValue = _this$state3.selectValue,
        isFocused = _this$state3.isFocused;
    var menuOptions = this.buildMenuOptions(this.props, selectValue);
    var isMulti = this.props.isMulti;
    var openAtIndex = focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

    if (!isMulti) {
      var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);

      if (selectedIndex > -1) {
        openAtIndex = selectedIndex;
      }
    } // only scroll if the menu isn't already open


    this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
    this.inputIsHiddenAfterUpdate = false;
    this.setState({
      menuOptions: menuOptions,
      focusedValue: null,
      focusedOption: menuOptions.focusable[openAtIndex]
    }, function () {
      _this2.onMenuOpen();

      _this2.announceAriaLiveContext({
        event: 'menu'
      });
    });
  };

  _proto.focusValue = function focusValue(direction) {
    var _this$props11 = this.props,
        isMulti = _this$props11.isMulti,
        isSearchable = _this$props11.isSearchable;
    var _this$state4 = this.state,
        selectValue = _this$state4.selectValue,
        focusedValue = _this$state4.focusedValue; // Only multiselects support value focusing

    if (!isMulti) return;
    this.setState({
      focusedOption: null
    });
    var focusedIndex = selectValue.indexOf(focusedValue);

    if (!focusedValue) {
      focusedIndex = -1;
      this.announceAriaLiveContext({
        event: 'value'
      });
    }

    var lastIndex = selectValue.length - 1;
    var nextFocus = -1;
    if (!selectValue.length) return;

    switch (direction) {
      case 'previous':
        if (focusedIndex === 0) {
          // don't cycle from the start to the end
          nextFocus = 0;
        } else if (focusedIndex === -1) {
          // if nothing is focused, focus the last value first
          nextFocus = lastIndex;
        } else {
          nextFocus = focusedIndex - 1;
        }

        break;

      case 'next':
        if (focusedIndex > -1 && focusedIndex < lastIndex) {
          nextFocus = focusedIndex + 1;
        }

        break;
    }

    if (nextFocus === -1) {
      this.announceAriaLiveContext({
        event: 'input',
        context: {
          isSearchable: isSearchable,
          isMulti: isMulti
        }
      });
    }

    this.setState({
      inputIsHidden: nextFocus !== -1,
      focusedValue: selectValue[nextFocus]
    });
  };

  _proto.focusOption = function focusOption(direction) {
    if (direction === void 0) {
      direction = 'first';
    }

    var pageSize = this.props.pageSize;
    var _this$state5 = this.state,
        focusedOption = _this$state5.focusedOption,
        menuOptions = _this$state5.menuOptions;
    var options = menuOptions.focusable;
    if (!options.length) return;
    var nextFocus = 0; // handles 'first'

    var focusedIndex = options.indexOf(focusedOption);

    if (!focusedOption) {
      focusedIndex = -1;
      this.announceAriaLiveContext({
        event: 'menu'
      });
    }

    if (direction === 'up') {
      nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
    } else if (direction === 'down') {
      nextFocus = (focusedIndex + 1) % options.length;
    } else if (direction === 'pageup') {
      nextFocus = focusedIndex - pageSize;
      if (nextFocus < 0) nextFocus = 0;
    } else if (direction === 'pagedown') {
      nextFocus = focusedIndex + pageSize;
      if (nextFocus > options.length - 1) nextFocus = options.length - 1;
    } else if (direction === 'last') {
      nextFocus = options.length - 1;
    }

    this.scrollToFocusedOptionOnUpdate = true;
    this.setState({
      focusedOption: options[nextFocus],
      focusedValue: null
    });
    this.announceAriaLiveContext({
      event: 'menu',
      context: {
        isDisabled: isOptionDisabled(options[nextFocus])
      }
    });
  };

  // ==============================
  // Getters
  // ==============================
  _proto.getTheme = function getTheme() {
    // Use the default theme if there are no customizations.
    if (!this.props.theme) {
      return defaultTheme;
    } // If the theme prop is a function, assume the function
    // knows how to merge the passed-in default theme with
    // its own modifications.


    if (typeof this.props.theme === 'function') {
      return this.props.theme(defaultTheme);
    } // Otherwise, if a plain theme object was passed in,
    // overlay it with the default theme.


    return _extends$4({}, defaultTheme, this.props.theme);
  };

  _proto.getCommonProps = function getCommonProps() {
    var clearValue = this.clearValue,
        getStyles = this.getStyles,
        setValue = this.setValue,
        selectOption = this.selectOption,
        props = this.props;
    var classNamePrefix = props.classNamePrefix,
        isMulti = props.isMulti,
        isRtl = props.isRtl,
        options = props.options;
    var selectValue = this.state.selectValue;
    var hasValue = this.hasValue();

    var getValue = function getValue() {
      return selectValue;
    };

    var cx = _utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["h"].bind(null, classNamePrefix);
    return {
      cx: cx,
      clearValue: clearValue,
      getStyles: getStyles,
      getValue: getValue,
      hasValue: hasValue,
      isMulti: isMulti,
      isRtl: isRtl,
      options: options,
      selectOption: selectOption,
      setValue: setValue,
      selectProps: props,
      theme: this.getTheme()
    };
  };

  _proto.getNextFocusedValue = function getNextFocusedValue(nextSelectValue) {
    if (this.clearFocusValueOnUpdate) {
      this.clearFocusValueOnUpdate = false;
      return null;
    }

    var _this$state6 = this.state,
        focusedValue = _this$state6.focusedValue,
        lastSelectValue = _this$state6.selectValue;
    var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);

    if (lastFocusedIndex > -1) {
      var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);

      if (nextFocusedIndex > -1) {
        // the focused value is still in the selectValue, return it
        return focusedValue;
      } else if (lastFocusedIndex < nextSelectValue.length) {
        // the focusedValue is not present in the next selectValue array by
        // reference, so return the new value at the same index
        return nextSelectValue[lastFocusedIndex];
      }
    }

    return null;
  };

  _proto.getNextFocusedOption = function getNextFocusedOption(options) {
    var lastFocusedOption = this.state.focusedOption;
    return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
  };

  _proto.hasValue = function hasValue() {
    var selectValue = this.state.selectValue;
    return selectValue.length > 0;
  };

  _proto.hasOptions = function hasOptions() {
    return !!this.state.menuOptions.render.length;
  };

  _proto.countOptions = function countOptions() {
    return this.state.menuOptions.focusable.length;
  };

  _proto.isClearable = function isClearable() {
    var _this$props12 = this.props,
        isClearable = _this$props12.isClearable,
        isMulti = _this$props12.isMulti; // single select, by default, IS NOT clearable
    // multi select, by default, IS clearable

    if (isClearable === undefined) return isMulti;
    return isClearable;
  };

  _proto.isOptionDisabled = function isOptionDisabled(option, selectValue) {
    return typeof this.props.isOptionDisabled === 'function' ? this.props.isOptionDisabled(option, selectValue) : false;
  };

  _proto.isOptionSelected = function isOptionSelected(option, selectValue) {
    var _this3 = this;

    if (selectValue.indexOf(option) > -1) return true;

    if (typeof this.props.isOptionSelected === 'function') {
      return this.props.isOptionSelected(option, selectValue);
    }

    var candidate = this.getOptionValue(option);
    return selectValue.some(function (i) {
      return _this3.getOptionValue(i) === candidate;
    });
  };

  _proto.filterOption = function filterOption(option, inputValue) {
    return this.props.filterOption ? this.props.filterOption(option, inputValue) : true;
  };

  _proto.formatOptionLabel = function formatOptionLabel(data, context) {
    if (typeof this.props.formatOptionLabel === 'function') {
      var inputValue = this.props.inputValue;
      var selectValue = this.state.selectValue;
      return this.props.formatOptionLabel(data, {
        context: context,
        inputValue: inputValue,
        selectValue: selectValue
      });
    } else {
      return this.getOptionLabel(data);
    }
  };

  _proto.formatGroupLabel = function formatGroupLabel(data) {
    return this.props.formatGroupLabel(data);
  } // ==============================
  // Mouse Handlers
  // ==============================
  ;

  // ==============================
  // Composition Handlers
  // ==============================
  _proto.startListeningComposition = function startListeningComposition() {
    if (document && document.addEventListener) {
      document.addEventListener('compositionstart', this.onCompositionStart, false);
      document.addEventListener('compositionend', this.onCompositionEnd, false);
    }
  };

  _proto.stopListeningComposition = function stopListeningComposition() {
    if (document && document.removeEventListener) {
      document.removeEventListener('compositionstart', this.onCompositionStart);
      document.removeEventListener('compositionend', this.onCompositionEnd);
    }
  };

  // ==============================
  // Touch Handlers
  // ==============================
  _proto.startListeningToTouch = function startListeningToTouch() {
    if (document && document.addEventListener) {
      document.addEventListener('touchstart', this.onTouchStart, false);
      document.addEventListener('touchmove', this.onTouchMove, false);
      document.addEventListener('touchend', this.onTouchEnd, false);
    }
  };

  _proto.stopListeningToTouch = function stopListeningToTouch() {
    if (document && document.removeEventListener) {
      document.removeEventListener('touchstart', this.onTouchStart);
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
    }
  };

  // ==============================
  // Renderers
  // ==============================
  _proto.constructAriaLiveMessage = function constructAriaLiveMessage() {
    var _this$state7 = this.state,
        ariaLiveContext = _this$state7.ariaLiveContext,
        selectValue = _this$state7.selectValue,
        focusedValue = _this$state7.focusedValue,
        focusedOption = _this$state7.focusedOption;
    var _this$props13 = this.props,
        options = _this$props13.options,
        menuIsOpen = _this$props13.menuIsOpen,
        inputValue = _this$props13.inputValue,
        screenReaderStatus = _this$props13.screenReaderStatus; // An aria live message representing the currently focused value in the select.

    var focusedValueMsg = focusedValue ? valueFocusAriaMessage({
      focusedValue: focusedValue,
      getOptionLabel: this.getOptionLabel,
      selectValue: selectValue
    }) : ''; // An aria live message representing the currently focused option in the select.

    var focusedOptionMsg = focusedOption && menuIsOpen ? optionFocusAriaMessage({
      focusedOption: focusedOption,
      getOptionLabel: this.getOptionLabel,
      options: options
    }) : ''; // An aria live message representing the set of focusable results and current searchterm/inputvalue.

    var resultsMsg = resultsAriaMessage({
      inputValue: inputValue,
      screenReaderMessage: screenReaderStatus({
        count: this.countOptions()
      })
    });
    return focusedValueMsg + " " + focusedOptionMsg + " " + resultsMsg + " " + ariaLiveContext;
  };

  _proto.renderInput = function renderInput() {
    var _this$props14 = this.props,
        isDisabled = _this$props14.isDisabled,
        isSearchable = _this$props14.isSearchable,
        inputId = _this$props14.inputId,
        inputValue = _this$props14.inputValue,
        tabIndex = _this$props14.tabIndex;
    var Input = this.components.Input;
    var inputIsHidden = this.state.inputIsHidden;
    var id = inputId || this.getElementId('input'); // aria attributes makes the JSX "noisy", separated for clarity

    var ariaAttributes = {
      'aria-autocomplete': 'list',
      'aria-label': this.props['aria-label'],
      'aria-labelledby': this.props['aria-labelledby']
    };

    if (!isSearchable) {
      // use a dummy input to maintain focus/blur functionality
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DummyInput, _extends$4({
        id: id,
        innerRef: this.getInputRef,
        onBlur: this.onInputBlur,
        onChange: _utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["n"],
        onFocus: this.onInputFocus,
        readOnly: true,
        disabled: isDisabled,
        tabIndex: tabIndex,
        value: ""
      }, ariaAttributes));
    }

    var _this$commonProps = this.commonProps,
        cx = _this$commonProps.cx,
        theme = _this$commonProps.theme,
        selectProps = _this$commonProps.selectProps;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, _extends$4({
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: "off",
      cx: cx,
      getStyles: this.getStyles,
      id: id,
      innerRef: this.getInputRef,
      isDisabled: isDisabled,
      isHidden: inputIsHidden,
      onBlur: this.onInputBlur,
      onChange: this.handleInputChange,
      onFocus: this.onInputFocus,
      selectProps: selectProps,
      spellCheck: "false",
      tabIndex: tabIndex,
      theme: theme,
      type: "text",
      value: inputValue
    }, ariaAttributes));
  };

  _proto.renderPlaceholderOrValue = function renderPlaceholderOrValue() {
    var _this4 = this;

    var _this$components = this.components,
        MultiValue = _this$components.MultiValue,
        MultiValueContainer = _this$components.MultiValueContainer,
        MultiValueLabel = _this$components.MultiValueLabel,
        MultiValueRemove = _this$components.MultiValueRemove,
        SingleValue = _this$components.SingleValue,
        Placeholder = _this$components.Placeholder;
    var commonProps = this.commonProps;
    var _this$props15 = this.props,
        controlShouldRenderValue = _this$props15.controlShouldRenderValue,
        isDisabled = _this$props15.isDisabled,
        isMulti = _this$props15.isMulti,
        inputValue = _this$props15.inputValue,
        placeholder = _this$props15.placeholder;
    var _this$state8 = this.state,
        selectValue = _this$state8.selectValue,
        focusedValue = _this$state8.focusedValue,
        isFocused = _this$state8.isFocused;

    if (!this.hasValue() || !controlShouldRenderValue) {
      return inputValue ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Placeholder, _extends$4({}, commonProps, {
        key: "placeholder",
        isDisabled: isDisabled,
        isFocused: isFocused
      }), placeholder);
    }

    if (isMulti) {
      var selectValues = selectValue.map(function (opt, index) {
        var isOptionFocused = opt === focusedValue;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MultiValue, _extends$4({}, commonProps, {
          components: {
            Container: MultiValueContainer,
            Label: MultiValueLabel,
            Remove: MultiValueRemove
          },
          isFocused: isOptionFocused,
          isDisabled: isDisabled,
          key: _this4.getOptionValue(opt),
          index: index,
          removeProps: {
            onClick: function onClick() {
              return _this4.removeValue(opt);
            },
            onTouchEnd: function onTouchEnd() {
              return _this4.removeValue(opt);
            },
            onMouseDown: function onMouseDown(e) {
              e.preventDefault();
              e.stopPropagation();
            }
          },
          data: opt
        }), _this4.formatOptionLabel(opt, 'value'));
      });
      return selectValues;
    }

    if (inputValue) {
      return null;
    }

    var singleValue = selectValue[0];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SingleValue, _extends$4({}, commonProps, {
      data: singleValue,
      isDisabled: isDisabled
    }), this.formatOptionLabel(singleValue, 'value'));
  };

  _proto.renderClearIndicator = function renderClearIndicator() {
    var ClearIndicator = this.components.ClearIndicator;
    var commonProps = this.commonProps;
    var _this$props16 = this.props,
        isDisabled = _this$props16.isDisabled,
        isLoading = _this$props16.isLoading;
    var isFocused = this.state.isFocused;

    if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
      return null;
    }

    var innerProps = {
      onMouseDown: this.onClearIndicatorMouseDown,
      onTouchEnd: this.onClearIndicatorTouchEnd,
      'aria-hidden': 'true'
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ClearIndicator, _extends$4({}, commonProps, {
      innerProps: innerProps,
      isFocused: isFocused
    }));
  };

  _proto.renderLoadingIndicator = function renderLoadingIndicator() {
    var LoadingIndicator = this.components.LoadingIndicator;
    var commonProps = this.commonProps;
    var _this$props17 = this.props,
        isDisabled = _this$props17.isDisabled,
        isLoading = _this$props17.isLoading;
    var isFocused = this.state.isFocused;
    if (!LoadingIndicator || !isLoading) return null;
    var innerProps = {
      'aria-hidden': 'true'
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LoadingIndicator, _extends$4({}, commonProps, {
      innerProps: innerProps,
      isDisabled: isDisabled,
      isFocused: isFocused
    }));
  };

  _proto.renderIndicatorSeparator = function renderIndicatorSeparator() {
    var _this$components2 = this.components,
        DropdownIndicator = _this$components2.DropdownIndicator,
        IndicatorSeparator = _this$components2.IndicatorSeparator; // separator doesn't make sense without the dropdown indicator

    if (!DropdownIndicator || !IndicatorSeparator) return null;
    var commonProps = this.commonProps;
    var isDisabled = this.props.isDisabled;
    var isFocused = this.state.isFocused;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IndicatorSeparator, _extends$4({}, commonProps, {
      isDisabled: isDisabled,
      isFocused: isFocused
    }));
  };

  _proto.renderDropdownIndicator = function renderDropdownIndicator() {
    var DropdownIndicator = this.components.DropdownIndicator;
    if (!DropdownIndicator) return null;
    var commonProps = this.commonProps;
    var isDisabled = this.props.isDisabled;
    var isFocused = this.state.isFocused;
    var innerProps = {
      onMouseDown: this.onDropdownIndicatorMouseDown,
      onTouchEnd: this.onDropdownIndicatorTouchEnd,
      'aria-hidden': 'true'
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DropdownIndicator, _extends$4({}, commonProps, {
      innerProps: innerProps,
      isDisabled: isDisabled,
      isFocused: isFocused
    }));
  };

  _proto.renderMenu = function renderMenu() {
    var _this5 = this;

    var _this$components3 = this.components,
        Group = _this$components3.Group,
        GroupHeading = _this$components3.GroupHeading,
        Menu = _this$components3.Menu,
        MenuList = _this$components3.MenuList,
        MenuPortal = _this$components3.MenuPortal,
        LoadingMessage = _this$components3.LoadingMessage,
        NoOptionsMessage = _this$components3.NoOptionsMessage,
        Option = _this$components3.Option;
    var commonProps = this.commonProps;
    var _this$state9 = this.state,
        focusedOption = _this$state9.focusedOption,
        menuOptions = _this$state9.menuOptions;
    var _this$props18 = this.props,
        captureMenuScroll = _this$props18.captureMenuScroll,
        inputValue = _this$props18.inputValue,
        isLoading = _this$props18.isLoading,
        loadingMessage = _this$props18.loadingMessage,
        minMenuHeight = _this$props18.minMenuHeight,
        maxMenuHeight = _this$props18.maxMenuHeight,
        menuIsOpen = _this$props18.menuIsOpen,
        menuPlacement = _this$props18.menuPlacement,
        menuPosition = _this$props18.menuPosition,
        menuPortalTarget = _this$props18.menuPortalTarget,
        menuShouldBlockScroll = _this$props18.menuShouldBlockScroll,
        menuShouldScrollIntoView = _this$props18.menuShouldScrollIntoView,
        noOptionsMessage = _this$props18.noOptionsMessage,
        onMenuScrollToTop = _this$props18.onMenuScrollToTop,
        onMenuScrollToBottom = _this$props18.onMenuScrollToBottom;
    if (!menuIsOpen) return null; // TODO: Internal Option Type here

    var render = function render(props) {
      // for performance, the menu options in state aren't changed when the
      // focused option changes so we calculate additional props based on that
      var isFocused = focusedOption === props.data;
      props.innerRef = isFocused ? _this5.getFocusedOptionRef : undefined;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Option, _extends$4({}, commonProps, props, {
        isFocused: isFocused
      }), _this5.formatOptionLabel(props.data, 'menu'));
    };

    var menuUI;

    if (this.hasOptions()) {
      menuUI = menuOptions.render.map(function (item) {
        if (item.type === 'group') {
          var type = item.type,
              group = _objectWithoutPropertiesLoose$2(item, ["type"]);

          var headingId = item.key + "-heading";
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Group, _extends$4({}, commonProps, group, {
            Heading: GroupHeading,
            headingProps: {
              id: headingId
            },
            label: _this5.formatGroupLabel(item.data)
          }), item.options.map(function (option) {
            return render(option);
          }));
        } else if (item.type === 'option') {
          return render(item);
        }
      });
    } else if (isLoading) {
      var message = loadingMessage({
        inputValue: inputValue
      });
      if (message === null) return null;
      menuUI = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LoadingMessage, commonProps, message);
    } else {
      var _message = noOptionsMessage({
        inputValue: inputValue
      });

      if (_message === null) return null;
      menuUI = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NoOptionsMessage, commonProps, _message);
    }

    var menuPlacementProps = {
      minMenuHeight: minMenuHeight,
      maxMenuHeight: maxMenuHeight,
      menuPlacement: menuPlacement,
      menuPosition: menuPosition,
      menuShouldScrollIntoView: menuShouldScrollIntoView
    };
    var menuElement = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__["M"], _extends$4({}, commonProps, menuPlacementProps), function (_ref8) {
      var ref = _ref8.ref,
          _ref8$placerProps = _ref8.placerProps,
          placement = _ref8$placerProps.placement,
          maxHeight = _ref8$placerProps.maxHeight;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Menu, _extends$4({}, commonProps, menuPlacementProps, {
        innerRef: ref,
        innerProps: {
          onMouseDown: _this5.onMenuMouseDown,
          onMouseMove: _this5.onMenuMouseMove
        },
        isLoading: isLoading,
        placement: placement
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ScrollCaptorSwitch, {
        isEnabled: captureMenuScroll,
        onTopArrive: onMenuScrollToTop,
        onBottomArrive: onMenuScrollToBottom
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ScrollBlock, {
        isEnabled: menuShouldBlockScroll
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuList, _extends$4({}, commonProps, {
        innerRef: _this5.getMenuListRef,
        isLoading: isLoading,
        maxHeight: maxHeight
      }), menuUI))));
    }); // positioning behaviour is almost identical for portalled and fixed,
    // so we use the same component. the actual portalling logic is forked
    // within the component based on `menuPosition`

    return menuPortalTarget || menuPosition === 'fixed' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuPortal, _extends$4({}, commonProps, {
      appendTo: menuPortalTarget,
      controlElement: this.controlRef,
      menuPlacement: menuPlacement,
      menuPosition: menuPosition
    }), menuElement) : menuElement;
  };

  _proto.renderFormField = function renderFormField() {
    var _this6 = this;

    var _this$props19 = this.props,
        delimiter = _this$props19.delimiter,
        isDisabled = _this$props19.isDisabled,
        isMulti = _this$props19.isMulti,
        name = _this$props19.name;
    var selectValue = this.state.selectValue;
    if (!name || isDisabled) return;

    if (isMulti) {
      if (delimiter) {
        var value = selectValue.map(function (opt) {
          return _this6.getOptionValue(opt);
        }).join(delimiter);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          name: name,
          type: "hidden",
          value: value
        });
      } else {
        var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            key: "i-" + i,
            name: name,
            type: "hidden",
            value: _this6.getOptionValue(opt)
          });
        }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          name: name,
          type: "hidden"
        });
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, input);
      }
    } else {
      var _value2 = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        name: name,
        type: "hidden",
        value: _value2
      });
    }
  };

  _proto.renderLiveRegion = function renderLiveRegion() {
    if (!this.state.isFocused) return null;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(A11yText, {
      "aria-live": "polite"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      id: "aria-selection-event"
    }, "\xA0", this.state.ariaLiveSelection), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      id: "aria-context"
    }, "\xA0", this.constructAriaLiveMessage()));
  };

  _proto.render = function render() {
    var _this$components4 = this.components,
        Control = _this$components4.Control,
        IndicatorsContainer = _this$components4.IndicatorsContainer,
        SelectContainer = _this$components4.SelectContainer,
        ValueContainer = _this$components4.ValueContainer;
    var _this$props20 = this.props,
        className = _this$props20.className,
        id = _this$props20.id,
        isDisabled = _this$props20.isDisabled,
        menuIsOpen = _this$props20.menuIsOpen;
    var isFocused = this.state.isFocused;
    var commonProps = this.commonProps = this.getCommonProps();
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SelectContainer, _extends$4({}, commonProps, {
      className: className,
      innerProps: {
        id: id,
        onKeyDown: this.onKeyDown
      },
      isDisabled: isDisabled,
      isFocused: isFocused
    }), this.renderLiveRegion(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Control, _extends$4({}, commonProps, {
      innerRef: this.getControlRef,
      innerProps: {
        onMouseDown: this.onControlMouseDown,
        onTouchEnd: this.onControlTouchEnd
      },
      isDisabled: isDisabled,
      isFocused: isFocused,
      menuIsOpen: menuIsOpen
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ValueContainer, _extends$4({}, commonProps, {
      isDisabled: isDisabled
    }), this.renderPlaceholderOrValue(), this.renderInput()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IndicatorsContainer, _extends$4({}, commonProps, {
      isDisabled: isDisabled
    }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
  };

  return Select;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

Select.defaultProps = defaultProps;




/***/ }),

/***/ "./node_modules/react-select/dist/index-4322c0ed.browser.esm.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-select/dist/index-4322c0ed.browser.esm.js ***!
  \**********************************************************************/
/*! exports provided: M, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return MenuPlacer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return containerCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return clearIndicatorCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return dropdownIndicatorCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return groupHeadingCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return indicatorSeparatorCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return groupCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return inputCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return indicatorsContainerCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return loadingMessageCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return menuListCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return loadingIndicatorCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return menuCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return menuPortalCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return multiValueCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return multiValueLabelCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return multiValueRemoveCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return noOptionsMessageCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return optionCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return placeholderCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return css$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return valueContainerCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return defaultComponents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return exportedEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return components; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils-06b0d5a4.browser.esm.js */ "./node_modules/react-select/dist/utils-06b0d5a4.browser.esm.js");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/css */ "./node_modules/@emotion/css/dist/css.browser.esm.js");
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-input-autosize */ "./node_modules/react-input-autosize/lib/AutosizeInput.js");
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_input_autosize__WEBPACK_IMPORTED_MODULE_6__);








function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }
function getMenuPlacement(_ref) {
  var maxHeight = _ref.maxHeight,
      menuEl = _ref.menuEl,
      minHeight = _ref.minHeight,
      placement = _ref.placement,
      shouldScroll = _ref.shouldScroll,
      isFixedPosition = _ref.isFixedPosition,
      theme = _ref.theme;
  var spacing = theme.spacing;
  var scrollParent = Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["a"])(menuEl);
  var defaultState = {
    placement: 'bottom',
    maxHeight: maxHeight
  }; // something went wrong, return default state

  if (!menuEl || !menuEl.offsetParent) return defaultState; // we can't trust `scrollParent.scrollHeight` --> it may increase when
  // the menu is rendered

  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
      scrollHeight = _scrollParent$getBoun.height;

  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
      menuBottom = _menuEl$getBoundingCl.bottom,
      menuHeight = _menuEl$getBoundingCl.height,
      menuTop = _menuEl$getBoundingCl.top;

  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
      containerTop = _menuEl$offsetParent$.top;

  var viewHeight = window.innerHeight;
  var scrollTop = Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["b"])(scrollParent);
  var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
  var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
  var viewSpaceAbove = containerTop - marginTop;
  var viewSpaceBelow = viewHeight - menuTop;
  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
  var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
  var scrollUp = scrollTop + menuTop - marginTop;
  var scrollDuration = 160;

  switch (placement) {
    case 'auto':
    case 'bottom':
      // 1: the menu will fit, do nothing
      if (viewSpaceBelow >= menuHeight) {
        return {
          placement: 'bottom',
          maxHeight: maxHeight
        };
      } // 2: the menu will fit, if scrolled


      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["c"])(scrollParent, scrollDown, scrollDuration);
        }

        return {
          placement: 'bottom',
          maxHeight: maxHeight
        };
      } // 3: the menu will fit, if constrained


      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
        if (shouldScroll) {
          Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["c"])(scrollParent, scrollDown, scrollDuration);
        } // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.


        var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
        return {
          placement: 'bottom',
          maxHeight: constrainedHeight
        };
      } // 4. Forked beviour when there isn't enough space below
      // AUTO: flip the menu, render above


      if (placement === 'auto' || isFixedPosition) {
        // may need to be constrained after flipping
        var _constrainedHeight = maxHeight;
        var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;

        if (spaceAbove >= minHeight) {
          _constrainedHeight = Math.min(spaceAbove - marginBottom - spacing.controlHeight, maxHeight);
        }

        return {
          placement: 'top',
          maxHeight: _constrainedHeight
        };
      } // BOTTOM: allow browser to increase scrollable area and immediately set scroll


      if (placement === 'bottom') {
        Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["s"])(scrollParent, scrollDown);
        return {
          placement: 'bottom',
          maxHeight: maxHeight
        };
      }

      break;

    case 'top':
      // 1: the menu will fit, do nothing
      if (viewSpaceAbove >= menuHeight) {
        return {
          placement: 'top',
          maxHeight: maxHeight
        };
      } // 2: the menu will fit, if scrolled


      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["c"])(scrollParent, scrollUp, scrollDuration);
        }

        return {
          placement: 'top',
          maxHeight: maxHeight
        };
      } // 3: the menu will fit, if constrained


      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
        var _constrainedHeight2 = maxHeight; // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.

        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
        }

        if (shouldScroll) {
          Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["c"])(scrollParent, scrollUp, scrollDuration);
        }

        return {
          placement: 'top',
          maxHeight: _constrainedHeight2
        };
      } // 4. not enough space, the browser WILL NOT increase scrollable area when
      // absolutely positioned element rendered above the viewport (only below).
      // Flip the menu, render below


      return {
        placement: 'bottom',
        maxHeight: maxHeight
      };

    default:
      throw new Error("Invalid placement provided \"" + placement + "\".");
  } // fulfil contract with flow: implicit return value of undefined


  return defaultState;
} // Menu Component
// ------------------------------

function alignToControl(placement) {
  var placementToCSSProp = {
    bottom: 'top',
    top: 'bottom'
  };
  return placement ? placementToCSSProp[placement] : 'bottom';
}

var coercePlacement = function coercePlacement(p) {
  return p === 'auto' ? 'bottom' : p;
};

var menuCSS = function menuCSS(_ref2) {
  var _ref3;

  var placement = _ref2.placement,
      _ref2$theme = _ref2.theme,
      borderRadius = _ref2$theme.borderRadius,
      spacing = _ref2$theme.spacing,
      colors = _ref2$theme.colors;
  return _ref3 = {
    label: 'menu'
  }, _ref3[alignToControl(placement)] = '100%', _ref3.backgroundColor = colors.neutral0, _ref3.borderRadius = borderRadius, _ref3.boxShadow = '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)', _ref3.marginBottom = spacing.menuGutter, _ref3.marginTop = spacing.menuGutter, _ref3.position = 'absolute', _ref3.width = '100%', _ref3.zIndex = 1, _ref3;
}; // NOTE: internal only

var MenuPlacer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MenuPlacer, _Component);

  function MenuPlacer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      maxHeight: _this.props.maxMenuHeight,
      placement: null
    };

    _this.getPlacement = function (ref) {
      var _this$props = _this.props,
          minMenuHeight = _this$props.minMenuHeight,
          maxMenuHeight = _this$props.maxMenuHeight,
          menuPlacement = _this$props.menuPlacement,
          menuPosition = _this$props.menuPosition,
          menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView,
          theme = _this$props.theme;
      var getPortalPlacement = _this.context.getPortalPlacement;
      if (!ref) return; // DO NOT scroll if position is fixed

      var isFixedPosition = menuPosition === 'fixed';
      var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
      var state = getMenuPlacement({
        maxHeight: maxMenuHeight,
        menuEl: ref,
        minHeight: minMenuHeight,
        placement: menuPlacement,
        shouldScroll: shouldScroll,
        isFixedPosition: isFixedPosition,
        theme: theme
      });
      if (getPortalPlacement) getPortalPlacement(state);

      _this.setState(state);
    };

    _this.getUpdatedProps = function () {
      var menuPlacement = _this.props.menuPlacement;
      var placement = _this.state.placement || coercePlacement(menuPlacement);
      return _extends({}, _this.props, {
        placement: placement,
        maxHeight: _this.state.maxHeight
      });
    };

    return _this;
  }

  var _proto = MenuPlacer.prototype;

  _proto.render = function render() {
    var children = this.props.children;
    return children({
      ref: this.getPlacement,
      placerProps: this.getUpdatedProps()
    });
  };

  return MenuPlacer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
MenuPlacer.contextTypes = {
  getPortalPlacement: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func
};

var Menu = function Menu(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerRef = props.innerRef,
      innerProps = props.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends({
    css: getStyles('menu', props),
    className: cx({
      menu: true
    }, className)
  }, innerProps, {
    ref: innerRef
  }), children);
};
// Menu List
// ==============================

var menuListCSS = function menuListCSS(_ref4) {
  var maxHeight = _ref4.maxHeight,
      baseUnit = _ref4.theme.spacing.baseUnit;
  return {
    maxHeight: maxHeight,
    overflowY: 'auto',
    paddingBottom: baseUnit,
    paddingTop: baseUnit,
    position: 'relative',
    // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: 'touch'
  };
};
var MenuList = function MenuList(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isMulti = props.isMulti,
      innerRef = props.innerRef;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
    css: getStyles('menuList', props),
    className: cx({
      'menu-list': true,
      'menu-list--is-multi': isMulti
    }, className),
    ref: innerRef
  }, children);
}; // ==============================
// Menu Notices
// ==============================

var noticeCSS = function noticeCSS(_ref5) {
  var _ref5$theme = _ref5.theme,
      baseUnit = _ref5$theme.spacing.baseUnit,
      colors = _ref5$theme.colors;
  return {
    color: colors.neutral40,
    padding: baseUnit * 2 + "px " + baseUnit * 3 + "px",
    textAlign: 'center'
  };
};

var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;
var NoOptionsMessage = function NoOptionsMessage(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends({
    css: getStyles('noOptionsMessage', props),
    className: cx({
      'menu-notice': true,
      'menu-notice--no-options': true
    }, className)
  }, innerProps), children);
};
NoOptionsMessage.defaultProps = {
  children: 'No options'
};
var LoadingMessage = function LoadingMessage(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends({
    css: getStyles('loadingMessage', props),
    className: cx({
      'menu-notice': true,
      'menu-notice--loading': true
    }, className)
  }, innerProps), children);
};
LoadingMessage.defaultProps = {
  children: 'Loading...'
}; // ==============================
// Menu Portal
// ==============================

var menuPortalCSS = function menuPortalCSS(_ref6) {
  var rect = _ref6.rect,
      offset = _ref6.offset,
      position = _ref6.position;
  return {
    left: rect.left,
    position: position,
    top: offset,
    width: rect.width,
    zIndex: 1
  };
};
var MenuPortal =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(MenuPortal, _Component2);

  function MenuPortal() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;
    _this2.state = {
      placement: null
    };

    _this2.getPortalPlacement = function (_ref7) {
      var placement = _ref7.placement;
      var initialPlacement = coercePlacement(_this2.props.menuPlacement); // avoid re-renders if the placement has not changed

      if (placement !== initialPlacement) {
        _this2.setState({
          placement: placement
        });
      }
    };

    return _this2;
  }

  var _proto2 = MenuPortal.prototype;

  _proto2.getChildContext = function getChildContext() {
    return {
      getPortalPlacement: this.getPortalPlacement
    };
  } // callback for occassions where the menu must "flip"
  ;

  _proto2.render = function render() {
    var _this$props2 = this.props,
        appendTo = _this$props2.appendTo,
        children = _this$props2.children,
        controlElement = _this$props2.controlElement,
        menuPlacement = _this$props2.menuPlacement,
        position = _this$props2.menuPosition,
        getStyles = _this$props2.getStyles;
    var isFixed = position === 'fixed'; // bail early if required elements aren't present

    if (!appendTo && !isFixed || !controlElement) {
      return null;
    }

    var placement = this.state.placement || coercePlacement(menuPlacement);
    var rect = Object(_utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_4__["g"])(controlElement);
    var scrollDistance = isFixed ? 0 : window.pageYOffset;
    var offset = rect[placement] + scrollDistance;
    var state = {
      offset: offset,
      position: position,
      rect: rect
    }; // same wrapper element whether fixed or portalled

    var menuWrapper = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
      css: getStyles('menuPortal', state)
    }, children);
    return appendTo ? Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["createPortal"])(menuWrapper, appendTo) : menuWrapper;
  };

  return MenuPortal;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
MenuPortal.childContextTypes = {
  getPortalPlacement: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func
};

var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

function equal(a, b) {
  // fast-deep-equal index.js 2.0.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a),
        arrB = isArray(b),
        i,
        length,
        key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }

      return true;
    }

    if (arrA != arrB) return false;
    var dateA = a instanceof Date,
        dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();
    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();
    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length) {
      return false;
    }

    for (i = length; i-- !== 0;) {
      if (!hasProp.call(b, keys[i])) return false;
    } // end fast-deep-equal
    // Custom handling for React


    for (i = length; i-- !== 0;) {
      key = keys[i];

      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of a react element
        continue;
      } else {
        // all other properties should be traversed as usual
        if (!equal(a[key], b[key])) return false;
      }
    } // fast-deep-equal index.js 2.0.1


    return true;
  }

  return a !== a && b !== b;
} // end fast-deep-equal


function exportedEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (error.message && error.message.match(/stack|recursion/i)) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
      return false;
    } // some other error. we should definitely know about these


    throw error;
  }
}

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var containerCSS = function containerCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      isRtl = _ref.isRtl;
  return {
    label: 'container',
    direction: isRtl ? 'rtl' : null,
    pointerEvents: isDisabled ? 'none' : null,
    // cancel mouse events when disabled
    position: 'relative'
  };
};
var SelectContainer = function SelectContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      isRtl = props.isRtl;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends$1({
    css: getStyles('container', props),
    className: cx({
      '--is-disabled': isDisabled,
      '--is-rtl': isRtl
    }, className)
  }, innerProps), children);
}; // ==============================
// Value Container
// ==============================

var valueContainerCSS = function valueContainerCSS(_ref2) {
  var spacing = _ref2.theme.spacing;
  return {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    padding: spacing.baseUnit / 2 + "px " + spacing.baseUnit * 2 + "px",
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    overflow: 'hidden'
  };
};
var ValueContainer = function ValueContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      isMulti = props.isMulti,
      getStyles = props.getStyles,
      hasValue = props.hasValue;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
    css: getStyles('valueContainer', props),
    className: cx({
      'value-container': true,
      'value-container--is-multi': isMulti,
      'value-container--has-value': hasValue
    }, className)
  }, children);
}; // ==============================
// Indicator Container
// ==============================

var indicatorsContainerCSS = function indicatorsContainerCSS() {
  return {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexShrink: 0
  };
};
var IndicatorsContainer = function IndicatorsContainer(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
    css: getStyles('indicatorsContainer', props),
    className: cx({
      indicators: true
    }, className)
  }, children);
};

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _ref2 =  false ? undefined : {
  name: "19bqh2r",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JJIiwiZmlsZSI6ImluZGljYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyB0eXBlIE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IENvbW1vblByb3BzLCBUaGVtZSB9IGZyb20gJy4uL3R5cGVzJztcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEljb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgU3ZnID0gKHsgc2l6ZSwgLi4ucHJvcHMgfTogeyBzaXplOiBudW1iZXIgfSkgPT4gKFxuICA8c3ZnXG4gICAgaGVpZ2h0PXtzaXplfVxuICAgIHdpZHRoPXtzaXplfVxuICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgZm9jdXNhYmxlPVwiZmFsc2VcIlxuICAgIGNzcz17e1xuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBmaWxsOiAnY3VycmVudENvbG9yJyxcbiAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgc3Ryb2tlV2lkdGg6IDAsXG4gICAgfX1cbiAgICB7Li4ucHJvcHN9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBhbnkpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTE0LjM0OCAxNC44NDljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDBsLTIuNjUxLTMuMDMwLTIuNjUxIDMuMDI5Yy0wLjQ2OSAwLjQ2OS0xLjIyOSAwLjQ2OS0xLjY5NyAwLTAuNDY5LTAuNDY5LTAuNDY5LTEuMjI5IDAtMS42OTdsMi43NTgtMy4xNS0yLjc1OS0zLjE1MmMtMC40NjktMC40NjktMC40NjktMS4yMjggMC0xLjY5N3MxLjIyOC0wLjQ2OSAxLjY5NyAwbDIuNjUyIDMuMDMxIDIuNjUxLTMuMDMxYzAuNDY5LTAuNDY5IDEuMjI4LTAuNDY5IDEuNjk3IDBzMC40NjkgMS4yMjkgMCAxLjY5N2wtMi43NTggMy4xNTIgMi43NTggMy4xNWMwLjQ2OSAwLjQ2OSAwLjQ2OSAxLjIyOSAwIDEuNjk4elwiIC8+XG4gIDwvU3ZnPlxuKTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogYW55KSA9PiAoXG4gIDxTdmcgc2l6ZT17MjB9IHsuLi5wcm9wc30+XG4gICAgPHBhdGggZD1cIk00LjUxNiA3LjU0OGMwLjQzNi0wLjQ0NiAxLjA0My0wLjQ4MSAxLjU3NiAwbDMuOTA4IDMuNzQ3IDMuOTA4LTMuNzQ3YzAuNTMzLTAuNDgxIDEuMTQxLTAuNDQ2IDEuNTc0IDAgMC40MzYgMC40NDUgMC40MDggMS4xOTcgMCAxLjYxNS0wLjQwNiAwLjQxOC00LjY5NSA0LjUwMi00LjY5NSA0LjUwMi0wLjIxNyAwLjIyMy0wLjUwMiAwLjMzNS0wLjc4NyAwLjMzNXMtMC41Ny0wLjExMi0wLjc4OS0wLjMzNWMwIDAtNC4yODctNC4wODQtNC42OTUtNC41MDJzLTAuNDM2LTEuMTcgMC0xLjYxNXpcIiAvPlxuICA8L1N2Zz5cbik7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gRHJvcGRvd24gJiBDbGVhciBCdXR0b25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IHR5cGUgSW5kaWNhdG9yUHJvcHMgPSBDb21tb25Qcm9wcyAmIHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW46IE5vZGUsXG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogYW55LFxuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuLFxuICAvKiogV2hldGhlciB0aGUgdGV4dCBpcyByaWdodCB0byBsZWZ0ICovXG4gIGlzUnRsOiBib29sZWFuLFxufTtcblxuY29uc3QgYmFzZUNTUyA9ICh7XG4gIGlzRm9jdXNlZCxcbiAgdGhlbWU6IHtcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgY29sb3JzLFxuICB9LFxufTogSW5kaWNhdG9yUHJvcHMpID0+ICh7XG4gIGxhYmVsOiAnaW5kaWNhdG9yQ29udGFpbmVyJyxcbiAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcblxuICAnOmhvdmVyJzoge1xuICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDgwIDogY29sb3JzLm5ldXRyYWw0MCxcbiAgfSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gKHByb3BzOiBJbmRpY2F0b3JQcm9wcykgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2Ryb3Bkb3duSW5kaWNhdG9yJywgcHJvcHMpfVxuICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAge1xuICAgICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgICAnZHJvcGRvd24taW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NOYW1lXG4gICAgICApfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gKHByb3BzOiBJbmRpY2F0b3JQcm9wcykgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUsIGN4LCBnZXRTdHlsZXMsIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2NsZWFySW5kaWNhdG9yJywgcHJvcHMpfVxuICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAge1xuICAgICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgICAnY2xlYXItaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NOYW1lXG4gICAgICApfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG50eXBlIFNlcGFyYXRvclN0YXRlID0geyBpc0Rpc2FibGVkOiBib29sZWFuIH07XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSAoe1xuICBpc0Rpc2FibGVkLFxuICB0aGVtZToge1xuICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICBjb2xvcnMsXG4gIH0sXG59OiBDb21tb25Qcm9wcyAmIFNlcGFyYXRvclN0YXRlKSA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvclNlcGFyYXRvcicsXG4gIGFsaWduU2VsZjogJ3N0cmV0Y2gnLFxuICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGlzYWJsZWQgPyBjb2xvcnMubmV1dHJhbDEwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgbWFyZ2luQm90dG9tOiBiYXNlVW5pdCAqIDIsXG4gIG1hcmdpblRvcDogYmFzZVVuaXQgKiAyLFxuICB3aWR0aDogMSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gKHByb3BzOiBJbmRpY2F0b3JQcm9wcykgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgY3gsIGdldFN0eWxlcywgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgY3NzPXtnZXRTdHlsZXMoJ2luZGljYXRvclNlcGFyYXRvcicsIHByb3BzKX1cbiAgICAgIGNsYXNzTmFtZT17Y3goeyAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUgfSwgY2xhc3NOYW1lKX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gKHtcbiAgaXNGb2N1c2VkLFxuICBzaXplLFxuICB0aGVtZToge1xuICAgIGNvbG9ycyxcbiAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gIH0sXG59OiB7XG4gIGlzRm9jdXNlZDogYm9vbGVhbixcbiAgc2l6ZTogbnVtYmVyLFxuICB0aGVtZTogVGhlbWUsXG59KSA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICBmb250U2l6ZTogc2l6ZSxcbiAgbGluZUhlaWdodDogMSxcbiAgbWFyZ2luUmlnaHQ6IHNpemUsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxufSk7XG5cbnR5cGUgRG90UHJvcHMgPSB7IGRlbGF5OiBudW1iZXIsIG9mZnNldDogYm9vbGVhbiB9O1xuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogRG90UHJvcHMpID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGFuaW1hdGlvbjogYCR7bG9hZGluZ0RvdEFuaW1hdGlvbnN9IDFzIGVhc2UtaW4tb3V0ICR7ZGVsYXl9bXMgaW5maW5pdGU7YCxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxZW0nLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBtYXJnaW5MZWZ0OiBvZmZzZXQgPyAnMWVtJyA6IG51bGwsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCB0eXBlIExvYWRpbmdJY29uUHJvcHMgPSB7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogYW55LFxuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuLFxuICAvKiogV2hldGhlciB0aGUgdGV4dCBpcyByaWdodCB0byBsZWZ0ICovXG4gIGlzUnRsOiBib29sZWFuLFxufSAmIENvbW1vblByb3BzICYge1xuICAgIC8qKiBTZXQgc2l6ZSBvZiB0aGUgY29udGFpbmVyLiAqL1xuICAgIHNpemU6IG51bWJlcixcbiAgfTtcbmV4cG9ydCBjb25zdCBMb2FkaW5nSW5kaWNhdG9yID0gKHByb3BzOiBMb2FkaW5nSWNvblByb3BzKSA9PiB7XG4gIGNvbnN0IHsgY2xhc3NOYW1lLCBjeCwgZ2V0U3R5bGVzLCBpbm5lclByb3BzLCBpc1J0bCB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICAgIGNzcz17Z2V0U3R5bGVzKCdsb2FkaW5nSW5kaWNhdG9yJywgcHJvcHMpfVxuICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAge1xuICAgICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgICAnbG9hZGluZy1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc05hbWVcbiAgICAgICl9XG4gICAgPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezB9IG9mZnNldD17aXNSdGx9IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MTYwfSBvZmZzZXQgLz5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXszMjB9IG9mZnNldD17IWlzUnRsfSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbkxvYWRpbmdJbmRpY2F0b3IuZGVmYXVsdFByb3BzID0geyBzaXplOiA0IH07XG4iXX0= */"
};

// ==============================
// Dropdown & Clear Icons
// ==============================
var Svg = function Svg(_ref) {
  var size = _ref.size,
      props = _objectWithoutPropertiesLoose(_ref, ["size"]);

  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("svg", _extends$2({
    height: size,
    width: size,
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    focusable: "false",
    css: _ref2
  }, props));
};

var CrossIcon = function CrossIcon(props) {
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Svg, _extends$2({
    size: 20
  }, props), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("path", {
    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
  }));
};
var DownChevron = function DownChevron(props) {
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Svg, _extends$2({
    size: 20
  }, props), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("path", {
    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
  }));
}; // ==============================
// Dropdown & Clear Buttons
// ==============================

var baseCSS = function baseCSS(_ref3) {
  var isFocused = _ref3.isFocused,
      _ref3$theme = _ref3.theme,
      baseUnit = _ref3$theme.spacing.baseUnit,
      colors = _ref3$theme.colors;
  return {
    label: 'indicatorContainer',
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex',
    padding: baseUnit * 2,
    transition: 'color 150ms',
    ':hover': {
      color: isFocused ? colors.neutral80 : colors.neutral40
    }
  };
};

var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends$2({}, innerProps, {
    css: getStyles('dropdownIndicator', props),
    className: cx({
      indicator: true,
      'dropdown-indicator': true
    }, className)
  }), children || Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(DownChevron, null));
};
var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends$2({}, innerProps, {
    css: getStyles('clearIndicator', props),
    className: cx({
      indicator: true,
      'clear-indicator': true
    }, className)
  }), children || Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(CrossIcon, null));
}; // ==============================
// Separator
// ==============================

var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref4) {
  var isDisabled = _ref4.isDisabled,
      _ref4$theme = _ref4.theme,
      baseUnit = _ref4$theme.spacing.baseUnit,
      colors = _ref4$theme.colors;
  return {
    label: 'indicatorSeparator',
    alignSelf: 'stretch',
    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
    marginBottom: baseUnit * 2,
    marginTop: baseUnit * 2,
    width: 1
  };
};
var IndicatorSeparator = function IndicatorSeparator(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("span", _extends$2({}, innerProps, {
    css: getStyles('indicatorSeparator', props),
    className: cx({
      'indicator-separator': true
    }, className)
  }));
}; // ==============================
// Loading
// ==============================

var loadingDotAnimations = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["keyframes"])(_templateObject());
var loadingIndicatorCSS = function loadingIndicatorCSS(_ref5) {
  var isFocused = _ref5.isFocused,
      size = _ref5.size,
      _ref5$theme = _ref5.theme,
      colors = _ref5$theme.colors,
      baseUnit = _ref5$theme.spacing.baseUnit;
  return {
    label: 'loadingIndicator',
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex',
    padding: baseUnit * 2,
    transition: 'color 150ms',
    alignSelf: 'center',
    fontSize: size,
    lineHeight: 1,
    marginRight: size,
    textAlign: 'center',
    verticalAlign: 'middle'
  };
};

var LoadingDot = function LoadingDot(_ref6) {
  var delay = _ref6.delay,
      offset = _ref6.offset;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("span", {
    css:
    /*#__PURE__*/
    Object(_emotion_css__WEBPACK_IMPORTED_MODULE_5__["default"])({
      animation: loadingDotAnimations + " 1s ease-in-out " + delay + "ms infinite;",
      backgroundColor: 'currentColor',
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : null,
      height: '1em',
      verticalAlign: 'top',
      width: '1em'
    },  false ? undefined : "")
  });
};

var LoadingIndicator = function LoadingIndicator(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isRtl = props.isRtl;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends$2({}, innerProps, {
    css: getStyles('loadingIndicator', props),
    className: cx({
      indicator: true,
      'loading-indicator': true
    }, className)
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(LoadingDot, {
    delay: 0,
    offset: isRtl
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(LoadingDot, {
    delay: 160,
    offset: true
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(LoadingDot, {
    delay: 320,
    offset: !isRtl
  }));
};
LoadingIndicator.defaultProps = {
  size: 4
};

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var css = function css(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      _ref$theme = _ref.theme,
      colors = _ref$theme.colors,
      borderRadius = _ref$theme.borderRadius,
      spacing = _ref$theme.spacing;
  return {
    label: 'control',
    alignItems: 'center',
    backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: isFocused ? "0 0 0 1px " + colors.primary : null,
    cursor: 'default',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: spacing.controlHeight,
    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms',
    '&:hover': {
      borderColor: isFocused ? colors.primary : colors.neutral30
    }
  };
};

var Control = function Control(props) {
  var children = props.children,
      cx = props.cx,
      getStyles = props.getStyles,
      className = props.className,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      innerRef = props.innerRef,
      innerProps = props.innerProps,
      menuIsOpen = props.menuIsOpen;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends$3({
    ref: innerRef,
    css: getStyles('control', props),
    className: cx({
      control: true,
      'control--is-disabled': isDisabled,
      'control--is-focused': isFocused,
      'control--menu-is-open': menuIsOpen
    }, className)
  }, innerProps), children);
};

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }
var groupCSS = function groupCSS(_ref) {
  var spacing = _ref.theme.spacing;
  return {
    paddingBottom: spacing.baseUnit * 2,
    paddingTop: spacing.baseUnit * 2
  };
};

var Group = function Group(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      Heading = props.Heading,
      headingProps = props.headingProps,
      label = props.label,
      theme = props.theme,
      selectProps = props.selectProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
    css: getStyles('group', props),
    className: cx({
      group: true
    }, className)
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Heading, _extends$4({}, headingProps, {
    selectProps: selectProps,
    theme: theme,
    getStyles: getStyles,
    cx: cx
  }), label), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", null, children));
};

var groupHeadingCSS = function groupHeadingCSS(_ref2) {
  var spacing = _ref2.theme.spacing;
  return {
    label: 'group',
    color: '#999',
    cursor: 'default',
    display: 'block',
    fontSize: '75%',
    fontWeight: '500',
    marginBottom: '0.25em',
    paddingLeft: spacing.baseUnit * 3,
    paddingRight: spacing.baseUnit * 3,
    textTransform: 'uppercase'
  };
};
var GroupHeading = function GroupHeading(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      theme = props.theme,
      selectProps = props.selectProps,
      cleanProps = _objectWithoutPropertiesLoose$1(props, ["className", "cx", "getStyles", "theme", "selectProps"]);

  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends$4({
    css: getStyles('groupHeading', _extends$4({
      theme: theme
    }, cleanProps)),
    className: cx({
      'group-heading': true
    }, className)
  }, cleanProps));
};

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var inputCSS = function inputCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    margin: spacing.baseUnit / 2,
    paddingBottom: spacing.baseUnit / 2,
    paddingTop: spacing.baseUnit / 2,
    visibility: isDisabled ? 'hidden' : 'visible',
    color: colors.neutral80
  };
};

var inputStyle = function inputStyle(isHidden) {
  return {
    label: 'input',
    background: 0,
    border: 0,
    fontSize: 'inherit',
    opacity: isHidden ? 0 : 1,
    outline: 0,
    padding: 0,
    color: 'inherit'
  };
};

var Input = function Input(_ref2) {
  var className = _ref2.className,
      cx = _ref2.cx,
      getStyles = _ref2.getStyles,
      innerRef = _ref2.innerRef,
      isHidden = _ref2.isHidden,
      isDisabled = _ref2.isDisabled,
      theme = _ref2.theme,
      selectProps = _ref2.selectProps,
      props = _objectWithoutPropertiesLoose$2(_ref2, ["className", "cx", "getStyles", "innerRef", "isHidden", "isDisabled", "theme", "selectProps"]);

  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
    css: getStyles('input', _extends$5({
      theme: theme
    }, props))
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(react_input_autosize__WEBPACK_IMPORTED_MODULE_6___default.a, _extends$5({
    className: cx({
      input: true
    }, className),
    inputRef: innerRef,
    inputStyle: inputStyle(isHidden),
    disabled: isDisabled
  }, props)));
};

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }
var multiValueCSS = function multiValueCSS(_ref) {
  var _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      borderRadius = _ref$theme.borderRadius,
      colors = _ref$theme.colors;
  return {
    label: 'multiValue',
    backgroundColor: colors.neutral10,
    borderRadius: borderRadius / 2,
    display: 'flex',
    margin: spacing.baseUnit / 2,
    minWidth: 0 // resolves flex/text-overflow bug

  };
};
var multiValueLabelCSS = function multiValueLabelCSS(_ref2) {
  var _ref2$theme = _ref2.theme,
      borderRadius = _ref2$theme.borderRadius,
      colors = _ref2$theme.colors,
      cropWithEllipsis = _ref2.cropWithEllipsis;
  return {
    borderRadius: borderRadius / 2,
    color: colors.neutral80,
    fontSize: '85%',
    overflow: 'hidden',
    padding: 3,
    paddingLeft: 6,
    textOverflow: cropWithEllipsis ? 'ellipsis' : null,
    whiteSpace: 'nowrap'
  };
};
var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3) {
  var _ref3$theme = _ref3.theme,
      spacing = _ref3$theme.spacing,
      borderRadius = _ref3$theme.borderRadius,
      colors = _ref3$theme.colors,
      isFocused = _ref3.isFocused;
  return {
    alignItems: 'center',
    borderRadius: borderRadius / 2,
    backgroundColor: isFocused && colors.dangerLight,
    display: 'flex',
    paddingLeft: spacing.baseUnit,
    paddingRight: spacing.baseUnit,
    ':hover': {
      backgroundColor: colors.dangerLight,
      color: colors.danger
    }
  };
};
var MultiValueGeneric = function MultiValueGeneric(_ref4) {
  var children = _ref4.children,
      innerProps = _ref4.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", innerProps, children);
};
var MultiValueContainer = MultiValueGeneric;
var MultiValueLabel = MultiValueGeneric;
function MultiValueRemove(_ref5) {
  var children = _ref5.children,
      innerProps = _ref5.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", innerProps, children || Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(CrossIcon, {
    size: 14
  }));
}

var MultiValue = function MultiValue(props) {
  var children = props.children,
      className = props.className,
      components = props.components,
      cx = props.cx,
      data = props.data,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isDisabled = props.isDisabled,
      removeProps = props.removeProps,
      selectProps = props.selectProps;
  var Container = components.Container,
      Label = components.Label,
      Remove = components.Remove;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["ClassNames"], null, function (_ref6) {
    var css = _ref6.css,
        emotionCx = _ref6.cx;
    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Container, {
      data: data,
      innerProps: _extends$6({}, innerProps, {
        className: emotionCx(css(getStyles('multiValue', props)), cx({
          'multi-value': true,
          'multi-value--is-disabled': isDisabled
        }, className))
      }),
      selectProps: selectProps
    }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Label, {
      data: data,
      innerProps: {
        className: emotionCx(css(getStyles('multiValueLabel', props)), cx({
          'multi-value__label': true
        }, className))
      },
      selectProps: selectProps
    }, children), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Remove, {
      data: data,
      innerProps: _extends$6({
        className: emotionCx(css(getStyles('multiValueRemove', props)), cx({
          'multi-value__remove': true
        }, className))
      }, removeProps),
      selectProps: selectProps
    }));
  });
};

MultiValue.defaultProps = {
  cropWithEllipsis: true
};

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }
var optionCSS = function optionCSS(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    label: 'option',
    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
    cursor: 'default',
    display: 'block',
    fontSize: 'inherit',
    padding: spacing.baseUnit * 2 + "px " + spacing.baseUnit * 3 + "px",
    width: '100%',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    // provide some affordance on touch devices
    ':active': {
      backgroundColor: !isDisabled && (isSelected ? colors.primary : colors.primary50)
    }
  };
};

var Option = function Option(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      isSelected = props.isSelected,
      innerRef = props.innerRef,
      innerProps = props.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends$7({
    css: getStyles('option', props),
    className: cx({
      option: true,
      'option--is-disabled': isDisabled,
      'option--is-focused': isFocused,
      'option--is-selected': isSelected
    }, className),
    ref: innerRef
  }, innerProps), children);
};

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }
var placeholderCSS = function placeholderCSS(_ref) {
  var _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    label: 'placeholder',
    color: colors.neutral50,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  };
};

var Placeholder = function Placeholder(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends$8({
    css: getStyles('placeholder', props),
    className: cx({
      placeholder: true
    }, className)
  }, innerProps), children);
};

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }
var css$1 = function css(_ref) {
  var isDisabled = _ref.isDisabled,
      _ref$theme = _ref.theme,
      spacing = _ref$theme.spacing,
      colors = _ref$theme.colors;
  return {
    label: 'singleValue',
    color: isDisabled ? colors.neutral40 : colors.neutral80,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    maxWidth: "calc(100% - " + spacing.baseUnit * 2 + "px)",
    overflow: 'hidden',
    position: 'absolute',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    top: '50%',
    transform: 'translateY(-50%)'
  };
};

var SingleValue = function SingleValue(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      innerProps = props.innerProps;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", _extends$9({
    css: getStyles('singleValue', props),
    className: cx({
      'single-value': true,
      'single-value--is-disabled': isDisabled
    }, className)
  }, innerProps), children);
};

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }
var components = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu,
  MenuList: MenuList,
  MenuPortal: MenuPortal,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
};
var defaultComponents = function defaultComponents(props) {
  return _extends$a({}, components, props.components);
};




/***/ }),

/***/ "./node_modules/react-select/dist/react-select.browser.esm.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-select/dist/react-select.browser.esm.js ***!
  \********************************************************************/
/*! exports provided: components, createFilter, defaultTheme, mergeStyles, default, NonceProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonceProvider", function() { return NonceProvider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_06b0d5a4_browser_esm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils-06b0d5a4.browser.esm.js */ "./node_modules/react-select/dist/utils-06b0d5a4.browser.esm.js");
/* harmony import */ var _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index-4322c0ed.browser.esm.js */ "./node_modules/react-select/dist/index-4322c0ed.browser.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _index_4322c0ed_browser_esm_js__WEBPACK_IMPORTED_MODULE_6__["y"]; });

/* harmony import */ var _Select_9fdb8cd0_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Select-9fdb8cd0.browser.esm.js */ "./node_modules/react-select/dist/Select-9fdb8cd0.browser.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFilter", function() { return _Select_9fdb8cd0_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultTheme", function() { return _Select_9fdb8cd0_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeStyles", function() { return _Select_9fdb8cd0_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__["m"]; });

/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/css */ "./node_modules/@emotion/css/dist/css.browser.esm.js");
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-input-autosize */ "./node_modules/react-input-autosize/lib/AutosizeInput.js");
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_input_autosize__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _stateManager_04f734a2_browser_esm_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./stateManager-04f734a2.browser.esm.js */ "./node_modules/react-select/dist/stateManager-04f734a2.browser.esm.js");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/cache.browser.esm.js");














function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var NonceProvider =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(NonceProvider, _Component);

  function NonceProvider(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.createEmotionCache = function (nonce) {
      return Object(_emotion_cache__WEBPACK_IMPORTED_MODULE_11__["default"])({
        nonce: nonce
      });
    };

    _this.createEmotionCache = Object(memoize_one__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.createEmotionCache);
    return _this;
  }

  var _proto = NonceProvider.prototype;

  _proto.render = function render() {
    var emotionCache = this.createEmotionCache(this.props.nonce);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_emotion_core__WEBPACK_IMPORTED_MODULE_2__["CacheProvider"], {
      value: emotionCache
    }, this.props.children);
  };

  return NonceProvider;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var index = Object(_stateManager_04f734a2_browser_esm_js__WEBPACK_IMPORTED_MODULE_10__["m"])(_Select_9fdb8cd0_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__["S"]);

/* harmony default export */ __webpack_exports__["default"] = (index);



/***/ }),

/***/ "./node_modules/react-select/dist/stateManager-04f734a2.browser.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/react-select/dist/stateManager-04f734a2.browser.esm.js ***!
  \*****************************************************************************/
/*! exports provided: m */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return manageState; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }
var defaultProps = {
  defaultInputValue: '',
  defaultMenuIsOpen: false,
  defaultValue: null
};

var manageState = function manageState(SelectComponent) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(StateManager, _Component);

    function StateManager() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this;
      _this.select = void 0;
      _this.state = {
        inputValue: _this.props.inputValue !== undefined ? _this.props.inputValue : _this.props.defaultInputValue,
        menuIsOpen: _this.props.menuIsOpen !== undefined ? _this.props.menuIsOpen : _this.props.defaultMenuIsOpen,
        value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
      };

      _this.onChange = function (value, actionMeta) {
        _this.callProp('onChange', value, actionMeta);

        _this.setState({
          value: value
        });
      };

      _this.onInputChange = function (value, actionMeta) {
        // TODO: for backwards compatibility, we allow the prop to return a new
        // value, but now inputValue is a controllable prop we probably shouldn't
        var newValue = _this.callProp('onInputChange', value, actionMeta);

        _this.setState({
          inputValue: newValue !== undefined ? newValue : value
        });
      };

      _this.onMenuOpen = function () {
        _this.callProp('onMenuOpen');

        _this.setState({
          menuIsOpen: true
        });
      };

      _this.onMenuClose = function () {
        _this.callProp('onMenuClose');

        _this.setState({
          menuIsOpen: false
        });
      };

      return _this;
    }

    var _proto = StateManager.prototype;

    _proto.focus = function focus() {
      this.select.focus();
    };

    _proto.blur = function blur() {
      this.select.blur();
    } // FIXME: untyped flow code, return any
    ;

    _proto.getProp = function getProp(key) {
      return this.props[key] !== undefined ? this.props[key] : this.state[key];
    } // FIXME: untyped flow code, return any
    ;

    _proto.callProp = function callProp(name) {
      if (typeof this.props[name] === 'function') {
        var _this$props;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return (_this$props = this.props)[name].apply(_this$props, args);
      }
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          defaultInputValue = _this$props2.defaultInputValue,
          defaultMenuIsOpen = _this$props2.defaultMenuIsOpen,
          defaultValue = _this$props2.defaultValue,
          props = _objectWithoutPropertiesLoose(_this$props2, ["defaultInputValue", "defaultMenuIsOpen", "defaultValue"]);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SelectComponent, _extends({}, props, {
        ref: function ref(_ref) {
          _this2.select = _ref;
        },
        inputValue: this.getProp('inputValue'),
        menuIsOpen: this.getProp('menuIsOpen'),
        onChange: this.onChange,
        onInputChange: this.onInputChange,
        onMenuClose: this.onMenuClose,
        onMenuOpen: this.onMenuOpen,
        value: this.getProp('value')
      }));
    };

    return StateManager;
  }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]), _class.defaultProps = defaultProps, _temp;
};




/***/ }),

/***/ "./node_modules/react-select/dist/utils-06b0d5a4.browser.esm.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-select/dist/utils-06b0d5a4.browser.esm.js ***!
  \**********************************************************************/
/*! exports provided: a, b, c, d, e, f, g, h, i, j, k, n, s */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getScrollParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getScrollTop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return animatedScrollTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isMobileDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return cleanValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return scrollIntoView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getBoundingClientObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return classNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isTouchCapable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return isDocumentElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return handleInputChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return scrollTo; });
// ==============================
// NO OP
// ==============================
var noop = function noop() {};
// Class Name Prefixer
// ==============================

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/

function applyPrefixToName(prefix, name) {
  if (!name) {
    return prefix;
  } else if (name[0] === '-') {
    return prefix + name;
  } else {
    return prefix + '__' + name;
  }
}

function classNames(prefix, state, className) {
  var arr = [className];

  if (state && prefix) {
    for (var key in state) {
      if (state.hasOwnProperty(key) && state[key]) {
        arr.push("" + applyPrefixToName(prefix, key));
      }
    }
  }

  return arr.filter(function (i) {
    return i;
  }).map(function (i) {
    return String(i).trim();
  }).join(' ');
} // ==============================
// Clean Value
// ==============================

var cleanValue = function cleanValue(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'object' && value !== null) return [value];
  return [];
}; // ==============================
// Handle Input Change
// ==============================

function handleInputChange(inputValue, actionMeta, onInputChange) {
  if (onInputChange) {
    var newValue = onInputChange(inputValue, actionMeta);
    if (typeof newValue === 'string') return newValue;
  }

  return inputValue;
} // ==============================
// Scroll Helpers
// ==============================

function isDocumentElement(el) {
  return [document.documentElement, document.body, window].indexOf(el) > -1;
} // Normalized Scroll Top
// ------------------------------

function getScrollTop(el) {
  if (isDocumentElement(el)) {
    return window.pageYOffset;
  }

  return el.scrollTop;
}
function scrollTo(el, top) {
  // with a scroll distance, we perform scroll on the element
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
    return;
  }

  el.scrollTop = top;
} // Get Scroll Parent
// ------------------------------

function getScrollParent(element) {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === 'absolute';
  var overflowRx = /(auto|scroll)/;
  var docEl = document.documentElement; // suck it, flow...

  if (style.position === 'fixed') return docEl;

  for (var parent = element; parent = parent.parentElement;) {
    style = getComputedStyle(parent);

    if (excludeStaticParent && style.position === 'static') {
      continue;
    }

    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return docEl;
} // Animated Scroll To
// ------------------------------

/**
  @param t: time (elapsed)
  @param b: initial value
  @param c: amount of change
  @param d: duration
*/

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function animatedScrollTo(element, to, duration, callback) {
  if (duration === void 0) {
    duration = 200;
  }

  if (callback === void 0) {
    callback = noop;
  }

  var start = getScrollTop(element);
  var change = to - start;
  var increment = 10;
  var currentTime = 0;

  function animateScroll() {
    currentTime += increment;
    var val = easeOutCubic(currentTime, start, change, duration);
    scrollTo(element, val);

    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      callback(element);
    }
  }

  animateScroll();
} // Scroll Into View
// ------------------------------

function scrollIntoView(menuEl, focusedEl) {
  var menuRect = menuEl.getBoundingClientRect();
  var focusedRect = focusedEl.getBoundingClientRect();
  var overScroll = focusedEl.offsetHeight / 3;

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
} // ==============================
// Get bounding client object
// ==============================
// cannot get keys using array notation with DOMRect

function getBoundingClientObj(element) {
  var rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}
// Touch Capability Detector
// ==============================

function isTouchCapable() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
} // ==============================
// Mobile Device Detector
// ==============================

function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
}




/***/ }),

/***/ "./node_modules/upath/build/code/upath.js":
/*!************************************************!*\
  !*** ./node_modules/upath/build/code/upath.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* upath http://github.com/anodynos/upath/
*
* A proxy to `path`, replacing `\` with `/` for all results & new methods to normalize & join keeping leading `./` and add, change, default, trim file extensions.
* Version 1.2.0 - Compiled on 2019-09-02 23:33:57
* Repository git://github.com/anodynos/upath
* Copyright(c) 2019 Angelos Pikoulas <agelos.pikoulas@gmail.com>
* License MIT
*/

// Generated by uRequire v0.7.0-beta.33 target: 'lib' template: 'nodejs'


var VERSION = '1.2.0'; // injected by urequire-rc-inject-version

var extraFn, extraFunctions, isFunction, isString, isValidExt, name, path, propName, propValue, toUnix, upath, slice = [].slice, indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item)
        return i;
    }
    return -1;
  }, hasProp = {}.hasOwnProperty;
path = __webpack_require__(/*! path */ "path");
isFunction = function (val) {
  return val instanceof Function;
};
isString = function (val) {
  return typeof val === "string" || !!val && typeof val === "object" && Object.prototype.toString.call(val) === "[object String]";
};
upath = exports;
upath.VERSION = typeof VERSION !== "undefined" && VERSION !== null ? VERSION : "NO-VERSION";
toUnix = function (p) {
  var double;
  p = p.replace(/\\/g, "/");
  double = /\/\//;
  while (p.match(double)) {
    p = p.replace(double, "/");
  }
  return p;
};
for (propName in path) {
  propValue = path[propName];
  if (isFunction(propValue)) {
    upath[propName] = function (propName) {
      return function () {
        var args, result;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        args = args.map(function (p) {
          if (isString(p)) {
            return toUnix(p);
          } else {
            return p;
          }
        });
        result = path[propName].apply(path, args);
        if (isString(result)) {
          return toUnix(result);
        } else {
          return result;
        }
      };
    }(propName);
  } else {
    upath[propName] = propValue;
  }
}
upath.sep = "/";
extraFunctions = {
  toUnix: toUnix,
  normalizeSafe: function (p) {
    p = toUnix(p);
    if (p.startsWith("./")) {
      if (p.startsWith("./..") || p === "./") {
        return upath.normalize(p);
      } else {
        return "./" + upath.normalize(p);
      }
    } else {
      return upath.normalize(p);
    }
  },
  normalizeTrim: function (p) {
    p = upath.normalizeSafe(p);
    if (p.endsWith("/")) {
      return p.slice(0, +(p.length - 2) + 1 || 9000000000);
    } else {
      return p;
    }
  },
  joinSafe: function () {
    var p, result;
    p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    result = upath.join.apply(null, p);
    if (p[0].startsWith("./") && !result.startsWith("./")) {
      result = "./" + result;
    }
    return result;
  },
  addExt: function (file, ext) {
    if (!ext) {
      return file;
    } else {
      if (ext[0] !== ".") {
        ext = "." + ext;
      }
      return file + (file.endsWith(ext) ? "" : ext);
    }
  },
  trimExt: function (filename, ignoreExts, maxSize) {
    var oldExt;
    if (maxSize == null) {
      maxSize = 7;
    }
    oldExt = upath.extname(filename);
    if (isValidExt(oldExt, ignoreExts, maxSize)) {
      return filename.slice(0, +(filename.length - oldExt.length - 1) + 1 || 9000000000);
    } else {
      return filename;
    }
  },
  removeExt: function (filename, ext) {
    if (!ext) {
      return filename;
    } else {
      ext = ext[0] === "." ? ext : "." + ext;
      if (upath.extname(filename) === ext) {
        return upath.trimExt(filename);
      } else {
        return filename;
      }
    }
  },
  changeExt: function (filename, ext, ignoreExts, maxSize) {
    if (maxSize == null) {
      maxSize = 7;
    }
    return upath.trimExt(filename, ignoreExts, maxSize) + (!ext ? "" : ext[0] === "." ? ext : "." + ext);
  },
  defaultExt: function (filename, ext, ignoreExts, maxSize) {
    var oldExt;
    if (maxSize == null) {
      maxSize = 7;
    }
    oldExt = upath.extname(filename);
    if (isValidExt(oldExt, ignoreExts, maxSize)) {
      return filename;
    } else {
      return upath.addExt(filename, ext);
    }
  }
};
isValidExt = function (ext, ignoreExts, maxSize) {
  if (ignoreExts == null) {
    ignoreExts = [];
  }
  return ext && ext.length <= maxSize && indexOf.call(ignoreExts.map(function (e) {
    return (e && e[0] !== "." ? "." : "") + e;
  }), ext) < 0;
};
for (name in extraFunctions) {
  if (!hasProp.call(extraFunctions, name))
    continue;
  extraFn = extraFunctions[name];
  if (upath[name] !== void 0) {
    throw new Error("path." + name + " already exists.");
  } else {
    upath[name] = extraFn;
  }
}

;

/***/ })

}]);
//# sourceMappingURL=56.bundle.js.map