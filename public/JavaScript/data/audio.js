// All the audio files used in the game
audio = {
  Map: new Howl ({
    src: "./Audio/Music/Map.mp3",
    html5: true,
    volume: 0.1,
    loop: true,
  }),
  Battle: new Howl ({
    src: "./Audio/Music/Battle.mp3",
    html5: true,
    volume: 0.6,
    loop: true,
  }),
  Victory: new Howl ({
    src: "./Audio/Music/Victory.wav",
    html5: true,
    loop: true,
  }),
  Tackle: new Howl ({
    src: "./Audio/Sound Effects/Tackle.wav",
    html5: true,
  }),
  PoisonShot: new Howl ({
    src: "./Audio/Sound Effects/PoisonShot.wav",
    html5: true,
    volume: 0.2,
  }),
  Ember: new Howl ({
    src: "./Audio/Sound Effects/Ember.wav",
    html5: true,
  }),
  Chat: new Howl ({
    src: "./Audio/Sound Effects/Chat.wav",
    html5: true,
    volume: 0.2,
  }),
}