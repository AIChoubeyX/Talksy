import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

export function getReceiverSocketId(userId)  {
    return userSocketMap[userId]; // Retrieve the socket ID for the given user ID

}

const userSocketMap = {}; //{userid:socketid}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId; // Assuming userId is passed in the query string  
    if (userId) {
        userSocketMap[userId] = socket.id; // Store the socket ID for the user
        console.log("User ID:", userId, "Socket ID:", socket.id);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit an event to all clients when a user connects

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId]; // Remove the user from the map when they disconnect
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { io, app, server }