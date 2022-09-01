//---------------------------------------------- SET UP CANVAS
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

audio.Title.play();

//---------------------------------------------- CREATE COLLISIONS MAP
//create the 2d map array from exported json map file
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 60) {
  collisionsMap.push(collisions.slice(i, i + 60));
}

//create an array of drawn boundary squares
const boundaries = [];
//offset for the map image and boundaries, foreground, etc.
const offset = {
  x: -500,
  y: -1200,
};
//loop over collisions map and create boundaries -> add them to boundaries arr
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    //5036 is from the collisions js created from json file
    if (symbol === 5140) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});

console.log(boundaries);

// //---------------------------------------------- CREATE WATER MAP
// const waterImg = new Image();
// waterImg.src = "/assets/background animations/water.png";
// const testwaterImg = new Image();
// testwaterImg.src = "/assets/background animations/water.png";
// //create the 2d map array from exported json map file
// const waterMap = [];
// for (let i = 0; i < water.length; i += 60) {
//   waterMap.push(water.slice(i, i + 60));
// }

// //create an array of drawn boundary squares
// const waterArr = [];
// const waterImageArray = [];
// //loop over collisions map and create boundaries -> add them to boundaries arr
// waterMap.forEach((row, i) => {
//   row.forEach((symbol, j) => {
//     //5036 is from the collisions js created from json file
//     let waterIndex = 0;
//     if (symbol === 1243) {
//       waterImageArray.push(new Image());
//       waterImageArray.forEach((img) => {
//         img.src = "/assets/background animations/water.png";
//       });
//       waterArr.push(
//         new Water({
//           position: {
//             x: j * 32 + offset.x,
//             y: i * 32 + offset.y,
//           },
//           image: waterImageArray[waterIndex],
//           moving: true,
//           frames: { max: 8 },
//         })
//       );
//       waterIndex += 1;
//     }
//   });
// });

// //////testinggg
// console.log(waterArr);
// console.log(waterImageArray);

// const testWaterArr = [
//   new Water({
//     position: {
//       x: 200,
//       y: 200,
//     },
//     image: waterImg,
//     moving: true,
//     frames: { max: 8 },
//     scale: { max: 2 },
//   }),
//   new Water({
//     position: {
//       x: 200,
//       y: 200,
//     },
//     image: testwaterImg,
//     moving: true,
//     frames: { max: 8 },
//     scale: { max: 2 },
//   }),
//   new Water({
//     position: {
//       x: 200,
//       y: 264,
//     },
//     image: waterImg,
//     moving: true,
//     frames: { max: 8 },
//     scale: { max: 2 },
//   }),
// ];

//---------------------------------------------- IMAGE IMPORTS
const image = new Image();
image.src = "/assets/cafecito-village/cafecito_village_test.png";
//PLAYER MOVING
const playerUpImg = new Image();
playerUpImg.src = "/assets/player_up.png";
const playerDownImg = new Image();
playerDownImg.src = "/assets/player_down.png";
const playerLeftImg = new Image();
playerLeftImg.src = "/assets/player_left.png";
const playerRightImg = new Image();
playerRightImg.src = "/assets/player_right.png";
//PLAYER ATTACK
const playerAttackUp = new Image();
playerAttackUp.src = "/assets/player/attack animations/player_attack_up.png";
const playerAttackDown = new Image();
playerAttackDown.src =
  "/assets/player/attack animations/player_attack_down.png";
const playerAttackLeft = new Image();
playerAttackLeft.src =
  "/assets/player/attack animations/player_attack_left.png";
const playerAttackRight = new Image();
playerAttackRight.src =
  "/assets/player/attack animations/player_attack_right.png";

const foregroundImg = new Image();
foregroundImg.src = "/assets/cafecito-village/cafecito_village_foreground.png";

//NPC
const chickenLeftImg = new Image();
chickenLeftImg.src = "/assets/chicken/chicken_left.png";

const chickenRightImg = new Image();
chickenRightImg.src = "/assets/chicken/chicken_right.png";

const kidSparImg = new Image();
kidSparImg.src = "/assets/kid/kid_sparring.png";

const blacksmithImg = new Image();
blacksmithImg.src = "/assets/background animations/blacksmith/blacksmith.png";

const attentionIconImg = new Image();
attentionIconImg.src =
  "/assets/background animations/icons/attention/npc-icon-attention.png";

