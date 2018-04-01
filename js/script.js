var canvas = document.querySelector('.football-pitch');
var ctx = canvas.getContext("2d");
var body = document.querySelector("body");

var playerImage = new Image();
playerImage.src = "./images/player.png"

var ballImage = new Image();
ballImage.src = "./images/ball.png"

var player = {
    x:50,
    y: 50,
    width: 82,
    height: 99,
    hasBall: true,
    drawMe: function (){
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
    }
};

var ball = {
    x: "",
    y: "",
    width: 30,
    height: 30,
    drawMePosession: function (){
        ctx.drawImage(ballImage, player.x + player.width, player.y + player.height - this.height, this.width, this.height);
    },
    drawMeNoPosession: function (){
        ctx.drawImage(ballImage, this.x, this.y, this.width, this.height);
    },
};


var goal = {
    x: canvas.width-10,
    y: canvas.height/3,
    width: 5,
    height: canvas.height/3,
    drawMe: function(){ctx.fillRect(this.x, this.y, this.width, this.height)}
}



function ballKick(){
    if(player.hasBall){
        player.hasBall = false;
    }
}


function getTop (obj){
    return obj.y;
}

function getBottom (obj){
    return obj.y + obj.height;
}

function getLeft(obj){
    return obj.x;
}

function getRight(obj){
    return obj.x + obj.width;
}

function collision(objA, objB){
    return getBottom(objA) >= getTop(objB)      &&
    getTop(objA)           <= getBottom(objB)   &&
    getRight(objA)         >= getLeft(objB)     &&
    getLeft(objA)          <= getRight(objB);
}


function goalDetection(){    
    if(collision(player, goal)){
        console.log("lololololoolololol")
    }
}

function ballPossessionChecker(){
    if(collision(ball, player)){
        player.hasBall = true;
    }
}
function updateStuff(){
    // clear old drawings from the entire canvas before drawing again
    ctx.clearRect(0,0, canvas.width, canvas.height);

    player.drawMe();
    goal.drawMe();
    ballPossessionChecker();

    if(player.hasBall){
        ball.drawMePosession();
    } else{
        ball.drawMeNoPosession();
    }

    // if(goalDetection()){
    //     return;
    // }
    requestAnimationFrame(function(){
        updateStuff();
    })
}


updateStuff();


body.onkeydown = function (event){
    switch(event.keyCode){
        case 87:
        case 38:
        player.y -= 8;
        break;
        
        case 65:
        case 37:
        player.x -= 8;
        break;
        
        case 83:
        case 40:
        player.y += 8;
        break;
        
        case 68:
        case 39:
        player.x += 8;
        break;

        case 32:
        
        ballKick();
        break;
    }
}