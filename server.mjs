import  { Server as SocketIOServer } from 'socket.io';
import express from 'express';
import http from 'http';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {cors : {origin: '*'}});
const tmx = require('tmx-parser');
const loadMap = require('./mapLoader.js'); 

async function main(){
    var map2D = await loadMap();
    app.use(express.static('public'));
    
    io.on('connection', (socket) => {
        const SID = socket.id;
        console.log(`Client connected:`+ SID);
        io.emit("map", map2D);
        
        socket.on('message', (message) => {
            
        });
        socket.on('disconnect', () => {
    
        });

    });
    
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Socket.IO server started at http://localhost:${PORT}`);
    
    });
}
main();