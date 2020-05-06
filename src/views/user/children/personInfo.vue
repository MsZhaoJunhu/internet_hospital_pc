<template>
    <div class="userInfo-all-par">
        <div class="div-img">
            <div class="userInfo-title">头像</div>
            <div>
                <img src="@/assets/images/userImg.png" v-show="!userInfo.headImage" alt="">
                <img :src="userInfo.headImage" v-show="userInfo.headImage" style="width: 86px;" alt="">
            </div>
        </div>
        <div>
            <div class="userInfo-title">登录名</div>
            <span>{{userInfo.mobile}}</span>
        </div>
        <div>
            <div class="userInfo-title">真实姓名</div>
            <span>{{userInfo.realName}}</span>
        </div>
        <div>
            <div class="userInfo-title">行政职称</div>
            <span v-for="(item,i) in userInfo.list">{{item.titleName}}</span>
        </div>
        <div class="div-img">
            <div class="userInfo-title">资格证明</div>
            <div>
                <img src="@/assets/images/userZM.png" alt="">
            </div>
        </div>
        <div>
            <div class="userInfo-title">性别</div>
            <template>
                <el-radio v-model="radio" label=1>男</el-radio>
                <el-radio v-model="radio" label=2>女</el-radio>
            </template>
        </div>
        <div>
            <div class="userInfo-title">执业点</div>
            <p>
                <span v-for="(item,i) in userInfo.list">{{item.hospitalName}}</span>
            </p>
        </div>
        <div v-if="routerFrom!=='apoRouter'" class="userInfo-textarea">
            <div class="userInfo-title">擅长</div>
            <el-input type="textarea" placeholder="最多可以输入2000字，您还可以输入2000字" :rows="4" v-model="goodAt" maxlength="2000" show-word-limit></el-input>
        </div>
        <div class="userInfo-textarea">
            <div class="userInfo-title">简介</div>
            <el-input type="textarea" placeholder="最多可以输入2000字，您还可以输入2000字" :rows="4" v-model="introduce" maxlength="2000" show-word-limit></el-input>
        </div>
        <div class="userInfo-btn">
            <button @click="updateUserInfo">
                <span>更新</span>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    mounted () {

        this.userInfo=this.$store.state.Info

        this.radio=this.$store.state.Info.sex+''

        this.introduce=this.$store.state.Info.introduce

        this.goodAt=this.$store.state.Info.goodAt

        this.routerFrom = this.$route.params.routerFrom

        console.log(this.$store.state.Info)
        
    },
    data() {
        return {
            userInfo:{},

            introduce:'',

            goodAt:"",

            radio: '1',

            routerFrom: ''
        }
    },

    methods: {
        updateUserInfo(){
            const that = this;
            if (this.routerFrom === 'apoRouter') {
                this.$post('/users/hospPharmacist/updateInfo', {
                    id: that.$store.state.Info.id,
                    sex: that.radio,
                    introduce:that.introduce,
                }).then(res => {
                    console.log(res);
                    if(res.code == 200) {
                        that.$message({
                            message: res.message,
                            type: 'success'
                        });
                    } else {
                        that.$message.error({
                            message: res.message,
                        });
                    }
                }).catch(e => {
                    console.log(e);
                })
            } else {
                that.$post("/users/doctUser/doUpdate", {
                    id:that.$store.state.Info.id,
                    introduce:that.introduce,
                    goodAt:that.goodAt,
                    sex:that.radio,
                }).then(function(res) {
                    if (res.code == 200) {
                        that.$message({
                            message: res.message,
                            type: 'success'
                        });
                    } else {
                        that.$message.error({
                            message: res.message,
                        });
                    }
                }).catch(function(res) {
                    // 请求失败处理
                    console.log(res);
                });
            }
        }
    }

}
</script>
<style scoped>
    .userInfo-all-par>div{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .userInfo-all-par>div+div{
        margin-top: 50px;
    }

    .userInfo-all-par .userInfo-textarea{
        align-items: flex-start;
    }

    .userInfo-all-par .userInfo-textarea /deep/ .el-textarea{
        align-items: flex-start;
    }

    .userInfo-all-par .userInfo-textarea /deep/ textarea{
        border-radius: 0;
    }

    .userInfo-title{
        width: 70px;
        height: 100%;
        text-align-last: justify;
    }

    .userInfo-title+*::before{
        content: ':';
        margin-right: 35px;
        height: 100%;
    }

    .userInfo-title+div{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .userInfo-btn button{
        width: 290px;
        height: 46px;
        border-radius: 23px;
        background: #5a75f6;
        border: 0;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    
    .userInfo-btn span{
        display: block;
        width: 70px;
        text-align-last: justify;
        color: #fff;
        font-size: 18px;
    }
</style>