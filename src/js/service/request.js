
angular.module('ctApp').factory("apiRequest", [
    "$q",
    "$http",
    "$apis",
    "loading",
    function ($q, $http, $apis, loading) {
        //var serverhost = "http://devweb20.chetong.net";
        //var serverhost = "http://localhost:8080";
        //var serverhost = "http://10.104.8.8:8080";
        var serverhost = "";

        var showLoadding = function (isShowLoadding, loaddingTitle) {
            if (isShowLoadding == undefined || isShowLoadding) {
                loading.show(loaddingTitle);
            }
        };

        var hideLoadding = function (isShowLoadding) {
            if (isShowLoadding == undefined || isShowLoadding) {
                loading.hide();
            }
        };

        var formatArrayStr = function (array) {
            if (array) {
                angular.forEach(array, function (item, key) {
                    if (key != "$$hashKey") {
                        var value = item;
                        var type = typeof value;
                        if (type === "object") {
                            if (value === undefined || value == null) {
                                array[key] = "";
                            } else {
                                array[key] = formatArrayStr(item);
                            }
                        } else {

                            if ((type === "string") || (type === "number")) {
                                value = value.toString();
                            }
                            if (value === undefined || value === null) {
                                value = "";
                            }

                            array[key] = value;
                        }
                    }
                });
                return array;
            }
        };

        var send = function (obj) {
            if(typeof obj !== "object"){
                obj = {};
            }
            var params = obj.params;
            var body = obj.body;
            var loaddingTitle = obj.loaddingTitle;
            var isShowLoadding = obj.isShowLoadding;
            var key = obj.key;

            var varThis = this;
            var defer = $q.defer();
            var url = (varThis.host ? varThis.host : serverhost) + makeApiUrl(varThis.url, params);

            var req = {
                method: varThis.method,
                url: url,
                ContentType: "application/json;charset=UTF-8",
                headers:{

                }
            };

            if (varThis.method == "UPDATE") {
                req = {
                    method: "POST",
                    url: url
                    //ContentType: "multipart/form-data"
                };
            }

            if (body) {
                req.data = formatArrayStr(body);
            }


            showLoadding(isShowLoadding, loaddingTitle);
            if (varThis.method == "UPDATE") {
                upload(body, url, defer, isShowLoadding);
            } else if (varThis.method == "JSONP") {
                url += ( url.split("?").length > 1 ? "&" : "?" ) + "callback=JSON_CALLBACK";
                $http.jsonp(url).
                    success(function (data, status, headers, config, statusText) {
                        hideLoadding(isShowLoadding);
                        var ret = data;
                        key && (ret = {data: data, key: key});
                        defer.resolve(ret);
                    }).
                    error(function (data, status, headers, config, statusText) {
                        hideLoadding(isShowLoadding);
                        var ret = data;
                        key && (ret = {data: data, key: key});
                        defer.reject(ret);
                    });
            } else {
                $http(req).
                    success(function (data, status, headers, config, statusText) {
                        hideLoadding(isShowLoadding);

                        var ret = data;
                        key && (ret = {data: data, key: key});
                        defer.resolve(ret);
                    }).
                    error(function (data, status, headers, config, statusText) {
                        hideLoadding(isShowLoadding);

                        var ret = data;
                        key && (ret = {data: data, key: key});
                        defer.reject(ret);
                    });
            }
            return defer.promise;
        };

        var upload = function (formData, url, defer, isShowLoadding) {

            var fd = new FormData();
            fd.append("fileContent", formData.FileContent);

            $.ajax({
                type: "POST",
                url: url,
                data: fd,
                cache: false,
                contentType: false,
                processData: false
            }).then(function (data) {
                    hideLoadding(isShowLoadding);
                    defer.resolve(data);
                }, function (XMLHttpRequest, textStatus, errorThrown) {
                    hideLoadding(isShowLoadding);
                    defer.reject();
                }
            );

        };

        var more = function (apis) {
            var defer = $q.defer();

            var resutlt = {};

            var len = 0, round = 0;
            angular.forEach(apis, function (item) {
                len++;
            });

            angular.forEach(apis, function (item, key) {
                $apis[key].send({
                    param:item.params,
                    body:item.body,
                    key:key
                }).then(
                    function (ret) {
                        resutlt[ret.key] = ret.data;
                        if (++round === len) {
                            defer.resolve(resutlt);
                        }
                    }, function (ret) {
                        resutlt[ret.key] = ret.data;

                        if (++round === len) {
                            defer.reject(resutlt);
                        }
                    }
                )
            });

            return defer.promise;
        }

        var service = {
            init: function () {
                for (var i in $apis) {
                    $apis[i].send = send;
                }

                $apis["more"] = more;
            }
        };

        var makeApiUrl = function (url, apiParams) {
            var api = url.split("?");
            var apiurl = api[0];
            var params = api[1];
            for (var i in apiParams) {
                if (params) {
                    params = params.replace("{" + i + "}", escape(apiParams[i]));
                }
                if (apiurl) {
                    apiurl = apiurl.replace("{" + i + "}", escape(apiParams[i]));
                }
            }
            if (params && params.length > 0) {
                apiurl += "?" + params;
            }
            return apiurl;
        };

        return service;
    }])
;