import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import { FormListControlsConfig, FormListOptions, ListControls, ListValue } from "../types/control";
import { createControl } from "../utils";

import { AbstractControl } from "./abstractControl";

export class ListControl<V> extends AbstractControl<ListValue<V>> {
  get controls(): ListControls<V> {
    return this._controls;
  }

  get controlsChange() {
    return this.controlsSubject.asObservable().pipe(takeUntil(this.destroy$));
  }

  private _controls!: ListControls<V>;

  private controlsSubject = new Subject<ListControls<V>>();

  constructor(controlsConfig: FormListControlsConfig, options: FormListOptions = {}) {
    super();
    const { disabled = false, validators = [] } = options;
    this.initControls(controlsConfig);
    // TODO initBasicParams FIND A BETTER WAY
    this.initBasicParams(this.getListValueFromControls(), { disabled, validators });

    // this.resetGraph();
    // // TODO resetGraph when controlsChange maybe a bug
    // this.controlsChange.subscribe(this.updatePrivateControlsAndResetSubscribeGraph);
  }

  get = <C extends AbstractControl<any>>(index: string): C => {
    return this._controls[+index] as C;
  };

  override setValue = (value: ListValue<V>) => {
    if (value === this.value) {
      return;
    }
    // TODO
    // this.setValueToControls(value);

    this.valueSubject$.next(value);
  };

  protected checkValid = () => {
    return !(this.errors || this._controls.some((control) => control.invalid));
  };

  private initControls = (controlsConfig: FormListControlsConfig) => {
    this._controls = controlsConfig.map((config) => createControl(config));
  };

  private getListValueFromControls = () => this._controls.map((control) => control.value);
}
