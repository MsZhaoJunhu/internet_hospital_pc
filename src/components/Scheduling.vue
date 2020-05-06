<template>
	<div class="scheduling-content">
		<div class="scheduling-title">
			<span>我的排班</span>
			<div>
				<!-- <span class="morning">早班</span>
                <span class="noon">中班</span>
                <span class="night">晚班</span> -->
				<span class="add" v-show="!isBoolean" @click="isBoolean=true">添加排班</span>
				<!-- <span class="addFromLastWeek" v-show="isBoolean" @click="isBoolean=false">引用上周</span> -->
			</div>
		</div>
		<div class="select-time">
			<el-date-picker v-model="value" type="month" format="yyyy-MM" value-format="yyyy-MM" placeholder="选择月">
			</el-date-picker>
		</div>
		<div class="perpetual-calendar-content">
			<el-calendar v-model="value">
				<template slot="dateCell" slot-scope="{date, data}">
					<div>
						<div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
						<div v-for="(item,index) in calendarData" :key="index">
							<div v-if="item==data.day" class="ban">班</div>
						</div>
					</div>
				</template>
			</el-calendar>
		</div>
		<div class="scheduling-setting" v-show="isBoolean">
			<div class="sele" style="width: 100%;">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="stepPeriod" label="时间节点">
					</el-table-column>
					<el-table-column prop="relevOrg" label="医院">
						<template slot-scope="scope">
							<el-select v-model="scope.row.relevOrg" clearable placeholder="请选择医院" @change="changeItem(scope.$index)">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="shiftDoctorDept" label="科室">
						<template slot-scope="scope">
							<el-select v-model="scope.row.shiftDoctorDept" clearable placeholder="请选择科室" @focus="changeItem2(scope.$index,scope.row.relevOrg)">
								<el-option v-for="item in scope.row.options2" :key="item.hospDeptId" :label="item.deptName" :value="item.hospDeptId">
								</el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="sourcePool" label="号源数">
						<template slot-scope="scope">
							<el-input-number v-model="scope.row.sourcePool" @change="handleChange" :min="1" :max="200"></el-input-number>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- <div class="sele">
				<span>请选择需要排班的医院</span>
				<div>
					<el-select v-model="value1" clearable placeholder="请选择医院">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<span>请选择需要排班的部门</span>
				<div>
					<el-select v-model="value1" clearable placeholder="请选择部门">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<span>请输入挂号号院数量</span>
				<div>
					<el-input-number v-model="num" @change="handleChange" :min="1" :max="200"></el-input-number>
				</div>
			</div>
			<div class="sele">
				<span>选择{{valueNotes}}就诊时间段:</span>
				<div class="mor">
					<el-checkbox-group v-model="periodSelect">
						<el-checkbox :label="t" :key='index' v-for="(t,index) in period">{{t}}</el-checkbox>
					</el-checkbox-group>
				</div>
			</div> -->
			<button class="scheduling-btn" @click="submit()">自动生成排班表</button>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				value: '',

				calendarData: [],
				
				tableData: [],

				date: '',

				HospAndDept: [],

				// [{
				// 	months: ['04'],
				// 	days: ['15'],
				// 	things: ['早班', '早班']
				// }],

				isBoolean: false,

				periodSelect: [],

				period: [],

				options: [],

				options2: [],

				value1: [],

				num: 0,

				// startTime: '',

				// endTime: ''
			}
		},

		computed: {
			minTime() {
				let t = new Date()
				return `${t.getHours()}:${t.getMinutes()}`
			},

			valueNotes() {
				let time = new Date(this.value)
				let date =
					`${time.getFullYear()}-${String(time.getMonth()+1).length>1?(time.getMonth()+1):'0'+(time.getMonth()+1)}-${String(time.getDate()).length>1?(time.getDate()):'0'+(time.getDate())}`
				return date
			},

		},

		watch: {
			value() {
				// this.periodSelect = []
				// let time = new Date(this.value)
				// let date =
				// 	`${time.getFullYear()}-${String(time.getMonth()+1).length>1?(time.getMonth()+1):'0'+(time.getMonth()+1)}-${String(time.getDate()+1).length>1?(time.getDate()):'0'+(time.getDate())}`
				// this.$post('/doctorShift/getPeriod', {
				// 	shiftDate: date,
				// 	stepTime: 30,
				// }).then(res => {
				// 	let arr = []
				// 	for (let i in res.data) {
				// 		arr.push({
				// 			stepPeriod: res.data[i],
				// 			relevOrg: '',
				// 			shiftDoctorDept: '',
				// 			sourcePool: 10,
				// 		})
				// 	}
				// 	this.tableData = arr
				// })
				// this.periodSelect = this.date[this.valueNotes].slice(9, this.date[this.valueNotes].length).split(',')
				const store = this.$store.state.Info

				this.$post('/doctorShift/getDatePeriod', {
					shiftDate: this.valueNotes,
					stepTime: 30,
					shiftDoctor: store.id,
					isDelete: 0,
				}).then(res => {
					let arr = []
					for (let i in res.data) {
						arr.push({
							stepPeriod: res.data[i].stepPeriod,
							relevOrg: parseInt(res.data[i].relevOrg) || '',
							shiftDoctorDept: parseInt(res.data[i].shiftDoctorDept) || '',
							sourcePool: res.data[i].sourcePool || 10,
							options2: [{
								deptName:res.data[i].deptName,
								hospDeptId: res.data[i].hospDeptId,
							}]
						})
					}
					this.tableData = arr
				})
			}
		},

		mounted() {
			this.chushihua()
			this.changeItem2(1,1)
		},

		methods: {
			chushihua(){
				this.value = new Date()
				const store = this.$store.state.Info
				this.$post('/doctorShift/get', {
					shiftDoctor: store.id, //医生id 
					isDetele: 0,
				}).then(res => {
					let arr = []
					for (let i in res.data) {
						arr.push(res.data[i].shiftDate)
					}
					this.calendarData = [...new Set(arr)]
				})
				
				this.$post('/doctorShift/getHospAndDept', {
					shiftDoctor: store.id,
				}).then(res => {
					this.HospAndDept = res.data
					for (let i in res.data) {
						this.options=[];
						this.options.push({
							value: res.data[i].id,
							label: res.data[i].hospitalName
						})
					}
				})
			},

			changeItem(scope) {
				for (let i in this.HospAndDept) {
					if (this.tableData[scope].relevOrg == this.HospAndDept[i].id) {
						this.tableData[scope].options2 = this.HospAndDept[i].dept
					}
				}
			},

			changeItem2(index,scope) {
				this.$post('/doctorShift/getHospDept',
					{
						relevOrg:scope
					}
				).then(res => {
					for (let i in this.HospAndDept) {
						if (this.tableData[index].relevOrg == this.HospAndDept[i].id) {
							this.tableData[index].options2 = this.HospAndDept[i].dept
						}
					}
				})
			},

			submit() {
				const store = this.$store.state.Info
				let tableData = this.tableData
				for (let i in tableData) {
					tableData[i]['stepId'] = i
					if (tableData[i]['relevOrg'] != '' && tableData[i]['shiftDoctorDept'] != '') {
						tableData[i]['isWork'] = '1'
					} else {
						tableData[i]['isWork'] = '0'
					}
					tableData[i]['shiftDoctor'] = store.id
					tableData[i]['shiftDate'] = this.valueNotes
				}
				this.$post('/doctorShift/addBatch',
					tableData
				).then(res => {
					this.isBoolean = false
					this.period = res.data
					this.chushihua()
				})
			},
			
			handleChange(value) {
				// console.log(value);
			}
		}
	}
