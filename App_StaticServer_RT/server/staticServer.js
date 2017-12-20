"use strict";
const router = require("./router"),
  path = require("path")
    ;


let staticServer = (function (port,hostname ) {

    const http = require("http");

    let router; 


    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        router.setStaticFolder(path.normalize(process.cwd() + "/client/public"));

        router.init(req, res, function (err, rs, mimeType) {
            process.on("uncaughtException", (err) => {
                console.log("Volgende error is niet behandeld:\n" + err);
                res.end("500: Server Error :\n" + err.message);
            });

            if (err) {
                res.writeHead(500);
                res.end("500: Server Error :\n" + err.message);
            } else {
                res.statusCode = "200";
                rs.on('error', (err) => {
                    //handleError(e) //nog uit te werken
                    console.log(err.message);
                    res.end("500: Streaming Error :\n" + err.message);
                });

                res.setHeader("Content-Type", mimeType || "text/html");
                rs.pipe(res);
                //res.end(rs)  //onnodig bij pipe
            }
        });
        //res.end('Hello World\n');
    });

    const init = (port, hostname, routerInstance) => {
        //1. servere initialiseren
        router = routerInstance;
          server.listen(port, hostname, () => {
            //console.log(`Server running at http://${hostname}:${port}/`);
        });
        //2. socket.io met de server als dependancy
          let io = require("socket.io").listen(server);
          console.log(`Sockets with server listening at http://${hostname}:${port}/`);
          require("./socketSimpleEcho")(io);
          require("./socketHandlers")(io);
    };
    return { init };
})();

module.exports = staticServer;