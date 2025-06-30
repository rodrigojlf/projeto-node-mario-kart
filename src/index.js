// PLAYERS

const player1 = {
  name: "Mario",
  speed: 4,
  handling: 3,
  power: 3,
  points: 0,
};

const player2 = {
  name: "Luigi",
  speed: 3,
  handling: 4,
  power: 4,
  points: 0,
};

// FUNCTIONS

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1
}

async function getRandomBlock() {
  let random = Math.random()
  let result

  switch (true) {
    case random < 0.33:
      result = "LINE"
      break
    case random < 0.66:
      result = "CURVE"
      break
    default:
      result = "COMBAT"
  }

  return result
}

async function logRollResult(characterName, attributeName, diceResult, attributeValue) {
    
  console.log(`🎲 ${characterName} rolled a dice for ${attributeName}: ${diceResult} + ${attributeValue} = ${diceResult + attributeValue}`)

}

async function playRaceEngine(characterOne, characterTwo) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Round ${round}\n`)

    let block = await getRandomBlock()
    console.log(`Block: ${block}\n`)

    let diceResultOne = await rollDice()
    let diceResultTwo = await rollDice()

    let skillResultOne = 0
    let skillResultTwo = 0

    if (block === "LINE") {
      skillResultOne = diceResultOne + characterOne.speed
      skillResultTwo = diceResultTwo + characterTwo.speed

      await logRollResult(characterOne.name, "speed", diceResultOne, characterOne.speed)
      await logRollResult(characterTwo.name, "speed", diceResultTwo, characterTwo.speed)
    }
    
    if (block === "CURVE") {
      skillResultOne = diceResultOne + characterOne.handling
      skillResultTwo = diceResultTwo + characterTwo.handling

      await logRollResult(characterOne.name, "handling", diceResultOne, characterOne.handling)
      await logRollResult(characterTwo.name, "handling", diceResultTwo, characterTwo.handling)
    }

    if (block === "COMBAT") {
      skillResultOne = diceResultOne + characterOne.power
      skillResultTwo = diceResultTwo + characterTwo.power

      await logRollResult(characterOne.name, "combat", diceResultOne, characterOne.power)
      await logRollResult(characterTwo.name, "combat", diceResultTwo, characterTwo.power)

      characterTwo.points -= skillResultOne > skillResultTwo && characterTwo.points > 0 ? 1 : 0
      characterOne.points -= skillResultTwo > skillResultOne && characterOne.points > 0 ? 1 : 0
    }

    if (skillResultOne > skillResultTwo) {
      if (block === "COMBAT") {
        console.log(`🥊 ${characterTwo.name} was defeated${characterTwo.points > 0 && skillResultOne != skillResultTwo ? " and lost a point" : ""}.`)
      } else {
        characterOne.points++
        console.log(`🏅 ${characterOne.name} scored a point!`)
      }
    
    } else if (skillResultTwo > skillResultOne) {
      if (block === "COMBAT") {
        console.log(`🥊 ${characterOne.name} was defeated${characterOne.points > 0 && skillResultOne != skillResultTwo ? " and lost a point" : ""}.`)
      } else {
        characterTwo.points++
        console.log(`🏅 ${characterTwo.name} scored a point!`)
      }
    
    } else {
      console.log(`✖️ It was a tie! No one ${block === "COMBAT" ? "lost" : "scored"} a point.`)
    }
    
    console.log(`\nScore: ${characterOne.name} - ${characterOne.points} / ${characterTwo.name} - ${characterTwo.points}`)
    console.log("---------------------------------- \n")

  }
}

async function declareWinner(characterOne, characterTwo) {
  if (characterOne.points > characterTwo.points) {
    console.log(`🏆 ${characterOne.name} is the winner!`)
  } else if (characterTwo.points > characterOne.points) {
    console.log(`🏆 ${characterTwo.name} is the winner!`)
  } else {
    console.log(`✖️ There was no winner. It was a tie.`)
  }

}

// AUTO INVOKE MAIN FUNCTION

(async function main() {
  console.log(`🏁 🚦 🏎️ Starting race between ${player1.name} and ${player2.name}... \n`)

  await playRaceEngine(player1, player2)
  await declareWinner(player1, player2)
})()

