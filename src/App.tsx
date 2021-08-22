import React from "react";
import { Route, Switch } from "react-router-dom";

import Intro from "./pages/intro";

import "./App.less";
import Home from "./pages/home";

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

function App() {
  return (
    <div className="App">
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
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
