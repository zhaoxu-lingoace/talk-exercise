import { createMachine, assign } from "@xstate/fsm";

function createContext() {
  return {
    progress: 0,
    talkTemplate: [],
    talkList: [],
  };
}

const assignNext = assign((context) => {
  const progress = context.progress + 1;
  return {
    ...context,
    progress,
    talkList: context.talkTemplate.slice(0, progress),
  };
});

const progressMachine = createMachine({
  id: "progress",
  context: createContext(),
  initial: "none",
  states: {
    none: {
      on: {
        LOAD: {
          target: "prepare",
          actions: assign({
            talkTemplate: (context, event) => event.talkTemplate,
          }),
        },
      },
    },
    prepare: {
      on: {
        OK: {
          target: "processing",
          actions: assignNext,
        },
      },
    },
    processing: {
      on: {
        CONTINUE: [
          {
            target: "done",
            cond: (context) => context.progress === context.talkTemplate.length,
          },
          {
            actions: assignNext,
          },
        ],
      },
    },
    done: {
      on: {
        RESET: {
          target: "none",
          actions: assign(createContext()),
        },
      },
    },
  },
});

export default progressMachine;
