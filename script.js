//---------------------------------------------- SET UP CANVAS
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

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

//---------------------------------------------- IMAGE IMPORTS
const image = new Image();
image.src = "/assets/cafecito-village/cafecito_village.png";

const playerUpImg = new Image();
playerUpImg.src = "/assets/player_up.png";

const playerDownImg = new Image();
playerDownImg.src = "/assets/player_down.png";

const playerLeftImg = new Image();
playerLeftImg.src = "/assets/player_left.png";

const playerRightImg = new Image();
playerRightImg.src = "/assets/player_right.png";

const foregroundImg = new Image();
foregroundImg.src = "/assets/cafecito-village/cafecito_village_foreground.png";

//NPC
const chickenLeftImg = new Image();
chickenLeftImg.src = "/assets/chicken/chicken_left.png";

const chickenRightImg = new Image();
chickenRightImg.src = "/assets/chicken/chicken_right.png";

const kidSparImg = new Image();
kidSparImg.src = "/assets/kid/kid_sparring.png";
//---------------------------------------------- CREATE OBJECTS
//create player
const player = new Sprite({
  position: {
    x: 480, //static position for player on x axis
    y: canvas.height / 2,
  },
  image: playerDownImg,
  frames: { max: 4 }, //frames from character sprite sheet to cut out
  scale: { max: 2 }, //set to scale the sprite to make it bigger
  sprites: {
    up: playerUpImg,
    down: playerDownImg,
    left: playerLeftImg,
    right: playerRightImg,
  },
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
    x: 400,
    y: canvas.height / 2,
  },
  image: kidSparImg,
  frames: { max: 4 },
  scale: { max: 2 },
  moving: true,
});

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
};

//------------->>>>>>>>>>>>>> TEST <<<<-------- REMOVE later >>>>><><><><><><

/////////////      TESTING TESTING   /////////////////////////

//---------------------------------------------- MOVABLES
//create an array of items that will be moving on screen
const movables = [background, ...boundaries, foreground, chicken, kid];

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

//---------------------------------------------- ANIMATION LOOP
function animate() {
  window.requestAnimationFrame(animate);
  //draw background
  background.draw();
  //draw boundaries
  boundaries.forEach((boundary) => {
    boundary.draw(boundary);
  });
  //draw chicken
  chicken.draw();
  //draw kid
  kid.draw();
  //draw player
  player.draw();
  //draw foreground
  foreground.draw();
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
      movables.forEach((movable) => {
        movable.position.y += 3;
        player.image = player.sprites.up;
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
      movables.forEach((movable) => {
        movable.position.y -= 3;
        player.image = player.sprites.down;
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
      movables.forEach((movable) => {
        movable.position.x += 3;
        player.image = player.sprites.left;
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
      movables.forEach((movable) => {
        movable.position.x -= 3;
        player.image = player.sprites.right;
        player.moving = true;
      });
    }
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
  }
});
