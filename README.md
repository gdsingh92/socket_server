# Mobile Messaging Server

This project is NodeJS based messaging server. It can be used send push messages to connected clients. The server discards duplicate messages which are sent to the same client.

To get started you will the need to have following:

* Node.js (>5.0)
* Redis Server

To get up and running do these steps:
* Clone this git repo in your system
* Go the project folder and run ```npm install``` to install all dependencies
* Run ```node server.js``` to start the messaging server.

By default the server runs ```localhost``` interface and port ```8000```. You can pass parameters ```HOST``` and ```PORT``` as environment variable to run it on seperate network interface and port. For example:

```HOST=10.0.0.1 PORT=80 node /path/to/project/folder/server.js```

To change HOST and PORT for redis server, pass `REDIS_HOST` and `REDIS_PORT` as environment variables.

### Limitations:

 * This server currently does not provide authorization layer. To provide authorization and access control a HTTPS based mediatory server can be used which can issue tokens to clients for authorization.
 * Node.js is single threaded and thus this code does not utilize the CPU to full advantage. You can run it in cluster mode, but i have not tested it yet.
 * Need to add mechanism to store messages for a while, if the client to whom the messages have to be delivered is not available.
