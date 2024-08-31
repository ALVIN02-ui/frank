(function($) {
    $.fn.textrotator = function(options) {
      var settings = $.extend({
        animation: "dissolve", // Default animation is dissolve
        separator: ",", // The separator for the rotating text (default is comma)
        speed: 3000 // Speed of rotation in milliseconds
      }, options);
  
      return this.each(function() {
        var el = $(this);
        var array = [];
        $.each(el.text().split(settings.separator), function(key, value) {
          array.push(value);
        });
        el.text(array[0]);
  
        // Animation types
        var rotate = function() {
          switch (settings.animation) {
            case 'dissolve':
              el.animate({
                textShadowBlur: 20,
                opacity: 0
              }, 500, function() {
                index = $.inArray(el.text(), array);
                if ((index + 1) == array.length) {
                  index = -1;
                }
                el.text(array[index + 1]).animate({
                  textShadowBlur: 0,
                  opacity: 1
                }, 500);
              });
              break;
  
            case 'fade':
              el.fadeOut(500, function() {
                index = $.inArray(el.text(), array);
                if ((index + 1) == array.length) {
                  index = -1;
                }
                el.text(array[index + 1]).fadeIn(500);
              });
              break;
  
            case 'flip':
              el.find(".back").show().siblings(".front").hide();
              el.delay(500).queue(function(next) {
                el.find(".back").hide().siblings(".front").show().text(array[index]);
                next();
              });
              break;
  
            // Additional animations like flipUp, flipCube, spin can be added here
          }
        };
  
        var index = 0;
        setInterval(rotate, settings.speed);
      });
    };
  })(jQuery);
  