const express = require("express")
const request = require("request")

// Application servers
const servers = ["http://localhost:3000", "http://localhost:3001"];

// Track the current application server to send request
let current = 0;

// Receive new request and forward to application server
const handler = (req, res) => {
    
    // Select the current server to forward the request
    const server = servers[current];

    req.pipe(request({url: server+req.url})).pipe(res);
    
    // Update the current server 
    current = (current + 1) % servers.length;
    
}
const lbServer = express();
// Serve favicon.ico image
lbServer.get('/favicon.ico', (req, res
    ) => res.send('/favicon.ico'));
// pass the request to hander method
lbServer.use((req,res)=>{handler(req, res)});

lbServer.listen(8080, err =>{
    err ? console.log("Failed to listen on PORT 8080"): console.log("Load Balancer Server listening on PORT 8080");
});