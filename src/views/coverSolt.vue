<template>
    <div class="home-content-par">
        
        <div class="main">
            <div class="main-content">
                <div v-if="routerFrom==='waitAudit'" class="main-content-left">
                    <user-fun></user-fun>
                    <div class="more-menu">
                        <el-menu default-active="1" class="el-menu-vertical-demo" @select="selectMenu" :unique-opened="true">
                            <el-menu-item index="1">
                                <div class="menu-icon">
                                    <img src="@/assets/images/homeIcon.png" alt="">
                                </div>
                                <span slot="title">个人首页</span>
                            </el-menu-item>
                            <el-submenu index="2">
                                <template slot="title">
                                    <div class="menu-icon">
                                        <img src="@/assets/images/userSetting.png" alt="">
                                    </div>
                                    <span>账号设置</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="2-1">
                                        个人资料
                                    </el-menu-item>
                                    <el-menu-item index="2-2">
                                        头像设置
                                    </el-menu-item>
                                    <el-menu-item index="2-3">
                                        账号信息
                                    </el-menu-item>
                                    <el-menu-item index="2-4">
                                        修改密码
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title">
                                    <div class="menu-icon">
                                        <img src="@/assets/images/feedBack.png" alt="">
                                    </div>
                                    <span>帮助与反馈</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="3-1">请求帮助</el-menu-item>
                                    <el-menu-item index="3-2">反馈问题</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </div>
                </div>
                <div v-else class="main-content-left">
                    <user-fun></user-fun>
                    <div class="more-menu">
                        <el-menu default-active="1" class="el-menu-vertical-demo" @select="selectMenu" :unique-opened="true">
                            <el-menu-item index="1">
                                <div class="menu-icon">
                                    <img src="@/assets/images/homeIcon.png" alt="">
                                </div>
                                <span slot="title">个人首页</span>
                            </el-menu-item>
                            <el-submenu index="2">
                                <template slot="title">
                                    <div class="menu-icon">
                                        <img src="@/assets/images/userSetting.png" alt="">
                                    </div>
                                    <span>账号设置</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="2-1">
                                        个人资料
                                    </el-menu-item>
                                    <el-menu-item index="2-2">
                                        头像设置
                                    </el-menu-item>
                                    <el-menu-item index="2-3">
                                        账号信息
                                    </el-menu-item>
                                    <el-menu-item index="2-4">
                                        修改密码
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title">
                                    <div class="menu-icon">
                                        <img src="@/assets/images/feedBack.png" alt="">
                                    </div>
                                    <span>帮助与反馈</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="3-1">请求帮助</el-menu-item>
                                    <el-menu-item index="3-2">反馈问题</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </div>
                </div>
                <div class="main-content-right">
                    <router-view></router-view>
                </div>
            </div>
        </div>
       
    </div>
</template>
<script>

