(function () {

  var dictionary = {

    _makeRequest: function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.addEventListener('load', function(e) {
        var result = xhr.responseText;
        callback(result);
      });
      xhr.send();
    },

    _inOrnagai: function(word) {
      console.log("looking up " + word + " in ornagai");
      var ornagai = "http://www.ornagai.com/index.php/api/word/q/" + word;
      this._makeRequest(ornagai, function(response) {
        var words = JSON.parse(response);
        if(words === undefined) {
          return "No definition";
        } else {
          words = words.filter(function(value) {
            return value.word.toLowerCase() === word.toLowerCase();
          });
          return words[0].def;
        }
      });
    },

    _inOxford: function(word) {
      console.log("looking up " + word + " in oxford");
    },

    lookUp: function(word) {
      this._inOrnagai(word);
      this._inOxford(word);
    }
  };

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

    dictionary.lookUp(selectedText);
  });

})();
