import React from "react";
import { Typography } from "@material-ui/core";

import DemoCard from "../../components/demoCard";
import GroupDemo from "../../demo/group";

const GroupPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        群组元素
      </Typography>

      <Typography paragraph>
        群组元素是由name为key，以其他元素为value组成的hash形数据源。一张表单往往就是一个Group。
      </Typography>

      <Typography paragraph>我们现在创建一个包含"consignee"，"address"两个参数的表单。</Typography>

      <Typography paragraph>
        首先，我们创造一个GroupController，其中包含"consignee"，"address"两个key，我们为这两个属性赋予两个FieldController。
      </Typography>

      <DemoCard demo={<GroupDemo />} code={"1"} />
    </div>
  );
};

export default GroupPage;
