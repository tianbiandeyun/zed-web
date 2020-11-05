global.webpackJsonpMpvue([0],[
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// fix env
try {
  if (!global) global = {};
  global.process = global.process || {};
  global.process.env = global.process.env || {};
  global.App = global.App || App;
  global.Page = global.Page || Page;
  global.Component = global.Component || Component;
  global.getApp = global.getApp || getApp;

  if (typeof wx !== 'undefined') {
    global.mpvue = wx;
    global.mpvuePlatform = 'wx';
  } else if (typeof swan !== 'undefined') {
    global.mpvue = swan;
    global.mpvuePlatform = 'swan';
  }else if (typeof tt !== 'undefined') {
    global.mpvue = tt;
    global.mpvuePlatform = 'tt';
  }else if (typeof my !== 'undefined') {
    global.mpvue = my;
    global.mpvuePlatform = 'my';
  }
} catch (e) {}

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated', 'onLaunch',
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onTabItemTap',
  'attached',
  'ready',
  'moved',
  'detached'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;

var formatComponentName = (null); // work around flow check

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = ['mpvue-runtime'].join();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  // } else if (typeof MutationObserver !== 'undefined' && (
  //   isNative(MutationObserver) ||
  //   // PhantomJS and iOS 7.x
  //   MutationObserver.toString() === '[object MutationObserverConstructor]'
  // )) {
  //   // use MutationObserver where native Promise is not available,
  //   // e.g. PhantomJS IE11, iOS7, Android 4.4
  //   var counter = 1
  //   var observer = new MutationObserver(nextTickHandler)
  //   var textNode = document.createTextNode(String(counter))
  //   observer.observe(textNode, {
  //     characterData: true
  //   })
  //   timerFunc = () => {
  //     counter = (counter + 1) % 2
  //     textNode.data = String(counter)
  //   }
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value, key) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  if (key) {
    this.key = key;
  }
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData, key) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value, key);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val, undefined, key);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }

      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal, undefined, key);
      dep.notify();

      if (!obj.__keyPath) {
        def(obj, '__keyPath', {}, false);
      }
      obj.__keyPath[key] = true;
      if (newVal instanceof Object && !(newVal instanceof Array)) {
        // 标记是否是通过this.Obj = {} 赋值印发的改动，解决少更新问题#1305
        def(newVal, '__newReference', true, false);
      }
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  // Vue.set 添加对象属性，渲染时候把 val 传给小程序渲染
  if (!target.__keyPath) {
    def(target, '__keyPath', {}, false);
  }
  target.__keyPath[key] = true;
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  if (!target.__keyPath) {
    def(target, '__keyPath', {}, false);
  }
  // Vue.del 删除对象属性，渲染时候把这个属性设置为 undefined
  target.__keyPath[key] = 'del';
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var mark;
var measure;

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;


function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listensers hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs;
  vm.$listeners = listeners;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  "production" !== 'production' && checkOptionType(vm, 'computed');
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {}
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  "production" !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    
  }
}

function initWatch (vm, watch) {
  "production" !== 'production' && checkOptionType(vm, 'watch');
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (false) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // keep listeners
  var listeners = data.on;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, null, true);
    defineReactive$$1(vm, '$listeners', parentData && parentData.on, null, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp, Array];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.1';
Vue$3.mpvueVersion = '2.0.6';

/* globals renderer */



var isReservedTag = makeMap(
  'template,script,style,element,content,slot,link,meta,svg,view,' +
  'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,' +
  'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,' +
  'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
  'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
  true
);

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// Elements that you can, intentionally, leave open (and which close themselves)
// more flexable than web
var canBeLeftOpenTag = makeMap(
  'web,spinner,switch,video,textarea,canvas,' +
  'indicator,marquee,countdown',
  true
);

var isUnaryTag = makeMap(
  'embed,img,image,input,link,meta',
  true
);

function mustUseProp () { /* console.log('mustUseProp') */ }
function getTagNamespace () { /* console.log('getTagNamespace') */ }
function isUnknownElement () { /* console.log('isUnknownElement') */ }



function getComKey (vm) {
  return vm && vm.$attrs ? vm.$attrs['mpcomid'] : '0'
}

// 用于小程序的 event type 到 web 的 event
var eventTypeMap = {
  tap: ['tap', 'click'],
  touchstart: ['touchstart'],
  touchmove: ['touchmove'],
  touchcancel: ['touchcancel'],
  touchend: ['touchend'],
  longtap: ['longtap'],
  input: ['input'],
  blur: ['change', 'blur'],
  submit: ['submit'],
  focus: ['focus'],
  scrolltoupper: ['scrolltoupper'],
  scrolltolower: ['scrolltolower'],
  scroll: ['scroll']
};

/*  */

// import { namespaceMap } from 'mp/util/index'

var obj = {};

function createElement$1 (tagName, vnode) {
  return obj
}

function createElementNS (namespace, tagName) {
  return obj
}

function createTextNode (text) {
  return obj
}

function createComment (text) {
  return obj
}

function insertBefore (parentNode, newNode, referenceNode) {}

function removeChild (node, child) {}

function appendChild (node, child) {}

function parentNode (node) {
  return obj
}

function nextSibling (node) {
  return obj
}

function tagName (node) {
  return 'div'
}

function setTextContent (node, text) {
  return obj
}

function setAttribute (node, key, val) {
  return obj
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (false) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (false
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {}
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

// import baseModules from 'core/vdom/modules/index'
// const platformModules = []
// import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
// const modules = platformModules.concat(baseModules)
var modules = [ref];

var corePatch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

function patch () {
  corePatch.apply(this, arguments);
  this.$updateDataToMP();
}

function callHook$1 (vm, hook, params) {
  var handlers = vm.$options[hook];
  if (hook === 'onError' && handlers) {
    handlers = [handlers];
  } else if (hook === 'onPageNotFound' && handlers) {
    handlers = [handlers];
  }

  var ret;
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        ret = handlers[i].call(vm, params);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  // for child
  if (vm.$children.length) {
    vm.$children.forEach(function (v) { return callHook$1(v, hook, params); });
  }

  return ret
}

// mpType 小程序实例的类型，可能的值是 'app', 'page'
// rootVueVM 是 vue 的根组件实例，子组件中访问 this.$root 可得
function getGlobalData (app, rootVueVM) {
  var mp = rootVueVM.$mp;
  if (app && app.globalData) {
    mp.appOptions = app.globalData.appOptions;
  }
}

// 格式化 properties 属性，并给每个属性加上 observer 方法

// properties 的 一些类型 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
// properties: {
//   paramA: Number,
//   myProperty: { // 属性名
//     type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
//     value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
//     observer: function(newVal, oldVal, changedPath) {
//        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
//        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
//     }
//   },
// }

// props 的一些类型 https://cn.vuejs.org/v2/guide/components-props.html#ad
// props: {
//   // 基础的类型检查 (`null` 匹配任何类型)
//   propA: Number,
//   // 多个可能的类型
//   propB: [String, Number],
//   // 必填的字符串
//   propC: {
//     type: String,
//     required: true
//   },
//   // 带有默认值的数字
//   propD: {
//     type: Number,
//     default: 100
//   },
//   // 带有默认值的对象
//   propE: {
//     type: Object,
//     // 对象或数组且一定会从一个工厂函数返回默认值
//     default: function () {
//       return { message: 'hello' }
//     }
//   },
//   // 自定义验证函数
//   propF: {
//     validator: function (value) {
//       // 这个值必须匹配下列字符串中的一个
//       return ['success', 'warning', 'danger'].indexOf(value) !== -1
//     }
//   }
// }

// core/util/options
function normalizeProps$1 (props, res, vm) {
  if (!props) { return }
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }

  // fix vueProps to properties
  for (var key$1 in res) {
    if (res.hasOwnProperty(key$1)) {
      var item = res[key$1];
      if (item.default) {
        item.value = item.default;
      }
      var oldObserver = item.observer;
      item.observer = function (newVal, oldVal) {
        vm[name] = newVal;
        // 先修改值再触发原始的 observer，跟 watch 行为保持一致
        if (typeof oldObserver === 'function') {
          oldObserver.call(vm, newVal, oldVal);
        }
      };
    }
  }

  return res
}

function normalizeProperties (vm) {
  var properties = vm.$options.properties;
  var vueProps = vm.$options.props;
  var res = {};

  normalizeProps$1(properties, res, vm);
  normalizeProps$1(vueProps, res, vm);

  return res
}

/**
 * 把 properties 中的属性 proxy 到 vm 上
 */
function initMpProps (vm) {
  var mpProps = vm._mpProps = {};
  var keys = Object.keys(vm.$options.properties || {});
  keys.forEach(function (key) {
    if (!(key in vm)) {
      proxy(vm, '_mpProps', key);
      mpProps[key] = undefined; // for observe
    }
  });
  observe(mpProps, true);
}

function initMP (mpType, next) {
  var rootVueVM = this.$root;
  if (!rootVueVM.$mp) {
    rootVueVM.$mp = {};
  }

  var mp = rootVueVM.$mp;

  // Please do not register multiple Pages
  // if (mp.registered) {
  if (mp.status) {
    // 处理子组件的小程序生命周期
    if (mpType === 'app') {
      callHook$1(this, 'onLaunch', mp.appOptions);
    } else {
      callHook$1(this, 'onLoad', mp.query);
      callHook$1(this, 'onReady');
    }
    return next()
  }
  // mp.registered = true

  mp.mpType = mpType;
  mp.status = 'register';

  if (mpType === 'app') {
    global.App({
      // 页面的初始数据
      globalData: {
        appOptions: {}
      },

      handleProxy: function handleProxy (e) {
        return rootVueVM.$handleProxyWithVue(e)
      },

      // Do something initial when launch.
      onLaunch: function onLaunch (options) {
        if ( options === void 0 ) options = {};

        mp.app = this;
        mp.status = 'launch';
        this.globalData.appOptions = mp.appOptions = options;
        callHook$1(rootVueVM, 'onLaunch', options);
        next();
      },

      // Do something when app show.
      onShow: function onShow (options) {
        if ( options === void 0 ) options = {};

        mp.status = 'show';
        this.globalData.appOptions = mp.appOptions = options;
        callHook$1(rootVueVM, 'onShow', options);
      },

      // Do something when app hide.
      onHide: function onHide () {
        mp.status = 'hide';
        callHook$1(rootVueVM, 'onHide');
      },

      onError: function onError (err) {
        callHook$1(rootVueVM, 'onError', err);
      },

      onPageNotFound: function onPageNotFound (err) {
        callHook$1(rootVueVM, 'onPageNotFound', err);
      }
    });
  } else if (mpType === 'component') {
    initMpProps(rootVueVM);

    global.Component({
      // 小程序原生的组件属性
      properties: normalizeProperties(rootVueVM),
      // 页面的初始数据
      data: {
        $root: {}
      },
      methods: {
        handleProxy: function handleProxy (e) {
          return rootVueVM.$handleProxyWithVue(e)
        }
      },
      // mp lifecycle for vue
      // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
      created: function created () {
        mp.status = 'created';
        mp.page = this;
      },
      // 组件生命周期函数，在组件实例进入页面节点树时执行
      attached: function attached () {
        mp.status = 'attached';
        callHook$1(rootVueVM, 'attached');
      },
      // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
      ready: function ready () {
        mp.status = 'ready';

        callHook$1(rootVueVM, 'ready');
        next();

        // 只有页面需要 setData
        rootVueVM.$nextTick(function () {
          rootVueVM._initDataToMP();
        });
      },
      // 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
      moved: function moved () {
        callHook$1(rootVueVM, 'moved');
      },
      // 组件生命周期函数，在组件实例被从页面节点树移除时执行
      detached: function detached () {
        mp.status = 'detached';
        callHook$1(rootVueVM, 'detached');
      }
    });
  } else {
    var app = global.getApp();
    global.Page({
      // 页面的初始数据
      data: {
        $root: {}
      },

      handleProxy: function handleProxy (e) {
        return rootVueVM.$handleProxyWithVue(e)
      },

      // mp lifecycle for vue
      // 生命周期函数--监听页面加载
      onLoad: function onLoad (query) {
        mp.page = this;
        mp.query = query;
        mp.status = 'load';
        getGlobalData(app, rootVueVM);
        callHook$1(rootVueVM, 'onLoad', query);
      },

      // 生命周期函数--监听页面显示
      onShow: function onShow () {
        mp.page = this;
        mp.status = 'show';
        callHook$1(rootVueVM, 'onShow');

        // 只有页面需要 setData
        rootVueVM.$nextTick(function () {
          rootVueVM._initDataToMP();
        });
      },

      // 生命周期函数--监听页面初次渲染完成
      onReady: function onReady () {
        mp.status = 'ready';

        callHook$1(rootVueVM, 'onReady');
        next();
      },

      // 生命周期函数--监听页面隐藏
      onHide: function onHide () {
        mp.status = 'hide';
        callHook$1(rootVueVM, 'onHide');
        mp.page = null;
      },

      // 生命周期函数--监听页面卸载
      onUnload: function onUnload () {
        mp.status = 'unload';
        callHook$1(rootVueVM, 'onUnload');
        mp.page = null;
      },

      // 页面相关事件处理函数--监听用户下拉动作
      onPullDownRefresh: function onPullDownRefresh () {
        callHook$1(rootVueVM, 'onPullDownRefresh');
      },

      // 页面上拉触底事件的处理函数
      onReachBottom: function onReachBottom () {
        callHook$1(rootVueVM, 'onReachBottom');
      },

      // 用户点击右上角分享
      onShareAppMessage: rootVueVM.$options.onShareAppMessage
        ? function (options) { return callHook$1(rootVueVM, 'onShareAppMessage', options); } : null,

      // Do something when page scroll
      onPageScroll: function onPageScroll (options) {
        callHook$1(rootVueVM, 'onPageScroll', options);
      },

      // 当前是 tab 页时，点击 tab 时触发
      onTabItemTap: function onTabItemTap (options) {
        callHook$1(rootVueVM, 'onTabItemTap', options);
      }
    });
  }
}

var updateDataTotal = 0; // 总共更新的数据量
function diffLog (updateData) {
  updateData = JSON.stringify(updateData);
  if (!Vue$3._mpvueTraceTimer) {
    Vue$3._mpvueTraceTimer = setTimeout(function () {
      clearTimeout(Vue$3._mpvueTraceTimer);
      updateDataTotal = (updateDataTotal / 1024).toFixed(1);
      console.log('这次操作引发500ms内数据更新量:' + updateDataTotal + 'kb');
      Vue$3._mpvueTraceTimer = 0;
      updateDataTotal = 0;
    }, 500);
  } else if (Vue$3._mpvueTraceTimer) {
    updateData = updateData.replace(/[^\u0000-\u00ff]/g, 'aa'); // 中文占2字节，中文替换成两个字母计算占用空间
    updateDataTotal += updateData.length;
  }
}

var KEY_SEP$1 = '_';

function getDeepData (keyList, viewData) {
  if (keyList.length > 1) {
    var _key = keyList.splice(0, 1);
    var _viewData = viewData[_key];
    if (_viewData) {
      return getDeepData(keyList, _viewData)
    } else {
      return null
    }
  } else {
    if (viewData[keyList[0]]) {
      return viewData[keyList[0]]
    } else {
      return null
    }
  }
}

function compareAndSetDeepData (key, newData, vm, data, forceUpdate) {
  // 比较引用类型数据
  try {
    var keyList = key.split('.');
    // page.__viewData__老版小程序不存在，使用mpvue里绑的data比对
    var oldData = getDeepData(keyList, vm.$root.$mp.page.data);
    if (oldData === null || JSON.stringify(oldData) !== JSON.stringify(newData) || forceUpdate) {
      data[key] = newData;
    } else {
      var keys = Object.keys(oldData);
      keys.forEach(function (_key) {
        var properties = Object.getOwnPropertyDescriptor(oldData, _key);
        if (!properties['get'] && !properties['set']) {
          data[key + '.' + _key] = newData[_key];
        }
      });
    }
  } catch (e) {
    console.log(e, key, newData, vm);
  }
}

function cleanKeyPath (vm) {
  if (vm.__mpKeyPath) {
    Object.keys(vm.__mpKeyPath).forEach(function (_key) {
      delete vm.__mpKeyPath[_key]['__keyPath'];
    });
  }
}

function minifyDeepData (rootKey, originKey, vmData, data, _mpValueSet, vm) {
  try {
    if (vmData instanceof Array) {
       // 数组
      compareAndSetDeepData(rootKey + '.' + originKey, vmData, vm, data, true);
    } else {
      // Object
      var _keyPathOnThis = {}; // 存储这层对象的keyPath
      if (vmData.__keyPath && !vmData.__newReference) {
        // 有更新列表 ，按照更新列表更新
        _keyPathOnThis = vmData.__keyPath;
        Object.keys(vmData).forEach(function (_key) {
          if (vmData[_key] instanceof Object) {
            // 引用类型 递归
            if (_key === '__keyPath') {
              return
            }
            minifyDeepData(rootKey + '.' + originKey, _key, vmData[_key], data, null, vm);
          } else {
            // 更新列表中的 加入data
            if (_keyPathOnThis[_key] === true) {
              if (originKey) {
                data[rootKey + '.' + originKey + '.' + _key] = vmData[_key];
              } else {
                data[rootKey + '.' + _key] = vmData[_key];
              }
            }
          }
        });
         // 根节点可能有父子引用同一个引用类型数据，依赖树都遍历完后清理
        vm['__mpKeyPath'] = vm['__mpKeyPath'] || {};
        vm['__mpKeyPath'][vmData.__ob__.dep.id] = vmData;
      } else {
        // 没有更新列表
        compareAndSetDeepData(rootKey + '.' + originKey, vmData, vm, data);
      }
      // 标记是否是通过this.Obj = {} 赋值印发的改动，解决少更新问题#1305
      def(vmData, '__newReference', false, false);
    }
  } catch (e) {
    console.log(e, rootKey, originKey, vmData, data);
  }
}

function getRootKey (vm, rootKey) {
  if (!vm.$parent.$attrs) {
    rootKey = '$root.0' + KEY_SEP$1 + rootKey;
    return rootKey
  } else {
    rootKey = vm.$parent.$attrs.mpcomid + KEY_SEP$1 + rootKey;
    return getRootKey(vm.$parent, rootKey)
  }
}

function diffData (vm, data) {
  var vmData = vm._data || {};
  var vmProps = vm._props || {};
  var rootKey = '';
  if (!vm.$attrs) {
    rootKey = '$root.0';
  } else {
    rootKey = getRootKey(vm, vm.$attrs.mpcomid);
  }
  Vue$3.nextTick(function () {
    cleanKeyPath(vm);
  });
  // console.log(rootKey)

  // 值类型变量不考虑优化，还是直接更新
  var __keyPathOnThis = vmData.__keyPath || vm.__keyPath || {};
  delete vm.__keyPath;
  delete vmData.__keyPath;
  delete vmProps.__keyPath;
  if (vm._mpValueSet === 'done') {
    // 第二次赋值才进行缩减操作
    Object.keys(vmData).forEach(function (vmDataItemKey) {
      if (vmData[vmDataItemKey] instanceof Object) {
        // 引用类型
        minifyDeepData(rootKey, vmDataItemKey, vmData[vmDataItemKey], data, vm._mpValueSet, vm);
      } else if (vmData[vmDataItemKey] !== undefined) {
        // _data上的值属性只有要更新的时候才赋值
        if (__keyPathOnThis[vmDataItemKey] === true) {
          data[rootKey + '.' + vmDataItemKey] = vmData[vmDataItemKey];
        }
      }
    });

    Object.keys(vmProps).forEach(function (vmPropsItemKey) {
      if (vmProps[vmPropsItemKey] instanceof Object) {
        // 引用类型
        minifyDeepData(rootKey, vmPropsItemKey, vmProps[vmPropsItemKey], data, vm._mpValueSet, vm);
      } else if (vmProps[vmPropsItemKey] !== undefined) {
        data[rootKey + '.' + vmPropsItemKey] = vmProps[vmPropsItemKey];
      }
      // _props上的值属性只有要更新的时候才赋值
    });

    // 检查完data和props,最后补上_mpProps & _computedWatchers
    var vmMpProps = vm._mpProps || {};
    var vmComputedWatchers = vm._computedWatchers || {};
    Object.keys(vmMpProps).forEach(function (mpItemKey) {
      data[rootKey + '.' + mpItemKey] = vm[mpItemKey];
    });
    Object.keys(vmComputedWatchers).forEach(function (computedItemKey) {
      data[rootKey + '.' + computedItemKey] = vm[computedItemKey];
    });
    // 更新的时候要删除$root.0:{},否则会覆盖原正确数据
    delete data[rootKey];
  }
  if (vm._mpValueSet === undefined) {
    // 第一次设置数据成功后，标记位置true,再更新到这个节点如果没有keyPath数组认为不需要更新
    vm._mpValueSet = 'done';
  }
  if (Vue$3.config._mpTrace) {
    // console.log('更新VM节点', vm)
    // console.log('实际传到Page.setData数据', data)
    diffLog(data);
  }
}

// 节流方法，性能优化
// 全局的命名约定，为了节省编译的包大小一律采取形象的缩写，说明如下。
// $c === $child
// $k === $comKey

// 新型的被拍平的数据结构
// {
//   $root: {
//     '1-1'{
//       // ... data
//     },
//     '1.2-1': {
//       // ... data1
//     },
//     '1.2-2': {
//       // ... data2
//     }
//   }
// }

var KEY_SEP = '_';

function getVmData (vm) {
  // 确保当前 vm 所有数据被同步
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._props || {}),
    Object.keys(vm._mpProps || {}),
    Object.keys(vm._computedWatchers || {})
  );
  return dataKeys.reduce(function (res, key) {
    res[key] = vm[key];
    return res
  }, {})
}

function getParentComKey (vm, res) {
  if ( res === void 0 ) res = [];

  var ref = vm || {};
  var $parent = ref.$parent;
  if (!$parent) { return res }
  res.unshift(getComKey($parent));
  if ($parent.$parent) {
    return getParentComKey($parent, res)
  }
  return res
}

function formatVmData (vm) {
  var $p = getParentComKey(vm).join(KEY_SEP);
  var $k = $p + ($p ? KEY_SEP : '') + getComKey(vm);

  // getVmData 这儿获取当前组件内的所有数据，包含 props、computed 的数据
  // 改动 vue.runtime 所获的的核心能力
  var data = Object.assign(getVmData(vm), { $k: $k, $kk: ("" + $k + KEY_SEP), $p: $p });
  var key = '$root.' + $k;
  var res = {};
  res[key] = data;
  return res
}

function collectVmData (vm, res) {
  if ( res === void 0 ) res = {};

  var vms = vm.$children;
  if (vms && vms.length) {
    vms.forEach(function (v) { return collectVmData(v, res); });
  }
  return Object.assign(res, formatVmData(vm))
}

/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 * 自动合并 data
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
function throttle (func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 上次执行时间点
  var previous = 0;
  if (!options) { options = {}; }
  // 延迟执行函数
  function later () {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) { context = args = null; }
  }
  return function (handle, data) {
    var now = Date.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) { previous = now; }
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    context = this;
    args = args ? [handle, Object.assign(args[1], data)] : [handle, data];
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) { context = args = null; }
    // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result
  }
}

// 优化频繁的 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
var throttleSetData = throttle(function (handle, data) {
  handle(data);
}, 50);

function getPage (vm) {
  var rootVueVM = vm.$root;
  var ref = rootVueVM.$mp || {};
  var mpType = ref.mpType; if ( mpType === void 0 ) mpType = '';
  var page = ref.page;

  // 优化后台态页面进行 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
  if (mpType === 'app' || !page || typeof page.setData !== 'function') {
    return
  }
  return page
}

// 优化js变量动态变化时候引起全量更新
// 优化每次 setData 都传递大量新数据
function updateDataToMP () {
  var page = getPage(this);
  if (!page) {
    return
  }

  var data = formatVmData(this);
  diffData(this, data);
  throttleSetData(page.setData.bind(page), data);
}

function initDataToMP () {
  var page = getPage(this);
  if (!page) {
    return
  }

  var data = collectVmData(this.$root);
  page.setData(data);
}

// 虚拟dom的compid与真实dom的comkey匹配，多层嵌套的先补齐虚拟dom的compid直到完全匹配为止
function isVmKeyMatchedCompkey (k, comkey) {
  if (!k || !comkey) {
    return false
  }
  // 完全匹配 comkey = '1_0_1', k = '1_0_1'
  // 部分匹配 comkey = '1_0_10_1', k = '1_0_10'
  // k + KEY_SEP防止k = '1_0_1'误匹配comkey = '1_0_10_1'
  return comkey === k || comkey.indexOf(k + KEY_SEP$2) === 0
}

function getVM (vm, comkeys) {
  if ( comkeys === void 0 ) comkeys = [];

  var keys = comkeys.slice(1);
  if (!keys.length) { return vm }

  // bugfix #1375: 虚拟dom的compid和真实dom的comkey在组件嵌套时匹配出错，comid会丢失前缀，需要从父节点补充
  var comkey = keys.join(KEY_SEP$2);
  var comidPrefix = '';
  return keys.reduce(function (res, key) {
    var len = res.$children.length;
    for (var i = 0; i < len; i++) {
      var v = res.$children[i];
      var k = getComKey(v);
      if (comidPrefix) {
        k = comidPrefix + KEY_SEP$2 + k;
      }
      // 找到匹配的父节点
      if (isVmKeyMatchedCompkey(k, comkey)) {
        comidPrefix = k;
        res = v;
        return res
      }
    }
    return res
  }, vm)
}

function getHandle (vnode, eventid, eventTypes) {
  if ( eventTypes === void 0 ) eventTypes = [];

  var res = [];
  if (!vnode || !vnode.tag) {
    return res
  }

  var ref = vnode || {};
  var data = ref.data; if ( data === void 0 ) data = {};
  var children = ref.children; if ( children === void 0 ) children = [];
  var componentInstance = ref.componentInstance;
  if (componentInstance) {
    // 增加 slot 情况的处理
    // Object.values 会多增加几行编译后的代码
    Object.keys(componentInstance.$slots).forEach(function (slotKey) {
      var slot = componentInstance.$slots[slotKey];
      var slots = Array.isArray(slot) ? slot : [slot];
      slots.forEach(function (node) {
        res = res.concat(getHandle(node, eventid, eventTypes));
      });
    });
  } else {
    // 避免遍历超出当前组件的 vm
    children.forEach(function (node) {
      res = res.concat(getHandle(node, eventid, eventTypes));
    });
  }

  var attrs = data.attrs;
  var on = data.on;
  if (attrs && on && attrs['eventid'] === eventid) {
    eventTypes.forEach(function (et) {
      var h = on[et];
      if (typeof h === 'function') {
        res.push(h);
      } else if (Array.isArray(h)) {
        res = res.concat(h);
      }
    });
    return res
  }

  return res
}

function getWebEventByMP (e) {
  var type = e.type;
  var timeStamp = e.timeStamp;
  var touches = e.touches;
  var detail = e.detail; if ( detail === void 0 ) detail = {};
  var target = e.target; if ( target === void 0 ) target = {};
  var currentTarget = e.currentTarget; if ( currentTarget === void 0 ) currentTarget = {};
  var x = detail.x;
  var y = detail.y;
  var event = {
    mp: e,
    type: type,
    timeStamp: timeStamp,
    x: x,
    y: y,
    target: Object.assign({}, target, detail),
    currentTarget: currentTarget,
    stopPropagation: noop,
    preventDefault: noop
  };

  if (touches && touches.length) {
    Object.assign(event, touches[0]);
    event.touches = touches;
  }
  return event
}

var KEY_SEP$2 = '_';
function handleProxyWithVue (e) {
  var rootVueVM = this.$root;
  var type = e.type;
  var target = e.target; if ( target === void 0 ) target = {};
  var currentTarget = e.currentTarget;
  var ref = currentTarget || target;
  var dataset = ref.dataset; if ( dataset === void 0 ) dataset = {};
  var comkey = dataset.comkey; if ( comkey === void 0 ) comkey = '';
  var eventid = dataset.eventid;
  var vm = getVM(rootVueVM, comkey.split(KEY_SEP$2));

  if (!vm) {
    return
  }

  var webEventTypes = eventTypeMap[type] || [type];
  var handles = getHandle(vm._vnode, eventid, webEventTypes);

  // TODO, enevt 还需要处理更多
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Event
  if (handles.length) {
    var event = getWebEventByMP(e);
    if (handles.length === 1) {
      var result = handles[0](event);
      return result
    }
    handles.forEach(function (h) { return h(event); });
  }
}

// for platforms
// import config from 'core/config'
// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform patch function
Vue$3.prototype.__patch__ = patch;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  var this$1 = this;

  // el = el && inBrowser ? query(el) : undefined
  // return mountComponent(this, el, hydrating)

  // 初始化小程序生命周期相关
  var options = this.$options;

  if (options && (options.render || options.mpType)) {
    var mpType = options.mpType; if ( mpType === void 0 ) mpType = 'page';
    return this._initMP(mpType, function () {
      return mountComponent(this$1, undefined, undefined)
    })
  } else {
    return mountComponent(this, undefined, undefined)
  }
};

// for mp
Vue$3.prototype._initMP = initMP;

Vue$3.prototype.$updateDataToMP = updateDataToMP;
Vue$3.prototype._initDataToMP = initDataToMP;

Vue$3.prototype.$handleProxyWithVue = handleProxyWithVue;

/*  */

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export Store */
/* unused harmony export createLogger */
/* unused harmony export createNamespacedHelpers */
/* unused harmony export install */
/* unused harmony export mapActions */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapGetters; });
/* unused harmony export mapMutations */
/* unused harmony export mapState */
/*!
 * vuex v3.5.1
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ("development" !== 'production') &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (("development" !== 'production') && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (("development" !== 'production') && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (("development" !== 'production') && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (("development" !== 'production') && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (("development" !== 'production') && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (("development" !== 'production') && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (("development" !== 'production') && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (("development" !== 'production') && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index = {
  Store: Store,
  install: install,
  version: '3.5.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

/* harmony default export */ __webpack_exports__["a"] = (index);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(42)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(59);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(112);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(23);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKtitleNotice_vue__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_4cf8fd7a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKtitleNotice_vue__ = __webpack_require__(127);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(125)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4cf8fd7a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKtitleNotice_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_4cf8fd7a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKtitleNotice_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_title_notice/CKtitleNotice.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKtitleNotice.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4cf8fd7a", Component.options)
  } else {
    hotAPI.reload("data-v-4cf8fd7a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(45)('wks');
var uid = __webpack_require__(46);
var Symbol = __webpack_require__(7).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var core = __webpack_require__(8);
var ctx = __webpack_require__(14);
var hide = __webpack_require__(13);
var has = __webpack_require__(19);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(28)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(15);
var createDesc = __webpack_require__(30);
module.exports = __webpack_require__(12) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(18);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(78);
var toPrimitive = __webpack_require__(79);
var dP = Object.defineProperty;

exports.f = __webpack_require__(12) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(44);
var defined = __webpack_require__(26);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKbutton_vue__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_7dc384c5_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKbutton_vue__ = __webpack_require__(142);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(140)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7dc384c5"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKbutton_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_7dc384c5_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKbutton_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_button/CKbutton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKbutton.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7dc384c5", Component.options)
  } else {
    hotAPI.reload("data-v-7dc384c5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(77)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(43)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
var document = __webpack_require__(7).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(84);
var enumBugKeys = __webpack_require__(47);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(25);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(45)('keys');
var uid = __webpack_require__(46);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(15).f;
var has = __webpack_require__(19);
var TAG = __webpack_require__(9)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(26);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(50);
var ITERATOR = __webpack_require__(9)('iterator');
var Iterators = __webpack_require__(17);
module.exports = __webpack_require__(8).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(18);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKtaskList_vue__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_32f9f904_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKtaskList_vue__ = __webpack_require__(139);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(137)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-32f9f904"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKtaskList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_32f9f904_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKtaskList_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_task_list/CKtaskList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKtaskList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32f9f904", Component.options)
  } else {
    hotAPI.reload("data-v-32f9f904", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(149), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsHeader_vue__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_845778b0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsHeader_vue__ = __webpack_require__(202);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(200)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-845778b0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsHeader_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_845778b0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsHeader_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_details/CKdetailsHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKdetailsHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-845778b0", Component.options)
  } else {
    hotAPI.reload("data-v-845778b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsContent_vue__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_bce43424_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsContent_vue__ = __webpack_require__(205);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(203)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-bce43424"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsContent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_bce43424_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsContent_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_details/CKdetailsContent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKdetailsContent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bce43424", Component.options)
  } else {
    hotAPI.reload("data-v-bce43424", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return typeof global !== 'undefined' ? global : this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(27);
var $export = __webpack_require__(11);
var redefine = __webpack_require__(80);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(17);
var $iterCreate = __webpack_require__(81);
var setToStringTag = __webpack_require__(34);
var getPrototypeOf = __webpack_require__(87);
var ITERATOR = __webpack_require__(9)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(8);
var global = __webpack_require__(7);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(27) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 46 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(7).document;
module.exports = document && document.documentElement;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88);
var global = __webpack_require__(7);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(17);
var TO_STRING_TAG = __webpack_require__(9)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(9)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(10);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(17);
var ITERATOR = __webpack_require__(9)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(10);
var aFunction = __webpack_require__(18);
var SPECIES = __webpack_require__(9)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(14);
var invoke = __webpack_require__(94);
var html = __webpack_require__(48);
var cel = __webpack_require__(29);
var global = __webpack_require__(7);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var isObject = __webpack_require__(16);
var newPromiseCapability = __webpack_require__(37);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(9)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKnoticeList_vue__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_28c38faa_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKnoticeList_vue__ = __webpack_require__(119);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(114)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKnoticeList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_28c38faa_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKnoticeList_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_notice_list/CKnoticeList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKnoticeList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28c38faa", Component.options)
  } else {
    hotAPI.reload("data-v-28c38faa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKaddMember_vue__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_5d0d54c4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKaddMember_vue__ = __webpack_require__(160);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(158)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKaddMember_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_5d0d54c4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKaddMember_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_add_member/CKaddMember.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKaddMember.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d0d54c4", Component.options)
  } else {
    hotAPI.reload("data-v-5d0d54c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsDisagree_vue__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_6b8832b9_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsDisagree_vue__ = __webpack_require__(208);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(206)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6b8832b9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsDisagree_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_6b8832b9_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsDisagree_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_details/CKdetailsDisagree.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKdetailsDisagree.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b8832b9", Component.options)
  } else {
    hotAPI.reload("data-v-6b8832b9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsDate_vue__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_175b85ee_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsDate_vue__ = __webpack_require__(211);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(209)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-175b85ee"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsDate_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_175b85ee_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsDate_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_details/CKdetailsDate.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKdetailsDate.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-175b85ee", Component.options)
  } else {
    hotAPI.reload("data-v-175b85ee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsUserList_vue__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_f8ac7d38_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsUserList_vue__ = __webpack_require__(214);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(212)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f8ac7d38"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsUserList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_f8ac7d38_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsUserList_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_details/CKdetailsUserList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKdetailsUserList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f8ac7d38", Component.options)
  } else {
    hotAPI.reload("data-v-f8ac7d38", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsOperatButton_vue__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_b9c17524_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsOperatButton_vue__ = __webpack_require__(217);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(215)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b9c17524"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsOperatButton_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_b9c17524_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsOperatButton_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_details/CKdetailsOperatButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKdetailsOperatButton.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b9c17524", Component.options)
  } else {
    hotAPI.reload("data-v-b9c17524", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsReviewResult_vue__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_a2f34f20_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsReviewResult_vue__ = __webpack_require__(220);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(218)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a2f34f20"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKdetailsReviewResult_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_a2f34f20_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKdetailsReviewResult_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_details/CKdetailsReviewResult.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKdetailsReviewResult.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a2f34f20", Component.options)
  } else {
    hotAPI.reload("data-v-a2f34f20", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
__webpack_require__(24);
__webpack_require__(49);
__webpack_require__(91);
__webpack_require__(99);
__webpack_require__(100);
module.exports = __webpack_require__(8).Promise;


/***/ }),
/* 76 */
/***/ (function(module, exports) {



/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var defined = __webpack_require__(26);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(12) && !__webpack_require__(28)(function () {
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(82);
var descriptor = __webpack_require__(30);
var setToStringTag = __webpack_require__(34);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(9)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(83);
var enumBugKeys = __webpack_require__(47);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(48).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(15);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(31);

module.exports = __webpack_require__(12) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(19);
var toIObject = __webpack_require__(20);
var arrayIndexOf = __webpack_require__(85)(false);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(20);
var toLength = __webpack_require__(32);
var toAbsoluteIndex = __webpack_require__(86);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(19);
var toObject = __webpack_require__(35);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(89);
var step = __webpack_require__(90);
var Iterators = __webpack_require__(17);
var toIObject = __webpack_require__(20);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(43)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(27);
var global = __webpack_require__(7);
var ctx = __webpack_require__(14);
var classof = __webpack_require__(50);
var $export = __webpack_require__(11);
var isObject = __webpack_require__(16);
var aFunction = __webpack_require__(18);
var anInstance = __webpack_require__(92);
var forOf = __webpack_require__(93);
var speciesConstructor = __webpack_require__(53);
var task = __webpack_require__(54).set;
var microtask = __webpack_require__(95)();
var newPromiseCapabilityModule = __webpack_require__(37);
var perform = __webpack_require__(55);
var userAgent = __webpack_require__(96);
var promiseResolve = __webpack_require__(56);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(9)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(97)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(34)($Promise, PROMISE);
__webpack_require__(98)(PROMISE);
Wrapper = __webpack_require__(8)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(57)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(14);
var call = __webpack_require__(51);
var isArrayIter = __webpack_require__(52);
var anObject = __webpack_require__(10);
var toLength = __webpack_require__(32);
var getIterFn = __webpack_require__(36);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 94 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var macrotask = __webpack_require__(54).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(7);
var core = __webpack_require__(8);
var dP = __webpack_require__(15);
var DESCRIPTORS = __webpack_require__(12);
var SPECIES = __webpack_require__(9)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(11);
var core = __webpack_require__(8);
var global = __webpack_require__(7);
var speciesConstructor = __webpack_require__(53);
var promiseResolve = __webpack_require__(56);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(11);
var newPromiseCapability = __webpack_require__(37);
var perform = __webpack_require__(55);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
module.exports = __webpack_require__(8).Object.assign;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(11);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(103) });


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(12);
var getKeys = __webpack_require__(31);
var gOPS = __webpack_require__(104);
var pIE = __webpack_require__(60);
var toObject = __webpack_require__(35);
var IObject = __webpack_require__(44);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(28)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 104 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 105 */,
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    type: function type(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase();
    },
    isObject: function isObject(ob, real) {
        if (real) {
            return this.type(ob) === "object";
        } else {
            return ob && (typeof ob === 'undefined' ? 'undefined' : _typeof(ob)) === 'object';
        }
    },
    isFormData: function isFormData(val) {
        return typeof FormData !== 'undefined' && val instanceof FormData;
    },
    trim: function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    encode: function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    },
    formatParams: function formatParams(data) {
        var str = "";
        var first = true;
        var that = this;
        if (!this.isObject(data)) {
            return data;
        }

        function _encode(sub, path) {
            var encode = that.encode;
            var type = that.type(sub);
            if (type == "array") {
                sub.forEach(function (e, i) {
                    if (!that.isObject(e)) i = "";
                    _encode(e, path + ('%5B' + i + '%5D'));
                });
            } else if (type == "object") {
                for (var key in sub) {
                    if (path) {
                        _encode(sub[key], path + "%5B" + encode(key) + "%5D");
                    } else {
                        _encode(sub[key], encode(key));
                    }
                }
            } else {
                if (!first) {
                    str += "&";
                }
                first = false;
                str += path + "=" + encode(sub);
            }
        }

        _encode(data, "");
        return str;
    },

    // Do not overwrite existing attributes
    merge: function merge(a, b) {
        for (var key in b) {
            if (!a.hasOwnProperty(key)) {
                a[key] = b[key];
            } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                this.merge(a[key], b[key]);
            }
        }
        return a;
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * author: wendu
 * email: 824783146@qq.com
 **/

var util = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

//EngineWrapper can help  generating  a  http engine quickly through a adapter
function EngineWrapper(adapter) {
    var AjaxEngine = function () {
        function AjaxEngine() {
            _classCallCheck(this, AjaxEngine);

            this.requestHeaders = {};
            this.readyState = 0;
            this.timeout = 0; // 0 stands for no timeout
            this.responseURL = "";
            this.responseHeaders = {};
        }

        _createClass(AjaxEngine, [{
            key: "_call",
            value: function _call(name) {
                this[name] && this[name].apply(this, [].splice.call(arguments, 1));
            }
        }, {
            key: "_changeReadyState",
            value: function _changeReadyState(state) {
                this.readyState = state;
                this._call("onreadystatechange");
            }
        }, {
            key: "open",
            value: function open(method, url) {
                this.method = method;
                if (!url) {
                    url = location.href;
                } else {
                    url = util.trim(url);
                    if (url.indexOf("http") !== 0) {
                        // Normalize the request url
                        if (isBrowser) {
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }
                }
                this.responseURL = url;
                this._changeReadyState(1);
            }
        }, {
            key: "send",
            value: function send(arg) {
                var _this = this;

                arg = arg || null;
                var self = this;
                if (adapter) {
                    var request = {
                        method: self.method,
                        url: self.responseURL,
                        headers: self.requestHeaders || {},
                        body: arg
                    };
                    util.merge(request, self._options || {});
                    if (request.method === "GET") {
                        request.body = null;
                    }
                    self._changeReadyState(3);
                    var timer = void 0;
                    self.timeout = self.timeout || 0;
                    if (self.timeout > 0) {
                        timer = setTimeout(function () {
                            if (self.readyState === 3) {
                                _this._call("onloadend");
                                self._changeReadyState(0);
                                self._call("ontimeout");
                            }
                        }, self.timeout);
                    }
                    request.timeout = self.timeout;
                    adapter(request, function (response) {

                        function getAndDelete(key) {
                            var t = response[key];
                            delete response[key];
                            return t;
                        }

                        // If the request has already timeout, return
                        if (self.readyState !== 3) return;
                        clearTimeout(timer);

                        // Make sure the type of status is integer
                        self.status = getAndDelete("statusCode") - 0;

                        var responseText = getAndDelete("responseText");
                        var statusMessage = getAndDelete("statusMessage");

                        // Network error, set the status code 0
                        if (!self.status) {
                            self.statusText = responseText;
                            self._call("onerror", { msg: statusMessage });
                        } else {
                            // Parsing the response headers to array in a object,  because
                            // there may be multiple values with the same header name
                            var responseHeaders = getAndDelete("headers");
                            var headers = {};
                            for (var field in responseHeaders) {
                                var value = responseHeaders[field];
                                var key = field.toLowerCase();
                                // Is array
                                if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
                                    headers[key] = value;
                                } else {
                                    headers[key] = headers[key] || [];
                                    headers[key].push(value);
                                }
                            }
                            var cookies = headers["set-cookie"];
                            if (isBrowser && cookies) {
                                cookies.forEach(function (e) {
                                    // Remove the http-Only property of the  cookie
                                    // so that JavaScript can operate it.
                                    document.cookie = e.replace(/;\s*httpOnly/ig, "");
                                });
                            }
                            self.responseHeaders = headers;
                            // Set the fields of engine from response
                            self.statusText = statusMessage || "";
                            self.response = self.responseText = responseText;
                            self._response = response;
                            self._changeReadyState(4);
                            self._call("onload");
                        }
                        self._call("onloadend");
                    });
                } else {
                    console.error("Ajax require adapter");
                }
            }
        }, {
            key: "setRequestHeader",
            value: function setRequestHeader(key, value) {
                this.requestHeaders[util.trim(key)] = value;
            }
        }, {
            key: "getResponseHeader",
            value: function getResponseHeader(key) {
                return (this.responseHeaders[key.toLowerCase()] || "").toString() || null;
            }
        }, {
            key: "getAllResponseHeaders",
            value: function getAllResponseHeaders() {
                var str = "";
                for (var key in this.responseHeaders) {
                    str += key + ":" + this.getResponseHeader(key) + "\r\n";
                }
                return str || null;
            }
        }, {
            key: "abort",
            value: function abort(msg) {
                this._changeReadyState(0);
                this._call("onerror", { msg: msg });
                this._call("onloadend");
            }
        }], [{
            key: "setAdapter",
            value: function setAdapter(requestAdapter) {
                adapter = requestAdapter;
            }
        }]);

        return AjaxEngine;
    }();

    return AjaxEngine;
}

// learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = EngineWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

var Fly = function () {
    function Fly(engine) {
        _classCallCheck(this, Fly);

        this.engine = engine || XMLHttpRequest;

        this.default = this; //For typeScript

        /**
         * Add  lock/unlock API for interceptor.
         *
         * Once an request/response interceptor is locked, the incoming request/response
         * will be added to a queue before they enter the interceptor, they will not be
         * continued  until the interceptor is unlocked.
         *
         * @param [interceptor] either is interceptors.request or interceptors.response
         */
        function wrap(interceptor) {
            var resolve = void 0;
            var reject = void 0;

            function _clear() {
                interceptor.p = resolve = reject = null;
            }

            utils.merge(interceptor, {
                lock: function lock() {
                    if (!resolve) {
                        interceptor.p = new Promise(function (_resolve, _reject) {
                            resolve = _resolve;
                            reject = _reject;
                        });
                    }
                },
                unlock: function unlock() {
                    if (resolve) {
                        resolve();
                        _clear();
                    }
                },
                clear: function clear() {
                    if (reject) {
                        reject("cancel");
                        _clear();
                    }
                }
            });
        }

        var interceptors = this.interceptors = {
            response: {
                use: function use(handler, onerror) {
                    this.handler = handler;
                    this.onerror = onerror;
                }
            },
            request: {
                use: function use(handler) {
                    this.handler = handler;
                }
            }
        };

        var irq = interceptors.request;
        var irp = interceptors.response;
        wrap(irp);
        wrap(irq);

        this.config = {
            method: "GET",
            baseURL: "",
            headers: {},
            timeout: 0,
            params: {}, // Default Url params
            parseJson: true, // Convert response data to JSON object automatically.
            withCredentials: false
        };
    }

    _createClass(Fly, [{
        key: "request",
        value: function request(url, data, options) {
            var _this = this;

            var engine = new this.engine();
            var contentType = "Content-Type";
            var contentTypeLowerCase = contentType.toLowerCase();
            var interceptors = this.interceptors;
            var requestInterceptor = interceptors.request;
            var responseInterceptor = interceptors.response;
            var requestInterceptorHandler = requestInterceptor.handler;
            var promise = new Promise(function (resolve, reject) {
                if (utils.isObject(url)) {
                    options = url;
                    url = options.url;
                }
                options = options || {};
                options.headers = options.headers || {};

                function isPromise(p) {
                    // some  polyfill implementation of Promise may be not standard,
                    // so, we test by duck-typing
                    return p && p.then && p.catch;
                }

                /**
                 * If the request/response interceptor has been locked，
                 * the new request/response will enter a queue. otherwise, it will be performed directly.
                 * @param [promise] if the promise exist, means the interceptor is  locked.
                 * @param [callback]
                 */
                function enqueueIfLocked(promise, callback) {
                    if (promise) {
                        promise.then(function () {
                            callback();
                        });
                    } else {
                        callback();
                    }
                }

                // make the http request
                function makeRequest(options) {
                    data = options.body;
                    // Normalize the request url
                    url = utils.trim(options.url);
                    var baseUrl = utils.trim(options.baseURL || "");
                    if (!url && isBrowser && !baseUrl) url = location.href;
                    if (url.indexOf("http") !== 0) {
                        var isAbsolute = url[0] === "/";
                        if (!baseUrl && isBrowser) {
                            var arr = location.pathname.split("/");
                            arr.pop();
                            baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"));
                        }
                        if (baseUrl[baseUrl.length - 1] !== "/") {
                            baseUrl += "/";
                        }
                        url = baseUrl + (isAbsolute ? url.substr(1) : url);
                        if (isBrowser) {

                            // Normalize the url which contains the ".." or ".", such as
                            // "http://xx.com/aa/bb/../../xx" to "http://xx.com/xx" .
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }

                    var responseType = utils.trim(options.responseType || "");
                    var needQuery = ["GET", "HEAD", "DELETE", "OPTION"].indexOf(options.method) !== -1;
                    var dataType = utils.type(data);
                    var params = options.params || {};

                    // merge url params when the method is "GET" (data is object)
                    if (needQuery && dataType === "object") {
                        params = utils.merge(data, params);
                    }
                    // encode params to String
                    params = utils.formatParams(params);

                    // save url params
                    var _params = [];
                    if (params) {
                        _params.push(params);
                    }
                    // Add data to url params when the method is "GET" (data is String)
                    if (needQuery && data && dataType === "string") {
                        _params.push(data);
                    }

                    // make the final url
                    if (_params.length > 0) {
                        url += (url.indexOf("?") === -1 ? "?" : "&") + _params.join("&");
                    }

                    engine.open(options.method, url);

                    // try catch for ie >=9
                    try {
                        engine.withCredentials = !!options.withCredentials;
                        engine.timeout = options.timeout || 0;
                        if (responseType !== "stream") {
                            engine.responseType = responseType;
                        }
                    } catch (e) {}

                    var customContentType = options.headers[contentType] || options.headers[contentTypeLowerCase];

                    // default content type
                    var _contentType = "application/x-www-form-urlencoded";
                    // If the request data is json object, transforming it  to json string,
                    // and set request content-type to "json". In browser,  the data will
                    // be sent as RequestBody instead of FormData
                    if (utils.trim((customContentType || "").toLowerCase()) === _contentType) {
                        data = utils.formatParams(data);
                    } else if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                        _contentType = 'application/json;charset=utf-8';
                        data = JSON.stringify(data);
                    }
                    //If user doesn't set content-type, set default.
                    if (!(customContentType || needQuery)) {
                        options.headers[contentType] = _contentType;
                    }

                    for (var k in options.headers) {
                        if (k === contentType && utils.isFormData(data)) {
                            // Delete the content-type, Let the browser set it
                            delete options.headers[k];
                        } else {
                            try {
                                // In browser environment, some header fields are readonly,
                                // write will cause the exception .
                                engine.setRequestHeader(k, options.headers[k]);
                            } catch (e) {}
                        }
                    }

                    function onresult(handler, data, type) {
                        enqueueIfLocked(responseInterceptor.p, function () {
                            if (handler) {
                                //如果失败，添加请求信息
                                if (type) {
                                    data.request = options;
                                }
                                var ret = handler.call(responseInterceptor, data, Promise);
                                data = ret === undefined ? data : ret;
                            }
                            if (!isPromise(data)) {
                                data = Promise[type === 0 ? "resolve" : "reject"](data);
                            }
                            data.then(function (d) {
                                resolve(d);
                            }).catch(function (e) {
                                reject(e);
                            });
                        });
                    }

                    function onerror(e) {
                        e.engine = engine;
                        onresult(responseInterceptor.onerror, e, -1);
                    }

                    function Err(msg, status) {
                        this.message = msg;
                        this.status = status;
                    }

                    engine.onload = function () {
                        try {
                            // The xhr of IE9 has not response field
                            var response = engine.response || engine.responseText;
                            if (response && options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1
                            // Some third engine implementation may transform the response text to json object automatically,
                            // so we should test the type of response before transforming it
                            && !utils.isObject(response)) {
                                response = JSON.parse(response);
                            }

                            var headers = engine.responseHeaders;
                            // In browser
                            if (!headers) {
                                headers = {};
                                var items = (engine.getAllResponseHeaders() || "").split("\r\n");
                                items.pop();
                                items.forEach(function (e) {
                                    if (!e) return;
                                    var key = e.split(":")[0];
                                    headers[key] = engine.getResponseHeader(key);
                                });
                            }
                            var status = engine.status;
                            var statusText = engine.statusText;
                            var _data = { data: response, headers: headers, status: status, statusText: statusText };
                            // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                            utils.merge(_data, engine._response);
                            if (status >= 200 && status < 300 || status === 304) {
                                _data.engine = engine;
                                _data.request = options;
                                onresult(responseInterceptor.handler, _data, 0);
                            } else {
                                var e = new Err(statusText, status);
                                e.response = _data;
                                onerror(e);
                            }
                        } catch (e) {
                            onerror(new Err(e.msg, engine.status));
                        }
                    };

                    engine.onerror = function (e) {
                        onerror(new Err(e.msg || "Network Error", 0));
                    };

                    engine.ontimeout = function () {
                        onerror(new Err("timeout [ " + engine.timeout + "ms ]", 1));
                    };
                    engine._options = options;
                    setTimeout(function () {
                        engine.send(needQuery ? null : data);
                    }, 0);
                }

                enqueueIfLocked(requestInterceptor.p, function () {
                    utils.merge(options, JSON.parse(JSON.stringify(_this.config)));
                    var headers = options.headers;
                    headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || "";
                    delete headers[contentTypeLowerCase];
                    options.body = data || options.body;
                    url = utils.trim(url || "");
                    options.method = options.method.toUpperCase();
                    options.url = url;
                    var ret = options;
                    if (requestInterceptorHandler) {
                        ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                    }
                    if (!isPromise(ret)) {
                        ret = Promise.resolve(ret);
                    }
                    ret.then(function (d) {
                        //if options continue
                        if (d === options) {
                            makeRequest(d);
                        } else {
                            resolve(d);
                        }
                    }, function (err) {
                        reject(err);
                    });
                });
            });
            promise.engine = engine;
            return promise;
        }
    }, {
        key: "all",
        value: function all(promises) {
            return Promise.all(promises);
        }
    }, {
        key: "spread",
        value: function spread(callback) {
            return function (arr) {
                return callback.apply(null, arr);
            };
        }
    }]);

    return Fly;
}();

//For typeScript


Fly.default = Fly;

["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {
    Fly.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method: e }, option));
    };
});
["lock", "unlock", "clear"].forEach(function (e) {
    Fly.prototype[e] = function () {
        this.interceptors.request[e]();
    };
});
// Learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = Fly;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//微信小程序适配器
module.exports = function (request, responseCallback) {
    var con = {
        method: request.method,
        url: request.url,
        dataType: request.dataType || undefined,
        header: request.headers,
        data: request.body || {},
        responseType: request.responseType || 'text',
        success: function success(res) {
            responseCallback({
                statusCode: res.statusCode,
                responseText: res.data,
                headers: res.header,
                statusMessage: res.errMsg
            });
        },
        fail: function fail(res) {
            responseCallback({
                statusCode: res.statusCode || 0,
                statusMessage: res.errMsg
            });
        }
    };
    wx.request(con);
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//微信小程序入口
var _Fly = __webpack_require__(2);
var EngineWrapper = __webpack_require__(1);
var adapter = __webpack_require__(7);
var wxEngine = EngineWrapper(adapter);
module.exports = function (engine) {
    return new _Fly(engine || wxEngine);
};

/***/ })
/******/ ]);
});

/***/ }),
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(113);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 113 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 114 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "CK_notice_list",
  props: {
    item: {
      type: String
    }
  },
  methods: {
    convertObj: function convertObj(aimstr) {
      var re = new RegExp(/cid:.*,uid:.*/);
      if (re.test(aimstr)) {
        // 这种情况就是用户信息对象
        // 首先用,号进行分割。
        var userinfo_arr = aimstr.split(",");
        var userinfoobj = { uid: "", cid: "" };
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(userinfo_arr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var userinfo = _step.value;

            var recid = new RegExp(/cid:(.*)/);
            var reuid = new RegExp(/uid:(.*)/);
            if (recid.test(userinfo)) {
              userinfoobj.cid = RegExp.$1;
            } else if (reuid.test(userinfo)) {
              userinfoobj.uid = RegExp.$1;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return { type: "userName", val: userinfoobj };
      }
      return { type: "str", val: aimstr };
    }
  },
  computed: {
    message: function message() {
      var that = this;
      var splitarr = that.item.split("|||");
      var resultdata_arr = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(splitarr), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var aimstr = _step2.value;

          resultdata_arr.push(that.convertObj(aimstr));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return resultdata_arr;
    }
  }
});

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
__webpack_require__(24);
module.exports = __webpack_require__(118);


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var get = __webpack_require__(36);
module.exports = __webpack_require__(8).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', _vm._l((_vm.message), function(item, index) {
    return _c('p', {
      key: index,
      staticStyle: {
        "display": "inline-block"
      }
    }, [_vm._v("\n    " + _vm._s(item.type === "str" ? item.val : "") + "\n    "), (item.type === 'userName') ? _c('ww-open-data', {
      attrs: {
        "corpid": item.val.cid,
        "openid": item.val.uid,
        "type": "userName",
        "mpcomid": '0_' + index
      }
    }) : _vm._e()], 1)
  }))
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-28c38faa", esExports)
  }
}

/***/ }),
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "title-notice-container",
  props: {
    /**
     * 普通提示
     * */
    ordMessage: {
      type: String
    }
  }
});

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "title-notice-container"
  }, [(_vm.ordMessage) ? _c('div', {
    staticClass: "title-notice"
  }, [_vm._v(_vm._s(_vm.ordMessage))]) : _c('div', {
    staticClass: "title-notice"
  }, [_vm._v("请传入显示信息")])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4cf8fd7a", esExports)
  }
}

/***/ }),
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "task-list",
  props: {
    /**
     * 单个项目数据
     * */
    data: {
      type: Object,
      default: function _default() {
        return {
          title: "我是标题",
          end_date: "2020-07-03",
          day_count: 10,
          task_score: 50,
          score_status: true,
          task_state: 2
        };
      }
    },
    /**
     * 使用组件的页面
     * */
    page: {
      type: String,
      default: ""
    },
    /**
     * 是否显示任务状态
     * */
    isIcon: {
      type: Boolean,
      default: true
    }
  },
  methods: {},
  computed: {
    score: function score() {
      var that = this;
      return Math.round(that.data.score * 100) / 100;
    },
    score2: function score2() {
      var that = this;
      return Math.round(that.data.review_rate * 100);
    }
  }
});

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "task-list"
  }, [(_vm.page === '') ? _c('div', {
    staticClass: "task-list-content"
  }, [_c('p', {
    staticClass: "task-list-content-tile"
  }, [_vm._v(_vm._s(_vm.data.task_name))]), _vm._v(" "), _c('p', {
    staticClass: "task-list-content-detail"
  }, [_vm._v("\n      任务截止时间" + _vm._s(_vm.data.end_date) + "， 持续" + _vm._s(_vm.data.working_day_count) + "天"), (_vm.score !== 0) ? _c('span', [_vm._v("，得" + _vm._s(_vm.score) + "分")]) : _vm._e()])], 1) : _vm._e(), _vm._v(" "), (_vm.page === 'staff_chart') ? _c('div', {
    staticClass: "task-list-content"
  }, [_c('p', {
    staticClass: "task-list-content-tile"
  }, [_vm._v(_vm._s(_vm.data.date))]), _vm._v(" "), _c('p', {
    staticClass: "task-list-content-detail"
  }, [_vm._v("\n      绩效评分" + _vm._s(_vm.data.score) + "，参与评率" + _vm._s(_vm.score2) + "%\n    ")])], 1) : _vm._e(), _vm._v(" "), (_vm.isIcon) ? _c('div', {
    staticClass: "task-status"
  }, [_c('icon', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.data.attachinfo_of_task.task_icon_status === 1),
      expression: "data.attachinfo_of_task.task_icon_status === 1"
    }],
    attrs: {
      "type": "info",
      "color": "#ffc300",
      "size": "26"
    }
  }), _vm._v(" "), _c('icon', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.data.attachinfo_of_task.task_icon_status === 2),
      expression: "data.attachinfo_of_task.task_icon_status === 2"
    }],
    attrs: {
      "type": "waiting",
      "size": "26"
    }
  }), _vm._v(" "), _c('icon', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.data.attachinfo_of_task.task_icon_status === 3),
      expression: "data.attachinfo_of_task.task_icon_status === 3"
    }],
    attrs: {
      "type": "info",
      "color": "red",
      "size": "26"
    }
  }), _vm._v(" "), _c('icon', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.data.attachinfo_of_task.task_icon_status === 4),
      expression: "data.attachinfo_of_task.task_icon_status === 4"
    }],
    attrs: {
      "type": "success",
      "size": "26"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "task-next"
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/right.png",
      "alt": ""
    }
  })])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-32f9f904", esExports)
  }
}

/***/ }),
/* 140 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "CKbutton",
  props: {
    name: {
      type: String
    }
  },
  methods: {
    operat: function operat() {
      var that = this;
      that.$emit("operat");
    }
  }
});

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "bottom-button-container"
  }, [_c('button', {
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.operat
    }
  }, [_vm._v(_vm._s(_vm.name))])], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7dc384c5", esExports)
  }
}

/***/ }),
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(39);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);
__webpack_require__(150);
module.exports = __webpack_require__(8).Array.from;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(14);
var $export = __webpack_require__(11);
var toObject = __webpack_require__(35);
var call = __webpack_require__(51);
var isArrayIter = __webpack_require__(52);
var toLength = __webpack_require__(32);
var createProperty = __webpack_require__(151);
var getIterFn = __webpack_require__(36);

$export($export.S + $export.F * !__webpack_require__(57)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(15);
var createDesc = __webpack_require__(30);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(153), __esModule: true };

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(8);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(155), __esModule: true };

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(156);
module.exports = __webpack_require__(8).Object.values;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(11);
var $values = __webpack_require__(157)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(12);
var getKeys = __webpack_require__(31);
var toIObject = __webpack_require__(20);
var isEnum = __webpack_require__(60).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),
/* 158 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "CKaddMember",
  props: {
    objMessage: {
      type: Object
    }
  },
  methods: {
    addMember: function addMember() {
      var that = this;
      that.$emit("addMember", { "res": "success" });
    }
  }
});

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "addUserContainer",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.addMember
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "addUserContent"
  }, [_c('p', {
    staticClass: "addUserContentTitle"
  }, [_vm._v(_vm._s(_vm.objMessage.title))]), _vm._v(" "), (_vm.objMessage.detail) ? _c('p', {
    staticClass: "addUserContentDetail"
  }, [_vm._v(_vm._s(_vm.objMessage.detail))]) : _vm._e()], 1), _vm._v(" "), _vm._m(1)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "addUserImg"
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/adduser.png",
      "alt": ""
    }
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "addUserRight"
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/right.png",
      "alt": ""
    }
  })])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5d0d54c4", esExports)
  }
}

/***/ }),
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


!function(t,e){ true?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.echarts={})}(this,function(t){"use strict";var e=2311,n=function(){return e++},m="object"==typeof wx&&"function"==typeof wx.getSystemInfoSync?{browser:{},os:{},node:!1,wxa:!0,canvasSupported:!0,svgSupported:!1,touchEventsSupported:!0,domSupported:!1}:"undefined"==typeof document&&"undefined"!=typeof self?{browser:{},os:{},node:!1,worker:!0,canvasSupported:!0,domSupported:!1}:"undefined"==typeof navigator?{browser:{},os:{},node:!0,worker:!1,canvasSupported:!0,svgSupported:!0,domSupported:!1}:function(t){var e={},n=t.match(/Firefox\/([\d.]+)/),i=t.match(/MSIE\s([\d.]+)/)||t.match(/Trident\/.+?rv:(([\d.]+))/),r=t.match(/Edge\/([\d.]+)/),a=/micromessenger/i.test(t);n&&(e.firefox=!0,e.version=n[1]);i&&(e.ie=!0,e.version=i[1]);r&&(e.edge=!0,e.version=r[1]);a&&(e.weChat=!0);return{browser:e,os:{},node:!1,canvasSupported:!!document.createElement("canvas").getContext,svgSupported:"undefined"!=typeof SVGRect,touchEventsSupported:"ontouchstart"in window&&!e.ie&&!e.edge,pointerEventsSupported:"onpointerdown"in window&&(e.edge||e.ie&&11<=e.version),domSupported:"undefined"!=typeof document}}(navigator.userAgent);var s={"[object Function]":1,"[object RegExp]":1,"[object Date]":1,"[object Error]":1,"[object CanvasGradient]":1,"[object CanvasPattern]":1,"[object Image]":1,"[object Canvas]":1},l={"[object Int8Array]":1,"[object Uint8Array]":1,"[object Uint8ClampedArray]":1,"[object Int16Array]":1,"[object Uint16Array]":1,"[object Int32Array]":1,"[object Uint32Array]":1,"[object Float32Array]":1,"[object Float64Array]":1},h=Object.prototype.toString,i=Array.prototype,o=i.forEach,u=i.filter,r=i.slice,c=i.map,d=i.reduce,a={};function b(t){if(null==t||"object"!=typeof t)return t;var e=t,n=h.call(t);if("[object Array]"===n){if(!q(t)){e=[];for(var i=0,r=t.length;i<r;i++)e[i]=b(t[i])}}else if(l[n]){if(!q(t)){var a=t.constructor;if(t.constructor.from)e=a.from(t);else{e=new a(t.length);for(i=0,r=t.length;i<r;i++)e[i]=b(t[i])}}}else if(!s[n]&&!q(t)&&!B(t))for(var o in e={},t)t.hasOwnProperty(o)&&(e[o]=b(t[o]));return e}function f(t,e,n){if(!O(e)||!O(t))return n?b(e):t;for(var i in e)if(e.hasOwnProperty(i)){var r=t[i],a=e[i];!O(a)||!O(r)||L(a)||L(r)||B(a)||B(r)||E(a)||E(r)||q(a)||q(r)?!n&&i in t||(t[i]=b(e[i])):f(r,a,n)}return t}function S(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function k(t,e,n){for(var i in e)e.hasOwnProperty(i)&&(n?null!=e[i]:null==t[i])&&(t[i]=e[i]);return t}function v(){return a.createCanvas()}var p;function g(t,e){if(t){if(t.indexOf)return t.indexOf(e);for(var n=0,i=t.length;n<i;n++)if(t[n]===e)return n}return-1}function y(t,e){var n=t.prototype;function i(){}for(var r in i.prototype=e.prototype,t.prototype=new i,n)n.hasOwnProperty(r)&&(t.prototype[r]=n[r]);(t.prototype.constructor=t).superClass=e}function _(t,e,n){k(t="prototype"in t?t.prototype:t,e="prototype"in e?e.prototype:e,n)}function P(t){if(t)return"string"!=typeof t&&"number"==typeof t.length}function D(t,e,n){if(t&&e)if(t.forEach&&t.forEach===o)t.forEach(e,n);else if(t.length===+t.length)for(var i=0,r=t.length;i<r;i++)e.call(n,t[i],i,t);else for(var a in t)t.hasOwnProperty(a)&&e.call(n,t[a],a,t)}function A(t,e,n){if(t&&e){if(t.map&&t.map===c)return t.map(e,n);for(var i=[],r=0,a=t.length;r<a;r++)i.push(e.call(n,t[r],r,t));return i}}function M(t,e,n,i){if(t&&e){if(t.reduce&&t.reduce===d)return t.reduce(e,n,i);for(var r=0,a=t.length;r<a;r++)n=e.call(i,n,t[r],r,t);return n}}function x(t,e,n){if(t&&e){if(t.filter&&t.filter===u)return t.filter(e,n);for(var i=[],r=0,a=t.length;r<a;r++)e.call(n,t[r],r,t)&&i.push(t[r]);return i}}function w(t,e){var n=r.call(arguments,2);return function(){return t.apply(e,n.concat(r.call(arguments)))}}function I(t){var e=r.call(arguments,1);return function(){return t.apply(this,e.concat(r.call(arguments)))}}function L(t){return"[object Array]"===h.call(t)}function T(t){return"function"==typeof t}function C(t){return"[object String]"===h.call(t)}function O(t){var e=typeof t;return"function"==e||!!t&&"object"==e}function E(t){return!!s[h.call(t)]}function N(t){return!!l[h.call(t)]}function B(t){return"object"==typeof t&&"number"==typeof t.nodeType&&"object"==typeof t.ownerDocument}function R(t){return t!=t}function z(){for(var t=0,e=arguments.length;t<e;t++)if(null!=arguments[t])return arguments[t]}function F(t,e){return null!=t?t:e}function V(t,e,n){return null!=t?t:null!=e?e:n}function W(){return Function.call.apply(r,arguments)}function H(t){if("number"==typeof t)return[t,t,t,t];var e=t.length;return 2===e?[t[0],t[1],t[0],t[1]]:3===e?[t[0],t[1],t[2],t[1]]:t}function G(t,e){if(!t)throw new Error(e)}function X(t){return null==t?null:"function"==typeof t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}a.createCanvas=function(){return document.createElement("canvas")};var U="__ec_primitive__";function Y(t){t[U]=!0}function q(t){return t[U]}function j(t){var n=L(t);this.data={};var i=this;function e(t,e){n?i.set(t,e):i.set(e,t)}t instanceof j?t.each(e):t&&D(t,e)}function Z(t){return new j(t)}function $(){}j.prototype={constructor:j,get:function(t){return this.data.hasOwnProperty(t)?this.data[t]:null},set:function(t,e){return this.data[t]=e},each:function(t,e){for(var n in void 0!==e&&(t=w(t,e)),this.data)this.data.hasOwnProperty(n)&&t(this.data[n],n)},removeKey:function(t){delete this.data[t]}};var K="undefined"==typeof Float32Array?Array:Float32Array;function Q(t,e){var n=new K(2);return null==t&&(t=0),null==e&&(e=0),n[0]=t,n[1]=e,n}function J(t){var e=new K(2);return e[0]=t[0],e[1]=t[1],e}function tt(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t}function et(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t}function nt(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t}function it(t,e){var n=function(t){return Math.sqrt(function(t){return t[0]*t[0]+t[1]*t[1]}(t))}(e);return 0===n?(t[0]=0,t[1]=0):(t[0]=e[0]/n,t[1]=e[1]/n),t}function rt(t,e){return Math.sqrt((t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]))}var at=rt;var ot=function(t,e){return(t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1])};function st(t,e,n){var i=e[0],r=e[1];return t[0]=n[0]*i+n[2]*r+n[4],t[1]=n[1]*i+n[3]*r+n[5],t}function lt(t,e,n){return t[0]=Math.min(e[0],n[0]),t[1]=Math.min(e[1],n[1]),t}function ht(t,e,n){return t[0]=Math.max(e[0],n[0]),t[1]=Math.max(e[1],n[1]),t}function ut(){this.on("mousedown",this._dragStart,this),this.on("mousemove",this._drag,this),this.on("mouseup",this._dragEnd,this)}function ct(t,e){return{target:t,topTarget:e&&e.topTarget}}ut.prototype={constructor:ut,_dragStart:function(t){for(var e=t.target;e&&!e.draggable;)e=e.parent;e&&((this._draggingTarget=e).dragging=!0,this._x=t.offsetX,this._y=t.offsetY,this.dispatchToElement(ct(e,t),"dragstart",t.event))},_drag:function(t){var e=this._draggingTarget;if(e){var n=t.offsetX,i=t.offsetY,r=n-this._x,a=i-this._y;this._x=n,this._y=i,e.drift(r,a,t),this.dispatchToElement(ct(e,t),"drag",t.event);var o=this.findHover(n,i,e).target,s=this._dropTarget;e!==(this._dropTarget=o)&&(s&&o!==s&&this.dispatchToElement(ct(s,t),"dragleave",t.event),o&&o!==s&&this.dispatchToElement(ct(o,t),"dragenter",t.event))}},_dragEnd:function(t){var e=this._draggingTarget;e&&(e.dragging=!1),this.dispatchToElement(ct(e,t),"dragend",t.event),this._dropTarget&&this.dispatchToElement(ct(this._dropTarget,t),"drop",t.event),this._draggingTarget=null,this._dropTarget=null}};var dt=Array.prototype.slice,ft=function(t){this._$handlers={},this._$eventProcessor=t};function pt(t,e,n,i,r,a){var o=t._$handlers;if("function"==typeof n&&(r=i,i=n,n=null),!i||!e)return t;n=function(t,e){var n=t._$eventProcessor;return null!=e&&n&&n.normalizeQuery&&(e=n.normalizeQuery(e)),e}(t,n),o[e]||(o[e]=[]);for(var s=0;s<o[e].length;s++)if(o[e][s].h===i)return t;var l={h:i,one:a,query:n,ctx:r||t,callAtLast:i.zrEventfulCallAtLast},h=o[e].length-1,u=o[e][h];return u&&u.callAtLast?o[e].splice(h,0,l):o[e].push(l),t}ft.prototype={constructor:ft,one:function(t,e,n,i){return pt(this,t,e,n,i,!0)},on:function(t,e,n,i){return pt(this,t,e,n,i,!1)},isSilent:function(t){var e=this._$handlers;return!e[t]||!e[t].length},off:function(t,e){var n=this._$handlers;if(!t)return this._$handlers={},this;if(e){if(n[t]){for(var i=[],r=0,a=n[t].length;r<a;r++)n[t][r].h!==e&&i.push(n[t][r]);n[t]=i}n[t]&&0===n[t].length&&delete n[t]}else delete n[t];return this},trigger:function(t){var e=this._$handlers[t],n=this._$eventProcessor;if(e){var i=arguments,r=i.length;3<r&&(i=dt.call(i,1));for(var a=e.length,o=0;o<a;){var s=e[o];if(n&&n.filter&&null!=s.query&&!n.filter(t,s.query))o++;else{switch(r){case 1:s.h.call(s.ctx);break;case 2:s.h.call(s.ctx,i[1]);break;case 3:s.h.call(s.ctx,i[1],i[2]);break;default:s.h.apply(s.ctx,i)}s.one?(e.splice(o,1),a--):o++}}}return n&&n.afterTrigger&&n.afterTrigger(t),this},triggerWithContext:function(t){var e=this._$handlers[t],n=this._$eventProcessor;if(e){var i=arguments,r=i.length;4<r&&(i=dt.call(i,1,i.length-1));for(var a=i[i.length-1],o=e.length,s=0;s<o;){var l=e[s];if(n&&n.filter&&null!=l.query&&!n.filter(t,l.query))s++;else{switch(r){case 1:l.h.call(a);break;case 2:l.h.call(a,i[1]);break;case 3:l.h.call(a,i[1],i[2]);break;default:l.h.apply(a,i)}l.one?(e.splice(s,1),o--):s++}}}return n&&n.afterTrigger&&n.afterTrigger(t),this}};var gt=Math.log(2);function vt(t,e,n,i,r,a){var o=i+"-"+r,s=t.length;if(a.hasOwnProperty(o))return a[o];if(1===e){var l=Math.round(Math.log((1<<s)-1&~r)/gt);return t[n][l]}for(var h=i|1<<n,u=n+1;i&1<<u;)u++;for(var c=0,d=0,f=0;d<s;d++){var p=1<<d;p&r||(c+=(f%2?-1:1)*t[n][d]*vt(t,e-1,u,h,r|p,a),f++)}return a[o]=c}function mt(t,e){var n=[[t[0],t[1],1,0,0,0,-e[0]*t[0],-e[0]*t[1]],[0,0,0,t[0],t[1],1,-e[1]*t[0],-e[1]*t[1]],[t[2],t[3],1,0,0,0,-e[2]*t[2],-e[2]*t[3]],[0,0,0,t[2],t[3],1,-e[3]*t[2],-e[3]*t[3]],[t[4],t[5],1,0,0,0,-e[4]*t[4],-e[4]*t[5]],[0,0,0,t[4],t[5],1,-e[5]*t[4],-e[5]*t[5]],[t[6],t[7],1,0,0,0,-e[6]*t[6],-e[6]*t[7]],[0,0,0,t[6],t[7],1,-e[7]*t[6],-e[7]*t[7]]],i={},r=vt(n,8,0,0,0,i);if(0!==r){for(var a=[],o=0;o<8;o++)for(var s=0;s<8;s++)null==a[s]&&(a[s]=0),a[s]+=((o+s)%2?-1:1)*vt(n,7,0===o?1:0,1<<o,1<<s,i)/r*e[o];return function(t,e,n){var i=e*a[6]+n*a[7]+1;t[0]=(e*a[0]+n*a[1]+a[2])/i,t[1]=(e*a[3]+n*a[4]+a[5])/i}}}var yt="___zrEVENTSAVED";function _t(t,e,n,i,r){if(e.getBoundingClientRect&&m.domSupported&&!xt(e)){var a=e[yt]||(e[yt]={}),o=function(t,e,n){for(var i=n?"invTrans":"trans",r=e[i],a=e.srcCoords,o=!0,s=[],l=[],h=0;h<4;h++){var u=t[h].getBoundingClientRect(),c=2*h,d=u.left,f=u.top;s.push(d,f),o=o&&a&&d===a[c]&&f===a[1+c],l.push(t[h].offsetLeft,t[h].offsetTop)}return o&&r?r:(e.srcCoords=s,e[i]=n?mt(l,s):mt(s,l))}(function(t,e){var n=e.markers;if(n)return n;n=e.markers=[];for(var i=["left","right"],r=["top","bottom"],a=0;a<4;a++){var o=document.createElement("div"),s=o.style,l=a%2,h=(a>>1)%2;s.cssText=["position: absolute","visibility: hidden","padding: 0","margin: 0","border-width: 0","user-select: none","width:0","height:0",i[l]+":0",r[h]+":0",i[1-l]+":auto",r[1-h]+":auto",""].join("!important;"),t.appendChild(o),n.push(o)}return n}(e,a),a,r);if(o)return o(t,n,i),!0}return!1}function xt(t){return"CANVAS"===t.nodeName.toUpperCase()}var wt="undefined"!=typeof window&&!!window.addEventListener,bt=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,St=[];function Mt(t,e,n,i){return n=n||{},i||!m.canvasSupported?It(t,e,n):m.browser.firefox&&null!=e.layerX&&e.layerX!==e.offsetX?(n.zrX=e.layerX,n.zrY=e.layerY):null!=e.offsetX?(n.zrX=e.offsetX,n.zrY=e.offsetY):It(t,e,n),n}function It(t,e,n){if(m.domSupported&&t.getBoundingClientRect){var i=e.clientX,r=e.clientY;if(xt(t)){var a=t.getBoundingClientRect();return n.zrX=i-a.left,void(n.zrY=r-a.top)}if(_t(St,t,i,r))return n.zrX=St[0],void(n.zrY=St[1])}n.zrX=n.zrY=0}function Tt(t){return t||window.event}function Ct(t,e,n){if(null!=(e=Tt(e)).zrX)return e;var i=e.type;if(i&&0<=i.indexOf("touch")){var r="touchend"!==i?e.targetTouches[0]:e.changedTouches[0];r&&Mt(t,r,e,n)}else Mt(t,e,e,n),e.zrDelta=e.wheelDelta?e.wheelDelta/120:-(e.detail||0)/3;var a=e.button;return null==e.which&&void 0!==a&&bt.test(e.type)&&(e.which=1&a?1:2&a?3:4&a?2:0),e}function kt(){this._track=[]}var Dt=wt?function(t){t.preventDefault(),t.stopPropagation(),t.cancelBubble=!0}:function(t){t.returnValue=!1,t.cancelBubble=!0};function At(t){var e=t[1][0]-t[0][0],n=t[1][1]-t[0][1];return Math.sqrt(e*e+n*n)}kt.prototype={constructor:kt,recognize:function(t,e,n){return this._doTrack(t,e,n),this._recognize(t)},clear:function(){return this._track.length=0,this},_doTrack:function(t,e,n){var i=t.touches;if(i){for(var r={points:[],touches:[],target:e,event:t},a=0,o=i.length;a<o;a++){var s=i[a],l=Mt(n,s,{});r.points.push([l.zrX,l.zrY]),r.touches.push(s)}this._track.push(r)}},_recognize:function(t){for(var e in Lt)if(Lt.hasOwnProperty(e)){var n=Lt[e](this._track,t);if(n)return n}}};var Lt={pinch:function(t,e){var n=t.length;if(n){var i=(t[n-1]||{}).points,r=(t[n-2]||{}).points||i;if(r&&1<r.length&&i&&1<i.length){var a=At(i)/At(r);isFinite(a)||(a=1),e.pinchScale=a;var o=function(t){return[(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2]}(i);return e.pinchX=o[0],e.pinchY=o[1],{type:"pinch",target:t[0].target,event:e}}}}},Pt="silent";function Ot(){Dt(this.event)}function Et(){}Et.prototype.dispose=function(){};function Nt(t,e,n,i){ft.call(this),this.storage=t,this.painter=e,this.painterRoot=i,n=n||new Et,this.proxy=null,this._hovered={},this._lastTouchMoment,this._lastX,this._lastY,this._gestureMgr,ut.call(this),this.setHandlerProxy(n)}var Bt=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"];function Rt(t,e,n){if(t[t.rectHover?"rectContain":"contain"](e,n)){for(var i,r=t;r;){if(r.clipPath&&!r.clipPath.contain(e,n))return!1;r.silent&&(i=!0),r=r.parent}return!i||Pt}return!1}function zt(t,e,n){var i=t.painter;return e<0||e>i.getWidth()||n<0||n>i.getHeight()}Nt.prototype={constructor:Nt,setHandlerProxy:function(e){this.proxy&&this.proxy.dispose(),e&&(D(Bt,function(t){e.on&&e.on(t,this[t],this)},this),e.handler=this),this.proxy=e},mousemove:function(t){var e=t.zrX,n=t.zrY,i=zt(this,e,n),r=this._hovered,a=r.target;a&&!a.__zr&&(a=(r=this.findHover(r.x,r.y)).target);var o=this._hovered=i?{x:e,y:n}:this.findHover(e,n),s=o.target,l=this.proxy;l.setCursor&&l.setCursor(s?s.cursor:"default"),a&&s!==a&&this.dispatchToElement(r,"mouseout",t),this.dispatchToElement(o,"mousemove",t),s&&s!==a&&this.dispatchToElement(o,"mouseover",t)},mouseout:function(t){var e=t.zrEventControl,n=t.zrIsToLocalDOM;"only_globalout"!==e&&this.dispatchToElement(this._hovered,"mouseout",t),"no_globalout"!==e&&(n||this.trigger("globalout",{type:"globalout",event:t}))},resize:function(t){this._hovered={}},dispatch:function(t,e){var n=this[t];n&&n.call(this,e)},dispose:function(){this.proxy.dispose(),this.storage=this.proxy=this.painter=null},setCursorStyle:function(t){var e=this.proxy;e.setCursor&&e.setCursor(t)},dispatchToElement:function(t,e,n){var i=(t=t||{}).target;if(!i||!i.silent){for(var r="on"+e,a=function(t,e,n){return{type:t,event:n,target:e.target,topTarget:e.topTarget,cancelBubble:!1,offsetX:n.zrX,offsetY:n.zrY,gestureEvent:n.gestureEvent,pinchX:n.pinchX,pinchY:n.pinchY,pinchScale:n.pinchScale,wheelDelta:n.zrDelta,zrByTouch:n.zrByTouch,which:n.which,stop:Ot}}(e,t,n);i&&(i[r]&&(a.cancelBubble=i[r].call(i,a)),i.trigger(e,a),i=i.parent,!a.cancelBubble););a.cancelBubble||(this.trigger(e,a),this.painter&&this.painter.eachOtherLayer(function(t){"function"==typeof t[r]&&t[r].call(t,a),t.trigger&&t.trigger(e,a)}))}},findHover:function(t,e,n){for(var i=this.storage.getDisplayList(),r={x:t,y:e},a=i.length-1;0<=a;a--){var o;if(i[a]!==n&&!i[a].ignore&&(o=Rt(i[a],t,e))&&(r.topTarget||(r.topTarget=i[a]),o!==Pt)){r.target=i[a];break}}return r},processGesture:function(t,e){this._gestureMgr||(this._gestureMgr=new kt);var n=this._gestureMgr;"start"===e&&n.clear();var i=n.recognize(t,this.findHover(t.zrX,t.zrY,null).target,this.proxy.dom);if("end"===e&&n.clear(),i){var r=i.type;t.gestureEvent=r,this.dispatchToElement({target:i.target},r,i.event)}}},D(["click","mousedown","mouseup","mousewheel","dblclick","contextmenu"],function(o){Nt.prototype[o]=function(t){var e,n,i=t.zrX,r=t.zrY,a=zt(this,i,r);if("mouseup"===o&&a||(n=(e=this.findHover(i,r)).target),"mousedown"===o)this._downEl=n,this._downPoint=[t.zrX,t.zrY],this._upEl=n;else if("mouseup"===o)this._upEl=n;else if("click"===o){if(this._downEl!==this._upEl||!this._downPoint||4<at(this._downPoint,[t.zrX,t.zrY]))return;this._downPoint=null}this.dispatchToElement(e,o,t)}}),_(Nt,ft),_(Nt,ut);var Ft="undefined"==typeof Float32Array?Array:Float32Array;function Vt(){var t=new Ft(6);return Wt(t),t}function Wt(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t}function Ht(t,e,n){var i=e[0]*n[0]+e[2]*n[1],r=e[1]*n[0]+e[3]*n[1],a=e[0]*n[2]+e[2]*n[3],o=e[1]*n[2]+e[3]*n[3],s=e[0]*n[4]+e[2]*n[5]+e[4],l=e[1]*n[4]+e[3]*n[5]+e[5];return t[0]=i,t[1]=r,t[2]=a,t[3]=o,t[4]=s,t[5]=l,t}function Gt(t,e,n){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4]+n[0],t[5]=e[5]+n[1],t}function Xt(t,e,n){var i=e[0],r=e[2],a=e[4],o=e[1],s=e[3],l=e[5],h=Math.sin(n),u=Math.cos(n);return t[0]=i*u+o*h,t[1]=-i*h+o*u,t[2]=r*u+s*h,t[3]=-r*h+u*s,t[4]=u*a+h*l,t[5]=u*l-h*a,t}function Ut(t,e,n){var i=n[0],r=n[1];return t[0]=e[0]*i,t[1]=e[1]*r,t[2]=e[2]*i,t[3]=e[3]*r,t[4]=e[4]*i,t[5]=e[5]*r,t}function Yt(t,e){var n=e[0],i=e[2],r=e[4],a=e[1],o=e[3],s=e[5],l=n*o-a*i;return l?(l=1/l,t[0]=o*l,t[1]=-a*l,t[2]=-i*l,t[3]=n*l,t[4]=(i*s-o*r)*l,t[5]=(a*r-n*s)*l,t):null}var qt=Wt;function jt(t){return 5e-5<t||t<-5e-5}var Zt=function(t){(t=t||{}).position||(this.position=[0,0]),null==t.rotation&&(this.rotation=0),t.scale||(this.scale=[1,1]),this.origin=this.origin||null},$t=Zt.prototype;$t.transform=null,$t.needLocalTransform=function(){return jt(this.rotation)||jt(this.position[0])||jt(this.position[1])||jt(this.scale[0]-1)||jt(this.scale[1]-1)};var Kt=[];$t.updateTransform=function(){var t=this.parent,e=t&&t.transform,n=this.needLocalTransform(),i=this.transform;if(n||e){i=i||Vt(),n?this.getLocalTransform(i):qt(i),e&&(n?Ht(i,t.transform,i):function(t,e){t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5]}(i,t.transform)),this.transform=i;var r=this.globalScaleRatio;if(null!=r&&1!==r){this.getGlobalScale(Kt);var a=Kt[0]<0?-1:1,o=Kt[1]<0?-1:1,s=((Kt[0]-a)*r+a)/Kt[0]||0,l=((Kt[1]-o)*r+o)/Kt[1]||0;i[0]*=s,i[1]*=s,i[2]*=l,i[3]*=l}this.invTransform=this.invTransform||Vt(),Yt(this.invTransform,i)}else i&&qt(i)},$t.getLocalTransform=function(t){return Zt.getLocalTransform(this,t)},$t.setTransform=function(t){var e=this.transform,n=t.dpr||1;e?t.setTransform(n*e[0],n*e[1],n*e[2],n*e[3],n*e[4],n*e[5]):t.setTransform(n,0,0,n,0,0)},$t.restoreTransform=function(t){var e=t.dpr||1;t.setTransform(e,0,0,e,0,0)};var Qt=[],Jt=Vt();$t.setLocalTransform=function(t){if(t){var e=t[0]*t[0]+t[1]*t[1],n=t[2]*t[2]+t[3]*t[3],i=this.position,r=this.scale;jt(e-1)&&(e=Math.sqrt(e)),jt(n-1)&&(n=Math.sqrt(n)),t[0]<0&&(e=-e),t[3]<0&&(n=-n),i[0]=t[4],i[1]=t[5],r[0]=e,r[1]=n,this.rotation=Math.atan2(-t[1]/n,t[0]/e)}},$t.decomposeTransform=function(){if(this.transform){var t=this.parent,e=this.transform;t&&t.transform&&(Ht(Qt,t.invTransform,e),e=Qt);var n=this.origin;n&&(n[0]||n[1])&&(Jt[4]=n[0],Jt[5]=n[1],Ht(Qt,e,Jt),Qt[4]-=n[0],Qt[5]-=n[1],e=Qt),this.setLocalTransform(e)}},$t.getGlobalScale=function(t){var e=this.transform;return t=t||[],e?(t[0]=Math.sqrt(e[0]*e[0]+e[1]*e[1]),t[1]=Math.sqrt(e[2]*e[2]+e[3]*e[3]),e[0]<0&&(t[0]=-t[0]),e[3]<0&&(t[1]=-t[1])):(t[0]=1,t[1]=1),t},$t.transformCoordToLocal=function(t,e){var n=[t,e],i=this.invTransform;return i&&st(n,n,i),n},$t.transformCoordToGlobal=function(t,e){var n=[t,e],i=this.transform;return i&&st(n,n,i),n},Zt.getLocalTransform=function(t,e){qt(e=e||[]);var n=t.origin,i=t.scale||[1,1],r=t.rotation||0,a=t.position||[0,0];return n&&(e[4]-=n[0],e[5]-=n[1]),Ut(e,e,i),r&&Xt(e,e,r),n&&(e[4]+=n[0],e[5]+=n[1]),e[4]+=a[0],e[5]+=a[1],e};var te={linear:function(t){return t},quadraticIn:function(t){return t*t},quadraticOut:function(t){return t*(2-t)},quadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},cubicIn:function(t){return t*t*t},cubicOut:function(t){return--t*t*t+1},cubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},quarticIn:function(t){return t*t*t*t},quarticOut:function(t){return 1- --t*t*t*t},quarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},quinticIn:function(t){return t*t*t*t*t},quinticOut:function(t){return--t*t*t*t*t+1},quinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},sinusoidalIn:function(t){return 1-Math.cos(t*Math.PI/2)},sinusoidalOut:function(t){return Math.sin(t*Math.PI/2)},sinusoidalInOut:function(t){return.5*(1-Math.cos(Math.PI*t))},exponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},exponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},exponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},circularIn:function(t){return 1-Math.sqrt(1-t*t)},circularOut:function(t){return Math.sqrt(1- --t*t)},circularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},elasticIn:function(t){var e,n=.1;return 0===t?0:1===t?1:(e=!n||n<1?(n=1,.1):.4*Math.asin(1/n)/(2*Math.PI),-n*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/.4))},elasticOut:function(t){var e,n=.1;return 0===t?0:1===t?1:(e=!n||n<1?(n=1,.1):.4*Math.asin(1/n)/(2*Math.PI),n*Math.pow(2,-10*t)*Math.sin((t-e)*(2*Math.PI)/.4)+1)},elasticInOut:function(t){var e,n=.1;return 0===t?0:1===t?1:(e=!n||n<1?(n=1,.1):.4*Math.asin(1/n)/(2*Math.PI),(t*=2)<1?n*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/.4)*-.5:n*Math.pow(2,-10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/.4)*.5+1)},backIn:function(t){return t*t*(2.70158*t-1.70158)},backOut:function(t){return--t*t*(2.70158*t+1.70158)+1},backInOut:function(t){var e=2.5949095;return(t*=2)<1?t*t*((1+e)*t-e)*.5:.5*((t-=2)*t*((1+e)*t+e)+2)},bounceIn:function(t){return 1-te.bounceOut(1-t)},bounceOut:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},bounceInOut:function(t){return t<.5?.5*te.bounceIn(2*t):.5*te.bounceOut(2*t-1)+.5}};function ee(t){this._target=t.target,this._life=t.life||1e3,this._delay=t.delay||0,this._initialized=!1,this.loop=null!=t.loop&&t.loop,this.gap=t.gap||0,this.easing=t.easing||"Linear",this.onframe=t.onframe,this.ondestroy=t.ondestroy,this.onrestart=t.onrestart,this._pausedTime=0,this._paused=!1}ee.prototype={constructor:ee,step:function(t,e){if(this._initialized||(this._startTime=t+this._delay,this._initialized=!0),this._paused)this._pausedTime+=e;else{var n=(t-this._startTime-this._pausedTime)/this._life;if(!(n<0)){n=Math.min(n,1);var i=this.easing,r="string"==typeof i?te[i]:i,a="function"==typeof r?r(n):n;return this.fire("frame",a),1===n?this.loop?(this.restart(t),"restart"):(this._needsRemove=!0,"destroy"):null}}},restart:function(t){var e=(t-this._startTime-this._pausedTime)%this._life;this._startTime=t-e+this.gap,this._pausedTime=0,this._needsRemove=!1},fire:function(t,e){this[t="on"+t]&&this[t](this._target,e)},pause:function(){this._paused=!0},resume:function(){this._paused=!1}};function ne(){this.head=null,this.tail=null,this._len=0}var ie=ne.prototype;ie.insert=function(t){var e=new ae(t);return this.insertEntry(e),e},ie.insertEntry=function(t){this.head?((this.tail.next=t).prev=this.tail,t.next=null,this.tail=t):this.head=this.tail=t,this._len++},ie.remove=function(t){var e=t.prev,n=t.next;e?e.next=n:this.head=n,n?n.prev=e:this.tail=e,t.next=t.prev=null,this._len--},ie.len=function(){return this._len},ie.clear=function(){this.head=this.tail=null,this._len=0};function re(t){this._list=new ne,this._map={},this._maxSize=t||10,this._lastRemovedEntry=null}var ae=function(t){this.value=t,this.next,this.prev},oe=re.prototype;oe.put=function(t,e){var n=this._list,i=this._map,r=null;if(null==i[t]){var a=n.len(),o=this._lastRemovedEntry;if(a>=this._maxSize&&0<a){var s=n.head;n.remove(s),delete i[s.key],r=s.value,this._lastRemovedEntry=s}o?o.value=e:o=new ae(e),o.key=t,n.insertEntry(o),i[t]=o}return r},oe.get=function(t){var e=this._map[t],n=this._list;if(null!=e)return e!==n.tail&&(n.remove(e),n.insertEntry(e)),e.value},oe.clear=function(){this._list.clear(),this._map={}};var se={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};function le(t){return(t=Math.round(t))<0?0:255<t?255:t}function he(t){return t<0?0:1<t?1:t}function ue(t){return t.length&&"%"===t.charAt(t.length-1)?le(parseFloat(t)/100*255):le(parseInt(t,10))}function ce(t){return t.length&&"%"===t.charAt(t.length-1)?he(parseFloat(t)/100):he(parseFloat(t))}function de(t,e,n){return n<0?n+=1:1<n&&(n-=1),6*n<1?t+(e-t)*n*6:2*n<1?e:3*n<2?t+(e-t)*(2/3-n)*6:t}function fe(t,e,n,i,r){return t[0]=e,t[1]=n,t[2]=i,t[3]=r,t}function pe(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}var ge=new re(20),ve=null;function me(t,e){ve&&pe(ve,e),ve=ge.put(t,ve||e.slice())}function ye(t,e){if(t){e=e||[];var n=ge.get(t);if(n)return pe(e,n);var i,r=(t+="").replace(/ /g,"").toLowerCase();if(r in se)return pe(e,se[r]),me(t,e),e;if("#"===r.charAt(0))return 4===r.length?0<=(i=parseInt(r.substr(1),16))&&i<=4095?(fe(e,(3840&i)>>4|(3840&i)>>8,240&i|(240&i)>>4,15&i|(15&i)<<4,1),me(t,e),e):void fe(e,0,0,0,1):7===r.length?0<=(i=parseInt(r.substr(1),16))&&i<=16777215?(fe(e,(16711680&i)>>16,(65280&i)>>8,255&i,1),me(t,e),e):void fe(e,0,0,0,1):void 0;var a=r.indexOf("("),o=r.indexOf(")");if(-1!==a&&o+1===r.length){var s=r.substr(0,a),l=r.substr(a+1,o-(a+1)).split(","),h=1;switch(s){case"rgba":if(4!==l.length)return void fe(e,0,0,0,1);h=ce(l.pop());case"rgb":return 3!==l.length?void fe(e,0,0,0,1):(fe(e,ue(l[0]),ue(l[1]),ue(l[2]),h),me(t,e),e);case"hsla":return 4!==l.length?void fe(e,0,0,0,1):(l[3]=ce(l[3]),_e(l,e),me(t,e),e);case"hsl":return 3!==l.length?void fe(e,0,0,0,1):(_e(l,e),me(t,e),e);default:return}}fe(e,0,0,0,1)}}function _e(t,e){var n=(parseFloat(t[0])%360+360)%360/360,i=ce(t[1]),r=ce(t[2]),a=r<=.5?r*(i+1):r+i-r*i,o=2*r-a;return fe(e=e||[],le(255*de(o,a,n+1/3)),le(255*de(o,a,n)),le(255*de(o,a,n-1/3)),1),4===t.length&&(e[3]=t[3]),e}function xe(t,e){if(t&&t.length){var n=t[0]+","+t[1]+","+t[2];return"rgba"!==e&&"hsva"!==e&&"hsla"!==e||(n+=","+t[3]),e+"("+n+")"}}var we=Array.prototype.slice;function be(t,e){return t[e]}function Se(t,e,n){t[e]=n}function Me(t,e,n){return(e-t)*n+t}function Ie(t,e,n){return.5<n?e:t}function Te(t,e,n,i,r){var a=t.length;if(1===r)for(var o=0;o<a;o++)i[o]=Me(t[o],e[o],n);else{var s=a&&t[0].length;for(o=0;o<a;o++)for(var l=0;l<s;l++)i[o][l]=Me(t[o][l],e[o][l],n)}}function Ce(t,e,n){var i=t.length,r=e.length;if(i!==r)if(r<i)t.length=r;else for(var a=i;a<r;a++)t.push(1===n?e[a]:we.call(e[a]));var o=t[0]&&t[0].length;for(a=0;a<t.length;a++)if(1===n)isNaN(t[a])&&(t[a]=e[a]);else for(var s=0;s<o;s++)isNaN(t[a][s])&&(t[a][s]=e[a][s])}function ke(t,e,n){if(t===e)return!0;var i=t.length;if(i!==e.length)return!1;if(1===n){for(var r=0;r<i;r++)if(t[r]!==e[r])return!1}else{var a=t[0].length;for(r=0;r<i;r++)for(var o=0;o<a;o++)if(t[r][o]!==e[r][o])return!1}return!0}function De(t,e,n,i,r,a,o,s,l){var h=t.length;if(1===l)for(var u=0;u<h;u++)s[u]=Ae(t[u],e[u],n[u],i[u],r,a,o);else{var c=t[0].length;for(u=0;u<h;u++)for(var d=0;d<c;d++)s[u][d]=Ae(t[u][d],e[u][d],n[u][d],i[u][d],r,a,o)}}function Ae(t,e,n,i,r,a,o){var s=.5*(n-t),l=.5*(i-e);return(2*(e-n)+s+l)*o+(-3*(e-n)-2*s-l)*a+s*r+e}function Le(t){if(P(t)){var e=t.length;if(P(t[0])){for(var n=[],i=0;i<e;i++)n.push(we.call(t[i]));return n}return we.call(t)}return t}function Pe(t){return t[0]=Math.floor(t[0]),t[1]=Math.floor(t[1]),t[2]=Math.floor(t[2]),"rgba("+t.join(",")+")"}function Oe(t,e,n,i,a,r){var o=t._getter,s=t._setter,l="spline"===e,h=i.length;if(h){var u,c=P(i[0].value),d=!1,f=!1,p=c?function(t){var e=t[t.length-1].value;return P(e&&e[0])?2:1}(i):0;i.sort(function(t,e){return t.time-e.time}),u=i[h-1].time;for(var g=[],v=[],m=i[0].value,y=!0,_=0;_<h;_++){g.push(i[_].time/u);var x=i[_].value;if(c&&ke(x,m,p)||!c&&x===m||(y=!1),"string"==typeof(m=x)){var w=ye(x);w?(x=w,d=!0):f=!0}v.push(x)}if(r||!y){var b=v[h-1];for(_=0;_<h-1;_++)c?Ce(v[_],b,p):!isNaN(v[_])||isNaN(b)||f||d||(v[_]=b);c&&Ce(o(t._target,a),b,p);var S,M,I,T,C,k=0,D=0;if(d)var A=[0,0,0,0];var L=new ee({target:t._target,life:u,loop:t._loop,delay:t._delay,onframe:function(t,e){var n;if(e<0)n=0;else if(e<D){for(n=Math.min(k+1,h-1);0<=n&&!(g[n]<=e);n--);n=Math.min(n,h-2)}else{for(n=k;n<h&&!(g[n]>e);n++);n=Math.min(n-1,h-2)}D=e;var i=g[(k=n)+1]-g[n];if(0!=i)if(S=(e-g[n])/i,l)if(I=v[n],M=v[0===n?n:n-1],T=v[h-2<n?h-1:n+1],C=v[h-3<n?h-1:n+2],c)De(M,I,T,C,S,S*S,S*S*S,o(t,a),p);else{if(d)r=De(M,I,T,C,S,S*S,S*S*S,A,1),r=Pe(A);else{if(f)return Ie(I,T,S);r=Ae(M,I,T,C,S,S*S,S*S*S)}s(t,a,r)}else if(c)Te(v[n],v[n+1],S,o(t,a),p);else{var r;if(d)Te(v[n],v[n+1],S,A,1),r=Pe(A);else{if(f)return Ie(v[n],v[n+1],S);r=Me(v[n],v[n+1],S)}s(t,a,r)}},ondestroy:n});return e&&"spline"!==e&&(L.easing=e),L}}}function Ee(t,e,n,i){this._tracks={},this._target=t,this._loop=e||!1,this._getter=n||be,this._setter=i||Se,this._clipCount=0,this._delay=0,this._doneList=[],this._onframeList=[],this._clipList=[]}Ee.prototype={when:function(t,e){var n=this._tracks;for(var i in e)if(e.hasOwnProperty(i)){if(!n[i]){n[i]=[];var r=this._getter(this._target,i);if(null==r)continue;0!==t&&n[i].push({time:0,value:Le(r)})}n[i].push({time:t,value:e[i]})}return this},during:function(t){return this._onframeList.push(t),this},pause:function(){for(var t=0;t<this._clipList.length;t++)this._clipList[t].pause();this._paused=!0},resume:function(){for(var t=0;t<this._clipList.length;t++)this._clipList[t].resume();this._paused=!1},isPaused:function(){return!!this._paused},_doneCallback:function(){this._tracks={},this._clipList.length=0;for(var t=this._doneList,e=t.length,n=0;n<e;n++)t[n].call(this)},start:function(t,e){function n(){--a||r._doneCallback()}var i,r=this,a=0;for(var o in this._tracks)if(this._tracks.hasOwnProperty(o)){var s=Oe(this,t,n,this._tracks[o],o,e);s&&(this._clipList.push(s),a++,this.animation&&this.animation.addClip(s),i=s)}if(i){var l=i.onframe;i.onframe=function(t,e){l(t,e);for(var n=0;n<r._onframeList.length;n++)r._onframeList[n](t,e)}}return a||this._doneCallback(),this},stop:function(t){for(var e=this._clipList,n=this.animation,i=0;i<e.length;i++){var r=e[i];t&&r.onframe(this._target,1),n&&n.removeClip(r)}e.length=0},delay:function(t){return this._delay=t,this},done:function(t){return t&&this._doneList.push(t),this},getClips:function(){return this._clipList}};var Ne=1;"undefined"!=typeof window&&(Ne=Math.max(window.devicePixelRatio||1,1));var Be=Ne,Re=function(){};function ze(){this.animators=[]}var Fe=Re;function Ve(t,e,n,i,r,a,o,s){C(i)?(a=r,r=i,i=0):T(r)?(a=r,r="linear",i=0):T(i)?(a=i,i=0):n=T(n)?(a=n,500):n||500,t.stopAnimation(),function t(e,n,i,r,a,o,s){var l={};var h=0;for(var u in r)r.hasOwnProperty(u)&&(null!=i[u]?O(r[u])&&!P(r[u])?t(e,n?n+"."+u:u,i[u],r[u],a,o,s):(s?(l[u]=i[u],We(e,n,u,r[u])):l[u]=r[u],h++):null==r[u]||s||We(e,n,u,r[u]));0<h&&e.animate(n,!1).when(null==a?500:a,l).delay(o||0)}(t,"",t,e,n,i,s);var l=t.animators.slice(),h=l.length;function u(){--h||a&&a()}h||a&&a();for(var c=0;c<l.length;c++)l[c].done(u).start(r,o)}function We(t,e,n,i){if(e){var r={};r[e]={},r[e][n]=i,t.attr(r)}else t.attr(n,i)}ze.prototype={constructor:ze,animate:function(t,e){var n,i=!1,r=this,a=this.__zr;if(t){var o=t.split("."),s=r;i="shape"===o[0];for(var l=0,h=o.length;l<h;l++)s=s&&s[o[l]];s&&(n=s)}else n=r;if(n){var u=r.animators,c=new Ee(n,e);return c.during(function(t){r.dirty(i)}).done(function(){u.splice(g(u,c),1)}),u.push(c),a&&a.animation.addAnimator(c),c}Fe('Property "'+t+'" is not existed in element '+r.id)},stopAnimation:function(t){for(var e=this.animators,n=e.length,i=0;i<n;i++)e[i].stop(t);return e.length=0,this},animateTo:function(t,e,n,i,r,a){Ve(this,t,e,n,i,r,a)},animateFrom:function(t,e,n,i,r,a){Ve(this,t,e,n,i,r,a,!0)}};var He=function(t){Zt.call(this,t),ft.call(this,t),ze.call(this,t),this.id=t.id||n()};He.prototype={type:"element",name:"",__zr:null,ignore:!1,clipPath:null,isGroup:!1,drift:function(t,e){switch(this.draggable){case"horizontal":e=0;break;case"vertical":t=0}var n=this.transform;(n=n||(this.transform=[1,0,0,1,0,0]))[4]+=t,n[5]+=e,this.decomposeTransform(),this.dirty(!1)},beforeUpdate:function(){},afterUpdate:function(){},update:function(){this.updateTransform()},traverse:function(t,e){},attrKV:function(t,e){if("position"===t||"scale"===t||"origin"===t){if(e){var n=this[t];(n=n||(this[t]=[]))[0]=e[0],n[1]=e[1]}}else this[t]=e},hide:function(){this.ignore=!0,this.__zr&&this.__zr.refresh()},show:function(){this.ignore=!1,this.__zr&&this.__zr.refresh()},attr:function(t,e){if("string"==typeof t)this.attrKV(t,e);else if(O(t))for(var n in t)t.hasOwnProperty(n)&&this.attrKV(n,t[n]);return this.dirty(!1),this},setClipPath:function(t){var e=this.__zr;e&&t.addSelfToZr(e),this.clipPath&&this.clipPath!==t&&this.removeClipPath(),(this.clipPath=t).__zr=e,(t.__clipTarget=this).dirty(!1)},removeClipPath:function(){var t=this.clipPath;t&&(t.__zr&&t.removeSelfFromZr(t.__zr),t.__zr=null,t.__clipTarget=null,this.clipPath=null,this.dirty(!1))},addSelfToZr:function(t){this.__zr=t;var e=this.animators;if(e)for(var n=0;n<e.length;n++)t.animation.addAnimator(e[n]);this.clipPath&&this.clipPath.addSelfToZr(t)},removeSelfFromZr:function(t){this.__zr=null;var e=this.animators;if(e)for(var n=0;n<e.length;n++)t.animation.removeAnimator(e[n]);this.clipPath&&this.clipPath.removeSelfFromZr(t)}},_(He,ze),_(He,Zt),_(He,ft);var Ge,Xe,Ue,Ye,qe=st,je=Math.min,Ze=Math.max;function $e(t,e,n,i){n<0&&(t+=n,n=-n),i<0&&(e+=i,i=-i),this.x=t,this.y=e,this.width=n,this.height=i}$e.prototype={constructor:$e,union:function(t){var e=je(t.x,this.x),n=je(t.y,this.y);this.width=Ze(t.x+t.width,this.x+this.width)-e,this.height=Ze(t.y+t.height,this.y+this.height)-n,this.x=e,this.y=n},applyTransform:(Ge=[],Xe=[],Ue=[],Ye=[],function(t){if(t){Ge[0]=Ue[0]=this.x,Ge[1]=Ye[1]=this.y,Xe[0]=Ye[0]=this.x+this.width,Xe[1]=Ue[1]=this.y+this.height,qe(Ge,Ge,t),qe(Xe,Xe,t),qe(Ue,Ue,t),qe(Ye,Ye,t),this.x=je(Ge[0],Xe[0],Ue[0],Ye[0]),this.y=je(Ge[1],Xe[1],Ue[1],Ye[1]);var e=Ze(Ge[0],Xe[0],Ue[0],Ye[0]),n=Ze(Ge[1],Xe[1],Ue[1],Ye[1]);this.width=e-this.x,this.height=n-this.y}}),calculateTransform:function(t){var e=t.width/this.width,n=t.height/this.height,i=Vt();return Gt(i,i,[-this.x,-this.y]),Ut(i,i,[e,n]),Gt(i,i,[t.x,t.y]),i},intersect:function(t){if(!t)return!1;t instanceof $e||(t=$e.create(t));var e=this,n=e.x,i=e.x+e.width,r=e.y,a=e.y+e.height,o=t.x,s=t.x+t.width,l=t.y,h=t.y+t.height;return!(i<o||s<n||a<l||h<r)},contain:function(t,e){var n=this;return t>=n.x&&t<=n.x+n.width&&e>=n.y&&e<=n.y+n.height},clone:function(){return new $e(this.x,this.y,this.width,this.height)},copy:function(t){this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height},plain:function(){return{x:this.x,y:this.y,width:this.width,height:this.height}}},$e.create=function(t){return new $e(t.x,t.y,t.width,t.height)};var Ke=function(t){for(var e in t=t||{},He.call(this,t),t)t.hasOwnProperty(e)&&(this[e]=t[e]);this._children=[],this.__storage=null,this.__dirty=!0};Ke.prototype={constructor:Ke,isGroup:!0,type:"group",silent:!1,children:function(){return this._children.slice()},childAt:function(t){return this._children[t]},childOfName:function(t){for(var e=this._children,n=0;n<e.length;n++)if(e[n].name===t)return e[n]},childCount:function(){return this._children.length},add:function(t){return t&&t!==this&&t.parent!==this&&(this._children.push(t),this._doAdd(t)),this},addBefore:function(t,e){if(t&&t!==this&&t.parent!==this&&e&&e.parent===this){var n=this._children,i=n.indexOf(e);0<=i&&(n.splice(i,0,t),this._doAdd(t))}return this},_doAdd:function(t){t.parent&&t.parent.remove(t);var e=(t.parent=this).__storage,n=this.__zr;e&&e!==t.__storage&&(e.addToStorage(t),t instanceof Ke&&t.addChildrenToStorage(e)),n&&n.refresh()},remove:function(t){var e=this.__zr,n=this.__storage,i=this._children,r=g(i,t);return r<0||(i.splice(r,1),t.parent=null,n&&(n.delFromStorage(t),t instanceof Ke&&t.delChildrenFromStorage(n)),e&&e.refresh()),this},removeAll:function(){var t,e,n=this._children,i=this.__storage;for(e=0;e<n.length;e++)t=n[e],i&&(i.delFromStorage(t),t instanceof Ke&&t.delChildrenFromStorage(i)),t.parent=null;return n.length=0,this},eachChild:function(t,e){for(var n=this._children,i=0;i<n.length;i++){var r=n[i];t.call(e,r,i)}return this},traverse:function(t,e){for(var n=0;n<this._children.length;n++){var i=this._children[n];t.call(e,i),"group"===i.type&&i.traverse(t,e)}return this},addChildrenToStorage:function(t){for(var e=0;e<this._children.length;e++){var n=this._children[e];t.addToStorage(n),n instanceof Ke&&n.addChildrenToStorage(t)}},delChildrenFromStorage:function(t){for(var e=0;e<this._children.length;e++){var n=this._children[e];t.delFromStorage(n),n instanceof Ke&&n.delChildrenFromStorage(t)}},dirty:function(){return this.__dirty=!0,this.__zr&&this.__zr.refresh(),this},getBoundingRect:function(t){for(var e=null,n=new $e(0,0,0,0),i=t||this._children,r=[],a=0;a<i.length;a++){var o=i[a];if(!o.ignore&&!o.invisible){var s=o.getBoundingRect(),l=o.getLocalTransform(r);l?(n.copy(s),n.applyTransform(l),(e=e||n.clone()).union(n)):(e=e||s.clone()).union(s)}}return e||n}},y(Ke,He);var Qe=32,Je=7;function tn(t,e,n,i){var r=e+1;if(r===n)return 1;if(i(t[r++],t[e])<0){for(;r<n&&i(t[r],t[r-1])<0;)r++;!function(t,e,n){n--;for(;e<n;){var i=t[e];t[e++]=t[n],t[n--]=i}}(t,e,r)}else for(;r<n&&0<=i(t[r],t[r-1]);)r++;return r-e}function en(t,e,n,i,r){for(i===e&&i++;i<n;i++){for(var a,o=t[i],s=e,l=i;s<l;)r(o,t[a=s+l>>>1])<0?l=a:s=1+a;var h=i-s;switch(h){case 3:t[s+3]=t[s+2];case 2:t[s+2]=t[s+1];case 1:t[s+1]=t[s];break;default:for(;0<h;)t[s+h]=t[s+h-1],h--}t[s]=o}}function nn(t,e,n,i,r,a){var o=0,s=0,l=1;if(0<a(t,e[n+r])){for(s=i-r;l<s&&0<a(t,e[n+r+l]);)(l=1+((o=l)<<1))<=0&&(l=s);s<l&&(l=s),o+=r,l+=r}else{for(s=r+1;l<s&&a(t,e[n+r-l])<=0;)(l=1+((o=l)<<1))<=0&&(l=s);s<l&&(l=s);var h=o;o=r-l,l=r-h}for(o++;o<l;){var u=o+(l-o>>>1);0<a(t,e[n+u])?o=u+1:l=u}return l}function rn(t,e,n,i,r,a){var o=0,s=0,l=1;if(a(t,e[n+r])<0){for(s=r+1;l<s&&a(t,e[n+r-l])<0;)(l=1+((o=l)<<1))<=0&&(l=s);s<l&&(l=s);var h=o;o=r-l,l=r-h}else{for(s=i-r;l<s&&0<=a(t,e[n+r+l]);)(l=1+((o=l)<<1))<=0&&(l=s);s<l&&(l=s),o+=r,l+=r}for(o++;o<l;){var u=o+(l-o>>>1);a(t,e[n+u])<0?l=u:o=u+1}return l}function an(p,g){var o,s,v=Je,l=0,m=[];function e(t){var e=o[t],n=s[t],i=o[t+1],r=s[t+1];s[t]=n+r,t===l-3&&(o[t+1]=o[t+2],s[t+1]=s[t+2]),l--;var a=rn(p[i],p,e,n,0,g);e+=a,0!==(n-=a)&&0!==(r=nn(p[e+n-1],p,i,r,r-1,g))&&(n<=r?function(t,e,n,i){var r=0;for(r=0;r<e;r++)m[r]=p[t+r];var a=0,o=n,s=t;if(p[s++]=p[o++],0==--i){for(r=0;r<e;r++)p[s+r]=m[a+r];return}if(1===e){for(r=0;r<i;r++)p[s+r]=p[o+r];return p[s+i]=m[a]}var l,h,u,c=v;for(;;){h=l=0,u=!1;do{if(g(p[o],m[a])<0){if(p[s++]=p[o++],h++,(l=0)==--i){u=!0;break}}else if(p[s++]=m[a++],l++,h=0,1==--e){u=!0;break}}while((l|h)<c);if(u)break;do{if(0!==(l=rn(p[o],m,a,e,0,g))){for(r=0;r<l;r++)p[s+r]=m[a+r];if(s+=l,a+=l,(e-=l)<=1){u=!0;break}}if(p[s++]=p[o++],0==--i){u=!0;break}if(0!==(h=nn(m[a],p,o,i,0,g))){for(r=0;r<h;r++)p[s+r]=p[o+r];if(s+=h,o+=h,0===(i-=h)){u=!0;break}}if(p[s++]=m[a++],1==--e){u=!0;break}c--}while(Je<=l||Je<=h);if(u)break;c<0&&(c=0),c+=2}if((v=c)<1&&(v=1),1===e){for(r=0;r<i;r++)p[s+r]=p[o+r];p[s+i]=m[a]}else{if(0===e)throw new Error;for(r=0;r<e;r++)p[s+r]=m[a+r]}}(e,n,i,r):function(t,e,n,i){var r=0;for(r=0;r<i;r++)m[r]=p[n+r];var a=t+e-1,o=i-1,s=n+i-1,l=0,h=0;if(p[s--]=p[a--],0==--e){for(l=s-(i-1),r=0;r<i;r++)p[l+r]=m[r];return}if(1===i){for(h=(s-=e)+1,l=(a-=e)+1,r=e-1;0<=r;r--)p[h+r]=p[l+r];return p[s]=m[o]}var u=v;for(;;){var c=0,d=0,f=!1;do{if(g(m[o],p[a])<0){if(p[s--]=p[a--],c++,(d=0)==--e){f=!0;break}}else if(p[s--]=m[o--],d++,c=0,1==--i){f=!0;break}}while((c|d)<u);if(f)break;do{if(0!==(c=e-rn(m[o],p,t,e,e-1,g))){for(e-=c,h=(s-=c)+1,l=(a-=c)+1,r=c-1;0<=r;r--)p[h+r]=p[l+r];if(0===e){f=!0;break}}if(p[s--]=m[o--],1==--i){f=!0;break}if(0!==(d=i-nn(p[a],m,0,i,i-1,g))){for(i-=d,h=(s-=d)+1,l=(o-=d)+1,r=0;r<d;r++)p[h+r]=m[l+r];if(i<=1){f=!0;break}}if(p[s--]=p[a--],0==--e){f=!0;break}u--}while(Je<=c||Je<=d);if(f)break;u<0&&(u=0),u+=2}(v=u)<1&&(v=1);if(1===i){for(h=(s-=e)+1,l=(a-=e)+1,r=e-1;0<=r;r--)p[h+r]=p[l+r];p[s]=m[o]}else{if(0===i)throw new Error;for(l=s-(i-1),r=0;r<i;r++)p[l+r]=m[r]}}(e,n,i,r))}o=[],s=[],this.mergeRuns=function(){for(;1<l;){var t=l-2;if(1<=t&&s[t-1]<=s[t]+s[t+1]||2<=t&&s[t-2]<=s[t]+s[t-1])s[t-1]<s[t+1]&&t--;else if(s[t]>s[t+1])break;e(t)}},this.forceMergeRuns=function(){for(;1<l;){var t=l-2;0<t&&s[t-1]<s[t+1]&&t--,e(t)}},this.pushRun=function(t,e){o[l]=t,s[l]=e,l+=1}}function on(t,e,n,i){n=n||0;var r=(i=i||t.length)-n;if(!(r<2)){var a=0;if(r<Qe)en(t,n,i,n+(a=tn(t,n,i,e)),e);else{var o=new an(t,e),s=function(t){for(var e=0;Qe<=t;)e|=1&t,t>>=1;return t+e}(r);do{if((a=tn(t,n,i,e))<s){var l=r;s<l&&(l=s),en(t,n,n+l,n+a,e),a=l}o.pushRun(n,a),o.mergeRuns(),r-=a,n+=a}while(0!==r);o.forceMergeRuns()}}}function sn(t,e){return t.zlevel===e.zlevel?t.z===e.z?t.z2-e.z2:t.z-e.z:t.zlevel-e.zlevel}function ln(){this._roots=[],this._displayList=[],this._displayListLen=0}ln.prototype={constructor:ln,traverse:function(t,e){for(var n=0;n<this._roots.length;n++)this._roots[n].traverse(t,e)},getDisplayList:function(t,e){return e=e||!1,t&&this.updateDisplayList(e),this._displayList},updateDisplayList:function(t){this._displayListLen=0;for(var e=this._roots,n=this._displayList,i=0,r=e.length;i<r;i++)this._updateAndAddDisplayable(e[i],null,t);n.length=this._displayListLen,m.canvasSupported&&on(n,sn)},_updateAndAddDisplayable:function(t,e,n){if(!t.ignore||n){t.beforeUpdate(),t.__dirty&&t.update(),t.afterUpdate();var i=t.clipPath;if(i){e=e?e.slice():[];for(var r=i,a=t;r;)r.parent=a,r.updateTransform(),e.push(r),r=(a=r).clipPath}if(t.isGroup){for(var o=t._children,s=0;s<o.length;s++){var l=o[s];t.__dirty&&(l.__dirty=!0),this._updateAndAddDisplayable(l,e,n)}t.__dirty=!1}else t.__clipPaths=e,this._displayList[this._displayListLen++]=t}},addRoot:function(t){t.__storage!==this&&(t instanceof Ke&&t.addChildrenToStorage(this),this.addToStorage(t),this._roots.push(t))},delRoot:function(t){if(null==t){for(var e=0;e<this._roots.length;e++){var n=this._roots[e];n instanceof Ke&&n.delChildrenFromStorage(this)}return this._roots=[],this._displayList=[],void(this._displayListLen=0)}if(t instanceof Array){e=0;for(var i=t.length;e<i;e++)this.delRoot(t[e])}else{var r=g(this._roots,t);0<=r&&(this.delFromStorage(t),this._roots.splice(r,1),t instanceof Ke&&t.delChildrenFromStorage(this))}},addToStorage:function(t){return t&&(t.__storage=this,t.dirty(!1)),this},delFromStorage:function(t){return t&&(t.__storage=null),this},dispose:function(){this._renderList=this._roots=null},displayableSortFunc:sn};var hn={shadowBlur:1,shadowOffsetX:1,shadowOffsetY:1,textShadowBlur:1,textShadowOffsetX:1,textShadowOffsetY:1,textBoxShadowBlur:1,textBoxShadowOffsetX:1,textBoxShadowOffsetY:1},un=function(t,e,n){return hn.hasOwnProperty(e)?n*t.dpr:n},cn={NONE:0,STYLE_BIND:1,PLAIN_TEXT:2},dn=9,fn=[["shadowBlur",0],["shadowOffsetX",0],["shadowOffsetY",0],["shadowColor","#000"],["lineCap","butt"],["lineJoin","miter"],["miterLimit",10]],pn=function(t){this.extendFrom(t,!1)};function gn(t,e,n){var i=null==e.x?0:e.x,r=null==e.x2?1:e.x2,a=null==e.y?0:e.y,o=null==e.y2?0:e.y2;return e.global||(i=i*n.width+n.x,r=r*n.width+n.x,a=a*n.height+n.y,o=o*n.height+n.y),i=isNaN(i)?0:i,r=isNaN(r)?1:r,a=isNaN(a)?0:a,o=isNaN(o)?0:o,t.createLinearGradient(i,a,r,o)}function vn(t,e,n){var i=n.width,r=n.height,a=Math.min(i,r),o=null==e.x?.5:e.x,s=null==e.y?.5:e.y,l=null==e.r?.5:e.r;return e.global||(o=o*i+n.x,s=s*r+n.y,l*=a),t.createRadialGradient(o,s,0,o,s,l)}pn.prototype={constructor:pn,fill:"#000",stroke:null,opacity:1,fillOpacity:null,strokeOpacity:null,lineDash:null,lineDashOffset:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,lineWidth:1,strokeNoScale:!1,text:null,font:null,textFont:null,fontStyle:null,fontWeight:null,fontSize:null,fontFamily:null,textTag:null,textFill:"#000",textStroke:null,textWidth:null,textHeight:null,textStrokeWidth:0,textLineHeight:null,textPosition:"inside",textRect:null,textOffset:null,textAlign:null,textVerticalAlign:null,textDistance:5,textShadowColor:"transparent",textShadowBlur:0,textShadowOffsetX:0,textShadowOffsetY:0,textBoxShadowColor:"transparent",textBoxShadowBlur:0,textBoxShadowOffsetX:0,textBoxShadowOffsetY:0,transformText:!1,textRotation:0,textOrigin:null,textBackgroundColor:null,textBorderColor:null,textBorderWidth:0,textBorderRadius:0,textPadding:null,rich:null,truncate:null,blend:null,bind:function(t,e,n){var i=this,r=n&&n.style,a=!r||t.__attrCachedBy!==cn.STYLE_BIND;t.__attrCachedBy=cn.STYLE_BIND;for(var o=0;o<fn.length;o++){var s=fn[o],l=s[0];!a&&i[l]===r[l]||(t[l]=un(t,l,i[l]||s[1]))}if(!a&&i.fill===r.fill||(t.fillStyle=i.fill),!a&&i.stroke===r.stroke||(t.strokeStyle=i.stroke),!a&&i.opacity===r.opacity||(t.globalAlpha=null==i.opacity?1:i.opacity),!a&&i.blend===r.blend||(t.globalCompositeOperation=i.blend||"source-over"),this.hasStroke()){var h=i.lineWidth;t.lineWidth=h/(this.strokeNoScale&&e&&e.getLineScale?e.getLineScale():1)}},hasFill:function(){var t=this.fill;return null!=t&&"none"!==t},hasStroke:function(){var t=this.stroke;return null!=t&&"none"!==t&&0<this.lineWidth},extendFrom:function(t,e){if(t)for(var n in t)!t.hasOwnProperty(n)||!0!==e&&(!1===e?this.hasOwnProperty(n):null==t[n])||(this[n]=t[n])},set:function(t,e){"string"==typeof t?this[t]=e:this.extendFrom(t,!0)},clone:function(){var t=new this.constructor;return t.extendFrom(this,!0),t},getGradient:function(t,e,n){for(var i=("radial"===e.type?vn:gn)(t,e,n),r=e.colorStops,a=0;a<r.length;a++)i.addColorStop(r[a].offset,r[a].color);return i}};for(var mn=pn.prototype,yn=0;yn<fn.length;yn++){var _n=fn[yn];_n[0]in mn||(mn[_n[0]]=_n[1])}pn.getGradient=mn.getGradient;function xn(t,e){this.image=t,this.repeat=e,this.type="pattern"}function wn(){return!1}function bn(t,e,n){var i=v(),r=e.getWidth(),a=e.getHeight(),o=i.style;return o&&(o.position="absolute",o.left=0,o.top=0,o.width=r+"px",o.height=a+"px",i.setAttribute("data-zr-dom-id",t)),i.width=r*n,i.height=a*n,i}function Sn(t,e,n){var i;n=n||Be,"string"==typeof t?i=bn(t,e,n):O(t)&&(t=(i=t).id),this.id=t;var r=(this.dom=i).style;r&&(i.onselectstart=wn,r["-webkit-user-select"]="none",r["user-select"]="none",r["-webkit-touch-callout"]="none",r["-webkit-tap-highlight-color"]="rgba(0,0,0,0)",r.padding=0,r.margin=0,r["border-width"]=0),this.domBack=null,this.ctxBack=null,this.painter=e,this.config=null,this.clearColor=0,this.motionBlur=!1,this.lastFrameAlpha=.7,this.dpr=n}Sn.prototype={constructor:Sn,__dirty:!0,__used:!(xn.prototype.getCanvasPattern=function(t){return t.createPattern(this.image,this.repeat||"repeat")}),__drawIndex:0,__startIndex:0,__endIndex:0,incremental:!1,getElementCount:function(){return this.__endIndex-this.__startIndex},initContext:function(){this.ctx=this.dom.getContext("2d"),this.ctx.dpr=this.dpr},createBackBuffer:function(){var t=this.dpr;this.domBack=bn("back-"+this.id,this.painter,t),this.ctxBack=this.domBack.getContext("2d"),1!==t&&this.ctxBack.scale(t,t)},resize:function(t,e){var n=this.dpr,i=this.dom,r=i.style,a=this.domBack;r&&(r.width=t+"px",r.height=e+"px"),i.width=t*n,i.height=e*n,a&&(a.width=t*n,a.height=e*n,1!==n&&this.ctxBack.scale(n,n))},clear:function(t,e){var n,i=this.dom,r=this.ctx,a=i.width,o=i.height,s=(e=e||this.clearColor,this.motionBlur&&!t),l=this.lastFrameAlpha,h=this.dpr;s&&(this.domBack||this.createBackBuffer(),this.ctxBack.globalCompositeOperation="copy",this.ctxBack.drawImage(i,0,0,a/h,o/h)),r.clearRect(0,0,a,o),e&&"transparent"!==e&&(e.colorStops?(n=e.__canvasGradient||pn.getGradient(r,e,{x:0,y:0,width:a,height:o}),e.__canvasGradient=n):e.image&&(n=xn.prototype.getCanvasPattern.call(e,r)),r.save(),r.fillStyle=n||e,r.fillRect(0,0,a,o),r.restore());if(s){var u=this.domBack;r.save(),r.globalAlpha=l,r.drawImage(u,0,0,a,o),r.restore()}}};var Mn="undefined"!=typeof window&&(window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.msRequestAnimationFrame&&window.msRequestAnimationFrame.bind(window)||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame)||function(t){setTimeout(t,16)},In=new re(50);function Tn(t){if("string"!=typeof t)return t;var e=In.get(t);return e&&e.image}function Cn(t,e,n,i,r){if(t){if("string"!=typeof t)return t;if(e&&e.__zrImageSrc===t||!n)return e;var a=In.get(t),o={hostEl:n,cb:i,cbPayload:r};return a?Dn(e=a.image)||a.pending.push(o):((e=new Image).onload=e.onerror=kn,In.put(t,e.__cachedImgObj={image:e,pending:[o]}),e.src=e.__zrImageSrc=t),e}return e}function kn(){var t=this.__cachedImgObj;this.onload=this.onerror=this.__cachedImgObj=null;for(var e=0;e<t.pending.length;e++){var n=t.pending[e],i=n.cb;i&&i(this,n.cbPayload),n.hostEl.dirty()}t.pending.length=0}function Dn(t){return t&&t.width&&t.height}var An={},Ln=0,Pn=5e3,On=/\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,En="12px sans-serif",Nn={};function Bn(t,e){var n=t+":"+(e=e||En);if(An[n])return An[n];for(var i,r,a=(t+"").split("\n"),o=0,s=0,l=a.length;s<l;s++)o=Math.max((i=a[s],r=e,Nn.measureText(i,r)).width,o);return Pn<Ln&&(Ln=0,An={}),Ln++,An[n]=o}function Rn(t,e,n,i,r,a,o,s){return o?function(t,e,n,i,r,a,o,s){var l=qn(t,{rich:o,truncate:s,font:e,textAlign:n,textPadding:r,textLineHeight:a}),h=l.outerWidth,u=l.outerHeight,c=zn(0,h,n),d=Fn(0,u,i);return new $e(c,d,h,u)}(t,e,n,i,r,a,o,s):function(t,e,n,i,r,a,o){var s=Yn(t,e,r,a,o),l=Bn(t,e);r&&(l+=r[1]+r[3]);var h=s.outerHeight,u=zn(0,l,n),c=Fn(0,h,i),d=new $e(u,c,l,h);return d.lineHeight=s.lineHeight,d}(t,e,n,i,r,a,s)}function zn(t,e,n){return"right"===n?t-=e:"center"===n&&(t-=e/2),t}function Fn(t,e,n){return"middle"===n?t-=e/2:"bottom"===n&&(t-=e),t}function Vn(t,e,n){var i=e.textPosition,r=e.textDistance,a=n.x,o=n.y;r=r||0;var s=n.height,l=n.width,h=s/2,u="left",c="top";switch(i){case"left":a-=r,o+=h,u="right",c="middle";break;case"right":a+=r+l,o+=h,c="middle";break;case"top":a+=l/2,o-=r,u="center",c="bottom";break;case"bottom":a+=l/2,o+=s+r,u="center";break;case"inside":a+=l/2,o+=h,u="center",c="middle";break;case"insideLeft":a+=r,o+=h,c="middle";break;case"insideRight":a+=l-r,o+=h,u="right",c="middle";break;case"insideTop":a+=l/2,o+=r,u="center";break;case"insideBottom":a+=l/2,o+=s-r,u="center",c="bottom";break;case"insideTopLeft":a+=r,o+=r;break;case"insideTopRight":a+=l-r,o+=r,u="right";break;case"insideBottomLeft":a+=r,o+=s-r,c="bottom";break;case"insideBottomRight":a+=l-r,o+=s-r,u="right",c="bottom"}return(t=t||{}).x=a,t.y=o,t.textAlign=u,t.textVerticalAlign=c,t}function Wn(t,e,n,i,r){if(!e)return"";var a=(t+"").split("\n");r=Hn(e,n,i,r);for(var o=0,s=a.length;o<s;o++)a[o]=Gn(a[o],r);return a.join("\n")}function Hn(t,e,n,i){(i=S({},i)).font=e;n=F(n,"...");i.maxIterations=F(i.maxIterations,2);var r=i.minChar=F(i.minChar,0);i.cnCharWidth=Bn("国",e);var a=i.ascCharWidth=Bn("a",e);i.placeholder=F(i.placeholder,"");for(var o=t=Math.max(0,t-1),s=0;s<r&&a<=o;s++)o-=a;var l=Bn(n,e);return o<l&&(n="",l=0),o=t-l,i.ellipsis=n,i.ellipsisWidth=l,i.contentWidth=o,i.containerWidth=t,i}function Gn(t,e){var n=e.containerWidth,i=e.font,r=e.contentWidth;if(!n)return"";var a=Bn(t,i);if(a<=n)return t;for(var o=0;;o++){if(a<=r||o>=e.maxIterations){t+=e.ellipsis;break}var s=0===o?Xn(t,r,e.ascCharWidth,e.cnCharWidth):0<a?Math.floor(t.length*r/a):0;a=Bn(t=t.substr(0,s),i)}return""===t&&(t=e.placeholder),t}function Xn(t,e,n,i){for(var r=0,a=0,o=t.length;a<o&&r<e;a++){var s=t.charCodeAt(a);r+=0<=s&&s<=127?n:i}return a}function Un(t){return Bn("国",t)}function Yn(t,e,n,i,r){null!=t&&(t+="");var a=F(i,Un(e)),o=t?t.split("\n"):[],s=o.length*a,l=s,h=!0;if(n&&(l+=n[0]+n[2]),t&&r){h=!1;var u=r.outerHeight,c=r.outerWidth;if(null!=u&&u<l)t="",o=[];else if(null!=c)for(var d=Hn(c-(n?n[1]+n[3]:0),e,r.ellipsis,{minChar:r.minChar,placeholder:r.placeholder}),f=0,p=o.length;f<p;f++)o[f]=Gn(o[f],d)}return{lines:o,height:s,outerHeight:l,lineHeight:a,canCacheByTextString:h}}function qn(t,e){var n={lines:[],width:0,height:0};if(null!=t&&(t+=""),!t)return n;for(var i,r=On.lastIndex=0;null!=(i=On.exec(t));){var a=i.index;r<a&&jn(n,t.substring(r,a)),jn(n,i[2],i[1]),r=On.lastIndex}r<t.length&&jn(n,t.substring(r,t.length));var o=n.lines,s=0,l=0,h=[],u=e.textPadding,c=e.truncate,d=c&&c.outerWidth,f=c&&c.outerHeight;u&&(null!=d&&(d-=u[1]+u[3]),null!=f&&(f-=u[0]+u[2]));for(var p=0;p<o.length;p++){for(var g=o[p],v=0,m=0,y=0;y<g.tokens.length;y++){var _=(D=g.tokens[y]).styleName&&e.rich[D.styleName]||{},x=D.textPadding=_.textPadding,w=D.font=_.font||e.font,b=D.textHeight=F(_.textHeight,Un(w));if(x&&(b+=x[0]+x[2]),D.height=b,D.lineHeight=V(_.textLineHeight,e.textLineHeight,b),D.textAlign=_&&_.textAlign||e.textAlign,D.textVerticalAlign=_&&_.textVerticalAlign||"middle",null!=f&&s+D.lineHeight>f)return{lines:[],width:0,height:0};D.textWidth=Bn(D.text,w);var S=_.textWidth,M=null==S||"auto"===S;if("string"==typeof S&&"%"===S.charAt(S.length-1))D.percentWidth=S,h.push(D),S=0;else{if(M){S=D.textWidth;var I=_.textBackgroundColor,T=I&&I.image;T&&Dn(T=Tn(T))&&(S=Math.max(S,T.width*b/T.height))}var C=x?x[1]+x[3]:0;S+=C;var k=null!=d?d-m:null;null!=k&&k<S&&(!M||k<C?(D.text="",D.textWidth=S=0):(D.text=Wn(D.text,k-C,w,c.ellipsis,{minChar:c.minChar}),D.textWidth=Bn(D.text,w),S=D.textWidth+C))}m+=D.width=S,_&&(v=Math.max(v,D.lineHeight))}g.width=m,s+=g.lineHeight=v,l=Math.max(l,m)}n.outerWidth=n.width=F(e.textWidth,l),n.outerHeight=n.height=F(e.textHeight,s),u&&(n.outerWidth+=u[1]+u[3],n.outerHeight+=u[0]+u[2]);for(p=0;p<h.length;p++){var D,A=(D=h[p]).percentWidth;D.width=parseInt(A,10)/100*l}return n}function jn(t,e,n){for(var i=""===e,r=e.split("\n"),a=t.lines,o=0;o<r.length;o++){var s=r[o],l={styleName:n,text:s,isLineHolder:!s&&!i};if(o)a.push({tokens:[l]});else{var h=(a[a.length-1]||(a[0]={tokens:[]})).tokens,u=h.length;1===u&&h[0].isLineHolder?h[0]=l:!s&&u&&!i||h.push(l)}}}function Zn(t,e){var n,i,r,a,o,s=e.x,l=e.y,h=e.width,u=e.height,c=e.r;h<0&&(s+=h,h=-h),u<0&&(l+=u,u=-u),"number"==typeof c?n=i=r=a=c:c instanceof Array?1===c.length?n=i=r=a=c[0]:2===c.length?(n=r=c[0],i=a=c[1]):3===c.length?(n=c[0],i=a=c[1],r=c[2]):(n=c[0],i=c[1],r=c[2],a=c[3]):n=i=r=a=0,h<n+i&&(n*=h/(o=n+i),i*=h/o),h<r+a&&(r*=h/(o=r+a),a*=h/o),u<i+r&&(i*=u/(o=i+r),r*=u/o),u<n+a&&(n*=u/(o=n+a),a*=u/o),t.moveTo(s+n,l),t.lineTo(s+h-i,l),0!==i&&t.arc(s+h-i,l+i,i,-Math.PI/2,0),t.lineTo(s+h,l+u-r),0!==r&&t.arc(s+h-r,l+u-r,r,0,Math.PI/2),t.lineTo(s+a,l+u),0!==a&&t.arc(s+a,l+u-a,a,Math.PI/2,Math.PI),t.lineTo(s,l+n),0!==n&&t.arc(s+n,l+n,n,Math.PI,1.5*Math.PI)}Nn.measureText=function(t,e){var n=p=p||v().getContext("2d");return n.font=e||En,n.measureText(t)};var $n=En,Kn={left:1,right:1,center:1},Qn={top:1,bottom:1,middle:1},Jn=[["textShadowBlur","shadowBlur",0],["textShadowOffsetX","shadowOffsetX",0],["textShadowOffsetY","shadowOffsetY",0],["textShadowColor","shadowColor","transparent"]],ti={},ei={};function ni(t){return ii(t),D(t.rich,ii),t}function ii(t){if(t){t.font=function(t){var e=(t.fontSize||t.fontFamily)&&[t.fontStyle,t.fontWeight,(t.fontSize||12)+"px",t.fontFamily||"sans-serif"].join(" ");return e&&X(e)||t.textFont||t.font}(t);var e=t.textAlign;"middle"===e&&(e="center"),t.textAlign=null==e||Kn[e]?e:"left";var n=t.textVerticalAlign||t.textBaseline;"center"===n&&(n="middle"),t.textVerticalAlign=null==n||Qn[n]?n:"top",t.textPadding&&(t.textPadding=H(t.textPadding))}}function ri(t,e,n,i,r,a){i.rich?function(t,e,n,i,r,a){a!==dn&&(e.__attrCachedBy=cn.NONE);var o=t.__textCotentBlock;o&&!t.__dirtyText||(o=t.__textCotentBlock=qn(n,i));!function(t,e,n,i,r){var a=n.width,o=n.outerWidth,s=n.outerHeight,l=i.textPadding,h=ui(ei,t,i,r),u=h.baseX,c=h.baseY,d=h.textAlign,f=h.textVerticalAlign;ai(e,i,r,u,c);var p=zn(u,o,d),g=Fn(c,s,f),v=p,m=g;l&&(v+=l[3],m+=l[0]);var y=v+a;si(i)&&li(t,e,i,p,g,o,s);for(var _=0;_<n.lines.length;_++){for(var x,w=n.lines[_],b=w.tokens,S=b.length,M=w.lineHeight,I=w.width,T=0,C=v,k=y,D=S-1;T<S&&(!(x=b[T]).textAlign||"left"===x.textAlign);)oi(t,e,x,i,M,m,C,"left"),I-=x.width,C+=x.width,T++;for(;0<=D&&"right"===(x=b[D]).textAlign;)oi(t,e,x,i,M,m,k,"right"),I-=x.width,k-=x.width,D--;for(C+=(a-(C-v)-(y-k)-I)/2;T<=D;)x=b[T],oi(t,e,x,i,M,m,C+x.width/2,"center"),C+=x.width,T++;m+=M}}(t,e,o,i,r)}(t,e,n,i,r,a):function(t,e,n,i,r,a){var o,s=si(i),l=!1,h=e.__attrCachedBy===cn.PLAIN_TEXT;a!==dn?(a&&(o=a.style,l=!s&&h&&o),e.__attrCachedBy=s?cn.NONE:cn.PLAIN_TEXT):h&&(e.__attrCachedBy=cn.NONE);var u=i.font||$n;l&&u===(o.font||$n)||(e.font=u);var c=t.__computedFont;t.__styleFont!==u&&(t.__styleFont=u,c=t.__computedFont=e.font);var d=i.textPadding,f=i.textLineHeight,p=t.__textCotentBlock;p&&!t.__dirtyText||(p=t.__textCotentBlock=Yn(n,c,d,f,i.truncate));var g=p.outerHeight,v=p.lines,m=p.lineHeight,y=ui(ei,t,i,r),_=y.baseX,x=y.baseY,w=y.textAlign||"left",b=y.textVerticalAlign;ai(e,i,r,_,x);var S=Fn(x,g,b),M=_,I=S;if(s||d){var T=Bn(n,c);d&&(T+=d[1]+d[3]);var C=zn(_,T,w);s&&li(t,e,i,C,S,T,g),d&&(M=gi(_,w,d),I+=d[0])}e.textAlign=w,e.textBaseline="middle",e.globalAlpha=i.opacity||1;for(var k=0;k<Jn.length;k++){var D=Jn[k],A=D[0],L=D[1],P=i[A];l&&P===o[A]||(e[L]=un(e,L,P||D[2]))}I+=m/2;var O=i.textStrokeWidth,E=l?o.textStrokeWidth:null,N=!l||O!==E,B=!l||N||i.textStroke!==o.textStroke,R=di(i.textStroke,O),z=fi(i.textFill);R&&(N&&(e.lineWidth=O),B&&(e.strokeStyle=R));z&&(l&&i.textFill===o.textFill||(e.fillStyle=z));if(1===v.length)R&&e.strokeText(v[0],M,I),z&&e.fillText(v[0],M,I);else for(k=0;k<v.length;k++)R&&e.strokeText(v[k],M,I),z&&e.fillText(v[k],M,I),I+=m}(t,e,n,i,r,a)}function ai(t,e,n,i,r){if(n&&e.textRotation){var a=e.textOrigin;"center"===a?(i=n.width/2+n.x,r=n.height/2+n.y):a&&(i=a[0]+n.x,r=a[1]+n.y),t.translate(i,r),t.rotate(-e.textRotation),t.translate(-i,-r)}}function oi(t,e,n,i,r,a,o,s){var l=i.rich[n.styleName]||{};l.text=n.text;var h=n.textVerticalAlign,u=a+r/2;"top"===h?u=a+n.height/2:"bottom"===h&&(u=a+r-n.height/2),!n.isLineHolder&&si(l)&&li(t,e,l,"right"===s?o-n.width:"center"===s?o-n.width/2:o,u-n.height/2,n.width,n.height);var c=n.textPadding;c&&(o=gi(o,s,c),u-=n.height/2-c[2]-n.textHeight/2),ci(e,"shadowBlur",V(l.textShadowBlur,i.textShadowBlur,0)),ci(e,"shadowColor",l.textShadowColor||i.textShadowColor||"transparent"),ci(e,"shadowOffsetX",V(l.textShadowOffsetX,i.textShadowOffsetX,0)),ci(e,"shadowOffsetY",V(l.textShadowOffsetY,i.textShadowOffsetY,0)),ci(e,"textAlign",s),ci(e,"textBaseline","middle"),ci(e,"font",n.font||$n);var d=di(l.textStroke||i.textStroke,p),f=fi(l.textFill||i.textFill),p=F(l.textStrokeWidth,i.textStrokeWidth);d&&(ci(e,"lineWidth",p),ci(e,"strokeStyle",d),e.strokeText(n.text,o,u)),f&&(ci(e,"fillStyle",f),e.fillText(n.text,o,u))}function si(t){return!!(t.textBackgroundColor||t.textBorderWidth&&t.textBorderColor)}function li(t,e,n,i,r,a,o){var s=n.textBackgroundColor,l=n.textBorderWidth,h=n.textBorderColor,u=C(s);if(ci(e,"shadowBlur",n.textBoxShadowBlur||0),ci(e,"shadowColor",n.textBoxShadowColor||"transparent"),ci(e,"shadowOffsetX",n.textBoxShadowOffsetX||0),ci(e,"shadowOffsetY",n.textBoxShadowOffsetY||0),u||l&&h){e.beginPath();var c=n.textBorderRadius;c?Zn(e,{x:i,y:r,width:a,height:o,r:c}):e.rect(i,r,a,o),e.closePath()}if(u)if(ci(e,"fillStyle",s),null!=n.fillOpacity){var d=e.globalAlpha;e.globalAlpha=n.fillOpacity*n.opacity,e.fill(),e.globalAlpha=d}else e.fill();else if(O(s)){var f=s.image;(f=Cn(f,null,t,hi,s))&&Dn(f)&&e.drawImage(f,i,r,a,o)}if(l&&h)if(ci(e,"lineWidth",l),ci(e,"strokeStyle",h),null!=n.strokeOpacity){d=e.globalAlpha;e.globalAlpha=n.strokeOpacity*n.opacity,e.stroke(),e.globalAlpha=d}else e.stroke()}function hi(t,e){e.image=t}function ui(t,e,n,i){var r=n.x||0,a=n.y||0,o=n.textAlign,s=n.textVerticalAlign;if(i){var l=n.textPosition;if(l instanceof Array)r=i.x+pi(l[0],i.width),a=i.y+pi(l[1],i.height);else{var h=e&&e.calculateTextPosition?e.calculateTextPosition(ti,n,i):Vn(ti,n,i);r=h.x,a=h.y,o=o||h.textAlign,s=s||h.textVerticalAlign}var u=n.textOffset;u&&(r+=u[0],a+=u[1])}return(t=t||{}).baseX=r,t.baseY=a,t.textAlign=o,t.textVerticalAlign=s,t}function ci(t,e,n){return t[e]=un(t,e,n),t[e]}function di(t,e){return null==t||e<=0||"transparent"===t||"none"===t?null:t.image||t.colorStops?"#000":t}function fi(t){return null==t||"none"===t?null:t.image||t.colorStops?"#000":t}function pi(t,e){return"string"==typeof t?0<=t.lastIndexOf("%")?parseFloat(t)/100*e:parseFloat(t):t}function gi(t,e,n){return"right"===e?t-n[1]:"center"===e?t+n[3]/2-n[1]/2:t+n[3]}function vi(t,e){return null!=t&&(t||e.textBackgroundColor||e.textBorderWidth&&e.textBorderColor||e.textPadding)}function mi(){}var yi=new $e;function _i(t){for(var e in t=t||{},He.call(this,t),t)t.hasOwnProperty(e)&&"style"!==e&&(this[e]=t[e]);this.style=new pn(t.style,this),this._rect=null,this.__clipPaths=null}function xi(t){_i.call(this,t)}_i.prototype={constructor:_i,type:"displayable",__dirty:!0,invisible:!(mi.prototype={constructor:mi,drawRectText:function(t,e){var n=this.style;e=n.textRect||e,this.__dirty&&ni(n);var i=n.text;if(null!=i&&(i+=""),vi(i,n)){t.save();var r=this.transform;n.transformText?this.setTransform(t):r&&(yi.copy(e),yi.applyTransform(r),e=yi),ri(this,t,i,n,e,dn),t.restore()}}}),z:0,z2:0,zlevel:0,draggable:!1,dragging:!1,silent:!1,culling:!1,cursor:"pointer",rectHover:!1,progressive:!1,incremental:!1,globalScaleRatio:1,beforeBrush:function(t){},afterBrush:function(t){},brush:function(t,e){},getBoundingRect:function(){},contain:function(t,e){return this.rectContain(t,e)},traverse:function(t,e){t.call(e,this)},rectContain:function(t,e){var n=this.transformCoordToLocal(t,e);return this.getBoundingRect().contain(n[0],n[1])},dirty:function(){this.__dirty=this.__dirtyText=!0,this._rect=null,this.__zr&&this.__zr.refresh()},animateStyle:function(t){return this.animate("style",t)},attrKV:function(t,e){"style"!==t?He.prototype.attrKV.call(this,t,e):this.style.set(e)},setStyle:function(t,e){return this.style.set(t,e),this.dirty(!1),this},useStyle:function(t){return this.style=new pn(t,this),this.dirty(!1),this},calculateTextPosition:null},y(_i,He),_(_i,mi),xi.prototype={constructor:xi,type:"image",brush:function(t,e){var n=this.style,i=n.image;n.bind(t,this,e);var r=this._image=Cn(i,this._image,this,this.onload);if(r&&Dn(r)){var a=n.x||0,o=n.y||0,s=n.width,l=n.height,h=r.width/r.height;if(null==s&&null!=l?s=l*h:null==l&&null!=s?l=s/h:null==s&&null==l&&(s=r.width,l=r.height),this.setTransform(t),n.sWidth&&n.sHeight){var u=n.sx||0,c=n.sy||0;t.drawImage(r,u,c,n.sWidth,n.sHeight,a,o,s,l)}else if(n.sx&&n.sy){var d=s-(u=n.sx),f=l-(c=n.sy);t.drawImage(r,u,c,d,f,a,o,s,l)}else t.drawImage(r,a,o,s,l);null!=n.text&&(this.restoreTransform(t),this.drawRectText(t,this.getBoundingRect()))}},getBoundingRect:function(){var t=this.style;return this._rect||(this._rect=new $e(t.x||0,t.y||0,t.width||0,t.height||0)),this._rect}},y(xi,_i);var wi=314159;function bi(t){return parseInt(t,10)}var Si=new $e(0,0,0,0),Mi=new $e(0,0,0,0);function Ii(t,e,n){this.type="canvas";var i=!t.nodeName||"CANVAS"===t.nodeName.toUpperCase();this._opts=n=S({},n||{}),this.dpr=n.devicePixelRatio||Be,this._singleCanvas=i;var r=(this.root=t).style;r&&(r["-webkit-tap-highlight-color"]="transparent",r["-webkit-user-select"]=r["user-select"]=r["-webkit-touch-callout"]="none",t.innerHTML=""),this.storage=e;var a=this._zlevelList=[],o=this._layers={};if(this._layerConfig={},this._needsManuallyCompositing=!1,i){var s=t.width,l=t.height;null!=n.width&&(s=n.width),null!=n.height&&(l=n.height),this.dpr=n.devicePixelRatio||1,t.width=s*this.dpr,t.height=l*this.dpr,this._width=s,this._height=l;var h=new Sn(t,this,this.dpr);h.__builtin__=!0,h.initContext(),(o[wi]=h).zlevel=wi,a.push(wi),this._domRoot=t}else{this._width=this._getSize(0),this._height=this._getSize(1);var u=this._domRoot=function(t,e){var n=document.createElement("div");return n.style.cssText=["position:relative","width:"+t+"px","height:"+e+"px","padding:0","margin:0","border-width:0"].join(";")+";",n}(this._width,this._height);t.appendChild(u)}this._hoverlayer=null,this._hoverElements=[]}Ii.prototype={constructor:Ii,getType:function(){return"canvas"},isSingleCanvas:function(){return this._singleCanvas},getViewportRoot:function(){return this._domRoot},getViewportRootOffset:function(){var t=this.getViewportRoot();if(t)return{offsetLeft:t.offsetLeft||0,offsetTop:t.offsetTop||0}},refresh:function(t){var e=this.storage.getDisplayList(!0),n=this._zlevelList;this._redrawId=Math.random(),this._paintList(e,t,this._redrawId);for(var i=0;i<n.length;i++){var r=n[i],a=this._layers[r];if(!a.__builtin__&&a.refresh){var o=0===i?this._backgroundColor:null;a.refresh(o)}}return this.refreshHover(),this},addHover:function(t,e){if(!t.__hoverMir){var n=new t.constructor({style:t.style,shape:t.shape,z:t.z,z2:t.z2,silent:t.silent});return(n.__from=t).__hoverMir=n,e&&n.setStyle(e),this._hoverElements.push(n),n}},removeHover:function(t){var e=t.__hoverMir,n=this._hoverElements,i=g(n,e);0<=i&&n.splice(i,1),t.__hoverMir=null},clearHover:function(t){for(var e=this._hoverElements,n=0;n<e.length;n++){var i=e[n].__from;i&&(i.__hoverMir=null)}e.length=0},refreshHover:function(){var t=this._hoverElements,e=t.length,n=this._hoverlayer;if(n&&n.clear(),e){on(t,this.storage.displayableSortFunc);var i={};(n=n||(this._hoverlayer=this.getLayer(1e5))).ctx.save();for(var r=0;r<e;){var a=t[r],o=a.__from;o&&o.__zr?(r++,o.invisible||(a.transform=o.transform,a.invTransform=o.invTransform,a.__clipPaths=o.__clipPaths,this._doPaintEl(a,n,!0,i))):(t.splice(r,1),o.__hoverMir=null,e--)}n.ctx.restore()}},getHoverLayer:function(){return this.getLayer(1e5)},_paintList:function(t,e,n){if(this._redrawId===n){e=e||!1,this._updateLayerStatus(t);var i=this._doPaintList(t,e);if(this._needsManuallyCompositing&&this._compositeManually(),!i){var r=this;Mn(function(){r._paintList(t,e,n)})}}},_compositeManually:function(){var e=this.getLayer(wi).ctx,n=this._domRoot.width,i=this._domRoot.height;e.clearRect(0,0,n,i),this.eachBuiltinLayer(function(t){t.virtual&&e.drawImage(t.dom,0,0,n,i)})},_doPaintList:function(t,e){for(var n=[],i=0;i<this._zlevelList.length;i++){var r=this._zlevelList[i];(s=this._layers[r]).__builtin__&&s!==this._hoverlayer&&(s.__dirty||e)&&n.push(s)}for(var a=!0,o=0;o<n.length;o++){var s,l=(s=n[o]).ctx,h={};l.save();var u=e?s.__startIndex:s.__drawIndex,c=!e&&s.incremental&&Date.now,d=c&&Date.now(),f=s.zlevel===this._zlevelList[0]?this._backgroundColor:null;if(s.__startIndex===s.__endIndex)s.clear(!1,f);else if(u===s.__startIndex){var p=t[u];p.incremental&&p.notClear&&!e||s.clear(!1,f)}-1===u&&(console.error("For some unknown reason. drawIndex is -1"),u=s.__startIndex);for(var g=u;g<s.__endIndex;g++){var v=t[g];if(this._doPaintEl(v,s,e,h),v.__dirty=v.__dirtyText=!1,c)if(15<Date.now()-d)break}s.__drawIndex=g,s.__drawIndex<s.__endIndex&&(a=!1),h.prevElClipPaths&&l.restore(),l.restore()}return m.wxa&&D(this._layers,function(t){t&&t.ctx&&t.ctx.draw&&t.ctx.draw()}),a},_doPaintEl:function(t,e,n,i){var r=e.ctx,a=t.transform;if((e.__dirty||n)&&!t.invisible&&0!==t.style.opacity&&(!a||a[0]||a[3])&&(!t.culling||!function(t,e,n){return Si.copy(t.getBoundingRect()),t.transform&&Si.applyTransform(t.transform),Mi.width=e,Mi.height=n,!Si.intersect(Mi)}(t,this._width,this._height))){var o=t.__clipPaths,s=i.prevElClipPaths;s&&!function(t,e){if(t===e)return!1;if(!t||!e||t.length!==e.length)return!0;for(var n=0;n<t.length;n++)if(t[n]!==e[n])return!0;return!1}(o,s)||(s&&(r.restore(),i.prevElClipPaths=null,i.prevEl=null),o&&(r.save(),function(t,e){for(var n=0;n<t.length;n++){var i=t[n];i.setTransform(e),e.beginPath(),i.buildPath(e,i.shape),e.clip(),i.restoreTransform(e)}}(o,r),i.prevElClipPaths=o)),t.beforeBrush&&t.beforeBrush(r),t.brush(r,i.prevEl||null),(i.prevEl=t).afterBrush&&t.afterBrush(r)}},getLayer:function(t,e){this._singleCanvas&&!this._needsManuallyCompositing&&(t=wi);var n=this._layers[t];return n||((n=new Sn("zr_"+t,this,this.dpr)).zlevel=t,n.__builtin__=!0,this._layerConfig[t]?f(n,this._layerConfig[t],!0):this._layerConfig[t-.01]&&f(n,this._layerConfig[t-.01],!0),e&&(n.virtual=e),this.insertLayer(t,n),n.initContext()),n},insertLayer:function(t,e){var n=this._layers,i=this._zlevelList,r=i.length,a=null,o=-1,s=this._domRoot;if(n[t])Fe("ZLevel "+t+" has been used already");else if(function(t){return!!t&&(!!t.__builtin__||"function"==typeof t.resize&&"function"==typeof t.refresh)}(e)){if(0<r&&t>i[0]){for(o=0;o<r-1&&!(i[o]<t&&i[o+1]>t);o++);a=n[i[o]]}if(i.splice(o+1,0,t),!(n[t]=e).virtual)if(a){var l=a.dom;l.nextSibling?s.insertBefore(e.dom,l.nextSibling):s.appendChild(e.dom)}else s.firstChild?s.insertBefore(e.dom,s.firstChild):s.appendChild(e.dom)}else Fe("Layer of zlevel "+t+" is not valid")},eachLayer:function(t,e){var n,i,r=this._zlevelList;for(i=0;i<r.length;i++)n=r[i],t.call(e,this._layers[n],n)},eachBuiltinLayer:function(t,e){var n,i,r,a=this._zlevelList;for(r=0;r<a.length;r++)i=a[r],(n=this._layers[i]).__builtin__&&t.call(e,n,i)},eachOtherLayer:function(t,e){var n,i,r,a=this._zlevelList;for(r=0;r<a.length;r++)i=a[r],(n=this._layers[i]).__builtin__||t.call(e,n,i)},getLayers:function(){return this._layers},_updateLayerStatus:function(t){function e(t){r&&(r.__endIndex!==t&&(r.__dirty=!0),r.__endIndex=t)}if(this.eachBuiltinLayer(function(t,e){t.__dirty=t.__used=!1}),this._singleCanvas)for(var n=1;n<t.length;n++){if((o=t[n]).zlevel!==t[n-1].zlevel||o.incremental){this._needsManuallyCompositing=!0;break}}var i,r=null,a=0;for(n=0;n<t.length;n++){var o,s,l=(o=t[n]).zlevel;i!==l&&(i=l,a=0),o.incremental?((s=this.getLayer(l+.001,this._needsManuallyCompositing)).incremental=!0,a=1):s=this.getLayer(l+(0<a?.01:0),this._needsManuallyCompositing),s.__builtin__||Fe("ZLevel "+l+" has been used by unkown layer "+s.id),s!==r&&(s.__used=!0,s.__startIndex!==n&&(s.__dirty=!0),s.__startIndex=n,s.incremental?s.__drawIndex=-1:s.__drawIndex=n,e(n),r=s),o.__dirty&&(s.__dirty=!0,s.incremental&&s.__drawIndex<0&&(s.__drawIndex=n))}e(n),this.eachBuiltinLayer(function(t,e){!t.__used&&0<t.getElementCount()&&(t.__dirty=!0,t.__startIndex=t.__endIndex=t.__drawIndex=0),t.__dirty&&t.__drawIndex<0&&(t.__drawIndex=t.__startIndex)})},clear:function(){return this.eachBuiltinLayer(this._clearLayer),this},_clearLayer:function(t){t.clear()},setBackgroundColor:function(t){this._backgroundColor=t},configLayer:function(t,e){if(e){var n=this._layerConfig;n[t]?f(n[t],e,!0):n[t]=e;for(var i=0;i<this._zlevelList.length;i++){var r=this._zlevelList[i];if(r===t||r===t+.01)f(this._layers[r],n[t],!0)}}},delLayer:function(t){var e=this._layers,n=this._zlevelList,i=e[t];i&&(i.dom.parentNode.removeChild(i.dom),delete e[t],n.splice(g(n,t),1))},resize:function(e,n){if(this._domRoot.style){var t=this._domRoot;t.style.display="none";var i=this._opts;if(null!=e&&(i.width=e),null!=n&&(i.height=n),e=this._getSize(0),n=this._getSize(1),t.style.display="",this._width!==e||n!==this._height){for(var r in t.style.width=e+"px",t.style.height=n+"px",this._layers)this._layers.hasOwnProperty(r)&&this._layers[r].resize(e,n);D(this._progressiveLayers,function(t){t.resize(e,n)}),this.refresh(!0)}this._width=e,this._height=n}else{if(null==e||null==n)return;this._width=e,this._height=n,this.getLayer(wi).resize(e,n)}return this},clearLayer:function(t){var e=this._layers[t];e&&e.clear()},dispose:function(){this.root.innerHTML="",this.root=this.storage=this._domRoot=this._layers=null},getRenderedCanvas:function(t){if(t=t||{},this._singleCanvas&&!this._compositeManually)return this._layers[wi].dom;var e=new Sn("image",this,t.pixelRatio||this.dpr);if(e.initContext(),e.clear(!1,t.backgroundColor||this._backgroundColor),t.pixelRatio<=this.dpr){this.refresh();var n=e.dom.width,i=e.dom.height,r=e.ctx;this.eachLayer(function(t){t.__builtin__?r.drawImage(t.dom,0,0,n,i):t.renderToCanvas&&(e.ctx.save(),t.renderToCanvas(e.ctx),e.ctx.restore())})}else for(var a={},o=this.storage.getDisplayList(!0),s=0;s<o.length;s++){var l=o[s];this._doPaintEl(l,e,!0,a)}return e.dom},getWidth:function(){return this._width},getHeight:function(){return this._height},_getSize:function(t){var e=this._opts,n=["width","height"][t],i=["clientWidth","clientHeight"][t],r=["paddingLeft","paddingTop"][t],a=["paddingRight","paddingBottom"][t];if(null!=e[n]&&"auto"!==e[n])return parseFloat(e[n]);var o=this.root,s=document.defaultView.getComputedStyle(o);return(o[i]||bi(s[n])||bi(o.style[n]))-(bi(s[r])||0)-(bi(s[a])||0)|0},pathToImage:function(t,e){e=e||this.dpr;var n=document.createElement("canvas"),i=n.getContext("2d"),r=t.getBoundingRect(),a=t.style,o=a.shadowBlur*e,s=a.shadowOffsetX*e,l=a.shadowOffsetY*e,h=a.hasStroke()?a.lineWidth:0,u=Math.max(h/2,o-s),c=Math.max(h/2,s+o),d=Math.max(h/2,o-l),f=Math.max(h/2,l+o),p=r.width+u+c,g=r.height+d+f;n.width=p*e,n.height=g*e,i.scale(e,e),i.clearRect(0,0,p,g),i.dpr=e;var v={position:t.position,rotation:t.rotation,scale:t.scale};t.position=[u-r.x,d-r.y],t.rotation=0,t.scale=[1,1],t.updateTransform(),t&&t.brush(i);var m=new xi({style:{x:0,y:0,image:n}});return null!=v.position&&(m.position=t.position=v.position),null!=v.rotation&&(m.rotation=t.rotation=v.rotation),null!=v.scale&&(m.scale=t.scale=v.scale),m}};function Ti(t){t=t||{},this.stage=t.stage||{},this.onframe=t.onframe||function(){},this._clips=[],this._running=!1,this._time,this._pausedTime,this._pauseStart,this._paused=!1,ft.call(this)}Ti.prototype={constructor:Ti,addClip:function(t){this._clips.push(t)},addAnimator:function(t){t.animation=this;for(var e=t.getClips(),n=0;n<e.length;n++)this.addClip(e[n])},removeClip:function(t){var e=g(this._clips,t);0<=e&&this._clips.splice(e,1)},removeAnimator:function(t){for(var e=t.getClips(),n=0;n<e.length;n++)this.removeClip(e[n]);t.animation=null},_update:function(){for(var t=(new Date).getTime()-this._pausedTime,e=t-this._time,n=this._clips,i=n.length,r=[],a=[],o=0;o<i;o++){var s=n[o],l=s.step(t,e);l&&(r.push(l),a.push(s))}for(o=0;o<i;)n[o]._needsRemove?(n[o]=n[i-1],n.pop(),i--):o++;i=r.length;for(o=0;o<i;o++)a[o].fire(r[o]);this._time=t,this.onframe(e),this.trigger("frame",e),this.stage.update&&this.stage.update()},_startLoop:function(){var e=this;this._running=!0,Mn(function t(){e._running&&(Mn(t),e._paused||e._update())})},start:function(){this._time=(new Date).getTime(),this._pausedTime=0,this._startLoop()},stop:function(){this._running=!1},pause:function(){this._paused||(this._pauseStart=(new Date).getTime(),this._paused=!0)},resume:function(){this._paused&&(this._pausedTime+=(new Date).getTime()-this._pauseStart,this._paused=!1)},clear:function(){this._clips=[]},isFinished:function(){return!this._clips.length},animate:function(t,e){var n=new Ee(t,(e=e||{}).loop,e.getter,e.setter);return this.addAnimator(n),n}},_(Ti,ft);var Ci,ki,Di=m.domSupported,Ai=(ki={pointerdown:1,pointerup:1,pointermove:1,pointerout:1},{mouse:Ci=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"],touch:["touchstart","touchend","touchmove"],pointer:A(Ci,function(t){var e=t.replace("mouse","pointer");return ki.hasOwnProperty(e)?e:t})}),Li={mouse:["mousemove","mouseup"],pointer:["pointermove","pointerup"]};function Pi(t){return"mousewheel"===t&&m.browser.firefox?"DOMMouseScroll":t}function Oi(t){var e=t.pointerType;return"pen"===e||"touch"===e}function Ei(t){t&&(t.zrByTouch=!0)}function Ni(t,e){for(var n=e,i=!1;n&&9!==n.nodeType&&!(i=n.domBelongToZr||n!==e&&n===t.painterRoot);)n=n.parentNode;return i}function Bi(t,e){this.type=e.type,this.target=this.currentTarget=t.dom,this.pointerType=e.pointerType,this.clientX=e.clientX,this.clientY=e.clientY}var Ri=Bi.prototype;Ri.stopPropagation=Ri.stopImmediatePropagation=Ri.preventDefault=$;var zi={mousedown:function(t){t=Ct(this.dom,t),this._mayPointerCapture=[t.zrX,t.zrY],this.trigger("mousedown",t)},mousemove:function(t){t=Ct(this.dom,t);var e=this._mayPointerCapture;!e||t.zrX===e[0]&&t.zrY===e[1]||Xi(this,!0),this.trigger("mousemove",t)},mouseup:function(t){t=Ct(this.dom,t),Xi(this,!1),this.trigger("mouseup",t)},mouseout:function(t){t=Ct(this.dom,t),this._pointerCapturing&&(t.zrEventControl="no_globalout");var e=t.toElement||t.relatedTarget;t.zrIsToLocalDOM=Ni(this,e),this.trigger("mouseout",t)},touchstart:function(t){Ei(t=Ct(this.dom,t)),this._lastTouchMoment=new Date,this.handler.processGesture(t,"start"),zi.mousemove.call(this,t),zi.mousedown.call(this,t)},touchmove:function(t){Ei(t=Ct(this.dom,t)),this.handler.processGesture(t,"change"),zi.mousemove.call(this,t)},touchend:function(t){Ei(t=Ct(this.dom,t)),this.handler.processGesture(t,"end"),zi.mouseup.call(this,t),+new Date-this._lastTouchMoment<300&&zi.click.call(this,t)},pointerdown:function(t){zi.mousedown.call(this,t)},pointermove:function(t){Oi(t)||zi.mousemove.call(this,t)},pointerup:function(t){zi.mouseup.call(this,t)},pointerout:function(t){Oi(t)||zi.mouseout.call(this,t)}};D(["click","mousewheel","dblclick","contextmenu"],function(e){zi[e]=function(t){t=Ct(this.dom,t),this.trigger(e,t)}});var Fi={pointermove:function(t){Oi(t)||Fi.mousemove.call(this,t)},pointerup:function(t){Fi.mouseup.call(this,t)},mousemove:function(t){this.trigger("mousemove",t)},mouseup:function(t){var e=this._pointerCapturing;Xi(this,!1),this.trigger("mouseup",t),e&&(t.zrEventControl="only_globalout",this.trigger("mouseout",t))}};function Vi(n,i){var r=i.domHandlers;m.pointerEventsSupported?D(Ai.pointer,function(e){Hi(i,e,function(t){r[e].call(n,t)})}):(m.touchEventsSupported&&D(Ai.touch,function(e){Hi(i,e,function(t){r[e].call(n,t),function(t){t.touching=!0,null!=t.touchTimer&&(clearTimeout(t.touchTimer),t.touchTimer=null),t.touchTimer=setTimeout(function(){t.touching=!1,t.touchTimer=null},700)}(i)})}),D(Ai.mouse,function(e){Hi(i,e,function(t){t=Tt(t),i.touching||r[e].call(n,t)})}))}function Wi(n,i){function t(e){Hi(i,e,function(t){t=Tt(t),Ni(n,t.target)||(t=function(t,e){return Ct(t.dom,new Bi(t,e),!0)}(n,t),i.domHandlers[e].call(n,t))},{capture:!0})}m.pointerEventsSupported?D(Li.pointer,t):m.touchEventsSupported||D(Li.mouse,t)}function Hi(t,e,n,i){t.mounted[e]=n,t.listenerOpts[e]=i,function(t,e,n,i){wt?t.addEventListener(e,n,i):t.attachEvent("on"+e,n)}(t.domTarget,Pi(e),n,i)}function Gi(t){var e,n,i,r,a=t.mounted;for(var o in a)a.hasOwnProperty(o)&&(e=t.domTarget,n=Pi(o),i=a[o],r=t.listenerOpts[o],wt?e.removeEventListener(n,i,r):e.detachEvent("on"+n,i));t.mounted={}}function Xi(t,e){if(t._mayPointerCapture=null,Di&&t._pointerCapturing^e){t._pointerCapturing=e;var n=t._globalHandlerScope;e?Wi(t,n):Gi(n)}}function Ui(t,e){this.domTarget=t,this.domHandlers=e,this.mounted={},this.listenerOpts={},this.touchTimer=null,this.touching=!1}function Yi(t,e){ft.call(this),this.dom=t,this.painterRoot=e,this._localHandlerScope=new Ui(t,zi),Di&&(this._globalHandlerScope=new Ui(document,Fi)),this._pointerCapturing=!1,this._mayPointerCapture=null,Vi(this,this._localHandlerScope)}var qi=Yi.prototype;qi.dispose=function(){Gi(this._localHandlerScope),Di&&Gi(this._globalHandlerScope)},qi.setCursor=function(t){this.dom.style&&(this.dom.style.cursor=t||"default")},_(Yi,ft);var ji=!m.canvasSupported,Zi={canvas:Ii};function $i(t,e){return new Ki(n(),t,e)}var Ki=function(t,e,n){n=n||{},this.dom=e,this.id=t;var i=this,r=new ln,a=n.renderer;if(ji){if(!Zi.vml)throw new Error("You need to require 'zrender/vml/vml' to support IE8");a="vml"}else a&&Zi[a]||(a="canvas");var o=new Zi[a](e,r,n,t);this.storage=r,this.painter=o;var s=m.node||m.worker?null:new Yi(o.getViewportRoot(),o.root);this.handler=new Nt(r,o,s,o.root),this.animation=new Ti({stage:{update:w(this.flush,this)}}),this.animation.start(),this._needsRefresh;var l=r.delFromStorage,h=r.addToStorage;r.delFromStorage=function(t){l.call(r,t),t&&t.removeSelfFromZr(i)},r.addToStorage=function(t){h.call(r,t),t.addSelfToZr(i)}};Ki.prototype={constructor:Ki,getId:function(){return this.id},add:function(t){this.storage.addRoot(t),this._needsRefresh=!0},remove:function(t){this.storage.delRoot(t),this._needsRefresh=!0},configLayer:function(t,e){this.painter.configLayer&&this.painter.configLayer(t,e),this._needsRefresh=!0},setBackgroundColor:function(t){this.painter.setBackgroundColor&&this.painter.setBackgroundColor(t),this._needsRefresh=!0},refreshImmediately:function(){this._needsRefresh=this._needsRefreshHover=!1,this.painter.refresh(),this._needsRefresh=this._needsRefreshHover=!1},refresh:function(){this._needsRefresh=!0},flush:function(){var t;this._needsRefresh&&(t=!0,this.refreshImmediately()),this._needsRefreshHover&&(t=!0,this.refreshHoverImmediately()),t&&this.trigger("rendered")},addHover:function(t,e){if(this.painter.addHover){var n=this.painter.addHover(t,e);return this.refreshHover(),n}},removeHover:function(t){this.painter.removeHover&&(this.painter.removeHover(t),this.refreshHover())},clearHover:function(){this.painter.clearHover&&(this.painter.clearHover(),this.refreshHover())},refreshHover:function(){this._needsRefreshHover=!0},refreshHoverImmediately:function(){this._needsRefreshHover=!1,this.painter.refreshHover&&this.painter.refreshHover()},resize:function(t){t=t||{},this.painter.resize(t.width,t.height),this.handler.resize()},clearAnimation:function(){this.animation.clear()},getWidth:function(){return this.painter.getWidth()},getHeight:function(){return this.painter.getHeight()},pathToImage:function(t,e){return this.painter.pathToImage(t,e)},setCursorStyle:function(t){this.handler.setCursorStyle(t)},findHover:function(t,e){return this.handler.findHover(t,e)},on:function(t,e,n){this.handler.on(t,e,n)},off:function(t,e){this.handler.off(t,e)},trigger:function(t,e){this.handler.trigger(t,e)},clear:function(){this.storage.delRoot(),this.painter.clear()},dispose:function(){this.animation.stop(),this.clear(),this.storage.dispose(),this.painter.dispose(),this.handler.dispose(),this.animation=this.storage=this.painter=this.handler=null}};var Qi=D,Ji=O,tr=L,er="series\0";function nr(t){return t instanceof Array?t:null==t?[]:[t]}function ir(t,e,n){if(t){t[e]=t[e]||{},t.emphasis=t.emphasis||{},t.emphasis[e]=t.emphasis[e]||{};for(var i=0,r=n.length;i<r;i++){var a=n[i];!t.emphasis[e].hasOwnProperty(a)&&t[e].hasOwnProperty(a)&&(t.emphasis[e][a]=t[e][a])}}}var rr=["fontStyle","fontWeight","fontSize","fontFamily","rich","tag","color","textBorderColor","textBorderWidth","width","height","lineHeight","align","verticalAlign","baseline","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY","textShadowColor","textShadowBlur","textShadowOffsetX","textShadowOffsetY","backgroundColor","borderColor","borderWidth","borderRadius","padding"];function ar(t){return!Ji(t)||tr(t)||t instanceof Date?t:t.value}function or(t,r){r=(r||[]).slice();var a=A(t||[],function(t,e){return{exist:t}});return Qi(r,function(t,e){if(Ji(t)){for(var n=0;n<a.length;n++)if(!a[n].option&&null!=t.id&&a[n].exist.id===t.id+"")return a[n].option=t,void(r[e]=null);for(n=0;n<a.length;n++){var i=a[n].exist;if(!(a[n].option||null!=i.id&&null!=t.id||null==t.name||lr(t)||lr(i)||i.name!==t.name+""))return a[n].option=t,void(r[e]=null)}}}),Qi(r,function(t,e){if(Ji(t)){for(var n=0;n<a.length;n++){var i=a[n].exist;if(!a[n].option&&!lr(i)&&null==t.id){a[n].option=t;break}}n>=a.length&&a.push({option:t})}}),a}function sr(t){var e=t.name;return!(!e||!e.indexOf(er))}function lr(t){return Ji(t)&&t.id&&0===(t.id+"").indexOf("\0_ec_\0")}function hr(e,t){return null!=t.dataIndexInside?t.dataIndexInside:null!=t.dataIndex?L(t.dataIndex)?A(t.dataIndex,function(t){return e.indexOfRawIndex(t)}):e.indexOfRawIndex(t.dataIndex):null!=t.name?L(t.name)?A(t.name,function(t){return e.indexOfName(t)}):e.indexOfName(t.name):void 0}function ur(){var e="__\0ec_inner_"+cr+++"_"+Math.random().toFixed(5);return function(t){return t[e]||(t[e]={})}}var cr=0;function dr(s,l,h){if(C(l)){var t={};t[l+"Index"]=0,l=t}var e=h&&h.defaultMainType;!e||fr(l,e+"Index")||fr(l,e+"Id")||fr(l,e+"Name")||(l[e+"Index"]=0);var u={};return Qi(l,function(t,e){t=l[e];if("dataIndex"!==e&&"dataIndexInside"!==e){var n=e.match(/^(\w+)(Index|Id|Name)$/)||[],i=n[1],r=(n[2]||"").toLowerCase();if(!(!i||!r||null==t||"index"===r&&"none"===t||h&&h.includeMainTypes&&g(h.includeMainTypes,i)<0)){var a={mainType:i};"index"===r&&"all"===t||(a[r]=t);var o=s.queryComponents(a);u[i+"Models"]=o,u[i+"Model"]=o[0]}}else u[e]=t}),u}function fr(t,e){return t&&t.hasOwnProperty(e)}function pr(t,e,n){t.setAttribute?t.setAttribute(e,n):t[e]=n}var gr=".",vr="___EC__COMPONENT__CONTAINER___";function mr(t){var e={main:"",sub:""};return t&&(t=t.split(gr),e.main=t[0]||"",e.sub=t[1]||""),e}function yr(t){(t.$constructor=t).extend=function(t){function e(){t.$constructor?t.$constructor.apply(this,arguments):n.apply(this,arguments)}var n=this;return S(e.prototype,t),e.extend=this.extend,e.superCall=wr,e.superApply=br,y(e,this),e.superClass=n,e}}var _r=0;function xr(t){var e=["__\0is_clz",_r++,Math.random().toFixed(3)].join("_");t.prototype[e]=!0,t.isInstance=function(t){return!(!t||!t[e])}}function wr(t,e){var n=W(arguments,2);return this.superClass.prototype[e].apply(t,n)}function br(t,e,n){return this.superClass.prototype[e].apply(t,n)}function Sr(n,t){t=t||{};var r={};if(n.registerClass=function(t,e){if(e)if(function(t){G(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t),'componentType "'+t+'" illegal')}(e),(e=mr(e)).sub){if(e.sub!==vr){(function(t){var e=r[t.main];e&&e[vr]||((e=r[t.main]={})[vr]=!0);return e})(e)[e.sub]=t}}else r[e.main]=t;return t},n.getClass=function(t,e,n){var i=r[t];if(i&&i[vr]&&(i=e?i[e]:null),n&&!i)throw new Error(e?"Component "+t+"."+(e||"")+" not exists. Load it first.":t+".type should be specified.");return i},n.getClassesByMainType=function(t){t=mr(t);var n=[],e=r[t.main];return e&&e[vr]?D(e,function(t,e){e!==vr&&n.push(t)}):n.push(e),n},n.hasClass=function(t){return t=mr(t),!!r[t.main]},n.getAllClassMainTypes=function(){var n=[];return D(r,function(t,e){n.push(e)}),n},n.hasSubTypes=function(t){t=mr(t);var e=r[t.main];return e&&e[vr]},n.parseClassType=mr,t.registerWhenExtend){var i=n.extend;i&&(n.extend=function(t){var e=i.call(this,t);return n.registerClass(e,t.type)})}return n}function Mr(s){for(var t=0;t<s.length;t++)s[t][1]||(s[t][1]=s[t][0]);return function(t,e,n){for(var i={},r=0;r<s.length;r++){var a=s[r][1];if(!(e&&0<=g(e,a)||n&&g(n,a)<0)){var o=t.getShallow(a);null!=o&&(i[s[r][0]]=o)}}return i}}var Ir=Mr([["lineWidth","width"],["stroke","color"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]),Tr={getLineStyle:function(t){var e=Ir(this,t);return e.lineDash=this.getLineDash(e.lineWidth),e},getLineDash:function(t){null==t&&(t=1);var e=this.get("type"),n=Math.max(t,2),i=4*t;return"solid"!==e&&null!=e&&("dashed"===e?[i,i]:[n,n])}},Cr=Mr([["fill","color"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["opacity"],["shadowColor"]]),kr={getAreaStyle:function(t,e){return Cr(this,t,e)}},Dr=Math.pow,Ar=Math.sqrt,Lr=1e-8,Pr=1e-4,Or=Ar(3),Er=1/3,Nr=Q(),Br=Q(),Rr=Q();function zr(t){return-Lr<t&&t<Lr}function Fr(t){return Lr<t||t<-Lr}function Vr(t,e,n,i,r){var a=1-r;return a*a*(a*t+3*r*e)+r*r*(r*i+3*a*n)}function Wr(t,e,n,i,r){var a=1-r;return 3*(((e-t)*a+2*(n-e)*r)*a+(i-n)*r*r)}function Hr(t,e,n,i,r){var a=6*n-12*e+6*t,o=9*e+3*i-3*t-9*n,s=3*e-3*t,l=0;if(zr(o)){if(Fr(a))0<=(u=-s/a)&&u<=1&&(r[l++]=u)}else{var h=a*a-4*o*s;if(zr(h))r[0]=-a/(2*o);else if(0<h){var u,c=Ar(h),d=(-a-c)/(2*o);0<=(u=(-a+c)/(2*o))&&u<=1&&(r[l++]=u),0<=d&&d<=1&&(r[l++]=d)}}return l}function Gr(t,e,n,i,r,a){var o=(e-t)*r+t,s=(n-e)*r+e,l=(i-n)*r+n,h=(s-o)*r+o,u=(l-s)*r+s,c=(u-h)*r+h;a[0]=t,a[1]=o,a[2]=h,a[3]=c,a[4]=c,a[5]=u,a[6]=l,a[7]=i}function Xr(t,e,n,i){var r=1-i;return r*(r*t+2*i*e)+i*i*n}function Ur(t,e,n,i){return 2*((1-i)*(e-t)+i*(n-e))}function Yr(t,e,n){var i=t+n-2*e;return 0==i?.5:(t-e)/i}function qr(t,e,n,i,r){var a=(e-t)*i+t,o=(n-e)*i+e,s=(o-a)*i+a;r[0]=t,r[1]=a,r[2]=s,r[3]=s,r[4]=o,r[5]=n}var jr=Math.min,Zr=Math.max,$r=Math.sin,Kr=Math.cos,Qr=2*Math.PI,Jr=Q(),ta=Q(),ea=Q();function na(t,e,n){if(0!==t.length){var i,r=t[0],a=r[0],o=r[0],s=r[1],l=r[1];for(i=1;i<t.length;i++)r=t[i],a=jr(a,r[0]),o=Zr(o,r[0]),s=jr(s,r[1]),l=Zr(l,r[1]);e[0]=a,e[1]=s,n[0]=o,n[1]=l}}function ia(t,e,n,i,r,a){r[0]=jr(t,n),r[1]=jr(e,i),a[0]=Zr(t,n),a[1]=Zr(e,i)}var ra=[],aa=[];function oa(t,e,n,i,r,a,o,s,l,h){var u,c=Hr,d=Vr,f=c(t,n,r,o,ra);for(l[0]=1/0,l[1]=1/0,h[0]=-1/0,h[1]=-1/0,u=0;u<f;u++){var p=d(t,n,r,o,ra[u]);l[0]=jr(p,l[0]),h[0]=Zr(p,h[0])}for(f=c(e,i,a,s,aa),u=0;u<f;u++){var g=d(e,i,a,s,aa[u]);l[1]=jr(g,l[1]),h[1]=Zr(g,h[1])}l[0]=jr(t,l[0]),h[0]=Zr(t,h[0]),l[0]=jr(o,l[0]),h[0]=Zr(o,h[0]),l[1]=jr(e,l[1]),h[1]=Zr(e,h[1]),l[1]=jr(s,l[1]),h[1]=Zr(s,h[1])}function sa(t,e,n,i,r,a,o,s,l){var h=lt,u=ht,c=Math.abs(r-a);if(c%Qr<1e-4&&1e-4<c)return s[0]=t-n,s[1]=e-i,l[0]=t+n,void(l[1]=e+i);if(Jr[0]=Kr(r)*n+t,Jr[1]=$r(r)*i+e,ta[0]=Kr(a)*n+t,ta[1]=$r(a)*i+e,h(s,Jr,ta),u(l,Jr,ta),(r%=Qr)<0&&(r+=Qr),(a%=Qr)<0&&(a+=Qr),a<r&&!o?a+=Qr:r<a&&o&&(r+=Qr),o){var d=a;a=r,r=d}for(var f=0;f<a;f+=Math.PI/2)r<f&&(ea[0]=Kr(f)*n+t,ea[1]=$r(f)*i+e,h(s,ea,s),u(l,ea,l))}var la={M:1,L:2,C:3,Q:4,A:5,Z:6,R:7},ha=[],ua=[],ca=[],da=[],fa=Math.min,pa=Math.max,ga=Math.cos,va=Math.sin,ma=Math.sqrt,ya=Math.abs,_a="undefined"!=typeof Float32Array,xa=function(t){this._saveData=!t,this._saveData&&(this.data=[]),this._ctx=null};function wa(t,e,n,i,r,a,o){if(0===r)return!1;var s=r,l=0;if(e+s<o&&i+s<o||o<e-s&&o<i-s||t+s<a&&n+s<a||a<t-s&&a<n-s)return!1;if(t===n)return Math.abs(a-t)<=s/2;var h=(l=(e-i)/(t-n))*a-o+(t*i-n*e)/(t-n);return h*h/(l*l+1)<=s/2*s/2}function ba(t,e,n,i,r,a,o,s,l,h,u){if(0===l)return!1;var c=l;return!(e+c<u&&i+c<u&&a+c<u&&s+c<u||u<e-c&&u<i-c&&u<a-c&&u<s-c||t+c<h&&n+c<h&&r+c<h&&o+c<h||h<t-c&&h<n-c&&h<r-c&&h<o-c)&&function(t,e,n,i,r,a,o,s,l,h,u){var c,d,f,p,g,v=.005,m=1/0;Nr[0]=l,Nr[1]=h;for(var y=0;y<1;y+=.05)Br[0]=Vr(t,n,r,o,y),Br[1]=Vr(e,i,a,s,y),(p=ot(Nr,Br))<m&&(c=y,m=p);m=1/0;for(var _=0;_<32&&!(v<Pr);_++)d=c-v,f=c+v,Br[0]=Vr(t,n,r,o,d),Br[1]=Vr(e,i,a,s,d),p=ot(Br,Nr),0<=d&&p<m?(c=d,m=p):(Rr[0]=Vr(t,n,r,o,f),Rr[1]=Vr(e,i,a,s,f),g=ot(Rr,Nr),f<=1&&g<m?(c=f,m=g):v*=.5);return u&&(u[0]=Vr(t,n,r,o,c),u[1]=Vr(e,i,a,s,c)),Ar(m)}(t,e,n,i,r,a,o,s,h,u,null)<=c/2}function Sa(t,e,n,i,r,a,o,s,l){if(0===o)return!1;var h=o;return!(e+h<l&&i+h<l&&a+h<l||l<e-h&&l<i-h&&l<a-h||t+h<s&&n+h<s&&r+h<s||s<t-h&&s<n-h&&s<r-h)&&function(t,e,n,i,r,a,o,s,l){var h,u=.005,c=1/0;Nr[0]=o,Nr[1]=s;for(var d=0;d<1;d+=.05){Br[0]=Xr(t,n,r,d),Br[1]=Xr(e,i,a,d),(v=ot(Nr,Br))<c&&(h=d,c=v)}c=1/0;for(var f=0;f<32&&!(u<Pr);f++){var p=h-u,g=h+u;Br[0]=Xr(t,n,r,p),Br[1]=Xr(e,i,a,p);var v=ot(Br,Nr);if(0<=p&&v<c)h=p,c=v;else{Rr[0]=Xr(t,n,r,g),Rr[1]=Xr(e,i,a,g);var m=ot(Rr,Nr);g<=1&&m<c?(h=g,c=m):u*=.5}}return l&&(l[0]=Xr(t,n,r,h),l[1]=Xr(e,i,a,h)),Ar(c)}(t,e,n,i,r,a,s,l,null)<=h/2}xa.prototype={constructor:xa,_xi:0,_yi:0,_x0:0,_y0:0,_ux:0,_uy:0,_len:0,_lineDash:null,_dashOffset:0,_dashIdx:0,_dashSum:0,setScale:function(t,e,n){n=n||0,this._ux=ya(n/Be/t)||0,this._uy=ya(n/Be/e)||0},getContext:function(){return this._ctx},beginPath:function(t){return(this._ctx=t)&&t.beginPath(),t&&(this.dpr=t.dpr),this._saveData&&(this._len=0),this._lineDash&&(this._lineDash=null,this._dashOffset=0),this},moveTo:function(t,e){return this.addData(la.M,t,e),this._ctx&&this._ctx.moveTo(t,e),this._x0=t,this._y0=e,this._xi=t,this._yi=e,this},lineTo:function(t,e){var n=ya(t-this._xi)>this._ux||ya(e-this._yi)>this._uy||this._len<5;return this.addData(la.L,t,e),this._ctx&&n&&(this._needsDash()?this._dashedLineTo(t,e):this._ctx.lineTo(t,e)),n&&(this._xi=t,this._yi=e),this},bezierCurveTo:function(t,e,n,i,r,a){return this.addData(la.C,t,e,n,i,r,a),this._ctx&&(this._needsDash()?this._dashedBezierTo(t,e,n,i,r,a):this._ctx.bezierCurveTo(t,e,n,i,r,a)),this._xi=r,this._yi=a,this},quadraticCurveTo:function(t,e,n,i){return this.addData(la.Q,t,e,n,i),this._ctx&&(this._needsDash()?this._dashedQuadraticTo(t,e,n,i):this._ctx.quadraticCurveTo(t,e,n,i)),this._xi=n,this._yi=i,this},arc:function(t,e,n,i,r,a){return this.addData(la.A,t,e,n,n,i,r-i,0,a?0:1),this._ctx&&this._ctx.arc(t,e,n,i,r,a),this._xi=ga(r)*n+t,this._yi=va(r)*n+e,this},arcTo:function(t,e,n,i,r){return this._ctx&&this._ctx.arcTo(t,e,n,i,r),this},rect:function(t,e,n,i){return this._ctx&&this._ctx.rect(t,e,n,i),this.addData(la.R,t,e,n,i),this},closePath:function(){this.addData(la.Z);var t=this._ctx,e=this._x0,n=this._y0;return t&&(this._needsDash()&&this._dashedLineTo(e,n),t.closePath()),this._xi=e,this._yi=n,this},fill:function(t){t&&t.fill(),this.toStatic()},stroke:function(t){t&&t.stroke(),this.toStatic()},setLineDash:function(t){if(t instanceof Array){this._lineDash=t;for(var e=this._dashIdx=0,n=0;n<t.length;n++)e+=t[n];this._dashSum=e}return this},setLineDashOffset:function(t){return this._dashOffset=t,this},len:function(){return this._len},setData:function(t){var e=t.length;this.data&&this.data.length===e||!_a||(this.data=new Float32Array(e));for(var n=0;n<e;n++)this.data[n]=t[n];this._len=e},appendPath:function(t){t instanceof Array||(t=[t]);for(var e=t.length,n=0,i=this._len,r=0;r<e;r++)n+=t[r].len();_a&&this.data instanceof Float32Array&&(this.data=new Float32Array(i+n));for(r=0;r<e;r++)for(var a=t[r].data,o=0;o<a.length;o++)this.data[i++]=a[o];this._len=i},addData:function(t){if(this._saveData){var e=this.data;this._len+arguments.length>e.length&&(this._expandData(),e=this.data);for(var n=0;n<arguments.length;n++)e[this._len++]=arguments[n];this._prevCmd=t}},_expandData:function(){if(!(this.data instanceof Array)){for(var t=[],e=0;e<this._len;e++)t[e]=this.data[e];this.data=t}},_needsDash:function(){return this._lineDash},_dashedLineTo:function(t,e){var n,i,r=this._dashSum,a=this._dashOffset,o=this._lineDash,s=this._ctx,l=this._xi,h=this._yi,u=t-l,c=e-h,d=ma(u*u+c*c),f=l,p=h,g=o.length;for(a<0&&(a=r+a),f-=(a%=r)*(u/=d),p-=a*(c/=d);0<u&&f<=t||u<0&&t<=f||0===u&&(0<c&&p<=e||c<0&&e<=p);)f+=u*(n=o[i=this._dashIdx]),p+=c*n,this._dashIdx=(i+1)%g,0<u&&f<l||u<0&&l<f||0<c&&p<h||c<0&&h<p||s[i%2?"moveTo":"lineTo"](0<=u?fa(f,t):pa(f,t),0<=c?fa(p,e):pa(p,e));u=f-t,c=p-e,this._dashOffset=-ma(u*u+c*c)},_dashedBezierTo:function(t,e,n,i,r,a){var o,s,l,h,u,c=this._dashSum,d=this._dashOffset,f=this._lineDash,p=this._ctx,g=this._xi,v=this._yi,m=Vr,y=0,_=this._dashIdx,x=f.length,w=0;for(d<0&&(d=c+d),d%=c,o=0;o<1;o+=.1)s=m(g,t,n,r,o+.1)-m(g,t,n,r,o),l=m(v,e,i,a,o+.1)-m(v,e,i,a,o),y+=ma(s*s+l*l);for(;_<x&&!(d<(w+=f[_]));_++);for(o=(w-d)/y;o<=1;)h=m(g,t,n,r,o),u=m(v,e,i,a,o),_%2?p.moveTo(h,u):p.lineTo(h,u),o+=f[_]/y,_=(_+1)%x;_%2!=0&&p.lineTo(r,a),s=r-h,l=a-u,this._dashOffset=-ma(s*s+l*l)},_dashedQuadraticTo:function(t,e,n,i){var r=n,a=i;n=(n+2*t)/3,i=(i+2*e)/3,t=(this._xi+2*t)/3,e=(this._yi+2*e)/3,this._dashedBezierTo(t,e,n,i,r,a)},toStatic:function(){var t=this.data;t instanceof Array&&(t.length=this._len,_a&&(this.data=new Float32Array(t)))},getBoundingRect:function(){ha[0]=ha[1]=ca[0]=ca[1]=Number.MAX_VALUE,ua[0]=ua[1]=da[0]=da[1]=-Number.MAX_VALUE;for(var t,e,n,i,r,a,o,s,l,h,u,c,d,f,p=this.data,g=0,v=0,m=0,y=0,_=0;_<p.length;){var x=p[_++];switch(1===_&&(m=g=p[_],y=v=p[_+1]),x){case la.M:g=m=p[_++],v=y=p[_++],ca[0]=m,ca[1]=y,da[0]=m,da[1]=y;break;case la.L:ia(g,v,p[_],p[_+1],ca,da),g=p[_++],v=p[_++];break;case la.C:oa(g,v,p[_++],p[_++],p[_++],p[_++],p[_],p[_+1],ca,da),g=p[_++],v=p[_++];break;case la.Q:t=g,e=v,n=p[_++],i=p[_++],r=p[_],a=p[_+1],o=ca,s=da,h=l=void 0,h=Xr,u=Zr(jr((l=Yr)(t,n,r),1),0),c=Zr(jr(l(e,i,a),1),0),d=h(t,n,r,u),f=h(e,i,a,c),o[0]=jr(t,r,d),o[1]=jr(e,a,f),s[0]=Zr(t,r,d),s[1]=Zr(e,a,f),g=p[_++],v=p[_++];break;case la.A:var w=p[_++],b=p[_++],S=p[_++],M=p[_++],I=p[_++],T=p[_++]+I;_+=1;var C=1-p[_++];1===_&&(m=ga(I)*S+w,y=va(I)*M+b),sa(w,b,S,M,I,T,C,ca,da),g=ga(T)*S+w,v=va(T)*M+b;break;case la.R:ia(m=g=p[_++],y=v=p[_++],m+p[_++],y+p[_++],ca,da);break;case la.Z:g=m,v=y}lt(ha,ha,ca),ht(ua,ua,da)}return 0===_&&(ha[0]=ha[1]=ua[0]=ua[1]=0),new $e(ha[0],ha[1],ua[0]-ha[0],ua[1]-ha[1])},rebuildPath:function(t){for(var e,n,i,r,a,o,s=this.data,l=this._ux,h=this._uy,u=this._len,c=0;c<u;){var d=s[c++];switch(1===c&&(e=i=s[c],n=r=s[c+1]),d){case la.M:e=i=s[c++],n=r=s[c++],t.moveTo(i,r);break;case la.L:a=s[c++],o=s[c++],(ya(a-i)>l||ya(o-r)>h||c===u-1)&&(t.lineTo(a,o),i=a,r=o);break;case la.C:t.bezierCurveTo(s[c++],s[c++],s[c++],s[c++],s[c++],s[c++]),i=s[c-2],r=s[c-1];break;case la.Q:t.quadraticCurveTo(s[c++],s[c++],s[c++],s[c++]),i=s[c-2],r=s[c-1];break;case la.A:var f=s[c++],p=s[c++],g=s[c++],v=s[c++],m=s[c++],y=s[c++],_=s[c++],x=s[c++],w=v<g?g:v,b=v<g?1:g/v,S=v<g?v/g:1,M=m+y;.001<Math.abs(g-v)?(t.translate(f,p),t.rotate(_),t.scale(b,S),t.arc(0,0,w,m,M,1-x),t.scale(1/b,1/S),t.rotate(-_),t.translate(-f,-p)):t.arc(f,p,w,m,M,1-x),1===c&&(e=ga(m)*g+f,n=va(m)*v+p),i=ga(M)*g+f,r=va(M)*v+p;break;case la.R:e=i=s[c],n=r=s[c+1],t.rect(s[c++],s[c++],s[c++],s[c++]);break;case la.Z:t.closePath(),i=e,r=n}}}},xa.CMD=la;var Ma=2*Math.PI;function Ia(t){return(t%=Ma)<0&&(t+=Ma),t}var Ta=2*Math.PI;function Ca(t,e,n,i,r,a,o,s,l){if(0===o)return!1;var h=o;s-=t,l-=e;var u=Math.sqrt(s*s+l*l);if(n<u-h||u+h<n)return!1;if(Math.abs(i-r)%Ta<1e-4)return!0;if(a){var c=i;i=Ia(r),r=Ia(c)}else i=Ia(i),r=Ia(r);r<i&&(r+=Ta);var d=Math.atan2(l,s);return d<0&&(d+=Ta),i<=d&&d<=r||i<=d+Ta&&d+Ta<=r}function ka(t,e,n,i,r,a){if(e<a&&i<a||a<e&&a<i)return 0;if(i===e)return 0;var o=i<e?1:-1,s=(a-e)/(i-e);1!=s&&0!=s||(o=i<e?.5:-.5);var l=s*(n-t)+t;return l===r?1/0:r<l?o:0}var Da=xa.CMD,Aa=2*Math.PI,La=1e-4;var Pa=[-1,-1,-1],Oa=[-1,-1];function Ea(t,e,n,i,r,a,o,s,l,h){if(e<h&&i<h&&a<h&&s<h||h<e&&h<i&&h<a&&h<s)return 0;var u,c=function(t,e,n,i,r,a){var o=i+3*(e-n)-t,s=3*(n-2*e+t),l=3*(e-t),h=t-r,u=s*s-3*o*l,c=s*l-9*o*h,d=l*l-3*s*h,f=0;if(zr(u)&&zr(c)){if(zr(s))a[0]=0;else 0<=(M=-l/s)&&M<=1&&(a[f++]=M)}else{var p=c*c-4*u*d;if(zr(p)){var g=c/u,v=-g/2;0<=(M=-s/o+g)&&M<=1&&(a[f++]=M),0<=v&&v<=1&&(a[f++]=v)}else if(0<p){var m=Ar(p),y=u*s+1.5*o*(-c+m),_=u*s+1.5*o*(-c-m);0<=(M=(-s-((y=y<0?-Dr(-y,Er):Dr(y,Er))+(_=_<0?-Dr(-_,Er):Dr(_,Er))))/(3*o))&&M<=1&&(a[f++]=M)}else{var x=(2*u*s-3*o*c)/(2*Ar(u*u*u)),w=Math.acos(x)/3,b=Ar(u),S=Math.cos(w),M=(-s-2*b*S)/(3*o),I=(v=(-s+b*(S+Or*Math.sin(w)))/(3*o),(-s+b*(S-Or*Math.sin(w)))/(3*o));0<=M&&M<=1&&(a[f++]=M),0<=v&&v<=1&&(a[f++]=v),0<=I&&I<=1&&(a[f++]=I)}}return f}(e,i,a,s,h,Pa);if(0===c)return 0;for(var d,f,p=0,g=-1,v=0;v<c;v++){var m=Pa[v],y=0===m||1===m?.5:1;Vr(t,n,r,o,m)<l||(g<0&&(g=Hr(e,i,a,s,Oa),Oa[1]<Oa[0]&&1<g&&(void 0,u=Oa[0],Oa[0]=Oa[1],Oa[1]=u),d=Vr(e,i,a,s,Oa[0]),1<g&&(f=Vr(e,i,a,s,Oa[1]))),2===g?m<Oa[0]?p+=d<e?y:-y:m<Oa[1]?p+=f<d?y:-y:p+=s<f?y:-y:m<Oa[0]?p+=d<e?y:-y:p+=s<d?y:-y)}return p}function Na(t,e,n,i,r,a,o,s){if(e<s&&i<s&&a<s||s<e&&s<i&&s<a)return 0;var l=function(t,e,n,i,r){var a=t-2*e+n,o=2*(e-t),s=t-i,l=0;if(zr(a)){if(Fr(o))0<=(u=-s/o)&&u<=1&&(r[l++]=u)}else{var h=o*o-4*a*s;if(zr(h))0<=(u=-o/(2*a))&&u<=1&&(r[l++]=u);else if(0<h){var u,c=Ar(h),d=(-o-c)/(2*a);0<=(u=(-o+c)/(2*a))&&u<=1&&(r[l++]=u),0<=d&&d<=1&&(r[l++]=d)}}return l}(e,i,a,s,Pa);if(0===l)return 0;var h=Yr(e,i,a);if(0<=h&&h<=1){for(var u=0,c=Xr(e,i,a,h),d=0;d<l;d++){var f=0===Pa[d]||1===Pa[d]?.5:1;Xr(t,n,r,Pa[d])<o||(Pa[d]<h?u+=c<e?f:-f:u+=a<c?f:-f)}return u}f=0===Pa[0]||1===Pa[0]?.5:1;return Xr(t,n,r,Pa[0])<o?0:a<e?f:-f}function Ba(t,e,n,i,r,a,o,s){if(n<(s-=e)||s<-n)return 0;var l=Math.sqrt(n*n-s*s);Pa[0]=-l,Pa[1]=l;var h=Math.abs(i-r);if(h<1e-4)return 0;if(h%Aa<1e-4){r=Aa;var u=a?1:-1;return o>=Pa[i=0]+t&&o<=Pa[1]+t?u:0}if(a){l=i;i=Ia(r),r=Ia(l)}else i=Ia(i),r=Ia(r);r<i&&(r+=Aa);for(var c=0,d=0;d<2;d++){var f=Pa[d];if(o<f+t){var p=Math.atan2(s,f);u=a?1:-1;p<0&&(p=Aa+p),(i<=p&&p<=r||i<=p+Aa&&p+Aa<=r)&&(p>Math.PI/2&&p<1.5*Math.PI&&(u=-u),c+=u)}}return c}function Ra(t,e,n,i,r){for(var a=0,o=0,s=0,l=0,h=0,u=0;u<t.length;){var c=t[u++];switch(c===Da.M&&1<u&&(n||(a+=ka(o,s,l,h,i,r))),1===u&&(l=o=t[u],h=s=t[u+1]),c){case Da.M:o=l=t[u++],s=h=t[u++];break;case Da.L:if(n){if(wa(o,s,t[u],t[u+1],e,i,r))return!0}else a+=ka(o,s,t[u],t[u+1],i,r)||0;o=t[u++],s=t[u++];break;case Da.C:if(n){if(ba(o,s,t[u++],t[u++],t[u++],t[u++],t[u],t[u+1],e,i,r))return!0}else a+=Ea(o,s,t[u++],t[u++],t[u++],t[u++],t[u],t[u+1],i,r)||0;o=t[u++],s=t[u++];break;case Da.Q:if(n){if(Sa(o,s,t[u++],t[u++],t[u],t[u+1],e,i,r))return!0}else a+=Na(o,s,t[u++],t[u++],t[u],t[u+1],i,r)||0;o=t[u++],s=t[u++];break;case Da.A:var d=t[u++],f=t[u++],p=t[u++],g=t[u++],v=t[u++],m=t[u++];u+=1;var y=1-t[u++],_=Math.cos(v)*p+d,x=Math.sin(v)*g+f;1<u?a+=ka(o,s,_,x,i,r):(l=_,h=x);var w=(i-d)*g/p+d;if(n){if(Ca(d,f,g,v,v+m,y,e,w,r))return!0}else a+=Ba(d,f,g,v,v+m,y,w,r);o=Math.cos(v+m)*p+d,s=Math.sin(v+m)*g+f;break;case Da.R:l=o=t[u++],h=s=t[u++];_=l+t[u++],x=h+t[u++];if(n){if(wa(l,h,_,h,e,i,r)||wa(_,h,_,x,e,i,r)||wa(_,x,l,x,e,i,r)||wa(l,x,l,h,e,i,r))return!0}else a+=ka(_,h,_,x,i,r),a+=ka(l,x,l,h,i,r);break;case Da.Z:if(n){if(wa(o,s,l,h,e,i,r))return!0}else a+=ka(o,s,l,h,i,r);o=l,s=h}}return n||function(t,e){return Math.abs(t-e)<La}(s,h)||(a+=ka(o,s,l,h,i,r)||0),0!==a}var za=xn.prototype.getCanvasPattern,Fa=Math.abs,Va=new xa(!0);function Wa(t){_i.call(this,t),this.path=null}Wa.prototype={constructor:Wa,type:"path",__dirtyPath:!0,strokeContainThreshold:5,segmentIgnoreThreshold:0,subPixelOptimize:!1,brush:function(t,e){var n,i=this.style,r=this.path||Va,a=i.hasStroke(),o=i.hasFill(),s=i.fill,l=i.stroke,h=o&&!!s.colorStops,u=a&&!!l.colorStops,c=o&&!!s.image,d=a&&!!l.image;i.bind(t,this,e),this.setTransform(t),this.__dirty&&(h&&(n=n||this.getBoundingRect(),this._fillGradient=i.getGradient(t,s,n)),u&&(n=n||this.getBoundingRect(),this._strokeGradient=i.getGradient(t,l,n)));h?t.fillStyle=this._fillGradient:c&&(t.fillStyle=za.call(s,t)),u?t.strokeStyle=this._strokeGradient:d&&(t.strokeStyle=za.call(l,t));var f=i.lineDash,p=i.lineDashOffset,g=!!t.setLineDash,v=this.getGlobalScale();if(r.setScale(v[0],v[1],this.segmentIgnoreThreshold),this.__dirtyPath||f&&!g&&a?(r.beginPath(t),f&&!g&&(r.setLineDash(f),r.setLineDashOffset(p)),this.buildPath(r,this.shape,!1),this.path&&(this.__dirtyPath=!1)):(t.beginPath(),this.path.rebuildPath(t)),o)if(null!=i.fillOpacity){var m=t.globalAlpha;t.globalAlpha=i.fillOpacity*i.opacity,r.fill(t),t.globalAlpha=m}else r.fill(t);if(f&&g&&(t.setLineDash(f),t.lineDashOffset=p),a)if(null!=i.strokeOpacity){m=t.globalAlpha;t.globalAlpha=i.strokeOpacity*i.opacity,r.stroke(t),t.globalAlpha=m}else r.stroke(t);f&&g&&t.setLineDash([]),null!=i.text&&(this.restoreTransform(t),this.drawRectText(t,this.getBoundingRect()))},buildPath:function(t,e,n){},createPathProxy:function(){this.path=new xa},getBoundingRect:function(){var t=this._rect,e=this.style,n=!t;if(n){var i=this.path;i=i||(this.path=new xa),this.__dirtyPath&&(i.beginPath(),this.buildPath(i,this.shape,!1)),t=i.getBoundingRect()}if(this._rect=t,e.hasStroke()){var r=this._rectWithStroke||(this._rectWithStroke=t.clone());if(this.__dirty||n){r.copy(t);var a=e.lineWidth,o=e.strokeNoScale?this.getLineScale():1;e.hasFill()||(a=Math.max(a,this.strokeContainThreshold||4)),1e-10<o&&(r.width+=a/o,r.height+=a/o,r.x-=a/o/2,r.y-=a/o/2)}return r}return t},contain:function(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect(),r=this.style;if(t=n[0],e=n[1],i.contain(t,e)){var a=this.path.data;if(r.hasStroke()){var o=r.lineWidth,s=r.strokeNoScale?this.getLineScale():1;if(1e-10<s&&(r.hasFill()||(o=Math.max(o,this.strokeContainThreshold)),function(t,e,n,i){return Ra(t,e,!0,n,i)}(a,o/s,t,e)))return!0}if(r.hasFill())return function(t,e,n){return Ra(t,0,!1,e,n)}(a,t,e)}return!1},dirty:function(t){null==t&&(t=!0),t&&(this.__dirtyPath=t,this._rect=null),this.__dirty=this.__dirtyText=!0,this.__zr&&this.__zr.refresh(),this.__clipTarget&&this.__clipTarget.dirty()},animateShape:function(t){return this.animate("shape",t)},attrKV:function(t,e){"shape"===t?(this.setShape(e),this.__dirtyPath=!0,this._rect=null):_i.prototype.attrKV.call(this,t,e)},setShape:function(t,e){var n=this.shape;if(n){if(O(t))for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);else n[t]=e;this.dirty(!0)}return this},getLineScale:function(){var t=this.transform;return t&&1e-10<Fa(t[0]-1)&&1e-10<Fa(t[3]-1)?Math.sqrt(Fa(t[0]*t[3]-t[2]*t[1])):1}},Wa.extend=function(r){function t(t){Wa.call(this,t),r.style&&this.style.extendFrom(r.style,!1);var e=r.shape;if(e){this.shape=this.shape||{};var n=this.shape;for(var i in e)!n.hasOwnProperty(i)&&e.hasOwnProperty(i)&&(n[i]=e[i])}r.init&&r.init.call(this,t)}for(var e in y(t,Wa),r)"style"!==e&&"shape"!==e&&(t.prototype[e]=r[e]);return t},y(Wa,_i);function Ha(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])}var Ga=xa.CMD,Xa=[[],[],[]],Ua=Math.sqrt,Ya=Math.atan2,qa=function(t,e){var n,i,r,a,o,s=t.data,l=Ga.M,h=Ga.C,u=Ga.L,c=Ga.R,d=Ga.A,f=Ga.Q;for(a=r=0;r<s.length;){switch(n=s[r++],a=r,i=0,n){case l:case u:i=1;break;case h:i=3;break;case f:i=2;break;case d:var p=e[4],g=e[5],v=Ua(e[0]*e[0]+e[1]*e[1]),m=Ua(e[2]*e[2]+e[3]*e[3]),y=Ya(-e[1]/m,e[0]/v);s[r]*=v,s[r++]+=p,s[r]*=m,s[r++]+=g,s[r++]*=v,s[r++]*=m,s[r++]+=y,s[r++]+=y,a=r+=2;break;case c:_[0]=s[r++],_[1]=s[r++],st(_,_,e),s[a++]=_[0],s[a++]=_[1],_[0]+=s[r++],_[1]+=s[r++],st(_,_,e),s[a++]=_[0],s[a++]=_[1]}for(o=0;o<i;o++){var _;(_=Xa[o])[0]=s[r++],_[1]=s[r++],st(_,_,e),s[a++]=_[0],s[a++]=_[1]}}},ja=Math.sqrt,Za=Math.sin,$a=Math.cos,Ka=Math.PI,Qa=function(t,e){return(t[0]*e[0]+t[1]*e[1])/(Ha(t)*Ha(e))},Ja=function(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(Qa(t,e))};function to(t,e,n,i,r,a,o,s,l,h,u){var c=l*(Ka/180),d=$a(c)*(t-n)/2+Za(c)*(e-i)/2,f=-1*Za(c)*(t-n)/2+$a(c)*(e-i)/2,p=d*d/(o*o)+f*f/(s*s);1<p&&(o*=ja(p),s*=ja(p));var g=(r===a?-1:1)*ja((o*o*(s*s)-o*o*(f*f)-s*s*(d*d))/(o*o*(f*f)+s*s*(d*d)))||0,v=g*o*f/s,m=g*-s*d/o,y=(t+n)/2+$a(c)*v-Za(c)*m,_=(e+i)/2+Za(c)*v+$a(c)*m,x=Ja([1,0],[(d-v)/o,(f-m)/s]),w=[(d-v)/o,(f-m)/s],b=[(-1*d-v)/o,(-1*f-m)/s],S=Ja(w,b);Qa(w,b)<=-1&&(S=Ka),1<=Qa(w,b)&&(S=0),0===a&&0<S&&(S-=2*Ka),1===a&&S<0&&(S+=2*Ka),u.addData(h,y,_,o,s,x,S,c,a)}var eo=/([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,no=/-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;function io(t,e){var n=function(t){if(!t)return new xa;for(var e,n=0,i=0,r=n,a=i,o=new xa,s=xa.CMD,l=t.match(eo),h=0;h<l.length;h++){for(var u,c=l[h],d=c.charAt(0),f=c.match(no)||[],p=f.length,g=0;g<p;g++)f[g]=parseFloat(f[g]);for(var v=0;v<p;){var m,y,_,x,w,b,S,M=n,I=i;switch(d){case"l":n+=f[v++],i+=f[v++],u=s.L,o.addData(u,n,i);break;case"L":n=f[v++],i=f[v++],u=s.L,o.addData(u,n,i);break;case"m":n+=f[v++],i+=f[v++],u=s.M,o.addData(u,n,i),r=n,a=i,d="l";break;case"M":n=f[v++],i=f[v++],u=s.M,o.addData(u,n,i),r=n,a=i,d="L";break;case"h":n+=f[v++],u=s.L,o.addData(u,n,i);break;case"H":n=f[v++],u=s.L,o.addData(u,n,i);break;case"v":i+=f[v++],u=s.L,o.addData(u,n,i);break;case"V":i=f[v++],u=s.L,o.addData(u,n,i);break;case"C":u=s.C,o.addData(u,f[v++],f[v++],f[v++],f[v++],f[v++],f[v++]),n=f[v-2],i=f[v-1];break;case"c":u=s.C,o.addData(u,f[v++]+n,f[v++]+i,f[v++]+n,f[v++]+i,f[v++]+n,f[v++]+i),n+=f[v-2],i+=f[v-1];break;case"S":m=n,y=i;var T=o.len(),C=o.data;e===s.C&&(m+=n-C[T-4],y+=i-C[T-3]),u=s.C,M=f[v++],I=f[v++],n=f[v++],i=f[v++],o.addData(u,m,y,M,I,n,i);break;case"s":m=n,y=i;T=o.len(),C=o.data;e===s.C&&(m+=n-C[T-4],y+=i-C[T-3]),u=s.C,M=n+f[v++],I=i+f[v++],n+=f[v++],i+=f[v++],o.addData(u,m,y,M,I,n,i);break;case"Q":M=f[v++],I=f[v++],n=f[v++],i=f[v++],u=s.Q,o.addData(u,M,I,n,i);break;case"q":M=f[v++]+n,I=f[v++]+i,n+=f[v++],i+=f[v++],u=s.Q,o.addData(u,M,I,n,i);break;case"T":m=n,y=i;T=o.len(),C=o.data;e===s.Q&&(m+=n-C[T-4],y+=i-C[T-3]),n=f[v++],i=f[v++],u=s.Q,o.addData(u,m,y,n,i);break;case"t":m=n,y=i;T=o.len(),C=o.data;e===s.Q&&(m+=n-C[T-4],y+=i-C[T-3]),n+=f[v++],i+=f[v++],u=s.Q,o.addData(u,m,y,n,i);break;case"A":_=f[v++],x=f[v++],w=f[v++],b=f[v++],S=f[v++],to(M=n,I=i,n=f[v++],i=f[v++],b,S,_,x,w,u=s.A,o);break;case"a":_=f[v++],x=f[v++],w=f[v++],b=f[v++],S=f[v++],to(M=n,I=i,n+=f[v++],i+=f[v++],b,S,_,x,w,u=s.A,o)}}"z"!==d&&"Z"!==d||(u=s.Z,o.addData(u),n=r,i=a),e=u}return o.toStatic(),o}(t);return(e=e||{}).buildPath=function(t){if(t.setData){t.setData(n.data),(e=t.getContext())&&t.rebuildPath(e)}else{var e=t;n.rebuildPath(e)}},e.applyTransform=function(t){qa(n,t),this.dirty(!0)},e}function ro(t,e){return new Wa(io(t,e))}function ao(t){_i.call(this,t)}ao.prototype={constructor:ao,type:"text",brush:function(t,e){var n=this.style;this.__dirty&&ni(n),n.fill=n.stroke=n.shadowBlur=n.shadowColor=n.shadowOffsetX=n.shadowOffsetY=null;var i=n.text;null!=i&&(i+=""),vi(i,n)?(this.setTransform(t),ri(this,t,i,n,null,e),this.restoreTransform(t)):t.__attrCachedBy=cn.NONE},getBoundingRect:function(){var t=this.style;if(this.__dirty&&ni(t),!this._rect){var e=t.text;null!=e?e+="":e="";var n=Rn(t.text+"",t.font,t.textAlign,t.textVerticalAlign,t.textPadding,t.textLineHeight,t.rich);if(n.x+=t.x||0,n.y+=t.y||0,di(t.textStroke,t.textStrokeWidth)){var i=t.textStrokeWidth;n.x-=i/2,n.y-=i/2,n.width+=i,n.height+=i}this._rect=n}return this._rect}},y(ao,_i);function oo(l){return m.browser.ie&&11<=m.browser.version?function(){var t,e=this.__clipPaths,n=this.style;if(e)for(var i=0;i<e.length;i++){var r=e[i],a=r&&r.shape,o=r&&r.type;if(a&&("sector"===o&&a.startAngle===a.endAngle||"rect"===o&&(!a.width||!a.height))){for(var s=0;s<lo.length;s++)lo[s][2]=n[lo[s][0]],n[lo[s][0]]=lo[s][1];t=!0;break}}if(l.apply(this,arguments),t)for(s=0;s<lo.length;s++)n[lo[s][0]]=lo[s][2]}:l}var so=Wa.extend({type:"circle",shape:{cx:0,cy:0,r:0},buildPath:function(t,e,n){n&&t.moveTo(e.cx+e.r,e.cy),t.arc(e.cx,e.cy,e.r,0,2*Math.PI,!0)}}),lo=[["shadowBlur",0],["shadowColor","#000"],["shadowOffsetX",0],["shadowOffsetY",0]],ho=Wa.extend({type:"sector",shape:{cx:0,cy:0,r0:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},brush:oo(Wa.prototype.brush),buildPath:function(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r0||0,0),a=Math.max(e.r,0),o=e.startAngle,s=e.endAngle,l=e.clockwise,h=Math.cos(o),u=Math.sin(o);t.moveTo(h*r+n,u*r+i),t.lineTo(h*a+n,u*a+i),t.arc(n,i,a,o,s,!l),t.lineTo(Math.cos(s)*r+n,Math.sin(s)*r+i),0!==r&&t.arc(n,i,r,s,o,l),t.closePath()}}),uo=Wa.extend({type:"ring",shape:{cx:0,cy:0,r:0,r0:0},buildPath:function(t,e){var n=e.cx,i=e.cy,r=2*Math.PI;t.moveTo(n+e.r,i),t.arc(n,i,e.r,0,r,!1),t.moveTo(n+e.r0,i),t.arc(n,i,e.r0,0,r,!0)}});function co(t,e,n,i,r,a,o){var s=.5*(n-t),l=.5*(i-e);return(2*(e-n)+s+l)*o+(-3*(e-n)-2*s-l)*a+s*r+e}function fo(t,e,n){var i=e.points,r=e.smooth;if(i&&2<=i.length){if(r&&"spline"!==r){var a=function(t,e,n,i){var r,a,o,s,l=[],h=[],u=[],c=[];if(i){o=[1/0,1/0],s=[-1/0,-1/0];for(var d=0,f=t.length;d<f;d++)lt(o,o,t[d]),ht(s,s,t[d]);lt(o,o,i[0]),ht(s,s,i[1])}for(d=0,f=t.length;d<f;d++){var p=t[d];if(n)r=t[d?d-1:f-1],a=t[(d+1)%f];else{if(0===d||d===f-1){l.push(J(t[d]));continue}r=t[d-1],a=t[d+1]}et(h,a,r),nt(h,h,e);var g=rt(p,r),v=rt(p,a),m=g+v;0!==m&&(g/=m,v/=m),nt(u,h,-g),nt(c,h,v);var y=tt([],p,u),_=tt([],p,c);i&&(ht(y,y,o),lt(y,y,s),ht(_,_,o),lt(_,_,s)),l.push(y),l.push(_)}return n&&l.push(l.shift()),l}(i,r,n,e.smoothConstraint);t.moveTo(i[0][0],i[0][1]);for(var o=i.length,s=0;s<(n?o:o-1);s++){var l=a[2*s],h=a[2*s+1],u=i[(s+1)%o];t.bezierCurveTo(l[0],l[1],h[0],h[1],u[0],u[1])}}else{"spline"===r&&(i=function(t,e){for(var n=t.length,i=[],r=0,a=1;a<n;a++)r+=rt(t[a-1],t[a]);var o=r/2;o=o<n?n:o;for(a=0;a<o;a++){var s,l,h,u=a/(o-1)*(e?n:n-1),c=Math.floor(u),d=u-c,f=t[c%n];h=e?(s=t[(c-1+n)%n],l=t[(c+1)%n],t[(c+2)%n]):(s=t[0===c?c:c-1],l=t[n-2<c?n-1:c+1],t[n-3<c?n-1:c+2]);var p=d*d,g=d*p;i.push([co(s[0],f[0],l[0],h[0],d,p,g),co(s[1],f[1],l[1],h[1],d,p,g)])}return i}(i,n)),t.moveTo(i[0][0],i[0][1]);s=1;for(var c=i.length;s<c;s++)t.lineTo(i[s][0],i[s][1])}n&&t.closePath()}}var po=Wa.extend({type:"polygon",shape:{points:null,smooth:!1,smoothConstraint:null},buildPath:function(t,e){fo(t,e,!0)}}),go=Wa.extend({type:"polyline",shape:{points:null,smooth:!1,smoothConstraint:null},style:{stroke:"#000",fill:null},buildPath:function(t,e){fo(t,e,!1)}}),vo=Math.round;function mo(t,e,n){if(e){var i=e.x1,r=e.x2,a=e.y1,o=e.y2;t.x1=i,t.x2=r,t.y1=a,t.y2=o;var s=n&&n.lineWidth;s&&(vo(2*i)===vo(2*r)&&(t.x1=t.x2=_o(i,s,!0)),vo(2*a)===vo(2*o)&&(t.y1=t.y2=_o(a,s,!0)))}}function yo(t,e,n){if(e){var i=e.x,r=e.y,a=e.width,o=e.height;t.x=i,t.y=r,t.width=a,t.height=o;var s=n&&n.lineWidth;s&&(t.x=_o(i,s,!0),t.y=_o(r,s,!0),t.width=Math.max(_o(i+a,s,!1)-t.x,0===a?0:1),t.height=Math.max(_o(r+o,s,!1)-t.y,0===o?0:1))}}function _o(t,e,n){if(!e)return t;var i=vo(2*t);return(i+vo(e))%2==0?i/2:(i+(n?1:-1))/2}var xo={},wo=Wa.extend({type:"rect",shape:{r:0,x:0,y:0,width:0,height:0},buildPath:function(t,e){var n,i,r,a;this.subPixelOptimize?(yo(xo,e,this.style),n=xo.x,i=xo.y,r=xo.width,a=xo.height,xo.r=e.r,e=xo):(n=e.x,i=e.y,r=e.width,a=e.height),e.r?Zn(t,e):t.rect(n,i,r,a),t.closePath()}}),bo={},So=Wa.extend({type:"line",shape:{x1:0,y1:0,x2:0,y2:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function(t,e){var n,i,r,a;a=this.subPixelOptimize?(mo(bo,e,this.style),n=bo.x1,i=bo.y1,r=bo.x2,bo.y2):(n=e.x1,i=e.y1,r=e.x2,e.y2);var o=e.percent;0!==o&&(t.moveTo(n,i),o<1&&(r=n*(1-o)+r*o,a=i*(1-o)+a*o),t.lineTo(r,a))},pointAt:function(t){var e=this.shape;return[e.x1*(1-t)+e.x2*t,e.y1*(1-t)+e.y2*t]}}),Mo=[];function Io(t,e,n){var i=t.cpx2,r=t.cpy2;return null===i||null===r?[(n?Wr:Vr)(t.x1,t.cpx1,t.cpx2,t.x2,e),(n?Wr:Vr)(t.y1,t.cpy1,t.cpy2,t.y2,e)]:[(n?Ur:Xr)(t.x1,t.cpx1,t.x2,e),(n?Ur:Xr)(t.y1,t.cpy1,t.y2,e)]}function To(t){this.colorStops=t||[]}var Co=Wa.extend({type:"bezier-curve",shape:{x1:0,y1:0,x2:0,y2:0,cpx1:0,cpy1:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function(t,e){var n=e.x1,i=e.y1,r=e.x2,a=e.y2,o=e.cpx1,s=e.cpy1,l=e.cpx2,h=e.cpy2,u=e.percent;0!==u&&(t.moveTo(n,i),null==l||null==h?(u<1&&(qr(n,o,r,u,Mo),o=Mo[1],r=Mo[2],qr(i,s,a,u,Mo),s=Mo[1],a=Mo[2]),t.quadraticCurveTo(o,s,r,a)):(u<1&&(Gr(n,o,l,r,u,Mo),o=Mo[1],l=Mo[2],r=Mo[3],Gr(i,s,h,a,u,Mo),s=Mo[1],h=Mo[2],a=Mo[3]),t.bezierCurveTo(o,s,l,h,r,a)))},pointAt:function(t){return Io(this.shape,t,!1)},tangentAt:function(t){var e=Io(this.shape,t,!0);return it(e,e)}}),ko=Wa.extend({type:"arc",shape:{cx:0,cy:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},style:{stroke:"#000",fill:null},buildPath:function(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r,0),a=e.startAngle,o=e.endAngle,s=e.clockwise,l=Math.cos(a),h=Math.sin(a);t.moveTo(l*r+n,h*r+i),t.arc(n,i,r,a,o,!s)}}),Do=Wa.extend({type:"compound",shape:{paths:null},_updatePathDirty:function(){for(var t=this.__dirtyPath,e=this.shape.paths,n=0;n<e.length;n++)t=t||e[n].__dirtyPath;this.__dirtyPath=t,this.__dirty=this.__dirty||t},beforeBrush:function(){this._updatePathDirty();for(var t=this.shape.paths||[],e=this.getGlobalScale(),n=0;n<t.length;n++)t[n].path||t[n].createPathProxy(),t[n].path.setScale(e[0],e[1],t[n].segmentIgnoreThreshold)},buildPath:function(t,e){for(var n=e.paths||[],i=0;i<n.length;i++)n[i].buildPath(t,n[i].shape,!0)},afterBrush:function(){for(var t=this.shape.paths||[],e=0;e<t.length;e++)t[e].__dirtyPath=!1},getBoundingRect:function(){return this._updatePathDirty(),Wa.prototype.getBoundingRect.call(this)}});To.prototype={constructor:To,addColorStop:function(t,e){this.colorStops.push({offset:t,color:e})}};function Ao(t,e,n,i,r,a){this.x=null==t?0:t,this.y=null==e?0:e,this.x2=null==n?1:n,this.y2=null==i?0:i,this.type="linear",this.global=a||!1,To.call(this,r)}Ao.prototype={constructor:Ao},y(Ao,To);function Lo(t,e,n,i,r){this.x=null==t?.5:t,this.y=null==e?.5:e,this.r=null==n?.5:n,this.type="radial",this.global=r||!1,To.call(this,i)}function Po(t){_i.call(this,t),this._displayables=[],this._temporaryDisplayables=[],this._cursor=0,this.notClear=!0}Lo.prototype={constructor:Lo},y(Lo,To),Po.prototype.incremental=!0,Po.prototype.clearDisplaybles=function(){this._displayables=[],this._temporaryDisplayables=[],this._cursor=0,this.dirty(),this.notClear=!1},Po.prototype.addDisplayable=function(t,e){e?this._temporaryDisplayables.push(t):this._displayables.push(t),this.dirty()},Po.prototype.addDisplayables=function(t,e){e=e||!1;for(var n=0;n<t.length;n++)this.addDisplayable(t[n],e)},Po.prototype.eachPendingDisplayable=function(t){for(var e=this._cursor;e<this._displayables.length;e++)t&&t(this._displayables[e]);for(e=0;e<this._temporaryDisplayables.length;e++)t&&t(this._temporaryDisplayables[e])},Po.prototype.update=function(){this.updateTransform();for(var t=this._cursor;t<this._displayables.length;t++){(e=this._displayables[t]).parent=this,e.update(),e.parent=null}for(t=0;t<this._temporaryDisplayables.length;t++){var e;(e=this._temporaryDisplayables[t]).parent=this,e.update(),e.parent=null}},Po.prototype.brush=function(t,e){for(var n=this._cursor;n<this._displayables.length;n++){(i=this._displayables[n]).beforeBrush&&i.beforeBrush(t),i.brush(t,n===this._cursor?null:this._displayables[n-1]),i.afterBrush&&i.afterBrush(t)}this._cursor=n;for(n=0;n<this._temporaryDisplayables.length;n++){var i;(i=this._temporaryDisplayables[n]).beforeBrush&&i.beforeBrush(t),i.brush(t,0===n?null:this._temporaryDisplayables[n-1]),i.afterBrush&&i.afterBrush(t)}this._temporaryDisplayables=[],this.notClear=!0};var Oo=[];Po.prototype.getBoundingRect=function(){if(!this._rect){for(var t=new $e(1/0,1/0,-1/0,-1/0),e=0;e<this._displayables.length;e++){var n=this._displayables[e],i=n.getBoundingRect().clone();n.needLocalTransform()&&i.applyTransform(n.getLocalTransform(Oo)),t.union(i)}this._rect=t}return this._rect},Po.prototype.contain=function(t,e){var n=this.transformCoordToLocal(t,e);if(this.getBoundingRect().contain(n[0],n[1]))for(var i=0;i<this._displayables.length;i++){if(this._displayables[i].contain(t,e))return!0}return!1},y(Po,_i);var Eo=Math.max,No=Math.min,Bo={},Ro=1,zo="emphasis",Fo="normal",Vo=1,Wo={},Ho={};function Go(t){return Wa.extend(t)}function Xo(t,e){Ho[t]=e}function Uo(t,e,n,i){var r=ro(t,e);return n&&("center"===i&&(n=qo(n,r.getBoundingRect())),Zo(r,n)),r}function Yo(t,n,i){var r=new xi({style:{image:t,x:n.x,y:n.y,width:n.width,height:n.height},onload:function(t){if("center"===i){var e={width:t.width,height:t.height};r.setStyle(qo(n,e))}}});return r}function qo(t,e){var n,i=e.width/e.height,r=t.height*i;return n=r<=t.width?t.height:(r=t.width)/i,{x:t.x+t.width/2-r/2,y:t.y+t.height/2-n/2,width:r,height:n}}function jo(t,e){for(var n=[],i=t.length,r=0;r<i;r++){var a=t[r];a.path||a.createPathProxy(),a.__dirtyPath&&a.buildPath(a.path,a.shape,!0),n.push(a.path)}var o=new Wa(e);return o.createPathProxy(),o.buildPath=function(t){t.appendPath(n);var e=t.getContext();e&&t.rebuildPath(e)},o}function Zo(t,e){if(t.applyTransform){var n=t.getBoundingRect().calculateTransform(e);t.applyTransform(n)}}var $o=_o;function Ko(t){return null!=t&&"none"!==t}var Qo=Z(),Jo=0;function ts(t){if("string"!=typeof t)return t;var e=Qo.get(t);return e||(e=function(t,e){var n=ye(t);if(n){for(var i=0;i<3;i++)n[i]=e<0?n[i]*(1-e)|0:(255-n[i])*e+n[i]|0,255<n[i]?n[i]=255:t[i]<0&&(n[i]=0);return xe(n,4===n.length?"rgba":"rgb")}}(t,-.1),Jo<1e4&&(Qo.set(t,e),Jo++)),e}function es(t){var e=t.__hoverStl;if(e&&!t.__highlighted){var n=t.__zr,i=t.useHoverLayer&&n&&"canvas"===n.painter.type;if(t.__highlighted=i?"layer":"plain",!(t.isGroup||!n&&t.useHoverLayer)){var r=t,a=t.style;i&&(a=(r=n.addHover(t)).style),ws(a),i||function(t){if(t.__hoverStlDirty){t.__hoverStlDirty=!1;var e=t.__hoverStl;if(e){var n=t.__cachedNormalStl={};t.__cachedNormalZ2=t.z2;var i=t.style;for(var r in e)null!=e[r]&&(n[r]=i[r]);n.fill=i.fill,n.stroke=i.stroke}else t.__cachedNormalStl=t.__cachedNormalZ2=null}}(r),a.extendFrom(e),ns(a,e,"fill"),ns(a,e,"stroke"),xs(a),i||(t.dirty(!1),t.z2+=Ro)}}}function ns(t,e,n){!Ko(e[n])&&Ko(t[n])&&(t[n]=ts(t[n]))}function is(t){var e=t.__highlighted;if(e&&(t.__highlighted=!1,!t.isGroup))if("layer"===e)t.__zr&&t.__zr.removeHover(t);else{var n=t.style,i=t.__cachedNormalStl;i&&(ws(n),t.setStyle(i),xs(n));var r=t.__cachedNormalZ2;null!=r&&t.z2-r===Ro&&(t.z2=r)}}function rs(t,e,n){var i,r=Fo,a=Fo;t.__highlighted&&(r=zo,i=!0),e(t,n),t.__highlighted&&(a=zo,i=!0),t.isGroup&&t.traverse(function(t){t.isGroup||e(t,n)}),i&&t.__highDownOnUpdate&&t.__highDownOnUpdate(r,a)}function as(t,e){e=t.__hoverStl=!1!==e&&(t.hoverStyle||e||{}),t.__hoverStlDirty=!0,t.__highlighted&&(t.__cachedNormalStl=null,is(t),es(t))}function os(t){us(this,t)||this.__highByOuter||rs(this,es)}function ss(t){us(this,t)||this.__highByOuter||rs(this,is)}function ls(t){this.__highByOuter|=1<<(t||0),rs(this,es)}function hs(t){(this.__highByOuter&=~(1<<(t||0)))||rs(this,is)}function us(t,e){return t.__highDownSilentOnTouch&&e.zrByTouch}function cs(t,e){ds(t,!0),rs(t,as,e)}function ds(t,e){var n=!1===e;if(t.__highDownSilentOnTouch=t.highDownSilentOnTouch,t.__highDownOnUpdate=t.highDownOnUpdate,!n||t.__highDownDispatcher){var i=n?"off":"on";t[i]("mouseover",os)[i]("mouseout",ss),t[i]("emphasis",ls)[i]("normal",hs),t.__highByOuter=t.__highByOuter||0,t.__highDownDispatcher=!n}}function fs(t){return!(!t||!t.__highDownDispatcher)}function ps(t){var e=Wo[t];return null==e&&Vo<=32&&(e=Wo[t]=Vo++),e}function gs(t,e,n,i,r,a,o){var s,l=(r=r||Bo).labelFetcher,h=r.labelDataIndex,u=r.labelDimIndex,c=r.labelProp,d=n.getShallow("show"),f=i.getShallow("show");(d||f)&&(l&&(s=l.getFormattedLabel(h,"normal",null,u,c)),null==s&&(s=T(r.defaultText)?r.defaultText(h,r):r.defaultText));var p=d?s:null,g=f?F(l?l.getFormattedLabel(h,"emphasis",null,u,c):null,s):null;null==p&&null==g||(vs(t,n,a,r),vs(e,i,o,r,!0)),t.text=p,e.text=g}function vs(t,e,n,i,r){return ms(t,e,i,r),n&&S(t,n),t}function ms(t,e,n,i){if((n=n||Bo).isRectText){var r;n.getTextPosition?r=n.getTextPosition(e,i):"outside"===(r=e.getShallow("position")||(i?null:"inside"))&&(r="top"),t.textPosition=r,t.textOffset=e.getShallow("offset");var a=e.getShallow("rotate");null!=a&&(a*=Math.PI/180),t.textRotation=a,t.textDistance=F(e.getShallow("distance"),i?null:5)}var o,s=e.ecModel,l=s&&s.option.textStyle,h=function(t){var e;for(;t&&t!==t.ecModel;){var n=(t.option||Bo).rich;if(n)for(var i in e=e||{},n)n.hasOwnProperty(i)&&(e[i]=1);t=t.parentModel}return e}(e);if(h)for(var u in o={},h)if(h.hasOwnProperty(u)){var c=e.getModel(["rich",u]);ys(o[u]={},c,l,n,i)}return t.rich=o,ys(t,e,l,n,i,!0),n.forceRich&&!n.textStyle&&(n.textStyle={}),t}function ys(t,e,n,i,r,a){n=!r&&n||Bo,t.textFill=_s(e.getShallow("color"),i)||n.color,t.textStroke=_s(e.getShallow("textBorderColor"),i)||n.textBorderColor,t.textStrokeWidth=F(e.getShallow("textBorderWidth"),n.textBorderWidth),r||(a&&(t.insideRollbackOpt=i,xs(t)),null==t.textFill&&(t.textFill=i.autoColor)),t.fontStyle=e.getShallow("fontStyle")||n.fontStyle,t.fontWeight=e.getShallow("fontWeight")||n.fontWeight,t.fontSize=e.getShallow("fontSize")||n.fontSize,t.fontFamily=e.getShallow("fontFamily")||n.fontFamily,t.textAlign=e.getShallow("align"),t.textVerticalAlign=e.getShallow("verticalAlign")||e.getShallow("baseline"),t.textLineHeight=e.getShallow("lineHeight"),t.textWidth=e.getShallow("width"),t.textHeight=e.getShallow("height"),t.textTag=e.getShallow("tag"),a&&i.disableBox||(t.textBackgroundColor=_s(e.getShallow("backgroundColor"),i),t.textPadding=e.getShallow("padding"),t.textBorderColor=_s(e.getShallow("borderColor"),i),t.textBorderWidth=e.getShallow("borderWidth"),t.textBorderRadius=e.getShallow("borderRadius"),t.textBoxShadowColor=e.getShallow("shadowColor"),t.textBoxShadowBlur=e.getShallow("shadowBlur"),t.textBoxShadowOffsetX=e.getShallow("shadowOffsetX"),t.textBoxShadowOffsetY=e.getShallow("shadowOffsetY")),t.textShadowColor=e.getShallow("textShadowColor")||n.textShadowColor,t.textShadowBlur=e.getShallow("textShadowBlur")||n.textShadowBlur,t.textShadowOffsetX=e.getShallow("textShadowOffsetX")||n.textShadowOffsetX,t.textShadowOffsetY=e.getShallow("textShadowOffsetY")||n.textShadowOffsetY}function _s(t,e){return"auto"!==t?t:e&&e.autoColor?e.autoColor:null}function xs(t){var e,n=t.textPosition,i=t.insideRollbackOpt;if(i&&null==t.textFill){var r=i.autoColor,a=i.isRectText,o=i.useInsideStyle,s=!1!==o&&(!0===o||a&&n&&"string"==typeof n&&0<=n.indexOf("inside")),l=!s&&null!=r;(s||l)&&(e={textFill:t.textFill,textStroke:t.textStroke,textStrokeWidth:t.textStrokeWidth}),s&&(t.textFill="#fff",null==t.textStroke&&(t.textStroke=r,null==t.textStrokeWidth&&(t.textStrokeWidth=2))),l&&(t.textFill=r)}t.insideRollback=e}function ws(t){var e=t.insideRollback;e&&(t.textFill=e.textFill,t.textStroke=e.textStroke,t.textStrokeWidth=e.textStrokeWidth,t.insideRollback=null)}function bs(t,e){var n=e&&e.getModel("textStyle");return X([t.fontStyle||n&&n.getShallow("fontStyle")||"",t.fontWeight||n&&n.getShallow("fontWeight")||"",(t.fontSize||n&&n.getShallow("fontSize")||12)+"px",t.fontFamily||n&&n.getShallow("fontFamily")||"sans-serif"].join(" "))}function Ss(t,e,n,i,r,a){if("function"==typeof r&&(a=r,r=null),i&&i.isAnimationEnabled()){var o=t?"Update":"",s=i.getShallow("animationDuration"+o),l=i.getShallow("animationEasing"+o),h=i.getShallow("animationDelay"+o);"function"==typeof h&&(h=h(r,i.getAnimationDelayParams?i.getAnimationDelayParams(e,r):null)),"function"==typeof s&&(s=s(r)),0<s?e.animateTo(n,s,h||0,l,a,!!a):(e.stopAnimation(),e.attr(n),a&&a())}else e.stopAnimation(),e.attr(n),a&&a()}function Ms(t,e,n,i,r){Ss(!0,t,e,n,i,r)}function Is(t,e,n,i,r){Ss(!1,t,e,n,i,r)}function Ts(t,e,n){return e&&!P(e)&&(e=Zt.getLocalTransform(e)),n&&(e=Yt([],e)),st([],t,e)}function Cs(t,e,i,n){if(t&&e){var r,a=(r={},t.traverse(function(t){!t.isGroup&&t.anid&&(r[t.anid]=t)}),r);e.traverse(function(t){if(!t.isGroup&&t.anid){var e=a[t.anid];if(e){var n=o(t);t.attr(o(e)),Ms(t,n,i,t.dataIndex)}}})}function o(t){var e={position:J(t.position),rotation:t.rotation};return t.shape&&(e.shape=S({},t.shape)),e}}function ks(t,e,n,i,r,a,o,s){var l=n-t,h=i-e,u=o-r,c=s-a,d=Ds(u,c,l,h);if(function(t){return t<=1e-6&&-1e-6<=t}(d))return!1;var f=t-r,p=e-a,g=Ds(f,p,l,h)/d;if(g<0||1<g)return!1;var v=Ds(f,p,u,c)/d;return!(v<0||1<v)}function Ds(t,e,n,i){return t*i-n*e}Xo("circle",so),Xo("sector",ho),Xo("ring",uo),Xo("polygon",po),Xo("polyline",go),Xo("rect",wo),Xo("line",So),Xo("bezierCurve",Co),Xo("arc",ko);var As=(Object.freeze||Object)({Z2_EMPHASIS_LIFT:Ro,CACHED_LABEL_STYLE_PROPERTIES:{color:"textFill",textBorderColor:"textStroke",textBorderWidth:"textStrokeWidth"},extendShape:Go,extendPath:function(t,e){return function(t,e){return Wa.extend(io(t,e))}(t,e)},registerShape:Xo,getShapeClass:function(t){if(Ho.hasOwnProperty(t))return Ho[t]},makePath:Uo,makeImage:Yo,mergePath:jo,resizePath:Zo,subPixelOptimizeLine:function(t){return mo(t.shape,t.shape,t.style),t},subPixelOptimizeRect:function(t){return yo(t.shape,t.shape,t.style),t},subPixelOptimize:$o,setElementHoverStyle:as,setHoverStyle:cs,setAsHighDownDispatcher:ds,isHighDownDispatcher:fs,getHighlightDigit:ps,setLabelStyle:gs,modifyLabelStyle:function(t,e,n){var i=t.style;e&&(ws(i),t.setStyle(e),xs(i)),i=t.__hoverStl,n&&i&&(ws(i),S(i,n),xs(i))},setTextStyle:vs,setText:function(t,e,n){var i,r={isRectText:!0};!1===n?i=!0:r.autoColor=n,ms(t,e,r,i)},getFont:bs,updateProps:Ms,initProps:Is,getTransform:function(t,e){for(var n=Wt([]);t&&t!==e;)Ht(n,t.getLocalTransform(),n),t=t.parent;return n},applyTransform:Ts,transformDirection:function(t,e,n){var i=0===e[4]||0===e[5]||0===e[0]?1:Math.abs(2*e[4]/e[0]),r=0===e[4]||0===e[5]||0===e[2]?1:Math.abs(2*e[4]/e[2]),a=["left"===t?-i:"right"===t?i:0,"top"===t?-r:"bottom"===t?r:0];return a=Ts(a,e,n),Math.abs(a[0])>Math.abs(a[1])?0<a[0]?"right":"left":0<a[1]?"bottom":"top"},groupTransition:Cs,clipPointsByRect:function(t,i){return A(t,function(t){var e=t[0];e=Eo(e,i.x),e=No(e,i.x+i.width);var n=t[1];return n=Eo(n,i.y),[e,n=No(n,i.y+i.height)]})},clipRectByRect:function(t,e){var n=Eo(t.x,e.x),i=No(t.x+t.width,e.x+e.width),r=Eo(t.y,e.y),a=No(t.y+t.height,e.y+e.height);if(n<=i&&r<=a)return{x:n,y:r,width:i-n,height:a-r}},createIcon:function(t,e,n){var i=(e=S({rectHover:!0},e)).style={strokeNoScale:!0};if(n=n||{x:-1,y:-1,width:2,height:2},t)return 0===t.indexOf("image://")?(i.image=t.slice(8),k(i,n),new xi(e)):Uo(t.replace("path://",""),e,n,"center")},linePolygonIntersect:function(t,e,n,i,r){for(var a=0,o=r[r.length-1];a<r.length;a++){var s=r[a];if(ks(t,e,n,i,s[0],s[1],o[0],o[1]))return!0;o=s}},lineLineIntersect:ks,Group:Ke,Image:xi,Text:ao,Circle:so,Sector:ho,Ring:uo,Polygon:po,Polyline:go,Rect:wo,Line:So,BezierCurve:Co,Arc:ko,IncrementalDisplayable:Po,CompoundPath:Do,LinearGradient:Ao,RadialGradient:Lo,BoundingRect:$e}),Ls=["textStyle","color"],Ps={getTextColor:function(t){var e=this.ecModel;return this.getShallow("color")||(!t&&e?e.get(Ls):null)},getFont:function(){return bs({fontStyle:this.getShallow("fontStyle"),fontWeight:this.getShallow("fontWeight"),fontSize:this.getShallow("fontSize"),fontFamily:this.getShallow("fontFamily")},this.ecModel)},getTextRect:function(t){return Rn(t,this.getFont(),this.getShallow("align"),this.getShallow("verticalAlign")||this.getShallow("baseline"),this.getShallow("padding"),this.getShallow("lineHeight"),this.getShallow("rich"),this.getShallow("truncateText"))}},Os=Mr([["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"],["textPosition"],["textAlign"]]),Es={getItemStyle:function(t,e){var n=Os(this,t,e),i=this.getBorderLineDash();return i&&(n.lineDash=i),n},getBorderLineDash:function(){var t=this.get("borderType");return"solid"===t||null==t?null:"dashed"===t?[5,5]:[1,1]}},Ns=_,Bs=ur();function Rs(t,e,n){this.parentModel=e,this.ecModel=n,this.option=t}function zs(t,e,n){for(var i=0;i<e.length&&(!e[i]||null!=(t=t&&"object"==typeof t?t[e[i]]:null));i++);return null==t&&n&&(t=n.get(e)),t}function Fs(t,e){var n=Bs(t).getParent;return n?n.call(t,e):t.parentModel}Rs.prototype={constructor:Rs,init:null,mergeOption:function(t){f(this.option,t,!0)},get:function(t,e){return null==t?this.option:zs(this.option,this.parsePath(t),!e&&Fs(this,t))},getShallow:function(t,e){var n=this.option,i=null==n?n:n[t],r=!e&&Fs(this,t);return null==i&&r&&(i=r.getShallow(t)),i},getModel:function(t,e){var n;return new Rs(null==t?this.option:zs(this.option,t=this.parsePath(t)),e=e||(n=Fs(this,t))&&n.getModel(t),this.ecModel)},isEmpty:function(){return null==this.option},restoreData:function(){},clone:function(){return new this.constructor(b(this.option))},setReadOnly:function(t){},parsePath:function(t){return"string"==typeof t&&(t=t.split(".")),t},customizeGetParent:function(t){Bs(this).getParent=t},isAnimationEnabled:function(){if(!m.node){if(null!=this.option.animation)return!!this.option.animation;if(this.parentModel)return this.parentModel.isAnimationEnabled()}}},yr(Rs),xr(Rs),Ns(Rs,Tr),Ns(Rs,kr),Ns(Rs,Ps),Ns(Rs,Es);var Vs=0;function Ws(t){return[t||"",Vs++,Math.random().toFixed(5)].join("_")}var Hs=1e-4;function Gs(t,e,n,i){var r=e[1]-e[0],a=n[1]-n[0];if(0==r)return 0==a?n[0]:(n[0]+n[1])/2;if(i)if(0<r){if(t<=e[0])return n[0];if(t>=e[1])return n[1]}else{if(t>=e[0])return n[0];if(t<=e[1])return n[1]}else{if(t===e[0])return n[0];if(t===e[1])return n[1]}return(t-e[0])/r*a+n[0]}function Xs(t,e){switch(t){case"center":case"middle":t="50%";break;case"left":case"top":t="0%";break;case"right":case"bottom":t="100%"}return"string"==typeof t?function(t){return t.replace(/^\s+|\s+$/g,"")}(t).match(/%$/)?parseFloat(t)/100*e:parseFloat(t):null==t?NaN:+t}function Us(t,e,n){return null==e&&(e=10),e=Math.min(Math.max(0,e),20),t=(+t).toFixed(e),n?t:+t}function Ys(t){var e=t.toString(),n=e.indexOf("e");if(0<n){var i=+e.slice(n+1);return i<0?-i:0}var r=e.indexOf(".");return r<0?0:e.length-1-r}function qs(t){var e=2*Math.PI;return(t%e+e)%e}function js(t){return-Hs<t&&t<Hs}var Zs=/^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;function $s(t){if(t instanceof Date)return t;if("string"!=typeof t)return null==t?new Date(NaN):new Date(Math.round(t));var e=Zs.exec(t);if(!e)return new Date(NaN);if(e[8]){var n=+e[4]||0;return"Z"!==e[8].toUpperCase()&&(n-=e[8].slice(0,3)),new Date(Date.UTC(+e[1],+(e[2]||1)-1,+e[3]||1,n,+(e[5]||0),+e[6]||0,+e[7]||0))}return new Date(+e[1],+(e[2]||1)-1,+e[3]||1,+e[4]||0,+(e[5]||0),+e[6]||0,+e[7]||0)}function Ks(t){if(0===t)return 0;var e=Math.floor(Math.log(t)/Math.LN10);return 10<=t/Math.pow(10,e)&&e++,e}function Qs(t,e){var n=Ks(t),i=Math.pow(10,n),r=t/i;return t=(e?r<1.5?1:r<2.5?2:r<4?3:r<7?5:10:r<1?1:r<2?2:r<3?3:r<5?5:10)*i,-20<=n?+t.toFixed(n<0?-n:0):t}function Js(t){return isNaN(t)?"-":(t=(t+"").split("."))[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,")+(1<t.length?"."+t[1]:"")}var tl=H,el=/([&<>"'])/g,nl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function il(t){return null==t?"":(t+"").replace(el,function(t,e){return nl[e]})}function rl(t,e){return"{"+t+(null==e?"":e)+"}"}var al=["a","b","c","d","e","f","g"];function ol(t,e){var n=(t=C(t)?{color:t,extraCssText:e}:t||{}).color,i=t.type,r=(e=t.extraCssText,t.renderMode||"html"),a=t.markerId||"X";return n?"html"===r?"subItem"===i?'<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:'+il(n)+";"+(e||"")+'"></span>':'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+il(n)+";"+(e||"")+'"></span>':{renderMode:r,content:"{marker"+a+"|}  ",style:{color:n}}:""}function sl(t,e){return"0000".substr(0,e-(t+="").length)+t}function ll(t,e,n){"week"!==t&&"month"!==t&&"quarter"!==t&&"half-year"!==t&&"year"!==t||(t="MM-dd\nyyyy");var i=$s(e),r=n?"UTC":"",a=i["get"+r+"FullYear"](),o=i["get"+r+"Month"]()+1,s=i["get"+r+"Date"](),l=i["get"+r+"Hours"](),h=i["get"+r+"Minutes"](),u=i["get"+r+"Seconds"](),c=i["get"+r+"Milliseconds"]();return t=t.replace("MM",sl(o,2)).replace("M",o).replace("yyyy",a).replace("yy",a%100).replace("dd",sl(s,2)).replace("d",s).replace("hh",sl(l,2)).replace("h",l).replace("mm",sl(h,2)).replace("m",h).replace("ss",sl(u,2)).replace("s",u).replace("SSS",sl(c,3))}var hl=Wn,ul=D,cl=["left","right","top","bottom","width","height"],dl=[["width","left","right"],["height","top","bottom"]];function fl(u,c,d,f,p){var g=0,v=0;null==f&&(f=1/0),null==p&&(p=1/0);var m=0;c.eachChild(function(t,e){var n,i,r=t.position,a=t.getBoundingRect(),o=c.childAt(e+1),s=o&&o.getBoundingRect();if("horizontal"===u){var l=a.width+(s?-s.x+a.x:0);m=f<(n=g+l)||t.newline?(g=0,n=l,v+=m+d,a.height):Math.max(m,a.height)}else{var h=a.height+(s?-s.y+a.y:0);m=p<(i=v+h)||t.newline?(g+=m+d,v=0,i=h,a.width):Math.max(m,a.width)}t.newline||(r[0]=g,r[1]=v,"horizontal"===u?g=n+d:v=i+d)})}I(fl,"vertical"),I(fl,"horizontal");function pl(t,e,n){n=tl(n||0);var i=e.width,r=e.height,a=Xs(t.left,i),o=Xs(t.top,r),s=Xs(t.right,i),l=Xs(t.bottom,r),h=Xs(t.width,i),u=Xs(t.height,r),c=n[2]+n[0],d=n[1]+n[3],f=t.aspect;switch(isNaN(h)&&(h=i-s-d-a),isNaN(u)&&(u=r-l-c-o),null!=f&&(isNaN(h)&&isNaN(u)&&(i/r<f?h=.8*i:u=.8*r),isNaN(h)&&(h=f*u),isNaN(u)&&(u=h/f)),isNaN(a)&&(a=i-s-h-d),isNaN(o)&&(o=r-l-u-c),t.left||t.right){case"center":a=i/2-h/2-n[3];break;case"right":a=i-h-d}switch(t.top||t.bottom){case"middle":case"center":o=r/2-u/2-n[0];break;case"bottom":o=r-u-c}a=a||0,o=o||0,isNaN(h)&&(h=i-d-a-(s||0)),isNaN(u)&&(u=r-c-o-(l||0));var p=new $e(a+n[3],o+n[0],h,u);return p.margin=n,p}function gl(l,h,t){O(t)||(t={});var u=t.ignoreSize;L(u)||(u=[u,u]);var e=i(dl[0],0),n=i(dl[1],1);function i(t,e){var n={},i=0,r={},a=0;if(ul(t,function(t){r[t]=l[t]}),ul(t,function(t){c(h,t)&&(n[t]=r[t]=h[t]),d(n,t)&&i++,d(r,t)&&a++}),u[e])return d(h,t[1])?r[t[2]]=null:d(h,t[2])&&(r[t[1]]=null),r;if(2!==a&&i){if(2<=i)return n;for(var o=0;o<t.length;o++){var s=t[o];if(!c(n,s)&&c(l,s)){n[s]=l[s];break}}return n}return r}function c(t,e){return t.hasOwnProperty(e)}function d(t,e){return null!=t[e]&&"auto"!==t[e]}function r(t,e,n){ul(t,function(t){e[t]=n[t]})}r(dl[0],l,e),r(dl[1],l,n)}function vl(t){return function(e,n){return n&&e&&ul(cl,function(t){n.hasOwnProperty(t)&&(e[t]=n[t])}),e}({},t)}var ml,yl,_l,xl=ur(),wl=Rs.extend({type:"component",id:"",name:"",mainType:"",subType:"",componentIndex:0,defaultOption:null,ecModel:null,dependentModels:[],uid:null,layoutMode:null,$constructor:function(t,e,n,i){Rs.call(this,t,e,n,i),this.uid=Ws("ec_cpt_model")},init:function(t,e,n,i){this.mergeDefaultAndTheme(t,n)},mergeDefaultAndTheme:function(t,e){var n=this.layoutMode,i=n?vl(t):{};f(t,e.getTheme().get(this.mainType)),f(t,this.getDefaultOption()),n&&gl(t,i,n)},mergeOption:function(t,e){f(this.option,t,!0);var n=this.layoutMode;n&&gl(this.option,t,n)},optionUpdated:function(t,e){},getDefaultOption:function(){var t=xl(this);if(!t.defaultOption){for(var e=[],n=this.constructor;n;){var i=n.prototype.defaultOption;i&&e.push(i),n=n.superClass}for(var r={},a=e.length-1;0<=a;a--)r=f(r,e[a],!0);t.defaultOption=r}return t.defaultOption},getReferringComponents:function(t){return this.ecModel.queryComponents({mainType:t,index:this.get(t+"Index",!0),id:this.get(t+"Id",!0)})}});function bl(t,e){return t[e]||(t[e]={predecessor:[],successor:[]}),t[e]}Sr(wl,{registerWhenExtend:!0}),yl={},(ml=wl).registerSubTypeDefaulter=function(t,e){t=mr(t),yl[t.main]=e},ml.determineSubType=function(t,e){var n=e.type;if(!n){var i=mr(t).main;ml.hasSubTypes(t)&&yl[i]&&(n=yl[i](e))}return n},_l=function(t){var e=[];D(wl.getClassesByMainType(t),function(t){e=e.concat(t.prototype.dependencies||[])}),e=A(e,function(t){return mr(t).main}),"dataset"!==t&&g(e,"dataset")<=0&&e.unshift("dataset");return e},wl.topologicalTravel=function(t,e,n,i){if(t.length){var r=function(e){var r={},a=[];return D(e,function(n){var i=bl(r,n),t=function(t,e){var n=[];return D(t,function(t){0<=g(e,t)&&n.push(t)}),n}(i.originalDeps=_l(n),e);i.entryCount=t.length,0===i.entryCount&&a.push(n),D(t,function(t){g(i.predecessor,t)<0&&i.predecessor.push(t);var e=bl(r,t);g(e.successor,t)<0&&e.successor.push(n)})}),{graph:r,noEntryList:a}}(e),a=r.graph,o=r.noEntryList,s={};for(D(t,function(t){s[t]=!0});o.length;){var l=o.pop(),h=a[l],u=!!s[l];u&&(n.call(i,l,h.originalDeps.slice()),delete s[l]),D(h.successor,u?d:c)}D(s,function(){throw new Error("Circle dependency may exists")})}function c(t){a[t].entryCount--,0===a[t].entryCount&&o.push(t)}function d(t){s[t]=!0,c(t)}},_(wl,{getBoxLayoutParams:function(){return{left:this.get("left"),top:this.get("top"),right:this.get("right"),bottom:this.get("bottom"),width:this.get("width"),height:this.get("height")}}});var Sl="";"undefined"!=typeof navigator&&(Sl=navigator.platform||"");var Ml={color:["#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83","#ca8622","#bda29a","#6e7074","#546570","#c4ccd3"],gradientColor:["#f6efa6","#d88273","#bf444c"],textStyle:{fontFamily:Sl.match(/^Win/)?"Microsoft YaHei":"sans-serif",fontSize:12,fontStyle:"normal",fontWeight:"normal"},blendMode:null,animation:"auto",animationDuration:1e3,animationDurationUpdate:300,animationEasing:"exponentialOut",animationEasingUpdate:"cubicOut",animationThreshold:2e3,progressiveThreshold:3e3,progressive:400,hoverLayerThreshold:3e3,useUTC:!1},Il=ur();var Tl={clearColorPalette:function(){Il(this).colorIdx=0,Il(this).colorNameMap={}},getColorFromPalette:function(t,e,n){var i=Il(e=e||this),r=i.colorIdx||0,a=i.colorNameMap=i.colorNameMap||{};if(a.hasOwnProperty(t))return a[t];var o=nr(this.get("color",!0)),s=this.get("colorLayer",!0),l=null!=n&&s?function(t,e){for(var n=t.length,i=0;i<n;i++)if(t[i].length>e)return t[i];return t[n-1]}(s,n):o;if((l=l||o)&&l.length){var h=l[r];return t&&(a[t]=h),i.colorIdx=(r+1)%l.length,h}}},Cl="original",kl="arrayRows",Dl="objectRows",Al="keyedColumns",Ll="unknown",Pl="typedArray",Ol="column",El="row";function Nl(t){this.fromDataset=t.fromDataset,this.data=t.data||(t.sourceFormat===Al?{}:[]),this.sourceFormat=t.sourceFormat||Ll,this.seriesLayoutBy=t.seriesLayoutBy||Ol,this.dimensionsDefine=t.dimensionsDefine,this.encodeDefine=t.encodeDefine&&Z(t.encodeDefine),this.startIndex=t.startIndex||0,this.dimensionsDetectCount=t.dimensionsDetectCount}Nl.seriesDataToSource=function(t){return new Nl({data:t,sourceFormat:N(t)?Pl:Cl,fromDataset:!1})},xr(Nl);var Bl={Must:1,Might:2,Not:3},Rl=ur();function zl(t){var e=t.option,n=e.data,i=N(n)?Pl:Cl,r=!1,a=e.seriesLayoutBy,o=e.sourceHeader,s=e.dimensions,l=Gl(t);if(l){var h=l.option;n=h.source,i=Rl(l).sourceFormat,r=!0,a=a||h.seriesLayoutBy,null==o&&(o=h.sourceHeader),s=s||h.dimensions}var u=function(t,e,n,i,r){if(!t)return{dimensionsDefine:Fl(r)};var a,o;if(e===kl)"auto"===i||null==i?Vl(function(t){null!=t&&"-"!==t&&(C(t)?null==o&&(o=1):o=0)},n,t,10):o=i?1:0,r||1!==o||(r=[],Vl(function(t,e){r[e]=null!=t?t:""},n,t)),a=r?r.length:n===El?t.length:t[0]?t[0].length:null;else if(e===Dl)r=r||function(t){var e,n=0;for(;n<t.length&&!(e=t[n++]););if(e){var i=[];return D(e,function(t,e){i.push(e)}),i}}(t);else if(e===Al)r||(r=[],D(t,function(t,e){r.push(e)}));else if(e===Cl){var s=ar(t[0]);a=L(s)&&s.length||1}return{startIndex:o,dimensionsDefine:Fl(r),dimensionsDetectCount:a}}(n,i,a,o,s);Rl(t).source=new Nl({data:n,fromDataset:r,seriesLayoutBy:a,sourceFormat:i,dimensionsDefine:u.dimensionsDefine,startIndex:u.startIndex,dimensionsDetectCount:u.dimensionsDetectCount,encodeDefine:e.encode})}function Fl(t){if(t){var i=Z();return A(t,function(t,e){if(null==(t=S({},O(t)?t:{name:t})).name)return t;t.name+="",null==t.displayName&&(t.displayName=t.name);var n=i.get(t.name);return n?t.name+="-"+n.count++:i.set(t.name,{count:1}),t})}}function Vl(t,e,n,i){if(null==i&&(i=1/0),e===El)for(var r=0;r<n.length&&r<i;r++)t(n[r]?n[r][0]:null,r);else{var a=n[0]||[];for(r=0;r<a.length&&r<i;r++)t(a[r],r)}}function Wl(n,t,e){var a={},i=Gl(t);if(!i||!n)return a;var o,r,s=[],l=[],h=t.ecModel,u=Rl(h).datasetMap,c=i.uid+"_"+e.seriesLayoutBy;D(n=n.slice(),function(t,e){O(t)||(n[e]={name:t}),"ordinal"===t.type&&null==o&&(r=p(n[o=e])),a[t.name]=[]});var d=u.get(c)||u.set(c,{categoryWayDim:r,valueWayDim:0});function f(t,e,n){for(var i=0;i<n;i++)t.push(e+i)}function p(t){var e=t.dimsDef;return e?e.length:1}return D(n,function(t,e){var n=t.name,i=p(t);if(null==o){var r=d.valueWayDim;f(a[n],r,i),f(l,r,i),d.valueWayDim+=i}else if(o===e)f(a[n],0,i),f(s,0,i);else{r=d.categoryWayDim;f(a[n],r,i),f(l,r,i),d.categoryWayDim+=i}}),s.length&&(a.itemName=s),l.length&&(a.seriesName=l),a}function Hl(t,l,h){var e={};if(!Gl(t))return e;var u,c=l.sourceFormat,d=l.dimensionsDefine;c!==Dl&&c!==Al||D(d,function(t,e){"name"===(O(t)?t.name:t)&&(u=e)});var n=function(){for(var t={},e={},n=[],i=0,r=Math.min(5,h);i<r;i++){var a=Xl(l.data,c,l.seriesLayoutBy,d,l.startIndex,i);n.push(a);var o=a===Bl.Not;if(o&&null==t.v&&i!==u&&(t.v=i),null!=t.n&&t.n!==t.v&&(o||n[t.n]!==Bl.Not)||(t.n=i),s(t)&&n[t.n]!==Bl.Not)return t;o||(a===Bl.Might&&null==e.v&&i!==u&&(e.v=i),null!=e.n&&e.n!==e.v||(e.n=i))}function s(t){return null!=t.v&&null!=t.n}return s(t)?t:s(e)?e:null}();if(n){e.value=n.v;var i=null!=u?u:n.n;e.itemName=[i],e.seriesName=[i]}return e}function Gl(t){var e=t.option;if(!e.data)return t.ecModel.getComponent("dataset",e.datasetIndex||0)}function Xl(t,e,n,i,r,a){var o,s,l;if(N(t))return Bl.Not;if(i){var h=i[a];O(h)?(s=h.name,l=h.type):C(h)&&(s=h)}if(null!=l)return"ordinal"===l?Bl.Must:Bl.Not;if(e===kl)if(n===El){for(var u=t[a],c=0;c<(u||[]).length&&c<5;c++)if(null!=(o=g(u[r+c])))return o}else for(c=0;c<t.length&&c<5;c++){var d=t[r+c];if(d&&null!=(o=g(d[a])))return o}else if(e===Dl){if(!s)return Bl.Not;for(c=0;c<t.length&&c<5;c++){if((f=t[c])&&null!=(o=g(f[s])))return o}}else if(e===Al){if(!s)return Bl.Not;if(!(u=t[s])||N(u))return Bl.Not;for(c=0;c<u.length&&c<5;c++)if(null!=(o=g(u[c])))return o}else if(e===Cl)for(c=0;c<t.length&&c<5;c++){var f,p=ar(f=t[c]);if(!L(p))return Bl.Not;if(null!=(o=g(p[a])))return o}function g(t){var e=C(t);return null!=t&&isFinite(t)&&""!==t?e?Bl.Might:Bl.Not:e&&"-"!==t?Bl.Must:void 0}return Bl.Not}var Ul="\0_ec_inner",Yl=Rs.extend({init:function(t,e,n,i){n=n||{},this.option=null,this._theme=new Rs(n),this._optionManager=i},setOption:function(t,e){G(!(Ul in t),"please use chart.getOption()"),this._optionManager.setOption(t,e),this.resetOption(null)},resetOption:function(t){var e=!1,n=this._optionManager;if(!t||"recreate"===t){var i=n.mountOption("recreate"===t);this.option&&"recreate"!==t?(this.restoreData(),this.mergeOption(i)):function(t){t=t,this.option={},this.option[Ul]=1,this._componentsMap=Z({series:[]}),this._seriesIndices,this._seriesIndicesMap,function(n,t){var i=n.color&&!n.colorLayer;D(t,function(t,e){"colorLayer"===e&&i||wl.hasClass(e)||("object"==typeof t?n[e]=n[e]?f(n[e],t,!1):b(t):null==n[e]&&(n[e]=t))})}(t,this._theme.option),f(t,Ml,!1),this.mergeOption(t)}.call(this,i),e=!0}if("timeline"!==t&&"media"!==t||this.restoreData(),!t||"recreate"===t||"timeline"===t){var r=n.getTimelineOption(this);r&&(this.mergeOption(r),e=!0)}if(!t||"recreate"===t||"media"===t){var a=n.getMediaOption(this,this._api);a.length&&D(a,function(t){this.mergeOption(t,e=!0)},this)}return e},mergeOption:function(i){var l=this.option,h=this._componentsMap,n=[];!function(t){Rl(t).datasetMap=Z()}(this),D(i,function(t,e){null!=t&&(wl.hasClass(e)?e&&n.push(e):l[e]=null==l[e]?b(t):f(l[e],t,!0))}),wl.topologicalTravel(n,wl.getAllClassMainTypes(),function(o,t){var e=nr(i[o]),n=or(h.get(o),e);(function(t){var o=Z();Qi(t,function(t,e){var n=t.exist;n&&o.set(n.id,t)}),Qi(t,function(t,e){var n=t.option;G(!n||null==n.id||!o.get(n.id)||o.get(n.id)===t,"id duplicates: "+(n&&n.id)),n&&null!=n.id&&o.set(n.id,t),t.keyInfo||(t.keyInfo={})}),Qi(t,function(t,e){var n=t.exist,i=t.option,r=t.keyInfo;if(Ji(i)){if(r.name=null!=i.name?i.name+"":n?n.name:er+e,n)r.id=n.id;else if(null!=i.id)r.id=i.id+"";else for(var a=0;r.id="\0"+r.name+"\0"+a++,o.get(r.id););o.set(r.id,t)}})})(n),D(n,function(t,e){var n=t.option;O(n)&&(t.keyInfo.mainType=o,t.keyInfo.subType=function(t,e,n){return e.type?e.type:n?n.subType:wl.determineSubType(t,e)}(o,n,t.exist))});var s=function(e,t){L(t)||(t=t?[t]:[]);var n={};return D(t,function(t){n[t]=(e.get(t)||[]).slice()}),n}(h,t);l[o]=[],h.set(o,[]),D(n,function(t,e){var n=t.exist,i=t.option;if(G(O(i)||n,"Empty component definition"),i){var r=wl.getClass(o,t.keyInfo.subType,!0);if(n&&n.constructor===r)n.name=t.keyInfo.name,n.mergeOption(i,this),n.optionUpdated(i,!1);else{var a=S({dependentModels:s,componentIndex:e},t.keyInfo);S(n=new r(i,this,this,a),a),n.init(i,this,this,a),n.optionUpdated(null,!0)}}else n.mergeOption({},this),n.optionUpdated({},!1);h.get(o)[e]=n,l[o][e]=n.option},this),"series"===o&&ql(this,h.get("series"))},this),this._seriesIndicesMap=Z(this._seriesIndices=this._seriesIndices||[])},getOption:function(){var i=b(this.option);return D(i,function(t,e){if(wl.hasClass(e)){for(var n=(t=nr(t)).length-1;0<=n;n--)lr(t[n])&&t.splice(n,1);i[e]=t}}),delete i[Ul],i},getTheme:function(){return this._theme},getComponent:function(t,e){var n=this._componentsMap.get(t);if(n)return n[e||0]},queryComponents:function(t){var e=t.mainType;if(!e)return[];var n,i=t.index,r=t.id,a=t.name,o=this._componentsMap.get(e);if(!o||!o.length)return[];if(null!=i)L(i)||(i=[i]),n=x(A(i,function(t){return o[t]}),function(t){return!!t});else if(null!=r){var s=L(r);n=x(o,function(t){return s&&0<=g(r,t.id)||!s&&t.id===r})}else if(null!=a){var l=L(a);n=x(o,function(t){return l&&0<=g(a,t.name)||!l&&t.name===a})}else n=o.slice();return jl(n,t)},findComponents:function(t){var e,n,i,r,a,o=t.query,s=t.mainType,l=(n=s+"Index",i=s+"Id",r=s+"Name",!(e=o)||null==e[n]&&null==e[i]&&null==e[r]?null:{mainType:s,index:e[n],id:e[i],name:e[r]}),h=l?this.queryComponents(l):this._componentsMap.get(s);return a=jl(h,t),t.filter?x(a,t.filter):a},eachComponent:function(t,i,r){var e=this._componentsMap;if("function"==typeof t)r=i,i=t,e.each(function(t,n){D(t,function(t,e){i.call(r,n,t,e)})});else if(C(t))D(e.get(t),i,r);else if(O(t)){D(this.findComponents(t),i,r)}},getSeriesByName:function(e){return x(this._componentsMap.get("series"),function(t){return t.name===e})},getSeriesByIndex:function(t){return this._componentsMap.get("series")[t]},getSeriesByType:function(e){return x(this._componentsMap.get("series"),function(t){return t.subType===e})},getSeries:function(){return this._componentsMap.get("series").slice()},getSeriesCount:function(){return this._componentsMap.get("series").length},eachSeries:function(n,i){D(this._seriesIndices,function(t){var e=this._componentsMap.get("series")[t];n.call(i,e,t)},this)},eachRawSeries:function(t,e){D(this._componentsMap.get("series"),t,e)},eachSeriesByType:function(n,i,r){D(this._seriesIndices,function(t){var e=this._componentsMap.get("series")[t];e.subType===n&&i.call(r,e,t)},this)},eachRawSeriesByType:function(t,e,n){return D(this.getSeriesByType(t),e,n)},isSeriesFiltered:function(t){return null==this._seriesIndicesMap.get(t.componentIndex)},getCurrentSeriesIndices:function(){return(this._seriesIndices||[]).slice()},filterSeries:function(t,e){var n=x(this._componentsMap.get("series"),t,e);ql(this,n)},restoreData:function(n){var i=this._componentsMap;ql(this,i.get("series"));var r=[];i.each(function(t,e){r.push(e)}),wl.topologicalTravel(r,wl.getAllClassMainTypes(),function(e,t){D(i.get(e),function(t){"series"===e&&function(t,e){if(e){var n=e.seiresIndex,i=e.seriesId,r=e.seriesName;return null!=n&&t.componentIndex!==n||null!=i&&t.id!==i||null!=r&&t.name!==r}}(t,n)||t.restoreData()})})}});function ql(t,e){t._seriesIndicesMap=Z(t._seriesIndices=A(e,function(t){return t.componentIndex})||[])}function jl(t,e){return e.hasOwnProperty("subType")?x(t,function(t){return t.subType===e.subType}):t}_(Yl,Tl);var Zl=["getDom","getZr","getWidth","getHeight","getDevicePixelRatio","dispatchAction","isDisposed","on","off","getDataURL","getConnectedDataURL","getModel","getOption","getViewOfComponentModel","getViewOfSeriesModel"];function $l(e){D(Zl,function(t){this[t]=w(e[t],e)},this)}var Kl={};function Ql(){this._coordinateSystems=[]}Ql.prototype={constructor:Ql,create:function(i,r){var a=[];D(Kl,function(t,e){var n=t.create(i,r);a=a.concat(n||[])}),this._coordinateSystems=a},update:function(e,n){D(this._coordinateSystems,function(t){t.update&&t.update(e,n)})},getCoordinateSystems:function(){return this._coordinateSystems.slice()}},Ql.register=function(t,e){Kl[t]=e},Ql.get=function(t){return Kl[t]};var Jl=D,th=b,eh=A,nh=f,ih=/^(min|max)?(.+)$/;function rh(t){this._api=t,this._timelineOptions=[],this._mediaList=[],this._mediaDefault,this._currentMediaIndices=[],this._optionBackup,this._newBaseOption}function ah(t,e,n){var a={width:e,height:n,aspectratio:e/n},o=!0;return D(t,function(t,e){var n=e.match(ih);if(n&&n[1]&&n[2]){var i=n[1],r=n[2].toLowerCase();!function(t,e,n){return"min"===n?e<=t:"max"===n?t<=e:t===e}(a[r],t,i)&&(o=!1)}}),o}rh.prototype={constructor:rh,setOption:function(t,e){t&&D(nr(t.series),function(t){t&&t.data&&N(t.data)&&Y(t.data)}),t=th(t);var n=this._optionBackup,i=function(t,n,i){var e,r,a=[],o=[],s=t.timeline;t.baseOption&&(r=t.baseOption);(s||t.options)&&(r=r||{},a=(t.options||[]).slice());if(t.media){r=r||{};var l=t.media;Jl(l,function(t){t&&t.option&&(t.query?o.push(t):e=e||t)})}r=r||t;r.timeline||(r.timeline=s);return Jl([r].concat(a).concat(A(o,function(t){return t.option})),function(e){Jl(n,function(t){t(e,i)})}),{baseOption:r,timelineOptions:a,mediaDefault:e,mediaList:o}}.call(this,t,e,!n);this._newBaseOption=i.baseOption,n?(function(r,t){Jl(t=t||{},function(t,e){if(null!=t){var n=r[e];if(wl.hasClass(e)){t=nr(t);var i=or(n=nr(n),t);r[e]=eh(i,function(t){return t.option&&t.exist?nh(t.exist,t.option,!0):t.exist||t.option})}else r[e]=nh(n,t,!0)}})}(n.baseOption,i.baseOption),i.timelineOptions.length&&(n.timelineOptions=i.timelineOptions),i.mediaList.length&&(n.mediaList=i.mediaList),i.mediaDefault&&(n.mediaDefault=i.mediaDefault)):this._optionBackup=i},mountOption:function(t){var e=this._optionBackup;return this._timelineOptions=eh(e.timelineOptions,th),this._mediaList=eh(e.mediaList,th),this._mediaDefault=th(e.mediaDefault),this._currentMediaIndices=[],th(t?e.baseOption:this._newBaseOption)},getTimelineOption:function(t){var e,n=this._timelineOptions;if(n.length){var i=t.getComponent("timeline");i&&(e=th(n[i.getCurrentIndex()],!0))}return e},getMediaOption:function(t){var e=this._api.getWidth(),n=this._api.getHeight(),i=this._mediaList,r=this._mediaDefault,a=[],o=[];if(!i.length&&!r)return o;for(var s=0,l=i.length;s<l;s++)ah(i[s].query,e,n)&&a.push(s);return!a.length&&r&&(a=[-1]),a.length&&!function(t,e){return t.join(",")===e.join(",")}(a,this._currentMediaIndices)&&(o=eh(a,function(t){return th(-1===t?r.option:i[t].option)})),this._currentMediaIndices=a,o}};var oh=D,sh=O,lh=["areaStyle","lineStyle","nodeStyle","linkStyle","chordStyle","label","labelLine"];function hh(t){var e=t&&t.itemStyle;if(e)for(var n=0,i=lh.length;n<i;n++){var r=lh[n],a=e.normal,o=e.emphasis;a&&a[r]&&(t[r]=t[r]||{},t[r].normal?f(t[r].normal,a[r]):t[r].normal=a[r],a[r]=null),o&&o[r]&&(t[r]=t[r]||{},t[r].emphasis?f(t[r].emphasis,o[r]):t[r].emphasis=o[r],o[r]=null)}}function uh(t,e,n){if(t&&t[e]&&(t[e].normal||t[e].emphasis)){var i=t[e].normal,r=t[e].emphasis;i&&(n?(t[e].normal=t[e].emphasis=null,k(t[e],i)):t[e]=i),r&&(t.emphasis=t.emphasis||{},t.emphasis[e]=r)}}function ch(t){uh(t,"itemStyle"),uh(t,"lineStyle"),uh(t,"areaStyle"),uh(t,"label"),uh(t,"labelLine"),uh(t,"upperLabel"),uh(t,"edgeLabel")}function dh(t,e){var n=sh(t)&&t[e],i=sh(n)&&n.textStyle;if(i)for(var r=0,a=rr.length;r<a;r++){e=rr[r];i.hasOwnProperty(e)&&(n[e]=i[e])}}function fh(t){t&&(ch(t),dh(t,"label"),t.emphasis&&dh(t.emphasis,"label"))}function ph(t){return L(t)?t:t?[t]:[]}function gh(t){return(L(t)?t[0]:t)||{}}function vh(e,t){oh(ph(e.series),function(t){sh(t)&&function(t){if(sh(t)){hh(t),ch(t),dh(t,"label"),dh(t,"upperLabel"),dh(t,"edgeLabel"),t.emphasis&&(dh(t.emphasis,"label"),dh(t.emphasis,"upperLabel"),dh(t.emphasis,"edgeLabel")),(n=t.markPoint)&&(hh(n),fh(n)),(i=t.markLine)&&(hh(i),fh(i));var e=t.markArea;e&&fh(e);var n,i,r=t.data;if("graph"===t.type){r=r||t.nodes;var a=t.links||t.edges;if(a&&!N(a))for(var o=0;o<a.length;o++)fh(a[o]);D(t.categories,function(t){ch(t)})}if(r&&!N(r))for(o=0;o<r.length;o++)fh(r[o]);if((n=t.markPoint)&&n.data){var s=n.data;for(o=0;o<s.length;o++)fh(s[o])}if((i=t.markLine)&&i.data){var l=i.data;for(o=0;o<l.length;o++)L(l[o])?(fh(l[o][0]),fh(l[o][1])):fh(l[o])}"gauge"===t.type?(dh(t,"axisLabel"),dh(t,"title"),dh(t,"detail")):"treemap"===t.type?(uh(t.breadcrumb,"itemStyle"),D(t.levels,function(t){ch(t)})):"tree"===t.type&&ch(t.leaves)}}(t)});var n=["xAxis","yAxis","radiusAxis","angleAxis","singleAxis","parallelAxis","radar"];t&&n.push("valueAxis","categoryAxis","logAxis","timeAxis"),oh(n,function(t){oh(ph(e[t]),function(t){t&&(dh(t,"axisLabel"),dh(t.axisPointer,"label"))})}),oh(ph(e.parallel),function(t){var e=t&&t.parallelAxisDefault;dh(e,"axisLabel"),dh(e&&e.axisPointer,"label")}),oh(ph(e.calendar),function(t){uh(t,"itemStyle"),dh(t,"dayLabel"),dh(t,"monthLabel"),dh(t,"yearLabel")}),oh(ph(e.radar),function(t){dh(t,"name")}),oh(ph(e.geo),function(t){sh(t)&&(fh(t),oh(ph(t.regions),function(t){fh(t)}))}),oh(ph(e.timeline),function(t){fh(t),uh(t,"label"),uh(t,"itemStyle"),uh(t,"controlStyle",!0);var e=t.data;L(e)&&D(e,function(t){O(t)&&(uh(t,"label"),uh(t,"itemStyle"))})}),oh(ph(e.toolbox),function(t){uh(t,"iconStyle"),oh(t.feature,function(t){uh(t,"iconStyle")})}),dh(gh(e.axisPointer),"label"),dh(gh(e.tooltip).axisPointer,"label")}function mh(e){D(yh,function(t){t[0]in e&&!(t[1]in e)&&(e[t[1]]=e[t[0]])})}var yh=[["x","left"],["y","top"],["x2","right"],["y2","bottom"]],_h=["grid","geo","parallel","legend","toolbox","title","visualMap","dataZoom","timeline"],xh=function(n,t){vh(n,t),n.series=nr(n.series),D(n.series,function(t){if(O(t)){var e=t.type;if("line"===e)null!=t.clipOverflow&&(t.clip=t.clipOverflow);else if("pie"===e||"gauge"===e)null!=t.clockWise&&(t.clockwise=t.clockWise);else if("gauge"===e){var n=function(t,e){e=e.split(",");for(var n=t,i=0;i<e.length&&null!=(n=n&&n[e[i]]);i++);return n}(t,"pointer.color");null!=n&&function(t,e,n,i){e=e.split(",");for(var r,a=t,o=0;o<e.length-1;o++)null==a[r=e[o]]&&(a[r]={}),a=a[r];!i&&null!=a[e[o]]||(a[e[o]]=n)}(t,"itemStyle.color",n)}mh(t)}}),n.dataRange&&(n.visualMap=n.dataRange),D(_h,function(t){var e=n[t];e&&(L(e)||(e=[e]),D(e,function(t){mh(t)}))})};function wh(v){D(v,function(u,c){var d=[],f=[NaN,NaN],t=[u.stackResultDimension,u.stackedOverDimension],p=u.data,g=u.isStackedByIndex,e=p.map(t,function(t,e,n){var i,r,a=p.get(u.stackedDimension,n);if(isNaN(a))return f;g?r=p.getRawIndex(n):i=p.get(u.stackedByDimension,n);for(var o=NaN,s=c-1;0<=s;s--){var l=v[s];if(g||(r=l.data.rawIndexOf(l.stackedByDimension,i)),0<=r){var h=l.data.getByRawIndex(l.stackResultDimension,r);if(0<=a&&0<h||a<=0&&h<0){a+=h,o=h;break}}}return d[0]=a,d[1]=o,d});p.hostModel.setData(e),u.data=e})}function bh(t,e){Nl.isInstance(t)||(t=Nl.seriesDataToSource(t)),this._source=t;var n=this._data=t.data,i=t.sourceFormat;i===Pl&&(this._offset=0,this._dimSize=e,this._data=n),S(this,Mh[i===kl?i+"_"+t.seriesLayoutBy:i])}var Sh=bh.prototype;Sh.pure=!1;var Mh={arrayRows_column:{pure:Sh.persistent=!0,count:function(){return Math.max(0,this._data.length-this._source.startIndex)},getItem:function(t){return this._data[t+this._source.startIndex]},appendData:Ch},arrayRows_row:{pure:!0,count:function(){var t=this._data[0];return t?Math.max(0,t.length-this._source.startIndex):0},getItem:function(t){t+=this._source.startIndex;for(var e=[],n=this._data,i=0;i<n.length;i++){var r=n[i];e.push(r?r[t]:null)}return e},appendData:function(){throw new Error('Do not support appendData when set seriesLayoutBy: "row".')}},objectRows:{pure:!0,count:Ih,getItem:Th,appendData:Ch},keyedColumns:{pure:!0,count:function(){var t=this._source.dimensionsDefine[0].name,e=this._data[t];return e?e.length:0},getItem:function(t){for(var e=[],n=this._source.dimensionsDefine,i=0;i<n.length;i++){var r=this._data[n[i].name];e.push(r?r[t]:null)}return e},appendData:function(t){var r=this._data;D(t,function(t,e){for(var n=r[e]||(r[e]=[]),i=0;i<(t||[]).length;i++)n.push(t[i])})}},original:{count:Ih,getItem:Th,appendData:Ch},typedArray:{persistent:!(Sh.getSource=function(){return this._source}),pure:!0,count:function(){return this._data?this._data.length/this._dimSize:0},getItem:function(t,e){t-=this._offset,e=e||[];for(var n=this._dimSize*t,i=0;i<this._dimSize;i++)e[i]=this._data[n+i];return e},appendData:function(t){this._data=t},clean:function(){this._offset+=this.count(),this._data=null}}};function Ih(){return this._data.length}function Th(t){return this._data[t]}function Ch(t){for(var e=0;e<t.length;e++)this._data.push(t[e])}var kh={arrayRows:Dh,objectRows:function(t,e,n,i){return null!=n?t[i]:t},keyedColumns:Dh,original:function(t,e,n,i){var r=ar(t);return null!=n&&r instanceof Array?r[n]:r},typedArray:Dh};function Dh(t,e,n,i){return null!=n?t[n]:t}var Ah={arrayRows:Lh,objectRows:function(t,e,n,i){return Ph(t[e],this._dimensionInfos[e])},keyedColumns:Lh,original:function(t,e,n,i){var r=t&&(null==t.value?t:t.value);return!this._rawData.pure&&function(t){return Ji(t)&&!(t instanceof Array)}(t)&&(this.hasItemOption=!0),Ph(r instanceof Array?r[i]:r,this._dimensionInfos[e])},typedArray:function(t,e,n,i){return t[i]}};function Lh(t,e,n,i){return Ph(t[i],this._dimensionInfos[e])}function Ph(t,e){var n=e&&e.type;if("ordinal"!==n)return"time"===n&&"number"!=typeof t&&null!=t&&"-"!==t&&(t=+$s(t)),null==t||""===t?NaN:+t;var i=e&&e.ordinalMeta;return i?i.parseAndCollect(t):t}function Oh(t,e,n){if(t){var i=t.getRawDataItem(e);if(null!=i){var r,a,o=t.getProvider().getSource().sourceFormat,s=t.getDimensionInfo(n);return s&&(r=s.name,a=s.index),kh[o](i,e,a,r)}}}function Eh(t,e,n){if(t){var i=t.getProvider().getSource().sourceFormat;if(i===Cl||i===Dl){var r=t.getRawDataItem(e);return i!==Cl||O(r)||(r=null),r?r[n]:void 0}}}var Nh=/\{@(.+?)\}/g,Bh={getDataParams:function(t,e){var n=this.getData(e),i=this.getRawValue(t,e),r=n.getRawIndex(t),a=n.getName(t),o=n.getRawDataItem(t),s=n.getItemVisual(t,"color"),l=n.getItemVisual(t,"borderColor"),h=this.ecModel.getComponent("tooltip"),u=function(t){return"auto"===t?m.domSupported?"html":"richText":t||"html"}(h&&h.get("renderMode")),c=this.mainType,d="series"===c,f=n.userOutput;return{componentType:c,componentSubType:this.subType,componentIndex:this.componentIndex,seriesType:d?this.subType:null,seriesIndex:this.seriesIndex,seriesId:d?this.id:null,seriesName:d?this.name:null,name:a,dataIndex:r,data:o,dataType:e,value:i,color:s,borderColor:l,dimensionNames:f?f.dimensionNames:null,encode:f?f.encode:null,marker:ol({color:s,renderMode:u}),$vars:["seriesName","name","value"]}},getFormattedLabel:function(i,t,e,n,r){t=t||"normal";var a=this.getData(e),o=a.getItemModel(i),s=this.getDataParams(i,e);null!=n&&s.value instanceof Array&&(s.value=s.value[n]);var l=o.get("normal"===t?[r||"label","formatter"]:[t,r||"label","formatter"]);return"function"==typeof l?(s.status=t,s.dimensionIndex=n,l(s)):"string"==typeof l?function(t,e,n){L(e)||(e=[e]);var i=e.length;if(!i)return"";for(var r=e[0].$vars||[],a=0;a<r.length;a++){var o=al[a];t=t.replace(rl(o),rl(o,0))}for(var s=0;s<i;s++)for(var l=0;l<r.length;l++){var h=e[s][r[l]];t=t.replace(rl(al[l],s),n?il(h):h)}return t}(l,s).replace(Nh,function(t,e){var n=e.length;return"["===e.charAt(0)&&"]"===e.charAt(n-1)&&(e=+e.slice(1,n-1)),Oh(a,i,e)}):void 0},getRawValue:function(t,e){return Oh(this.getData(e),t)},formatTooltip:function(){}};function Rh(t){return new zh(t)}function zh(t){t=t||{},this._reset=t.reset,this._plan=t.plan,this._count=t.count,this._onDirty=t.onDirty,this._dirty=!0,this.context}var Fh=zh.prototype;Fh.perform=function(t){var e,n=this._upstream,i=t&&t.skip;if(this._dirty&&n){var r=this.context;r.data=r.outputData=n.context.outputData}this.__pipeline&&(this.__pipeline.currentTask=this),this._plan&&!i&&(e=this._plan(this.context));var a,o=u(this._modBy),s=this._modDataCount||0,l=u(t&&t.modBy),h=t&&t.modDataCount||0;function u(t){return 1<=t||(t=1),t}o===l&&s===h||(e="reset"),!this._dirty&&"reset"!==e||(this._dirty=!1,a=function(t,e){var n,i;t._dueIndex=t._outputDueEnd=t._dueEnd=0,t._settedOutputEnd=null,!e&&t._reset&&((n=t._reset(t.context))&&n.progress&&(i=n.forceFirstProgress,n=n.progress),L(n)&&!n.length&&(n=null));t._progress=n,t._modBy=t._modDataCount=null;var r=t._downstream;return r&&r.dirty(),i}(this,i)),this._modBy=l,this._modDataCount=h;var c=t&&t.step;if(this._dueEnd=n?n._outputDueEnd:this._count?this._count(this.context):1/0,this._progress){var d=this._dueIndex,f=Math.min(null!=c?this._dueIndex+c:1/0,this._dueEnd);if(!i&&(a||d<f)){var p=this._progress;if(L(p))for(var g=0;g<p.length;g++)Zh(this,p[g],d,f,l,h);else Zh(this,p,d,f,l,h)}this._dueIndex=f;var v=null!=this._settedOutputEnd?this._settedOutputEnd:f;this._outputDueEnd=v}else this._dueIndex=this._outputDueEnd=null!=this._settedOutputEnd?this._settedOutputEnd:this._dueEnd;return this.unfinished()};var Vh,Wh,Hh,Gh,Xh,Uh,Yh=Uh={reset:function(t,e,n,i){Wh=t,Vh=e,Hh=n,Gh=i,Xh=Math.ceil(Gh/Hh),Uh.next=1<Hh&&0<Gh?jh:qh}};function qh(){return Wh<Vh?Wh++:null}function jh(){var t=Wh%Xh*Hh+Math.ceil(Wh/Xh),e=Vh<=Wh?null:t<Gh?t:Wh;return Wh++,e}function Zh(t,e,n,i,r,a){Yh.reset(n,i,r,a),t._callingProgress=e,t._callingProgress({start:n,end:i,count:i-n,next:Yh.next},t.context)}Fh.dirty=function(){this._dirty=!0,this._onDirty&&this._onDirty(this.context)},Fh.unfinished=function(){return this._progress&&this._dueIndex<this._dueEnd},Fh.pipe=function(t){this._downstream===t&&!this._dirty||((this._downstream=t)._upstream=this,t.dirty())},Fh.dispose=function(){this._disposed||(this._upstream&&(this._upstream._downstream=null),this._downstream&&(this._downstream._upstream=null),this._dirty=!1,this._disposed=!0)},Fh.getUpstream=function(){return this._upstream},Fh.getDownstream=function(){return this._downstream},Fh.setOutputEnd=function(t){this._outputDueEnd=this._settedOutputEnd=t};var $h=ur(),Kh=wl.extend({type:"series.__base__",seriesIndex:0,coordinateSystem:null,defaultOption:null,legendVisualProvider:null,visualColorAccessPath:"itemStyle.color",visualBorderColorAccessPath:"itemStyle.borderColor",layoutMode:null,init:function(t,e,n,i){this.seriesIndex=this.componentIndex,this.dataTask=Rh({count:Jh,reset:tu}),this.dataTask.context={model:this},this.mergeDefaultAndTheme(t,n),zl(this);var r=this.getInitialData(t,n);nu(r,this),this.dataTask.context.data=r,$h(this).dataBeforeProcessed=r,Qh(this)},mergeDefaultAndTheme:function(t,e){var n=this.layoutMode,i=n?vl(t):{},r=this.subType;wl.hasClass(r)&&(r+="Series"),f(t,e.getTheme().get(this.subType)),f(t,this.getDefaultOption()),ir(t,"label",["show"]),this.fillDataTextStyle(t.data),n&&gl(t,i,n)},mergeOption:function(t,e){t=f(this.option,t,!0),this.fillDataTextStyle(t.data);var n=this.layoutMode;n&&gl(this.option,t,n),zl(this);var i=this.getInitialData(t,e);nu(i,this),this.dataTask.dirty(),this.dataTask.context.data=i,$h(this).dataBeforeProcessed=i,Qh(this)},fillDataTextStyle:function(t){if(t&&!N(t))for(var e=["show"],n=0;n<t.length;n++)t[n]&&t[n].label&&ir(t[n],"label",e)},getInitialData:function(){},appendData:function(t){this.getRawData().appendData(t.data)},getData:function(t){var e=ru(this);if(e){var n=e.context.data;return null==t?n:n.getLinkedData(t)}return $h(this).data},setData:function(t){var e=ru(this);if(e){var n=e.context;n.data!==t&&e.modifyOutputEnd&&e.setOutputEnd(t.count()),n.outputData=t,e!==this.dataTask&&(n.data=t)}$h(this).data=t},getSource:function(){return function(t){return Rl(t).source}(this)},getRawData:function(){return $h(this).dataBeforeProcessed},getBaseAxis:function(){var t=this.coordinateSystem;return t&&t.getBaseAxis&&t.getBaseAxis()},formatTooltip:function(r,u,t,c){var d=this,e="html"===(c=c||"html")?"<br/>":"\n",f="richText"===c,p={},g=0;function n(t){return{renderMode:c,content:il(Js(t)),style:p}}var v=this.getData(),a=v.mapDimension("defaultedTooltip",!0),i=a.length,o=this.getRawValue(r),s=L(o),m=v.getItemVisual(r,"color");O(m)&&m.colorStops&&(m=(m.colorStops[0]||{}).color),m=m||"transparent";var l=(1<i||s&&!i?function(t){var l=M(t,function(t,e,n){var i=v.getDimensionInfo(n);return t|(i&&!1!==i.tooltip&&null!=i.displayName)},0),h=[];function e(t,e){var n=v.getDimensionInfo(e);if(n&&!1!==n.otherDims.tooltip){var i=n.type,r="sub"+d.seriesIndex+"at"+g,a=ol({color:m,type:"subItem",renderMode:c,markerId:r}),o="string"==typeof a?a:a.content,s=(l?o+il(n.displayName||"-")+": ":"")+il("ordinal"===i?t+"":"time"===i?u?"":ll("yyyy/MM/dd hh:mm:ss",t):Js(t));s&&h.push(s),f&&(p[r]=m,++g)}}a.length?D(a,function(t){e(Oh(v,r,t),t)}):D(t,e);var n=l?f?"\n":"<br/>":"",i=n+h.join(n||", ");return{renderMode:c,content:i,style:p}}(o):n(i?Oh(v,r,a[0]):s?o[0]:o)).content,h=d.seriesIndex+"at"+g,y=ol({color:m,type:"item",renderMode:c,markerId:h});p[h]=m,++g;var _=v.getName(r),x=this.name;sr(this)||(x=""),x=x?il(x)+(u?": ":e):"";var w="string"==typeof y?y:y.content;return{html:u?w+x+l:x+w+(_?il(_)+": "+l:l),markers:p}},isAnimationEnabled:function(){if(m.node)return!1;var t=this.getShallow("animation");return t&&this.getData().count()>this.getShallow("animationThreshold")&&(t=!1),t},restoreData:function(){this.dataTask.dirty()},getColorFromPalette:function(t,e,n){var i=this.ecModel,r=Tl.getColorFromPalette.call(this,t,e,n);return r=r||i.getColorFromPalette(t,e,n)},coordDimToDataDim:function(t){return this.getRawData().mapDimension(t,!0)},getProgressive:function(){return this.get("progressive")},getProgressiveThreshold:function(){return this.get("progressiveThreshold")},getAxisTooltipData:null,getTooltipPosition:null,pipeTask:null,preventIncremental:null,pipelineContext:null});function Qh(t){var e=t.name;sr(t)||(t.name=function(t){var n=t.getRawData(),e=n.mapDimension("seriesName",!0),i=[];return D(e,function(t){var e=n.getDimensionInfo(t);e.displayName&&i.push(e.displayName)}),i.join(" ")}(t)||e)}function Jh(t){return t.model.getRawData().count()}function tu(t){var e=t.model;return e.setData(e.getRawData().cloneShallow()),eu}function eu(t,e){e.outputData&&t.end>e.outputData.count()&&e.model.getRawData().cloneShallow(e.outputData)}function nu(e,n){D(e.CHANGABLE_METHODS,function(t){e.wrapMethod(t,I(iu,n))})}function iu(t){var e=ru(t);e&&e.setOutputEnd(this.count())}function ru(t){var e=(t.ecModel||{}).scheduler,n=e&&e.getPipeline(t.uid);if(n){var i=n.currentTask;if(i){var r=i.agentStubMap;r&&(i=r.get(t.uid))}return i}}_(Kh,Bh),_(Kh,Tl);var au=function(){this.group=new Ke,this.uid=Ws("viewComponent")};au.prototype={constructor:au,init:function(t,e){},render:function(t,e,n,i){},dispose:function(){},filterForExposedEvent:null};var ou=au.prototype;ou.updateView=ou.updateLayout=ou.updateVisual=function(t,e,n,i){},yr(au),Sr(au,{registerWhenExtend:!0});function su(){var s=ur();return function(t){var e=s(t),n=t.pipelineContext,i=e.large,r=e.progressiveRender,a=e.large=n&&n.large,o=e.progressiveRender=n&&n.progressiveRender;return!!(i^a||r^o)&&"reset"}}var lu=ur(),hu=su();function uu(){this.group=new Ke,this.uid=Ws("viewChart"),this.renderTask=Rh({plan:pu,reset:gu}),this.renderTask.context={view:this}}var cu=uu.prototype={type:"chart",init:function(t,e){},render:function(t,e,n,i){},highlight:function(t,e,n,i){fu(t.getData(),i,"emphasis")},downplay:function(t,e,n,i){fu(t.getData(),i,"normal")},remove:function(t,e){this.group.removeAll()},dispose:function(){},incrementalPrepareRender:null,incrementalRender:null,updateTransform:null,filterForExposedEvent:null};function du(t,e,n){if(t&&(t.trigger(e,n),t.isGroup&&!fs(t)))for(var i=0,r=t.childCount();i<r;i++)du(t.childAt(i),e,n)}function fu(e,t,n){var i=hr(e,t),r=t&&null!=t.highlightKey?ps(t.highlightKey):null;null!=i?D(nr(i),function(t){du(e.getItemGraphicEl(t),n,r)}):e.eachItemGraphicEl(function(t){du(t,n,r)})}function pu(t){return hu(t.model)}function gu(t){var e=t.model,n=t.ecModel,i=t.api,r=t.payload,a=e.pipelineContext.progressiveRender,o=t.view,s=r&&lu(r).updateMethod,l=a?"incrementalPrepareRender":s&&o[s]?s:"render";return"render"!==l&&o[l](e,n,i,r),vu[l]}cu.updateView=cu.updateLayout=cu.updateVisual=function(t,e,n,i){this.render(t,e,n,i)},yr(uu),Sr(uu,{registerWhenExtend:!0}),uu.markUpdateMethod=function(t,e){lu(t).updateMethod=e};var vu={incrementalPrepareRender:{progress:function(t,e){e.view.incrementalRender(t,e.model,e.ecModel,e.api,e.payload)}},render:{forceFirstProgress:!0,progress:function(t,e){e.view.render(e.model,e.ecModel,e.api,e.payload)}}};function mu(t,n,i){var r,a,o,s,l,h=0,u=0,c=null;function d(){u=(new Date).getTime(),c=null,t.apply(o,s||[])}n=n||0;function e(){r=(new Date).getTime(),o=this,s=arguments;var t=l||n,e=l||i;l=null,a=r-(e?h:u)-t,clearTimeout(c),e?c=setTimeout(d,t):0<=a?d():c=setTimeout(d,-a),h=r}return e.clear=function(){c&&(clearTimeout(c),c=null)},e.debounceNextCall=function(t){l=t},e}var yu={createOnAllSeries:!0,performRawSeries:!0,reset:function(e,t){var n=e.getData(),a=(e.visualColorAccessPath||"itemStyle.color").split("."),i=e.get(a),r=!T(i)||i instanceof To?null:i;i&&!r||(i=e.getColorFromPalette(e.name,null,t.getSeriesCount())),n.setVisual("color",i);var o=(e.visualBorderColorAccessPath||"itemStyle.borderColor").split("."),s=e.get(o);if(n.setVisual("borderColor",s),!t.isSeriesFiltered(e)){r&&n.each(function(t){n.setItemVisual(t,"color",r(e.getDataParams(t)))});return{dataEach:n.hasItemOption?function(t,e){var n=t.getItemModel(e),i=n.get(a,!0),r=n.get(o,!0);null!=i&&t.setItemVisual(e,"color",i),null!=r&&t.setItemVisual(e,"borderColor",r)}:null}}}},_u={legend:{selector:{all:"全选",inverse:"反选"}},toolbox:{brush:{title:{rect:"矩形选择",polygon:"圈选",lineX:"横向选择",lineY:"纵向选择",keep:"保持选择",clear:"清除选择"}},dataView:{title:"数据视图",lang:["数据视图","关闭","刷新"]},dataZoom:{title:{zoom:"区域缩放",back:"区域缩放还原"}},magicType:{title:{line:"切换为折线图",bar:"切换为柱状图",stack:"切换为堆叠",tiled:"切换为平铺"}},restore:{title:"还原"},saveAsImage:{title:"保存为图片",lang:["右键另存为图片"]}},series:{typeNames:{pie:"饼图",bar:"柱状图",line:"折线图",scatter:"散点图",effectScatter:"涟漪散点图",radar:"雷达图",tree:"树图",treemap:"矩形树图",boxplot:"箱型图",candlestick:"K线图",k:"K线图",heatmap:"热力图",map:"地图",parallel:"平行坐标图",lines:"线图",graph:"关系图",sankey:"桑基图",funnel:"漏斗图",gauge:"仪表盘图",pictorialBar:"象形柱图",themeRiver:"主题河流图",sunburst:"旭日图"}},aria:{general:{withTitle:"这是一个关于“{title}”的图表。",withoutTitle:"这是一个图表，"},series:{single:{prefix:"",withName:"图表类型是{seriesType}，表示{seriesName}。",withoutName:"图表类型是{seriesType}。"},multiple:{prefix:"它由{seriesCount}个图表系列组成。",withName:"第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",withoutName:"第{seriesId}个系列是一个{seriesType}，",separator:{middle:"；",end:"。"}}},data:{allData:"其数据是——",partialData:"其中，前{displayCnt}项是——",withName:"{name}的数据是{value}",withoutName:"{value}",separator:{middle:"，",end:""}}}},xu=function(t,e){var a=e.getModel("aria");if(a.get("show"))if(a.get("description"))t.setAttribute("aria-label",a.get("description"));else{var u=0;e.eachSeries(function(t,e){++u},this);var n,c=a.get("data.maxCount")||10,i=a.get("series.maxCount")||10,d=Math.min(u,i);if(!(u<1)){var r=function(){var t=e.getModel("title").option;t&&t.length&&(t=t[0]);return t&&t.text}();n=r?p(g("general.withTitle"),{title:r}):g("general.withoutTitle");var f=[];n+=p(g(1<u?"series.multiple.prefix":"series.single.prefix"),{seriesCount:u}),e.eachSeries(function(t,e){if(e<d){var n,i=t.get("name"),r="series."+(1<u?"multiple":"single")+".";n=p(n=g(i?r+"withName":r+"withoutName"),{seriesId:t.seriesIndex,seriesName:t.get("name"),seriesType:function(t){return _u.series.typeNames[t]||"自定义图"}(t.subType)});var a=t.getData();(window.data=a).count()>c?n+=p(g("data.partialData"),{displayCnt:c}):n+=g("data.allData");for(var o=[],s=0;s<a.count();s++)if(s<c){var l=a.getName(s),h=Oh(a,s);o.push(p(g(l?"data.withName":"data.withoutName"),{name:l,value:h}))}n+=o.join(g("data.separator.middle"))+g("data.separator.end"),f.push(n)}}),n+=f.join(g("series.multiple.separator.middle"))+g("series.multiple.separator.end"),t.setAttribute("aria-label",n)}}function p(t,e){if("string"!=typeof t)return t;var n=t;return D(e,function(t,e){n=n.replace(new RegExp("\\{\\s*"+e+"\\s*\\}","g"),t)}),n}function g(t){var e=a.get(t);if(null!=e)return e;for(var n=t.split("."),i=_u.aria,r=0;r<n.length;++r)i=i[n[r]];return i}},wu=Math.PI;function bu(t,e,n,i){this.ecInstance=t,this.api=e,this.unfinished;n=this._dataProcessorHandlers=n.slice(),i=this._visualHandlers=i.slice();this._allHandlers=n.concat(i),this._stageTaskMap=Z()}var Su=bu.prototype;function Mu(l,t,h,u,c){var d;function f(t,e){return t.setDirty&&(!t.dirtyMap||t.dirtyMap.get(e.__pipeline.id))}c=c||{},D(t,function(i,t){if(!c.visualType||c.visualType===i.visualType){var e=l._stageTaskMap.get(i.uid),n=e.seriesTaskMap,r=e.overallTask;if(r){var a,o=r.agentStubMap;o.each(function(t){f(c,t)&&(t.dirty(),a=!0)}),a&&r.dirty(),Iu(r,u);var s=l.getPerformArgs(r,c.block);o.each(function(t){t.perform(s)}),d|=r.perform(s)}else n&&n.each(function(t,e){f(c,t)&&t.dirty();var n=l.getPerformArgs(t,c.block);n.skip=!i.performRawSeries&&h.isSeriesFiltered(t.context.model),Iu(t,u),d|=t.perform(n)})}}),l.unfinished|=d}Su.restoreData=function(t,e){t.restoreData(e),this._stageTaskMap.each(function(t){var e=t.overallTask;e&&e.dirty()})},Su.getPerformArgs=function(t,e){if(t.__pipeline){var n=this._pipelineMap.get(t.__pipeline.id),i=n.context,r=!e&&n.progressiveEnabled&&(!i||i.progressiveRender)&&t.__idxInPipeline>n.blockIndex?n.step:null,a=i&&i.modDataCount;return{step:r,modBy:null!=a?Math.ceil(a/r):null,modDataCount:a}}},Su.getPipeline=function(t){return this._pipelineMap.get(t)},Su.updateStreamModes=function(t,e){var n=this._pipelineMap.get(t.uid),i=t.getData().count(),r=n.progressiveEnabled&&e.incrementalPrepareRender&&i>=n.threshold,a=t.get("large")&&i>=t.get("largeThreshold"),o="mod"===t.get("progressiveChunkMode")?i:null;t.pipelineContext=n.context={progressiveRender:r,modDataCount:o,large:a}},Su.restorePipelines=function(t){var i=this,r=i._pipelineMap=Z();t.eachSeries(function(t){var e=t.getProgressive(),n=t.uid;r.set(n,{id:n,head:null,tail:null,threshold:t.getProgressiveThreshold(),progressiveEnabled:e&&!(t.preventIncremental&&t.preventIncremental()),blockIndex:-1,step:Math.round(e||700),count:0}),Nu(i,t,t.dataTask)})},Su.prepareStageTasks=function(){var n=this._stageTaskMap,i=this.ecInstance.getModel(),r=this.api;D(this._allHandlers,function(t){var e=n.get(t.uid)||n.set(t.uid,[]);t.reset&&function(i,r,t,a,o){var s=t.seriesTaskMap||(t.seriesTaskMap=Z()),e=r.seriesType,n=r.getTargetSeries;r.createOnAllSeries?a.eachRawSeries(l):e?a.eachRawSeriesByType(e,l):n&&n(a,o).each(l);function l(t){var e=t.uid,n=s.get(e)||s.set(e,Rh({plan:Au,reset:Lu,count:Eu}));n.context={model:t,ecModel:a,api:o,useClearVisual:r.isVisual&&!r.isLayout,plan:r.plan,reset:r.reset,scheduler:i},Nu(i,t,n)}var h=i._pipelineMap;s.each(function(t,e){h.get(e)||(t.dispose(),s.removeKey(e))})}(this,t,e,i,r),t.overallReset&&function(i,t,e,n,r){var a=e.overallTask=e.overallTask||Rh({reset:Tu});a.context={ecModel:n,api:r,overallReset:t.overallReset,scheduler:i};var o=a.agentStubMap=a.agentStubMap||Z(),s=t.seriesType,l=t.getTargetSeries,h=!0,u=t.modifyOutputEnd;s?n.eachRawSeriesByType(s,c):l?l(n,r).each(c):(h=!1,D(n.getSeries(),c));function c(t){var e=t.uid,n=o.get(e);n||(n=o.set(e,Rh({reset:Cu,onDirty:Du})),a.dirty()),n.context={model:t,overallProgress:h,modifyOutputEnd:u},n.agent=a,n.__block=h,Nu(i,t,n)}var d=i._pipelineMap;o.each(function(t,e){d.get(e)||(t.dispose(),a.dirty(),o.removeKey(e))})}(this,t,e,i,r)},this)},Su.prepareView=function(t,e,n,i){var r=t.renderTask,a=r.context;a.model=e,a.ecModel=n,a.api=i,r.__block=!t.incrementalPrepareRender,Nu(this,e,r)},Su.performDataProcessorTasks=function(t,e){Mu(this,this._dataProcessorHandlers,t,e,{block:!0})},Su.performVisualTasks=function(t,e,n){Mu(this,this._visualHandlers,t,e,n)},Su.performSeriesTasks=function(t){var e;t.eachSeries(function(t){e|=t.dataTask.perform()}),this.unfinished|=e},Su.plan=function(){this._pipelineMap.each(function(t){var e=t.tail;do{if(e.__block){t.blockIndex=e.__idxInPipeline;break}e=e.getUpstream()}while(e)})};var Iu=Su.updatePayload=function(t,e){"remain"!==e&&(t.context.payload=e)};function Tu(t){t.overallReset(t.ecModel,t.api,t.payload)}function Cu(t,e){return t.overallProgress&&ku}function ku(){this.agent.dirty(),this.getDownstream().dirty()}function Du(){this.agent&&this.agent.dirty()}function Au(t){return t.plan&&t.plan(t.model,t.ecModel,t.api,t.payload)}function Lu(t){t.useClearVisual&&t.data.clearAllVisual();var e=t.resetDefines=nr(t.reset(t.model,t.ecModel,t.api,t.payload));return 1<e.length?A(e,function(t,e){return Ou(e)}):Pu}var Pu=Ou(0);function Ou(a){return function(t,e){var n=e.data,i=e.resetDefines[a];if(i&&i.dataEach)for(var r=t.start;r<t.end;r++)i.dataEach(n,r);else i&&i.progress&&i.progress(t,n)}}function Eu(t){return t.data.count()}function Nu(t,e,n){var i=e.uid,r=t._pipelineMap.get(i);r.head||(r.head=n),r.tail&&r.tail.pipe(n),(r.tail=n).__idxInPipeline=r.count++,n.__pipeline=r}bu.wrapStageHandler=function(t,e){return T(t)&&(t={overallReset:t,seriesType:function(t){Bu=null;try{t(Ru,zu)}catch(t){}return Bu}(t)}),t.uid=Ws("stageHandler"),e&&(t.visualType=e),t};var Bu,Ru={},zu={};function Fu(t,e){for(var n in e.prototype)t[n]=$}Fu(Ru,Yl),Fu(zu,$l),Ru.eachSeriesByType=Ru.eachRawSeriesByType=function(t){Bu=t},Ru.eachComponent=function(t){"series"===t.mainType&&t.subType&&(Bu=t.subType)};function Vu(){return{axisLine:{lineStyle:{color:Gu}},axisTick:{lineStyle:{color:Gu}},axisLabel:{textStyle:{color:Gu}},splitLine:{lineStyle:{type:"dashed",color:"#aaa"}},splitArea:{areaStyle:{color:Gu}}}}var Wu=["#37A2DA","#32C5E9","#67E0E3","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#E062AE","#E690D1","#e7bcf3","#9d96f5","#8378EA","#96BFFF"],Hu={color:Wu,colorLayer:[["#37A2DA","#ffd85c","#fd7b5f"],["#37A2DA","#67E0E3","#FFDB5C","#ff9f7f","#E062AE","#9d96f5"],["#37A2DA","#32C5E9","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#e7bcf3","#8378EA","#96BFFF"],Wu]},Gu="#eee",Xu=["#dd6b66","#759aa0","#e69d87","#8dc1a9","#ea7e53","#eedd78","#73a373","#73b9bc","#7289ab","#91ca8c","#f49f42"],Uu={color:Xu,backgroundColor:"#333",tooltip:{axisPointer:{lineStyle:{color:Gu},crossStyle:{color:Gu},label:{color:"#000"}}},legend:{textStyle:{color:Gu}},textStyle:{color:Gu},title:{textStyle:{color:Gu}},toolbox:{iconStyle:{normal:{borderColor:Gu}}},dataZoom:{textStyle:{color:Gu}},visualMap:{textStyle:{color:Gu}},timeline:{lineStyle:{color:Gu},itemStyle:{normal:{color:Xu[1]}},label:{normal:{textStyle:{color:Gu}}},controlStyle:{normal:{color:Gu,borderColor:Gu}}},timeAxis:Vu(),logAxis:Vu(),valueAxis:Vu(),categoryAxis:Vu(),line:{symbol:"circle"},graph:{color:Xu},gauge:{title:{textStyle:{color:Gu}}},candlestick:{itemStyle:{normal:{color:"#FD1050",color0:"#0CF49B",borderColor:"#FD1050",borderColor0:"#0CF49B"}}}};Uu.categoryAxis.splitLine.show=!1,wl.extend({type:"dataset",defaultOption:{seriesLayoutBy:Ol,sourceHeader:null,dimensions:null,source:null},optionUpdated:function(){!function(t){var e=t.option.source,n=Ll;if(N(e))n=Pl;else if(L(e)){0===e.length&&(n=kl);for(var i=0,r=e.length;i<r;i++){var a=e[i];if(null!=a){if(L(a)){n=kl;break}if(O(a)){n=Dl;break}}}}else if(O(e)){for(var o in e)if(e.hasOwnProperty(o)&&P(e[o])){n=Al;break}}else if(null!=e)throw new Error("Invalid data");Rl(t).sourceFormat=n}(this)}}),au.extend({type:"dataset"});var Yu=Wa.extend({type:"ellipse",shape:{cx:0,cy:0,rx:0,ry:0},buildPath:function(t,e){var n=e.cx,i=e.cy,r=e.rx,a=e.ry,o=.5522848*r,s=.5522848*a;t.moveTo(n-r,i),t.bezierCurveTo(n-r,i-s,n-o,i-a,n,i-a),t.bezierCurveTo(n+o,i-a,n+r,i-s,n+r,i),t.bezierCurveTo(n+r,i+s,n+o,i+a,n,i+a),t.bezierCurveTo(n-o,i+a,n-r,i+s,n-r,i),t.closePath()}}),qu=/[\s,]+/;function ju(t){C(t)&&(t=(new DOMParser).parseFromString(t,"text/xml"));for(9===t.nodeType&&(t=t.firstChild);"svg"!==t.nodeName.toLowerCase()||1!==t.nodeType;)t=t.nextSibling;return t}var Zu={g:function(t,e){var n=new Ke;return Ku(e,n),tc(t,n,this._defs),n},rect:function(t,e){var n=new wo;return Ku(e,n),tc(t,n,this._defs),n.setShape({x:parseFloat(t.getAttribute("x")||0),y:parseFloat(t.getAttribute("y")||0),width:parseFloat(t.getAttribute("width")||0),height:parseFloat(t.getAttribute("height")||0)}),n},circle:function(t,e){var n=new so;return Ku(e,n),tc(t,n,this._defs),n.setShape({cx:parseFloat(t.getAttribute("cx")||0),cy:parseFloat(t.getAttribute("cy")||0),r:parseFloat(t.getAttribute("r")||0)}),n},line:function(t,e){var n=new So;return Ku(e,n),tc(t,n,this._defs),n.setShape({x1:parseFloat(t.getAttribute("x1")||0),y1:parseFloat(t.getAttribute("y1")||0),x2:parseFloat(t.getAttribute("x2")||0),y2:parseFloat(t.getAttribute("y2")||0)}),n},ellipse:function(t,e){var n=new Yu;return Ku(e,n),tc(t,n,this._defs),n.setShape({cx:parseFloat(t.getAttribute("cx")||0),cy:parseFloat(t.getAttribute("cy")||0),rx:parseFloat(t.getAttribute("rx")||0),ry:parseFloat(t.getAttribute("ry")||0)}),n},polygon:function(t,e){var n=t.getAttribute("points");n=n&&Qu(n);var i=new po({shape:{points:n||[]}});return Ku(e,i),tc(t,i,this._defs),i},polyline:function(t,e){var n=new Wa;Ku(e,n),tc(t,n,this._defs);var i=t.getAttribute("points");return i=i&&Qu(i),new go({shape:{points:i||[]}})},image:function(t,e){var n=new xi;return Ku(e,n),tc(t,n,this._defs),n.setStyle({image:t.getAttribute("xlink:href"),x:t.getAttribute("x"),y:t.getAttribute("y"),width:t.getAttribute("width"),height:t.getAttribute("height")}),n},text:function(t,e){var n=t.getAttribute("x")||0,i=t.getAttribute("y")||0,r=t.getAttribute("dx")||0,a=t.getAttribute("dy")||0;this._textX=parseFloat(n)+parseFloat(r),this._textY=parseFloat(i)+parseFloat(a);var o=new Ke;return Ku(e,o),tc(t,o,this._defs),o},tspan:function(t,e){var n=t.getAttribute("x"),i=t.getAttribute("y");null!=n&&(this._textX=parseFloat(n)),null!=i&&(this._textY=parseFloat(i));var r=t.getAttribute("dx")||0,a=t.getAttribute("dy")||0,o=new Ke;return Ku(e,o),tc(t,o,this._defs),this._textX+=r,this._textY+=a,o},path:function(t,e){var n=ro(t.getAttribute("d")||"");return Ku(e,n),tc(t,n,this._defs),n}},$u={lineargradient:function(t){var e=parseInt(t.getAttribute("x1")||0,10),n=parseInt(t.getAttribute("y1")||0,10),i=parseInt(t.getAttribute("x2")||10,10),r=parseInt(t.getAttribute("y2")||0,10),a=new Ao(e,n,i,r);return function(t,e){var n=t.firstChild;for(;n;){if(1===n.nodeType){var i=n.getAttribute("offset");i=0<i.indexOf("%")?parseInt(i,10)/100:i?parseFloat(i):0;var r=n.getAttribute("stop-color")||"#000000";e.addColorStop(i,r)}n=n.nextSibling}}(t,a),a},radialgradient:function(t){}};function Ku(t,e){t&&t.__inheritedStyle&&(e.__inheritedStyle||(e.__inheritedStyle={}),k(e.__inheritedStyle,t.__inheritedStyle))}function Qu(t){for(var e=X(t).split(qu),n=[],i=0;i<e.length;i+=2){var r=parseFloat(e[i]),a=parseFloat(e[i+1]);n.push([r,a])}return n}var Ju={fill:"fill",stroke:"stroke","stroke-width":"lineWidth",opacity:"opacity","fill-opacity":"fillOpacity","stroke-opacity":"strokeOpacity","stroke-dasharray":"lineDash","stroke-dashoffset":"lineDashOffset","stroke-linecap":"lineCap","stroke-linejoin":"lineJoin","stroke-miterlimit":"miterLimit","font-family":"fontFamily","font-size":"fontSize","font-style":"fontStyle","font-weight":"fontWeight","text-align":"textAlign","alignment-baseline":"textBaseline"};function tc(t,e,n,i){var r=e.__inheritedStyle||{},a="text"===e.type;if(1===t.nodeType&&(function(t,e){var n=t.getAttribute("transform");if(n){n=n.replace(/,/g," ");var i=null,r=[];n.replace(ic,function(t,e,n){r.push(e,n)});for(var a=r.length-1;0<a;a-=2){var o=r[a],s=r[a-1];switch(i=i||Vt(),s){case"translate":o=X(o).split(qu),Gt(i,i,[parseFloat(o[0]),parseFloat(o[1]||0)]);break;case"scale":o=X(o).split(qu),Ut(i,i,[parseFloat(o[0]),parseFloat(o[1]||o[0])]);break;case"rotate":o=X(o).split(qu),Xt(i,i,parseFloat(o[0]));break;case"skew":o=X(o).split(qu),console.warn("Skew transform is not supported yet");break;case"matrix":o=X(o).split(qu);i[0]=parseFloat(o[0]),i[1]=parseFloat(o[1]),i[2]=parseFloat(o[2]),i[3]=parseFloat(o[3]),i[4]=parseFloat(o[4]),i[5]=parseFloat(o[5])}}e.setLocalTransform(i)}}(t,e),S(r,function(t){var e=t.getAttribute("style"),n={};if(!e)return n;var i,r={};rc.lastIndex=0;for(;null!=(i=rc.exec(e));)r[i[1]]=i[2];for(var a in Ju)Ju.hasOwnProperty(a)&&null!=r[a]&&(n[Ju[a]]=r[a]);return n}(t)),!i))for(var o in Ju)if(Ju.hasOwnProperty(o)){var s=t.getAttribute(o);null!=s&&(r[Ju[o]]=s)}var l=a?"textFill":"fill",h=a?"textStroke":"stroke";e.style=e.style||new pn;var u=e.style;null!=r.fill&&u.set(l,nc(r.fill,n)),null!=r.stroke&&u.set(h,nc(r.stroke,n)),D(["lineWidth","opacity","fillOpacity","strokeOpacity","miterLimit","fontSize"],function(t){var e="lineWidth"===t&&a?"textStrokeWidth":t;null!=r[t]&&u.set(e,parseFloat(r[t]))}),r.textBaseline&&"auto"!==r.textBaseline||(r.textBaseline="alphabetic"),"alphabetic"===r.textBaseline&&(r.textBaseline="bottom"),"start"===r.textAlign&&(r.textAlign="left"),"end"===r.textAlign&&(r.textAlign="right"),D(["lineDashOffset","lineCap","lineJoin","fontWeight","fontFamily","fontStyle","textAlign","textBaseline"],function(t){null!=r[t]&&u.set(t,r[t])}),r.lineDash&&(e.style.lineDash=X(r.lineDash).split(qu)),u[h]&&"none"!==u[h]&&(e[h]=!0),e.__inheritedStyle=r}var ec=/url\(\s*#(.*?)\)/;function nc(t,e){var n=e&&t&&t.match(ec);return n?e[X(n[1])]:t}var ic=/(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g;var rc=/([^\s:;]+)\s*:\s*([^:;]+)/g;var ac=Z(),oc=function(t,e,n){var i;return D(i=L(e)?e:e.svg?[{type:"svg",source:e.svg,specialAreas:e.specialAreas}]:(e.geoJson&&!e.features&&(n=e.specialAreas,e=e.geoJson),[{type:"geoJSON",source:e,specialAreas:n}]),function(t){var e=t.type;"geoJson"===e&&(e=t.type="geoJSON"),(0,lc[e])(t)}),ac.set(t,i)},sc=function(t){return ac.get(t)},lc={geoJSON:function(t){var e=t.source;t.geoJSON=C(e)?"undefined"!=typeof JSON&&JSON.parse?JSON.parse(e):new Function("return ("+e+");")():e},svg:function(t){t.svgXML=ju(t.source)}},hc=G,uc=D,cc=T,dc=O,fc=wl.parseClassType,pc={PROCESSOR:{FILTER:1e3,SERIES_FILTER:800,STATISTIC:5e3},VISUAL:{LAYOUT:1e3,PROGRESSIVE_LAYOUT:1100,GLOBAL:2e3,CHART:3e3,POST_CHART_LAYOUT:3500,COMPONENT:4e3,BRUSH:5e3}},gc="__flagInMainProcess",vc="__optionUpdated",mc=/^[a-zA-Z0-9_]+$/;function yc(i,r){return function(t,e,n){!r&&this._disposed||(t=t&&t.toLowerCase(),ft.prototype[i].call(this,t,e,n))}}function _c(){ft.call(this)}function xc(t,e,n){n=n||{},"string"==typeof e&&(e=Xc[e]),this.id,this.group,this._dom=t;var i=this._zr=$i(t,{renderer:n.renderer||"canvas",devicePixelRatio:n.devicePixelRatio,width:n.width,height:n.height});this._throttledZrFlush=mu(w(i.flush,i),17),(e=b(e))&&xh(e,!0),this._theme=e,this._chartsViews=[],this._chartsMap={},this._componentsViews=[],this._componentsMap={},this._coordSysMgr=new Ql;var r=this._api=function(n){var t=n._coordSysMgr;return S(new $l(n),{getCoordinateSystems:w(t.getCoordinateSystems,t),getComponentByElement:function(t){for(;t;){var e=t.__ecComponentInfo;if(null!=e)return n._model.getComponent(e.mainType,e.index);t=t.parent}}})}(this);function a(t,e){return t.__prio-e.__prio}on(Gc,a),on(Vc,a),this._scheduler=new bu(this,r,Vc,Gc),ft.call(this,this._ecEventProcessor=new Rc),this._messageCenter=new _c,this._initEvents(),this.resize=w(this.resize,this),this._pendingActions=[],i.animation.on("frame",this._onframe,this),function(t,e){t.on("rendered",function(){e.trigger("rendered"),!t.animation.isFinished()||e[vc]||e._scheduler.unfinished||e._pendingActions.length||e.trigger("finished")})}(i,this),Y(this)}_c.prototype.on=yc("on",!0),_c.prototype.off=yc("off",!0),_c.prototype.one=yc("one",!0),_(_c,ft);var wc=xc.prototype;function bc(t,e,n){if(!this._disposed){var i,r=this._model,a=this._coordSysMgr.getCoordinateSystems();e=dr(r,e);for(var o=0;o<a.length;o++){var s=a[o];if(s[t]&&null!=(i=s[t](r,e,n)))return i}}}wc._onframe=function(){if(!this._disposed){var t=this._scheduler;if(this[vc]){var e=this[vc].silent;this[gc]=!0,Mc(this),Sc.update.call(this),this[gc]=!1,this[vc]=!1,kc.call(this,e),Dc.call(this,e)}else if(t.unfinished){var n=1,i=this._model,r=this._api;t.unfinished=!1;do{var a=+new Date;t.performSeriesTasks(i),t.performDataProcessorTasks(i),Tc(this,i),t.performVisualTasks(i),Oc(this,this._model,r,"remain"),n-=+new Date-a}while(0<n&&t.unfinished);t.unfinished||this._zr.flush()}}},wc.getDom=function(){return this._dom},wc.getZr=function(){return this._zr},wc.setOption=function(t,e,n){if(!this._disposed){var i;if(dc(e)&&(n=e.lazyUpdate,i=e.silent,e=e.notMerge),this[gc]=!0,!this._model||e){var r=new rh(this._api),a=this._theme,o=this._model=new Yl;o.scheduler=this._scheduler,o.init(null,null,a,r)}this._model.setOption(t,Wc),n?(this[vc]={silent:i},this[gc]=!1):(Mc(this),Sc.update.call(this),this._zr.flush(),this[vc]=!1,this[gc]=!1,kc.call(this,i),Dc.call(this,i))}},wc.setTheme=function(){console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0")},wc.getModel=function(){return this._model},wc.getOption=function(){return this._model&&this._model.getOption()},wc.getWidth=function(){return this._zr.getWidth()},wc.getHeight=function(){return this._zr.getHeight()},wc.getDevicePixelRatio=function(){return this._zr.painter.dpr||window.devicePixelRatio||1},wc.getRenderedCanvas=function(t){if(m.canvasSupported)return(t=t||{}).pixelRatio=t.pixelRatio||1,t.backgroundColor=t.backgroundColor||this._model.get("backgroundColor"),this._zr.painter.getRenderedCanvas(t)},wc.getSvgDataURL=function(){if(m.svgSupported){var t=this._zr;return D(t.storage.getDisplayList(),function(t){t.stopAnimation(!0)}),t.painter.toDataURL()}},wc.getDataURL=function(t){if(!this._disposed){var e=(t=t||{}).excludeComponents,n=this._model,i=[],r=this;uc(e,function(t){n.eachComponent({mainType:t},function(t){var e=r._componentsMap[t.__viewId];e.group.ignore||(i.push(e),e.group.ignore=!0)})});var a="svg"===this._zr.painter.getType()?this.getSvgDataURL():this.getRenderedCanvas(t).toDataURL("image/"+(t&&t.type||"png"));return uc(i,function(t){t.group.ignore=!1}),a}},wc.getConnectedDataURL=function(r){if(!this._disposed&&m.canvasSupported){var a="svg"===r.type,o=this.group,s=Math.min,l=Math.max;if(qc[o]){var h=1/0,u=1/0,c=-1/0,d=-1/0,f=[],n=r&&r.pixelRatio||1;D(Yc,function(t,e){if(t.group===o){var n=a?t.getZr().painter.getSvgDom().innerHTML:t.getRenderedCanvas(b(r)),i=t.getDom().getBoundingClientRect();h=s(i.left,h),u=s(i.top,u),c=l(i.right,c),d=l(i.bottom,d),f.push({dom:n,left:i.left,top:i.top})}});var t=(c*=n)-(h*=n),e=(d*=n)-(u*=n),i=v(),p=$i(i,{renderer:a?"svg":"canvas"});if(p.resize({width:t,height:e}),a){var g="";return uc(f,function(t){var e=t.left-h,n=t.top-u;g+='<g transform="translate('+e+","+n+')">'+t.dom+"</g>"}),p.painter.getSvgRoot().innerHTML=g,r.connectedBackgroundColor&&p.painter.setBackgroundColor(r.connectedBackgroundColor),p.refreshImmediately(),p.painter.toDataURL()}return r.connectedBackgroundColor&&p.add(new wo({shape:{x:0,y:0,width:t,height:e},style:{fill:r.connectedBackgroundColor}})),uc(f,function(t){var e=new xi({style:{x:t.left*n-h,y:t.top*n-u,image:t.dom}});p.add(e)}),p.refreshImmediately(),i.toDataURL("image/"+(r&&r.type||"png"))}return this.getDataURL(r)}},wc.convertToPixel=I(bc,"convertToPixel"),wc.convertFromPixel=I(bc,"convertFromPixel"),wc.containPixel=function(t,r){var a;if(!this._disposed)return D(t=dr(this._model,t),function(t,i){0<=i.indexOf("Models")&&D(t,function(t){var e=t.coordinateSystem;if(e&&e.containPoint)a|=!!e.containPoint(r);else if("seriesModels"===i){var n=this._chartsMap[t.__viewId];n&&n.containPoint&&(a|=n.containPoint(r,t))}},this)},this),!!a},wc.getVisual=function(t,e){var n=(t=dr(this._model,t,{defaultMainType:"series"})).seriesModel.getData(),i=t.hasOwnProperty("dataIndexInside")?t.dataIndexInside:t.hasOwnProperty("dataIndex")?n.indexOfRawIndex(t.dataIndex):null;return null!=i?n.getItemVisual(i,e):n.getVisual(e)},wc.getViewOfComponentModel=function(t){return this._componentsMap[t.__viewId]},wc.getViewOfSeriesModel=function(t){return this._chartsMap[t.__viewId]};var Sc={prepareAndUpdate:function(t){Mc(this),Sc.update.call(this,t)},update:function(t){var e=this._model,n=this._api,i=this._zr,r=this._coordSysMgr,a=this._scheduler;if(e){a.restoreData(e,t),a.performSeriesTasks(e),r.create(e,n),a.performDataProcessorTasks(e,t),Tc(this,e),r.update(e,n),Lc(e),a.performVisualTasks(e,t),Pc(this,e,n,t);var o=e.get("backgroundColor")||"transparent";if(m.canvasSupported)i.setBackgroundColor(o);else{var s=ye(o);o=xe(s,"rgb"),0===s[3]&&(o="transparent")}Ec(e,n)}},updateTransform:function(r){var a=this._model,o=this,s=this._api;if(a){var l=[];a.eachComponent(function(t,e){var n=o.getViewOfComponentModel(e);if(n&&n.__alive)if(n.updateTransform){var i=n.updateTransform(e,a,s,r);i&&i.update&&l.push(n)}else l.push(n)});var i=Z();a.eachSeries(function(t){var e=o._chartsMap[t.__viewId];if(e.updateTransform){var n=e.updateTransform(t,a,s,r);n&&n.update&&i.set(t.uid,1)}else i.set(t.uid,1)}),Lc(a),this._scheduler.performVisualTasks(a,r,{setDirty:!0,dirtyMap:i}),Oc(o,a,s,r,i),Ec(a,this._api)}},updateView:function(t){var e=this._model;e&&(uu.markUpdateMethod(t,"updateView"),Lc(e),this._scheduler.performVisualTasks(e,t,{setDirty:!0}),Pc(this,this._model,this._api,t),Ec(e,this._api))},updateVisual:function(t){Sc.update.call(this,t)},updateLayout:function(t){Sc.update.call(this,t)}};function Mc(t){var e=t._model,n=t._scheduler;n.restorePipelines(e),n.prepareStageTasks(),Ac(t,"component",e,n),Ac(t,"chart",e,n),n.plan()}function Ic(e,n,i,r,t){var a=e._model;if(r){var o={};o[r+"Id"]=i[r+"Id"],o[r+"Index"]=i[r+"Index"],o[r+"Name"]=i[r+"Name"];var s={mainType:r,query:o};t&&(s.subType=t);var l=i.excludeSeriesId;null!=l&&(l=Z(nr(l))),a&&a.eachComponent(s,function(t){l&&null!=l.get(t.id)||h(e["series"===r?"_chartsMap":"_componentsMap"][t.__viewId])},e)}else uc(e._componentsViews.concat(e._chartsViews),h);function h(t){t&&t.__alive&&t[n]&&t[n](t.__model,a,e._api,i)}}function Tc(t,e){var n=t._chartsMap,i=t._scheduler;e.eachSeries(function(t){i.updateStreamModes(t,n[t.__viewId])})}function Cc(e,t){var n=e.type,i=e.escapeConnect,r=zc[n],a=r.actionInfo,o=(a.update||"update").split(":"),s=o.pop();o=null!=o[0]&&fc(o[0]),this[gc]=!0;var l=[e],h=!1;e.batch&&(h=!0,l=A(e.batch,function(t){return(t=k(S({},t),e)).batch=null,t}));var u,c=[],d="highlight"===n||"downplay"===n;uc(l,function(t){(u=(u=r.action(t,this._model,this._api))||S({},t)).type=a.event||u.type,c.push(u),d?Ic(this,s,t,"series"):o&&Ic(this,s,t,o.main,o.sub)},this),"none"===s||d||o||(this[vc]?(Mc(this),Sc.update.call(this,e),this[vc]=!1):Sc[s].call(this,e)),u=h?{type:a.event||n,escapeConnect:i,batch:c}:c[0],this[gc]=!1,t||this._messageCenter.trigger(u.type,u)}function kc(t){for(var e=this._pendingActions;e.length;){var n=e.shift();Cc.call(this,n,t)}}function Dc(t){t||this.trigger("updated")}function Ac(t,e,r,a){for(var o="component"===e,s=o?t._componentsViews:t._chartsViews,l=o?t._componentsMap:t._chartsMap,h=t._zr,u=t._api,n=0;n<s.length;n++)s[n].__alive=!1;function i(t){var e="_ec_"+t.id+"_"+t.type,n=l[e];if(!n){var i=fc(t.type);(n=new(o?au.getClass(i.main,i.sub):uu.getClass(i.sub))).init(r,u),l[e]=n,s.push(n),h.add(n.group)}t.__viewId=n.__id=e,n.__alive=!0,n.__model=t,n.group.__ecComponentInfo={mainType:t.mainType,index:t.componentIndex},o||a.prepareView(n,t,r,u)}o?r.eachComponent(function(t,e){"series"!==t&&i(e)}):r.eachSeries(i);for(n=0;n<s.length;){var c=s[n];c.__alive?n++:(o||c.renderTask.dispose(),h.remove(c.group),c.dispose(r,u),s.splice(n,1),delete l[c.__id],c.__id=c.group.__ecComponentInfo=null)}}function Lc(t){t.clearColorPalette(),t.eachSeries(function(t){t.clearColorPalette()})}function Pc(t,e,n,i){!function(t,n,i,r,e){uc(e||t._componentsViews,function(t){var e=t.__model;t.render(e,n,i,r),Bc(e,t)})}(t,e,n,i),uc(t._chartsViews,function(t){t.__alive=!1}),Oc(t,e,n,i),uc(t._chartsViews,function(t){t.__alive||t.remove(e,n)})}function Oc(i,t,e,r,a){var o,s=i._scheduler;t.eachSeries(function(t){var e=i._chartsMap[t.__viewId];e.__alive=!0;var n=e.renderTask;s.updatePayload(n,r),a&&a.get(t.uid)&&n.dirty(),o|=n.perform(s.getPerformArgs(n)),e.group.silent=!!t.get("silent"),Bc(t,e),function(t,e){var n=t.get("blendMode")||null;e.group.traverse(function(t){t.isGroup||t.style.blend!==n&&t.setStyle("blend",n),t.eachPendingDisplayable&&t.eachPendingDisplayable(function(t){t.setStyle("blend",n)})})}(t,e)}),s.unfinished|=o,function(n,t){var e=n._zr.storage,i=0;e.traverse(function(t){i++}),i>t.get("hoverLayerThreshold")&&!m.node&&t.eachSeries(function(t){if(!t.preventUsingHoverLayer){var e=n._chartsMap[t.__viewId];e.__alive&&e.group.traverse(function(t){t.useHoverLayer=!0})}})}(i,t),xu(i._zr.dom,t)}function Ec(e,n){uc(Hc,function(t){t(e,n)})}wc.resize=function(t){if(!this._disposed){this._zr.resize(t);var e=this._model;if(this._loadingFX&&this._loadingFX.resize(),e){var n=e.resetOption("media"),i=t&&t.silent;this[gc]=!0,n&&Mc(this),Sc.update.call(this),this[gc]=!1,kc.call(this,i),Dc.call(this,i)}}},wc.showLoading=function(t,e){if(!this._disposed&&(dc(t)&&(e=t,t=""),t=t||"default",this.hideLoading(),Uc[t])){var n=Uc[t](this._api,e),i=this._zr;this._loadingFX=n,i.add(n)}},wc.hideLoading=function(){this._disposed||(this._loadingFX&&this._zr.remove(this._loadingFX),this._loadingFX=null)},wc.makeActionFromEvent=function(t){var e=S({},t);return e.type=Fc[t.type],e},wc.dispatchAction=function(t,e){this._disposed||(dc(e)||(e={silent:!!e}),zc[t.type]&&this._model&&(this[gc]?this._pendingActions.push(t):(Cc.call(this,t,e.silent),e.flush?this._zr.flush(!0):!1!==e.flush&&m.browser.weChat&&this._throttledZrFlush(),kc.call(this,e.silent),Dc.call(this,e.silent))))},wc.appendData=function(t){if(!this._disposed){var e=t.seriesIndex;this.getModel().getSeriesByIndex(e).appendData(t),this._scheduler.unfinished=!0}},wc.on=yc("on",!1),wc.off=yc("off",!1),wc.one=yc("one",!1);var Nc=["click","dblclick","mouseover","mouseout","mousemove","mousedown","mouseup","globalout","contextmenu"];function Bc(t,e){var n=t.get("z"),i=t.get("zlevel");e.group.traverse(function(t){"group"!==t.type&&(null!=n&&(t.z=n),null!=i&&(t.zlevel=i))})}function Rc(){this.eventInfo}wc._initEvents=function(){uc(Nc,function(h){function t(t){var e,n=this.getModel(),i=t.target;if("globalout"===h)e={};else if(i&&null!=i.dataIndex){var r=i.dataModel||n.getSeriesByIndex(i.seriesIndex);e=r&&r.getDataParams(i.dataIndex,i.dataType,i)||{}}else i&&i.eventData&&(e=S({},i.eventData));if(e){var a=e.componentType,o=e.componentIndex;"markLine"!==a&&"markPoint"!==a&&"markArea"!==a||(a="series",o=e.seriesIndex);var s=a&&null!=o&&n.getComponent(a,o),l=s&&this["series"===s.mainType?"_chartsMap":"_componentsMap"][s.__viewId];e.event=t,e.type=h,this._ecEventProcessor.eventInfo={targetEl:i,packedEvent:e,model:s,view:l},this.trigger(h,e)}}t.zrEventfulCallAtLast=!0,this._zr.on(h,t,this)},this),uc(Fc,function(t,e){this._messageCenter.on(e,function(t){this.trigger(e,t)},this)},this)},wc.isDisposed=function(){return this._disposed},wc.clear=function(){this._disposed||this.setOption({series:[]},!0)},wc.dispose=function(){if(!this._disposed){this._disposed=!0,pr(this.getDom(),$c,"");var e=this._api,n=this._model;uc(this._componentsViews,function(t){t.dispose(n,e)}),uc(this._chartsViews,function(t){t.dispose(n,e)}),this._zr.dispose(),delete Yc[this.id]}},_(xc,ft),Rc.prototype={constructor:Rc,normalizeQuery:function(t){var s={},l={},h={};if(C(t)){var e=fc(t);s.mainType=e.main||null,s.subType=e.sub||null}else{var u=["Index","Name","Id"],c={name:1,dataIndex:1,dataType:1};D(t,function(t,e){for(var n=!1,i=0;i<u.length;i++){var r=u[i],a=e.lastIndexOf(r);if(0<a&&a===e.length-r.length){var o=e.slice(0,a);"data"!==o&&(s.mainType=o,s[r.toLowerCase()]=t,n=!0)}}c.hasOwnProperty(e)&&(l[e]=t,n=!0),n||(h[e]=t)})}return{cptQuery:s,dataQuery:l,otherQuery:h}},filter:function(t,e,n){var i=this.eventInfo;if(!i)return!0;var r=i.targetEl,a=i.packedEvent,o=i.model,s=i.view;if(!o||!s)return!0;var l=e.cptQuery,h=e.dataQuery;return u(l,o,"mainType")&&u(l,o,"subType")&&u(l,o,"index","componentIndex")&&u(l,o,"name")&&u(l,o,"id")&&u(h,a,"name")&&u(h,a,"dataIndex")&&u(h,a,"dataType")&&(!s.filterForExposedEvent||s.filterForExposedEvent(t,e.otherQuery,r,a));function u(t,e,n,i){return null==t[n]||e[i||n]===t[n]}},afterTrigger:function(){this.eventInfo=null}};var zc={},Fc={},Vc=[],Wc=[],Hc=[],Gc=[],Xc={},Uc={},Yc={},qc={},jc=new Date-0,Zc=new Date-0,$c="_echarts_instance_";function Kc(t){qc[t]=!1}var Qc=Kc;function Jc(t){return Yc[function(t,e){return t.getAttribute?t.getAttribute(e):t[e]}(t,$c)]}function td(t,e){Xc[t]=e}function ed(t){Wc.push(t)}function nd(t,e){od(Vc,t,e,1e3)}function id(t,e,n){"function"==typeof e&&(n=e,e="");var i=dc(t)?t.type:[t,t={event:e}][0];t.event=(t.event||i).toLowerCase(),e=t.event,hc(mc.test(i)&&mc.test(e)),zc[i]||(zc[i]={action:n,actionInfo:t}),Fc[e]=i}function rd(t,e){od(Gc,t,e,1e3,"layout")}function ad(t,e){od(Gc,t,e,3e3,"visual")}function od(t,e,n,i,r){(cc(e)||dc(e))&&(n=e,e=i);var a=bu.wrapStageHandler(n,r);return a.__prio=e,a.__raw=n,t.push(a),a}function sd(t,e){Uc[t]=e}function ld(t){return au.extend(t)}function hd(t){return Kh.extend(t)}function ud(t){return uu.extend(t)}ad(2e3,yu),ed(xh),nd(900,function(t){var a=Z();t.eachSeries(function(t){var e=t.get("stack");if(e){var n=a.get(e)||a.set(e,[]),i=t.getData(),r={stackResultDimension:i.getCalculationInfo("stackResultDimension"),stackedOverDimension:i.getCalculationInfo("stackedOverDimension"),stackedDimension:i.getCalculationInfo("stackedDimension"),stackedByDimension:i.getCalculationInfo("stackedByDimension"),isStackedByIndex:i.getCalculationInfo("isStackedByIndex"),data:i,seriesModel:t};if(!r.stackedDimension||!r.isStackedByIndex&&!r.stackedByDimension)return;n.length&&i.setCalculationInfo("stackedOnSeries",n[n.length-1].seriesModel),n.push(r)}}),a.each(wh)}),sd("default",function(r,a){k(a=a||{},{text:"loading",textColor:"#000",fontSize:"12px",maskColor:"rgba(255, 255, 255, 0.8)",showSpinner:!0,color:"#c23531",spinnerRadius:10,lineWidth:5,zlevel:0});var t=new Ke,o=new wo({style:{fill:a.maskColor},zlevel:a.zlevel,z:1e4});t.add(o);var s=a.fontSize+" sans-serif",l=new wo({style:{fill:"none",text:a.text,font:s,textPosition:"right",textDistance:10,textFill:a.textColor},zlevel:a.zlevel,z:10001});if(t.add(l),a.showSpinner){var h=new ko({shape:{startAngle:-wu/2,endAngle:-wu/2+.1,r:a.spinnerRadius},style:{stroke:a.color,lineCap:"round",lineWidth:a.lineWidth},zlevel:a.zlevel,z:10001});h.animateShape(!0).when(1e3,{endAngle:3*wu/2}).start("circularInOut"),h.animateShape(!0).when(1e3,{startAngle:3*wu/2}).delay(300).start("circularInOut"),t.add(h)}return t.resize=function(){var t=Bn(a.text,s),e=a.showSpinner?a.spinnerRadius:0,n=(r.getWidth()-2*e-(a.showSpinner&&t?10:0)-t)/2-(a.showSpinner?0:t/2),i=r.getHeight()/2;a.showSpinner&&h.setShape({cx:n,cy:i}),l.setShape({x:n-e,y:i-e,width:2*e,height:2*e}),o.setShape({x:0,y:0,width:r.getWidth(),height:r.getHeight()})},t.resize(),t}),id({type:"highlight",event:"highlight",update:"highlight"},$),id({type:"downplay",event:"downplay",update:"downplay"},$),td("light",Hu),td("dark",Uu);function cd(t){return t}function dd(t,e,n,i,r){this._old=t,this._new=e,this._oldKeyGetter=n||cd,this._newKeyGetter=i||cd,this.context=r}function fd(t,e,n,i,r){for(var a=0;a<t.length;a++){var o="_ec_"+r[i](t[a],a),s=e[o];null==s?(n.push(o),e[o]=a):(s.length||(e[o]=s=[s]),s.push(a))}}dd.prototype={constructor:dd,add:function(t){return this._add=t,this},update:function(t){return this._update=t,this},remove:function(t){return this._remove=t,this},execute:function(){var t=this._old,e=this._new,n={},i=[],r=[];for(fd(t,{},i,"_oldKeyGetter",this),fd(e,n,r,"_newKeyGetter",this),a=0;a<t.length;a++){if(null!=(s=n[o=i[a]]))(h=s.length)?(1===h&&(n[o]=null),s=s.shift()):n[o]=null,this._update&&this._update(s,a);else this._remove&&this._remove(a)}for(var a=0;a<r.length;a++){var o=r[a];if(n.hasOwnProperty(o)){var s;if(null==(s=n[o]))continue;if(s.length)for(var l=0,h=s.length;l<h;l++)this._add&&this._add(s[l]);else this._add&&this._add(s)}}}};var pd=Z(["tooltip","label","itemName","itemId","seriesName"]);function gd(t,e){return t.hasOwnProperty(e)||(t[e]=[]),t[e]}function vd(t){null!=t&&S(this,t),this.otherDims={}}var md=O,yd="undefined",_d={float:typeof Float64Array==yd?Array:Float64Array,int:typeof Int32Array==yd?Array:Int32Array,ordinal:Array,number:Array,time:Array},xd=typeof Uint32Array==yd?Array:Uint32Array,wd=typeof Int32Array==yd?Array:Int32Array,bd=typeof Uint16Array==yd?Array:Uint16Array;function Sd(t){return 65535<t._rawCount?xd:bd}var Md=["hasItemOption","_nameList","_idList","_invertedIndicesMap","_rawData","_chunkSize","_chunkCount","_dimValueGetter","_count","_rawCount","_nameDimIdx","_idDimIdx"],Id=["_extent","_approximateExtent","_rawExtent"];function Td(e,n){D(Md.concat(n.__wrappedMethods||[]),function(t){n.hasOwnProperty(t)&&(e[t]=n[t])}),e.__wrappedMethods=n.__wrappedMethods,D(Id,function(t){e[t]=b(n[t])}),e._calculationInfo=S(n._calculationInfo)}function Cd(t,e){t=t||["x","y"];for(var n={},i=[],r={},a=0;a<t.length;a++){var o=t[a];C(o)?o=new vd({name:o}):o instanceof vd||(o=new vd(o));var s=o.name;o.type=o.type||"float",o.coordDim||(o.coordDim=s,o.coordDimIndex=0),o.otherDims=o.otherDims||{},i.push(s),(n[s]=o).index=a,o.createInvertedIndices&&(r[s]=[])}this.dimensions=i,this._dimensionInfos=n,this.hostModel=e,this.dataType,this._indices=null,this._count=0,this._rawCount=0,this._storage={},this._nameList=[],this._idList=[],this._optionModels=[],this._visual={},this._layout={},this._itemVisuals=[],this.hasItemVisual={},this._itemLayouts=[],this._graphicEls=[],this._chunkSize=1e5,this._chunkCount=0,this._rawData,this._rawExtent={},this._extent={},this._approximateExtent={},this._dimensionsSummary=function(i){var t={},a=t.encode={},o=Z(),s=[],l=[],h=t.userOutput={dimensionNames:i.dimensions.slice(),encode:{}};D(i.dimensions,function(t){var r=i.getDimensionInfo(t),e=r.coordDim;if(e){var n=r.coordDimIndex;gd(a,e)[n]=t,r.isExtraCoord||(o.set(e,1),function(t){return!("ordinal"===t||"time"===t)}(r.type)&&(s[0]=t),gd(h.encode,e)[n]=r.index),r.defaultTooltip&&l.push(t)}pd.each(function(t,e){var n=gd(a,e),i=r.otherDims[e];null!=i&&!1!==i&&(n[i]=r.name)})});var r=[],u={};o.each(function(t,e){var n=a[e];u[e]=n[0],r=r.concat(n)}),t.dataDimsOnCoord=r,t.encodeFirstDimNotExtra=u;var e=a.label;e&&e.length&&(s=e.slice());var n=a.tooltip;return n&&n.length?l=n.slice():l.length||(l=s.slice()),a.defaultedLabel=s,a.defaultedTooltip=l,t}(this),this._invertedIndicesMap=r,this._calculationInfo={},this.userOutput=this._dimensionsSummary.userOutput}var kd=Cd.prototype;function Dd(t,e,n,i,r){var a=_d[e.type],o=i-1,s=e.name,l=t[s][o];if(l&&l.length<n){for(var h=new a(Math.min(r-o*n,n)),u=0;u<l.length;u++)h[u]=l[u];t[s][o]=h}for(var c=i*n;c<r;c+=n)t[s].push(new a(Math.min(r-c,n)))}function Ad(r){var a=r._invertedIndicesMap;D(a,function(t,e){var n=r._dimensionInfos[e].ordinalMeta;if(n){t=a[e]=new wd(n.categories.length);for(var i=0;i<t.length;i++)t[i]=-1;for(i=0;i<r._count;i++)t[r.get(e,i)]=i}})}function Ld(t,e,n){var i;if(null!=e){var r=t._chunkSize,a=Math.floor(n/r),o=n%r,s=t.dimensions[e],l=t._storage[s][a];if(l){i=l[o];var h=t._dimensionInfos[s].ordinalMeta;h&&h.categories.length&&(i=h.categories[i])}}return i}function Pd(t){return t}function Od(t){return t<this._count&&0<=t?this._indices[t]:-1}function Ed(t,e){var n=t._idList[e];return null==n&&(n=Ld(t,t._idDimIdx,e)),null==n&&(n="e\0\0"+e),n}function Nd(t){return L(t)||(t=[t]),t}function Bd(t,e){var n=t.dimensions,i=new Cd(A(n,t.getDimensionInfo,t),t.hostModel);Td(i,t);for(var r=i._storage={},a=t._storage,o=0;o<n.length;o++){var s=n[o];a[s]&&(0<=g(e,s)?(r[s]=Rd(a[s]),i._rawExtent[s]=zd(),i._extent[s]=null):r[s]=a[s])}return i}function Rd(t){for(var e,n,i=new Array(t.length),r=0;r<t.length;r++)i[r]=(e=t[r],n=void 0,(n=e.constructor)===Array?e.slice():new n(e));return i}function zd(){return[1/0,-1/0]}kd.type="list",kd.hasItemOption=!0,kd.getDimension=function(t){return"number"!=typeof t&&(isNaN(t)||this._dimensionInfos.hasOwnProperty(t))||(t=this.dimensions[t]),t},kd.getDimensionInfo=function(t){return this._dimensionInfos[this.getDimension(t)]},kd.getDimensionsOnCoord=function(){return this._dimensionsSummary.dataDimsOnCoord.slice()},kd.mapDimension=function(t,e){var n=this._dimensionsSummary;if(null==e)return n.encodeFirstDimNotExtra[t];var i=n.encode[t];return!0===e?(i||[]).slice():i&&i[e]},kd.initData=function(t,e,n){(Nl.isInstance(t)||P(t))&&(t=new bh(t,this.dimensions.length)),this._rawData=t,this._storage={},this._indices=null,this._nameList=e||[],this._idList=[],this._nameRepeatCount={},n||(this.hasItemOption=!1),this.defaultDimValueGetter=Ah[this._rawData.getSource().sourceFormat],this._dimValueGetter=n=n||this.defaultDimValueGetter,this._dimValueGetterArrayRows=Ah.arrayRows,this._rawExtent={},this._initDataFromProvider(0,t.count()),t.pure&&(this.hasItemOption=!1)},kd.getProvider=function(){return this._rawData},kd.appendData=function(t){var e=this._rawData,n=this.count();e.appendData(t);var i=e.count();e.persistent||(i+=n),this._initDataFromProvider(n,i)},kd.appendValues=function(t,e){for(var n=this._chunkSize,i=this._storage,r=this.dimensions,a=r.length,o=this._rawExtent,s=this.count(),l=s+Math.max(t.length,e?e.length:0),h=this._chunkCount,u=0;u<a;u++){o[m=r[u]]||(o[m]=zd()),i[m]||(i[m]=[]),Dd(i,this._dimensionInfos[m],n,h,l),this._chunkCount=i[m].length}for(var c=new Array(a),d=s;d<l;d++){for(var f=d-s,p=Math.floor(d/n),g=d%n,v=0;v<a;v++){var m=r[v],y=this._dimValueGetterArrayRows(t[f]||c,m,f,v);i[m][p][g]=y;var _=o[m];y<_[0]&&(_[0]=y),y>_[1]&&(_[1]=y)}e&&(this._nameList[d]=e[f])}this._rawCount=this._count=l,this._extent={},Ad(this)},kd._initDataFromProvider=function(t,e){if(!(e<=t)){for(var n,i=this._chunkSize,r=this._rawData,a=this._storage,o=this.dimensions,s=o.length,l=this._dimensionInfos,h=this._nameList,u=this._idList,c=this._rawExtent,d=this._nameRepeatCount={},f=this._chunkCount,p=0;p<s;p++){c[w=o[p]]||(c[w]=zd());var g=l[w];0===g.otherDims.itemName&&(n=this._nameDimIdx=p),0===g.otherDims.itemId&&(this._idDimIdx=p),a[w]||(a[w]=[]),Dd(a,g,i,f,e),this._chunkCount=a[w].length}for(var v=new Array(s),m=t;m<e;m++){v=r.getItem(m,v);for(var y=Math.floor(m/i),_=m%i,x=0;x<s;x++){var w,b=a[w=o[x]][y],S=this._dimValueGetter(v,w,m,x);b[_]=S;var M=c[w];S<M[0]&&(M[0]=S),S>M[1]&&(M[1]=S)}if(!r.pure){var I=h[m];if(v&&null==I)if(null!=v.name)h[m]=I=v.name;else if(null!=n){var T=o[n],C=a[T][y];if(C){I=C[_];var k=l[T].ordinalMeta;k&&k.categories.length&&(I=k.categories[I])}}var D=null==v?null:v.id;null==D&&null!=I&&(d[I]=d[I]||0,0<d[D=I]&&(D+="__ec__"+d[I]),d[I]++),null!=D&&(u[m]=D)}}!r.persistent&&r.clean&&r.clean(),this._rawCount=this._count=e,this._extent={},Ad(this)}},kd.count=function(){return this._count},kd.getIndices=function(){var t=this._indices;if(t){var e=t.constructor,n=this._count;if(e===Array){r=new e(n);for(var i=0;i<n;i++)r[i]=t[i]}else r=new e(t.buffer,0,n)}else{var r=new(e=Sd(this))(this.count());for(i=0;i<r.length;i++)r[i]=i}return r},kd.get=function(t,e){if(!(0<=e&&e<this._count))return NaN;var n=this._storage;if(!n[t])return NaN;e=this.getRawIndex(e);var i=Math.floor(e/this._chunkSize),r=e%this._chunkSize;return n[t][i][r]},kd.getByRawIndex=function(t,e){if(!(0<=e&&e<this._rawCount))return NaN;var n=this._storage[t];if(!n)return NaN;var i=Math.floor(e/this._chunkSize),r=e%this._chunkSize;return n[i][r]},kd._getFast=function(t,e){var n=Math.floor(e/this._chunkSize),i=e%this._chunkSize;return this._storage[t][n][i]},kd.getValues=function(t,e){var n=[];L(t)||(e=t,t=this.dimensions);for(var i=0,r=t.length;i<r;i++)n.push(this.get(t[i],e));return n},kd.hasValue=function(t){for(var e=this._dimensionsSummary.dataDimsOnCoord,n=0,i=e.length;n<i;n++)if(isNaN(this.get(e[n],t)))return!1;return!0},kd.getDataExtent=function(t){t=this.getDimension(t);var e=this._storage[t],n=zd();if(!e)return n;var i,r=this.count();if(!this._indices)return this._rawExtent[t].slice();if(i=this._extent[t])return i.slice();for(var a=(i=n)[0],o=i[1],s=0;s<r;s++){var l=this._getFast(t,this.getRawIndex(s));l<a&&(a=l),o<l&&(o=l)}return i=[a,o],this._extent[t]=i},kd.getApproximateExtent=function(t){return t=this.getDimension(t),this._approximateExtent[t]||this.getDataExtent(t)},kd.setApproximateExtent=function(t,e){e=this.getDimension(e),this._approximateExtent[e]=t.slice()},kd.getCalculationInfo=function(t){return this._calculationInfo[t]},kd.setCalculationInfo=function(t,e){md(t)?S(this._calculationInfo,t):this._calculationInfo[t]=e},kd.getSum=function(t){var e=0;if(this._storage[t])for(var n=0,i=this.count();n<i;n++){var r=this.get(t,n);isNaN(r)||(e+=r)}return e},kd.getMedian=function(t){var n=[];this.each(t,function(t,e){isNaN(t)||n.push(t)});var e=[].concat(n).sort(function(t,e){return t-e}),i=this.count();return 0===i?0:i%2==1?e[(i-1)/2]:(e[i/2]+e[i/2-1])/2},kd.rawIndexOf=function(t,e){var n=(t&&this._invertedIndicesMap[t])[e];return null==n||isNaN(n)?-1:n},kd.indexOfName=function(t){for(var e=0,n=this.count();e<n;e++)if(this.getName(e)===t)return e;return-1},kd.indexOfRawIndex=function(t){if(t>=this._rawCount||t<0)return-1;if(!this._indices)return t;var e=this._indices,n=e[t];if(null!=n&&n<this._count&&n===t)return t;for(var i=0,r=this._count-1;i<=r;){var a=(i+r)/2|0;if(e[a]<t)i=1+a;else{if(!(e[a]>t))return a;r=a-1}}return-1},kd.indicesOfNearest=function(t,e,n){var i=[];if(!this._storage[t])return i;null==n&&(n=1/0);for(var r=1/0,a=-1,o=0,s=0,l=this.count();s<l;s++){var h=e-this.get(t,s),u=Math.abs(h);u<=n&&((u<r||u===r&&0<=h&&a<0)&&(r=u,a=h,o=0),h===a&&(i[o++]=s))}return i.length=o,i},kd.getRawIndex=Pd,kd.getRawDataItem=function(t){if(this._rawData.persistent)return this._rawData.getItem(this.getRawIndex(t));for(var e=[],n=0;n<this.dimensions.length;n++){var i=this.dimensions[n];e.push(this.get(i,t))}return e},kd.getName=function(t){var e=this.getRawIndex(t);return this._nameList[e]||Ld(this,this._nameDimIdx,e)||""},kd.getId=function(t){return Ed(this,this.getRawIndex(t))},kd.each=function(t,e,n,i){if(this._count){"function"==typeof t&&(i=n,n=e,e=t,t=[]),n=n||i||this;for(var r=(t=A(Nd(t),this.getDimension,this)).length,a=0;a<this.count();a++)switch(r){case 0:e.call(n,a);break;case 1:e.call(n,this.get(t[0],a),a);break;case 2:e.call(n,this.get(t[0],a),this.get(t[1],a),a);break;default:for(var o=0,s=[];o<r;o++)s[o]=this.get(t[o],a);s[o]=a,e.apply(n,s)}}},kd.filterSelf=function(t,e,n,i){if(this._count){"function"==typeof t&&(i=n,n=e,e=t,t=[]),n=n||i||this,t=A(Nd(t),this.getDimension,this);for(var r=this.count(),a=new(Sd(this))(r),o=[],s=t.length,l=0,h=t[0],u=0;u<r;u++){var c,d=this.getRawIndex(u);if(0===s)c=e.call(n,u);else if(1===s){var f=this._getFast(h,d);c=e.call(n,f,u)}else{for(var p=0;p<s;p++)o[p]=this._getFast(h,d);o[p]=u,c=e.apply(n,o)}c&&(a[l++]=d)}return l<r&&(this._indices=a),this._count=l,this._extent={},this.getRawIndex=this._indices?Od:Pd,this}},kd.selectRange=function(t){if(this._count){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);var i=e.length;if(i){var r=this.count(),a=new(Sd(this))(r),o=0,s=e[0],l=t[s][0],h=t[s][1],u=!1;if(!this._indices){var c=0;if(1===i){for(var d=this._storage[e[0]],f=0;f<this._chunkCount;f++)for(var p=d[f],g=Math.min(this._count-f*this._chunkSize,this._chunkSize),v=0;v<g;v++){(l<=(w=p[v])&&w<=h||isNaN(w))&&(a[o++]=c),c++}u=!0}else if(2===i){d=this._storage[s];var m=this._storage[e[1]],y=t[e[1]][0],_=t[e[1]][1];for(f=0;f<this._chunkCount;f++){p=d[f];var x=m[f];for(g=Math.min(this._count-f*this._chunkSize,this._chunkSize),v=0;v<g;v++){var w=p[v],b=x[v];(l<=w&&w<=h||isNaN(w))&&(y<=b&&b<=_||isNaN(b))&&(a[o++]=c),c++}}u=!0}}if(!u)if(1===i)for(v=0;v<r;v++){var S=this.getRawIndex(v);(l<=(w=this._getFast(s,S))&&w<=h||isNaN(w))&&(a[o++]=S)}else for(v=0;v<r;v++){var M=!0;for(S=this.getRawIndex(v),f=0;f<i;f++){var I=e[f];((w=this._getFast(n,S))<t[I][0]||w>t[I][1])&&(M=!1)}M&&(a[o++]=this.getRawIndex(v))}return o<r&&(this._indices=a),this._count=o,this._extent={},this.getRawIndex=this._indices?Od:Pd,this}}},kd.mapArray=function(t,e,n,i){"function"==typeof t&&(i=n,n=e,e=t,t=[]),n=n||i||this;var r=[];return this.each(t,function(){r.push(e&&e.apply(this,arguments))},n),r},kd.map=function(t,e,n,i){n=n||i||this;var r=Bd(this,t=A(Nd(t),this.getDimension,this));r._indices=this._indices,r.getRawIndex=r._indices?Od:Pd;for(var a=r._storage,o=[],s=this._chunkSize,l=t.length,h=this.count(),u=[],c=r._rawExtent,d=0;d<h;d++){for(var f=0;f<l;f++)u[f]=this.get(t[f],d);u[l]=d;var p=e&&e.apply(n,u);if(null!=p){"object"!=typeof p&&(o[0]=p,p=o);for(var g=this.getRawIndex(d),v=Math.floor(g/s),m=g%s,y=0;y<p.length;y++){var _=t[y],x=p[y],w=c[_],b=a[_];b&&(b[v][m]=x),x<w[0]&&(w[0]=x),x>w[1]&&(w[1]=x)}}}return r},kd.downSample=function(t,e,n,i){for(var r=Bd(this,[t]),a=r._storage,o=[],s=Math.floor(1/e),l=a[t],h=this.count(),u=this._chunkSize,c=r._rawExtent[t],d=new(Sd(this))(h),f=0,p=0;p<h;p+=s){h-p<s&&(s=h-p,o.length=s);for(var g=0;g<s;g++){var v=this.getRawIndex(p+g),m=Math.floor(v/u),y=v%u;o[g]=l[m][y]}var _=n(o),x=this.getRawIndex(Math.min(p+i(o,_)||0,h-1)),w=x%u;(l[Math.floor(x/u)][w]=_)<c[0]&&(c[0]=_),_>c[1]&&(c[1]=_),d[f++]=x}return r._count=f,r._indices=d,r.getRawIndex=Od,r},kd.getItemModel=function(t){var e=this.hostModel;return new Rs(this.getRawDataItem(t),e,e&&e.ecModel)},kd.diff=function(e){var n=this;return new dd(e?e.getIndices():[],this.getIndices(),function(t){return Ed(e,t)},function(t){return Ed(n,t)})},kd.getVisual=function(t){var e=this._visual;return e&&e[t]},kd.setVisual=function(t,e){if(md(t))for(var n in t)t.hasOwnProperty(n)&&this.setVisual(n,t[n]);else this._visual=this._visual||{},this._visual[t]=e},kd.setLayout=function(t,e){if(md(t))for(var n in t)t.hasOwnProperty(n)&&this.setLayout(n,t[n]);else this._layout[t]=e},kd.getLayout=function(t){return this._layout[t]},kd.getItemLayout=function(t){return this._itemLayouts[t]},kd.setItemLayout=function(t,e,n){this._itemLayouts[t]=n?S(this._itemLayouts[t]||{},e):e},kd.clearItemLayouts=function(){this._itemLayouts.length=0},kd.getItemVisual=function(t,e,n){var i=this._itemVisuals[t],r=i&&i[e];return null!=r||n?r:this.getVisual(e)},kd.setItemVisual=function(t,e,n){var i=this._itemVisuals[t]||{},r=this.hasItemVisual;if(this._itemVisuals[t]=i,md(e))for(var a in e)e.hasOwnProperty(a)&&(i[a]=e[a],r[a]=!0);else i[e]=n,r[e]=!0},kd.clearAllVisual=function(){this._visual={},this._itemVisuals=[],this.hasItemVisual={}};function Fd(t){t.seriesIndex=this.seriesIndex,t.dataIndex=this.dataIndex,t.dataType=this.dataType}function Vd(t,e,n){Nl.isInstance(e)||(e=Nl.seriesDataToSource(e)),n=n||{},t=(t||[]).slice();for(var i=(n.dimsDef||[]).slice(),r=Z(),a=Z(),l=[],o=function(t,e,n,i){var r=Math.max(t.dimensionsDetectCount||1,e.length,n.length,i||0);return D(e,function(t){var e=t.dimsDef;e&&(r=Math.max(r,e.length))}),r}(e,t,i,n.dimCount),s=0;s<o;s++){var h=i[s]=S({},O(i[s])?i[s]:{name:i[s]}),u=h.name,c=l[s]=new vd;null!=u&&null==r.get(u)&&(c.name=c.displayName=u,r.set(u,s)),null!=h.type&&(c.type=h.type),null!=h.displayName&&(c.displayName=h.displayName)}var d=n.encodeDef;!d&&n.encodeDefaulter&&(d=n.encodeDefaulter(e,o)),(d=Z(d)).each(function(t,n){if(1===(t=nr(t).slice()).length&&!C(t[0])&&t[0]<0)d.set(n,!1);else{var i=d.set(n,[]);D(t,function(t,e){C(t)&&(t=r.get(t)),null!=t&&t<o&&(i[e]=t,p(l[t],n,e))})}});var f=0;function p(t,e,n){null!=pd.get(e)?t.otherDims[e]=n:(t.coordDim=e,t.coordDimIndex=n,a.set(e,!0))}D(t,function(r,t){var a,o,s;if(C(r))a=r,r={};else{a=r.name;var e=r.ordinalMeta;r.ordinalMeta=null,(r=b(r)).ordinalMeta=e,o=r.dimsDef,s=r.otherDims,r.name=r.coordDim=r.coordDimIndex=r.dimsDef=r.otherDims=null}if(!1!==(n=d.get(a))){var n;if(!(n=nr(n)).length)for(var i=0;i<(o&&o.length||1);i++){for(;f<l.length&&null!=l[f].coordDim;)f++;f<l.length&&n.push(f++)}D(n,function(t,e){var n=l[t];if(p(k(n,r),a,e),null==n.name&&o){var i=o[e];O(i)||(i={name:i}),n.name=n.displayName=i.name,n.defaultTooltip=i.defaultTooltip}s&&k(n.otherDims,s)})}});var g=n.generateCoord,v=n.generateCoordCount,m=null!=v;v=g?v||1:0;for(var y,_,x=g||"value",w=0;w<o;w++){null==(c=l[w]=l[w]||new vd).coordDim&&(c.coordDim=Wd(x,a,m),c.coordDimIndex=0,(!g||v<=0)&&(c.isExtraCoord=!0),v--),null==c.name&&(c.name=Wd(c.coordDim,r)),null==c.type&&(y=e,_=w,c.name,Xl(y.data,y.sourceFormat,y.seriesLayoutBy,y.dimensionsDefine,y.startIndex,_)===Bl.Must||c.isExtraCoord&&(null!=c.otherDims.itemName||null!=c.otherDims.seriesName))&&(c.type="ordinal")}return l}function Wd(t,e,n){if(n||null!=e.get(t)){for(var i=0;null!=e.get(t+i);)i++;t+=i}return e.set(t,!0),t}kd.setItemGraphicEl=function(t,e){var n=this.hostModel;e&&(e.dataIndex=t,e.dataType=this.dataType,e.seriesIndex=n&&n.seriesIndex,"group"===e.type&&e.traverse(Fd,e)),this._graphicEls[t]=e},kd.getItemGraphicEl=function(t){return this._graphicEls[t]},kd.eachItemGraphicEl=function(n,i){D(this._graphicEls,function(t,e){t&&n&&n.call(i,t,e)})},kd.cloneShallow=function(t){if(!t){var e=A(this.dimensions,this.getDimensionInfo,this);t=new Cd(e,this.hostModel)}if(t._storage=this._storage,Td(t,this),this._indices){var n=this._indices.constructor;t._indices=new n(this._indices)}else t._indices=null;return t.getRawIndex=t._indices?Od:Pd,t},kd.wrapMethod=function(t,e){var n=this[t];"function"==typeof n&&(this.__wrappedMethods=this.__wrappedMethods||[],this.__wrappedMethods.push(t),this[t]=function(){var t=n.apply(this,arguments);return e.apply(this,[t].concat(W(arguments)))})},kd.TRANSFERABLE_METHODS=["cloneShallow","downSample","map"],kd.CHANGABLE_METHODS=["filterSelf","selectRange"];function Hd(t,e){return Vd((e=e||{}).coordDimensions||[],t,{dimsDef:e.dimensionsDefine||t.dimensionsDefine,encodeDef:e.encodeDefine||t.encodeDefine,dimCount:e.dimensionsCount,encodeDefaulter:e.encodeDefaulter,generateCoord:e.generateCoord,generateCoordCount:e.generateCoordCount})}function Gd(t){this.coordSysName=t,this.coordSysDims=[],this.axisMap=Z(),this.categoryAxisMap=Z(),this.firstCategoryDimIndex=null}var Xd={cartesian2d:function(t,e,n,i){var r=t.getReferringComponents("xAxis")[0],a=t.getReferringComponents("yAxis")[0];e.coordSysDims=["x","y"],n.set("x",r),n.set("y",a),Ud(r)&&(i.set("x",r),e.firstCategoryDimIndex=0),Ud(a)&&(i.set("y",a),e.firstCategoryDimIndex,e.firstCategoryDimIndex=1)},singleAxis:function(t,e,n,i){var r=t.getReferringComponents("singleAxis")[0];e.coordSysDims=["single"],n.set("single",r),Ud(r)&&(i.set("single",r),e.firstCategoryDimIndex=0)},polar:function(t,e,n,i){var r=t.getReferringComponents("polar")[0],a=r.findAxisModel("radiusAxis"),o=r.findAxisModel("angleAxis");e.coordSysDims=["radius","angle"],n.set("radius",a),n.set("angle",o),Ud(a)&&(i.set("radius",a),e.firstCategoryDimIndex=0),Ud(o)&&(i.set("angle",o),null==e.firstCategoryDimIndex&&(e.firstCategoryDimIndex=1))},geo:function(t,e,n,i){e.coordSysDims=["lng","lat"]},parallel:function(t,r,a,o){var s=t.ecModel,e=s.getComponent("parallel",t.get("parallelIndex")),l=r.coordSysDims=e.dimensions.slice();D(e.parallelAxisIndex,function(t,e){var n=s.getComponent("parallelAxis",t),i=l[e];a.set(i,n),Ud(n)&&null==r.firstCategoryDimIndex&&(o.set(i,n),r.firstCategoryDimIndex=e)})}};function Ud(t){return"category"===t.get("type")}function Yd(t,e){return!!e&&e===t.getCalculationInfo("stackedDimension")}function qd(t,e,n){n=n||{},Nl.isInstance(t)||(t=Nl.seriesDataToSource(t));var i,r=e.get("coordinateSystem"),a=Ql.get(r),o=function(t){var e=t.get("coordinateSystem"),n=new Gd(e),i=Xd[e];if(i)return i(t,n,n.axisMap,n.categoryAxisMap),n}(e);o&&(i=A(o.coordSysDims,function(t){var e={name:t},n=o.axisMap.get(t);if(n){var i=n.get("type");e.type=function(t){return"category"===t?"ordinal":"time"===t?"time":"float"}(i)}return e})),i=i||(a&&(a.getDimensionsInfo?a.getDimensionsInfo():a.dimensions.slice())||["x","y"]);var s,l,h=Hd(t,{coordDimensions:i,generateCoord:n.generateCoord,encodeDefaulter:n.useEncodeDefaulter?I(Wl,i,e):null});o&&D(h,function(t,e){var n=t.coordDim,i=o.categoryAxisMap.get(n);i&&(null==s&&(s=e),t.ordinalMeta=i.getOrdinalMeta()),null!=t.otherDims.itemName&&(l=!0)}),l||null==s||(h[s].otherDims.itemName=0);var u=function(t,n,e){var i,r,a,o,s=(e=e||{}).byIndex,l=e.stackedCoordDimension,h=!(!t||!t.get("stack"));if(D(n,function(t,e){C(t)&&(n[e]=t={name:t}),h&&!t.isExtraCoord&&(s||i||!t.ordinalMeta||(i=t),r||"ordinal"===t.type||"time"===t.type||l&&l!==t.coordDim||(r=t))}),!r||s||i||(s=!0),r){a="__\0ecstackresult",o="__\0ecstackedover",i&&(i.createInvertedIndices=!0);var u=r.coordDim,c=r.type,d=0;D(n,function(t){t.coordDim===u&&d++}),n.push({name:a,coordDim:u,coordDimIndex:d,type:c,isExtraCoord:!0,isCalculationCoord:!0}),d++,n.push({name:o,coordDim:o,coordDimIndex:d,type:c,isExtraCoord:!0,isCalculationCoord:!0})}return{stackedDimension:r&&r.name,stackedByDimension:i&&i.name,isStackedByIndex:s,stackedOverDimension:o,stackResultDimension:a}}(e,h),c=new Cd(h,e);c.setCalculationInfo(u);var d=null!=s&&function(t){if(t.sourceFormat===Cl){var e=function(t){var e=0;for(;e<t.length&&null==t[e];)e++;return t[e]}(t.data||[]);return null!=e&&!L(ar(e))}}(t)?function(t,e,n,i){return i===s?n:this.defaultDimValueGetter(t,e,n,i)}:null;return c.hasItemOption=!1,c.initData(t,null,d),c}Kh.extend({type:"series.line",dependencies:["grid","polar"],getInitialData:function(t,e){return qd(this.getSource(),this,{useEncodeDefaulter:!0})},defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,hoverAnimation:!0,clip:!0,label:{position:"top"},lineStyle:{width:2,type:"solid"},step:!1,smooth:!1,smoothMonotone:null,symbol:"emptyCircle",symbolSize:4,symbolRotate:null,showSymbol:!0,showAllSymbol:"auto",connectNulls:!1,sampling:"none",animationEasing:"linear",progressive:0,hoverLayerThreshold:1/0}});var jd=Go({type:"triangle",shape:{cx:0,cy:0,width:0,height:0},buildPath:function(t,e){var n=e.cx,i=e.cy,r=e.width/2,a=e.height/2;t.moveTo(n,i-a),t.lineTo(n+r,i+a),t.lineTo(n-r,i+a),t.closePath()}}),Zd=Go({type:"diamond",shape:{cx:0,cy:0,width:0,height:0},buildPath:function(t,e){var n=e.cx,i=e.cy,r=e.width/2,a=e.height/2;t.moveTo(n,i-a),t.lineTo(n+r,i),t.lineTo(n,i+a),t.lineTo(n-r,i),t.closePath()}}),$d=Go({type:"pin",shape:{x:0,y:0,width:0,height:0},buildPath:function(t,e){var n=e.x,i=e.y,r=e.width/5*3,a=Math.max(r,e.height),o=r/2,s=o*o/(a-o),l=i-a+o+s,h=Math.asin(s/o),u=Math.cos(h)*o,c=Math.sin(h),d=Math.cos(h),f=.6*o,p=.7*o;t.moveTo(n-u,l+s),t.arc(n,l,o,Math.PI-h,2*Math.PI+h),t.bezierCurveTo(n+u-c*f,l+s+d*f,n,i-p,n,i),t.bezierCurveTo(n,i-p,n-u+c*f,l+s+d*f,n-u,l+s),t.closePath()}}),Kd=Go({type:"arrow",shape:{x:0,y:0,width:0,height:0},buildPath:function(t,e){var n=e.height,i=e.width,r=e.x,a=e.y,o=i/3*2;t.moveTo(r,a),t.lineTo(r+o,a+n),t.lineTo(r,a+n/4*3),t.lineTo(r-o,a+n),t.lineTo(r,a),t.closePath()}}),Qd={line:function(t,e,n,i,r){r.x1=t,r.y1=e+i/2,r.x2=t+n,r.y2=e+i/2},rect:function(t,e,n,i,r){r.x=t,r.y=e,r.width=n,r.height=i},roundRect:function(t,e,n,i,r){r.x=t,r.y=e,r.width=n,r.height=i,r.r=Math.min(n,i)/4},square:function(t,e,n,i,r){var a=Math.min(n,i);r.x=t,r.y=e,r.width=a,r.height=a},circle:function(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.r=Math.min(n,i)/2},diamond:function(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.width=n,r.height=i},pin:function(t,e,n,i,r){r.x=t+n/2,r.y=e+i/2,r.width=n,r.height=i},arrow:function(t,e,n,i,r){r.x=t+n/2,r.y=e+i/2,r.width=n,r.height=i},triangle:function(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.width=n,r.height=i}},Jd={};D({line:So,rect:wo,roundRect:wo,square:wo,circle:so,diamond:Zd,pin:$d,arrow:Kd,triangle:jd},function(t,e){Jd[e]=new t});var tf=Go({type:"symbol",shape:{symbolType:"",x:0,y:0,width:0,height:0},calculateTextPosition:function(t,e,n){var i=Vn(t,e,n),r=this.shape;return r&&"pin"===r.symbolType&&"inside"===e.textPosition&&(i.y=n.y+.4*n.height),i},buildPath:function(t,e,n){var i=e.symbolType;if("none"!==i){var r=Jd[i];r=r||Jd[i="rect"],Qd[i](e.x,e.y,e.width,e.height,r.shape),r.buildPath(t,r.shape,n)}}});function ef(t,e){if("image"!==this.type){var n=this.style,i=this.shape;i&&"line"===i.symbolType?n.stroke=t:this.__isEmptyBrush?(n.stroke=t,n.fill=e||"#fff"):(n.fill&&(n.fill=t),n.stroke&&(n.stroke=t)),this.dirty(!1)}}function nf(t,e,n,i,r,a,o){var s,l=0===t.indexOf("empty");return l&&(t=t.substr(5,1).toLowerCase()+t.substr(6)),(s=0===t.indexOf("image://")?Yo(t.slice(8),new $e(e,n,i,r),o?"center":"cover"):0===t.indexOf("path://")?Uo(t.slice(7),{},new $e(e,n,i,r),o?"center":"cover"):new tf({shape:{symbolType:t,x:e,y:n,width:i,height:r}})).__isEmptyBrush=l,s.setColor=ef,s.setColor(a),s}function rf(t,e){var n=t.mapDimension("defaultedLabel",!0),i=n.length;if(1===i)return Oh(t,e,n[0]);if(i){for(var r=[],a=0;a<n.length;a++){var o=Oh(t,e,n[a]);r.push(o)}return r.join(" ")}}function af(t,e,n){Ke.call(this),this.updateData(t,e,n)}var of=af.prototype,sf=af.getSymbolSize=function(t,e){var n=t.getItemVisual(e,"symbolSize");return n instanceof Array?n.slice():[+n,+n]};function lf(t){return[t[0]/2,t[1]/2]}function hf(t,e){this.parent.drift(t,e)}of._createSymbol=function(t,e,n,i,r){this.removeAll();var a=nf(t,-1,-1,2,2,e.getItemVisual(n,"color"),r);a.attr({z2:100,culling:!0,scale:lf(i)}),a.drift=hf,this._symbolType=t,this.add(a)},of.stopSymbolAnimation=function(t){this.childAt(0).stopAnimation(t)},of.getSymbolPath=function(){return this.childAt(0)},of.getScale=function(){return this.childAt(0).scale},of.highlight=function(){this.childAt(0).trigger("emphasis")},of.downplay=function(){this.childAt(0).trigger("normal")},of.setZ=function(t,e){var n=this.childAt(0);n.zlevel=t,n.z=e},of.setDraggable=function(t){var e=this.childAt(0);e.draggable=t,e.cursor=t?"move":e.cursor},of.updateData=function(t,e,n){this.silent=!1;var i=t.getItemVisual(e,"symbol")||"circle",r=t.hostModel,a=sf(t,e),o=i!==this._symbolType;if(o){var s=t.getItemVisual(e,"symbolKeepAspect");this._createSymbol(i,t,e,a,s)}else{(l=this.childAt(0)).silent=!1,Ms(l,{scale:lf(a)},r,e)}if(this._updateCommon(t,e,a,n),o){var l=this.childAt(0),h=n&&n.fadeIn,u={scale:l.scale.slice()};h&&(u.style={opacity:l.style.opacity}),l.scale=[0,0],h&&(l.style.opacity=0),Is(l,u,r,e)}this._seriesModel=r};var uf=["itemStyle"],cf=["emphasis","itemStyle"],df=["label"],ff=["emphasis","label"];function pf(t,e){if(!this.incremental&&!this.useHoverLayer)if("emphasis"===e){var n=this.__symbolOriginalScale,i=n[1]/n[0],r={scale:[Math.max(1.1*n[0],n[0]+3),Math.max(1.1*n[1],n[1]+3*i)]};this.animateTo(r,400,"elasticOut")}else"normal"===e&&this.animateTo({scale:this.__symbolOriginalScale},400,"elasticOut")}function gf(t){this.group=new Ke,this._symbolCtor=t||af}of._updateCommon=function(n,t,e,i){var r=this.childAt(0),a=n.hostModel,o=n.getItemVisual(t,"color");"image"!==r.type?r.useStyle({strokeNoScale:!0}):r.setStyle({opacity:null,shadowBlur:null,shadowOffsetX:null,shadowOffsetY:null,shadowColor:null});var s=i&&i.itemStyle,l=i&&i.hoverItemStyle,h=i&&i.symbolOffset,u=i&&i.labelModel,c=i&&i.hoverLabelModel,d=i&&i.hoverAnimation,f=i&&i.cursorStyle;if(!i||n.hasItemOption){var p=i&&i.itemModel?i.itemModel:n.getItemModel(t);s=p.getModel(uf).getItemStyle(["color"]),l=p.getModel(cf).getItemStyle(),h=p.getShallow("symbolOffset"),u=p.getModel(df),c=p.getModel(ff),d=p.getShallow("hoverAnimation"),f=p.getShallow("cursor")}else l=S({},l);var g=r.style,v=n.getItemVisual(t,"symbolRotate");r.attr("rotation",(v||0)*Math.PI/180||0),h&&r.attr("position",[Xs(h[0],e[0]),Xs(h[1],e[1])]),f&&r.attr("cursor",f),r.setColor(o,i&&i.symbolInnerColor),r.setStyle(s);var m=n.getItemVisual(t,"opacity");null!=m&&(g.opacity=m);var y=n.getItemVisual(t,"liftZ"),_=r.__z2Origin;null!=y?null==_&&(r.__z2Origin=r.z2,r.z2+=y):null!=_&&(r.z2=_,r.__z2Origin=null);var x=i&&i.useNameLabel;gs(g,l,u,c,{labelFetcher:a,labelDataIndex:t,defaultText:function(t,e){return x?n.getName(t):rf(n,t)},isRectText:!0,autoColor:o}),r.__symbolOriginalScale=lf(e),r.hoverStyle=l,r.highDownOnUpdate=d&&a.isAnimationEnabled()?pf:null,cs(r)},of.fadeOut=function(t,e){var n=this.childAt(0);this.silent=n.silent=!0,e&&e.keepLabel||(n.style.text=null),Ms(n,{style:{opacity:0},scale:[0,0]},this._seriesModel,this.dataIndex,t)},y(af,Ke);var vf=gf.prototype;function mf(t,e,n,i){return e&&!isNaN(e[0])&&!isNaN(e[1])&&!(i.isIgnore&&i.isIgnore(n))&&!(i.clipShape&&!i.clipShape.contain(e[0],e[1]))&&"none"!==t.getItemVisual(n,"symbol")}function yf(t){return null==t||O(t)||(t={isIgnore:t}),t||{}}function _f(t){var e=t.hostModel;return{itemStyle:e.getModel("itemStyle").getItemStyle(["color"]),hoverItemStyle:e.getModel("emphasis.itemStyle").getItemStyle(),symbolRotate:e.get("symbolRotate"),symbolOffset:e.get("symbolOffset"),hoverAnimation:e.get("hoverAnimation"),labelModel:e.getModel("label"),hoverLabelModel:e.getModel("emphasis.label"),cursorStyle:e.get("cursor")}}function xf(t,e,n){var i,r=t.getBaseAxis(),a=t.getOtherAxis(r),o=function(t,e){var n=0,i=t.scale.getExtent();"start"===e?n=i[0]:"end"===e?n=i[1]:0<i[0]?n=i[0]:i[1]<0&&(n=i[1]);return n}(a,n),s=r.dim,l=a.dim,h=e.mapDimension(l),u=e.mapDimension(s),c="x"===l||"radius"===l?1:0,d=A(t.dimensions,function(t){return e.mapDimension(t)}),f=e.getCalculationInfo("stackResultDimension");return(i|=Yd(e,d[0]))&&(d[0]=f),(i|=Yd(e,d[1]))&&(d[1]=f),{dataDimsForPoint:d,valueStart:o,valueAxisDim:l,baseAxisDim:s,stacked:!!i,valueDim:h,baseDim:u,baseDataOffset:c,stackedOverDimension:e.getCalculationInfo("stackedOverDimension")}}function wf(t,e,n,i){var r=NaN;t.stacked&&(r=n.get(n.getCalculationInfo("stackedOverDimension"),i)),isNaN(r)&&(r=t.valueStart);var a=t.baseDataOffset,o=[];return o[a]=n.get(t.baseDim,i),o[1-a]=r,e.dataToPoint(o)}vf.updateData=function(r,a){a=yf(a);var o=this.group,s=r.hostModel,l=this._data,h=this._symbolCtor,u=_f(r);l||o.removeAll(),r.diff(l).add(function(t){var e=r.getItemLayout(t);if(mf(r,e,t,a)){var n=new h(r,t,u);n.attr("position",e),r.setItemGraphicEl(t,n),o.add(n)}}).update(function(t,e){var n=l.getItemGraphicEl(e),i=r.getItemLayout(t);mf(r,i,t,a)?(n?(n.updateData(r,t,u),Ms(n,{position:i},s)):(n=new h(r,t)).attr("position",i),o.add(n),r.setItemGraphicEl(t,n)):o.remove(n)}).remove(function(t){var e=l.getItemGraphicEl(t);e&&e.fadeOut(function(){o.remove(e)})}).execute(),this._data=r},vf.isPersistent=function(){return!0},vf.updateLayout=function(){var i=this._data;i&&i.eachItemGraphicEl(function(t,e){var n=i.getItemLayout(e);t.attr("position",n)})},vf.incrementalPrepareUpdate=function(t){this._seriesScope=_f(t),this._data=null,this.group.removeAll()},vf.incrementalUpdate=function(t,e,n){function i(t){t.isGroup||(t.incremental=t.useHoverLayer=!0)}n=yf(n);for(var r=t.start;r<t.end;r++){var a=e.getItemLayout(r);if(mf(e,a,r,n)){var o=new this._symbolCtor(e,r,this._seriesScope);o.traverse(i),o.attr("position",a),this.group.add(o),e.setItemGraphicEl(r,o)}}},vf.remove=function(t){var e=this.group,n=this._data;n&&t?n.eachItemGraphicEl(function(t){t.fadeOut(function(){e.remove(t)})}):e.removeAll()};var bf=lt,Sf=ht,Mf=function(t,e,n,i){return t[0]=e[0]+n[0]*i,t[1]=e[1]+n[1]*i,t},If=function(t,e){return t[0]=e[0],t[1]=e[1],t},Tf=[],Cf=[],kf=[];function Df(t){return isNaN(t[0])||isNaN(t[1])}function Af(t,e,n,i,r,a,o,s,l,h){return"none"!==h&&h?function(t,e,n,i,r,a,o,s,l,h,u){for(var c=0,d=n,f=0;f<i;f++){var p=e[d];if(r<=d||d<0)break;if(Df(p)){if(u){d+=a;continue}break}if(d===n)t[0<a?"moveTo":"lineTo"](p[0],p[1]);else if(0<l){var g=e[c],v="y"===h?1:0,m=(p[v]-g[v])*l;If(Cf,g),Cf[v]=g[v]+m,If(kf,p),kf[v]=p[v]-m,t.bezierCurveTo(Cf[0],Cf[1],kf[0],kf[1],p[0],p[1])}else t.lineTo(p[0],p[1]);c=d,d+=a}return f}.apply(this,arguments):function(t,e,n,i,r,a,o,s,l,h,u){for(var c=0,d=n,f=0;f<i;f++){var p=e[d];if(r<=d||d<0)break;if(Df(p)){if(u){d+=a;continue}break}if(d===n)t[0<a?"moveTo":"lineTo"](p[0],p[1]),If(Cf,p);else if(0<l){var g=d+a,v=e[g];if(u)for(;v&&Df(e[g]);)v=e[g+=a];var m=.5,y=e[c];if(!(v=e[g])||Df(v))If(kf,p);else{var _,x;if(Df(v)&&!u&&(v=p),et(Tf,v,y),"x"===h||"y"===h){var w="x"===h?0:1;_=Math.abs(p[w]-y[w]),x=Math.abs(p[w]-v[w])}else _=at(p,y),x=at(p,v);Mf(kf,p,Tf,-l*(1-(m=x/(x+_))))}bf(Cf,Cf,s),Sf(Cf,Cf,o),bf(kf,kf,s),Sf(kf,kf,o),t.bezierCurveTo(Cf[0],Cf[1],kf[0],kf[1],p[0],p[1]),Mf(Cf,p,Tf,l*m)}else t.lineTo(p[0],p[1]);c=d,d+=a}return f}.apply(this,arguments)}function Lf(t,e){var n=[1/0,1/0],i=[-1/0,-1/0];if(e)for(var r=0;r<t.length;r++){var a=t[r];a[0]<n[0]&&(n[0]=a[0]),a[1]<n[1]&&(n[1]=a[1]),a[0]>i[0]&&(i[0]=a[0]),a[1]>i[1]&&(i[1]=a[1])}return{min:e?n:i,max:e?i:n}}var Pf=Wa.extend({type:"ec-polyline",shape:{points:[],smooth:0,smoothConstraint:!0,smoothMonotone:null,connectNulls:!1},style:{fill:null,stroke:"#000"},brush:oo(Wa.prototype.brush),buildPath:function(t,e){var n=e.points,i=0,r=n.length,a=Lf(n,e.smoothConstraint);if(e.connectNulls){for(;0<r&&Df(n[r-1]);r--);for(;i<r&&Df(n[i]);i++);}for(;i<r;)i+=Af(t,n,i,r,r,1,a.min,a.max,e.smooth,e.smoothMonotone,e.connectNulls)+1}}),Of=Wa.extend({type:"ec-polygon",shape:{points:[],stackedOnPoints:[],smooth:0,stackedOnSmooth:0,smoothConstraint:!0,smoothMonotone:null,connectNulls:!1},brush:oo(Wa.prototype.brush),buildPath:function(t,e){var n=e.points,i=e.stackedOnPoints,r=0,a=n.length,o=e.smoothMonotone,s=Lf(n,e.smoothConstraint),l=Lf(i,e.smoothConstraint);if(e.connectNulls){for(;0<a&&Df(n[a-1]);a--);for(;r<a&&Df(n[r]);r++);}for(;r<a;){var h=Af(t,n,r,a,a,1,s.min,s.max,e.smooth,o,e.connectNulls);Af(t,i,r+h-1,h,a,-1,l.min,l.max,e.stackedOnSmooth,o,e.connectNulls),r+=h+1,t.closePath()}}});function Ef(t,e,n){var i=t.getArea(),r=t.getBaseAxis().isHorizontal(),a=i.x,o=i.y,s=i.width,l=i.height,h=n.get("lineStyle.width")||2;a-=h/2,o-=h/2,s+=h,l+=h,a=Math.floor(a),s=Math.round(s);var u=new wo({shape:{x:a,y:o,width:s,height:l}});return e&&(u.shape[r?"width":"height"]=0,Is(u,{shape:{width:s,height:l}},n)),u}function Nf(t,e,n){var i=t.getArea(),r=new ho({shape:{cx:Us(t.cx,1),cy:Us(t.cy,1),r0:Us(i.r0,1),r:Us(i.r,1),startAngle:i.startAngle,endAngle:i.endAngle,clockwise:i.clockwise}});return e&&(r.shape.endAngle=i.startAngle,Is(r,{shape:{endAngle:i.endAngle}},n)),r}function Bf(t,e){if(t.length===e.length){for(var n=0;n<t.length;n++){var i=t[n],r=e[n];if(i[0]!==r[0]||i[1]!==r[1])return}return!0}}function Rf(t,e){var n=[],i=[],r=[],a=[];return na(t,n,i),na(e,r,a),Math.max(Math.abs(n[0]-r[0]),Math.abs(n[1]-r[1]),Math.abs(i[0]-a[0]),Math.abs(i[1]-a[1]))}function zf(t){return"number"==typeof t?t:t?.5:0}function Ff(t,e,n){for(var i=e.getBaseAxis(),r="x"===i.dim||"radius"===i.dim?0:1,a=[],o=0;o<t.length-1;o++){var s=t[o+1],l=t[o];a.push(l);var h=[];switch(n){case"end":h[r]=s[r],h[1-r]=l[1-r],a.push(h);break;case"middle":var u=(l[r]+s[r])/2,c=[];h[r]=c[r]=u,h[1-r]=l[1-r],c[1-r]=s[1-r],a.push(h),a.push(c);break;default:h[r]=l[r],h[1-r]=s[1-r],a.push(h)}}return t[o]&&a.push(t[o]),a}function Vf(t,e,n){var i=t.get("showAllSymbol"),r="auto"===i;if(!i||r){var a=n.getAxesByScale("ordinal")[0];if(a&&(!r||!function(t,e){var n=t.getExtent(),i=Math.abs(n[1]-n[0])/t.scale.count();isNaN(i)&&(i=0);for(var r=e.count(),a=Math.max(1,Math.round(r/5)),o=0;o<r;o+=a)if(1.5*af.getSymbolSize(e,o)[t.isHorizontal()?1:0]>i)return!1;return!0}(a,e))){var o=e.mapDimension(a.dim),s={};return D(a.getViewLabels(),function(t){s[t.tickValue]=1}),function(t){return!s.hasOwnProperty(e.get(o,t))}}}}function Wf(t,e,n){if("cartesian2d"!==t.type)return Nf(t,e,n);var i=t.getBaseAxis().isHorizontal(),r=Ef(t,e,n);if(!n.get("clip",!0)){var a=r.shape,o=Math.max(a.width,a.height);i?(a.y-=o,a.height+=2*o):(a.x-=o,a.width+=2*o)}return r}uu.extend({type:"line",init:function(){var t=new Ke,e=new gf;this.group.add(e.group),this._symbolDraw=e,this._lineGroup=t},render:function(t,e,n){var i=t.coordinateSystem,r=this.group,a=t.getData(),o=t.getModel("lineStyle"),s=t.getModel("areaStyle"),l=a.mapArray(a.getItemLayout),h="polar"===i.type,u=this._coordSys,c=this._symbolDraw,d=this._polyline,f=this._polygon,p=this._lineGroup,g=t.get("animation"),v=!s.isEmpty(),m=s.get("origin"),y=function(t,e,n){if(!n.valueDim)return[];for(var i=[],r=0,a=e.count();r<a;r++)i.push(wf(n,t,e,r));return i}(i,a,xf(i,a,m)),_=t.get("showSymbol"),x=_&&!h&&Vf(t,a,i),w=this._data;w&&w.eachItemGraphicEl(function(t,e){t.__temp&&(r.remove(t),w.setItemGraphicEl(e,null))}),_||c.remove(),r.add(p);var b,S=!h&&t.get("step");i&&i.getArea&&t.get("clip",!0)&&(null!=(b=i.getArea()).width?(b.x-=.1,b.y-=.1,b.width+=.2,b.height+=.2):b.r0&&(b.r0-=.5,b.r1+=.5)),this._clipShapeForSymbol=b,d&&u.type===i.type&&S===this._step?(v&&!f?f=this._newPolygon(l,y,i,g):f&&!v&&(p.remove(f),f=this._polygon=null),p.setClipPath(Wf(i,!1,t)),_&&c.updateData(a,{isIgnore:x,clipShape:b}),a.eachItemGraphicEl(function(t){t.stopAnimation(!0)}),Bf(this._stackedOnPoints,y)&&Bf(this._points,l)||(g?this._updateAnimation(a,y,i,n,S,m):(S&&(l=Ff(l,i,S),y=Ff(y,i,S)),d.setShape({points:l}),f&&f.setShape({points:l,stackedOnPoints:y})))):(_&&c.updateData(a,{isIgnore:x,clipShape:b}),S&&(l=Ff(l,i,S),y=Ff(y,i,S)),d=this._newPolyline(l,i,g),v&&(f=this._newPolygon(l,y,i,g)),p.setClipPath(Wf(i,!0,t)));var M=function(t,e){var n=t.getVisual("visualMeta");if(n&&n.length&&t.count()&&"cartesian2d"===e.type){for(var i,r,a=n.length-1;0<=a;a--){var o=n[a].dimension,s=t.dimensions[o],l=t.getDimensionInfo(s);if("x"===(i=l&&l.coordDim)||"y"===i){r=n[a];break}}if(r){var h=e.getAxis(i),u=A(r.stops,function(t){return{coord:h.toGlobalCoord(h.dataToCoord(t.value)),color:t.color}}),c=u.length,d=r.outerColors.slice();c&&u[0].coord>u[c-1].coord&&(u.reverse(),d.reverse());var f=u[0].coord-10,p=u[c-1].coord+10,g=p-f;if(g<.001)return"transparent";D(u,function(t){t.offset=(t.coord-f)/g}),u.push({offset:c?u[c-1].offset:.5,color:d[1]||"transparent"}),u.unshift({offset:c?u[0].offset:.5,color:d[0]||"transparent"});var v=new Ao(0,0,0,0,u,!0);return v[i]=f,v[i+"2"]=p,v}}}(a,i)||a.getVisual("color");d.useStyle(k(o.getLineStyle(),{fill:"none",stroke:M,lineJoin:"bevel"}));var I=t.get("smooth");if(I=zf(t.get("smooth")),d.setShape({smooth:I,smoothMonotone:t.get("smoothMonotone"),connectNulls:t.get("connectNulls")}),f){var T=a.getCalculationInfo("stackedOnSeries"),C=0;f.useStyle(k(s.getAreaStyle(),{fill:M,opacity:.7,lineJoin:"bevel"})),T&&(C=zf(T.get("smooth"))),f.setShape({smooth:I,stackedOnSmooth:C,smoothMonotone:t.get("smoothMonotone"),connectNulls:t.get("connectNulls")})}this._data=a,this._coordSys=i,this._stackedOnPoints=y,this._points=l,this._step=S,this._valueOrigin=m},dispose:function(){},highlight:function(t,e,n,i){var r=t.getData(),a=hr(r,i);if(!(a instanceof Array)&&null!=a&&0<=a){var o=r.getItemGraphicEl(a);if(!o){var s=r.getItemLayout(a);if(!s)return;if(this._clipShapeForSymbol&&!this._clipShapeForSymbol.contain(s[0],s[1]))return;(o=new af(r,a)).position=s,o.setZ(t.get("zlevel"),t.get("z")),o.ignore=isNaN(s[0])||isNaN(s[1]),o.__temp=!0,r.setItemGraphicEl(a,o),o.stopSymbolAnimation(!0),this.group.add(o)}o.highlight()}else uu.prototype.highlight.call(this,t,e,n,i)},downplay:function(t,e,n,i){var r=t.getData(),a=hr(r,i);if(null!=a&&0<=a){var o=r.getItemGraphicEl(a);o&&(o.__temp?(r.setItemGraphicEl(a,null),this.group.remove(o)):o.downplay())}else uu.prototype.downplay.call(this,t,e,n,i)},_newPolyline:function(t){var e=this._polyline;return e&&this._lineGroup.remove(e),e=new Pf({shape:{points:t},silent:!0,z2:10}),this._lineGroup.add(e),this._polyline=e},_newPolygon:function(t,e){var n=this._polygon;return n&&this._lineGroup.remove(n),n=new Of({shape:{points:t,stackedOnPoints:e},silent:!0}),this._lineGroup.add(n),this._polygon=n},_updateAnimation:function(t,e,n,i,r,a){var o=this._polyline,s=this._polygon,l=t.hostModel,h=function(t,e,n,i,r,a,o,s){for(var l=function(t,e){var n=[];return e.diff(t).add(function(t){n.push({cmd:"+",idx:t})}).update(function(t,e){n.push({cmd:"=",idx:e,idx1:t})}).remove(function(t){n.push({cmd:"-",idx:t})}).execute(),n}(t,e),h=[],u=[],c=[],d=[],f=[],p=[],g=[],v=xf(r,e,o),m=xf(a,t,s),y=0;y<l.length;y++){var _=l[y],x=!0;switch(_.cmd){case"=":var w=t.getItemLayout(_.idx),b=e.getItemLayout(_.idx1);(isNaN(w[0])||isNaN(w[1]))&&(w=b.slice()),h.push(w),u.push(b),c.push(n[_.idx]),d.push(i[_.idx1]),g.push(e.getRawIndex(_.idx1));break;case"+":var S=_.idx;h.push(r.dataToPoint([e.get(v.dataDimsForPoint[0],S),e.get(v.dataDimsForPoint[1],S)])),u.push(e.getItemLayout(S).slice()),c.push(wf(v,r,e,S)),d.push(i[S]),g.push(e.getRawIndex(S));break;case"-":S=_.idx;var M=t.getRawIndex(S);M!==S?(h.push(t.getItemLayout(S)),u.push(a.dataToPoint([t.get(m.dataDimsForPoint[0],S),t.get(m.dataDimsForPoint[1],S)])),c.push(n[S]),d.push(wf(m,a,t,S)),g.push(M)):x=!1}x&&(f.push(_),p.push(p.length))}p.sort(function(t,e){return g[t]-g[e]});var I=[],T=[],C=[],k=[],D=[];for(y=0;y<p.length;y++){S=p[y];I[y]=h[S],T[y]=u[S],C[y]=c[S],k[y]=d[S],D[y]=f[S]}return{current:I,next:T,stackedOnCurrent:C,stackedOnNext:k,status:D}}(this._data,t,this._stackedOnPoints,e,this._coordSys,n,this._valueOrigin,a),u=h.current,c=h.stackedOnCurrent,d=h.next,f=h.stackedOnNext;if(r&&(u=Ff(h.current,n,r),c=Ff(h.stackedOnCurrent,n,r),d=Ff(h.next,n,r),f=Ff(h.stackedOnNext,n,r)),3e3<Rf(u,d)||s&&3e3<Rf(c,f))return o.setShape({points:d}),void(s&&s.setShape({points:d,stackedOnPoints:f}));o.shape.__points=h.current,o.shape.points=u,Ms(o,{shape:{points:d}},l),s&&(s.setShape({points:u,stackedOnPoints:c}),Ms(s,{shape:{points:d,stackedOnPoints:f}},l));for(var p=[],g=h.status,v=0;v<g.length;v++){if("="===g[v].cmd){var m=t.getItemGraphicEl(g[v].idx1);m&&p.push({el:m,ptIdx:v})}}o.animators&&o.animators.length&&o.animators[0].during(function(){for(var t=0;t<p.length;t++){p[t].el.attr("position",o.shape.__points[p[t].ptIdx])}})},remove:function(t){var n=this.group,i=this._data;this._lineGroup.removeAll(),this._symbolDraw.remove(!0),i&&i.eachItemGraphicEl(function(t,e){t.__temp&&(n.remove(t),i.setItemGraphicEl(e,null))}),this._polyline=this._polygon=this._coordSys=this._points=this._stackedOnPoints=this._data=null}});function Hf(t,e){return Math.round(t.length/2)}var Gf={average:function(t){for(var e=0,n=0,i=0;i<t.length;i++)isNaN(t[i])||(e+=t[i],n++);return 0===n?NaN:e/n},sum:function(t){for(var e=0,n=0;n<t.length;n++)e+=t[n]||0;return e},max:function(t){for(var e=-1/0,n=0;n<t.length;n++)t[n]>e&&(e=t[n]);return isFinite(e)?e:NaN},min:function(t){for(var e=1/0,n=0;n<t.length;n++)t[n]<e&&(e=t[n]);return isFinite(e)?e:NaN},nearest:function(t){return t[0]}};function Xf(t){this._setting=t||{},this._extent=[1/0,-1/0],this._interval=0,this.init&&this.init.apply(this,arguments)}function Uf(t){this.categories=t.categories||[],this._needCollect=t.needCollect,this._deduplication=t.deduplication,this._map}Xf.prototype.parse=function(t){return t},Xf.prototype.getSetting=function(t){return this._setting[t]},Xf.prototype.contain=function(t){var e=this._extent;return t>=e[0]&&t<=e[1]},Xf.prototype.normalize=function(t){var e=this._extent;return e[1]===e[0]?.5:(t-e[0])/(e[1]-e[0])},Xf.prototype.scale=function(t){var e=this._extent;return t*(e[1]-e[0])+e[0]},Xf.prototype.unionExtent=function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1])},Xf.prototype.unionExtentFromData=function(t,e){this.unionExtent(t.getApproximateExtent(e))},Xf.prototype.getExtent=function(){return this._extent.slice()},Xf.prototype.setExtent=function(t,e){var n=this._extent;isNaN(t)||(n[0]=t),isNaN(e)||(n[1]=e)},Xf.prototype.isBlank=function(){return this._isBlank},Xf.prototype.setBlank=function(t){this._isBlank=t},Xf.prototype.getLabel=null,yr(Xf),Sr(Xf,{registerWhenExtend:!0}),Uf.createByAxisModel=function(t){var e=t.option,n=e.data,i=n&&A(n,jf);return new Uf({categories:i,needCollect:!i,deduplication:!1!==e.dedplication})};var Yf=Uf.prototype;function qf(t){return t._map||(t._map=Z(t.categories))}function jf(t){return O(t)&&null!=t.value?t.value:t+""}Yf.getOrdinal=function(t){return qf(this).get(t)},Yf.parseAndCollect=function(t){var e,n=this._needCollect;if("string"!=typeof t&&!n)return t;if(n&&!this._deduplication)return e=this.categories.length,this.categories[e]=t,e;var i=qf(this);return null==(e=i.get(t))&&(n?(e=this.categories.length,this.categories[e]=t,i.set(t,e)):e=NaN),e};var Zf=Xf.prototype,$f=Xf.extend({type:"ordinal",init:function(t,e){t&&!L(t)||(t=new Uf({categories:t})),this._ordinalMeta=t,this._extent=e||[0,t.categories.length-1]},parse:function(t){return"string"==typeof t?this._ordinalMeta.getOrdinal(t):Math.round(t)},contain:function(t){return t=this.parse(t),Zf.contain.call(this,t)&&null!=this._ordinalMeta.categories[t]},normalize:function(t){return Zf.normalize.call(this,this.parse(t))},scale:function(t){return Math.round(Zf.scale.call(this,t))},getTicks:function(){for(var t=[],e=this._extent,n=e[0];n<=e[1];)t.push(n),n++;return t},getLabel:function(t){if(!this.isBlank())return this._ordinalMeta.categories[t]},count:function(){return this._extent[1]-this._extent[0]+1},unionExtentFromData:function(t,e){this.unionExtent(t.getApproximateExtent(e))},getOrdinalMeta:function(){return this._ordinalMeta},niceTicks:$,niceExtent:$});$f.create=function(){return new $f};var Kf=Us;function Qf(t){return Ys(t)+2}function Jf(t,e,n){t[e]=Math.max(Math.min(t[e],n[1]),n[0])}function tp(t,e){isFinite(t[0])||(t[0]=e[0]),isFinite(t[1])||(t[1]=e[1]),Jf(t,0,e),Jf(t,1,e),t[0]>t[1]&&(t[0]=t[1])}var ep=Us,np=Xf.extend({type:"interval",_interval:0,_intervalPrecision:2,setExtent:function(t,e){var n=this._extent;isNaN(t)||(n[0]=parseFloat(t)),isNaN(e)||(n[1]=parseFloat(e))},unionExtent:function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1]),np.prototype.setExtent.call(this,e[0],e[1])},getInterval:function(){return this._interval},setInterval:function(t){this._interval=t,this._niceExtent=this._extent.slice(),this._intervalPrecision=Qf(t)},getTicks:function(t){var e=this._interval,n=this._extent,i=this._niceExtent,r=this._intervalPrecision,a=[];if(!e)return a;n[0]<i[0]&&(t?a.push(ep(i[0]-e,r)):a.push(n[0]));for(var o=i[0];o<=i[1]&&(a.push(o),(o=ep(o+e,r))!==a[a.length-1]);)if(1e4<a.length)return[];var s=a.length?a[a.length-1]:i[1];return n[1]>s&&(t?a.push(ep(s+e,r)):a.push(n[1])),a},getMinorTicks:function(t){for(var e=this.getTicks(!0),n=[],i=this.getExtent(),r=1;r<e.length;r++){for(var a=e[r],o=e[r-1],s=0,l=[],h=(a-o)/t;s<t-1;){var u=Us(o+(s+1)*h);u>i[0]&&u<i[1]&&l.push(u),s++}n.push(l)}return n},getLabel:function(t,e){if(null==t)return"";var n=e&&e.precision;return null==n?n=Ys(t)||0:"auto"===n&&(n=this._intervalPrecision),Js(t=ep(t,n,!0))},niceTicks:function(t,e,n){t=t||5;var i=this._extent,r=i[1]-i[0];if(isFinite(r)){r<0&&(r=-r,i.reverse());var a=function(t,e,n,i){var r={},a=t[1]-t[0],o=r.interval=Qs(a/e,!0);null!=n&&o<n&&(o=r.interval=n),null!=i&&i<o&&(o=r.interval=i);var s=r.intervalPrecision=Qf(o);return tp(r.niceTickExtent=[Kf(Math.ceil(t[0]/o)*o,s),Kf(Math.floor(t[1]/o)*o,s)],t),r}(i,t,e,n);this._intervalPrecision=a.intervalPrecision,this._interval=a.interval,this._niceExtent=a.niceTickExtent}},niceExtent:function(t){var e=this._extent;if(e[0]===e[1])if(0!==e[0]){var n=e[0];t.fixMax||(e[1]+=n/2),e[0]-=n/2}else e[1]=1;var i=e[1]-e[0];isFinite(i)||(e[0]=0,e[1]=1),this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var r=this._interval;t.fixMin||(e[0]=ep(Math.floor(e[0]/r)*r)),t.fixMax||(e[1]=ep(Math.ceil(e[1]/r)*r))}});np.create=function(){return new np};var ip="__ec_stack_",rp="undefined"!=typeof Float32Array?Float32Array:Array;function ap(t){return t.get("stack")||ip+t.seriesIndex}function op(t){return t.dim+t.index}function sp(t,e){var n=[];return e.eachSeriesByType(t,function(t){cp(t)&&!dp(t)&&n.push(t)}),n}function lp(t){var g=function(t){var l={};D(t,function(t){var e=t.coordinateSystem.getBaseAxis();if("time"===e.type||"value"===e.type)for(var n=t.getData(),i=e.dim+"_"+e.index,r=n.mapDimension(e.dim),a=0,o=n.count();a<o;++a){var s=n.get(r,a);l[i]?l[i].push(s):l[i]=[s]}});var e=[];for(var n in l)if(l.hasOwnProperty(n)){var i=l[n];if(i){i.sort(function(t,e){return t-e});for(var r=null,a=1;a<i.length;++a){var o=i[a]-i[a-1];0<o&&(r=null===r?o:Math.min(r,o))}e[n]=r}}return e}(t),v=[];return D(t,function(t){var e,n=t.coordinateSystem.getBaseAxis(),i=n.getExtent();if("category"===n.type)e=n.getBandWidth();else if("value"===n.type||"time"===n.type){var r=n.dim+"_"+n.index,a=g[r],o=Math.abs(i[1]-i[0]),s=n.scale.getExtent(),l=Math.abs(s[1]-s[0]);e=a?o/l*a:o}else{var h=t.getData();e=Math.abs(i[1]-i[0])/h.count()}var u=Xs(t.get("barWidth"),e),c=Xs(t.get("barMaxWidth"),e),d=Xs(t.get("barMinWidth")||1,e),f=t.get("barGap"),p=t.get("barCategoryGap");v.push({bandWidth:e,barWidth:u,barMaxWidth:c,barMinWidth:d,barGap:f,barCategoryGap:p,axisKey:op(n),stackId:ap(t)})}),function(t){var d={};D(t,function(t,e){var n=t.axisKey,i=t.bandWidth,r=d[n]||{bandWidth:i,remainedWidth:i,autoWidthCount:0,categoryGap:"20%",gap:"30%",stacks:{}},a=r.stacks;d[n]=r;var o=t.stackId;a[o]||r.autoWidthCount++,a[o]=a[o]||{width:0,maxWidth:0};var s=t.barWidth;s&&!a[o].width&&(a[o].width=s,s=Math.min(r.remainedWidth,s),r.remainedWidth-=s);var l=t.barMaxWidth;l&&(a[o].maxWidth=l);var h=t.barMinWidth;h&&(a[o].minWidth=h);var u=t.barGap;null!=u&&(r.gap=u);var c=t.barCategoryGap;null!=c&&(r.categoryGap=c)});var f={};return D(d,function(t,n){f[n]={};var e=t.stacks,i=t.bandWidth,r=Xs(t.categoryGap,i),a=Xs(t.gap,1),o=t.remainedWidth,s=t.autoWidthCount,l=(o-r)/(s+(s-1)*a);l=Math.max(l,0),D(e,function(t){var e=t.maxWidth,n=t.minWidth;if(t.width){i=t.width;e&&(i=Math.min(i,e)),n&&(i=Math.max(i,n)),t.width=i,o-=i+a*i,s--}else{var i=l;e&&e<i&&(i=Math.min(e,o)),n&&i<n&&(i=n),i!==l&&(t.width=i,o-=i+a*i,s--)}}),l=(o-r)/(s+(s-1)*a),l=Math.max(l,0);var h,u=0;D(e,function(t,e){t.width||(t.width=l),u+=(h=t).width*(1+a)}),h&&(u-=h.width*a);var c=-u/2;D(e,function(t,e){f[n][e]=f[n][e]||{bandWidth:i,offset:c,width:t.width},c+=t.width*(1+a)})}),f}(v)}function hp(t,e,n){if(t&&e){var i=t[op(e)];return null!=i&&null!=n&&(i=i[ap(n)]),i}}var up={seriesType:"bar",plan:su(),reset:function(t){if(cp(t)&&dp(t)){var e=t.getData(),c=t.coordinateSystem,d=c.grid.getRect(),f=c.getBaseAxis(),p=c.getOtherAxis(f),g=e.mapDimension(p.dim),v=e.mapDimension(f.dim),m=p.isHorizontal(),y=m?0:1,_=hp(lp([t]),f,t).width;return.5<_||(_=.5),{progress:function(t,e){var n,i=t.count,r=new rp(2*i),a=new rp(2*i),o=new rp(i),s=[],l=[],h=0,u=0;for(;null!=(n=t.next());)l[y]=e.get(g,n),l[1-y]=e.get(v,n),s=c.dataToPoint(l,null,s),a[h]=m?d.x+d.width:s[0],r[h++]=s[0],a[h]=m?s[1]:d.y+d.height,r[h++]=s[1],o[u++]=n;e.setLayout({largePoints:r,largeDataIndices:o,largeBackgroundPoints:a,barWidth:_,valueAxisStart:fp(f,p,!1),backgroundStart:m?d.x:d.y,valueAxisHorizontal:m})}}}}};function cp(t){return t.coordinateSystem&&"cartesian2d"===t.coordinateSystem.type}function dp(t){return t.pipelineContext&&t.pipelineContext.large}function fp(t,e){return e.toGlobalCoord(e.dataToCoord("log"===e.type?1:0))}var pp=np.prototype,gp=Math.ceil,vp=Math.floor,mp=36e5,yp=864e5,_p=np.extend({type:"time",getLabel:function(t){var e=this._stepLvl,n=new Date(t);return ll(e[0],n,this.getSetting("useUTC"))},niceExtent:function(t){var e=this._extent;if(e[0]===e[1]&&(e[0]-=yp,e[1]+=yp),e[1]===-1/0&&e[0]===1/0){var n=new Date;e[1]=+new Date(n.getFullYear(),n.getMonth(),n.getDate()),e[0]=e[1]-yp}this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var i=this._interval;t.fixMin||(e[0]=Us(vp(e[0]/i)*i)),t.fixMax||(e[1]=Us(gp(e[1]/i)*i))},niceTicks:function(t,e,n){t=t||10;var i=this._extent,r=i[1]-i[0],a=r/t;null!=e&&a<e&&(a=e),null!=n&&n<a&&(a=n);var o=xp.length,s=function(t,e,n,i){for(;n<i;){var r=n+i>>>1;t[r][1]<e?n=1+r:i=r}return n}(xp,a,0,o),l=xp[Math.min(s,o-1)],h=l[1];"year"===l[0]&&(h*=Qs(r/h/t,!0));var u=this.getSetting("useUTC")?0:60*new Date(+i[0]||+i[1]).getTimezoneOffset()*1e3,c=[Math.round(gp((i[0]-u)/h)*h+u),Math.round(vp((i[1]-u)/h)*h+u)];tp(c,i),this._stepLvl=l,this._interval=h,this._niceExtent=c},parse:function(t){return+$s(t)}});D(["contain","normalize"],function(e){_p.prototype[e]=function(t){return pp[e].call(this,this.parse(t))}});var xp=[["hh:mm:ss",1e3],["hh:mm:ss",5e3],["hh:mm:ss",1e4],["hh:mm:ss",15e3],["hh:mm:ss",3e4],["hh:mm\nMM-dd",6e4],["hh:mm\nMM-dd",3e5],["hh:mm\nMM-dd",6e5],["hh:mm\nMM-dd",9e5],["hh:mm\nMM-dd",18e5],["hh:mm\nMM-dd",mp],["hh:mm\nMM-dd",72e5],["hh:mm\nMM-dd",6*mp],["hh:mm\nMM-dd",432e5],["MM-dd\nyyyy",yp],["MM-dd\nyyyy",2*yp],["MM-dd\nyyyy",3*yp],["MM-dd\nyyyy",4*yp],["MM-dd\nyyyy",5*yp],["MM-dd\nyyyy",6*yp],["week",7*yp],["MM-dd\nyyyy",864e6],["week",14*yp],["week",21*yp],["month",31*yp],["week",42*yp],["month",62*yp],["week",70*yp],["quarter",95*yp],["month",31*yp*4],["month",13392e6],["half-year",16416e6],["month",31*yp*8],["month",26784e6],["year",380*yp]];_p.create=function(t){return new _p({useUTC:t.ecModel.get("useUTC")})};var wp=Xf.prototype,bp=np.prototype,Sp=Ys,Mp=Us,Ip=Math.floor,Tp=Math.ceil,Cp=Math.pow,kp=Math.log,Dp=Xf.extend({type:"log",base:10,$constructor:function(){Xf.apply(this,arguments),this._originalScale=new np},getTicks:function(t){var n=this._originalScale,i=this._extent,r=n.getExtent();return A(bp.getTicks.call(this,t),function(t){var e=Us(Cp(this.base,t));return e=t===i[0]&&n.__fixMin?Ap(e,r[0]):e,e=t===i[1]&&n.__fixMax?Ap(e,r[1]):e},this)},getMinorTicks:bp.getMinorTicks,getLabel:bp.getLabel,scale:function(t){return t=wp.scale.call(this,t),Cp(this.base,t)},setExtent:function(t,e){var n=this.base;t=kp(t)/kp(n),e=kp(e)/kp(n),bp.setExtent.call(this,t,e)},getExtent:function(){var t=this.base,e=wp.getExtent.call(this);e[0]=Cp(t,e[0]),e[1]=Cp(t,e[1]);var n=this._originalScale,i=n.getExtent();return n.__fixMin&&(e[0]=Ap(e[0],i[0])),n.__fixMax&&(e[1]=Ap(e[1],i[1])),e},unionExtent:function(t){this._originalScale.unionExtent(t);var e=this.base;t[0]=kp(t[0])/kp(e),t[1]=kp(t[1])/kp(e),wp.unionExtent.call(this,t)},unionExtentFromData:function(t,e){this.unionExtent(t.getApproximateExtent(e))},niceTicks:function(t){t=t||10;var e=this._extent,n=e[1]-e[0];if(!(n==1/0||n<=0)){var i=function(t){return Math.pow(10,Ks(t))}(n);for(t/n*i<=.5&&(i*=10);!isNaN(i)&&Math.abs(i)<1&&0<Math.abs(i);)i*=10;var r=[Us(Tp(e[0]/i)*i),Us(Ip(e[1]/i)*i)];this._interval=i,this._niceExtent=r}},niceExtent:function(t){bp.niceExtent.call(this,t);var e=this._originalScale;e.__fixMin=t.fixMin,e.__fixMax=t.fixMax}});function Ap(t,e){return Mp(t,Sp(e))}function Lp(t,e){var n,i,r,a=t.type,o=e.getMin(),s=e.getMax(),l=t.getExtent();"ordinal"===a?n=e.getCategories().length:(L(i=e.get("boundaryGap"))||(i=[i||0,i||0]),"boolean"==typeof i[0]&&(i=[0,0]),i[0]=Xs(i[0],1),i[1]=Xs(i[1],1),r=l[1]-l[0]||Math.abs(l[0])),"dataMin"===o?o=l[0]:"function"==typeof o&&(o=o({min:l[0],max:l[1]})),"dataMax"===s?s=l[1]:"function"==typeof s&&(s=s({min:l[0],max:l[1]}));var h=null!=o,u=null!=s;null==o&&(o="ordinal"===a?n?0:NaN:l[0]-i[0]*r),null==s&&(s="ordinal"===a?n?n-1:NaN:l[1]+i[1]*r),null!=o&&isFinite(o)||(o=NaN),null!=s&&isFinite(s)||(s=NaN),t.setBlank(R(o)||R(s)||"ordinal"===a&&!t.getOrdinalMeta().categories.length),e.getNeedCrossZero()&&(0<o&&0<s&&!h&&(o=0),o<0&&s<0&&!u&&(s=0));var c=e.ecModel;if(c&&"time"===a){var d,f=sp("bar",c);if(D(f,function(t){d|=t.getBaseAxis()===e.axis}),d){var p=lp(f),g=function(t,e,n,i){var r=n.axis.getExtent(),a=r[1]-r[0],o=hp(i,n.axis);if(void 0===o)return{min:t,max:e};var s=1/0;D(o,function(t){s=Math.min(t.offset,s)});var l=-1/0;D(o,function(t){l=Math.max(t.offset+t.width,l)}),s=Math.abs(s),l=Math.abs(l);var h=s+l,u=e-t,c=u/(1-(s+l)/a)-u;return{min:t-=s/h*c,max:e+=l/h*c}}(o,s,e,p);o=g.min,s=g.max}}return{extent:[o,s],fixMin:h,fixMax:u}}function Pp(t,e){var n=Lp(t,e),i=n.extent,r=e.get("splitNumber");"log"===t.type&&(t.base=e.get("logBase"));var a=t.type;t.setExtent(i[0],i[1]),t.niceExtent({splitNumber:r,fixMin:n.fixMin,fixMax:n.fixMax,minInterval:"interval"===a||"time"===a?e.get("minInterval"):null,maxInterval:"interval"===a||"time"===a?e.get("maxInterval"):null});var o=e.get("interval");null!=o&&t.setInterval&&t.setInterval(o)}function Op(n){var e,i=n.getLabelModel().get("formatter"),r="category"===n.type?n.scale.getExtent()[0]:null;return"string"==typeof i?(e=i,i=function(t){return t=n.scale.getLabel(t),e.replace("{value}",null!=t?t:"")}):"function"==typeof i?function(t,e){return null!=r&&(e=t-r),i(function(t,e){return"category"===t.type?t.scale.getLabel(e):e}(n,t),e)}:function(t){return n.scale.getLabel(t)}}function Ep(t){var e=t.get("interval");return null==e?"auto":e}function Np(t){return"category"===t.type&&0===Ep(t.getLabelModel())}function Bp(t){return this._axes[t]}D(["contain","normalize"],function(e){Dp.prototype[e]=function(t){return t=kp(t)/kp(this.base),wp[e].call(this,t)}}),Dp.create=function(){return new Dp};function Rp(t){this._axes={},this._dimList=[],this.name=t||""}function zp(t){Rp.call(this,t)}Rp.prototype={constructor:Rp,type:"cartesian",getAxis:function(t){return this._axes[t]},getAxes:function(){return A(this._dimList,Bp,this)},getAxesByScale:function(e){return e=e.toLowerCase(),x(this.getAxes(),function(t){return t.scale.type===e})},addAxis:function(t){var e=t.dim;this._axes[e]=t,this._dimList.push(e)},dataToCoord:function(t){return this._dataCoordConvert(t,"dataToCoord")},coordToData:function(t){return this._dataCoordConvert(t,"coordToData")},_dataCoordConvert:function(t,e){for(var n=this._dimList,i=t instanceof Array?[]:{},r=0;r<n.length;r++){var a=n[r],o=this._axes[a];i[a]=o[e](t[a])}return i}},zp.prototype={constructor:zp,type:"cartesian2d",dimensions:["x","y"],getBaseAxis:function(){return this.getAxesByScale("ordinal")[0]||this.getAxesByScale("time")[0]||this.getAxis("x")},containPoint:function(t){var e=this.getAxis("x"),n=this.getAxis("y");return e.contain(e.toLocalCoord(t[0]))&&n.contain(n.toLocalCoord(t[1]))},containData:function(t){return this.getAxis("x").containData(t[0])&&this.getAxis("y").containData(t[1])},dataToPoint:function(t,e,n){var i=this.getAxis("x"),r=this.getAxis("y");return(n=n||[])[0]=i.toGlobalCoord(i.dataToCoord(t[0])),n[1]=r.toGlobalCoord(r.dataToCoord(t[1])),n},clampData:function(t,e){var n=this.getAxis("x").scale,i=this.getAxis("y").scale,r=n.getExtent(),a=i.getExtent(),o=n.parse(t[0]),s=i.parse(t[1]);return(e=e||[])[0]=Math.min(Math.max(Math.min(r[0],r[1]),o),Math.max(r[0],r[1])),e[1]=Math.min(Math.max(Math.min(a[0],a[1]),s),Math.max(a[0],a[1])),e},pointToData:function(t,e){var n=this.getAxis("x"),i=this.getAxis("y");return(e=e||[])[0]=n.coordToData(n.toLocalCoord(t[0])),e[1]=i.coordToData(i.toLocalCoord(t[1])),e},getOtherAxis:function(t){return this.getAxis("x"===t.dim?"y":"x")},getArea:function(){var t=this.getAxis("x").getGlobalExtent(),e=this.getAxis("y").getGlobalExtent(),n=Math.min(t[0],t[1]),i=Math.min(e[0],e[1]);return new $e(n,i,Math.max(t[0],t[1])-n,Math.max(e[0],e[1])-i)}},y(zp,Rp);var Fp=ur();function Vp(t){return"category"===t.type?function(t){var e=t.getLabelModel(),n=Hp(t,e);return!e.get("show")||t.scale.isBlank()?{labels:[],labelCategoryInterval:n.labelCategoryInterval}:n}(t):function(n){var t=n.scale.getTicks(),i=Op(n);return{labels:A(t,function(t,e){return{formattedLabel:i(t,e),rawLabel:n.scale.getLabel(t),tickValue:t}})}}(t)}function Wp(t,e){return"category"===t.type?function(t,e){var n,i,r=Gp(t,"ticks"),a=Ep(e),o=Xp(r,a);if(o)return o;e.get("show")&&!t.scale.isBlank()||(n=[]);if(T(a))n=qp(t,a,!0);else if("auto"===a){var s=Hp(t,t.getLabelModel());i=s.labelCategoryInterval,n=A(s.labels,function(t){return t.tickValue})}else n=Yp(t,i=a,!0);return Up(r,a,{ticks:n,tickCategoryInterval:i})}(t,e):{ticks:t.scale.getTicks()}}function Hp(t,e){var n,i=Gp(t,"labels"),r=Ep(e),a=Xp(i,r);return a||Up(i,r,{labels:T(r)?qp(t,r):Yp(t,n="auto"===r?function(t){var e=Fp(t).autoInterval;return null!=e?e:Fp(t).autoInterval=t.calculateCategoryInterval()}(t):r),labelCategoryInterval:n})}function Gp(t,e){return Fp(t)[e]||(Fp(t)[e]=[])}function Xp(t,e){for(var n=0;n<t.length;n++)if(t[n].key===e)return t[n].value}function Up(t,e,n){return t.push({key:e,value:n}),n}function Yp(t,e,n){var i=Op(t),r=t.scale,a=r.getExtent(),o=t.getLabelModel(),s=[],l=Math.max((e||0)+1,1),h=a[0],u=r.count();0!==h&&1<l&&2<u/l&&(h=Math.round(Math.ceil(h/l)*l));var c=Np(t),d=o.get("showMinLabel")||c,f=o.get("showMaxLabel")||c;d&&h!==a[0]&&g(a[0]);for(var p=h;p<=a[1];p+=l)g(p);function g(t){s.push(n?t:{formattedLabel:i(t),rawLabel:r.getLabel(t),tickValue:t})}return f&&p-l!==a[1]&&g(a[1]),s}function qp(t,n,i){var r=t.scale,a=Op(t),o=[];return D(r.getTicks(),function(t){var e=r.getLabel(t);n(t,e)&&o.push(i?t:{formattedLabel:a(t),rawLabel:e,tickValue:t})}),o}function jp(t,e,n){this.dim=t,this.scale=e,this._extent=n||[0,0],this.inverse=!1,this.onBand=!1}var Zp=[0,1];function $p(t,e){var n=(t[1]-t[0])/e/2;t[0]+=n,t[1]-=n}jp.prototype={constructor:jp,contain:function(t){var e=this._extent,n=Math.min(e[0],e[1]),i=Math.max(e[0],e[1]);return n<=t&&t<=i},containData:function(t){return this.scale.contain(t)},getExtent:function(){return this._extent.slice()},getPixelPrecision:function(t){return function(t,e){var n=Math.log,i=Math.LN10,r=Math.floor(n(t[1]-t[0])/i),a=Math.round(n(Math.abs(e[1]-e[0]))/i),o=Math.min(Math.max(-r+a,0),20);return isFinite(o)?o:20}(t||this.scale.getExtent(),this._extent)},setExtent:function(t,e){var n=this._extent;n[0]=t,n[1]=e},dataToCoord:function(t,e){var n=this._extent,i=this.scale;return t=i.normalize(t),this.onBand&&"ordinal"===i.type&&$p(n=n.slice(),i.count()),Gs(t,Zp,n,e)},coordToData:function(t,e){var n=this._extent,i=this.scale;this.onBand&&"ordinal"===i.type&&$p(n=n.slice(),i.count());var r=Gs(t,n,Zp,e);return this.scale.scale(r)},pointToData:function(t,e){},getTicksCoords:function(t){var e=(t=t||{}).tickModel||this.getTickModel(),n=A(Wp(this,e).ticks,function(t){return{coord:this.dataToCoord(t),tickValue:t}},this);return function(t,e,n,i){var r=e.length;if(!t.onBand||n||!r)return;var a,o,s=t.getExtent();if(1===r)e[0].coord=s[0],a=e[1]={coord:s[0]};else{var l=e[r-1].tickValue-e[0].tickValue,h=(e[r-1].coord-e[0].coord)/l;D(e,function(t){t.coord-=h/2});var u=t.scale.getExtent();o=1+u[1]-e[r-1].tickValue,a={coord:e[r-1].coord+h*o},e.push(a)}var c=s[0]>s[1];d(e[0].coord,s[0])&&(i?e[0].coord=s[0]:e.shift());i&&d(s[0],e[0].coord)&&e.unshift({coord:s[0]});d(s[1],a.coord)&&(i?a.coord=s[1]:e.pop());i&&d(a.coord,s[1])&&e.push({coord:s[1]});function d(t,e){return t=Us(t),e=Us(e),c?e<t:t<e}}(this,n,e.get("alignWithLabel"),t.clamp),n},getMinorTicksCoords:function(){if("ordinal"===this.scale.type)return[];var t=this.model.getModel("minorTick").get("splitNumber");return 0<t&&t<100||(t=5),A(this.scale.getMinorTicks(t),function(t){return A(t,function(t){return{coord:this.dataToCoord(t),tickValue:t}},this)},this)},getViewLabels:function(){return Vp(this).labels},getLabelModel:function(){return this.model.getModel("axisLabel")},getTickModel:function(){return this.model.getModel("axisTick")},getBandWidth:function(){var t=this._extent,e=this.scale.getExtent(),n=e[1]-e[0]+(this.onBand?1:0);0===n&&(n=1);var i=Math.abs(t[1]-t[0]);return Math.abs(i)/n},isHorizontal:null,getRotate:null,calculateCategoryInterval:function(){return function(t){var e=function(t){var e=t.getLabelModel();return{axisRotate:t.getRotate?t.getRotate():t.isHorizontal&&!t.isHorizontal()?90:0,labelRotate:e.get("rotate")||0,font:e.getFont()}}(t),n=Op(t),i=(e.axisRotate-e.labelRotate)/180*Math.PI,r=t.scale,a=r.getExtent(),o=r.count();if(a[1]-a[0]<1)return 0;var s=1;40<o&&(s=Math.max(1,Math.floor(o/40)));for(var l=a[0],h=t.dataToCoord(l+1)-t.dataToCoord(l),u=Math.abs(h*Math.cos(i)),c=Math.abs(h*Math.sin(i)),d=0,f=0;l<=a[1];l+=s){var p,g,v=Rn(n(l),e.font,"center","top");p=1.3*v.width,g=1.3*v.height,d=Math.max(d,p,7),f=Math.max(f,g,7)}var m=d/u,y=f/c;isNaN(m)&&(m=1/0),isNaN(y)&&(y=1/0);var _=Math.max(0,Math.floor(Math.min(m,y))),x=Fp(t.model),w=t.getExtent(),b=x.lastAutoInterval,S=x.lastTickCount;return null!=b&&null!=S&&Math.abs(b-_)<=1&&Math.abs(S-o)<=1&&_<b&&x.axisExtend0===w[0]&&x.axisExtend1===w[1]?_=b:(x.lastTickCount=o,x.lastAutoInterval=_,x.axisExtend0=w[0],x.axisExtend1=w[1]),_}(this)}};function Kp(t,e,n,i,r){jp.call(this,t,e,n),this.type=i||"value",this.position=r||"bottom"}Kp.prototype={constructor:Kp,index:0,getAxesOnZeroOf:null,model:null,isHorizontal:function(){var t=this.position;return"top"===t||"bottom"===t},getGlobalExtent:function(t){var e=this.getExtent();return e[0]=this.toGlobalCoord(e[0]),e[1]=this.toGlobalCoord(e[1]),t&&e[0]>e[1]&&e.reverse(),e},getOtherAxis:function(){this.grid.getOtherAxis()},pointToData:function(t,e){return this.coordToData(this.toLocalCoord(t["x"===this.dim?0:1]),e)},toLocalCoord:null,toGlobalCoord:null},y(Kp,jp);var Qp={show:!0,zlevel:0,z:0,inverse:!1,name:"",nameLocation:"end",nameRotate:null,nameTruncate:{maxWidth:null,ellipsis:"...",placeholder:"."},nameTextStyle:{},nameGap:15,silent:!1,triggerEvent:!1,tooltip:{show:!1},axisPointer:{},axisLine:{show:!0,onZero:!0,onZeroAxisIndex:null,lineStyle:{color:"#333",width:1,type:"solid"},symbol:["none","none"],symbolSize:[10,15]},axisTick:{show:!0,inside:!1,length:5,lineStyle:{width:1}},axisLabel:{show:!0,inside:!1,rotate:0,showMinLabel:null,showMaxLabel:null,margin:8,fontSize:12},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}},Jp={};Jp.categoryAxis=f({boundaryGap:!0,deduplication:null,splitLine:{show:!1},axisTick:{alignWithLabel:!1,interval:"auto"},axisLabel:{interval:"auto"}},Qp),Jp.valueAxis=f({boundaryGap:[0,0],splitNumber:5,minorTick:{show:!1,splitNumber:5,length:3,lineStyle:{}},minorSplitLine:{show:!1,lineStyle:{color:"#eee",width:1}}},Qp),Jp.timeAxis=k({scale:!0,min:"dataMin",max:"dataMax"},Jp.valueAxis),Jp.logAxis=k({scale:!0,logBase:10},Jp.valueAxis);function tg(a,t,o,e){D(eg,function(r){t.extend({type:a+"Axis."+r,mergeDefaultAndTheme:function(t,e){var n=this.layoutMode,i=n?vl(t):{};f(t,e.getTheme().get(r+"Axis")),f(t,this.getDefaultOption()),t.type=o(a,t),n&&gl(t,i,n)},optionUpdated:function(){"category"===this.option.type&&(this.__ordinalMeta=Uf.createByAxisModel(this))},getCategories:function(t){var e=this.option;if("category"===e.type)return t?e.data:this.__ordinalMeta.categories},getOrdinalMeta:function(){return this.__ordinalMeta},defaultOption:function(t,e){for(var n=t[0],i=1,r=t.length;i<r;i++)n=f(n,t[i],e);return n}([{},Jp[r+"Axis"],e],!0)})}),wl.registerSubTypeDefaulter(a+"Axis",I(o,a))}var eg=["value","category","time","log"],ng={getMin:function(t){var e=this.option,n=t||null==e.rangeStart?e.min:e.rangeStart;return this.axis&&null!=n&&"dataMin"!==n&&"function"!=typeof n&&!R(n)&&(n=this.axis.scale.parse(n)),n},getMax:function(t){var e=this.option,n=t||null==e.rangeEnd?e.max:e.rangeEnd;return this.axis&&null!=n&&"dataMax"!==n&&"function"!=typeof n&&!R(n)&&(n=this.axis.scale.parse(n)),n},getNeedCrossZero:function(){var t=this.option;return null==t.rangeStart&&null==t.rangeEnd&&!t.scale},getCoordSysModel:$,setRange:function(t,e){this.option.rangeStart=t,this.option.rangeEnd=e},resetRange:function(){this.option.rangeStart=this.option.rangeEnd=null}},ig=wl.extend({type:"cartesian2dAxis",axis:null,init:function(){ig.superApply(this,"init",arguments),this.resetRange()},mergeOption:function(){ig.superApply(this,"mergeOption",arguments),this.resetRange()},restoreData:function(){ig.superApply(this,"restoreData",arguments),this.resetRange()},getCoordSysModel:function(){return this.ecModel.queryComponents({mainType:"grid",index:this.option.gridIndex,id:this.option.gridId})[0]}});function rg(t,e){return e.type||(e.data?"category":"value")}f(ig.prototype,ng);var ag={offset:0};function og(t,e){return t.getCoordSysModel()===e}function sg(t,e,n){this._coordsMap={},this._coordsList=[],this._axesMap={},this._axesList=[],this._initCartesian(t,e,n),this.model=t}tg("x",ig,rg,ag),tg("y",ig,rg,ag),wl.extend({type:"grid",dependencies:["xAxis","yAxis"],layoutMode:"box",coordinateSystem:null,defaultOption:{show:!1,zlevel:0,z:0,left:"10%",top:60,right:"10%",bottom:60,containLabel:!1,backgroundColor:"rgba(0,0,0,0)",borderWidth:1,borderColor:"#ccc"}});var lg=sg.prototype;function hg(t,e,n,i){n.getAxesOnZeroOf=function(){return r?[r]:[]};var r,a=t[e],o=n.model,s=o.get("axisLine.onZero"),l=o.get("axisLine.onZeroAxisIndex");if(s){if(null!=l)ug(a[l])&&(r=a[l]);else for(var h in a)if(a.hasOwnProperty(h)&&ug(a[h])&&!i[u(a[h])]){r=a[h];break}r&&(i[u(r)]=!0)}function u(t){return t.dim+"_"+t.index}}function ug(t){return t&&"category"!==t.type&&"time"!==t.type&&function(t){var e=t.scale.getExtent(),n=e[0],i=e[1];return!(0<n&&0<i||n<0&&i<0)}(t)}lg.type="grid",lg.axisPointerEnabled=!0,lg.getRect=function(){return this._rect},lg.update=function(t,e){var n=this._axesMap;this._updateScale(t,this.model),D(n.x,function(t){Pp(t.scale,t.model)}),D(n.y,function(t){Pp(t.scale,t.model)});var i={};D(n.x,function(t){hg(n,"y",t,i)}),D(n.y,function(t){hg(n,"x",t,i)}),this.resize(this.model,e)},lg.resize=function(t,e,n){var r=pl(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()});this._rect=r;var i=this._axesList;function a(){D(i,function(t){var e=t.isHorizontal(),n=e?[0,r.width]:[0,r.height],i=t.inverse?1:0;t.setExtent(n[i],n[1-i]),function(t,e){var n=t.getExtent(),i=n[0]+n[1];t.toGlobalCoord="x"===t.dim?function(t){return t+e}:function(t){return i-t+e},t.toLocalCoord="x"===t.dim?function(t){return t-e}:function(t){return i-t+e}}(t,e?r.x:r.y)})}a(),!n&&t.get("containLabel")&&(D(i,function(t){if(!t.model.get("axisLabel.inside")){var e=function(t){var e=t.model,n=t.scale;if(e.get("axisLabel.show")&&!n.isBlank()){var i,r,a="category"===t.type,o=n.getExtent();r=a?n.count():(i=n.getTicks()).length;var s,l,h,u,c,d,f,p,g,v=t.getLabelModel(),m=Op(t),y=1;40<r&&(y=Math.ceil(r/40));for(var _=0;_<r;_+=y){var x=m(i?i[_]:o[0]+_),w=v.getTextRect(x),b=(l=w,h=v.get("rotate")||0,void 0,u=h*Math.PI/180,c=l.plain(),d=c.width,f=c.height,p=d*Math.cos(u)+f*Math.sin(u),g=d*Math.sin(u)+f*Math.cos(u),new $e(c.x,c.y,p,g));s?s.union(b):s=b}return s}}(t);if(e){var n=t.isHorizontal()?"height":"width",i=t.model.get("axisLabel.margin");r[n]-=e[n]+i,"top"===t.position?r.y+=e.height+i:"left"===t.position&&(r.x+=e.width+i)}}}),a())},lg.getAxis=function(t,e){var n=this._axesMap[t];if(null!=n){if(null==e)for(var i in n)if(n.hasOwnProperty(i))return n[i];return n[e]}},lg.getAxes=function(){return this._axesList.slice()},lg.getCartesian=function(t,e){if(null!=t&&null!=e){var n="x"+t+"y"+e;return this._coordsMap[n]}O(t)&&(e=t.yAxisIndex,t=t.xAxisIndex);for(var i=0,r=this._coordsList;i<r.length;i++)if(r[i].getAxis("x").index===t||r[i].getAxis("y").index===e)return r[i]},lg.getCartesians=function(){return this._coordsList.slice()},lg.convertToPixel=function(t,e,n){var i=this._findConvertTarget(t,e);return i.cartesian?i.cartesian.dataToPoint(n):i.axis?i.axis.toGlobalCoord(i.axis.dataToCoord(n)):null},lg.convertFromPixel=function(t,e,n){var i=this._findConvertTarget(t,e);return i.cartesian?i.cartesian.pointToData(n):i.axis?i.axis.coordToData(i.axis.toLocalCoord(n)):null},lg._findConvertTarget=function(t,e){var n,i,r=e.seriesModel,a=e.xAxisModel||r&&r.getReferringComponents("xAxis")[0],o=e.yAxisModel||r&&r.getReferringComponents("yAxis")[0],s=e.gridModel,l=this._coordsList;if(r)g(l,n=r.coordinateSystem)<0&&(n=null);else if(a&&o)n=this.getCartesian(a.componentIndex,o.componentIndex);else if(a)i=this.getAxis("x",a.componentIndex);else if(o)i=this.getAxis("y",o.componentIndex);else if(s){s.coordinateSystem===this&&(n=this._coordsList[0])}return{cartesian:n,axis:i}},lg.containPoint=function(t){var e=this._coordsList[0];if(e)return e.containPoint(t)},lg._initCartesian=function(o,t,e){var s={left:!1,right:!1,top:!1,bottom:!1},l={x:{},y:{}},h={x:0,y:0};if(t.eachComponent("xAxis",n("x"),this),t.eachComponent("yAxis",n("y"),this),!h.x||!h.y)return this._axesMap={},void(this._axesList=[]);function n(a){return function(t,e){if(og(t,o)){var n=t.get("position");"x"===a?"top"!==n&&"bottom"!==n&&(n=s.bottom?"top":"bottom"):"left"!==n&&"right"!==n&&(n=s.left?"right":"left"),s[n]=!0;var i=new Kp(a,function(t,e){if(e=e||t.get("type"))switch(e){case"category":return new $f(t.getOrdinalMeta?t.getOrdinalMeta():t.getCategories(),[1/0,-1/0]);case"value":return new np;default:return(Xf.getClass(e)||np).create(t)}}(t),[0,0],t.get("type"),n),r="category"===i.type;i.onBand=r&&t.get("boundaryGap"),i.inverse=t.get("inverse"),(t.axis=i).model=t,i.grid=this,i.index=e,this._axesList.push(i),l[a][e]=i,h[a]++}}}D((this._axesMap=l).x,function(r,a){D(l.y,function(t,e){var n="x"+a+"y"+e,i=new zp(n);i.grid=this,i.model=o,this._coordsMap[n]=i,this._coordsList.push(i),i.addAxis(r),i.addAxis(t)},this)},this)},lg._updateScale=function(l,h){function u(e,n){D(e.mapDimension(n.dim,!0),function(t){n.scale.unionExtentFromData(e,function(t,e){return Yd(t,e)?t.getCalculationInfo("stackResultDimension"):e}(e,t))})}D(this._axesList,function(t){t.scale.setExtent(1/0,-1/0)}),l.eachSeries(function(t){if(fg(t)){var e=dg(t,l),n=e[0],i=e[1];if(!og(n,h)||!og(i,h))return;var r=this.getCartesian(n.componentIndex,i.componentIndex),a=t.getData(),o=r.getAxis("x"),s=r.getAxis("y");"list"===a.type&&(u(a,o,t),u(a,s,t))}},this)},lg.getTooltipAxes=function(i){var r=[],a=[];return D(this.getCartesians(),function(t){var e=null!=i&&"auto"!==i?t.getAxis(i):t.getBaseAxis(),n=t.getOtherAxis(e);g(r,e)<0&&r.push(e),g(a,n)<0&&a.push(n)}),{baseAxes:r,otherAxes:a}};var cg=["xAxis","yAxis"];function dg(e){return A(cg,function(t){return e.getReferringComponents(t)[0]})}function fg(t){return"cartesian2d"===t.get("coordinateSystem")}sg.create=function(i,r){var a=[];return i.eachComponent("grid",function(t,e){var n=new sg(t,i,r);n.name="grid_"+e,n.resize(t,r,!0),t.coordinateSystem=n,a.push(n)}),i.eachSeries(function(t){if(fg(t)){var e=dg(t),n=e[0],i=e[1],r=n.getCoordSysModel().coordinateSystem;t.coordinateSystem=r.getCartesian(n.componentIndex,i.componentIndex)}}),a},sg.dimensions=sg.prototype.dimensions=zp.prototype.dimensions,Ql.register("cartesian2d",sg);function pg(t,e){this.opt=e,this.axisModel=t,k(e,{labelOffset:0,nameDirection:1,tickDirection:1,labelDirection:1,silent:!0}),this.group=new Ke;var n=new Ke({position:e.position.slice(),rotation:e.rotation});n.updateTransform(),this._transform=n.transform,this._dumbGroup=n}var gg=Math.PI;pg.prototype={constructor:pg,hasBuilder:function(t){return!!vg[t]},add:function(t){vg[t].call(this)},getGroup:function(){return this.group}};var vg={axisLine:function(){var a=this.opt,t=this.axisModel;if(t.get("axisLine.show")){var e=this.axisModel.axis.getExtent(),n=this._transform,o=[e[0],0],i=[e[1],0];n&&(st(o,o,n),st(i,i,n));var s=S({lineCap:"round"},t.getModel("axisLine.lineStyle").getLineStyle());this.group.add(new So({anid:"line",subPixelOptimize:!0,shape:{x1:o[0],y1:o[1],x2:i[0],y2:i[1]},style:s,strokeContainThreshold:a.strokeContainThreshold||5,silent:!0,z2:1}));var l=t.get("axisLine.symbol"),r=t.get("axisLine.symbolSize"),h=t.get("axisLine.symbolOffset")||0;if("number"==typeof h&&(h=[h,h]),null!=l){"string"==typeof l&&(l=[l,l]),"string"!=typeof r&&"number"!=typeof r||(r=[r,r]);var u=r[0],c=r[1];D([{rotate:a.rotation+Math.PI/2,offset:h[0],r:0},{rotate:a.rotation-Math.PI/2,offset:h[1],r:Math.sqrt((o[0]-i[0])*(o[0]-i[0])+(o[1]-i[1])*(o[1]-i[1]))}],function(t,e){if("none"!==l[e]&&null!=l[e]){var n=nf(l[e],-u/2,-c/2,u,c,s.stroke,!0),i=t.r+t.offset,r=[o[0]+i*Math.cos(a.rotation),o[1]-i*Math.sin(a.rotation)];n.attr({rotation:t.rotate,position:r,silent:!0,z2:11}),this.group.add(n)}},this)}}},axisTickLabel:function(){var t=this.axisModel,e=this.opt,n=function(t,e,n){var i=e.axis,r=e.getModel("axisTick");if(!r.get("show")||i.scale.isBlank())return;for(var a=r.getModel("lineStyle"),o=n.tickDirection*r.get("length"),s=Sg(i.getTicksCoords(),t._transform,o,k(a.getLineStyle(),{stroke:e.get("axisLine.lineStyle.color")}),"ticks"),l=0;l<s.length;l++)t.group.add(s[l]);return s}(this,t,e);!function(t,e,n){if(Np(t.axis))return;var i=t.get("axisLabel.showMinLabel"),r=t.get("axisLabel.showMaxLabel");n=n||[];var a=(e=e||[])[0],o=e[1],s=e[e.length-1],l=e[e.length-2],h=n[0],u=n[1],c=n[n.length-1],d=n[n.length-2];!1===i?(xg(a),xg(h)):wg(a,o)&&(i?(xg(o),xg(u)):(xg(a),xg(h)));!1===r?(xg(s),xg(c)):wg(l,s)&&(r?(xg(l),xg(d)):(xg(s),xg(c)))}(t,function(h,u,c){var d=u.axis;if(!z(c.axisLabelShow,u.get("axisLabel.show"))||d.scale.isBlank())return;var f=u.getModel("axisLabel"),p=f.get("margin"),t=d.getViewLabels(),e=(z(c.labelRotate,f.get("rotate"))||0)*gg/180,g=yg(c.rotation,e,c.labelDirection),v=u.getCategories&&u.getCategories(!0),m=[],y=_g(u),_=u.get("triggerEvent");return D(t,function(t,e){var n=t.tickValue,i=t.formattedLabel,r=t.rawLabel,a=f;v&&v[n]&&v[n].textStyle&&(a=new Rs(v[n].textStyle,f,u.ecModel));var o=a.getTextColor()||u.get("axisLine.lineStyle.color"),s=[d.dataToCoord(n),c.labelOffset+c.labelDirection*p],l=new ao({anid:"label_"+n,position:s,rotation:g.rotation,silent:y,z2:10});vs(l.style,a,{text:i,textAlign:a.getShallow("align",!0)||g.textAlign,textVerticalAlign:a.getShallow("verticalAlign",!0)||a.getShallow("baseline",!0)||g.textVerticalAlign,textFill:"function"==typeof o?o("category"===d.type?r:"value"===d.type?n+"":n,e):o}),_&&(l.eventData=mg(u),l.eventData.targetType="axisLabel",l.eventData.value=r),h._dumbGroup.add(l),l.updateTransform(),m.push(l),h.group.add(l),l.decomposeTransform()}),m}(this,t,e),n),function(t,e,n){var i=e.axis,r=e.getModel("minorTick");if(!r.get("show")||i.scale.isBlank())return;var a=i.getMinorTicksCoords();if(!a.length)return;for(var o=r.getModel("lineStyle"),s=n.tickDirection*r.get("length"),l=k(o.getLineStyle(),k(e.getModel("axisTick").getLineStyle(),{stroke:e.get("axisLine.lineStyle.color")})),h=0;h<a.length;h++)for(var u=Sg(a[h],t._transform,s,l,"minorticks_"+h),c=0;c<u.length;c++)t.group.add(u[c])}(this,t,e)},axisName:function(){var t=this.opt,e=this.axisModel,n=z(t.axisName,e.get("name"));if(n){var i,r,a=e.get("nameLocation"),o=t.nameDirection,s=e.getModel("nameTextStyle"),l=e.get("nameGap")||0,h=this.axisModel.axis.getExtent(),u=h[0]>h[1]?-1:1,c=["start"===a?h[0]-u*l:"end"===a?h[1]+u*l:(h[0]+h[1])/2,bg(a)?t.labelOffset+o*l:0],d=e.get("nameRotate");null!=d&&(d=d*gg/180),bg(a)?i=yg(t.rotation,null!=d?d:t.rotation,o):(i=function(t,e,n,i){var r,a,o=qs(n-t.rotation),s=i[0]>i[1],l="start"===e&&!s||"start"!==e&&s;r=js(o-gg/2)?(a=l?"bottom":"top","center"):js(o-1.5*gg)?(a=l?"top":"bottom","center"):(a="middle",o<1.5*gg&&gg/2<o?l?"left":"right":l?"right":"left");return{rotation:o,textAlign:r,textVerticalAlign:a}}(t,a,d||0,h),null!=(r=t.axisNameAvailableWidth)&&(r=Math.abs(r/Math.sin(i.rotation)),isFinite(r)||(r=null)));var f=s.getFont(),p=e.get("nameTruncate",!0)||{},g=p.ellipsis,v=z(t.nameTruncateMaxWidth,p.maxWidth,r),m=null!=g&&null!=v?hl(n,v,f,g,{minChar:2,placeholder:p.placeholder}):n,y=e.get("tooltip",!0),_=e.mainType,x={componentType:_,name:n,$vars:["name"]};x[_+"Index"]=e.componentIndex;var w=new ao({anid:"name",__fullText:n,__truncatedText:m,position:c,rotation:i.rotation,silent:_g(e),z2:1,tooltip:y&&y.show?S({content:n,formatter:function(){return n},formatterParams:x},y):null});vs(w.style,s,{text:m,textFont:f,textFill:s.getTextColor()||e.get("axisLine.lineStyle.color"),textAlign:s.get("align")||i.textAlign,textVerticalAlign:s.get("verticalAlign")||i.textVerticalAlign}),e.get("triggerEvent")&&(w.eventData=mg(e),w.eventData.targetType="axisName",w.eventData.name=n),this._dumbGroup.add(w),w.updateTransform(),this.group.add(w),w.decomposeTransform()}}},mg=pg.makeAxisEventDataBase=function(t){var e={componentType:t.mainType,componentIndex:t.componentIndex};return e[t.mainType+"Index"]=t.componentIndex,e},yg=pg.innerTextLayout=function(t,e,n){var i,r=qs(e-t);return{rotation:r,textAlign:js(r)?(i=0<n?"top":"bottom","center"):js(r-gg)?(i=0<n?"bottom":"top","center"):(i="middle",0<r&&r<gg?0<n?"right":"left":0<n?"left":"right"),textVerticalAlign:i}};var _g=pg.isLabelSilent=function(t){var e=t.get("tooltip");return t.get("silent")||!(t.get("triggerEvent")||e&&e.show)};function xg(t){t&&(t.ignore=!0)}function wg(t,e){var n=t&&t.getBoundingRect().clone(),i=e&&e.getBoundingRect().clone();if(n&&i){var r=Wt([]);return Xt(r,r,-t.rotation),n.applyTransform(Ht([],r,t.getLocalTransform())),i.applyTransform(Ht([],r,e.getLocalTransform())),n.intersect(i)}}function bg(t){return"middle"===t||"center"===t}function Sg(t,e,n,i,r){for(var a=[],o=[],s=[],l=0;l<t.length;l++){var h=t[l].coord;o[0]=h,s[o[1]=0]=h,s[1]=n,e&&(st(o,o,e),st(s,s,e));var u=new So({anid:r+"_"+t[l].tickValue,subPixelOptimize:!0,shape:{x1:o[0],y1:o[1],x2:s[0],y2:s[1]},style:i,z2:2,silent:!0});a.push(u)}return a}function Mg(t){var e=(t.ecModel.getComponent("axisPointer")||{}).coordSysAxesInfo;return e&&e.axesInfo[function(t){return t.type+"||"+t.id}(t)]}var Ig=ld({type:"axis",_axisPointer:null,axisPointerClass:null,render:function(t,e,n,i){this.axisPointerClass&&function(t){var e=Mg(t);if(e){var n=e.axisPointerModel,i=e.axis.scale,r=n.option,a=n.get("status"),o=n.get("value");null!=o&&(o=i.parse(o));var s=function(t){return!!t.get("handle.show")}(n);null==a&&(r.status=s?"show":"hide");var l=i.getExtent().slice();l[0]>l[1]&&l.reverse(),(null==o||o>l[1])&&(o=l[1]),o<l[0]&&(o=l[0]),r.value=o,s&&(r.status=e.axis.scale.isBlank()?"hide":"show")}}(t),Ig.superApply(this,"render",arguments),Tg(this,t,e,n,i,!0)},updateAxisPointer:function(t,e,n,i,r){Tg(this,t,e,n,i,!1)},remove:function(t,e){var n=this._axisPointer;n&&n.remove(e),Ig.superApply(this,"remove",arguments)},dispose:function(t,e){Cg(this,e),Ig.superApply(this,"dispose",arguments)}});function Tg(t,e,n,i,r,a){var o=Ig.getAxisPointerClass(t.axisPointerClass);if(o){var s=function(t){var e=Mg(t);return e&&e.axisPointerModel}(e);s?(t._axisPointer||(t._axisPointer=new o)).render(e,s,i,a):Cg(t,i)}}function Cg(t,e,n){var i=t._axisPointer;i&&i.dispose(e,n),t._axisPointer=null}var kg=[];Ig.registerAxisPointerClass=function(t,e){kg[t]=e},Ig.getAxisPointerClass=function(t){return t&&kg[t]};var Dg,Ag,Lg,Pg=["axisLine","axisTickLabel","axisName"],Og=["splitArea","splitLine","minorSplitLine"],Eg=Ig.extend({type:"cartesianAxis",axisPointerClass:"CartesianAxisPointer",render:function(e,t,n,i){this.group.removeAll();var r=this._axisGroup;if(this._axisGroup=new Ke,this.group.add(this._axisGroup),e.get("show")){var a=e.getCoordSysModel(),o=function(t,e,n){n=n||{};var i=t.coordinateSystem,r=e.axis,a={},o=r.getAxesOnZeroOf()[0],s=r.position,l=o?"onZero":s,h=r.dim,u=i.getRect(),c=[u.x,u.x+u.width,u.y,u.y+u.height],d={left:0,right:1,top:0,bottom:1,onZero:2},f=e.get("offset")||0,p="x"===h?[c[2]-f,c[3]+f]:[c[0]-f,c[1]+f];if(o){var g=o.toGlobalCoord(o.dataToCoord(0));p[d.onZero]=Math.max(Math.min(g,p[1]),p[0])}a.position=["y"===h?p[d[l]]:c[0],"x"===h?p[d[l]]:c[3]],a.rotation=Math.PI/2*("x"===h?0:1),a.labelDirection=a.tickDirection=a.nameDirection={top:-1,bottom:1,left:-1,right:1}[s],a.labelOffset=o?p[d[s]]-p[d.onZero]:0,e.get("axisTick.inside")&&(a.tickDirection=-a.tickDirection),z(n.labelInside,e.get("axisLabel.inside"))&&(a.labelDirection=-a.labelDirection);var v=e.get("axisLabel.rotate");return a.labelRotate="top"===l?-v:v,a.z2=1,a}(a,e),s=new pg(e,o);D(Pg,s.add,s),this._axisGroup.add(s.getGroup()),D(Og,function(t){e.get(t+".show")&&this["_"+t](e,a)},this),Cs(r,this._axisGroup,e),Eg.superCall(this,"render",e,t,n,i)}},remove:function(){!function(t){t.__splitAreaColors=null}(this)},_splitLine:function(t,e){var n=t.axis;if(!n.scale.isBlank()){var i=t.getModel("splitLine"),r=i.getModel("lineStyle"),a=r.get("color");a=L(a)?a:[a];for(var o=e.coordinateSystem.getRect(),s=n.isHorizontal(),l=0,h=n.getTicksCoords({tickModel:i}),u=[],c=[],d=r.getLineStyle(),f=0;f<h.length;f++){var p=n.toGlobalCoord(h[f].coord);s?(u[0]=p,u[1]=o.y,c[0]=p,c[1]=o.y+o.height):(u[0]=o.x,u[1]=p,c[0]=o.x+o.width,c[1]=p);var g=l++%a.length,v=h[f].tickValue;this._axisGroup.add(new So({anid:null!=v?"line_"+h[f].tickValue:null,subPixelOptimize:!0,shape:{x1:u[0],y1:u[1],x2:c[0],y2:c[1]},style:k({stroke:a[g]},d),silent:!0}))}}},_minorSplitLine:function(t,e){var n=t.axis,i=t.getModel("minorSplitLine").getModel("lineStyle"),r=e.coordinateSystem.getRect(),a=n.isHorizontal(),o=n.getMinorTicksCoords();if(o.length)for(var s=[],l=[],h=i.getLineStyle(),u=0;u<o.length;u++)for(var c=0;c<o[u].length;c++){var d=n.toGlobalCoord(o[u][c].coord);a?(s[0]=d,s[1]=r.y,l[0]=d,l[1]=r.y+r.height):(s[0]=r.x,s[1]=d,l[0]=r.x+r.width,l[1]=d),this._axisGroup.add(new So({anid:"minor_line_"+o[u][c].tickValue,subPixelOptimize:!0,shape:{x1:s[0],y1:s[1],x2:l[0],y2:l[1]},style:h,silent:!0}))}},_splitArea:function(t,e){!function(t,e,n,i){var r=n.axis;if(!r.scale.isBlank()){var a=n.getModel("splitArea"),o=a.getModel("areaStyle"),s=o.get("color"),l=i.coordinateSystem.getRect(),h=r.getTicksCoords({tickModel:a,clamp:!0});if(h.length){var u=s.length,c=t.__splitAreaColors,d=Z(),f=0;if(c)for(var p=0;p<h.length;p++){var g=c.get(h[p].tickValue);if(null!=g){f=(g+(u-1)*p)%u;break}}var v=r.toGlobalCoord(h[0].coord),m=o.getAreaStyle();s=L(s)?s:[s];for(p=1;p<h.length;p++){var y,_,x,w,b=r.toGlobalCoord(h[p].coord);v=r.isHorizontal()?(y=v,_=l.y,x=b-y,w=l.height,y+x):(y=l.x,_=v,x=l.width,_+(w=b-_));var S=h[p-1].tickValue;null!=S&&d.set(S,f),e.add(new wo({anid:null!=S?"area_"+S:null,shape:{x:y,y:_,width:x,height:w},style:k({fill:s[f]},m),silent:!0})),f=(f+1)%u}t.__splitAreaColors=d}}}(this,this._axisGroup,t,e)}});function Ng(t,e){"outside"===t.textPosition&&(t.textPosition=e)}Eg.extend({type:"xAxis"}),Eg.extend({type:"yAxis"}),ld({type:"grid",render:function(t,e){this.group.removeAll(),t.get("show")&&this.group.add(new wo({shape:t.coordinateSystem.getRect(),style:k({fill:t.get("backgroundColor")},t.getItemStyle()),silent:!0,z2:-1}))}}),ed(function(t){t.xAxis&&t.yAxis&&!t.grid&&(t.grid={})}),ad((Ag="circle",Lg=Dg="line",{seriesType:Dg,performRawSeries:!0,reset:function(h,t,e){var n=h.getData(),u=h.get("symbol"),c=h.get("symbolSize"),i=h.get("symbolKeepAspect"),d=h.get("symbolRotate"),f=T(u),p=T(c),g=T(d),v=f||p||g,r=!f&&u?u:Ag,a=p?null:c;if(n.setVisual({legendSymbol:Lg||r,symbol:r,symbolSize:a,symbolKeepAspect:i,symbolRotate:d}),!t.isSeriesFiltered(h))return{dataEach:n.hasItemOption||v?function(t,e){if(v){var n=h.getRawValue(e),i=h.getDataParams(e);f&&t.setItemVisual(e,"symbol",u(n,i)),p&&t.setItemVisual(e,"symbolSize",c(n,i)),g&&t.setItemVisual(e,"symbolRotate",d(n,i))}if(t.hasItemOption){var r=t.getItemModel(e),a=r.getShallow("symbol",!0),o=r.getShallow("symbolSize",!0),s=r.getShallow("symbolRotate",!0),l=r.getShallow("symbolKeepAspect",!0);null!=a&&t.setItemVisual(e,"symbol",a),null!=o&&t.setItemVisual(e,"symbolSize",o),null!=s&&t.setItemVisual(e,"symbolRotate",s),null!=l&&t.setItemVisual(e,"symbolKeepAspect",l)}}:null}}})),rd({seriesType:"line",plan:su(),reset:function(t){var e=t.getData(),c=t.coordinateSystem,d=t.pipelineContext.large;if(c){var f=A(c.dimensions,function(t){return e.mapDimension(t)}).slice(0,2),p=f.length,n=e.getCalculationInfo("stackResultDimension");return Yd(e,f[0])&&(f[0]=n),Yd(e,f[1])&&(f[1]=n),p&&{progress:function(t,e){for(var n=t.end-t.start,i=d&&new Float32Array(n*p),r=t.start,a=0,o=[],s=[];r<t.end;r++){var l;if(1===p){var h=e.get(f[0],r);l=!isNaN(h)&&c.dataToPoint(h,null,s)}else{h=o[0]=e.get(f[0],r);var u=o[1]=e.get(f[1],r);l=!isNaN(h)&&!isNaN(u)&&c.dataToPoint(o,null,s)}d?(i[a++]=l?l[0]:NaN,i[a++]=l?l[1]:NaN):e.setItemLayout(r,l&&l.slice()||[NaN,NaN])}d&&e.setLayout("symbolPoints",i)}}}}}),nd(pc.PROCESSOR.STATISTIC,{seriesType:"line",modifyOutputEnd:!0,reset:function(t,e,n){var i=t.getData(),r=t.get("sampling"),a=t.coordinateSystem;if("cartesian2d"===a.type&&r){var o,s=a.getBaseAxis(),l=a.getOtherAxis(s),h=s.getExtent(),u=h[1]-h[0],c=Math.round(i.count()/u);1<c&&("string"==typeof r?o=Gf[r]:"function"==typeof r&&(o=r),o&&t.setData(i.downSample(i.mapDimension(l.dim),1/c,o,Hf)))}}}),Kh.extend({type:"series.__base_bar__",getInitialData:function(t,e){return qd(this.getSource(),this,{useEncodeDefaulter:!0})},getMarkerPosition:function(t){var e=this.coordinateSystem;if(e){var n=e.dataToPoint(e.clampData(t)),i=this.getData(),r=i.getLayout("offset"),a=i.getLayout("size");return n[e.getBaseAxis().isHorizontal()?0:1]+=r+a/2,n}return[NaN,NaN]},defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,barMinHeight:0,barMinAngle:0,large:!1,largeThreshold:400,progressive:3e3,progressiveChunkMode:"mod",itemStyle:{},emphasis:{}}}).extend({type:"series.bar",dependencies:["grid","polar"],brushSelector:"rect",getProgressive:function(){return!!this.get("large")&&this.get("progressive")},getProgressiveThreshold:function(){var t=this.get("progressiveThreshold"),e=this.get("largeThreshold");return t<e&&(t=e),t},defaultOption:{clip:!0,roundCap:!1,showBackground:!1,backgroundStyle:{color:"rgba(180, 180, 180, 0.2)",borderColor:null,borderWidth:0,borderType:"solid",borderRadius:0,shadowBlur:0,shadowColor:null,shadowOffsetX:0,shadowOffsetY:0,opacity:1}}});var Bg=Mr([["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["stroke","barBorderColor"],["lineWidth","barBorderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]),Rg={getBarItemStyle:function(t){var e=Bg(this,t);if(this.getBorderLineDash){var n=this.getBorderLineDash();n&&(e.lineDash=n)}return e}},zg=Go({type:"sausage",shape:{cx:0,cy:0,r0:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},buildPath:function(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r0||0,0),a=Math.max(e.r,0),o=.5*(a-r),s=r+o,l=e.startAngle,h=e.endAngle,u=e.clockwise,c=Math.cos(l),d=Math.sin(l),f=Math.cos(h),p=Math.sin(h);(u?h-l<2*Math.PI:l-h<2*Math.PI)&&(t.moveTo(c*r+n,d*r+i),t.arc(c*s+n,d*s+i,o,-Math.PI+l,l,!u)),t.arc(n,i,a,l,h,!u),t.moveTo(f*a+n,p*a+i),t.arc(f*s+n,p*s+i,o,h-2*Math.PI,h-Math.PI,!u),0!==r&&(t.arc(n,i,r,h,l,u),t.moveTo(c*r+n,p*r+i)),t.closePath()}}),Fg=["itemStyle","barBorderWidth"],Vg=[0,0];S(Rs.prototype,Rg),ud({type:"bar",render:function(t,e,n){this._updateDrawMode(t);var i=t.get("coordinateSystem");return"cartesian2d"!==i&&"polar"!==i||(this._isLargeDraw?this._renderLarge(t,e,n):this._renderNormal(t,e,n)),this.group},incrementalPrepareRender:function(t,e,n){this._clear(),this._updateDrawMode(t)},incrementalRender:function(t,e,n,i){this._incrementalRenderLarge(t,e)},_updateDrawMode:function(t){var e=t.pipelineContext.large;(null==this._isLargeDraw||e^this._isLargeDraw)&&(this._isLargeDraw=e,this._clear())},_renderNormal:function(s,t,e){var l,h=this.group,u=s.getData(),c=this._data,d=s.coordinateSystem,n=d.getBaseAxis();"cartesian2d"===d.type?l=n.isHorizontal():"polar"===d.type&&(l="angle"===n.dim);var f=s.isAnimationEnabled()?s:null,p=s.get("clip",!0),g=function(t,e){var n=t.getArea&&t.getArea();if("cartesian2d"===t.type){var i=t.getBaseAxis();if("category"!==i.type||!i.onBand){var r=e.getLayout("bandWidth");i.isHorizontal()?(n.x-=r,n.width+=2*r):(n.y-=r,n.height+=2*r)}}return n}(d,u);h.removeClipPath();var v=s.get("roundCap",!0),m=s.get("showBackground",!0),y=s.getModel("backgroundStyle"),_=y.get("barBorderRadius")||0,x=[],w=this._backgroundEls||[];u.diff(c).add(function(t){var e=u.getItemModel(t),n=qg[d.type](u,t,e);if(m){var i=qg[d.type](u,t),r=function(t,e,n){return new("polar"===t.type?ho:wo)({shape:Jg(e,n,t),silent:!0,z2:0})}(d,l,i);r.useStyle(y.getBarItemStyle()),"cartesian2d"===d.type&&r.setShape("r",_),x[t]=r}if(u.hasValue(t)){if(p)if(Gg[d.type](g,n))return void h.remove(a);var a=Xg[d.type](t,n,l,f,!1,v);u.setItemGraphicEl(t,a),h.add(a),Zg(a,u,t,e,n,s,l,"polar"===d.type)}}).update(function(t,e){var n=u.getItemModel(t),i=qg[d.type](u,t,n);if(m){var r=w[e];r.useStyle(y.getBarItemStyle()),"cartesian2d"===d.type&&r.setShape("r",_),x[t]=r;var a=qg[d.type](u,t);Ms(r,{shape:Jg(l,a,d)},f,t)}var o=c.getItemGraphicEl(e);if(u.hasValue(t)){if(p)if(Gg[d.type](g,i))return void h.remove(o);o?Ms(o,{shape:i},f,t):o=Xg[d.type](t,i,l,f,!0,v),u.setItemGraphicEl(t,o),h.add(o),Zg(o,u,t,n,i,s,l,"polar"===d.type)}else h.remove(o)}).remove(function(t){var e=c.getItemGraphicEl(t);"cartesian2d"===d.type?e&&Ug(t,f,e):e&&Yg(t,f,e)}).execute();var i=this._backgroundGroup||(this._backgroundGroup=new Ke);i.removeAll();for(var r=0;r<x.length;++r)i.add(x[r]);h.add(i),this._backgroundEls=x,this._data=u},_renderLarge:function(t,e,n){this._clear(),Kg(t,this.group);var i=t.get("clip",!0)?function(t,e,n){return t?"polar"===t.type?Nf(t,e,n):"cartesian2d"===t.type?Ef(t,e,n):null:null}(t.coordinateSystem,!1,t):null;i?this.group.setClipPath(i):this.group.removeClipPath()},_incrementalRenderLarge:function(t,e){this._removeBackground(),Kg(e,this.group,!0)},dispose:$,remove:function(t){this._clear(t)},_clear:function(e){var t=this.group,n=this._data;e&&e.get("animation")&&n&&!this._isLargeDraw?(this._removeBackground(),this._backgroundEls=[],n.eachItemGraphicEl(function(t){"sector"===t.type?Yg(t.dataIndex,e,t):Ug(t.dataIndex,e,t)})):t.removeAll(),this._data=null},_removeBackground:function(){this.group.remove(this._backgroundGroup),this._backgroundGroup=null}});var Wg=Math.max,Hg=Math.min,Gg={cartesian2d:function(t,e){var n=e.width<0?-1:1,i=e.height<0?-1:1;n<0&&(e.x+=e.width,e.width=-e.width),i<0&&(e.y+=e.height,e.height=-e.height);var r=Wg(e.x,t.x),a=Hg(e.x+e.width,t.x+t.width),o=Wg(e.y,t.y),s=Hg(e.y+e.height,t.y+t.height);e.x=r,e.y=o,e.width=a-r,e.height=s-o;var l=e.width<0||e.height<0;return n<0&&(e.x+=e.width,e.width=-e.width),i<0&&(e.y+=e.height,e.height=-e.height),l},polar:function(t){return!1}},Xg={cartesian2d:function(t,e,n,i,r){var a=new wo({shape:S({},e),z2:1});if(a.name="item",i){var o=n?"height":"width",s={};a.shape[o]=0,s[o]=e[o],As[r?"updateProps":"initProps"](a,{shape:s},i,t)}return a},polar:function(t,e,n,i,r,a){var o=e.startAngle<e.endAngle,s=new(!n&&a?zg:ho)({shape:k({clockwise:o},e),z2:1});if(s.name="item",i){var l=n?"r":"endAngle",h={};s.shape[l]=n?0:e.startAngle,h[l]=e[l],As[r?"updateProps":"initProps"](s,{shape:h},i,t)}return s}};function Ug(t,e,n){n.style.text=null,Ms(n,{shape:{width:0}},e,t,function(){n.parent&&n.parent.remove(n)})}function Yg(t,e,n){n.style.text=null,Ms(n,{shape:{r:n.shape.r0}},e,t,function(){n.parent&&n.parent.remove(n)})}var qg={cartesian2d:function(t,e,n){var i=t.getItemLayout(e),r=n?function(t,e){var n=t.get(Fg)||0,i=isNaN(e.width)?Number.MAX_VALUE:Math.abs(e.width),r=isNaN(e.height)?Number.MAX_VALUE:Math.abs(e.height);return Math.min(n,i,r)}(n,i):0,a=0<i.width?1:-1,o=0<i.height?1:-1;return{x:i.x+a*r/2,y:i.y+o*r/2,width:i.width-a*r,height:i.height-o*r}},polar:function(t,e,n){var i=t.getItemLayout(e);return{cx:i.cx,cy:i.cy,r0:i.r0,r:i.r,startAngle:i.startAngle,endAngle:i.endAngle}}};function jg(t){return null!=t.startAngle&&null!=t.endAngle&&t.startAngle===t.endAngle}function Zg(t,e,n,i,r,a,o,s){var l=e.getItemVisual(n,"color"),h=e.getItemVisual(n,"opacity"),u=e.getVisual("borderColor"),c=i.getModel("itemStyle"),d=i.getModel("emphasis.itemStyle").getBarItemStyle();s||t.setShape("r",c.get("barBorderRadius")||0),t.useStyle(k({stroke:jg(r)?"none":u,fill:jg(r)?"none":l,opacity:h},c.getBarItemStyle()));var f=i.getShallow("cursor");f&&t.attr("cursor",f);o?r.height:r.width;s||function(t,e,n,i,r,a){gs(t,e,n.getModel("label"),n.getModel("emphasis.label"),{labelFetcher:r,labelDataIndex:a,defaultText:rf(r.getData(),a),isRectText:!0,autoColor:i}),Ng(t),Ng(e)}(t.style,d,i,l,a,n),jg(r)&&(d.fill=d.stroke="none"),cs(t,d)}var $g=Wa.extend({type:"largeBar",shape:{points:[]},buildPath:function(t,e){for(var n=e.points,i=this.__startPoint,r=this.__baseDimIdx,a=0;a<n.length;a+=2)i[r]=n[a+r],t.moveTo(i[0],i[1]),t.lineTo(n[a],n[a+1])}});function Kg(t,e,n){var i=t.getData(),r=[],a=i.getLayout("valueAxisHorizontal")?1:0;r[1-a]=i.getLayout("valueAxisStart");var o=i.getLayout("largeDataIndices"),s=i.getLayout("barWidth"),l=t.getModel("backgroundStyle");if(t.get("showBackground",!0)){var h=i.getLayout("largeBackgroundPoints"),u=[];u[1-a]=i.getLayout("backgroundStart");var c=new $g({shape:{points:h},incremental:!!n,__startPoint:u,__baseDimIdx:a,__largeDataIndices:o,__barWidth:s,silent:!0,z2:0});!function(t,e,n){var i=e.get("borderColor")||e.get("color"),r=e.getItemStyle(["color","borderColor"]);t.useStyle(r),t.style.fill=null,t.style.stroke=i,t.style.lineWidth=n.getLayout("barWidth")}(c,l,i),e.add(c)}var d=new $g({shape:{points:i.getLayout("largePoints")},incremental:!!n,__startPoint:r,__baseDimIdx:a,__largeDataIndices:o,__barWidth:s});e.add(d),function(t,e,n){var i=n.getVisual("borderColor")||n.getVisual("color"),r=e.getModel("itemStyle").getItemStyle(["color","borderColor"]);t.useStyle(r),t.style.fill=null,t.style.stroke=i,t.style.lineWidth=n.getLayout("barWidth")}(d,t,i),d.seriesIndex=t.seriesIndex,t.get("silent")||(d.on("mousedown",Qg),d.on("mousemove",Qg))}var Qg=mu(function(t){var e=function(t,e,n){var i=t.__baseDimIdx,r=1-i,a=t.shape.points,o=t.__largeDataIndices,s=Math.abs(t.__barWidth/2),l=t.__startPoint[r];Vg[0]=e,Vg[1]=n;for(var h=Vg[i],u=Vg[1-i],c=h-s,d=h+s,f=0,p=a.length/2;f<p;f++){var g=2*f,v=a[g+i],m=a[g+r];if(c<=v&&v<=d&&(l<=m?l<=u&&u<=m:m<=u&&u<=l))return o[f]}return-1}(this,t.offsetX,t.offsetY);this.dataIndex=0<=e?e:null},30,!1);function Jg(t,e,n){var i,r="polar"===n.type;return i=r?n.getArea():n.grid.getRect(),r?{cx:i.cx,cy:i.cy,r0:t?i.r0:e.r0,r:t?i.r:e.r,startAngle:t?e.startAngle:0,endAngle:t?e.endAngle:2*Math.PI}:{x:t?e.x:i.x,y:t?i.y:e.y,width:t?e.width:i.width,height:t?i.height:e.height}}rd(pc.VISUAL.LAYOUT,I(function(t,e){var n=sp(t,e),T=lp(n),C={};D(n,function(t){var e=t.getData(),n=t.coordinateSystem,i=n.getBaseAxis(),r=ap(t),a=T[op(i)][r],o=a.offset,s=a.width,l=n.getOtherAxis(i),h=t.get("barMinHeight")||0;C[r]=C[r]||[],e.setLayout({bandWidth:a.bandWidth,offset:o,size:s});for(var u=e.mapDimension(l.dim),c=e.mapDimension(i.dim),d=Yd(e,u),f=l.isHorizontal(),p=fp(i,l,d),g=0,v=e.count();g<v;g++){var m,y,_,x,w,b=e.get(u,g),S=e.get(c,g),M=0<=b?"p":"n",I=p;if(d&&(C[r][S]||(C[r][S]={p:p,n:p}),I=C[r][S][M]),f)m=I,y=(w=n.dataToPoint([b,S]))[1]+o,_=w[0]-p,x=s,Math.abs(_)<h&&(_=(_<0?-1:1)*h),isNaN(_)||d&&(C[r][S][M]+=_);else m=(w=n.dataToPoint([S,b]))[0]+o,y=I,_=s,x=w[1]-p,Math.abs(x)<h&&(x=(x<=0?-1:1)*h),isNaN(x)||d&&(C[r][S][M]+=x);e.setItemLayout(g,{x:m,y:y,width:_,height:x})}},this)},"bar")),rd(pc.VISUAL.PROGRESSIVE_LAYOUT,up),ad({seriesType:"bar",reset:function(t){t.getData().setVisual("legendSymbol","roundRect")}});var tv={updateSelectedMap:function(t){this._targetList=L(t)?t.slice():[],this._selectTargetMap=M(t||[],function(t,e){return t.set(e.name,e),t},Z())},select:function(t,e){var n=null!=e?this._targetList[e]:this._selectTargetMap.get(t);"single"===this.get("selectedMode")&&this._selectTargetMap.each(function(t){t.selected=!1}),n&&(n.selected=!0)},unSelect:function(t,e){var n=null!=e?this._targetList[e]:this._selectTargetMap.get(t);n&&(n.selected=!1)},toggleSelected:function(t,e){var n=null!=e?this._targetList[e]:this._selectTargetMap.get(t);if(null!=n)return this[n.selected?"unSelect":"select"](t,e),n.selected},isSelected:function(t,e){var n=null!=e?this._targetList[e]:this._selectTargetMap.get(t);return n&&n.selected}};function ev(n,e){this.getAllNames=function(){var t=e();return t.mapArray(t.getName)},this.containName=function(t){return 0<=e().indexOfName(t)},this.indexOfName=function(t){return n().indexOfName(t)},this.getItemVisual=function(t,e){return n().getItemVisual(t,e)}}var nv=hd({type:"series.pie",init:function(t){nv.superApply(this,"init",arguments),this.legendVisualProvider=new ev(w(this.getData,this),w(this.getRawData,this)),this.updateSelectedMap(this._createSelectableList()),this._defaultLabelLine(t)},mergeOption:function(t){nv.superCall(this,"mergeOption",t),this.updateSelectedMap(this._createSelectableList())},getInitialData:function(t,e){return function(t,e,n){e=L(e)&&{coordDimensions:e}||S({},e);var i=t.getSource(),r=Hd(i,e),a=new Cd(r,t);return a.initData(i,n),a}(this,{coordDimensions:["value"],encodeDefaulter:I(Hl,this)})},_createSelectableList:function(){for(var t=this.getRawData(),e=t.mapDimension("value"),n=[],i=0,r=t.count();i<r;i++)n.push({name:t.getName(i),value:t.get(e,i),selected:Eh(t,i,"selected")});return n},getDataParams:function(t){var e=this.getData(),n=nv.superCall(this,"getDataParams",t),i=[];return e.each(e.mapDimension("value"),function(t){i.push(t)}),n.percent=function(t,e,n){if(!t[e])return 0;var i=M(t,function(t,e){return t+(isNaN(e)?0:e)},0);if(0===i)return 0;for(var r=Math.pow(10,n),a=A(t,function(t){return(isNaN(t)?0:t)/i*r*100}),o=100*r,s=A(a,function(t){return Math.floor(t)}),l=M(s,function(t,e){return t+e},0),h=A(a,function(t,e){return t-s[e]});l<o;){for(var u=Number.NEGATIVE_INFINITY,c=null,d=0,f=h.length;d<f;++d)h[d]>u&&(u=h[d],c=d);++s[c],h[c]=0,++l}return s[e]/r}(i,t,e.hostModel.get("percentPrecision")),n.$vars.push("percent"),n},_defaultLabelLine:function(t){ir(t,"labelLine",["show"]);var e=t.labelLine,n=t.emphasis.labelLine;e.show=e.show&&t.label.show,n.show=n.show&&t.emphasis.label.show},defaultOption:{zlevel:0,z:2,legendHoverLink:!0,hoverAnimation:!0,center:["50%","50%"],radius:[0,"75%"],clockwise:!0,startAngle:90,minAngle:0,minShowLabelAngle:0,selectedOffset:10,hoverOffset:10,avoidLabelOverlap:!0,percentPrecision:2,stillShowZeroSum:!0,left:0,top:0,right:0,bottom:0,width:null,height:null,label:{rotate:!1,show:!0,position:"outer",alignTo:"none",margin:"25%",bleedMargin:10,distanceToLabelLine:5},labelLine:{show:!0,length:15,length2:15,smooth:!1,lineStyle:{width:1,type:"solid"}},itemStyle:{borderWidth:1},animationType:"expansion",animationTypeUpdate:"transition",animationEasing:"cubicOut"}});function iv(t,e,n,i){var r=e.getData(),a=this.dataIndex,o=r.getName(a),s=e.get("selectedOffset");i.dispatchAction({type:"pieToggleSelect",from:t,name:o,seriesId:e.id}),r.each(function(t){rv(r.getItemGraphicEl(t),r.getItemLayout(t),e.isSelected(r.getName(t)),s,n)})}function rv(t,e,n,i,r){var a=(e.startAngle+e.endAngle)/2,o=n?i:0,s=[Math.cos(a)*o,Math.sin(a)*o];r?t.animate().when(200,{position:s}).start("bounceOut"):t.attr("position",s)}function av(t,e){Ke.call(this);var n=new ho({z2:2}),i=new go,r=new ao;this.add(n),this.add(i),this.add(r),this.updateData(t,e,!0)}_(nv,tv);var ov=av.prototype;ov.updateData=function(t,e,n){var i=this.childAt(0),r=this.childAt(1),a=this.childAt(2),o=t.hostModel,s=t.getItemModel(e),l=t.getItemLayout(e),h=S({},l);h.label=null;var u=o.getShallow("animationTypeUpdate");n?(i.setShape(h),"scale"===o.getShallow("animationType")?(i.shape.r=l.r0,Is(i,{shape:{r:l.r}},o,e)):(i.shape.endAngle=l.startAngle,Ms(i,{shape:{endAngle:l.endAngle}},o,e))):"expansion"===u?i.setShape(h):Ms(i,{shape:h},o,e);var c=t.getItemVisual(e,"color");i.useStyle(k({lineJoin:"bevel",fill:c},s.getModel("itemStyle").getItemStyle())),i.hoverStyle=s.getModel("emphasis.itemStyle").getItemStyle();var d=s.getShallow("cursor");d&&i.attr("cursor",d),rv(this,t.getItemLayout(e),o.isSelected(t.getName(e)),o.get("selectedOffset"),o.get("animation"));var f=!n&&"transition"===u;this._updateLabel(t,e,f),this.highDownOnUpdate=o.get("silent")?null:function(t,e){var n=o.isAnimationEnabled()&&s.get("hoverAnimation");"emphasis"===e?(r.ignore=r.hoverIgnore,a.ignore=a.hoverIgnore,n&&(i.stopAnimation(!0),i.animateTo({shape:{r:l.r+o.get("hoverOffset")}},300,"elasticOut"))):(r.ignore=r.normalIgnore,a.ignore=a.normalIgnore,n&&(i.stopAnimation(!0),i.animateTo({shape:{r:l.r}},300,"elasticOut")))},cs(this)},ov._updateLabel=function(t,e,n){var i=this.childAt(1),r=this.childAt(2),a=t.hostModel,o=t.getItemModel(e),s=t.getItemLayout(e).label,l=t.getItemVisual(e,"color");if(!s||isNaN(s.x)||isNaN(s.y))r.ignore=r.normalIgnore=r.hoverIgnore=i.ignore=i.normalIgnore=i.hoverIgnore=!0;else{var h={points:s.linePoints||[[s.x,s.y],[s.x,s.y],[s.x,s.y]]},u={x:s.x,y:s.y};n?(Ms(i,{shape:h},a,e),Ms(r,{style:u},a,e)):(i.attr({shape:h}),r.attr({style:u})),r.attr({rotation:s.rotation,origin:[s.x,s.y],z2:10});var c=o.getModel("label"),d=o.getModel("emphasis.label"),f=o.getModel("labelLine"),p=o.getModel("emphasis.labelLine");l=t.getItemVisual(e,"color");gs(r.style,r.hoverStyle={},c,d,{labelFetcher:t.hostModel,labelDataIndex:e,defaultText:s.text,autoColor:l,useInsideStyle:!!s.inside},{textAlign:s.textAlign,textVerticalAlign:s.verticalAlign,opacity:t.getItemVisual(e,"opacity")}),r.ignore=r.normalIgnore=!c.get("show"),r.hoverIgnore=!d.get("show"),i.ignore=i.normalIgnore=!f.get("show"),i.hoverIgnore=!p.get("show"),i.setStyle({stroke:l,opacity:t.getItemVisual(e,"opacity")}),i.setStyle(f.getModel("lineStyle").getLineStyle()),i.hoverStyle=p.getModel("lineStyle").getLineStyle();var g=f.get("smooth");g&&!0===g&&(g=.4),i.setShape({smooth:g})}},y(av,Ke);uu.extend({type:"pie",init:function(){var t=new Ke;this._sectorGroup=t},render:function(t,e,n,i){if(!i||i.from!==this.uid){var r=t.getData(),a=this._data,o=this.group,s=e.get("animation"),l=!a,h=t.get("animationType"),u=t.get("animationTypeUpdate"),c=I(iv,this.uid,t,s,n),d=t.get("selectedMode");if(r.diff(a).add(function(t){var e=new av(r,t);l&&"scale"!==h&&e.eachChild(function(t){t.stopAnimation(!0)}),d&&e.on("click",c),r.setItemGraphicEl(t,e),o.add(e)}).update(function(t,e){var n=a.getItemGraphicEl(e);l||"transition"===u||n.eachChild(function(t){t.stopAnimation(!0)}),n.updateData(r,t),n.off("click"),d&&n.on("click",c),o.add(n),r.setItemGraphicEl(t,n)}).remove(function(t){var e=a.getItemGraphicEl(t);o.remove(e)}).execute(),s&&0<r.count()&&(l?"scale"!==h:"transition"!==u)){for(var f=r.getItemLayout(0),p=1;isNaN(f.startAngle)&&p<r.count();++p)f=r.getItemLayout(p);var g=Math.max(n.getWidth(),n.getHeight())/2,v=w(o.removeClipPath,o);o.setClipPath(this._createClipPath(f.cx,f.cy,g,f.startAngle,f.clockwise,v,t,l))}else o.removeClipPath();this._data=r}},dispose:function(){},_createClipPath:function(t,e,n,i,r,a,o,s){var l=new ho({shape:{cx:t,cy:e,r0:0,r:n,startAngle:i,endAngle:i,clockwise:r}});return(s?Is:Ms)(l,{shape:{endAngle:i+(r?1:-1)*Math.PI*2}},o,a),l},containPoint:function(t,e){var n=e.getData().getItemLayout(0);if(n){var i=t[0]-n.cx,r=t[1]-n.cy,a=Math.sqrt(i*i+r*r);return a<=n.r&&a>=n.r0}}});var sv=Math.PI/180;function lv(r,t,e,n,i,a,o,s,l,h){function u(t,e,n){for(var i=t;i<e&&!(r[i].y+n>l+o);i++)if(r[i].y+=n,t<i&&i+1<e&&r[i+1].y>r[i].y+r[i].height)return void c(i,n/2);c(e-1,n/2)}function c(t,e){for(var n=t;0<=n&&!(r[n].y-e<l)&&(r[n].y-=e,!(0<n&&r[n].y>r[n-1].y+r[n-1].height));n--);}function d(t,e,n,i,r,a){for(var o=e?Number.MAX_VALUE:0,s=0,l=t.length;s<l;s++)if("none"===t[s].labelAlignTo){var h=Math.abs(t[s].y-i),u=t[s].len,c=t[s].len2,d=h<r+u?Math.sqrt((r+u+c)*(r+u+c)-h*h):Math.abs(t[s].x-n);e&&o<=d&&(d=o-10),!e&&d<=o&&(d=o+10),t[s].x=n+d*a,o=d}}r.sort(function(t,e){return t.y-e.y});for(var f,p=0,g=r.length,v=[],m=[],y=0;y<g;y++){if("outer"===r[y].position&&"labelLine"===r[y].labelAlignTo){var _=r[y].x-h;r[y].linePoints[1][0]+=_,r[y].x=h}(f=r[y].y-p)<0&&u(y,g,-f),p=r[y].y+r[y].height}o-p<0&&c(g-1,p-o);for(y=0;y<g;y++)r[y].y>=e?m.push(r[y]):v.push(r[y]);d(v,!1,t,e,n,i),d(m,!0,t,e,n,i)}function hv(t){return"center"===t.position}function uv(A,L,P,t,O,e){var E,N,B=A.getData(),R=[],z=!1,F=(A.get("minShowLabelAngle")||0)*sv;B.each(function(t){var e=B.getItemLayout(t),n=B.getItemModel(t),i=n.getModel("label"),r=i.get("position")||n.get("emphasis.label.position"),a=i.get("distanceToLabelLine"),o=i.get("alignTo"),s=Xs(i.get("margin"),P),l=i.get("bleedMargin"),h=i.getFont(),u=n.getModel("labelLine"),c=u.get("length");c=Xs(c,P);var d=u.get("length2");if(d=Xs(d,P),!(e.angle<F)){var f,p,g,v,m=(e.startAngle+e.endAngle)/2,y=Math.cos(m),_=Math.sin(m);E=e.cx,N=e.cy;var x,w=A.getFormattedLabel(t,"normal")||B.getName(t),b=Rn(w,h,v,"top"),S="inside"===r||"inner"===r;if("center"===r)f=e.cx,p=e.cy,v="center";else{var M=(S?(e.r+e.r0)/2*y:e.r*y)+E,I=(S?(e.r+e.r0)/2*_:e.r*_)+N;if(f=M+3*y,p=I+3*_,!S){var T=M+y*(c+L-e.r),C=I+_*(c+L-e.r),k=T+(y<0?-1:1)*d;f="edge"===o?y<0?O+s:O+P-s:k+(y<0?-a:a),g=[[M,I],[T,C],[k,p=C]]}v=S?"center":"edge"===o?0<y?"right":"left":0<y?"left":"right"}var D=i.get("rotate");x="number"==typeof D?D*(Math.PI/180):D?y<0?-m+Math.PI:-m:0,z=!!x,e.label={x:f,y:p,position:r,height:b.height,len:c,len2:d,linePoints:g,textAlign:v,verticalAlign:"middle",rotation:x,inside:S,labelDistance:a,labelAlignTo:o,labelMargin:s,bleedMargin:l,textRect:b,text:w,font:h},S||R.push(e.label)}}),!z&&A.get("avoidLabelOverlap")&&function(t,e,n,i,r,a,o,s){for(var l=[],h=[],u=Number.MAX_VALUE,c=-Number.MAX_VALUE,d=0;d<t.length;d++)hv(t[d])||(t[d].x<e?(u=Math.min(u,t[d].x),l.push(t[d])):(c=Math.max(c,t[d].x),h.push(t[d])));for(lv(h,e,n,i,1,0,a,0,s,c),lv(l,e,n,i,-1,0,a,0,s,u),d=0;d<t.length;d++){var f=t[d];if(!hv(f)){var p=f.linePoints;if(p){var g,v="edge"===f.labelAlignTo,m=f.textRect.width;(g=v?f.x<e?p[2][0]-f.labelDistance-o-f.labelMargin:o+r-f.labelMargin-p[2][0]-f.labelDistance:f.x<e?f.x-o-f.bleedMargin:o+r-f.x-f.bleedMargin)<f.textRect.width&&(f.text=Wn(f.text,g,f.font),"edge"===f.labelAlignTo&&(m=Bn(f.text,f.font)));var y=p[1][0]-p[2][0];v?f.x<e?p[2][0]=o+f.labelMargin+m+f.labelDistance:p[2][0]=o+r-f.labelMargin-m-f.labelDistance:(f.x<e?p[2][0]=f.x+f.labelDistance:p[2][0]=f.x-f.labelDistance,p[1][0]=p[2][0]+y),p[1][1]=p[2][1]=f.y}}}}(R,E,N,L,P,t,O,e)}var cv=2*Math.PI,dv=Math.PI/180;var fv,pv;fv="pie",D([{type:"pieToggleSelect",event:"pieselectchanged",method:"toggleSelected"},{type:"pieSelect",event:"pieselected",method:"select"},{type:"pieUnSelect",event:"pieunselected",method:"unSelect"}],function(a){a.update="updateView",id(a,function(t,e){var r={};return e.eachComponent({mainType:"series",subType:fv,query:t},function(n){n[a.method]&&n[a.method](t.name,t.dataIndex);var i=n.getData();i.each(function(t){var e=i.getName(t);r[e]=n.isSelected(e)||!1})}),{name:t.name,selected:r,seriesId:t.seriesId}})}),ad((pv="pie",{getTargetSeries:function(t){var e={},n=Z();return t.eachSeriesByType(pv,function(t){t.__paletteScope=e,n.set(t.uid,t)}),n},reset:function(s,t){var l=s.getRawData(),h={},u=s.getData();u.each(function(t){var e=u.getRawIndex(t);h[e]=t}),l.each(function(t){var e,n=h[t],i=null!=n&&u.getItemVisual(n,"color",!0),r=null!=n&&u.getItemVisual(n,"borderColor",!0);if(i&&r||(e=l.getItemModel(t)),!i){var a=e.get("itemStyle.color")||s.getColorFromPalette(l.getName(t)||t+"",s.__paletteScope,l.count());null!=n&&u.setItemVisual(n,"color",a)}if(!r){var o=e.get("itemStyle.borderColor");null!=n&&u.setItemVisual(n,"borderColor",o)}})}})),rd(I(function(t,e,C,n){e.eachSeriesByType(t,function(t){var r=t.getData(),e=r.mapDimension("value"),a=function(t,e){return pl(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()})}(t,C),n=t.get("center"),i=t.get("radius");L(i)||(i=[0,i]),L(n)||(n=[n,n]);var o=Xs(a.width,C.getWidth()),s=Xs(a.height,C.getHeight()),l=Math.min(o,s),h=Xs(n[0],o)+a.x,u=Xs(n[1],s)+a.y,c=Xs(i[0],l/2),d=Xs(i[1],l/2),f=-t.get("startAngle")*dv,p=t.get("minAngle")*dv,g=0;r.each(e,function(t){isNaN(t)||g++});var v=r.getSum(e),m=Math.PI/(v||g)*2,y=t.get("clockwise"),_=t.get("roseType"),x=t.get("stillShowZeroSum"),w=r.getDataExtent(e);w[0]=0;var b=cv,S=0,M=f,I=y?1:-1;if(r.each(e,function(t,e){var n;if(isNaN(t))r.setItemLayout(e,{angle:NaN,startAngle:NaN,endAngle:NaN,clockwise:y,cx:h,cy:u,r0:c,r:_?NaN:d,viewRect:a});else{(n="area"!==_?0===v&&x?m:t*m:cv/g)<p?b-=n=p:S+=t;var i=M+I*n;r.setItemLayout(e,{angle:n,startAngle:M,endAngle:i,clockwise:y,cx:h,cy:u,r0:c,r:_?Gs(t,w,[c,d]):d,viewRect:a}),M=i}}),b<cv&&g)if(b<=.001){var T=cv/g;r.each(e,function(t,e){if(!isNaN(t)){var n=r.getItemLayout(e);n.angle=T,n.startAngle=f+I*e*T,n.endAngle=f+I*(e+1)*T}})}else m=b/S,M=f,r.each(e,function(t,e){if(!isNaN(t)){var n=r.getItemLayout(e),i=n.angle===p?p:t*m;n.startAngle=M,n.endAngle=M+I*i,M+=I*i}});uv(t,d,a.width,a.height,a.x,a.y)})},"pie")),nd({seriesType:"pie",reset:function(t,e){var i=e.findComponents({mainType:"legend"});if(i&&i.length){var r=t.getData();r.filterSelf(function(t){for(var e=r.getName(t),n=0;n<i.length;n++)if(!i[n].isSelected(e))return!1;return!0})}}}),t.version="4.8.0",t.dependencies={zrender:"4.3.1"},t.PRIORITY=pc,t.init=function(t,e,n){var i=Jc(t);if(i)return i;var r=new xc(t,e,n);return r.id="ec_"+jc++,Yc[r.id]=r,pr(t,$c,r.id),function(i){var r="__connectUpdateStatus";function a(t,e){for(var n=0;n<t.length;n++){t[n][r]=e}}uc(Fc,function(t,e){i._messageCenter.on(e,function(t){if(qc[i.group]&&0!==i[r]){if(t&&t.escapeConnect)return;var e=i.makeActionFromEvent(t),n=[];uc(Yc,function(t){t!==i&&t.group===i.group&&n.push(t)}),a(n,0),uc(n,function(t){1!==t[r]&&t.dispatchAction(e)}),a(n,2)}})})}(r),r},t.connect=function(e){if(L(e)){var t=e;e=null,uc(t,function(t){null!=t.group&&(e=t.group)}),e=e||"g_"+Zc++,uc(t,function(t){t.group=e})}return qc[e]=!0,e},t.disConnect=Kc,t.disconnect=Qc,t.dispose=function(t){"string"==typeof t?t=Yc[t]:t instanceof xc||(t=Jc(t)),t instanceof xc&&!t.isDisposed()&&t.dispose()},t.getInstanceByDom=Jc,t.getInstanceById=function(t){return Yc[t]},t.registerTheme=td,t.registerPreprocessor=ed,t.registerProcessor=nd,t.registerPostUpdate=function(t){Hc.push(t)},t.registerAction=id,t.registerCoordinateSystem=function(t,e){Ql.register(t,e)},t.getCoordinateSystemDimensions=function(t){var e=Ql.get(t);if(e)return e.getDimensionsInfo?e.getDimensionsInfo():e.dimensions.slice()},t.registerLayout=rd,t.registerVisual=ad,t.registerLoading=sd,t.extendComponentModel=function(t){return wl.extend(t)},t.extendComponentView=ld,t.extendSeriesModel=hd,t.extendChartView=ud,t.setCanvasCreator=function(t){!function(t,e){"createCanvas"===t&&(p=null),a[t]=e}("createCanvas",t)},t.registerMap=function(t,e,n){oc(t,e,n)},t.getMap=function(t){var e=sc(t);return e&&e[0]&&{geoJson:e[0].geoJSON,specialAreas:e[0].specialAreas}},t.dataTool={}});


/***/ }),
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class WxCanvas {
  constructor(ctx, canvasId) {
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;

    WxCanvas.initStyle(ctx);
    this.initEvent();
  }

  getContext(contextType) {
    return contextType === '2d' ? this.ctx : null;
  }

  setChart(chart) {
    this.chart = chart;
  }

  attachEvent() {
    // noop
  }

  detachEvent() {
    // noop
  }

  static initStyle(ctx) {
    const styles = ['fillStyle', 'strokeStyle', 'globalAlpha',
      'textAlign', 'textBaseAlign', 'shadow', 'lineWidth',
      'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'];

    styles.forEach((style) => {
      Object.defineProperty(ctx, style, {
        set: (value) => {
          if ((style !== 'fillStyle' && style !== 'strokeStyle')
            || (value !== 'none' && value !== null)
          ) {
            ctx[`set${style.charAt(0).toUpperCase()}${style.slice(1)}`](value);
          }
        },
      });
    });

    ctx.createRadialGradient = () => ctx.createCircularGradient(arguments);
  }

  initEvent() {
    this.event = {};
    const eventNames = [{
      wxName: 'touchStart',
      ecName: 'mousedown',
    }, {
      wxName: 'touchMove',
      ecName: 'mousemove',
    }, {
      wxName: 'touchEnd',
      ecName: 'mouseup',
    }, {
      wxName: 'touchEnd',
      ecName: 'click',
    }];

    eventNames.forEach((name) => {
      this.event[name.wxName] = (e) => {
        const touch = e.mp.touches[0];
        this.chart._zr.handler.dispatch(name.ecName, {
          zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
          zrY: name.wxName === 'tap' ? touch.clientY : touch.y,
        });
      };
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WxCanvas;



/***/ }),
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "CKdetailsHeader",
  props: {
    page: {
      type: String
    },
    data: {
      type: Object
    },
    corpid: {
      type: String
    },
    loginUserid: {
      type: String
    }
  },
  methods: {
    modifyTask: function modifyTask() {
      var that = this;
      that.$emit("modifyTask");
    }
  }
});

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.corpid && _vm.data.userid) ? _c('div', {
    staticClass: "details-header-container"
  }, [_c('section', {
    staticClass: "task-detail-header"
  }, [_c('p', {
    staticClass: "task-detail-name"
  }, [_vm._v(_vm._s(_vm.data.task_name))]), _vm._v(" "), (_vm.loginUserid === _vm.data.userid && _vm.page !== 'review_details') ? _c('p', {
    staticClass: "task-detail-modify",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.modifyTask
    }
  }, [_vm._v("\n      修改考核目标")]) : _vm._e()], 1), _vm._v(" "), _c('section', {
    staticClass: "task-detail-created-user"
  }, [_vm._v("\n    目标创建人：\n    "), _c('ww-open-data', {
    attrs: {
      "corpid": _vm.corpid,
      "openid": _vm.data.userid,
      "type": "userName",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-left": "10px"
    }
  }, [_vm._v("创建时间：" + _vm._s(_vm.data.start_date))])], 1)], 1) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-845778b0", esExports)
  }
}

/***/ }),
/* 203 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "CKdetailsContent",
  components: { CKtitleNotice: __WEBPACK_IMPORTED_MODULE_0__components_CK_title_notice_CKtitleNotice__["a" /* default */] },
  props: {
    data: Object
  }

});

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "details-content-container"
  }, [_c('CKtitleNotice', {
    attrs: {
      "ord-message": "考核描述",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('section', {
    staticClass: "task-detail-content"
  }, [_vm._v(_vm._s(_vm.data.describe))])], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-bce43424", esExports)
  }
}

/***/ }),
/* 206 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "CKdetailsDisagree",
  props: {
    data: Array,
    corpid: String
  }
});

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "details-disagree-container"
  }, _vm._l((_vm.data), function(item, index) {
    return _c('section', {
      key: index,
      staticClass: "task-detail-disagree"
    }, [_c('div', {
      staticClass: "task-detail-disagree-title disagree-active",
      staticStyle: {
        "display": "flex"
      }
    }, [_c('span', [_vm._v(_vm._s(item.type === 2 ? "审查人" : "执行人"))]), _vm._v("\n      \"\n      "), _c('ww-open-data', {
      attrs: {
        "corpid": _vm.corpid,
        "openid": item.userid,
        "type": "userName",
        "mpcomid": '0_' + index
      }
    }), _vm._v("\n      \"\n      "), _c('span', [_vm._v("的驳回消息")])], 1), _vm._v(" "), _c('div', {
      staticClass: "task-detail-disagree-content disagree-active"
    }, [_vm._v("\n      " + _vm._s(item.inner_data) + "\n    ")])])
  }))
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6b8832b9", esExports)
  }
}

/***/ }),
/* 209 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "CKdetailsDate",
  components: { CKtitleNotice: __WEBPACK_IMPORTED_MODULE_0__components_CK_title_notice_CKtitleNotice__["a" /* default */] },
  props: {
    data: Object
  }
});

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "details-doing-container"
  }, [_c('CKtitleNotice', {
    attrs: {
      "ord-message": "执行日期",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('section', {
    staticClass: "task-detail-date"
  }, [_c('div', {
    staticClass: "date"
  }, [_c('p', {
    staticClass: "date-miaoshu"
  }, [_vm._v("开时时间：")]), _vm._v(" "), _c('p', {
    staticClass: "date-value"
  }, [_vm._v(_vm._s(_vm.data.start_date))])], 1), _vm._v(" "), _c('div', {
    staticClass: "date"
  }, [_c('p', {
    staticClass: "date-miaoshu"
  }, [_vm._v("结束时间：")]), _vm._v(" "), _c('p', {
    staticClass: "date-value"
  }, [_vm._v(_vm._s(_vm.data.end_date))])], 1)])], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-175b85ee", esExports)
  }
}

/***/ }),
/* 212 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "CKdetailsUserList",
  components: { CKtitleNotice: __WEBPACK_IMPORTED_MODULE_0__components_CK_title_notice_CKtitleNotice__["a" /* default */] },
  props: {
    data: Array,
    title: String
  }
});

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "details-review-container"
  }, [_c('CKtitleNotice', {
    attrs: {
      "ord-message": _vm.title,
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('section', {
    staticClass: "task-detail-user"
  }, _vm._l((_vm.data), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "task-detail-user-item"
    }, [_c('img', {
      staticClass: "task-detail-user-photo",
      attrs: {
        "src": item.avatar,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "task-detail-user-status"
    }, [(item.attachinfo_of_task.task_icon_status === 1) ? _c('icon', {
      attrs: {
        "type": "info",
        "color": "#ffc300",
        "size": "16"
      }
    }) : _vm._e(), _vm._v(" "), (item.attachinfo_of_task.task_icon_status === 2) ? _c('icon', {
      attrs: {
        "type": "waiting",
        "size": "16"
      }
    }) : _vm._e(), _vm._v(" "), (item.attachinfo_of_task.task_icon_status === 3) ? _c('icon', {
      attrs: {
        "type": "info",
        "color": "red",
        "size": "16"
      }
    }) : _vm._e(), _vm._v(" "), (item.attachinfo_of_task.task_icon_status === 4) ? _c('icon', {
      attrs: {
        "type": "success",
        "size": "16"
      }
    }) : _vm._e()], 1)])
  }))], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-f8ac7d38", esExports)
  }
}

/***/ }),
/* 215 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "CKdetailsOperatButton",
  props: {
    data: Object,
    loginUserid: String,
    buttonStatus: Number,
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "确认"
    }
  },
  methods: {
    cancel: function cancel() {
      var that = this;
      that.$emit("cancel");
    },
    confirm: function confirm() {
      var that = this;
      that.$emit("confirm");
    }
  }
});

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "details-button-container"
  }, [(_vm.loginUserid !== _vm.data.userid) ? _c('section', {
    staticClass: "task-detail-operat"
  }, [(_vm.buttonStatus === 1 || _vm.buttonStatus === 2) ? _c('button', {
    staticClass: "task-detail-operat-no",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.cancel
    }
  }, [_vm._v("\n      " + _vm._s(_vm.cancelText) + "\n    ")]) : _vm._e(), _vm._v(" "), (_vm.buttonStatus === 1 || _vm.buttonStatus === 3) ? _c('button', {
    staticClass: "task-detail-operat-ok",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.confirm
    }
  }, [_vm._v("\n      " + _vm._s(_vm.confirmText) + "\n    ")]) : _vm._e()], 1) : _vm._e()], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-b9c17524", esExports)
  }
}

/***/ }),
/* 218 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "CKdetailsReviewResult",
  components: { CKtitleNotice: __WEBPACK_IMPORTED_MODULE_0__components_CK_title_notice_CKtitleNotice__["a" /* default */] },
  props: {
    corpid: String,
    data: Array,
    status: Array
  },
  computed: {
    // 处理 小数点 精度问题
    data_: function data_() {
      var that = this;
      that.data.forEach(function (item, index, arr) {
        item.review_result_list.forEach(function (item, index, arr) {
          item.score = parseInt(item.score * 100);
        });
      });
      return that.data;
    }
  }
});

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "details-review-result"
  }, [_c('CKtitleNotice', {
    attrs: {
      "ord-message": "审查结果列表",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('section', {
    staticClass: "task-detail-result"
  }, _vm._l((_vm.data_), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "task-detail-result-item"
    }, [_c('div', {
      staticClass: "task-detail-result-item-title"
    }, [_c('p', {
      staticClass: "task-detail-result-item-title-date"
    }, [_vm._v("审查日：" + _vm._s(item.review_date))]), _vm._v(" "), (_vm.status[index] === 111) ? _c('p', {
      staticClass: "task-detail-result-item-title-status"
    }, [_vm._v("[未审核]")]) : _vm._e(), _vm._v(" "), (_vm.status[index] === 333) ? _c('p', {
      staticClass: "task-detail-result-item-title-status",
      class: _vm.status[index] === 333 ? "k_status_active" : ""
    }, [_vm._v("[扣分]")]) : _vm._e(), _vm._v(" "), (_vm.status[index] === 222) ? _c('p', {
      staticClass: "task-detail-result-item-title-status",
      class: _vm.status[index] === 222 ? "wk_status_active" : ""
    }, [_vm._v("[未扣分]")]) : _vm._e()], 1), _vm._v(" "), _vm._l((item.review_result_list), function(it, ind) {
      return _c('div', {
        key: ind,
        staticClass: "task-detail-result-item-details"
      }, [_c('p', {
        staticStyle: {
          "display": "flex"
        }
      }, [_c('ww-open-data', {
        attrs: {
          "corpid": _vm.corpid,
          "openid": it.userid,
          "type": "userName",
          "mpcomid": '1_' + index + '-' + ind
        }
      }), _vm._v("\n          给\n          "), (it.executor_userid !== it.userid) ? _c('span', [_c('ww-open-data', {
        attrs: {
          "corpid": _vm.corpid,
          "openid": it.executor_userid,
          "type": "userName",
          "mpcomid": '2_' + index + '-' + ind
        }
      })], 1) : _c('span', [_vm._v("自己")]), _vm._v("评" + _vm._s(it.score) + "分\n        ")], 1), _vm._v(" "), _c('p', {
        staticStyle: {
          "padding-left": "10px"
        }
      }, [_vm._v("备注：" + _vm._s(it.comment))])], 1)
    })], 2)
  }))], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a2f34f20", esExports)
  }
}

/***/ }),
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(260);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
]);