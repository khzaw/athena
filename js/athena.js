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

  var renderTooltip = function(word, result, selected, e) {
    var $tooltip = document.getElementById('athena-tooltip') || 
                    document.createElement('div');
    $tooltip.innerHTML = '';

    $tooltip.id = 'athena-tooltip';
    var $word = document.createElement('div');
    $word.classList.add('word');
    $word.innerText = word;
    var $icon = document.createElement('div');
    $icon.classList.add('audio-icon');
    $icon.innerHTML = '<i class="icon-volume-up"></i>';
    var $mmdef = document.createElement('div');
    $mmdef.classList.add('mmdef');
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
    $tooltip.appendChild($icon);
    $tooltip.appendChild($mmdef);
    document.body.appendChild($tooltip);
    $tooltip.style.position = 'absolute';
    $tooltip.style.top = (e.pageY - $tooltip.clientHeight - 20) + 'px';
    $tooltip.style.left = (e.pageX - ($tooltip.clientWidth/2)) + 'px';
  };

  return {
    lookUp: function(word, selected, e) {
      var myanmar = inOrnagai(word, function(result) {
        renderTooltip(word, result, selected, e);
      });
    }
  };

})();

document.addEventListener('dblclick', function(e) {
  var selected = window.getSelection();
  selectedText = selected.toString();
  athena.lookUp(selectedText, selected.getRangeAt(0), e);
});

document.addEventListener('mousedown', function(e) {
  var $tooltip = document.getElementById('athena-tooltip');
  if($tooltip !== null) {
    $tooltip.parentNode.removeChild($tooltip);
  }
});
