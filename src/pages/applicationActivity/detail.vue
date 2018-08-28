<template>
  <div class="app-container">
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>

    <h3>商品设置</h3>
    <hr>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="商品标题">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="商品详细描述">
        <el-input v-model="form.desc" :rows="4" type="textarea" resize="none"/>
      </el-form-item>

      <el-form-item label="封面图片上传">
        <el-upload
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品图片上传限5张">
        <el-upload
          :limit="5"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>

      <br>
      <h3>活动设置</h3>
      <hr>
      <el-form-item label="上架时间">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="开奖时间">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="中奖者数量">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="假中奖者数量">
        <el-input v-model="form.name"/>
      </el-form-item>

      <br>
      <h3>赞助商信息</h3>
      <hr>
      <el-form-item label="赞助商名称">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="赞助商头像">
        <el-upload
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>

      <el-form-item label="跳转小程序路径">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="跳转H5二维码">
        <el-upload
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>

      <el-form-item label="加微信文案">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="微信号">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      form: {
        imageUrl: ''
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    onSubmit() {
      this.$message('submit!')
    },

    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

