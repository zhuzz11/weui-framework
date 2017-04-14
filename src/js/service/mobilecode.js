angular.module('ctApp').factory("mobilecode", [
    "$apis",
    function($apis) {

        var send = function(mobile,success,fail) {
            $apis.getCode.send({
                loaddingTitle: "正在发送...",
                body: {
                    mobile: mobile
                }
            }).then(function(data) {
                weui.toast('已发送成功', 3000);
                if(angular.isFunction(success)){
                    success(data);
                }
            }, function(err) {
                weui.topTips('发送验证码失败，请重新获取');
                if(angular.isFunction(fail)){
                    fail(err);
                }
            });
        };

        return {
            send: send
        };
    }

]);