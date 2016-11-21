/*
 * Connection Manager for storing and processing connections
 */

/**
 * Connection Manager object to add, remove connections
 */
function ConnectionManager() {
    this.connections = {};
}

/**
 * Register a new connection
 * @param connectionId Identifier for the connection
 * @param connectionObj Actual connection object.
 */
ConnectionManager.prototype.register = function(connectionId, connectionObj) {
    this.connections[connectionId] = connectionObj;
};

/**
 * Remove connection from list
 * @param connectionObj Connection object to be removed.
 */
ConnectionManager.prototype.removeBySocket = function(connectionObj) {
    var sockId = null;
    for (var socketId in this.connections) {
        if (this.connections[socketId] == connectionObj) {
            sockId = socketId;
            break;
        }
    }

    if (sockId) {
        delete this.connections[socketId];
        return true;
    }

    return false;
};

/**
 * Get connection for connection id
 * @param connectionId ID of connection to fetch
 */
ConnectionManager.prototype.get = function(connectionId) {
    return this.connections[connectionId];
}


exports.ConnectionManager = ConnectionManager;
