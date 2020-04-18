import React from "react";
import AuthModal from "./AuthModal";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthModal />
      <pre className="dev-tips">
        登录成功：输入账号 suli 以及密码 qwer1234
        <br />
        登录失败：输入其他任意账号密码
        <br />
        验证失败：输入账号、密码都为空
      </pre>
    </div>
  );
}

export default App;
