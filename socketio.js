var instance;
module.exports = {
  getInstance: function() {
    return instance;
  },
  setup: function(server) {
    instance = require('socket.io')(server);
    instance.on('connect', function(client) {
      client.on('join', function(data) {
        client.join(data.roomid);
        console.log(`User ${data.user} has joined board ${data.roomid}`);
      });
    });
  }
}
