// import request from './request'

const prod = require('~/dev.env');
if(prod == 'production'){
	var  proxy = ''
}else{
	var proxy = 'http://api.taokezhushou.com/api/v1'
}
const appId = "c98d39b205c25a51";
var api = {
	// getList: (r) => request.get(proxy+'/search', null, {
	// 	"app_key": appId
	// }),
	getList(callback) {
		wx.request({
			url: proxy+"/search",
            data: {
                "app_key": appId,
            },
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function (res) {
				// success
				callback(res.data);
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})
	},
}

export default api