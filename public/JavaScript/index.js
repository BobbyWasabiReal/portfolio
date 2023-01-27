/*-- General GamePlay & Rendering --*/

// Canvas
const canvas = document.querySelector("canvas");

// Canvas Context
const c = canvas.getContext("2d");
c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

canvas.width = 1024;
canvas.height = 576;

// Characters
const charactersMap = [];
for (let i = 0; i < charactersMapData.length; i += 100) {
  charactersMap.push(charactersMapData.slice(i, 100 + i));
}

// Collisions
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 100) {
  collisionsMap.push(collisions.slice(i, 100 + i));
}

// Boundaries & Offset
const boundaries = [];
const offset = {
  x: -1580,
  y: -1320,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 211)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          width: 48,
          height: 48,
        })
      );
  });
});

// battleZones
const battleZonesMap = [];
// Split the battleZonesData array into 100 element arrays (the length of the map)
for (let i = 0; i < battleZonesData.length; i += 100) {
  battleZonesMap.push(battleZonesData.slice(i, 100 + i));
}

const battleZones = [];
// For Each "808" in the battleZonesData array, make rows.
// Draw the battleZones then push the new boundaries to the battleZones array.
battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 808)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          width: 48,
          height: 48,
        })
      );
  });
});

// Character Images
const characters = [];

// Villager
const villagerImg = new Image();
villagerImg.src = "./Images/Characters/Villager/Idle.png";

// oldMan
const oldManImg = new Image();
oldManImg.src = "./Images/Characters/OldMan/OldMan.png";

// CaveGirl
const caveGirlImg = new Image();
caveGirlImg.src = "./Images/Characters/Cavegirl/Idle.png";

// Sign
const signImg = new Image();
signImg.src = "./Images/Characters/Sign/Sign.png";

// Inspector
const inspectorImg = new Image();
inspectorImg.src = "./Images/Characters/Inspector/Inspector.png";

// RedNinja2 (left)
const RedNinja2LImg = new Image();
RedNinja2LImg.src = "./Images/Characters/RedNinja2/RedNinja2(left).png";

// RedNinja2 (right)
const RedNinja2RImg = new Image();
RedNinja2RImg.src = "./Images/Characters/RedNinja2/RedNinja2(right).png";

// Master
const masterImg = new Image();
masterImg.src = "./Images/Characters/Master/Master.png";

// Monk
const monkImg = new Image();
monkImg.src = "./Images/Characters/Monk/Monk.png";

// Monk2
const monk2Img = new Image();
monk2Img.src = "./Images/Characters/Monk2/Monk2.png";

// OldMan2
const oldMan2Img = new Image();
oldMan2Img.src = "./Images/Characters/OldMan2/OldMan2.png";

// Samurai
const samuraiImg = new Image();
samuraiImg.src = "./Images/Characters/Samurai/Samurai.png";

// Mayor
const mayorImg = new Image();
mayorImg.src = "./Images/Characters/Mayor/Mayor.png";

