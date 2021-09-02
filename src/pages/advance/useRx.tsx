import React from "react";
import { Typography } from "@material-ui/core";

import DemoCard from "../../components/demoCard";
import UseRxjsDemo from "../../demo/useRxjsDemo";

const UseRxPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        与Rxjs
      </Typography>

      <Typography paragraph>
        Controller提供的每一个可订阅对象都是Rxjs提供的Subscription，我们可以使用Rxjs Operators协助处理数据流。
      </Typography>

      <Typography paragraph>举个例子，利用debounceTime对搜索框进行防抖处理，请在控制台中查看效果：</Typography>

      <DemoCard demo={<UseRxjsDemo />} code={"1"} />
    </div>
  );
};

export default UseRxPage;
