// Pokémon Info
const pokemon = {
  Nohtyp: {
      name: 'Nohtyp',
      position: {
        x: 230,
        y: 365
      },
      image: {
        src: './Images/Characters/Pokemon/Nohtyp.png',
      },
      frames: {
        max: 4,
        hold: 18
      },
      scale: 1.25,
      animate: true,
      attacks: [
        attacks.Tackle,
        attacks.Bite,
        attacks.Ember,
        attacks['Poison Shot'],
      ]
    },
    Hampter: {
      name: 'Hampter',
      position: {
        x: 730,
        y: 190
      },
      image: {
        src: './Images/Characters/Pokemon/Hampter.png',
      },
      frames: {
        max: 4,
        hold: 28
      },
      animate: true,
      isEnemy: true,
      attacks: [
        attacks.Tackle,
        attacks.Bite,
        attacks.Ember,
        attacks['Poison Shot'],
      ]
    }
  }