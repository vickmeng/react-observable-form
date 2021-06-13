import React, { useState, useEffect, useContext } from 'react';
import { isEmpty, isEqual } from 'lodash';
import { Subject, merge } from 'rxjs';
import { takeUntil, skipWhile, map } from 'rxjs/operators';

// TODO Array
var formGroupContext = React.createContext(null);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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

var isFieldAsChildAttributes = function (props) {
    return props.name !== undefined;
};
var isGroupAsChildAttributes = function (props) {
    return props.name !== undefined;
};
var getErrorsBy = function (value, validators) {
    var errors = validators.reduce(function (acc, cur) {
        var error = cur(value);
        if (error) {
            acc = __assign(__assign({}, acc), error);
        }
        return acc;
    }, {});
    return isEmpty(errors) ? null : errors;
};

var useSubscribe = function (control, initValue, ObservableInstance) {
    var _a = useState(initValue), value = _a[0], setValue = _a[1];
    useEffect(function () {
        var subscriber = ObservableInstance.subscribe(setValue);
        return function () {
            subscriber.unsubscribe();
        };
    }, [control]);
    return value;
};

var Field = function (props) {
    var children = props.children;
    /**
     * Two and only two way can get formControl,from props or formGroupContext or TODO formArrayContext
     */
    var parentGroup = useContext(formGroupContext);
    var _a = isFieldAsChildAttributes(props)
        ? { name: props.name, control: parentGroup.get(props.name) }
        : { control: props.control }, _b = _a.name, name = _b === void 0 ? undefined : _b, control = _a.control;
    var value = useSubscribe(control, control.value, control.valueChange);
    var enabled = useSubscribe(control, control.enabled, control.enabledChange);
    var valid = useSubscribe(control, control.valid, control.validChange);
    var errors = useSubscribe(control, control.errors, control.errorsChange);
    var childProps = {
        name: name,
        value: value,
        setValue: control.setValue,
        errors: errors,
        disabled: !enabled,
        enabled: enabled,
        valid: valid,
        invalid: !valid,
    };
    return children(childProps);
};

var Group = function (props) {
    var children = props.children;
    var parentGroup = useContext(formGroupContext);
    var _a = isGroupAsChildAttributes(props)
        ? { name: props.name, control: parentGroup.get(props.name) }
        : { control: props.control }, _b = _a.name, name = _b === void 0 ? undefined : _b, control = _a.control;
    var controls = useSubscribe(control, control.controls, control.controlsChange);
    var enabled = useSubscribe(control, control.enabled, control.enabledChange);
    var valid = useSubscribe(control, control.valid, control.validChange);
    var errors = useSubscribe(control, control.errors, control.errorsChange);
    var childProps = {
        name: name,
        enabled: enabled,
        disabled: !enabled,
        errors: errors,
        valid: valid,
        invalid: !valid,
        group: control,
        controls: controls,
    };
    return React.createElement(formGroupContext.Provider, { value: control }, children(childProps));
};

