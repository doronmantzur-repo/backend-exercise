const http = require('http');

const PORT = 3000;
const server = http.createServer((req, res) => {
console.log('server called')
if (req.url === "/"){
    res.write( "Welcome to my server!");
}
else if (req.url === "/about"){
    res.write( "This is the about page");
}
else if (req.url === "/contact"){
    res.write( "This is contact");
}
else{
     res.write( "404 - Page not found");
}
res.end();

});

server.listen(PORT, () =>{
    console.log("Server is listening...")
})