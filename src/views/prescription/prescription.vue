<template>
    <div class="prescription-content">
        <div class="prescription-content-topTitle">
            <span>已开处方</span>
            <div class="prescription-topTitle-right">
                <span :class="activeMenu==2?'active':''" @click="changeStatus(2)">审核已通过</span>
                <span :class="activeMenu==3?'active':''" @click="changeStatus(3)">审核未通过</span>
                <span :class="activeMenu==1?'active':''" @click="changeStatus(1)">正在审核</span>
                <div class="bottom-line"  :class="activeMenu==2?'active1':activeMenu==3?'active2':'active3'"></div>
            </div>
        </div>
        <div>
            <table class="prescription-table">
                <tr class="top-menu">
                    <td class="prescription-table-td1">患者</td>
                    <td class="prescription-table-td2">年龄</td>
                    <td class="prescription-table-td3">性别</td>
                    <td class="prescription-table-td4">开方时间</td>
                    <td class="prescription-table-td5">病情诊断</td>
                    <td class="prescription-table-td6">药品详情</td>
                    <td class="prescription-table-td7">状态</td>
                </tr>
                <tr v-for="(item,i) in prescriptionList" :key="i" @click="checkDetails(item.id,item.orderNo,item.prescribeNo)">
                    <td class="prescription-table-td1">{{item.patPatient.realName||'暂无'}}</td>
                    <td class="prescription-table-td2">{{item.patPatient.age||'暂无'}}</td>
                    <td class="prescription-table-td3">{{item.patPatient.sex==1?'男':'女'||'暂无'}}</td>
                    <td class="prescription-table-td4">{{item.createTime||'暂无'}}</td>
                    <td class="prescription-table-td5">{{item.preliminaryDiagnosis||'暂无'}}</td>
                    <td class="prescription-table-td6">
                        <p v-for="(s,i) in item.doctPrescriptExtendList">{{s.sysDrugCommonName||'暂无'}}</p>
                    </td>
                    <td class="prescription-table-td7">
                        <button :class="item.auditStatus==1?'正在审核':item.auditStatus==2?'审核通过':'审核未通过'">{{item.auditStatus==1?'正在审核':item.auditStatus==2?'审核通过':'审核未通过'}}</button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="pagination-par" v-if="prescriptionList.length>0">
            <el-pagination background layout="pager,next" next-text="下一页" :page-size="8" :total="prescriptionList.length||0">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 1.正在审核,2.审核未通过.3.审核通过.
            prescriptionList:[],

            // {name:"张兰",age:20,id:'12',gender:"女",time:"2020-02-18",prescription:"高血压",prescriptionDetail:"高血压药降压药",state:"1"},

            activeMenu:1,

            status:1,
        }
    },

    methods: {
        checkDetails(a,b,c){
            this.$router.push({name:"checkPrescription",query:{
                Id:a,
                orderNo:b,
                prescribeNo:c,

            }})
        },

        getDate(){
            const that = this;
            
            that.$get('/doctPrescript/getDoctPrescriptForDoc',{
                doctorId:that.$store.state.Info.id,
                auditStatus:that.status,
				hospId:1
            }).then(res => {
                that.prescriptionList=res.data||[]
            }).catch(err => {
                console.log(err)
            })
        },

        changeStatus(i){
            const that = this;

            that.activeMenu=i
            that.status=i
            
            that.$get('/doctPrescript/getDoctPrescriptForDoc',{
                doctorId:that.$store.state.Info.id,
                auditStatus:that.status,
				hospId:1
            }).then(res => {
                that.prescriptionList=res.data
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
        
    },

    mounted () { 
        this.activeMenu=1;
        this.status=1;
        this.getDate();
    }
}
</script>
<style scoped>
    .prescription-content{
        background: #fff;
        padding: 37px 33px;
    } 

    .prescription-content-topTitle{
        height: 38px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        box-sizing: border-box;
        border-bottom: 1px solid #eeeeee;
        margin-bottom: 24px;
    }

    .prescription-content-topTitle>span{
        font-size: 18px;
        color: #353535;
    }

    .prescription-topTitle-right{
        height: 30px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .prescription-topTitle-right span{
        display: block;
        width: 84px;
        font-size: 15px;
        text-align: center;
        border-bottom: 8px solid #fff;
        color: #5a5a5a;
        cursor: pointer;
    }

    .prescription-topTitle-right span+span{
        margin-left: 20px;
    }

    .prescription-topTitle-right span:hover{
        color: #5a75f6;
    }

    .prescription-topTitle-right span.active{
        color: #5a75f6;
    }

    .bottom-line{
        position: absolute;
        bottom: 0;
        width: 84px;
        height: 3px;
        background: #5a75f6;
        transition: all .5s;
    }

    .active1{
        transform: translateX(0px);
    }

    .active2{
        transform: translateX(104px);
    }
    
    .active3{
        transform: translateX(208px);
    }

    .prescription-table{
        width: 100%;
        border-collapse:collapse;
    }

    .prescription-table tr{
        height: 65px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .prescription-table td{
        height: 54px;
        line-height: 54px;
        text-align: center;
        overflow:hidden; 
        text-overflow:ellipsis;
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
    }

    .prescription-table tr:nth-child(odd){
        background: #f9fbff;
    }

    .prescription-table tr:hover{
        background: #f3f6ff;
    }

    .prescription-table .top-menu{
        height: 54px;
        background: #f3f6ff !important;
    }

    .prescription-table-td1{
        width: 64px;
    }

    .prescription-table-td2{
        width: 32px;
    }

    .prescription-table-td3{
        width: 32px;
    }

    .prescription-table-td4{
        width: 100px;
    }

    .prescription-table-td5{
        width: 80px;
    }

    .prescription-table-td6{
        width: 120px;
    }
    .prescription-table-td6 p{
        height: auto;
        display: inline-block;
    }

    .prescription-table-td7{
        width: 75px;
    }

    .prescription-table td button{
        width: 100%;
        height: 29px;
        border-radius: 5px;
        color: #fff;
        border: 0;
    }

    .正在审核{
	    background-color: #39bef9;
    }

    .审核未通过{
	    background-color: #94a1dc;
    }

    .审核通过{
        background-color: #ff5050;
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