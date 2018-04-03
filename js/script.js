var canvas = document.querySelector('.arena');
var ctx = canvas.getContext("2d");
var body = document.querySelector("body");
var unitlength = canvas.width/10;
var xCurrentPiece = 0;
var yCurrentPiece = 1;
var currentPiece =sShape

var sShape=[
    [1,0,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,0,0,0],
]

var gameBoard = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
]

function generatePiece(){
    var shapeArr;
    currentPiece = shapeArr;
}
generatePiece();



function renderBoard(){
    currentPiece =sShape
    for (var y = 0; y < currentPiece.length; y++ ){
        for(var x = 0; x < currentPiece[y].length; x++){
            if(currentPiece[y][x]){
                ctx.strokeRect((x+xCurrentPiece)*unitlength,(y+yCurrentPiece)*unitlength,unitlength,unitlength)
            }
        }
    }
    for (var y = 0; y < gameBoard.length; y++ ){
        for(var x = 0; x < gameBoard[y].length; x++){
            if(gameBoard[y][x]){
                ctx.strokeRect(x*unitlength,y*unitlength,unitlength,unitlength)
            }
        }
    }
}
    


function checkLegalMoveDown(){
    for (var y = currentPiece.length-1; y >= 0; y-- ){
        for(var x = currentPiece[y].length-1; x >= 0; x--){
            if(currentPiece[y][x] && gameBoard[y+yCurrentPiece][x+xCurrentPiece]){
                console.log("Illegal move down")
                gameBoard[y+yCurrentPiece][x+xCurrentPiece] = currentPiece[y][x];
            }
        }
    }
}

function checkLegalMoveSides(){
    //Right Side
    for (var y = 0; y < currentPiece.length; y++){
        for(var x = 0; x < currentPiece[y].length; x++){
            if(currentPiece[y][x] && (x+xCurrentPiece >= gameBoard[y].length)){
                console.log("Illegal move")
            }
        }
    }

    //Left Side
    for (var y = 0; y < currentPiece.length; y++){
        for(var x = 0; x < currentPiece[y].length; x++){
            if(currentPiece[y][x] && (x+xCurrentPiece <0)){
                console.log("Illegal move")
            }
        }
    }
}
function updateStuff(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    var currentPiece =sShape
    renderBoard();
    checkLegalMoveDown();
    checkLegalMoveSides();
    // piece.drawMe();
    
    // pieceBordersCalculation();
    
    requestAnimationFrame(function(){
        updateStuff();
    })
}

updateStuff();

body.onkeydown = function (event){
    switch(event.keyCode){
        case 87:
        case 38:
        case 32:
        yCurrentPiece -= 1;
        break;
        
        case 65:
        case 37:
        xCurrentPiece -= 1;
        break;
        
        case 83:
        case 40:
        yCurrentPiece += 1;
        break;
        
        case 68:
        case 39:
        xCurrentPiece += 1;
        break;
        
    }
}