export const getOffsetTop = elm => {
  let top = elm.offsetTop;
  while ((elm = elm.offsetParent)) {
    top += elm.offsetTop;
  }
  return top;
};
