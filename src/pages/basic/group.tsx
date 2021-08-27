import React from "react";
import { Typography } from "@material-ui/core";

import DemoCard from "../../components/demoCard";
import GroupDemo from "../../demo/group";
import TsCode from "../../components/tsCode";

const GroupPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        群组元素
      </Typography>

      <Typography paragraph>
        群组元素是由name为key，以其他controller为value组成的hash形数据源。一张表单往往就是一个Group。
      </Typography>

      <Typography paragraph>
        我们现在创建一个包含"consignee"，"address"两个参数的群组。过程和单一元素是很接近的。
      </Typography>

      <Typography paragraph>
        首先，我们创造一个GroupController，其中包含"consignee"，"address"两个key，我们为这两个属性赋予两个FieldController,
        GroupController会自动订阅下级的Controllers:
      </Typography>

      <TsCode>
        {"  const groupControlRef = useRef(\n" +
          "    new GroupControl({\n" +
          '      consignee: new FieldControl("vick"),\n' +
          '      address: new FieldControl("No.1,Chaowai Street,Chaoyang District,Beijing City"),\n' +
          "    })\n" +
          "  );"}
      </TsCode>

      <Typography paragraph>也可以采用简写形式:</Typography>

      <TsCode>
        {" const groupControlRef = useRef(\n" +
          "    new GroupControl({\n" +
          '      consignee: ["vick"],\n' +
          '      address: ["No.1,Chaowai Street,Chaoyang District,Beijing City"],\n' +
          "    })\n" +
          "  );"}
      </TsCode>

      <Typography paragraph>接下来利用{"<Group/>"}订阅GroupController</Typography>

      <TsCode>
        {"<Group control={groupControlRef.current}>\n" +
          "    {(props) => {\n" +
          "        return (\n" +
          "          <>\n" +
          "             //TODO\n" +
          "          </>\n" +
          "        );\n" +
          "      }}\n" +
          "</Group>"}
      </TsCode>

      <Typography paragraph>接下来利用{"<Group/>"}订阅GroupController</Typography>

      <DemoCard demo={<GroupDemo />} code={"1"} />
    </div>
  );
};

export default GroupPage;
