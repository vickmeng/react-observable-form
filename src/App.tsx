import React, { ChangeEvent, useRef, useState } from "react";

import { Field, FieldControl } from "../react-rxjs-form-dist";

import "./App.css";

const Input = (props: any) => {
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

  const [count, setCount] = useState(1);

  return (
    <div className="App">
      {count}

      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>

      <br />

      <label className="form-label">name</label>
      <Field control={controlRef.current}>{Input}</Field>
    </div>
  );
}

export default App;
