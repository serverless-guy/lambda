import transpile from "rollup-plugin-typescript2"
import { terser } from "rollup-plugin-terser"
import alias from "@rollup/plugin-alias"

const base = {
  plugins: [
    transpile(),
    alias({
      entries: {
        "@lambda": "./src"
      }
    }),
    terser({
      output: {
        comments: false
      }
    })
  ]
};

export default [
  Object.assign(
    {},
    base,
    {
      input: "src/wrapper.ts",
      output: {
        format: "cjs",
        file: "dist/index.js"
      }
    }
  )
];
