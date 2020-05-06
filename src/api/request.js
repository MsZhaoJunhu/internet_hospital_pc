/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import {
	Loading
} from 'element-ui';


let load = null
// 环境的切换
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = "/api";
	// axios.defaults.baseURL = 'http://www.zjcoo.cn:8081';
} else if (process.env.NODE_ENV == 'debug') {
	axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'http://122.112.206.233:9528';
}

// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
	config => {
		load = Loading.service({
			lock: true,
			text: '加载数据中...',
			background: 'rgba(255,255,255,.8)'
		});
		let token = localStorage.getItem('token')
		if(token){
			config.headers['X-TOKEN'] = token;
		}
		return config;
	},
	error => {
		return Promise.error(error);
	})

// 响应拦截器
axios.interceptors.response.use(
	response => {
		load.close()
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是200的情况    
	error => {
		load.close()
		if (error.response.status) {
			// switch (error.response.status) {
			// 	case 401:
			// 		break;
			// 	case 403:
			// 		break;
			// 	case 404:
			// 		break;
			// 	case 500:
			// 		console.log('前后端需要统一')
			// 		this.$router.push('/login')
			// 		localStorage.removeItem('token')
			// 		break;
			// 	default:
			// }

			return Promise.reject(error.response);
		}
	}
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(
			url,
			{
				withCredentials: true,
				params: params
			}
			)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(
			url,
			params,
			{
				withCredentials: true
			}
		)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
