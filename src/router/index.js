import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";


Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "index",
		redirect: '/leftMenu',
		component: () => import("../views/index.vue"),
		children: [
			{
				path: "leftMenu",
				name: "leftMenu",
				component: () => import("../views/coverSolt.vue"),
				redirect: '/leftMenu/indexChildren',
				children: [
					{
						path: "indexChildren",
						name: "indexChildren",
						component: () => import("../views/index/indexChildren.vue")
					},
					{
						path: "healed",
						name: "healed",
						component: () => import("../views/heal/healed.vue")
					},
					// {
					// 	path: "healing",
					// 	name: "healing",
					// 	component: () => import("../views/heal/healing.vue")
					// },
					{
						path: "waitconfirm",
						name: "waitconfirm",
						component: () => import("../views/heal/waitconfirm.vue")
					},
					{
						path: "attestation",
						name: "attestation",
						component: () => import("../views/attestation/attestation.vue")
					},
					{
						path: "waitingHeal",
						name: "waitingHeal",
						component: () => import("../views/heal/waitingHeal.vue")
					},
					{
						path: "userInfo",
						name: "userInfo",
						redirect: '/leftMenu/userInfo/personInfo',
						component: () => import("../views/user/userInfo.vue"),
						children:[
							{
								path: "personInfo",
								name: "personInfo",
								component: () => import("../views/user/children/personInfo.vue"),
							},
							{
								path: "userImg",
								name: "userImg",
								component: () => import("../views/user/children/userImg.vue"),
							},
							{
								path: "accountInfo",
								name: "accountInfo",
								component: () => import("../views/user/children/accountInfo.vue"),
							},
							{
								path: "updateUser",
								name: "updateUser",
								component: () => import("../views/user/children/updateUser.vue"),
							},
						]
					},
					{
						path: "waitReporting",
						name: "waitReporting",
						component: () => import("../views/reporting/waitReporting.vue")
					},
					{
						path: "prescription",
						name: "prescription",
						component: () => import("../views/prescription/prescription.vue")
					},
					{
						path: "checkPrescription",
						name: "checkPrescription",
						props: true,
						component: () => import("../views/prescription/checkPrescription.vue")
					},
					{
						path: "Scheduling",
						name: "Scheduling",
						component: () => import("../components/Scheduling.vue")
					},
					{
						path: "quickTreated",
						name: "quickTreated",
						component: () => import("../views/quickTreated")
					},
					{
						path: "recived",
						name: "recived",
						component: () => import("../views/quickTreated/recived")
					},				]
			},
			{
				path: "qiuckchat",
				name: "qiuckchat",
				component: ()=>import("../views/chat/chat.vue")
			},
			{
				path: "mychat",
				name: "mychat",
				component: ()=>import("../views/chat/chat.vue")
			},
			{
				path: "chat",
				name: "chat",
				component: ()=>import("../views/chat/chat.vue")
			},
			{
				path: "openPrescription",
				name: "openPrescription",
				component: () => import("../views/prescription/openPrescription.vue")
			},
			{
				path: "details",
				name: "details",
				component: () => import("../views/prescription/details.vue")
			},
			
		]
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/login.vue"),
	},
	{
		path: "/",
		name: "apoIndex",
		redirect: '/apoLeftMenu',
		component: () => import("../views/apothecary"),
		children: [
			{
				path: "apoLeftMenu",
				name: "apoLeftMenu",
				component: () => import("../views/coverSolt.vue"),
				redirect: '/apoLeftMenu/waitAudit',
				children: [
					{
						path: "waitAudit",
						name: "waitAudit",
						component: () => import("../views/apothecary/waitAudit")
					},
					{
						path: "audited",
						name: "audited",
						component: () => import("../views/apothecary/audited")
					},
					{
						path: "toAudit",
						name: "toAudit",
						props: true,
						component: () => import("../views/apothecary/apoCheckPre")
					},
					{
						path: "auditedStatus",
						name: "auditedStatus",
						props: true,
						component: () => import("../views/apothecary/apoCheckPre")
					},
					{
						path: "nopassReason",
						name: "nopassReason",
						component: () => import("../views/apothecary/audited/nopassReason")
					},
					{
						path: "apoInfoIndex",
						name: "apoInfoIndex",
						redirect: '/apoLeftMenu/apoInfoIndex/apoInfo',
						component: () => import("../views/user/userInfo.vue"),
						children: [
							{
								path: "apoInfo",
								name: "apoInfo",
								component: () => import("../views/user/children/personInfo.vue"),
							},
							{
								path: "apoImg",
								name: "apoImg",
								component: () => import("../views/user/children/userImg.vue"),
							},
							{
								path: "apoAccountInfo",
								name: "apoAccountInfo",
								component: () => import("../views/user/children/accountInfo.vue"),
							},
							{
								path: "apoUpdateUser",
								name: "apoUpdateUser",
								component: () => import("../views/user/children/updateUser.vue"),
							},
						]
					}
				]
			}
		]
	}
	
];

const router = new VueRouter({
	routes
});
//权限白名单['路由name']
const write = ['login']
//to 即将进入的路由
//from 来自哪个路由
router.beforeEach((to, from, next) => {
	if (write.indexOf(to.name) != -1) {
		// 如果在白名单里面 就直接跳转
		next()
	} else {
		// 没在白名单中/ 进行检测 是否登录
		if (localStorage.getItem('token') != null) {
			let num=0;
			let vuex = setInterval(() => {

				if(num>50){
					console.log('超时!!!');
					clearInterval(vuex)
					next({
						name: 'login'
					})
					return
				}

				if(store.state.Info.id==''||store.state.Info.id==null||store.state.Info.id==undefined){
					num++
				}else{
					next()
					clearInterval(vuex)
				}


			}, 50);
		} else {
			next({
				name: 'login'
			})
		}
	}
})

export default router;


