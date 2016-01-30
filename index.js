var express = require('express');
var app = express();


app.get('/mynodeapp/hello', function(req, res) {
	var arr = new Array();
	var obj = null;
	for (var i=0; i<5; i++) {
		obj = new Object();
		obj.header = "My Title " + i;
		obj.paragraph = "My Paragraph " + i;
		arr.push(obj);
	}
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(arr);
});

app.listen(3000);