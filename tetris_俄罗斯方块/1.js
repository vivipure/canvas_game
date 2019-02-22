const cvs = document.getElementById("canv");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");

const ROW = 20; //row
const COL = 10;  //column
const SQ = 20;         //squaresize
const vacant = "white"; // 空格子的颜色

let score = 0;  //得分

// 画方块
function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

// 将背景颜色 设置好

let board = [];
for( r = 0; r <ROW; r++){
    board[r] = [];
    for(c = 0; c < COL; c++){
        board[r][c] = vacant;
    }
}

// 画背景
function drawBoard(){
    for( r = 0; r <ROW; r++){
        for(c = 0; c < COL; c++){
            drawSquare(c,r,board[r][c]);
        }
    }
}

drawBoard();

// 定义不同方块的颜色

const PIECES = [
    [Z,"red"],
    [S,"green"],
    [T,"yellow"],
    [O,"blue"],
    [L,"purple"],
    [I,"cyan"],
    [J,"orange"]
];

// 生成随机方块

function randomPiece(){
    let r = randomN = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    return new Piece( PIECES[r][0],PIECES[r][1]);
}

let p = randomPiece();

// 方块 类

function Piece(tetromino,color){
    this.tetromino = tetromino;
    this.color = color;
    
    // 方块的第一种模板
    this.tetrominoN = 0; 
    this.activeTetromino = this.tetromino[this.tetrominoN];
    
    // 方块的起始位置
    this.x = 3;
    this.y = -2;
}

// 画方块   

Piece.prototype.fill = function(color){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            if( this.activeTetromino[r][c]){
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}

// draw

Piece.prototype.draw = function(){
    this.fill(this.color);
}

// undraw 

Piece.prototype.unDraw = function(){
    this.fill(vacant);
}

// move Down the piece

Piece.prototype.moveDown = function(){
    if(!this.collision(0,1,this.activeTetromino)){
        this.unDraw();
        this.y++;
        this.draw();
    }else{
        this.lock();
        p = randomPiece();
    }
    
}

// move Right the piece
Piece.prototype.moveRight = function(){
    if(!this.collision(1,0,this.activeTetromino)){
        this.unDraw();
        this.x++;
        this.draw();
    }
}

// move Left the piece
Piece.prototype.moveLeft = function(){
    if(!this.collision(-1,0,this.activeTetromino)){
        this.unDraw();
        this.x--;
        this.draw();
    }
}

// rotate the piece
Piece.prototype.rotate = function(){
    let nextPattern = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
    let kick = 0;
    
    if(this.collision(0,0,nextPattern)){
        if(this.x > COL/2){
            // 右边界
            kick = -1; // 下一个 样式 要碰壁时  左移 一格
        }else{
            // 左边界
            kick = 1; // 下一个 样式 要碰壁时  右移 一格
        }
    }
    
    if(!this.collision(kick,0,nextPattern)){
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length; // (0+1)%4 => 1
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}



Piece.prototype.lock = function(){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // 跳过空白 方块
            if( !this.activeTetromino[r][c]){
                continue;
            }
            // 到达上边界
            if(this.y + r < 0){
                alert("Game Over");
                // 停止游戏
                gameOver = true;
                break;
            }
            // 将这一区域锁住
            board[this.y+r][this.x+c] = this.color;
        }
    }
    // 一行满了 进行移除
    for(r = 0; r < ROW; r++){
        let isRowFull = true;
        //检测 每一行
        for( c = 0; c < COL; c++){
            isRowFull = isRowFull && (board[r][c] != vacant);
        }
        if(isRowFull){
            // 如果这行满了 将上面的行进行下移
            for( y = r; y > 1; y--){
                for( c = 0; c < COL; c++){
                    board[y][c] = board[y-1][c];
                }
            }
            // 顶行 刷新
            /*for( c = 0; c < COL; c++){
                board[0][c] = vacant;
            }*/
            // score ++
            score += 10;
        }
    }
    // 更新 背景
    drawBoard();
    
    // 更新 分数
    scoreElement.innerHTML = score;
}

// 边界 碰撞 检测

Piece.prototype.collision = function(x,y,piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            // if the square is empty, we skip it
            if(!piece[r][c]){
                continue;
            }
            // 方块在移动后的位置
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            // 左边界   右边界   下边界
            if(newX < 0 || newX >= COL || newY >= ROW){
                return true;
            }
            // 跳过 还未进入画布的
            if(newY < 0){
                continue;
            }
            // 检查是否 被锁住  下一步是否有方块  
            if( board[newY][newX] != vacant){
                return true;
            }
        }
    }
    return false;
}

// 方向键控制

document.addEventListener("keydown",keypush);

function keypush(event){
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
    }
}

// 每一秒下降一格

let dropStart = Date.now();
let gameOver = false;
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000){
        p.moveDown();
        dropStart = Date.now();
    }
    if( !gameOver){
        requestAnimationFrame(drop);
    }
}

drop();



















