/**
 * Created by zhudm on 2017/4/24.
 */

angular.module('ctApp').value('$apis', {
	userBind: {
		url: '/ct-proxy-api/wx/gateWay.do',
		serviceName: "userWxService.bindingUser",
		method: 'POST'
	},
	userInfo: {
		url: '/ct-proxy-api/wx/gateWay.do',
		method: 'POST'
	},
	getCarShopList: {
		url: '/ct-proxy-api/wx/gateWay.do',
		serviceName: "merchantWxService.getMerchantListForBespeakItem",
		method: 'POST'
	},
	getOrderList: {
		url: '/ct-proxy-api/wx/gateWay.do',
		serviceName: "bespeakWxService.myBespeakList",
		method: 'POST'
	},
	getCode: {
		url: '/ct-proxy-api/wx/gateWay.do',
		method: 'POST'
	},
	getCarNoList: {
		url: '/ct-proxy-api/wx/gateWay.do',
		serviceName: "carWxService.myCarInfoList",
		method: 'POST'
	}
});