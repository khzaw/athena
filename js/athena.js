var athena = (function() {
  var ORNAGAI = "http://www.ornagai.com/index.php/api/word/q/";
  var my;

  var makeRequest = function(word, success, error, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ORNAGAI + word);
    xhr.addEventListener('load', function(e) {
      if(xhr.status == 200) {
        success(xhr.status, xhr.responseText);
      } else {
        if(error) {
          error(xhr.status, xhr);
        }
      }
      callback();
    });
    xhr.send();
  };

  var inOrnagai = function(word, callback) {
    var result;
    makeRequest(word, function(status, response) {
      var words = JSON.parse(response);
      var result = words.filter(function(value) {
        return value.word.toLowerCase() == word.toLowerCase();
      });
      callback(result);
    });
  };

  var inOxford = function(word) {
    console.log("looking up " + word + " in Oxford");
  };

  return {
    lookUp: function(word) {
      var myanmar = inOrnagai(word, function(result) {
          console.log("Myanmar", result);
      });
    }
  };

})();

document.addEventListener('dblclick', function(e) {
  var focused = document.activeElement;
  var selectedText;
  if(focused) {
    try {
      selectedText = focused.value.substring(
        focused.selectionStart, focused.selectionEnd);
    } catch(err) {
    }
  }
  if(selectedText === undefined) {
    selectedText = window.getSelection().toString();
  }

  athena.lookUp(selectedText);

});
