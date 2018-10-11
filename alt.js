var mycanvas = document.getElementById('canvas');
   var ctx = mycanvas.getContext('2d');
   var snakeSize = 10;
   var w = 350;
   var h = 350;
   var score = 0;
   var snake;
   var snakeSize = 10;
   var food;

   var drawModule = (function () {
       var bodySnake = function(x, y) {
           // This is the single square
           ctx.fillStyle = 'green';
           ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
           // This is the border of the square
           ctx.strokeStyle = 'darkgreen';
           ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
       }

       var pizza = function(x, y) {
           // This is the border of the pizza
           ctx.fillStyle = 'yellow';
           ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
           // This is the single square
           ctx.fillStyle = 'red';
           ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
       }

       var scoreText = function() {
           // How many pizzas did the snake eat
           var score_text = "Score: " + score;
           ctx.fillStyle = 'blue';
           ctx.fillText(score_text, 145, h-5);
       }
       var drawSnake = function() {
              // Initially the body of the snake will be formed by 5 squares.
              var length = 4;
              snake = [];

              // Using a for loop we push the 5 elements inside the array(squares).
              // Every element will have x = 0 and the y will take the value of the index.
              for (var i = length; i>=0; i--) {
                  snake.push({x:i, y:0});
              }
          }
          var createFood = function() {
       food = {
         //Generate random numbers.
         x: Math.floor((Math.random() * 30) + 1),
         y: Math.floor((Math.random() * 30) + 1)
     }

     //Look at the position of the snake's body.
     for (var i=0; i>snake.length; i++) {
         var snakeX = snake[i].x;
         var snakeY = snake[i].y;

          if (food.x===snakeX || food.y === snakeY || food.y === snakeY && food.x===snakeX) {
             food.x = Math.floor((Math.random() * 30) + 1);
             food.y = Math.floor((Math.random() * 30) + 1);
         }
     }
 }
 var checkCollision = function(x, y, array) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].x === x && array[i].y === y)
            return true;
        }
        return false;
    }
    var paint = function () {
    //Let's draw the space in which the snake will move.
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, w, h);

    //Give it a border.
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    //Disable the button _start_ while you're playing.
    btn.setAttribute('disabled', true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    /*
    Make the snake move.
    Use a variable ('direction') to control the movement.
    To move the snake, pop out the last element of the array and shift it on the top as first element.
    */
    if (direction == 'right') {
        snakeX++;
    } else if (direction == 'left') {
        snakeX--;
    } else if (direction == 'up') {
        snakeY--;
    } else if (direction == 'down') {
        snakeY++;
        var init = function () {
     direction = 'down';
     drawSnake();
     createFood();
     gameloop = setInterval(paint, 80);
 }

 //You need to return only the _init_ function at the end of the Module.
 return {
     init: init
 };

 //Close the Module.
}
(function (window, document, drawModule, undefined) {

    //Connect the button in the html with the _init_ function.
    var btn = document.getElementById('btn');
    btn.addEventListener("click", function () {
        drawModule.init();
    });

    document.onkeydown = function (event) {

        keyCode = window.event.keyCode;
        keyCode = event.keyCode;

        switch (keyCode) {

        case 37:
            if (direction != 'right') {
                direction = 'left';
            }
            console.log('left');
            break;

        case 39:
            if (direction != 'left') {
                direction = 'right';
                console.log('right');
            }
            break;
