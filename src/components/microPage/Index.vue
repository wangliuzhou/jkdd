<template>
  <div class="component-list">
    <template v-for="(item, index) in components">
      <!-- 页面设置 -->
      <Config
        v-if="item.type == 'config'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 分割线 -->
      <SpaceDivision
        v-else-if="item.type == 'space-division'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 公告 -->
      <Notice
        v-else-if="item.type == 'notice'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 直播 -->
      <WxappLivePlayer
        v-else-if="item.type == 'wxapp-live-player'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 商品搜索 -->
      <GoodsSearch
        v-else-if="item.type == 'goods-search'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 图文导航 -->
      <ImageTextNav
        v-else-if="item.type == 'image-text-nav'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 视频 -->
      <XzVideo
        v-else-if="item.type == 'video'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 图片 -->
      <XzImage
        v-else-if="item.type == 'image'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 商品 -->
      <XzGoods
        v-else-if="item.type == 'goods'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 商品列表 -->
      <GoodsList
        v-else-if="item.type == 'goodsList'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 涨粉 -->
      <IncreaseFans
        v-else-if="item.type == 'increase-fans'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
      <!-- 秒杀 -->
      <XzSeckill
        v-else-if="item.type == 'seckill'"
        :item="item"
        :index="index"
        :key="item.pageComponentId"
      />
    </template>
  </div>
</template>
<script>
import Config from "@/components/microPage/Config";
import SpaceDivision from "@/components/microPage/SpaceDivision";
import WxappLivePlayer from "@/components/microPage/WxappLivePlayer";
import GoodsSearch from "@/components/microPage/GoodsSearch";
import ImageTextNav from "@/components/microPage/ImageTextNav";
import Notice from "@/components/microPage/Notice";
import XzImage from "@/components/microPage/XzImage";
import XzGoods from "@/components/microPage/XzGoods";
import IncreaseFans from "@/components/microPage/IncreaseFans";
import XzSeckill from "@/components/microPage/XzSeckill";

export default {
  components: {
    Config,
    SpaceDivision,
    WxappLivePlayer,
    GoodsSearch,
    ImageTextNav,
    Notice,
    XzImage,
    XzGoods,
    IncreaseFans,
    XzSeckill
  },
  props: {
    components: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style lang="less" scoped>
.component-list {
  font-size: 14px;
}
</style>
