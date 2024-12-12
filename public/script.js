const socket = io.connect('http://localhost:3000');
var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mapImage = new Image();
mapImage.src = "/sheet.png";

var map = [[]];

var inputs = {
    up : false,
    down : false,
    left : false,
    right : false
}

window.addEventListener("keydown", (e) => {
    if (e.key === "w") {
        inputs.up = true;        
    }
    if (e.key === "a") {
        inputs.left = true;
    }
    if (e.key === "s") {
        inputs.down = true;
    }
    if (e.key === "d") {
        inputs.right = true;
    }
});
window.addEventListener("keyup", (e) => {
    if (e.key === "w") {
        inputs.up = false;        
    }
    if (e.key === "a") {
        inputs.left = false;
    }
    if (e.key === "s") {
        inputs.down = false;
    }
    if (e.key === "d") {
        inputs.right = false;
    }
});

function sendMessage() {
    message = {x: myPos.x , y: myPos.y};
    socket.emit('message', message);
    
}
socket.on('message', function(message) {
    
});
socket.on("map",(loadedMap)=>{
    map = loadedMap;
});

function loop() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    const TILES_IN_ROW = 8;
    const TILE_SIZE = 16;

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            const {id} = map[row][col];
            const imageRow = parseInt(id /TILES_IN_ROW);
            const imageCol = id % TILES_IN_ROW;
            ctx.drawImage(
                mapImage,
                imageCol * TILE_SIZE,
                imageRow *TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE,
                col*TILE_SIZE,
                row*TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );
        }
    }


    window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop);