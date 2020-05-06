<template>
    <div class="apo-wrap">
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
					<!-- <img v-show="msg>0" src="@/assets/images/msg.png" alt="">
					<img v-show="msg==0" src="@/assets/images/noMsg.png" alt=""> -->
                    <img src="@/assets/images/msg.png" alt="">
					<!-- <img src="@/assets/images/noMsg.png" alt=""> -->
					<p>
						<span>欢迎您 , </span>
						<span>{{this.$store.state.Info.realName}}</span>
					</p>
					<!-- <p v-show="user.name==null">
						<router-link to="/login" style="color: #fff;">登录</router-link>
						<router-link to="/login" style="color: #fff;">注册</router-link>
					</p> -->
				</div>
			</div>
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
						name: "待审核",
						router: "waitAudit"
					},
					{   
						name: "已审核",
						router: "audited"
					}
				],

				msg: 0,

				funsIndex: 0,

				allMenu:-1,

				// showHeaderList:[
				// 	'healed','healing'
				// ]
			}
		},

		watch: {
			$route() {
				
				switch (this.$route.name) {
					// 我的接诊
					case 'waitAudit':
						this.funsIndex = 0
						this.allMenu=0
						break;

					case 'toAudit' :
						this.funsIndex = 0
						this.allMenu = 0
						break;

					case 'audited':
						this.funsIndex = 1
						this.allMenu=1
                        break;
						
					case 'auditedStatus':
						this.funsIndex = 1
						this.allMenu=1
                        break;
					
					default:
						this.showHeader = false
						this.allMenu=-1
						break;

				}
			},
			
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
			}
		},
	}
</script>

<style scoped>
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
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}

	.home-top-menu a {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #f7f7ff;
		font-size: 16px;
        width: 200px;
		flex-grow: 0;
	}

	.home-top-menu a.active {
		background: linear-gradient(to bottom, #767dfb, #5b5ffb);
	}

	.home-top-user{
		margin-left: 40px;
        /* display: flex;
        justify-content: center; */
        /* background: blue; */
	}

	.home-top-user img {
        transform: translate(0, -5px);
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