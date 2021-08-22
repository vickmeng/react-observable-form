import React from "react";
import { Link } from "react-router-dom";
import Highlight from "react-highlight";
import GitHubIcon from "@material-ui/icons/GitHub";

import { BasicWithAntd, BasicWithMui } from "../../demo/basic";
import { DisableField } from "../../demo/disable";

import rxImg from "./img/rx.png";
import reactImg from "./img/react.svg";
import flowImg from "./img/flow.png";

import "./index.less";

const Home = () => {
  return (
    <main className={"home"}>
      <div className={"banner"}>
        <img src={rxImg} className={"rxImg"} />
        <img src={reactImg} className={"reactImg"} />

        <nav>
          <div>
            <Link className="link" to="/">
              Docs
            </Link>
            <Link className="link" to="/">
              Demos
            </Link>
          </div>
          <div>
            <a href="https://github.com/vickmeng/react-observable-form">
              <GitHubIcon />
            </a>
          </div>
        </nav>

        <h1>React Observable Form</h1>
        <h2>可自由订阅状态变化的React响应式表单方案</h2>
        <div>
          <Link className="quick-start link" to="/">
            快速开始
          </Link>
        </div>
      </div>

      <section>
        <h2>响应式</h2>
        <p>随时随处订阅表单元素状态变化</p>
        <img src={flowImg} width={500} />
      </section>

      <section>
        <h2>自由集成</h2>
        <p>自由对接流行的组件库</p>

        <div className="third">
          <div className="third--demo antd">
            <BasicWithAntd />
          </div>

          <div className="divide vertical" />

          <div className="third--demo mui">
            <BasicWithMui />
          </div>
        </div>
      </section>

      <section>
        <h2>集中管理</h2>
        <p>声明式表单，集中管理动态逻辑</p>

        <div className="declare">
          <div className="code">
            <Highlight className="typescript">
              {"const group = new GroupControl({\n" +
                '  married: ["unmarried"],\n' +
                '  spouse: ["", { disabled: true }],\n' +
                "});\n" +
                "\n" +
                'const married = group.get("married");\n' +
                'const spouse = group.get("spouse");\n' +
                "\n" +
                "married.valueChange.subscribe((v) => {\n" +
                '  if (v === "married") {\n' +
                "    spouse.enable();\n" +
                "  } else {\n" +
                '    spouse.setValue("");\n' +
                "    spouse.disable();\n" +
                "  }\n" +
                "});"}
            </Highlight>
          </div>

          <div className="demo">
            <DisableField />
          </div>
        </div>
      </section>

      <footer>遵循 MIT 开源协议 &nbsp;&nbsp; Copyright © laomeng</footer>
    </main>
  );
};

export default Home;
