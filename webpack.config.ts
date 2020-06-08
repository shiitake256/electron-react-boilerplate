import * as path from "path";
import * as webpack from "webpack";
import CopyPlugin from "copy-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const baseConfig: webpack.Configuration = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=../font/[name].[ext]'
      }
    ],

  },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
};

const mainConfig: webpack.Configuration = {
  ...baseConfig,
  entry: "./src/main/index.ts",
  output: {
    path: path.resolve(__dirname, ".webpack/main"),
    filename: "bundle.js",
  },
  target: "electron-main",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "src/main/**",
          transformPath(targetPath, absolutePath) {
            return path.relative("src/main", targetPath);
          },
          globOptions: {
            ignore: ["*.js", "*.jsx", "*.ts", "*.tsx"],
          },
        },
      ],
    }),

  ],
  // Workaround for the problem that the value of the variable "__dir" becomes "/" in the main process.
  node: false,
};

const rendererConfig: webpack.Configuration = {
  ...baseConfig,
  entry: "./src/renderer/index.tsx",
  output: {
    path: path.resolve(__dirname, ".webpack/renderer"),
    filename: "bundle.js",
  },
  target: "electron-renderer",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "src/renderer/**",
          transformPath(targetPath, absolutePath) {
            return path.relative("src/renderer", targetPath);
          },
          globOptions: {
            ignore: ["*.js", "*.jsx", "*.ts", "*.tsx"],
          },
        },
      ],
    }),
  ],
};

const preloadConfig: webpack.Configuration = {
  ...baseConfig,
  entry: "./src/preload/index.ts",
  output: {
    path: path.resolve(__dirname, ".webpack/preload"),
    filename: "bundle.js",
  },
  target: "electron-preload",
};

export default [mainConfig, rendererConfig, preloadConfig];