// Characters
charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    // If the symbol is 211, push villager to the characters array.
    if (symbol === 211) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: villagerImg,
          frames: {
            max: 4,
            hold: 60,
          },
          scale: 3.2,
          dialogue: ["...", "I am new to the neighborhood."],
        })
      );
    }

    // If the symbol is 43, push OldMan to the characters array.
    if (symbol === 43) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: oldManImg,
          frames: {
            max: 4,
            hold: 60,
          },
          scale: 3.2,
          dialogue: [
          "...", 
          "My Restaurant is closed for the day, because all of my supplies went missing.",
          ":("
        ],
        })
      );
    }

    // If the symbol is 654, push Sign (Dojo) to the characters array.
    if (symbol === 654) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: signImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: ["...", '"The Experience Dojo"'],
        })
      );
    }

    // If the symbol is 309, push Sign (Project) to the characters array.
    if (symbol === 309) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: signImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: ["...", '"Welcome to Project City!"'],
        })
      );
    }

    // If the symbol is 962, push Sign (Skills) to the characters array.
    if (symbol === 962) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: signImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: ["...", '"Welcome to Skill Town"'],
        })
      );
    }

    // If the symbol is 2492, push Cavegirl to the characters array.
    if (symbol === 2492) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: caveGirlImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: [
            "Beautiful day, isn't it?", 
            "Also, let me know if find missing items around the island.",
            "There have been reports of pots, pans, and food being stolen from the village.",
            "Rumor has it that they're being stolen by man-sized racoons.",
            "Weird..."
        ],
        })
      );
    }

    // If the symbol is 2486, push RedNinja(2) (left) to the characters array.
    if (symbol === 2486) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: RedNinja2LImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: [
            "...", 
            "This training is tough..."
        ],
        })
      );
    }

    // If the symbol is 2479, push RedNinja(2) (right) to the characters array.
    if (symbol === 2479) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: RedNinja2RImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: [
            "Programming is easy!", 
            "...",
            "I hope... :(",
        ],
        })
      );
    }

    // If the symbol is 2508, push Master to the characters array.
    if (symbol === 2508) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: masterImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: [
            "Hello and Welcome to the Experience Dojo!", 
            "Gabriel's previous experience(s) is/are...",
            "as a Volunteer Sound Technician...",
            "From 2018 - current, He has worked with a team of 7 to create, maintain, and manage a sound system.",
            "Also, have you happen to see any really large racoons around?",
            "I haven't been able to find our food and other supplies."
        ],
        })
      );
    }

    // If the symbol is 2444, push Monk to the characters array.
    if (symbol === 2444) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: monkImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: [
            "Someone stole my food :(."
        ],
        })
      );
    }

    // If the symbol is 2455, push Monk2 to the characters array.
    if (symbol === 2455) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: monk2Img,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: [
            "...",
            "The ocean sure is beautiful today."
        ],
        })
      );
    }

    // If the symbol is 2468, push OldMan2 to the characters array.
    if (symbol === 2468) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: oldMan2Img,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: [
            "Why can't you climb the ladder?",
            "Because I like to polish my ladders.",
            "...",
            "You don't do that?!"
        ],
        })
      );
    }

    // If the symbol is 2528, push Samurai to the characters array.
    if (symbol === 2528) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: samuraiImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: [
            "Greetings traveler!",
            "I am the Samurai.",
            "Gabriel's technical skills include...",
            "HTML, CSS, JavaScript, React, Node, Express, MongoDB, Python, Django, and more.",
            "Gabriel's soft skills include...",
            "Front-End Development, Team Collaboration, Engineering Management, Critical Thinking, Time Management, and Testing/Troubleshooting.",
        ],
        })
      );
    }

    // If the symbol is 2384, push Mayor to the characters array.
    if (symbol === 2384) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: mayorImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: [
            "Hello, and welcome to Project City!",
            "I am the mayor...",
            "Some of Gabriel's Projects are...",
            "Simon: <br /> A browser-based game based on Simon!",
            'Github: <a href="https://github.com/BobbyWasabiReal/Project-1-Browser-Based-Game">Click Here</a>',
            "The Vault: <br /> An In-game inventory sharing app!",
            'GitHub: <a href="https://github.com/BobbyWasabiReal/The-Vault">Click Here</a>',
            'Heroku Live: <a href="https://the-vault-wasabi.herokuapp.com/">Click Here</a>',
            "One World Recipes: <br /> A recipe sharing app!",
            'GitHub: <a href="https://github.com/BobbyWasabiReal/the-imposters">Click Here</a>',
            "PokéZon: <br /> The Pokémon Amazon!",
            'GitHub: <a href="https://github.com/BobbyWasabiReal/Pok-Zon">Click Here</a>',
            'Heroku Live: <a href="https://pokezon.herokuapp.com/">Click Here</a>',
            "PS: The Heroku links may take 10-30 seconds to load...",
            "Thank You and Have Fun!",
            "PSS: If you see any man-sized raccoons, please let me know...",
            "They're a bit of a nuisance..."
        ],
        })
      );
    }

    // If the symbol is 2426, push Inspector to the characters array.
    if (symbol === 2426) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x - 4,
            y: i * Boundary.height + offset.y - 2,
          },
          image: inspectorImg,
          frames: {
            max: 1,
            hold: 60,
          },
          scale: 1.2,
          dialogue: [
            "Hello and Welcome To My Portfolio Page!", 
            "Use WASD to move around, and the spacebar to interact (I'm sure you figured that out).",
            "To the West (left) is Skill Town...",
            'Talk to the Samurai to learn more about my technical and "soft" skills.',
            "To the East (right) is Project City...",
            "There you can talk to the Mayor to learn more about my projects.",
            "To the North (up) is Experience Dojo...",
            "Talk to the Master of the Dojo to learn about my previous experiences.",
            "There is also tall grass where you can encounter monsters (please don't sue me Pokémon :( ).",
            "To combat the wild monsters, you have a level 5 Nohtyp (python backwards)!",
            "Good luck and thank you for playing! :)"
        ],
        })
      );
    }

    // If the symbol is not 0, create & push a new boundary to the boundaries array.
    if (symbol !== 0) {
      let characterBoundary = new Boundary({
        position: {
          x: j * Boundary.width + offset.x,
          y: i * Boundary.height + offset.y,
        },
      })
      boundaries.push(
        characterBoundary
      );
    }
  });
});

