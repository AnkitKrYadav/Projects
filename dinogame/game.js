//GameVariables
var cross = true
var points = 0;
var HighestScore = 0;
var score = document.getElementById('score')
var hiscore = document.getElementById('hiscore')
var obs = document.getElementById("obstacle");
var gomusic = new Audio("gameover.mp3")
var music = new Audio("music.mp3")

var gamecontainer = document.getElementById('gamecontainer');
var obshei = parseInt(window.getComputedStyle(obs, null).getPropertyValue("height"));
var obswidth = parseInt(window.getComputedStyle(obs, null).getPropertyValue("width"));
var cpxi = parseInt(window.getComputedStyle(document.getElementById("cpxi"), null).getPropertyValue("left"));              //collide pixel end
var cpxe = parseInt(window.getComputedStyle(document.getElementById("cpxe"), null).getPropertyValue("left"));              //collide pixel initial
var sur = parseInt(window.getComputedStyle(document.getElementById("sur"), null).getPropertyValue("left"));                //score update range
var Dinowidth = parseInt(window.getComputedStyle(document.getElementById("Dino"), null).getPropertyValue("width"));
var gameover = document.getElementById("gameover");
var gotext2 = document.getElementById("gotext2");
var obsdur = parseFloat(window.getComputedStyle(document.getElementById("obstacle"), null).getPropertyValue("animation-duration"));
var hmm = parseFloat(window.getComputedStyle(document.getElementById("hmm"), null).getPropertyValue("left"));


//EventListeners
document.getElementById("html").addEventListener("keydown", keypressed);
document.getElementById("html").addEventListener('click', clicked);
//document.getElementById("Dino").addEventListener('animationend', () => {
//document.getElementById("Dino").style.left = dx + 151 + 'px'
//});

//EventReactors
function clicked(params) {
  Start();
}

function keypressed(Key) {

  if (Key.keyCode == 13) {
    Start();
  }
  else if (Key.keyCode == 39) {
    rmove();
  }

  else if (Key.keyCode == 38) {
    jump();
  }


  else if (Key.keyCode == 37) {
    lmove();

  }
  else if (Key.keyCode == 40) {
    dmove();
  }

}


//CollisionDetector
setInterval(() => {
  dx = parseInt(window.getComputedStyle(document.getElementById("Dino"), null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(document.getElementById("Dino"), null).getPropertyValue("bottom"));
  ox = parseInt(window.getComputedStyle(document.getElementById("obstacle"), null).getPropertyValue("left"));
  fulldinox = dx + Dinowidth
  diff = fulldinox - ox

  //collided
  if (diff > cpxi && diff < cpxe && dy < obshei) {

    obs.classList.remove('obsani');
    music.pause();
    gomusic.play();

    setTimeout(() => {
      gomusic.pause()
    }, 1000);

    gameover.style.visibility = 'visible';
    gotext2.style.visibility = 'visible';
    gamecontainer.style.opacity = 0.4;
    hiscore.style.visibility = 'visible';
    hiscore.style.top = '66.5vh';
    score.style.top = '65.5vh';
    score.style.left = '57vw';
    score.style.paddingLeft = '13px';
    score.style.paddingRight = '17px';

    if (points > HighestScore) {
      HighestScore = points
      updatehscore(HighestScore);
    }


    document.getElementById('cool').style.visibility = 'hidden';

  }

  //Not Collided
  else if (diff > cpxe && diff < cpxe + sur && cross) {
    points += 100
    updatescore(points);
    cross = false;

    setTimeout(() => {
      cross = true
    }, 500);
  }

  //SpeedChanger
  if (ox < -obswidth) {
    var newobsdur = obsdur - 0.025;
    obs.style.animationDuration = newobsdur + "s";

  }

}, 70);

//Functions
function Start() {
  gameover.style.visibility = 'hidden';
  obs.classList.add("obsani");
  obs.style.animationDuration = 3.5 + ('s');
  document.getElementById('intro1').style.visibility = 'hidden';
  document.getElementById('intro2').style.visibility = 'hidden';
  gotext2.style.visibility = 'hidden';
  gamecontainer.style.opacity = 1
  score.style.visibility = 'visible';
  score.innerHTML = 'Your Score: 0';
  document.getElementById('Dino').style.left = 0.331 + 'vw';
  score.style.top = '0px';
  score.style.left = '0px';
  hiscore.style.top = '0px';
  document.getElementById('cool').style.visibility = 'visible';
  score.style.paddingLeft = '11px';
  score.style.paddingRight = '10px';
  points = 0;
  music.play();
}

function rmove() {
  Dino.style.left = dx + hmm + "px";
}

function jump() {
  Dino.classList.add("dinoani");

  setTimeout(() => {
    Dino.classList.remove("dinoani");
  }, 1000);
}

function lmove() {
  Dino.style.left = dx - hmm + "px";
}

function dmove() {
  Dino.classList.remove("dinoani");
}

function updatescore(points) {
  score.innerHTML = 'Your Score: ' + points;

}
function updatehscore(hscore) {
  hiscore.innerHTML = 'Highest Score: ' + hscore;
}