<template>
  <div class="page-index">
    <MicroPage
      class="micro-page-component"
      :pageConfig="pageConfig"
      :components="components"
      :templateType="templateType"
      @reload="handleReload"
    />
    <Tabbar />
  </div>
</template>
<script>
import MicroPage from "@/components/microPage/Index";
import Tabbar from "@/components/Tabbar";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    MicroPage,
    Tabbar
  },
  computed: {
    ...mapState({
      components: state => state.pageIndex.components,
      templateType: state => state.pageIndex.templateType,
      pageConfig: state => state.pageIndex.pageConfig
    })
  },
  mounted() {
    this.loadData();
  },
  methods: {
    ...mapActions({
      loadData: "pageIndex/loadData"
    }),
    handleReload() {
      this.loadData();
    }
  }
};
</script>
<style lang="less" scoped>
.page-index {
  font-size: 14px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 50px);
}
</style>
