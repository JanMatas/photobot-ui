const path = require('path');
var glob = require("glob");

module.exports = {
  entry: {
    app: ["./src/index.js","./src/roslib.js", "./src/chat-ui.js"],
  }
,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
,
     module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    } ,
    devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 5000
}
};
