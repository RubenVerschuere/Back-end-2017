"use strict"
const router = require("./router"),
      path = require("path");

let staticServer = (function(port,hostname){
    const http = require("http");

   
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    router.setStaticfolder(path.normalize(process.cwd() + "/client/public"));
    router.init(req, res, function(err, rs, mimeType){
        if(err){
            res.writeHead(500);
            res.end("500: Server Error :\n" + err.message)
            //emitter
        } else {
            res.statusCode = "200";
            res.setHeader("Content-Type", mimeType)
            rs.pipe(res);
        }
    });
});

const init = (port, hostname) => {
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });    
}

return {init}

})();

module.exports = staticServer;