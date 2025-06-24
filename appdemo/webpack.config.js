const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
  resolve: {
    alias: { vue$: 'vue/dist/vue.esm.js' },
    extensions: ['.js', '.vue'],
  },
  plugins: [new VueLoaderPlugin()],
}
