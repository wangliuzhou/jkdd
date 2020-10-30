import { SysPage } from "@/constant/index";
import router from "@/utils/router";

export default function jumpLink(link) {
  if (!link || link.linkType == null) return;
  let { linkType, linkId, linkJump, productIds } = link;
  switch (linkType) {
    case 0:
      // 0: '功能页面',
      linkJump = SysPage[linkId];
      if (!linkJump) return;
      router.push({
        path: linkJump
      });
      break;
    case 1:
      // 1: '创作页面',
      router.push(`/microPage/${linkId}`);
      break;
    case 2:
      //商品组
      if (linkId) {
        router.push(`/goodsGroup?productGroupId=${linkId}`);
      } else {
        router.push(`/goodsGroup?productIds=${productIds.join(",")}`);
      }
      break;
    case 3:
      //前台类目
      router.push(`/goodsGroup?frontCateOutId=${linkId}`);
      break;
    case 4:
      // 4: '商品详情',
      router.push(`/goodsDetail/${linkId}`);
      break;
    case 5:
      //自定义链接
      break;
  }
}
