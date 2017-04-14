/**
 * Created by zhudm on 2017/4/24.
 */

angular.module('ctApp').value('$apis', {
	getCarShpList: {
		url: '/car/list',
		method: 'POST'
	},
	getCode: {
		url: '/mobile/code',
		method: 'POST'
	}
});