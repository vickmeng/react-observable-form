import React from "react";
import { Typography } from "@material-ui/core";

import nestImg from "../../assets/img/nest.png";

import "./nest.less";
import DemoCard from "../../components/demoCard";
import NestedDemo from "../../demo/NestedDemo";

const NestPage = () => {
  return (
    <div className={"page nest-page"}>
      <Typography paragraph variant={"h2"}>
        复杂嵌套
      </Typography>

      <Typography paragraph>
        我们在基础使用中尝试过将Field嵌入Group与List，事实上不止Field，Group/List也可以作为Group/List的子Controller，
        我们可以基于此作出更复杂的设计。
      </Typography>

      <Typography paragraph>
        试想一个场景：我们做一张统计家庭成员的表单，需要填写本人姓名，动态添加家庭成员，每个家庭成员需要填写姓名与联系电话。我们设计出如下的嵌套关系：
      </Typography>

      <Typography paragraph>
        <img src={nestImg} width={600} />
      </Typography>

      <Typography paragraph>实现如下：</Typography>

      <DemoCard demo={<NestedDemo />} code={"1"} />
    </div>
  );
};

export default NestPage;
