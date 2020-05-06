<template>
	<div>
			<div class="main-right-top">
				<div class="main-right-topTitle">
					<div>待处理事项</div>
					<div @click="refs">
						<img src="@/assets/images/ref.png" alt="">
						<span>刷新</span>
					</div>
				</div>
				<!-- <div class="main-right-topCon">
					<functions :img="require('@/assets/images/phone.png')" name="电话问诊" :number="0" details="暂无问诊患者" colorValue="#5a75f6"></functions>
					<functions :img="require('@/assets/images/imgWord.png')" name="图文问诊" :number="3" details="位患者正在等待" colorValue="#71d6fc"></functions>
					<functions :img="require('@/assets/images/phone.png')" name="在线开方" :number="2" details="位患者需要开具处方" colorValue="#5a75f6"></functions>
				</div> -->
				<div class="main-right-topFun">
					<div>
						<onlineFunction :onlineFun="onlineFun1"></onlineFunction>
					</div>
					<div>
						<onlineFunction :onlineFun="onlineFun2"></onlineFunction>
					</div>
				</div>
				<div>
					<onlineFunction :onlineFun="onlineFun3"></onlineFunction>
				</div>
			</div>
			<div class="main-right-bottom">
				<Scheduling></Scheduling>
				<!-- <div class="main-right-top">
					<div class="main-right-topTitle">
						<div>我的排班</div>
						<div>
							<span @click="routerView">添加排班</span>
						</div>
					</div>
					<div class="main-right-topCon">
						<el-calendar v-model="value">
							<template slot="dateCell" slot-scope="{date, data}">
								<div>
									<div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
									<div v-for="(item,index) in calendarData" :key="index">
										<div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
											<div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
												<el-tooltip class="item" effect="dark" :content="item.things" placement="right">
													<div class="is-selected">
														<p v-for="t in item.things">
															{{t}}
														</p>
													</div>
												</el-tooltip>
											</div>
											<div v-else></div>
										</div>
										<div v-else></div>
									</div>
								</div>
							</template>
						</el-calendar>
					</div>
				</div> -->
			</div>
	</div>
</template>
<script>
	import functions from '@/components/function';
	import Scheduling from '@/components/Scheduling';
	import onlineFunction from '@/components/onlineFunction';
	export default {
		
		components: {
			functions,

			Scheduling,

			onlineFunction,

		},

		data() {
			return {
				value: new Date(),

				calendarData: [
					{
						months: ['04'],

						days: ['16'],

						things: [
							'09:00-11:30',
						]
					},
				],

				onlineFun1:{
					img:require('../../assets/images/online.png'),

					title:"急速接诊",

					color:"#2abeef",

					padding:"0 82px",

					theme:[
						{name:"患者正在接诊",number:this.$store.state.indexNumber.c,unit:"位",color:"#9ad5b3"},

						{name:"患者待确认",number:this.$store.state.indexNumber.a,unit:"位",color:"#34b4bc"},
					]
				},

				onlineFun2:{
					img:require('../../assets/images/online.png'),

					title:"在线开方",

					color:"#2abeef",

					padding:"0 82px",

					theme:[
						{name:"患者需开处方",number:this.$store.state.indexNumber.f,unit:"位",color:"#9ad5b3"},

						{name:"处方正在审核",number:this.$store.state.indexNumber.g,unit:"个",color:"#34b4bc"},
					]
				},

				onlineFun3:{
					img:require('../../assets/images/online2.png'),

					title:"在线接诊",

					color:"#2abeef",

					padding:"0 136px",
					
					theme:[
						{name:"患者待接诊",number:this.$store.state.indexNumber.e,unit:"位",color:"#a3d5e6"},

						{name:"患者正在接诊",number:this.$store.state.indexNumber.c,unit:"位",color:"#35c1f0"},

						{name:"患者待确认",number:this.$store.state.indexNumber.d,unit:"位",color:"#f68e5a"},
					]
				},

			}
		},
		
		methods: {
			routerView(){
				this.$router.push({name:'Scheduling'})
			},

			refs(){
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

		},
	}
</script>
<style scoped>
	.main-right-top {
		width: 100%;
		padding: 30px 30px;
		box-sizing: border-box;
		background: #fff;
	}

	.main-right-topCon {
		width: 100%;
		display: flex;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.main-right-topTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 20px;
		border-bottom: 1px solid #eeeeee;
		margin-bottom: 30px;
	}

	.main-right-topTitle>div {
		font-size: 18px;
		color: #353535;
		user-select: none;
	}

	.main-right-topTitle>div:last-child {
		color: #788ef8;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.main-right-topTitle img {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}

	.main-right-bottom {
		margin-top: 15px;
	}

	.main-right-topCon /deep/ .el-calendar__body {
		padding: 0;
	}

	.main-right-topCon /deep/ .el-calendar__header {
		display: none;
	}

	.function-content+.function-content {
		margin-left: 20px;
	}

	.function-content:hover {
		border-color: rgb(216, 216, 216);
		box-shadow: 0 0 10px rgb(216, 216, 216);
		cursor: pointer;
	}
	
	.main-right-topFun{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}
	
	.main-right-topFun>div{
		width: 50%;
	}

	.main-right-topFun>div+div{
		margin-left: 21px;
	}
</style>
