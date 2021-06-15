import React, { ChangeEvent, useRef } from "react";

import { Field, FieldControl, FieldInternalProps } from "../react-rxjs-form-dist";

import "./App.css";

const Input = (props: FieldInternalProps) => {
  const value = props.value as string;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.target.value);
  };

  return <input className="form-control" value={value} onChange={onChange} />;
};

function App() {
  const controlRef = useRef(
    new FieldControl({
      value: "vick",
    })
  );

  return (
    <div className="App">
      <label className="form-label">name</label>
      <Field control={controlRef.current}>{Input}</Field>
    </div>
  );
}

export default App;
