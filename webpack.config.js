const MiniCssExtractPlugin = require("mini-css-extract-plugin"), path = require('path'), HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, './src/js/index.js')
  }
  ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 2500,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions:{
                ident: 'postcss',
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              }
            
            },
          }
        ]
      },
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.html$/,
        use: [
          {loader: 'file-loader',
           options: {
            name: '[name].[ext]',

           } 
        }
        ],
        exclude:  path.resolve(__dirname, 'src/template.html')
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title:'webpack app',
    filename:'index.html',
    template: 'src/template.html' 
  }),new MiniCssExtractPlugin({
    filename: "dist.bundle.css"
  }), 
]
}
