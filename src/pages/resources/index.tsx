import React from "react";
import { Typography } from "@material-ui/core";

const ResourcesPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        更多选择
      </Typography>

      <Typography paragraph>react社区中还有非常多的优秀竞品值得关注：</Typography>

      <Typography paragraph>
        <ul>
          <li>
            <a href={"https://www.react-hook-form.com"}>react-hook-form</a>
          </li>
          <li>
            <a href={"https://www.npmjs.com/package/react-final-form"}>react-final-form</a>
          </li>
          <li>
            <a href={"https://www.npmjs.com/package/formik"}>formik</a>
          </li>
        </ul>
      </Typography>
    </div>
  );
};

export default ResourcesPage;
