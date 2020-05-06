<template>
	<div>
		<div class="home-content-top">
			<div>
				<div class="home-top-logo">
					<img src="@/assets/images/logo.png" alt="">
				</div>
				<div class="home-top-menu">
					<slot name="bottomTable">
						<router-link :to="{name:item.router}" v-for="(item,i) in menu" :key="i" :class="allMenu==i?'active':''">{{item.name}}</router-link>
					</slot>
				</div>
				<div class="home-top-user">
					<img v-show="msg>0" src="@/assets/images/msg.png" alt="">
					<img v-show="msg==0" src="@/assets/images/noMsg.png" alt="">
					<p>
						<el-popover
						placement="bottom"
						width="60"
						trigger="hover">
							<p class="hover-bottom-p" @click="loginOut" style="display: block; text-align: center; width: 100%;height: 100%;cursor: pointer;">退出</p>
							<p slot="reference">
								<span>欢迎您 , </span>
								<span>{{this.$store.state.Info.realName}}</span>
							</p>
						</el-popover>
					</p>
					<!-- <p v-show="user.name==null">
						<router-link to="/login" style="color: #fff;">登录</router-link>
						<router-link to="/login" style="color: #fff;">注册</router-link>
					</p> -->
				</div>
			</div>
		</div>

		<div class="home-secend-top" v-if="showHeader">
			<my-header :funs="funs" :funsIndex="funsIndex"></my-header>
		</div>

		<div class="main">
			<div>
				<router-view></router-view>
			</div>
		</div>

		<div class="home-bottom-par">
			<div>
				<p>网友、医生言论仅代表其个人观点，不代表本站同意其说法，本站不承担由此引起的法律责任</p>
				<p>医治云康互联网提供平台支持 版权所有，翻版必究 渝ICP备13001276号-6 渝公网安备 50010502000399</p>
			</div>
		</div>
	</div>
