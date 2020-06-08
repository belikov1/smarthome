module.exports = {
  assetsDir: "./public",
  pluginOptions: {
    quasar: {
      rtlSupport: true,
      treeShake: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "./src/styles/vars.scss";
          @import "./src/styles/mixins.scss";
        `
      }
    }
  },
  transpileDependencies: [/[\\\/]node_modules[\\\/]quasar[\\\/]/]
};