var AbstractControl = /** @class */ (function () {
    function AbstractControl() {
        var _this = this;
        this.valueSubject$ = new Subject();
        this.enabledSubject$ = new Subject();
        this.validSubject$ = new Subject();
        this.errorsSubject$ = new Subject();
        this.destroy$ = new Subject();
        this.destroy = function () {
            _this.destroy$.next(true);
        };
        this.setErrors = function (errors) {
            if (isEqual(errors, _this.errors)) {
                return;
            }
            _this.errorsSubject$.next(errors);
        };
        this.setValidators = function (validators) {
            _this._validators = validators;
            _this.validateAndUpdateErrors(_this.value);
        };
        this.disable = function () {
            _this.setEnabled(false);
        };
        this.enable = function () {
            _this.setEnabled(true);
        };
        this.setValid = function (valid) {
            if (valid === _this.valid) {
                return;
            }
            _this.validSubject$.next(valid);
        };
        this.initValue = function (value) {
            _this.updatePrivateValue(value);
        };
        this.initEnabled = function (enabled) {
            _this._enabled = enabled;
        };
        this.initErrors = function (errors) {
            _this._errors = errors;
        };
        this.initValid = function (valid) {
            _this._valid = valid;
        };
        this.initValidators = function (validators) {
            _this._validators = validators;
        };
        this.updatePrivateValue = function (value) {
            _this._value = value;
        };
        this.updatePrivateValid = function (valid) {
            _this._valid = valid;
        };
        this.updatePrivateErrors = function (errors) {
            _this._errors = errors;
        };
        this.updatePrivateEnabledStatus = function (enabled) {
            _this._enabled = enabled;
        };
        this.validateAndUpdateErrors = function (value) {
            var errors = getErrorsBy(value, _this._validators);
            _this.setErrors(errors);
            _this.setValid(_this.checkValid());
        };
        this.setEnabled = function (enabled) {
            if (enabled === _this.enabled) {
                return;
            }
            _this.enabledSubject$.next(enabled);
        };
    }
    Object.defineProperty(AbstractControl.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valid", {
        get: function () {
            return this._valid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "invalid", {
        get: function () {
            return !this._valid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "disabled", {
        get: function () {
            return !this._enabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valueChange", {
        get: function () {
            return this.valueSubject$.asObservable().pipe(takeUntil(this.destroy$));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "errorsChange", {
        get: function () {
            return this.errorsSubject$.asObservable().pipe(takeUntil(this.destroy$));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "enabledChange", {
        get: function () {
            return this.enabledSubject$.asObservable().pipe(takeUntil(this.destroy$));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "validChange", {
        get: function () {
            return this.validSubject$.asObservable().pipe(takeUntil(this.destroy$));
        },
        enumerable: false,
        configurable: true
    });
    AbstractControl.prototype.initBasicParams = function (_a) {
        var value = _a.value, _b = _a.disabled, disabled = _b === void 0 ? false : _b, validators = _a.validators;
        this.initValue(value);
        this.initValidators(validators);
        this.initEnabled(!disabled);
        this.initErrors(getErrorsBy(value, validators));
        this.initValid(this.checkValid());
        this.validChange.subscribe(this.updatePrivateValid);
        this.errorsChange.subscribe(this.updatePrivateErrors);
        this.enabledChange.subscribe(this.updatePrivateEnabledStatus);
        this.valueChange.subscribe(this.updatePrivateValue);
        this.valueChange.subscribe(this.validateAndUpdateErrors);
    };
    return AbstractControl;
}());

var FieldControl = /** @class */ (function (_super) {
    __extends(FieldControl, _super);
    function FieldControl(_a) {
        var value = _a.value, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.validators, validators = _c === void 0 ? [] : _c;
        var _this = _super.call(this) || this;
        _this.setValue = function (value) {
            /**
             * start
             * distinct value change
             *
             * decide to not put this logic in valueChange pipeline, two reason as below
             * 1.cannot work when call setValue the first time
             * 2.will trigger the diff fn in each subscribe place, it is redundant
             *
             * Same thing with errorsChange and validChange
             */
            if (value === _this.value) {
                return;
            }
            /**
             * end
             */
            _this.valueSubject$.next(value);
        };
        _this.checkValid = function () { return !_this.errors; };
        _this.initBasicParams({ value: value, disabled: disabled, validators: validators });
        return _this;
    }
    return FieldControl;
}(AbstractControl));

var GroupControl = /** @class */ (function (_super) {
    __extends(GroupControl, _super);
    function GroupControl(_a) {
        var controls = _a.controls, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.validators, validators = _c === void 0 ? [] : _c;
        var _this = _super.call(this) || this;
        _this.controlsSubject = new Subject();
        /**
         * @private controlsChangeNotifyLock
         * Prevent frequent triggering of ValueChangeCallback when setting Value
         */
        _this.controlsChangeNotifyLock = false;
        _this.get = function (name) {
            return _this._controls[name];
        };
        _this.setValue = function (value) {
            if (value === _this.value) {
                return;
            }
            _this.setValueToControls(value);
            _this.valueSubject$.next(value);
        };
        _this.addControl = function (name, control) {
            var _a;
            var controls = Object.assign({}, _this.controls, (_a = {},
                _a[name] = control,
                _a));
            _this.controlsSubject.next(controls);
        };
        // TODO =>
        _this.initControls = function (controls) {
            _this._controls = controls;
        };
        _this.setValueToControls = function (value) {
            /**
             * open the lock and prevent trigger valueChange,validChange callback by controls value change
             */
            _this.controlsChangeNotifyLock = true;
            Object.keys(_this._controls).forEach(function (name) {
                var hasKey = Object.prototype.hasOwnProperty.call(value, name);
                _this._controls[name].setValue(hasKey ? value[name] : null);
            });
            /**
             * close the lock
             */
            _this.controlsChangeNotifyLock = false;
        };
        /**
         * has group level error or has invalid control
         */
        _this.checkValid = function () {
            return !(_this.errors || Object.values(_this._controls).some(function (control) { return control.invalid; }));
        };
        _this.updatePrivateControlsAndResetValue = function (controls) {
            _this.updatePrivateControls(controls);
            _this.valueSubject$.next(_this.getGroupValueFromControls());
        };
        _this.updatePrivateControls = function (controls) {
            _this._controls = controls;
        };
        _this.getGroupValueFromControls = function () {
            var value = {};
            Object.keys(_this._controls).forEach(function (name) {
                var control = _this._controls[name];
                if (control.enabled) {
                    value[name] = control.value;
                }
            });
            return value;
        };
        _this.reSubscribeControls = function () {
            var controls = Object.values(_this._controls);
            var valueChanges = controls.map(function (control) { return control.valueChange; });
            var validChanges = controls.map(function (control) { return control.validChange; });
            var enabledChanges = controls.map(function (control) { return control.enabledChange; });
            _this.reSubscribeControlValueChanges(valueChanges);
            _this.reSubscribeControlValidChanges(validChanges);
            _this.reSubscribeControlEnabledChanges(enabledChanges);
        };
        _this.reSubscribeControlValidChanges = function (validChanges) {
            if (_this.validChangesSubscription) {
                _this.validChangesSubscription.unsubscribe();
            }
            _this.validChangesSubscription = merge.apply(void 0, validChanges).pipe(takeUntil(_this.destroy$), skipWhile(function () { return _this.controlsChangeNotifyLock; }), map(function () { return _this.checkValid(); }))
                .subscribe(_this.setValid);
        };
        // TODO ?? merge with reSubscribeControlValueChanges
        _this.reSubscribeControlEnabledChanges = function (enabledChanges) {
            if (_this.enabledChangesSubscription) {
                _this.enabledChangesSubscription.unsubscribe();
            }
            _this.enabledChangesSubscription = merge.apply(void 0, enabledChanges).pipe(takeUntil(_this.destroy$), skipWhile(function () { return _this.controlsChangeNotifyLock; }), map(function () { return _this.getGroupValueFromControls(); }))
                .subscribe(function (v) {
                _this.valueSubject$.next(v);
            });
        };
        _this.initControls(controls);
        // TODO initBasicParams FIND A BETTER WAY
        _this.initBasicParams({ value: _this.getGroupValueFromControls(), disabled: disabled, validators: validators });
        _this.controlsChange.subscribe(_this.updatePrivateControlsAndResetValue);
        _this.reSubscribeControls();
        return _this;
    }
    Object.defineProperty(GroupControl.prototype, "controls", {
        get: function () {
            return this._controls;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroupControl.prototype, "controlsChange", {
        get: function () {
            return this.controlsSubject.asObservable().pipe(takeUntil(this.destroy$));
        },
        enumerable: false,
        configurable: true
    });
    GroupControl.prototype.reSubscribeControlValueChanges = function (valueChanges) {
        var _this = this;
        if (this.valueChangesSubscription) {
            this.valueChangesSubscription.unsubscribe();
        }
        this.valueChangesSubscription = merge.apply(void 0, valueChanges).pipe(takeUntil(this.destroy$), skipWhile(function () { return _this.controlsChangeNotifyLock; }), map(function () { return _this.getGroupValueFromControls(); }))
            .subscribe(function (v) {
            _this.valueSubject$.next(v);
        });
    };
    return GroupControl;
}(AbstractControl));

export { Field, FieldControl, Group, GroupControl };
