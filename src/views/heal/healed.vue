<template>
	<div class="my-heal-content">
		<div class="my-heal-top">
			<div class="myheal-top-left">
				<span>已接诊</span>
			</div>
			<div class="myheal-top-right">
				<!-- <div>
					<span>选择时间</span>
					<el-date-picker v-model="value1" type="date" placeholder="选择日期">
					</el-date-picker>
					<el-date-picker v-model="value2" type="date" placeholder="选择日期">
					</el-date-picker>
					<div class="heal-type">
						<div :class="healType==1?'active':''" @click="healType=1">图文问诊</div>
						<div :class="healType==2?'active':''" @click="healType=2">电话问诊</div>
						<div class="heal-type-bom" :class="healType==1?'active1':'active2'"></div>
					</div>
				</div> -->
			</div>
		</div>
		<div class="my-heal-list">
			<heal-list :personInfo="item" v-for="(item,i) in personInfo" :key="i"></heal-list>
		</div>
		<div class="my-heal-paging">
			<el-pagination background layout="pager,next" next-text="下一页" :page-size="6" :total="personInfo.length" :hide-on-single-page='true' >
			</el-pagination>
		</div>
	</div>

</template>
<script>
	import healList from '@/components/healList';
	export default {
		created() {
			this.getHealedList();
		},
		methods: {
			getHealedList() {
				if(this.current > this.totalpage) {
					this.$message("没有更多数据...");
					return;
				}
				this.$post('/users/patRegisteredOver/findPatientList', {
					current: this.current,
					hospId: 1,
					doctorId:this.$store.state.Info.id,
					pageSize: 4
				}).then(res => {
					var data = res.data;
					this.totalpage = data.total;
					this.personInfo = data.records;
                    this.$store.commit("indexNumber/SET_STATE", {'b':res.total});
				}).catch(e => {
					console.log(e);
				})
			}
		},
		data() {
			return {
				current: 1,

				totalpage: 1,

				value1: "",

				value2: "",

				healType: 1,

				personInfo: [],
			}
		},
		
		components: {
			healList
		},
	}
</script>
<style scoped>
	.my-heal-content {
		background: #fff;
		padding: 32px;
	}

	.my-heal-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 18px;
		border-bottom: 1px solid #eeeeee;
		margin-bottom: 35px;
	}

	.myheal-top-left>span {
		font-size: 17px;
		color: #353535;
	}

	.myheal-top-right>div {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.heal-type {
		width: 164px;
		height: 33px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.heal-type-bom {
		position: absolute;
		width: 72px;
		height: 3px !important;
		background: #5a75f6;
		transition: all .5s;
		bottom: 0;
	}

	.heal-type-bom.active2 {
		transform: translateX(92px);
	}

	.heal-type>div {
		width: 72px;
		height: 100%;
		font-size: 16px;
		color: #5a5a5a;
		text-align: center;
		box-sizing: border-box;
	}
	.heal-type>div:first-child,.heal-type>div:nth-child(2){
		cursor: pointer;
	}
	.heal-type>div.active {
		color: #5a75f6;
	}

	.myheal-top-right>div span {
		font-size: 16px;
		margin-right: 15px;
	}

	.myheal-top-right>div /deep/ .el-input,
	.myheal-top-right>div /deep/ .el-input__inner {
		width: 178px;
		height: 33px;
	}

	.myheal-top-right>div /deep/ .el-input__icon {
		line-height: 33px;
	}

	.myheal-top-right>div /deep/ .el-input+.el-input {
		margin-left: 12px;
		margin-right: 25px;
	}

	.my-heal-list>div+div {
		margin-top: 16px;
	}

	.my-heal-paging {
		padding-top: 50px;
	}

	.my-heal-paging /deep/ .number {
		width: 37px;
		height: 37px;
		border-radius: 50% !important;
		line-height: 37px;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		border: 1px solid #dfe5f6;
		background-color: #fff !important;
		color: #989898 !important;
		font-size: 14px;
	}

	.my-heal-paging /deep/ .el-pagination {
		margin: 0;
		padding: 0;
	}

	.my-heal-paging /deep/ .number.active {
		color: #fff !important;
		background-color: #5a75f6 !important;
	}

	.my-heal-paging /deep/ .btn-next {
		width: 80px;
		height: 37px;
		border-radius: 37px;
		font-size: 16px;
		color: #989898;
		border: 1px solid #dfe5f6;
		background-color: #fff;
	}

	.refresh-par {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		cursor: pointer;
	}

	.refresh-par img {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}

	.myheal-top-right .refresh-par span {
		font-size: 14px;
		color: #5a75f6;
		margin: 0;
	}

	.my-waiting-list {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.my-waiting-list>.waiting-list-par:nth-child(even) {
		margin-left: 44px;
	}

	.my-waiting-list>.waiting-list-par:nth-child(n+3) {
		margin-top: 16px;
	}
</style>
