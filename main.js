var snakeLength;
var appleCount = 4;
var vectorX = 10;
var vectorY = 0;
const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var posX;
var posY;
var tailX;
var tailY;
var appleX = randWithin();
var appleY = randWithin();
var lose;
var slither;
var appleCheck;
var tail = [];
var tailCount = -2;
function draw() {
    snakeLength = 400;
    posX = 40;
    posY = 140;
    lose = setInterval(checkBounds, 100);
    snakeRender();
    apple();
    checkBounds();
  }

 function start() {
     vectorX = 10;
     vectorY = 0;
     slither = setInterval(slither, 100);
     appleCheck = setInterval(appleCheck, 100);
     clearTail();
 }

 function checkWin() {
     if(appleCount== 899){
        alert("You Win");
        clearInterval(lose);
        clearInterval(slither);
        clearInterval(appleCheck);
        vectorX = 0;
        vectorY = 0;
        posX = 40;
        posY = 140;
        ctx.clearRect(0,0,300,300);
     }
 }

function apple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX, appleY, 10, 10);
}

function appleCheck() {
    if(posY==appleY && posX==appleX){
        snakeLength += 100;
        appleCount += 1;
        let p=0;
        appleX = randWithin();
        appleY = randWithin();
        while(p!=1){
            let imgData = ctx.getImageData(appleX, appleY, 1, 1);
            console.log(imgData.data);
            if(imgData.data[0]==0 && imgData.data[1]==0 && imgData.data[2]==0 && imgData.data[3]==255){
                appleX = randWithin();
                appleY = randWithin();
            }else{
                p=1;
            }
        }
        apple();
    }
}

function collisionCheck() {
    let imageData = ctx.getImageData(posX,posY,1,1).data;
    if(imageData[0]==0 && imageData[1]==0 && imageData[2]==0 && imageData[3]==255) {
        alert("You Lose");
        clearInterval(lose);
        clearInterval(slither);
        clearInterval(appleCheck);
        vectorX = 0;
        vectorY = 0;
        posX = 40;
        posY = 140;
        ctx.clearRect(0,0,300,300);
    }
}

function slither() {
    posX += vectorX;
    posY += vectorY;
    collisionCheck();
    snakeRender();
    setTimeout(clearTail, snakeLength);
    console.log(snakeLength);
}

function clearTail() {
    tailCount += 2;
    ctx.clearRect(tail[tailCount],tail[tailCount+1],10,10);
}

function snakeRender() {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(posX,posY,10,10);
    tail.push(posX);
    tail.push(posY);
    console.log(tail);
}

window.onkeypress = function (e) {
        e = e || window.event;
        let key = e.keyCode;
        console.log(key);
        if(key===97){
            vectorX = -10;
            vectorY = 0;
        }
        else if (key===119){
            vectorY = -10;
            vectorX = 0;
        }
        else if (key===100){
            vectorX = 10;
            vectorY = 0;
        }
        else if (key==115){
            vectorY = 10;
            vectorX = 0;
        }
    }

function checkBounds() {
    if(posX>290 || posX<0 || posY>290 || posY<0) {
        alert("You Lose");
        clearInterval(lose);
        clearInterval(slither);
        clearInterval(appleCheck);
        vectorX = 0;
        vectorY = 0;
        posX = 40;
        posY = 140;
        ctx.clearRect(0,0,300,300);
    }
}

function randWithin() {
    return 10 * (Math.floor(Math.random()*29));
}
