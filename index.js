const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messages");

const app = express();
const socket = require('socket.io');
require("dotenv").config();

app.use(cors());
app.use(express.json());


app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoute);

const mongoURI = 'mongodb://localhost:27017/chat';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    // console.log('DB connected');
    // console.log(mongoURI);
    const collections = await mongoose.connection.db.listCollections().toArray();
    // console.log('Collections:', collections);

}).catch((err) => {
    console.log(err.message);
})

const server = app.listen(process.env.PORT, () => {  // 5000 is the port number where the server will run  
    console.log(`Server is running on port: ${process.env.PORT}`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-message', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieved', data.message);
        }
        // socket.emit('msg-recieved', data.message);
    });
});