<script>
import ProfilePhoto from "@/ProfilePhoto.vue";
import PointBox from "@/PointBox.vue";
import TalkStatus from "@/TalkStatus.vue";
import * as audioProcessor from "@/audioProcessor";
import talkMachine from "@/talkMachine";
import { interpret } from "@xstate/fsm";

export default {
  name: "TalkBar",
  props: ["content", "playback", "exchange"],
  components: {
    ProfilePhoto,
    PointBox,
    TalkStatus,
  },
  data() {
    return {
      talkService: interpret(talkMachine),
      talkStatus: talkMachine.initialState.value,
    };
  },
  computed: {
    direction() {
      return this.content.who === "teacher" ? "left" : "right";
    },
  },
  methods: {
    async doTalk() {
      switch (this.content.who) {
        case "teacher":
          this.talkService.send(this.exchange ? "HEAR" : "TALK");

          await audioProcessor.sound(this.content.words);
          break;
        case "student":
          this.talkService.send(this.exchange ? "TALK" : "HEAR");

          await audioProcessor.heard(this.content.words);
          break;
      }

      this.talkService.send("DONE");
      if (this.playback) {
        this.talkService.send("PLAY");
      }
    },
    onClickTalkStatus() {
      if (this.talkService.state.value === "play") {
        this.doTalk();
      }
    },
  },
  created() {
    this.talkService.subscribe((state) => {
      this.talkStatus = state.value;
    });

    this.talkService.start();
  },
  async mounted() {
    await this.doTalk();

    this.$emit("continue");
  },
  watch: {
    playback(value) {
      if (value) {
        this.talkService.send("PLAY");
      }
    },
  },
};
</script>

<template>
  <div>
    <div :class="['talk-bar', direction]">
      <ProfilePhoto
        :class="['profile-photo', direction]"
        :who="content.who"
      ></ProfilePhoto>

      <div :class="['point-box-wrapper', direction]">
        <PointBox :direction="direction" :words="content.words"></PointBox>
      </div>

      <TalkStatus
        class="talk-status"
        @click="onClickTalkStatus"
        :talkStatus="talkStatus"
      ></TalkStatus>
    </div>
  </div>
</template>

<style scoped lang="scss">
.talk-bar {
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  &.right {
    flex-direction: row-reverse;
  }
  .profile-photo {
    &.left {
      margin-right: 16px;
    }
    &.right {
      margin-left: 16px;
    }
  }
  .point-box-wrapper {
    flex: 1;
    display: flex;
    &.right {
      flex-direction: row-reverse;
    }
  }
}
</style>
