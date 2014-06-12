(function () {

  var dictionary = {
    _inOrnagai: function(word) {
      console.log("looking up in ornagai");
    },

    _inOxford: function(word) {
      console.log("looking up in oxford");
    },

    lookUp: function() {
      _inOrnagai("intelligence");
      _inOxford("intelligence");
    }
  };

  document.addEventListener('dbclick', function(e) {
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
      selectedText = window.getSelection.toString();
    }
  });

})();
