import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore, Home } from "@material-ui/icons";

import Intro from "./pages/intro";

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
        text: "介绍",
        link: "Intro",
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
    title: "基础使用",
    routes: [
      {
        text: "单一元素",
        link: "",
      },
      {
        text: "群组",
        link: "",
      },
      {
        text: "列表",
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
];

const SubMenu = (props: { routes: IRoute[]; title: string }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

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
            <ListItem
              button
              key={`key-${index}`}
              className="nested"
              onClick={() => {
                history.push(r.link);
              }}
            >
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
    <div className="App">
      <aside>
        <List component="nav">
          {MENU_DATA.map((v, index) => (
            <SubMenu key={`key-${index}`} routes={v.routes} title={v.title} />
          ))}
        </List>
      </aside>

      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to={"/Intro"} />
          </Route>
          <Route path="/Intro">
            <Intro />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
