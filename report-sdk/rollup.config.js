import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const env = process.env.NODE_ENV

const config = {
  input: './index.ts',
  external: ['ajax-hook'],
  plugins: [
      typescript({
        "exclude": ["node_modules/**"],
        typescript: require("typescript")
      }),
      babel({
        exclude: 'node_modules/**'
      })
  ],
  output: {
      format: 'umd',
      file: 'libs/changecoder.report.js',
      name: 'WebReportSDK',
      globals: {
        'ajax-hook': 'ah'
      },
      sourcemap: true
  },
}


if (env === 'production') {
  config.plugins.push(terser())
  config.output.file = 'libs/changecoder.report.min.js'
}

export default config