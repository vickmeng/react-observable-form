import { useEffect, useState } from "react";
import { Observable } from "rxjs";

import { AbstractControl } from "../controls/abstractControl";

export const useSubscribe = <T>(control: AbstractControl<any>, initValue: T, $: Observable<T>): T => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    const subscriber = $.subscribe(setValue);
    /**
     * cannot return subscriber.unsubscribe directly
     * rxjs problem
     */
    return () => {
      subscriber.unsubscribe();
    };
  }, [$]);

  return value;
};
