/*
 * Utilities for this project
 */

/**
 * Log message on server
 * @param msg: Message to be logged.
 */
exports.log = function(msg) {
    var now = new Date();
    console.log(now.toString() + " " + msg);
};
