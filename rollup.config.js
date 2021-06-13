import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";

export default {
    input: "./packages/index.ts",
    output: {
        file: "./react-rxjs-form-dist/index.js",
        format: "es",
    },
    plugins: [
        typescript(),
        copy({
            targets: [{ src: "./README.md", dest: "./react-rxjs-form-dist" },{ src: "./packages/package.json", dest: "./react-rxjs-form-dist" }],
        }),
    ],
};
