var gameStart = false;

function renderBoard(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    
    //Renders the current piece, using the piece array
    for (var y = 0; y < currentPiece.length; y++ ){
        for(var x = 0; x < currentPiece[y].length; x++){
            if(currentPiece[y][x]){
                ctx.strokeRect((x+xCurrentPiece)*unitlength,(y+yCurrentPiece)*unitlength,unitlength,unitlength)
                ctx.strokeStyle = "#7deeea"
                ctx.lineWidth = 5;
            }
        }
    }
    
    //Renders the board, using the Board Array
    for (var y = 0; y < gameBoard.length; y++ ){
        for(var x = 0; x < gameBoard[y].length; x++){
            if(gameBoard[y][x]){
                
                ctx.fillRect(x*unitlength,y*unitlength,unitlength,unitlength)
                ctx.fillStyle = "#ffbdbd"
            }
        }
    }
    
}


function updateStuff(){ 
    if(!gameStart){
        return
    }
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
    
    // gameOverCheck()
    if(gameOverCheck()){
        console.log("game over")
        ctx.fillRect(0,0,canvas.width, canvas.height)
        return
    }
    checkLegalMoveDown();
    checkLegalMoveSides();
    
    requestAnimationFrame(function(){
        updateStuff();
    })
}



function downwardFlow(){
    updateStuff();
    
    yCurrentPiece++    
}
setInterval(function(){downwardFlow()},300);

startButton.onclick = function(){
    if (gameStart = true){
        return
    }
    console.log("game started")
    gameStart = true;
    generatePiece();
    updateStuff();
}