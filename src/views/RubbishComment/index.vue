<template>
  <div class>RubbishComment</div>
</template>

<script>
// import Test from "@/views/Test";
export default {
  props: ["id"],
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {
    console.log(this.id);
  },
  mounted() {
    document.title = "";
  },
  methods: {}
};
</script>
<style lang=less scoped>
/* @import url(); 引入css类 */
</style>