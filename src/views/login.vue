<template>
	<div class="login">
		<div class="mui-content">
			<div class="header">
				<div v-show="role===1" class="switch-role switch-role1" @click="switchRole(3)"></div>
				<div v-show="role===3" class="switch-role switch-role2" @click="switchRole(1)"></div>
				<div class="tips">点击切换{{role===1?"药师":role===3?"医生":""}}登录</div>
				<div class="switch-top">
					<div @click="switchLoginType(1)" :class="loginType==1?'active':''">密码登录</div>
					<div @click="switchLoginType(2)" :class="loginType==2?'active':''">验证码登录</div>
					<span class="switch-top-after" :class="loginType==1?'afterActive1':'afterActive2'"></span>
				</div>
				<div v-show="loginType==1" class="login-type-password">
					<label>
						<input type="text" placeholder="用户名" v-model="userName" >
					</label>
					<label class="position-btn-span">
						<input type="password" placeholder="密码" v-model="password">
					</label>
				</div>
				<div v-show="loginType==2" class="login-type-password">
					<label>
						<input type="number" name="telephone" placeholder="手机号" v-model="phone" />
					</label>
					<label class="input">
						<input type="number" name="telephone" placeholder="验证码" v-model="code" />
						<a @click="sendMsg" v-show="time > 60" class="btn-a">点击获取</a>
						<a v-show="time <= 60">重新获取({{ time }})</a>
					</label>
				</div>
				<div class="auto-login-parent">
					<el-checkbox v-model="checked">自动登录</el-checkbox>
					<router-link to="/">忘记密码?</router-link>
				</div>
				<div class="dl" @click="login">
					<span>登 录</span>
				</div>
			</div>
			<div class="tupian">
				<img v-show="role===1" src="@/assets/images/loginRightBg.png" alt="">
				<img v-show="role===3" src="@/assets/images/auditloginphot.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

				phone: "",

				code: "",

				time: 61,

				dsq: null,

				loginType:2,

				checked:false,

				userName:"",

				password:"",

				role: 1
			};
		},
		methods: {

			sendMsg() {

				const that = this;

				const phone_ = /^(13[0-9]|14[5|7]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;

				if (that.phone == "" || that.phone == null) {
					that.$message({
						message: '手机号码不能为空',
						type: 'warning'
					});
					return;
				}

				if (!phone_.test(that.phone)) {
					that.$message({
						message: '验证码不能为空',
						type: 'warning'
					});
					return;
				}

				this.$get(
					'/users/login/getValidaCode', {
						mobile: that.phone,
					}
				).then(function(res) {
					if (res.code == 200) {
						that.$message({
						  message: '验证码发送成功',
						  type: 'success'
						});
						console.log(res)
						that.time--;
						that.dsq = setInterval(() => {
							that.time--;
							if (that.time <= 0) {
								clearInterval(that.dsq);
								that.dsq = null;
								that.time = 61;
							}
						}, 1000);
					}
				})

			},
			login() {

				const that = this;

				switch (that.loginType) {
					case 2:

						if (that.phone == "" || that.phone == null) {
							that.$message({
								message: '手机号码不能为空',
								type: 'warning'
							});
							return;
						}

						if (that.code == "" || that.code == null) {
							that.$message({
								message: '验证码不能为空',
								type: 'warning'
							});
							return;
						}

						that.$post("/users/doctUser/validaCodeLogin", {
								mobile: that.phone,
								// 用户身份 1.医生 2.患者.3.药师
								userType: that.role,
								validaCode: that.code,
							}).then(function(res) {
								if(res.code==='9998') {
									that.$message.error({
											message: "账号不存在"
									});
									return;
								}
								if (that.role === 1) {
									if (res.code == 200) {
										localStorage.setItem("token", res.data);
										localStorage.setItem("hospId", 1);
										that.$get('/users/doctUser/doSelect',{
											hospId:localStorage.getItem('hospId'),
											token:res.data
										}).then(resp => {
											that.$store.commit("Info/SET_STATE", resp.data);
										}).catch(err => {
											console.log(err)
										})
	
										that.$router.push({
											name: "index"
										});
	
	
									} else {
										that.$message.error({
											message: res.message,
										});
									}
								} else if(that.role === 3) {
									if (res.code == 200) {
										localStorage.setItem("token", res.data);
										localStorage.setItem("hospId", 1);
										that.$get('/users/hospPharmacist/findInfo',{}).then(res => {
											that.$store.commit("Info/SET_STATE", res.data);
											that.$router.push({
												name: "apoIndex"
											})
										}).catch(e => {
											console.log(e);
										})
									}
								}
							})
							.catch(function(res) {
								// 请求失败处理
								console.log(res);
							});
						break;
				
					default:

						if (that.userName == "" || that.userName == null) {
							that.$message({
								message: '用户名不能为空',
								type: 'warning'
							});
							return;
						}

						if (that.password == "" || that.password == null) {
							that.$message({
								message: '密码不能为空',
								type: 'warning'
							});
							return;
						}
						
						that.$post("/users/doctUser/mobileLogin", {
								mobile: that.userName,
								// 用户身份 1.医生 2.患者.3.药师
								userType: that.role,
								password: that.password,
							}).then(function(res) {
								// console.log(res);
								if(res.code==='9998') {
									that.$message.error({
											message: "账号不存在"
									});
									return;
								}
								if (that.role === 1) {
									if (res.code == 200) {
										localStorage.setItem("token", res.data);
										localStorage.setItem("hospId", 1);
	
										that.$get('/users/doctUser/doSelect',{
											hospId:localStorage.getItem('hospId'),
											token:res.data
										}).then(resp => {
											that.$store.commit("Info/SET_STATE", resp.data);
										}).catch(err => {
											console.log(err)
										})
	
										that.$router.push({
											name: "index"
										});
									} else {
										that.$message.error({
											message: res.message,
										});
									}
								} else if (that.role === 3) {
									if (res.code == 200) {
										localStorage.setItem("token", res.data);
										localStorage.setItem("hospId", 1);
										that.$get('/users/hospPharmacist/findInfo',{}).then(res => {
											that.$store.commit("Info/SET_STATE", res.data);
											that.$router.push({
												name: "apoIndex"
											})
										}).catch(e => {
											console.log(e);
										})
									}
								}
							})
							.catch(function(res) {
								// 请求失败处理
								console.log(res);
							});
						break;
				}
				
			},

			switchLoginType(i){
				this.loginType=i;
			},

			switchRole(n) {
				this.role = n;
			}
		}
	};
