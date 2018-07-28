const { createMacro } = require('babel-plugin-macros')

const includes = (options, value) => options.indexOf(value) !== -1

function macro({ references, state, babel }) {
  const program = state.file.path
  const libraryIdentifier = program.scope.generateUidIdentifier('Decimal')

  references.default.forEach((referencePath) => {
    if (referencePath.parentPath.type === 'CallExpression') {
      asFunction(referencePath.parentPath.get('arguments'), state, babel, libraryIdentifier)
    } else {
      throw new Error('decimal.js.macro can only be called as a function')
    }
  })

  importLibrary({ references, state, babel }, libraryIdentifier)
}

function importLibrary({ references, state, babel }, libraryIdentifier) {
  const { types: t } = babel

  const program = state.file.path

  program.node.body.unshift(t.importDeclaration(
    [t.importSpecifier(libraryIdentifier, libraryIdentifier)],
    t.stringLiteral('decimal.js'),
  ))
}

const createVisitor = (babel, libraryIdentifier) => {
  const { types: t } = babel

  return {
    BinaryExpression(path) {
      path.replaceWith(replaceBinaryExpression(
        babel,
        path.node,
        libraryIdentifier,
      ))
    },
    NumericLiteral(path) {
      const literal = t.stringLiteral(path.node.value.toString())

      path.replaceWith(literal)
    }
  }
}

function asFunction([argumentPath], state, babel, libraryIdentifier) {
  const visitor = createVisitor(babel, libraryIdentifier)

  if (includes(['NumericLiteral', 'Identifier', 'UnaryExpression'], argumentPath.node.type)) {
    argumentPath.parentPath.replaceWith(replaceSimpleExpression(
      babel,
      argumentPath.node,
      libraryIdentifier,
    ))
  } else if (argumentPath.node.type === 'BinaryExpression') {
    argumentPath.parentPath.traverse(visitor)
    argumentPath.parentPath.replaceWith(argumentPath)
  }
}

function replaceBinaryExpression({ types: t, template }, binaryExpression, libraryIdentifier) {
  const replace = template(`
    LIBRARY(LEFT_EXPRESSION).METHOD(RIGHT_EXPRESSION)
  `)

  return replace({
    LIBRARY: libraryIdentifier,
    METHOD: t.identifier(methods[binaryExpression.operator]),
    LEFT_EXPRESSION: binaryExpression.left,
    RIGHT_EXPRESSION: binaryExpression.right,
  })
}

function replaceSimpleExpression({ types: t, template }, expression, libraryIdentifier) {
  const replace = template(`
    LIBRARY(EXPRESSION)
  `)

  return replace({
    LIBRARY: libraryIdentifier,
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
