const playBoard = document.querySelector(".play-board")
const wrapperEl = document.querySelector(".wrapper")
const controls = document.querySelectorAll(".controls i")
const gameOverScreen = document.querySelector(".gameOverScreen")
const scoreEl = document.querySelector(".score")
const highScoreEl = document.querySelector(".high-score")


const textEl = document.querySelector(".loss-text")

const playButtonEl = document.querySelector(".playButton")
let gameOver = false
let foodX, foodY;
let snakeX = 5, snakeY = 10 ;
let snakeBody = []
let velocityX = 0, velocityY = 0
let setIntervalId
let score = 0

let highScore = localStorage.getItem("high-score" || 0)
highScoreEl.innerText = `High Score: ${highScore}`

playButtonEl.addEventListener("click", function(){
    window.location.reload()
    wrapperEl.classList.remove("hide")
    gameOverScreen.classList.add("hide")
 


})

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
    
}

const handleGameOver = () => {

    clearInterval(setIntervalId)
    wrapperEl.classList.add("hide")
    textEl.innerHTML = `Game over! Your score was ${score}`
    gameOverScreen.classList.remove("hide")
    
}

const changeDirection = (e) => {
 if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0
    velocityY = -1
 } else if(e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0
    velocityY = 1
 } else if(e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1
    velocityY = 0
}  else if(e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1
    velocityY = 0
   }
  }



  controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}))
  })



const initGame = () => {
     if(gameOver) return handleGameOver()
    let htmlMarkup = `<div class="food" style="grid-area:
     ${foodY} / ${foodX}"></div>`

     if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        snakeBody.push([foodX, foodY])
         score++

         highScore = score >= highScore ? score : highScore
         localStorage.setItem("high-score", highScore)

         scoreEl.innerHTML = `Current Score: ${score}`
         highScoreEl.innerHTML = `High Score: ${highScore}`
     }


     for (let i = snakeBody.length -1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1]
     }


     snakeBody[0] = [snakeX, snakeY]

      //snake update
     snakeX += velocityX
     snakeY += velocityY


     if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true
     }

     for (let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area:
        ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`

        if ( i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true
        }
     }






     playBoard.innerHTML = htmlMarkup
}

changeFoodPosition()
setIntervalId = setInterval(initGame, 125)

document.addEventListener("keydown", changeDirection);