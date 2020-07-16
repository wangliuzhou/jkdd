<template>
  <div class="xz-image-wrap">
    <Swper v-if="item.imageType === 1" :detail="item" />
  </div>
</template>
<script>
import Swper from "./components/swiper";
export default {
  components: {
    Swper
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
