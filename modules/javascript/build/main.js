
  /**
   *    ______________________________ ________________                                         _____        _____
   *    __  ____ _<  /__  /__(_)__  /_______/_/_____(_)_____ ___   _______ _______________________(_)_________  /_
   *    _  / __ `/_  /__  /__  /__  __ ___/_/ _____  /_  __ `/_ | / /  __ `/_  ___/  ___/_  ___/_  /___  __   __/
   *    / / /_/ /_  / _  / _  / _  /_/ /_/_/   ____  / / /_/ /__ |/ // /_/ /_(__  )/ /__ _  /   _  / __  /_/ / /_
   *     __,_/ /_/  /_/  /_/  /_.___//_/     ___  /  __,_/ _____/ __,_/ /____/ ___/ /_/    /_/  _  .___/__/
   *     ____/                                /___/                                                 /_/
   *
   *    release:    https://github.com/1lib/javascript/releases/tag/v1.0.0
   *    copyright:  (c) 2019 kingcc authored & published by GPL3
   */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.lib = {}));
}(this, function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
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
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var placeholder = {
        '@@1lib/placeholder': true,
    };
    function isPlaceHolder(target) {
        return target['@@1lib/placeholder'] === true;
    }

    var ENTRY_CONFIGURATION_PARAM_MODE = {
        PURE: 'PARAM_MODE_PURE',
        OBJECT: 'PARAM_MODE_OBJECT',
    };
    var defaultConfiguration = {
        param: {
            count: Number.MAX_SAFE_INTEGER,
            keys: [],
            mode: ENTRY_CONFIGURATION_PARAM_MODE.PURE,
        },
    };
    var defaultParam = {};
    function getNextAvailableKey(target, defaults) {
        if (defaults === void 0) { defaults = []; }
        var e_1, _a;
        var keys = Object.keys(target);
        try {
            for (var defaults_1 = __values(defaults), defaults_1_1 = defaults_1.next(); !defaults_1_1.done; defaults_1_1 = defaults_1.next()) {
                var defaultKey = defaults_1_1.value;
                if (keys.indexOf(defaultKey) === -1) {
                    return defaultKey;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (defaults_1_1 && !defaults_1_1.done && (_a = defaults_1.return)) _a.call(defaults_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var numberKeys = keys.filter(Boolean).filter(function (key) { return !isNaN(key); });
        return String(Math.max.apply(Math, __spread(numberKeys, [keys.length - 1])) + 1);
    }
    function squash(target) {
        var toReturn = {};
        for (var i in target) {
            if (!target.hasOwnProperty(i))
                continue;
            if (Object.prototype.toString.call(target[i]) === '[object Object]') {
                var flatObject = squash(target[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x))
                        continue;
                    toReturn[i + x.charAt(0).toUpperCase() + x.slice(1)] = flatObject[x];
                }
            }
            else if (Object.prototype.toString.call(target[i]) === '[object Array]') {
                toReturn[i] = Array.apply(void 0, __spread(target[i]));
            }
            else {
                toReturn[i] = target[i];
            }
        }
        return toReturn;
    }
    function Base(fn, config, param) {
        if (config === void 0) { config = {}; }
        if (param === void 0) { param = {}; }
        var entry = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var e_2, _a, e_3, _b, e_4, _c;
            switch (entry._configuration.paramMode) {
                case ENTRY_CONFIGURATION_PARAM_MODE.PURE:
                    var newConfig = __assign({}, entry._configuration);
                    var newParams = __assign({}, entry._params);
                    var insertPlaceHolderCount = 0;
                    try {
                        for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                            var arg = args_1_1.value;
                            var findPlaceHolder = false;
                            var needJumpPlaceHolderCount = insertPlaceHolderCount;
                            try {
                                for (var _d = __values(Object.entries(newParams)), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    var _f = __read(_e.value, 2), key = _f[0], param_1 = _f[1];
                                    if (isPlaceHolder(param_1)) {
                                        if (needJumpPlaceHolderCount-- > 0)
                                            continue;
                                        newParams[key] = arg;
                                        findPlaceHolder = true;
                                        break;
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            if (!findPlaceHolder) {
                                newParams[getNextAvailableKey(newParams, entry._configuration.paramKeys)] = arg;
                            }
                            if (isPlaceHolder(arg)) {
                                insertPlaceHolderCount++;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    var validParamNum = Object.values(newParams).filter(function (param) { return !isPlaceHolder(param); }).length;
                    if (validParamNum >= entry._configuration.paramCount) {
                        return fn(newParams);
                    }
                    else {
                        return Base(fn, newConfig, newParams);
                    }
                case ENTRY_CONFIGURATION_PARAM_MODE.OBJECT:
                    if (args.length !== 1 || (args.length === 1 && !(args[0] instanceof Object && !isPlaceHolder(args[0])))) {
                        var nextAvailableKey_1 = getNextAvailableKey(entry._params);
                        args = [
                            args.reduce(function (res, arg, idx) {
                                var _a;
                                return (__assign({}, res, (_a = {}, _a[nextAvailableKey_1 + idx] = arg, _a)));
                            }, {})
                        ];
                    }
                    var argTotal = __assign({}, entry._params, args[0]);
                    try {
                        for (var _g = __values(Object.entries(argTotal)), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var _j = __read(_h.value, 2), idx = _j[0], param_2 = _j[1];
                            if (isPlaceHolder(param_2)) {
                                delete argTotal[idx];
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    if (Object.keys(argTotal).length >= entry._configuration.paramCount) {
                        return fn(argTotal);
                    }
                    else {
                        return Base(fn, __assign({}, entry._configuration), argTotal);
                    }
                default:
                    break;
            }
        };
        entry._configuration = Object.assign({}, squash(defaultConfiguration), squash(config));
        entry._params = Object.assign({}, defaultParam, param);
        entry.$config = function (config) {
            return Base(fn, __assign({}, entry._configuration, squash(config)), __assign({}, entry._params));
        };
        entry.$inspection = function () {
            var e_5, _a;
            if (entry._configuration.paramMode === ENTRY_CONFIGURATION_PARAM_MODE.OBJECT) {
                try {
                    for (var _b = __values(Object.entries(entry._params)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = __read(_c.value, 2), idx = _d[0], param_3 = _d[1];
                        if (isPlaceHolder(param_3)) {
                            delete entry._params[idx];
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        };
        entry.$done = entry.$execute = function () {
            entry.$inspection();
            return fn(entry._params);
        };
        return entry;
    }

    function accumulate(prop) {
        var type = prop.type;
        var values = Object.values(prop).filter(function (value) { return !isNaN(value); });
        return (new Function('return ' + values.join(type)))();
    }
    var index = Base(accumulate, { param: { keys: ['type'] } });

    exports._ = placeholder;
    exports.accumulate = index;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
