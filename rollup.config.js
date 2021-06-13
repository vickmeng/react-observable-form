import typescript from "rollup-plugin-typescript2";
import generatePackageJson from "rollup-plugin-generate-package-json";
import copy from "rollup-plugin-copy";

export default {
    input: "./packages/index.ts",
    output: {
        file: "./react-rxjs-form-dist/index.js",
        format: "es",
    },
    plugins: [
        typescript(),
        generatePackageJson({
            inputFolder: "./packages",
            outputFolder: "./react-rx-form-dist",
        }),
        copy({
            targets: [{ src: "./README.md", dest: "./react-rx-form-dist" }],
        }),
    ],
};
