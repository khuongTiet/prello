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
      client.on('newList', function(data) {
        client.broadcast.to(data.roomid).emit('newList', data);
        console.log(`List ${data.title} created by ${data.author}`);
      });
      client.on('newCard', function(data) {
        console.log(`Card created`);
      });
      client.on('newLabel', function(data) {
        client.broadcast.to(data.roomid).emit('newLabel', data);
        console.log(`New label added by ${data.author}`);
      });
      client.on('newComment', function(data){
        console.log('New comment added');
      });
    });
  }
}
