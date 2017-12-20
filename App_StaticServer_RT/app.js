//opbouwen van een static server (streaming)
//behandelen van files, api's, video's

//aandachtspunten: 
//1. streaming onderhouden op de server
//2. modulair opbouwen (functionele delen zoals router afsplitsen)
//3. configuraties in app.js of in config file onderbrengen 
//4. error control en handlers (fout opslag) verder uit te bouwen

const config = require('./config'),
    router = require('./server/router'),
    staticServer = require('./server/staticServer');

const hostname = config.HOSTNAME || '127.0.0.1',
    port = config.PORT || 1337;

//staticServer.init(port, hostname);

//indien met middleware 
staticServer.init(port, hostname, router);