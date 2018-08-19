import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import helpers from './helpers'

// console.log(helpers.rootPath('./src'))

const rootPath = path.resolve(__dirname, '..');
const srcPath = path.join(rootPath, 'src');
const distPath = path.join(rootPath, 'dist');
const mainTs = path.join(srcPath, 'main.ts');
const polyfillsTs = path.join(srcPath, 'polyfills.ts');
const vendorTs = path.join(srcPath, 'vendor.ts');
const nodeModulesPath = path.join(rootPath, 'node_modules')
const mainTemplatePath = path.join(srcPath, 'main.ejs')

const config: webpack.Configuration = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: {
    polyfills: [polyfillsTs],
    vendor: [vendorTs],
    main: [mainTs]
  },
  output: {
    path: helpers.rootPath('./dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.join(rootPath, 'tsconfig.json')
            }
          }
        ]
      },
      {
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: { system: true }
      },
      {
        test: /\.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader'
            }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader'
            },
            {
                loader: 'sass-loader'
            }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name]--[folder].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@src': srcPath
    },
    extensions: ['.ts', '.js', '.css']
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /@angular(\\|\/)core(\\|\/)(@angular|fesm5|esm5)/,
      helpers.rootPath('./src'),
      {} // a map of your routes
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: mainTemplatePath,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      nodeModules: process.env.NODE_ENV !== 'production' ? nodeModulesPath : false
    })
  ]
}

export default config
