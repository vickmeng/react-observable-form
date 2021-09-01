import React from "react";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import GitHubIcon from "@material-ui/icons/GitHub";

import { BasicWithAntd, BasicWithMui } from "../../demo/basic";
import { DisableDemo } from "../../demo/disable";
import rxImg from "../../assets/img/rx.png";
import reactImg from "../../assets/img/react.svg";
import flowImg from "../../assets/img/flow.png";
import pipeImg from "../../assets/img/pipe.png";

import "./index.less";

const Home = () => {
  return (
    <main className={"home"}>
      <div className={"banner"}>
        <img src={rxImg} className={"rxImg"} />
        <img src={reactImg} className={"reactImg"} />

        <nav>
          <div>
            <Link className="link" to="/quick-start">
              文档
            </Link>
            <Link className="link" to="/">
              示例
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
          <Link className="quick-start link" to="/quick-start">
            快速开始
          </Link>
        </div>
      </div>

      <section>
        <h2>自由订阅</h2>
        <p>随时随处订阅表单元素状态变化</p>
        <img src={flowImg} width={500} />
      </section>

      <section>
        <h2>Rxjs</h2>
        <p>可以使用Rxjs Operators助力开发</p>

        <img src={pipeImg} width={600} />
      </section>

      <section>
        <h2>友好集成</h2>
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
            <SyntaxHighlighter language="javascript" style={atomOneLight}>
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
            </SyntaxHighlighter>
          </div>

          <div className="demo">
            <DisableDemo />
          </div>
        </div>
      </section>

      <footer>遵循 MIT 开源协议 &nbsp;&nbsp; Copyright © Rxjs-CN</footer>
    </main>
  );
};

export default Home;
