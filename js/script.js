var canvas = document.querySelector('.arena');
var ctx = canvas.getContext("2d");
var body = document.querySelector("body");
var linesSelector = document.querySelector('.linesCompleted');
var startButton = document.querySelector('.start');
var unitlength = canvas.width/10;
var xCurrentPiece;
var yCurrentPiece;
var currentPiece;
var bottomReached = false;
var collisionRight = false;
var collisionLeft = false;
var collisionRotation = false;
var linesCompleted = 0;


var shapeObject = {
    sShape: [[1,0,0],[1,1,0],[0,1,0]],
    zShape: [[0,1,0],[1,1,0],[1,0,0]],
    lShape: [[1,0,0],[1,0,0],[1,1,0]],
    bkwdlShape: [[0,1,0],[0,1,0],[1,1,0]],
    squareShape: [[1,1,0],[1,1,0]],
    lineShape: [[1],[1],[1],[1]],
    underlineShape: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,1,1,1]],
}
var shapeNames = ["sShape", "zShape","lShape","bkwdlShape","squareShape","lineShape"]

var gameBoard = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0],
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
    [1,1,1,1,1,1,0,0,1,1],
    [1,1,1,1,1,1,1,0,1,1]
]

function randomPiecePicker(){
    var randomNumber = Math.floor((Math.random() * (shapeNames.length)));
    return shapeNames[randomNumber]
}

function generatePiece(){
    //Generates a new piece, resets the position coordinates to 0
    currentPiece = shapeObject[randomPiecePicker()]
    xCurrentPiece = 4;
    yCurrentPiece = 0;
}

generatePiece();


function rotatePieceArr(pieceArr) {
    var newRotatedPiece = Array.from(pieceArr)
    if(currentPiece === shapeObject.lineShape){
        newRotatedPiece = shapeObject.underlineShape
        return  newRotatedPiece
    } else if (currentPiece === shapeObject.underlineShape){
        newRotatedPiece = shapeObject.lineShape
        return newRotatedPiece
    }
    newRotatedPiece.reverse();
    for (var i = 0; i < newRotatedPiece.length; i++) {
        for (var j = 0; j < i; j++) {
            var temp = newRotatedPiece[i][j];
            newRotatedPiece[i][j] = newRotatedPiece[j][i];
            newRotatedPiece[j][i] = temp;
        }
    }
    return newRotatedPiece
};

function rotate(){
    currentPiece = rotatePieceArr(currentPiece);
}



// function checkLegalRotation(){
//     var theoreticalRotatedPiece = Array.from(currentPiece);
//     theoreticalRotatedPiece = rotatePieceArr(currentPiece)
//     for (var y = 0; y < currentPiece.length; y++){
//         for(var x = 0; x < currentPiece[y].length; x++){
//             if(theoreticalRotatedPiece[y][x]){
//                 if(gameBoard[y+yCurrentPiece][x+xCurrentPiece]){
//                     console.log("rotate into a piece")
//                     collisionRotation = true;
//                     return
//                 } 
                
//             }
//         }
//     }
//     console.log(currentPiece)
// }
function checkLegalMoveDown(){
    //Using the piece array, determines if the next movement downward will be off the bottom of the board
    //or into a existing piece. If it is, the bottom has been reached.
    for (var y = currentPiece.length-1; y >= 0; y-- ){
        for(var x = currentPiece[y].length-1; x >= 0; x--){
            if(currentPiece[y][x]){
                if ((y+yCurrentPiece == gameBoard.length) || (gameBoard[y+yCurrentPiece][x+xCurrentPiece])){
                    // console.log("Next move collides at the bottom")
                    yCurrentPiece--
                    bottomReached = true
                    return
                }
            } 
        }
    }
}

function setPiece(){
    //Sets the piece in the current position and updates the board array with that information
    for (var y = 0; y < currentPiece.length; y++ ){
        for(var x = 0; x < currentPiece[y].length; x++){
            if(currentPiece[y][x]){
                gameBoard[y+yCurrentPiece][x+xCurrentPiece] = currentPiece[y][x]
            } 
        }
    }
}

function checkLegalMoveSides(){
    var nextXPosition;
    //Right Side
    collisionRight = false;
    for (var y = 0; y < currentPiece.length; y++){
        for(var x = 0; x < currentPiece[y].length; x++){
            if(currentPiece[y][x]){
                nextXPosition = x+xCurrentPiece+1
                if ((nextXPosition >= gameBoard[y].length)|| (gameBoard[y+yCurrentPiece][nextXPosition])){
                    // console.log("Next move collides at the right");
                    collisionRight = true;
                    return
                }
                
            }
        }
    }
    
    //Left Side
    collisionLeft = false;
    for (var y = 0; y < currentPiece.length; y++){
        for(var x = currentPiece[y].length; x >= 0; x--){
            if(currentPiece[y][x]){
                nextXPosition = x+xCurrentPiece-1
                if ((nextXPosition < 0)|| (gameBoard[y+yCurrentPiece][nextXPosition])){
                    // console.log("Next move collides at the left")
                    collisionLeft = true;
                    return
                }
                
            }
        }
    }
}

function checkAndReplaceFullLine(){
    //Checks if a row is full (of "true values")
    // if so it deletes the row and puts an empty row on top of the board.
    for(var y = 0; y < gameBoard.length; y++){
        var row = gameBoard[y]
        var sum = gameBoard[y].reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);
        if (gameBoard[y].length == sum){
            linesCompleted++;
            linesSelector.innerHTML = "Current lines completed: " + linesCompleted;
            gameBoard.splice(y,1)
            gameBoard.unshift([0,0,0,0,0,0,0,0,0,0])
        }
        
    }
    
}

function gameOverCheck(){
    var sumRow1 = gameBoard[0].reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    var sumRow2 = gameBoard[1].reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    if ((sumRow1 > 0) || (sumRow2 > 0 || yCurrentPiece < 0)){
        var header = document.querySelector('.header');
        header.style.display = "block";
        header.style.position = "relative";
        console.log("game over")
        startButton.disabled = true;
        startButton.innerHTML = "Game Over"
        
        canvas.parentNode.removeChild(canvas);
        
        
        
    }
}


body.onkeydown = function (event){
    switch(event.keyCode){
        case 32:
        case 38:
        case 87:
        // checkLegalRotation();
        rotate();
        break;
        
        
        case 83:
        case 40:
        yCurrentPiece += 1;
        break;
        
        case 65:
        case 37:
        if(!collisionLeft){
            xCurrentPiece -= 1;
        }
        break;
        
        case 68:
        case 39:
        if(!collisionRight){
            xCurrentPiece += 1;
        }
        
        break;
        
    }
}

