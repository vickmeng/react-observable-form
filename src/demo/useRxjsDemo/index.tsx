import React, { useEffect, useRef } from "react";
import { TextField } from "@material-ui/core";
import { debounceTime } from "rxjs/operators";

import { FieldControl } from "../../../packages/controls/fieldControl";
import { Field } from "../../../packages/items/field";

const UseRxjsDemo = () => {
  const controlRef = useRef(new FieldControl<string>(""));

  useEffect(() => {
    const subscription = controlRef.current.valueChange.pipe(debounceTime(500)).subscribe((v) => {
      console.log("value change", v);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Field control={controlRef.current}>
      {({ value, setValue }) => {
        return <TextField label="延迟500ms" value={value} onChange={(e) => setValue(e.target.value)} />;
      }}
    </Field>
  );
};
export default UseRxjsDemo;
