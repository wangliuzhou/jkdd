module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    // config.resolve.extensions = [".js", ".vue", ".json"];
    config.externals = {
      wx: "wx"
    };
  }
  // chainWebpack: config => {
  //   config.module
  //     .rule("less")
  //     .oneOf("vue")
  //     .use("px2rem-loader")
  //     .loader("px2rem-loader")
  //     .before("postcss-loader")
  //     .options({ remUni: 75, remPrecision: 8 })
  //     .end();
  // }
};
