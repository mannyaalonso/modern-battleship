import { Carrier } from "./Ships/Carrier.js"
import { BattleShip } from "./Ships/Battleship.js"
import { Cruiser } from "./Ships/Cruiser.js"
import { Destroyer } from "./Ships/Destroyer.js"
import { Submarine } from "./Ships/Submarine.js"

/*---------------USERS SHIPS---------------*/
const myBattleShip = new BattleShip()
const myCarrier = new Carrier()
const myCruiser = new Cruiser()
const myDestroyer = new Destroyer()
const mySubmarine = new Submarine()

/*---------------COMPUTER SHIPS---------------*/
const enemyBattleShip = new BattleShip()
const enemyCarrier = new Carrier()
const enemyCruiser = new Cruiser()
const enemyDestroyer = new Destroyer()
const enemySubmarine = new Submarine()

/*---------------USER BUTTONS---------------*/
const buttons = document.querySelector('.user-buttons')
const myBattleShipBtn = document.createElement("button")
const myCarrierBtn = document.createElement("button")
const myCruiserBtn = document.createElement("button")
const myDestoryerBtn = document.createElement("button")
const mySubmarineBtn = document.createElement("button")
const startGameBtn = document.querySelector("#start-game")

/*---------------USER TEXTS---------------*/
const dashTitle = document.getElementById("dash-title")
const dashText = document.getElementById("dash-text")

/*---------------COLORS---------------*/
const battleShipColor = "#011f4b"
const carrierColor = "#03396c"
const cruiserColor = "#005b96"
const destroyerColor = "#6497b1"
const submarineColor = "#b3cde0"

/*---------------BUTTON COLORS---------------*/
myBattleShipBtn.style.backgroundColor = battleShipColor
myCarrierBtn.style.backgroundColor = carrierColor
myCruiserBtn.style.backgroundColor = cruiserColor
myDestoryerBtn.style.backgroundColor = destroyerColor
mySubmarineBtn.style.backgroundColor = submarineColor

/*---------------GAME VARIABLES---------------*/
let enemyPositions = {}
let userPositions = {}
let enemyGuesses = {}
let userGuesses = {}
let enemyHits = {}
let userHits = {}
let userCheck = []
let enemyCheck = []
let match = false
let readyToPlay = false

/*---------------CREATE 10x10 BOARD---------------*/
const attackBoard = document.querySelector("#attackBoard")
const playerBoard = document.querySelector("#playerBoard")
const leftSide = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
const topSide = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let leftCounter = 0
let topCounter = 0

/*---------------INIT---------------*/
createAttackBoard()
createPlayerBoard()
createButtons()
createButtonListeners()

/*---------------ATTACK BOARD---------------*/
function createAttackBoard() {
  for (let i = 0; i < 121; i++) {
    //ADD INITIAL ATTRIBUTES
    const div = document.createElement("div")
    div.setAttribute("class", "enemy cells")
    div.addEventListener("click", clickedEnemyBoard)

    //ASSING ID'S BY ROW
    if (i > 11 && i < 22) div.setAttribute("id", `A${i % 11}`)
    if (i > 22 && i < 33) div.setAttribute("id", `B${i % 11}`)
    if (i > 33 && i < 44) div.setAttribute("id", `C${i % 11}`)
    if (i > 44 && i < 55) div.setAttribute("id", `D${i % 11}`)
    if (i > 55 && i < 66) div.setAttribute("id", `E${i % 11}`)
    if (i > 66 && i < 77) div.setAttribute("id", `F${i % 11}`)
    if (i > 77 && i < 88) div.setAttribute("id", `G${i % 11}`)
    if (i > 88 && i < 99) div.setAttribute("id", `H${i % 11}`)
    if (i > 99 && i < 110) div.setAttribute("id", `I${i % 11}`)
    if (i > 110 && i < 122) div.setAttribute("id", `J${i % 11}`)

    //ADD LETTERS
    if (i % 11 == 0 && i != 0) {
      div.innerText = leftSide[leftCounter]
      div.removeEventListener("click", clickedEnemyBoard)
      leftCounter++
    }

    //ADD NUMBERS
    if (i < 11 && i != 0) {
      div.innerText = topSide[topCounter]
      div.removeEventListener("click", clickedEnemyBoard)
      topCounter++
    }

    //REMOVE 0TH
    if (i == 0) {
      div.removeEventListener("click", clickedEnemyBoard)
    }

    //APPEND ALL TO BOARD
    attackBoard.appendChild(div)
  }
  leftCounter = 0
  topCounter = 0
}

