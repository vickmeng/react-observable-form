var e=Object.defineProperty,t=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,r=(t,a,s)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s,n=(e,n)=>{for(var l in n||(n={}))a.call(n,l)&&r(e,l,n[l]);if(t)for(var l of t(n))s.call(n,l)&&r(e,l,n[l]);return e};import{S as l,l as i,t as o,r as c,R as m,m as u,s as d,a as h,I as b,B as v,b as p,L as E,c as g,d as y,e as C}from"./vendor.a81623aa.js";class f{constructor(){this.valueSubject$=new l,this.disabledSubject$=new l,this.validSubject$=new l,this.dirtySubject$=new l,this.errorsSubject$=new l,this.destroy$=new l,this.destroy=()=>{this.destroy$.next(!0)},this.setErrors=e=>{i.exports.isEqual(e,this.errors)||this.errorsSubject$.next(e)},this.setValidators=e=>{this._validators=e,this.validateAndUpdateErrors(this.value)},this.disable=()=>{this.setDisabled(!0)},this.enable=()=>{this.setDisabled(!1)},this.setValid=e=>{e!==this.valid&&this.validSubject$.next(e)},this.markAsDirty=()=>{this.setDirty(!0)},this.markAsPristine=()=>{this.setDirty(!1)},this.initValue=e=>{this.updatePrivateValue(e)},this.initDisabled=e=>{this._disabled=e},this.initDirty=e=>{this._dirty=e},this.initErrors=e=>{this._errors=e},this.initValid=e=>{this._valid=e},this.initValidators=e=>{this._validators=e},this.updatePrivateValue=e=>{this._value=e},this.updatePrivateValid=e=>{this._valid=e},this.updatePrivateErrors=e=>{this._errors=e},this.updatePrivateDisabled=e=>{this._disabled=e},this.updatePrivateDirty=e=>{this._dirty=e},this.validateAndUpdateErrors=e=>{const t=S(e,this._validators);this.setErrors(t),this.setValid(this.checkValid())},this.setDisabled=e=>{e!==this.disabled&&this.disabledSubject$.next(e)},this.setDirty=e=>{e!==this.dirty&&this.dirtySubject$.next(e)}}get value(){return this._value}get errors(){return this._errors}get valid(){return this._valid}get invalid(){return!this._valid}get disabled(){return this._disabled}get enabled(){return!this._disabled}get dirty(){return this._dirty}get pristine(){return!this._dirty}get valueChange(){return this.valueSubject$.asObservable().pipe(o(this.destroy$))}get errorsChange(){return this.errorsSubject$.asObservable().pipe(o(this.destroy$))}get disabledChange(){return this.disabledSubject$.asObservable().pipe(o(this.destroy$))}get dirtyChange(){return this.dirtySubject$.asObservable().pipe(o(this.destroy$))}get validChange(){return this.validSubject$.asObservable().pipe(o(this.destroy$))}initBasicParams(e,{disabled:t=!1,dirty:a=!1,validators:s=[]}){this.initValue(e),this.initValidators(s),this.initDisabled(t),this.initDirty(a),this.initErrors(S(e,s)),this.initValid(this.checkValid()),this.validChange.subscribe(this.updatePrivateValid),this.errorsChange.subscribe(this.updatePrivateErrors),this.disabledChange.subscribe(this.updatePrivateDisabled),this.dirtyChange.subscribe(this.updatePrivateDirty),this.valueChange.subscribe(this.updatePrivateValue),this.valueChange.subscribe(this.validateAndUpdateErrors),this.valueChange.subscribe(this.markAsDirty)}}class N extends f{constructor(e,t={}){super(),this.setValue=(e,t)=>{e!==this.value&&this.valueSubject$.next(e)},this.checkValid=()=>!this.errors;const{disabled:a=!1,validators:s=[]}=t;this.initBasicParams(e,{disabled:a,validators:s})}}const S=(e,t)=>{const a=t.reduce(((t,a)=>{const s=a(e);return s&&(t=n(n({},t),s)),t}),{});return i.exports.isEmpty(a)?null:a},V=e=>e instanceof f?e:new N(...e),w=(e,t)=>{const a=c.exports.useRef(!1);c.exports.useEffect((()=>{if(a.current)return e();a.current=!0}),t)},x=e=>{const[t,a]=c.exports.useState(e.value);return c.exports.useEffect((()=>{const t=e.valueChange.subscribe(a);return()=>{t.unsubscribe()}}),[e]),w((()=>{a(e.value)}),[e]),t},D=e=>{const[t,a]=c.exports.useState(e.disabled);return c.exports.useEffect((()=>{const t=e.disabledChange.subscribe(a);return()=>{t.unsubscribe()}}),[e]),w((()=>{a(e.disabled)}),[e]),t},j=e=>{const[t,a]=c.exports.useState(e.dirty);return c.exports.useEffect((()=>{const t=e.dirtyChange.subscribe(a);return()=>{t.unsubscribe()}}),[e]),w((()=>{a(e.dirty)}),[e]),t},k=e=>{const[t,a]=c.exports.useState(e.valid);return c.exports.useEffect((()=>{const t=e.validChange.subscribe(a);return()=>{t.unsubscribe()}}),[e]),w((()=>{a(e.valid)}),[e]),t},$=e=>{const[t,a]=c.exports.useState(e.errors);return c.exports.useEffect((()=>{const t=e.errorsChange.subscribe(a);return()=>{t.unsubscribe()}}),[e]),w((()=>{a(e.errors)}),[e]),t},_=e=>{const[t,a]=c.exports.useState(e.controls);return c.exports.useEffect((()=>{const t=e.controlsChange.subscribe(a);return()=>{t.unsubscribe()}}),[e]),w((()=>{a(e.controls)}),[e]),t},P=m.createContext(null);function O(e){const{children:t}=e,a=c.exports.useContext(P),{name:s,control:r}=function(e){return void 0!==e.name}(e)?{name:e.name,control:a.get(e.name)}:{control:e.control};if(!(r instanceof N))throw new Error("props error:Field can only receive FieldControl as control");const n=x(r),l=D(r),i=j(r),o=k(r),m=$(r);return t({name:s,value:n,setValue:r.setValue,errors:m,disabled:l,enabled:!l,valid:o,invalid:!o,dirty:i,pristine:!i})}const G=e=>{const{children:t}=e,a=c.exports.useContext(P),{name:s,control:r}=(e=>void 0!==e.name)(e)?{name:e.name,control:a.get(e.name)}:{control:e.control},n=x(r),l=D(r),i=j(r),o=k(r),u={name:s,value:n,disabled:l,enabled:!l,errors:$(r),valid:o,invalid:!o,dirty:i,pristine:!i,controls:_(r)};return m.createElement(P.Provider,{value:r},t(u))};class F extends f{constructor(e,t={}){super(),this.controlsSubject=new l,this.controlsChangeNotifyLock=!1,this.get=e=>this._controls[e],this.setValue=e=>{e!==this.value&&(this.setValueToControls(e),this.valueSubject$.next(e))},this.add=(e,t)=>{if(this.controls[e])return void console.warn(`already has control named ${e} in formGroup`);const a=Object.assign({},this.controls,{[e]:V(t)});this.controlsSubject.next(a)},this.remove=e=>{if(!this.controls[e])return void console.warn(`cannot find control named ${e} in formGroup`);const t=Object.assign({},this.controls);delete t[e],this.controlsSubject.next(t)},this.checkValid=()=>!(this.errors||Object.values(this._controls).some((e=>e.invalid))),this.initControls=e=>{const t={};for(const a in e)if(Object.prototype.hasOwnProperty.call(e,a)){const s=e[a];t[a]=V(s)}this._controls=t},this.setValueToControls=e=>{this.controlsChangeNotifyLock=!0,Object.keys(this._controls).forEach((t=>{const a=Object.prototype.hasOwnProperty.call(e,t);this._controls[t].setValue(a?e[t]:null)})),this.controlsChangeNotifyLock=!1},this.updatePrivateControlsAndResetSubscribeGraph=e=>{this.updatePrivateControls(e),this.valueSubject$.next(this.getGroupValueFromControls()),this.resetGraph()},this.updatePrivateControls=e=>{this._controls=e},this.getGroupValueFromControls=()=>{const e={};return Object.keys(this._controls).forEach((t=>{const a=this._controls[t];a.enabled&&(e[t]=a.value)})),e},this.resetGraph=()=>{const e=Object.values(this._controls),t=e.map((e=>e.valueChange)),a=e.map((e=>e.validChange)),s=e.map((e=>e.disabledChange));this.resetValueGraph([...t,...s]),this.resetValidGraph(a)},this.resetValidGraph=e=>{this.validChangesSubscription&&this.validChangesSubscription.unsubscribe(),this.validChangesSubscription=u(...e).pipe(o(this.destroy$),d((()=>this.controlsChangeNotifyLock)),h((()=>this.checkValid()))).subscribe(this.setValid)};const{disabled:a=!1,validators:s=[]}=t;this.initControls(e),this.initBasicParams(this.getGroupValueFromControls(),{disabled:a,validators:s}),this.resetGraph(),this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph)}get controls(){return this._controls}get controlsChange(){return this.controlsSubject.asObservable().pipe(o(this.destroy$))}resetValueGraph(e){this.valueChangesSubscription&&this.valueChangesSubscription.unsubscribe(),this.valueChangesSubscription=u(...e).pipe(o(this.destroy$),d((()=>this.controlsChangeNotifyLock)),h((()=>this.getGroupValueFromControls()))).subscribe((e=>{this.valueSubject$.next(e)}))}}const A=e=>m.createElement(m.Fragment,null,m.createElement("input",{className:"form-control",disabled:e.disabled,value:e.value,onChange:t=>{e.setValue(t.target.value)}}),m.createElement("pre",{className:"text-info"},JSON.stringify(e,null,2))),L=new N("vick"),B=()=>m.createElement(m.Fragment,null,m.createElement("label",{className:"form-label"},"name"),m.createElement(O,{control:L},A)),R=new F({name:new N("vick"),address:new N("")}),W=new F({name:["vick"],address:new N("")}),J=()=>m.createElement(m.Fragment,null,m.createElement(G,{control:R},(e=>m.createElement(m.Fragment,null,m.createElement("pre",null,JSON.stringify(Object.assign(e,{controls:"这个没法显示"}),null,2)),m.createElement(O,{name:"name"},A),m.createElement(O,{name:"address"},A)))),m.createElement("h3",null,"简写只支持创建Field："),m.createElement(G,{control:W},(e=>m.createElement(m.Fragment,null,JSON.stringify(e.value),m.createElement(O,{name:"name"},A),m.createElement(O,{name:"address"},A))))),I=new F({name:new N("vick"),detail1:new F({tel:new N("13100000000"),address:new N("Beijing China")}),detail2:new F({tel:new N("13100000000"),address:new N("Beijing China")})}),U=()=>m.createElement(G,{control:I},(e=>m.createElement(m.Fragment,null,m.createElement("div",{className:"text-info"},"整个Form的value: ",JSON.stringify(e.value)),m.createElement("label",{className:"form-label"},"name"),m.createElement(O,{name:"name"},A),m.createElement("div",{className:"card p-3"},m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{I.get("detail1").enabled?I.get("detail1").disable():I.get("detail1").enable()}},"switch disable detail1 form"),m.createElement(G,{name:"detail1"},(e=>m.createElement(m.Fragment,null,m.createElement("label",{className:"form-label"},"tel"),m.createElement(O,{name:"tel"},A),m.createElement("label",{className:"form-label"},"address"),m.createElement(O,{name:"address"},A))))),m.createElement("div",{className:"card p-3"},m.createElement(G,{name:"detail2"},(e=>m.createElement(m.Fragment,null,m.createElement("label",{className:"form-label"},"tel"),m.createElement(O,{name:"tel"},A),m.createElement("label",{className:"form-label"},"address"),m.createElement(O,{name:"address"},A)))))))),q=e=>(e=>null==e||0===e.length)(e)?{required:!0}:null,T=e=>{const{children:t}=e,a=c.exports.useContext(P),{name:s,control:r}=function(e){return void 0!==e.name}(e)?{name:e.name,control:a.get(e.name)}:{control:e.control},n=k(r),l=j(r);return t({name:s,errors:$(r),valid:n,invalid:n,dirty:l,pristine:!l})},M=new F({passWord:["",{validators:[q]}],confirmPassWord:["",{validators:[q]}]},{validators:[e=>e.confirmPassWord===e.passWord?null:{confirmPassword:!0}]}),z=e=>{var t;return m.createElement("p",{className:"text-danger"},(null==(t=e.errors)?void 0:t.required)&&"必填项")},H=()=>m.createElement(m.Fragment,null,m.createElement(G,{control:M},(e=>m.createElement(m.Fragment,null,m.createElement("div",null,m.createElement("label",{className:"form-label"},"密码"),m.createElement(O,{name:"passWord"},A),m.createElement(T,{name:"passWord"},z)),m.createElement("div",null,m.createElement("label",{className:"form-label"},"再次确认密码"),m.createElement(O,{name:"confirmPassWord"},A),m.createElement(T,{name:"confirmPassWord"},z))))),m.createElement(T,{control:M},(e=>{var t;return m.createElement("p",{className:"text-danger"},(null==(t=e.errors)?void 0:t.confirmPassword)&&"两次密码不一致")}))),K=new N("vick"),Q=()=>m.createElement(m.Fragment,null,m.createElement("div",null,m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{K.disable()}},"disable"),m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{K.enable()}},"enable")),m.createElement("label",{className:"form-label"},"name"),m.createElement(O,{control:K},A)),X=new N("",{validators:[q]}),Y=()=>m.createElement(m.Fragment,null,m.createElement("div",null,m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{X.markAsPristine()}},"Pristine")),m.createElement("label",{className:"form-label"},"name"),m.createElement(O,{control:X},A),m.createElement(T,{control:X},(e=>{var t;return m.createElement("p",{className:"text-danger"},e.dirty&&(null==(t=e.errors)?void 0:t.required)&&"必填项")}))),Z=new F({name:["vick"]}),ee=()=>m.createElement(m.Fragment,null,m.createElement("div",null,m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{Z.get("name").disable()}},"disable name"),m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{Z.get("name").enable()}},"enable name")),m.createElement("div",null,m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{Z.add("address",["Beijing China"])}},"add address"),m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{Z.remove("address")}},"remove address")),m.createElement(G,{control:Z},(e=>m.createElement(m.Fragment,null,JSON.stringify(e.value),m.createElement(O,{name:"name"},A),e.controls.address&&m.createElement(O,{name:"address"},A))))),te=new N("vick"),ae=()=>m.createElement(m.Fragment,null,m.createElement("label",{className:"form-label"},"name"),m.createElement(O,{control:te},(({value:e,setValue:t})=>m.createElement(b,{onChange:e=>{t(e.target.value)},value:e}))));class se extends f{constructor(e,t={}){super(),this.controlsSubject=new l,this.controlsChangeNotifyLock=!1,this.get=e=>this._controls[+e],this.insert=(e,...t)=>{const a=[...this.controls];a.splice(e,0,...t),this.controlsSubject.next(a)},this.push=(...e)=>{this.insert(this.controls.length,...e)},this.remove=(e,t=1)=>{const a=[...this.controls];a.splice(e,t),this.controlsSubject.next(a)},this.setValue=e=>{e!==this.value&&this.valueSubject$.next(e)},this.checkValid=()=>!(this.errors||this._controls.some((e=>e.invalid))),this.initControls=e=>{this._controls=e.map((e=>V(e)))},this.updatePrivateControlsAndResetSubscribeGraph=e=>{this.updatePrivateControls(e),this.valueSubject$.next(this.getListValueFromControls()),this.resetGraph()},this.updatePrivateControls=e=>{this._controls=e},this.getListValueFromControls=()=>{const e=[];return Object.keys(this._controls).forEach(((t,a)=>{const s=this._controls[a];s.enabled&&(e[a]=s.value)})),e},this.resetGraph=()=>{const e=this._controls.map((e=>e.valueChange)),t=this._controls.map((e=>e.validChange)),a=this._controls.map((e=>e.disabledChange));this.resetValueGraph([...e,...a]),this.resetValidGraph(t)},this.resetValidGraph=e=>{this.validChangesSubscription&&this.validChangesSubscription.unsubscribe(),this.validChangesSubscription=u(...e).pipe(o(this.destroy$),d((()=>this.controlsChangeNotifyLock)),h((()=>this.checkValid()))).subscribe(this.setValid)};const{disabled:a=!1,validators:s=[]}=t;this.initControls(e),this.initBasicParams(this.getListValueFromControls(),{disabled:a,validators:s}),this.resetGraph(),this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph)}get controls(){return this._controls}get controlsChange(){return this.controlsSubject.asObservable().pipe(o(this.destroy$))}resetValueGraph(e){this.valueChangesSubscription&&this.valueChangesSubscription.unsubscribe(),this.valueChangesSubscription=u(...e).pipe(o(this.destroy$),d((()=>this.controlsChangeNotifyLock)),h((()=>this.getListValueFromControls()))).subscribe((e=>{this.valueSubject$.next(e)}))}}const re=e=>{const{children:t}=e,a=c.exports.useContext(P),{name:s,control:r}=(e=>void 0!==e.name)(e)?{name:e.name,control:a.get(e.name)}:{control:e.control},n=x(r),l=D(r),i=j(r),o=k(r),u={name:s,value:n,disabled:l,enabled:!l,errors:$(r),valid:o,invalid:!o,dirty:i,pristine:!i,controls:_(r)};return m.createElement(P.Provider,{value:r},t(u))},ne=new se([["vick"],[""]]),le=()=>m.createElement(re,{control:ne},(e=>{var r=e,{controls:n}=r,l=((e,r)=>{var n={};for(var l in e)a.call(e,l)&&r.indexOf(l)<0&&(n[l]=e[l]);if(null!=e&&t)for(var l of t(e))r.indexOf(l)<0&&s.call(e,l)&&(n[l]=e[l]);return n})(r,["controls"]);return m.createElement(m.Fragment,null,m.createElement("pre",null,JSON.stringify(l,null,2)),n.map(((e,t)=>m.createElement(O,{name:`${t}`,key:`key${t}`},A))))})),ie=new se([new F({name:new N("vick"),address:new N("")})]);ie.valueChange.subscribe(console.log);const oe=()=>m.createElement(m.Fragment,null,m.createElement("table",{className:"table"},m.createElement("thead",null,m.createElement("tr",null,m.createElement("th",{scope:"col"},"#"),m.createElement("th",{scope:"col"},"name"),m.createElement("th",{scope:"col"},"address"),m.createElement("th",{scope:"col"},"actions"))),m.createElement("tbody",null,m.createElement(re,{control:ie},(({controls:e,value:t})=>m.createElement(m.Fragment,null,e.map(((e,t)=>m.createElement("tr",{key:`key${t}`},m.createElement(G,{name:`${t}`},(()=>m.createElement(m.Fragment,null,m.createElement("td",null,t),m.createElement("td",null,m.createElement(O,{name:"name"},(({value:e,setValue:t})=>m.createElement(b,{onChange:e=>{t(e.target.value)},value:e})))),m.createElement("td",null,m.createElement(O,{name:"address"},(({value:e,setValue:t})=>m.createElement(b,{onChange:e=>{t(e.target.value)},value:e})))),m.createElement("td",null,m.createElement(v,{onClick:()=>{ie.remove(t)}},"delete"),m.createElement(v,{onClick:()=>{ie.insert(t+1,new F({name:[],address:[]}))}},"insert")))))))),m.createElement("pre",null,JSON.stringify(t,null,2))))))),m.createElement(v,{type:"primary",onClick:()=>{ie.push(new F({name:[],address:[]}))}},"add one row"),m.createElement(v,{type:"primary",onClick:()=>{ie.push(new F({name:[],address:[]}),new F({name:[],address:[]}))}},"add two rows"));function ce(){return m.createElement("div",{className:"App"},m.createElement(p,null,m.createElement("div",null,m.createElement("div",{className:"row"},m.createElement("nav",{className:"col-3"},m.createElement("ul",{className:"navbar-nav"},m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/Basic"},"Basic")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/GroupDemo"},"GroupDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/NestedGroupDemo"},"NestedGroupDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/ValidatorsDemo"},"ValidatorsDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/DisabledDemo"},"DisabledDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/DirtyDemo"},"DirtyDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/GroupDynamicControlDemo"},"GroupDynamicControlDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/UseAntd"},"UseAntd")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/ListDemo"},"ListDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/ListAddAndRemoveItemDemo"},"ListAddAndRemoveItemDemo")))),m.createElement("div",{className:"col"},m.createElement(g,null,m.createElement(y,{path:"/Basic"},m.createElement(B,null)),m.createElement(y,{path:"/GroupDemo"},m.createElement(J,null)),m.createElement(y,{path:"/NestedGroupDemo"},m.createElement(U,null)),m.createElement(y,{path:"/ValidatorsDemo"},m.createElement(H,null)),m.createElement(y,{path:"/DisabledDemo"},m.createElement(Q,null)),m.createElement(y,{path:"/DirtyDemo"},m.createElement(Y,null)),m.createElement(y,{path:"/GroupDynamicControlDemo"},m.createElement(ee,null)),m.createElement(y,{path:"/UseAntd"},m.createElement(ae,null)),m.createElement(y,{path:"/ListDemo"},m.createElement(le,null)),m.createElement(y,{path:"/ListAddAndRemoveItemDemo"},m.createElement(oe,null))))))))}C.render(m.createElement(m.StrictMode,null,m.createElement(ce,null)),document.getElementById("root"));
