//()
const gameInfo=document.querySelector(".game-info");
const boxes=document.querySelectorAll(".box");
const newGameBtn=document.querySelector(".btn");

let currentPlayer='X';
let gameGrid;
let winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    gameGrid=["","","","","","","","",""];
    currentPlayer="X";
    //UI par empty kariye
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.style.pointerEvents="all";
        box.classList.remove("win");
        box.classList=`box box${index+1}`;
    }
    )
    gameInfo.innerText=`Current-Player-${currentPlayer}`;
    newGameBtn.classList.remove("active");

};

initGame();

function handleClick(index){
    
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        //swapping turns
        swapTurn();
        boxes[index].style.pointerEvents='none';
        //if any player won
        checkGameOver();
    }

}

function swapTurn(){
    if(currentPlayer=='X'){
        currentPlayer='O'
    }
    else{
        currentPlayer='X';
    }
    ///UI update
    gameInfo.innerHTML=`Current-Player ${currentPlayer}`
}

function checkGameOver(){
    let answer="";

    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="") &&(gameGrid[position[1]]!=="")&&(gameGrid[position[2]]!=="")&&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
            //check if winner is x
            if(gameGrid[position[0  ]]==='X'){
                answer='X';
            }
            else{
                answer='O';
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            //now we know x or o is a winner
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    })  
    //we have a winner
    if(answer!==""){
        gameInfo.innerHTML=`Winner Player is ${answer}`;
        newGameBtn.classList.add('active'); 
    }

    //when there is no winner
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=""){
            fillCount++;
        }
    } 
    )

    if(fillCount===9){
        gameInfo.innerText="Game Tied!";
        newGameBtn.classList.add('active'); 

    }
}

newGameBtn.addEventListener('click',initGame)

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>
    {
        handleClick(index);
    })
}
)