var canvas = document.querySelector('.arena');
var ctx = canvas.getContext("2d");
var body = document.querySelector("body");
var unitlength = canvas.width/10;

var sShape=[
    [1,0,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,0,0,0]
]

var gameBoard = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

function UnitSquare() {
    this.x = x*unitlength;
    this.y = y*unitlength;
    this.length= unitlength;
}

UnitSquare.prototype.drawMe = function(){
    ctx.strokeRect(this.x,this.y,this.length,this.length)
}

function Piece() {
    this.x = 0;
    this.y = 0;
    this.bottomSide = 0;
    this.leftSide = 0;
    this.rightSide = 0;
    this.shapeArr = sShape;
}

Piece.prototype.drawMe = function(){
    for (var i = 0; i < this.shapeArr.length; i++){
        for (var j = 0; j < this.shapeArr[i].length; j++){
            if (this.shapeArr[i][j]){
                var square = new UnitSquare(j+this.x,i+this.y);
                square.drawMe();
            }
        }
    }
}

Piece.prototype.bottomSideCalculation = function(){
    for (var i = 0; i < this.shapeArr.length; i++){
        for (var j = 0; j < this.shapeArr[i].length; j++){
            if (this.shapeArr[i][j]){
                this.bottomSide = parseInt(this.y)+parseInt(i)
            }
        }
    }
}
Piece.prototype.leftSideCalculation = function(){
    this.leftSide = this.x
}
Piece.prototype.rightSideCalculation = function(){
    var tempRightSide = 0
    for (var i = 0; i < this.shapeArr.length; i++){
        for (var j = 0; j < this.shapeArr[i].length; j++){
            if (this.shapeArr[i][j]){
                if(tempRightSide < j){tempRightSide = j}
            }
        }
    }
    this.rightSide = parseInt(this.x)+parseInt(tempRightSide)
}

var piece = new Piece()

function pieceBordersCalculation(){
    piece.leftSideCalculation();
    piece.bottomSideCalculation();
    piece.rightSideCalculation();
}


function updateStuff(){
    // clear old drawings from the entire canvas before drawing again
    ctx.clearRect(0,0, canvas.width, canvas.height);
    piece.y += .1

    // boardBottom.drawMe();
    piece.drawMe();
    pieceBordersCalculation();
    
    if(piece.bottomSide > 20){
        return;
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
        piece.y -= 1;
        break;
        
        case 65:
        case 37:
        piece.x -= 1;
        break;
        
        case 83:
        case 40:
        piece.y += 1;
        break;
        
        case 68:
        case 39:
        piece.x += 1;
        break;
        
    }
}