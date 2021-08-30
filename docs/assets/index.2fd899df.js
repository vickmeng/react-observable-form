import {
  t as o,
  l as s,
  R as l,
  m as c,
  s as u,
  a as d,
  S as h,
  r as p,
  F as b,
  I as m,
  T as v,
  b as f,
  c as g,
  d as E,
  e as C,
  L as y,
  f as x,
  h as j,
  g as V,
  i as S,
  j as k,
  k as F,
  n as P,
  o as _,
  p as O,
  C as G,
  q as w,
  u as $,
  v as D,
  w as R,
  x as N,
  B as A,
  y as L,
  z as B,
  A as T,
  D as I,
  E as q,
  G as U,
  H as M,
} from "./vendor.3fef15be.js";
const e = Object.defineProperty;
const t = Object.getOwnPropertySymbols;
const r = Object.prototype.hasOwnProperty;
const n = Object.prototype.propertyIsEnumerable;
const a = (t, r, n) => (r in t ? e(t, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (t[r] = n));
const i = (e, i) => {
  for (var o in i || (i = {})) r.call(i, o) && a(e, o, i[o]);
  if (t) for (var o of t(i)) n.call(i, o) && a(e, o, i[o]);
  return e;
};
var W = function (e, t) {
  return (W =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (e, t) {
        e.__proto__ = t;
      }) ||
    function (e, t) {
      for (const r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    })(e, t);
};
function H(e, t) {
  if (typeof t !== "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  function r() {
    this.constructor = e;
  }
  W(e, t), (e.prototype = t === null ? Object.create(t) : ((r.prototype = t.prototype), new r()));
}
var z = function () {
  return (z =
    Object.assign ||
    function (e) {
      for (var t, r = 1, n = arguments.length; r < n; r++)
        for (const a in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
      return e;
    }).apply(this, arguments);
};
function J(e, t) {
  for (let r = 0, n = t.length, a = e.length; r < n; r++, a++) e[a] = t[r];
  return e;
}
const K = (function () {
  function e() {
    const e = this;
    (this.valueSubject$ = new h()),
      (this.disabledSubject$ = new h()),
      (this.validSubject$ = new h()),
      (this.dirtySubject$ = new h()),
      (this.errorsSubject$ = new h()),
      (this.destroy$ = new h()),
      (this.destroy = function () {
        e.destroy$.next(!0);
      }),
      (this.setErrors = function (t) {
        s.exports.isEqual(t, e.errors) || e.errorsSubject$.next(t);
      }),
      (this.setValidators = function (t) {
        (e._validators = t), e.validateAndUpdateErrors(e.value);
      }),
      (this.disable = function () {
        e.setDisabled(!0);
      }),
      (this.enable = function () {
        e.setDisabled(!1);
      }),
      (this.setValid = function (t) {
        t !== e.valid && e.validSubject$.next(t);
      }),
      (this.markAsDirty = function () {
        e.setDirty(!0);
      }),
      (this.markAsPristine = function () {
        e.setDirty(!1);
      }),
      (this.initValue = function (t) {
        e.updatePrivateValue(t);
      }),
      (this.initDisabled = function (t) {
        e._disabled = t;
      }),
      (this.initDirty = function (t) {
        e._dirty = t;
      }),
      (this.initErrors = function (t) {
        e._errors = t;
      }),
      (this.initValid = function (t) {
        e._valid = t;
      }),
      (this.initValidators = function (t) {
        e._validators = t;
      }),
      (this.updatePrivateValue = function (t) {
        e._value = t;
      }),
      (this.updatePrivateValid = function (t) {
        e._valid = t;
      }),
      (this.updatePrivateErrors = function (t) {
        e._errors = t;
      }),
      (this.updatePrivateDisabled = function (t) {
        e._disabled = t;
      }),
      (this.updatePrivateDirty = function (t) {
        e._dirty = t;
      }),
      (this.validateAndUpdateErrors = function (t) {
        const r = X(t, e._validators);
        e.setErrors(r), e.setValid(e.checkValid());
      }),
      (this.setDisabled = function (t) {
        t !== e.disabled && e.disabledSubject$.next(t);
      }),
      (this.setDirty = function (t) {
        t !== e.dirty && e.dirtySubject$.next(t);
      });
  }
  return (
    Object.defineProperty(e.prototype, "value", {
      get: function () {
        return this._value;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "errors", {
      get: function () {
        return this._errors;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "valid", {
      get: function () {
        return this._valid;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "invalid", {
      get: function () {
        return !this._valid;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "disabled", {
      get: function () {
        return this._disabled;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "enabled", {
      get: function () {
        return !this._disabled;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "dirty", {
      get: function () {
        return this._dirty;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "pristine", {
      get: function () {
        return !this._dirty;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "valueChange", {
      get: function () {
        return this.valueSubject$.asObservable().pipe(o(this.destroy$));
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "errorsChange", {
      get: function () {
        return this.errorsSubject$.asObservable().pipe(o(this.destroy$));
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "disabledChange", {
      get: function () {
        return this.disabledSubject$.asObservable().pipe(o(this.destroy$));
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "dirtyChange", {
      get: function () {
        return this.dirtySubject$.asObservable().pipe(o(this.destroy$));
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "validChange", {
      get: function () {
        return this.validSubject$.asObservable().pipe(o(this.destroy$));
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype.initBasicParams = function (e, t) {
      const r = t.disabled;
      const n = void 0 !== r && r;
      const a = t.dirty;
      const i = void 0 !== a && a;
      const o = t.validators;
      const s = void 0 === o ? [] : o;
      const l = t.autoMarkAsDirty;
      const c = void 0 === l || l;
      this.initValue(e),
        this.initValidators(s),
        this.initDisabled(n),
        this.initDirty(i),
        this.initErrors(X(e, s)),
        this.initValid(this.checkValid()),
        this.validChange.subscribe(this.updatePrivateValid),
        this.errorsChange.subscribe(this.updatePrivateErrors),
        this.disabledChange.subscribe(this.updatePrivateDisabled),
        this.dirtyChange.subscribe(this.updatePrivateDirty),
        this.valueChange.subscribe(this.updatePrivateValue),
        this.valueChange.subscribe(this.validateAndUpdateErrors),
        c && this.valueChange.subscribe(this.markAsDirty);
    }),
    e
  );
})();
const Q = (function (e) {
  function t(t, r) {
    void 0 === r && (r = {});
    const n = e.call(this) || this;
    return (
      (n.setValue = function (e) {
        e !== n.value && n.valueSubject$.next(e);
      }),
      (n.checkValid = function () {
        return !n.errors;
      }),
      n.initBasicParams(t, r),
      n
    );
  }
  return H(t, e), t;
})(K);
var X = function (e, t) {
  const r = t.reduce(function (t, r) {
    const n = r(e);
    return n && (t = z(z({}, t), n)), t;
  }, {});
  return s.exports.isEmpty(r) ? null : r;
};
const Y = function (e) {
  return e instanceof K ? e : new (Q.bind.apply(Q, J([void 0], e)))();
};
const Z = function (e, t) {
  const r = p.exports.useRef(!1);
  p.exports.useEffect(function () {
    if (r.current) return e();
    r.current = !0;
  }, t);
};
const ee = function (e) {
  const t = p.exports.useState(e.value);
  const r = t[0];
  const n = t[1];
  return (
    p.exports.useEffect(
      function () {
        const t = e.valueChange.subscribe(n);
        return function () {
          t.unsubscribe();
        };
      },
      [e]
    ),
    Z(
      function () {
        n(e.value);
      },
      [e]
    ),
    r
  );
};
const te = function (e) {
  const t = p.exports.useState(e.disabled);
  const r = t[0];
  const n = t[1];
  return (
    p.exports.useEffect(
      function () {
        const t = e.disabledChange.subscribe(n);
        return function () {
          t.unsubscribe();
        };
      },
      [e]
    ),
    Z(
      function () {
        n(e.disabled);
      },
      [e]
    ),
    r
  );
};
const re = function (e) {
  const t = p.exports.useState(e.dirty);
  const r = t[0];
  const n = t[1];
  return (
    p.exports.useEffect(
      function () {
        const t = e.dirtyChange.subscribe(n);
        return function () {
          t.unsubscribe();
        };
      },
      [e]
    ),
    Z(
      function () {
        n(e.dirty);
      },
      [e]
    ),
    r
  );
};
const ne = function (e) {
  const t = p.exports.useState(e.valid);
  const r = t[0];
  const n = t[1];
  return (
    p.exports.useEffect(
      function () {
        const t = e.validChange.subscribe(n);
        return function () {
          t.unsubscribe();
        };
      },
      [e]
    ),
    Z(
      function () {
        n(e.valid);
      },
      [e]
    ),
    r
  );
};
const ae = function (e) {
  const t = p.exports.useState(e.errors);
  const r = t[0];
  const n = t[1];
  return (
    p.exports.useEffect(
      function () {
        const t = e.errorsChange.subscribe(n);
        return function () {
          t.unsubscribe();
        };
      },
      [e]
    ),
    Z(
      function () {
        n(e.errors);
      },
      [e]
    ),
    r
  );
};
const ie = l.createContext(null);
function oe(e) {
  const t = e.children;
  const r = p.exports.useContext(ie);
  const n = (function (e) {
    return void 0 !== e.name;
  })(e)
    ? { name: e.name, control: r.get(e.name) }
    : { control: e.control };
  const a = n.name;
  const i = void 0 === a ? void 0 : a;
  const o = n.control;
  if (!(o instanceof Q)) throw new Error("props error:Field can only receive FieldControl as control");
  const s = ee(o);
  const l = te(o);
  const c = re(o);
  const u = ne(o);
  const d = ae(o);
  return t({
    name: i,
    value: s,
    setValue: o.setValue,
    markAsDirty: o.markAsDirty,
    markAsPristine: o.markAsPristine,
    errors: d,
    disabled: l,
    enabled: !l,
    valid: u,
    invalid: !u,
    dirty: c,
    pristine: !c,
  });
}
const se = function (e) {
  const t = e.children;
  const r = p.exports.useContext(ie);
  const n = (function (e) {
    return void 0 !== e.name;
  })(e)
    ? { name: e.name, control: r.get(e.name) }
    : { control: e.control };
  const a = n.name;
  const i = void 0 === a ? void 0 : a;
  const o = n.control;
  const s = ee(o);
  const c = te(o);
  const u = re(o);
  const d = ne(o);
  const h = {
    name: i,
    value: s,
    disabled: c,
    enabled: !c,
    errors: ae(o),
    valid: d,
    invalid: !d,
    dirty: u,
    pristine: !u,
    controls: (function (e) {
      const t = p.exports.useState(e.controls);
      const r = t[0];
      const n = t[1];
      return (
        p.exports.useEffect(
          function () {
            const t = e.controlsChange.subscribe(n);
            return function () {
              t.unsubscribe();
            };
          },
          [e]
        ),
        Z(
          function () {
            n(e.controls);
          },
          [e]
        ),
        r
      );
    })(o),
  };
  return l.createElement(ie.Provider, { value: o }, t(h));
};
const le = (function (e) {
  function t(t, r) {
    void 0 === r && (r = {});
    const n = e.call(this) || this;
    return (
      (n.controlsSubject = new h()),
      (n.controlsChangeNotifyLock = !1),
      (n.get = function (e) {
        return n._controls[e];
      }),
      (n.setValue = function (e) {
        e !== n.value && (n.setValueToControls(e), n.valueSubject$.next(e));
      }),
      (n.add = function (e, t) {
        let r;
        if (n.controls[e]) console.warn("already has control named " + e + " in formGroup");
        else {
          const a = Object.assign({}, n.controls, (((r = {})[e] = Y(t)), r));
          n.controlsSubject.next(a);
        }
      }),
      (n.remove = function (e) {
        if (n.controls[e]) {
          const t = Object.assign({}, n.controls);
          delete t[e], n.controlsSubject.next(t);
        } else console.warn("cannot find control named " + e + " in formGroup");
      }),
      (n.checkValid = function () {
        return !(
          n.errors ||
          Object.values(n._controls).some(function (e) {
            return e.invalid;
          })
        );
      }),
      (n.initControls = function (e) {
        const t = {};
        for (const r in e)
          if (Object.prototype.hasOwnProperty.call(e, r)) {
            const a = e[r];
            t[r] = Y(a);
          }
        n._controls = t;
      }),
      (n.setValueToControls = function (e) {
        (n.controlsChangeNotifyLock = !0),
          Object.keys(n._controls).forEach(function (t) {
            const r = Object.prototype.hasOwnProperty.call(e, t);
            n._controls[t].setValue(r ? e[t] : null);
          }),
          (n.controlsChangeNotifyLock = !1);
      }),
      (n.updatePrivateControlsAndResetSubscribeGraph = function (e) {
        n.updatePrivateControls(e), n.valueSubject$.next(n.getGroupValueFromControls()), n.resetGraph();
      }),
      (n.updatePrivateControls = function (e) {
        n._controls = e;
      }),
      (n.getGroupValueFromControls = function () {
        const e = {};
        return (
          Object.keys(n._controls).forEach(function (t) {
            const r = n._controls[t];
            r.enabled && (e[t] = r.value);
          }),
          e
        );
      }),
      (n.resetGraph = function () {
        const e = Object.values(n._controls);
        const t = e.map(function (e) {
          return e.valueChange;
        });
        const r = e.map(function (e) {
          return e.validChange;
        });
        const a = e.map(function (e) {
          return e.disabledChange;
        });
        n.resetValueGraph(J(J([], t), a)), n.resetValidGraph(r);
      }),
      (n.resetValidGraph = function (e) {
        n.validChangesSubscription && n.validChangesSubscription.unsubscribe(),
          (n.validChangesSubscription = c
            .apply(void 0, e)
            .pipe(
              o(n.destroy$),
              u(function () {
                return n.controlsChangeNotifyLock;
              }),
              d(function () {
                return n.checkValid();
              })
            )
            .subscribe(n.setValid));
      }),
      n.initControls(t),
      n.initBasicParams(n.getGroupValueFromControls(), r),
      n.resetGraph(),
      n.controlsChange.subscribe(n.updatePrivateControlsAndResetSubscribeGraph),
      n
    );
  }
  return (
    H(t, e),
    Object.defineProperty(t.prototype, "controls", {
      get: function () {
        return this._controls;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "controlsChange", {
      get: function () {
        return this.controlsSubject.asObservable().pipe(o(this.destroy$));
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.prototype.resetValueGraph = function (e) {
      const t = this;
      this.valueChangesSubscription && this.valueChangesSubscription.unsubscribe(),
        (this.valueChangesSubscription = c
          .apply(void 0, e)
          .pipe(
            o(this.destroy$),
            u(function () {
              return t.controlsChangeNotifyLock;
            }),
            d(function () {
              return t.getGroupValueFromControls();
            })
          )
          .subscribe(function (e) {
            t.valueSubject$.next(e);
          }));
    }),
    t
  );
})(K);
!(function (e) {
  function t(t, r) {
    void 0 === r && (r = {});
    const n = e.call(this) || this;
    return (
      (n.controlsSubject = new h()),
      (n.controlsChangeNotifyLock = !1),
      (n.get = function (e) {
        return n._controls[+e];
      }),
      (n.insert = function (e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        const a = J([], n.controls);
        const i = t.map(function (e) {
          return Y(e);
        });
        a.splice.apply(a, J([e, 0], i)), n.controlsSubject.next(a);
      }),
      (n.push = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        n.insert.apply(n, J([n.controls.length], e));
      }),
      (n.remove = function (e, t) {
        void 0 === t && (t = 1);
        const r = J([], n.controls);
        r.splice(e, t), n.controlsSubject.next(r);
      }),
      (n.setValue = function (e) {
        e !== n.value && n.valueSubject$.next(e);
      }),
      (n.checkValid = function () {
        return !(
          n.errors ||
          n._controls.some(function (e) {
            return e.invalid;
          })
        );
      }),
      (n.initControls = function (e) {
        n._controls = e.map(function (e) {
          return Y(e);
        });
      }),
      (n.updatePrivateControlsAndResetSubscribeGraph = function (e) {
        n.updatePrivateControls(e), n.valueSubject$.next(n.getListValueFromControls()), n.resetGraph();
      }),
      (n.updatePrivateControls = function (e) {
        n._controls = e;
      }),
      (n.getListValueFromControls = function () {
        const e = [];
        return (
          Object.keys(n._controls).forEach(function (t, r) {
            const a = n._controls[r];
            a.enabled && (e[r] = a.value);
          }),
          e
        );
      }),
      (n.resetGraph = function () {
        const e = n._controls.map(function (e) {
          return e.valueChange;
        });
        const t = n._controls.map(function (e) {
          return e.validChange;
        });
        const r = n._controls.map(function (e) {
          return e.disabledChange;
        });
        n.resetValueGraph(J(J([], e), r)), n.resetValidGraph(t);
      }),
      (n.resetValidGraph = function (e) {
        n.validChangesSubscription && n.validChangesSubscription.unsubscribe(),
          (n.validChangesSubscription = c
            .apply(void 0, e)
            .pipe(
              o(n.destroy$),
              u(function () {
                return n.controlsChangeNotifyLock;
              }),
              d(function () {
                return n.checkValid();
              })
            )
            .subscribe(n.setValid));
      }),
      n.initControls(t),
      n.initBasicParams(n.getListValueFromControls(), r),
      n.resetGraph(),
      n.controlsChange.subscribe(n.updatePrivateControlsAndResetSubscribeGraph),
      n
    );
  }
  H(t, e),
    Object.defineProperty(t.prototype, "controls", {
      get: function () {
        return this._controls;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(t.prototype, "controlsChange", {
      get: function () {
        return this.controlsSubject.asObservable().pipe(o(this.destroy$));
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.prototype.resetValueGraph = function (e) {
      const t = this;
      this.valueChangesSubscription && this.valueChangesSubscription.unsubscribe(),
        (this.valueChangesSubscription = c
          .apply(void 0, e)
          .pipe(
            o(this.destroy$),
            u(function () {
              return t.controlsChangeNotifyLock;
            }),
            d(function () {
              return t.getListValueFromControls();
            })
          )
          .subscribe(function (e) {
            t.valueSubject$.next(e);
          }));
    });
})(K);
const ce = () => {
  const e = p.exports.useRef(new Q(""));
  return l.createElement(oe, { control: e.current }, ({ value: e, setValue: t }) =>
    l.createElement(
      b.Item,
      { label: "Ant Design" },
      l.createElement(m, { value: e, onChange: (e) => t(e.target.value) })
    )
  );
};
const ue = () => {
  const e = p.exports.useRef(new Q(""));
  return l.createElement(oe, { control: e.current }, ({ value: e, setValue: t }) =>
    l.createElement(v, { label: "material-ui", value: e, onChange: (e) => t(e.target.value) })
  );
};
const de = new le({ married: ["unmarried"], spouse: ["", { disabled: !0 }] });
const he = de.get("married");
const pe = de.get("spouse");
he.valueChange.subscribe((e) => {
  e === "married" ? pe.enable() : (pe.setValue(""), pe.disable());
});
const be = () =>
  l.createElement(se, { control: de }, () =>
    l.createElement(
      l.Fragment,
      null,
      l.createElement(f, { component: "legend" }, "婚姻状况"),
      l.createElement(oe, { name: "married" }, ({ value: e, setValue: t }) =>
        l.createElement(
          l.Fragment,
          null,
          l.createElement(
            g,
            {
              value: e,
              onChange: (e) => {
                t(e.target.value);
              },
            },
            l.createElement(E, { value: "unmarried", control: l.createElement(C, null), label: "未婚" }),
            l.createElement(E, { value: "married", control: l.createElement(C, null), label: "已婚" })
          )
        )
      ),
      l.createElement("br", null),
      l.createElement(oe, { name: "spouse" }, ({ value: e, setValue: t, disabled: r }) =>
        l.createElement(v, { label: "配偶姓名", disabled: r, value: e, onChange: (e) => t(e.target.value) })
      )
    )
  );
const me = () =>
  l.createElement(
    "main",
    { className: "home" },
    l.createElement(
      "div",
      { className: "banner" },
      l.createElement("img", { src: "/react-observable-form/assets/rx.18995810.png", className: "rxImg" }),
      l.createElement("img", { src: "/react-observable-form/assets/react.7f55f92c.svg", className: "reactImg" }),
      l.createElement(
        "nav",
        null,
        l.createElement(
          "div",
          null,
          l.createElement(y, { className: "link", to: "/quick-start" }, "文档"),
          l.createElement(y, { className: "link", to: "/" }, "示例")
        ),
        l.createElement(
          "div",
          null,
          l.createElement("a", { href: "https://github.com/vickmeng/react-observable-form" }, l.createElement(x, null))
        )
      ),
      l.createElement("h1", null, "React Observable Form"),
      l.createElement("h2", null, "可自由订阅状态变化的React响应式表单方案"),
      l.createElement(
        "div",
        null,
        l.createElement(y, { className: "quick-start link", to: "/quick-start" }, "快速开始")
      )
    ),
    l.createElement(
      "section",
      null,
      l.createElement("h2", null, "响应式"),
      l.createElement("p", null, "随时随处订阅表单元素状态变化"),
      l.createElement("img", { src: "/react-observable-form/assets/flow.1c028861.png", width: 500 })
    ),
    l.createElement(
      "section",
      null,
      l.createElement("h2", null, "自由集成"),
      l.createElement("p", null, "自由对接流行的组件库"),
      l.createElement(
        "div",
        { className: "third" },
        l.createElement("div", { className: "third--demo antd" }, l.createElement(ce, null)),
        l.createElement("div", { className: "divide vertical" }),
        l.createElement("div", { className: "third--demo mui" }, l.createElement(ue, null))
      )
    ),
    l.createElement(
      "section",
      null,
      l.createElement("h2", null, "集中管理"),
      l.createElement("p", null, "声明式表单，集中管理动态逻辑"),
      l.createElement(
        "div",
        { className: "declare" },
        l.createElement(
          "div",
          { className: "code" },
          l.createElement(
            j,
            { language: "javascript", style: V },
            'const group = new GroupControl({\n  married: ["unmarried"],\n  spouse: ["", { disabled: true }],\n});\n\nconst married = group.get("married");\nconst spouse = group.get("spouse");\n\nmarried.valueChange.subscribe((v) => {\n  if (v === "married") {\n    spouse.enable();\n  } else {\n    spouse.setValue("");\n    spouse.disable();\n  }\n});'
          )
        ),
        l.createElement("div", { className: "demo" }, l.createElement(be, null))
      )
    ),
    l.createElement("footer", null, "遵循 MIT 开源协议    Copyright © Rxjs-CN")
  );
const ve = () =>
  l.createElement(
    "div",
    { className: "page" },
    l.createElement(S, { paragraph: !0, variant: "h2" }, "快速开始"),
    l.createElement(S, { paragraph: !0, variant: "h4" }, "环境准备"),
    l.createElement(S, { paragraph: !0 }, "请确保使用 v16.8及更高版本的react"),
    l.createElement(S, { paragraph: !0, variant: "h4" }, "安装"),
    l.createElement(
      j,
      { language: "javascript", style: V },
      "yarn add rxjs react-observable-form\n\nor\n\nnpm install rxjs react-observable-form"
    )
  );
const fe = {
  title: "基础使用",
  routes: [
    { text: "单一元素", link: "/field" },
    { text: "群组", link: "/group" },
    { text: "列表", link: "/list" },
    { text: "初始化参数", link: "/list" },
  ],
};
const ge = {
  title: "高级使用",
  routes: [
    { text: "动态表单", link: "" },
    { text: "联合校验", link: "" },
    { text: "订阅变化", link: "" },
    { text: "复杂嵌套", link: "" },
    { text: "与Rxjs", link: "" },
  ],
};
const Ee = {
  title: "API",
  routes: [
    { text: "<Field/>", link: "" },
    { text: "<Group/>", link: "" },
    { text: "<List/>", link: "" },
    { text: "<Error/>", link: "" },
    { text: "FieldControl", link: "" },
    { text: "GroupControl", link: "" },
    { text: "ListControl", link: "" },
  ],
};
const Ce = ({ menu: e }) => {
  const [t, r] = p.exports.useState(!1);
  return l.createElement(
    l.Fragment,
    null,
    l.createElement(
      F,
      {
        button: !0,
        onClick: () => {
          r(!t);
        },
      },
      l.createElement(P, { primary: e.title }),
      t ? l.createElement(_, null) : l.createElement(O, null)
    ),
    l.createElement(
      G,
      { in: t, timeout: "auto", unmountOnExit: !0 },
      l.createElement(
        k,
        { component: "div", disablePadding: !0, className: "submenu--list" },
        e.routes.map((e) =>
          l.createElement(
            y,
            { to: e.link, key: e.text },
            l.createElement(F, { button: !0, className: "nested" }, l.createElement(P, { primary: e.text }))
          )
        )
      )
    )
  );
};
const ye = () =>
  l.createElement(
    "aside",
    { className: "menu" },
    l.createElement(
      k,
      { component: "nav", "aria-labelledby": "nested-list-subheader" },
      l.createElement(y, { to: "/" }, l.createElement(F, { button: !0 }, l.createElement(P, { primary: "首页" }))),
      l.createElement(
        y,
        { to: "/quick-start" },
        l.createElement(F, { button: !0 }, l.createElement(P, { primary: "快速开始" }))
      ),
      l.createElement(
        y,
        { to: "/core" },
        l.createElement(F, { button: !0 }, l.createElement(P, { primary: "核心概念" }))
      ),
      l.createElement(Ce, { menu: fe }),
      l.createElement(Ce, { menu: ge }),
      l.createElement(Ce, { menu: Ee }),
      l.createElement(
        y,
        { to: "/core" },
        l.createElement(F, { button: !0 }, l.createElement(P, { primary: "其他资源" }))
      )
    )
  );
const xe = () =>
  l.createElement(
    "div",
    { className: "page" },
    l.createElement(S, { paragraph: !0, variant: "h2" }, "核心概念"),
    l.createElement(S, { paragraph: !0 }, "react-observable-form主要包含两个概念：Controller与Component。"),
    l.createElement(S, { paragraph: !0, variant: "h4" }, "Controllers"),
    l.createElement(
      S,
      { paragraph: !0 },
      "Controller是数据的源头，它为视图提供一系列可观察对象，以及操作数据的方法，使用者可以通过订阅这些可观察对象获得如：value，errors等状态。"
    ),
    l.createElement(S, { paragraph: !0 }, "我们有如下三种class创建Controller："),
    l.createElement(
      S,
      { paragraph: !0 },
      l.createElement(
        "ul",
        null,
        l.createElement("li", null, "FieldControl：创建单一元素的控制器"),
        l.createElement("li", null, "GroupControl：创建组合型元素的控制器"),
        l.createElement("li", null, "ListControl：创建集合型元素的控制器")
      )
    ),
    l.createElement(S, { paragraph: !0, variant: "h4" }, "Components"),
    l.createElement(
      S,
      { paragraph: !0 },
      "就是React组件，作为Controller的订阅者，可以获取其订阅的Controller的值向下传递，也提供方法让下级组件将状态上传，从而实现受控组件。"
    ),
    l.createElement(S, { paragraph: !0 }, "我们有如下三种Components："),
    l.createElement(
      S,
      { paragraph: !0 },
      l.createElement(
        "ul",
        null,
        l.createElement("li", null, " ", "<Field/>", "：FieldControl的订阅器"),
        l.createElement("li", null, " ", "<Group/>", "：GroupControl的订阅器"),
        l.createElement("li", null, " ", "<List/>", "：ListControl的订阅器")
      )
    ),
    l.createElement("br", null),
    l.createElement(S, { paragraph: !0 }, "可以查看", l.createElement(y, { to: "/" }, "基础使用"), "更直观得进行学习")
  );
const je = ({ children: e }) => l.createElement(j, { language: "typescript", style: V }, e);
const Ve = (e) => {
  const [t, r] = l.useState(!1);
  return l.createElement(
    w,
    null,
    l.createElement($, null, e.demo),
    l.createElement(
      D,
      { disableSpacing: !0 },
      l.createElement(
        R,
        {
          onClick: () => {
            r(!t);
          },
          "aria-expanded": t,
          "aria-label": "show more",
        },
        l.createElement(N, { color: t ? "primary" : "inherit" })
      )
    ),
    l.createElement(
      G,
      { in: t, timeout: "auto", unmountOnExit: !0 },
      l.createElement($, null, l.createElement(je, null, e.code))
    )
  );
};
const Se = () =>
  l.createElement(
    "div",
    { className: "page" },
    l.createElement(S, { paragraph: !0, variant: "h2" }, "单一元素"),
    l.createElement(
      S,
      { paragraph: !0 },
      "单一元素是最小的数据源。往往绑定一个单独的受控组件，比如一个输入框，一个树形选择器。"
    ),
    l.createElement(S, { paragraph: !0 }, "首先，我们创建一个FieldController作为数据源。"),
    l.createElement(
      S,
      { paragraph: !0 },
      "兵无常势，水无常形，",
      l.createElement(
        "b",
        null,
        "你可以根据需要把FieldController放在任何一个可方便获取的位置,可以是组件外，",
        "<Context/>",
        "中，或者各种状态管理工具，但请避免重复创造实例。"
      ),
      " ",
      "本例中我们放在useRef里。"
    ),
    l.createElement(je, null, 'const controlRef = useRef(new FieldControl<string>(""));'),
    l.createElement("br", null),
    l.createElement(
      S,
      { paragraph: !0 },
      "FieldControl接受两个参数，第一个参数是默认值，第二个参数是其他初始化配置。可以在",
      l.createElement(y, { to: "/" }, "API"),
      "中获取更多信息。接下来利用",
      "<Field/>",
      "订阅FieldController。"
    ),
    l.createElement(je, null, "<Field control={controlRef.current}></Field>"),
    l.createElement("br", null),
    l.createElement(
      S,
      { paragraph: !0 },
      "将FieldController传入",
      "<Field/>",
      "，",
      "<Field/>",
      "会在初始化时自动订阅FieldController的状态，同时在销毁时取消订阅。"
    ),
    l.createElement(S, { paragraph: !0 }, "接下来，将", "<Field/>", "得到的数据传递给视图"),
    l.createElement(
      je,
      null,
      '<Field control={controlRef.current}>\n    {({ value, setValue }) => {\n        return <TextField label="material-ui" value={value} onChange={(e) => setValue(e.target.value)} />;\n    }}\n</Field>'
    ),
    l.createElement("br", null),
    l.createElement(
      S,
      { paragraph: !0 },
      "<Field/>",
      "接受函数作为children，向下传递状态与控制状态的方法。本例将value传入给视图组件，并暴露setValue方法，提供修改value的能力。",
      l.createElement("b", null, "如果使用者觉得这个函数有些啰嗦，开发团队期待你使用如HOC等任何的编程技巧简化代码。")
    ),
    l.createElement("br", null),
    l.createElement(S, { paragraph: !0 }, "本来自采用material-ui作为视图库。完整代码如下："),
    l.createElement(Ve, {
      code: 'import { useRef } from "react";\nimport { TextField } from "@material-ui/core";\nimport { Field, FieldControl } from "react-observable-form";\n\nexport const BasicWithMui = () => {\n  const controlRef = useRef(new FieldControl<string>(""));\n\n  return (\n    <Field control={controlRef.current}>\n      {({ value, setValue }) => {\n        return <TextField label="material-ui" value={value} onChange={(e) => setValue(e.target.value)} />;\n      }}\n    </Field>\n  );\n};\n',
      demo: l.createElement(ue, null),
    })
  );
class ke {
  get value() {
    return this._value;
  }

  get errors() {
    return this._errors;
  }

  get valid() {
    return this._valid;
  }

  get invalid() {
    return !this._valid;
  }

  get disabled() {
    return this._disabled;
  }

  get enabled() {
    return !this._disabled;
  }

  get dirty() {
    return this._dirty;
  }

  get pristine() {
    return !this._dirty;
  }

  get valueChange() {
    return this.valueSubject$.asObservable().pipe(o(this.destroy$));
  }

  get errorsChange() {
    return this.errorsSubject$.asObservable().pipe(o(this.destroy$));
  }

  get disabledChange() {
    return this.disabledSubject$.asObservable().pipe(o(this.destroy$));
  }

  get dirtyChange() {
    return this.dirtySubject$.asObservable().pipe(o(this.destroy$));
  }

  get validChange() {
    return this.validSubject$.asObservable().pipe(o(this.destroy$));
  }

  constructor() {
    (this.valueSubject$ = new h()),
      (this.disabledSubject$ = new h()),
      (this.validSubject$ = new h()),
      (this.dirtySubject$ = new h()),
      (this.errorsSubject$ = new h()),
      (this.destroy$ = new h()),
      (this.destroy = () => {
        this.destroy$.next(!0);
      }),
      (this.setErrors = (e) => {
        s.exports.isEqual(e, this.errors) || this.errorsSubject$.next(e);
      }),
      (this.setValidators = (e) => {
        (this._validators = e), this.validateAndUpdateErrors(this.value);
      }),
      (this.disable = () => {
        this.setDisabled(!0);
      }),
      (this.enable = () => {
        this.setDisabled(!1);
      }),
      (this.setValid = (e) => {
        e !== this.valid && this.validSubject$.next(e);
      }),
      (this.markAsDirty = () => {
        this.setDirty(!0);
      }),
      (this.markAsPristine = () => {
        this.setDirty(!1);
      }),
      (this.initValue = (e) => {
        this.updatePrivateValue(e);
      }),
      (this.initDisabled = (e) => {
        this._disabled = e;
      }),
      (this.initDirty = (e) => {
        this._dirty = e;
      }),
      (this.initErrors = (e) => {
        this._errors = e;
      }),
      (this.initValid = (e) => {
        this._valid = e;
      }),
      (this.initValidators = (e) => {
        this._validators = e;
      }),
      (this.updatePrivateValue = (e) => {
        this._value = e;
      }),
      (this.updatePrivateValid = (e) => {
        this._valid = e;
      }),
      (this.updatePrivateErrors = (e) => {
        this._errors = e;
      }),
      (this.updatePrivateDisabled = (e) => {
        this._disabled = e;
      }),
      (this.updatePrivateDirty = (e) => {
        this._dirty = e;
      }),
      (this.validateAndUpdateErrors = (e) => {
        const t = Pe(e, this._validators);
        this.setErrors(t), this.setValid(this.checkValid());
      }),
      (this.setDisabled = (e) => {
        e !== this.disabled && this.disabledSubject$.next(e);
      }),
      (this.setDirty = (e) => {
        e !== this.dirty && this.dirtySubject$.next(e);
      });
  }

  initBasicParams(e, { disabled: t = !1, dirty: r = !1, validators: n = [], autoMarkAsDirty: a = !0 }) {
    this.initValue(e),
      this.initValidators(n),
      this.initDisabled(t),
      this.initDirty(r),
      this.initErrors(Pe(e, n)),
      this.initValid(this.checkValid()),
      this.validChange.subscribe(this.updatePrivateValid),
      this.errorsChange.subscribe(this.updatePrivateErrors),
      this.disabledChange.subscribe(this.updatePrivateDisabled),
      this.dirtyChange.subscribe(this.updatePrivateDirty),
      this.valueChange.subscribe(this.updatePrivateValue),
      this.valueChange.subscribe(this.validateAndUpdateErrors),
      a && this.valueChange.subscribe(this.markAsDirty);
  }
}
class Fe extends ke {
  constructor(e, t = {}) {
    super(),
      (this.setValue = (e) => {
        e !== this.value && this.valueSubject$.next(e);
      }),
      (this.checkValid = () => !this.errors),
      this.initBasicParams(e, t);
  }
}
const Pe = (e, t) => {
  const r = t.reduce((t, r) => {
    const n = r(e);
    return n && (t = i(i({}, t), n)), t;
  }, {});
  return s.exports.isEmpty(r) ? null : r;
};
const _e = (e) => (e instanceof ke ? e : new Fe(...e));
const Oe = (e, t) => {
  const r = p.exports.useRef(!1);
  p.exports.useEffect(() => {
    if (r.current) return e();
    r.current = !0;
  }, t);
};
const Ge = (e) => {
  const [t, r] = p.exports.useState(e.value);
  return (
    p.exports.useEffect(() => {
      const t = e.valueChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    Oe(() => {
      r(e.value);
    }, [e]),
    t
  );
};
const we = (e) => {
  const [t, r] = p.exports.useState(e.disabled);
  return (
    p.exports.useEffect(() => {
      const t = e.disabledChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    Oe(() => {
      r(e.disabled);
    }, [e]),
    t
  );
};
const $e = (e) => {
  const [t, r] = p.exports.useState(e.dirty);
  return (
    p.exports.useEffect(() => {
      const t = e.dirtyChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    Oe(() => {
      r(e.dirty);
    }, [e]),
    t
  );
};
const De = (e) => {
  const [t, r] = p.exports.useState(e.valid);
  return (
    p.exports.useEffect(() => {
      const t = e.validChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    Oe(() => {
      r(e.valid);
    }, [e]),
    t
  );
};
const Re = (e) => {
  const [t, r] = p.exports.useState(e.errors);
  return (
    p.exports.useEffect(() => {
      const t = e.errorsChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    Oe(() => {
      r(e.errors);
    }, [e]),
    t
  );
};
const Ne = l.createContext(null);
function Ae(e) {
  const { children: t } = e;
  const r = p.exports.useContext(Ne);
  const { name: n, control: a } = (function (e) {
    return void 0 !== e.name;
  })(e)
    ? { name: e.name, control: r.get(e.name) }
    : { control: e.control };
  if (!(a instanceof Fe)) throw new Error("props error:Field can only receive FieldControl as control");
  const i = Ge(a);
  const o = we(a);
  const s = $e(a);
  const l = De(a);
  const c = Re(a);
  return t({
    name: n,
    value: i,
    setValue: a.setValue,
    markAsDirty: a.markAsDirty,
    markAsPristine: a.markAsPristine,
    errors: c,
    disabled: o,
    enabled: !o,
    valid: l,
    invalid: !l,
    dirty: s,
    pristine: !s,
  });
}
const Le = (e) => {
  const { children: t } = e;
  const r = p.exports.useContext(Ne);
  const { name: n, control: a } = ((e) => void 0 !== e.name)(e)
    ? { name: e.name, control: r.get(e.name) }
    : { control: e.control };
  const i = Ge(a);
  const o = we(a);
  const s = $e(a);
  const c = De(a);
  const u = {
    name: n,
    value: i,
    disabled: o,
    enabled: !o,
    errors: Re(a),
    valid: c,
    invalid: !c,
    dirty: s,
    pristine: !s,
    controls: ((e) => {
      const [t, r] = p.exports.useState(e.controls);
      return (
        p.exports.useEffect(() => {
          const t = e.controlsChange.subscribe(r);
          return () => {
            t.unsubscribe();
          };
        }, [e]),
        Oe(() => {
          r(e.controls);
        }, [e]),
        t
      );
    })(a),
  };
  return l.createElement(Ne.Provider, { value: a }, t(u));
};
class Be extends ke {
  get controls() {
    return this._controls;
  }

  get controlsChange() {
    return this.controlsSubject.asObservable().pipe(o(this.destroy$));
  }

  constructor(e, t = {}) {
    super(),
      (this.controlsSubject = new h()),
      (this.controlsChangeNotifyLock = !1),
      (this.get = (e) => this._controls[e]),
      (this.setValue = (e) => {
        e !== this.value && (this.setValueToControls(e), this.valueSubject$.next(e));
      }),
      (this.add = (e, t) => {
        if (this.controls[e]) return void console.warn(`already has control named ${e} in formGroup`);
        const r = Object.assign({}, this.controls, { [e]: _e(t) });
        this.controlsSubject.next(r);
      }),
      (this.remove = (e) => {
        if (!this.controls[e]) return void console.warn(`cannot find control named ${e} in formGroup`);
        const t = Object.assign({}, this.controls);
        delete t[e], this.controlsSubject.next(t);
      }),
      (this.checkValid = () => !(this.errors || Object.values(this._controls).some((e) => e.invalid))),
      (this.initControls = (e) => {
        const t = {};
        for (const r in e)
          if (Object.prototype.hasOwnProperty.call(e, r)) {
            const n = e[r];
            t[r] = _e(n);
          }
        this._controls = t;
      }),
      (this.setValueToControls = (e) => {
        (this.controlsChangeNotifyLock = !0),
          Object.keys(this._controls).forEach((t) => {
            const r = Object.prototype.hasOwnProperty.call(e, t);
            this._controls[t].setValue(r ? e[t] : null);
          }),
          (this.controlsChangeNotifyLock = !1);
      }),
      (this.updatePrivateControlsAndResetSubscribeGraph = (e) => {
        this.updatePrivateControls(e), this.valueSubject$.next(this.getGroupValueFromControls()), this.resetGraph();
      }),
      (this.updatePrivateControls = (e) => {
        this._controls = e;
      }),
      (this.getGroupValueFromControls = () => {
        const e = {};
        return (
          Object.keys(this._controls).forEach((t) => {
            const r = this._controls[t];
            r.enabled && (e[t] = r.value);
          }),
          e
        );
      }),
      (this.resetGraph = () => {
        const e = Object.values(this._controls);
        const t = e.map((e) => e.valueChange);
        const r = e.map((e) => e.validChange);
        const n = e.map((e) => e.disabledChange);
        this.resetValueGraph([...t, ...n]), this.resetValidGraph(r);
      }),
      (this.resetValidGraph = (e) => {
        this.validChangesSubscription && this.validChangesSubscription.unsubscribe(),
          (this.validChangesSubscription = c(...e)
            .pipe(
              o(this.destroy$),
              u(() => this.controlsChangeNotifyLock),
              d(() => this.checkValid())
            )
            .subscribe(this.setValid));
      }),
      this.initControls(e),
      this.initBasicParams(this.getGroupValueFromControls(), t),
      this.resetGraph(),
      this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph);
  }

  resetValueGraph(e) {
    this.valueChangesSubscription && this.valueChangesSubscription.unsubscribe(),
      (this.valueChangesSubscription = c(...e)
        .pipe(
          o(this.destroy$),
          u(() => this.controlsChangeNotifyLock),
          d(() => this.getGroupValueFromControls())
        )
        .subscribe((e) => {
          this.valueSubject$.next(e);
        }));
  }
}
const Te = () => {
  const e = p.exports.useRef(
    new Be({ consignee: ["vick"], address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"] })
  );
  return l.createElement(Le, { control: e.current }, (t) =>
    l.createElement(
      l.Fragment,
      null,
      l.createElement(Ae, { name: "consignee" }, ({ value: e, setValue: t }) =>
        l.createElement(v, { label: "consignee", variant: "outlined", value: e, onChange: (e) => t(e.target.value) })
      ),
      l.createElement("br", null),
      l.createElement("br", null),
      l.createElement(Ae, { name: "address" }, ({ value: e, setValue: t }) =>
        l.createElement(v, {
          label: "address",
          variant: "outlined",
          multiline: !0,
          maxRows: 14,
          value: e,
          onChange: (e) => t(e.target.value),
        })
      ),
      l.createElement("br", null),
      l.createElement("br", null),
      l.createElement(
        A,
        {
          variant: "contained",
          color: "primary",
          onClick: () => {
            console.log(e.current.value);
          },
        },
        "打印数据"
      )
    )
  );
};
const Ie = () =>
  l.createElement(
    "div",
    { className: "page" },
    l.createElement(S, { paragraph: !0, variant: "h2" }, "群组"),
    l.createElement(
      S,
      { paragraph: !0 },
      "Group是由name为key，以其他controller为value组成的hash型数据源，一张表单往往就是一个Group。"
    ),
    l.createElement(
      S,
      { paragraph: !0 },
      '我们现在创建一个包含"consignee"，"address"两个参数的群组。过程和创建单一元素是很接近的。'
    ),
    l.createElement(
      S,
      { paragraph: !0 },
      '首先，我们创造一个GroupController，其中包含"consignee"，"address"两个key，我们为这两个属性赋予两个FieldController, GroupController会自动订阅下级的Controllers:'
    ),
    l.createElement(
      je,
      null,
      '  const groupControlRef = useRef(\n    new GroupControl({\n      consignee: new FieldControl("vick"),\n      address: new FieldControl("No.1,Chaowai Street,Chaoyang District,Beijing City"),\n    })\n  );'
    ),
    l.createElement(S, { paragraph: !0 }, "也可以采用简写形式:"),
    l.createElement(
      je,
      null,
      ' const groupControlRef = useRef(\n    new GroupControl({\n      consignee: ["vick"],\n      address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"],\n    })\n  );'
    ),
    l.createElement(S, { paragraph: !0 }, "然后，利用", "<Group/>", "订阅GroupController"),
    l.createElement(
      je,
      null,
      "<Group control={groupControlRef.current}>\n    {(props) => {\n        return (\n          <>\n             //TODO\n          </>\n        );\n      }}\n</Group>"
    ),
    l.createElement(
      S,
      { paragraph: !0 },
      "至此Group的工作完成，接下来要将Group的Controller与视图关联。 由于本例中的Group包含的Controller均为FieldController， 我们采用",
      "<Field/>",
      "与其匹配，更复杂的例子可在",
      l.createElement(y, { to: "/" }, "高级使用"),
      "中查看"
    ),
    l.createElement(S, { paragraph: !0 }, "<Field/>", "可以通过name可以匹配外部GroupController的下级Controller"),
    l.createElement(
      je,
      null,
      '<Group control={groupControlRef.current}>\n      {(props) => {\n        return (\n          <>\n            <Field name="consignee">\n              {({ value, setValue }) => {\n                return (\n                  <TextField\n                    label="consignee"\n                    variant="outlined"\n                    value={value}\n                    onChange={(e) => setValue(e.target.value)}\n                  />\n                );\n              }}\n            </Field>\n\n            <br />\n            <br />\n\n            <Field name="address">\n              {({ value, setValue }) => {\n                return (\n                  <TextField\n                    label="address"\n                    variant="outlined"\n                    multiline\n                    maxRows={14}\n                    value={value}\n                    onChange={(e) => setValue(e.target.value)}\n                  />\n                );\n              }}\n            </Field>\n          </>\n        );\n      }}\n    </Group>'
    ),
    l.createElement(je, null, '<Field name="consignee"/> 相当于 <Field control="一个FieldController"/>'),
    l.createElement(S, { paragraph: !0 }, "<Field/>", "完整例子如下"),
    l.createElement(Ve, {
      demo: l.createElement(Te, null),
      code: 'import React, { useRef } from "react";\nimport { TextField } from "@material-ui/core";\nimport { Field, Group, GroupControl } from "react-observable-form";\n\nconst GroupDemo = () => {\n  // const groupControlRef = useRef(\n  //   new GroupControl({\n  //     consignee: new FieldControl("vick"),\n  //     address: new FieldControl("No.1,Chaowai Street,Chaoyang District,Beijing City"),\n  //   })\n  // );\n\n  const groupControlRef = useRef(\n    new GroupControl({\n      consignee: ["vick"],\n      address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"],\n    })\n  );\n\n  return (\n    <Group control={groupControlRef.current}>\n      {(props) => {\n        return (\n          <>\n            <Field name="consignee">\n              {({ value, setValue }) => {\n                return (\n                  <TextField\n                    label="consignee"\n                    variant="outlined"\n                    value={value}\n                    onChange={(e) => setValue(e.target.value)}\n                  />\n                );\n              }}\n            </Field>\n\n            <Field name="address">\n              {({ value, setValue }) => {\n                return (\n                  <TextField\n                    label="address"\n                    variant="outlined"\n                    multiline\n                    maxRows={14}\n                    value={value}\n                    onChange={(e) => setValue(e.target.value)}\n                  />\n                );\n              }}\n            </Field>\n            <Button\n              variant="contained"\n              color={"primary"}\n              onClick={() => {\n                console.log(groupControlRef.current.value);\n              }}\n            >\n              打印数据\n            </Button>\n          </>\n        );\n      }}\n    </Group>\n  );\n};',
    })
  );
function qe() {
  const e = L();
  return l.createElement(
    "div",
    { className: "App" },
    e.pathname !== "/" && l.createElement(ye, null),
    l.createElement(
      "div",
      { className: "content" },
      l.createElement(
        B,
        null,
        l.createElement(T, { exact: !0, path: "/", component: me }),
        l.createElement(T, { path: "/quick-start", component: ve }),
        l.createElement(T, { path: "/core", component: xe }),
        l.createElement(T, { path: "/field", component: Se }),
        l.createElement(T, { path: "/group", component: Ie })
      )
    )
  );
}
const Ue = I({
  palette: { primary: { main: "#6190E8" } },
  typography: {
    h2: { color: "#6190E8", fontWeight: 100 },
    h4: { fontWeight: 100 },
    body1: { fontWeight: 100, textIndent: 32 },
  },
});
q.render(
  l.createElement(
    l.StrictMode,
    null,
    l.createElement(
      U,
      { theme: Ue },
      l.createElement(M, { basename: "/react-observable-form" }, l.createElement(qe, null))
    )
  ),
  document.getElementById("root")
);
