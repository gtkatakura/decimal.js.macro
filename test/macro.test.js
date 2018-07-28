const pluginTester = require('babel-plugin-tester')
const plugin = require('babel-plugin-macros')

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    `
      import decimal from '../src/macro'

      const a = decimal(1)
      const b = decimal(a)
      const c = decimal(-1)
      const d = decimal(-c)
    `,
    `
      import decimal from '../src/macro'

      const a = decimal(1)
      const c = decimal(b - 3)
      const d = decimal(c * 4)
      const e = decimal(d / 5)
      const f = decimal(e ** 10)
      const g = decimal(f % 2)
    `,
    `
      import decimal from '../src/macro'

      const a = decimal(1)
      const b = decimal(a - 3 * 4 / 5)
      const c = decimal(a - 3 + 4 - 5)
      const d = decimal(1 ** 2 ** 3)
    `,
    `
      import decimal from '../src/macro'

      const a = decimal((1 + 2) * (3 - 4))
      const b = decimal(((1 + 2)))
    `,
    `
      import decimal from '../src/macro'
      import Decimal from 'Decimal'
      import _Decimal from '_Decimal'

      const a = decimal(1)
    `,
  ],
})
