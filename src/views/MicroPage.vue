<template>
  <div class="page-micro-page">
    <MicroPage class="micro-page-component" :components="components" />

    <Tabbar />
  </div>
</template>
<script>
import MicroPage from "@/components/microPage/Index";
import Tabbar from "@/components/Tabbar";
export default {
  components: {
    MicroPage,
    Tabbar
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      components: []
    };
  },
  mounted() {
    if (this.id && this.id > 0) {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      this.$fetchGet(
        `/store/mobile/tenantPage/findPage?pageContentId=${this.id}`
      ).then(({ data: { componentArray } }) => {
        this.components = componentArray.map(item => {
          return JSON.parse(item.componentContent || {});
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.page-micro-page {
  font-size: 14px;
}
</style>
