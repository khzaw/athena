(function () {


  var dictionary = {
    _inOrnagai: function(word) {
      console.log("looking up " + word + " in ornagai");
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
