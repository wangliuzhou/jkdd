<template>
  <div class="picker-wrap">
    <div class="picker-value" @click="showPopup">
      <div v-if="value" class="value">{{ value }}</div>
      <div v-if="!value" class="value placeholder">
        {{ placeholder }}
      </div>
      <IconFont
        type="iconqianjin"
        fontStyle="color:#cccccc;font-size:26rpx"
      ></IconFont>
    </div>
    <Popup v-model="show" position="bottom">
      <template v-if="mode === 'date'">
        <DatetimePicker
          title="选择日期"
          type="date"
          @confirm="onChange"
          :minDate="minDate"
          v-model="currentDate"
        />
      </template>
      <template v-if="mode === 'region'">
        <Area title="选择地址" @change="onChange" />
      </template>
    </Popup>
  </div>
</template>
<script>
import IconFont from "@/components/IconFont";
import { DatetimePicker, Popup, Toast, Area } from "vant";
import { formatTimeSimple } from "@/utils/index";
export default {
  components: { DatetimePicker, Popup, Area, IconFont },
  props: {
    placeholder: {
      type: String,
      default: "请选择出生日期"
    },
    mode: {
      type: String,
      defalut: "date"
    }
  },
  data() {
    return {
      value: "",
      show: false,
      minDate: new Date(1940, 0, 1),
      currentDate: new Date()
    };
  },
  mounted() {},
  computed: {},
  methods: {
    showPopup() {
      this.show = true;
    },
    onChange(e) {
      this.value = formatTimeSimple(e);
      this.$emit("onChange", formatTimeSimple(e));
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.picker-wrap {
  flex: 1;

  .picker-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.4rem;

    .value {
      line-height: 1.4rem;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;

      &.placeholder {
        color: #c0c4cc;
      }
    }
  }
}
</style>
