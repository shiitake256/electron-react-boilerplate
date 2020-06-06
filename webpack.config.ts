import * as path from 'path';
import * as webpack from 'webpack';
import CopyPlugin from "copy-webpack-plugin";
const commonConfig: webpack.Configuration = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

const mainConfig: webpack.Configuration = {
    ...commonConfig,
    entry: './src/main/index.ts',
    output: {
        path: path.resolve(__dirname, '.webpack/main'),
        filename: 'bundle.js'
    },
    target: "electron-main",
    plugins: [
        new CopyPlugin([
            {
                from: 'src/main/**',
                transformPath(targetPath, absolutePath) {
                    return path.relative('src/main', targetPath);
                },
                ignore: ['*.js', '*.ts', '*.tsx',],
            },
        ]),
    ],
    // Workaround for the problem that the value of the variable "__dir" becomes "/" in the main process.
    node: false
};

const rendererConfig: webpack.Configuration = {
    ...commonConfig,
    entry: './src/renderer/index.tsx',
    output: {
        path: path.resolve(__dirname, '.webpack/renderer'),
        filename: 'bundle.js'
    },
    target: "electron-renderer",
    plugins: [
        new CopyPlugin([
            {
                from: 'src/renderer/**',
                transformPath(targetPath, absolutePath) {
                    return path.relative('src/renderer', targetPath);
                },
                ignore: ['*.js', '*.ts', '*.tsx',],
            },
        ]),
    ],
};

export default [mainConfig, rendererConfig];