import userFun from '@/components/userFun.vue';
export default {
    props:{
        headerBool:{
            type:Boolean,
            default:false
        },

        menuIndex:{
            type:Number,
            default:-1,
        },
    },

    components:{
        userFun,
    },

    data() {
        return {
            menu:[
                {name:"我的接诊",router:"healed"},

                {name:"在线开方",router:"index"},

                {name:"排班管理",router:"index"},

                {name:"我的认证",router:"index"},
            ],

            headImage:"",

            msg:0,

            user:{name:"熊丹"},

            funs:[
                {name:"已接诊",img:require('@/assets/images/reviced.png'),imgActive:require('@/assets/images/revicedA.png'),router:"healed"},

                {name:"正在接诊",img:require('@/assets/images/reviced.png'),imgActive:require('@/assets/images/revicedA.png'),number:3,color:"#ff5050",router:"healing"},
                
                {name:"待接诊",img:require('@/assets/images/revice.png'),imgActive:require('@/assets/images/reviceA.png'),number:2,color:"#46cf98",router:"waitingHeal"},
            ],
            
            funsIndex:0,

            routerFrom: ''
        }
    },
    methods: {

        selectMenu(k) {
            if(this.routerFrom ==="waitAudit") {
                switch (k) {
    
                    case '1':
                        this.$router.push({
                            name:'waitAudit',
                            params: {
                                routerFrom: 'apoRouter'
                            }
                        })
                        break;
    
                    case '2-1':
                        this.$router.push({
                            name:'apoInfo',
                            params: {
                                routerFrom: 'apoRouter'
                            }
                        })
                        break;
    
                    case '2-2':
                        this.$router.push({
                            name:'apoImg',
                            params: {
                                routerFrom: 'apoRouter'
                            }
                        })
                        break;
    
                    case '2-3':
                        this.$router.push({
                            name:'apoAccountInfo',
                            params: {
                                routerFrom: 'apoRouter'
                            }
                        })
                        break;
    
                    case '2-4':
                        this.$router.push({
                            name:'apoUpdateUser',
                            params: {
                                routerFrom: 'apoRouter'
                            }
                        })
                        break;
    
                    default:
                        break;
                }
            }else {
                switch (k) {
    
                    case '1':
                        this.$router.push({name:'index'})
                        break;
    
                    case '2-1':
                        this.$router.push({name:'userInfo'})
                        break;
    
                    case '2-2':
                        this.$router.push({name:'userImg'})
                        break;
    
                    case '2-3':
                        this.$router.push({name:'accountInfo'})
                        break;
    
                    case '2-4':
                        this.$router.push({name:'updateUser'})
                        break;
    
                    default:
                        break;
                }
            }
        },
        
        i(data){
            this.funsIndex=data
        }
    },
    
    created() {
        this.$route.path.indexOf("apoLeftMenu") > -1 ? this.routerFrom='waitAudit':'';
    },
}
</script>
<style scoped>
    .home-content-par{
        overflow: hidden;
   
        box-sizing: border-box;
    }

    .home-content-par>div{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .home-content-par>div>div{
        width: 1200px;
        height: auto;
    }

    .home-content-top{
        background: #5a75f6;
        height: 82px;
        flex-shrink: 0;;
    }

    .home-content-top>div{
        display: flex;
        height: 100% !important;
        justify-content: flex-start;
        align-items: center;
    }

    .home-content-top>div>div{
        height: 100%;
        display: flex;
        align-items: center;
    }

    .home-top-logo{
        margin-right: 80px;
    }

    .home-top-menu{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .home-top-menu a{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 100%;
        color: #f7f7ff;
        font-size: 16px;
    }

    .home-top-menu a.active{
        background: linear-gradient(to bottom,#767dfb,#5b5ffb);
    }

    .home-top-user img{
        margin-right: 20px;
    }

    .home-top-user p{
        color: #ffffff;
        font-size: 16px;
    }

    .home-top-user p a+a::before{
        content: '|';
        margin: 0 4px;
    }

    .main{
        /* min-height:calc(100vh - 82px - 115px) */
        height: 100%;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: flex-start !important;
    }

    .main-content{
        width: 1200px;
        padding: 30px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    
    .more-menu{
        max-height: 450px;
        overflow: auto;
        height: auto;
    }

    /* 设置滚动条的样式 */
    .more-menu::-webkit-scrollbar {
        width: 10px;
    }

    /* 滚动槽 */
    .more-menu::-webkit-scrollbar-track {
        border-radius: 8px;
    }

    /* 滚动条滑块 */
    .more-menu::-webkit-scrollbar-thumb {
        border-radius: 8px;
        border: 2px solid rgba(0, 0, 0, 0);
        box-shadow: 8px 0 0 green inset;
    }

    .more-menu::-webkit-scrollbar-thumb:hover {
        box-shadow: 8px 0 0 #666 inset;
    }

    .more-menu::-webkit-scrollbar-thumb:window-inactive {
        display: none;
    }

    .more-menu::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    .more-menu:hover::-webkit-scrollbar {
        width: 10px;
    }

    .more-menu::-webkit-scrollbar-thumb {
        border-radius: 10px;
        border: 2px solid rgba(131, 131, 131, 0);
        box-shadow: 10px 0 0 rgb(194, 194, 194) inset;
    } 

    .more-menu {
        overflow-y: overlay;
        word-wrap: break-word;
    }

    .more-menu {
        /* margin-left: calc(100vw - 100%); */
    }

    .more-menu /deep/ .el-menu-vertical-demo{
        border: 0;
    }

    .more-menu /deep/ .el-menu-item{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        user-select: none;
    }

    .more-menu /deep/ .el-menu-item.is-active{
        background: #afb4d0;
        color: #ffffff;
    }

    .more-menu /deep/ .el-submenu__title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .more-menu /deep/ .el-menu-item-group ul{
        background: #f9fafe;
    }

    .menu-icon{
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
    }

    .menu-icon img{
        flex-shrink: 0;
    }

    .main-content-left{
        width: 280px;
        height: 700px;
        margin-right: 20px;
        background: #fff;
    }

    .main-content-right{
        width: 900px;
        height: auto;
    }

    .home-bottom-par{
        width: 100%;
        height: 115px;
        background: #e8eff6;
        flex-shrink: 0;
    }
    
    .home-bottom-par div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .home-bottom-par p{
        width: 1200px;
        min-width: 1200px;
        text-align: center;
        font-size: 14px;
        color: #727272;
    }
    
    .home-bottom-par p+p{
        margin-top: 15px;
    }
    
    .home-secend-top{
        width: 100%;
        height: auto;
        background: #fff;
    }
</style>