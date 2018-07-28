const { createMacro } = require('babel-plugin-macros')

const includes = (options, value) => options.indexOf(value) !== -1

function macro({ references, state, babel }) {
  references.default.forEach((referencePath) => {
    if (referencePath.parentPath.type === 'CallExpression') {
      asFunction(referencePath.parentPath.get('arguments'), state, babel)
    } else {
      throw new Error('decimal.js.macro can only be called as a function')
    }
  });
}

const createVisitor = (babel) => {
  const { types: t } = babel

  return {
    BinaryExpression(path) {
      path.replaceWith(replaceBinaryExpression(
        babel,
        path.node,
      ))
    },
    NumericLiteral(path) {
      const literal = t.stringLiteral(path.node.value.toString())

      path.replaceWith(literal)
    }
  }
}

function asFunction([argumentPath], state, babel) {
  const visitor = createVisitor(babel)

  if (includes(['NumericLiteral', 'Identifier', 'UnaryExpression'], argumentPath.node.type)) {
    argumentPath.parentPath.replaceWith(replaceSimpleExpression(
      babel,
      argumentPath.node,
    ))
  } else if (argumentPath.node.type === 'BinaryExpression') {
    argumentPath.parentPath.traverse(visitor)
    argumentPath.parentPath.replaceWith(argumentPath)
  }
}

function replaceBinaryExpression({ types: t, template }, binaryExpression) {
  const replace = template(`
    LIBRARY(LEFT_EXPRESSION).METHOD(RIGHT_EXPRESSION)
  `)

  return replace({
    LIBRARY: t.identifier('money'),
    METHOD: t.identifier(methods[binaryExpression.operator]),
    LEFT_EXPRESSION: binaryExpression.left,
    RIGHT_EXPRESSION: binaryExpression.right,
  })
}

function replaceSimpleExpression({ types: t, template }, expression) {
  const replace = template(`
    LIBRARY(EXPRESSION)
  `)

  return replace({
    LIBRARY: t.identifier('money'),
    EXPRESSION: expression,
  })
}

const methods = {
  '+': 'add',
  '-': 'sub',
  '*': 'mul',
  '/': 'div',
  '**': 'pow',
  '%': 'mod',
}

module.exports = createMacro(macro)
