/*-- Pokémon --*/

// Hampter Pokémon
let Hampter;

// Nohtyp Pokémon
let Nohtyp;

/*-- Battle Animation Loop --*/
// The rendered sprites array is used to render the sprites in the battle animation loop,
// this is used to create depth in the battle animation loop.
// That way the player's Pokémon sprite (Nohtyp) will be rendered on top of the Ember & Poison Shot sprite, and
// both moves are rendered on top of the enemy's Pokémon (Hampter).
let renderedSprites;
let battleAnimationId;
let queue;

function initBattle() {
  document.querySelector("#interface").style.display = "block";
  document.querySelector("#battle-text").style.display = "none";
  document.querySelector("#hampter-currhp").style.width = "100%";
  document.querySelector("#nohtyp-currhp").style.width = "100%";
  document.querySelector("#attack-interface").replaceChildren();
  Hampter = new Pokemon(pokemon.Hampter);
  Nohtyp = new Pokemon(pokemon.Nohtyp);
  renderedSprites = [Hampter, Nohtyp];
  queue = [];

  // The buttons for the attacks are created here
  Nohtyp.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    button.setAttribute("class", "atk-button");
    document.querySelector("#attack-interface").append(button);
  });

  /*-- Event Listeners --*/

  // Attack Event Listener
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      // selectedAttack is the attack that the player selected
      const selectedAttack = attacks[e.currentTarget.innerHTML];

      // attacksRNG selects a random attack from the enemy's attacks
      const attacksRNG =
        Hampter.attacks[Math.floor(Math.random() * Hampter.attacks.length)];

      // Player's Pokémon attacks with the selected attack
      Nohtyp.attack({
        attack: selectedAttack,
        target: Hampter,
        renderedSprites,
      });

      // If enemy Pokémon's health is 0 or less, the enemy faints
      if (Hampter.health <= 0) {
        queue.push(() => {
          Hampter.faint();
        });
        queue.push(() => {
          // After the enemy faints, the game fades back to the map
          gsap.to("#transition", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector("#interface").style.display = "none";

              gsap.to("#transition", {
                opacity: 0,
              });

              audio.Victory.stop();
              battle.initiated = false;
              audio.Map.play();
            },
          });
        });
      }
      // Enemy's Pokémon attacks with a random attack
      // However, we transition between turns by pushing the attack into a queue
      // (hence the queue.push).
      queue.push(() => {
        Hampter.attack({
          attack: attacksRNG,
          target: Nohtyp,
          renderedSprites,
        });

        // If player's Pokémon's health is 0 or less, the player faints
        if (Nohtyp.health <= 0) {
          queue.push(() => {
            Nohtyp.faint();
          });
          queue.push(() => {
            // After the enemy faints, the game fades back to the map
            gsap.to("#transition", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector("#interface").style.display = "none";

                gsap.to("#transition", {
                  opacity: 0,
                });

                battle.initiated = false;
                audio.Map.play();
              },
            });
          });
        }
      });
    });
    button.addEventListener("mouseover", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      document.querySelector(
        "#attack-info"
      ).innerHTML = `Type: ${selectedAttack.type} Damage: ${selectedAttack.damage}`;
    });
  });
}

// Battle Animation Loop
function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}
animate();

// For testing purposes
// initBattle();
// animateBattle();

// Battle Text Event Listener
document.querySelector("#battle-text").addEventListener("click", (e) => {
  // If the queue is not empty (meaning there is an attack in the queue), the attack will be executed
  // then removed from the queue.
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
    // If the queue is empty, the battle text will be hidden.
    // Effectively transitioning between turns.
  } else e.currentTarget.style.display = "none";
});
