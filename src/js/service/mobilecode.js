angular.module('ctApp').factory("mobilecode", [
    "$apis",
    function($apis) {

        var send = function(mobile) {
            $apis.getCode.send({
                loaddingTitle: "正在发送...",
                body: {
                    mobile: mobile
                }
            }).then(function(data) {
                weui.toast('已发送成功', 3000);
            }, function(err) {
                weui.topTips('发送验证码失败，请重新获取');
            });
        };

        return {
            send: send
        };
    }

]);