//ASSETS
const bonfireImg = new Image();
bonfireImg.src = "/assets/placeables/bonfire/campfire 1-3.png";

const treeOneImg = new Image();
treeOneImg.src = "/assets/background animations/tree/Animated Tree1.png";
const treeTwoImg = new Image();
treeTwoImg.src = "/assets/background animations/tree/Animated Tree1.png";
const treeWestTopImg = new Image();
treeWestTopImg.src = "/assets/background animations/tree/Animated Tree1.png";
const treeWestTopTwoImg = new Image();
treeWestTopTwoImg.src = "/assets/background animations/tree/Animated Tree1.png";
const treeSouthEastImg = new Image();
treeSouthEastImg.src = "/assets/background animations/tree/Animated Tree1.png";

const waterWellImage = new Image();
waterWellImage.src = "/assets/background animations/well/water well.png";

const westParticleOneImg = new Image();
westParticleOneImg.src =
  "/assets/background animations/particles/nature particle.png";

const forgeImg = new Image();
forgeImg.src = "/assets/background animations/blacksmith/forge.png";
const forgeSmokeImg = new Image();
forgeSmokeImg.src = "/assets/background animations/blacksmith/smoke.png";

//ENEMIES
const slimeOneRightImage = new Image();
slimeOneRightImage.src = "/assets/enemies/slime/slime_right.png";

//---------------------------------------------- CREATE OBJECTS
//create player
const player = new Sprite({
  position: {
    x: 480, //static position for player on x axis
    y: canvas.height / 2,
  },
  image: playerDownImg,
  facingPrevious: playerDownImg,
  frames: { max: 4 }, //frames from character sprite sheet to cut out
  scale: { max: 2 }, //set to scale the sprite to make it bigger
  sprites: {
    up: playerUpImg,
    down: playerDownImg,
    left: playerLeftImg,
    right: playerRightImg,
  },
});

//create enemies
//---slime
const slimeOne = new Sprite({
  position: {
    x: 500,
    y: 300,
  },
  image: slimeOneRightImage,
  frames: { max: 4 },
  scale: { max: 3 },
  moving: true,
});

//create background world image
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

//create foreground world image
const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImg,
});

//create chicken
const chicken = new Sprite({
  position: {
    x: 3000,
    y: -400,
  },
  image: chickenLeftImg,
  frames: { max: 4 },
  scale: { max: 3 },
  sprites: {
    left: chickenLeftImg,
    right: chickenRightImg,
  },
  travelDistance: 400,
  moving: true,
  travelDirection: "left",
});

//create kid
const kid = new Sprite({
  position: {
    x: 1028,
    y: -400,
  },
  image: kidSparImg,
  frames: { max: 4 },
  scale: { max: 2 },
  moving: true,
});

//create bonfire
const bonfire = new Sprite({
  position: {
    x: 460,
    y: 339,
  },
  image: bonfireImg,
  frames: { max: 8 },
  scale: { max: 2 },
  moving: true,
});

//trees
const treeOne = new Sprite({
  position: {
    x: 1200,
    y: -625,
  },
  image: treeOneImg,
  frames: { max: 8 },
  scale: { max: 2 },
  moving: true,
});
const treeTwo = new Sprite({
  position: {
    x: 1330,
    y: -690,
  },
  image: treeTwoImg,
  frames: { max: 8 },
  scale: { max: 2 },
  moving: true,
});
const treeWestTop = new Sprite({
  position: {
    x: 430,
    y: -685,
  },
  image: treeWestTopImg,
  frames: { max: 8 },
  scale: { max: 2 },
  moving: true,
});
const treeWestTopTwo = new Sprite({
  position: {
    x: 740,
    y: -750,
  },
  image: treeWestTopTwoImg,
  frames: { max: 8 },
  scale: { max: 2 },
  moving: true,
});
const treeSouthEast = new Sprite({
  position: {
    x: 2730,
    y: 0,
  },
  image: treeSouthEastImg,
  frames: { max: 8 },
  scale: { max: 2 },
  moving: true,
});

//well
const waterWell = new Sprite({
  position: {
    x: 618,
    y: -520,
  },
  image: waterWellImage,
  frames: { max: 29 },
  scale: { max: 2 },
  moving: true,
});

