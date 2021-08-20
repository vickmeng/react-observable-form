import React from "react";
import { Typography } from "@material-ui/core";

const Intro = () => {
  return (
    <>
      <Typography paragraph variant={"h2"} align={"center"}>
        React Observable Form
      </Typography>
      <Typography paragraph>react-observable-form，是一个基于React与Rxjs实现的可自由订阅状态变化的表单引擎</Typography>
      <Typography paragraph>特征</Typography>
      <Typography paragraph>
        <ul>
          <li>可在随时随地订阅表单状态变化</li>
          <li>遵循数据驱动原则</li>
          <li>可自由集成常见组件库</li>
          <li>可使用Rxjs operators处理表单状态</li>
        </ul>
      </Typography>
    </>
  );
};

export default Intro;
