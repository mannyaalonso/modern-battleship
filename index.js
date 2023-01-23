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
const buttons = []
for (let i = 0; i < 5; i++) {
  buttons.push(document.getElementById(`user-${i}`))
}
const myBattleShipBtn = document.getElementById("user-0")
const myCarrierBtn = document.getElementById("user-1")
const myCruiserBtn = document.getElementById("user-2")
const myDestoryerBtn = document.getElementById("user-3")
const mySubmarineBtn = document.getElementById("user-4")

/*---------------COLORS---------------*/
const battleShipColor = "lightgrey"
const carrierColor = "lightgrey"
const cruiserColor = "lightgrey"
const destroyerColor = "lightgrey"
const submarineColor = "lightgrey"

/*---------------BUTTON COLORS---------------*/
// myBattleShipBtn.style.backgroundColor = battleShipColor
// myCarrierBtn.style.backgroundColor = carrierColor
// myCruiserBtn.style.backgroundColor = cruiserColor
// myDestoryerBtn.style.backgroundColor = destroyerColor
// mySubmarineBtn.style.backgroundColor = submarineColor

/*---------------GAME VARIABLES---------------*/

const enemyPositions = {}
const userPositions = {}
const enemyGuesses = {}
const userGuesses = {}
const enemyHits = {}
const userHits = {}
let winCheck = []
let match = false

/*---------------CREATE 10x10 BOARD---------------*/
const attackBoard = document.querySelector("#attackBoard")
const playerBoard = document.querySelector("#playerBoard")
const leftSide = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
const topSide = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let leftCounter = 0
let topCounter = 0

/*---------------ATTACK BOARD---------------*/
function createAttackBoard() {
  for (let i = 0; i < 121; i++) {
    //ADD INITIAL ATTRIBUTES
    const div = document.createElement("div")
    div.setAttribute("class", "enemy cells")
    div.addEventListener("click", clickedEnemyBoard)

    //ASSING ID'S BY ROW
    if (i > 11 && i < 22) div.setAttribute("id", `enemy-A${i % 11}`)
    if (i > 22 && i < 33) div.setAttribute("id", `enemy-B${i % 11}`)
    if (i > 33 && i < 44) div.setAttribute("id", `enemy-C${i % 11}`)
    if (i > 44 && i < 55) div.setAttribute("id", `enemy-D${i % 11}`)
    if (i > 55 && i < 66) div.setAttribute("id", `enemy-E${i % 11}`)
    if (i > 66 && i < 77) div.setAttribute("id", `enemy-F${i % 11}`)
    if (i > 77 && i < 88) div.setAttribute("id", `enemy-G${i % 11}`)
    if (i > 88 && i < 99) div.setAttribute("id", `enemy-H${i % 11}`)
    if (i > 99 && i < 110) div.setAttribute("id", `enemy-I${i % 11}`)
    if (i > 110 && i < 122) div.setAttribute("id", `enemy-J${i % 11}`)

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
      //div.removeEventListener('click', clickedBoard)
      leftCounter++
    }

    //ADD NUMBERS
    if (i < 11 && i != 0) {
      div.innerText = topSide[topCounter]
      //div.removeEventListener('click', clickedBoard)
      topCounter++
    }

    //REMOVE 0TH
    if (i == 0) {
      //div.removeEventListener('click', clickedBoard)
    }

    //APPEND ALL TO BOARD
    playerBoard.appendChild(div)
  }
  leftCounter = 0
  topCounter = 0
}

/*---------------CREATE BUTTON LISTENERS---------------*/
function createButtonListeners() {
  const ships = document.querySelectorAll(".ships")
  ships.forEach((ship) => ship.addEventListener("mouseover", showHealth))
  ships.forEach((ship) => ship.addEventListener("mouseout", hideHealth))
  ships.forEach((ship) => ship.addEventListener("click", buttonClicked))
}

/*---------------CLICK TARGET---------------*/
function clickedEnemyBoard(e) {
  const cell = document.querySelector(`#${e.target.id}`)
  userGuesses[e.target.id] = true
  if (enemyPositions[e.target.id] && !userHits[e.target.id]) {
    userHits[e.target.id] = true
    cell.style.backgroundColor = "crimson"
    cell.removeEventListener("click", clickedEnemyBoard)
    winCheck = Object.keys(userHits)
  } else {
    cell.style.backgroundColor = "rgba(84, 58, 183, 1)"
    cell.removeEventListener("click", clickedEnemyBoard)
  }
  if (winCheck.length == 19) return userWon()
}

function userWon() {
  console.log("YOU WON")
}

/*---------------SHOW HEALTH---------------*/
function showHealth(e) {
  if (e.target.id == "enemy-0")
    e.target.textContent = `Health: ${enemyBattleShip.health}`
  if (e.target.id == "enemy-1")
    e.target.textContent = `Health: ${enemyCarrier.health}`
  if (e.target.id == "enemy-2")
    e.target.textContent = `Health: ${enemyCruiser.health}`
  if (e.target.id == "enemy-3")
    e.target.textContent = `Health: ${enemyDestroyer.health}`
  if (e.target.id == "enemy-4")
    e.target.textContent = `Health: ${enemySubmarine.health}`
}

/*---------------HIDE HEALTH---------------*/
function hideHealth(e) {
  if (e.target.id == "enemy-0") e.target.textContent = `${enemyBattleShip.name}`
  if (e.target.id == "enemy-1") e.target.textContent = `${enemyCarrier.name}`
  if (e.target.id == "enemy-2") e.target.textContent = `${enemyCruiser.name}`
  if (e.target.id == "enemy-3") e.target.textContent = `${enemyDestroyer.name}`
  if (e.target.id == "enemy-4") e.target.textContent = `${enemySubmarine.name}`
}

function buttonClicked(e) {
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
  
  if (e.target.id == "start-game") {
    const clearPositions = Object.keys(userPositions)
    if (clearPositions.length === 19) {
      console.log('Ready to start game')
    } else {
      console.log('Please set all your ships')
    }
  }
}

function clearPositions(index) {
  const clearPositions = Object.keys(userPositions)
  for (let i = index; i < clearPositions.length; i++) {
    delete userPositions[clearPositions[i]]
    const cell = document.querySelector(`#user-${clearPositions[i]}`)
    cell.style.backgroundColor = 'transparent'
    //cell.style.
  }
}


/*---------------INIT---------------*/
createAttackBoard()
createPlayerBoard()
createButtonListeners()

/*---------------CALL TO PLACE ENEMIES---------------*/
checkPosition(enemyBattleShip, battleShipColor, enemyPositions, "enemy-")
checkPosition(enemyCarrier, carrierColor, enemyPositions, "enemy-")
checkPosition(enemyCruiser, cruiserColor, enemyPositions, "enemy-")
checkPosition(enemyDestroyer, destroyerColor, enemyPositions, "enemy-")
checkPosition(enemySubmarine, submarineColor, enemyPositions, "enemy-")

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
    }
  }
}
