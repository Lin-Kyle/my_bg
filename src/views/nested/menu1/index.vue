<style rel="stylesheet/scss" lang="scss" scoped>
  .contanier {
    padding: 30px;

    .form-p {
      margin-left: 10px;
      line-height: initial;
    }

    .add-tag {
      el-tag {
        margin-right: 10px;
      }
    }
  }
</style>

<template>
  <div class="contanier">
    <el-tabs type="border-card">
      <el-tab-pane label="消息中心">
        <p>标签</p>
        <hr/>
        <div class="block">
          <span class="demonstration">color</span>
          <el-color-picker v-model="color1"></el-color-picker>
        </div>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList3">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <p>标签</p>
        <hr/>
        <div class="add-tag">
          <span @click="addInput"><el-tag>标签一</el-tag></span>
          <span @click="addSelect"><el-tag>标签一</el-tag></span>
          <span @click="addDate"><el-tag>标签一</el-tag></span>
          <span @click="addSwitch"><el-tag>标签一</el-tag></span>
          <span @click="addCheckbox"><el-tag>标签一</el-tag></span>
          <span @click="addRadio"><el-tag>标签一</el-tag></span>
        </div>

        <p>商品信息</p>
        <hr/>
        <el-tag>标签一</el-tag>
        <el-tag>标签一</el-tag>
      </el-tab-pane>
      <el-tab-pane label="我的行程">
        <el-form label-position="right" label-width="80px" :model="formLabelAlign">
          <el-form-item label="名称">
            <el-row>
              <el-col :span="6">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-col>
              <el-col :span="18"><p class="form-p">12</p></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-row>
              <el-col :span="6">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-col>
              <el-col :span="18"><p class="form-p">12</p></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-row>
              <el-col :span="6">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-col>
              <el-col :span="18"><p class="form-p">12</p></el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="角色管理">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
          <el-form-item label="活动名称">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="sizeForm.date2"
                              style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="sizeForm.type">
              <el-checkbox-button label="美食/餐厅线上活动" name="type"></el-checkbox-button>
              <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
              <el-checkbox-button label="线下主题活动" name="type"></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="sizeForm.resource" size="medium">
              <el-radio border label="线上品牌商赞助"></el-radio>
              <el-radio border label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <br/>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <el-form-renderer :content="content"></el-form-renderer>
    </el-card>
  </div>
</template>
<script>
  import ElFormRenderer from 'el-form-renderer'

  export default {
    created () {
      window.q = this
      console.log(this);
    },
    data() {
      return {
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        content: []
      }

    },

    components: {
      ElFormRenderer
    },

    methods: {
      addInput() {
        this.content.push(
          {
            $type: 'input',
            $id: 'name',
            $name: 'jvjvjv',
            label: '活动名称',
            $default: '',
            $el: {
              size: 'mini',
              placeholder: 'test placeholder',
              focus: (e) => console.log(3),
            },
            rules: [
              {
                required: true,
                message: '请输入活动名称',
                trigger: blur,
              },
              {
                min: 3,
                max: 5,
                message: '长度在 3 到 5 个字符',
                trigger: blur,
              }
            ],
          })
        console.log(this);
      },

      addSelect() {
        this.content.push({
          $type: 'select',
          $id: 'region',
          label: '活动区域',
          $options: [
            {
              label: '区域一',
              value: 'shanghai',
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
              trigger: 'change',
            }
          ]
        })
      },

      addDate() {
        this.content.push({
          $type: 'date-picker',
          $id: 'date',
          label: '活动时间',
          $el: {
            type: 'datetime',
            placeholder: '请选择',
          },
          rules: [
            {
              type: 'date',
              required: true,
              message: '请选择日期时间',
              trigger: 'change'
            }
          ]
        })
      },

      addSwitch() {
        this.content.push({
          $type: 'switch',
          $id: 'delivery',
          label: '即时配送'
        })
      },

      addCheckbox() {
        this.content.push({
          $type: 'checkbox-group',
          $id: 'type',
          label: '活动性质',
          $default: [],
          $options: [
            {
              label: '美食 / 餐厅线上活动'
            },
            {
              label: '地推活动'
            },
            {
              label: '线下主题活动'
            },
            {
              label: '单纯品牌曝光'
            }
          ],
          rules: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个活动性质',
              trigger: 'change'
            }
          ]
        })
      },

      addRadio() {
        this.content.push({
          $type: 'radio-group',
          $id: 'resource',
          label: '特殊资源',
          $options: [
            {
              label: '线上品牌商赞助'
            },
            {
              label: '线下场地免费'
            }
          ],
          rules: [
            {
              required: true,
              message: '请选择活动资源',
              trigger: 'change'
            }
          ]
        })
      },

    }
  }
</script>
