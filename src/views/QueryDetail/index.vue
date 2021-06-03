<template>
  <div>
    <van-field v-model="title" label="标题" placeholder="标题" />
    <van-field v-model="username" label="反映人" placeholder="反映人" />
    <van-field v-model="date" label="信访时间" placeholder="信访时间" />
    <van-field
      v-model="message"
      type="textarea"
      rows="2"
      autosize
      label="内容"
      maxlength="500"
      placeholder="留言"
      show-word-limit
    />
    <van-field v-model="progress" label="办理进度" placeholder="办理进度" />
    <van-field v-model="answerDate" label="答复时间" placeholder="答复时间" />
    <van-field v-model="answerTeam" label="答复组织" placeholder="答复组织" />
    <van-field label="办理流程" />
    <Progress :list="list" />
  </div>
</template>

<script>
import Progress from "./components/Progress";
export default {
  components: { Progress },
  data() {
    return {
      title: "投诉路面坎坷",
      username: "孙中山",
      date: "2021-06-01",
      message:
        "投诉路面面坎坷投诉路面坎坷投诉路面坎坷投诉投诉路面坎坷路面坎坷投投诉路面坎坷投诉路面坎坷诉路面坎坷",
      progress: "已受访",
      answerDate: "2021-06-02",
      answerTeam: "滨江区公共服务",
      list: [
        {
          id: 1,
          type: "转送类",
          time: "2021-02-05",
          team: "滨江区政府",
          doType: "转送",
          goTeam: "滨江区教育局",
          advice: ""
        },
        {
          id: 2,
          type: "答复类",
          time: "2021-02-06",
          team: "滨江区政府",
          doType: "答复",
          goTeam: "滨江区教育局",
          advice:
            "滨江区教育局转送滨滨江区政转送府江区教育局滨江区教育转送局滨江区教育转送局滨江区教育局滨江区教育局滨江区教育局"
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang=less scoped>
/* @import url(); 引入css类 */
</style>