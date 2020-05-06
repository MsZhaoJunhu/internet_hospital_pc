<template>
    <div class="checkPrescription-content">
        <div class="checkPrescription-topTitle">
            <span>{{content.auditStatus===1?"待审核":"已审核"}}</span>
            <a href="javascript:history.back(-1);">返回</a>
        </div>
        <div class="prescription-parent">
            <p class="top-title">处方笺</p>
            <div class="prescription-parent-number">
                <span>NO:{{content.prescribeNo}}</span>
                <span>{{content.createTime}}</span>
            </div>
            <div class="prescription-parent-userInfo">
                <p>
                    <span>{{content.patPatient.realName}}</span>
                    <span>{{content.patPatient.age}}</span>
                    <span>{{content.patPatient.sex==1?"男":"女"}}</span>
                    <span>{{content.patPatient.address}}</span>
                </p>
                <p>疾病诊断：</p>
                <p>1.{{content.preliminaryDiagnosis}}</p>
            </div>
            <div class="prescription-parent-userInfo">
                <p>医生嘱托：</p>
                <p>{{content.exhort}}</p>
            </div>
            <div class="prescription-parent-userInfo">
                <p>Rp：</p>
                <div v-for="(item,i) in content.doctPrescriptExtendList" :key="i" class="prescription-parent-rp">
                    <div>
                        {{i+1}}.
                    </div>
                    <div>
                        <div class="prescription-rp-div">
                            <div>{{item.sysDrugCommonName}}</div>
                            <div>{{item.content}}{{item.contentUnit}}{{item.packingQuantity}}{{item.packingUnit}}</div>
                        </div>
                        <p class="prescription-parent-careful">用法：{{item.drugUsage}}</p>
                    </div>
                </div>
            </div>
            <div class="prescription-parent-userInfo prescription-last-docter">
                <div class="prescription-docter-par">
                    <p>
                        <span>方案医生:</span>
                        <span>{{content.docBelong.titleName}}</span>
                        <span v-show="content.auditTime">{{content.auditTime}}</span>
                    </p>
                    <p>
                        <span></span>
                        <span>{{content.docBelong.hospitalName}}</span>
                        <span>{{content.departmentName}}</span>
                    </p>
                    <p class="special-span">
                        <span>处方医生：</span>
                        <span :class="content.auditStatus==2?'special-span-bgImg':''">{{content.doctUser.realName}}</span>
                        <span v-if="content.hospPharmacistName">处方药师：</span>
                        <span :class="content.auditStatus==2?'special-span-bgImg':''" v-if="content.hospPharmacistName">{{content.hospPharmacistName}}</span>
                    </p>
                </div>
                <div>
                    <img src="@/assets/images/cy.png" alt="">
                </div>
            </div>
            <p v-if="content.auditStatus===1">
                <button @click="pass" class="btn btn-ok">通过审核</button>
                <button @click="nopass" class="btn btn-no">不通过审核</button>
            </p>
            <p v-else-if="content.auditStatus===2">
                <button class="btn btn-ok">已通过审核</button>
            </p>
            <p v-else-if="content.auditStatus===3">
                <button class="btn btn-no">未通过审核</button>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            content:"",
            id: this.$route.params.id,
            prescribeNo: this.$route.params.prescribeNo
        }
    },

    methods: {
        loadInfo() {
            this.$get('/doctPrescript/getDoctPrescriptForFull', {
                // Id: this.id,
                prescribeNo: this.prescribeNo
            }).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.content = res.data;
                }
            })
        },

        postResult() {
            this.$post('/doctPrescript/audit', {
                auditStatus: 2,
                id: this.id
            }).then(res => {
                console.log(res);
                this.$router.push({
                    name: 'auditedStatus',
                    params: {
                        id: this.id,
                        prescribeNo: this.prescribeNo
                    }
                })
                this.$message.success("提交成功");
            }).catch(e => {
                console.log(e);
                this.$message.error("提交失败");
            })
        },

        pass() {
            this.postResult();
        },

        nopass() {
            this.$router.push({
                name: 'nopassReason',
                params: {
                    id: this.id,
                    prescribeNo: this.prescribeNo
                }
            })

        }
    },

    created () {
        this.loadInfo();
    },

    watch:{
      '$route'() {
          // 路由变化重新加载页面
          this.loadInfo();
      }
  },
}
</script>
<style scoped>
    .checkPrescription-content{
        padding: 38px 33px 100px 33px;
        background: #fff;
    }

    .checkPrescription-topTitle{
        width: 100%;
        height: 37px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        box-sizing: border-box;
        border-bottom: 1px solid #eeeeee;
        margin-bottom: 29px;
    }

    .checkPrescription-topTitle a{
        display: block;
        width: 40px;
        height: 30px;
        border: 0;
        background: #fff;
        text-align: center;
        border-bottom: 3px solid #5a75f6;
        box-sizing: border-box;
        color: #5a75f6;
        cursor: pointer;
    }

    .prescription-parent{
        width: 100%;
        height: auto;
        padding: 0 160px;
        box-sizing: border-box;
    }

    .prescription-parent .top-title{
        font-size: 24px;
        text-align: center;
        margin-bottom: 23px;
    }

    .prescription-parent>div{
        border-top: 1px dashed #c0c0c0;
        border-bottom: 1px dashed #c0c0c0;
    }

    .prescription-parent>div+div{
        border-top: 0;
    }

    .prescription-parent-number{
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .prescription-parent-number>span:first-child{
        color: #425997;
        font-size: 14px;
    }

    .prescription-parent-number>span:last-child{
        color: #999999;
        font-size: 14px;
    }

    .prescription-parent-userInfo{
        padding: 20px 0;
        font-size: 16px;
        color: #222222;
    }

    .prescription-parent-userInfo p span+span{
        margin-left: 24px;    
    }

    .prescription-parent-userInfo p+p{
        margin-top: 16px;
    }

    .prescription-parent-userInfo .prescription-parent-rp+.prescription-parent-rp{
        border-top: 1px dashed #c0c0c0;
        padding-top: 20px;
    }

    .prescription-parent-userInfo .prescription-parent-careful{
        color: #425997;
    }

    .prescription-parent-rp{
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .prescription-rp-div{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 16px;
    }

    .prescription-parent-rp .prescription-rp-div>div:first-child{
        width: 260px;
    }

    .prescription-last-docter{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .prescription-docter-par p{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .prescription-docter-par p>span:first-child{
        display: block;
        width: 84px;
    }

    .prescription-docter-par p>span:first-child+span{
        margin: 0;
    }

    .special-span span.special-span-bgImg{
        display: block;
        width: 74px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        color:#ff371d;
        margin: 0;
        background: url('../../assets/images/doctorBk.png') no-repeat;
    }
    
    .btn {
        width: 158px;
        height: 35px;
        border-radius: 35px;
        color: #fff;
        text-align: center;
        border: 0;
        margin-top: 38px;
        cursor: pointer;
    }

    .btn-ok{
        background: #5a75f6;
    }

    .btn-no{
        background: #ff5050;
        margin-left: 19px;
    }
</style>