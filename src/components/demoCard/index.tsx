import React, { ReactNode } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface IProps {
  demo: ReactNode;
  code: string;
}

const DemoCard = (props: IProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardContent>{props.demo}</CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <CodeIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <SyntaxHighlighter language="typescript" style={atomOneLight}>
            {props.code}
          </SyntaxHighlighter>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default DemoCard;
