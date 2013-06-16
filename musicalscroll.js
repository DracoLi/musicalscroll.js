// musicscroll.js v1.0
"use strict";

var musicalscroll = (function () {
  var soundFilesPath = '/sounds'
  var soundClipNames = [
    'Bright_Future_1',
    'Bright_Future_2',
    'Bright_Future_3',
    'Contentment_1',
    'Contentment_2',
    'Contentment_3',
    'Contentment_4',
    'Nostalgia_1',
    'Nostalgia_2',
    'Nostalgia_5'
  ];
  var mp3 = [
    ''
  ];

  var ogg = [

  ];
  return function (trigger_distance, newSoundFilesPath) {
    trigger_distance = trigger_distance || 400;
    if (newSoundFilesPath) {
      soundFilesPath = newSoundFilesPath;
    }
    var lastOffset;

    var musicHandler = function() {
      var scrollOffset = Math.floor(window.scrollY / trigger_distance);
      if (lastOffset !== scrollOffset) {
        playAudio();
        lastOffset = scrollOffset;
      }
    };

	window.addEventListener('scroll', musicHandler, false)
  };

  function playAudio(position){
    var player = getPlayer()
      , audioFormat = getAudioFormatFor(player)
      , rand = Math.floor(Math.random() * soundClipNames.length);

    player.src = soundFilesPath + '/' + soundClipNames[position || rand] + audioFormat;
    player.play();
  };

  function getAudioFormatFor(player){
    if(player.canPlayType("audio/mpeg")) {
      return '.mp3';
    } else if(player.canPlayType("audio/ogg")) {
      return '.ogg';
    }
  }

  function getPlayer() {
    var container = getContainer(),
        player,
        players = container.getElementsByTagName("audio");

    for (player in  players) {
      if (player.currentTime === 0 || player.ended) {
        return player;
      }
    }

    player = document.createElement("audio");
    container.appendChild(player);
    return player;
  };

  function getContainer() {
    var container = document.getElementById("musicscroll");

    if (container === null) {
      container = document.createElement("div");
      container.id = "musicscroll";
      document.getElementsByTagName('body')[0].appendChild(container);
    }

    return container;
  }
})();
