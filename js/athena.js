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

  var inOrnagai = function(word, callback) {
    var result;
    makeRequest(word, function(status, response) {
      var words = JSON.parse(response);
      result = words.filter(function(value) {
        return value.word.toLowerCase() == word.toLowerCase();
      });
      callback(result);
    }, function(status, xhr) {
      result = [];
      callback(result);
    });
  };

  var inOxford = function(word) {
    console.log("looking up " + word + " in Oxford");
  };

  var renderTooltip = function(word, result, selected) {
    var $tooltip = document.createElement('div');
    var $word = document.createElement('div');
    $word.innerText = word;
    var $mmdef = document.createElement('mmdef');
    if(result.length > 0) {
      for(var r in result) {
        var $r = document.createElement('span');
        $r.innerText = result[r].def;
        $mmdef.appendChild($r);
      }
    } else {
      var $span = document.createElement('span');
      $span.innerText = 'Myanmar definition not found';
      $mmdef.appendChild($span);
    }

    $tooltip.appendChild($word);
    $tooltip.appendChild($mmdef);
  };

  return {
    lookUp: function(word, selected) {
      var myanmar = inOrnagai(word, function(result) {
        renderTooltip(word, result, selected);
      });
    }
  };

})();

document.addEventListener('dblclick', function(e) {
  var selected = window.getSelection();
  selectedText = selected.toString();

  // console.log(selected.getRangeAt(0));
  // console.log(selected.getRangeAt(0).startContainer.parentNode);

  athena.lookUp(selectedText, selected.getRangeAt(0));

});
