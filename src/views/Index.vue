<template>
  <div class="page-index">
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
  data() {
    return {
      components: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$get("/store/mobile/tenantPage/findMainPage").then(
        ({ data: { componentArray } }) => {
          this.components = componentArray.map(item => {
            return JSON.parse(item.componentContent || {});
          });
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.page-index {
  font-size: 14px;
}
</style>
