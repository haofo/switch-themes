import Vue from 'vue'
import Vuex from 'vuex'

import libCss from './lib/theme/mand-css'
import { setThemeVariables, generateCss } from './lib/theme/mand-theme'
import preThemes from './lib/theme/pre-themes'

const themeData = require('./lib/theme/data').default
const { basic } = themeData

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    libCss,
    themeData,
    basic,
    currentTheme: '',
    currentThemeName: 'default'
  },
  mutations: {
    updateTheme (state, themeInfo) {
      let path = [state.basic, ...themeInfo.path]
      setThemeVariables(path, themeInfo.value)
    },
    resetTheme (state) {
      state.libCss = libCss
      state.currentTheme = ''
    },
    setTheme (state, { themeName, css }) {
      let style = getStyleEle()
      if (css) {
        state.currentTheme = css
      }
      style.textContent = state.currentTheme
      setBodyId(themeName)
    }
  },
  actions: {
    switchTheme ({ state, commit }, info) {
      let { name: themeName } = info
      generateCss(state.themeData, state.libCss, themeName)
        .then(css => {
          if (themeName) {
            css += preThemes[themeName]
          }
          commit('setTheme', { themeName, css })
        })
    }
  }
})

function getStyleEle () {
  let head = document.querySelector('head')
  let style = document.querySelector('style[data-type="theme"]')
  if (!style) {
    style = document.createElement('style')
    style.setAttribute('data-type', 'theme')
    head.appendChild(style)
  }
  return style
}

function setBodyId (id) {
  let body = document.querySelector('body')
  body.setAttribute('id', id)
}
