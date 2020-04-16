import React from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";

const toggleMachine = Machine({
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: {
      on: { TOGGLE: "active" },
      entry: "logger",
    },
    active: {
      on: { TOGGLE: "inactive" },
    },
  },
});

const newToggleMachine = toggleMachine
  .withConfig({
    actions: {
      // action implementation
      logger: (context, event) => {
        console.log("Toggle log!", context, event);
      },
    },
    activities: {
      /* ... */
    },
    guards: {
      /* ... */
    },
    services: {
      /* ... */
    },
  })
  .withContext({
    count: 0,
  });

// const { initialState } = newToggleMachine;
// console.log(initialState);
// console.log(initialState.nextEvents, initialState.matches("inactive"));

export default function Toggler() {
  const [state, send] = useMachine(newToggleMachine);

  return <button onClick={() => send("TOGGLE")}>{state.value === "inactive" ? "Click to activate" : "Active! Click to deactivate"}</button>;
}
