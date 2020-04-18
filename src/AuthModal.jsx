import React, { useRef } from "react";
import { curry } from "lodash";
import { useMachine } from "@xstate/react";
import { Modal, Button, Input, Divider, Row, Col } from "antd";
import authMachine from "./authMachine";

export default function AuthModal() {
  const [state, send] = useMachine(authMachine);
  const authContext = state.context;
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

  function AuthStateInfo() {
    return (
      <>
        <h1 className="state">Machine state: {state.value}</h1>
        {authContext.tipMsg && <p className="tip-msg">Tips: {authContext.tipMsg}</p>}
      </>
    );
  }

  function LogInScreen() {
    return state.value === "loggedIn" ? (
      <div data-testid="loggedIn-screen">
        <Button onClick={loggout}>Logout</Button>
      </div>
    ) : null;
  }

  function LogOutScreen() {
    return state.value === "loggedOut" ? (
      <div data-testid={"form-screen"}>
        <Modal
          id="auth-login-modal"
          title="Login"
          closable={false}
          mask={false}
          width={400}
          visible
          footer={<Button onClick={submit}>Submit</Button>}
        >
          <Row>
            <Col span={6}>
              <span className="sub-title">Account:</span>
            </Col>
            <Col span={18}>
              <Input data-testid="user-account" placeholder="please enter account" defaultValue={userMsg.account} onChange={updateAccount} />
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
              <Input.Password data-testid="user-pwd" placeholder="please enter password" defaultValue={userMsg.pwd} onChange={updatePassword} />
            </Col>
          </Row>
        </Modal>
      </div>
    ) : null;
  }

  return (
    <>
      <AuthStateInfo />
      <LogOutScreen />
      <LogInScreen />
    </>
  );
}
