import {
  S as s,
  l as o,
  t as i,
  r as c,
  R as u,
  F as m,
  I as h,
  T as d,
  m as p,
  s as v,
  a as g,
  b as E,
  c as b,
  d as C,
  e as f,
  L as y,
  f as x,
  h as F,
  g as V,
  i as k,
  j as S,
  k as w,
  n as j,
  o as G,
  p as R,
  C as N,
  q as _,
  u as $,
  v as P,
  w as L,
  x as O,
  B as D,
  A as T,
  y as A,
  z as B,
  D as q,
  E as I,
  G as H,
  H as M,
  J as W,
  K as J,
} from "./vendor.9bbf2aa8.js";
const e = Object.defineProperty;
const t = Object.getOwnPropertySymbols;
const r = Object.prototype.hasOwnProperty;
const n = Object.prototype.propertyIsEnumerable;
const a = (t, r, n) => (r in t ? e(t, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (t[r] = n));
const l = (e, l) => {
  for (var s in l || (l = {})) r.call(l, s) && a(e, s, l[s]);
  if (t) for (var s of t(l)) n.call(l, s) && a(e, s, l[s]);
  return e;
};
class U {
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
    return this.valueSubject$.asObservable().pipe(i(this.destroy$));
  }

  get errorsChange() {
    return this.errorsSubject$.asObservable().pipe(i(this.destroy$));
  }
constructor() {
    (this.valueSubject$ = new s()),
      (this.disabledSubject$ = new s()),
      (this.validSubject$ = new s()),
      (this.dirtySubject$ = new s()),
      (this.errorsSubject$ = new s()),
      (this.destroy$ = new s()),
      (this.destroy = () => {
        this.destroy$.next(!0);
      }),
      (this.setErrors = (e) => {
        o.exports.isEqual(e, this.errors) || this.errorsSubject$.next(e);
      }),
      (this.setValidators = (e) => {
        (this._validators = e), this.validateAndUpdateErrors();
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
      (this.validateAndUpdateErrors = () => {
        const e = K(this, this._validators);
        this.setErrors(e), this.setValid(this.checkValid());
      }),
      (this.setDisabled = (e) => {
        e !== this.disabled && this.disabledSubject$.next(e);
      }),
      (this.setDirty = (e) => {
        e !== this.dirty && this.dirtySubject$.next(e);
      });
  }

  

  get disabledChange() {
    return this.disabledSubject$.asObservable().pipe(i(this.destroy$));
  }

  get dirtyChange() {
    return this.dirtySubject$.asObservable().pipe(i(this.destroy$));
  }

  get validChange() {
    return this.validSubject$.asObservable().pipe(i(this.destroy$));
  }

  initBasicParams(e, { disabled: t = !1, dirty: r = !1, validators: n = [], autoMarkAsDirty: a = !0 }) {
    this.initValue(e),
      this.initValidators(n),
      this.initDisabled(t),
      this.initDirty(r),
      this.initErrors(K(this, n)),
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
class z extends U {
  constructor(e, t = {}) {
    super(),
      (this.setValue = (e) => {
        e !== this.value && this.valueSubject$.next(e);
      }),
      (this.checkValid = () => !this.errors),
      this.initBasicParams(e, t);
  }
}
const K = (e, t) => {
  const r = t.reduce((t, r) => {
    const n = r(e);
    return n && (t = l(l({}, t), n)), t;
  }, {});
  return o.exports.isEmpty(r) ? null : r;
};
const Q = (e) => (e instanceof U ? e : new z(...e));
const X = (e, t) => {
  const r = c.exports.useRef(!1);
  c.exports.useEffect(() => {
    if (r.current) return e();
    r.current = !0;
  }, t);
};
const Y = (e) => {
  const [t, r] = c.exports.useState(e.value);
  return (
    c.exports.useEffect(() => {
      const t = e.valueChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    X(() => {
      r(e.value);
    }, [e]),
    t
  );
};
const Z = (e) => {
  const [t, r] = c.exports.useState(e.disabled);
  return (
    c.exports.useEffect(() => {
      const t = e.disabledChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    X(() => {
      r(e.disabled);
    }, [e]),
    t
  );
};
const ee = (e) => {
  const [t, r] = c.exports.useState(e.dirty);
  return (
    c.exports.useEffect(() => {
      const t = e.dirtyChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    X(() => {
      r(e.dirty);
    }, [e]),
    t
  );
};
const te = (e) => {
  const [t, r] = c.exports.useState(e.valid);
  return (
    c.exports.useEffect(() => {
      const t = e.validChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    X(() => {
      r(e.valid);
    }, [e]),
    t
  );
};
const re = (e) => {
  const [t, r] = c.exports.useState(e.errors);
  return (
    c.exports.useEffect(() => {
      const t = e.errorsChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    X(() => {
      r(e.errors);
    }, [e]),
    t
  );
};
const ne = (e) => {
  const [t, r] = c.exports.useState(e.controls);
  return (
    c.exports.useEffect(() => {
      const t = e.controlsChange.subscribe(r);
      return () => {
        t.unsubscribe();
      };
    }, [e]),
    X(() => {
      r(e.controls);
    }, [e]),
    t
  );
};
const ae = u.createContext(null);
function le(e) {
  const { children: t } = e;
  const r = c.exports.useContext(ae);
  const { name: n, control: a } = (function (e) {
    return void 0 !== e.name;
  })(e)
    ? { name: e.name, control: r.get(e.name) }
    : { control: e.control };
  if (!(a instanceof z)) throw new Error("props error:Field can only receive FieldControl as control");
  const l = Y(a);
  const s = Z(a);
  const o = ee(a);
  const i = te(a);
  const u = re(a);
  return t({
    name: n,
    value: l,
    setValue: a.setValue,
    markAsDirty: a.markAsDirty,
    markAsPristine: a.markAsPristine,
    errors: u,
    disabled: s,
    enabled: !s,
    valid: i,
    invalid: !i,
    dirty: o,
    pristine: !o,
  });
}
const se = () => {
  const e = c.exports.useRef(new z(""));
  return u.createElement(le, { control: e.current }, ({ value: e, setValue: t }) =>
    u.createElement(
      m.Item,
      { label: "Ant Design" },
      u.createElement(h, { value: e, onChange: (e) => t(e.target.value) })
    )
  );
};
const oe = () => {
  const e = c.exports.useRef(new z(""));
  return u.createElement(le, { control: e.current }, ({ value: e, setValue: t }) =>
    u.createElement(d, { label: "material-ui", value: e, onChange: (e) => t(e.target.value) })
  );
};
class ie extends U {
  get controls() {
    return this._controls;
  }

  get controlsChange() {
    return this.controlsSubject.asObservable().pipe(i(this.destroy$));
  }

  constructor(e, t = {}) {
    super(),
      (this.controlsSubject = new s()),
      (this.controlsChangeNotifyLock = !1),
      (this.get = (e) => this._controls[e]),
      (this.setValue = (e) => {
        e !== this.value && (this.setValueToControls(e), this.valueSubject$.next(e));
      }),
      (this.add = (e, t) => {
        if (this.controls[e]) return void console.warn(`already has control named ${e} in formGroup`);
        const r = Object.assign({}, this.controls, { [e]: Q(t) });
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
            t[r] = Q(n);
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
          (this.validChangesSubscription = p(...e)
            .pipe(
              i(this.destroy$),
              v(() => this.controlsChangeNotifyLock),
              g(() => this.checkValid())
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
      (this.valueChangesSubscription = p(...e)
        .pipe(
          i(this.destroy$),
          v(() => this.controlsChangeNotifyLock),
          g(() => this.getGroupValueFromControls())
        )
        .subscribe((e) => {
          this.valueSubject$.next(e);
        }));
  }
}
const ce = (e) => {
  const { children: t } = e;
  const r = c.exports.useContext(ae);
  const { name: n, control: a } = ((e) => void 0 !== e.name)(e)
    ? { name: e.name, control: r.get(e.name) }
    : { control: e.control };
  const l = Y(a);
  const s = Z(a);
  const o = ee(a);
  const i = te(a);
  const m = {
    name: n,
    value: l,
    disabled: s,
    enabled: !s,
    errors: re(a),
    valid: i,
    invalid: !i,
    dirty: o,
    pristine: !o,
    controls: ne(a),
  };
  return u.createElement(ae.Provider, { value: a }, t(m));
};
const ue = new ie({ married: ["unmarried"], spouse: ["", { disabled: !0 }] });
const me = ue.get("married");
const he = ue.get("spouse");
me.valueChange.subscribe((e) => {
  e === "married" ? he.enable() : (he.setValue(""), he.disable());
});
const de = () =>
  u.createElement(ce, { control: ue }, () =>
    u.createElement(
      u.Fragment,
      null,
      u.createElement(E, { component: "legend" }, "婚姻状况"),
      u.createElement(le, { name: "married" }, ({ value: e, setValue: t }) =>
        u.createElement(
          u.Fragment,
          null,
          u.createElement(
            b,
            {
              value: e,
              onChange: (e) => {
                t(e.target.value);
              },
            },
            u.createElement(C, { value: "unmarried", control: u.createElement(f, null), label: "未婚" }),
            u.createElement(C, { value: "married", control: u.createElement(f, null), label: "已婚" })
          )
        )
      ),
      u.createElement("br", null),
      u.createElement(le, { name: "spouse" }, ({ value: e, setValue: t, disabled: r }) =>
        u.createElement(d, { label: "配偶姓名", disabled: r, value: e, onChange: (e) => t(e.target.value) })
      )
    )
  );
const pe = () =>
  u.createElement(
    "main",
    { className: "home" },
    u.createElement(
      "div",
      { className: "banner" },
      u.createElement("img", { src: "/react-observable-form/assets/rx.18995810.png", className: "rxImg" }),
      u.createElement("img", { src: "/react-observable-form/assets/react.7f55f92c.svg", className: "reactImg" }),
      u.createElement(
        "nav",
        null,
        u.createElement(
          "div",
          null,
          u.createElement(y, { className: "link", to: "/quick-start" }, "文档"),
          u.createElement(y, { className: "link", to: "/" }, "示例")
        ),
        u.createElement(
          "div",
          null,
          u.createElement("a", { href: "https://github.com/vickmeng/react-observable-form" }, u.createElement(x, null))
        )
      ),
      u.createElement("h1", null, "React Observable Form"),
      u.createElement("h2", null, "可自由订阅状态变化的React响应式表单方案"),
      u.createElement(
        "div",
        null,
        u.createElement(y, { className: "quick-start link", to: "/quick-start" }, "快速开始")
      )
    ),
    u.createElement(
      "section",
      null,
      u.createElement("h2", null, "响应式"),
      u.createElement("p", null, "随时随处订阅表单元素状态变化"),
      u.createElement("img", { src: "/react-observable-form/assets/flow.1c028861.png", width: 500 })
    ),
    u.createElement(
      "section",
      null,
      u.createElement("h2", null, "自由集成"),
      u.createElement("p", null, "自由对接流行的组件库"),
      u.createElement(
        "div",
        { className: "third" },
        u.createElement("div", { className: "third--demo antd" }, u.createElement(se, null)),
        u.createElement("div", { className: "divide vertical" }),
        u.createElement("div", { className: "third--demo mui" }, u.createElement(oe, null))
      )
    ),
    u.createElement(
      "section",
      null,
      u.createElement("h2", null, "集中管理"),
      u.createElement("p", null, "声明式表单，集中管理动态逻辑"),
      u.createElement(
        "div",
        { className: "declare" },
        u.createElement(
          "div",
          { className: "code" },
          u.createElement(
            F,
            { language: "javascript", style: V },
            'const group = new GroupControl({\n  married: ["unmarried"],\n  spouse: ["", { disabled: true }],\n});\n\nconst married = group.get("married");\nconst spouse = group.get("spouse");\n\nmarried.valueChange.subscribe((v) => {\n  if (v === "married") {\n    spouse.enable();\n  } else {\n    spouse.setValue("");\n    spouse.disable();\n  }\n});'
          )
        ),
        u.createElement("div", { className: "demo" }, u.createElement(de, null))
      )
    ),
    u.createElement("footer", null, "遵循 MIT 开源协议    Copyright © Rxjs-CN")
  );
const ve = () =>
  u.createElement(
    "div",
    { className: "page" },
    u.createElement(k, { paragraph: !0, variant: "h2" }, "快速开始"),
    u.createElement(k, { paragraph: !0, variant: "h4" }, "环境准备"),
    u.createElement(k, { paragraph: !0 }, "请确保使用 v16.8及更高版本的react"),
    u.createElement(k, { paragraph: !0, variant: "h4" }, "安装"),
    u.createElement(
      F,
      { language: "javascript", style: V },
      "yarn add rxjs react-observable-form\n\nor\n\nnpm install rxjs react-observable-form"
    )
  );
const ge = {
  title: "基础使用",
  routes: [
    { text: "单一元素", link: "/field" },
    { text: "群组", link: "/group" },
    { text: "列表", link: "/list" },
    { text: "校验", link: "/validate" },
  ],
};
const Ee = {
  title: "高级使用",
  routes: [
    { text: "订阅变化", link: "/subscribe" },
    { text: "动态表单", link: "/dynamic" },
    { text: "联合校验", link: "" },
    { text: "复杂嵌套", link: "" },
    { text: "与Rxjs", link: "" },
  ],
};
const be = {
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
  const [t, r] = c.exports.useState(!1);
  return u.createElement(
    u.Fragment,
    null,
    u.createElement(
      w,
      {
        button: !0,
        onClick: () => {
          r(!t);
        },
      },
      u.createElement(j, { primary: e.title }),
      t ? u.createElement(G, null) : u.createElement(R, null)
    ),
    u.createElement(
      N,
      { in: t, timeout: "auto", unmountOnExit: !0 },
      u.createElement(
        S,
        { component: "div", disablePadding: !0, className: "submenu--list" },
        e.routes.map((e) =>
          u.createElement(
            y,
            { to: e.link, key: e.text },
            u.createElement(w, { button: !0, className: "nested" }, u.createElement(j, { primary: e.text }))
          )
        )
      )
    )
  );
};
const fe = () =>
  u.createElement(
    "aside",
    { className: "menu" },
    u.createElement(
      S,
      { component: "nav", "aria-labelledby": "nested-list-subheader" },
      u.createElement(y, { to: "/" }, u.createElement(w, { button: !0 }, u.createElement(j, { primary: "首页" }))),
      u.createElement(
        y,
        { to: "/quick-start" },
        u.createElement(w, { button: !0 }, u.createElement(j, { primary: "快速开始" }))
      ),
      u.createElement(
        y,
        { to: "/core" },
        u.createElement(w, { button: !0 }, u.createElement(j, { primary: "核心概念" }))
      ),
      u.createElement(Ce, { menu: ge }),
      u.createElement(Ce, { menu: Ee }),
      u.createElement(Ce, { menu: be }),
      u.createElement(
        y,
        { to: "/resources" },
        u.createElement(w, { button: !0 }, u.createElement(j, { primary: "更多选择" }))
      )
    )
  );
const ye = () =>
  u.createElement(
    "div",
    { className: "page" },
    u.createElement(k, { paragraph: !0, variant: "h2" }, "核心概念"),
    u.createElement(k, { paragraph: !0 }, "react-observable-form主要包含两个概念：Controller与Component。"),
    u.createElement(k, { paragraph: !0, variant: "h4" }, "Controllers"),
    u.createElement(
      k,
      { paragraph: !0 },
      "Controller是数据的源头，它为视图提供一系列可观察对象，以及操作数据的方法，使用者可以通过订阅这些可观察对象获得如：value，errors等状态。"
    ),
    u.createElement(k, { paragraph: !0 }, "我们有如下三种class创建Controller："),
    u.createElement(
      k,
      { paragraph: !0 },
      u.createElement(
        "ul",
        null,
        u.createElement("li", null, "FieldControl：用以创建单一元素的控制器"),
        u.createElement("li", null, "GroupControl：用以创建群组元素的控制器"),
        u.createElement("li", null, "ListControl：用以创建列表元素的控制器")
      )
    ),
    u.createElement(k, { paragraph: !0, variant: "h4" }, "Components"),
    u.createElement(
      k,
      { paragraph: !0 },
      "就是React组件，作为Controller的订阅者，可以获取其订阅的Controller的值向下传递，也提供方法让下级组件将状态上传，从而实现受控组件。"
    ),
    u.createElement(k, { paragraph: !0 }, "我们有如下三种Components："),
    u.createElement(
      k,
      { paragraph: !0 },
      u.createElement(
        "ul",
        null,
        u.createElement("li", null, " ", "<Field/>", "：FieldControl的订阅器"),
        u.createElement("li", null, " ", "<Group/>", "：GroupControl的订阅器"),
        u.createElement("li", null, " ", "<List/>", "：ListControl的订阅器")
      )
    ),
    u.createElement("br", null),
    u.createElement(
      k,
      { paragraph: !0 },
      "可以查看",
      u.createElement(y, { to: "/field" }, "基础使用"),
      "更直观得进行学习"
    )
  );
const xe = ({ children: e }) => u.createElement(F, { language: "typescript", style: V }, e);
const Fe = (e) => {
  const [t, r] = u.useState(!1);
  return u.createElement(
    _,
    null,
    u.createElement($, null, e.demo),
    u.createElement(
      P,
      { disableSpacing: !0 },
      u.createElement(
        L,
        {
          onClick: () => {
            r(!t);
          },
          "aria-expanded": t,
          "aria-label": "show more",
        },
        u.createElement(O, { color: t ? "primary" : "inherit" })
      )
    ),
    u.createElement(
      N,
      { in: t, timeout: "auto", unmountOnExit: !0 },
      u.createElement($, null, u.createElement(xe, null, e.code))
    )
  );
};
const Ve = () =>
  u.createElement(
    "div",
    { className: "page" },
    u.createElement(k, { paragraph: !0, variant: "h2" }, "单一元素"),
    u.createElement(
      k,
      { paragraph: !0 },
      "我们用Field指代单一元素，它是最小的数据源。往往绑定一个单独的受控组件，比如一个输入框，一个树形选择器。"
    ),
    u.createElement(k, { paragraph: !0 }, "首先，我们创建一个FieldController作为数据源。"),
    u.createElement(
      k,
      { paragraph: !0 },
      "兵无常势，水无常形。",
      u.createElement(
        "b",
        null,
        "你可以根据需要把FieldController放在任何一个可方便获取的位置,可以是组件外，",
        "<Context/>",
        "中，或者各种状态管理工具，但请避免重复创造实例。"
      ),
      " ",
      "本例中我们放在useRef里。"
    ),
    u.createElement(xe, null, 'const controlRef = useRef(new FieldControl<string>(""));'),
    u.createElement("br", null),
    u.createElement(
      k,
      { paragraph: !0 },
      "FieldControl接受两个参数，第一个参数是默认值，第二个参数是其他初始化配置。可以在",
      u.createElement(y, { to: "/" }, "API"),
      "中获取更多信息。接下来利用",
      "<Field/>",
      "订阅FieldController。"
    ),
    u.createElement(xe, null, "<Field control={controlRef.current}></Field>"),
    u.createElement("br", null),
    u.createElement(
      k,
      { paragraph: !0 },
      "将FieldController传入",
      "<Field/>",
      "，",
      "<Field/>",
      "会在初始化时自动订阅FieldController的状态，同时在销毁时取消订阅。"
    ),
    u.createElement(k, { paragraph: !0 }, "接下来，将", "<Field/>", "得到的数据传递给视图"),
    u.createElement(
      xe,
      null,
      '<Field control={controlRef.current}>\n    {({ value, setValue }) => {\n        return <TextField label="material-ui" value={value} onChange={(e) => setValue(e.target.value)} />;\n    }}\n</Field>'
    ),
    u.createElement("br", null),
    u.createElement(
      k,
      { paragraph: !0 },
      "<Field/>",
      "接受函数作为children，向下传递状态与控制状态的方法。本例将value传入给视图组件，并暴露setValue方法，提供修改value的能力。",
      u.createElement("b", null, "如果使用者觉得这个函数有些啰嗦，开发团队期待你使用如HOC等任何的编程技巧简化代码。")
    ),
    u.createElement("br", null),
    u.createElement(k, { paragraph: !0 }, "本来自采用material-ui作为视图库。完整代码如下："),
    u.createElement(Fe, {
      code: 'import { useRef } from "react";\nimport { TextField } from "@material-ui/core";\nimport { Field, FieldControl } from "react-observable-form";\n\nexport const BasicWithMui = () => {\n  const controlRef = useRef(new FieldControl<string>(""));\n\n  return (\n    <Field control={controlRef.current}>\n      {({ value, setValue }) => {\n        return <TextField label="material-ui" value={value} onChange={(e) => setValue(e.target.value)} />;\n      }}\n    </Field>\n  );\n};\n',
      demo: u.createElement(oe, null),
    })
  );
const ke = (e) => {
  const { children: t } = e;
  const r = c.exports.useContext(ae);
  const { name: n, control: a } = ((e) => void 0 !== e.name)(e)
    ? { name: e.name, control: r.get(e.name) }
    : { control: e.control };
  const l = Y(a);
  const s = Z(a);
  const o = ee(a);
  const i = te(a);
  const m = {
    name: n,
    value: l,
    disabled: s,
    enabled: !s,
    errors: re(a),
    valid: i,
    invalid: !i,
    dirty: o,
    pristine: !o,
    controls: ne(a),
  };
  return u.createElement(ae.Provider, { value: a }, t(m));
};
const Se = (e) => {
  const { children: t } = e;
  const r = c.exports.useContext(ae);
  const { name: n, control: a } = (function (e) {
    return void 0 !== e.name;
  })(e)
    ? { name: e.name, control: r.get(e.name) }
    : { control: e.control };
  const l = ee(a);
  return t({ name: n, errors: re(a), dirty: l, pristine: !l });
};
class we extends U {
  get controls() {
    return this._controls;
  }

  get controlsChange() {
    return this.controlsSubject.asObservable().pipe(i(this.destroy$));
  }

  constructor(e, t = {}) {
    super(),
      (this.controlsSubject = new s()),
      (this.controlsChangeNotifyLock = !1),
      (this.get = (e) => this._controls[+e]),
      (this.insert = (e, ...t) => {
        const r = [...this.controls];
        const n = t.map((e) => Q(e));
        r.splice(e, 0, ...n), this.controlsSubject.next(r);
      }),
      (this.push = (...e) => {
        this.insert(this.controls.length, ...e);
      }),
      (this.remove = (e, t = 1) => {
        const r = [...this.controls];
        r.splice(e, t), this.controlsSubject.next(r);
      }),
      (this.setValue = (e) => {
        e !== this.value && this.valueSubject$.next(e);
      }),
      (this.checkValid = () => !(this.errors || this._controls.some((e) => e.invalid))),
      (this.initControls = (e) => {
        this._controls = e.map((e) => Q(e));
      }),
      (this.updatePrivateControlsAndResetSubscribeGraph = (e) => {
        this.updatePrivateControls(e), this.valueSubject$.next(this.getListValueFromControls()), this.resetGraph();
      }),
      (this.updatePrivateControls = (e) => {
        this._controls = e;
      }),
      (this.getListValueFromControls = () => {
        const e = [];
        return (
          Object.keys(this._controls).forEach((t, r) => {
            const n = this._controls[r];
            n.enabled && (e[r] = n.value);
          }),
          e
        );
      }),
      (this.resetGraph = () => {
        const e = this._controls.map((e) => e.valueChange);
        const t = this._controls.map((e) => e.validChange);
        const r = this._controls.map((e) => e.disabledChange);
        this.resetValueGraph([...e, ...r]), this.resetValidGraph(t);
      }),
      (this.resetValidGraph = (e) => {
        this.validChangesSubscription && this.validChangesSubscription.unsubscribe(),
          (this.validChangesSubscription = p(...e)
            .pipe(
              i(this.destroy$),
              v(() => this.controlsChangeNotifyLock),
              g(() => this.checkValid())
            )
            .subscribe(this.setValid));
      }),
      this.initControls(e),
      this.initBasicParams(this.getListValueFromControls(), t),
      this.resetGraph(),
      this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph);
  }

  resetValueGraph(e) {
    this.valueChangesSubscription && this.valueChangesSubscription.unsubscribe(),
      (this.valueChangesSubscription = p(...e)
        .pipe(
          i(this.destroy$),
          v(() => this.controlsChangeNotifyLock),
          g(() => this.getListValueFromControls())
        )
        .subscribe((e) => {
          this.valueSubject$.next(e);
        }));
  }
}
const je = () => {
  const e = c.exports.useRef(
    new ie({ consignee: ["Vick"], address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"] })
  );
  return u.createElement(ce, { control: e.current }, (t) =>
    u.createElement(
      u.Fragment,
      null,
      u.createElement(le, { name: "consignee" }, ({ value: e, setValue: t }) =>
        u.createElement(d, { label: "consignee", variant: "outlined", value: e, onChange: (e) => t(e.target.value) })
      ),
      u.createElement("br", null),
      u.createElement("br", null),
      u.createElement(le, { name: "address" }, ({ value: e, setValue: t }) =>
        u.createElement(d, {
          label: "address",
          variant: "outlined",
          multiline: !0,
          maxRows: 14,
          value: e,
          onChange: (e) => t(e.target.value),
        })
      ),
      u.createElement("br", null),
      u.createElement("br", null),
      u.createElement(
        D,
        {
          variant: "contained",
          color: "primary",
          onClick: () => {
            console.log(e.current.value);
          },
        },
        "在控制台中打印数据"
      )
    )
  );
};
const Ge = () =>
  u.createElement(
    "div",
    { className: "page" },
    u.createElement(k, { paragraph: !0, variant: "h2" }, "群组"),
    u.createElement(
      k,
      { paragraph: !0 },
      "我们用Group指代群组，它是由name为key，以其他controller为value组成的hash型数据源，一张表单往往就是一个Group。"
    ),
    u.createElement(
      k,
      { paragraph: !0 },
      '我们现在创建一个包含"consignee"，"address"两个参数的群组。过程和创建单一元素是很接近的。'
    ),
    u.createElement(
      k,
      { paragraph: !0 },
      '首先，我们创造一个GroupController，其中包含"consignee"，"address"两个key，我们为这两个属性赋予两个FieldController, GroupController会自动订阅下级的Controllers:'
    ),
    u.createElement(
      xe,
      null,
      '  const groupControlRef = useRef(\n    new GroupControl({\n      consignee: new FieldControl("vick"),\n      address: new FieldControl("No.1,Chaowai Street,Chaoyang District,Beijing City"),\n    })\n  );'
    ),
    u.createElement(k, { paragraph: !0 }, "也可以采用简写形式:"),
    u.createElement(
      xe,
      null,
      ' const groupControlRef = useRef(\n    new GroupControl({\n      consignee: ["vick"],\n      address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"],\n    })\n  );'
    ),
    u.createElement(k, { paragraph: !0 }, "然后，利用", "<Group/>", "订阅GroupController"),
    u.createElement(
      xe,
      null,
      "<Group control={groupControlRef.current}>\n    {(props) => {\n        return (\n          <>\n             //TODO\n          </>\n        );\n      }}\n</Group>"
    ),
    u.createElement(
      k,
      { paragraph: !0 },
      "至此Group的工作完成，接下来要将Group的Controller与视图关联。 由于本例中的Group包含的Controller均为FieldController， 我们采用",
      "<Field/>",
      "与其匹配，更复杂的例子可在",
      u.createElement(y, { to: "/" }, "高级使用"),
      "中查看"
    ),
    u.createElement(k, { paragraph: !0 }, "<Field/>", "可以通过name可以匹配外部GroupController的下级Controller"),
    u.createElement(
      xe,
      null,
      '<Group control={groupControlRef.current}>\n      {(props) => {\n        return (\n          <>\n            <Field name="consignee">\n              {({ value, setValue }) => {\n                return (\n                  <TextField\n                    label="consignee"\n                    variant="outlined"\n                    value={value}\n                    onChange={(e) => setValue(e.target.value)}\n                  />\n                );\n              }}\n            </Field>\n\n            <br />\n            <br />\n\n            <Field name="address">\n              {({ value, setValue }) => {\n                return (\n                  <TextField\n                    label="address"\n                    variant="outlined"\n                    multiline\n                    maxRows={14}\n                    value={value}\n                    onChange={(e) => setValue(e.target.value)}\n                  />\n                );\n              }}\n            </Field>\n          </>\n        );\n      }}\n    </Group>'
    ),
    u.createElement(xe, null, '<Field name="consignee"/> 相当于 <Field control="一个FieldController"/>'),
    u.createElement(k, { paragraph: !0 }, "<Field/>", "完整例子如下"),
    u.createElement(Fe, {
      demo: u.createElement(je, null),
      code: 'import React, { useRef } from "react";\nimport { TextField } from "@material-ui/core";\nimport { Field, Group, GroupControl } from "react-observable-form";\n\nconst GroupDemo = () => {\n  // const groupControlRef = useRef(\n  //   new GroupControl({\n  //     consignee: new FieldControl("vick"),\n  //     address: new FieldControl("No.1,Chaowai Street,Chaoyang District,Beijing City"),\n  //   })\n  // );\n\n  const groupControlRef = useRef(\n    new GroupControl({\n      consignee: ["vick"],\n      address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"],\n    })\n  );\n\n  return (\n    <Group control={groupControlRef.current}>\n      {(props) => {\n        return (\n          <>\n            <Field name="consignee">\n              {({ value, setValue }) => {\n                return (\n                  <TextField\n                    label="consignee"\n                    variant="outlined"\n                    value={value}\n                    onChange={(e) => setValue(e.target.value)}\n                  />\n                );\n              }}\n            </Field>\n\n            <Field name="address">\n              {({ value, setValue }) => {\n                return (\n                  <TextField\n                    label="address"\n                    variant="outlined"\n                    multiline\n                    maxRows={14}\n                    value={value}\n                    onChange={(e) => setValue(e.target.value)}\n                  />\n                );\n              }}\n            </Field>\n            <Button\n              variant="contained"\n              color={"primary"}\n              onClick={() => {\n                console.log(groupControlRef.current.value);\n              }}\n            >\n              打印数据\n            </Button>\n          </>\n        );\n      }}\n    </Group>\n  );\n};',
    })
  );
const Re = () => {
  const e = c.exports.useRef(new we([["Vick"], ["Tom"], ["Jack"], ["Lulu"]]));
  return u.createElement(
    u.Fragment,
    null,
    u.createElement(
      "ul",
      { className: "list-demo__ul" },
      u.createElement(ke, { control: e.current }, (e) => {
        const a = e;
        const { controls: l } = a;
        ((e, a) => {
          const l = {};
          for (var s in e) r.call(e, s) && a.indexOf(s) < 0 && (l[s] = e[s]);
          if (e != null && t) for (var s of t(e)) a.indexOf(s) < 0 && n.call(e, s) && (l[s] = e[s]);
        })(a, ["controls"]);
        return u.createElement(
          u.Fragment,
          null,
          l.map((e, t) =>
            u.createElement(
              "li",
              { key: `key${t}` },
              u.createElement(T, null, t + 1),
              u.createElement(le, { name: `${t}` }, ({ value: e, setValue: t }) =>
                u.createElement(d, { label: "姓名", value: e, onChange: (e) => t(e.target.value) })
              )
            )
          )
        );
      })
    ),
    u.createElement(
      D,
      {
        variant: "contained",
        color: "primary",
        onClick: () => {
          console.log(e.current.value);
        },
      },
      "在控制台中打印数据"
    )
  );
};
const Ne = () =>
  u.createElement(
    "div",
    { className: "page" },
    u.createElement(k, { paragraph: !0, variant: "h2" }, "列表"),
    u.createElement(
      k,
      { paragraph: !0 },
      "我们用List指代列表，与Group的用法很接近，它是由index为key，以其他controller为value组成的数组型数据源。"
    ),
    u.createElement(k, { paragraph: !0 }, "我们直接用一个例子进行描述："),
    u.createElement(Fe, {
      demo: u.createElement(Re, null),
      code: 'import React, { useRef } from "react";\nimport { Avatar, Button, TextField } from "@material-ui/core";\nimport { Field,ListControl,List } from "react-observable-form";\nimport "./index.less";\n\nconst ListDemo = () => {\n  const controlRef = useRef(new ListControl([["Vick"], ["Tom"], ["Jack"], ["Lulu"]]));\n\n  return (\n    <>\n      <ul className="list-demo__ul">\n        <List control={controlRef.current}>\n          {({ controls, ...rest }) => {\n            return (\n              <>\n                {controls.map((control, i) => {\n                  return (\n                    <li key={`key${i}`}>\n                      <Avatar>{i + 1}</Avatar>\n                      <Field name={`${i}`}>\n                        {({ value, setValue }) => {\n                          return <TextField label="姓名" value={value} onChange={(e) => setValue(e.target.value)} />;\n                        }}\n                      </Field>\n                    </li>\n                  );\n                })}\n              </>\n            );\n          }}\n        </List>\n      </ul>\n\n      <Button\n        variant="contained"\n        color={"primary"}\n        onClick={() => {\n          console.log(controlRef.current.value);\n        }}\n      >\n        在控制台中打印数据\n      </Button>\n    </>\n  );\n};',
    })
  );
const _e = (e) => {
  return (t = e.value) == null || t.length === 0 ? { required: !0 } : null;
  let t;
};
const $e = () => {
  const e = c.exports.useRef(
    new z("这是一条过长的姓名", {
      dirty: !0,
      validators: [
        _e,
        ((t = 4),
        (e) => {
          return (r = e.value) != null && typeof r.length === "number" && e.value.length > t
            ? { maxlength: { requiredLength: t, actualLength: e.value.length } }
            : null;
          let r;
        }),
      ],
    })
  );
  let t;
  return u.createElement(
    u.Fragment,
    null,
    u.createElement(le, { control: e.current }, ({ value: e, setValue: t, dirty: r, errors: n }) =>
      u.createElement(
        u.Fragment,
        null,
        u.createElement(d, {
          variant: "outlined",
          label: "姓名",
          error: Boolean(r && n),
          value: e,
          onChange: (e) => t(e.target.value),
        })
      )
    ),
    u.createElement(Se, { control: e.current }, ({ dirty: e, errors: t }) =>
      u.createElement(
        u.Fragment,
        null,
        e &&
          u.createElement(
            u.Fragment,
            null,
            (t == null ? void 0 : t.required) && u.createElement(A, { error: !0 }, "请填写姓名"),
            (t == null ? void 0 : t.maxlength) &&
              u.createElement(
                A,
                { error: !0 },
                "姓名不可大于",
                t.maxlength.requiredLength,
                "位，当前为",
                t.maxlength.actualLength,
                "位"
              )
          )
      )
    )
  );
};
const Pe = () =>
  u.createElement(
    "div",
    { className: "page" },
    u.createElement(k, { paragraph: !0, variant: "h2" }, "校验"),
    u.createElement(
      k,
      { paragraph: !0 },
      "我们可以在初始化时通过validators参数为controller设计校验规则，也可以通过controller暴露的setValidators方法方法动态修改校验规则。 controller会根据validators的顺序依次进行校验，我们可以在",
      u.createElement(y, { to: "/" }, "动态表单"),
      "中了解更多内容。"
    ),
    u.createElement(
      k,
      { paragraph: !0 },
      "validators接受一组符合validatorFn的方法，开发者可以由此定义校验规则，同时,react-observable-form也为开发者准备了一些常用的校验方法可供参考与是用,",
      u.createElement("a", null, "可在此处查看"),
      "。这部分实现大量的参考了@angular/core的forms模块。"
    ),
    u.createElement(
      k,
      { paragraph: !0 },
      "为了让不同类型组件职能更单纯，我们提供了专门的",
      "<Errors/>",
      "组件处理错误信息，也可以在其他任意的组件中消费错误，如下："
    ),
    u.createElement(Fe, {
      demo: u.createElement($e, null),
      code: 'import React, { useRef } from "react";\nimport { TextField, FormHelperText } from "@material-ui/core";\n\nimport { maxLengthValidator, requiredValidator } from "react-observable-form/validators";\nimport { Error,Field,FieldControl } from "react-observable-form";\n\nexport const ValidateDemo = () => {\n  const controlRef = useRef(\n    new FieldControl("这是一条过长的姓名", { dirty: true, validators: [requiredValidator, maxLengthValidator(4)] })\n  );\n\n  return (\n    <>\n      <Field control={controlRef.current}>\n        {({ value, setValue, dirty, errors }) => {\n          return (\n            <>\n              <TextField\n                variant="outlined"\n                label={"姓名"}\n                // 同样可以在<Field/>中消费errors\n                error={Boolean(dirty && errors)}\n                value={value}\n                onChange={(e) => setValue(e.target.value)}\n              />\n            </>\n          );\n        }}\n      </Field>\n      <Error control={controlRef.current}>\n        {({ dirty, errors }) => {\n          return (\n            <>\n              {dirty && (\n                <>\n                  {errors?.required && <FormHelperText error>请填写姓名</FormHelperText>}\n\n                  {errors?.maxlength && (\n                    <FormHelperText error>\n                      姓名不可大于{errors.maxlength.requiredLength}位，当前为{errors.maxlength.actualLength}位\n                    </FormHelperText>\n                  )}\n                </>\n              )}\n            </>\n          );\n        }}\n      </Error>\n    </>\n  );\n};',
    })
  );
const Le = () =>
  u.createElement(
    "div",
    { className: "page" },
    u.createElement(k, { paragraph: !0, variant: "h2" }, "动态表单"),
    u.createElement(k, { paragraph: !0 }, "动态表单")
  );
const Oe = () =>
  u.createElement("div", { className: "page" }, u.createElement(k, { paragraph: !0, variant: "h2" }, "订阅变化"));
const De = () =>
  u.createElement(
    "div",
    { className: "page" },
    u.createElement(k, { paragraph: !0, variant: "h2" }, "更多选择"),
    u.createElement(k, { paragraph: !0 }, "react社区中还有非常多的优秀竞品值得关注："),
    u.createElement(
      k,
      { paragraph: !0 },
      u.createElement(
        "ul",
        null,
        u.createElement(
          "li",
          null,
          u.createElement("a", { href: "https://www.react-hook-form.com" }, "react-hook-form")
        ),
        u.createElement(
          "li",
          null,
          u.createElement("a", { href: "https://www.npmjs.com/package/react-final-form" }, "react-final-form")
        ),
        u.createElement("li", null, u.createElement("a", { href: "https://www.npmjs.com/package/formik" }, "formik"))
      )
    )
  );
function Te() {
  const e = B();
  return u.createElement(
    "div",
    { className: "App" },
    e.pathname !== "/" && u.createElement(fe, null),
    u.createElement(
      "div",
      { className: "content" },
      u.createElement(
        q,
        null,
        u.createElement(I, { exact: !0, path: "/", component: pe }),
        u.createElement(I, { path: "/quick-start", component: ve }),
        u.createElement(I, { path: "/core", component: ye }),
        u.createElement(I, { path: "/field", component: Ve }),
        u.createElement(I, { path: "/group", component: Ge }),
        u.createElement(I, { path: "/list", component: Ne }),
        u.createElement(I, { path: "/validate", component: Pe }),
        u.createElement(I, { path: "/subscribe", component: Oe }),
        u.createElement(I, { path: "/dynamic", component: Le }),
        u.createElement(I, { path: "/resources", component: De })
      )
    )
  );
}
const Ae = H({
  palette: { primary: { main: "#4c00b7" } },
  typography: {
    h2: { color: "#4c00b7", fontWeight: 100 },
    h4: { fontWeight: 100 },
    body1: { fontWeight: 100, textIndent: 32 },
  },
});
M.render(
  u.createElement(
    u.StrictMode,
    null,
    u.createElement(
      W,
      { theme: Ae },
      u.createElement(J, { basename: "/react-observable-form" }, u.createElement(Te, null))
    )
  ),
  document.getElementById("root")
);
