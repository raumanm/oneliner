let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

users = [];

io.on('connection', (socket) => {
    let user = {};
    console.log('User connected');
    user['id'] = socket.id;
    users.push(user); 

    socket.on('disconnect', function(){
        console.log('User disconnected');
        //socket.broadcast.emit('disconnect', user.name);
        users = users.filter((el) => {
            return el.id !== socket.id;
        });
    });

    socket.on('message', (data) => {
        let message = new Object(JSON.parse(data))
        if (message.hasOwnProperty('register')) {
            user['name'] = message.register;
            socket.emit('names', users.map(a => a.name));
            socket.broadcast.emit('names', users.map(a => a.name));
            console.log(users);
        }
        if (message.hasOwnProperty('message')) {
            socket.emit('message', user['name'] + "> " + message.message);
            socket.broadcast.emit('message', user['name'] + "> " + message.message);
        }
        console.log("Message Received: " + JSON.stringify(message));  
    });
});

http.listen(3300, () => {
    console.log('started on port 3300');
});