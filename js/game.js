const key = {
  keyDown: {},
  keyValue: {
    37: "left",
    39: "right",
    88: "attack",
    67: "slide",
    13: "enter",
  },
};

const allMonsterComProp = {
  arr: [],
};

const bulletComProp = {
  launch: false,
  arr: [],
};

const gameBackground = {
  gameBox: document.querySelector(".game"),
};

const stageInfo = {
  stage: [],
  totalScore: 0,
  monster: [
    { defaultMon: greenMon, bossMon: greenMonBoss },
    { defaultMon: yellowMon, bossMon: yellowMonBoss },
    { defaultMon: pinkMon, bossMon: pinkMonBoss },
    { defaultMon: pinkMon, bossMon: zombieKing },
    { defaultMon: greenMon, bossMon: greenMonBoss },
    { defaultMon: pinkMon, bossMon: zombieKing },
  ],
  callPosition: [1000, 4000, 9000, 13000, 16000, 1900],
};

const gameProp = {
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  gameOver: false,
};

const renderGame = () => {
  hero.keyMotion();
  setGameBackground();

  npcOne.crash();
  npcTwo.crash();

  bulletComProp.arr.forEach((arr, i) => {
    arr.moveBullet();
  });
  allMonsterComProp.arr.forEach((arr, i) => {
    arr.moveMonster();
  });
  stageInfo.stage.clearCheck();
  window.requestAnimationFrame(renderGame);
};

const endGame = () => {
  gameProp.gameOver = true;
  key.keyDown.left = false;
  key.keyDown.right = false;
  document.querySelector(".game_over").classList.add("active");
};

const setGameBackground = () => {
  let parallaxValue = Math.min(0, (hero.movex - gameProp.screenWidth / 3) * -1);

  gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
};

const windowEvent = () => {
  window.addEventListener("keydown", (e) => {
    console.log(e.which);
    if (!gameProp.gameOver) key.keyDown[key.keyValue[e.which]] = true;
    if (key.keyDown["enter"]) {
      npcOne.talk();
      npcTwo.talk();
    }
  });

  window.addEventListener("keyup", (e) => {
    key.keyDown[key.keyValue[e.which]] = false;
  });

  window.addEventListener("resize", (e) => {
    gameProp.screenWidth = window.innerWidth;
    gameProp.screenHeight = window.innerHeight;
  });

  window.addEventListener("touchstart", this.touchDown.bind(this), false);
  window.addEventListener("touchend", this.touchUp.bind(this), false);    
  window.addEventListener("touchmove", this.touchMove.bind(this), false);
};

touchDown = (tEvent) => {
  this.touches = tEvent.changedTouches;

  this.touches[0].pageX, this.touches[0].pageY;
  // debugMsg
  document.querySelector(".level_box debugMsg").innerText = this.touches;
};

const loadImg = () => {
  const preLoadImgSrc = [
    "../images/ninja_attack.png",
    "../images/ninja_run.png",
  ];
  preLoadImgSrc.forEach((arr) => {
    const img = new Image();
    img.src = arr;
  });
};

let hero;
let npcOne;
let npcTwo;

const init = () => {
  hero = new Hero(".hero");
  stageInfo.stage = new Stage();
  npcOne = new Npc(levelQuest);
  npcTwo = new Npc(levelQuestTwo);

  loadImg();
  windowEvent();
  renderGame();
};

window.onload = () => {
  init();
};
