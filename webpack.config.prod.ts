import * as webpack from 'webpack'
import {
    mainCommonConfig,
    rendererCommonConfig,
    preloadCommonConfig,
} from './webpack.config.common'

const additionalProdConfig: webpack.Configuration = {
  mode: "production",
}

const mainProdConfig: webpack.Configuration = {
  ...mainCommonConfig,
  ...additionalProdConfig,
}

const rendererProdConfig: webpack.Configuration = {
  ...rendererCommonConfig,
  ...additionalProdConfig,
}

const preloadProdConfig: webpack.Configuration = {
  ...preloadCommonConfig,
  ...additionalProdConfig,
}

export default [
  mainProdConfig,
  rendererProdConfig,
  preloadProdConfig,
]
