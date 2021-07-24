import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";

export default {
  input: "./packages/index.ts",
  output: {
    file: "./react-observable-form-dist/index.js",
    format: "es",
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
    copy({
      targets: [
        { src: "./README.md", dest: "./react-observable-form-dist" },
        { src: "./packages/package.json", dest: "./react-observable-form-dist" },
      ],
    }),
  ],
};
