var canvas = document.querySelector('.arena');
var ctx = canvas.getContext("2d");
var body = document.querySelector("body");
var unitlength = canvas.width/10;
var xCurrentPiece;
var yCurrentPiece;
var currentPiece;
var bottomReached = false;


var sShape=[
    [1,0,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,0,0,0]
]

var gameBoard = [
    [0,0,0,0,1,0,0,0,0,0],
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

function generatePiece(){
    //Generates a new piece, resets the position coordinates to 0
    currentPiece = sShape
    xCurrentPiece = 0;
    yCurrentPiece = 0;
}

generatePiece();

function renderBoard(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    //Renders the current piece, using the piece array
    for (var y = 0; y < currentPiece.length; y++ ){
        for(var x = 0; x < currentPiece[y].length; x++){
            if(currentPiece[y][x]){
                ctx.strokeRect((x+xCurrentPiece)*unitlength,(y+yCurrentPiece)*unitlength,unitlength,unitlength)
            }
        }
    }
    
    //Renders the board, using the Board Array
    for (var y = 0; y < gameBoard.length; y++ ){
        for(var x = 0; x < gameBoard[y].length; x++){
            if(gameBoard[y][x]){
                ctx.strokeRect(x*unitlength,y*unitlength,unitlength,unitlength)
            }
        }
    }
    
}

function setPiece(){
    //Sets the piece in the current position and updates the board array with that information
    for (var y = 0; y < currentPiece.length; y++ ){
        for(var x = 0; x < currentPiece[y].length; x++){
            if(currentPiece[y][x]){
                gameBoard[y+yCurrentPiece-1][x+xCurrentPiece] = currentPiece[y][x]
            } 
        }
    }
}

//
function checkLegalMoveDown(){
    //Using the piece array, determines if the next movement downward will be off the bottom of the board
    //or into a existing piece. If it is, the bottom has been reached.
    var nextYPosition
    for (var y = currentPiece.length-1; y >= 0; y-- ){
        for(var x = currentPiece[y].length-1; x >= 0; x--){
            if(currentPiece[y][x]){
                nextYPosition = y+yCurrentPiece+1;
                if ((nextYPosition == gameBoard.length) || (gameBoard[nextYPosition][x+xCurrentPiece])){
                    console.log("Next move collides at the left")
                    bottomReached = true
                }
            } 
        }
    }
}


function checkLegalMoveSides(){
    var nextXPosition;
    //Right Side
    for (var y = 0; y < currentPiece.length; y++){
        for(var x = 0; x < currentPiece[y].length; x++){
            if(currentPiece[y][x]){
                nextXPosition = x+xCurrentPiece+1
                if ((nextXPosition >= gameBoard[y].length)|| (gameBoard[y+yCurrentPiece][nextXPosition])){
                    console.log("Next move collides at the right")
                }
            }
        }
    }
    
    //Left Side
    for (var y = 0; y < currentPiece.length; y++){
        for(var x = currentPiece[y].length; x >= 0; x--){
            if(currentPiece[y][x]){
                nextXPosition = x+xCurrentPiece-1
                if ((nextXPosition < 0)|| (gameBoard[y+yCurrentPiece][nextXPosition])){
                    console.log("Next move collides at the left")
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
            gameBoard.splice(y,1)
            gameBoard.unshift([0,0,0,0,1,0,0,0,0,0])
        }
        
    }
    
}
function downwardFlow(){
    checkLegalMoveDown();
 
    // yCurrentPiece++    
}
setInterval(function(){downwardFlow()},300);
function updateStuff(){ 
    renderBoard();
    if(bottomReached){
        //If bottom is reached: 
        //1) Piece is set permanently,
        //2) Lines are checked if the full, replaced if so
        //3) New piece is generated
        //4)Global bottomReached variable is reset to false
        setPiece();
        checkAndReplaceFullLine();
        generatePiece(); 
        bottomReached = false;  
    } 
       
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
        checkLegalMoveDown();
        yCurrentPiece -= 1;
        break;
        
        case 65:
        case 37:
        xCurrentPiece -= 1;
        break;
        
        case 83:
        case 40:
        checkLegalMoveDown();

        yCurrentPiece += 1;
        break;
        
        case 68:
        case 39:
        xCurrentPiece += 1;
        break;
        
    }
}