<template>
  <div class="qtwait-wrap">
    <div class="head">
      <span class="head-text">审核不通过原因</span>
      <a href="javascript:history.back();" class="head-fresh">返回</a>
    </div>
    <div class="containt">
      <div class="remind">注：选择不通过原因时 - 可多选、可手动填写</div>

      <div class="reason">
        <div class="rea-choose" v-for="(item,i) in reaChooseItems" :key="i">
          <input type="checkbox" v-model="reaChoose" :value="item" :id="i" />
          <label :for="i">{{item}}</label>
        </div>
        <textarea class="rea-write" placeholder="请输入审核不通过的原因" v-model="resWrited" />
        <div @click="postResult" class="rea-commit">提交结果</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        postResult() {
            this.$post('/doctPrescript/audit', {
                auditResult: this.reaChoose.join(',') + this.resWrited,
                auditStatus: 3,
                id: this.id
            }).then(res => {
                console.log(res);
                this.$message.success("提交成功");
                this.$router.push({
                    name: 'auditedStatus',
                    params: {
                        id: this.id,
                        prescribeNo: this.prescribeNo
                    }
                })
            }).catch(e => {
                console.log(e);
                this.$message.error("提交失败");
            })
        }
    },
    data() {
        return {
            form: {},
            reaChooseItems: [
                "开具麻醉药品",
                "处方用药与临床诊断的相符性",
                "剂量、用法的正确性",
                "选用剂型与给药途径的合理性",
                "有重复给药现象",
                "有潜在临床意义的药物相互作用和配伍禁忌"
            ],
            resWrited: "",
            reaChoose: [],
            id: this.$route.params.id,
            prescribeNo: this.$route.params.prescribeNo
        };
    }
};
</script>

<style scoped>
.qtwait-wrap {
  background: #fff;
  /* height: 100%; */
  border-radius: 5px;
  padding: 37px 33px;
}

.qtwait-wrap .head {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 19px;
}

.qtwait-wrap .head .head-text {
  font-size: 18px;
  color: #353535;
}

.qtwait-wrap .head .head-fresh {
  font-size: 15px;
  color: #5a75f6;
  padding-left: 24px;
  line-height: 24px;
  cursor: pointer;
}

.containt {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 36px;
}

.containt .remind {
  height: 50px;
  background: rgba(207, 0, 0, 0.07);
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
  color: #cf0000;
  line-height: 50px;
  text-align: center;
  margin-bottom: 29px;
}
.containt .reason .rea-choose {
  height: 50px;
  border: 1px solid #efefef;
  margin-bottom: 8px;
  display: flex;
  padding-left: 20px;
}
.containt .reason .rea-choose input {
  width: 23px;
  height: 23px;
  background: #fff;
}
.containt .reason .rea-write {
  height: 91px;
  padding: 18px 20px;
}
.containt .reason .rea-choose,
.containt .reason .rea-write {
  box-sizing: border-box;
  border-radius: 5px;
  align-items: center;
  width: 590px;
  color: #353535;
  font-size: 16px;
}

.containt .reason .rea-choose input {
  margin-right: 15px;
}

.rea-commit {
  width: 158px;
  height: 35px;
  background-color: #5a75f6;
  border-radius: 18px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  margin-top: 19px;
  margin-left: 50px;
  cursor: pointer;
}
</style>