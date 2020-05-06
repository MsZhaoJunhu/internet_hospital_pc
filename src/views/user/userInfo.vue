<template>
    <div class="userInfo-content">
        <div class="userInfo-title-par">
            <div class="top-back-menu">
                <div :class="activeMenu==1?'activeMenu':''" @click="changeActiveMenu(1)">个人资料</div>
                <div :class="activeMenu==2?'activeMenu':''" @click="changeActiveMenu(2)">头像设置</div>
                <div :class="activeMenu==3?'activeMenu':''" @click="changeActiveMenu(3)">账号信息</div>
                <div :class="activeMenu==4?'activeMenu':''" @click="changeActiveMenu(4)">修改密码</div>
            </div>
            <div class="bottom-back-line"></div>
            <div class="activeLine" :class="activeMenu==1?'activeLine1':activeMenu==2?'activeLine2':activeMenu==3?'activeLine3':'activeLine4'"></div>
        </div>
        <div class="userInfo-par">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.routerFrom = this.$route.params.routerFrom;
    },

    data() {
        return {
            
            activeMenu:1,

            routerFrom: ''

        }
    },
    methods: {
        changeActiveMenu(index){
            this.activeMenu=index
            if(this.routerFrom==='apoRouter'){
                switch (index) {
    
                    case 1:
                        this.$router.push({
                            name:"apoInfo",
                            params: {
                                routerFrom: this.routerFrom
                            }
                        })
                        break;
    
                    case 2:
                        this.$router.push({
                            name:"apoImg",
                            params: {
                                routerFrom: this.routerFrom
                            }
                        })
                        break;
                        
                    case 3:
                        this.$router.push({
                            name:"apoAccountInfo",
                            params: {
                                routerFrom: this.routerFrom
                            }
                        })
                        break;
    
                    case 4:
                        this.$router.push({
                            name:"apoUpdateUser",
                            params: {
                                routerFrom: this.routerFrom
                            }
                        })
                        break;
                        
                    default:
                        break;
                }
            } else {
                switch (index) {
    
                    case 1:
                        this.$router.push({name:"personInfo"})
                        break;
    
                    case 2:
                        this.$router.push({name:"userImg"})
                        break;
                        
                    case 3:
                        this.$router.push({name:"accountInfo"})
                        break;
    
                    case 4:
                        this.$router.push({name:"updateUser"})
                        break;
                        
                    default:
                        break;
                }
            }
        },
    },
    watch: {
        $route() {
            switch (this.$route.name) {

                case 'personInfo':
                    this.activeMenu=1;
                    break;

                case 'userImg':
                    this.activeMenu=2;
                    break;

                case 'accountInfo':
                    this.activeMenu=3;
                    break;

                case 'updateUser':
                    this.activeMenu=4;
                    break;
            
                default:
                    break;
            }
        }
    },
}
</script>
<style scoped>
    .userInfo-content{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 38px 33px 87px 33px;
        background: #fff;
    }

    .userInfo-title-par{
        width: 100%;
        height: 37px;
        position: relative;
    }

    .top-back-menu{
        height: 36px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .top-back-menu div{
        width: 100px;
        height: 100%;
        box-sizing: border-box;
        text-align: center;
        color: #959595;
        cursor: pointer;
    }

    .top-back-menu div.activeMenu{
        color: #5a75f6;
    }

    .top-back-menu div+div{
        margin-left: 15px;
    }

    .activeLine{
        width: 100px;
        height: 3px;
        background: #5a75f6;
        position: absolute;
        z-index: 2;
        bottom: 0;
        transition: all .3s;
    }

    .activeLine1{
        transform: translateX(0px);
    }

    .activeLine2{
        transform: translateX(115px);
    }

    .activeLine3{
        transform: translateX(230px);
    }

    .activeLine4{
        transform: translateX(345px);
    }

    .bottom-back-line{
        width: 100%;
        height: 1px;
        background: #eeeeee;
    }

    .userInfo-par{
        padding: 40px 30px 0 30px;
    }
</style>