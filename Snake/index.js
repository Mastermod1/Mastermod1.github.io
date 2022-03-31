const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.clientWidth;
const height = canvas.clientHeight - 100;
const Directons = {
    up: [0,-20],
    down: [0,20],
    left: [-20,0],
    right: [20,0]
}
class Snake{
    constructor(){
        this.snakeParts = [];
        this.length = 1;
        this.snakeParts.push(this.createPart(60,180,Directons.down));
    }
    getSnakeHead(){
        return this.snakeParts[0];
    }
    turn(dir){
        let oppositeDir = [this.snakeParts[0].dir[0] * (-1), this.snakeParts[0].dir[1] * (-1)]
        if(dir[0] == oppositeDir[0] && dir[1] == oppositeDir[1] && this.length > 1)
            return;
        this.snakeParts[0].dir = dir;
    }
    move(){
        let snakeHead = this.getSnakeHead();
        let newPos = [snakeHead.posX + snakeHead.dir[0],snakeHead.posY + snakeHead.dir[1]];
        if(newPos[0] >= width || newPos[0] < 0 || newPos[1] >= height || newPos[1] < 0){
            lost = true;
            return;
        }
        this.snakeParts.pop();
        this.snakeParts.unshift(this.createPart(newPos[0], newPos[1], snakeHead.dir));
    }
    drawSnake(food){
        ctx.clearRect(0,0,width,height);
        board();
        food.drawFood();
        ctx.fillStyle = "black";
        for(let i = 0; i < this.length; i++){
            ctx.fillRect(this.snakeParts[i].posX, this.snakeParts[i].posY, 20, 20); 
        }
        border();
    }
    createPart(x,y,dir){
        const part = {
            posX: x,
            posY: y,
            dir: dir
        }
        return part;
    }
    addPart(){
        let lastDir = this.snakeParts[this.length-1].dir;
        let part = this.createPart(this.snakeParts[this.length-1].posX -  lastDir[0], this.snakeParts[this.length-1].posY +  lastDir[1], lastDir);
        this.snakeParts.push(this.createPart(part));
        this.length++;
    }
    eat(food){
        let head = this.getSnakeHead();
        if(head.posX == food.foodPos[0] && head.posY == food.foodPos[1]){
            this.addPart();
            food.nextFood();
        }
    }
}
class Food{
    constructor(){
        this.foodPos = [random(0,20) * 20, random(0,20) * 20];
    }
    drawFood(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.foodPos[0], this.foodPos[1], 20, 20);
    }
    nextFood(){
        this.foodPos = [random(0,20) * 20, random(0,20) * 20];
    }
}
function random(min = 0,max){
    return Math.floor(Math.random() * (max - min)) + min;
}
document.addEventListener("keypress",inputHandler)
function inputHandler(e){
    e = e || window.event;
    switch(e.keyCode){
        case 97:
            snake.turn(Directons.left);
            break;
        case 119:
            snake.turn(Directons.up);
            break;
        case 115:
            snake.turn(Directons.down);
            break;
        case 100:
            snake.turn(Directons.right);
            break;
    }
}
//Board functions
function border(){
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, width, height);
}
function board(){
    for(let w = 0; w < width/20; w++){
        for(let h = 0; h < height/20; h++){
            ctx.fillStyle = "#009200"; 
            if(h % 2 == 1 && w % 2 == 1 || h % 2 == 0 && w % 2 == 0)
                ctx.fillStyle = "#006400";
            ctx.fillRect(w * 20, h * 20, 20, 20);
        }
    }
}
let lost = false;
let food = new Food();
let snake = new Snake();
function gameLoop(){
    if(!lost){
        snake.move();
        snake.eat(food);    
        snake.drawSnake(food); 
    }
}
setInterval(gameLoop,500);
