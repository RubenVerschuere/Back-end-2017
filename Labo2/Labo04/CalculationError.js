const emitter = new (require("events")).EventEmitter();
const winston = new require("winston");

let logger = new winston.Logger({
    level:'info', 
    transports: [
        new winston.transports.File({filename: '../Log/error.log'})
    ]
});


class CalculationError extends Error {
    constructor(message, showInConsole = false, logging =  false){
        super();
        this.message = "Er is een rekenfout gebeurd:\n" + message;
        this.emitter = emitter;
        this.emitter.on("error", (err)=> {
            this.onFout(err);
         })
        this.showInConsole = showInConsole;
        if(logging) { this.log(); console.log("Winston saved the error")}
    }

    onFout(err){
        if(this.showInConsole){
            console.log("fout via CalcError class:\n" + err);        
        }
    }

    log() {
        logger.log('info', `winston error: ${this.stack}`, {commentaar: "iets"})
    }
}

module.exports =  CalculationError;