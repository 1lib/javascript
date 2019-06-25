// uglify handles only es5 code, so this also acts as smoke test against shipping es2015+ syntax
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

const year = new Date().getFullYear()
const banner = `
  /**
   *    ______________________________ ________________                                         _____        _____
   *    __  ____ \_<  /__  /__(_)__  /_______/_/_____(_)_____ ___   _______ _______________________(_)_________  /_
   *    _  / __ \`/_  /__  /__  /__  __ \___/_/ _____  /_  __ \`/_ | / /  __ \`/_  ___/  ___/_  ___/_  /___  __ \  __/
   *    / / /_/ /_  / _  / _  / _  /_/ /_/_/   ____  / / /_/ /__ |/ // /_/ /_(__  )/ /__ _  /   _  / __  /_/ / /_
   *    \ \__,_/ /_/  /_/  /_/  /_.___//_/     ___  /  \__,_/ _____/ \__,_/ /____/ \___/ /_/    /_/  _  .___/\__/
   *     \____/                                /___/                                                 /_/
   *
   *    release:    https://github.com/1lib/javascript/releases/tag/v${pkg.version}
   *    copyright:  (c) ${year > 2019 ? `2019-${year}` : '2019'} GPL3
   */
`

const config = {
  input: 'compile/source/index.js',
  output: {
    format: 'umd',
    file: 'build/main.js',
    name: '1lib',
    exports: 'named',
    banner: banner
  },
  plugins: [resolve()]
}

if (process.env.NODE_ENV === 'production') {
  config.output.file = `build/1lib-v${pkg.version}.min.js`
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
      warnings: false
    })
  )
}

export default config
