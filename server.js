/*
 * Socket based server for sending messages
 */

 /*
  * Server for receiving and sending messages
  */

var net = require('net');
var utils = require('./core/utils');
var messaging = require('./core/messages');
var ConnectionManager = require('./core/connmgr').ConnectionManager;
var IncomingMessage = messaging.IncomingMessage;
var ResponseMessage = messaging.ResponseMessage;

var server = net.createServer();
var port = process.env.PORT || 8000;
var host = process.env.HOST || 'localhost';
var connectionManager = new ConnectionManager();

 // Assign callbacks for events
 server.on('connection', function(socket) {
     utils.log('New connection initiated');

     // determine what kind of message it is and process it.
     socket.on('data', function(data) {
         var message, result, targetId, contents;

         try {
             message = new IncomingMessage(data.toString());

             if (message.isNewClient()) {
                 connectionManager.register(message.getIdentifier(), socket);
                 // TODO: Build response and send.

             } else if (message.isData()) {

                 targetId = message.getIdentifier();
                 contents = message.getContents();

                 // is connection for target available.
                 if (connectionManager.get(targetId)) {
                     connectionManager.get(targetId).write(contents);
                 }

                 // TODO: Build response and send.
             }

         } catch(e) {
             utils.log(e);
         }
     });

     // Handle error cases, connections closing, timeout etc.
     socket.on('error', function(e) {
         utils.log(e);
     });

     socket.on('timeout', function() {
         utils.log("Socket timed out");
         connectionManager.removeBySocket(socket);
     });

     socket.on('close', function() {
         utils.log('Removing connection');
         connectionManager.removeBySocket(socket);
     });
 });

 // listen to error event to close connections gracefully.
 server.on('error', function(e) {
     utils.log(e);
     utils.log("Shutting down server!");
 });

 // listen to incoming messages.
 server.listen(port, host);
 utils.log('Server running on ' + host + ':' + port.toString());
