<template>
    <div class="heal-list-par">
        <div class="heal-person-info">
            <img :src="personInfo.headImage" v-if="personInfo.headImage">
            <img src="../assets/images/perImg.png" v-else>
            <div class="heal-info">
                <p>
                    <span>{{personInfo.realName || '姓名'}}</span>
                    <span>{{personInfo.age || '18'}}</span>
                    <span>{{personInfo.sexName || '性别'}}</span>
                </p>
                <span class="date">{{infoData}}</span>
                <span class="time">{{infoTime}}</span>
            </div>
        </div>
        <div class="heal-msg">
            <div class="person-msg">
                病人主诉：<span class="text">{{personInfo.illnessDescription || "没有内容..."}}</span>
            </div>
            <div class="doctor-msg">
                诊断意见：{{personInfo.preliminaryDiagnosis || "没有内容..."}}
            </div>
        </div>
        <div class="heal-person-check">
            <button @click="check(personInfo.id,personInfo)">查看处方</button>
            <button @click="chatmsg(personInfo.id)">沟通记录</button>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        personInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.infoData = this.formatDate(this.personInfo.createdTime);
            this.infoTime = this.formatTime(this.personInfo.startTime) + " - " 
                            + this.formatTime(this.personInfo.endTime);
        })
    },

    data() {
        return {
            infoData: "yyyy-nn-dd",
            infoTime: "00: 00 - 00: 00"
        }
    },

    methods: {
        check(id,item){
            
            // Id:that.$route.query.id,
            // orderNo:that.$route.query.orderNo,
            // prescribeNo:that.$route.query.prescribeNo,
            console.log(item)
            this.$router.push({
                name:"checkPrescription",
                query: {
                    id: id,
                    orderNo:item.orderNo,
                    // prescribeNo:''
                }
            })
        },

        chatmsg(id) {
            // this.$router.push({
            //     name: "chat",
            //     params: {
            //         id: id
            //     }
            // })
            this.$message.error('暂不支持查看历史记录!')        
        },

        formatTime(time) {
            if(time) {
                var ftime = new Date(time);
                return (ftime.getHours()<10 ? ('0'+ftime.getHours()):ftime.getHours())
                + ": " + 
                (ftime.getMinutes()<10 ? ('0'+ftime.getMinutes()):ftime.getMinutes())
            } else {
                return "00: 00"
            }
        },
        formatDate(date) {
            if(date) {
                var fdate = new Date(date);
                return fdate.getFullYear() +
                            "-" + (fdate.getMonth() < 10 ? ('0'+ (fdate.getMonth() - -1)) : (fdate.getMonth() - -1)) +
                            "-" + (fdate.getDate() < 10 ? ('0'+ fdate.getDate()) : fdate.getDate());
            } else {
                return '0000-00-00';
            }
        }
        
    },
}
</script>
<style scoped>
    .heal-list-par{
        width: 100%;
        /* height: 95px; */
        background: #fafbfd;
        box-sizing: border-box;
        border: 1px solid #e4edff;
        display: flex;
        border-radius: 5px;
    }

    .heal-list-par>div:first-child{
        border-left: 5px solid #fafbfd;
    }

    .heal-list-par>div+div{
        border-left: 1px solid #e4edff;
    }

    .heal-person-info{
        width: 210px;
        padding: 20px 16px 20px 16px; 
        box-sizing: border-box;
        display: flex;
        justify-content: center;
    }

    .heal-person-info img{
        margin-right: 12px;
        flex-shrink: 0;
        width: 51px;
        height: 51px;

    }

    .heal-info{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .heal-info span{
        font-size: 16px;
        color: #9f9f9f;
        line-height: 30px;
    }

    .heal-info p{
        margin: 4px 0;
    }

    .heal-info p span{
        color: #353535;
    }

    .heal-info p span+span{
        margin-left: 10px;
    }
    .heal-info .data-time {
        display: flex;
        flex-wrap: wrap;
    }
    .heal-info .data-time span {
        font-size: 12px;
    }
    .heal-msg{
        width: 495px;
        /* padding: 28px 24px 26px 15px; */
        box-sizing: border-box;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 14px;
        color: #353535;
        line-height: 26px;
    }
    .heal-msg .text {
        color: #787879;
    }
    .heal-msg .person-msg {
        /* height: 84px; */
        padding: 20px 24px 20px 15px;
        display: flex;
        align-items: center;
    }

    .heal-msg .doctor-msg {
        border-top: 1px solid #e4edff;
        /* height: 55px; */
        padding: 20px 24px 20px 15px;
        display: flex;
        align-items: center;
    }

    .heal-person-check{
        width: 128px;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
    }
    
    .heal-person-check button{
        width: 75px;
        height: 29px;
        background: #39bef9;
        color: #fff;
        line-height: 29px;
        text-align: center;
        border: 0;
        border-radius: 3px;
        font-size: 14px;
        cursor: pointer;
        outline: none;
    }
    .heal-person-check button:last-child {
        margin-top: 8px;
    }

    .heal-list-par:hover{
        border-color: #aab6ef;
    }

    .heal-list-par:hover>div+div{
        border-color: #aab6ef;
    }

    .heal-list-par:hover>div:first-child{
        border-left: 5px solid #5a75f6;
    }
</style>