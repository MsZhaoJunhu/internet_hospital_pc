<template>
	<div class="认证">
		<div class="title">
			<h1>认证申请 </h1>
			<span>认证后你将可以使用咨询、对症预约等功能</span>
		</div>
		<p class="tip">
			请您提交真实信息（以下证件一种或多种），我们将对您的信息严格保密<br />
			格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M
		</p>
		<div class="label">
			<h4>身份证号:</h4>
			<input type="text">
		</div>
		<div class="label">
			<h4>身份证正反面照:</h4>
			<div class="uploadIMG">
				<el-upload class="upload-demo" list-type="picture-card" drag action="https://jsonplaceholder.typicode.com/posts/"
				 :on-remove="handleRemove" :on-change="progress" :class="{'uploadON':showUpdate[0]}">
					<img src="@/assets/images/zhengmian.png" alt="">
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>身份证正面</div>
				</el-upload>
				<el-upload class="upload-demo" list-type="picture-card" drag action="https://jsonplaceholder.typicode.com/posts/"
				 :on-change="progress1" :class="{'uploadON':showUpdate[1]}">
					<img src="@/assets/images/beimian.png" alt="">
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>身份证反面</div>
				</el-upload>
			</div>
		</div>
		<div class="label">
			<h4>医师执业证（首页+个人信息页）:</h4>
			<div class="uploadIMG">
				<el-upload class="upload-demo" list-type="picture-card" drag action="https://jsonplaceholder.typicode.com/posts/"
				 :on-change="progress2" :class="{'uploadON':showUpdate[2]}"
				>
					<img src="@/assets/images/upload.png" alt="">
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>证件照</div>
        </el-upload>
			</div>
		</div>
		<div class="label">
			<h4>医师资格证:</h4>
			<div class="uploadIMG">
				<el-upload class="upload-demo" list-type="picture-card" drag action="https://jsonplaceholder.typicode.com/posts/"
					 :on-change="progress3" :class="{'uploadON':showUpdate[3]}"
				>
					<img src="@/assets/images/upload.png" alt="">
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>证件照</div>
				</el-upload>
			</div>
		</div>
		<div class="label">
			<h4>专业技术资格证:</h4>
			<div class="uploadIMG">
				<el-upload class="upload-demo" list-type="picture-card" drag action="https://jsonplaceholder.typicode.com/posts/"
					 :on-change="progress4" :class="{'uploadON':showUpdate[4]}"
				>
					<img src="@/assets/images/upload.png" alt="">
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>证件照</div>
				</el-upload>
			</div>
		</div>
		<button>提交审核</button>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				showUpdate: [
					false,
					false,
					false,
					false,
					false,
				],
			};
		},

		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},

			progress() {
				this.showUpdate.splice(0, 1, true)
			},

			progress1() {
				this.showUpdate.splice(1, 1, true)
			},

			progress2() {
				this.showUpdate.splice(2, 1, true)
			},

			progress3() {
				this.showUpdate.splice(3, 1, true)
			},
			
			progress4() {
				this.showUpdate.splice(4, 1, true)
			}
		}
	}
</script>

<style scoped>
	.认证 {
		padding: 35px 30px;
		background: #fff;
	}

	.认证 .title {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		border-bottom: 1px solid #eeeeee;
		padding-bottom: 20px;
	}

	.认证 .title>h1 {
		font-size: 18px;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #353535;
	}

	.认证 .title>span {
		font-size: 14px;
		font-weight: normal;
		font-stretch: normal;
		color: #5a5a5a;
	}

	.tip {
		font-size: 14px;
		color: #939393;
		line-height: 25px;
		padding: 20px 0;
	}

	.uploadIMG {
		display: flex;
	}

	/deep/.el-upload-dragger,
	/deep/.el-upload-list__item {
		margin: 0;
		margin-right: 20px;
		width: 280px;
		height: 208px;
		border-style: solid;
		border-radius: 0;
	}

	/deep/.el-upload-list__item>img {
		height: auto;
		width: auto;
	}

	/deep/.el-upload--picture-card {
		border: none;
		height: auto;
		width: auto;
		line-height: normal;
	}

	.uploadON /deep/.el-upload--picture-card {
		display: none;
	}

	.label {
		display: flex;
		flex-direction: column;
	}

	.label>input {
		width: 280px;
		height: 35px;
		background-color: #ffffff;
		border: solid 1px #e0e0e0;
	}

	.label>h4 {
		padding: 20px 0;
		padding-right: 10px;
		font-weight: normal;
		font-size: 15px;
		color: #353535;
	}

	.认证 button {
		width: 288px;
		height: 49px;
		background-color: #5a75f6;
		border-radius: 25px;
		font-size: 15px;
		color: #ffffff;
		border: none;
		margin: 30px 0;
	}
</style>
