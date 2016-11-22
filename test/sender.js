/**
 * Test sender script
 */
var Socket = require('net').Socket;
var senderId = process.env.SENDER_ID || 'TestSender1';
var targetId = process.env.TARGET_ID || 'TestSender2';
var socket = new Socket();

var log = function(msg) {
    console.log(senderId + ": " + msg);
}

socket.connect(8000, 'localhost', function() {
    log('Connection to server extablished. Registering!');

    var registerMessage = JSON.stringify({'type': 'REGISTER', 'id': senderId});
    socket.write(registerMessage, function() {
        log("Sent register message. Sending Hi Now!!");

        var hiMessage = JSON.stringify({
            'type': 'SEND',
            'id': targetId,
            'message': 'This is '+ senderId +' , saying Hi'
        });
        socket.write(hiMessage, function() {
            log("Hi message sent.");
        });
    });
});

socket.on('data', function(data) {
    log(data.toString());
});
