import React, { useRef } from "react";
import { curry } from "lodash";
import { useMachine } from "@xstate/react";
import { Modal, Button, Input, Divider, Row, Col } from "antd";
import loginMachine from "./loginMachine";
import "./style.css";

export default function LoginModal() {
  const [state, send] = useMachine(loginMachine);
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
    userMsg.current = ({
      ...userMsg.current,
      [type]: e.target.value,
    });
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
          <Col span={6}>Account:</Col>
          <Col span={18}>
            <Input placeholder="please enter account" defaultValue={userMsg.account} onChange={updateAccount} />
          </Col>
        </Row>
        <Divider orientation="left" style={{ color: "#333", fontWeight: "normal", fontSize: "12px" }}>
          Fill Password
        </Divider>
        <Row>
          <Col span={6}>Password:</Col>
          <Col span={18}>
            <Input.Password placeholder="please enter password" defaultValue={userMsg.pwd} onChange={updatePassword} />
          </Col>
        </Row>
      </Modal>
    </>
  );
}
