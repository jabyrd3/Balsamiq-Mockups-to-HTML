var sys = require('sys');
var exec = require('exec-sync');
var fs = require('fs');
var $ = require('fquery');
var express = require('express');
var app = express();
var bmmlFiles = {};

//recursively copy all .bmml files from shared to static/bmml
$('Shared Docs/**/*.bmml').copy($.OVERWRITE, function(blob, index, fquery){
	//console.log(blob.source);
	return 'static/bmml/' + blob.source.substr(blob.source.lastIndexOf('/') + 1);
});

//render all bmml to png using balsamiq cli
var command = '"/Applications/Balsamiq Mockups.app/Contents/MacOS/Balsamiq Mockups" export ' + __dirname + '/static/bmml/' + ' ' + __dirname + '/static/images/';
console.log(command);
var cavorter = exec(command, function(err, stdout, stderr){
    if(err){console.log(err)};
    console.log('balsamiq', stdout);
});

/*
var converter = 'php convert.php ' + __dirname + '/static/bmml ' + __dirname + '/static/server/ ' + __dirname + '/static/images';
console.log(converter);
var dong = exec(converter, function(err, stdout, stderr){
   if(err){console.log(err)};
   console.log(stdout, stderr);
});
*/

//start server
app.use(express.static(__dirname + '/static/server'));
app.listen(8888, function(){console.log('server running');});
