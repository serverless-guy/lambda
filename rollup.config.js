import typescript from "rollup-plugin-typescript2"
import { terser } from "rollup-plugin-terser"

const base = {
  plugins: [
    typescript(),
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
