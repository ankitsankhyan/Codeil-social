module.exports.chatSockets = function(SocketServer){
   let io = require('socket.io')(SocketServer);


   io.sockets.on('connection', function(socket){
    console.log('new connection received', socket.id);

    // for disconnection Note funtion is present in socket
   socket.on('disconnect', function(){
    console.log('socket disconnected');
   });

})
}