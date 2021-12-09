import React from "react";
import { Typography } from "@material-ui/core";

import DemoCard from "../../components/demoCard";
import { AsyncValidateUsername } from "../../demo/asyncValdate";

const AsyncValidatePage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        异步校验
      </Typography>

      <DemoCard demo={<AsyncValidateUsername />} code={"123"} />
    </div>
  );
};

export default AsyncValidatePage;
