module.exports = (configURL, database) => {
    let options = {
     useMongoClient:true, //must sedert Mongoose 4
     reconnectTries: 5
     };
    let db = database.connect(configURL, options);
    database.connection.on("open", () => {
        var msg = "connection met mongodb" + configURL;
        console.log(msg)
     })
    database.connection.on("error", (error) => {

    })
    database.connection.on("close", () => { 
        var msg = "Not a connection met mongodb" + configURL;
        console.log(msg)
    })
    return database; //voor gebruik in andere modules
    }
    