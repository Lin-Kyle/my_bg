<template>
  <div style="padding:30px;">
    <el-form-renderer  :content="content" @whichclick="whichclick"></el-form-renderer>
    <button @click="tap">click</button>
  </div>
</template>

<script>
  import ElFormRenderer from '@/components/FormGenerator'

  export default {
    data() {
      return {
        content: [{
          $type: 'input',
          $id: 'name',
          label: '活动名称',
          $default: 'aaaa2',
          $el: {
            size: 'mini',
            placeholder: 'test placeholder',
            name: 'abc'
          },
          rules: [
            {
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ]
        }, {
          $type: 'select',
          $id: 'region',
          label: '活动区域',
          $el: {
            name: '2323',
          },
          $options: [
            {
              label: '区域一',
              value: 'shanghai'
            },
            {
              label: '区域二',
              value: 'beijing'
            }
          ],
          rules: [
            {
              required: true,
              message: '请选择活动区域',
              trigger: 'change'
            }
          ]
        }]
      }
    },

    components: {
      ElFormRenderer
    },

    inheritAttrs: true,

    computed: {
    },

    watch: {
      form: {
        handler: function (nowVal, oldVal) {
          console.log(123);
          var $this = this;
          for (let i in $this.form) {
            if (nowVal[i] != $this.preForm[i]) {
              $this.unChange = false;
              break;
            } else {
              $this.unChange = true;
            }
          }
        },
        deep: true
      }
    },

    methods: {
      whichclick(e){
        console.log(e);
      },

      tap(e) {
        console.log(e.path[0].name, e)
      }
    }
  }
</script>
