/* eslint-disable no-unused-vars */
import { Machine, interpret } from "xstate";

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

const machine = Machine({
  // ...
  id: "toggle2",
  initial: "inactive",
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      on: { TOGGLE: "inactive" },
    },
  },
  invoke: [
    { id: "notifier", src: createNotifier },
    { id: "logger", src: createLogger },
  ],
  // ...
});

function createLogger() {
  return "logger";
}
function createNotifier() {
  return "notifier";
}

// eslint-disable-next-line no-unused-vars
const service = interpret(machine)
  .onTransition((state) => {
    // console.log(state.children.notifier); // service from createNotifier()
    // console.log(state.children.logger); // service from createLogger()
    if (state.changed) {
      console.log('state changed!', state.value);
    }
    console.log(state);
  })
  // .start();

// console.log(service, service.state.value);
// service.stop();
service.send('TOGGLE');
// console.log(service, service.state.value);
setTimeout(() => {
  service.start();
}, 0);

// requestAnimationFrame(() => {
//   console.log('raf trigger');
// });