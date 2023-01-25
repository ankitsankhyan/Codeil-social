class ChatEngine{
    constructor(chatBoxId, userEmail){
        // this fetches the element with id chatBoxID
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

// this sends connection request using socket
// here in transports we are specifiying that 
        this.socket = io.connect('http://localhost:5000',{ transports : ['websocket'] });

        // if user mail is present then call connection handler
             console.log(userEmail, 'checking userEmail');
        if(this.userEmail){
            this.connectionHandler();
        }



    }
    // this is a method in class
    // this method replies when a connection is established 
        connectionHandler(){
            // when connect event occurs then callback function is called
            console.log('inside connection handler')
            let self = this;
            console.log('inside connection handler')
           
            this.socket.on('connect', function(){
                console.log('connection establised using sockets...!');
               
                 
                    self.socket.emit('join_room', {
                        User_Email: self.userEmail,
                        chatroom:'ankit_chat_room'
                    })
            //   this is sending the event from one thing and receiving here only
                    self.socket.on('user_joined', function(data){
                        console.log('user joined ', data);
                    })
            
            });
        }
    }
