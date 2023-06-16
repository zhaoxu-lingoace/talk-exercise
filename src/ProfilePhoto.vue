<script>
export default {
  name: "ProfilePhoto",
  props: ["who"],
};
</script>

<template>
  <div>
    <div class="profile-photo">
      <el-avatar :size="72">{{ who }}</el-avatar>
    </div>
  </div>
</template>
