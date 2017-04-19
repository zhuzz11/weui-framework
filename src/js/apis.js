/**
 * Created by zhudm on 2017/4/24.
 */

angular.module('ctApp').value('$apis', {
	userBind: {
		url: '/user/bind',
		serviceName: "userWxService.bindingUser",
		method: 'POST'
	},
	userInfo: {
		url: '/user/info',
		method: 'POST'
	},
	getCarShopList: {
		url: '/car/list',
		method: 'POST'
	},
	getCode: {
		url: '/mobile/code',
		method: 'POST'
	}
});