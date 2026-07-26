

function logger(req, res, next){
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    //indicates to the middleware to move to the next middleware if exists
    next();
}

module.exports = logger;