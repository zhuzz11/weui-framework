angular.module('ctApp').factory("loading", [
    function () {
    	var loading = null;
    	var show = function(text){
    		loading = weui.loading(text ? text : "loading...");
    	};

    	var hide = function(fn){
    		if(loading){
    			loading.hide(fn);
    		}
    	};

    	return {
    		show:show,
    		hide:hide
    	};
    }

])