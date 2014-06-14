(function () {

  var dictionary = {

    _makeRequest: function(url, success, error) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
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
    },

    _inOrnagai: function(word) {
      var ornagai = "http://www.ornagai.com/index.php/api/word/q/" + word;
      var result = [];
      this._makeRequest(ornagai, function(status, response) {
        var words = JSON.parse(response);
        result = words.filter(function(value) {
          return value.word.toLowerCase() === word.toLowerCase();
        });
      });
      console.log("Result", result);
      return result;
    },

    _inOxford: function(word) {
      console.log("looking up " + word + " in oxford");
    },

    _render: function(myanmar, eng) {
      console.log("rendering");
    },

    lookUp: function(word) {
      var myanmar = this._inOrnagai(word);
      var eng = this._inOxford(word);
      this._render(myanmar, eng);
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
