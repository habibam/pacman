//0 empty, 1 wall, 2 coin

var world =[
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,1],
        [1,2,1,2,1,2,1,2,1,2,2,2,1,2,1,1,1,1,1,2,1,2,2,2,1,2,1,2,1,2,1,2,1],
        [1,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,1],
        [1,2,1,1,1,2,1,2,1,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,1,2,1,2,1,1,1,2,1],
        [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,1,2,1,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],
        [1,2,1,2,1,2,2,2,1,2,2,2,1,2,1,0,0,0,1,2,1,2,2,2,1,2,2,2,1,2,1,2,1],
        [1,2,1,2,1,2,2,2,1,1,1,1,1,2,2,0,0,0,2,2,1,1,1,1,1,2,2,2,1,2,1,2,1],
        [1,2,1,2,1,2,2,2,1,2,2,2,1,2,1,0,0,0,1,2,1,2,2,2,1,2,2,2,1,2,1,2,1],
        [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,1,2,1,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],
        [1,2,1,1,1,2,1,2,1,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,1,2,1,2,1,1,1,2,1],
        [1,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,1],
        [1,2,1,2,1,2,1,2,1,2,2,2,1,2,1,1,1,1,1,2,1,2,2,2,1,2,1,2,1,2,1,2,1],
        [1,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
var xPos = 800;
var yPos = 350;
var score = 0;

var ghosts = {
    ghost1 : {
        xPos: 750,
        yPos: 300
        },
    ghost2 : {
        xPos: 850,
        yPos: 300
        },
    ghost3 : {
        xPos: 750,
        yPos: 400
        },
    ghost4 : {
        xPos: 850,
        yPos: 400
        },
}

var moves = 0;
var gameOver = false;

function showWorld(){
    var htmlString="";
    for (var y=0; y<world.length; y++){
        htmlString += '<div class="row">'
        for(var x=0; x<world[y].length; x++){
            if(world[y][x] === 1){
                htmlString += '<div class="brick"></div>';
            } else if(world[y][x] === 2){
                htmlString += '<div class="coin"></div>';
            } else if(world[y][x] === 0){
                htmlString += '<div class="empty"></div>';
            } else if(world[y][x] === 3){
                htmlString += '<div class="fruit"></div>'
            }
        }
        htmlString += '</div>';
    }
    document.getElementById('world').innerHTML = htmlString;
}

document.onkeydown = function(event){
    // console.log(event);
    if(!gameOver){
        //left
        if(event.keyCode == 37 && world[yPos/50][(xPos/50)-1] !=1){
            xPos -= 50;
            moves++;
            rollForFruit();
            moveGhosts();
        } 

        //up
        else if( event.keyCode ==38 && world[(yPos/50)-1][xPos/50] !=1){
            yPos -= 50;
            moves++;
            rollForFruit();
            moveGhosts();
        }  

        //right
        else if( event.keyCode ==39 && world[yPos/50][(xPos/50)+1] !=1){
            xPos += 50;
            moves++;
            rollForFruit();
            moveGhosts();
        } 

        //down
        else if( event.keyCode ==40 && world[(yPos/50)+1][xPos/50] !=1){
            yPos += 50;
            moves++;
            rollForFruit();
            moveGhosts();
        }

        document.getElementById('pacman').style.top = yPos+'px';
        document.getElementById('pacman').style.left = xPos+'px';
        checkColletibles();
        checkForGhosts();
    }
};

function checkColletibles(){
    var currentCoords = [xPos/50, yPos/50];
    if (world[yPos/50][xPos/50] === 2){
        world[yPos/50][xPos/50] = 0;
        score ++;
        showWorld();
        showScore();
    } else if(world[yPos/50][xPos/50] === 3){
        world[yPos/50][xPos/50] = 0;
        score += 50;
        showWorld();
        showScore();
    }
}

function showScore(){
    document.getElementById('score').innerText = "Score: "+ score;
}

function rollForFruit(){
    if(moves > 10 && moves%5 === 0){
        var randY = Math.floor(Math.random()*(world.length-1));
        var randX = Math.floor(Math.random()*(world[randY].length-1));
        // console.log(randY);
        // console.log(randX);
        if(world[randY][randX] === 0 ){
            world[randY][randX] = 3;
        }
    }
}

function moveGhosts(){
    if(moves>10){
        for(var gh in ghosts){
            var direction = Math.floor(Math.random()*4)+1;

            //this could be combined with player movement with some effort
            //left
            if(direction === 1 && world[ghosts[gh].yPos/50][(ghosts[gh].xPos/50)-1] !==1){
                ghosts[gh].xPos -= 50;
            } 

            //up
            else if(direction === 2 && world[(ghosts[gh].yPos/50)-1][ghosts[gh].xPos/50] !==1){
                ghosts[gh].yPos -= 50;
            }  

            //right
            else if(direction === 3 && world[ghosts[gh].yPos/50][(ghosts[gh].xPos/50)+1] !==1){
                ghosts[gh].xPos += 50;
            } 

            //down
            else if(direction === 4 && world[(ghosts[gh].yPos/50)+1][ghosts[gh].xPos/50] !==1){
                ghosts[gh].yPos += 50;
            }

            document.getElementById(gh).style.top = ghosts[gh].yPos+'px';
            document.getElementById(gh).style.left = ghosts[gh].xPos+'px';
        }
    }
}

function checkForGhosts(){
    for(var gh in ghosts){
        if(ghosts[gh].xPos === xPos && ghosts[gh].yPos ===yPos){
            gameOver = true;
            alert('Game Over');
        }
    }
}

showWorld();



//****build a world
//*****put pacman on board
//*****move pacman
//****eat coins
//add fruit
//randomly generate board