import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { Link } from "react-router-dom";
import "./index.less";

interface IRoute {
  text: string;
  link: string;
}

interface ISubMenu {
  title: string;
  routes: IRoute[];
}

const BASIC: ISubMenu = {
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
};

const ADVANCE: ISubMenu = {
  title: "高级使用",
  routes: [
    {
      text: "动态表单",
      link: "",
    },
    {
      text: "联合校验",
      link: "",
    },
    {
      text: "订阅变化",
      link: "",
    },
    {
      text: "与Rxjs",
      link: "",
    },
  ],
};

const API: ISubMenu = {
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
};

const SubMenu = ({ menu }: { menu: ISubMenu }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemText primary={menu.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={"submenu--list"}>
          {menu.routes.map((route) => {
            return (
              <ListItem button key={route.text} className={"nested"}>
                <ListItemText primary={route.text} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

const Menu = () => {
  return (
    <aside className={"menu"}>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <Link to="/quick-start">
          <ListItem button>
            <ListItemText primary="快速开始" />
          </ListItem>
        </Link>

        <Link to="/core">
          <ListItem button>
            <ListItemText primary="核心概念" />
          </ListItem>
        </Link>

        <SubMenu menu={BASIC} />
        <SubMenu menu={ADVANCE} />
        <SubMenu menu={API} />
      </List>
    </aside>
  );
};

export default Menu;
