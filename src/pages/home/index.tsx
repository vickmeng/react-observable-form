import React from "react";
import { Link } from "react-router-dom";

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
        <h1>React Observable Form</h1>
        <h2>可自由订阅状态变化的React表单方案</h2>
        <div>
          <Link className="quick-start" to="/">
            快速开始
          </Link>
          <Link className="source-code" to="/">
            源代码
          </Link>
        </div>
      </div>

      <section>
        <h2>可订阅</h2>
        <p>随时随处订阅表单各类状态变化</p>
        <img src={flowImg} width={500} />
      </section>

      <section>
        <h2>易集成</h2>
      </section>

      <section>
        <h2>数据驱动</h2>
      </section>
    </main>
  );
};

export default Home;
