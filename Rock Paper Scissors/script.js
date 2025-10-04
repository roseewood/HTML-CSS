let HumanScore = 0
let ComputerScore = 0

function GetComputerChoice(){
    let a = Math.random()*100
    if (a<33.33) {
        return "Paper"
    }
    else if (a>66.66){
        return "Rock"
    }
    else {
        return "Scissors"
    }
}

function PlayRound(player) {
    let comp = GetComputerChoice()
    if (comp===player) {
        DisplayResult(`You both played ${player}. Its a tie!!!`)
    }
    else if (comp === "Rock" && player === "Paper" || comp === "Paper" && player === "Scissors" || comp === "Scissors" && player === "Rock") {
        DisplayResult(`${player} beats ${comp}. You Win!!!`)
        HumanScore++
    }
    else {
        DisplayResult(`${comp} beats ${player}. You Lose!!!`)
        ComputerScore++
    }
    DisplayPlayerScore("Your Score : " + HumanScore)
    DisplayComputerScore("Computer Score : " + ComputerScore)
    if (HumanScore >= 5) {
        alert("Congratulations! You beat the system 🥳")
        HumanScore = 0
        ComputerScore = 0
        DisplayPlayerScore("Your Score : " + HumanScore)
        DisplayComputerScore("Computer Score : " + ComputerScore)
        DisplayResult("Press a button :)")
    }
    else if (ComputerScore >= 5) {
        alert("You got bested by this bot 😮‍💨. Wanna try again?")
        HumanScore = 0
        ComputerScore = 0
        DisplayPlayerScore("Your Score : " + HumanScore)
        DisplayComputerScore("Computer Score : " + ComputerScore)
        DisplayResult("Press a button :)")
    }
}

function DisplayResult(text) {
    let display_text = document.getElementById("Text")
    display_text.textContent = text
}

function DisplayPlayerScore(text) {
    let display_text = document.getElementById("playerScore")
    display_text.textContent = text
}

function DisplayComputerScore(text) {
    let display_text = document.getElementById("computerScore")
    display_text.textContent = text
}
