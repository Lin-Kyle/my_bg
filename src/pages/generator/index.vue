<template>
  <div style="padding:30px;">
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
        <el-button @click="showInput">添加input</el-button>
        <el-button @click="showRadio">添加单选框</el-button>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>

    <br/>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <div class="text item">
        <el-form-renderer :content="content" @whichclick="whichclick"/>
      </div>
    </el-card>

    <el-dialog title="" :visible.sync="dialogInputFormVisible">
      <el-form :model="formInput">
        <el-form-item label="名称">
          <el-input v-model="formInput.label"></el-input>
        </el-form-item>
        <el-form-item label="提示">
          <el-input v-model="formInput.placeholder"></el-input>
        </el-form-item>
        <el-form-item label="默认值">
          <el-input v-model="formInput.$default"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideInput">取 消</el-button>
        <el-button type="primary" @click="addInput">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="" :visible.sync="dialogRadioFormVisible">
      <el-form :model="formRadio" :inline="true" v-for="(item, index) in formRadio.$options" :key="index">
        <el-form-item :label="'选项'+(index+1)">
          <el-input v-model="item.label"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRadios">新 增</el-button>
        <el-button @click="hideRadio">取 消</el-button>
        <el-button type="primary" @click="addRadio">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import ElFormRenderer from '@/components/FormGenerator'

  const INIT = {
    input: {
      $type: 'input',
      $id: '',
      label: '',
      $default: '',
      placeholder: '',
      $el: {
        size: 'mini',
        name: 'abc'
      }
    }, radio: {
      $type: 'checkbox-group',
      $options: [{
        label: ''
      }, {
        label: ''
      }]
    }
  }

  export default {

    components: {
      ElFormRenderer
    },

    inheritAttrs: true,
    data() {
      return {
        disabled: true,
        index: 0,
        dialogInputFormVisible: false, formInput: Object.assign({}, INIT.input),
        dialogRadioFormVisible: false, formRadio: JSON.parse(JSON.stringify(INIT.radio)),
        content: [{
          $type: 'input',
          $id: 'name',
          label: '活动名称',
          $default: '',
          $el: {
            size: 'mini',
            placeholder: 'test placeholder',
            name: 'abc'
          }
        }, {
          $type: 'select',
          $id: 'region',
          label: '活动区域',
          $el: {
            name: '2323'
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
          ]
        }]
      }
    },

    methods: {
      whichclick(e) {
        // console.log(e)
        // console.log(this.content.findIndex(item => item.$id === e))
        this.index = this.content.findIndex(item => item.$id === e)
        console.log(this.content[this.index].$type)
        if (this.content[this.index].$type === 'input') {
          this.formInput = this.content[this.index]
          this.dialogInputFormVisible = true
        } else if (this.content[this.index].$type === 'checkbox-group') {
          this.formRadio = this.content[this.index]
          this.dialogRadioFormVisible = true
        }
      },

      showInput() {
        this.dialogInputFormVisible = true
      },

      hideInput() {
        this.formInput = Object.assign({}, INIT.input)
        this.dialogInputFormVisible = false
      },

      showRadio() {
        this.dialogRadioFormVisible = true
      },

      hideRadio() {
        console.log(INIT.radio, this.formRadio, INIT.radio === this.formRadio)
        this.formRadio = JSON.parse(JSON.stringify(INIT.radio))
        this.dialogRadioFormVisible = false
      },

      addRadios() {
        this.formRadio.$options.push({})
      },

      addInput() {
        const is_include = this.content[this.index] === this.formInput
        this.formInput.$el.placeholder = this.formInput.placeholder
        if (!is_include) {
          this.content.push({
            ...this.formInput,
            $id: +new Date() + ''
          })
        } else {
          this.content.splice(this.index, 1, this.formInput)
        }
        this.formInput = Object.assign({}, INIT.input)
        this.dialogInputFormVisible = false
      },

      addRadio() {
        const is_include = this.content[this.index] === this.formRadio
        if (!is_include) {
          this.content.push({
            ...this.formRadio,
            $id: +new Date() + ''
          })
        } else {
          this.content.splice(this.index, 1, this.formRadio)
        }
        this.formRadio = JSON.parse(JSON.stringify(INIT.radio))
        this.dialogRadioFormVisible = false
      }
    }
  }
</script>
