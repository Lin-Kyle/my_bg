<template>
  <div class="app-container">
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
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"></img>
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
import { table } from '@/api'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      format: 'yyyy-MM-DD HH-mm',
      formInline: {
        name: '',
        grounding_time: '',
        prize_time: ''
      },
      list: null,
      listLoading: true,
      pagination: {
        size_ary: [10, 20, 30, 40],
        size: 10,
        total: 100,
        current_page: 1,
        layout: 'sizes, prev, pager, next'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getList({
        ...this.formInline,
        size: this.pagination.size,
        current_page: this.pagination.current_page
      }).then(response => {
        this.list = response.data.items.slice(0, this.pagination.size)
        this.listLoading = false
      })
    },

    handleSubmit() {
      this.pagination.current_page = 1
      this.fetchData()
    },

    handleCurrentChange(val) {
      this.fetchData()
    },

    handleEdit(index, row) {
      console.log(index, row)
    },

    handleDelete(index, row) {
      console.log(index, row)
    }

  }
}
</script>
