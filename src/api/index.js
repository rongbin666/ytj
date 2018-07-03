import request from './request'

const prod = require('~/dev.env');
if(prod == 'production'){
	var  proxy = ''
}else{
	var proxy = 'http://api.taokezhushou.com/api/v1'
}
const appId = "c98d39b205c25a51";
var api = {
	// 获得商品列表
	getList: (r) => request.get(proxy+'/top_day', {
		"app_key": appId
	}),
	getCategoty:(r) => request.get(proxy+'/search', {
		"app_key": appId,
		...r
	}),
}

export default api