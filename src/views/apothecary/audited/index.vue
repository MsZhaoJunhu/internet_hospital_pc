<template>
  <div class="audited-wrap">
    <div class="head">
      <div>
        <span class="head-text">已审核</span>
      </div>
      <div class="head-audit-wrap">
        <span :class="activetab===0?'active':''" class="head-audit" @click="activetab=0">全部</span>
        <span :class="activetab===1?'active':''" class="head-audit" @click="activetab=1">审核已通过</span>
        <span :class="activetab===2?'active':''" class="head-audit" @click="activetab=2">审核未通过</span>
        <span @click="fresh" class="head-fresh">刷新</span>
        <div class="head-audit-bottom" :class="activetab===1?'activep':activetab===2?'activenp':activetab===0?'activea':''"></div>
      </div>
    </div>
    <div class="audited-table-wrap">
      <table class="audited-table">
        <tr class="top-menu">
          <td class="audited-table-td1">处方单号</td>
          <td class="audited-table-td2">医生名字</td>
          <td class="audited-table-td3">提交时间</td>
          <td class="audited-table-td4">患者姓名</td>
          <td class="audited-table-td5">身份证号</td>
          <td class="audited-table-td6">操作</td>
        </tr>
        <tr v-for="(item,i) in auditedLists" :key="i" @click="checkStatus(item)">
          <td class="audited-table-td1">{{item.prescribeNo}}</td>
          <td class="audited-table-td2">{{item.doctorName}}</td>
          <td class="audited-table-td3">{{item.createTime}}</td>
          <td class="audited-table-td4">{{item.patientName}}</td>
          <td class="audited-table-td5">{{item.idCard}}</td>
          <td class="audited-table-td6">
            <button v-show="item.auditStatus==2" class="audited-table-yes">审核通过</button>
            <button v-show="item.auditStatus==3" class="audited-table-no">审核未通过</button>
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
        :total="auditedLists.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
    created() {
      this.loadLists();
    },
    methods: {
        checkStatus(item) {
            this.$router.push({
                name: "auditedStatus",
                params: {
                  id: item.id,
                  prescribeNo: item.prescribeNo
                }
            })
        },
        loadLists() {
          this.$post('/doctPrescript/pageList', {
              auditStatus: 2,
              current: 1,
              hospId: 1,
              pageSize: 10
          }).then(res => {
              console.log(res);
              this.auditedLists = res.data.records;
          }).catch(e => {
              console.log(e);
          })
      },
      fresh() {
          this.loadLists();
        //   this.activetab = 0;
      }
    },
  data() {
    return {
      auditedLists: [],
      activetab: 0
    };
  }
};
</script>

<style scoped>
.audited-wrap {
  background: #fff;
  /* height: 100%; */
  border-radius: 5px;
  padding: 37px 33px;
}

.audited-wrap .head {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 19px;
    margin-bottom: 37px;
}

.head-audit {
  font-size: 16px;
  padding-left: 6px;
  padding-right: 19px;
  cursor: pointer;
}
.head-audit.active {
    color: #5a75f6;
}

.head-audit-bottom {
    width: 1px;
	height: 3px !important;
}
.head-audit-bottom.activea {
    width: 45px;
    height: 3px !important;
    background: #5a75f6;
    margin-left: -1px;
    transition: all .5s;
}
.head-audit-bottom.activep {
    width: 90px;
	height: 3px !important;
    background: #5a75f6;
    margin-left: 57px;
    transition: all .5s;
}
.head-audit-bottom.activenp {
    width: 90px;
	height: 3px !important;
    background: #5a75f6;
    margin-left: 162px;
    transition: all .5s;
}

.audited-wrap .head .head-text {
  font-size: 18px;
  color: #353535;
}

.audited-wrap .head .head-fresh {
  font-size: 15px;
  color: #5a75f6;
  padding-left: 24px;
  background: url("../../../assets/images/fresh.png") no-repeat left;
  background-size: 16px 16px;
  line-height: 24px;
  cursor: pointer;
}

.audited-wrap {
  background: #fff;
}

.audited-table {
  width: 100%;
  border-collapse: collapse;
}

.audited-table tr {
  height: 65px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
}

.audited-table td {
  text-align: center;
}

.audited-table tr:nth-child(odd) {
  background: #f9fbff;
}

.audited-table tr:hover {
  background: #f3f6ff;
}

.audited-table .top-menu {
  height: 54px;
  background: #f3f6ff !important;
  color: #6773af;
}

.audited-table-td1 {
  width: 180px;
}

.audited-table-td2 {
  width: 80px;
}

.audited-table-td3 {
  width: 150px;
}

.audited-table-td4 {
  width: 80px;
}

.audited-table-td5 {
  width: 150px;
}

.audited-table-td6 {
  width: 76px;
  text-align: center;
}

.audited-table-td6 .audited-table-yes {
  background: #5a75f6;
}

.audited-table-td6 .audited-table-no {
  background: #ff4f50;
}

.audited-table td button {
  width: 100%;
  height: 29px;
  border-radius: 5px;
  color: #fefefe;
  border: 0;
  font-size: 14px;
}

.pagination-par {
  margin-top: 42px;
}

.pagination-par /deep/ .el-pagination {
  padding: 0;
  display: flex;
  align-items: center;
}

.pagination-par /deep/ .number {
  width: 39px;
  height: 39px;
  line-height: 39px;
  border-radius: 50% !important;
  background: #fff !important;
  color: #989898 !important;
  box-sizing: border-box;
  border: 1px solid #dfe5f6;
}

.pagination-par /deep/ .active {
  background: #5a75f6 !important;
  border: 0 !important;
  color: #fff !important;
}

.pagination-par /deep/ .btn-next {
  width: 80px;
  height: 37px;
  background: #fff;
  border: 1px solid #dfe5f6;
  border-radius: 37px;
  color: #989898;
}

.pagination-par /deep/ .btn-next:hover {
  border-color: #5a75f6;
  color: #5a75f6;
}
</style>