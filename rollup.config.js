// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

const config = [
    {
        input: 'src/main.ts',  // 入口文件
        output: {
            file: './main.js',  // 输出文件
            format: 'iife',  // 立即执行函数格式，适合控制台
            name: 'MRE',  // 全局变量名（可选）
        },
        plugins: [
            nodeResolve({
                browser: true,  // 优先使用浏览器版本的包
            }),
            commonjs(),     // 将CommonJS转为ES模块
            typescript({    // 支持TypeScript
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    declaration: false, // 禁止在此处生成声明文件
                }
            }),
        ]
    },
    // {
    //     input: 'src/main.ts',
    //     output: [{ file: './main.d.ts', format: 'es' }],
    //     plugins: [dts()]
    // }
];

export default config;
