let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

users = [];

io.on('connection', (socket) => {
    let user = {};
    console.log('User connected');
    user['socket'] = socket;
    users.push(user); 
    

    socket.on('disconnect', function(){
        console.log('User disconnected');
        let user = users.filter(el => el.socket.id === socket.id );
        users = users.filter(el => el.socket.id !== socket.id);
        if (users.length !== 0 && user.length === 1) {
            users.forEach(element => {
                console.log("Telling " + element.name + " " + user[0].name + "disconnected")
                element.socket.emit('removed', user[0].name);
            });
        }
    });

    socket.on('message', (data) => {
        let message = new Object(JSON.parse(data))
        if (message.hasOwnProperty('message')) {
            socket.emit('message', user['name'] + "> " + message.message);
            socket.broadcast.emit('message', user['name'] + "> " + message.message);
        } 
        else if (message.hasOwnProperty('users')) {
            socket.emit('names', users.map(a => a.name));
        }
        else if (message.hasOwnProperty('register')) {
            if (users.map(a => a.name).filter(el => el === message.register).length !== 0) {
                socket.emit('registered', false);
            } else {
                user['name'] = message.register;
                socket.emit('registered', true);
                socket.broadcast.emit('joined', user['name']);
                console.log(users);
            }
        }
        console.log("Message Received: " + JSON.stringify(message));  
    });
});

http.listen(3300, () => {
    console.log('started on port 3300');
});