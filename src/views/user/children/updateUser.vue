<template>
    <div class="update-user-info">
        <div>
            <div>原密码</div>
            <div class="beforInput">
                <input type="password" v-model="oldPassword">
            </div>
        </div>
        <div>
            <div>新密码</div>
            <div class="beforInput">
                <input type="password" v-model="newPassword1">
            </div>
        </div>
        <div>
            <div>确认密码</div>
            <div class="beforInput">
                <input type="password" v-model="newPassword2">
            </div>
        </div>
        <div class="btn-par">
            <div></div>
            <div class="beforInput">
                <button class="update-btn" @click="updatePassword">
                    <span>修改</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
    data() {
        return {
            oldPassword:"",

            newPassword1:"",

            newPassword2:"",

            routerFrom: ''
        }
    },

    mounted() {
        this.routerFrom = this.$route.params.routerFrom
    },

    methods: {
        updatePassword(){

            const that = this;

            console.log(that.$store.state.Info)

            if(that.oldPassword==''||that.newPassword1==''||that.newPassword2==''){
                that.$message.error('您尚有必要信息未填写!请填写后再试!')
                return ;
            }else if(that.newPassword1!==that.newPassword2){
                that.$message.error('两次密码输入不一致!请重新输入')
                that.newPassword1='';
                that.newPassword2='';
                return ;
            }else{
                that.$post("/users/doctUser/updatePassword", {
                    mobile:that.$store.state.Info.mobile,
                    password:that.newPassword2,
                }).then(function(res) {
                    if (res.code == 200) {
                        that.$message({
                            message: res.message,
                            type: 'success'
                        });
                    } else {
                        that.$message.error('暂不支持修改密码');
                    }
                }).catch(function(res) {
                    // 请求失败处理
                    console.log(res);
                    that.$message.error('暂不支持修改密码');
                });
            }
            
        }
    }
    
}
</script>
<style scoped>
    .update-user-info>div{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .update-user-info>div+div{
        margin-top: 32px;
    }

    .update-user-info>div>div:first-child{
        width: 82px;
        text-align-last: justify;
    }

    .update-user-info .beforInput{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .update-user-info .beforInput::before{
        content: ':';
        display: block;
        margin-right: 16px;
    }

    .update-user-info input{
        width: 282px;
        height: 37px;
        border: 1px solid #e0e0e0;
        background: #eceef7;
        padding-left: 18px;
        outline: none;
    }

    .update-user-info input:focus{
        background: rgb(245, 245, 245)
    }

    .update-btn{
        width: 282px;
        height: 37px;
        border-radius: 37px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #5a75f6;
        border: 0;
        cursor: pointer;
    }

    .btn-par .beforInput::before{
        content: ' ';
    }
    
    .update-btn span{
        width: 70px;
        display: block;
        text-align-last: justify;
        color: #fff;
    }
</style>