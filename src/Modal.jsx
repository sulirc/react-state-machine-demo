import React, { useRef } from "react";
import { curry } from "lodash";
import { useMachine } from "@xstate/react";
import { Modal, Button, Input, Divider, Row, Col } from "antd";
import authMachine from "./authMachine";

export default function LoginModal() {
  const [state, send] = useMachine(authMachine);
  const userMsg = useRef({
    account: "",
    password: "",
  });

  function submit() {
    send("SUBMIT", userMsg.current);
  }
  function loggout() {
    send("LOGOUT");
  }

  function updateUserMsg(type, e) {
    userMsg.current = {
      ...userMsg.current,
      [type]: e.target.value,
    };
  }

  const updateAccount = curry(updateUserMsg)("account");
  const updatePassword = curry(updateUserMsg)("password");

  return (
    <>
      <h1 className="state">Machine state: {state.value}</h1>
      {state.context.tipMsg && <p className="tip-msg">tips: {state.context.tipMsg}</p>}
      {state.value === "loggedIn" && <Button onClick={loggout}>Logout</Button>}
      <Modal
        title="Login"
        closable={false}
        mask={false}
        width={400}
        visible={state.value === "loggedOut"}
        footer={<Button onClick={submit}>Submit</Button>}
      >
        <Row>
          <Col span={6}>
            <span className="sub-title">Account:</span>
          </Col>
          <Col span={18}>
            <Input placeholder="please enter account" defaultValue={userMsg.account} onChange={updateAccount} />
          </Col>
        </Row>
        <Divider orientation="left" style={{ color: "#333", fontWeight: "normal", fontSize: "12px" }}>
          Fill Password
        </Divider>
        <Row>
          <Col span={6}>
            <span className="sub-title">Password:</span>
          </Col>
          <Col span={18}>
            <Input.Password placeholder="please enter password" defaultValue={userMsg.pwd} onChange={updatePassword} />
          </Col>
        </Row>
      </Modal>

      <pre className="dev-tips">
        成功：输入账号 suli 以及密码 qwer1234
        <br />
        失败：输入其他任意账号密码
        <br />
        表单验证失败：账号、密码都为空
      </pre>
    </>
  );
}
