import  { Server as SocketIOServer } from 'socket.io';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {cors : {origin: '*'}});

var counter = 0;

var clients = new Map();
var x = new Map();
var y = new Map();

app.use(express.static('public'));

app.get("/a", function (req, res) {
    res.send("Hello World!");
  });

io.on('connection', (socket) => {
    const SID = socket.id;
    console.log(`Client connected:`+ SID);
    clients.set(SID,socket);
    x.set(SID,50);
    y.set(SID,50);
    counter++;
    io.to(SID).emit("message", {type:"direct", player:counter });

    clients.forEach((client,clientID) => {
        io.to(SID).emit("message", {type:"location", xPos:x.get(clientID), yPos:y.get(clientID) });


    })
    
    
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


function framerate(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Game() {
    while(true){
        await framerate(17); 
        
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Socket.IO server started at http://localhost:${PORT}`);

});