/*
*  socketHandlers.js
*/

let colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
// ... in random order
colors.sort(function (a, b) { return Math.random() > 0.5; });

let sockets = [];

let socketHandlers = function (io) { 

    //indien met namespace
    //var io = require('socket.io').listen(httpServer);
    //var myNameSpaceio = io.of('myNameSpace');
    //myNameSpaceio.on('connection', function (socket) {

    // var io = require('socket.io').listen(httpServer);        

    //io.configure(function () {
    //    io.enable("browser client minification");//send minified file
    //    io.enable("browser client etag"); //apply etag caching
    //    io.set("log level", 1);  //reduce logging messages in console
    //    io.set("transports", ["websocket","xhr-polling","jsonp-polling"]);        
    //});

    io.sockets.on('connection', function (socket) {
        console.log("sockets connection established");
        socket.color = colors.shift();
        sockets.push(socket);

        //var int = setInterval(function () {
        //    socket.emit("Anumber", "server number: " + Math.random())
        //}, 1000)

        //server login event triggert de gebruiker éénmalig om in te loggen 
        socket.emit('login');

        socket.on('clientMsg', function (content) {
            //emit laat toe een json object te sturen
            var obj = { color: socket.color, id: socket.username, content: content };
            console.log("message from ", socket.username, ":", content);
            // socket.emit('serverMessage', content);
            objStr = JSON.stringify(obj);
            socket.emit('serverMsg', objStr); //naar zichzelf
            socket.broadcast.emit('serverMsg', objStr); // naar andere clients only
            //io.emit('serverMessage', objStr);

        });

        socket.on('login', function (username) {
            socket.username = username;
            socket.emit("serverMsg", JSON.stringify({ content: "Je bent ingelogd als " + username }));
            socket.broadcast.emit("serverMsg", JSON.stringify({ content: username + " is ingelogd" }));
        });

        socket.on('user image', function (baseImg) {
            console.log("received base64:" + baseImg);
            socket.emit('userImage', socket.id, baseImg);
            socket.broadcast.emit('userImage', socket.id, baseImg);
        });
    });
};

module.exports = socketHandlers;