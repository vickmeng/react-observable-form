import React from "react";
import { Typography } from "@material-ui/core";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

const FieldPage = () => {
  return (
    <div className={"page"}>
      <Typography paragraph variant={"h2"}>
        单一元素
      </Typography>

      <Typography paragraph>首先，我们创建一个FieldController。</Typography>
      <Typography paragraph>
        兵无常势，水无常形，你可以把FieldController放在任何一个可方便获取的位置。本例中我们放在useRef里。
      </Typography>

      <SyntaxHighlighter language="typescript" style={atomOneLight}>
        {'const controlRef = useRef(new FieldControl<string>(""));'}
      </SyntaxHighlighter>
    </div>
  );
};

export default FieldPage;
