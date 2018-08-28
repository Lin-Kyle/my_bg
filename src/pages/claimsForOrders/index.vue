<template>
  <div class="app-container">

    <el-dialog
      :visible.sync="dialogVisible"
      width="50%">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="formInline.name" placeholder="请输入内容"/>
      </el-form-item>
      <el-form-item label="上架时间">
        <el-date-picker
          v-model="formInline.grounding_time"
          :format="format"
          :value-format="format"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"/>
      </el-form-item>
      <el-form-item>
        <el-form-item label="开奖时间">
          <el-date-picker
            v-model="formInline.prize_time"
            :format="format"
            :value-format="format"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="—"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">查询</el-button>
        <el-button @click="$router.push('detail')">新建抽奖</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="商品名称" width="95">
        <template slot-scope="scope">
          6655
        </template>
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img
            class="table_img"
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            @click="handlePrev('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80')">>
        </template>
      </el-table-column>
      <el-table-column label="赞助商" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上架时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开奖时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="中奖者人数">
        <template slot-scope="scope">
          123
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        :current-page.sync="pagination.current_page"
        :page-sizes="pagination.size_ary"
        :page-size="pagination.size"
        :layout="pagination.layout"
        :total="pagination.total"
        @size-change="handleSubmit"
        @current-change="fetchData"/>
    </div>

  </div>
</template>

<script>
import { table } from '@api'
import tableMixin from '@mixin/tableMixin'

export default {
  mixins: [tableMixin],

  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },

  methods: {
    fetchData() {
      this.listLoading = true
      table.getList({
        ...this.formInline,
        size: this.pagination.size,
        current_page: this.pagination.current_page
      }).then(response => {
        this.list = response.data.items.slice(0, this.pagination.size)
        this.listLoading = false
      })
    },

    handlePrev(url) {
      console.log(url)
      this.dialogVisible = true
      this.dialogImageUrl = url
    },

    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push(`detail/${row.id}`)
    },

    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
      })
    }

  }
}
</script>
