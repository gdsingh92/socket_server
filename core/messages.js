/*
 * Module defining message objects for sending and receiving messages
 */
var redis = require('redis');
var utils = require('./utils');

var redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
});

// Message type showing new connection registration
exports.TYPE_REGISTER = "REGISTER";

// Message type showing new data
exports.TYPE_SEND = "SEND";

exports.MESSAGE_EXPIRY = 300; // in seconds


/**
 * Object to wrap incoming messages.
 * @param data String data coming from message. Expected to be serialized JSON format.
 */
function IncomingMessage(data) {
    try {
        data = JSON.parse(data);
    } catch(e) {
        utils.log(e);
        data = {};
    }

    if (typeof data != 'object') {
        data = {};
    }

    this.data = data;
}

/**
 * Return whether the message is registration message
 */
IncomingMessage.prototype.isNewClient = function() {
    return this.data.type == exports.TYPE_REGISTER;
};

/**
 * Return whether the message is data message
 */
IncomingMessage.prototype.isData = function() {
    return this.data.type == exports.TYPE_SEND;
};

/**
 * Get identifier from message
 */
IncomingMessage.prototype.getIdentifier = function() {
    return this.data.id;
};

/**
 * Get actual message contents
 */
IncomingMessage.prototype.getContents = function() {
    return this.data.message;
};

/**
 * Get store key of message
 */
IncomingMessage.prototype.getStoreKey = function() {
    return this.getIdentifier() + "::" + this.getContents();
};

/**
 * Check if message was sent less than 5 minutes ago
 */
IncomingMessage.prototype.isValid = function(callback) {
    redisClient.exists(this.getStoreKey(), function(err, status) {
        if (err) {
            return callback(err);
        }
        return callback(null, !status);
    });
};

/**
 * Store incoming message to the list
 */
IncomingMessage.prototype.store = function(callback) {
    var key = this.getStoreKey();
    redisClient.set(key, true, function(err) {
        if (err) {
            return callback(err);
        }

        redisClient.expire(key, exports.MESSAGE_EXPIRY, function() {
            return callback(null, true);
        });
    });
};

exports.IncomingMessage = IncomingMessage;

/**
 * Send response for a data.
 * @param data
 */
function ResponseMessage(data) {
    this.target = data;
    this.data = {
        status: null,
        description: null,
        message: data
    };
}

/**
 * Set response as successful delivered
 */
ResponseMessage.prototype.delivered = function() {
    this.data.status = "delivered";
    this.data.description = "";
};

ResponseMessage.prototype.getData = function() {
    return JSON.stringify(this.data);
}

exports.ResponseMessage = ResponseMessage;
