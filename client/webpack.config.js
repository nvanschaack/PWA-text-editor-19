// Webpack is a module bundler for JavaScript apps

//This plugin simplifies the creation of HTML files to serve your bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');
//This plugin generates a web app manifest file for your PWA
const WebpackPwaManifest = require('webpack-pwa-manifest');
//this is a node.js core module for handling file paths
const path = require('path');
//This is from the workbox webpack plugin, used for injecting a service worker into the build
const { InjectManifest } = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.
//MAINLY BOILERPLATE /BASIC PWA APP
module.exports = () => {
  return {
    mode: 'development',
    //entry specifies the entry points for the application, where webpack will start building the bundle
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    //output defines where the bundled filed will be placed (dist folder)
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    //this is an array of plugins used by webpack. 
    plugins: [
      // Webpack plugin that generates html files. Configures the HtmlWebpackPlugin to use a template HTML file and set the title to Text Editor
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor'
      }),
      // Configures the InjectManifest plugin to use a custon service worker file (swSrc) and specify the destination for the service worker file
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      //Configures the WebpackPwaManifest plugin with various settings for the PWA manifest file. A web app manifest allows developers to control how the app appears and behaves when installed on a users device.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'TE',
        description: 'Houses your personal text!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      // TODO: Add CSS loaders and babel to webpack.
      rules: [
        //BOILERPLATE
        //configures rules for processing different file types. Particularly, it includes rules for handling CSS files and JS files using Babel for transpiling ES6 code.
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
