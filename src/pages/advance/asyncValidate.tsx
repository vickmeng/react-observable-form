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

      <Typography paragraph>
        试想一个常见场景，当我们想要在某平台注册注册一个账号,我们要求的账号唯一性。此时我们需要在提交注册之前发起一个请求校验账号是否已被占用。
        这时我们就用到了异步校验功能。
      </Typography>

      <DemoCard demo={<AsyncValidateUsername />} code={"123"} />
    </div>
  );
};

export default AsyncValidatePage;
