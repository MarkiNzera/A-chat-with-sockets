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

let connectedUsers = [];

io.on("connection", (socket) => {

    socket.on("login", (userId) => {
        !connectedUsers.some((user) => user.userId === userId) &&
            connectedUsers.push({
                userId,
                socketId: socket.id,
            });

        io.emit("getConnectedUsers", connectedUsers);
    })


    socket.on("sendMessage", (message) => {
        const user = connectedUsers.find((user) => user.userId === message.friendId);

        if(user) {
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", {
                senderId: message.userId,
                isRead: false,
                date: new Date()
            });
        }
    })


    socket.on("disconnect", () => {
        connectedUsers = connectedUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getConnectedUsers", connectedUsers);
    });

});

io.listen(4000);

http.listen(8080, () => {
    console.log('listening on port 8080');
});
