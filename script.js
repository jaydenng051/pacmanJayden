const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
const fps = 100;
const blockSize = 60;
const boundaries = [];
const foods = [];
const startPosX = 20;
const startPosY = 20;


const map = [['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'], 
             ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '_', '.', '|'], 
             ['|', '.', '^', '.', 'b', '.', '.', '^', '.', '.', '.', '.', '.', '^', '.', '.', '.', '|'], 
             ['|', '.', '|', '.', '.', '.', '[', '+', ']', '.', '[', '-', '-', '+', ']', '.', '.', '|'], 
             ['|', '.', '|', '.', 'b', '.', '.', '_', '.', '.', '.', '.', '.', '_', '.', '.', '.', '|'],  
             ['|', '.', '|', '.', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '^', '.', '|'], 
             ['|', '.', '_', '.', '^', '.', '.', 'b', '.', '.', '[', '+', ']', '.', '.', '|', '.', '|'], 
             ['|', '.', '.', '.', '|', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '_', '.', '|'], 
             ['|', '.', '^', '.', '_', '.', '.', '^', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'], 
             ['|', '.', '|', '.', '.', '.', '[', '+', ']', '.', '.', '.', '.', '.', '.', 'b', '.', '|'], 
             ['|', '.', '_', '.', '^', '.', '.', '_', '.', '.', '[', '-', '-', ']', '.', '.', '.', '|'], 
             ['|', '.', '.', '.', '|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'], 
             ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']]

const textToImg = {
    '-' : './images/pipeHorizontal.png',
    '|' : './images/pipeVertical.png',
    '1' : './images/pipeCorner1.png',
    '2' : './images/pipeCorner2.png',
    '3' : './images/pipeCorner3.png',
    '4' : './images/pipeCorner4.png',
    'b' : './images/block.png',
    '[' : './images/capLeft.png',
    ']' : './images/capRight.png',
    '_' : './images/capBottom.png',
    '^' : './images/capTop.png',
    '+' : './images/pipeCross.png',
    '5' : './images/pipeConnectorTop.png',
    '6' : './images/pipeConnectorRight.png',
    '7' : './images/pipeConnectorBottom.png',
    '8' : './images/pipeConnectorLeft.png'
}




class Player{
    constructor(pos){
        this.pos = pos;
        this.radius = 40;
        this.direction = 'down';
        this.speed = 3;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 
            0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    move(){
        if(this.direction == "up"){
            this.pos.y -= this.speed;
        }else if(this.direction == "down"){
            this.pos.y += this.speed;
        }else if(this.direction == "left"){
            this.pos.x -= this.speed;
        }else if(this.direction == "right"){
            this.pos.x += this.speed;
        }
    }
}


class Boundary{
    constructor(pos, imgURL, blockSize){
        this.pos = pos;
        this.imgURL = imgURL;
        this.blockSize = blockSize;
        this.img = new Image(this.blockSize, this.blockSize);
        this.img.src = this.imgURL;
    }
    draw(){
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.blockSize, this.blockSize);
    }
}

function isTouching(x1, y1, x2, y2, x3, y3, x4, y4){
    return x1 >= x3 && x2 <= x4 && y1 >= y3 && y2 <= y4 
}

class Food{
    constructor(pos){
        this.pos = pos;
        this.radius = 10;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }  
}

const player = new Player({x:10, y:10});

document.body.addEventListener('keydown', (e) => {
    if(e.key == 'w'){
        player.direction = 'up';
    }else if(e.key == "s"){
        player.direction = 'down';
    }else if(e.key == "a"){
        player.direction = 'left';
    }else if(e.key == "d"){
        player.direction = 'right';
    }
})

function draw(){
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    for (let i = 0;i < boundaries.length;i++){
        boundaries[i].draw()
    }
    for (let i = 0;i < foods.length;i++){
        foods[i].draw()
    }
    player.draw();
    player.move();
}

for (let i = 0;i < map.length;i++){
    for (let j = 0;j < map[i].length;j++){
        if (map[i][j] != '.'){
            boundaries.push(new Boundary(
                {
                    x : startPosX + blockSize * j, 
                    y : startPosY + blockSize * i
                }
                ,
                textToImg[map[i][j]],
                blockSize
            ));
        }else{
            foods.push(new Food(
                {
                    x : startPosX + blockSize * j + blockSize / 2, 
                    y : startPosY + blockSize * i+ blockSize / 2
                }
            ));
        }
    }
}




setInterval(draw, 1000 / fps);
