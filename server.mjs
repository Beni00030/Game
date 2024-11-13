import  { Server as SocketIOServer } from 'socket.io';
import express from 'express';
import http from 'http';
import { count } from 'console';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {cors : {origin: '*'}});

var counter = 0;

var clients = new Map();

app.use(express.static('public'));

app.get("/a", function (req, res) {
    res.send("Hello World!");
  });

io.on('connection', (socket) => {
    const sID = socket.id;
    console.log(`Client connected:`+ sID);
    clients.set(sID,socket);
    
    counter++;
    if(counter == 1 ){
        io.to(sID).emit("message", {playerNum : 0});
    }
    if(counter == 2 ){
        io.to(sID).emit("message", {playerNum : 1});
    }
    
    
    socket.on('message', (message) => {
        console.log("message recieved: ", message);
        BroadcastToExcept(sID,message);
    });
    socket.on('disconnect', () => {
        console.log("Client disconnected");
        counter--;        
    });
});

function BroadcastToExcept(senderID,message){
    clients.forEach((client,clientID) => {
        if(clientID !== senderID){
            client.emit('message',message);
        }
    });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Socket.IO server started at http://localhost:${PORT}`);

});