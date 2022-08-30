class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1 },
    scale = { max: 1 },
    sprites = [],
    moving = false,
    travelDistance = 0,
    travelDirection = "",
  }) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.scale = scale;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.moving = moving;
    this.sprites = sprites;
    this.travelDistance = travelDistance;
    this.distanceTravelled = 0;
    this.travelDirection = travelDirection;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frames.max) * this.scale.max,
      this.image.height * this.scale.max
    );

    if (this.moving) {
      if (this.frames.max > 1) {
        this.frames.elapsed++;
      }
      if (this.frames.elapsed % 10 === 0) {
        if (this.frames.val < this.frames.max - 1) {
          this.frames.val++;
        } else {
          this.frames.val = 0;
        }
      }
      if (this.travelDistance) {
        if (this.travelDirection == "left") {
          this.image = this.sprites.left;
          if (this.distanceTravelled < this.travelDistance) {
            this.position.x -= 0.5;
            this.distanceTravelled += 1;
          } else {
            this.travelDirection = "right";
            this.distanceTravelled = 0;
          }
        } else if (this.travelDirection == "right") {
          this.image = this.sprites.right;
          if (this.distanceTravelled < this.travelDistance) {
            this.position.x += 0.5;
            this.distanceTravelled += 1;
          } else {
            this.travelDirection = "left";
            this.distanceTravelled = 0;
          }
        }
      }
    }
  }
}

// class Sprite {
//   constructor({
//     position,
//     velocity,
//     image,
//     framesHorizontal = { max: 1 },
//     framesVertical = { max: 1 },
//     scale = { max: 1 },
//   }) {
//     this.position = position;
//     this.velocity = velocity;
//     this.image = image;
//     this.framesHorizontal = { ...framesHorizontal, val: 0 };
//     this.framesVertical = { ...framesVertical, val: 0 };
//     this.scale = scale;
//     this.image.onload = () => {
//       this.width =
//         (this.image.width / this.framesHorizontal.max) * this.scale.max;
//       this.height =
//         (this.image.height / this.framesVertical.max) * this.scale.max;
//     };
//   }

//   draw() {
//     ctx.drawImage(
//       this.image,
//       this.framesHorizontal.val * this.width,
//       this.framesVertical.val * this.height,
//       this.image.width / this.framesHorizontal.max,
//       this.image.height / this.framesVertical.max,
//       this.position.x,
//       this.position.y,
//       (this.image.width / this.framesHorizontal.max) * this.scale.max,
//       (this.image.height / this.framesVertical.max) * this.scale.max
//     );
//     // if (this.framesHorizontal.val < this.framesHorizontal.max - 1) {
//     //   this.framesHorizontal.val++;
//     // } else this.framesHorizontal.val = 0;
//     if (this.framesVertical.val < this.framesVertical.max - 1) {
//       this.framesVertical.val++;
//     } else this.framesVertical.val = 0;
//   }
// }

class Boundary {
  static width = 64; //width of each square on map
  static height = 64; //height of each square on map
  constructor({ position }) {
    this.position = position;
    this.width = 64; //width of each square on map
    this.height = 64; //width of each square on map
  }

  draw() {
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
