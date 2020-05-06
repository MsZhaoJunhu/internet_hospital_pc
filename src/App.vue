<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
    export default {
        created() {
            
            const that = this;
                
			if(localStorage.getItem('token')!=null){
                that.$get('/users/doctUser/doSelect',{
                    hospId:localStorage.getItem('hospId'),
                    token:localStorage.getItem('token')
                }).then(res => {
                    that.$store.commit("Info/SET_STATE", res.data);
                }).catch(err => {
                    console.log(err)
                })
			}
        },

        mounted () {
            
            const that = this;
                
			if(localStorage.getItem('token')!=null){
                that.$get('/users/doctUser/doSelect',{
                    hospId:localStorage.getItem('hospId'),
                    token:localStorage.getItem('token')
                }).then(res => {
                    that.$store.commit("Info/SET_STATE", res.data);
                }).catch(err => {
                    console.log(err)
                })
			}
        }
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        user-select: none;
        outline: none;
        font-family: "Microsoft YaHei" !important;
    }

    a {
        text-decoration: none;
        color: #000;
    }
</style>