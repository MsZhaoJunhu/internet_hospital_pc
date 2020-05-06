<template>
    <div class="change-user-img">
        <p>添加或更改你的头像</p>
        <p>从电脑中选择一项你的照片上传，仅支持JPEG\GIF或PNG图片文件，且大小不超过2M。</p>
        <div class="all-upload-img">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div v-else class="noUploadImg">
                    <img src="@/assets/images/uploadImg.png" alt="">
                    <p style="margin-top:30px;">请选择上传图片</p>
                </div>
            </el-upload>
        </div>
        <button class="btn-upload" @click="updateUserInfo">
            <span>上传</span>
        </button>
    </div>
</template>
<script>
export default {

    mounted () {

        this.imageUrl=this.$store.state.Info.headImage

        this.routerFrom = this.$route.params.routerFrom

    },

    data() {
        return {

            imageUrl: '',

            imgType:['image/jpeg','image/jpg','image/png'],

            routerFrom: ''

        }
    },

    methods: {

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },

        beforeAvatarUpload(file) {

            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!file.type==='image/jpeg'||!file.type==='image/jpg'||!file.type==='image/png') {
                this.$message.error('上传头像图片只能是 jpeg/jpg/png 格式!');
            }

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }

            return isLt2M;
        },
        
        updateUserInfo(){
            const that = this;
            if(that.imageUrl!=null&&that.imageUrl!=''){
                if (this.routerFrom === 'apoRouter') {
                    this.$post('/users/hospPharmacist/updateInfo', {
                        id:that.$store.state.Info.id,
                        headImage:that.imageUrl,
                    }).then(res => {
                        console.log(res);
                        if(res.code == 200) {
                            that.$message({
                                message: res.message,
                                type: 'success'
                            });
                        } else {
                            that.$message.error({
                                message: res.message,
                            });
                        }
                    }).catch(e => {
                        console.log(e);
                    })
                } else {
                    that.$post("/users/doctUser/doUpdate", {
                        id:that.$store.state.Info.id,
                        headImage:that.imageUrl,
                    }).then(function(res) {
                        if (res.code == 200) {
                            that.$message({
                                message: res.message,
                                type: 'success'
                            });
                        } else {
                            that.$message.error({
                                message: res.message,
                            });
                        }
                    }).catch(function(res) {
                        // 请求失败处理
                        console.log(res);
                    });
                }
            }else{
                that.$message({
                    message: '请选择需要上传的图片',
                    type: 'error'
                });
            }
        }
    },
}
</script>
<style scoped>
    .change-user-img /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .change-user-img /deep/ .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .change-user-img /deep/ .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .change-user-img /deep/ .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .all-upload-img{
        margin-top: 25px;
    }

    .noUploadImg{
        width:182px;
        height:174px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .all-upload-img /deep/ .el-upload{
        border: 1px solid #e0e0e0 !important;
        border-radius: 0 !important;
    }

    .all-upload-img /deep/ img{
        border-radius: 50%;
    }

    .change-user-img p:first-child{
        color: #353535;
    }

    .change-user-img p:nth-child(2){
        font-size: 14px;
        color: #a6a6a6;
        margin-top: 20px;
    }

    .btn-upload{
        width: 184px;
        height: 44px;
        border: 0;
        background: #5a75f6;
        border-radius: 22px;
        margin-top: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .btn-upload span{
        display: block;
        width: 60px;
        text-align-last: justify;
        color: #fff;
    }
</style>