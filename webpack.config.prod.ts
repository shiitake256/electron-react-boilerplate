import * as webpack from 'webpack'
import {
    mainCommonConfig,
    rendererCommonConfig,
    preloadCommonConfig,
} from './webpack.config.common'
import path from 'path'

const additionalProdConfig: webpack.Configuration = {
    mode: "production",
}

const mainProdConfig: webpack.Configuration = {
    ...mainCommonConfig,
    ...additionalProdConfig,
    output: {
        path: path.resolve(__dirname, ".webpack.prod/main"),
        filename: "bundle.js",
    },
}

const rendererProdConfig: webpack.Configuration = {
    ...rendererCommonConfig,
    ...additionalProdConfig,
    output: {
        path: path.resolve(__dirname, ".webpack.prod/renderer"),
        filename: "bundle.js",
    },
}

const preloadProdConfig: webpack.Configuration = {
    ...preloadCommonConfig,
    ...additionalProdConfig,
    output: {
        path: path.resolve(__dirname, ".webpack.prod/preload"),
        filename: "bundle.js",
    },
}

export default [
    mainProdConfig,
    rendererProdConfig,
    preloadProdConfig,
]
