let avatar = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

let pause = false;
let level = 3;
let currentLevel = 3;
let score = 0;

avatar.forEach((data, index)=>{
    $("#avatar").append(`
        <img class="avatar" src="${data}" onclick="changeAvatar(${index})">
    `)
});

function initStars(){
    $(".stars").empty();
    for(let i=0; i<3; i++){
        $(".stars").append(
            `<span><i class="fa fa-star-o"></i></span>`
        )
    }
}

initStars();

function addStars(){
    let stars = $(".fa-star-o");
    $(stars[0]).toggleClass("fa-star-o fa-star");
}


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images


    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(pause){
        return;
    }

    this.x += this.speed * dt;

    if(this.x > 510){
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }

    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
            score = 0;
            $("#score").text(score);
            initStars();
            player.x = 202;
            player.y = 405;
    };

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

var Player = function(x, y){
    this.x = x;
    this.y = y;
    
    this.player = 'images/char-cat-girl.png';
}

Player.prototype.update = function(){

    
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

Player.prototype.handleInput = function(key){
    if(key == 'left' && this.x > 0){
        this.x -=102;
    }else if(key == 'right' && this.x < 405){
        this.x +=102;
    }else if(key == 'up' && this.y > 0){
        this.y -=83;
    }else if(key == 'down' && this.y <405){
        this.y +=83;
    }

    if(this.y < 0){
        setTimeout(()=>{
            score++;
            $("#score").text(score);
            if(score == 3 || score == 5 || score == 10){
                addStars();
            }
            this.x = 202;
            this.y = 405;
        },100);
    }
}

var player = new Player(202, 405);


function changeAvatar(index){
    player.player = avatar[index];
} 

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };


    if(e.keyCode == 80){
        pause = !pause;
    }
    
    if(!pause){
        player.handleInput(allowedKeys[e.keyCode]);
    }
    //console.log(e.keyCode);

});
