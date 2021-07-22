var e=Object.defineProperty,t=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,s=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,n=(e,n)=>{for(var l in n||(n={}))a.call(n,l)&&s(e,l,n[l]);if(t)for(var l of t(n))r.call(n,l)&&s(e,l,n[l]);return e};import{S as l,l as i,t as o,r as c,R as m,m as d,s as h,a as u,I as b,B as v,L as E,b as p,c as g,d as C}from"./vendor.21211c69.js";class y{constructor(){this.valueSubject$=new l,this.disabledSubject$=new l,this.validSubject$=new l,this.dirtySubject$=new l,this.errorsSubject$=new l,this.destroy$=new l,this.destroy=()=>{this.destroy$.next(!0)},this.setErrors=e=>{i.exports.isEqual(e,this.errors)||this.errorsSubject$.next(e)},this.setValidators=e=>{this._validators=e,this.validateAndUpdateErrors(this.value)},this.disable=()=>{this.setDisabled(!0)},this.enable=()=>{this.setDisabled(!1)},this.setValid=e=>{e!==this.valid&&this.validSubject$.next(e)},this.markAsDirty=()=>{this.setDirty(!0)},this.markAsPristine=()=>{this.setDirty(!1)},this.initValue=e=>{this.updatePrivateValue(e)},this.initDisabled=e=>{this._disabled=e},this.initDirty=e=>{this._dirty=e},this.initErrors=e=>{this._errors=e},this.initValid=e=>{this._valid=e},this.initValidators=e=>{this._validators=e},this.updatePrivateValue=e=>{this._value=e},this.updatePrivateValid=e=>{this._valid=e},this.updatePrivateErrors=e=>{this._errors=e},this.updatePrivateDisabled=e=>{this._disabled=e},this.updatePrivateDirty=e=>{this._dirty=e},this.validateAndUpdateErrors=e=>{const t=N(e,this._validators);this.setErrors(t),this.setValid(this.checkValid())},this.setDisabled=e=>{e!==this.disabled&&this.disabledSubject$.next(e)},this.setDirty=e=>{e!==this.dirty&&this.dirtySubject$.next(e)}}get value(){return this._value}get errors(){return this._errors}get valid(){return this._valid}get invalid(){return!this._valid}get disabled(){return this._disabled}get enabled(){return!this._disabled}get dirty(){return this._dirty}get pristine(){return!this._dirty}get valueChange(){return this.valueSubject$.asObservable().pipe(o(this.destroy$))}get errorsChange(){return this.errorsSubject$.asObservable().pipe(o(this.destroy$))}get disabledChange(){return this.disabledSubject$.asObservable().pipe(o(this.destroy$))}get dirtyChange(){return this.dirtySubject$.asObservable().pipe(o(this.destroy$))}get validChange(){return this.validSubject$.asObservable().pipe(o(this.destroy$))}initBasicParams(e,{disabled:t=!1,dirty:a=!1,validators:r=[]}){this.initValue(e),this.initValidators(r),this.initDisabled(t),this.initDirty(a),this.initErrors(N(e,r)),this.initValid(this.checkValid()),this.validChange.subscribe(this.updatePrivateValid),this.errorsChange.subscribe(this.updatePrivateErrors),this.disabledChange.subscribe(this.updatePrivateDisabled),this.dirtyChange.subscribe(this.updatePrivateDirty),this.valueChange.subscribe(this.updatePrivateValue),this.valueChange.subscribe(this.validateAndUpdateErrors),this.valueChange.subscribe(this.markAsDirty)}}class f extends y{constructor(e,t={}){super(),this.setValue=(e,t)=>{e!==this.value&&this.valueSubject$.next(e)},this.checkValid=()=>!this.errors;const{disabled:a=!1,validators:r=[]}=t;this.initBasicParams(e,{disabled:a,validators:r})}}const N=(e,t)=>{const a=t.reduce(((t,a)=>{const r=a(e);return r&&(t=n(n({},t),r)),t}),{});return i.exports.isEmpty(a)?null:a},D=e=>e instanceof y?e:new f(...e),V=(e,t,a)=>{const[r,s]=c.exports.useState(t);return c.exports.useEffect((()=>{const e=a.subscribe(s);return()=>{e.unsubscribe()}}),[a]),r},S=m.createContext(null);function j(e){const{children:t}=e,a=c.exports.useContext(S),{name:r,control:s}=function(e){return void 0!==e.name}(e)?{name:e.name,control:a.get(e.name)}:{control:e.control};if(!(s instanceof f))throw new Error("props error:Field can only receive FieldControl as control");const n=V(0,s.value,s.valueChange),l=V(0,s.disabled,s.disabledChange),i=V(0,s.dirty,s.dirtyChange),o=V(0,s.valid,s.validChange),m=V(0,s.errors,s.errorsChange);return t({name:r,value:n,setValue:s.setValue,errors:m,disabled:l,enabled:!l,valid:o,invalid:!o,dirty:i,pristine:!i})}const w=e=>{const{children:t}=e,a=c.exports.useContext(S),{name:r,control:s}=(e=>void 0!==e.name)(e)?{name:e.name,control:a.get(e.name)}:{control:e.control},n=V(0,s.value,s.valueChange),l=V(0,s.controls,s.controlsChange),i=V(0,s.disabled,s.disabledChange),o=V(0,s.dirty,s.dirtyChange),d=V(0,s.valid,s.validChange),h={name:r,value:n,disabled:i,enabled:!i,errors:V(0,s.errors,s.errorsChange),valid:d,invalid:!d,dirty:o,pristine:!o,controls:l};return m.createElement(S.Provider,{value:s},t(h))};class k extends y{constructor(e,t={}){super(),this.controlsSubject=new l,this.controlsChangeNotifyLock=!1,this.get=e=>this._controls[e],this.setValue=e=>{e!==this.value&&(this.setValueToControls(e),this.valueSubject$.next(e))},this.addControl=(e,t)=>{if(this.controls[e])return void console.warn(`already has control named ${e} in formGroup`);const a=Object.assign({},this.controls,{[e]:D(t)});this.controlsSubject.next(a)},this.removeControl=e=>{if(!this.controls[e])return void console.warn(`cannot find control named ${e} in formGroup`);const t=Object.assign({},this.controls);delete t[e],this.controlsSubject.next(t)},this.checkValid=()=>!(this.errors||Object.values(this._controls).some((e=>e.invalid))),this.initControls=e=>{const t={};for(const a in e)if(Object.prototype.hasOwnProperty.call(e,a)){const r=e[a];t[a]=D(r)}this._controls=t},this.setValueToControls=e=>{this.controlsChangeNotifyLock=!0,Object.keys(this._controls).forEach((t=>{const a=Object.prototype.hasOwnProperty.call(e,t);this._controls[t].setValue(a?e[t]:null)})),this.controlsChangeNotifyLock=!1},this.updatePrivateControlsAndResetSubscribeGraph=e=>{this.updatePrivateControls(e),this.valueSubject$.next(this.getGroupValueFromControls()),this.resetGraph()},this.updatePrivateControls=e=>{this._controls=e},this.getGroupValueFromControls=()=>{const e={};return Object.keys(this._controls).forEach((t=>{const a=this._controls[t];a.enabled&&(e[t]=a.value)})),e},this.resetGraph=()=>{const e=Object.values(this._controls),t=e.map((e=>e.valueChange)),a=e.map((e=>e.validChange)),r=e.map((e=>e.disabledChange));this.resetValueGraph([...t,...r]),this.resetValidGraph(a)},this.resetValidGraph=e=>{this.validChangesSubscription&&this.validChangesSubscription.unsubscribe(),this.validChangesSubscription=d(...e).pipe(o(this.destroy$),h((()=>this.controlsChangeNotifyLock)),u((()=>this.checkValid()))).subscribe(this.setValid)};const{disabled:a=!1,validators:r=[]}=t;this.initControls(e),this.initBasicParams(this.getGroupValueFromControls(),{disabled:a,validators:r}),this.resetGraph(),this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph)}get controls(){return this._controls}get controlsChange(){return this.controlsSubject.asObservable().pipe(o(this.destroy$))}resetValueGraph(e){this.valueChangesSubscription&&this.valueChangesSubscription.unsubscribe(),this.valueChangesSubscription=d(...e).pipe(o(this.destroy$),h((()=>this.controlsChangeNotifyLock)),u((()=>this.getGroupValueFromControls()))).subscribe((e=>{this.valueSubject$.next(e)}))}}const x=e=>m.createElement(m.Fragment,null,m.createElement("input",{className:"form-control",disabled:e.disabled,value:e.value,onChange:t=>{e.setValue(t.target.value)}}),m.createElement("pre",{className:"text-info"},JSON.stringify(e,null,2))),P=new f("vick"),_=()=>m.createElement(m.Fragment,null,m.createElement("label",{className:"form-label"},"name"),m.createElement(j,{control:P},x)),$=new k({name:new f("vick"),address:new f("")}),O=new k({name:["vick"],address:new f("")}),F=()=>m.createElement(m.Fragment,null,m.createElement(w,{control:$},(e=>m.createElement(m.Fragment,null,m.createElement("pre",null,JSON.stringify(Object.assign(e,{controls:"这个没法显示"}),null,2)),m.createElement(j,{name:"name"},x),m.createElement(j,{name:"address"},x)))),m.createElement("h3",null,"简写只支持创建Field："),m.createElement(w,{control:O},(e=>m.createElement(m.Fragment,null,JSON.stringify(e.value),m.createElement(j,{name:"name"},x),m.createElement(j,{name:"address"},x))))),G=new k({name:new f("vick"),detail1:new k({tel:new f("13100000000"),address:new f("Beijing China")}),detail2:new k({tel:new f("13100000000"),address:new f("Beijing China")})}),A=()=>m.createElement(w,{control:G},(e=>m.createElement(m.Fragment,null,m.createElement("div",{className:"text-info"},"整个Form的value: ",JSON.stringify(e.value)),m.createElement("label",{className:"form-label"},"name"),m.createElement(j,{name:"name"},x),m.createElement("div",{className:"card p-3"},m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{G.get("detail1").enabled?G.get("detail1").disable():G.get("detail1").enable()}},"switch disable detail1 form"),m.createElement(w,{name:"detail1"},(e=>m.createElement(m.Fragment,null,m.createElement("label",{className:"form-label"},"tel"),m.createElement(j,{name:"tel"},x),m.createElement("label",{className:"form-label"},"address"),m.createElement(j,{name:"address"},x))))),m.createElement("div",{className:"card p-3"},m.createElement(w,{name:"detail2"},(e=>m.createElement(m.Fragment,null,m.createElement("label",{className:"form-label"},"tel"),m.createElement(j,{name:"tel"},x),m.createElement("label",{className:"form-label"},"address"),m.createElement(j,{name:"address"},x)))))))),B=e=>(e=>null==e||0===e.length)(e)?{required:!0}:null,L=e=>{const{children:t}=e,a=c.exports.useContext(S),{name:r,control:s}=function(e){return void 0!==e.name}(e)?{name:e.name,control:a.get(e.name)}:{control:e.control},n=V(0,s.valid,s.validChange),l=V(0,s.dirty,s.dirtyChange);return t({name:r,errors:V(0,s.errors,s.errorsChange),valid:n,invalid:n,dirty:l,pristine:!l})},W=new k({passWord:["",{validators:[B]}],confirmPassWord:["",{validators:[B]}]},{validators:[e=>e.confirmPassWord===e.passWord?null:{confirmPassword:!0}]}),J=e=>{var t;return m.createElement("p",{className:"text-danger"},(null==(t=e.errors)?void 0:t.required)&&"必填项")},U=()=>m.createElement(m.Fragment,null,m.createElement(w,{control:W},(e=>m.createElement(m.Fragment,null,m.createElement("div",null,m.createElement("label",{className:"form-label"},"密码"),m.createElement(j,{name:"passWord"},x),m.createElement(L,{name:"passWord"},J)),m.createElement("div",null,m.createElement("label",{className:"form-label"},"再次确认密码"),m.createElement(j,{name:"confirmPassWord"},x),m.createElement(L,{name:"confirmPassWord"},J))))),m.createElement(L,{control:W},(e=>{var t;return m.createElement("p",{className:"text-danger"},(null==(t=e.errors)?void 0:t.confirmPassword)&&"两次密码不一致")}))),q=new f("vick"),I=()=>m.createElement(m.Fragment,null,m.createElement("div",null,m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{q.disable()}},"disable"),m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{q.enable()}},"enable")),m.createElement("label",{className:"form-label"},"name"),m.createElement(j,{control:q},x)),R=new f("",{validators:[B]}),T=()=>m.createElement(m.Fragment,null,m.createElement("div",null,m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{R.markAsPristine()}},"Pristine")),m.createElement("label",{className:"form-label"},"name"),m.createElement(j,{control:R},x),m.createElement(L,{control:R},(e=>{var t;return m.createElement("p",{className:"text-danger"},e.dirty&&(null==(t=e.errors)?void 0:t.required)&&"必填项")}))),M=new k({name:["vick"]}),z=()=>m.createElement(m.Fragment,null,m.createElement("div",null,m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{M.get("name").disable()}},"disable name"),m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{M.get("name").enable()}},"enable name")),m.createElement("div",null,m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{M.addControl("address",["Beijing China"])}},"add address"),m.createElement("button",{className:"btn btn-primary btn-lg",onClick:()=>{M.removeControl("address")}},"remove address")),m.createElement(w,{control:M},(e=>m.createElement(m.Fragment,null,JSON.stringify(e.value),m.createElement(j,{name:"name"},x),e.controls.address&&m.createElement(j,{name:"address"},x))))),H=new f("vick"),K=()=>m.createElement(m.Fragment,null,m.createElement("label",{className:"form-label"},"name"),m.createElement(j,{control:H},(({value:e,setValue:t})=>m.createElement(b,{onChange:e=>{t(e.target.value)},value:e}))));const Q=e=>{const{children:t}=e,a=c.exports.useContext(S),{name:r,control:s}=(e=>void 0!==e.name)(e)?{name:e.name,control:a.get(e.name)}:{control:e.control},n=V(0,s.value,s.valueChange),l=V(0,s.controls,s.controlsChange),i=V(0,s.disabled,s.disabledChange),o=V(0,s.dirty,s.dirtyChange),d=V(0,s.valid,s.validChange),h={name:r,value:n,disabled:i,enabled:!i,errors:V(0,s.errors,s.errorsChange),valid:d,invalid:!d,dirty:o,pristine:!o,controls:l};return m.createElement(S.Provider,{value:s},t(h))},X=new class extends y{constructor(e,t={}){super(),this.controlsSubject=new l,this.get=e=>this._controls[+e],this.setValue=e=>{e!==this.value&&this.valueSubject$.next(e)},this.checkValid=()=>!(this.errors||this._controls.some((e=>e.invalid))),this.initControls=e=>{this._controls=e.map((e=>D(e)))},this.getListValueFromControls=()=>this._controls.map((e=>e.value));const{disabled:a=!1,validators:r=[]}=t;this.initControls(e),this.initBasicParams(this.getListValueFromControls(),{disabled:a,validators:r})}get controls(){return this._controls}get controlsChange(){return this.controlsSubject.asObservable().pipe(o(this.destroy$))}}([["vick"],[""]]),Y=()=>m.createElement(Q,{control:X},(e=>{var s=e,{controls:n}=s,l=((e,s)=>{var n={};for(var l in e)a.call(e,l)&&s.indexOf(l)<0&&(n[l]=e[l]);if(null!=e&&t)for(var l of t(e))s.indexOf(l)<0&&r.call(e,l)&&(n[l]=e[l]);return n})(s,["controls"]);return m.createElement(m.Fragment,null,m.createElement("pre",null,JSON.stringify(l,null,2)),n.map(((e,t)=>m.createElement(j,{name:`${t}`,key:`key${t}`},x))))}));function Z(){return m.createElement("div",{className:"App"},m.createElement(v,null,m.createElement("div",{className:"container"},m.createElement("div",{className:"row"},m.createElement("nav",{className:"col-3"},m.createElement("ul",{className:"navbar-nav"},m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/Basic"},"Basic")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/GroupDemo"},"GroupDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/NestedGroupDemo"},"NestedGroupDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/ValidatorsDemo"},"ValidatorsDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/ValidatorsDemo"},"ValidatorsDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/DisabledDemo"},"DisabledDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/DirtyDemo"},"DirtyDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/GroupDynamicControlDemo"},"GroupDynamicControlDemo")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/UseAntd"},"UseAntd")),m.createElement("li",{className:"nav-item"},m.createElement(E,{to:"/ListDemo"},"ListDemo")))),m.createElement("div",{className:"col"},m.createElement(p,null,m.createElement(g,{path:"/Basic"},m.createElement(_,null)),m.createElement(g,{path:"/GroupDemo"},m.createElement(F,null)),m.createElement(g,{path:"/NestedGroupDemo"},m.createElement(A,null)),m.createElement(g,{path:"/ValidatorsDemo"},m.createElement(U,null)),m.createElement(g,{path:"/DisabledDemo"},m.createElement(I,null)),m.createElement(g,{path:"/DirtyDemo"},m.createElement(T,null)),m.createElement(g,{path:"/GroupDynamicControlDemo"},m.createElement(z,null)),m.createElement(g,{path:"/UseAntd"},m.createElement(K,null)),m.createElement(g,{path:"/ListDemo"},m.createElement(Y,null))))))))}C.render(m.createElement(m.StrictMode,null,m.createElement(Z,null)),document.getElementById("root"));