/*---------------PLAYER BOARD---------------*/
function createPlayerBoard() {
  for (let i = 0; i < 121; i++) {
    //ADD INITIAL ATTRIBUTES
    const div = document.createElement("div")
    div.setAttribute("class", "user cells")
    //div.addEventListener('click', clickedBoard)

    //ASSING ID'S BY ROW
    if (i > 11 && i < 22) div.setAttribute("id", `user-A${i % 11}`)
    if (i > 22 && i < 33) div.setAttribute("id", `user-B${i % 11}`)
    if (i > 33 && i < 44) div.setAttribute("id", `user-C${i % 11}`)
    if (i > 44 && i < 55) div.setAttribute("id", `user-D${i % 11}`)
    if (i > 55 && i < 66) div.setAttribute("id", `user-E${i % 11}`)
    if (i > 66 && i < 77) div.setAttribute("id", `user-F${i % 11}`)
    if (i > 77 && i < 88) div.setAttribute("id", `user-G${i % 11}`)
    if (i > 88 && i < 99) div.setAttribute("id", `user-H${i % 11}`)
    if (i > 99 && i < 110) div.setAttribute("id", `user-I${i % 11}`)
    if (i > 110 && i < 122) div.setAttribute("id", `user-J${i % 11}`)

    //ADD LETTERS
    if (i % 11 == 0 && i != 0) {
      div.innerText = leftSide[leftCounter]
      leftCounter++
    }

    //ADD NUMBERS
    if (i < 11 && i != 0) {
      div.innerText = topSide[topCounter]
      topCounter++
    }

    //REMOVE 0TH
    if (i == 0) {
    }

    //APPEND ALL TO BOARD
    playerBoard.appendChild(div)
  }
  leftCounter = 0
  topCounter = 0
}

function createButtons() {
  myBattleShipBtn.setAttribute("class", "user-btn ships")
  myCarrierBtn.setAttribute("class", "user-btn ships")
  myCruiserBtn.setAttribute("class", "user-btn ships")
  myDestoryerBtn.setAttribute('class', 'user-btn ships')
  mySubmarineBtn.setAttribute("class", "user-btn ships")

  myBattleShipBtn.setAttribute("id", "user-0")
  myCarrierBtn.setAttribute("id", "user-1")
  myCruiserBtn.setAttribute("id", "user-2")
  myDestoryerBtn.setAttribute("id", "user-3")
  mySubmarineBtn.setAttribute("id", "user-4")
  
  myBattleShipBtn.innerText = 'Battleship'
  myCarrierBtn.innerText = "Carrier"
  myCruiserBtn.innerText = "Cruiser"
  myDestoryerBtn.innerText = "Destroyer"
  mySubmarineBtn.innerText = "Submarine"

  buttons.appendChild(myBattleShipBtn)
  buttons.appendChild(myCarrierBtn)
  buttons.appendChild(myCruiserBtn)
  buttons.appendChild(myDestoryerBtn)
  buttons.appendChild(mySubmarineBtn)
}

/*---------------CREATE BUTTON LISTENERS---------------*/
function createButtonListeners() {
  const ships = document.querySelectorAll(".ships")
  ships.forEach((ship) => ship.addEventListener("click", buttonClicked))
}

/*---------------CLICK TARGET---------------*/
function clickedEnemyBoard(e) {
  if (readyToPlay == true) {
    const cell = document.querySelector(`#${e.target.id}`)
    if (userGuesses[e.target.id] != true) {
      userGuesses[e.target.id] = true
      cell.style.backgroundColor = "grey"
      if (enemyPositions[e.target.id] == true) {
        userHits[e.target.id] = true
        cell.style.backgroundColor = "crimson"
      }
      AiTurn()
    }

    userCheck = Object.keys(userHits)
    enemyCheck = Object.keys(enemyHits)
    if (userCheck.length == 19) {
      readyToPlay = false
      userWon('User')
    } else if (enemyCheck.length == 19) {
      readyToPlay = false
      userWon('Enemy')
    }
  }
}

/*---------------AI FUNCTIONALITY---------------*/
function AiTurn() {
  while (true) {
    const randomLeft = leftSide[Math.floor(Math.random() * 10)]
    const randomTop = topSide[Math.floor(Math.random() * 10)]
    const cell = document.querySelector(`#user-${randomLeft}${randomTop}`)
    if (enemyGuesses[`${randomLeft}${randomTop}`] != true) {
      enemyGuesses[`${randomLeft}${randomTop}`] = true
      cell.style.backgroundColor = "grey"
      if (userPositions[`${randomLeft}${randomTop}`] == true) {
        enemyHits[`${randomLeft}${randomTop}`] = true
        cell.style.backgroundColor = "crimson"
      } 
      break
    }
  }
}

