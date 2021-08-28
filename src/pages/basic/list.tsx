import { Typography } from "@material-ui/core";
import React from "react";

import DemoCard from "../../components/demoCard";
import ListDemo from "../../demo/listDemo";

const ListPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        列表
      </Typography>

      <Typography paragraph>
        我们用List指代列表，与Group很接近，它是由index为key，以其他controller为value组成的数组型数据源。
      </Typography>

      <Typography paragraph>我们直接用一个例子进行描述：</Typography>

      <DemoCard demo={<ListDemo />} code={"1"} />
    </div>
  );
};

export default ListPage;
