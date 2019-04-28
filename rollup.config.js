import alias from "rollup-plugin-alias"
import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'

const base = {
  plugins: [
    typescript(),
    alias({
      "@lambda": "./src",
      "@/fakes": "./test/fakes"
    }),
    uglify()
  ]
}

export default [
  Object.assign(
    {},
    base,
    {
      input: "src/wrapper.ts",
      output: {
        format: 'cjs',
        file: "dist/index.js"
      }
    }
  )
]
