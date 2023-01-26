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
const btns = document.querySelectorAll(".user-btns")
const healths = document.querySelectorAll(".healthToggle")
const startGameBtn = document.querySelector("#start-game")
const randomizeBtn = document.querySelector("#randomize")

/*---------------USER TEXT---------------*/
const dashTitle = document.getElementById("dash-title")
const dashText = document.getElementById("dash-text")

/*---------------COLORS---------------*/
const battleShipColor = "#011f4b"
const carrierColor = "#03396c"
const cruiserColor = "#005b96"
const destroyerColor = "#6497b1"
const submarineColor = "#b3cde0"

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
const order = [
  "enemyBattleShip",
  "enemyCarrier",
  "enemyCruiser",
  "enemyDestroyer",
  "enemySubmarine",
  "myBattleShip",
  "myCarrier",
  "myCruiser",
  "myDestroyer",
  "mySubmarine",
]
let enemyTrack = []
let userTrack = []

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

/*---------------CREATE BUTTON LISTENERS---------------*/
function createButtonListeners() {
  btns.forEach((btn) => btn.addEventListener("click", buttonClicked))
  healths.forEach((health) => health.addEventListener("mouseover", showHealth))
  healths.forEach((health) => health.addEventListener("mouseout", hideHealth))
}

/*---------------SHOW HEALTH---------------*/
function showHealth(e) {
  for (let i = 0; i < 10; i++) {
    if (e.target.id === `btn-${i}`) {
      e.target.innerText = `Health: ${eval(order[i]).health}`
    }
  }
}

/*---------------HIDE HEALTH---------------*/
function hideHealth(e) {
  for (let i = 0; i < 10; i++) {
    if (e.target.id === `btn-${i}`) {
      e.target.innerText = `${eval(order[i]).name}`
    }
  }
}

/*---------------CLICK ENEMY---------------*/
function clickedEnemyBoard(e) {
  if (readyToPlay == true) {
    const cell = document.querySelector(`#${e.target.id}`)
    if (userGuesses[e.target.id] != true) {
      userGuesses[e.target.id] = true
      cell.style.backgroundColor = "grey"
      if (enemyPositions[e.target.id] == true) {
        checkEnemyShipHit(e.target.id, enemyTrack)
        userHits[e.target.id] = true
        cell.style.backgroundColor = "crimson"
      }
      AiTurn()
    }

    /*---------------CHECK WIN---------------*/
    userCheck = Object.keys(userHits)
    enemyCheck = Object.keys(enemyHits)
    if (userCheck.length == 19) {
      readyToPlay = false
      userWon("User")
    } else if (enemyCheck.length == 19) {
      readyToPlay = false
      userWon("Enemy")
    }
  }
}

/*---------------CHECK ENEMY HEALTH---------------*/
function checkEnemyShipHit(id, track) {
  for (let i = 0; i < track.length; i++) {
    if (track[i] == id) {
      if (i < 4) {
        //Battleship
        enemyBattleShip.health -= 1
        updateEnemyHealth(enemyBattleShip.name, enemyBattleShip.health)
      } else if (i > 3 && i < 9) {
        //Carrier
        enemyCarrier.health -= 1
        updateEnemyHealth(enemyCarrier.name, enemyCarrier.health)
      } else if (i > 8 && i < 11) {
        //Cruiser
        enemyCruiser.health -= 1
        updateEnemyHealth(enemyCruiser.name, enemyCruiser.health)
      } else if (i > 10 && i < 16) {
        //Destroyer
        enemyDestroyer.health -= 1
        updateEnemyHealth(enemyDestroyer.name, enemyDestroyer.health)
      } else if (i > 15) {
        //Submarine
        enemySubmarine.health -= 1
        updateEnemyHealth(enemySubmarine.name, enemySubmarine.health)
      }
    }
  }
}

