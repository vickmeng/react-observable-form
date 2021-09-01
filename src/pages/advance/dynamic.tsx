import React from "react";
import { Typography } from "@material-ui/core";

const DynamicPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        动态表单
      </Typography>

      <Typography paragraph>
        controller提供了大量的方法对对状态进行控制，我们可以通过调用这些方法实现动态表单效果。
      </Typography>

      <Typography paragraph>
        试想一个场景，我们设计一个婚姻状况的调查问卷。如果是已婚人士，需要填写配偶的姓名，否则清空配偶姓名栏目，并禁止输入。思路如下：
      </Typography>

      <Typography paragraph>首先我们从GroupController中获取婚姻状况的FieldController，并订阅其变化。</Typography>

      <Typography paragraph>
        当发现婚姻状况变为未婚时，获取配偶姓名的FieldController。通过setValue方法将value清空，再通过disable将其禁用，反之，利用enable方法将其开放使用。效果如下：
      </Typography>
    </div>
  );
};

export default DynamicPage;
