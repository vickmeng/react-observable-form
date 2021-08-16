import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Collapse, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import "./App.less";

interface IRoute {
  text: string;
  link: string;
}

interface ISubMenu {
  title: string;
  routes: IRoute[];
}

const MENU_DATA: ISubMenu[] = [
  {
    title: "简介",
    routes: [
      {
        text: "动机",
        link: "",
      },
      {
        text: "快速使用",
        link: "",
      },
      {
        text: "核心概念",
        link: "",
      },
    ],
  },
  {
    title: "API",
    routes: [
      {
        text: "<Field/>",
        link: "",
      },
      {
        text: "<Group/>",
        link: "",
      },
      {
        text: "<List/>",
        link: "",
      },
      {
        text: "<Error/>",
        link: "",
      },
      {
        text: "FieldControl",
        link: "",
      },
      {
        text: "GroupControl",
        link: "",
      },
      {
        text: "ListControl",
        link: "",
      },
    ],
  },
  {
    title: "高级使用",
    routes: [
      {
        text: "订阅变化",
        link: "",
      },
      {
        text: "嵌套关系",
        link: "",
      },
      {
        text: "动态表单",
        link: "",
      },
      {
        text: "联合校验",
        link: "",
      },
    ],
  },
];

const SubMenu = (props: { routes: IRoute[]; title: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemText primary={props.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding className="sublist">
          {props.routes.map((r, index) => (
            <ListItem button key={`key-${index}`} className="nested">
              <ListItemText primary={r.text} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <aside>
          <List component="nav">
            {MENU_DATA.map((v, index) => (
              <SubMenu key={`key-${index}`} routes={v.routes} title={v.title} />
            ))}
          </List>
        </aside>

        <div>
          <Typography variant="h1" component="h2" gutterBottom>
            高级
          </Typography>
        </div>
      </div>
    </Router>
  );
}

export default App;
