import { postUserAuthData } from "./util";
import { Machine, assign } from "xstate";

export const setUserToken = assign({
  token: (_ctx, evt) => {
    return evt.data.data.token;
  },
});

export const clearUserToken = assign({
  token: (_ctx, _evt) => {
    return null;
  },
});

export const updateTipMsg = assign({
  tipMsg: (ctx, evt) => {
    if (formIsInvalid(ctx)) {
      return "form invalid";
    }
    if (evt.type === "LOGOUT") {
      return "logout ok";
    }
    return evt.data.msg;
  },
});

export const updateUserFormData = assign({
  account: (_ctx, evt) => {
    return evt.account;
  },
  password: (_ctx, evt) => {
    return evt.password;
  },
});

export function formIsInvalid(ctx, _evt) {
  return !(ctx.account && ctx.password);
}

export default Machine(
  {
    id: "auth",
    initial: "loggedOut",
    context: {
      account: null,
      password: null,
      token: null,
      tipMsg: "",
    },
    states: {
      loggedOut: {
        on: {
          SUBMIT: {
            target: "loading",
            actions: "updateUserFormData",
          },
        },
      },
      loading: {
        on: {
          "": {
            target: "loggedOut",
            actions: "updateTipMsg",
            cond: "formIsInvalid",
          },
        },
        invoke: {
          src: "login",
          onDone: {
            target: "loggedIn",
            actions: ["setUserToken", "updateTipMsg"],
          },
          onError: {
            target: "loggedOut",
            actions: ["clearUserToken", "updateTipMsg"],
          },
        },
      },
      loggedIn: {
        on: {
          LOGOUT: {
            target: "loggedOut",
            actions: ["clearUserToken", "updateTipMsg"],
          },
        },
      },
    },
  },
  {
    services: {
      login: (ctx, _evt) => {
        return postUserAuthData({
          account: ctx.account,
          password: ctx.password,
        });
      },
    },
    actions: {
      setUserToken,
      clearUserToken,
      updateTipMsg,
      updateUserFormData,
    },
    guards: {
      formIsInvalid,
    },
  }
);
