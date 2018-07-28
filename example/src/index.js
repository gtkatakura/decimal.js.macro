import money from '../../src/macro'

const a = money(1)
const b = money(a - 3 * 4 / 5)
const c = money(a - 3 + 4 - 5)
const d = money(3 ** 2 ** 3)

console.log('const a = money(1) // =>', a.toString())
console.log('const b = money(a - 3 * 4 / 5) // =>', b.toString())
console.log('const c = money(a - 3 + 4 - 5) // =>', c.toString())
console.log('const d = money(3 ** 2 ** 3) // =>', d.toString())
