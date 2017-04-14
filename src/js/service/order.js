angular.module('ctApp').factory("order", [
    function() {

        var set = function(obj) {
            localStorage.setItem("agentOrder",JSON.stringify(obj));
        };

        var get = function() {
            return JSON.parse(localStorage.getItem("agentOrder"));
        };

        return {
            set: set,
            get: get
        };
    }

]);