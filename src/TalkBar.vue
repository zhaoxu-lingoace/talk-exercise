<script>
import ProfilePhoto from "@/ProfilePhoto.vue";
import PointBox from "@/PointBox.vue";
import TalkStatus from "@/TalkStatus.vue";

export default {
  name: "TalkBar",
  props: ["content"],
  components: {
    ProfilePhoto,
    PointBox,
    TalkStatus,
  },
  computed: {
    direction() {
      return this.content.who === "teacher" ? "left" : "right";
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
      <TalkStatus class="talk-status"></TalkStatus>
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
