<script>
import { VideoPlay, Headset, Mic } from "@element-plus/icons-vue";

export default {
  name: "TalkStatus",
  props: ["talkStatus"],
};
</script>

<template>
  <div>
    <div class="talk-status">
      <el-icon size="40">
        <VideoPlay v-if="talkStatus === 'play'" />
        <Headset v-if="talkStatus === 'talk'" />
        <Mic v-if="talkStatus === 'hear'" />
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
