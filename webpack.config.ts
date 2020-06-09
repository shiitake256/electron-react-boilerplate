import * as path from "path";
import * as webpack from "webpack";
import CopyPlugin from "copy-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

enum CONFIGURATION_NAME {
  MAIN = 'main',
  RENDERER = 'renderer',
  PRELOAD = 'preload',
}
let electronProcess: ChildProcessWithoutNullStreams
let emitted: { [key: string]: boolean; } = {};
for(let name of Object.values(CONFIGURATION_NAME)){
  emitted[name] = false
}

let isWatchmode = false
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

  plugins: [
    {
      apply: compiler => {
        compiler.hooks.watchRun.tap('DetectWatchModePlugin', () => isWatchmode = true)
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (params) => {
          emitted[params.compiler.name] = true
          if (
            isWatchmode &&
            Object.values(emitted).every(Boolean)
          ) {
            // Kill started process
            if (electronProcess) {
              console.log('\nKill electron');
              electronProcess.kill("SIGTERM");
            }
            console.log('\nStart electron');
            // Start process
            electronProcess = spawn('yarn', ['run', 'start']);
            electronProcess.stdout.on('data', data => process.stdout.write(data));
            electronProcess.stderr.on('data', data => process.stderr.write(data));
          }
        });
      }
    }
  ],
};

const mainConfig: webpack.Configuration = {
  ...baseConfig,
  name: CONFIGURATION_NAME.MAIN,
  entry: "./src/main/index.ts",
  output: {
    path: path.resolve(__dirname, ".webpack/main"),
    filename: "bundle.js",
  },
  target: "electron-main",
  plugins: [
    ...(baseConfig.plugins || []),
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
  name: CONFIGURATION_NAME.RENDERER,
  entry: "./src/renderer/index.tsx",
  output: {
    path: path.resolve(__dirname, ".webpack/renderer"),
    filename: "bundle.js",
  },
  target: "electron-renderer",
  plugins: [
    ...(baseConfig.plugins || []),
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

// console.log(rendererConfig);

const preloadConfig: webpack.Configuration = {
  ...baseConfig,
  name: CONFIGURATION_NAME.PRELOAD,
  entry: "./src/preload/index.ts",
  output: {
    path: path.resolve(__dirname, ".webpack/preload"),
    filename: "bundle.js",
  },
  target: "electron-preload",
};

export default [mainConfig, rendererConfig, preloadConfig];
