<template>
  <div class="cart-page">
    <div class="not-login-container" v-if="!isLogin">
      <span class="not-login-tips">
        看不到购物车内容？
        <div class="login-btn" @click="goLogin">去登录</div>
      </span>
    </div>
    <div wx:else>
      <div
        class="cart-empty-box"
        v-if="invalidList.length + notInvalidList.length === 0 && !loading"
      >
        <img class="cart-empty-img" src="~@/assets/images/cart-empty.png" />
        <div>暂未添加商品哦～</div>
      </div>

      <div class="shopping-card-container" v-else>
        <div class="list">
          <div
            v-for="(item, index) in notInvalidList"
            :key="item.cartId"
            class="item"
          >
            <van-swipe-cell class="van-swipe-cell">
              <div class="item-content">
                <div class="item-checkbox-wrap">
                  <van-checkbox
                    @click="onCheckboxChange(index)"
                    icon-size="18"
                    checked-color="#FF6A00"
                    v-model="item.checked"
                  />
                </div>
                <div class="item-image">
                  <van-image
                    :src="$ali(item.pic, 80)"
                    alt="商品图片"
                    fit="cover"
                    class="van-image"
                    @click="goGoodsDetail(item.dealerProductOutId)"
                  />
                </div>
                <div
                  class="item-goods-detail"
                  @click="goGoodsDetail(item.dealerProductOutId)"
                >
                  <div class="goods-name">{{ item.name }}</div>
                  <div class="attr-and-conut">
                    <div class="goods-attr-value">{{ item.attrValue }}</div>
                    <div class="goods-stock" v-if="item.stock < item.count">
                      仅剩{{ item.stock }}件
                    </div>
                    <div
                      class="goods-stock"
                      v-if="item.stock < 10 && item.stock >= item.count"
                    >
                      库存紧张
                    </div>
                  </div>

                  <div class="detail-bottom">
                    <div class="goods-price">¥{{ item.price * 1 }}</div>
                    <div class="item-right">
                      <div
                        @click.stop="decrease(index, item)"
                        :class="[
                          'btn-public',
                          { 'one-decrease-btn': item.count === 1 }
                        ]"
                      >
                        -
                      </div>
                      <div class="count">{{ item.count }}</div>
                      <div
                        class="btn-public"
                        @click.stop="increase(index, item)"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <template #right>
                <div
                  @click="handleDelCratItem(item)"
                  class="van-swipe-delete-icon"
                  style="padding-left:20px"
                >
                  <IconFont type="iconshanchu" fontStyle="font-size:24px" />
                </div>
              </template>
            </van-swipe-cell>
          </div>
        </div>

        <div class="card" v-if="invalidList.length">
          <div class="invalid-top">
            <div class="invalid-goods-count">
              失效商品{{ invalidList.length }}件
            </div>
            <div class="invalid-clear-btn" @click="handleRemoveInvalidGoods">
              清空失效商品
            </div>
          </div>
          <div class="list invalid-list">
            <div v-for="item in invalidList" :key="item.cartId">
              <van-swipe-cell class="van-swipe-cell">
                <div class="item invalid-item">
                  <div class="item-image">
                    <van-image
                      :src="$ali(item.pic, 80)"
                      alt="商品图片"
                      fit="cover"
                      class="van-image"
                    />
                  </div>
                  <div class="item-goods-detail">
                    <div class="goods-name invalid">{{ item.name }}</div>
                    <div class="attr-and-conut">
                      <div class="goods-attr-value invalid">
                        {{ item.attrValue }}
                      </div>
                    </div>
                    <div class="detail-bottom invalid">{{ item.result }}</div>
                  </div>
                </div>

                <template #right>
                  <div
                    @click="handleDelCratItem(item)"
                    class="van-swipe-delete-icon invalid"
                  >
                    删除
                  </div>
                </template>
              </van-swipe-cell>
            </div>
          </div>
        </div>
        <div class="bottom-total">
          <div class="bottom-total-checkbox-wrap">
            <van-checkbox
              icon-size="18"
              :value="getToTalGoodsChecked"
              checked-color="#FF6A00"
              @click="onTotalChange"
              v-if="notInvalidList.length"
              >全选</van-checkbox
            >
          </div>
          <div class="bottom-total-right">
            <div class="total-price-wrap">
              <div class="total-price-text">
                <div>合计:</div>
                <div class="total-price-number">￥{{ getTotalPrice }}</div>
              </div>
              <div class="is-free-post" v-if="false">已免运费</div>
            </div>
            <div
              :class="['go-buy', { 'go-buy-active': choosedNumber > 0 }]"
              @click="handleGoOrderSettle"
            >
              去结算({{ choosedNumber }})
            </div>
          </div>
        </div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Cfg from "@/config/index";
