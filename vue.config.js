const path = require("path");

const vueDev = "./dev";

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias: {
        "#": path.resolve(__dirname, vueDev),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },
};
