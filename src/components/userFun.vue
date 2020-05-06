<template>
    <div class="user-function">
        <div class="user-info-par">
            <div class="user-info">
                <div class="user-info-img">
                    <!-- that.$store.state.Info.headImage -->
                    <img :src="this.$store.state.Info.headImage||'../assets/images/userImg.png'" alt="">
                </div>
                <p class="user-name">{{this.$store.state.Info.realName||'暂无'}}</p>
                <p class="user-isBool">
                    <span v-show="this.$store.state.Info.list[0]">{{this.$store.state.Info.list[0].titleName}}</span>
                    <span v-show="!this.$store.state.Info.list[0]">暂无</span>
                    <router-link to="/" v-show="isBool">已认证</router-link>
                    <router-link to="/" v-show="!isBool">未认证</router-link>
                </p>
                <p class="user-details">
                    <span v-show="this.$store.state.Info.list[0]">{{this.$store.state.Info.list[0].hospitalName}}</span>
                    <span v-show="!this.$store.state.Info.list[0]">暂无</span>
                    <span>{{this.$store.state.Info.list[0].deptName||'暂无'}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isBool:true
        }
    },
}
</script>
<style scoped>
    .user-function{
        width: 100%;
        height: auto;
    }

    .user-info-par{
        width: 100%;
        height: auto;
        padding: 30px;
        box-sizing: border-box;
    }

    .user-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .user-info div{
        margin-bottom: 14px;
    }

    .user-info p{
        user-select: none;
    }

    .user-info p+p{
        margin-top: 10px;
    }

    .user-info-img{
        width: 86px;
        height: 86px;
        border-radius: 50%;
        overflow: hidden;
    }

    .user-info-img img{
        width: 86px;
        border-radius: 50%;
    }

    .user-name{
        font-size: 22px;
        color: #353535;
    }

    .user-isBool{
        font-size: 16px;
        color: #5a5a5a;
    }

    .user-isBool a{
        color: #6981f7;
    }

    .user-isBool span{
        margin-right: 12px;
    }

    .user-details{
        font-size: 15px;
        color: #5a5a5a;
    }
    
    .user-details span:last-child{
        color: #353535;
        margin-left: 9px;
    }
</style>