const { createMacro } = require('babel-plugin-macros')
const createNumericMacro = require('create-numeric-js-macro')

module.exports = createNumericMacro({
  libraryName: 'decimal.js.macro',
  libraryTarget: 'decimal.js',
  identifierName: 'Decimal',
  methods: {
    '+': 'add',
    '-': 'sub',
    '*': 'mul',
    '/': 'div',
    '**': 'pow',
    '%': 'mod',
    '-@': 'neg',
  }
})