/*---------------CHECK USER HIT---------------*/
function checkUserShipHit(id, track) {
  for (let i = 0; i < track.length; i++) {
    if (track[i] == id) {
      if (i < 4) {
        //Battleship
        myBattleShip.health -= 1
        updateUserHealth(myBattleShip.name, myBattleShip.health)
      } else if (i > 3 && i < 9) {
        //Carrier
        myCarrier.health -= 1
        updateUserHealth(myCarrier.name, myCarrier.health)
      } else if (i > 8 && i < 11) {
        //Cruiser
        myCruiser.health -= 1
        updateUserHealth(myCruiser.name, myCruiser.health)
      } else if (i > 10 && i < 16) {
        //Destroyer
        myDestroyer.health -= 1
        updateUserHealth(enemyDestroyer.name, myDestroyer.health)
      } else if (i > 15) {
        //Submarine
        mySubmarine.health -= 1
        updateUserHealth(mySubmarine.name, mySubmarine.health)
      }
    }
  }
}

/*---------------UPDATE USER HEALTH---------------*/
function updateUserHealth(name, health) {
  if (name === "Battleship") {
    if (health === 3) {
      healths[5].style.backgroundImage =
        "linear-gradient(to right, orange 20%, rgba(0,0,0,0) 20%)"
    } else if (health === 2) {
      healths[5].style.backgroundImage =
        "linear-gradient(to right, orange 50%, rgba(0,0,0,0) 50%)"
    } else if (health === 1) {
      healths[5].style.backgroundImage =
        "linear-gradient(to right, orangered 70%, rgba(0,0,0,0) 70%)"
    } else if (health === 0) {
      healths[5].style.backgroundImage =
        "linear-gradient(to right, crimson 100%, rgba(0,0,0,0) 100%)"
    }
  }

  if (name === "Carrier") {
    if (health === 4) {
      healths[6].style.backgroundImage =
        "linear-gradient(to right, orange 20%, rgba(0,0,0,0) 20%)"
    } else if (health === 3) {
      healths[6].style.backgroundImage =
        "linear-gradient(to right, orange 50%, rgba(0,0,0,0) 50%)"
    } else if (health === 2) {
      healths[6].style.backgroundImage =
        "linear-gradient(to right, orange 60%, rgba(0,0,0,0) 60%)"
    } else if (health === 1) {
      healths[6].style.backgroundImage =
        "linear-gradient(to right, orangered 80%, rgba(0,0,0,0) 80%)"
    } else if (health === 0) {
      healths[6].style.backgroundImage =
        "linear-gradient(to right, crimson 100%, rgba(0,0,0,0) 100%)"
    }
  }

  if (name === "Cruiser") {
    if (health === 1) {
      healths[7].style.backgroundImage =
        "linear-gradient(to right, orangered 50%, rgba(0,0,0,0) 50%)"
    } else if (health === 0) {
      healths[7].style.backgroundImage =
        "linear-gradient(to right, crimson 100%, rgba(0,0,0,0) 100%)"
    }
  }

  if (name === "Destroyer") {
    if (health === 4) {
      healths[8].style.backgroundImage =
        "linear-gradient(to right, orange 20%, rgba(0,0,0,0) 20%)"
    } else if (health === 3) {
      healths[8].style.backgroundImage =
        "linear-gradient(to right, orange 50%, rgba(0,0,0,0) 50%)"
    } else if (health === 2) {
      healths[8].style.backgroundImage =
        "linear-gradient(to right, orange 60%, rgba(0,0,0,0) 60%)"
    } else if (health === 1) {
      healths[8].style.backgroundImage =
        "linear-gradient(to right, orangered 80%, rgba(0,0,0,0) 80%)"
    } else if (health === 0) {
      healths[8].style.backgroundImage =
        "linear-gradient(to right, crimson 100%, rgba(0,0,0,0) 100%)"
    }
  }

  if (name === "Submarine") {
    if (health === 2) {
      healths[9].style.backgroundImage =
        "linear-gradient(to right, orange 60%, rgba(0,0,0,0) 60%)"
    } else if (health === 1) {
      healths[9].style.backgroundImage =
        "linear-gradient(to right, orangered 80%, rgba(0,0,0,0) 80%)"
    } else if (health === 0) {
      healths[9].style.backgroundImage =
        "linear-gradient(to right, crimson 100%, rgba(0,0,0,0) 100%)"
    }
  }
}

