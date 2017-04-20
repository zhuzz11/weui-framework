/**
**跨域代理文件
**/

var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var url = require("url");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

var setting = {
	localPort: 8080,
	remoteDomain: "http://dev.chetong.net"
};

app.use(express.static("dist"));

app.use("/ct-proxy-api/*", function(req, res) {
	var opts = {
		url: setting.remoteDomain + req.originalUrl, //请求的url
		headers: req.headers,
		method: req.method,
		body: req.body,
		json: true
	};
	request(opts, function(err, response, data) {
		res.send(data);
		console.log("\n请求url:  "+req.originalUrl+ "\n请求serviceName:  " + req.body.serviceName + "\n请求返回结果："+JSON.stringify(data));
	});
});

app.listen(setting.localPort, function() {
	console.log("正在监听" + setting.localPort);
});
