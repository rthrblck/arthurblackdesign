$(document).ready(function() {

// HIDE DOWN ARROW ON SCROLL


var running = false;
var visible = true;

$(window).scroll(function() {
  console.log('checking');
  if (!running) {
    var top = $(this).scrollTop();

    if (!visible && top <= 0) {
      running = true;
      $('.downArrow').fadeIn(1000, function () {
        console.log('fading in');
        visible = true;
        running = false;
      });
    } else if (visible && top > 0) {
      running = true;
      $('.downArrow').fadeOut(1000, function () {
        console.log('fading out');
        visible = false;
        running = false;
      });
    }
  }
});



// SCROLLTO PLUGIN SOURCE CODE

$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}

// SCROLL TO PORTFOLIO ON HEADER CLICK

$(".header").click(function(event) {
  event.preventDefault()
  $('body').scrollTo('.portfolio', {duration: 1000, offsetTop : '50'})
});


// FULLSIZE PORTFOLIO REVEAL

$(".reveal").hide();

$(".thumbnail a").click(function(event) {
  event.preventDefault()
  $(this).closest(".portfolioPiece").find(".reveal").slideToggle( "slow", function() {
    // Animation complete.
  });
});

$(".reveal").click(function(event) {
  $(this).closest(".portfolioPiece").find(".reveal").slideToggle( "slow", function() {
    // Animation complete.
  });
});

});

