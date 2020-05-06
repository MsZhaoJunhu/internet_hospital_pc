<template>
    <div class="qtwait-wrap">
        <div class="head">
            <span class="head-text">待确认</span>
            <span class="head-fresh" @click="freshData">刷新</span></div>
        <div class="containt">
            <wait-card :waitingPersonInfo="item" v-for="(item,i) in waitingPersonInfo" :key="i" />
            <!-- <wait-card :waitingPersonInfo="item" v-for="(item,i) in waitingPersonInfo" :key="i"/> -->
        </div>
    </div>
</template>

<script>
    import WaitCard from '../../components/waitingList';
    export default {

        components: {
            WaitCard
        },

        data() {
            return {
                waitingPersonInfo: []
            };
        },

        mounted() {
            this.getData();
        },

        methods: {
            freshData(){
				this.getData();
            },
            
            getData(){
                const that = this;
            
                that.$get('/users/patRegisteredIsPay/findPatientList', {
                    hospId: 1,
                    registeredType: 2,
                    token: localStorage.getItem('token')
                }).then(res => {
                    that.waitingPersonInfo = res.data;
                    that.$store.commit("indexNumber/SET_STATE", {'a':res.data.length});

                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .qtwait-wrap {
        background: #fff;
        /* height: 100%; */
        border-radius: 5px;
        padding: 32px;
    }

    .qtwait-wrap .head {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 16px;

    }

    .qtwait-wrap .head .head-text {
        font-size: 17px;
        color: #353535;
    }

    .qtwait-wrap .head .head-fresh {
        font-size: 15px;
        color: #5a75f6;
        padding-left: 24px;
        background: url("../../assets/images/fresh.png") no-repeat left;
        background-size: 16px 16px;
        line-height: 24px;
        cursor: pointer;
    }

    .containt {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 36px;
    }
</style>