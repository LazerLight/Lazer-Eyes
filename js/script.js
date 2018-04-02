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

function UnitSquare(x,y) {
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
var piece = new Piece()


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


function updateStuff(){
    // clear old drawings from the entire canvas before drawing again
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // piece.y += .01

    piece.drawMe();
    
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
        // piece.y -= unitlength;
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