import React from "react";
import { Typography } from "@material-ui/core";

const DynamicPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        动态表单
      </Typography>

      <Typography paragraph>动态表单</Typography>
    </div>
  );
};

export default DynamicPage;
