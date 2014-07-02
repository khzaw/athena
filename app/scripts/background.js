'use strict';

function speak(word) {
  var rate = 1.0,
      pitch = 1.0,
      volume = 1.0;
  chrome.tts.speak(word, {
    rate: rate,
    pitch: pitch,
    volume: volume
  });
}

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(function (msg) {
  if(msg.speak) {
    speak(msg.speak);
  }
});

