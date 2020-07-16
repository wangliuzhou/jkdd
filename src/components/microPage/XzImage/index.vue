<template>
  <div class="xz-image-wrap">
    <Swper v-if="item.imageType === 1" :detail="item" />
    <HotArea v-if="item.imageType === 2" :detail="item" />
  </div>
</template>
<script>
import Swper from "./components/swiper";
import HotArea from "./components/hotArea";
export default {
  components: {
    Swper,
    HotArea
  },
  props: ["item"],
  mounted() {
    this.setTitle();
  },
  methods: {
    setTitle() {
      // let { item } = this;
    }
  }
};
</script>