// Images
// 1. Background
const image = new Image();
image.src = "./images/Map.png";

// 2. Foreground
const foregroundImage = new Image();
foregroundImage.src = "./images/Foreground.png";

// 3. Player
const playerDown = new Image();
playerDown.src = "./images/Characters/RedNinja/WalkDown.png";

const playerUp = new Image();
playerUp.src = "./images/Characters/RedNinja/WalkUp.png";

const playerLeft = new Image();
playerLeft.src = "./images/Characters/RedNinja/WalkLeft.png";

const playerRight = new Image();
playerRight.src = "./images/Characters/RedNinja/WalkRight.png";

// Keys
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

// Player
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 176 / 4 / 2,
    y: canvas.height / 2 - 44 / 2,
  },
  image: playerDown,
  frames: {
    max: 4,
    hold: 10,
  },
  // Player Animations
  sprites: {
    up: playerUp,
    left: playerLeft,
    right: playerRight,
    down: playerDown,
  },
  scale: 1.02,
});

// Background
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

// Foreground
const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

// Movables Array & Renderables Array
const movables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...characters,
];
const renderables = [
  background,
  ...boundaries,
  ...battleZones,
  ...characters,
  player,
  foreground,
];

// Battle Object
const battle = {
  initiated: false,
};

/*-- Animation function --*/

// Animation Loop
function animate() {
  const animationId = window.requestAnimationFrame(animate);
  renderables.forEach((renderable) => {
    renderable.draw();
  });

  let moving = true;
  player.animate = false;
  if (battle.initiated) return;

  // BattleZone detection & activation
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));

      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.008
      ) {
        // deactivate current animation loop
        window.cancelAnimationFrame(animationId);
        audio.Map.stop();
        audio.Battle.play();
        battle.initiated = true;
        gsap.to("#transition", {
          opacity: 1,
          repeat: 4,
          yoyo: true,
          duration: 0.3,
          onComplete() {
            gsap.to("#transition", {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // activate battle animation loop
                initBattle();
                animateBattle();
                gsap.to("#transition", {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
          },
        });
        break;
      }
    }
  }

  // Player Boundaries & Animations For Each Key
  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
    player.image = player.sprites.up;
    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: 3 },
    });
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
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a.pressed && lastKey === "a") {
    player.animate = true;
    player.image = player.sprites.left;
    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 3, y: 0 },
    });
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
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.s.pressed && lastKey === "s") {
    player.animate = true;
    player.image = player.sprites.down;
    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -3 },
    });
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
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (keys.d.pressed && lastKey === "d") {
    player.animate = true;
    player.image = player.sprites.right;
    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -3, y: 0 },
    });
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
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}

/*-- Battles --*/

// Battle Background
const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./Images/battleBackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

/*-- Event Listeners --*/

// Key Press & Release Event Listeners
let lastKey = "";
const dialogueBox = document.querySelector("#dialogue-box");
window.addEventListener("keydown", (e) => {
  // Prevent the spacebar from scrolling down the page
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
  // check if player is interacting with a character/npc
  if (player.isInteracting) {
    switch (e.key) {
      case " ":
        // When the player presses space, display the next dialogue
        player.interactionAsset.dialogueIndex++;

        // Check if there is more dialogue to display
        // If so, display it.
        const { dialogueIndex, dialogue } = player.interactionAsset;
        if (dialogueIndex <= dialogue.length - 1) {
          dialogueBox.innerHTML =
            player.interactionAsset.dialogue[dialogueIndex];
          return;
        }

        // finish the conversation
        player.isInteracting = false;
        player.interactionAsset.dialogueIndex = 0;
        dialogueBox.style.display = "none";

        break;
    }
    return;
  }
  switch (e.key) {
    case " ":
      if (!player.interactionAsset) return;

      // beginning the conversation
      const firstMessage = player.interactionAsset.dialogue[0];
      dialogueBox.innerHTML = firstMessage;
      dialogueBox.style.display = "flex";
      player.isInteracting = true;
      break;
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

// Hide Controls & Music On Click Event Listener
let clicked = false;
const controls = document.querySelector("#controls");
controls.addEventListener("click", () => {
  if (!clicked) {
    audio.Map.play();
    clicked = true;
  }
  gsap.to("#controls", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      controls.style.display = "none";
    },
  });
});