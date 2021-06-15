import { useEffect, useState } from "react";
import { Observable } from "rxjs";

import { AbstractControl } from "../controls/abstractControl";

export const useSubscribe = <T>(control: AbstractControl<any>, initValue: T, ObservableInstance: Observable<T>): T => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    const subscriber = ObservableInstance.subscribe(setValue);
    return () => {
      subscriber.unsubscribe();
    };
  }, [control]);

  return value;
};
