import React, { useState } from "react";
import { Modal, Button, Input, Divider, Row, Col } from "antd";
import { useMachine } from "@xstate/react";
import loginMachine from "./loginMachine";
import "./style.css";

export default function LoginModal() {
  const [userMsg, setUserMsg] = useState({
    account: "",
    password: "",
  });
  const [state, send] = useMachine(loginMachine);

  function updateUserMsg(type, value) {
    setUserMsg({
      ...userMsg,
      [type]: value,
    });
  }
  function submit() {
    send("SUBMIT", userMsg);
  }

  return (
    <>
      <h1 className="state">Machine state: {state.value}</h1>
      {state.context.tipMsg && <p className="tip-msg">tips: {state.context.tipMsg}</p>}
      {state.value === "loggedIn" && <Button onClick={() => send("LOGOUT")}>Logout</Button>}
      <Modal
        title="Login"
        closable={false}
        mask={false}
        width={400}
        visible={state.value === "loggedOut"}
        footer={<Button onClick={submit}>Submit</Button>}
      >
        <Row>
          <Col span={6}>Account:</Col>
          <Col span={18}>
            <Input placeholder="please enter account" value={userMsg.account} onChange={(e) => updateUserMsg("account", e.target.value)} />
          </Col>
        </Row>
        <Divider orientation="left" style={{ color: "#333", fontWeight: "normal", fontSize: "12px" }}>
          Fill Password
        </Divider>
        <Row>
          <Col span={6}>Password:</Col>
          <Col span={18}>
            <Input.Password
              placeholder="please enter password"
              value={userMsg.pwd}
              onChange={(e) => updateUserMsg("password", e.target.value)}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}