//particles
const westParticleOne = new Sprite({
  position: {
    x: 400,
    y: 10,
  },
  image: westParticleOneImg,
  frames: { max: 24 },
  scale: { max: 2 },
  moving: true,
  velocity: 25,
});

//blacksmith
const blacksmith = new Sprite({
  position: {
    x: 2470,
    y: -525,
  },
  image: blacksmithImg,
  frames: { max: 13 },
  scale: { max: 1.5 },
  moving: true,
});

const forge = new Sprite({
  position: {
    x: 2315,
    y: -540,
  },
  image: forgeImg,
  frames: { max: 8 },
  scale: { max: 2 },
  moving: true,
});

const forgeSmoke = new Sprite({
  position: {
    x: 2310,
    y: -850,
  },
  image: forgeSmokeImg,
  frames: { max: 16 },
  scale: { max: 2 },
  moving: true,
});

const attentionIcon = new Sprite({
  position: {
    x: 2565,
    y: -505,
  },
  image: attentionIconImg,
  frames: { max: 8 },
  scale: { max: 1 },
  moving: true,
});

//---------------------------------------------- ENEMY CREATION
let enemyArr = [];
let enemyImgArr = [];

function createSlime() {
  enemyImgArr.push(new Image());
  enemyImgArr[0].src = "/assets/enemies/slime/slime_right.png";

  enemyArr.push(
    new Sprite({
      position: {
        x: 700,
        y: 300,
      },
      image: enemyImgArr[0],
      frames: { max: 4 },
      scale: { max: 3 },
      moving: true,
    })
  );
}

//---------------------------------------------- KEEP TRACK OF KEY PRESSES

const keys = {
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  Space: {
    pressed: false,
  },
  Enter: {
    pressed: false,
  },
};

//---------------------------------------------- KEEP TRACK OF GAME STATS

const gameStat = {
  speaking: false,
};

//------------->>>>>>>>>>>>>> TEST <<<<-------- REMOVE later >>>>><><><><><><

/////////////      TESTING TESTING   /////////////////////////

//---------------------------------------------- MOVABLES
//create an array of items that will be moving on screen
const movables = [
  background,
  ...boundaries,
  foreground,
  chicken,
  kid,
  bonfire,
  treeOne,
  treeTwo,
  treeWestTop,
  treeWestTopTwo,
  treeSouthEast,
  waterWell,
  westParticleOne,
  blacksmith,
  forge,
  forgeSmoke,
  slimeOne,
  attentionIcon,
];

//---------------------------------------------- FUNCTIONS
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width + 20 >= rectangle2.position.x &&
    rectangle1.position.x + 40 <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + 96 <= // added 96 because of player sprite sizing so only bottom half collides with y
      rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height + 55 >= rectangle2.position.y
  );
}
function enemyCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= // added 96 because of player sprite sizing so only bottom half collides with y
      rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

