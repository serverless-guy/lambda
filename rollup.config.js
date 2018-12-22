import alias from "rollup-plugin-alias"
import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'

const base = {
  plugins: [
    typescript(),
    alias({
      "@lambda": "./src",
    }),
    uglify()
  ]
}

export default [
  {
    ...base,
    input: "src/index.ts",
    output: {
      format: 'cjs',
      file: "dist/index.js"
    }
  }
]
