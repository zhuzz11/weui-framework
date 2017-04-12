/**
 * Created by Amanda Shen on 2015/4/28.
 */

angular.module('ctApp').
    value('$apis', {
    	getDamageOrder: {
            url: '/ctbackend/rest/ctAppOrder/getLossOrder',
            method: 'POST'
        },
    });