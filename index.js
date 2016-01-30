var express = require('express');
var app = express();
var url = require('url');

app.get('/mynodeapp/:firstPart/:test', function(req, res) {
	var testParm = req.params.test;
	var firstPart = req.params.firstPart;
	var arr = new Array();
	var obj = null;

	
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	for (var i=0; i<5; i++) {
		obj = new Object();
		obj.header = firstPart + " My Title " + testParm + " " + i;
		obj.paragraph = "My Paragraph " + query.id + " " + i;
		arr.push(obj);
	}
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(arr);
});

app.listen(3000);