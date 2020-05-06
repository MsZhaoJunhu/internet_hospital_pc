<template>
    <div class="my-heal-content">
        <div class="my-heal-top">
            <div class="myheal-top-left">
                <span>待接诊</span>
            </div>
            <div class="myheal-top-right">
                <div>
                    <div class="refresh-par" @click="freshData">
                        <img src="@/assets/images/ref.png" alt />
                        <span>刷新</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-waiting-list">
            <waiting-list waitingHeal @healpaition="healed" @cancle="cancel" :waitingPersonInfo="item" v-for="(item,i) in waitingPersonInfo" :key="i"></waiting-list>
        </div>
    </div>
</template>
<script>
    import waitingList from "@/components/waitingList";
    export default {
        components: {
            waitingList
        },
        created () {

            this.getPatientWatingList();

        },
        methods: {
            freshData(){
				this.getData();
            },

            getPatientWatingList() {
                const that = this;
                that.$get('/patRegisteredWatingDiagnosis/findWatingPatientList', {
                    hospId: 1
                }).then(res => {
                    if(res.code==='200'){
                        that.waitingPersonInfo = res.data;
                        that.$store.commit("indexNumber/SET_STATE", {'e':res.data.length});
                    }
                })
            },

            cancel(orderNo) {
                const that = this;
                that.$get('/patRegisteredWatingDiagnosis/watingList/Choose', {
                    chooseType: 2,
                    orderNo: orderNo
                }).then(res => {
                    that.getPatientWatingList();
                    // this.$router.push({
                    //     name: 'chat',
                    //     params: res
                    // })
                }).catch(e => {
                    console.log(e)
                });
            },

            healed(orderNo) {
                this.$get('/patRegisteredWatingDiagnosis/watingList/Choose', {
                    chooseType: 1,
                    orderNo: orderNo
                }).then(res => {
                    this.$router.push({
                        name: 'mychat',
                        params: orderNo
                    })
                }).catch(e => {
                    console.log(e);
                })
            },
            
        },

        data() {
            return {
                waitingPersonInfo: []
            };
        },
    };
</script>
<style scoped>
    .my-heal-content {
        background: #fff;
        padding: 32px;
    }

    .my-heal-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 18px;
        border-bottom: 1px solid #eeeeee;
        margin-bottom: 35px;
    }

    .myheal-top-left>span {
        font-size: 17px;
        color: #353535;
    }

    .myheal-top-right>div {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .heal-type {
        width: 164px;
        height: 33px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .heal-type-bom {
        position: absolute;
        width: 72px;
        height: 3px !important;
        background: #5a75f6;
        transition: all 0.5s;
        bottom: 0;
    }

    .heal-type-bom.active2 {
        transform: translateX(92px);
    }

    .heal-type>div {
        width: 72px;
        height: 100%;
        font-size: 16px;
        color: #5a5a5a;
        text-align: center;
        box-sizing: border-box;
    }

    .heal-type>div.active {
        color: #5a75f6;
    }

    .myheal-top-right>div span {
        font-size: 16px;
        margin-right: 15px;
    }

    .myheal-top-right>div /deep/ .el-input,
    .myheal-top-right>div /deep/ .el-input__inner {
        width: 178px;
        height: 33px;
    }

    .myheal-top-right>div /deep/ .el-input__icon {
        line-height: 33px;
    }

    .myheal-top-right>div /deep/ .el-input+.el-input {
        margin-left: 12px;
        margin-right: 25px;
    }

    .my-heal-list>div+div {
        margin-top: 16px;
    }

    .my-heal-paging {
        padding-top: 50px;
    }

    .my-heal-paging /deep/ .number {
        width: 37px;
        height: 37px;
        border-radius: 50% !important;
        line-height: 37px;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        border: 1px solid #dfe5f6;
        background-color: #fff !important;
        color: #989898 !important;
        font-size: 14px;
    }

    .my-heal-paging /deep/ .el-pagination {
        margin: 0;
        padding: 0;
    }

    .my-heal-paging /deep/ .number.active {
        color: #fff !important;
        background-color: #5a75f6 !important;
    }

    .my-heal-paging /deep/ .btn-next {
        width: 80px;
        height: 37px;
        border-radius: 37px;
        font-size: 16px;
        color: #989898;
        border: 1px solid #dfe5f6;
        background-color: #fff;
    }

    .refresh-par {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
    }

    .refresh-par img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
    }

    .myheal-top-right .refresh-par span {
        font-size: 14px;
        color: #5a75f6;
        margin: 0;
    }

    .my-waiting-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }

    .my-waiting-list>.waiting-list-par:nth-child(even) {
        margin-left: 44px;
    }

    .my-waiting-list>.waiting-list-par:nth-child(n + 3) {
        margin-top: 16px;
    }
</style>