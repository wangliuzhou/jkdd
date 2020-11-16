<template>
  <div class="card-list">
    <Swipe style="height:100%" :show-indicators="false">
      <SwipeItem v-for="(item, index) in cardList" :key="index">
        <div class="member-card">
          <div
            v-if="!item.memberCardBg || item.memberCardBg === 0"
            class="member-card-bg-color"
            :style="{ background: item.memberCardBgValue || '#373d41' }"
          ></div>
          <van-image
            v-if="item.memberCardBg === 1"
            :src="$ali(item.memberCardBgValue, 375)"
            class="member-card-bg-img"
            fit="cover"
          />
          <template v-if="item.memberLevelName">
            <!-- 如果没领卡 -->
            <div v-if="!item.isMemberCardOption" class="card-header">
              <div class="label">还差一步，成为会员</div>
              <div class="join-member" @click="handleJoin(item)">
                {{
                  item.userGrowthValue >= item.memberLevelScore
                    ? "立即领卡"
                    : "获取更多成长值"
                }}
              </div>
            </div>
            <!-- 如果已经领卡 -->
            <div v-if="item.isMemberCardOption" class="card-header">
              <div class="label" :style="`font-size:${px2rem(22)}`">
                {{ item.memberLevelName }}
              </div>
              <IconFont
                type="iconhuiyuanma"
                :fontStyle="`font-size:${px2rem(22)}; color:white`"
              />
            </div>
            <div class="card-main">
              <div class="growth-value">
                <span class="value">{{ item.userGrowthValue }}</span>
                <span class="label">成长值</span>
              </div>
              <Progress
                :total="item.nextMemberLevelScore"
                :current="item.userGrowthValue"
                :isFull="
                  item.nextStatus === 0 &&
                    item.userGrowthValue >= item.memberLevelScore
                "
              />
              <!-- 如果没领卡 -->
              <template v-if="!item.isMemberCardOption">
                <!-- 如果达到门槛 -->
                <div
                  v-if="item.userGrowthValue >= item.memberLevelScore"
                  class="describe"
                >
                  领卡即可成为{{ item.memberLevelName }}
                </div>
                <!-- 如果没达到门槛的 -->
                <div
                  v-if="item.userGrowthValue < item.memberLevelScore"
                  class="describe"
                >
                  再获得{{
                    item.memberLevelScore - item.userGrowthValue
                  }}成长值{{ cardList[0].memberLevelScore ? "升级" : "成为"
                  }}{{ item.memberLevelName }}
                </div>
              </template>
              <!-- 如果领过卡 -->
              <template v-if="item.isMemberCardOption">
                <!-- 如果有下级 -->
                <div v-if="item.nextStatus === 1" class="describe">
                  再获得{{
                    item.nextMemberLevelScore - item.userGrowthValue
                  }}成长值升级为{{ item.nextMemberLevelName }}
                </div>
                <!-- 如果没下级 -->
                <div v-if="item.nextStatus === 0" class="describe">
                  当前已是最高等级
                </div>
              </template>
            </div>
          </template>
        </div>
      </SwipeItem>
    </Swipe>
  </div>
</template>
<script>
import Progress from "./Progress";
import IconFont from "@/components/IconFont";
import { Swipe, SwipeItem } from "vant";
import { px2rem } from "@/utils/index";
export default {
  components: { Progress, IconFont, Swipe, SwipeItem },
  props: {
    cardList: {
      type: Array,
      default: () => [{}]
    }
  },
  data() {
    return {
      ossDomain: ""
    };
  },
  computed: {},
  methods: {
    handleJoin(e) {
      this.$emit("goJoinMember", e);
    }
  }
};
</script>
<style lang="less" scoped>
.card-list {
  width: 100%;
  height: 162px;
}

.member-card {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 162px;
  box-sizing: border-box;
  padding: 18px 12px 15px 12px;
  border-radius: 6px;
  overflow: hidden;
  margin: 0 5px;

  .member-card-bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .member-card-bg-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .card-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .label {
      height: 29px;
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 29px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }

    .join-member {
      height: 24px;
      background: #ffffff;
      border-radius: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ff6a00;
      line-height: 24px;
      text-align: center;
      padding: 0 9px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }
  }

  .card-main {
    margin-top: 17px;
    flex: 1;
    width: 100%;

    .growth-value {
      height: 42px;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 42px;
      letter-spacing: 1px;
      margin-bottom: 8px;

      .label {
        font-size: 15px;
        margin-left: 7px;
      }

      .value {
      }
    }

    .describe {
      margin-top: 11px;
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 18px;
    }
  }
}
</style>
