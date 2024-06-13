const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const authRoute = require("./routes/auth");
const userRoute = require("./routes/userRoute");
const pvMessageRoute = require("./routes/pvMessagesRoute");
const friendshipRoute = require("./routes/friendShipsRoute");
const db = require("./config/database");

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(authRoute);
app.use(userRoute);
app.use(pvMessageRoute);
app.use(friendshipRoute);

io.on('connection', (socket) => {
    socket.on("message", (data) => {
        io.emit("showmsg", data);
    });
    
    socket.on("disconnect", () => {
        console.log("socket disconnected: " + socket.id);
    });

});

http.listen(8080, () => {
    console.log('listening on port 8080');
});
