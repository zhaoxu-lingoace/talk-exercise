<script>
import { HomeFilled } from "@element-plus/icons-vue";
import TalkBar from "@/TalkBar.vue";

export default {
  name: "HomePage",
  components: {
    HomeFilled,
    TalkBar,
  },
  data() {
    return {
      talkTemplate: [
        { who: "teacher", words: "What's your name?" },
        { who: "student", words: "I'm Mike." },
        { who: "teacher", words: "Which class are you in?" },
        { who: "student", words: "I'm in class one." },
        { who: "teacher", words: "How old are you?" },
        { who: "student", words: "I'm nine years old." },
        { who: "teacher", words: "Which class are you in?" },
        { who: "student", words: "I'm in class two." },
      ],
      progress: 7,
    };
  },
  computed: {
    talkList() {
      return this.talkTemplate.slice(0, this.progress);
    },
  },
};
</script>

<template>
  <div style="height: 100%">
    <div class="home-page">
      <el-container>
        <el-header>
          <el-page-header title="主页">
            <template #icon>
              <el-icon><HomeFilled /></el-icon>
            </template>

            <template #content>
              <el-text size="large">对话练习-自我介绍1</el-text>
            </template>
          </el-page-header>
        </el-header>

        <el-divider></el-divider>

        <el-main>
          <el-scrollbar>
            <TalkBar
              v-for="(item, index) of talkList"
              :key="index"
              :content="item"
            ></TalkBar>
          </el-scrollbar>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<style lang="scss">
.home-page {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      display: flex;
      align-items: center;
    }
  }
}
</style>
