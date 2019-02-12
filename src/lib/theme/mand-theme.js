/**
 * 管理 `mand-mobile` 主题
 */

const postcss = require('postcss')
const pxtorem = require('postcss-pxtorem')
const setting = require('../../../postcss.config').plugins['postcss-pxtorem']
const prefixer = require('postcss-prefix-selector')

function isObject (value) {
  return Object(value) === value
}

function traverseObject (data, handle) {
  const visit = obj => {
    for (let key of Object.keys(obj)) {
      let subData = obj[key]
      if (subData && isObject(subData)) {
        visit(subData)
      } else {
        if (handle(key, subData)) {
          break
        }
      }
    }
  }
  visit(data)
}

function setThemeVariables (path, value) {
  path.reduce((pre, cur, index, arr) => {
    if (value && index === arr.length - 1) {
      pre[cur] = value
    }
    return !index ? cur : pre[cur]
  })
}

function generateCss (source, libCss, themeName) {
  return new Promise((resolve) => {
    let content = libCss
    let temp = JSON.stringify(source.components)
    traverseObject(source.basic, (key, value) => {
      temp = temp.replace(new RegExp(`${key.trim()}`, 'g'), value)
    })
    source.components = JSON.parse(temp)
    traverseObject(source, (key, value) => {
      content = content.replace(new RegExp(`var\\(--${key.trim()}\\)`, 'g'), value)
    })

    let plugins = [pxtorem(setting)]
    if (themeName) {
      plugins.push(prefixer({ prefix: `#${themeName}` }))
    }
    postcss(plugins)
      .process(content, { from: undefined, to: undefined })
      .then(result => {
        resolve(result.css)
      })
  })
}

export {
  setThemeVariables,
  generateCss
}

// setThemeVariables([basic, 'color', 'color-bg-tap'], '#fab')
