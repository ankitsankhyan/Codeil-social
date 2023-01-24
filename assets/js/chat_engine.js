class ChatEngine{
    constructor(chatBoxId, userEmail){
        // this fetches the element with id chatBoxID
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

// this sends connection request using socket

        this.socket = io.connect('http://localhost:5000',{ transports : ['websocket'] });

        // if user mail is present then call connection handler

        if(this.userEmail){
            this.connectionHandler();
        }



    }
    // this is a method in class
    // this method replies when a connection is established 
        connectionHandler(){
            // when connect event occurs then callback function is called
            this.socket.io('connect', function(){
                console.log('connection establised using sockets...!');
            })
        }
    }
