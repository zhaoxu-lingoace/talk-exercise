<script>
import { VideoPlay, Headset, Mic } from "@element-plus/icons-vue";

export default {
  name: "TalkStatus",
  data() {
    return {
      talkStatus: "none",
    };
  },
};
</script>

<template>
  <div>
    <div class="talk-status">
      <el-icon size="40"
        ><VideoPlay v-if="talkStatus === 'play'" />
        <Headset v-if="talkStatus === 'hear'" />
        <Mic v-if="talkStatus === 'talk'" />
      </el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.talk-status {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
