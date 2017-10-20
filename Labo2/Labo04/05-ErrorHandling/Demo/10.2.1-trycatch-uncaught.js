/*---- ERROR CONTROLE
*
*   Catch werkt niet in een async omgeving => app stopt.
*   Gebruik uncaughtException met error handling => app continuous 
*
*/


//process.on('uncaughtException',
//    (err) => { console.trace("een uncaught error is caught" + err); })


try {
    setTimeout( ()=> {
        throw new Error("Ik ben een 'uncaught' error en stop de applicatie!");
    }, 0);
}
catch (e) {
    console.error("Deze catch werkt alleen in synchrone omstandigheden:" + e);
}


setTimeout(() => {console.log("I GO ON") } , 2000)
setTimeout(() => {process.exit() } , 5000)