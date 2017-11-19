/*
        *File: app.js
        *Author: Asad Memon / Osman Ali Mian
        *Last Modified: 5th June 2014
        *Revised on: 30th June 2014 (Introduced Express-Brute for Bruteforce protection)
*/


var express = require('express');
var arr = require('./compilers');
var sandBox = require('./DockerSandbox');
var app = express.createServer();
var port=process.env.PORT || 3000;


var ExpressBrute = require('express-brute');
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store,{
    freeRetries: 50,
    lifetime: 3600
});

app.use(express.static(__dirname));
app.use(express.bodyParser());

app.all('*', function(req, res, next) 
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

function random(size) {
    //returns a crypto-safe random
    return require("crypto").randomBytes(size).toString('hex');
}

var runningRequests = [];
var MAX_CONCURRENT_REQUESTS = 2;
var MAX_QUEUE_SIZE = 20;

function shouldDelay(req) {
    for (var i = 0; i < MAX_CONCURRENT_REQUESTS; i++) {
	if (runningRequests[i][0] == req) {
	    return false;
        }
    }
    return true;    
}

function cleanupQueue() {
    // throw out anything more than two minutes old
    var currTime = new Date();
    for (var i = runningRequests.length - 1; i >= 0; i--) {
        if ((currTime - runningRequests[1]) > 60000) {
            runningRequests.splice(i, 1);
        }
    } 
}

function addToQueue(req, res) {
    cleanupQueue();
    if (runningRequests.length <= MAX_QUEUE_SIZE) {
	console.log('queuing request');
      runningRequests.push([req, new Date()]);
      return true;
    }
    else {
	console.log('ignoring request');
       res.writeHead(500);
       res.end('queued reached max size');
       return false;
    }
}

function removeFromQueue(req) {
    for (var i = runningRequests.length - 1; i >= 0; i--) {
	if (runningRequests[i][0] == req) {
	    runningRequests.splice(i, 1)
        }
    }     
}

function isQueued(req) {
	for (var i = 0; i < runningRequests.length; i++) {
	    if (runningRequests[i][0] == req) {
		return true;
	    }
	}
        return false;
}

function runSandbox(req, res, language, code, sandboxType) {
    if (!isQueued(req)) {
	res.writeHead(500);
        res.end('execution timed out');
	return undefined;
    }
    if (shouldDelay(req)) {
	setTimeout(function() { runSandbox(req, res, language, code, sandboxType); }, 100);
    }
    else {
	sandboxType.run(function(data,exec_time,err)
			{
			    //console.log("Data: received: "+ data)
                            removeFromQueue(req); 
			    res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
			});
    }
}

app.post('/compile', function(req, res) {
    var language = (req.body || []).language;
    var code = (req.body || []).code;
    var stdin = (req.body || []).stdin;

    if ([language, code, stdin].some((value) => value === undefined)) {
        res.writeHead(400);
        res.end(
            'Missing parameter(s): ' +
            ([
                'language', 'code', 'stdin'
             ])
                .filter((param) =>
                    (req.body || [])[param] === undefined)
                .map(JSON.stringify)
                .join(', '));
        
        return undefined;
    }

    var added = addToQueue(req, res);
    if (!added) {
	return;
    }

    var folder= 'temp/' + random(10); //folder in which the temporary folder will be saved
    var path=__dirname+"/"; //current working path
    var vm_name='virtual_machine'; //name of virtual machine that we want to execute
    var timeout_value=20;//Timeout Value, In Seconds

    //details of this are present in DockerSandbox.js
    var sandboxType = new sandBox(timeout_value,path,folder,vm_name,arr.compilerArray[language][0],arr.compilerArray[language][1],code,arr.compilerArray[language][2],arr.compilerArray[language][3],arr.compilerArray[language][4],stdin);

    runSandbox(req, res, language, code, sandboxType);
});

app.get('/health', function(req, res) 
{
    cleanupQueue()
    if (runningRequests.length >= MAX_QUEUE_SIZE) {
	res.writeHead(500);
        res.end('queued reached max size')
    }
    else {
	res.writeHead(200);
        res.end('healthy');
    }
});

app.get('/', function(req, res) 
{
    res.sendfile("./index.html");
});

console.log("Listening at " + port);
app.listen(port);
