/**
 * Test sender script
 */
var Socket = require('net').Socket;
var senderId = process.env.SENDER_ID || 'TestSender1';
var targetId = process.env.TARGET_ID || 'TestSender2';
var socket = new Socket()

socket.connect(8000, 'localhost', function() {
    console.log('client connected');
    function handleMessage() {}

    socket.write(JSON.stringify({'type': 'REGISTER', 'id': senderId}), function() {

        setTimeout(function() {
            var i = 1;
            socket.write(JSON.stringify({
                'type': 'SEND',
                'id': targetId,
                'message': 'This is '+ senderId +' , saying Hi for ' + i + ' time'
            }), handleMessage);

        }, 1000);

    });
});

socket.on('data', function(data) {
    console.log(senderId + "got: " + data.toString());
});
