const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

io.on('connection', (socket) => {
    socket.on("message", (data) => {
        io.emit("showmsg", data);
    });
    
    socket.on("disconnect", () => {
        console.log("socket disconnected: " + socket.id);
    })

});

http.listen(8080, () => {
    console.log('listening on port 8080');
});
