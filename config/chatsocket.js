module.exports.chatSockets = function(SocketServer){
   let io = require('socket.io')(SocketServer);


   io.sockets.on('connection', function(socket){
    console.log('new connection received', socket.id);

    // for disconnection Note funtion is present in socket
   socket.on('disconnect', function(){
    console.log('socket disconnected');
   });
    socket.join('join_room', function(data){
        console.log('joining room', data );
// if chatroom is present then that will be joined or created at the moment
        socket.join(data.chatroom);

      //   sending notification in chatroom

      io.in(data.chatroom).emit('user joined');
    })
})
}