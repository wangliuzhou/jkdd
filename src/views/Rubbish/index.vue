<template>
  <div class="rubbish-page">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in list" :key="index">
        <van-image class="img" :src="item.src" alt="图片" fit="cover" />
      </van-swipe-item>
    </van-swipe>
    <van-search
      v-model="keyword"
      shape="round"
      show-action
      clearable
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="classify-list">
      <div
        class="item"
        v-for="item in classifyList"
        :key="item.id"
        :style="'background:'+item.color"
      >{{item.title}}</div>
    </div>
  </div>
</template>

<script>
// import Test from "@/views/Test";
export default {
  components: {},
  data() {
    return {
      keyword: "",
      list: [
        {
          id: 1,
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages.wenming.cn%2Fweb_wenming%2Fzgwmw_ysp%2Fysp_zhb%2F202004%2FW020200424414412608067.jpg&refer=http%3A%2F%2Fimages.wenming.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625326036&t=84ccd892e43677a6f50ad7b916efaa65"
        },
        {
          id: 2,
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp0.itc.cn%2Fimages01%2F20200525%2Fb1e19ab5882e46269186dff98f0df767.jpeg&refer=http%3A%2F%2Fp0.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625326036&t=0884a0f2816ba9aca25bdafbf3d44722"
        }
      ],
      classifyList: [
        {
          id: 1,
          title: "其他垃圾",
          color: "grey"
        },
        {
          id: 2,
          title: "厨余垃圾",
          color: "green"
        },
        {
          id: 3,
          title: "有害垃圾",
          color: "red"
        },
        {
          id: 4,
          title: "可回收物",
          color: "blue"
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      this.$push({ path: "/search", query: { keyword: this.keyword } });
    }
  }
};
</script>
<style lang=less scoped>
/* @import url(); 引入css类 */
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 200px;
  text-align: center;
  background-color: #39a9ed;
  .img {
    width: 100%;
    height: 200px;
  }
}
.classify-list {
  display: flex;
  flex-wrap: wrap;
  display: grid;
  padding: 0 12px;
  gap: 12px;
  grid-template-columns: auto auto;
  .item {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ccc;
    font-size: 16px;
    color: #fff;
    border-radius: 8px;
    box-shadow: 2px 8px 7px 0px rgba(0, 0, 0, 0.2);
  }
}
</style>