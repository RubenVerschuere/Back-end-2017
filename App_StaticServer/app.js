//node example


const config = require('./config'),
      staticServer = require("./server/staticServer");

const hostname = config.HOSTNAME || '127.0.0.1', 
      port = config.PORT || 1337;

staticServer.init(port, hostname);

/*const http = require('http'),
    config = require('./config');

const hostname = config.HOSTNAME || '127.0.0.1',
    port =config.PORT || 1337;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

*/