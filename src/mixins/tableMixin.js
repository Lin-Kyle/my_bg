// 定义一个混入对象
export default {
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
        layout: "sizes, prev, pager, next",
      }
    }
  },

  created() {
    this.fetchData && this.fetchData()
  },

  methods: {
    handleCurrentChange() {
      this.fetchData && this.fetchData()
    },

    handleSubmit() {
      this.pagination.current_page = 1;
      this.fetchData()
    },
  }
}
