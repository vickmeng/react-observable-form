import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import DemoCard from "../../components/demoCard";
import ValidateDemo from "../../demo/validate";

const ValidatePage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        校验
      </Typography>

      <Typography paragraph>
        我们可以在初始化时通过validators参数为controller设计校验规则，也可以通过controller暴露的方法方法动态修改校验规则。
        controller会根据validators的顺序依次进行校验，我们可以在<Link to="/">动态表单</Link>，
        <Link to="/">自定义校验</Link>中了解更多内容。
      </Typography>

      <Typography paragraph>同时,react-observable-form也为开发者准备了一些常用的校验方法。</Typography>

      <DemoCard
        demo={<ValidateDemo />}
        code={
          'import React, { useRef } from "react";\n' +
          'import { TextField, FormHelperText } from "@material-ui/core";\n' +
          'import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";\n' +
          "\n" +
          'import { Error,Field,FieldControl } from "react-observable-form/validators";\n' +
          'import { required } from "react-observable-form/validators";\n' +
          "export const ValidateDemo = () => {\n" +
          '  const controlRef = useRef(new FieldControl("", { validators: [required] }));\n' +
          "\n" +
          "  return (\n" +
          "    <>\n" +
          "      <Field control={controlRef.current}>\n" +
          "        {({ value, setValue, dirty, errors }) => {\n" +
          "          return (\n" +
          "            <>\n" +
          "              <TextField\n" +
          '                variant="outlined"\n' +
          '                label={"姓名"}\n' +
          "                error={Boolean(dirty && errors)}\n" +
          "                value={value}\n" +
          "                onChange={(e) => setValue(e.target.value)}\n" +
          "              />\n" +
          "              {/*  同样可以在<Field/>中消费errors */}\n" +
          '              {dirty && errors?.required && <ErrorOutlineIcon color={"error"} />}\n' +
          "            </>\n" +
          "          );\n" +
          "        }}\n" +
          "      </Field>\n" +
          "      <Error control={controlRef.current}>\n" +
          "        {({ dirty, errors }) => {\n" +
          '          return <FormHelperText error>{dirty && errors?.required && "请填写姓名"}</FormHelperText>;\n' +
          "        }}\n" +
          "      </Error>\n" +
          "    </>\n" +
          "  );\n" +
          "};"
        }
      />
    </div>
  );
};

export default ValidatePage;
