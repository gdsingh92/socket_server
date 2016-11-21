/*
 * Socket based server for sending messages
 */

 /*
  * Server for receiving and sending messages
  */

var net = require('net');
var server = net.createServer();

var port = process.env.PORT || 8000;
var host = process.env.HOST || 'localhost';

 // Assign callbacks for events
 server.on('connection', function(socket) {
     console.log('new connection initiated');
 });

 // listen to error event to close connections gracefully.
 server.on('error', function(e) {
     console.error(e);
     console.error("Shutting down server!");
 });

 // listen to incoming messages.
 server.listen(port, host);
 console.log('Server running on ' + host + ':' + port.toString());
