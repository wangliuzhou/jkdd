// 删除缓存;
export const del = id => {
  const cartUnCheckedIdMaps =
    JSON.parse(localStorage.getItem("cartUnCheckedIdMaps")) || {};
  delete cartUnCheckedIdMaps[id];
  localStorage.setItem(
    "cartUnCheckedIdMaps",
    JSON.stringify(cartUnCheckedIdMaps)
  );
};
// 批量删除;
export const batchDelete = () => {
  localStorage.setItem("cartUnCheckedIdMaps", JSON.stringify({}));
};

// 添加缓存;
export const add = id => {
  const cartUnCheckedIdMaps =
    JSON.parse(localStorage.getItem("cartUnCheckedIdMaps")) || {};
  cartUnCheckedIdMaps[id] = true;
  localStorage.setItem(
    "cartUnCheckedIdMaps",
    JSON.stringify(cartUnCheckedIdMaps)
  );
};

// 批量添加缓存;
export const batchAdd = (ids = []) => {
  const cartUnCheckedIdMaps = {};
  ids.forEach(id => {
    cartUnCheckedIdMaps[id] = true;
  });
  localStorage.setItem(
    "cartUnCheckedIdMaps",
    JSON.stringify(cartUnCheckedIdMaps)
  );
};

// 剔除无用的
export const checkUp = (ids = []) => {
  const cartUnCheckedIdMaps =
    JSON.parse(localStorage.getItem("cartUnCheckedIdMaps")) || {};
  const cartUnCheckedIds = Object.keys(cartUnCheckedIdMaps);
  cartUnCheckedIds.forEach(unCheckedId => {
    const isIncludes = ids.includes(unCheckedId);
    if (!isIncludes) delete cartUnCheckedIdMaps[unCheckedId];
  });

  localStorage.setItem(
    "cartUnCheckedIdMaps",
    JSON.stringify(cartUnCheckedIdMaps)
  );
};
