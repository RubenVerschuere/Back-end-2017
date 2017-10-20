const uuid = require('uuid');
const emitter = new (require('events').EventEmitter)();
let counter = 0;

//1. eventlisteners aanmaken 
//-> moet VOORAF: voordat via emit opgeroepen wordt ( wel geen error)

emitter.on("addedUser",  (data, counter) => {
    console.log(`je voegde een nieuwe user ${data} toe.Teller:${counter}. ID: ${uuid.v4()  }`);
});
emitter.setMaxListeners(5); //safety voor verhinderen van memory leaks

//2. event consumeren
emitter.emit("addedUser", "Johan", ++counter)
emitter.emit("addedUser", "Kevin", ++counter)
