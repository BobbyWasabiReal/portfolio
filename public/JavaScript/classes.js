// Boundary Class
class Boundary {
  // Boundary Width & Height
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    // The " c.fillStyle = "rgba(255, 0, 0, 0.0)" " is more of a debugging tool for the boundaries
    c.fillStyle = "rgba(255, 0, 0, 0.0)";
    // The Boundaries are drawn as a rectangle.
    // Position is the where the boundary is placed (kinda obvious).
    // Width & Height are the width and height of the boundary (I should probably become a detective... xD).
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// Sprite Class
class Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1
  }) {
    this.position = position;
    this.image = new Image();
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max * scale;
      this.height = this.image.height * scale;
    };
    this.image.src = image.src;

    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;
    this.rotation = rotation;
    this.scale = scale;
  }

  draw() {
    c.save();
    // " c.translate(...) " is used to rotate the sprite
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    // " c.globalAlpha = this.opacity " is used for the "flinching" animation
    c.globalAlpha = this.opacity;

    // The following code below is responsible for cropping the image for each frame.
    const crop = {
      position: {
        x: this.frames.val * (this.width / this.scale),
        y: 0,
      },
      width: this.image.width / this.frames.max,
      height: this.image.height,
    };

    // image is the respective position and size of the sprite's image
    const image = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    };

    // " c.drawImage(...) " is used render all sprites in the game
    c.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      image.position.x,
      image.position.y,
      image.width * this.scale,
      image.height * this.scale
      );
    c.restore();

    // The following code below is responsible for the animation of every sprite.

    // If the sprite is not animated, the function will return
    if (!this.animate) return;

    // If the sprites maximum amount of frames is greater than 1, the elapsed frames will increase
    // which will crop the image for each frame.
    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    // If the elapsed frames is greater than the hold frames, the frame value will increase
    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      // If the frame value is greater than the maximum amount of frames, the frame value will reset
      // effectively looping the animation :)
      else this.frames.val = 0;
    }
  }
}

// Pokemon Class
class Pokemon extends Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks,
    scale = 1
  }) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale
    });
    this.health = 100;
    this.isEnemy = isEnemy;
    this.name = name;
    this.attacks = attacks;
  }

  // This is the function that is responsible for the "fainting" animation
  faint() {
    document.querySelector(
      "#battle-text"
    ).innerHTML = `${this.name} has fainted!`;
    gsap.to(this.position, {
      y: this.position.y + 80,
      duration: 1.5,
      onComplete: () => {
        this.position.y -= 80;
      },
    });
    gsap.to(this, {
      opacity: 0,
    });
    // Stop the battle music
    audio.Battle.stop();
    // Only play the victory music if the player wins
    if (this == Hampter) {
      audio.Victory.play();
    }
  }

  attack({ attack, target, renderedSprites }) {
    // This is the text that appears after a Pokémon attacks ([insert Pokémon] used [insert attack]!)
    document.querySelector("#battle-text").style.display = "block";
    document.querySelector(
      "#battle-text"
    ).innerHTML = `${this.name} used ${attack.name}!`;

    // This simply updates the health "value" of the Pokémon
    target.health -= attack.damage;

    // Differing health bar for player & enemy
    let healthBar = "#hampter-currhp";
    if (this.isEnemy) healthBar = "#nohtyp-currhp";

    // This is the rotation for the attack animations of Ember & Poison Shot
    let rotation = 1;
    if (this.isEnemy) rotation = -2;

    // This is the switch statement that is responsible for the animations of the different attacks
    switch (attack.name) {
      case "Poison Shot":
        audio.PoisonShot.play();
        // PoisonShot Image
        const PoisonShotImage = new Image();
        PoisonShotImage.src = "./Images/Attacks/PoisonShot.png";

        const poisonShot = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          image: PoisonShotImage,
          frames: {
            max: 4,
            hold: 5,
          },
          animate: true,
          rotation,
        });
        renderedSprites.splice(1, 0, poisonShot);

        gsap.to(poisonShot.position, {
          x: target.position.x,
          y: target.position.y,
          duration: 0.5,
          onComplete: () => {
            // Enemy Takes Damage
            gsap.to(healthBar, {
              width: target.health + "%",
            });

            // Targeted Pokémon Flinches (moves side to side)
            gsap.to(target.position, {
              x: target.position.x + 20,
              yoyo: true,
              repeat: 5,
              duration: 0.06,
            });

            // Targeted Pokémon flashes (opacity)
            gsap.to(target, {
              opacity: 0,
              yoyo: true,
              repeat: 1,
              duration: 0.06,
            });

            // Remove Ember Sprite
            renderedSprites.splice(1, 1);
          },
        });

        break;
      case "Ember":
        audio.Ember.play();
        // Ember Image
        const emberImage = new Image();
        emberImage.src = "./Images/Attacks/Ember.png";

        // Ember Sprite
        const ember = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          image: emberImage,
          frames: {
            max: 4,
            hold: 5,
          },
          animate: true,
          rotation,
        });
        renderedSprites.splice(1, 0, ember);

        gsap.to(ember.position, {
          x: target.position.x,
          y: target.position.y,
          duration: 0.5,
          onComplete: () => {
            // Enemy Takes Damage
            gsap.to(healthBar, {
              width: target.health + "%",
            });

            // Targeted Pokémon Flinches (moves side to side)
            gsap.to(target.position, {
              x: target.position.x + 20,
              yoyo: true,
              repeat: 5,
              duration: 0.06,
            });

            // Targeted Pokémon flashes (opacity)
            gsap.to(target, {
              opacity: 0,
              yoyo: true,
              repeat: 1,
              duration: 0.06,
            });

            // Remove Ember Sprite
            renderedSprites.splice(1, 1);
          },
        });

        break;
      case "Tackle":
      case "Bite":
        // GSAP Timeline
        const gsapTL = gsap.timeline();

        // Differing moving distance animation for player & enemy
        let moveDistance = 20;
        if (this.isEnemy) moveDistance = -20;

        // Attack Animation
        gsapTL
          .to(this.position, {
            // Attcking Pokémon charges the tackle/bite
            x: this.position.x - moveDistance,
          })
          .to(this.position, {
            // Attacking Pokémon then releases the tackle/bite
            x: this.position.x + moveDistance * 2,
            duration: 0.1,
            onComplete: () => {
              // Enemy Takes Damage
              audio.Tackle.play();
              gsap.to(healthBar, {
                width: target.health + "%",
              });

              // Targeted Pokémon Flinches (moves side to side)
              gsap.to(target.position, {
                x: target.position.x + 20,
                yoyo: true,
                repeat: 5,
                duration: 0.06,
              });

              // Targeted Pokémon flashes (opacity)
              gsap.to(target, {
                opacity: 0,
                yoyo: true,
                repeat: 1,
                duration: 0.06,
              });
            },
            // Attacking Pokémon returns to original positions
          })
          .to(this.position, {
            x: this.position.x,
          });

        break;
    }
  }
}

// Character Class
class Character extends Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    dialogue = [''],
  }) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale
    });
    
    this.dialogue = dialogue;
    this.dialogueIndex = 0;
  }
}