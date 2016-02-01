var express = require('express');
var app = express();
var myurl = require('url');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var request = require('request');

app.get('/mynodeapp/bySection/:firstPart', function(req, res) {
	var testParm = req.params.test;
	var firstPart = req.params.firstPart;
	var arr = new Array();
	var obj = null;

	
	var url_parts = myurl.parse(req.url, true);
	var query = url_parts.query;
	var url = 'mongodb://localhost:27017/test';
	res.header('Access-Control-Allow-Origin', '*');
	/*for (var i=0; i<5; i++) {
		obj = new Object();
		obj.header = firstPart + " My Title " + testParm + " " + i;
		obj.paragraph = "My Paragraph " + query.id + " " + i;
		arr.push(obj);
	}*/

	MongoClient.connect(url, function(err, db) {
	    assert.equal(null, err);
	    findColumns(firstPart, db, function(err, results) {
         	res.send(results[0].columns);
         	db.close();  
		});
	});
	
});

app.get('/getData', function(req, res) {
request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body) // Print the google web page.
     }
})
})

app.get('/pushdata', function(req, res){
	var url = 'mongodb://localhost:27017/test';
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected correctly to server.");
	  db.close();
	});

	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  insertDocument(db, function() {
	      db.close();
	      var obj = new Object();
	      obj.status = 'Successful';
	      res.send(obj);
	  });
	});
});



var insertDocument = function(db, callback) {
   db.collection('columns').insertOne( {
   	columns:
      [ 
	      {
	      	header:"Header 1",
	      	paragraph:"Pargraph 1"
	      },
	      {
			header:"Header 1",
	      	paragraph:"Pargraph 1"
	      },
	      {
			header:"Header 1",
	      	paragraph:"Pargraph 1"
	      }
      ]
   }, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
};

var findColumns = function(section, db, callback) {
   	db.collection('columns').find( {}).toArray(callback);
};

app.listen(3000);