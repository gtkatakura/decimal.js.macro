const pluginTester = require('babel-plugin-tester')
const plugin = require('babel-plugin-macros')

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    `
      import money from '../src/macro'

      const a = money(1)
      const b = money(a)
      const c = money(-1)
      const d = money(-c)
    `,
    `
      import money from '../src/macro'

      const a = money(1)
      const c = money(b - 3)
      const d = money(c * 4)
      const e = money(d / 5)
      const f = money(e ** 10)
      const g = money(f % 2)
    `,
    `
      import money from '../src/macro'

      const a = money(1)
      const b = money(a - 3 * 4 / 5)
      const c = money(a - 3 + 4 - 5)
      const d = money(1 ** 2 ** 3)
    `,
    `
      import money from '../src/macro'

      const a = money((1 + 2) * (3 - 4))
      const b = money(((1 + 2)))
    `,
    `
      import money from '../src/macro'
      import Decimal from 'Decimal'
      import _Decimal from '_Decimal'

      const a = money(1)
    `,
  ],
})
