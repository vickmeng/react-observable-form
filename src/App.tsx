import React, { ChangeEvent, useRef } from "react";

import { FieldControl, GroupControl, Group, Field } from "../react-rxjs-form-dist";

import "./App.css";

const buildGroup = () => {
  return new GroupControl({
    controls: {
      name: new FieldControl({
        value: "vick",
      }),
    },
  });
};

function App() {
  const FormGroupRef = useRef(buildGroup());

  return (
    <div className="App">
      <Group control={FormGroupRef.current}>
        {(props) => {
          return (
            <>
              <Field name="name">
                {(props) => {
                  const value = props.value as string;

                  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
                    props.setValue(e.target.value);
                  };

                  return (
                    <>
                      <label className="form-label">name</label>
                      <input className="form-control" value={value} onChange={onChange} />
                    </>
                  );
                }}
              </Field>
            </>
          );
        }}
      </Group>
    </div>
  );
}

export default App;
