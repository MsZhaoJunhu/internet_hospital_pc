<template>
    <div class="online-function-parent">
        <div class="online-function-title">
            <img :src="onlineFun.img"  class="displayBlock">
            <img src="@/assets/images/onlineActive.png" class="displayNone">
            <span :style="{color:onlineFun.color}">{{onlineFun.title}}</span>
        </div>
        <div class="online-function-content" :style="{padding:onlineFun.padding}">
            <div v-for="(item,i) in onlineFun.theme" :key="i">
                <p>
                    <span class="spanNumber" :style="{color:item.color}">{{item.number}}</span>
                    <span class="spanUnit">{{item.unit}}</span>
                </p>
                <p>
                    <span class="spanName">{{item.name}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            onlineFun:{
                type:Object,
                default(){
                    return {}
                }
            },
        },

        data () {
            return {
                
            }
        },
        
        methods: {
            
        },
    }
</script>
<style scoped>
    .online-function-parent{
        width: 100%;
        height: 158px;
        border: 1px solid #ececec;
        box-sizing: border-box;
        cursor: pointer;
    }

    .online-function-parent:hover{
        background: linear-gradient(to bottom,#7095fe,#5a75f6);
        border-color: #647fff;
    }

    .online-function-parent:hover .online-function-title span{
        color: #ffffff !important;
    }

    .online-function-parent:hover .displayNone{
        display: block;
    }

    .online-function-parent:hover .displayBlock{
        display: none;
    }

    .online-function-parent:hover .spanUnit{
        color: #eeeeee;
    }

    .online-function-parent:hover .spanName{
        color: #d8d6f2;
    }

    .online-function-parent:hover  .online-function-title{
        border-color: #8499fb;
    }

    .online-function-title{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        border-bottom: 1px solid #eeeeee;
        margin: 0 16px;
    }

    .online-function-title span{
        margin-left: 8px;
        font-size: 18px;
    }

    .online-function-content{
        height: 107px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .online-function-content p{
        text-align: center;
    }
    
    .spanName{
        color: #5a5a5a;
    }

    .spanUnit{
        color: #999999;
        margin-left: 15px;
    }

    .spanNumber{
        font-size: 34px;
    }

    .displayNone{
        display: none;
    }

</style>