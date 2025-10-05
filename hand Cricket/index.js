var toss_result,u_reason=false,b_reason=false;
var user_batting = false;
var user_score = 0, bot_score = 0;
var user_run = 0, bot_run = 0;
var user_wickets = 0, bot_wickets = 0;
var inning = 1;
var n = 0;
var user_balls = 12, bot_balls = 12;

const keypad = `
  <p id="reason"></p>
  <p id="scoreboard" style='margin-top:0px'></p>
  <div id="runsinput" style='margin-top:0px;padding-top:0px'>
    <div>
      <button value="1" onclick="run(this)">1</button>
      <button value="2" onclick="run(this)">2</button>
      <button value="3" onclick="run(this)">3</button>
    </div>
    <div>
      <button value="4" onclick="run(this)">4</button>
      <button value="5" onclick="run(this)">5</button>
      <button value="6" onclick="run(this)">6</button>
    </div>
  </div>`;

const score = `
  <div class="image-row">
    <h1 id="y"></h1>
    <img class="hand1" src="./images/hand0.jpg" alt="User">
    <div class="image-word">VS</div>
    <img class="hand2" src="./images/hand0.jpg" alt="Bot">
    <h1 id="o"></h1>
  </div>`;


function toss(res) {
  n = res;
  toss_result = res.value;
  user_batting = toss_result === "1";
  document.getElementById("replace2").innerHTML = score;
  document.getElementById("replace").innerHTML = keypad;
}

function run(res) {
  user_run = parseInt(res.value);
  bot_run = Math.floor(Math.random() * 6 + 1);
  document.querySelector(".hand1").src = `./images/hand${user_run}.jpg`;
  document.querySelector(".hand2").src = `./images/hand${bot_run}.jpg`;
  
  if (user_batting) {
    handleBatting();
  } else {
    handleBowling();
  }
  updateScoreboard();
}

function handleBatting() {
  user_balls--;
  if (user_wickets < 4) {
    if (user_run !== bot_run && user_balls >= 0) {
      user_score += user_run;
    } else {
      if (user_run === bot_run) user_wickets++;
    }
    if(inning===2){
     document.getElementById("scoreboard").innerText = `you need ${bot_score - user_score + 1} runs`;
    }
    if (inning === 2 && user_score > bot_score) {
      endGame("You won! 🥳");
      document.getElementById("scoreboard").style = "color:green;"
      return;
    }

    if (user_wickets === 3 || user_balls === 0) {
      if (inning === 1) {
        document.querySelector(".hand1").src = `./images/hand0.jpg`;
        document.querySelector(".hand2").src = `./images/hand0.jpg`;
        document.getElementById("scoreboard").innerText = `bot need ${user_score + 1} runs`;
        document.getElementById("runsinput").innerHTML = `<button onclick="startchase()">start defending</button>`;
        inning++;
        user_batting = false;
      } else {
        decideResult();
      }
    }
    if(user_wickets===3){
      document.getElementById("reason").style = "color:rgb(255, 35, 35)"
      document.getElementById("reason").innerText = "you lost all 3 wickets"
    }
  }
}

function handleBowling() {
  bot_balls--;
  if (bot_wickets < 4) {
    if (bot_run !== user_run && bot_balls >= 0) {
      bot_score += bot_run;
    } else {
      if (bot_run === user_run) bot_wickets++;
    }
    if(inning===2){
     document.getElementById("scoreboard").innerText = `bot need ${user_score - bot_score + 1} runs`;
    }
    if (inning === 2 && bot_score > user_score) {
      endGame("You lost! 😔");
      document.getElementById("scoreboard").style = "color:red;"
      return;
    }

    if (bot_wickets === 3 || bot_balls === 0) {
      if (inning === 1) {
        document.querySelector(".hand1").src = `./images/hand0.jpg`;
        document.querySelector(".hand2").src = `./images/hand0.jpg`;
        document.getElementById("scoreboard").innerText = `you need ${bot_score + 1} runs`;
        document.getElementById("runsinput").innerHTML = `<button onclick="startchase()">start chase</button>`;
        inning++;
        user_batting = true;
      } else {
        decideResult();
      }
    }
    if(bot_wickets === 3){
      document.getElementById("reason").style = "color:rgb(255, 35, 35)"
      document.getElementById("reason").innerText = "opponent lost all 3 wickets"
    }
  }
}

function updateScoreboard() {
  if (user_batting) {
    document.getElementById("user").innerText = `score : ${user_score}/${user_wickets}`;
    document.getElementById("bot").innerText = `balls left : ${user_balls}`;
  } else {
    document.getElementById("bot").innerText = `score : ${bot_score}/${bot_wickets}`;
    document.getElementById("user").innerText = `balls left : ${bot_balls}`;
  }
}

function decideResult() {
  if (user_score > bot_score) {
    endGame("You won! 🥳");
    document.getElementById("scoreboard").style = "color:green;"
  } else if (user_score === bot_score) {
    endGame("It's a Draw");
    document.getElementById("scoreboard").style = "color:blue;"
  } else {
    endGame("You lost! 😔");
    document.getElementById("scoreboard").style = "color:red;"
  }
}

function endGame(resultText) {
  document.getElementById("runsinput").innerHTML = `<button onclick="startnew()">new game</button>`;
  document.getElementById("scoreboard").innerText = resultText;
}

function startnew() {
  window.location.href = "/Web-Dev-Mini-Projects/hand Cricket/";
}

function startchase() {
  document.getElementById("reason").innerText = ""
  document.getElementById("runsinput").innerHTML = keypad;
}
