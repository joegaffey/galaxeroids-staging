var GameAudio = {};

window.onload = initAudio;

function initAudio() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  GameAudio.context = new AudioContext();
  
  var bufferLoader = new BufferLoader(GameAudio.context,
    [
      './assets/shoot.wav',
      './assets/fastinvader1.wav',
      './assets/hitAlien.mp3',
      './assets/ufo_highpitch.wav',
      './assets/explosion.wav',
      './assets/sound-frogger-hop.wav',      
      './assets/pacman_eatghost.wav',
      './assets/saucerSmall.wav',
      './assets/saucerBig.wav',
      './assets/pacman_eatfruit.wav',
      './assets/thrust.wav',
      './assets/intro8000.mp3'    
    ],
    GameAudio.finishedLoading);
  bufferLoader.load();
}

GameAudio.finishedLoading = function(bufferList) {
  GameAudio.bufferList = bufferList;
}

GameAudio.shootSound = function() {
  GameAudio.playSound(0, 0.3); 
}

GameAudio.moveSound = function() {
  GameAudio.playSound(1, 1); 
}

GameAudio.alienHitSound = function() {
  GameAudio.playSound(2, 4);
}

GameAudio.pillCollectSound = function() {
  GameAudio.playSound(5, 5); 
}

GameAudio.motherHitSound = function() {
  if(Math.random() > 0.5)
    GameAudio.playSound(7, 1);
  else
    GameAudio.playSound(8, 1);
}

GameAudio.motherAttackSound = function() {
  GameAudio.playSound(9, 1); 
}

GameAudio.cellHitSound = function() {
  GameAudio.playSound(2, 0.5);
}

GameAudio.explosionSound = function() {
  GameAudio.playSound(4, 1);
}

GameAudio.assistSound = function() {
  GameAudio.playSound(6, 1);
}

GameAudio.thrustSound = function() {
  GameAudio.playSound(10, 1);
}

GameAudio.introSound = function() {
  GameAudio.playSound(11, 1);
}

GameAudio.playSound = function(i, gain) {
  try {
    var source = GameAudio.context.createBufferSource();
    source.buffer = GameAudio.bufferList[i];
    var gainNode = GameAudio.context.createGain()
    gainNode.gain.value = gain;
    gainNode.connect(GameAudio.context.destination)
    source.connect(gainNode)
    source.start(0);
  }
  catch(e) { 
    console.log(e); 
  }
}