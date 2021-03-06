import draggable from 'vuedraggable'
import RenderFormItem from './render-form-item'
import RenderFormGroup from './render-form-group'
import { Form } from 'element-ui'

export default {
  render(h) {
    this.content.forEach(this.initItemValue) // handle default value
    const dom = h(
      'el-form', {
        props: Object.assign({}, this._props, {
          model: this.value // 用于校验
        }),
        ref: 'elForm'
      },
      this.content
        .map((item, index) => {
          const data = {
            props: {
              key: item.$id,
              data: item,
              value: this.value,
              itemValue: this.value[item.$id],
              disabled: this.disabled,
              readonly: true
            },
            on: {
              updateValue: this.updateValue,
              updateId: this.updateId
            }
          }

          if (item.$type === 'group') {
            return h('render-form-group', data)
          } else {
            return h('render-form-item', data)
          }
        })
        .concat(this.$slots.default)
    )
    // console.log(dom)
    return dom
  },
  components: {
    RenderFormItem,
    RenderFormGroup,
    draggable
  },
  mounted() {
    this.$nextTick(() => {
      // proxy
      Object.keys(Form.methods).forEach((item) => {
        this[item] = this.$refs.elForm[item]
      })
    })
  },
  beforeUpdate(a, b) {
    console.log(this.value, this.$props.content)
    this.$props.content.map(item => {
        if (this.value[item.$id] !== item.$default) this.updateValue({ id: item.$id, value: item.$default })
      }
    )
  },
  props: Object.assign({}, Form.props, {
    content: {
      type: Array,
      required: true
    },
    // 禁用所有表单
    disabled: {
      type: Boolean,
      default: false
    }
  }),
  data() {
    return {
      value: {} // 表单数据对象
    }
  },
  methods: {
    /**
     * 初始化每个表单原子的默认值
     * @param  {Object} item 表单原子描述
     */
    initItemValue(item) {
      if (!item.$id || this.value[item.$id] !== undefined) return
      let defaultVal
      if (item.$type === 'group') {
        // group
        defaultVal = item.$items.reduce((acc, cur) => {
          cur.$default && cur.$id && (acc[cur.$id] = cur.$default)
          return acc
        }, {})
      } else if (item.$default !== undefined) {
        // not group
        defaultVal = item.$default
      }
      defaultVal !== undefined && this.updateValue({ id: item.$id, value: defaultVal })
    },

    /**
     * 更新表单数据
     * @param  {String} options.id 表单ID
     * @param  {All} options.value 表单数据
     */
    updateValue({ id, value }) {
      // console.log(this.value)
      this.value = Object.assign({}, this.value, {
        [id]: value
      })
    },

    updateId(id) {
      this.$emit('whichclick', id)
    },

    // 对外提供获取表单数据的函数
    getFormValue() {
      return this.value
    }
  }
}
