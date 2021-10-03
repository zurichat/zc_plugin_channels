const { mergeWithRules } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "zuri",
    projectName: "zuri-plugin-channels",
    webpackConfigEnv,
    argv,
  });

  return mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: "replace",
      },
    },
  })(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    // devServer: {
    //   historyApiFallback: true,
      // allowedHosts: ['*'],
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      // }
    // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          require.resolve("style-loader", {
            paths: [require.resolve("webpack-config-single-spa")],
          }),
          require.resolve("css-loader", {
            paths: [require.resolve("webpack-config-single-spa")],
          }),
          "postcss-loader",
        ],
      },
    ],
    },
});
};