/*---------------UPDATE ENEMY HEALTH---------------*/
function updateEnemyHealth(name, health) {
  if (name === 'Battleship') {
    if (health === 3) {
      healths[0].style.backgroundImage =
        "linear-gradient(to right, orange 20%, rgba(0,0,0,0) 20%)"
    } else if (health === 2) {
      healths[0].style.backgroundImage =
        "linear-gradient(to right, orange 50%, rgba(0,0,0,0) 50%)"
    } else if (health === 1) {
      healths[0].style.backgroundImage =
        "linear-gradient(to right, orangered 70%, rgba(0,0,0,0) 70%)"
    } else if (health === 0) {
      healths[0].style.backgroundImage =
        "linear-gradient(to right, crimson 100%, rgba(0,0,0,0) 100%)"
    }
  }

  if (name === "Carrier") {
    if (health === 4) {
      healths[1].style.backgroundImage =
        "linear-gradient(to right, orange 20%, rgba(0,0,0,0) 20%)"
    } else if (health === 3) {
      healths[1].style.backgroundImage =
        "linear-gradient(to right, orange 50%, rgba(0,0,0,0) 50%)"
    } else if (health === 2) {
      healths[1].style.backgroundImage =
        "linear-gradient(to right, orange 60%, rgba(0,0,0,0) 60%)"
    } else if (health === 1) {
      healths[1].style.backgroundImage =
        "linear-gradient(to right, orangered 80%, rgba(0,0,0,0) 80%)"
    } else if (health === 0) {
      healths[1].style.backgroundImage =
        "linear-gradient(to right, crimson 100%, rgba(0,0,0,0) 100%)"
    }
  }

  if (name === "Cruiser") {
    if (health === 1) {
      healths[2].style.backgroundImage =
        "linear-gradient(to right, orangered 50%, rgba(0,0,0,0) 50%)"
    } else if (health === 0) {
      healths[2].style.backgroundImage =
        "linear-gradient(to right, crimson 100%, rgba(0,0,0,0) 100%)"
    }
  }

  if (name === "Destroyer") {
    if (health === 4) {
      healths[3].style.backgroundImage =
        "linear-gradient(to right, orange 20%, rgba(0,0,0,0) 20%)"
    } else if (health === 3) {
      healths[3].style.backgroundImage =
        "linear-gradient(to right, orange 50%, rgba(0,0,0,0) 50%)"
    } else if (health === 2) {
      healths[3].style.backgroundImage =
        "linear-gradient(to right, orange 60%, rgba(0,0,0,0) 60%)"
    } else if (health === 1) {
      healths[3].style.backgroundImage =
        "linear-gradient(to right, orangered 80%, rgba(0,0,0,0) 80%)"
    } else if (health === 0) {
      healths[3].style.backgroundImage =
        "linear-gradient(to right, crimson 100%, rgba(0,0,0,0) 100%)"
    }
  }

  if (name === "Submarine") {
    if (health === 2) {
      healths[4].style.backgroundImage =
        "linear-gradient(to right, orange 60%, rgba(0,0,0,0) 60%)"
    } else if (health === 1) {
      healths[4].style.backgroundImage =
        "linear-gradient(to right, orangered 80%, rgba(0,0,0,0) 80%)"
    } else if (health === 0) {
      healths[4].style.backgroundImage =
        "linear-gradient(to right, crimson 100%, rgba(0,0,0,0) 100%)"
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
        checkUserShipHit(`${randomLeft}${randomTop}`, userTrack)
        enemyHits[`${randomLeft}${randomTop}`] = true
        cell.style.backgroundColor = "crimson"
      }
      break
    }
  }
}

/*---------------SOMEONE WON---------------*/
function userWon(player) {
  if (player == "User") {
    dashTitle.innerText = `You won!`
    dashText.innerText = "You've destroyed all your enemies ships!"
  } else {
    dashTitle.innerText = `You lost!`
    dashText.innerText = "Wars are meant to be fought, not won"
  }
  startGameBtn.innerText = "Play Again"
  startGameBtn.style.display = "inline"
}

