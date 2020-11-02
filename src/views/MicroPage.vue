<template>
  <div class="page-micro-page">
    <MicroPage
      class="micro-page-component"
      :components="components"
      @handleReload="handleReload"
    />
  </div>
</template>
<script>
import MicroPage from "@/components/microPage/Index";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    MicroPage
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  computed: {
    ...mapState({
      components: state => state.pageMicroPage.components
    })
  },
  mounted() {
    if (this.id && this.id > 0) {
      this.loadData(this.id);
    }
  },
  methods: {
    ...mapActions({
      loadData: "pageMicroPage/loadData"
    }),
    handleReload() {
      this.loadData(this.id);
    }
  }
};
</script>
<style lang="less" scoped>
.page-micro-page {
  font-size: 14px;
}
</style>
