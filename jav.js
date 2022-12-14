let blockSize = 25 ;
let rows = 15;
let cols =15;
var board;
var context;

var num;
// Snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Food
var foodX;
var foodY;

// move Snake
var goX = 0;
var goY = 0;
//

var gameOver = false;

var snakeBody =[]

window.onload = function(){
    board = document.querySelector("#board");
    board.width = rows * blockSize;
    board.height = cols *blockSize;
    context = board.getContext("2d"); 


    placeFood()
    document.addEventListener("keyup" , moveSnake)
    setInterval(update , 140)
    
}

function update(){
    if(gameOver){
        return ;
    }

    var my_gradient = context.createLinearGradient(100, 100, 0, 500);
    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "white");  
    context.fillStyle = my_gradient; 

    context.fillRect(0 , 0 , board.width , board.height);

    //food location
    context.fillStyle = "yellow";
    context.fillRect(foodX , foodY , blockSize , blockSize );

    if(snakeX == foodX && snakeY == foodY){          
        snakeBody.push([foodX , foodY])
        placeFood()

        //score
        var score = parseInt(document.querySelector('#score').innerText)
         num=score+10
        document.querySelector('#score').innerText = num;
        //
    }
    
    //نکته:برای اینکه قسمت باختن هنگام خوردن به خود مار رخ دهد باید فور و ایف قبل از کد ساخته شدن دم مار باشد

    for(let i = snakeBody.length-1 ; i>0 ; i--){
        snakeBody[i] = snakeBody[i-1]
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX , snakeY]
    }
 

    context.fillStyle = "red";
    snakeX += goX * 25;
    snakeY += goY * 25;
    context.fillRect(snakeX , snakeY , blockSize , blockSize );
    for(let i=0 ; i < snakeBody.length ; i++){
        //[i][0] or [i][1] say when go to in array [foodX , foodY] and save which one? [0] say save foodX and [1] say save foodY
                context.fillRect(  snakeBody[i][0],snakeBody[i][1]  , blockSize , blockSize)
            }

      
       // game over and eat our body     
       for(let i=0 ; i<snakeBody.length ; i++){
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
            gameOver = true;
            alert(`Game Over \n Score: ${num}`)
            location.reload();
        }
    }

    //model 1
    // if(snakeX == -25 || snakeY == -25 || snakeX == 500 || snakeY == 500){
    //     gameOver = true;
    //     alert("Game Over")
    //     location.reload();
    // }
    //

    //model 2
    if(snakeX == -25){
        snakeX= 375
    }
    else if(snakeX == 375){
        snakeX= -25
    }
    else if(snakeY == -25){
        snakeY= 375
    }
    else if(snakeY == 375){
        snakeY= -25
    }
    //

}



function moveSnake(e){

    if(e.keyCode === 39 && goX == !-1){
        goX = 1;
        goY = 0;
        
    }
    else if(e.keyCode === 37 && goX == !1){
        goX = -1;
        goY = 0;
    }
    else if(e.keyCode === 38 && goY == !1){
        goX = 0;
        goY = -1;
    }
    else if(e.keyCode === 40 && goY == !-1){
        goX = 0;
        goY = 1;
    }

}


function placeFood(){
    foodX = Math.floor(Math.random()*15) * 25;
    foodY = Math.floor(Math.random()*15) * 25;
    
}


var startingX , startingY , movingX , movingY;
function touchstart(evt){
    startingX = evt.touches[0].clientX;
    startingY = evt.touches[0].clientY;
}

function touchmove(evt){
    movingX = evt.touches[0].clientX;
    movingY = evt.touches[0].clientY;
}

function touchend(){
    if(startingX+50 < movingX && goX == !-1){
        goX = 1;
        goY = 0;
    }
    else if(startingX-50 > movingX && goX == !1){
        goX = -1;
        goY = 0;
    }
    if(startingY+50 < movingY && goY == !-1){
        goX = 0;
        goY = 1;
    }
    else if(startingY-50 > movingY && goY == !1){
        goX = 0;
        goY = -1;
    }
}


// var startingX , startingY , movingX , movingY;
// function touchstart(evt){
//     startingX = evt.touches[0].clientX;
//     startingY = evt.touches[0].clientY;
// }

// function touchmove(evt){
//     movingX = evt.touches[0].clientX;
//     movingY = evt.touches[0].clientY;
// }

// function touchend(){
//     if(startingX+100 < movingX){
//         alert('right')
//     }
//     else if(startingX-100 > movingX){
//         alert('left')
//     }
//     if(startingY+100 < movingY){
//         alert('down')
//     }
//     else if(startingY-100 > movingY){
//         alert('up')
//     }
// }


