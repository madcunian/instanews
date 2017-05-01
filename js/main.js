$(function () {

  $('.sections').on('change', function(event) {
    event.preventDefault();
    
    var section = this.value;

    var urlNyt = "https://api.nytimes.com/svc/topstories/v2/" + section + ".json?api-key=7f1dbfd97259499a96059cbfe5221ff3";
    var newsDisplayed = "";
    var selection = $('.section').val();
    $('.articles').empty();
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
        newsDisplayed += '<img src="' + value.multimedia[4].url + '">',
        newsDisplayed += '<p>' + value.abstract + '</p>',
        newsDisplayed += '</li>';
        // console.log(newsDisplayed);
      });
        $('.articles').append(newsDisplayed);

    }).always(function() {
      $('.loader').hide();
    });
    
  });
 
});