</script>
<style scoped>
	.ban {
		color: #39BEF9 !important;
	}

	.scheduling-content {
		padding: 34px 32px 60px 32px;
		background: #fff;
	}

	.scheduling-title {
		width: 100%;
		height: 37px;
		box-sizing: border-box;
		border-bottom: 1px solid #eeeeee;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 23px;
	}

	.scheduling-title>span {
		font-size: 18px;
	}

	.scheduling-title span {
		color: #353535;
	}

	.scheduling-title div {
		height: 30px;
		display: flex;
		align-items: center;
	}

	.scheduling-title div span+span {
		margin-left: 48px;
	}

	.scheduling-title div span {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.scheduling-title div span:not(:last-child)::before {
		content: ' ';
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 4px;
		margin-right: 15px;
	}

	.scheduling-title div span.morning::before {
		background: #2ecc71;
	}

	.scheduling-title div span.noon::before {
		background: #ff8353;
	}

	.scheduling-title div span.night::before {
		background: #5795ec;
	}

	.scheduling-title div span.add {
		color: #5a75f6;
		cursor: pointer;
	}

	.select-time {
		margin-bottom: 30px;
	}

	.select-time /deep/ .el-input__inner {
		border-color: #b8c0e8;
		color: #9c9c9c;
	}

	.perpetual-calendar-content /deep/ .el-calendar__body {
		padding: 0;
	}

	.perpetual-calendar-content /deep/ .el-calendar__header {
		display: none;
	}

	.scheduling-setting {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-top: 50px;
	}

	.scheduling-setting-top {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.scheduling-setting-top span {
		display: block;
		white-space: nowrap;
		margin-right: 18px;
		color: #353535;
	}

	.scheduling-setting-top div {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.scheduling-setting-top div+div {
		margin-left: 45px;
	}

	.scheduling-setting-top /deep/ .el-checkbox {
		margin-right: 0;
	}

	.scheduling-setting-top /deep/ .el-checkbox+.el-checkbox {
		margin-top: 20px;
	}

	.scheduling-btn {
		width: 288px;
		height: 48px;
		border-radius: 24px;
		color: #fff;
		background: #5a75f6;
		border: 0;
		margin: 0 auto;
		margin-top: 50px;
		cursor: pointer;
	}

	/* .mor /deep/ .el-checkbox__inner {
		border-color: #2ecc71;
		box-sizing: border-box;
	}

	.mor /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
		color: #2ecc71 !important;
	}

	.mor /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
		background: #2ecc71;
	} */


	.addFromLastWeek {
		width: 87px;
		height: 28px;
		border-radius: 14px;
		background: #5a75f6;
		color: #fff !important;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.mor {
		width: 100%;
	}

	/deep/.el-checkbox-group {
		width: 100%;
		flex-direction: row !important;
		flex-wrap: wrap;
	}

	/deep/.el-checkbox {
		margin: 0 30px 30px 0 !important;
	}

	.sele {
		flex-direction: column;
	}

	.sele>div {
		width: 100%;
	}

	.scheduling-setting-top>span,
	.sele>span {
		display: block;
		padding: 20px 0;
	}
</style>
