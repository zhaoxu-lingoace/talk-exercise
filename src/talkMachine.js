import { createMachine } from "@xstate/fsm";

const talkMachine = createMachine({
  id: "talk",
  initial: "none",
  states: {
    none: {
      on: {
        TALK: "talk",
        HEAR: "hear",
      },
    },
    play: {
      on: {
        TALK: "talk",
        HEAR: "hear",
      },
    },
    done: {
      on: {
        PLAY: "play",
      },
    },
    talk: {
      on: {
        DONE: "done",
      },
    },
    hear: {
      on: {
        DONE: "done",
      },
    },
  },
});

export default talkMachine;
