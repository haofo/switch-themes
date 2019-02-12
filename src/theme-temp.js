/**
 * 产出 自定义 css 主题模板
 */
const stylus = require('stylus')
const path = require('path')
const fs = require('fs')

const p = require('@babel/parser')
const b = require('@babel/types')
// const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const postcss = require('postcss')
const pxtorem = require('postcss-pxtorem')
const prefixer = require('postcss-prefix-selector')
const autoprefixer = require('autoprefixer')
const setting = require('../postcss.config').plugins['postcss-pxtorem']

const CLIEngine = require('eslint').CLIEngine

const resolve = function (file) {
  return path.join(__dirname, file)
}
const mainStylusPath = resolve('./assets/css/main.styl')
const mainFileJsPath = resolve('./lib/theme/main-data.js')
const variableStyl = resolve('./assets/css/variables.styl')
const preThemesDir = resolve('./assets/css/pre-themes')
const outputPreThemes = resolve('./lib/theme/pre-themes')
const exportPreThemes = resolve('./lib/theme/pre-themes/index.js')

// 产出 *覆盖* 当前主题的 `css`模板
function generateThemeTemplate () {
  let variable = getVariableList()
  let css = compileMainStylus(mainStylusPath)
  injectResult(css, variable)
}

// 编译 `.styl` 文件
function compileMainStylus (filePath) {
  const mainStylus = fs.readFileSync(filePath, 'utf8')
  let content = ''
  stylus(mainStylus)
    .render(function (err, css) {
      if (err) throw err
      content = css
    })
  return content
}

// 将产生的 `css` 输入到指定js文件中
function injectResult (css, variable) {
  const mainFileJs = fs.readFileSync(mainFileJsPath, 'utf8')

  let ast = p.parse(mainFileJs, { sourceType: 'module' })
  let body = ast.program.body
  body[0].declaration.declarations[0].init.elements = []
  let arrElements = body[0].declaration.declarations[0].init.elements
  let templateEle = body[1].declaration.declarations[0].init.quasis[0].value
  if (css) {
    templateEle.raw = css
    templateEle.cooked = css
  }

  for (let item of variable) {
    let objExpress = b.objectPattern([
      b.objectProperty(b.identifier('name'), b.stringLiteral(item.name)),
      b.objectProperty(b.identifier('value'), b.stringLiteral(item.value))
    ])
    arrElements.push(objExpress)
  }

  const output = generate(ast, { quote: 'single' }).code
  let format = formatText(output)
  fs.writeFileSync(mainFileJsPath, format.results[0].output)
}

// 获取 `styl` 变量列表
function getVariableList (filePath = variableStyl) {
  let parser = new stylus.Parser(fs.readFileSync(filePath, 'utf8'))
  let cssAst = parser.parse()
  let list = []
  for (let ele of cssAst.nodes) {
    if (ele.val && ele.constructor.name === 'Ident') {
      let compiler = new stylus.Compiler(ele.val)
      list.push({
        name: ele.name,
        value: compiler.compile()
      })
    }
  }
  return list
}

// 预先生成指定主题
function preBuildThemes () {
  const themes = fs.readdirSync(preThemesDir)
  if (!themes || themes.length < 1) {
    return
  }
  let completePath = themes.map(val => path.join(preThemesDir, val))
  let css = compileMainStylus(mainStylusPath)
  if (!fs.existsSync(outputPreThemes)) {
    fs.mkdirSync(outputPreThemes, { recursive: true })
  }
  completePath.forEach((item, index) => {
    let list = getVariableList(item)
    let content = replaceVariable(list, css)
    let filename = themes[index].split('.')[0]
    postcssText(content, filename).then(text => {
      let exportExpress = b.exportDefaultDeclaration(
        b.templateLiteral([b.templateElement({ raw: text })], [])
      )
      let output = generate(exportExpress).code
      let format = formatText(output).results[0].output
      fs.writeFileSync(path.join(outputPreThemes, `${filename}.js`), format)
      exportTheme(filename)
    })
  })
}

// `export` 对应主题
function exportTheme (name) {
  const str = fs.readFileSync(exportPreThemes, 'utf8')
  let ast = p.parse(str, { sourceType: 'module' })
  let body = ast.program.body
  let isExistTheme = body.find(val => {
    return val.type === 'ImportDeclaration' && val.source.value.includes(name)
  })
  if (!isExistTheme) {
    let exportExpress = body.find(val => val.type === 'ExportDefaultDeclaration')
    exportExpress.declaration.properties.push(
      b.objectPattern([
        b.objectProperty(b.identifier(name), b.identifier(name))
      ])
    )
  }
}

// 手动调用 `eslint` 输出
function formatText (text) {
  let cli = new CLIEngine({
    envs: ['browser', 'node'],
    fix: true,
    useEslintrc: true
  })
  return cli.executeOnText(text)
}

// 替换调 `css` 文件中的变量
function replaceVariable (list, css) {
  if (list) {
    for (let item of list) {
      css = css.replace(new RegExp(`${item.name}`, 'g'), item.value)
    }
  }
  return css
}

// 使用`postcss` 编译 `css`
function postcssText (text, name) {
  return new Promise(resolve => {
    let plugins = [autoprefixer, pxtorem(setting)]
    if (name) {
      plugins.push(prefixer({ prefix: `#${name}` }))
    }
    postcss(plugins)
      .process(text, { from: undefined, to: undefined })
      .then(result => {
        resolve(result.css)
      })
      .catch(err => {
        console.error(err)
      })
  })
}

module.exports = {
  generateThemeTemplate,
  preBuildThemes
}
