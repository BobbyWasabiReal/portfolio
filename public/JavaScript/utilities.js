// Collision Function
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

// Character Collision Detection
// The checkForCharacterCollision function is for player & character/npc interactions
// if the player collides with a character, the function will return the character
function checkForCharacterCollision({
  characters,
  player,
  characterOffset = { x: 0, y: 0 }
}) {
  player.interactionAsset = null;
  // Loop through all characters
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];

    // If the player collides with a character, the function will return the character
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...character,
          position: {
            x: character.position.x + characterOffset.x,
            y: character.position.y + characterOffset.y
          }
        }
      })
    ) {
      player.interactionAsset = character;
      break;
    }
  }
}