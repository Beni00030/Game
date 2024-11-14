const socket = io.connect("10.10.1.64:3000"||'http://localhost:3000');

var playerNUM ;

const SPEED = 5;
var me;
var he;
var myPos = {};
var hisPos = {};


var inputs = {
    up : false,
    down : false,
    left : false,
    right : false
}



function PlayerMovement(){
    if (inputs.down) {
        myPos.y += SPEED;
        me.style.top = myPos.y + "px";
        sendMessage();
    }
    if (inputs.up) {
        myPos.y -= SPEED;
        me.style.top = myPos.y + "px";
        sendMessage();
    }
    if (inputs.left) {
        myPos.x -= SPEED;
        me.style.left = myPos.x + "px";
        sendMessage();
    }
    if (inputs.right) {
        
        myPos.x += SPEED;
        me.style.left = myPos.x + "px";
        sendMessage();
    }
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

var firstMsg = true;
socket.on('message', function(message) {
    console.log(message);
    if (firstMsg) {
        playerNUM = message.playerNum;
        if (playerNUM == 0) {
            myPos = {x: 50, y: 50};
            me = document.getElementById("player1");
            hisPos = {x: 50, y: 100};
            he = document.getElementById("player2");
        }
        else if (playerNUM == 1) {
            myPos = {x: 50, y: 100};
            me = document.getElementById("player2");
            hisPos = {x: 50, y: 50};
            he = document.getElementById("player1");
        }
        firstMsg = false;
    }
    else{ 
        hisPos.y = message.y;
        he.style.top = hisPos.y + "px";
        hisPos.x = message.x;
        he.style.left = hisPos.x + "px";
    
    }


    
});
Game();