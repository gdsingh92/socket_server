/*
 * Module defining message objects for sending and receiving messages
 */
var utils = require('./utils');

// Message type showing new connection registration
exports.TYPE_REGISTER = "REGISTER";

// Message type showing new data
exports.TYPE_SEND = "SEND"


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
