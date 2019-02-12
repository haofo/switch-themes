<template>
  <div class="home">
    <section class="banner">
      <h1 class="tit">SwitchThemes</h1>
      <h2 class="tit-sub">Switching Themes in some UI Frameworks</h2>
      <p class="tit-desc">暂时在 <code>mand-mobile</code> 下尝试</p>
      <div class="banner-btn-wrapper">
        <button class="banner-btn" @click="gotoNav">查看效果</button>
      </div>
    </section>

    <section class="switch-theme">
      <div class="content" :class="[item.name]" :key="item.name" v-for="item in themes">
        <h3>紫罗兰</h3>
        <button type="button" @click="applyTheme(item.name, item.color)">应用主题</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'home',
  components: {

  },
  data () {
    return {
      themes: [
        {
          name: 'violet',
          color: '#a948da'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['updateTheme']),
    ...mapActions(['switchTheme']),
    gotoNav () {
      this.$router.push('/about')
    },
    applyTheme (name, color) {
      this.updateTheme({
        path: ['color', 'color-primary'],
        value: color
      })
      this.switchTheme({ name })
    }
  }
}
</script>
