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

  window.addEventListener("touchstart", this.handleStart.bind(this), false);
  window.addEventListener("touchend", this.handleEnd.bind(this), false);    
  window.addEventListener("touchmove", this.handleMove.bind(this), false);
};


const loadImg = () => {
  const preLoadImgSrc = [
    "./images/ninja_attack.png",
    "./images/ninja_run.png",
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


function handleStart(evt) {
  console.log("");
  console.log("[main] : [handleStart] : [start]");


  // body 스크롤 막음 [바디영역에서 스크롤있으면 터치 이벤트 안먹힙니다]
  BodyScrollDisAble();


  // 터치한 div id 값 확인 
  var startId = evt.targetTouches[0].target.id;
  console.log("[main] : [handleStart] : [ID] : " + startId);    			


  // 좌표값 확인
  //var startX = $(this).scrollLeft(); //jquery 방식
  //var startY = $(this).scrollTop(); //jquery 방식
  var startX = evt.changedTouches[0].clientX;
  var startY = evt.changedTouches[0].clientY;
  console.log("[main] : [handleStart] : [X] : " + startX);
  console.log("[main] : [handleStart] : [Y] : " + startY);
  console.log("");

  addDebugMsg("handleStart Y: " + startX + "Y: " + startY);
};


// [모바일 : 터치 이동 내부 함수]
function handleMove(evt) {
  console.log("");		
  console.log("[main] : [handleMove] : [start]");


  // body 스크롤 막음 [바디영역에서 스크롤있으면 터치 이벤트 안먹힙니다]
  BodyScrollDisAble();


  // 터치한 div id 값 확인 	
  var moveId = evt.targetTouches[0].target.id;
  console.log("[main] : [handleMove] : [ID] : " + moveId);
  

  // 좌표값 확인
  // var moveX = $(this).scrollLeft(); //jquery 방식
  // var moveY = $(this).scrollTop(); //jquery 방식
  var moveX = evt.changedTouches[0].clientX;
  var moveY = evt.changedTouches[0].clientY;
  console.log("[main] : [handleMove] : [X] : " + moveX);
  console.log("[main] : [handleMove] : [Y] : " + moveY);
  console.log("");
  addDebugMsg("handleMove Y: " + moveX + "Y: " + moveY);
};


// [모바일 : 터치 종료 내부 함수] 
function handleEnd(evt) {
  console.log("");
  console.log("[main] : [handleEnd] : [start]");


  // 바디 스크롤 허용 
  BodyScrollAble();


  // 좌표값 확인 
  var endX = evt.changedTouches[0].clientX;
  var endY = evt.changedTouches[0].clientY;
  console.log("[main] : [handleEnd] : [X] : " + endX);
  console.log("[main] : [handleEnd] : [Y] : " + endY);
  console.log("");
  addDebugMsg("handleEnd Y: " + endX + "Y: " + endY);
};



/* [body 영역 스크롤 관리 부분] */
function BodyScrollDisAble(){
  document.body.style.overflow = "hidden"; //스크롤 막음
};		
function BodyScrollAble(){
  document.body.style.overflow = "auto"; //스크롤 허용
};

addDebugMsg = (msg) => {
  const debugText = document.querySelector(".debugMsg");
    debugText.value += msg + "\r\n";
}