/*---------------SOMEONE WON---------------*/
function userWon(player) {
  if (player == 'User') {
    dashTitle.innerText = `You won!`
    dashText.innerText = "You've destroyed all your enemies ships!"
    startGameBtn.innerText = "Play Again"
  } else {
    dashTitle.innerText = `You lost!`
    dashText.innerText = "Wars are meant to be fought, not won"
    startGameBtn.innerText = "Play Again"
  }
}

/*---------------BUTTONS TO SET USER SHIPS---------------*/
function buttonClicked(e) {
  if (readyToPlay == false) {
    if (e.target.id == "user-0") {
      clearPositions(0)
      checkPosition(myBattleShip, battleShipColor, userPositions, "user-")
    } else if (e.target.id == "user-1") {
      clearPositions(4)
      checkPosition(myCarrier, carrierColor, userPositions, "user-")
    } else if (e.target.id == "user-2") {
      clearPositions(9)
      checkPosition(myCruiser, cruiserColor, userPositions, "user-")
    } else if (e.target.id == "user-3") {
      clearPositions(11)
      checkPosition(myDestroyer, destroyerColor, userPositions, "user-")
    } else if (e.target.id == "user-4") {
      clearPositions(16)
      checkPosition(mySubmarine, submarineColor, userPositions, "user-")
    }
  }
  
  const clearPosition = Object.keys(userPositions)
  if (e.target.innerText == "Start Game") {
    if (clearPosition.length === 19) {
      readyToPlay = true
      startGame()
      console.log(readyToPlay)
    } else {
      console.log('Please set all your ships')
    }
  }

  if (clearPosition.length === 19) {
    startGameBtn.style.backgroundColor = "black"
  } else if (clearPosition.length < 19) {
    startGameBtn.style.backgroundColor = "grey"
  }

  if (e.target.innerText == "Play Again") {
    enemyPositions = {}
    userPositions = {}
    enemyGuesses = {}
    userGuesses = {}
    enemyHits = {}
    userHits = {}
    userCheck = []
    enemyCheck = []
    match = false
    readyToPlay = false
    playerBoard.replaceChildren()
    attackBoard.replaceChildren()
    createAttackBoard()
    createPlayerBoard()
    createButtons()
    dashTitle.innerText = `Weclome`
    dashText.innerHTML =
      "Click on <span>each button</span> below <span>'Your Board'</span> to place each ship. ->"
    startGameBtn.innerText = "Start Game"
    startGameBtn.style.backgroundColor = "grey"
  }
}

/*---------------CLEAR USER POSITIONS---------------*/
function clearPositions(index) {
  const clearPosition = Object.keys(userPositions)
  for (let i = index; i < clearPosition.length; i++) {
    delete userPositions[clearPosition[i]]
    const cell = document.querySelector(`#user-${clearPosition[i]}`)
    cell.style.backgroundColor = 'transparent'
    cell.style.border = '1px solid black'
  }
}

/*---------------START GAME---------------*/
function startGame() {
  buttons.replaceChildren()
  dashTitle.innerText = "You vs Computer"
  dashText.innerText = "<- Click and destroy all 5 ships to win the war!"
  startGameBtn.innerText = "Game Started"
}

/*---------------CALL TO PLACE ENEMIES---------------*/
checkPosition(enemyBattleShip, battleShipColor, enemyPositions, "")
checkPosition(enemyCarrier, carrierColor, enemyPositions, "")
checkPosition(enemyCruiser, cruiserColor, enemyPositions, "")
checkPosition(enemyDestroyer, destroyerColor, enemyPositions, "")
checkPosition(enemySubmarine, submarineColor, enemyPositions, "")

/*---------------CHECK POSITION---------------*/
function checkPosition(ship, color, position, side) {
  while (true) {
    match = false
    const shipPosition = ship.place(leftSide, topSide)
    for (let i = 0; i < shipPosition.length; i++) {
      if (position[shipPosition[i]] === true) {
        match = true
      }
    }
    if (match == false) {
      assignPosition(shipPosition, color, position, side)
      break
    }
  }
}

/*---------------ASSIGN SHIP TO BOARD---------------*/
function assignPosition(shipPosition, color, position, side) {
  for (let i = 0; i < shipPosition.length; i++) {
    position[shipPosition[i]] = true
    if (position !== enemyPositions) {
      const cell = document.querySelector(`#${side}${shipPosition[i]}`)
      cell.style.backgroundColor = color
      cell.style.border = '1px dotted blue'
    }
  }
}
