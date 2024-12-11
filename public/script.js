const socket = io.connect('http://localhost:3000');

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
socket.on("map",(map)=>{
    console.log(map);
});
