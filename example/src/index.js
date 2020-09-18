import decimal from 'decimal.js.macro'

const a = decimal(1)
const b = decimal(a - 3 * 4 / 5)
const c = decimal(a - 3 + 4 - 5)
const d = decimal(3 ** 2 ** 3)

console.log('const a = decimal(1) // =>', a.toString())
console.log('const b = decimal(a - 3 * 4 / 5) // =>', b.toString())
console.log('const c = decimal(a - 3 + 4 - 5) // =>', c.toString())
console.log('const d = decimal(3 ** 2 ** 3) // =>', d.toString())
