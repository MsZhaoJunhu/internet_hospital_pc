<template>
    <div class="header-myHeal">
        <div v-for="(item,i) in funs" :key="i" @click="sendI(i,item.router)" :class="funsIndex==i?'active':''">
            <img :src="item.img" alt="">
            <img :src="item.imgActive" alt="">
            <span>{{item.name}}</span>
            <i :style="{background:item.color}" v-show="item.numberStr=='a'&&$store.state.indexNumber.a>0">{{$store.state.indexNumber.a}}</i>
            <i :style="{background:item.color}" v-show="item.numberStr=='b'&&$store.state.indexNumber.b>0">{{$store.state.indexNumber.b}}</i>
            <i :style="{background:item.color}" v-show="item.numberStr=='c'&&$store.state.indexNumber.c>0">{{$store.state.indexNumber.c}}</i>
            <i :style="{background:item.color}" v-show="item.numberStr=='d'&&$store.state.indexNumber.d>0">{{$store.state.indexNumber.d}}</i>
            <i :style="{background:item.color}" v-show="item.numberStr=='e'&&$store.state.indexNumber.e>0">{{$store.state.indexNumber.e}}</i>
            <!-- <i :style="{background:item.color}" v-show="item.numberStr=='f'&&$store.state.indexNumber.f>0">{{$store.state.indexNumber.f}}</i>
            <i :style="{background:item.color}" v-show="item.numberStr=='g'&&$store.state.indexNumber.g>0">{{$store.state.indexNumber.g}}</i> -->
        </div>
    </div>
</template>
<script>
export default {
    props:{
        funs:{
            type:Array,
            default(){
                return []
            }
        },
        
        funsIndex:{
            type:Number,
            default:0,
        }
    },

    data() {
        return {
            
        }
    },
    
    methods: {
        sendI(i,r){
            this.$emit('i',i)
            this.$router.push({name:r})
        }
    },
}
</script>
<style scoped>
    .header-myHeal{
        height: 78px !important;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header-myHeal>div{
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .header-myHeal .active{
        color: #5a75f6;
    }

    .header-myHeal>div+div{
        margin-left: 64px;
    }

    .header-myHeal>div>img{
        margin-right: 16px;
    }

    .header-myHeal>div>img:nth-child(2){
        display: none;
    }

    .header-myHeal>div.active>img:nth-child(2){
        display: block;
    }

    .header-myHeal>div.active>img:first-child{
        display: none;
    }
    
    .header-myHeal>div i{
        font-style: normal;
        margin-left: 3px;
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 8px;
        font-size: 12px;
        text-align: center;
        line-height: 16px;
        color: #fff;
        transform: translateY(-8px);
    }
</style>