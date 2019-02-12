<template>
  <div class="about">
    <Header/>
    <section class="main">
      <Demo />
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Demo from '@/components/Demo'
import { Toast } from 'mand-mobile'
export default {
  name: 'About',
  components: {
    Header,
    Demo
  },
  title: '业务场景输入框',
  data () {
    return {
      phone: '13321234431',
      money: '',
      digit: ''
    }
  },
  methods: {
    onInputKeydown (event) {
      console.log(`[Mand Mobile InputItem keydown] ${event.keyCode}`)
    },
    onInputChange (name, value) {
      console.log(`[Mand Mobile InputItem change] ${value}`)
    },
    onClick () {
      Toast({
        content: 'some information',
        icon: 'circle-alert'
      })
    },
    onFakeInputFocus () {
      function getElementPosition (element) {
        const defaultRect = { top: 0, left: 0 }
        const rect = element
          ? (element.getBoundingClientRect && element.getBoundingClientRect()) || defaultRect
          : defaultRect
        const ret = {
          top: rect.top,
          left: rect.left
        }
        return ret
      }

      setTimeout(() => {
        const wrapper = this.$el
        const inputer = this.$refs['input10']
        const inputEl = inputer.$el
        const keyboardEl = document
          .querySelector(`#${inputer.name}-number-keyboard`)
          .querySelector('.md-number-keyboard-container')
        const offset =
          keyboardEl.clientHeight +
          inputEl.clientHeight -
          document.documentElement.clientHeight +
          getElementPosition(inputEl).top +
          30

        const oldPaddingBottom = +wrapper.style.paddingBottom.replace(/px|rem|em/gi, '')
        const oldScrollTop = document.body.scrollTop
        const newPaddingBottom = oldPaddingBottom + offset
        const newScrollTop = oldScrollTop + offset

        wrapper.style.paddingBottom = `${newPaddingBottom}px`
        document.body.scrollTop = newScrollTop

        this.scrollInputBack = () => {
          wrapper.style.paddingBottom = `${oldPaddingBottom}px`
          document.body.scrollTop = oldScrollTop
          this.scrollInputBack = null
        }
      }, 300)
    },
    onFakeInputBlur () {
      this.scrollInputBack && this.scrollInputBack()
    }
  }
}
</script>