</template>
<script>
	import myHeader from "@/components/header"
	export default {

		components: {
			myHeader
		},

		data() {
			return {

				menu: [
					{
						name: "快速接诊",
						router: "quickTreated"
					},
					{   
						name: "我的接诊",
						router: "healed"
					},

					{
						name: "在线开方",
						router: "prescription"
					},
					{
						name: "我的排班",
						router: "Scheduling"
					},

					// {
					// 	name: "我的认证",
					// 	router: "attestation"
					// }

				],

				msg: 0,

				funs: [],

				funs1: [
					{
						name: "待确认",
						img: require('@/assets/images/reviced.png'),
						imgActive: require('@/assets/images/revicedA.png'),
						// number: this.$store.state.indexNumber.d,
						numberStr: 'd',
						color: "#46cf98",
						router: "waitconfirm"
					},
					{
						name: "待接诊",
						img: require('@/assets/images/revicing.png'),
						imgActive: require('@/assets/images/revicingA.png'),
						// number: this.$store.state.indexNumber.e,
						numberStr: 'e',
						color: "#46cf98",
						router: "waitingHeal"
					},
					{
						name: "正在接诊",
						img: require('@/assets/images/yijiezhen.png'),
						imgActive: require('@/assets/images/yijiezhenA.png'),
						// number: this.$store.state.indexNumber.c,
						numberStr: 'c',
						color: "#ff5050",
						router: "mychat"
					},
					{
						name: "已接诊",
						img: require('@/assets/images/revice.png'),
						imgActive: require('@/assets/images/reviceA.png'),
						// number: this.$store.state.indexNumber.b,
						numberStr: 'b',
						color: "#ff5050",
						router: "healed"
					},
				],

				funs2: [
					{
						name: "已开处方",
						img: require('@/assets/images/prescriptioned.png'),
						imgActive: require('@/assets/images/prescriptionedA.png'),
						numberStr: 'f',
						color: "#ff5050",
						router: "prescription"
					},

					{
						name: "开处方",
						img: require('@/assets/images/prescription.png'),
						imgActive: require('@/assets/images/prescriptionA.png'),
						numberStr: 'g',
						color: "#ff5050",
						router: "openPrescription"
					},
				],

				funs3: [
					{
						name: "待确认",
						img: require('@/assets/images/reviced.png'),
						imgActive: require('@/assets/images/revicedA.png'),
						// number:this.$store.state.indexNumber.a,
						numberStr: 'a',
						color: "#46cf98",
						router: "quickTreated"
					},
					
					{
						name: "正在接诊",
						img: require('@/assets/images/revicing.png'),
						imgActive: require('@/assets/images/revicingA.png'),
						// number: this.$store.state.indexNumber.c,
						numberStr: 'c',
						color: "#ff5050",
						router: "qiuckchat"
					},
					
					{
						name: "已接诊",
						img: require('@/assets/images/revice.png'),
						imgActive: require('@/assets/images/reviceA.png'),
						// number: this.$store.state.indexNumber.b,
						numberStr: 'b',
						color: "#ff5050",
						router: "recived"
					},
				],		

				funsIndex: 0,

				showHeader: false,

				allMenu:-1,

				showHeaderList:[
					'healed','healing'
				],

				a:0,
				
				b:0,

				c:0,

				d:0,

				e:0,

				f:0,

				g:0

			}
		},

		watch: {
			$route() {
				
				switch (this.$route.name) {
					// 我的接诊
					case 'healed':
						this.funsIndex = 3
						this.showHeader = true
						this.funs=this.funs1
						this.allMenu=1
						break;

					// case 'healing':
					// 	this.funsIndex = 2
					// 	this.showHeader = true
					// 	this.funs=this.funs1
					// 	this.allMenu=1
					// 	break;

					case 'mychat':
						this.funsIndex = 2
						this.showHeader = true
						this.funs=this.funs1
						this.allMenu=1
						break;

					case 'waitingHeal':
						this.funsIndex = 1
						this.showHeader = true
						this.funs=this.funs1
						this.allMenu=1
						break;

					case 'waitconfirm':
						this.funsIndex = 0
						this.showHeader = true
						this.funs=this.funs1
						this.allMenu=1
						break;


					// 在线开方
					case 'prescription':
						this.funsIndex = 0
						this.showHeader = true
						this.funs=this.funs2
						this.allMenu=2
						break;
						
					case 'checkPrescription':
						this.funsIndex = 0
						this.showHeader = true
						this.funs=this.funs2
						this.allMenu=2
						break;


					// 快速接诊
					case 'quickTreated':
						this.funsIndex = 0 	// 索引号
						this.showHeader = true
						this.funs=this.funs3
						this.allMenu=0
						break;
					
					case 'qiuckchat':
						this.funsIndex = 1 
						this.showHeader = true
						this.funs=this.funs3
						this.allMenu=0
						break;
					
					case 'recived':
						this.funsIndex = 2 
						this.showHeader = true
						this.funs=this.funs3
						this.allMenu=0
						break;

					// 在线开方
					case 'openPrescription':
						this.funsIndex = 1
						this.showHeader = true
						this.funs=this.funs2
						this.allMenu=2
						break;

					case 'details':
						this.funsIndex = 1
						this.showHeader = true
						this.funs=this.funs2
						this.allMenu=2
						break;

					// 排班表
					case 'Scheduling':
						this.allMenu=3
						this.showHeader = false
						break;

					// 聊天室
					case 'qiuckchat':
						this.allMenu=1
						break;
						
					// 等待报告
					case 'waitReporting':
						this.allMenu=4
						break;

					// 我的认证
					case 'attestation':
						this.allMenu=4
						break;
					default:
						this.showHeader = false
						this.allMenu=-1
						break;

				}
			},
			
		},

		computed: {
			updateMessage: {
				get: function() {
					console.log('计算属性', this.message)
					return this.message
				},
				set: function(newVal) {
					console.log('newVal', newVal)
				}
			}
		},

		methods: {
            
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},

			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			
			i(data) {
				this.funsIndex = data
			},

			loginOut(){
				localStorage.removeItem('token')
				localStorage.removeItem('hospId')
				this.$router.push({name:'login'})
			}
		},


		created  () {
			const that = this;

			let obj={
				'a':that.a,
				'b':that.b,
				'c':that.c,
				'd':that.d,
				'e':that.e,
				'f':that.f,
				'g':that.g,
			}

			that.$store.commit("indexNumber/SET_STATE", obj);

			// 快速  待确认
			that.$get('/users/patRegisteredIsPay/findPatientList',{
				hospId:1,
				registeredType:1,
				token:localStorage.getItem('token')
			}).then(res => {
				that.a = res.data.length
				that.$store.commit("indexNumber/SET_STATE", {'a':that.a});
			}).catch(err => {
				console.log(err)
			})

			// 快速 已就诊  我的接诊  已就诊
			this.$post('/users/patRegisteredOver/findPatientList', {
				current: 1,
				hospId: 1,
				pageSize: 7
			}).then(res => {
				that.b = res.data.totald
				that.$store.commit("indexNumber/SET_STATE", {'b':that.b});
			}).catch(e => {
				console.log(e);
			})

			// 正在接诊   我的接诊  正在接诊
			that.$get("/patRegisteredUnderway/getPatientUnderway", {
				hospId:1
			}).then(function(res) {
				if (res.code == 200) {
					that.c = res.data.length
					that.$store.commit("indexNumber/SET_STATE", {'c':that.c});
				} else {
					that.$message.error({
						message: res.message,
					});
				}
			})
			.catch(function(res) {
				console.log(res);
			});

			// 我的接诊  待确认
			that.$get('/users/patRegisteredIsPay/findPatientList', {
				hospId: 1,
				registeredType: 2,
				token: localStorage.getItem('token')
			}).then(res => {
				that.d = res.data.length
				that.$store.commit("indexNumber/SET_STATE", {'d':that.d});
			}).catch(err => {
				console.log(err)
			})

			// 我的接诊  待接诊
			that.$get('/patRegisteredWatingDiagnosis/findWatingPatientList', {
				hospId: 1
			}).then(res => {
				if(res.code==='200'){
					that.e = res.data.length
					that.$store.commit("indexNumber/SET_STATE", {'e':that.e});
				}
			});

			
			// 开方信息 需要开处方
			that.$get('/doctPrescript/getDoctPrescriptForDoc',{
				doctorId:that.$store.state.Info.id,
				auditStatus:3,
				hospId:1
			}).then(res => {
				that.f = res.data.length
				that.$store.commit("indexNumber/SET_STATE", {'f':that.f});
			}).catch(err => {
				console.log(err)
			})

			// 开处方 正在审核
			that.$get('/doctPrescript/getDoctPrescriptForDoc',{
				doctorId:that.$store.state.Info.id,
				auditStatus:1,
				hospId:1
			}).then(res => {
				that.g = res.data.length
				that.$store.commit("indexNumber/SET_STATE", {'g':that.g});
				
			}).catch(err => {
				console.log(err)
			})
		}
		
	}
