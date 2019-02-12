import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './lib/responsive'
import './assets/css/global.styl'
import './assets/css/main.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    // this.$store.commit('setTheme')
  }
}).$mount('#app')
