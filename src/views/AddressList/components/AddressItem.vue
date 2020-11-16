<template>
  <div
    class="address-item flex-between"
    :class="{
      invalid
    }"
    @click="onTapAddress"
  >
    <div class="address-item-left">
      <div class="name-phone-tags">
        <span>{{ item.userConsigneeName }}</span>
        <span class="phone">{{ item.userConsigneePhoneFormat }}</span>
        <div class="tag default-tag" v-if="item.isDefault === 1">默认</div>
        <div class="tag" v-if="item.tenantUserReceivingAddressLabel">
          {{
            item.tenantUserReceivingAddressLabel.userReceivingAddressLabelName
          }}
        </div>
      </div>
      <div class="address-text">
        {{ item.userAddressProvince }}{{ item.userAddressCity
        }}{{ item.userAddressDistrict }}{{ item.userAddressDetail }}
      </div>
    </div>
    <div class="navigator-box" @click.stop.prevent="goPage">
      <IconFont type="iconbianji" fontStyle="font-size: 0.4rem;color:#ccc" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "invalid"],
  methods: {
    onTapAddress() {
      if (!this.invalid) {
        this.$emit("choose-address", {
          item: this.item
        });
      }
    },
    goPage() {
      this.$push(`/addAddress?id=${this.item.userReceivingAddressId}`);
    }
  }
};
</script>
<style lang="less" scoped>
.address-item {
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  height: 77.5px;
  margin-top: 8px;

  .address-item-left {
    flex: 1;
    .name-phone-tags {
      display: flex;
      align-items: center;
      color: #333333;

      .phone {
        margin: 0 6px;
      }

      .tag {
        margin-right: 3px;
        padding: 0 5px;
        min-width: 32px;
        box-sizing: border-box;
        height: 16px;
        border-radius: 8px;
        border: 1px solid rgba(255, 106, 0, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffe9d9;
        font-size: 12px;
        color: rgba(255, 106, 0, 1);
      }

      .default-tag {
        background: #fff;
      }
    }

    .address-text {
      color: #666666;
      margin-top: 8px;
    }
  }
  .navigator-box {
    padding: 15px;
    &:hover {
      background: #fbfbfb;
    }
  }

  &.invalid {
    .address-item-left {
      .name-phone-tags {
        color: #999;
        .tag {
          border: 1px solid #cccccc;
          background: #fafafa;
          color: #cccccc;
        }
        .default-tag {
          background: #fff;
        }
      }
      .address-text {
        color: #bbbbbb;
      }
    }
  }
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 13.5px 0 15px;
  box-sizing: border-box;
  width: 100%;
}
</style>
