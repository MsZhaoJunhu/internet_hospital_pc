<template>
  <div class="waitaudit-wrap">
    <div class="head">
      <span class="head-text">待审核</span>
      <span @click="fresh" class="head-fresh">刷新</span>
    </div>
    <div class="waitaudit-table-wrap">
      <table class="waitaudit-table">
        <tr class="top-menu">
          <td class="waitaudit-table-td1">处方单号</td>
          <td class="waitaudit-table-td2">医生名字</td>
          <td class="waitaudit-table-td3">提交时间</td>
          <td class="waitaudit-table-td4">患者姓名</td>
          <td class="waitaudit-table-td5">身份证号</td>
          <td class="waitaudit-table-td6">操作</td>
        </tr>
        <tr v-for="(item,i) in waitauditLists" :key="i" @click="audit(item)">
          <td class="waitaudit-table-td1">{{item.prescribeNo}}</td>
          <td class="waitaudit-table-td2">{{item.doctorName}}</td>
          <td class="waitaudit-table-td3">{{item.createTime}}</td>
          <td class="waitaudit-table-td4">{{item.patientName}}</td>
          <td class="waitaudit-table-td5">{{item.idCard}}</td>
          <td class="waitaudit-table-td6">
            <button >查看详情</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="pagination-par">
      <el-pagination
        background
        layout="pager,next"
        next-text="下一页"
        :page-size="8"
        :total="waitauditLists.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaitAudit",
  created() {
      this.loadLists();
  },
  methods: {
      audit(item) {
          this.$router.push({
              name: 'toAudit',
              params: {
                id: item.id,
                prescribeNo: item.prescribeNo
              }
          })
      },
      loadLists() {
          this.$post('/doctPrescript/pageList', {
              auditStatus: 1,
              current: 1,
              hospId: 1,
              pageSize: 10
          }).then(res => {
              console.log(res);
              this.waitauditLists = res.data.records;
          }).catch(e => {
              console.log(e);
          })
      },
      fresh() {
          this.loadLists();
      }
  },
  data() {
    return {
      waitauditLists: []
    };
  }
};
</script>

<style scoped>
.waitaudit-wrap {
  background: #fff;
  /* height: 100%; */
  border-radius: 5px;
  padding: 37px 33px;
}

.waitaudit-wrap .head {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 19px;
  margin-bottom: 37px;
}

.waitaudit-wrap .head .head-text {
  font-size: 18px;
  color: #353535;
}

.waitaudit-wrap .head .head-fresh {
  font-size: 15px;
  color: #5a75f6;
  padding-left: 24px;
  background: url("../../assets/images/fresh.png") no-repeat left;
  background-size: 16px 16px;
  line-height: 24px;
  cursor: pointer;
}

.waitaudit-wrap {
  background: #fff;
}
.waitaudit-table {
  width: 100%;
  border-collapse: collapse;
}

.waitaudit-table tr {
  height: 65px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
}

.waitaudit-table td {
  text-align: center;
}

.waitaudit-table tr:nth-child(odd) {
  background: #f9fbff;
}

.waitaudit-table tr:hover {
  background: #f3f6ff;
}

.waitaudit-table .top-menu {
  height: 54px;
  background: #f3f6ff !important;
  color: #6773af;
}

.waitaudit-table-td1 {
  width: 180px;
}

.waitaudit-table-td2 {
  width: 80px;
}

.waitaudit-table-td3 {
  width: 150px;
}

.waitaudit-table-td4 {
  width: 80px;
}

.waitaudit-table-td5 {
  width: 150px;
}

.waitaudit-table-td6 {
  width: 76px;
  text-align: center;
}

.waitaudit-table td button {
  background: #5a75f6;
  width: 100%;
  height: 29px;
  border-radius: 5px;
  color: #fefefe;
  border: 0;
  font-size: 14px;
}

.pagination-par{
        margin-top: 42px;
    }

    .pagination-par /deep/ .el-pagination{
        padding: 0;
        display: flex;
        align-items: center;
    }

    .pagination-par /deep/ .number{
        width: 39px;
        height: 39px;
        line-height: 39px;
        border-radius: 50% !important;
        background: #fff !important;
        color: #989898 !important;
        box-sizing: border-box;
        border: 1px solid #dfe5f6;
    }

    .pagination-par /deep/ .active{
        background: #5a75f6 !important;
        border: 0 !important;
        color: #fff  !important;
    }

    .pagination-par /deep/ .btn-next{
        width: 80px;
        height: 37px;
        background: #fff;
        border: 1px solid #dfe5f6;
        border-radius: 37px;
        color: #989898;
    }
    
    .pagination-par /deep/ .btn-next:hover{
        border-color: #5a75f6;
        color: #5a75f6;
    }
</style>