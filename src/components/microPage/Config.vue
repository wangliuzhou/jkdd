<template>
  <div class="config-wrap"></div>
</template>
<script>
export default {
  props: ["item"],
  mounted() {
    this.setTitle();
  },
  methods: {
    setTitle() {
      let { item } = this.data;
      document.title = item.title;
    }
  }
};
</script>
