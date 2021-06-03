<template>
  <div class="search-page">
    <van-search
      v-model="word"
      clearable
      shape="round"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="reslut" v-if="result.belong">
      <div class="text-grey">属于</div>
      <div class="text-type">{{result.belong}}</div>
      <van-image
        alt="图片"
        fit="cover"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp0.itc.cn%2Fimages01%2F20200525%2Fb1e19ab5882e46269186dff98f0df767.jpeg&refer=http%3A%2F%2Fp0.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625326036&t=0884a0f2816ba9aca25bdafbf3d44722"
      />
      <div class="text-grey">建议</div>
      <div class="advice">洗净晒干，再投放入可回收物桶（蓝色桶）</div>
    </div>
    <div v-else class="no-data">
      <IconFont type="icon-wushuju" style="fontSize:60px" />
      <div style="marginTop:12px">暂无结果，请重新搜索</div>
    </div>
  </div>
</template>

<script>
// import Test from "@/views/Test";
export default {
  components: {},
  props: ["keyword"],
  data() {
    return {
      word: "",
      result: {
        belong: ""
      }
    };
  },
  computed: {},
  created() {
    console.log(this.keyword);
    this.word = this.keyword;
    this.onSearch();
  },
  mounted() {},
  methods: {
    onSearch() {
      console.log("ajax请求结果");
    }
  }
};
</script>
<style lang=less scoped>
/* @import url(); 引入css类 */
.reslut {
  text-align: center;
  font-size: 14px;
  .text-grey {
    color: #999;
    margin: 24px 0 0;
  }
  .text-type {
    font-size: 20px;
    font-weight: 600;
    color: #666;
    margin: 12px 0 24px 0;
  }
  .advice {
    color: #666;
    margin-top: 24px;
  }
}
.no-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #999;
}
</style>