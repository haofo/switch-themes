<template>
  <section>
      <md-field>
        <md-input-item
          title="银行卡"
          type="bankCard"
          placeholder="bankCard xxxx xxxx xxxx xxxx"
          is-highlight
        ></md-input-item>
        <md-input-item
          title="手机号"
          type="phone"
          v-model="phone"
          placeholder="phone xxx xxxx xxxx"
          clearable
        ></md-input-item>
        <md-input-item
          ref="input10"
          title="金额"
          type="money"
          placeholder="financial number keyboard"
          is-virtual-keyboard
          clearable
          @focus="onFakeInputFocus"
          @blur="onFakeInputBlur"
        ></md-input-item>
        <md-input-item
          ref="input11"
          placeholder="left/right slots"
        >
          <md-icon name="bank-zs" slot="left"></md-icon>
          <md-icon name="circle-alert" slot="right" @click.native="onClick"></md-icon>
        </md-input-item>
        <md-field-item
          name="name"
          title="下拉选项"
          arrow="arrow-right"
          align="right"
          :value="selectorValue"
          @click.native="showSelector">
        </md-field-item>
        <md-selector
          v-model="isSelectorShow"
          :data="data[0]"
          :default-index="1"
          :invalid-index="2"
          ok-text="确认"
          cancel-text="取消"
          title="普通模式"
          @choose="onSelectorChoose($event)"
        ></md-selector>
        <md-field-item
          title="限制验证码长度"
          customized
          align="right">
          <md-switch v-model="limit"></md-switch>
        </md-field-item>
      </md-field>

      <div>
        <md-agree
      v-model="agreeConf.checked"
      :disabled="agreeConf.disabled"
      :size="agreeConf.size"
    >
      <p class="tips">本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意<a>《投保须知》</a>, <a>《保险条款》</a></p>
    </md-agree>
      </div>

      <div class="btn-wrapper">
        <md-button>提交</md-button>
      </div>
    </section>
</template>
<script>
import {
  InputItem,
  Field,
  FieldItem,
  Icon,
  Toast,
  Button,
  Selector,
  Switch,
  Agree
} from 'mand-mobile'
export default {
  name: 'Demo',
  components: {
    // eslint-disable-next-line
    [InputItem.name]: InputItem,
    // eslint-disable-next-line
    [Field.name]: Field,
    // eslint-disable-next-line
    [Icon.name]: Icon,
    // eslint-disable-next-line
    [Button.name]: Button,
    // eslint-disable-next-line
    [Selector.name]: Selector,
    // eslint-disable-next-line
    [FieldItem.name]: FieldItem,
    // eslint-disable-next-line
    [Switch.name]: Switch,
    // eslint-disable-next-line
    [Agree.name]: Agree,
  },
  title: '业务场景输入框',
  data () {
    return {
      phone: '13321234431',
      money: '',
      digit: '',
      selectorValue: '',
      isSelectorShow: false,
      data: [
        [
          {
            text: '选项一'
          },
          {
            text: '选项二'
          },
          {
            text: '选项三'
          },
          {
            text: '选项四'
          }
        ]
      ],
      limit: '',
      agreeConf: {
        checked: true,
        name: 'agree0',
        size: 'lg',
        disabled: false,
        introduction: '选中状态'
      }
    }
  },
  methods: {
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
    },
    showSelector () {
      this.isSelectorShow = true
    },
    onSelectorChoose ({ text }) {
      this.selectorValue = text
    }
  }
}
</script>
