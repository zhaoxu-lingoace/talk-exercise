<script>
import { VideoPlay, Headset } from "@element-plus/icons-vue";

export default {
  name: "TalkStatus",
  props: ["talkStatus"],
};
</script>

<template>
  <div>
    <div class="talk-status">
      <el-icon size="40" v-if="talkStatus !== 'hear'">
        <VideoPlay v-if="talkStatus === 'play'" />
        <Headset v-if="talkStatus === 'talk'" />
      </el-icon>
      <img v-else src="./hear.gif" alt="Hear" width="80" height="80" />
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
