<template>
  <div class="page-index">
    page-index
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState({
      pageConfig: state => state.pageIndex.pageConfig
    })
  },
  mounted() {},
  methods: {
    ...mapActions({})
  }
};
</script>
<style lang="less" scoped>
.page-index {
  font-size: 14px;
  padding-bottom: calc(env(safe-area-inset-bottom));
}
</style>
