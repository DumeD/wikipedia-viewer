$(document).ready(function() {

  var $form = $('#form');
  var $input = $('.input');
  var APIurl = 'https://en.wikipedia.org/w/api.php?callback=?';
  var results = $('.results');

  $input.keyup(function() {
    if($input.val() == '') {
      results.html('');
    }
    $.ajax({
      url: APIurl,
      data: {action: 'query', list: 'search', srsearch: $input.val(), format: 'json'},
      dataType: 'jsonp',
      success: function(data) {
        var html = '<div class="row row-centered">';

          data.query.search.map(function(w) {
            html += '    <div class="col-lg-8 col-lg-offset-2">';
           html += '      <a href="https://en.wikipedia.org/wiki/' + w.title + '" target="_blank">';
           html += '        <div class="panel panel-default">';
           html += '          <div class="panel-heading">';
           html += '            <h3 class="panel-title">' + w.title + '</h3>';
           html += '          </div>';
           html += '          <div class="panel-body">';
           html += '            ' + w.snippet;
           html += '          </div>';
           html += '        </div>';
           html += '      </a>';
           html += '    </div>';
          });
            html += '</div>';
            results.html(html);
      }
    });
  });
});
