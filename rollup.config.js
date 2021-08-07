import typescript from "rollup-plugin-typescript2";

export default {
  input: "./packages/index.ts",
  output: {
    file: "./packages/dist/index.js",
    format: "es",
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
  ],
};
