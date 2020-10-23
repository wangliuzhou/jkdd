export const BezierLines = {
  //贝塞尔曲线集合坐标
  //pots：三点，amount：总个数
  bezier: function(pots, amount) {
    var pot;
    var lines;
    var ret = [];
    var points;
    var pointC = pots[2];
    for (var i = 0; i <= amount; i++) {
      points = pots.slice(0);
      lines = [];
      while ((pot = points.shift())) {
        if (points.length) {
          lines.push(pointLine([pot, points[0], pointC], i / amount));
        } else if (lines.length > 1) {
          points = lines;
          lines = [];
        } else {
          break;
        }
      }
      lines[0].left = lines[0].x + "px";
      lines[0].top = lines[0].y + "px";
      ret.push(lines[0]);
    }
    function pointLine(points, rate) {
      var pointA,
        pointB,
        pointC,
        pointDistance,
        xDistance,
        yDistance,
        tan,
        radian,
        tmpPointDistance;
      var ret = [];
      pointA = points[0]; //结束点
      pointB = points[1]; //中间
      pointC = points[2]; //开始
      xDistance = pointB.x - pointA.x;
      yDistance =
        pointC.x < pointA.x ? pointA.y - pointB.y : pointB.y - pointA.y; //开始点是否在结束点左边
      pointDistance = Math.pow(
        Math.pow(xDistance, 2) + Math.pow(yDistance, 2),
        1 / 2
      );
      tan = yDistance / xDistance;
      radian = Math.atan(tan);
      tmpPointDistance = pointDistance * rate;
      ret = {
        x:
          pointC.x < pointA.x
            ? pointA.x - tmpPointDistance * Math.cos(radian)
            : pointA.x + tmpPointDistance * Math.cos(radian), //开始点是否在结束点左边
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      };
      return ret;
    }
    return {
      bezier_points: ret
    };
  }
};
