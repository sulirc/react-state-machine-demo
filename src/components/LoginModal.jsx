import React from "react";
import { Modal, Button, Input, Divider, Row, Col } from "antd";
// import { useRef, useEffect, useCallback } from "react";
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";

const fetchUser = (userId, pwd) => {
  console.info("post...", userId, pwd);
  return new Promise((resolve, reject) => {
    resolve({
      msg: "ok",
      code: 0,
      data: {
        level: Math.ceil(Math.random() * 30),
        token: Math.random().toString(32).substring(2),
      },
    });
  });
};

const loginMachine = Machine({
  id: "login",
  initial: "loggedOut",
  states: {
    loggedOut: {
      on: {
        SUBMIT: "loading",
      },
    },
    loading: {
      invoke: {
        src: "postUserAuthData",
        onDone: "loggedIn",
        onError: "loggedOut",
      },
    },
    loggedIn: {
      on: {
        LOGOUT: "loggedOut",
      },
    },
  },
});

export default function LoginModal() {
  const [state, send] = useMachine(loginMachine, {
    services: {
      postUserAuthData: (context, event) => {
        return new Promise((resolve, reject) => {
          resolve(true);
        });
      },
    },
  });

  return (
    <>
      <h1>state: {state.value}</h1>
      {
        state.value === 'loggedIn' && <Button onClick={() => send('LOGOUT')}>Logout</Button>
      }
      <Modal
        title="Login"
        width={400}
        visible={state.value === "loggedOut"}
        footer={<Button onClick={() => send("SUBMIT")}>Submit</Button>}
      >
        <Row>
          <Col span={6}>ID:</Col>
          <Col span={18}>
            <Input placeholder="please enter ur userId" />
          </Col>
        </Row>
        <Divider orientation="left" style={{ color: "#333", fontWeight: "normal", fontSize: '12px' }}>
          Fill Password
        </Divider>
        <Row>
          <Col span={6}>Password:</Col>
          <Col span={18}>
            <Input.Password placeholder="please enter ur password" />
          </Col>
        </Row>
      </Modal>
    </>
  );
}
