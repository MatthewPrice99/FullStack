const io = require('socket.io')();
const client = require('socket.io').listen(8000).sockets;
const goose = require('mongoose');



goose.connect('mongodb://blank327:pop123456@ds155903.mlab.com:55903/chatdb', function(err, db){
    if(err){
        throw err;
    }
client.on('connection', function(socket){
    let chat = db.collection('chats');
    let user = db.collection('users');
    let admin = db.collection('admins');
    let event = db.collection('events');

    // Create function to send status
    sendStatus = function(s){
        socket.emit('status', s);
    }

    //get call to user/pass
    socket.on('checkpass',function(data){
        admin.find({"username":data}).toArray(function(err,res){
            if(err){
                throw err;
            }
            console.log(res[0].username);
            socket.emit('output2',res)
        });
    });
    //get chatroom number
    socket.on('chatroomnumber',function(data){

        // Get chats from mongo collection
    chat.find({"chatroom":data}).limit(100).sort({_id:1}).toArray(function(err, res){
        if(err){
            throw err;
        }

        // Emit the messages
        socket.emit('output', res);
    });
    });
    //event call
      socket.on('eventcall',function(data){
        // Get events from mongo collection
        event.find({}).limit(100).sort({_id:1}).toArray(function(err, res){
        if(err){
            throw err;
        }

        // Emit the events
        socket.emit('eventoutput', res);
    });
    });
     //chat history call
     socket.on('chatcall',function(data){
        // Get events from mongo collection
        user.find({}).limit(100).sort({_id:1}).toArray(function(err, res){
        if(err){
            throw err;
        }

        // Emit the events
        socket.emit('useroutput', res);
    });
    });

    //on Userconnected
    socket.on('userconnected',function(data,data2){
        console.log(`${data} has connected...`)
        console.log(data2[0])
        event.insertOne({name:data2[0],event:"connected",chatroom:data2[1],date:data2[2]});  

    });
    //On disconnect
    socket.on('disconnect',function(data){
        console.log(`${data} has disconnected from the server.`)
    });

  

    // Handle input events
    socket.on('input', function(data){
        let chatroom = data.chatroom;
        let name = data.name;
        let message = data.message;
        let date = Date(Date.now()).toString();

        // Check for name and message
        if(name == '' || message == ''){
            // Send error status
            sendStatus('Please enter a name and message');
        } else {
            // Insert message to chats
            chat.insert({name: name, message: message, chatroom: chatroom}, function(){
                
                // client.emit('output3', [data]);
                chat.find({"chatroom":chatroom}).limit(100).sort({_id:1}).toArray(function(err, res){
                    if(err){
                        throw err;
                    }
            
                    // Emit the messages
                    socket.emit('output', res);
                });
                
                 // Insert data to users
            user.insert({name: name, message: message, chatroom: chatroom, date: date},function(){
                console.log(`Data has been saved to user collection at current date of: ${date}`)

            });
                // Send status object
                sendStatus({
                    message: 'Message sent',
                    clear: true
                });
            });
        }
    });

    // Handle clear
    socket.on('clear', function(data){
        // Remove all chats from collection at chatroom
        chat.remove({"chatroom":data}, function(){
            // Emit cleared
            socket.emit('cleared');
        });
    });
});
});

