import React from "react";
import { Typography } from "@material-ui/core";

import GroupDemo from "../../demo/group";
import DemoCard from "../../components/demoCard";

const SubscribePage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        订阅变化
      </Typography>

      <Typography paragraph>
        提供自由订阅表单状态变化是react-observable-form出现的初衷，开发者可以响应value，disabled，dirty，errors，validate,
        Group或List下的controls等等不同的状态变化并作出响应。比如对表单元素进行操作，以达到动态表单的效果，再比如，表单某个值发生变化时实时发送请求......
      </Typography>

      <Typography paragraph>
        我们以group为例，groupController提供valueChange提供开发者进行对value变化的订阅。此处完全使用Rxjs的api，如果你对Rxjs并不了解，也并不会影响你的使用。
      </Typography>

      <DemoCard demo={<GroupDemo />} code={"1"} />
    </div>
  );
};

export default SubscribePage;
