
const emitter = new (require("events")).EventEmitter();
const CalculationError = require("./CalculationError");



class Rekenen {
    constructor(){
        this.emitter = emitter;
        this.emitter.on("error", (err)=> { return this.onFout(err) });
    }

     divide(a,b,cb) {
        if (b==0){
            emitter.emit("error", "delen door nul kan niet");
            let calcError = new CalculationError("calc error", true, true);
            calcError.emitter.emit("error", new Error("delen door nul kan niet"));
          //  calcError.log();
        }
        else {
            cb(null, a/b);
        }
    }

    onFout(err){
        console.log(err)
    }
}

//Instance van de class Rekenen
const rekenen = new Rekenen();

rekenen.divide(10, 5, (error, result)=> {
    console.log(result);
})

rekenen.divide(10, 0, (error, result)=> {
    console.log(result);
})

