//10.2.5-ErrorClass.js . Deze demo illustreert het (custom) error gebruik.

/*  -1.   Maak gebruik van bestaande Error types
*        met Base error methodes zoals err.message, err;stack 
*        Bvb.: RangeError, SyntaxError , TypeError , URIError
*
*/

var rngError = new RangeError('De waarde is buiten een aanvaardbaar gebied');
var refError = new ReferenceError('Deze referentie is onbestaand');
console.log(`Errors: ${rngError.message} en ${refError.message.toLowerCase()}.`)

/* -2.  Maak je eigen custom errors aan   */

class myCustomError extends Error {
    constructor(message) {
        super(message)
    }
}

var myCustomErrorInstance = new myCustomError('Dit is mijn Custom Error');
console.log(myCustomErrorInstance.message);  //returns Dit is mijn Custom Error
console.log(myCustomErrorInstance.stack);    //returns stack trace

// ENKEL synchroon testing laat try/catch toe 
try {
    throw new myCustomError('Er ging iets mis :(')
} catch (e) {
    console.log("synchrone catch message:", e.message);  //returns Er ging iets mis :(
    console.log(e.stack); //returns stack trace
}

/* 3  - asynchrone test met eventEmitter ------------------------*/

/*-- 3.1. custom error aanmaken via erving -----*/

class CalculationError extends Error {
    constructor(message) {
        super("Er is een rekenfout: " + message);
    }
}

/*-- 3.2. customer error oproepen ---*/

const emitter = new (require('events').EventEmitter)();

//functie declaratie met emitter compositie
const divide = (a, b, cb) => {
    if (b == 0) {
        emitter.emit("error", new CalculationError("delen door nul kan niet"))
    } else {
        cb(null, a / b);
    }
}

/*-- 3 run met LISTENERS. LISTENERS moeten de run voorafgaan ---*/

//listeners:
emitter.on("error",
    (err) => {
        console.log(err.name.toUpperCase() + ":\n" + err.message + "\n" + err.stack)
    }
);

//run:
divide(2, 0, (error, result) => {
    console.log(result);
})

divide(2, 20, (error, result) => {
    console.log(`Eindelijk een goed resultaat: 20/2= ${result}`);
})

