import * as webpack from 'webpack'
import {
    mainCommonConfig,
    rendererCommonConfig,
    preloadCommonConfig,
    CONFIGURATION_NAME,
} from './webpack.config.common'
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

let electronProcess: ChildProcessWithoutNullStreams
const emitted: { [key: string]: boolean; } = {};
for (const name of Object.values(CONFIGURATION_NAME)) {
    emitted[name] = false
}

let isWatchmode = false
const additionalDevConfig: webpack.Configuration = {
    mode: "development",
    devtool: "inline-source-map",
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
            },
        },
    ],
}

const mainDevConfig: webpack.Configuration = {
    ...mainCommonConfig,
    ...additionalDevConfig,
}

const rendererDevConfig: webpack.Configuration = {
    ...rendererCommonConfig,
    ...additionalDevConfig,
}

const preloadDevConfig: webpack.Configuration = {
    ...preloadCommonConfig,
    ...additionalDevConfig,
}

export default [
    mainDevConfig,
    rendererDevConfig,
    preloadDevConfig,
]
