<template>
  <div class="progress-box">
    <div class="progress-item" v-for="item in list" :key="item.id">
      <div class="item-type">{{item.type}}</div>
      <div class="item-line">
        <div class="circular"></div>
      </div>
      <div class="item-content">
        <div>{{item.date}}</div>
        <div class="public">
          <div>办理单位</div>
          <div>{{item.team}}</div>
        </div>
        <div class="public">
          <div>办理方式</div>
          <div>{{item.doType}}</div>
        </div>
        <div class="public">
          <div>去向单位</div>
          <div>{{item.goTeam}}</div>
        </div>
        <div class="public">
          <div>办理意见</div>
          <div>{{item.advice}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang=less scoped>
/* @import url(); 引入css类 */
.progress-box {
  padding: 16px;
  box-sizing: border-box;
  font-size: 14px;
  color: #444;
  .progress-item {
    display: flex;

    .item-type {
      color: orange;
      flex-shrink: 0;
      margin-top: 18px;
    }
    .item-line {
      width: 3px;
      background: rgb(224, 224, 224);
      position: relative;
      margin: 0 8px;
      flex-shrink: 0;
      .circular {
        position: absolute;
        left: -2px;
        top: 20px;
        width: 3px;
        height: 3px;
        background: rgb(202, 202, 202);
        border: 2px solid #fff;
        border-radius: 50%;
      }
    }
    .item-content {
      flex: 1;
      margin-bottom: 12px;
      background: #fff;
      padding: 12px;
      box-sizing: border-box;
      line-height: 20px;
      border-radius: 8px;
      .public {
        display: flex;
        margin: 4px 0;
        & :nth-of-type(1) {
          margin-right: 16px;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>