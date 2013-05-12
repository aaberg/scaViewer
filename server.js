var connect = require('connect');

var oneDay = 86400000;
var port = process.env.PORT || 8080;


console.log("starting static server on port " + port + " ...");
connect.createServer(
    connect.static(__dirname + '/app', { maxAge: oneDay})
).listen(port);