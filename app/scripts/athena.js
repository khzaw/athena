'use strict';
var athena = (function() {
  var ORNAGAI = 'http://www.ornagai.com/index.php/api/word/q/';
  var $tooltip;

  var makeRequest = function(word, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ORNAGAI + word);
    xhr.addEventListener('load', function() {
      if(xhr.status === 200) {
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
        return value.word.toLowerCase() === word.toLowerCase();
      });
      callback(result);
    }, function() {
      result = [];
      callback(result);
    });
  };

  // var inOxford = function(word) {
    // console.log('looking up ' + word + ' in Oxford');
  // };

  var renderTooltip = function(word, result, selected, e) {
    $tooltip = document.getElementById('athena-tooltip') ||
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
      $span.innerText = 'No Myanmar definition';
      $mmdef.appendChild($span);
    }

    $tooltip.appendChild($word);
    $tooltip.appendChild($icon);
    $tooltip.appendChild($mmdef);
    $tooltip.style.position = 'absolute';
    document.body.appendChild($tooltip);
    $tooltip.style.top = (e.pageY - $tooltip.clientHeight - 27) + 'px';
    $tooltip.style.left = (e.pageX - ($tooltip.clientWidth/2)) + 'px';
    $tooltip.style.visibility = 'visible';
    $tooltip.style.opacity = 1;
  };

  return {
    lookUp: function(word, selected, e) {
      inOrnagai(word, function(result) {
        renderTooltip(word, result, selected, e);
      });
    },
  };

})();

var on = false;

document.addEventListener('dblclick', function(e) {
  e.stopPropagation();
  var selected = window.getSelection();
  var selectedText = selected.toString();
  athena.lookUp(selectedText, selected.getRangeAt(0), e);
  on = true;
});

window.addEventListener('resize', function() {
});

document.body.addEventListener('click', function(e) {
  // walk up the DOM tree to check whether
  // you are clicking inside the tooltip
  var tooltipPresent = false;
  for(var element = e.target; element; element = element.parentNode) {
    if(element.id === 'athena-tooltip') {
      tooltipPresent = true;
      break;
    }
  }

  if(!tooltipPresent) {
    var $tooltip = document.getElementById('athena-tooltip');
    if($tooltip !== null) {
      $tooltip.parentNode.removeChild($tooltip);
    }
  }
});
