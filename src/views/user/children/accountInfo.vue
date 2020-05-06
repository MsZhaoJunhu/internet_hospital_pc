<template>
    <div class="accountInfo">
        <div>
            <div>账号</div>
            <span>{{this.$store.state.Info.username}}</span>
        </div>
        <div>
            <div>绑定手机号</div>
            <span>{{this.$store.state.Info.mobile}}</span>
        </div>
        <!-- <div>
            <div>邮箱地址</div>
            <span>378104066@qq.com</span>
        </div> -->
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .accountInfo>div{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .accountInfo>div>div:first-child{
        width: 90px;
        text-align-last: justify;
    }

    .accountInfo>div+div{
        margin-top: 54px;
    }

    .accountInfo span{
        display: block;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    
    .accountInfo span::before{
        content: ':';
        display: block;
        margin-right: 25px;
    }
</style>