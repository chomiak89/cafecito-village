//---------------------------------------------- SET UP CANVAS
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

//---------------------------------------------- CREATE COLLISIONS MAP
//create the 2d map array from exported json map file
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 27) {
  collisionsMap.push(collisions.slice(i, i + 27));
}

class Boundary {
  static width = 80; //width of each square on map
  static height = 80; //height of each square on map
  constructor({ position }) {
    this.position = position;
    this.width = 80; //width of each square on map
    this.height = 80; //width of each square on map
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

//create an array of drawn boundary squares
const boundaries = [];
//offset for the map image and boundaries, foreground, etc.
const offset = {
  x: 0,
  y: -600,
};
//loop over collisions map and create boundaries -> add them to boundaries arr
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    //5036 is from the collisions js created from json file
    if (symbol === 5036) {
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
image.src = "/assets/test-map.png";

const playerImage = new Image();
playerImage.src = "/assets/ninja.png";

//---------------------------------------------- CLASSES

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

//create background world image
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
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
const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400,
  },
});

//---------------------------------------------- MOVABLES
//create an array of items that will be moving on screen
const movables = [background, testBoundary];

//---------------------------------------------- ANIMATION LOOP
function animate() {
  window.requestAnimationFrame(animate);
  //draw background
  background.draw();
  //draw boundaries

  //   boundaries.forEach((boundary) => {
  //     boundary.draw(boundary);
  //   });

  testBoundary.draw();
  //draw player
  ctx.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height / 7,
    280,
    canvas.height / 2,
    (playerImage.width / 4) * 2,
    (playerImage.height / 7) * 2
  );
  //move everything on background that is in the  movables array
  if (keys.ArrowUp.pressed && lastKeyPressed === "ArrowUp") {
    movables.forEach((movable) => {
      movable.position.y += 3;
    });
  } else if (keys.ArrowDown.pressed && lastKeyPressed === "ArrowDown") {
    movables.forEach((movable) => {
      movable.position.y -= 3;
    });
  } else if (keys.ArrowLeft.pressed && lastKeyPressed === "ArrowLeft") {
    movables.forEach((movable) => {
      movable.position.x += 3;
    });
  } else if (keys.ArrowRight.pressed && lastKeyPressed === "ArrowRight") {
    movables.forEach((movable) => {
      movable.position.x -= 3;
    });
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