//---------------------------------------------- ANIMATION LOOP
function animate() {
  window.requestAnimationFrame(animate);
  //draw background
  background.draw();
  //draw trees
  treeWestTop.draw();
  treeWestTopTwo.draw();
  treeTwo.draw();
  treeOne.draw();
  //draw well
  waterWell.draw();
  //draw blacksmith
  blacksmith.draw();
  //draw forge
  forge.draw();
  //draw forge smoke
  forgeSmoke.draw();
  //draw attention icon for blacksmith
  attentionIcon.draw();
  //draw boundaries
  boundaries.forEach((boundary) => {
    boundary.draw(boundary);
  });
  //draw chicken
  chicken.draw();
  //draw kid
  kid.draw();
  //draw bonfire
  bonfire.draw();
  //draw slime enemies
  enemyArr.forEach((enemy, i) => {
    //logic behind defeated enemies disappearing
    console.log(enemy.health);
    if (enemy.health <= 0) {
      enemyArr.splice(i, i + 1);
      playDmg();
      player.dinero += 5;
    }
    enemy.draw(enemy);
  });
  //draw particles
  westParticleOne.draw();
  //draw player
  if (!keys.Space.pressed) {
    player.draw();
  }
  //draw foreground
  foreground.draw();
  //trees with occlusion
  treeSouthEast.draw();
  //move background and collision boundaries & check for collisions
  let moving = true;
  //set player moving to false to stop moving animation, only plays when keydown in event listener if statement
  player.moving = false;
  if (keys.ArrowUp.pressed && lastKeyPressed === "ArrowUp") {
    //check for collisions with boundaries
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        console.log("COLLISION!!!!!!!");
        moving = false;
        break;
      }
    }
    if (moving) {
      enemyArr.forEach((enemy) => {
        enemy.position.y += 3;
      });
      movables.forEach((movable) => {
        movable.position.y += 3;
        player.image = player.sprites.up;
        //set previous direction, so it can be reset after attack
        player.facingPrevious = player.sprites.up;
        //set which way player faces, used for attack
        player.facing = "up";
        player.moving = true;
      });
    }
  } else if (keys.ArrowDown.pressed && lastKeyPressed === "ArrowDown") {
    //check for collisions with boundaries
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        console.log("COLLISION!!!!!!!");
        moving = false;
        break;
      }
    }
    if (moving) {
      enemyArr.forEach((enemy) => {
        enemy.position.y -= 3;
      });
      movables.forEach((movable) => {
        movable.position.y -= 3;
        player.image = player.sprites.down;
        //set previous direction, so it can be reset after attack
        player.facingPrevious = player.sprites.down;
        //set which way player faces, used for attack
        player.facing = "down";
        player.moving = true;
      });
    }
  } else if (keys.ArrowLeft.pressed && lastKeyPressed === "ArrowLeft") {
    //check for collisions with boundaries
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("COLLISION!!!!!!!");
        moving = false;
        break;
      }
    }
    if (moving) {
      enemyArr.forEach((enemy) => {
        enemy.position.x += 3;
      });
      movables.forEach((movable) => {
        movable.position.x += 3;
        player.image = player.sprites.left;
        //set previous direction, so it can be reset after attack
        player.facingPrevious = player.sprites.left;
        //set which way player faces, used for attack
        player.facing = "left";
        player.moving = true;
      });
    }
  } else if (keys.ArrowRight.pressed && lastKeyPressed === "ArrowRight") {
    //check for collisions with boundaries
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("COLLISION!!!!!!!");
        moving = false;
        break;
      }
    }
    if (moving) {
      enemyArr.forEach((enemy) => {
        enemy.position.x -= 3;
      });
      movables.forEach((movable) => {
        movable.position.x -= 3;
        player.image = player.sprites.right;
        //set previous direction, so it can be reset after attack
        player.facingPrevious = player.sprites.right;
        //set which way player faces, used for attack
        player.facing = "right";
        player.moving = true;
      });
    }
  }

  if (keys.Space.pressed) {
    player.attack();
  }

  //$$$$$$$ ENEMY ATTACK LOGIC $$$$$$$$
  function playDmg() {
    setTimeout(() => {
      audio.SlimeDmg.play();
    }, 300);
  }
  for (let i = 0; i < enemyArr.length; i++) {
    const enemy = enemyArr[i];
    if (
      enemyCollision({ rectangle1: player, rectangle2: enemy }) &&
      keys.Space.pressed
    ) {
      enemy.health -= player.damage;
    }
  }

  //-000-0-0-00-0-0-0-0
  if (
    enemyCollision({ rectangle1: player, rectangle2: kid }) &&
    keys.Enter.pressed == true &&
    !gameStat.speaking
  ) {
    keys.Enter.pressed = false;
    gameStat.speaking = true;
    showChatUi();
    kidScriptIndex = kidScriptCount % kidSpeak.length;
    writeText(kidSpeak[kidScriptIndex]);
    kidScriptCount += 1;
  } else if (
    enemyCollision({ rectangle1: player, rectangle2: kid }) &&
    gameStat.speaking == true &&
    keys.Enter.pressed == true
  ) {
    hideChatUi();
    gameStat.speaking = false;
    keys.Enter.pressed = false;
  }
}
animate();

//---------------------------------------------- EVENT LISTENERS FOR MOVING PLAYER
let lastKeyPressed = "";
window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      lastKeyPressed = "ArrowUp";
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      lastKeyPressed = "ArrowDown";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastKeyPressed = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lastKeyPressed = "ArrowRight";
      break;
    case "Space":
      keys.Space.pressed = true;
      audio.Punch.play();
      break;
    case "Enter":
      keys.Enter.pressed = true;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "Space":
      keys.Space.pressed = false;
      break;
    case "Enter":
      keys.Enter.pressed = false;
      break;
  }
});

let clicked = false;
addEventListener("click", () => {
  if (!clicked) {
    audio.Title.play();
    clicked = true;
  }
});
