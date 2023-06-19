<script>
import { HomeFilled } from "@element-plus/icons-vue";
import TalkBar from "@/TalkBar.vue";
import progressMachine from "@/progressMachine";
import { interpret } from "@xstate/fsm";
import talkTemplates from "@/talkTemplates";

export default {
  name: "HomePage",
  components: {
    HomeFilled,
    TalkBar,
  },
  data() {
    return {
      progressService: interpret(progressMachine),
      talkList: progressMachine.initialState.context.talkList,
      isCanPlayback: false,
    };
  },
  methods: {
    onPrepare() {
      this.$alert("准备好了么，练习马上开始啦~", "提示", {
        confirmButtonText: "准备好了",
        callback: () => {
          this.progressService.send("OK");
        },
      });
    },
    onDone() {
      this.$alert("练习结束啦~", "提示", {
        confirmButtonText: "好的",
        callback: () => {
          this.isCanPlayback = true;
        },
      });
    },
    onContinue() {
      this.progressService.send("CONTINUE");
    },
  },
  created() {
    this.progressService.subscribe((state) => {
      this.talkList = state.context.talkList;

      if (state.matches("prepare")) {
        this.onPrepare();
      }

      if (state.matches("done")) {
        this.onDone();
      }
    });

    this.progressService.start();
  },
  mounted() {
    const talkTemplate = talkTemplates[0];
    this.progressService.send({ type: "LOAD", talkTemplate });
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
              :playback="isCanPlayback"
              @continue="onContinue"
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

    .el-main {
      padding-bottom: 0;
    }
  }
}
</style>