/*---------------BUTTONS TO SET USER SHIPS---------------*/
function buttonClicked(e) {
  if (readyToPlay == false) {
    if (e.target.id == "randomize") {
      clearPositions(0)
      checkPosition(myBattleShip, battleShipColor, userPositions, "user-")
      checkPosition(myCarrier, carrierColor, userPositions, "user-")
      checkPosition(myCruiser, cruiserColor, userPositions, "user-")
      checkPosition(myDestroyer, destroyerColor, userPositions, "user-")
      checkPosition(mySubmarine, submarineColor, userPositions, "user-")

      /*---------------TRACK USER POSITIONS---------------*/
      const myBS = myBattleShip.position
      const myCA = myCarrier.position
      const myCR = myCruiser.position
      const myDE = myDestroyer.position
      const mySU = mySubmarine.position
      userTrack = myBS.concat(myCA.concat(myCR.concat(myDE.concat(mySU))))
    }

    /*---------------CLEAR POSITIONS---------------*/
    const userPositionsArr = Object.keys(userPositions)
    if (e.target.innerText == "Start Game") {
      if (userPositionsArr.length === 19) {
        readyToPlay = true
        return startGame()
      }
    }

    /*---------------UPDATE BUTTONS---------------*/
    if (userPositionsArr.length === 19) {
      startGameBtn.style.display = "inline"
      dashText.innerHTML = "Click <span>Start Game</span> to begin!"
    } else if (userPositionsArr.length < 19) {
      startGameBtn.style.backgroundColor = "grey"
    }
  }

  /*---------------RESET GAME---------------*/
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
    restoreHealth()
    dashTitle.innerText = `Welcome`
    dashText.innerHTML = "Click on <span>Randomize</span> to place each ship."
    startGameBtn.innerText = "Start Game"
    startGameBtn.style.display = "none"
    randomizeBtn.style.display = "inline"
  }
}

/*---------------RESTORE HEALTH---------------*/
function restoreHealth() {
  enemyBattleShip.restoreHealth()
  enemyCarrier.restoreHealth()
  enemyCruiser.restoreHealth()
  enemyDestroyer.restoreHealth()
  enemySubmarine.restoreHealth()

  myBattleShip.restoreHealth()
  myCarrier.restoreHealth()
  myCruiser.restoreHealth()
  myDestroyer.restoreHealth()
  mySubmarine.restoreHealth()

  for (let i = 0; i < healths.length; i++) {
    healths[i].style.backgroundImage =
      "linear-gradient(to right, green 100%, rgba(0,0,0,0) 100%)"
  }
}

/*---------------CLEAR USER POSITIONS---------------*/
function clearPositions(index) {
  const userPositionsArr = Object.keys(userPositions)
  for (let i = index; i < userPositionsArr.length; i++) {
    delete userPositions[userPositionsArr[i]]
    const cell = document.querySelector(`#user-${userPositionsArr[i]}`)
    cell.style.backgroundColor = "transparent"
    cell.style.border = "1px solid black"
  }
}

/*---------------START GAME---------------*/
function startGame() {
  dashTitle.innerText = "You vs Computer"
  dashText.innerHTML = "<- Click and destroy all 5 ships to win the war!"
  startGameBtn.style.display = "none"
  randomizeBtn.style.display = "none"
}

/*---------------CALL TO PLACE ENEMIES---------------*/
checkPosition(enemyBattleShip, battleShipColor, enemyPositions, "")
checkPosition(enemyCarrier, carrierColor, enemyPositions, "")
checkPosition(enemyCruiser, cruiserColor, enemyPositions, "")
checkPosition(enemyDestroyer, destroyerColor, enemyPositions, "")
checkPosition(enemySubmarine, submarineColor, enemyPositions, "")

/*---------------TRACK ENEMY POSITIONS---------------*/
const enemyBS = enemyBattleShip.position
const enemyCA = enemyCarrier.position
const enemyCR = enemyCruiser.position
const enemyDE = enemyDestroyer.position
const enemySU = enemySubmarine.position
enemyTrack = enemyBS.concat(enemyCA.concat(enemyCR.concat(enemyDE.concat(enemySU))))

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