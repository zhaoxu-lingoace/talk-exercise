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
    done: {
      on: {
        PLAY: "play",
      },
    },
    play: {
      on: {
        TALK: "talk",
        HEAR: "hear",
      },
    },
  },
});

export default talkMachine;
