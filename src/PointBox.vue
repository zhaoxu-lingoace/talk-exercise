<script>
export default {
  name: "PointBox",
  props: ["direction", "words"],
};
</script>

<template>
  <div>
    <div :class="['point-box', direction]">{{ words }}</div>
  </div>
</template>

<style lang="scss" scoped>
.point-box {
  position: relative;
  width: 432px;
  min-height: 72px;
  box-sizing: border-box;
  padding: 24px;
  border: solid 1px black;
  border-radius: 10px;
  font-size: var(--el-font-size-extra-large);
  word-break: break-word;

  &.left {
    margin-left: 10px;
  }

  &.left::before {
    position: absolute;
    top: 24px;
    left: -20px;
    padding: 0;
    border: 10px solid;
    border-color: transparent black transparent transparent;
    display: block;
    content: "";
    z-index: 9;
  }
  &.left::after {
    position: absolute;
    top: 24px;
    left: -18px;
    padding: 0;
    border: 10px solid;
    border-color: transparent white transparent transparent;
    display: block;
    content: "";
    z-index: 10;
  }

  &.right {
    margin-right: 10px;
  }

  &.right::before {
    position: absolute;
    top: 24px;
    right: -20px;
    padding: 0;
    border: 10px solid;
    border-color: transparent transparent transparent black;
    display: block;
    content: "";
    z-index: 9;
  }
  &.right::after {
    position: absolute;
    top: 24px;
    right: -18px;
    padding: 0;
    border: 10px solid;
    border-color: transparent transparent transparent white;
    display: block;
    content: "";
    z-index: 10;
  }
}
</style>
