<template>
  <div style="padding:30px;">
    <el-tabs type="border-card">
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="添加字段">
        <el-button @click="showInput('input')">添加单行框</el-button>
        <el-button @click="showInput('textarea')">添加多行框</el-button>
        <el-button @click="showOptions('radio')">添加单选框</el-button>
        <el-button @click="showOptions('checkbox')">添加多选框</el-button>
        <el-button @click="showOptions('select')">添加下拉框</el-button>
        <el-button @click="addDate('date')">选择时间</el-button>
      </el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>

    <br/>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>预览</span>
      </div>
      <div class="text item">
        <el-form-renderer :content="content" @whichclick="whichclick" :key="123"/>
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
        <el-button type="danger" v-if="formInput.$id" @click="handleDelete('dialogInputFormVisible')">刪 除</el-button>
        <el-button type="primary" @click="addInput">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="" :visible.sync="dialogOptionFormVisible">
      <el-form :model="formOptions" :inline="true" v-for="(item, index) in formOptions.$options" :key="index">
        <el-form-item :label="'选项'+(index+1)">
          <el-input v-model="item.label"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOption">新 增</el-button>
        <el-button type="danger" v-if="formOptions.$id" @click="handleDelete('dialogOptionFormVisible')">刪 除</el-button>
        <el-button type="primary" @click="addOptions">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import ElFormRenderer from '@/components/FormGenerator'
  import draggable from 'vuedraggable'

  const INIT = {
    input: {
      $type: 'input',
      $id: '',
      label: '',
      $default: '',
      $readonly: true,
      placeholder: '',
      $el: {
        size: 'mini'
      }
    }, textarea: {
      $type: 'input',
      $id: '',
      label: '',
      $default: '',
      placeholder: '',
      $el: {
        size: 'mini',
        type: 'textarea'
      }
    }, radio: {
      $type: 'radio-group',
      $options: [{
        label: ''
      }, {
        label: ''
      }]
    }, checkbox: {
      $type: 'checkbox-group',
      $options: [{
        label: ''
      }, {
        label: ''
      }]
    }, select: {
      $type: 'select',
      $options: [{
        label: '',
        value: '0'
      }, {
        label: '',
        value: '1'
      }]
    }, date: {
      $type: 'date-picker',
      $id: '',
      label: '',
      $el: {
        type: 'datetime',
        placeholder: '请选择'
      }
    }
  }

  export default {

    components: {
      ElFormRenderer,
      draggable
    },

    inheritAttrs: true,
    data() {
      return {
        disabled: true,
        index: 0,
        dialogInputFormVisible: false, formInput: {},
        dialogOptionFormVisible: false, formOptions: {},
        content: [],
        tags: [
          {
            id: 1,
            name: 1
          },
          {
            id: 2,
            name: 2
          }
        ]
      }
    },

    computed: {
      is_include() {
        return this.content[this.index] === this.formInput || this.content[this.index] === this.formOptions
      }
    },

    methods: {
      whichclick(e) {
        // console.log(this.content.findIndex(item => item.$id === e))
        this.index = this.content.findIndex(item => item.$id === e)
        // console.log(this.content[this.index].$type)
        switch (this.content[this.index].$type) {
          case 'input':
            this.formInput = this.content[this.index]
            this.dialogInputFormVisible = true
            break
          case 'radio-group':
          case 'checkbox-group':
          case 'select':
            this.formOptions = this.content[this.index]
            this.dialogOptionFormVisible = true
            break
        }
      },

      handleDelete(name) {
        this.content.splice(this.index, 1)
        this[name] = false
      },

      addDate(type) {
        this.content.push({
          ...JSON.parse(JSON.stringify(INIT[type])),
          $id: +new Date() + ''
        })
      },

      showInput(type) {
        this.formInput = JSON.parse(JSON.stringify(INIT[type]))
        this.dialogInputFormVisible = true
      },

      hideInput() {
        this.formInput = {}
        this.dialogInputFormVisible = false
      },

      showOptions(type) {
        this.formOptions = JSON.parse(JSON.stringify(INIT[type]))
        this.dialogOptionFormVisible = true
      },

      hideOptions() {
        this.formOptions = {}
        this.dialogOptionFormVisible = false
      },

      addOption() {
        if (this.formOptions.$type === 'select') {
          this.formOptions.$options.push({ value: this.formOptions.$options.length })
        } else {
          this.formOptions.$options.push({})
        }
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

      addOptions() {
        const is_include = this.content[this.index] === this.formOptions
        if (!is_include) {
          this.content.push({
            ...this.formOptions,
            $id: +new Date() + ''
          })
        } else {
          this.content.splice(this.index, 1, this.formOptions)
        }
        this.formOptions = JSON.parse(JSON.stringify(INIT.radio))
        this.dialogOptionFormVisible = false
      },

      getdata(evt) {
        console.log(evt.draggedContext.element.id)
      },

      datadragEnd(evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
        console.log(this.tags)
      }
    }
  }
</script>
