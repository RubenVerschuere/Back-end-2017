/*
 * socketsEcho.js
 *      verzorgt socket "connection" event
 *      bevat alle socket events: socket.on(' ', () => {})
 * 
 */

let sockets = [];

module.exports = (io) => {
    console.log("sockets handler for echo loaded");

    io.sockets.on('connection', (socket) => {
        console.log("sockets connected");
        //sockets.push(socket);

        socket.on('clientMessage', (data) => {
            socket.emit('serverMessage', `The client said: ${data}`);
        })

    })
}