</script>
<style>
	.home-content-top {
		background: #5a75f6;
		height: 82px;
		flex-shrink: 0;
	}

	.home-content-top>div {
		background: #5a75f6;
		width: 1200px;
		margin: 0 auto;
		display: flex;
		height: 100% !important;
		justify-content: flex-start;
		align-items: center;
	}

	.home-content-top>div>div {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.home-top-logo {
		margin-right: 40px;
	}

	.home-top-menu {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-grow: 1;
	}

	.home-top-menu a {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #f7f7ff;
		font-size: 16px;
	}

	.home-top-menu a.active {
		background: linear-gradient(to bottom, #767dfb, #5b5ffb);
	}

	.home-top-user{
		margin-left: 40px;
	}

	.home-top-user img {
		margin-right: 20px;
	}

	.home-top-user p {
		color: #ffffff;
		font-size: 16px;
		white-space: nowrap;
	}

	.home-top-user p a+a::before {
		content: '|';
		margin: 0 4px;
	}

	.home-bottom-par {
		width: 100%;
		height: 115px;
		background: #e8eff6;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.home-bottom-par div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.home-bottom-par p {
		width: 1200px;
		min-width: 1200px;
		text-align: center;
		font-size: 14px;
		color: #727272;
	}

	.home-bottom-par p+p {
		margin-top: 15px;
	}

	.main {
		width: 100%;
		background: #f4f5fa;
	}

	.main>div {
		width: 1200px;
		margin: 0 auto;
	}
</style>
