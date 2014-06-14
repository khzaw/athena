var athena = (function() {
  var ORNAGAI = "http://www.ornagai.com/index.php/api/word/q/";

  var makeRequest = function(word, success, error) {
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
    });
    xhr.send();
  };

  var inOrnagai = function(word) {
    var result = [];
    makeRequest(word, function(status, response) {
      var words = JSON.parse(response);
      result = words.filter(function(value) {
        return value.word.toLowerCase() === word.toLowerCase();
      });
      console.log("Inside: ", result);
    });
    console.log("Outside: ", result);
    return result;
  };

  var inOxford = function(word) {
    console.log("looking up " + word + " in Oxford");
  };

  return {
    lookUp: function(word) {
      var myanmar = inOrnagai(word);
      console.log("Myanmar", myanmar);

      // inOxford(word);
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
