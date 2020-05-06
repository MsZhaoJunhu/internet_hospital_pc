<template>
    <div class="waiting-list-par">
        <div class="waiting-list-top">
            <span>{{waitingPersonInfo.time}}</span>
        </div>
        <div class="waiting-list-content">
            <div class="waiting-content-top">
                <img :src="waitingPersonInfo.img" v-if="waitingPersonInfo.img || waitingPersonInfo.headImage" />
                <img src="@/assets/images/perImg.png" v-if="!waitingPersonInfo.img || waitingPersonInfo.headImage" />
                <span>{{waitingPersonInfo.name || waitingPersonInfo.realName ||'姓名'}}</span>
                <span>{{waitingPersonInfo.age||'年龄'}}</span>
                <span>{{waitingPersonInfo.gender || 
                    waitingPersonInfo.sex=='1'?"男"
                    :waitingPersonInfo.sex=='0'?"女"
                    :waitingPersonInfo.sex=='2'?"保密"
                    :waitingPersonInfo.sex ||'性别'}}</span>
            </div>
            <div class="waiting-content-middle">{{waitingPersonInfo.msg || waitingPersonInfo.illnessDescription ||'暂无描述'}}</div>
            <div class="wait-conent-img" v-if="waitingPersonInfo.imgs">
                <img v-for="(items,k) in waitingPersonInfo.imgs || waitingPersonInfo.illnessImage" v-show="k < 3" :src="items" :key="k" />
            </div>
            <div class="waiting-content" v-if="waitingHeal">
                <div class="waiting-content-bottom waiting-content-f">
                    <button @click="healpaition">接诊</button>
                </div>
                <div class="waiting-content-bottom waiting-content-s">
                    <button @click="cancle">取消</button>
                </div>
            </div>
            <div class="waiting-content" v-else>
                <div class="waiting-content-bottom waiting-content-f">
                    <button @click="accepthander(waitingPersonInfo)">接受</button>
                </div>
                <div class="waiting-content-bottom waiting-content-s">
                    <button @click="refusehander(waitingPersonInfo.orderNo)">拒绝</button>
                </div>
            </div>
        </div>
        
        <el-dialog title="请选择您拒绝的理由" :visible.sync="dialogVisible" width="50%">
            <div class="dialog-content">
                <p><span @click.stop="changetextarea">这是一段信息1</span></p>
                <p><span @click.stop="changetextarea">这是一段信息2</span></p>
                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="makesurRefuse(waitingPersonInfo.orderNo)"
                    :disabled="textarea?false:true">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>
<script>
    export default {
        props: {

            registeredType: {
                type: Number
            },

            waitingPersonInfo: {
                type: Object,
                default() {
                    return {};
                }
            },

            waitingHeal: {
                type: Boolean
            }

        },
        data() {
            return {
                dialogVisible: false,

                textarea: ''
            };
        },

        methods: {

            refusehander(orderNo) {
                this.dialogVisible = true;
            },

            makesurRefuse(orderNo) {
                this.dialogVisible = false;
                this.$get('/users/patRegisteredIsPay/refusedPatient', {
                    orderNo: orderNo,
                    cause: this.textarea,
                    token: localStorage.getItem('token')
                }).then(res => {
                    this.$get('/wx/callback/orderRefund', {
                        orderNo: orderNo
                    }).then(res => {
                        console.log(res);
                    }).catch(e => {
                        console.log(e);
                    })
                }).then(res => {
                    this.$message.success("已拒绝患者");
                    this.$emit('fresh');
                }).catch(e => {
                    console.log(e);
                })
            },
            healpaition() {
                this.$emit("healpaition", this.waitingPersonInfo.orderNo);
            },
            cancle() {
                 this.$emit("cancle", this.waitingPersonInfo.orderNo);
            },
            changetextarea(e) {
                this.textarea = e.toElement.innerText;
                var nodeP = e.target.parentNode;
                var ischoose = nodeP.getAttribute("class");
                if (!ischoose) {
                    nodeP.setAttribute("class", "reson-list");
                } else {
                    nodeP.setAttribute("class", "");
                }
            },

            accepthander(waitingPersonInfo) {
                var _this = this;
                this.$get('/users/patRegisteredIsPay/acceptPatient', {
                    orderNo: this.waitingPersonInfo.orderNo,
                    token: localStorage.getItem('token')
                }).then(res => {
                    _this.$router.push({
                        name: 'chat',
                        params: waitingPersonInfo
                    })
                    this.$emit('fresh');
                }).catch(e => {
                    console.log(e);
                });
            }
        },
    };
</script>
<style scoped>
    .waiting-list-par {
        width: 396px;
        border: 1px solid #dfe5f6;
        border-radius: 5px;
        box-sizing: border-box;
    }

    .waiting-list-top {
        padding: 12px 20px 13px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f3f6ff;
        border-bottom: 1px solid #dfe5f6;
        box-sizing: border-box;
    }

    .waiting-list-top>span:first-child {
        font-size: 12px;
        color: #353535;
    }

    .waiting-list-top>span:last-child {
        font-size: 16px;
        color: #5a75f6;
    }

    .waiting-list-content {
        padding: 15px 22px 17px 23px;
    }

    .waiting-content-top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .waiting-content-top img {
        margin-right: 8px;
        flex-shrink: 0;
    }

    .waiting-content-top>span {
        font-size: 16px;
        color: #353535;
    }

    .waiting-content-top span:nth-child(2) {
        margin-right: 15px;
    }

    .waiting-content-top span:nth-child(3) {
        margin-right: 14px;
    }

    .waiting-content-middle {
        margin-top: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 14px;
        color: #797979;
    }

    .waiting-content {
        margin-top: 18px;
        display: flex;
        justify-content: space-between;
    }

    .waiting-content-bottom button {
        width: 159px;
        height: 35px;
        border: 0;
        border-radius: 35px;
        color: #fff;
        text-align: center;
        line-height: 35px;
        font-size: 16px;
        cursor: pointer;
    }

    .waiting-content-f button {
        background: #5a75f6;
    }

    .waiting-content-s button {
        background: #afb4d0;
    }

    .wait-conent-img {
        margin-top: 15px;
    }

    .wait-conent-img img {
        width: 30%;
        height: 90px;
        margin-right: 5%;
    }

    .wait-conent-img img:last-child {
        margin-right: 0;
    }

    .dialog-content {
        font-size: 18px;
    }

    .dialog-content p {
        padding-bottom: 20px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
    }

    .dialog-content .reson-list {
        color: #5a75f6;
    }
    .dialog-content .reson-list::after  {
        content: "";
        display: inline-block;
        background: url("../assets/images/sure.png");
        width: 20px;
        height: 14px;
    }

    .waiting-list-par /deep/ .el-dialog__title {
        color: #5a75f6;
    }
</style>