import { Observable } from "rxjs";
import { AbstractControl } from "../control/abstractControl";
export declare const useSubscribe: <T>(control: AbstractControl<any>, initValue: T, ObservableInstance: Observable<T>) => T;