</script>
<style scoped>

	.mui-content .tupian{
		width: 600px;
		height: 100%;
		padding: 0;
	}

	.tupian img {
		height: 100%;
		margin: 0;
	}

	/* google、safari */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none !important;
		margin: 0;
	}

	/* 火狐 */
	input[type="number"] {
		-moz-appearance: textfield;
	}

	.login {
		height: 100vh;
		background: url('../assets/images/loginBack.png') no-repeat 100% 100%;
		display: flex;
		align-items: center;
	}

	.nut-navbar {
		height: 44px;
	}

	/deep/h3 {
		font-size: 17px;
		font-weight: 500;
	}

	h2 {
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		color: #353535;
	}

	.mui-content {
		min-width: 1200px;
		background: #fff;
		height: 600px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		border-radius: 50px;
		overflow: hidden;
	}

	.mui-content>div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		padding: 86px 80px 108px 80px;
		box-shadow: -2px 0 10px rgba(0, 0, 0, .1);
		box-sizing: border-box;
	}

	.input {
		display: flex;
		font-size: 14px;
		color: #7b7b7b;
		align-items: center;
		position: relative;
	}

	.input>span {
		flex-shrink: 0;
		border-right: 1px solid #ececec;
		line-height: 14px;
		padding-right: 10px;
	}

	.input>input {
		outline: none;
		width: 100%;
		margin: 0;
		border: none;
		font-size: 14px;
	}

	.input>a {
		flex-shrink: 0;
		position: absolute;
		right: 30px;
	}

	.input>a.btn-a {
		width: 104px;
		height: 33px;
		box-sizing: border-box;
		border: 1px solid #5a75f6;
		line-height: 33px;
		text-align: center;
		border-radius: 33px;
		cursor: pointer;
	}

	a {
		color: #5a75f6;
	}

	.wechat {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		bottom: 0px;
		padding: 0 30px 30px 30px;
		box-sizing: border-box;

	}

	img {
		margin-top: 10px;
	}

	.wechat p {
		font-size: 12px;
		width: 100%;
		text-align: center;
		position: relative;
	}

	.wechat p span {
		background: #fff;
		position: relative;
		z-index: 2;
		padding: 0 10px;
	}

	.wechat p:after {
		content: "";
		display: block;
		width: 100%;
		height: 1px;
		background: #eee;
		position: absolute;
		top: 10px;
		z-index: 0;
	}

	.mui-content .header {
		box-shadow: none !important;
		width: 600px !important;
		height: 100% !important;
		position: relative;
	}
	.mui-content .header .tips{
		position: absolute;
		top: 24px;
		left: 100px;
		color: #848484;
		font-size: 13px;
		background: url(../assets/images/tips.png) no-repeat center center;
		width: 133px;
		height: 25px;
		text-align: center;
		line-height: 25px;
	}
	.mui-content .header .switch-role{
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}

	.mui-content .header .switch-role1 {
		width: 125px;
		height: 125px;
		background: url(../assets/images/doctorlogin.png) no-repeat 23px 17px;
	}

	.mui-content .header .switch-role1::after {
		content: '';
		width: 100%;
		height: 100%;
		display: inline-block;
		background: url(../assets/images/cover.png) no-repeat left top;
	}

	.mui-content .header .switch-role2{
		width: 125px;
		height: 125px;
		background: url(../assets/images/auditlogin.png) no-repeat 23px 17px;
	}

	.mui-content .header .switch-role2::after {
		content: '';
		width: 100%;
		height: 100%;
		display: inline-block;
		background: url(../assets/images/cover.png) no-repeat left top;
	}

	.mui-icon-closeempty {
		font-size: 35px !important;
		padding-top: 5px !important;
	}

	input:nth-child(2) {
		padding-left: 11px;
	}

	p {
		color: #5a5a5a;
	}

	h2 {
		padding-bottom: 11px;
	}

	.dl {
		width: 100%;
		height: 68px;
		text-align: center;
		line-height: 68px;
		border-radius: 68px;
		color: white; 
		background: linear-gradient(to right,#6a9fff,#5a75f6);
		cursor: pointer;
	}

	a:nth-child(3) {
		color: #5a75f6;
		padding-left: 20px;
	}

	.switch-top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eeeeee;
		position: relative;
		margin-bottom: 44px;
	}

	.switch-top div{
		width: 50%;
		padding-bottom: 29px;
		text-align: center;
		font-size: 18px;
		color: #5a5a5a;
		cursor: pointer;
		line-height: 24px;
		transition: font-size .2s ease-in-out;
	}

	.switch-top-after{
		position: absolute;
		bottom: -1px;
		display: block;
		height: 1px;
		background: #5a75f6;
		width: 50%;
		transition: all .5s;
	}

	.afterActive1{
		transform: translateX(0);
	}

	.afterActive2{
		transform: translateX(100%);
	}

	.switch-top .active{
		font-size: 24px;
		color: #5a75f6;
		transition: font-size .2s ease-in-out;
	}

	.mui-content .login-type-password{
		display: flex;
		flex-direction: column;
	}

	.mui-content .login-type-password input{
		width: 100%;
		height: 58px;
		border: 1px solid #ececec;
		border-radius: 58px;
		box-sizing: border-box;
		padding-left: 34px;
		outline: none;
	}

	.mui-content .login-type-password label+label{
		margin-top: 23px;
	}

	.mui-content .auto-login-parent{
		width: 100%;
		height: 23px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 38px 0;
		padding-left: 11px;
		box-sizing: border-box;
	}
</style>
