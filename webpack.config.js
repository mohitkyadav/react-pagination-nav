var path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/ReactPaginationNav.js',
  output: {
    path: path.resolve('lib'),
    filename: 'ReactPaginationNav.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      },
    ]
  }
}