import Tabbar from "@/components/Tabbar";
import account, { login } from "@/utils/account";
import { Toast } from "vant";
import { del, batchDelete, add, batchAdd, checkUp } from "@/utils/cart";
import { mapState, mapActions } from "vuex";

var timer;
export default {
  components: {
    Tabbar
  },
  data() {
    return {
      invalidList: [],
      notInvalidList: []
    };
  },
  computed: {
    ...mapState({
      loading: state => state.global.loading
    }),
    isLogin() {
      return account.isLogin;
    },
    // 获取选中商品个数
    choosedNumber() {
      const { notInvalidList } = this;
      return notInvalidList.filter(item => item.checked === true).length;
    },
    // 获取选中商品总价
    getTotalPrice() {
      const { notInvalidList } = this;
      return (
        notInvalidList
          .filter(item => item.checked)
          .reduce((pre, next) => pre + next.price * next.count, 0)
          .toFixed(2) * 1
      );
    },
    // 是否全部选中
    getToTalGoodsChecked() {
      const { notInvalidList } = this;
      return notInvalidList.every(item => item.checked);
    }
  },
  created() {
    this.getCartList();
  },
  mounted() {},
  methods: {
    ...mapActions({
      setLoading: "global/setLoading"
    }),
    goLogin() {
      if (!this.isLogin) {
        login();
      }
    },
    formatData(data) {
      let unCheckedIdMaps = localStorage.getItem("cartUnCheckedIdMaps");
      if (!unCheckedIdMaps) {
        localStorage.setItem("cartUnCheckedIdMaps", JSON.stringify({}));
      }
      const unCheckedIds = Object.keys(
        JSON.parse(unCheckedIdMaps || JSON.stringify({}))
      );
      const dataIds = data.map(item => item.singleProductOuterId);
      checkUp(dataIds);

      data.forEach(item => {
        //商品是否下架/删除
        const {
          isDelProduct,
          onsalestatus,
          releaseStatus,
          isDel,
          stock
        } = item;
        const isInvalid =
          isDelProduct === 1 ||
          onsalestatus === 0 ||
          releaseStatus === 0 ||
          releaseStatus === 2 ||
          isDel === 1 ||
          stock === 0;

        if (isInvalid) {
          item.disabled = true;
        } else {
          item.checked = !unCheckedIds.includes(item.singleProductOuterId);
        }
      });
      // 获取未失效列表
      const invalidList = data.filter(i => i.disabled);
      invalidList.forEach(item => {
        const isDelProductCh = item.isDelProduct === 1 ? "商品已被删除" : "";
        const statusCh = item.onsalestatus === 0 ? "商品已下架" : "";
        const isDelCh = item.isDel !== 1 ? "" : "本销售渠道暂不支持购买";
        const noStock = item.stock === 0 ? "商品已售罄" : "";
        const releaseStatusCh =
          item.releaseStatus === 0 || item.releaseStatus === 2
            ? "商品未发布"
            : "";
        item.result =
          isDelProductCh ||
          statusCh ||
          releaseStatusCh ||
          noStock ||
          isDelCh ||
          "";
      });

      // 获取失效列表，给失效列表加上失效原因
      const notInvalidList = data.filter(i => !i.disabled);
      return { invalidList, notInvalidList };
    },
    /**
     * 初始化加载
     */
    getCartList() {
      const storeOutId = Cfg.mainStoreId;
      this.setLoading(true);
      this.$fetchGet("/order/mobile/tenantCart/list", { storeOutId })
        .then(({ data }) => {
          const { invalidList, notInvalidList } = this.formatData(data);
          // console.log(invalidList, notInvalidList);
          this.invalidList = invalidList;
          this.notInvalidList = notInvalidList;
        })
        .catch(() => {})
        .then(() => {
          this.setLoading(false);
        });
    },
    decrease(index, item) {
      const { notInvalidList } = this;
      const { cartId, disabled } = item;
      if (notInvalidList[index].count > 1 && !disabled) {
        notInvalidList[index].count -= 1;
        this.debounce(
          this.onCountChange,
          500,
          cartId,
          notInvalidList[index].count
        )();
        this.notInvalidList = notInvalidList;
      }
    },
    increase(index, item) {
      const { notInvalidList } = this;
      const { cartId, disabled } = item;
      if (!disabled) {
        notInvalidList[index].count += 1;
        this.debounce(
          this.onCountChange,
          500,
          cartId,
          notInvalidList[index].count
        )();
        this.notInvalidList = notInvalidList;
      }
    },

    debounce(fn, wait = 500, cartId, count) {
      return function() {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn(cartId, count);
        }, wait);
      };
    },
    /**
     * count的新增和减少
     * @param {*} cartId
     * @param {*} count  传给后台的数量
     */
    onCountChange(cartId, count) {
      this.$fetchPost("/order/mobile/tenantCart/update", {
        cartId,
        count
      }).then(() => {});
    },
    // 点击商品的checkbox
    onCheckboxChange(index) {
      const item = this.notInvalidList[index];
      item.checked
        ? del(item.singleProductOuterId)
        : add(item.singleProductOuterId);
    },
    // 点击全选按钮
    onTotalChange() {
      const { notInvalidList } = this;
      const everyChecked = notInvalidList.every(item => item.checked);
      if (everyChecked) {
        notInvalidList.forEach(item => {
          item.checked = false;
        });
        const ids = notInvalidList.map(i => i.singleProductOuterId);
        batchAdd(ids);
      } else {
        notInvalidList.forEach(item => {
          item.checked = true;
        });
        batchDelete();
      }
      this.notInvalidList = notInvalidList;
    },

    /**
     * 删除购物车内的商品
     */
    handleDelCratItem(item) {
      const { cartId, singleProductOuterId } = item;
      const api = "/order/mobile/tenantCart/delete";
      this.$fetchGet(api, { cartId }).then(() => {
        this.getCartList();
        del(singleProductOuterId);
        Toast("删除成功");
      });
    },

    getQuery(choosedList) {
      const skuIds = choosedList.map(i => i.singleProductOuterId).join(",");
      const skuNums = choosedList.map(i => i.count).join(",");
      return `skuIds=${skuIds}&skuNums=${skuNums}&fromCart=true`;
      // "skuIds=3358402154368001, 3383682896480001&skuNums=1,2&fromCart=true";
    },
    //去结算
    handleGoOrderSettle() {
      const { notInvalidList } = this;
      const choosedList = notInvalidList.filter(i => i.checked);
      for (let item of choosedList) {
        if (item.count > item.stock) {
          Toast(`商品${item.name}库存不足`);
          return;
        }
      }
      if (choosedList.length) {
        const skuIds = choosedList.map(i => i.singleProductOuterId).join(",");
        const skuNums = choosedList.map(i => i.count).join(",");
        // const query = this.getQuery(choosedList);
        this.$push({
          path: `/pay/orderSettle`,
          query: {
            skuIds,
            skuNums,
            fromCart: true
          }
        });
      }
    },
    loginCallback() {
      this.getCartList();
    },
    // 跳转商品详情
    goGoodsDetail(goodsId) {
      this.$push(`/goodsDetail/${goodsId}`);
    },
    // 清空失效商品
    handleRemoveInvalidGoods() {
      this.$fetchGet("/order/mobile/tenantCart/clearInvalid").then(() => {
        this.getCartList();
        Toast("失效商品清除成功");
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
