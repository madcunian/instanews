$(function () {

  $('.sections').selectric().on('change', function(event) {
    event.preventDefault();

    var section = this.value;
    var urlNyt = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json?api-key=7f1dbfd97259499a96059cbfe5221ff3';
    var newsDisplayed = '';
    
    $('.articles').empty();
    $('.site-header').addClass('site-header-small');
    $('.nyt-logo').addClass('nyt-logo-small');
    $('.loader').show();

    $.ajax({
      method: 'GET',
      url: urlNyt,
    })
    
    .done(function(data) {
      var imagesTrue = data.results.filter(function(imagesFilter){
        return imagesFilter.multimedia.length > 0;
      }).slice(0,12)
      $.each(imagesTrue, function(index, value) {
        newsDisplayed += '<li class="news-list">',
        newsDisplayed += '<div style="background-image: url(\'' + value.multimedia[4].url + '\')">',
        newsDisplayed += '<a href ="' + value.url + '" target="_blank">',
        newsDisplayed += '<p class="articles-text">' + value.abstract + '</p>',
        newsDisplayed += '</a>',
        newsDisplayed += '</li>';

      });
        $('.articles').append(newsDisplayed);

      }).fail(function() {
        $('.articles').append('<p>Sorry, a problem occured. Please try again.</p>');

      }).always(function() {
        $('.loader').hide();
        $('.select-sections').hide();
      
    });
    
  });
 
});