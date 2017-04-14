/**
 * Created by Amanda Shen on 2015/4/28.
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